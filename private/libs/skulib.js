var mongoose        	= require('mongoose')
   ,ObjectId        	= mongoose.Types.ObjectId
   ,item	    	= mongoose.model('Items')
   ,itemRelationship    = mongoose.model('ItemRelationships')
   ,_		    	= require('underscore')
   ,tradeItem	    	= mongoose.model('TradeItems')
   ,async               = require('async')
   ,itemSpecification   = mongoose.model('ItemSpecifications')
   ,sellerTradeItem 	= mongoose.model('SellerTradeItems')
   ,seller        	= mongoose.model('Sellers')
   ,featuredItem        = mongoose.model('FeaturedItems');


module.exports.getAssortmentSkus = exports = function(query, callback){
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   // console.log( query)
   itemswhere={"assortments.assortmentId": query.action
                             };
   categorywhere={"categoryIds":query.categoryIds}
   var promise=item.find({ $and: [ itemswhere, categorywhere ] })
                   .limit(query.limit)
                   .exec();
   promise.then(function(items){
                _.forEach(items,function(item){
                      itemsData[item._id]=item;
		      ids.push(item._id);
                 });
          // console.log(ids);
          return tradeItem.find({$and:[{item:{$in : ids},"assortments.assortmentId": query.action}]})
                          .populate({ path:'item'})
                          .limit(query.limit)
                          .exec();
       }).then(function(tradeItems){
	      _.forEach(tradeItems,function(tradeItem){
                         //console.log(tradeItem) 
		         tradeItemsData[tradeItem._id] = tradeItem;
		         tradeItemids.push(tradeItem._id);
              }); 
       return sellerTradeItem.find({ $and: [ { tradeItem:{$in: tradeItemids}},{site: "MYCITYKART" },{city:query.city} ] })                          
                             .populate({ path: 'sellerId' })
                             .exec();
       }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
           var itemsArray = [];
           _.forEach(tradeItemids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });//console.log(itemsArray)
           callback(null,itemsArray); 
        });                                		                  
	 
}

module.exports.getVarientSkus = exports = function(query, callback){
   var itemsData       = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   var itemswhere={};
   if(query._id!=null && query._id!=undefined && query._id!=""  ){
                     itemswhere={_id:query._id};
   }
   var promise=item.find(itemswhere)
                              .limit(query.limit)
                              .exec();
   promise.then(function(items){//console.log(query.tradeitem);
                _.forEach(items,function(item){
                      itemsData[item._id]=item;
		      ids.push(item._id);
                 });
          
          return tradeItem.find({item:{$in:ids}}).populate({ path:'item'}).exec();
       }).then(function(tradeItems){
	      _.forEach(tradeItems,function(tradeItem){ 
		         tradeItemsData[tradeItem._id] = tradeItem;
		         tradeItemids.push(tradeItem._id);
              }); 
       return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: "MYCITYKART" })                          
                                .populate({ path: 'sellerId' })
                                .exec();
       }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
           var itemsArray = [];
           for(var i=0; i<tradeItemids.length; i++) {
		if(tradeItemids[i] == query.tradeitem) {
		    tradeItemids.splice(i, 1);
		    break;
		}
    	   }
           //console.log(tradeItemids);
           _.forEach(tradeItemids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });
           callback(null,itemsArray); 
        });                                		                  
	 
}

