var mongoose    	= require('mongoose')
   ,_			= require('underscore')
   ,Party 		= mongoose.model('Parties')
   ,User                = mongoose.model('User')
   ,buyer               = mongoose.model('Buyers')	
   ,async		= require('async')
   ,counter             = mongoose.model('Counters')
   ,bcrypt              = require('bcrypt');

var encryptPassword =  function(password) {
      if (!password) { return '' }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      return hash;
}

function getNextSequence(name,callback) {
  counter.findOneAndUpdate({ _id: name },{ $inc: { seq: 1 } }, {new: true, upsert: true}, function(err,doc){
    if(!err){
      callback(doc.seq);
    }
  });
}
function createUserParty(payload,callback1){
var addressData = [];
payload.createdFor = "MYCITYKART";

Party.findOne({$and:[{partyKey:payload.partyKey},{createdFor:"MYCITYKART"}]}).exec(function(err,pd){
	if(!err){
		if(!pd){
			console.log(pd);	
			getNextSequence("REGISTRATION", function(regNumber){
                		 payload.registrationNo = 100000+regNumber;
	        		 payload.partyType = "person";
				 if(payload.group != undefined){
           				delete payload['group'];
				 }
				Party.create(payload,function(err,pData) {
						console.log("party created");
					if (!err) {
						var Userobject = {
							username:payload.partyKey,
							status: "APPROVED",
							isOTP:"false",
							email:payload.partyKey,
							party:pData._id,
							pageType:"MYCITYKART",
							hashed_password:encryptPassword(payload.password),
							pass:payload.password
						};
						console.log(Userobject);

						User.create(Userobject,function(err,userd){
							if (!err) {
								console.log("user created");
								var Buyerobject = {
									party:pData._id
									,status: "Active"
									,emailId:payload.partyKey
									,firstName:pData.person.firstName
									,lastName:pData.person.lastName
									,mobileNo:""
									

								};	
								buyer.create(Buyerobject,function(err,sbd){
									if (!err) {
										console.log("seller buyer created");
										callback1(null,{sucess:payload.registrationNo});
									}
									else{
										console.log(err);
										callback1(err,null);
									}		
								});
  
						
								
							}
							else{
								console.log(err);
								callback1(err,null);
							}		
						});
					     } else {
							callback1(err);
					     }
				  });  
		 });
                }
		else
		{
		  callback1(null,{sucess:"0"});			
		}
	       }
		else{
			callback1(err,null);

		}

	});
}
module.exports.createParty = function (payload, callback) { 
  console.log("Post called");
  		createUserParty(payload,function(err,gdata){
			if(!err){
				if(gdata.sucess !== "0"){
					callback(null,gdata);

					
				}
				else
				{
					callback(null,{sucess:"0"});
					
				}
			 }
			else
			{
				callback(err,null);
			}	
      		});
}





