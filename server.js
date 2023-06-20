const logEvents = require('./logEvent');
const EventEmitter = require('events');

const myEventEmitter = new EventEmitter();

myEventEmitter.on('logs', (msg) => {
    console.log(logEvents(msg));
});

setTimeout(() => {
    myEventEmitter.emit('logs', 'Hi, from Emitter')
});
