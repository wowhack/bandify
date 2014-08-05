;(function($) {

  $('#musixmatch-modal-btn').click(showMusixMatchModal);

  $('#find-songs').click(function(e) {
    e.preventDefault();

    var songTitle = $('#song-title').val();
    var songArtist = $('#song-artist').val();

    $.get('/musixmatch/' + songArtist + '/' + songArtist, addLyricsToModal);
  });

  // listen for changes in song title input
  function addLyricsToModal(data) {
    if ( !data.lyrics ) return;

    var source   = $("#song-lyrics").html();
    var template = Handlebars.compile(source);

    // go through the songs
    var html = template( data );
    $('#results').html( html ); 

  }

  function showMusixMatchModal(e) {
    e.preventDefault();

    $('#lyrics-modal').modal();
  }


})(jQuery);