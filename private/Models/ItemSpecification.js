/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var ItemSpecificationSchema = new mongoose.Schema({
 item:           { type: String, ref: 'Items' }
,tradeItem:      { type: String, ref: 'TradeItems' }
,context:        { type: String, trim: true }//ITEM,TRADEITEM,CATEGORY
,itemSpec:        [{  seqNo:          { type: Number }
	           ,  attributeSet:   { type: String, ref:  'AttributeSets' }
                   ,  attributes:     [{ attribute:      { type: String, ref: 'Attributes' } // change this as well
      	                             , keyFeature:     { type: Boolean }
				     , attrFreeText:   { type: String, trim: true }
				     , attrNumber:     { type: Number }
				     , attrUOM:        { type: String }
				     , attrDate:       { type: Date }
				     , attrListValues: [ { type: String, ref: 'AttributeValues' } ]
	                            }]
                 }]
});

module.exports = mongoose.model('ItemSpecifications', ItemSpecificationSchema);

                    
