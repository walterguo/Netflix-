// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
movieList:Object
});

module.exports = mongoose.model('Bear', BearSchema);
