$(document).on('ready', function(){
  $('.add').on('click', function(e){
    e.preventDefault();
    $(this).hide();
    $('.new').addClass('show');
  });

  $('.close').on('click', function(e){
    e.preventDefault();
    $('.new').removeClass('show');
    $('.add').show();
  });
});

