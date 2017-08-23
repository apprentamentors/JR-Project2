var mongoose  = require('mongoose');
var Schema = mongoose.Schema;



var newUrlSchema = new Schema({
    originalUrl: String,
    shortenedUrl: String
});

var newUrl = mongoose.model('newurl', newUrlSchema);

module.exports = newUrl;