/**
 * Main server startup and configuration commands
 */

// Load configuration
var config = require('./config/config'),
    _ = require('lodash');

if (config.NEW_RELIC_ENABLED) {
    console.log("Enabling new relic: " + config.NEW_RELIC_ENABLED);
    require('newrelic');
}

if (config.NODE_TIME_ENABLED && config.NODE_TIME_KEY) {
    console.log("Enabling Nodetime: " + config.NODE_TIME_ENABLED);
    require('nodetime').profile({
        accountKey: config.NODE_TIME_KEY,
        appName: 'rev- '+ config.NODE_ENV
    });
}

// Modules
var ypbackendlib = require('ypbackendlib');


// Configure the server
var swaggerServer = ypbackendlib.createSwaggeredServer("REVOLUTION Backend", config);

// initialize Database
var modelNames = require('./models').modelNames;

var schemaNames = ['user', 'profile'];
var modelPath = __dirname + '/models';
var schemaExtensions = {};
_.forEach(schemaNames, function (name) {
    var schema = require(modelPath + '/' + name + '_schema');
    schemaExtensions[name] = schema;
});
ypbackendlib.initializeDb(config, modelNames, modelPath, undefined, undefined, schemaExtensions);

// setup our routes
swaggerServer.addRoutes(__dirname + '/routes');


var port = config.port;
swaggerServer.getRestifyServer().listen(port);
console.log('App started on port ' + port + ', now is: ' + new Date());