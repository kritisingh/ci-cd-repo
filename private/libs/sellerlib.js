var mongoose        	= require('mongoose')
   ,ObjectId        	= mongoose.Types.ObjectId
   ,item	    	= mongoose.model('Items')
   ,_		    	= require('underscore')
   ,tradeItem	    	= mongoose.model('TradeItems')
   ,sellerTradeItem 	= mongoose.model('SellerTradeItems')
   ,category            = mongoose.model('Categories')
   ,seller              = mongoose.model('Sellers')
   ,async               = require('async')
   ,sellerlocation      = mongoose.model('SellerLocations')
   ,localities          = mongoose.model('Localities')
   ,partyaddress        = mongoose.model('PartyAddresses');

module.exports.getSkusSellers = exports = function(query, callback){
       
       var sellerids=[];
       var sellerObject = [];
       var sellerTradeItemData = [];
       var sellerData = [];
       if(!query.locality){
	       var promise=sellerTradeItem.find({ $and: [ {tradeItem:query.tradeItem}, {city:query.city} ] })
			                  .exec();
	       promise.then(function(sellertradeItems){
			         _.forEach(sellertradeItems,function(sellers){
			                   //console.log(sellers.sellerId);
			                   sellerids.push(sellers.sellerId);
					   sellerTradeItemData[sellers.sellerId] = sellers; 
			          });
		           for(var i=0; i<sellerids.length; i++) {
					if(sellerids[i] == query.sellerId) {
					    sellerids.splice(i, 1);
					    break;
					}
			   }
	           // console.log(sellerids)
		   async.each(sellerids,function(sellerid,cb){//console.log(sellerid)
		      	 var promise = seller.findOne({ _id: sellerid})
                                             .select('-categories -brands')
			                     .populate({ path: 'party',select: 'group'})
	                                     .populate({ path: 'address'}) 
					     .exec();
			 promise.then(function(sellerdata){
				       sellerData[sellerid]=sellerdata;
			               return partyaddress.findOne({ _id: sellerdata.address._id})
						          .populate({ path: 'city'})
						          .populate({ path: 'locality'})
			                                  .exec();
			      }).then(function(data){//console.log(data)
				       sellerData[sellerid].address=data;
                                       //console.log(sellerData)
				       _.forEach(sellerids,function(sellerId){
						var object = {
								sellerTradeItem       : sellerTradeItemData[sellerId]
					                     ,  sellerParty           : { party :sellerData[sellerId].party
                                                                                        , sellerName:sellerData[sellerId].sellerShortName}
							     ,  DeliverdFromLocation  : sellerData[sellerId].address
							     ,  DeliveryParty         : null
                                                             ,  locationCharges       : null
					                     };
							sellerObject[sellerId] = object;
                                                        //console.log(sellerObject)
				        });
			                cb(null);
				      
			 });
		  },
		   function(err){
			  if(!err){
			       //console.log(sellerObject)
			       var itemsArray = [];
				   
			       var sellerArray = [];
				   _.forEach(sellerids, function(id) {
				      sellerArray.push(sellerObject[id]); 
				   });//console.log(sellerArray);
				   callback(null,sellerArray); 
			   }
		    
		   });
	    });
              
       }
       else{

       var promise=sellerTradeItem.find({ $and: [ {tradeItem:query.tradeItem}, {city:query.city} ] })
                                  .exec();
       promise.then(function(sellertradeItems){
                         _.forEach(sellertradeItems,function(sellers){
                                   //console.log(sellers.sellerId);
                                   sellerids.push(sellers.sellerId);
				   sellerTradeItemData[sellers.sellerId] = sellers; 
                          });
           for(var i=0; i<sellerids.length; i++) {
		if(sellerids[i] == query.sellerId) {
		    sellerids.splice(i, 1);
		    break;
		}
           }
          //console.log(sellerids)
           async.eachSeries(sellerids,function(sellerid,cb){
              var promise= sellerlocation.findOne({ $and: [ {sellerId:sellerid}, {city:query.city},{site:"MYCITYKART"},{locality:query.locality}] })
			                 .populate({ path: 'deliveredByseller'})
			                 .exec();
            promise.then(function(sellerdetail){
                 if(sellerdetail){//console.log(sellerdetail)
                          return sellerdetail ;
                           
                 }else{   //console.log(sellerdetail)
                         return sellerlocation.findOne({ $and: [ {sellerId:sellerid}, {city:query.city},{site:"MYCITYKART"},{locality:''}] })                                          .populate({ path: 'deliveredByseller'})
	 		                      .exec();
               }
               //console.log(sellerdata);
                 }).then(function(sellerdata){
			       checkDeliverySeller(sellerid,sellerdata.deliveredByseller._id,function(err,data){
                                  if(data.flag==true){
                                        getSellerpartyDetail(sellerid,function(err,partydata){ console.log(partydata)
                                             
                                               obj={  sellerTradeItem       : sellerTradeItemData[sellerid]
                                                   ,  sellerParty           : { party      : partydata[sellerid].party,
                                                                                sellerName : partydata[sellerid].sellerShortName
                                                                              } 
                                                   ,  DeliverdFromLocation  : partydata[sellerid].address
                                                   ,  DeliveryParty         : null
                                                   ,  locationCharges       : { shippingCharge : sellerdata.shippingCharges
                                                                              , leadTimeHours  : sellerdata.leadTimeHours
                                                                              , pickFromShop   : sellerdata.pickFromShop
                                                                              , homeDelivery   : sellerdata.homeDelivery
                                                                              } 
                                                             
                                                   };
                                             sellerObject[sellerid] = obj;
                                             cb(null);
                                        });
                                  }else{
                                        getSellerpartyDetail(sellerid,function(err,partydata){
                                          getSellerpartyDetail(sellerdata.deliveredByseller._id,function(err,deliverypartydata){
                                               obj={  sellerTradeItem     : sellerTradeItemData[sellerid]
                                                   ,  sellerParty         : { party      : partydata[sellerid].party,
                                                                              sellerName : partydata[sellerid].sellerShortName
                                                                            }
                                                   ,  DeliverdFromLocation  : deliverypartydata[sellerdata.deliveredByseller._id].address
                                                   ,  DeliveryParty       : { deliveryparty      : deliverypartydata[sellerdata.deliveredByseller._id].party,
                                                                              deliveryPartysellerName : deliverypartydata[sellerdata.deliveredByseller._id].sellerShortName
                                                                              }
                                                   ,  locationCharges     : { shippingCharge : sellerdata.shippingCharges
                                                                            , leadTimeHours  : sellerdata.leadTimeHours
                                                                            , pickFromShop   : sellerdata.pickFromShop
                                                                            , homeDelivery   : sellerdata.homeDelivery
                                                                            }                         
                                                   }
                                             sellerObject[sellerid] = obj;
                                             cb(null);
                                          });
                                        });
                                        
                                  }                       
              
                        });
			      
                 });
          },
	   function(err){
                  if(!err){
                       
                       var itemsArray = [];
                       var sellerArray = [];
			   _.forEach(sellerids, function(id) {
			      sellerArray.push(sellerObject[id]); 

			   });
                           sellerArray = _.filter(sellerArray, function(obj){ return obj.DeliverdFromLocation.locality._id === query.locality; });
                          // console.log(sellerArray);
			   callback(null,sellerArray); 
	           }
	    
	   });
    });
}
           
}

