var mongoose    	= require('mongoose');


module.exports.postOrder = function (request, reply) {
   var libs_path =  '../libs';
   
      var orderlib =  require(libs_path + '/orderlib.js');
      //console.log(req.body.shippingDetail)
      orderlib.getcartDetail(request.payload,function(err,data1){
         var obj={"shippingDetail":request.payload.shippingDetail 
                 ,"cartLines":data1.cartLines
                 };
         obj=JSON.stringify(obj);
         orderlib.createCartOrder(obj,function(err,data){
		if (!err) {
		     return reply(data);
		    
		}else{
		     return reply(err);  
		}
	      });
      });
    
}
 
module.exports.getOrder = function (request, reply) { 
      var libs_path =  '../libs';
      var orderlib =  require(libs_path + '/orderlib.js');
      if(request.query.action === "ORDER-TRACK"){
            orderlib.getCustomersOrders(request.query,function(err,data){
		if (!err) {
		     
		     return reply(data);
		     
		}else{
		     return reply(err);  
		}
	      });

      }else{
      		orderlib.getOrders(request.query,function(err,data){
		if (!err) {
		     
		     return reply(data);
		     
		}else{
		     return reply(err);  
		}
	      });
      }

    
}
  
module.exports.updateOrders = function (request, reply) {
	var libs_path =  '../libs';
	var orderlib =  require(libs_path + '/orderlib.js');
	 orderlib.updateorder(request.payload,function(err,data){
		  if (!err) {
		         return reply(data);
			 
		  }else{
			 return reply(err);  
		  }
	 });
}
   
