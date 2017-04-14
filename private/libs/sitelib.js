var mongoose        = require('mongoose')
   ,site            = mongoose.model('Sites')
   ,siteLead        = mongoose.model('SiteLeads')
   ,ObjectId        = mongoose.Types.ObjectId;
   
module.exports.getCatalogueDetail = exports = function(query, callback) {
          var sitewhere  = { _id : query._id};			                           
          site.findOne(sitewhere)
              .populate({ path: 'catalogues'})
              .populate({ path: 'cities'})
              .exec(function(err, cityDetail){
		        if (!err){
                                console.log(cityDetail)
	     		        callback(null,cityDetail);
	   	            } else {
	      	                callback(err,null);
	   	        }
	            });
}

module.exports.postSiteLead = exports = function(obj, callback){
         siteLead.create(obj,function(err,model) {
				     if (!err) {
					callback(null,{"_id":model._id});
				     } else {
					console.log(err);
					//callback(err,null,null);
				     }
	                }); 
}
