var mongoose    	= require('mongoose');

module.exports.getDeals = function (request, reply) {
   var libs_path =  '../libs';
   var deallib  =  require(libs_path + '/deallib.js');
        deallib.getdeals(request.query,function(err,data){
		   if (!err) {
                                return reply(data);
                                
			     } else {
			        return reply(err);  
			     } 
        });
    
}


