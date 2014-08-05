
exports.findSongs = function(req, res) {
  var song = req.params.song;
  
  res.send({ 
    songs: [
      { title: 'Meck' },
      { 
        title: 'Help me', 
        lyrics: " \
        [00:22.31] Take me down to the paradise city \
        [00:25.01] Where the grass is green \
        [00:27.36] And the girls are pretty \
        [00:30.07] Take me home \
        [00:32.72] Take me down to the paradise city \
        [00:35.27] Where the grass is green \
        [00:36.57] And the girls are pretty \
        [00:38.21] Take me home \
        [00:43.00] \
        "
      }
    ] 
  });
};