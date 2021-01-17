
/**
 * testing the auth controller
 */

const Init = require('./init-test');
const chai = require('chai');
const assert = chai.assert;

const Const = require('../lib/const');
const AuthController = require('../controllers/auth')

describe('auth controller', () => {

  describe('direct', () => {
    it('validate user', async() => {
      let req = {
        headers: {'authorization': await Init.AuthToken},
        body : {}
      }
      let res = {
        obj: {},
        json: function(obj) { this.obj = obj}
      }
      let result = await AuthController.validate(
        req,
        res,
        () => {});
//      assert.equal(res.obj.status, Const.status.success, res.obj.message);
      assert.isDefined(req.body.user);
      assert.equal(req.body.user.email, Init.AuthEmail);
    });


    it('validate user - wrong token', async() => {
      let req = {
        headers: {'authorization': 'WRONG TOKEN'},
        body : {}
      }
      let res = {
        obj: {},
        json: function(obj) { this.obj = obj}
      }
      let result = await AuthController.validate(
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
      let result = await AuthController.validate(
        req,
        res);
      assert.isDefined(res.obj.status);
      assert.equal(res.obj.status, Const.status.error)
    });
  });

  describe('server', () => {

  })
})
