/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf } = format;
const dateformat = require('dateformat');

const myFormat = printf(({ level, message, label, timestamp }) => {
  timestamp = dateformat(Date.now(), 'yyyy-mm-dd HH:MM:ss.l');
  return `${timestamp} [${label}] ${level}: ${message}`;
});

module.exports = createLogger({
  format: combine(label({ label: process.env.PROJECT_NAME }), timestamp(), myFormat),
  transports: [new transports.Console()]
});
