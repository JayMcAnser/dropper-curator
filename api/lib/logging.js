/**
 * define the basic logging
 * version 2.0
 *
 */
const Config = require('config');
const Fs = require('fs');
const Morgan = require('morgan');
const Winston = require('winston');
const Helper = require('./helper');

// src is not in subdirectory but in the main root
Helper.setRelativePath('..');

let _winston = false;
// the levels that are used in winston
let _winstonLogLevels = {};


const _formatByName = function(name) {
  const formats = {
    'console.timestamp': Winston.format.combine(
      Winston.format.colorize(),
      Winston.format.timestamp(),
      Winston.format.align(),
      Winston.format.printf( info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    'file.timestamp': Winston.format.combine(
      Winston.format.timestamp(),
      Winston.format.align(),
      Winston.format.printf( info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    'loggly.timestamp': Winston.format.combine(
      Winston.format.timestamp(),
      Winston.format.align(),
      Winston.format.printf( info => `${info.timestamp} ${info.level}: ${info.message}`)
    )
  }
  if (formats[name]) {
    return formats[name]
  }
  return undefined
}
/**
 * initialize the loggers
 *
 * @param app
 */
const init = function(app) {
  let transports = [];
  let logger = Config.get('Logging');
  for (let index = 0; index < logger.length; index++) {
    let log = logger[index];
    if (['access'].indexOf(log.type) >= 0) {
      // this type of logging uses morgan
      let options = {};
      if (logger[index].filename) {
        options.stream = Fs.createWriteStream(
          Helper.getFullPath(logger[index].filename, {
            rootKey: 'Path.logRoot',
            noWarn: true,
            alwaysReturnPath: true,
            makePath: true
          }),
          {flags: 'a'}
        )
      }
      app.use(Morgan(
        logger[index].format ? logger[index].format : 'tiny',
        options));
    } else {
      // use the winston log
      let format = _formatByName(`${log.type}.${log.format}`)
      switch (log.type) {
        case 'console':
          transports.push(new Winston.transports.Console({
            level: log.level === undefined ? 'info' : log.level,
            format: format
          }));
          break;
        case 'file':
          let filename = Helper.getFullPath(log.filename ? log.filename : 'no-name.log',{
            rootKey: 'Path.logRoot',
            noWarn: true,
            alwaysReturnPath: true,
            makePath: true
          })
          transports.push(new Winston.transports.File({
            level: log.level === undefined ? 'info' : log.level,
            filename: filename,
            format
          }));
          break;
        case 'loggly':
          if (log.token === undefined) {
            console.error('[Logging] missing token for loggly');
          } else {
            transports.push(new Loggly({
              level: log.level === undefined ? 'info' : log.level,
              token: log.token,
              subdomain: log.subdomain,
              tags: Array.isArray(log.tags) ? log.tags : [log.tags],
              json: log.isJson === undefined ? true : log.isJson,
              meta: log.meta === undefined ? '' : log.meta,
              format
            }));
          }
          break;
        case 'slack':
          transports.push(new SlackHook({
            webhookUrl: log.url,
            channel: log.channel === undefined ? 'logger' : log.channel,
            username: log.username === undefined ? 'logger' : log.username,
            level: log.level === undefined ? 'info' : log.level,
          }));
          break;
        default:
          console.warn(`unknown log type: ${log.type}`);
      }
      // mark we are going to log to this level
      _winstonLogLevels[log.level ? log.level: 'info'] = true;
    }
  }
  if (transports.length) {
    this._winston = Winston.createLogger({
      transports
    });
  }
}

/**
 *
 * @param level on of the winston levels
 * @param message String or function to log. function is only called if level is actually logged
 *
 * examples:
 *   logger.log('debug','the message');   // procudes 'the message'
 *   logger.log('console', () => { return 'this take a long time'} )) // prints out the message only on console and higher
 */
const _log = function(level, message) {
  if (this._winston) {
    if (typeof message === 'function') {
      if (this._winstonLogLevels[level] === undefined) {
        return;
      }
      message = message();
    }
    this._winston.log(level, message)
  }
}

module.exports.init = init;
module.exports.winston = _winston;
module.exports.log = _log;
