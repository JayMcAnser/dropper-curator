/**
 * testing the user definition
 */
const Init = require('./init-test');
const chai = require('chai');
const assert = chai.assert;

const User = require('../models/user');
const Const = require('../lib/const');

describe('models.user', () => {

  const TEST_NAME = 'test-user';
  const TEST_EMAIL = 'test@example.com'
  const TEST_PASSWORD = '12345';
  let id;

  before(async () => {
    try {
      let token = await Init.AuthToken
      await User.delete({email: TEST_EMAIL})
    } catch (e) {
      console.log(e)
    }
  })

  it('create', async () => {
    let user = await User.create({name: TEST_NAME, email: TEST_EMAIL, password: TEST_PASSWORD});
    assert.isDefined(user.id);
    id = user.id
  });

  it('create exist', async() => {
    try {
      let user = await User.create({name: TEST_NAME, email: TEST_EMAIL, password: TEST_PASSWORD});
      assert.fail('used should be found')
    } catch(e) {
      assert.equal(e.message, 'user already exists')
    }
  });

  it('find', async() => {
    let user = await User.findOne({email: TEST_EMAIL});
    assert.isDefined(user);
    assert.equal(user.name, TEST_NAME);
  })

  it('find - missing where', async () => {
    try {
      let user = await User.findOne({});
      assert.fail('no where so error')
    } catch(e) {
      assert.equal(e.message, '[_filter] object has no values');
    }
  })

  it ('findById', async () => {
    let user = await User.findById(id);
    assert.isDefined(user);
    assert.equal(user.name, TEST_NAME);
  })


  it ('findById - not found', async () => {
    let user = await User.findById(id + 'asdf');
    assert.isFalse(user)
  });

  it('validate user', async() => {
    let req = {
      headers: {'x-access-token': await Init.AuthToken},
      body : {}
    }
    let res = {
      obj: {},
      json: function(obj) { this.obj = obj}
    }
    let result = await User.validate(
      req,
      res);
    assert.isDefined(req.body.user);
    assert.equal(req.body.user.email, Init.AuthEmail);
  });


  it('validate user - wrong token', async() => {
    let req = {
      headers: {'x-access-token': 'WRONG TOKEN'},
      body : {}
    }
    let res = {
      obj: {},
      json: function(obj) { this.obj = obj}
    }
    let result = await User.validate(
      req,
      res);
    assert.isDefined(res.obj.status);
    assert.equal(res.obj.status, Const.status.error)
  });

  it('validate user - missing token', async() => {
    let req = {
      body : {}
    }
    let res = {
      obj: {},
      json: function(obj) { this.obj = obj}
    }
    let result = await User.validate(
      req,
      res);
    assert.isDefined(res.obj.status);
    assert.equal(res.obj.status, Const.status.error)
  });

});
