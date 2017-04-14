"use strict";
var mongoose = require('mongoose');
module.exports.postSellerParties = function (request, reply) {
 var libs_path =  '../libs';
	console.log("hi");
    if(request.payload.action ==="REGISTRATION"){
	console.log("hi");
	  var registrationlib =  require(libs_path + '/registrationlib.js');
	  registrationlib.createParty(request.payload,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }	
}

