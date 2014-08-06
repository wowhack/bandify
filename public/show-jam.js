;(function($) {

  var activeTracks = [];

  $('#available-tracks').on('click', 'a', function(e) {
    e.preventDefault();
    var elem = $(this);
    var targetId = $(this).data('id');
    var jamId = '53e1e094e4b42bf0ff7d14c6';
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
        $('#active-tracks').append(copy);
        copy.fadeIn();
      })

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