var Hapi      = require('hapi')
   ,mongoose  = require('mongoose')
   ,fs        = require('fs');
// Load configurations
var env     = process.env.NODE_ENV || 'TEST';
var config  = require('./private/Configs/config')[env];

mongoose.connect(config.db_url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database connection opened.");
});

// Paths

var models_path = './private/Models'

console.log("models_path " + models_path);

// Bootstrap models
fs.readdirSync(models_path).forEach(function (file) {
  console.log("Loading model " + file);
  require(models_path + '/' +file);
});
var port=parseInt(config.port);
var server = new Hapi.Server(port,{ cors: true });

console.log("connected to:"+port);

var routes    = require('./private/Routes/routes');


server.pack.require('hapi-auth-cookie', function (err) {

    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'sid-bcdsn',
        ttl:    1000*60*60*24*700,
        isSecure: false
    });
   server.route(routes);
   server.start();
});

