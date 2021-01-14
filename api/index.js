/**
 * Dropper Curator App
 * free from: https://medium.com/zero-equals-false/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d
 */

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const board = require('./routes/board')
const public = require('./routes/public')

const app = express();

app.set('secretKey', 'DropperCurator'); // jwt secret token

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res){
  res.json({status:"success", "message" : "Droper Curator API is active"});
});

// public route
 app.use('/public', public)
app.use('/user', user);
app.use('/board', board)

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
    res.status(404).json({message: "Not found"});
  else
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

let listener = app.listen(3000,
  function() {
    console.log('Node server (http://localhost:3000) listening on port 3000');
  }
);
