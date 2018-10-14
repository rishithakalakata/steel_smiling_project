var express = require('express');
var router = express.Router();
var async = require('async');
var path = require('path');
var passport = require('passport');
var cloudinary = require('cloudinary');
var User = require('../models/user');
var Resource = require('../models/resource');
var db   = require('../secure/db');
fs = require('fs'),

router.get('/resource',function(req,res,next){
    User.find({_id: {$ne: req.user._id}},(err,user) => {
        if(err) throw err;
        if(user)
        {
            db.findAll(Resource)
                .then(function(data){
                    console.log(data);
                    res.render('resource',{title:"Steel Smiling",user:req.user,header:true,navbar:true,resources:data});
                })
                .catch(function(err){
                    next(err);
                });
            }
            else {
            throw(err);
        }
    });
});

router.post('/saveresource',function(req,res,next) {

    var name = req.body.name;
    var description = req.body.description;
    var website = req.body. website;

    async.waterfall([
        function (callback) {
            var newResource = new Resource();
            newResource.name = name;
            newResource.description = description;
            newResource.website = website;
            newResource.save((err, data) => {
                if (err) res.send({msg: "Something went wrong", success: false});
                if (data) callback(null, data);
                console.log(data);
            });
        },
    ]);



});


module.exports=router;