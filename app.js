// Development configuration.
if (process.env.NODE_ENV !== 'production') {
    var devVars = require('./dev-config.json');
    for (var key in devVars) process.env[key] = devVars[key];
}

// Load required modules.
var port = process.env.PORT,
  http = require('http'),
  express = require('express'),
  middleware = require('./middleware'),
  routes = require('./routes');

var app = express();

// Register middleware.
middleware.config(app);

// Register routes.
routes.register(app);

// Start server
var server = app.listen(port, function(){
  console.log("App is listening on port " + port);
});

var shotgun = require('shotgun'),
    shotgunClient = require('shotgun-client'),
    shell = new shotgun.Shell();

shotgunClient.attach(server, shell);
