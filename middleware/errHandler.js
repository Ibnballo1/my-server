const { logEvents } = require('./logEvent')

const errHandler = (err, req, res, next) => {
    logEvents(`${req.name}: ${err.message}`, 'errLog.txt');
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errHandler;
