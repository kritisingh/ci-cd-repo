var mongoose        	= require('mongoose')
   ,ObjectId        	= mongoose.Types.ObjectId
   ,restify         	= require('restify')
   ,item	    	= mongoose.model('Items')
   ,itemRelationship    = mongoose.model('ItemRelationships')
   ,_		    	= require('underscore')
   ,tradeItem	    	= mongoose.model('TradeItems')
   ,sellerTradeItem 	= mongoose.model('SellerTradeItems');
   
module.exports.getItemDetail = exports = function(params, callback){
   var categoryId    = params.categoryId;
   var itemsData  = [];
   var ids=[];
   var promise=item.find({ $and: [ query.itemwhere, query.categorywhere ] })
       //{ categoryIds: categoryId})
                   .exec();
   promise.then(function(items){
                _.forEach(items,function(item){
                         
                                 itemsData[item._id]=item;
				 ids.push(item._id);

                       });
          return tradeItem.find({item:{$in:ids}}).exec();
       }).then(function(tradeItems){
          _.forEach(tradeItems,function(tradeItem){
               itemsData[tradeItem.item].tradeItems.push(tradeItem);             
       });
       var itemsArray = [];
         _.forEach(ids, function(id) {
         itemsArray.push(itemsData[id]);       
       });
       callback(null,itemsArray);
   });                                 		                   
}

