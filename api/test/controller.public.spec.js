const chai = require('chai');
const chaiHttp = require('chai-http'); //types');
chai.use(chaiHttp);
const assert = chai.assert;

// must run init first because it load the wrong definition
const init = require('./init-test');
const Board = require('../models/board')

const TEST_BOARD_PUBLIC = 'test.ctrl.board.public'
const TEST_BOARD_PRIVATE = 'test.ctrl.board.private'
const server = 'http://localhost:3000';

describe('controller.public', () => {

  before(async () => {
    await Board.delete(TEST_BOARD_PRIVATE);
    await Board.delete(TEST_BOARD_PUBLIC);
    await Board.create({name: TEST_BOARD_PUBLIC, isPublic: true, title: 'public'})
    await Board.create({name: TEST_BOARD_PRIVATE, isPublic: true, title: 'private'})
  })

  it('check we are running', () => {
    return chai.request(server)
      .get('/public')
      .then((result) => {
        assert.equal(result.status, 200)
        assert.isDefined(result.body.status)
        assert.equal(result.body.status, 'success')
        assert.isDefined(result.body.message)
      })
  })
});