function getSellerpartyDetail(sellerId,cb){
             var sellerData=[]
             var promise=seller.findOne({ _id: sellerId})
                               .select('-categories -brands')
			       .populate({ path: 'party',select: 'group'})
	                       .populate({ path: 'address'})
			       .exec();
             promise.then(function(data){
                      sellerData[sellerId]=data;
                      return partyaddress.findOne({ _id: data.address._id})
				         .populate({ path: 'locality'})
                                         .populate({ path: 'city'})
		       	                 .exec();
            }).then(function(data){
                      sellerData[sellerId].address=data;
                      cb(null,sellerData);
            });
}


function checkDeliverySeller(sellerId,deliverSellerId,cb){
             var sellerId=sellerId.toString();
             var deliverSellerId=deliverSellerId.toString();
             if(sellerId != deliverSellerId){
                       cb(null,{flag:false});
             }else{
                       
			cb(null,{flag:true});
             }
}

module.exports.getSellerDeliveryDetail = exports = function(query, callback){
      var sellerData=[];
      var sellerids=[];

      if(!query.locality){
             getSellerpartyDetail(query.sellerId,function(err,partydata){
                      //console.log(partydata)                    
                      obj={ sellerParty           : { party      : partydata[query.sellerId].party
                                                    , sellerName : partydata[query.sellerId].sellerShortName
                                                    , sellerId   : partydata[query.sellerId]._id
                                                     }
                          , DeliverdFromLocation  : partydata[query.sellerId].address
                          , DeliveryParty         : null
                          , locationCharges       : null
                          }
                      callback(null,obj); 
             });
          
     
      }else{

	      var promise=sellerlocation.findOne({ $and: [ {sellerId:query.sellerId}, {city:query.city},{site:"MYCITYKART"},{locality:query.locality}] })
					.populate({ path: 'deliveredByseller'})
					.exec();
	      promise.then(function(sellerdetail){
		       if(sellerdetail){//console.log(sellerdetail)
		                  return sellerdetail ;
		                   
		       }else{   
		                 return sellerlocation.findOne({ $and: [ {sellerId:query.sellerId}, {city:query.city},{"site":"MYCITYKART"},{locality:''}] }).populate({ path: 'deliveredByseller'})
					              .exec();
		       }
		       //console.log(sellerdata);
	      }).then(function(sellerdata){
                       checkDeliverySeller(query.sellerId,sellerdata.deliveredByseller._id,function(err,data){
                                  if(data.flag==true){
                                        getSellerpartyDetail(query.sellerId,function(err,partydata){
                                             
                                               obj={  sellerParty           : { party      : partydata[query.sellerId].party
                                                                              , sellerName : partydata[query.sellerId].sellerShortName
                                                                              , sellerId   : partydata[query.sellerId]._id
                                                                              }
                                                   ,  DeliverdFromLocation  : partydata[query.sellerId].address
                                                   ,  DeliveryParty         : null
                                                   ,  locationCharges       : { shippingCharge : sellerdata.shippingCharges
                                                                              , leadTimeHours  : sellerdata.leadTimeHours
                                                                              , pickFromShop   : sellerdata.pickFromShop
                                                                              , homeDelivery   : sellerdata.homeDelivery
                                                                              } 
                                                             
                                                   }
                                             callback(null,obj);
                                        });
                                  }else{
                                        getSellerpartyDetail(query.sellerId,function(err,partydata){
                                          getSellerpartyDetail(sellerdata.deliveredByseller._id,function(err,deliverypartydata){
                                               obj={  sellerParty         : { party      : partydata[query.sellerId].party
                                                                            , sellerName : partydata[query.sellerId].sellerShortName
                                                                            , sellerId   : partydata[query.sellerId]._id
                                                                            }
                                                   ,  DeliverdFromLocation  : deliverypartydata[sellerdata.deliveredByseller._id].address
                                                   ,  DeliveryParty       : { deliveryparty      : deliverypartydata[sellerdata.deliveredByseller._id].party
                                                                            , deliveryPartysellerName : deliverypartydata[sellerdata.deliveredByseller._id].sellerShortName
                                                                            ,deliveryPartysellerId  : deliverypartydata[sellerdata.deliveredByseller._id]._id
                                                                            }
                                                   ,  locationCharges     : { shippingCharge : sellerdata.shippingCharges
                                                                            , leadTimeHours  : sellerdata.leadTimeHours
                                                                            , pickFromShop   : sellerdata.pickFromShop
                                                                            , homeDelivery   : sellerdata.homeDelivery
                                                                            }                         
                                                   }
                                             callback(null,obj);
                                          });
                                        });
                                        
                                  }                       
              
                        });
	      });
     }
       
}

