
// list all existing jams?
exports.index = function(req, res) {
  res.render('jam/list');  
};

// return a form for creating a new jam
exports.create = function(req, res) {
  res.render('jam/new');
};