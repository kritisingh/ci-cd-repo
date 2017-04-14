var mongoose    	= require('mongoose');

module.exports.getDeliveryTimeSlotDetail = function (request, reply) {
   var libs_path =  '../libs';
   var deliverytimeslotlib  =  require(libs_path + '/deliverytimeslotlib.js');
        deliverytimeslotlib.getdeliverytimeslotdetail(request.query,function(err,data){
		   if (!err) {
                                return reply(data);
                                
			     } else {
			        return reply(err);  
			     } 
        });
    
}


