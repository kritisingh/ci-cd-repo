var mongoose        	= require('mongoose')
   ,ObjectId        	= mongoose.Types.ObjectId
    ,_		    	= require('underscore')
   ,async               = require('async')
   ,orderHeader         = mongoose.model('OrderHeaders')
   ,orderLine           = mongoose.model('OrderLines')
   ,orderAdjustment     = mongoose.model('OrderAdjustments')
   ,orderCharge         = mongoose.model('OrderCharges')
   ,orderHeaderSearch   = mongoose.model('OrderHeaderSearches')
   ,tradeItems	    	= mongoose.model('TradeItems')
   ,sellerTradeItem 	= mongoose.model('SellerTradeItems')
   ,sellerlocation      = mongoose.model('SellerLocations')
   ,Seller 	        = mongoose.model('Sellers')
   ,counter             = mongoose.model('Counters')
   ,cart	    	= mongoose.model('Carts')
   ,partyRelationShip   = mongoose.model('PartyRelationships')
   ,buyer               = mongoose.model('Buyers')
   ,lsp                 = mongoose.model('LogisticServiceProviders')
   ,sellerlsp           = mongoose.model('SellerLSPs')
   ,partyaddress        = mongoose.model('PartyAddresses') ;


function getNextSequence(name,callback) {
  counter.findOneAndUpdate({ _id: name },{ $inc: { seq: 1 } }, {new: true, upsert: true}, function(err,doc){
    if(!err){
      callback(doc.seq);
    }
  });
}

function getSellerParty(sellerId,customerlocality,customercity,cb){ //console.log(sellerId ,customerlocality,customercity)

     
    Seller.findOne({_id: sellerId}).select('_id party cities address')
                                .exec(function(err,seller){ //console.log(seller)
       if(!err){ 
          sellerlsp.findOne({seller :sellerId,city:customercity})
                   .populate({ path: 'lsp'})
                   .exec(function(err,sellerLsp){
                          if(!err){//console.log(sellerLsp)
                             cb(null, {lspNumber:sellerLsp.lsp.LSPNumber,lsp:sellerLsp.lsp._id,lspparty:sellerLsp.lsp.party,sellerAddress:seller.address,partyId: seller.party,locationId:customerlocality,sellerId:seller._id,deliveredByseller:sellerId} );  
                             // console.log(returnArray);
			 }else{
                             cb(err,null);
                         }
            }); 
          
                    
       
       }else {
          cb(err,null);
       }
 });
}

function createOrder(orders,cb){//console.log("Hi.......");
  async.eachSeries(orders,function(order,cb){  
    orderHeader.create(order.orderHeader,function(err,ord){
      if(!err) {
         order.orderSearch.orderId = ord._id;
         orderHeaderSearch.create(order.orderSearch,function(err){
           if(!err){
                // cb(null);
           }else {
             //console.log(err);
             cb(err)
           }
         });
         //order.orderCharges.chargedEntityId = ord._id; 
         // console.log(order);
         for(i =0; i < order.orderLines.length; i++) {
           order.orderLines[i].orderId = ord._id; 
         }
         
         orderLine.create(order.orderLines,function(err){
           if(!err){
                // cb(null);
           }else {
             //console.log(err);
             cb(err)
           }
         });

         /*orderCharge.create(order.orderCharges,function(err){
           if(!err){ 
                 //cb(null);
           }else {
             console.log(err);
             cb(err)
           }
         });*/
        cb(null);
        
      } else {
        cb(err)
      }
    });
  },
  function(err){
    if(!err){ cb(null); } else { cb(err); }
  });
}



function getSellerPrice(tradeItemId,sellerId,city,site,cb){
         sellerTradeItem.findOne({"tradeItem":tradeItemId,"sellerId":sellerId,"city":city,"site":site})
                        .exec(function(err,seller){
                              cb(null, {sellerPrice:seller.unitSellingPrice});
                             // console.log(returnArray);
                         }); 
         //console.log(returnArray);              
         
}

