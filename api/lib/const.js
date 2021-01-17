

module.exports = {
  status: {
    success: 'success',
    error: 'error'
  },
  results : {
    accessDenied: 'access denied',
    boardNameRequired: 'a board should have a name',
    boardExists: 'the board already exists',
    boardNotFound: 'board not found',

    noDataDirectory: 'data directory can not be created',
    missingSession: 'session is missing'
  },
  result: function(status, message, data) {
    return {status: status, message: message, data: data}
  }

}