module.exports.getSkus = exports = function(query, callback){
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   var itemspecification = [];
   var itemswhere={};
   if(query.categoryIds!=null && query.categoryIds!=undefined && query.categoryIds!=""  ){
                    itemswhere={categoryIds:query.categoryIds};
                    itemtypewhere={itemType:"PRODUCT"};
   }else if(query.brandId!=null && query.brandId!=undefined && query.brandId!=""  ){
                    itemswhere={brandId:query.brandId};
   }else if(query.text!=null && query.text!=undefined && query.text!=""  ){  
        itemswhere ={ "SEOMetaTags.name": "keywords", "SEOMetaTags.content":  { "$regex": query.text, "$options": "i" }}
   }
   var promise=item.find({ $and: [ itemswhere, itemtypewhere ] })
                   .populate({ path: 'categoryIds', select: '_id name categoryType ' })
                   .populate({ path: 'brandId', select: '_id name ' })
                   .limit(query.limit)
                   .exec();
   promise.then(function(items){
                _.forEach(items,function(item){
                      itemsData[item._id]=item;
		      ids.push(item._id);
                 });
          //console.log(ids);
          return tradeItem.find({item:{$in:ids}})
                          //.select('variantAttributeSet variantAttributes')
                          .populate({ path:'item',select:'-name -imagePaths -SEOMetaTags -description -longDescription -tradeItems -features '})                         //.populate({ path:'variantAttributes.attribute',select: ' name'})
                          .populate({ path:'variantAttributes.attrValue',select: ' name'}) 
                          .exec();
       }).then(function(tradeItems){
	      _.forEach(tradeItems,function(tradeItem){ //console.log(tradeItem)
                         itemsData[tradeItem.item._id].tradeItems.push(tradeItem);
		         tradeItemsData[tradeItem._id] = tradeItem;
		         tradeItemids.push(tradeItem._id);
              }); //console.log(tradeItemids)

       return itemSpecification.find({tradeItem: {$in: tradeItemids}}).exec();

       }).then(function(ItemSpecifications){
              _.forEach(ItemSpecifications,function(ItemSpecification){

                var itemSpec1 = _.filter(ItemSpecification.itemSpec, function(item) {
                                      var patt1=new RegExp("FLTR");
                                      if(patt1.test(item.attributeSet)) {
                                           return true; } 
                                      else { return false; }         
                                  });
                tradeItemsData[ItemSpecification.tradeItem].itemSpec = itemSpec1;  
                   
           }); 
             
       return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: query.site })                          
                                .populate({ path: 'sellerId',select:'sellerShortName tradeItem unitSellingPrice' })
                                .exec();
       }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);
                for(i = 0; i < itemsData[sellerTrdItem.item].tradeItems.length; i++) {
                 if (itemsData[sellerTrdItem.item].tradeItems[i]._id === tradeItemid) {
                   //console.log(itemsData[sellerTrdItem.item].tradeItems[i]);
                   itemsData[sellerTrdItem.item].tradeItems[i].sellers.push(sellerTrdItem);
                 } 
               }  
             });
          var itemsArray = [];    
              _.forEach(tradeItemids, function(id) {
                 itemsArray.push(tradeItemsData[id]); 
              });
         
        callback(null,itemsArray);
        });                                		                  
	 
}


module.exports.getCompleteSkuDetail = exports = function(query, callback){  
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   var itemDetail     = {};
   var myDateString = Date();
   if(query._id!=null && query._id!=undefined && query._id!=""){
                     itemwhere={_id:query._id};
   }
   var promise= tradeItem.findOne(itemwhere).select('tradeItemName item marketPrice imagePaths sellers variantAttributes rating')
                         .populate({ path:'item'})
                         .populate({ path:'variantAttributes.attribute',select: '_id name'})
                         .populate({ path:'variantAttributes.attrValue',select: '_id name'}) 
                         .exec();
       promise.then(function(tradeItem){
                         tradeItemsData[tradeItem._id] = tradeItem;
                         tradeItemids.push(tradeItem._id);
                         
              return item.findOne({"_id":tradeItem.item}).select('name brandId categoryIds SEOMetaTags')
                         .populate({ path: 'brandId', select: '_id name' })
                         .populate({ path: 'categoryIds', select: '_id name' })
                         .limit(query.limit)
                         .exec();
       
       }).then(function(item){
              itemsData[item._id]=item;
              itemDetail=itemsData[item._id];
              tradeItemsData[tradeItemids[0]].item=itemsData[item._id];
              return sellerTradeItem.find({ $and: [{ tradeItem: {$in: tradeItemids}}, {site: "MYCITYKART"} ,{ effectiveStartDate:{ $lt: myDateString }},{ effectiveEndDate:{ $gt: myDateString }}] })
                                    .populate({ path:'sellerId'})              
                                    .exec();
        }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
             return seller.findOne({ _id:tradeItemsData[itemwhere._id].sellers[0].sellerId._id })
                          .select('-sellerGroup -brands -categories')
         		  .populate({ path: 'party',select: 'group'})
		          .populate({ path: 'address'})
                          .populate({ path: 'cities'})
			  .exec();
        }).then(function(data){
                   tradeItemsData[itemwhere._id].sellers[0].sellerId=data;  
		   var itemsArray = [];
		   _.forEach(tradeItemids, function(id) {
		      itemsArray.push(tradeItemsData[id]); 
		   });
		   //console.log(itemsArray)
		   callback(null,itemsArray); 
        });                                		                  
	 
}