function checkpartyRelationship(partyid,reltype,ofpartyid,addressid,custNumber,cb){
    partyRelationShip.findOne({partyId: partyid,relationshipType: reltype,  ofPartyId: ofpartyid})
                        .exec(function(err,seller){
                           if(seller){
                              // console.log("PartRelationship already Exists");
                              //cb(null, {sucess:"PartRelationship already Exists"});
                             // console.log(returnArray);
                           }else{
                                  var data={ partyId: partyid
                			                   , relationshipType: reltype
                			                   , ofPartyId: ofpartyid
                                           }
                                  partyRelationShip.create(data,function(err,prd){
					if(!err){
					// console.log("seller party created");
					//cb(null,{sucess:"sucessfully created party"});
			                 }
					else{
						cb(err,null);
					}

				  });
                           }                         
     });
      buyer.findOne({partyId: partyid})
                        .exec(function(err,Buyer){
                           if(Buyer){  //console.log("Buyer already Exists");
                              cb(null, { custNumber:Buyer.accountNumber,BuyerAddress:addressid,BuyerpartyId: Buyer.partyId,Buyerid:Buyer._id} );
                             // console.log(returnArray);
                           }else{
                                  var data ={partyId: partyid
                                             ,profileClass:" General" 
                                             ,status:	       "ACTIVE"
                                             ,accountNumber :custNumber
                                             ,address: addressid
					    };//console.log(data);
                                  buyer.create(data,function(err,prd){
					if(!err){
					//console.log("Buyer party created");
					 cb(null, {custNumber:prd.accountNumber, BuyerAddress:addressid,BuyerpartyId: prd.partyId,Buyerid:prd._id} );
			                 }
					else{ //console.log(err)
						cb(err,null);
					}

				  });
                           }                         
    });       
		
} 

function checkbuyer(party,partyaddress,cb){
    buyer.findOne({partyId: party,address: partyaddress})
                        .exec(function(err,buyer){
                           if(buyer){console.log("Buyer already Exists");
                              cb(null, {sucess:"Buyer already Exists"});
                             // console.log(returnArray);
                           }else{
                                  var data ={partyId: partyId,address: partyaddress}
                                  partyRelationShip.create(data,function(err,prd){
					if(!err){
					// console.log("Buyer party created");
					cb(null,{sucess:"sucessfully created Buyer"});
			                 }
					else{
						cb(err,null);
					}

				  });
                           }                         
    }); 
		
} 

module.exports.getcartDetail = exports = function(obj,callback){
   var cartlines=[];
   cart.find({"uid":obj.uid}).exec(function(err,cartDetail){
            if(!err){
                  _.forEach(cartDetail,function(obj) {
				cartlines.push(obj.cartLines);
	            });
                   callback(null,{cartLines:cartlines});
            }else{ 
                   callback(err,null);
            }
   });
}

