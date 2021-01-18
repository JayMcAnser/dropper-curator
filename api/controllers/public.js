/**
 * public, without security controller
 */

const boardModel = require('../models/board');
const Const = require('../lib/const');
const Logging = require('../lib/logging')

const _getSession = function(req) {
  return {
    userId: '--public--',
    log: (level, message) => {
      Logging.log(level, message)
    }
  }
}

module.exports = {

  open: async function (req, res) {
    let session = _getSession(req);
    try {
      if (req.params && req.params.name) {
        let board = await boardModel.open( session, req.params.name);
        if (board && board.isPublic) {
          session.log('info', `[controller.public].open open ${req.params.name}`)
          res.json({status: Const.status.success, message: "board loaded", data: board});
        } else {
          session.log('info', `[controller.public].open access denied to ${req.params.name}`)
          res.json({status: Const.status.error, message: "access denied", data: {}});
        }
      } else {
        res.json({status: Const.status.success, message: 'Droper Curator API is active'});
      }
    } catch (e) {
      session.log('error', `[controller.public].open ${e.message}`)
      res.json({status: Const.status.error, message: e.message, data: null});
    }
  },

  list: async function(req, res) {
    try {
      res.json(Const.result(Const.status.success, 'board list', await boardModel.findAll({userId: 'public'})));
    } catch (e) {
      res.json({status:Const.status.error, message: e.message, data: null});
    }
  }
}
