var mongoose    	= require('mongoose');

module.exports.getCart = function (request, reply) {
   var libs_path =  '../libs';
   var cartlib  =  require(libs_path + '/cartlib.js');
   var orderlib =  require(libs_path + '/orderlib.js');
	cartlib.getCartDetail(request.query,function(err,data){
		   if (!err) {    
                                   
                                /*_.forEach(data,function(obj) {//console.log(obj.cartLines)
				        cartlines.push(obj);
	                        });*/
                                orderlib.createShoppingCart(data,function(err,data1){
					if (!err) {
					     return reply(data1);
					}else{
					     return reply(err);  
					}
		              });  	                
	           } else {
				return reply(err);  
                   } 
	});
    
}


module.exports.postCart = function (request, reply) {
   var libs_path =  '../libs';
   var cartlib  =  require(libs_path + '/cartlib.js');
	 cartlib.postCartDetail(request.payload,function(err,data){
		   if (!err) {
                    return reply(data);
			     } else {
			        return reply(err);  
			     } 
        });
    
}

module.exports.delCart = function (request, reply) {
	var libs_path =  '../libs';
	 var cartlib  =  require(libs_path + '/cartlib.js');
	 cartlib.deleteCart(request.payload,function(err,data){
		  if (!err) {
		         return reply(data);
			 
		  }else{
			 return reply(err);  
		  }
	 });
}

module.exports.updateCart = function (request, reply) {
	var libs_path =  '../libs';
	 var cartlib  =  require(libs_path + '/cartlib.js');
	 cartlib.updatecart(request.payload,function(err,data){
		  if (!err) {
		         return reply(data);
			 
		  }else{
			 return reply(err);  
		  }
	 });
}

