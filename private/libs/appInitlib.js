var mongoose    	= require('mongoose')
	,Uid            = mongoose.model('Uids');	

module.exports.getAppInitialized = function (request,reply,callback) {
   
		var createUid = function(cb){
			var date = Date.now();
			var expDate = new Date('Feb 14, 2014 18:39:00');

			Uid.create({creationDate:date,expiryDate:expDate},function(err,data){
					if(!err)
					{
					  cb(data._id);
					}
			});
		}
              	        createUid(function(id)
			{
			    var str = id.toString();
			     
			    UID = {uid:str};	
			   		 
			callback(null,UID);	
			
			});
   
}
