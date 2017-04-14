var mongoose    	= require('mongoose')
   ,seller		= mongoose.model('Sellers')
   ,_			= require('underscore')
   ,userRole		= mongoose.model('UserRoles')
   ,user                = mongoose.model('User')
   ,async		=require('async')
   ,bcrypt              =require('bcrypt')
   ,parties		= mongoose.model('Parties');

var encryptPassword =  function(password) {
      if (!password) { return '' }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      return hash;
}

module.exports.filterUserApproval = function (query, callback) { 	

var sellerd = [];
var userd = [];
var partyd = [];
   
var promise = seller.find().select('_id sellerShortName').exec();
       promise.then(function(sellerData){
		console.log(sellerData);
		sellerd = sellerData;

		return user.find().select('username _id').exec();
        }).then(function(userdata){
		console.log(userdata);
		userd = userdata;
		return parties.find().select('partyKey _id').exec()

	}).then(function(partiesdata){
		partyd = partiesdata;
		var object = {sellerNames: sellerd,
			      partyKeys:partyd,
			      userNames:userd			 	
			};		
		callback(null,object);
        });					
}
module.exports.getUserDetails = function (request,callback) {
  var query = request.query;
   var params = [];
    if(query.user !== undefined && query.user !== null )
    {
	if(query.user !== ""){
	params.push({"user":query.user});
	}	
    }
    if(query.userParty !== undefined && query.userParty !== null )
    {
	if(query.userParty !== ""){
	params.push({"party":query.userParty});
	}	
    }
    if(query.seller !== undefined && query.seller !== null )
    {
	if(query.seller !== ""){

		params.push({"sellerId":query.seller});
	}	
    }	
	if(params.length != 0 ){		
    user.find({$and:params})
        .populate({path:'party',select:'_id partyKey'})
	.populate({path:'sellerId',select:'_id sellerShortName'})
        .exec(function(err,data){
		if(!err){
		   console.log(data);
		   callback(null,data);
		}
	 });  
  }else{
	  user.find()
	      .populate({path:'party',select:'_id partyKey'})
	      .populate({path:'sellerId',select:'_id sellerShortName'})
	      .exec(function(err,data){
	if(!err){
	   console.log(data);
	   callback(null,data);
	}
   });  
 

  }	
  
}
module.exports.createUserApproval = function (payload, callback) { 
	console.log(payload);	
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
	var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
        
	
	var object = { username: payload.username,
			hashed_password: encryptPassword(randomstring),
			isOTP: true,
			status:"APPROVED",
			sellerId:payload.sellerId,
			email:payload.emailId,
			party:payload.party		
				
	}
	console.log(object);
	
   user.findOne({username :object.username}).exec(function(err,udata){
   if(!err){
  	if(!udata){
	    user.create(object,function (err, userd) {
		if (!err) {
			console.log('user created');
			var propertydata = {
			userName:object.username,
			password:randomstring	
			};
			var userroleObject = {};			
			if(payload.role != "SiteAdmin"){
			userroleObject= {
			    roleTypeCode : "sellerAdmin",
			    roleType : "SellerAdmin",
			    user : userd._id,
			    userParty :payload.party ,
			    seller : payload.sellerId,
			    startDate : "2014-06-25T12:30:00.000Z",
			    endDate   :  "2016-06-25T12:30:00.000Z",
			    active : true,
			    taskLists : [ 
				{
				    taskList : "catalogueTaskList",
				    displaySeq : 1
				}, 
				{
				    taskList : "CRMTaskList",
				    displaySeq : 2
				}
			    ]
			   };	
			
			}else{
			   userroleObject= {
			    roleTypeCode : "siteAdmin",
			    roleType : "SiteAdmin",
			    user : userd._id,
			    userParty :payload.party ,
			    seller : payload.sellerId,
			    startDate : "2014-06-25T12:30:00.000Z",
			    endDate   :  "2016-06-25T12:30:00.000Z",
			    active : true,
			    taskLists : [ 
				{
				    taskList : "ADMINTaskList",
				    displaySeq : 1
				}
			    ]
			   };	

			}
			userRole.create(userroleObject,function(err,urd){
				if(!err){
				var subject  = "seller Approval by Business Collaboration Technologies PVT.Ltd";
				var description = "";
				var sendmail = require('./sendmaillib');
				var emailtemplate = require('./emailtemplatelib');
				var emailId = payload.emailId;
				var file_path =  'private/template/userpassword.html';
				emailtemplate.generateEmailTemplate(emailId,subject,description,propertydata,file_path
					     ,function(err,data){
						if(!err){
						console.log(data);
						}
				});
					
					callback(null,{sucess:"user created"});
				}
				else{
					callback(err,null);	
				}

			});
			

			
		   }
		else{
			callback(err,null);
		}	
	   });  
        }
     }
  });	
}
module.exports.putUserApproval = function (payload, callback) { 
	console.log(payload);	
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
	var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
        
		
	var object = { userdata:
			{	username: payload.username,
				hashed_password: encryptPassword(randomstring),
				isOTP: true,
				status:payload.status,
				sellerId:payload.sellerId,
				email:payload.emailId,
				party:payload.party,
				pass:randomstring,
		     	},
			userId:payload.userId		
				
		    };	
	console.log(object);
	
   user.findOne({_id :payload.userId}).exec(function(err,udata){
   if(!err){
  	if(udata){
		console.log(udata);	
	    user.update({_id:payload.userId},object.userdata,function (err, userd) {
		if (!err) {
			console.log('user created');
			var propertydata = {
			userName:object.userdata.username,
			password:randomstring	
			};
			if(payload.status != "REQUESTED"){
				var subject  = "seller Approval by Business Collaboration Technologies PVT.Ltd";
				var description = "";
				var sendmail = require('./sendmaillib');
				var emailtemplate = require('./emailtemplatelib');
				var emailId = payload.emailId;
				var file_path =  'private/template/userpassword.html';
				emailtemplate.generateEmailTemplate(emailId,subject,description,propertydata,file_path
					     ,function(err,data){
						if(!err){
						console.log(data);
						}
				});
				callback(null,{sucess:"updated"});

			}
			else{
				var userroleObject = {};			
			if(payload.role != "SiteAdmin"){
			userroleObject= {
			    roleTypeCode : "sellerAdmin",
			    roleType : "SellerAdmin",
			    user : payload.userId,
			    userParty :payload.party ,
			    seller : payload.sellerId,
			    startDate : "2014-06-25T12:30:00.000Z",
			    endDate   :  "2016-06-25T12:30:00.000Z",
			    active : true,
			    taskLists : [ 
				{
				    taskList : "catalogueTaskList",
				    displaySeq : 1
				}, 
				{
				    taskList : "CRMTaskList",
				    displaySeq : 2
				}
			    ]
			   };	
			
			}else{
			   userroleObject= {
			    roleTypeCode : "siteAdmin",
			    roleType : "SiteAdmin",
			    user : userd._id,
			    userParty :payload.party ,
			    seller : payload.sellerId,
			    startDate : "2014-06-25T12:30:00.000Z",
			    endDate   :  "2016-06-25T12:30:00.000Z",
			    active : true,
			    taskLists : [ 
				{
				    taskList : "ADMINTaskList",
				    displaySeq : 1
				}
			    ]
			   };	

			}
			userRole.create(userroleObject,function(err,urd){
				if(!err){
				var subject  = "seller Approval by Business Collaboration Technologies PVT.Ltd";
				var description = "";
				var sendmail = require('./sendmaillib');
				var emailtemplate = require('./emailtemplatelib');
				var emailId = payload.emailId;
				var file_path =  'private/template/userpassword.html';
				emailtemplate.generateEmailTemplate(emailId,subject,description,propertydata,file_path
					     ,function(err,data){
						if(!err){
						console.log(data);
						}
				});
					console.log("user role created");
					callback(null,{sucess:"updated"});
				}
				else{
					callback(err,null);	
				}

			});
		    }			
			
		   }
		else{
			callback(err,null);
		}	
	   });  
        }
     }
  });	
}


