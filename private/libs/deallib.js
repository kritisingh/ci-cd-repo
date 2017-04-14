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

module.exports.getdeals = exports = function(query, callback){
   var itemsData      = [];
   var ids            = [];
   var tradeItemsData = [];
   var tradeItemids   = [];
   entitywhere={"entityId":query.entityId}
    var myDateString = Date();
   var promise=featuredItem.findOne({ $and: [ entitywhere,,{ validFrom:{ $lte: myDateString }},{ validTo:{ $gte: myDateString }},{city:query.city} ] })
                   .limit(query.limit)
                   .exec();
   promise.then(function(items){
                 ids=items.featuredTradeItems;
                 //console.log(ids);
          return tradeItem.find({$and:[{_id:{$in : ids}}]})
                          .populate({ path:'item'})
                          .limit(query.limit)
                          .exec();
       }).then(function(tradeItems){//console.log(tradeItems) 
	      _.forEach(tradeItems,function(tradeItem){
                         tradeItemsData[tradeItem._id] = tradeItem;
		         tradeItemids.push(tradeItem._id);
              }); console.log(tradeItemids)
       return sellerTradeItem.find({ $and: [ { tradeItem:{$in: tradeItemids}},{site: "MYCITYKART" },{city:query.city} ] })                          
                             .populate({ path: 'sellerId' })
                             .exec();
       }).then(function(sellerTradeItems){console.log(sellerTradeItems)
             _.forEach(tradeItemids,function(tradeItemid){
                var sellerTrdItems = _.filter(sellerTradeItems,function(sellerTradeItem) { return sellerTradeItem.tradeItem === tradeItemid });
                sellerTrdItem      = _.min(sellerTrdItems, function(sellerTradeItem) { return sellerTradeItem.unitSellingPrice; });
                tradeItemsData[tradeItemid].sellers.push(sellerTrdItem);  
             });
           var itemsArray = [];
           _.forEach(tradeItemids, function(id) {
              itemsArray.push(tradeItemsData[id]); 
           });console.log(itemsArray)
           callback(null,itemsArray); 
        });                               		                  
	 
}
