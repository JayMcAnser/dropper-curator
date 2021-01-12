const boardModel = require('../models/boards');

module.exports = {
  create: async function(req, res, next) {
    try {
      let board = await boardModel.create(req.body)
      res.json({status:"success", statusCode: 200,  message: "board created", data: board});
    } catch(e) {
      res.json({status:"error", message: e.message, data:null});
    }
  },

  open: async function(req, res) {
    try {
      let board = await boardModel.open(req.params.name);
      res.json({status:"success", statusCode: 200,  message: "board found", data: board});
    } catch (e) {
      res.json({status:"error", statusCode: 404, message: e.message, data:null});
    }
  }


}
