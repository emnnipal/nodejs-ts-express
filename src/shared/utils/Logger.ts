import { LOGGER_LEVEL, NODE_ENV } from '../configs/app';

import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : LOGGER_LEVEL;
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
};

winston.addColors(colors);

const formatMeta = (meta: { [key: symbol]: string[] }) => {
  const splat = meta[Symbol.for('splat')];
  if (splat && splat.length) {
    return splat.map((arg) => JSON.stringify(arg, null, 2)).join(' ');
  }
  return '';
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:msZ' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level: logLevel, message, ...meta }) =>
      `[${timestamp}] [${logLevel}]: ${message} ${formatMeta(meta as Record<symbol, string[]>)}`
  )
);

const logFilesTransporter = () => {
  if (NODE_ENV === 'development') return [];
  return [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ];
};

const transports = [new winston.transports.Console(), ...logFilesTransporter()];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
