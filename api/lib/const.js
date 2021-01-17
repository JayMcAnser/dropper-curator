

module.exports = {
  status: {
    success: 'success',
    error: 'error'
  },
  results : {
    accessDenied: 'access denied'
  },
  result: function(status, message, data) {
    return {status: status, message: message, data: data}
  }

}
