var mongoose    	= require('mongoose');


module.exports.getSKUs = function (request, reply) {
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
	      skulib.getSkus(request.query,function(err,data){
			   if (!err) {
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
		      });
      }
   
   
}

module.exports.getSKU = function (request, reply) {
      var libs_path =  '../libs';
      var skulib =  require(libs_path + '/skulib.js');	
      if(request.query.action === "SKU-DETAIL"){
         	skulib.getSkuDetail(request.query,function(err,data){
			if (!err) {
		                return reply(data);
				                         
			} else {
				return reply(err);  
			} 
		});
      }else if(request.query.action==="COMPLETE-DETAIL"){
                skulib.getCompleteSkuDetail(request.query,function(err,data){
			if (!err) {
				return reply(data);
			} else {
				return reply(err);  
			} 
		});
      }else if(request.query.action==="PRICE-DETAIL"){
                skulib.getSkuPriceOnly(request.query,function(err,data){
			if (!err) {
				return reply(data);
			} else {
				return reply(err); 
			} 
		});
      }else if(request.query.action==="RELATED"||request.query.action==="BOUGHT-TOGETHER"){
                
                skulib.getSkuRelationship(request.query,function(err,data){
			if (!err) {
				return reply(data);
			} else {
				return reply(err);  
			} 
		});
      }else if(request.query.action==="COMBO"){
                //console.log(req.query)
                skulib.getComboSku(request.query,function(err,data){
			if (!err) {
				return reply(data);
			} else {
				return reply(err);  
			} 
		});
      }else if(request.query.action==="ITEM-SPEC"){
                //console.log(req.query)
                skulib.getItemSpecification(request.query,function(err,data){
			if (!err) {
				return reply(data);
			} else {
				return reply(err);  
			} 
		});
      }
     
   
}
