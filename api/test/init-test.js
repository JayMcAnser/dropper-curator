/**
 * all test run this file first
 */
const app = require('../index');
const EMAIL = 'test@example.com';
const PASSWORD = '12345'
const User = require('../models/user');
let user = User.findOne({email: EMAIL});

if (!user) {
  user = User.create({name:'test', email: EMAIL, password: PASSWORD})
}


/**
 * return the auth key of a user
 * @type {Promise<unknown>}
 */
module.exports.AuthToken = new Promise((resolve, reject) => {
  const UserController = require('../controllers/user');
  // trick the auth in thinking we are a express
  let res = {
    _obj: {},
    json: function(obj) {this._obj = obj}
  };

  return UserController.authenticate(
    { body: {email: EMAIL, password: PASSWORD} },
    res,
    (err) => { console.error(err)}
  ).then(() => {
    if (res._obj.status === 'success') {
      return resolve(res._obj.data.token)
    } else {
      return false;
    }
  });
})
