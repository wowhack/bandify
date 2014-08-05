var http = require('http')
  , querystring = require('querystring')
  , api = "http://api.musixmatch.com/ws/1.1/"
  , apiKey = "b956117746bf6dd8824562b615bf0516"
  ;

exports.findSongs = function(req, res) {
  var artist = req.params.artist;
  var title = req.params.title;

  getTrackLyrics({ artist: artist, title: title }, function(err, lyrics) {
    res.send({ lyrics: lyrics });
  })
};

// we want to send artist and song name to our function which requests
function getTrackLyrics(track, cb) {
  var reqString = api + 'matcher.lyrics.get?' +
          querystring.stringify({ q_track: track.title, q_artist: track.artist, apikey: apiKey });
    ;

  http.get(reqString, function(res) {
    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      var resJSON = JSON.parse(data)
        , body = resJSON.message.body
        , lyrics = ''
        ;

      if ( !Array.isArray(body) ) {
        lyrics = body.lyrics.lyrics_body;
      }

      cb(null, lyrics);
    });

  });
}

exports.getTrackLyrics = getTrackLyrics;
