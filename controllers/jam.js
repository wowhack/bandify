
// list all existing jams?
exports.index = function(req, res) {
  res.send('Listing tha jams');  
};

// return a form for creating a new jam
exports.create = function(req, res) {
  res.send('Amazing form');
};