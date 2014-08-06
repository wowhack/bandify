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
        var newElems = jQuery.parseHTML('<a href="#" data-id=' + targetId + ' ><span class="glyphicon glyphicon-play pull-right hate-it song-action"></span></a>')
        copy.append(newElems);
        copy.fadeIn();
      })

    });
  });

  $('#active-tracks').on('click', '.glyphicon-remove', function(e) {
    e.preventDefault();

    var elem = $(this);
    var targetId = $(this).parent().data('id');
    var jamId = $('#derp').data('jamid');

    $.post('/jam/removeTrack', {
      jamId: jamId, trackId: targetId
    }, function(data) {
      var parent = elem.closest('li');

      elem
        .removeClass('glyphicon-remove make-it-red')
        .addClass('glyphicon-plus');

      copy = parent.clone(false);


      elem.closest('li').fadeOut(200, function() {
        copy.hide();
        elem.remove();
        $('#available-tracks').prepend(copy);
        copy.find('.song-action').remove();

        copy.fadeIn();
      });

    });
  });

  $('#play-jam').click(function() {

    startTime = Date.now();

    $('#active-tracks li').each(function() {
      var $li = $(this);
      var trackFile = $li.data('sound');
      if(trackFile.indexOf('public') >= 0) 
        trackFile = trackFile.substring('public/'.length);

      // console.log('Chched?', trackFile);
      var audio = new Audio('/' + trackFile);
      tracksPlaying[ trackFile ] = audio;

      var playButton = $li.find('.song-action');
      playButton.removeClass('glyphicon-play').addClass('glyphicon-stop')
      // $checkbox.removeClass('glyphicon-play').addClass('glyphicon-pause')
      audio.play();
      // nrOfTracksPlaying++;
      audio.onended = function() {
          
      };
      isPlaying = true;

    });

  });

  $('#active-tracks').on('click', '.song-action', function(e) {
    e.preventDefault();
    // check if playing 
    if ( !isPlaying ) return;

    var $songActionSpan = $(this);
    var trackIsPlaying = $songActionSpan.hasClass('glyphicon-stop');

    var trackFile = $songActionSpan.closest('li').data('sound');
    if(trackFile.indexOf('public') >= 0) 
        trackFile = trackFile.substring('public/'.length);

    var audio = tracksPlaying[ trackFile ];

    if ( trackIsPlaying) {
      audio.pause();
      $songActionSpan.removeClass('glyphicon-stop').addClass('glyphicon-play');
    } else {
      var elapsedInSeconds = (Date.now() - startTime) / 1000;
      audio.currentTime = elapsedInSeconds;
      audio.play();
      $songActionSpan.removeClass('glyphicon-play').addClass('glyphicon-stop');
    }
  });

})(jQuery);