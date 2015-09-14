var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var Schema = mongoose.Schema;
var URI = uriUtil.formatMongoose(process.env.MONGO_URI);

var Exercise = new Schema({
  name: String,
  description: Number,
  tags: [String]
});

var options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS : 30000
    }
  }
};

mongoose.model('exercises', exercise);
mongoose.connect(URI || 'mongodb://localhost/db-name', options);
