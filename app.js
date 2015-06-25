var app = require('express')();
var exphbs  = require('express-handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http)
var shows = require('./routes/shows');
var morgan = require('morgan');

app.use(morgan('dev'));

app.engine('handlebars', exphbs({defaultLayout: 'application'}));
app.set('view engine', 'handlebars');



app.get('/', function(req, res){
  res.render('home')
});



app.use(shows);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});