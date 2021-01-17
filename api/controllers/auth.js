const UserModel = require('../models/user');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Const = require('../lib/const')
const Config = require('config');
const Jwt = require('jsonwebtoken');

module.exports = {
  /**
   * the creation of a user
   * @param req
   * @param res
   * @param next
   */
  create: function(req, res, next) {
    res.json({status: Const.status.error, message: 'create user is not allowed', data: {}})
  },

  /**
   * return the authentication for the user
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  authenticate: function(req, res, next) {

    return UserModel.findOne({email: req.body.email}).then((userInfo) => {
      try {
        if (!userInfo) {
          res.json({status: Const.status.error, message: "invalid email/password!", data: null});
        } else {
          //if(bcrypt.compareSync(req.body.password, userInfo.password)) {
          if (userInfo.password === req.body.password) {
            const token = jwt.sign({id: userInfo.id}, Config.get('Server.secretKey'), {expiresIn: '1h'});
            res.json({
              status: Const.status.success, message: "user found", data: {
                user: userInfo,
                token: token
              }
            });
          } else {
            res.json({status: Const.status.error, message: "invalid email/password", data: null});
          }
        }
      } catch (e) {
        console.error(`[user.authenticate] ${e.message}`)
      }
    })
  },


  /**
   * validate the user against the encrypted key
   * @param req
   * @param res
   * @param next
   */
  async validate(req, res, next) {
    try {
      let token = req.headers && req.headers['authorization'] ? req.headers['authorization'] : ''
      try {
        let decoded = Jwt.verify(
          token,
          Config.get('Server.secretKey'));

        req.body.user = await UserModel.findById(decoded.id);
        req.session = { user: await UserModel.findById(decoded.id)}
      //  res.json({status: Const.status.success, message: 'user logged in', data: null})
        next()
      } catch (err) {
        if (!token) {
          res.json({status: Const.status.error, message: Const.results.accessDenied, data: null})
        } else {
          res.json({status: Const.status.error, message: err.message, data: null})
        }
      }
    } catch(e) {
      res.json({status: Const.status.error, message: `[authController.validate] ${r.message}`, data: null})
    }
  }
}
