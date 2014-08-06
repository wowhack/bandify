;(function($) {

  var activeTracks = [];

  $('#available-tracks').on('click', 'a', function(e) {
    e.preventDefault();
    var targetId = $(this).data('id');
    var jamId = '53e1557a1fef21d8f9c48f65';
    $.post('/jam/addTrack', {
      jamId: jamId, trackId: targetId
    }, function(data) {
        
    });
  });
  
  $('#play-jam').click(function() {

    var audio = new Audio('/austin.wav');
    audio.play();
    var death = new Audio('/death.wav');
    death.play()

  });

})(jQuery);