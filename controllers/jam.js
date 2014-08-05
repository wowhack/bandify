
// list all existing jams?
exports.index = function(req, res) {
  res.render('jam/list');  
};

// return a form for creating a new jam
exports.create = function(req, res) {
  res.render('jam/new');
};

// workflow

// user fills in jam name, presses create gets sent here

// we create a jam with the title, then redirect to jam specific route

exports.save = function(req, res) {
  console.log('Saving stuff moon', req.params);
  console.log('Tha body', req.body);
};