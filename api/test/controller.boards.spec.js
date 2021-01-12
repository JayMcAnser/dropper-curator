const chai = require('chai');
const chaiHttp = require('chai-http'); //types');
chai.use(chaiHttp);
const assert = chai.assert;

// must run init first because it load the wrong definition
const init = require('./init-test');
const Boards = require('../models/boards')

const TEST_BOARD = 'test.ctrl.board'
const server = 'http://localhost:3000';

describe('controller.board', () => {

  before( async() => {
    await Boards.delete(TEST_BOARD)
  })

  it('create', () => {
    return chai.request(server)
      .post('/boards')
      .type('form')
      .send({name: TEST_BOARD, title:'Test Board'})
      .then((result) => {
        assert.equal(result.status, 200)
      })
  })

  it('open', () => {
    return chai.request(server)
      .get(`/boards/${TEST_BOARD}`)
      .then((result) => {
        assert.equal(result.status, 200)
      })
  })
})
