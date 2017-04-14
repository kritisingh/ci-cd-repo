"use strict";
var mongoose    = require('mongoose');

module.exports.getSellerBrands= function (request, reply) {
  var libs_path =  '../libs';
   if(request.query.action ==="SELLERBRANDS"){
	  var sellerbrandlib =  require(libs_path + '/sellerbrandlib.js');
	  sellerbrandlib.getSellerBrands(request.query,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }
}

