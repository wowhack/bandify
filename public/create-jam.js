;(function($) {

  $('#musixmatch-btn').click(showMusixMatchModal);

  $('#song-title').change(function(e) {
    e.preventDefault();

    var songTitle = $(this).val(); 
    $.get('/musixmatch/' + songTitle, addAlternativesToModal);
  });

  // listen for changes in song title input
  function addAlternativesToModal(data) {
    if ( !data.songs ) return;

    var source   = $("#song-alternative").html();
    var template = Handlebars.compile(source);

    // go through the songs
    var songs = data.songs;

    songs.forEach(function(song) {
      var html = template(song);
      $('#song-alternatives').append( html ); 
    });

  }

  function showMusixMatchModal(e) {
    e.preventDefault();

    $('#lyrics-modal').modal();
  }


})(jQuery);