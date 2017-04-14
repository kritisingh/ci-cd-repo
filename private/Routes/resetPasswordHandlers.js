"use strict";
var mongoose = require('mongoose');

module.exports.putForgotPassword = function (request, reply) {
 var libs_path =  '../libs';console.log("Hi")
    if(request.payload.action ==="FORGOTPASSWORD"){
	
	  var forgotpasswordlib =  require(libs_path + '/forgotpasswordlib.js');
	  forgotpasswordlib.forgotPassword(request.payload,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }	
}
