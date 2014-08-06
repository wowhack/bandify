;(function($) {

  $('#active-tracks').children('li').each(function(index, track) {
    var id = $(track).find('a').data('id');
    $('#available-tracks').children('li').each(function(i, t) {
      if($(t).find('a').data('id') === id) {
        console.log($(t))
        $(t).remove();
      }
    });
  });

  $('#available-tracks').on('click', 'a', function(e) {
    e.preventDefault();
    var elem = $(this);
    var targetId = $(this).data('id');
    var jamId = '53e1e6f9975abe0000528c76';
    $.post('/jam/addTrack', {
      jamId: jamId, trackId: targetId
    }, function(data) {
      var parent = elem.parent('li'),
          copy;

      elem.children('span')
        .removeClass('glyphicon-plus')
        .addClass('glyphicon-remove make-it-red');

      copy = parent.clone(false);


      elem.parent('li').fadeOut(200, function() {
        copy.hide();
        elem.parent('li').remove();
        $('#active-tracks').append(copy);
        copy.fadeIn();
      })

    });
  });

  $('#active-tracks').on('click', 'a', function(e) {
    e.preventDefault();

    var elem = $(this);
    var targetId = $(this).data('id');
    var jamId = '53e1e6f9975abe0000528c76';

    $.post('/jam/removeTrack', {
      jamId: jamId, trackId: targetId
    }, function(data) {
      var parent = elem.parent('li');

      elem.children('span')
        .removeClass('glyphicon-remove make-it-red')
        .addClass('glyphicon-plus');

      copy = parent.clone(false);


      elem.parent('li').fadeOut(200, function() {
        copy.hide();
        elem.remove();
        $('#available-tracks').prepend(copy);
        copy.fadeIn();
      });

    });
  });

  $('#play-jam').click(function() {

    $('#active-tracks li').each(function() {
      var trackFile = $(this).data('sound');
      var audio = new Audio('/' + trackFile);
      audio.play();
    });

  });

})(jQuery);