module.exports.getSkuPriceOnly = exports = function(query, callback){
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   var promise=item.find(query.itemwhere)
                              .limit(query.limit)
                              .exec();
   promise.then(function(items){
                _.forEach(items,function(item){
                      itemsData[item._id]=item;
		      ids.push(item._id);
                 });
          
          return tradeItem.find({item:{$in:ids}})
                          .select('_id marketPrice item sellers')
                          .exec();
       }).then(function(tradeItems){                  
	      _.forEach(tradeItems,function(tradeItem){ 
		         tradeItemsData[tradeItem._id] = tradeItem;
		         tradeItemids.push(tradeItem._id);		                  
              });
          return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site:"MYCITYKART" })
                                .select('_id sellerId unitSellingPrice item tradeItem')
                                .populate({ path: 'sellerId' })
                                .exec();
       }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
           
           var itemsArray = [];
           _.forEach(tradeItemids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });
           callback(null,itemsArray); 
        });                       		                  
	 
}


module.exports.getSkuRelationship = exports = function(query, callback){
                
       var itemsData    = [];
       var ids          = [];
       var itemrelids   = [];	
       var tradeItemids = [];
       var tradeItemsData = [];
      var tradeitemids  = [];
      var promise=itemRelationship.find({"fromTradeItem":query.fromTradeitem
                                        ,"relationshipType":query.action})
                                  .populate({ path: 'toTradeItem' })
                                  //.populate({ path: 'toItem' })
                                  .exec();
         promise.then(function(tradeItems){//console.log(tradeItems)
                 _.forEach(tradeItems,function(tradeItem){ 
                        //console.log(tradeItem.toTradeItem.item);
                         ids.push(tradeItem.toTradeItem.item);
                         tradeItemsData[tradeItem.toTradeItem._id] = tradeItem.toTradeItem;
		         //console.log(tradeItemsData[tradeItem.toTradeItem._id].item);
                         //tradeItemsData[tradeItem.toTradeItem._id].itemdetail.push(tradeItem.toItem);
                         tradeItemids.push(tradeItem.toTradeItem._id);
			});
			//console.log(ids)
                        return item.find({_id:{$in: ids}})
                             .populate({ path: 'categoryIds', select: '_id name categoryType ' })
                             .populate({ path: 'brandId', select: '_id name definition ' })
                             .populate({ path: 'itemSpec.attributeSet', select: '_id name definition displayOnWeb filterBy isVariant' })
                             .populate({ path: 'itemSpec.attributes.attribute', select: '_id name definition ' }) 
                             .populate({ path: 'itemSpec.attributes.attrListValues',select: '_id attributeId name definition '})
                             .exec();    	                              
              }).then(function(items){//console.log(items)
                _.forEach(items,function(item){
                            itemsData[item._id]=item;
			});//console.log(itemsData);
                
                return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, 
                                              site: "MYCITYKART" })                               
                                      .populate({ path: 'sellerId', select: 'party' })
                                      .exec();

       }).then(function(sellerTradeItems){//console.log(sellerTradeItems);
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
             _.forEach(sellerTradeItems,function(sellerTradeItem){
                   console.log(tradeItemsData[sellerTradeItem.tradeItem])
                   tradeItemsData[sellerTradeItem.tradeItem].item=itemsData[sellerTradeItem.item._id];
             });
           
           var itemsArray = [];
           _.forEach(tradeItemids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });
           //console.log(itemsArray);
           callback(null,itemsArray); 
        });
                 		                  
	 
}


