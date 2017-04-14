
/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var REQTradeItemSchema = new mongoose.Schema({
 tradeItemName:       { type: String }
,marketPrice:         { type: Number } 
,status:              String // REQUESTED,PENDING,APPROVED
,sellerId:            { type: ObjectId, ref: 'Sellers'    }
,category:          String
,brand:             String
});

module.exports =  mongoose.model('REQTradeItems', REQTradeItemSchema);
