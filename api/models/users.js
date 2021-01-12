

const USERS = [
  {id: 1, name: 'Jaap', email: 'jaap@toxus.nl', password: '12345'},
  {id: 2, name: 'Pier', email: 'gjptaylor@gmail.com', password: '12345'}
]



module.exports = {
  create: function(req, res, next) {
    res.json({status:"error", message: 'user.create not implemented', data:null})
  },

  async findOne(what) {
    return USERS.find( (u) => {
      for (let key in what) {
        if (!what.hasOwnProperty(key)) { continue }
        if (!what[key] === undefined || u[key].toUpperCase() !== what[key].toUpperCase()) {
          return false
        }
      }
      return true;
    })
  }


}