module.exports.getSellerDetail = function (request,callback) {
	     
   	     var sellerData=[];
             var promise=seller.findOne({$and:[{ _id: request.query.sellerId},{ cities: request.query.city},{ site: "MYCITYKART"}]})
                               //.select(' categories brands')
			       .populate({ path: 'party',select: 'group'})
	                       .populate({ path: 'address'})
			       .populate({ path: 'categories',select:'_id name'})
			       .populate({ path: 'brands',select:'_id name'})	
			       .exec();
             promise.then(function(sellerDetail){
			//console.log(sellerDetail);

                      sellerData[sellerDetail._id] = sellerDetail;

                      return partyaddress.findOne({ _id: sellerDetail.address._id})
				         .populate({ path: 'locality'})
                                         .populate({ path: 'city'})
		       	                 .exec();
            }).then(function(data){
		      sellerData[request.query.sellerId].address=data;
		      callback(null,sellerData[request.query.sellerId]);
            });

}
module.exports.getSellerList = function (query,callback) {
            var sellerData =[];
            var sellerids  =[];
            var sellerPartyAddressIds = [];
            var sellerAddressData =[];
   	    var promise=seller.find({$and:[{hasStore:true},{cities:query.city}]})
                              .select(' -categories -brands')
			      .populate({ path: 'party',select: 'group'})
	                      .populate({ path: 'address'})
			      .exec();
             promise.then(function(sellerDetails){
			//console.log(sellerDetails);
                    _.forEach(sellerDetails,function(sellerDetail){//console.log(sellerDetail);
                            sellerData[sellerDetail._id] = sellerDetail;
                            sellerids.push(sellerDetail._id);
                            sellerPartyAddressIds.push(sellerDetail.address._id)
	            });//console.log(sellerids)
                      return partyaddress.find({_id: {$in:sellerPartyAddressIds}})
				         .populate({ path: 'locality'})
                                         .populate({ path: 'city'})
		       	                 .exec();
            }).then(function(addresses){//console.log(data)
                      _.forEach(addresses,function(address){
                          sellerAddressData[address._id]= address;
	              });
                      var sellerArray=[];
                      _.forEach(sellerids,function(sellerId){	
		      		sellerData[sellerId].address= sellerAddressData[sellerData[sellerId].address._id];
                                sellerArray.push(sellerData[sellerId]);
		      });
                      sellerArray = _.sortBy(sellerArray, function (obj) { return obj.address.locality.suburb;});
		      //console.log(sellerArray);
		      callback(null,sellerArray);
            });
}

