const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        // format.colorize(),
        label({ label: 'node' }),
        timestamp({ format: 'YYYY-mm-dd HH:mm:ss' }),
        myFormat
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new DailyRotateFile({
            filename: '../log/error.log',
            level: 'error',
            maxSize: 5242880 }),//5MB
        // new winston.transports.File({ filename: 'combined.log' }),
        new transports.Console()
    ],
    // exceptionHandlers: [
    //     new transports.File({ filename: path.join(__dirname, '/exception.log') })
    // ]
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

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }

module.exports = logger;

