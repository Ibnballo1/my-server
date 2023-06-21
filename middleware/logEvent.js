const fs = require('fs'); // To be able to readfile, write, rename, append ...
const fsPromises = require('fs').promises; // o work with promises
const path = require('path');
const { v4:uuid } = require('uuid');
const { format } = require('date-fns');

const logEvents = async (msg, logName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\thh:mm');
    const logDetails = `${dateTime}\t${uuid()}\t${msg}\n`;
    try {
        if (!fs.existsSync('..', 'logs')) {
            await fsPromises.mkdir('..', 'logs');
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logDetails);
    } catch (error) {
        console.error(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method}, ${req.path}`);
    next();
};

module.exports = { logger, logEvents };