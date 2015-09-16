var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Exercise = new Schema({
  name: String,
  description: String,
  tags: [String]
});

module.exports = mongoose.model('exercises', Exercise);
