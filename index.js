//Load express
var express = require('express');
var app = express();
var path = require('path');
//Load app config file
var config = require('./config/config.js');

//Setup database connection
var db = require('./libraries/db');
db.connect((err) => {
    if (err) {
        console.error('Unable to connect to MySQL.');
        process.exit(1);
    }
});

//Load routes definition
var router = require('./controllers/index.js');

//Set CORS handling
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", config.cors.origin);
    res.header("Access-Control-Allow-Headers", config.cors.headers);
    res.header('Access-Control-Allow-Methods', config.cors.methods);
    if (req.method === 'OPTIONS')
        res.end();
    else
        next();
});

//Enable body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//HTTP Method overwriter to set error response codes
var methodOverride = require('method-override');
var Message = require("./models/message");
app.use(methodOverride());
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(Message.error('ERR_SERVER_ERROR'));
});

//Define routes
app.use(router.routes);

//Strartup the services
start = () => {
    //Load http service
    if (config.app.http.port !== undefined && config.app.http.port !== '')
        app.listen(config.app.http.port, () => console.info('SDG donation API server running on port ' + config.app.http.port));
};

//Error handling
process.on('uncaughtException', (err) => {
    if (err.code == 'EADDRINUSE')
        console.error('SDG donation API server could not start. Port already in use');
    else
        console.error('SDG donation API server error: ' + err);
    process.exit('SIGTERM');
});

start();
