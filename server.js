const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvent');
const errHandler = require('./middleware/errHandler');

const PORT = process.env.PORT || 3500;

// custom middleware logger
// A customer middleware needs a next argument
app.use(logger)

// cors
const whiteList = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500/'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware
app.use(express.urlencoded({extended: false})); // form form

app.use(express.json()); // for json files

app.use(express.static(path.join(__dirname, '/public'))); // For all static file

// Creating a Route in express
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('/views/index.html', { root: __dirname });
    // OR
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')
});

// Routes Handler
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempt to load file');
    next()
}, (req, res) => {
    res.send('Hello World')
})

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({error: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
