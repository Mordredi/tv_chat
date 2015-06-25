var app = require('express')();
var exphbs  = require('express-handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http)
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var shows = require('./routes/shows');
var users = require('./routes/users');

app.use(morgan('dev'));

app.engine('handlebars', exphbs({defaultLayout: 'application'}));
app.set('view engine', 'handlebars');

app.use(passport.initialize());
app.use(passport.session());

app.use(shows);
app.use(users);

app.get('/', function(req, res){
  res.render('home')
});

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/tv_chat');

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});