/**
 * public, without security controller
 */

const boardModel = require('../models/boards');

module.exports = {

  open: async function (req, res) {
    try {
      if (request.params && req.params.name) {
        let board = await boardModel.open(req.params.name);
        if (board && board.isPublic) {
          res.json({status: "success", message: "board loaded", data: board});
        } else {
          res.json({status: "error", message: "access denied", data: {}});
        }
      } else {
        res.json({status: 'success', message: 'Droper Curator API is active'});
      }
    } catch (e) {
      res.json({status: "error", message: e.message, data: null});
    }
  }
}
