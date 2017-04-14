var mongoose               = require('mongoose')
   ,deliveryTimeSlot       = mongoose.model('DeliveryTimeSlots')
   ,ObjectId               = mongoose.Types.ObjectId;

module.exports.getdeliverytimeslotdetail = exports = function(query, callback) {
          
          deliveryTimeSlot.find({ $and: [ {site : "MYCITYKART"},{ city : query.city }] })
                          .exec(function(err, timeslotDetail){
		               if (!err){
		     		        callback(null,timeslotDetail);
	   	               } else {
	      	               		callback(err,null);
	   	        }
	            });
}

