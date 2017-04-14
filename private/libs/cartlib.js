var mongoose        	= require('mongoose')
   ,ObjectId        	= mongoose.Types.ObjectId
   ,cart	    	= mongoose.model('Carts')
   ,_		    	= require('underscore')
   ,uid	    	        = mongoose.model('Uids');

module.exports.postCartDetail = exports = function(obj, callback){                
      var cartlines=obj.cartLines;
      var Uid =obj.uid;
      var cartid  = obj.cartId;
      var cartobj = {uid:Uid,cartLines:cartlines};
      var tradeitemids = [];
      var flag = 0;
      cart.find({uid:Uid}).exec(function(err, cartdetail){//console.log(cartdetail.length)
	            if(cartdetail.length){//console.log(cartdetail)
                      /*  for(i=0;i<cartdetail.length;i++){
                                 if( cartdetail[i].cartLines.tradeItemId == cartlines.tradeItemId &&  cartdetail[i].cartLines.sellerId == cartlines.sellerId )
                                {
                                    flag = 1 ; 
                                    return id=obj1;
                                }
                       }*/
                      _.forEach(cartdetail,function(obj1) {//console.log(obj1.cartLines)
				if(obj1.cartLines.tradeItemId == cartlines.tradeItemId && obj1.cartLines.sellerId == cartlines.sellerId )
                                {
                                    flag = 1 ; 
                                    return id=obj1;
                                }
	                });
                       if(flag == 1){
                              /*
                             var quantity =id.cartLines.qty + 1;console.log(quantity+"Already Find");

                             var cartlines1  = { "tradeItemId" : id.cartLines.tradeItemId,
						"qty" : quantity,
						"unitSellingPrice" :id.cartLines.unitSellingPrice,
						"sellerId" : id.cartLines.sellerId,
						"site" : id.cartLines.site,
						"city" : id.cartLines.city
				              };
                             console.log(cartlines1+id.uid+id._id)
                             cart.update({$and:[{uid:id.uid},{_id:id._id}]},{$set:{cartLines:cartlines1}}).exec(function(err,model) {
					     if (!err) { console.log("Record Updated Successfully...")
                                                      callback(null,{sucess:"Record Updated Successfully..."});
		                                     
					     } else {
						console.log(err);
						//callback(err,null,null);
					     }
		 });*/ console.log("Already Updated..");
                           cart.findOneAndUpdate({$and:[{uid:id.uid},{_id:id._id}]},{ $inc: { "cartLines.qty": 1 } },function(err,doc){
					    if(!err){
					       callback(null,{sucess:"Record Updated Successfully..."});
					    }
				    });

                       }
                       else{
                       cart.find({$and:[{uid:Uid},{_id:cartid}]}).exec(function(err, cartDetail){
                            if(cartDetail.length){
				cart.update({$and:[{uid:Uid},{_id:cartid}]},{$set:{cartLines:cartlines}}).exec(function(err,model) {
					     if (!err) {

                                                      callback(null,{sucess:"Record Updated Successfully....................."});
		                                      
					     } else {
						callback(err,null);
						//callback(err,null,null);
					     }
				 });   
                             } else {
      	                        cart.create(cartobj,function(err,model) {
				     if (!err) {
					console.log(model._id);
					callback(null,{"_id":model._id});
				     } else {
					callback(err,null);
					//callback(err,null,null);
				     }
	                        });
   	                     }
				                      
                        }); }
   	            } else {
      	                cart.create(cartobj,function(err,model) {
				     if (!err) {
					console.log(model._id);
					callback(null,{"_id":model._id});
				     } else {
				callback(err,null);
					//callback(err,null,null);
				     }
	                });
   	            }
	        
     });
       
}

module.exports.getCartDetail = exports = function(query, callback){
      var cartlines = [];
      cart.find({uid:query.uid})
          .exec(function(err, cartDetail){
	        if (!err){
                        _.forEach(cartDetail,function(obj) {//console.log(obj.cartLines)
				cartlines.push(obj.cartLines);
	                });
                        callback(null,cartDetail);
   	            } else {
      	                callback(err,null);
   	        }
      });
      
}

module.exports.deleteCart = function (payload,callback) {
	var cartid = payload.cartId;
	cart.remove({_id:cartid},function(err, counter) {
	    if (!err) {  
	             callback(null,{sucess:counter+"rows deleted"});
	    }else {
	       callback(err,null);
	    }
	});    
}


module.exports.updatecart = function (obj,callback) {
	var cartlines=obj.cartLines;
        var Uid =obj.uid;
        var cartid  = obj.cartId;
	cart.update({$and:[{uid:Uid},{_id:cartid}]},{$set:{cartLines:cartlines}}).exec(function(err,model) {
					     if (!err) {

                                                      callback(null,{sucess:"Record Updated Successfully........"});
		                                      
					     } else {
						callback(err,null);
						//callback(err,null,null);
					     }
				 });  
}

