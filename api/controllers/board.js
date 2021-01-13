const boardModel = require('../models/board');

module.exports = {
  create: async function(req, res, next) {
    try {
      let board = await boardModel.create(req.body)
      res.json({status:"success", message: "board created", data: board});
    } catch(e) {
      res.json({status:"error", message: e.message, data:null});
    }
  },

  open: async function(req, res) {
    try {
      let board = await boardModel.open(req.params.name);
      res.json({status:"success", message: "board loaded", data: board});
    } catch (e) {
      res.json({status:"error", message: e.message, data:null});
    }
  },

  replace: async function(req, res) {
    try {
      let board = await boardModel.save(req.params.name);
      res.json({status:"success", message: "board replaced", data: board});
    } catch (e) {
      res.json({status:"error", message: e.message, data:null});
    }

  }

}
