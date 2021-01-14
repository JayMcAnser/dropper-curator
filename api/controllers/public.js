/**
 * public, without security controller
 */

const boardModel = require('../models/board');
const Const = require('../lib/const');


module.exports = {

  open: async function (req, res) {
    try {
      if (req.params && req.params.name) {
        let board = await boardModel.open(req.params.name);
        if (board && board.isPublic) {
          res.json({status: Const.status.success, message: "board loaded", data: board});
        } else {
          res.json({status: Const.status.error, message: "access denied", data: {}});
        }
      } else {
        res.json({status: Const.status.success, message: 'Droper Curator API is active'});
      }
    } catch (e) {
      res.json({status: Const.status.error, message: e.message, data: null});
    }
  },

  list: async function(req, res) {
    try {
      res.json(Const.result(Const.status.success, 'board list', await boardModel.findAll(true)));
    } catch (e) {
      res.json({status:Const.status.error, message: e.message, data: null});
    }
  }
}
