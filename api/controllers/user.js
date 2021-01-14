const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
  create: function(req, res, next) {

    userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, res,function (err, result) {
      if (err)
        next(err);
      else
        res.json({status: "success", message: "User added successfully!!!", data: null});

    });
  },
  authenticate: async function(req, res, next) {
    let userInfo = await userModel.findOne({email: req.body.email}) ;
    if (!userInfo) {
      return res.json({status:"error", message: "Invalid email/password!!!", data:null});
    }
    //if(bcrypt.compareSync(req.body.password, userInfo.password)) {
    if (userInfo.password === req.body.password) {
      const token = jwt.sign({id: userInfo.id}, req.app.get('secretKey'), { expiresIn: '1h' });
      res.json({status:"success", message: "user found", data:{user: userInfo, token:token}});
    } else {
      res.json({status:"error", message: "Invalid email/password!!!", data:null});
    }
  },}
