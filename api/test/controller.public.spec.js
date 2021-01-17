
const init = require('./init-test');
const chai = require('chai');
const chaiHttp = require('chai-http'); //types');
chai.use(chaiHttp);
const assert = chai.assert;

// must run init first because it load the wrong definition

const Board = require('../models/board')
const Init = require('./init-test');

const TEST_BOARD_PUBLIC = 'test.ctrl.public'
const TEST_BOARD_PRIVATE = 'test.ctrl.private'
const server = 'http://localhost:3000';
const ROOT = '/public';
const Const = require('../lib/const')

describe('controller.public', () => {

  before(async () => {
    let session = {userId: await Init.AuthUserId};
    await Board.delete(session, TEST_BOARD_PRIVATE);
    await Board.delete(session, TEST_BOARD_PUBLIC);
    let pubBoard = await Board.create(session, {name: TEST_BOARD_PUBLIC, isPublic: true, title: 'public board'})
    await Board.setPublic(session, pubBoard, true);
    await Board.create(session,{name: TEST_BOARD_PRIVATE, isPublic: false, title: 'private board'})
  })

  it('check we are running', () => {
    return chai.request(server)
      .get('/')
      .then((result) => {
        assert.equal(result.status, 200)
        assert.isDefined(result.body.status)
        assert.equal(result.body.status, 'success')
        assert.isDefined(result.body.message)
      })
  });

  it('list the boards', () => {
    return chai.request(server)
      .get(ROOT + '/list')
      .then((result) => {
        assert.equal(result.status, 200)
        assert.isDefined(result.body.status)
        assert.equal(result.body.status, Const.status.success);
        assert.isDefined(result.body.data);
        assert.isTrue(result.body.data.length > 0, 'should find our test file');
        assert.isTrue(result.body.data.findIndex((b) => b.name === TEST_BOARD_PUBLIC) >= 0)
        assert.isTrue(result.body.data.findIndex((b) => b.name === TEST_BOARD_PRIVATE) < 0)
      })
  });

  it('open - public', () => {
    return chai.request(server)
      .get(ROOT + '/open/' + TEST_BOARD_PUBLIC)
      .then((result) => {
        assert.equal(result.status, 200)
        assert.isDefined(result.body.status)
        assert.equal(result.body.status, Const.status.success);
        assert.isDefined(result.body.data);
        assert.equal(result.body.data.name, TEST_BOARD_PUBLIC)
      })
  });
  it('open - block private', () => {
    return chai.request(server)
      .get(ROOT + '/open/' + TEST_BOARD_PRIVATE)
      .then((result) => {
        assert.equal(result.status, 200)
        assert.isDefined(result.body.status)
        assert.equal(result.body.status, Const.status.error);
        assert.equal(result.body.message, Const.results.boardNotFound);
      })
  })
});
