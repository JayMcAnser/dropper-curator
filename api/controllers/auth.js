const UserModel = require('../models/user');
const Bcrypt = require('bcrypt');
const Const = require('../lib/const')
const Config = require('config');
const Jwt = require('jsonwebtoken');
const Logging = require('../lib/logging');

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
          Logging.log('warn', `[controller.auth].authenticate user ${req.body.email} not found`)
          res.json({status: Const.status.error, message: "invalid email/password!", data: null});
        } else {
          //if(bcrypt.compareSync(req.body.password, userInfo.password)) {
          if (userInfo.password === req.body.password) {
            const token = Jwt.sign({id: userInfo.id}, Config.get('Server.secretKey'), {expiresIn: '1h'});
            res.json({
              status: Const.status.success, message: "user found", data: {
                user: userInfo,
                token: token
              }
            });
            if (userInfo.logging && userInfo.logging.length) {
              let log = Logging.buildLog(userInfo.logging);
              Logging.write(log, 'info', `[controller.auth].authenticate ${userInfo.email} logged in successfully`)
            }
          } else {
            Logging.log('warn', `[controller.auth].authenticate user ${req.body.email} try to login with the wrong password`)
            res.json({status: Const.status.error, message: "invalid email/password", data: null});
          }
        }
      } catch (e) {
        Logging.log('warn', `[controller.auth].authenticate unexpected error: ${e.message}`)
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
        req.session = {
          user: await UserModel.findById(decoded.id)
        }
        if (req.session.user.logging && req.session.user.logging.length) {
          let log = Logging.buildLog(req.session.user.logging);
          // so we can say req.session.log('error', 'not found')
          req.session.log = function(level, message) {
            Logging.write(log, level, message);  // write private log
            Logging.log(level, message);         // write to global log
          };
        } else {
          req.session.log = function(level, message) {
            Logging.log(level, message)
          };
        }
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
