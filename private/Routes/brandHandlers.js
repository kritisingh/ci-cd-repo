var mongoose    	= require('mongoose');

module.exports.getBrands = function (request, reply) {
   var libs_path =  '../libs';
   var brandlib  =  require(libs_path + '/brandlib.js');
   brandlib.getBrandsByCategory(request.query,function(err,data){
	   if (!err) {
		    return reply(data);
       } else {
			return reply(err);  
	   } 
   });
}
