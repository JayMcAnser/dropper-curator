/**
 * Dropper Curator App
 * free from: https://medium.com/zero-equals-false/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d
 */
const express = require('express');
const Logging = require('./lib/logging');
const bodyParser = require('body-parser');
const Config = require('config');

const app = express();
Logging.init(app)

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.json({status:"success", "message" : "Droper Curator API is active"});
});

const AuthController = require('./controllers/auth');

app.use('/auth', require('./routes/auth'));
app.use('/public',  require('./routes/public'));
app.use('/user',  AuthController.validate,  require('./routes/user'));
app.use('/board', AuthController.validate,  require('./routes/board'));

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function(err, req, res, next) {

  if(err.status === 404) {
    Logging.log('warn', `page not found: ${req.url}`)
    res.status(404).json({message: "page not found"});
  } else {
    Logging.log('error', `${req.url}: ${err.message}`)
    res.status(500).json({message: "something looks wrong :( !!!"});
  }
});

let listener = app.listen(Config.get('Server.port'),
  function() {
    Logging.log('info', `dropper server (http://localhost:${Config.get('Server.port')} listening on port ${Config.get('Server.port')}`)
//    console.log(`Node server (http://localhost:${Config.get('Server.port')} listening on port ${Config.get('Server.port')}`);
  }
);

module.exports = app;
