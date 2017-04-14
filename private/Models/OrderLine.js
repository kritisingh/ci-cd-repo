/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var OrderLineSchema = new mongoose.Schema({
 orderId:              { type: ObjectId, ref: 'OrderHeaders' }
,lineNumber:           { type: String,   trim: true }
,tradeItem:            { type: String,   ref: 'TradeItems' }
,orderQty:             { type: Number,   default: 0 }
,unitListPrice:        Number   
,unitSellingPrice :    Number
,shippedQty:           { type: Number,   default: 0 }
,invoicedQty:          { type: Number,   default: 0 }
,returnQty:            { type: Number,   default: 0 }
,cancelQty:            { type: Number,   default: 0 }
,seller:               { type: String,   ref: 'Sellers' }
,lineFlowStatus:       { type: String } //BOOKED, RETURN, CANCELED
,lineFlowStatusReason: String
,site :                String
});

mongoose.model('OrderLines', OrderLineSchema );