module.exports.createCartOrder = exports = function(obj,callback){
   
   var obj=JSON.parse(obj);
   console.log(obj);
   var myString   = obj.shippingDetail.fullName;
   var mySplitResult = myString.split(" ");
  // console.log(mySplitResult[0],mySplitResult[1])
   var partylib  =  require('./partylib.js');
   getNextSequence("SELLERPARTY", function(custNumber){
      var customer  =  {party: { partyType: "Person"
                            , registrationNo :custNumber
                            , partyKey:  obj.shippingDetail.emailId
                            , person:    {firstName : mySplitResult[0],lastName : mySplitResult[1],fullName : obj.shippingDetail.fullName }
                            , electronicAddress: [{ electronicType: "EMAIL"
                                                  , eAddress:       obj.shippingDetail.emailId
                                                  }]
                            , contactNumber: [{ contactType: "MOBILE"
                                              , contactNum:  obj.shippingDetail.mobileNumber
                                              }]
                            , partyRoles: ["Consumer"]
                            }
                    , address: {party:         ""
                               ,purposes:      [{usage: "DELIVERY"}]
			       ,addressLine1:  obj.shippingDetail.address
			       ,locality:      obj.shippingDetail.locality
                               ,subLocality:   obj.shippingDetail.sublocality
                               ,society:       obj.shippingDetail.society
                               ,postalCode:      obj.shippingDetail.postcode
                               ,wing:          obj.shippingDetail.wing
                               ,flatNo:        obj.shippingDetail.flatNo
                               ,city:          obj.shippingDetail.city
			       } 
                    };
   partylib.createParty(customer,function(err,data){
     if (!err){ //console.log(data)
	  var sellerIds = _.map(obj.cartLines,function(line){ return line.sellerId; });
          var sellerIds = _.uniq(sellerIds);
          //console.log(sellerIds); 
          var orders    = []
          getNextSequence("ORDER", function(orderNumber){
             var orderNum = orderNumber;
             var childOrderNum = 0;
             
             async.eachSeries(sellerIds, 
                        function(sellerId,cb1){
				
                         getSellerParty(sellerId,customer.address.locality,obj.shippingDetail.city,function(err,seller){
                         if(!err) {//console.log(seller)
			    var partyid = data.partyId;
			    var reltype = "SELLERPARTY";
			    var ofPartyid = seller.partyId ;
                            var addressid= data.addressId ;
                           checkpartyRelationship(partyid,reltype,ofPartyid,addressid,custNumber,function(err,buyer){ //console.log(buyer)               	
                             var orderFlowStatus = "NEW";
                             var orderFlowStatusReason = null;
                             childOrderNum++;
                             var orderNum   = orderNumber+(childOrderNum/10);
                             //prepare Line data
                             var orderLines = [];
                             var orderCharges = [];
                             var lineNum    = 0;
                             
                             async.eachSeries(obj.cartLines,function(cartLine,cb){
                                   
                                   
		                   if(cartLine.sellerId == sellerId){
		                   	
			               getSellerPrice(cartLine.tradeItemId,cartLine.sellerId,cartLine.city
				                                               ,cartLine.site,function(err,price){
                                          
				          lineNum++;
                                          orderLines.push({orderId:            null
                                                          ,lineNumber:         lineNum
                                                          ,tradeItem:          cartLine.tradeItemId
                                                          ,orderQty:           cartLine.qty
                                                          ,unitListPrice:      price.sellerPrice
                                                          ,unitSellingPrice :  price.sellerPrice
                                                          ,seller:             cartLine.sellerId
							  ,lineFlowStatus:     orderFlowStatus
							  ,site :               "MYCITYKART" 
				           });
				           
                                           cb(null);
                                           
				        });
		                    } else {
		                    	cb(null);
		                    }
                                    
		                    
		                  },
		               function(err){
		                  if(!err){//console.log(seller)
                                       var orderHeaderSearch= {  orderId:                    null 
						                ,orderNumber :               orderNumber
								,orderSeq :                  orderNum
								,buyer :                     buyer. Buyerid
								,buyerParty :                buyer. BuyerpartyId
								,buyerAccountNumber:         buyer.custNumber
								,buyerPartyName :            myString
								,buyerPartyEmail :           obj.shippingDetail.emailId
								,buyerPartyMobileNum :       obj.shippingDetail.mobileNumber
								,buyerPartyPostalCode :      obj.shippingDetail.postcode
								,buyerPartySociety :         obj.shippingDetail.society
								,buyerPartyAddress :         buyer.BuyerAddress
								,seller :                    seller.sellerId
								,sellerParty :               seller.partyId
								,sellerPartyAddress :        seller.sellerAddress
								,lsp :                       seller.lsp
								,lspNumber :                 seller.lspNumber
								,lspParty :                  seller.lspparty
								,orderFlowStatus :           orderFlowStatus
								}        
                                    
			             orders.push({ orderHeader:{orderNumber :               orderNumber
								,orderSeq :                 orderNum
								,buyer :                    buyer. Buyerid
								,buyerParty :               buyer. BuyerpartyId
								,buyerPartyAddress :        buyer.BuyerAddress
								,seller :                   seller.sellerId
								,sellerParty :              seller.partyId
								,sellerPartyAddress :       seller.sellerAddress 
								,orderFlowStatus :          orderFlowStatus
								,orderFlowStatusReason :    orderFlowStatusReason
                                                                ,lsp :                      seller.lsp
                                                                ,lspParty :                 seller.lspparty
								,site :                     "MYCITYKART"
							      }
						 ,orderLines:       orderLines
                                                 ,orderSearch :     orderHeaderSearch
						// ,orderAdjustments: []
				      		 /*,orderCharges:  {chargeType:           "shipping" 
								 ,chargeCode:           "shipping" 
								 ,chargedEntity:        "ORDER" 
								 ,chargedEntityId:      null
								 ,chargeUnit:           "flat" 
								 ,chargeRate:           seller.shippingCharges
								 ,chargeStatus:         "APPLIED"
								 ,changeReason:        null   
								 }*/
				               });
			               cb1(null);
                                   } else { cb1(err); }
                                });
                           }); } else {
                              cb1(err,null);
                            }
                          });
                        },
		        function(err){
			    if (!err) {
                              //callback(null,orders);
                              createOrder(orders,function(err){
		                 if(!err){
		                    callback(null,{orderNumber: orderNumber}); //{orderNumber: orderNumber}
		                 } else {
		                    callback({"error":err},null);
		                 }
                               });
			     } else {
				callback({"error":err});
			     }
		       });
           });
     }else{
       callback({"error":err},null); 
     } 
   });
 });  
}

