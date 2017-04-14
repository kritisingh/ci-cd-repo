
var mongoose    = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema      = mongoose.Schema
  , ObjectId    = Schema.ObjectId;

var FeaturedItemsSchema = new mongoose.Schema({
 entityName:          { type: String } //CATEGORY, BRAND etc.
,entityId:            { type: String } //categoryId, brandId
,featuredType:        { type: String } //TOP-SELLER
,featuredItems:       [{ type: String, ref: 'Items' }]
,featureName:        { type: String}
,featuredTradeItems:  [{ type: String, ref: 'TradeItems' }]
,status:              { type: String } //ACTIVE, INACTIVE
,validFrom:           { type: Date   }
,validTo:             { type: Date   }
,city:		      { type: String } 
,site:		      { type: String }
});

mongoose.model('FeaturedItems', FeaturedItemsSchema);




