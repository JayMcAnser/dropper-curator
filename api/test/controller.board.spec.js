const chai = require('chai');
const chaiHttp = require('chai-http'); //types');
chai.use(chaiHttp);
const assert = chai.assert;

// must run init first because it load the wrong definition
const init = require('./init-test');
const Board = require('../models/board')

const TEST_BOARD = 'test.ctrl'
const server = 'http://localhost:3000';

describe('controller.board', () => {

  before( async() => {
    await Board.delete(TEST_BOARD)
  })

  it('create', () => {
    return chai.request(server)
      .post('/board')
      .type('form')
      .send({name: TEST_BOARD, title:'Test Board'})
      .then((result) => {
        assert.equal(result.status, 200)
      })
  })

  it('open', () => {
    return chai.request(server)
      .get(`/board/${TEST_BOARD}`)
      .then((result) => {
        assert.equal(result.status, 200)
        assert.isDefined(result.body.data);
        assert.equal(result.body.status, 'success')
        assert.equal(result.body.data.title, 'Test Board')
        assert.isDefined(result.body.data.id);
      })
  });

  it('open - not found', async () =>{
    return chai.request(server)
      .get(`/board/${TEST_BOARD + '.not-found'}`)
      .then((result) => {
        assert.equal(result.status, 200)
        assert.isDefined(result.body.data);
        assert.equal(result.body.status, 'error')
        assert.equal(result.body.message, 'board not found')
      })
  })
})