module.exports.getComboSku = exports = function(query, callback){
            
       var itemsData    = [];
       var ids          = [];
       var itemrelids   = [];	
       var tradeItemids = [];
       var tradeItemsData = [];
       var promise=tradeItem.find({"_id":query.tradeitem})//.select('-_id childItems')
                            .exec();
       promise.then(function(tradeItems){
             _.forEach(tradeItems,function(tradeItem){
                  tradeItemsData[tradeItem._id] = tradeItem;
                     _.forEach( tradeItem.childItems,function( childItem){
                           tradeItemsData[childItem.tradeItemId] = tradeItem;
                           tradeItemids.push(childItem.tradeItemId);
		     });            
              }); 
              //console.log(tradeItemsData);
           return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: "MYCITYKART"})
                                         .populate({ path: 'sellerId' })
                                         .exec();
        }).then(function(sellerTradeItems){
               //console.log(sellerTradeItems);
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
           
           var itemsArray = [];
           _.forEach(tradeItemids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });
           //callback(null,tradeItemsData[id]); 
        });
}


module.exports.getSkuDetail = exports = function(query, callback){
            
       var itemsData    = [];
       var ids          = [];
       var itemrelids   = [];	
       var tradeItemids = [];
       var tradeItemsData = [];
       var tItem = [];
       var promise=tradeItem.findOne({"_id":query.tradeitem}).populate({ path: 'item' }).exec();
       promise.then(function(tradeItem){//console.log(tradeItem)
            tradeItemsData[tradeItem.item._id]=tradeItem;
            //console.log(tradeItem.item);
            return item.findOne({ _id:tradeItem.item})
                       .populate({ path: 'categoryIds', select: '_id name categoryType ' })
                       .populate({ path: 'brandId',select: '_id name'})
                       .populate({ path: 'itemSpec.attributeSet', select: '_id name definition displayOnWeb filterBy isVariant' })  
                       .populate({ path: 'itemSpec.attributes.attribute', select: '_id name definition ' }) 
                       .populate({ path: 'itemSpec.attributes.attrListValues',select: '_id attributeId name definition '})
                       .exec();
           
        }).then(function(items){
	     ids.push(items._id);
            //console.log(tradeItemsData);
           tradeItemsData[items._id].item=items;
            var itemsArray = [];
           _.forEach(ids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });
           callback(null,itemsArray);
        });
       
}


module.exports.getItemSpecSkus = exports = function(query, callback){
       var itemids=[]; 
       var itemsData=[];
       var tradeitemids=[]; 
       var modelid=[];   
       var promise=item.find({}).exec();
       promise.then(function(items){
              _.forEach(items, function(item) {
                   itemsData[item._id]=item
                   itemids.push(item._id);
                   //console.log(itemsData)
                   //itemsArray.push(tradeItemsData[id]); 
              });//console.log(itemids)
              async.each(itemids,function(item,cb){//console.log(item)
              var promise=tradeItem.find({"item":item}).exec();
              promise.then(function(tradeitems){
		      _.forEach(tradeitems, function(tradeitem) {
		           tradeitemids.push(tradeitem._id);
                           obj={ item:item
                               , tradeItem:tradeitem._id
                               , itemSpec:itemsData[item].itemSpec
                               }
                           itemSpecification.create(obj,function(err,model) {
				     if (!err) {console.log(model._id);
                                        
					
                                        
                                        cb(null);
				     } else {
					//console.log(err);
					cb(null);
				     }
			   });
		            //console.log(obj)
		          // callback(null,modelid);
		      });
              });
	    
	      
	    },
	   function(err){
            console.log(modelid)
	    
           });
       }); 
}

