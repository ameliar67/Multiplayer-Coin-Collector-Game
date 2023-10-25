require('dotenv').config();
const bodyParser = require('body-parser');

var express = require('express')
  , http = require('http');
var app = express();
var server = http.createServer(app);


var connectcount = 0

const expect = require('chai');
const socket = require('socket.io');

const cors = require('cors');
const helmet = require('helmet')

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');


app.use(helmet.noSniff())
app.use(helmet.xssFilter())
app.use(helmet.noCache())
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }))


app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: '*' }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);


// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

var io = require('socket.io').listen(server);

// Set up server and tests
server.listen(portNum, "0.0.0.0", () => {
  console.log(`Listening on port ${portNum}`);
});


io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(connectcount, 'conntect')
  connectcount++
  console.log(connectcount, 'conntect2')
  socket.on('disconnect', () => {
    connectcount--
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

module.exports = app; // For testing
