var spotifyApi = new SpotifyWebApi();

function searchTrack (trackName, viewname) {
	$("#search-results").empty();
	spotifyApi.searchTracks(trackName, function(err, data) {
		if (err) console.error(err);
		else console.log('Tracks', data);
		if (viewname == 'search')
			data.tracks.items.forEach(function(track) {
				$("#search-results").append('<li>' + track.name + '<button class="btn" data-name="find-jam" id="' + track.id + '">Find Jams</button></li>')
			});
		if (viewname == 'create')
			data.tracks.items.forEach(function(track) {
				$("#search-results").append('<li><p class="track-name">' + track.name + ' - </p><p class="track-artist">'+ track.artists[0].name + '</p><button class="btn" data-name="add-song-id" id="' + track.id + '">Add ID</button></li>')
			});
		if (viewname == 'track')
			data.tracks.items.forEach(function(track) {
				$("#search-results").append('<li><p class="track-name">' + track.name + ' - </p><p class="track-artist">'+ track.artists[0].name + '</p><button class="btn" data-name="record-song-id" id="' + track.id + '">Record song</button></li>')
			});
	});
}

$(document).on('click', 'button', function(evt) {
	if($(evt.target).data('name') == 'jam-search') {
		searchTrack(document.getElementById('trackName').value, 'search');
	}
	if($(evt.target).data('name') == 'find-jam') {
		$.get(
			"search/" + this.id, function(data) {
				console.log('data', data)
				if(data.jams.length == 0) {
					$("#jam-results").empty();
					$("#jam-results").append('<p>No Jams found</p>');
				}
				else {
					data.jams.forEach(function(jam) {
						$("#jam-results").append('<li><a href="/jam/' + jam._id + '">' + jam.title + '</a></li>')
					});
				}
			});
	}
	if($(evt.target).data('name') == 'create-search') {
		searchTrack(document.getElementById('trackName').value, 'create');
	}
	if($(evt.target).data('name') == 'add-song-id') {
		$("#spotify-id-field").val(this.id);
	}
	if($(evt.target).data('name') == 'track-search') {
		searchTrack(document.getElementById('trackName').value, 'track');
	}
	if($(evt.target).data('name') == 'record-song-id') {
		$("#spotify-widget-area").empty();
		var $iframe = $("<iframe />", {
			src: 'https://embed.spotify.com/?uri=spotify:track:' + this.id,
			width: '100%',
			height: '80',
			frameborder: '0',
			allowtransparency: 'true'
		});
		$("#spotify-widget-area").append($iframe);
		$("#spotify-widget-area").append('<button data-name="remove-widget" class="btn btn-danger">Remove Spotify-record</button>');
	}
	if($(evt.target).data('name') == 'remove-widget') {
		$("#spotify-widget-area").empty();
	}
});
