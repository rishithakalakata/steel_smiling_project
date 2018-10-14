var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var resourceSchema = new Schema({
    name : String,
    description : {type:String,trim:true},
    website : String,
});

var Resource = mongoose.model('resource',resourceSchema);
module.exports = Resource;