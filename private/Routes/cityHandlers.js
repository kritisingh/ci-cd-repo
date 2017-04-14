var mongoose    	= require('mongoose');

module.exports.getLocality = function (request, reply) {
   var libs_path =  '../libs';
   var citylib  =  require(libs_path + '/citylib.js');
        citylib.getLocalities(request,function(err,data){
		   if (!err) {
                                return reply(data);
                                
			     } else {
			        return reply(err);  
			     } 
        });
    
}

module.exports.getSubLocality = function (request, reply) {
   var libs_path =  '../libs';
   var citylib  =  require(libs_path + '/citylib.js');
        citylib.getSubLocalities(request,function(err,data){
		   if (!err) {
                                return reply(data);
                                
			     } else {
			        return reply(err);  
			     } 
        });
    
}
