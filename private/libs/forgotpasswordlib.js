var mongoose    	= require('mongoose')
   ,seller		= mongoose.model('Sellers')
   ,_			= require('underscore')
   ,userRole		= mongoose.model('UserRoles')
   ,user                = mongoose.model('User')
   ,async		=require('async')
   ,bcrypt              =require('bcrypt');

var encryptPassword =  function(password) {
      if (!password) { return '' }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      return hash;
}
module.exports.forgotPassword = function (payload, callback) { 
	
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
	var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
  	var username1 = payload.username;
	var hashed_password1 =  encryptPassword(randomstring);
     user.findOne({"username" : username1}).exec(function(err,udata){
     if(!err){
	if(udata)
        {  console.log(udata)
				var propertydata = {
				userName:username1,
				password:udata.pass	
				};
				var subject  = "Forgot Password sent by Business Collaboration Technologies PVT.Ltd";
				var description = "";
				var sendmail = require('./sendmaillib');
				var emailtemplate = require('./emailtemplatelib');
                                var file_path =  'private/template/userpassword.html';
				emailtemplate.generateEmailTemplate(udata.email,subject,description,propertydata,file_path
					     ,function(err,data){
						if(!err){
						}
				});
				callback(null,userd);
			   
				
		     
         }
	else
	{
		callback(err,null);
	}	
      }
      else
	{
		callback(err,null);
	}
   });	
}


