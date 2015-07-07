var express = require('express');
var app = express();
var port = process.env.PORT || 3000
var exphbs  = require('express-handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var shows = require('./routes/shows');
var users = require('./routes/users');
var User = require('./models/user');
var Show = require('./models/show');
var WatchedEpisode = require('./models/watched_episode');
var Chat = require('./models/chat');

app.engine('handlebars', exphbs({defaultLayout: 'application'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 3600000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(flash());
app.use(shows);
app.use(users);

app.get('/', function(req, res){
  res.render('home')
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.connect(process.env.PROD_MONGODB);

io.on('connection', function(socket){
  socket.on('create', function(room){
    socket.room = room;
    socket.users = [];
    socket.join(room);
  });

  socket.on('join', function(username){
    socket.username = username;
  });
  socket.on('chat message', function(msg){
    var username = socket.username;
    socket.broadcast.in(socket.room).emit('chat message', username + ": " + msg);
    socket.emit('chat message', username + ": " + msg);
  });
});

http.listen(port, function(){
  console.log('listening on' + port);
});