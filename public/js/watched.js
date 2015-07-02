$(document).on('ready', function(){
  var chat = $('.btn-chat').hide();
  $('.btn-seen').on('click', function(e){
    e.preventDefault();
    var self = $(this);
    var episode = self.data('ep');
    var show = $('.episodes').data('show');
    self.hide();
    chat.show();
    $.ajax({
      url: '/shows/' + show + '/' + episode,
      dataType: 'script',
      method: 'POST'
    });
  });
});

