// server.js

var ENV = process.env.NODE_ENV || 'dev'; // Assume dev env. for safety

// set up ======================================================================
// get all the tools we need
var fs         = require('fs');
var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var mongoose   = require('mongoose');
var passport   = require('passport');
var path       = require('path');
var https      = require('https');

var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var compression    = require('compression');
var flash          = require('connect-flash');
var methodOverride = require('method-override');
var mongoStore     = require('connect-mongo')(session);

var configDB     = require('./config/database.js')[ENV]; // Get the configuration object for this execution environment
var configSecret = require('./config/secret.js')[ENV];

// set up our express application
app.use(compression({threshold: 512}));
app.use(morgan(ENV)); // log every request to the console

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));     // get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(passport.initialize());

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// 'require' all of our Mongo models:
var models = __dirname + '/app/models';
fs.readdirSync(models).forEach(function(model) {
    if(model.indexOf('.js') > -1) {
        require(models + '/' + model);
    }
});

// required for passport
//app.use(session(configSecret.secret));

app.use(session({
	store: new mongoStore({ mongooseConnection: mongoose.connection }),
	secret: configSecret.secret.secret,
	resave: configSecret.secret.resave,
	saveUninitialized: configSecret.secret.saveUninitialized }));

app.set('jsonkeysecret', configSecret.secret.secret);

app.use(express.static(path.join(__dirname, '/public'))); //Expose /public

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app
require('./app/api.js')(app);    // load our API routes and pass in our app

// SSL/HTTPS
var hskey  = fs.readFileSync('./sslcerts/coldfire.com.br.key');
var hscert = fs.readFileSync('./sslcerts/ssl.crt')

var credentials = {
    key: hskey,
    cert: hscert
};

/*app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});
*/

var server = https.createServer(credentials, app);
server.listen(port);
// launch ======================================================================
//app.listen(port);
console.log('HTTPS Server running on port ' + port);
