var mongoose    	= require('mongoose');

module.exports.getServices = function (request, reply) {
      var libs_path =  '../libs';
      var serviceslib =  require(libs_path + '/serviceslib.js');
      
      if(request.query.action==="SERVICE-PROVIDERS"){
                serviceslib.getServiceProviders(request,function(err,data){
			if (!err) {
				return reply(data);
				
			} else {
				return reply(err);  
			} 
		});
      }
      else{
                serviceslib.getServicetradeItems(request.query,function(err,data){
			if (!err) {
				return reply(data);
				
			} else {
				return reply(err);  
			} 
		});

     }
}
module.exports.postService = function (request, reply) {
    var libs_path =  '../libs';
 if(request.payload.action ==="PRICE-REQUEST"){
    	  var sellerlib =  require(libs_path + '/serviceslib.js');
	  sellerlib.priceRequest(request.payload,function(err,data){
			   if (!err) {
			              return reply(data);
		     		      
			   }else{
				      return reply(err);  
			   } 
	  });
 	}
   	
}
