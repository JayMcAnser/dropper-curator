const userModel = require('../models/user');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Const = require('../lib/const')
const Config = require('config');

module.exports = {
  /**
   * create a new user
   * @param req
   * @param res
   * @param next
   */
  create: function(req, res, next) {
        userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, res,function (err, result) {
      if (err)
        next(err);
      else
        res.json({status: Const.status.success, message: "user added successfully", data: null});

    });
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

      return userModel.findOne({email: req.body.email}).then((userInfo) => {
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
}
