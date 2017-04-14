var mongoose    	= require('mongoose');

module.exports.getCategory = function (request, reply) {
   var libs_path =  '../libs';
   if(request.query.action==="CATEGORY"){
            var categorylib  =  require(libs_path + '/categorylib.js');
		categorylib.getCategoriesDetail(request.query,function(err,data){
			   if (!err) {
				        return reply(data);

				     } else {
					return reply(err);  
				     } 
		});
	   }
   else if(request.query.action==="CATEGORY-DEPARTMENT")
   {	   
	   var categorylib  =  require(libs_path + '/categorylib.js');
		categorylib.getSegmentCategoriesDetail(request.query,function(err,data){
			   if (!err) {
				        return reply(data);

				     } else {
					return reply(err);  
				     } 
		});
   }
   else{
	   var brandlib  =  require(libs_path + '/brandlib.js');
		brandlib.getCategoriesByBrand(request.query,function(err,data){
			   if (!err) {
				        return reply(data);

				     } else {
					return reply(err);  
				     } 
		});
	   }
  
}


