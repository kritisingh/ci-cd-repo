var mongoose    	= require('mongoose');
module.exports.getITEMs = function (request, reply) {
   var libs_path =  '../libs';
   var skulib =  require(libs_path + '/skulib.js');	
   if(request.query.action==="ITEM-SPEC"){
		skulib.getItemSpecSkus(request.query,function(err,data){
		   if (!err) {
		              return reply(data);
             		      
	           }else{
	    		      return reply(err);  
	           } 
              });

      }else if(request.query.action==="top-selling"||request.query.action==="new-arrivals"){
		skulib.getAssortmentSkus(request.query,function(err,data){
		   if (!err) {
		              return reply(data);
             		      
	           }else{
	    		      return reply(err);  
	           } 
              });

      }else if(request.query.action==="VARIENTS-SKUS"){
		skulib.getVarientSkus(request.query,function(err,data){
		   if (!err) {
		              return reply(data);
             		      
	           }else{
	    		      return reply(err);  
	           } 
              });

      }else if(request.query.action==="FEATURED-SKUS"){
		skulib.getFeaturedSkus(request.query,function(err,data){
		   if (!err) {
		              return reply(data);
             		      
	           }else{
	    		      return reply(err);  
	           } 
              });
      }else{  console.log(request.query) 
	       skulib.getItems(request.query,function(err,data){
		   if (!err) {
		              return reply(data);
             		     
	           }else{
	    		      return reply(err);  
	           } 
              });
      }
   
   
}

   

