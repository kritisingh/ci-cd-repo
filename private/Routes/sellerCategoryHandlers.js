"use strict";
var mongoose    = require('mongoose');

module.exports.getSellerCategories = function (request, reply) {
  var libs_path =  '../libs';
   if(request.query.action ==="SELLERCATS"){
	  var sellercategorylib =  require(libs_path + '/sellercategorylib.js');
	  sellercategorylib.getSellerCategories(request.query,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }
}

