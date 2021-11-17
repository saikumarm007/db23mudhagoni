var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;
var Petrol = require('./models/petrol');

//server start 
async function recreateDB() {
  // Delete everything
  await Petrol.deleteMany();
  let instance1 = new
  Petrol({
    petrol_type: "regular",
    quantity: 12,
    cost: 38.24
  });
  let instance2 = new
  Petrol({
    petrol_type: "plus",
    quantity: 8,
    cost: 29.67
  });
  let instance3 = new
  Petrol({
    petrol_type: "v-power",
    quantity: 16,
    cost: 64.09
  });
  let instance4 = new
  Petrol({
    petrol_type: "diesel",
    quantity: 18,
    cost: 74.09
  });  
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
  });

}

 
let reseed = true; 
if (reseed) { recreateDB();}

const connectionString =  
process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  
{useNewUrlParser: true, 
useUnifiedTopology: true});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var petrolRouter = require('./routes/petrol');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/petrol',petrolRouter);
app.use('/addmods',addmodsRouter);
app.use('/selector',selectorRouter);
app.use('/',resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  })
);

app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false 
  })
); 
  app.use(passport.initialize()); 
  app.use(passport.session()); 

  // passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account');
 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
