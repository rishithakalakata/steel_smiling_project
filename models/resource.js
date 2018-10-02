var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var resourceSchema = new Schema({
    fileTitle : String,
    file : {type:String,trim:true},
    date   : {type:Date,default:Date.now()},
    owner  : Object
});

var Resource = mongoose.model('resource',resourceSchema);
module.exports = Resource;