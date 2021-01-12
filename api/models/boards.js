/**
 * Board model.
 *
 * These are currently stored in files. All board are global (not user specific
 *
 * version 1.0
 *
 */
const Config = require('config');
const Fs = require('fs');
const Path = require('path');
const Helper = require('../lib/helper');
const { v4 : uuidv4} = require('uuid');
const JsonFile = require('jsonfile');

module.exports = {
  _rootDir() {
    return Helper.getFullPath('', {rootKey:'Path.dataRoot'})
  },

  create: async function(board) {
    if (board.name === undefined) {
      throw new Error('board.filename is required');
    }

    let filename = Helper.getFullPath(board.name, {rootKey: 'Path.dataRoot', extension: Config.get('Board.extension')});
    if (Fs.existsSync(filename)) {
      throw new Error('the file already exists');
    }
    if (board.id === undefined) {
      board.id = uuidv4()
    }
    return JsonFile.writeFile(filename, board).then(() => {
      return board;
    });
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
  },
  async findAll() {
    let rootDir = Helper.getFullPath('', {rootKey:'Path.dataRoot'})
    let tmpFiles = Fs.readdirSync(rootDir);
    let files = tmpFiles.filter((f) => f.substr(f.length - Config.get('Board.extension').length) === Config.get('Board.extension'))
    files.forEach( (f, key) => files[key] = f.substring(0, f.length - Config.get('Board.extension').length) )
    return files;
  },

  async open(name) {
    let filename = Helper.getFullPath(name, {rootKey: 'Path.dataRoot', extension: Config.get('Board.extension')})
    if (Fs.existsSync(filename)) {
      return JsonFile.readFile(filename);
    } else {
      throw new Error('board not found')
    }
  },

  async save(board) {
    if (board.name === undefined) {
      throw new Error('board has no name')
    }
    let filename = Helper.getFullPath(board.name, {rootKey: 'Path.dataRoot', extension: Config.get('Board.extension')})
    if (!Fs.existsSync(filename)) {
      throw new Error('board does not exist')
    }
    return JsonFile.writeFile(filename, board).then( x => {
      return board;
    })
  },


  async delete(boardName) {
    let filename = Helper.getFullPath(boardName,{rootKey: 'Path.dataRoot', extension: Config.get('Board.extension')});
    if (Fs.existsSync(filename)) {
      Fs.unlinkSync(filename)
    }
    return true;
  }

}