module.exports.getItemSpecification = exports = function(query, callback){
       var promise = itemSpecification.findOne({tradeItem: query.tradeitem})
                                      .populate({ path: 'item'})
                                      .populate({ path: 'tradeItem'})
                                      .populate({ path: 'itemSpec.attributeSet' , select: '_id name'})
                                      .populate({ path: 'itemSpec.attributes.attribute', select: '_id name'})
                                      .populate({ path: 'itemSpec.attributes.attrListValues'}) 
                                      .exec();
       promise.then(function(ItemSpecification){console.log(ItemSpecification)
                callback(null,ItemSpecification);
           }); 
} 

module.exports.getFeaturedSkus = exports = function(query, callback){console.log("HIIII")
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   categorywhere={"entityId":query.categoryId}
   var promise=featuredItem.findOne({ $and: [ categorywhere ] })
                   .limit(query.limit)
                   .exec();
   promise.then(function(items){
                 ids=items.featuredTradeItems;
                 console.log(items.featuredTradeItems);
          return tradeItem.find({$and:[{_id:{$in : ids}}]})
                          .populate({ path:'item'})
                          .limit(query.limit)
                          .exec();
       }).then(function(tradeItems){
	      _.forEach(tradeItems,function(tradeItem){
                         //console.log(tradeItem) 
		         tradeItemsData[tradeItem._id] = tradeItem;
		         tradeItemids.push(tradeItem._id);
              }); 
       return sellerTradeItem.find({ $and: [ { tradeItem:{$in: tradeItemids}},{site: "MYCITYKART" },{city:query.city} ] })                          
                             .populate({ path: 'sellerId' })
                             .exec();
       }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
           var itemsArray = [];
           _.forEach(tradeItemids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });//console.log(itemsArray)
           callback(null,itemsArray); 
        });                                		                  
	 
}

module.exports.getRelatedSkus = exports = function(query, callback){
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   var itemDetail     = {};
   var myDateString = Date();
   if(query._id!=null && query._id!=undefined && query._id!=""){
                     itemwhere={_id:query._id};
   }
   var promise= tradeItem.findOne(itemwhere).select('tradeItemName item marketPrice imagePaths sellers variantAttributes rating')
                         .populate({ path:'item'})
                         .populate({ path:'variantAttributes.attribute',select: '_id name'})
                         .populate({ path:'variantAttributes.attrValue',select: '_id name'}) 
                         .exec();
       promise.then(function(tradeItem){
                         tradeItemsData[tradeItem._id] = tradeItem;
                         tradeItemids.push(tradeItem._id);
                         
              return item.findOne({"_id":tradeItem.item}).select('name brandId categoryIds SEOMetaTags')
                         .populate({ path: 'brandId', select: '_id name' })
                         .populate({ path: 'categoryIds', select: '_id name' })
                         .limit(query.limit)
                         .exec();
       
       }).then(function(item){
              itemsData[item._id]=item;
              itemDetail=itemsData[item._id];
              tradeItemsData[tradeItemids[0]].item=itemsData[item._id];
              return sellerTradeItem.find({ $and: [{ tradeItem: {$in: tradeItemids}}, {site: "MYCITYKART"} ,{ effectiveStartDate:{ $lt: myDateString }},{ effectiveEndDate:{ $gt: myDateString }}] })
                                    .populate({ path:'sellerId'})              
                                    .exec();
        }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
             return seller.findOne({ _id:tradeItemsData[itemwhere._id].sellers[0].sellerId._id })
                          .select('-sellerGroup -brands -categories')
         		  .populate({ path: 'party',select: 'group'})
		          .populate({ path: 'address'})
                          .populate({ path: 'cities'})
			  .exec();
        }).then(function(data){
                   tradeItemsData[itemwhere._id].sellers[0].sellerId=data;  
		   var itemsArray = [];
		   _.forEach(tradeItemids, function(id) {
		      itemsArray.push(tradeItemsData[id]); 
		   });
		   //console.log(itemsArray)
		   callback(null,itemsArray); 
        });                               		                  
	 
}

