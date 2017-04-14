var mongoose    	= require('mongoose');

module.exports.getSiteCategory = function (request, reply) {
   var libs_path =  '../libs';
   if(request.query.action==="SITE-CATEGORY"){
            var sitecategorylib  =  require(libs_path + '/sitecategorylib.js');
		sitecategorylib.getSiteCategoriesDetail(request.query,function(err,data){
			   if (!err) {
				        return reply(data);

				     } else {
					return reply(err);  
				     } 
		});
	   }
   
}


