var mongoose    	= require('mongoose');
var fs                  = require('fs');
var async               = require('async');

module.exports.postimportmodels = function (request, reply) {
    var libs_path =  '../libs';
   //var modellib  =  require(libs_path + '/modellib.js');
   //var userlib   =  require(libs_path + '/userlib.js');
   
       //validateUser(req, res);
     var modellib  =  require(libs_path + '/modellib.js');
     fs.readFile(request.files.myfile.path,'utf8', function (err, data) {
        var obj = JSON.parse(data);
        async.each( obj.entities
                  , function(entity,cb){ 
                     modellib.upsertModel(entity,cb);
                    }
                  , function(err){
                     if (!err) {
	                return reply({code: "Success",message: "Successfully uploaded data."});
                        
	             } else {
	               return reply(err);
                     }
                   });
     });
   
   
}


module.exports.postimportparties = function (request, reply) {
    var libs_path =  '../../libs';
   
     var partylib  =  require(libs_path + '/partylib.js');
     fs.readFile(request.files.myfile.path,'utf8', function (err, data) {
        var obj = JSON.parse(data);
        async.each( obj.Parties
                  , function(party,cb){ 
                     partylib.upsertParty(party,cb);
                    }
                  , function(err){
                     if (!err) {
	                return reply({code: "Success",message: "Party data successfully uploaded."});
                        next();
	             } else {
	               return reply(err);
                     }
                   });
     });
}
