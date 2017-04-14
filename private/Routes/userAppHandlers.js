"use strict";
var mongoose = require('mongoose');

module.exports.postUserApproval = function (request, reply) {
 var libs_path =  '../libs';
    if(request.payload.action ==="USERAPPROVAL"){
	console.log("hi");
	  var userapprovallib =  require(libs_path + '/userapprovallib.js');
	  userapprovallib.createUserApproval(request.payload,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }	
}
module.exports.getUserApproval = function (request, reply) {
 var libs_path =  '../libs';
    if(request.query.action ==="USERDETAIL"){
	console.log("hi");
	  var userapprovallib =  require(libs_path + '/userapprovallib.js');
	  userapprovallib.getUserDetails(request,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }
   if(request.query.action ==="FILTERUSERDETAIL"){
	console.log("hi");
	  var userapprovallib =  require(libs_path + '/userapprovallib.js');
	  userapprovallib.filterUserApproval(request.query,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }	
	
}
module.exports.putUserApproval = function (request, reply) {
 var libs_path =  '../libs';
    if(request.payload.action ==="UPDATEUSERAPPROVAL"){
	console.log("hi");
	  var userapprovallib =  require(libs_path + '/userapprovallib.js');
	  userapprovallib.putUserApproval(request.payload,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
    }	
}