module.exports.getSellerProductDetail = function (request,callback) {
  var query = request.query;
  var  categoryData = [];
  var  brandData    = [];
  var itemsData = [];
  var tradeItemsData = [];
  var ids = [];
  var tradeItemids = [];
		
  var promise = seller.findOne({_id:query.sellerId})
		       .select('_id sellerGroup cities party categories brands')
		       .exec();
  		promise.then(function(data){
			categoryData = data['categories'];
			var catData1 = categoryData[0];
			for(var i = 0;i < categoryData.length-1;i++)
			{
				catData1 = _.union(catData1,categoryData[i+1]);

			}	
			brandData = data['brands'];
			var brandData1 = brandData[0];
			for(var i = 0;i < brandData.length-1;i++)
			{
				brandData1 = _.union(brandData1,brandData[i+1]);
			}
              	return item.find({$and:[{brandId:{$in:brandData1}},{categoryIds:{$in:catData1}}]})
			   .select('brandId categoryIds')
                	   .populate({ path:'brandId',select:'_id name'})
			   .populate({ path:'categoryIds',select:'_id name'})
			   .exec();
   		}).then(function(items){
		   	
		   
                _.forEach(items,function(item){
                      itemsData[item._id]=item;
		      ids.push(item._id);
                 });
                 
          return tradeItem.find({item:{$in:ids}})
                          .select('-variantAttributeSet -variantAttributes -childItems ')
                          .populate({ path:'item',select:'brandId categoryIds'})
                          .exec();
       }).then(function(tradeItems){
		
	      _.forEach(tradeItems,function(tradeItem){ 
		         tradeItemsData[tradeItem._id] = tradeItem;
                         tradeItemsData[tradeItem._id].item = itemsData[tradeItem.item._id];
			 tradeItemids.push(tradeItem._id);
              }); 
               
	     return sellerTradeItem.find({$and:[{tradeItem:{$in:tradeItemids}},{sellerId:query.sellerId}]}).exec();
		
	}).then(function(sellerTradeItems){
		//console.log(sellerTradeItems);
		_.forEach(sellerTradeItems,function(sellerTItem){
			tradeItemsData[sellerTItem.tradeItem].sellers.push(sellerTItem);
		});
	     
          var tradeItemsArray = [];
		_.forEach(tradeItemids,function(id){ 
		         tradeItemsArray.push(tradeItemsData[id]);
              }); 
       		callback(null,tradeItemsArray);

      });
}





