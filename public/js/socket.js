var socket = io();
var room;
var username;
var chatId;

$(document).on('ready', function(){
  if($('.chat-room').length > 0) {
    username = $('#btn-message').data('user');
    chatId = $('#btn-message').data('chat');
    room = $('.chat-room').data('room');
  };
  socket.on('connect', function(data){
    socket.emit('create', room);
    socket.emit('join', username);
  });
  $('#chat-form').on('submit', function(){
    var message = $('#m').val();
    socket.emit('chat message', message);
    $('#m').val('');
    $.ajax({
      url: '/shows/' + room + '/chat/' + chatId,
      dataType: 'script',
      method: 'POST',
      data: { message: message }
    });
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});