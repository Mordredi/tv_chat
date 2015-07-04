$(document).on('ready', function(){
  $('.btn-seen').on('click', function(e){
    e.preventDefault();
    var self = $(this);
    var episode = self.data('ep');
    var show = $('.episodes').data('show');
    $('#' + episode).addClass('watched');
    $.ajax({
      url: '/shows/' + show + '/' + episode,
      dataType: 'script',
      method: 'POST'
    });
  });
});

