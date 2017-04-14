var mongoose        = require('mongoose')
   ,localities      = mongoose.model('Localities')
   ,sublocalities   = mongoose.model('SubLocalities')
   ,_		    = require('underscore')
   ,ObjectId        = mongoose.Types.ObjectId;

module.exports.getLocalities = exports = function(request, callback) {
	var query = request.query;
        if(query.city!=null && query.city!=undefined && query.city!=""  ){
                    var citywhere={city:query.city};
        }else if(query.pincode!=null && query.pincode!=undefined){
                    var citywhere={postCode:query.pincode};
        }        
        localities.findOne(citywhere)
              .exec(function(err, obj){
		        if(!err){console.log(obj)
                      		//obj = _.sortBy(obj, function (obj1) { return obj1.suburb;});
                                if(obj){
	     		        	callback(null,{flag:1});
	                        }else{
					callback(null,{flag:0});
                                }
                        } else {
	      	                callback(err,{err:"No localities found for Pin Code"});
	   	        }
	            });
}

module.exports.getSubLocalities = exports = function(request, callback) {
	var query = request.query;
        if(query.locality != null && query.locality !=undefined && query.locality !=""  ){
                    var localitywhere ={postCode:query.locality};
        }        
        sublocalities.find(localitywhere)
              .exec(function(err, obj){
		        if(!err){
                      		obj = _.sortBy(obj, function (obj1) { return obj1._id;});
                                console.log(obj);
	     		        callback(null,obj);
	   	            } else {
	      	                callback(err,{err:"No sub localities found for Pin Code"});
	   	        }
	            });
}

