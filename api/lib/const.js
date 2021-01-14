

module.exports = {
  status: {
    success: 'success',
    error: 'error'
  },
  result: function(status, message, data) {
    return {status: status, message: message, data: data}
  }

}
