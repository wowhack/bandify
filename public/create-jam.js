;(function($) {

  $('#musixmatch-modal-btn').click(showMusixMatchModal);

  $('#add-lyrics-btn').click(function(e) {

    // get lyrics
    var lyrics = $('#lyrics').text();
    $('#jam-lyrics').text( lyrics ); 
    console.log($('#song-title').val());
    $('#spotify-id-field').val(($('#song-title').val().charAt(0).toUpperCase() + $('#song-title').val().slice(1)));
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