function getSellerTradeitemDetail(tradeItemId,sellerId,qty,city,site,cartid,cb){
       	 var price,sellerId,tradeItem,tradeItemName,image;
         //console.log(tradeItemId +""+sellerId);
         var returnObj    = {};
         var returnArray  = [];
         sellerTradeItem.findOne({"tradeItem":tradeItemId,"sellerId":sellerId,"city":city,"site":site})
                        .populate({ path: 'item'})
                        .populate({ path: 'tradeItem'})
                        .populate({ path: 'sellerId'})		     
                        .exec(function(err,seller){//console.log(seller)
                                returnObj.tradeItemId=seller.tradeItem._id;
				returnObj.tradeItemName=seller.tradeItem.tradeItemName;
				returnObj.qty=qty;
                                returnObj.marketPrice=seller.tradeItem.marketPrice;
				returnObj.price=seller.unitSellingPrice; 
				returnObj.sellerId=seller.sellerId._id;
                                returnObj.sellerData=seller.sellerId;
                                returnObj.image=seller.item.imagePaths;
                                returnObj.cartId=cartid;
				//returnArray.push(returnObj); 
				cb(null, returnObj);
                             // console.log(returnArray);
                         }); 
         //console.log(returnArray);              
         
}

module.exports.createShoppingCart = exports = function(cartItems,callback){
         var orderdata    = [];
         var returnObj    = {};
         var returnArray  = [];
         var sellerId,tradeItemId;
         // console.log(cartItems)
	 async.each(cartItems,
                 function(cartItem, cb) {
                           var tradeItemId=cartItem.cartLines.tradeItemId;
                           var sellerId=cartItem.cartLines.sellerId;                              
                           var qty=cartItem.cartLines.qty;
                           var city=cartItem.cartLines.city;
                           var site=cartItem.cartLines.site;
                           var cartid=cartItem._id;
                             // console.log(tradeItemId +""+sellerId);
                            getSellerTradeitemDetail(tradeItemId,sellerId,qty,city,site,cartid,function(err,sellers){
                                   if(!err) {
                                      //console.log(sellers);
                                      var promise=Seller.findOne({ _id: sellers.sellerData._id})
                                                        .select('-brands -categories')
						        .populate({ path: 'party',select:'group'})
		                                        .populate({ path: 'cities'})
						        .exec();
                                      promise.then(function(data){
                                               sellers.sellerData=data;
                                               returnArray.push(sellers);//console.log(returnArray); 
                                               cb(null);
                                     });                                     
                                   } else {
                                      cb(err,null);
                                   }
                             
                             });
                        },function(err) {
                            if(!err){
                                     //console.log(returnArray);
                                     //console.log(returnArray);
		                     callback(null,returnArray); //{orderNumber: orderNumber}
		                 } else {
		                     callback(err,null);
		                 }
          });
}


module.exports.getOrders = function (query,callback) {
	//console.log("hi");	
var orderHeadersData = [];
 var orderHeaderIds = [];
 var orderLineIds   = [];
 var orderLineHeader = [];
 var partyaddressInfo = [];
 var partyIds = [];

 var promise = orderHeader.find({orderNumber:query.orderId})
			  .populate({path:'buyerParty'})
			  .populate({path:'buyerPartyAddress'})
			  .populate({path:'seller',select:'sellerShortName'})
			  .populate({path:'sellerPartyAddress'})	 	
			  .populate({path:'lsp'})	 	
			  .populate({path:'lspParty'})
			 .exec();
 promise.then(function(orderHeaders){
	
	_.forEach(orderHeaders,function(orderHeader){
		//console.log(orderHeader);
		var object = {
		orderHeader : orderHeader,
		orderLines : [],
		orderCharges: []							
		};
		orderHeadersData[orderHeader._id]= object;
		orderHeaderIds.push(orderHeader._id);
		partyIds.push(orderHeadersData[orderHeader._id]['orderHeader']['buyerPartyAddress']['_id']); 
	});
	return partyaddress.find({_id:{$in:partyIds}})
		    .populate({path:'city'}) 	
		    .exec();
   }).then(function(partyaddressData){	//console.log(partyaddressData)
		_.forEach(partyaddressData,function(paddress){
			partyaddressInfo[paddress._id] = paddress;
		});	
	return  orderLine.find({orderId:{$in:orderHeaderIds}})
 			 .populate({path:'tradeItem',select:'_id tradeItemName '})
			 .exec();			
    }).then(function(orderlines){
		_.forEach(orderlines,function(orderline){
			orderHeadersData[orderline.orderId].orderLines.push(orderline);
			orderLineIds.push(orderline._id);
			orderLineHeader[orderline._id]=orderline.orderId;
		});
		var orderDetails = [];
		_.forEach(orderHeaderIds,function(orderHeaderId){
		      orderHeadersData[orderHeaderId]['orderHeader']['buyerPartyAddress'] = partyaddressInfo[orderHeadersData[orderHeaderId]['orderHeader']['buyerPartyAddress']['_id']];	
 		      orderDetails.push(orderHeadersData[orderHeaderId]);
		});
		callback(null,orderDetails);
 });

}


