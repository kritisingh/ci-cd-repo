/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var TradeItemSchema = new mongoose.Schema({
 _id:                 { type: String }
, tradeItemNumber:   { type: Number }
,tradeItemName:       { type: String }
,item:                { type: String, ref: 'Items' }
,tradeItemUnit:       { type: String } //This value as per GS1 standard Pallet, Case, Each, Pack
,GTIN:                { type: String }
,marketPrice:         { type: Number } //new field 22/11/2013 TM
,variantAttributeSet: { type: String, ref:  'AttributeSets'}
,variantAttributes:   [{attribute:    { type: String, ref: 'Attributes' }
                       ,attrValue:    { type: String }
                       ,attrUOM:      { type: String }
                      }]
,childItems:          [{tradeItemId:  { type: String, ref: 'TradeItems' }
		       ,qty:          { type: Number }
                                      //, marketPrice:      Number
                                      //, unitSellingPrice: Number
	              }]
,imagePaths:          [{imageSize: String,imageType: String, path: String, active: Boolean}]
,itemStatus:          String // ACTIVE, INACTIVE, ONHOLD
,rating:              { type: Number }
,sellers:             []
,itemSpec:	      []	
,pageType :           { type: String, trim: true }
});

module.exports =  mongoose.model('TradeItems', TradeItemSchema);
