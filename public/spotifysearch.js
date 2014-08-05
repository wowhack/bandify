var spotifyApi = new SpotifyWebApi();

function searchTrack (trackName) {
  $("#search-results").empty();
  spotifyApi.searchTracks(trackName, function(err, data) {
	if (err) console.error(err);
	else console.log('Tracks', data);
	data.tracks.items.forEach(function(track) {
		$("#search-results").append('<li>' + track.name + '<button data-name="find-jam" id="' + track.id + '">Find Jam</button></li>')
	});
  });
}

$(document).on('click', 'button', function(evt) {
  if($(evt.target).data('name') == 'search') {
	searchTrack(document.getElementById('trackName').value)
  }
  if($(evt.target).data('name') == 'find-jam') {
  	$.get(
  		"search/" + this.id)
  }
});
