"use strict";
var mongoose = require('mongoose');
var Uid = mongoose.model('Uids');
function getUid(cb){
	var date = Date.now();
	var expDate = new Date('May 14, 2015 18:39:00');
	Uid.create({creationDate:date,expiryDate:expDate},function(err,data){
		
		console.log(err);
		console.log(data);

				if(!err)
				{
				  cb(data._id);
				}
		});


}
module.exports.receiveUid = function (request, reply) {
      getUid(function(id){
	 console.log(request.headers);
	console.log(request.info);	
          reply({uid:id.toString()});
	
      });      


}
function setUidInfo(cb){
var date = Date.now();
		var expDate = new Date('Feb 14, 2015 18:39:00');
/*		var cookieObject = {
				name:'',
			        path:'',
			        domain:'',

		}
*/		Uid.create({creationDate:date,expiryDate:expDate},function(err,data){
					if(!err)
					{
					  cb(data._id);
					}
			});


}
module.exports.sendUid = function (request, reply) {
      getUid(function(id){
	  
          reply({uid:id.toString()});
	
      });      


}
