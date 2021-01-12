
const chai = require('chai');
const assert = chai.assert;

const Boards = require('../models/boards');


describe('models.boards', () => {

  const TEST_NAME = 'test-board';
  before( async () => {
    try {
      await Boards.delete(TEST_NAME)
    } catch(e){}
  })

  it('create', async() =>{
    let board = await  Boards.create({id: '123', columns:[], name: TEST_NAME});
    assert.equal(board.id, '123');
  });

  it('findAll', async() => {
    let boards = await Boards.findAll();
    assert.isTrue(boards.length >= 1, 'found boards');
    assert.isTrue(boards.indexOf(TEST_NAME) >= 0, 'has test filename')
  });

  it('open', async() => {
    let board = await Boards.open(TEST_NAME);
    assert.isDefined(board.id, 'found the board');
  });

  it('save', async() => {
    let board = await Boards.open(TEST_NAME);
    board.col = [{id: 1}]
    await Boards.save(board);
    // check we wrote it to disk
    board = await Boards.open(TEST_NAME);
    assert.isDefined(board.col, 'has something');
    assert.equal(board.col[0].id, 1)
  })

});
