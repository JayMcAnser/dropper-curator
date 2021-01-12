/**
 * Dropper Curator App
 * @type {e | (() => Express)}
 */

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const boards = require('./routes/boards')

const app = express();

app.set('secretKey', 'DropperCurator'); // jwt secret token

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.json({"tutorial" : "Build REST API with node.js"});
});

// public route
app.use('/users', users);
app.use('/boards', boards)

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
