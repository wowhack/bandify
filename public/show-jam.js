;(function($) {

  $('#active-tracks').children('li').each(function(index, track) {
    var id = $(track).find('a').data('id');
    $('#available-tracks').children('li').each(function(i, t) {
      if($(t).find('a').data('id') === id) {
        $(t).remove();
      }
    });
  });
  var startTime;
  var isPlaying;
  // var nrOfTracksPlaying = 0;

  var tracksPlaying = {};


  var activeTracks = [];

  $('#available-tracks').on('click', 'a', function(e) {
    e.preventDefault();
    var elem = $(this);
    var targetId = $(this).data('id');
    
    var jamId = $('#derp').data('jamid');
    
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

    startTime = Date.now();

    $('#active-tracks input[type="checkbox"]').each(function() {
      var $checkbox = $(this);
      var trackFile = $checkbox.parent().data('sound');
      if(trackFile.indexOf('public') >= 0) 
        trackFile = trackFile.substring('public/'.length);

      // console.log('Chched?', trackFile);
      var audio = new Audio('/' + trackFile);
      tracksPlaying[ trackFile ] = audio;

      var checked = $checkbox.prop('checked');
      if ( checked ) {
        audio.play();
        // nrOfTracksPlaying++;
        audio.onended = function() {
          
        };
        isPlaying = true;
      }
    });

  });

  $('#active-tracks input[type="checkbox"]').click(function() {
    // check if playing 
    if ( !isPlaying ) return;

    var $checkbox = $(this);
    var isChecked = $checkbox.prop('checked');
    console.log('Is checked', isChecked);

    var trackFile = $(this).parent().data('sound');
    var audio = tracksPlaying[ trackFile ];

    // if its currently not checked we should pause it, it was checked before this function was called?
    if ( !isChecked ) {
      audio.pause();
    } else {
      var elapsedInSeconds = (Date.now() - startTime) / 1000;
      audio.currentTime = elapsedInSeconds;
      audio.play();
    }

    // is the current track checked or unchecked? How long has the recording elapsed?
  });

})(jQuery);