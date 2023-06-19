const logEvents = require('./logEvent');
const EventEmitter = require('events');

const myEventEmitter = new EventEmitter();
myEventEmitter.on('log', (msg) => {
    console.log(logEvents(msg));
});

setTimeout(() => {
    myEventEmitter.emit('log', 'From Emit');
}, 2000)