module.exports.getAssortmentItems = exports = function(query, callback){
   //var assortmentId = params.assortmentId;
   //console.log(query.itemswhere);
   var itemsData    = [];
   var ids          = [];
   var tradeItemids = [];
   var promise=item.find({ $and: [ query.itemwhere, query.categorywhere ] }).limit(query.limit).sort(query.itemssortBy)//.select('-itemSpec')
                   .exec();
   promise.then(function(items){
              //console.log(items);
                _.forEach(items,function(item){
                                 itemsData[item._id]=item;
				 ids.push(item._id);
                       });
          return tradeItem.find({item:{$in:ids}}).exec();
       }).then(function(tradeItems){
          _.forEach(tradeItems,function(tradeItem){ 
              itemsData[tradeItem.item].tradeItems.push(tradeItem);
              tradeItemids.push(tradeItem._id);  
          });
          return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: query.site }).populate({ path: 'sellerId', select: 'sellerShortName ' }).exec();
       }).then(function(sellerTradeItems){
           _.forEach(tradeItemids,function(tradeItemid){ 
               var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
               sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });

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

module.exports.getItems = exports = function(query, callback){
   //var assortmentId = params.assortmentId;
   //console.log(query.itemswhere);
   var itemsData    = [];
   var ids          = [];
   var tradeItemids = [];
   var promise=item.find(query.itemwhere).limit(query.limit).sort(query.itemssortBy)//.select('-itemSpec')
                   .exec();
   promise.then(function(items){
              //console.log(items);
                _.forEach(items,function(item){
                                 itemsData[item._id]=item;
				 ids.push(item._id);
                       });
          return tradeItem.find({item:{$in:ids}}).exec();
       }).then(function(tradeItems){
          _.forEach(tradeItems,function(tradeItem){ 
              itemsData[tradeItem.item].tradeItems.push(tradeItem);
              tradeItemids.push(tradeItem._id);  
          });
          return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: query.site }).populate({ path: 'sellerId', select: 'sellerShortName ' }).exec();
       }).then(function(sellerTradeItems){
           _.forEach(tradeItemids,function(tradeItemid){ 
               var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
               sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });

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
module.exports.getItemDetail = exports = function(query, callback){
       item.findOne(query.itemwhere)
                         .select('_id name description longDescription status categoryIds brandId itemSpec ')
                         .populate({ path: 'categoryIds', select: '_id name categoryType ' })
                         .populate({ path: 'brandId', select: '_id name definition ' })
                         .populate({ path: 'itemSpec.attributeSet', select: '_id name definition displayOnWeb filterBy isVariant' })
                         .populate({ path: 'itemSpec.attributes.attribute', select: '_id name definition ' }) 
                         .populate({ path: 'itemSpec.attributes.attrListValues',select: '_id attributeId name definition '})       
                         .limit(query.limit).sort(query.itemssortBy)
                         .exec(function(err, itemdetail){
	  			 if (!err){
	     				 callback(null,itemdetail);
	   			 } else {
	      				 callback(err,null);
	   			 }
        		  });
}

module.exports.getCompleteItemDetail = exports = function(query, callback){
   var itemsData    = [];
   var ids          = [];
   var tradeItemids = [];
   var promise=item.find(query.itemwhere)
                   .populate({ path: 'categoryIds', select: '_id name categoryType ' })
                   .populate({ path: 'brandId', select: '_id name definition ' })
                   .populate({ path: 'itemSpec.attributeSet', select: '_id name definition displayOnWeb filterBy isVariant' })
                   .populate({ path: 'itemSpec.attributes.attribute', select: '_id name definition ' }) 
                   .populate({ path: 'itemSpec.attributes.attrListValues',select: '_id attributeId name definition '})
                   .limit(query.limit)
                   .exec();
   promise.then(function(items){
                   _.forEach(items,function(item){
                         //console.log(item);
                                 itemsData[item._id]=item;
				 ids.push(item._id);
                     });
          return tradeItem.find({item:{$in:ids}}).exec();
       }).then(function(tradeItems){
          _.forEach(tradeItems,function(tradeItem){ 
              itemsData[tradeItem.item].tradeItems.push(tradeItem);
              tradeItemids.push(tradeItem._id);  
          });
          return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: query.site })
                                .populate({ path: 'sellerId', select: 'sellerShortName party' })
                                .populate({ path: 'site'})
		                .populate({ path: 'catalogues.catalogue'})
		                //.populate({ path: 'catalogues.categories',select: '_id name definition' })
		                //.populate({ path: 'catalogues.brands',select: '_id name'  })
		                .populate({ path: 'party' })
		                .populate({ path: 'cities.city'}) 
		                .populate({ path: 'cities.partyLocations.location' })
                                .populate({ path: 'cities.partyLocations.localities' })
                                .exec();
       }).then(function(sellerTradeItems){
           _.forEach(tradeItemids,function(tradeItemid){ 
               var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
               sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });

               for(i = 0; i < itemsData[sellerTrdItem.item].tradeItems.length; i++) {
                 if (itemsData[sellerTrdItem.item].tradeItems[i]._id === tradeItemid) {
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

module.exports.getItemPriceOnly = exports = function(query, callback){
   var itemsData    = [];
   var ids          = [];
   var tradeItemids = [];
   var promise=item.find(query.itemwhere).select('_id tradeItems')
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
              itemsData[tradeItem.item].tradeItems.push(tradeItem);
              tradeItemids.push(tradeItem._id);  
          });
          return sellerTradeItem.find({ tradeItem: {$in: tradeItemids}, site: query.site })
                                .select('_id sellerId unitSellingPrice item tradeItem')
                                .populate({ path: 'sellerId' })
                                .exec();
       }).then(function(sellerTradeItems){
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                for(i = 0; i < itemsData[sellerTrdItem.item].tradeItems.length; i++) {
                  if (itemsData[sellerTrdItem.item].tradeItems[i]._id === tradeItemid) {                 
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


module.exports.getItemRelationship = exports = function(query, callback){
               //console.log(query);
       var itemsData    = [];
       var ids          = [];
       var itemrelids   = [];	
       var tradeItemids = [];
       var promise=itemRelationship.find({"fromItem":query.fromitem,"relationshipType":query.action}).exec();
       //console.log(query.action);
   promise.then(function(items){
                  // console.log(items);
		_.forEach(items,function(item){
		      itemrelids.push(item.toItem);
		 });
           return item.find({_id:{$in:itemrelids}}).exec();
        }).then(function(items){
                 //console.log(items); 
                _.forEach(items,function(item){
                      itemsData[item._id]=item;
		      ids.push(item._id);
                 });
                 //console.log(itemsData);
          return tradeItem.find({item:{$in:ids}}).exec();
       }).then(function(tradeItems){
          _.forEach(tradeItems,function(tradeItem){
              //console.log(tradeItem); 
              itemsData[tradeItem.item].tradeItems.push(tradeItem);
              tradeItemids.push(tradeItem._id);  
           });
          //console.log(itemsData);
           return sellerTradeItem.find({ tradeItem: {$in: tradeItemids} })
                                      .populate({ path: 'sellerId', select: 'sellerShortName ' })
                                      .exec();
       }).then(function(sellerTradeItems){
           _.forEach(tradeItemids,function(tradeItemid){ 
               var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
               sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });

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






























