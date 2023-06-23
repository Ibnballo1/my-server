const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvent');
const errHandler = require('./middleware/errHandler');
const corsOption = require('./config/corsOption');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;

// custom middleware logger
// A customer middleware needs a next argument
app.use(logger)

app.use(credentials);

// cors
app.use(cors(corsOption));

// built-in middleware
app.use(express.urlencoded({extended: false})); // form form

app.use(express.json()); // for json files

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public'))); // For all static file

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(400);
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
