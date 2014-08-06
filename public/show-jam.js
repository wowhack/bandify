;(function($) {

  var activeTracks = [];

  $('#available-tracks').on('click', 'a', function(e) {
    e.preventDefault();
    var elem = $(this);
    var targetId = $(this).data('id');
    var jamId = '53e1557a1fef21d8f9c48f65';
    $.post('/jam/addTrack', {
      jamId: jamId, trackId: targetId
    }, function(data) {
      elem.addClass('disabled');
      console.log(elem);
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