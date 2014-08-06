;(function($) {

  $('#musixmatch-modal-btn').click(showMusixMatchModal);

  $('#add-lyrics-btn').click(function(e) {

    // get lyrics
    var lyrics = $('#lyrics').text();
    $('#jam-lyrics').text( lyrics ); 

    $('#lyrics-modal').modal('hide');
  });

  $('#find-songs').click(function(e) {
    e.preventDefault();

    var songTitle = $('#song-title').val();
    var songArtist = $('#song-artist').val();

    $.get('/musixmatch/' + songArtist + '/' + songArtist, addLyricsToModal);
  });

  // listen for changes in song title input
  function addLyricsToModal(data) {
    if ( !data.lyrics ) return;

    $('#lyrics').text( data.lyrics );
  }

  function showMusixMatchModal(e) {
    e.preventDefault();

    $('#lyrics-modal').modal();
  }

})(jQuery);