module.exports.getItems = exports = function(query, callback){
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   var itemspecification = [];
   var itemswhere={};
   if(query.categoryIds!=null && query.categoryIds!=undefined && query.categoryIds!=""  ){
                    itemswhere={categoryIds:query.categoryIds};
                    itemtypewhere={itemType:"PRODUCT"};
   }else if(query.brandId!=null && query.brandId!=undefined && query.brandId!=""  ){
                    itemswhere={brandId:query.brandId};
                    itemtypewhere={itemType:"PRODUCT"};
   }else if(query.text!=null && query.text!=undefined && query.text!=""  ){  
        itemswhere ={ "SEOMetaTags.name": "keywords", "SEOMetaTags.content":  { "$regex": query.text, "$options": "i" }}
        itemtypewhere={itemType:"PRODUCT"};
   }else if(query.itemid!=null && query.itemid!=undefined && query.itemid!=""  ){  
                    itemswhere={_id:query.itemid};
                    itemtypewhere={itemType:"PRODUCT"};
   }
   var promise=item.find({ $and: [ itemswhere, itemtypewhere ] })
                   .populate({ path: 'categoryIds', select: '_id name categoryType ' })
                   .populate({ path: 'brandId', select: '_id name ' })
                   .limit(query.limit)
                   .exec();
   promise.then(function(items){
                _.forEach(items,function(item){
                      itemsData[item._id]=item;
		      ids.push(item._id);
                 });
          console.log(ids);
          return tradeItem.find({item:{$in:ids}})
                          //.select('variantAttributeSet variantAttributes')
                          .populate({ path:'item',select:'-name -imagePaths -SEOMetaTags -description -longDescription -tradeItems -features '})                         //.populate({ path:'variantAttributes.attribute',select: ' name'})
                          //.populate({ path:'variantAttributes.attrValue',select: ' name'}) 
                          .exec();
       }).then(function(tradeItems){
	      _.forEach(tradeItems,function(tradeItem){ //console.log(tradeItem)
                         itemsData[tradeItem.item._id].tradeItems.push(tradeItem);
		         tradeItemsData[tradeItem._id] = tradeItem;
		         tradeItemids.push(tradeItem._id);
              }); console.log(tradeItemids)

       return itemSpecification.find({tradeItem: {$in: tradeItemids}}).exec();

       }).then(function(ItemSpecifications){
              _.forEach(ItemSpecifications,function(ItemSpecification){

                var itemSpec1 = _.filter(ItemSpecification.itemSpec, function(item) {
                                      var patt1=new RegExp("FLTR");
                                      if(patt1.test(item.attributeSet)) {
                                           return true; } 
                                      else { return false; }         
                                  });
                tradeItemsData[ItemSpecification.tradeItem].itemSpec = itemSpec1;  
                   
           }); 
           console.log(itemsData)
       return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: query.site })                          
                                .populate({ path: 'sellerId',select:'sellerShortName tradeItem unitSellingPrice' })
                                .exec();
       }).then(function(sellerTradeItems){ console.log(sellerTradeItems)  
           _.forEach(tradeItemids,function(tradeItemid){ 
               var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
               sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
               console.log(sellerTrdItem)
               for(i = 0; i < itemsData[sellerTrdItem.item].tradeItems.length; i++) {
                 if (itemsData[sellerTrdItem.item].tradeItems[i]._id === tradeItemid) {
                   //console.log(itemsData[sellerTrdItem.item].tradeItems[i]);
                   itemsData[sellerTrdItem.item].tradeItems[i].sellers.push(sellerTrdItem);
                 } 
               }
             });
          var itemsArray = [];    
              _.forEach(ids, function(id) {
                 itemsArray.push(itemsData[id]); 
              });
         
        callback(null,itemsArray);
        });                                 		                  
	 
}


