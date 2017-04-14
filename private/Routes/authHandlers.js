"use strict";
var mongoose    = require('mongoose')
   ,User        = require('../Models/user')
   ,UserRoles 	= require('../Models/UserRoles')
   ,bcrypt      = require('bcrypt');

var encryptPassword =  function(password) {
      if (!password) { return '' }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      return hash;
}
module.exports.changePassword = function (request, reply) {console.log("hi...")
 	if(request.payload.password != request.payload.vpassword){
	 console.log("password not matched");
		return reply({error:"Confirm password not matched"});
		
	}
	
	
	User.findOne({username:request.payload.username})
	    .exec(function(err,userdata){
		if(!err){
			if(userdata){console.log(userdata)
				if(authenticate(userdata.hashed_password,request.payload.oldpassword)){
				
			            User.update({username:request.payload.username}
				      ,{$set:{"hashed_password":encryptPassword(request.payload.password),"isOTP":"false","status":"APPROVED"
				      ,"pass":request.payload.password}})
		 		   .exec(function(err,data){
					if(!err){             
						return reply({sucess:"Password Sucessfully is changed"})
					} 
				   });
			         }
		        }
		}
		else
		{

				return reply(err);

		}
	});
	
}
var validate = function(value){
if(value === true){
 return value;
}

};

var authenticate = function(hashed_password,plainText) {
        return bcrypt.compareSync(plainText, hashed_password);
}


module.exports.login = function (request, reply) {
  if (request.auth.isAuthenticated) {

       return reply(request.auth.credentials);
    }
    if (request.method === 'post') {
        if (!request.payload.username ||
            !request.payload.password) {
            return reply({error: 'missingUserNamePassword'});
        }
        else {
		
		 var query = User.where( 'username', new RegExp('^' + request.payload.username + '$', 'i') ).where('status',"APPROVED");
               query.findOne(function (err, userd) {
		        if (err) {
                           return reply({error: 'systemError', message: err });
		        } else if (!userd) {
		           return reply({error: 'userNotFound'});
		        } else if (authenticate(userd.hashed_password,request.payload.password) && validate(userd.isOTP)) {
				
				return reply({OTP:true,success:true});
				// screen for set new password
				
		        } else if (authenticate(userd.hashed_password,request.payload.password)){
				//login screen

			        request.auth.session.set(userd);
				return reply(userd);

	                }
			else {


		          return reply({error: 'inCorrectPassword'});
		        }
                     });




            }
     }
};

module.exports.session = function (request, reply){
console.log("session is created");
console.log(request.auth.credentials);  
  return reply(request.auth.credentials);
}

module.exports.logout = function (request, reply) {
    console.log({status: 'successfulInLogout'});
    request.auth.session.clear();
    return reply({status: 'successfulInLogout'});
};