module.exports.updateorder = function (obj,callback) {
   var orderids = [];
   orderHeader.find({ orderNumber: obj.orderId })
              .exec(function(err,orders){
                 if(!err){
                        _.forEach(orders,function(order){
				orderids.push(order._id)
			});
		      orderHeader.update({ orderNumber: obj.orderId },{$set:{orderFlowStatus:"OPEN",
                  scheduledDeliveryDate:obj.scheduledDeliveryDate,scheduledDeliverySlot:obj.scheduledDeliverySlot}},{multi:true}).exec(function(err,model) {
				     if (!err) { 

                                             orderHeaderSearch.update({ orderNumber: obj.orderId },{$set:{orderFlowStatus:"OPEN"}},{multi:true}).exec(function(err,model) {
						     if (!err) { 
                                                        orderLine.update({orderId:{$in:orderids}},{$set:{lineFlowStatus:"OPEN"}},{multi:true}).exec(function(err,model) {
							     if (!err) { 
		                                                      cart.remove({uid:obj.Uid},function(err, counter) {
									    if (!err) {                                                              
		                                       			       callback(null,{sucess:"Record Updated Successfully...........\n" + counter+"rows deleted"});
									    }else {
									       callback(err,null);
									    }
								      });							      
							     } else {
								callback(err,null);
								//callback(err,null,null);
							     }
			                                 }); 							      
						     } else {
							callback(err,null);
							//callback(err,null,null);
						     }
			                    }); 
                                             
				     } else {
					callback(err,null);
					//callback(err,null,null);
				     }
			}); 
                 }else{
                     callback(err,null);
                 }
     }); 

}



module.exports.getCustomersOrders = function (query,callback) {
	// console.log("hi");	
var orderHeadersData = [];
 var orderHeaderIds = [];
 var orderLineIds   = [];
 var orderLineHeader = [];
 var partyaddressInfo = [];
 var partyIds = [];

 var promise = orderHeaderSearch.find({ $and: [{orderNumber: query.orderId}, {buyerPartyEmail:query.emailId }]})
                                .populate({path:'buyerParty'})
			        .populate({path:'buyerPartyAddress'})
			        .populate({path:'seller',select:'sellerShortName'})
			        .populate({path:'sellerPartyAddress'})	 	
			        .populate({path:'lsp'})	 	
			        .populate({path:'lspParty'})
			  	.exec();
 promise.then(function(orderHeaders){
	_.forEach(orderHeaders,function(orderHeader){
		// console.log(orderHeader);
		var object = {
		orderHeader : orderHeader,
		orderLines : [],
		orderCharges: []							
		};
		orderHeadersData[orderHeader.orderId]= object;
		orderHeaderIds.push(orderHeader.orderId);
	});
	return  orderLine.find({orderId:{$in:orderHeaderIds}})
 			 .populate({path:'tradeItem',select:'_id tradeItemName '})
			 .exec();			
    }).then(function(orderlines){
		_.forEach(orderlines,function(orderline){
			orderHeadersData[orderline.orderId].orderLines.push(orderline);
			orderLineIds.push(orderline._id);
			orderLineHeader[orderline._id]=orderline.orderId;
		});
		var orderDetails = [];
		_.forEach(orderHeaderIds,function(orderHeaderId){
		      orderDetails.push(orderHeadersData[orderHeaderId]);
		});
		callback(null,orderDetails);
 });
	
}
