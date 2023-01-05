const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
// };

const logger = createLogger({
    level: 'info',
    format: combine(
        // format.colorize()
        label({ label: 'node' }),
        timestamp({ format: 'YYYY-mm-dd HH:mm:ss' }),
        logFormat
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new transports.DailyRotateFile({
            filename: 'log/error.log',
            level: 'error',
            maxSize: 5242880,
            maxFiles: 5,
            json: true,
        }),//5MB
        // new winston.transports.File({ filename: 'combined.log' }),
        new transports.Console({
            handleExceptions: true
        })
    ],
    exitOnError: false,
    exceptionHandlers: [
        new transports.File({ filename: 'log/exception.log'})
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'log/rejections.log'})
    ],
});

module.exports = logger;
