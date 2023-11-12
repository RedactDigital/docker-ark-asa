import os from 'os';
import path from 'path';
import type { TransformableInfo } from 'logform';
import { addColors, createLogger, format, transports } from 'winston';
import DatadogWinston from 'datadog-winston';

/**
 * Logging levels in winston conform to the severity ordering specified by RFC5424: severity of all levels is assumed to
 *  be numerically ascending from most important to least important.
 */
enum LogLevels {
  CRITICAL = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
}

enum LogColors {
  CRITICAL = 'bold white redBG',
  ERROR = 'bold red',
  WARN = 'bold yellow',
  INFO = 'bold cyan',
}

/**
 * Define the levels that winston will use. This is used later on
 * when we create the logger
 */
const logLevels = {
  critical: LogLevels.CRITICAL,
  error: LogLevels.ERROR,
  warn: LogLevels.WARN,
  info: LogLevels.INFO,
};

/**
 * This lets us add custom logging levels and colors so that
 * winston recognizes them
 */
addColors({
  critical: LogColors.CRITICAL,
  error: LogColors.ERROR,
  warn: LogColors.WARN,
  info: LogColors.INFO,
});

/**
 * This is the format that will be used for all logs except File logs
 */
const formatter = format.combine(
  /** Adds color to the format */
  format.colorize(),

  /** Adds timestamp to the format */
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

  /** Format the way the log is output to the console */
  format.printf((info: TransformableInfo) => {
    const { timestamp, level, ...meta } = info;
    let { message } = <{ message: string }>info;

    if (Object.keys(meta).length > 1) {
      delete meta.message;
      message = `${message} \n${JSON.stringify(meta, null, 2)}`;
    }

    return `${timestamp} [${level}]: ${message}`;
  }),
);

/**
 * This is the format that will be used for all File logs
 * The only difference is that we don't want to add color because it will mess up the log file
 */
const fileFormatter = format.combine(
  /** Adds timestamp to the format */
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

  /** Format the way the log is output to the console */
  format.printf((info: TransformableInfo) => {
    const { timestamp, level, ...meta } = info;
    let { message } = <{ message: string }>info;

    if (Object.keys(meta).length > 1) {
      delete meta.message;
      message = `${message} \n${JSON.stringify(meta, null, 2)}`;
    }

    return `${timestamp} [${level}]: ${message}`;
  }),
);

/** ======================================== Defineing Transports ============================================ */
const transportsToUse = [];
const transportTypes = process.env.LOG_TRANSPORTS ? process.env.LOG_TRANSPORTS.split(',') : ['console'];
for (const transport of transportTypes) {
  switch (transport) {
    case 'console':
      transportsToUse.push(
        new transports.Console({
          format: formatter,
        }),
      );
      break;
    case 'file':
      transportsToUse.push(
        new transports.File({
          filename: process.env.LOG_FILE ?? path.join(import.meta.dir, '../../storage/logs/app.log'),
          format: fileFormatter,
        }),
      );
      break;
    case 'datadog':
      if (!process.env.LOG_DATADOG_API_KEY) {
        throw new Error('LOG_DATADOG_API_KEY is not defined in as an environment variable');
      }
      transportsToUse.push(
        new DatadogWinston({
          apiKey: process.env.LOG_DATADOG_API_KEY,
          ddsource: 'nodejs',
          ddtags: `env:${process.env.NODE_ENV}`,
          service: process.env.APP_NAME,
          hostname: os.hostname(),
        }),
      );
      break;
    default:
      throw new Error(`Unknown transport: ${transport}`);
  }
}

/**
 * Create the logger
 */
const log = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  transports: transportsToUse,
  levels: logLevels,
});

export default log;
