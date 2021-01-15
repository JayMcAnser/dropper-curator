/**
 * Dropper Curator App
 * free from: https://medium.com/zero-equals-false/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d
 */

const express = require('express');
const Morgan = require('morgan');
const bodyParser = require('body-parser');
const Config = require('config');
const Fs = require('fs');
const Helper = require('./lib/helper');
Helper.setRelativePath('..'); // src is not in subdirectory but in the main root

const app = express();


let logFile = Helper.getFullPath('test.log', {rootKey: 'Path.logRoot', noWarn: true, alwaysReturnPath: true})
let logger = Config.get('Logging');
for (let index = 0; index < logger.length; index++) {
  let options = {};
  if (logger[index].filename) {
    options.stream = Fs.createWriteStream(
      Helper.getFullPath('test.log', {rootKey: 'Path.logRoot', noWarn: true, alwaysReturnPath: true, makePath: true}),
      { flags: 'a'}
    )
  }
  app.use(Morgan(
    logger[index].format ? logger[index].format : 'tiny',
     options));
}

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.json({status:"success", "message" : "Droper Curator API is active"});
});


app.use('/public',  require('./routes/public'))
app.use('/user',    require('./routes/user'));
app.use('/board',   require('./routes/board'))

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// handle errors
app.use(function(err, req, res, next) {
  console.log(err);

  if(err.status === 404)
    res.status(404).json({message: "page not found"});
  else
    res.status(500).json({message: "something looks wrong :( !!!"});
});

let listener = app.listen(Config.get('Server.port'),
  function() {
    console.log(`Node server (http://localhost:${Config.get('Server.port')} listening on port ${Config.get('Server.port')}`);
    // after all initialization start test / runner
    // app.emit('serverReady');
  }
);

module.exports = app;
