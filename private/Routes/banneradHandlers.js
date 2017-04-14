var mongoose    	= require('mongoose');

module.exports.getBanner = function (request, reply) 
{ 
   var libs_path =  '../libs';
   var bannerlib  =  require(libs_path + '/bannerlib.js');
   bannerlib.getBannerDetail(request.query,function(err,data){
	   if (!err) {
		        return reply(data);
		        
	   } else {
			return reply(err);  
			     
           } 
   });
}
