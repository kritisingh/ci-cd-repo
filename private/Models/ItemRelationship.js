/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var ItemRelationshipSchema = new mongoose.Schema({
 relationshipType:   String // RELATED, BOUGHT-TOGETHER
,fromItem:           { type: String, ref: 'Items' }
,toItem:             { type: String, ref: 'Items' }
,fromTradeItem:      { type: String, ref: 'TradeItems' }
,toTradeItem:        { type: String, ref: 'TradeItems' }
,active:             String
});

module.exports = mongoose.model('ItemRelationships', ItemRelationshipSchema);
