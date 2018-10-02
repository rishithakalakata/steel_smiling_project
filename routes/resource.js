var express = require('express');
var router = express.Router();
var async = require('async');
var path = require('path');
var passport = require('passport');
var cloudinary = require('cloudinary');
var User = require('../models/user');
var resources = require('../models/resource');
fs = require('fs'),

router.get('/resource',function(req,res,next){
    User.find({_id: {$ne: req.user._id}},(err,user) => {
        if(err) throw err;
        if(user)
        {
            //var data =fs.readFileSync('./public/files/resource.pdf');
            //res.contentType("application/pdf");
            //res.render('resource',{title:"Steel Smiling",header:true,navbar:true,user:user,data:data});

            var data =fs.readFileSync('./public/files/resource.pdf');
            res.contentType("application/pdf");
            res.send(data);
        }

    });
});


module.exports=router;