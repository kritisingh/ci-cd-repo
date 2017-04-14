var mongoose    	= require('mongoose');

module.exports.getCatalogue = function (request, reply) {
   
   var libs_path =  '../libs';
   var sitelib  =  require(libs_path + '/sitelib.js');
       sitelib.getCatalogueDetail(request.query,function(err,data){
		   if (!err) {
                                return reply(data);
                                
	           } else {
			        return reply(err);  
         	   } 
        });
}

module.exports.postsiteLead = function (request, reply) {
   var libs_path =  '../libs';
   var sitelib  =  require(libs_path + '/sitelib.js');
	 sitelib.postSiteLead(request.payload,function(err,data){
		   if (!err) {
                                return reply(data);
                                
			     } else {
			        return reply(err);  
			     } 
        });
}
