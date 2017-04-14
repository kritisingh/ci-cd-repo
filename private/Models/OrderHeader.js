/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var OrderHeaderSchema = new mongoose.Schema({
 orderNumber :               { type: String, trim: true }
,orderSeq :                  { type: String, trim: true }
,orderDate :                 { type: Date, default: Date.now  }
,buyer :                     { type: ObjectId, ref: 'Buyers' }
,buyerParty :                { type: ObjectId, ref: 'Parties' }
,buyerPartyAddress :         { type: ObjectId, ref: 'PartyAddresses' }
,requestedDeliveryDate :     { type: Date }
,requestedDeliverySlot :     { type: String, trim: true }
,promisedDeliveryDate :      { type: Date }
,promisedDeliverySlot :      { type: String, trim: true }
,scheduledDeliveryDate :     { type: Date }
,scheduledDeliverySlot :     { type: String, trim: true }
,seller :                    { type: ObjectId, ref: 'Sellers' }
,sellerParty :               { type: ObjectId, ref: 'Parties' }
,sellerPartyAddress :        { type: ObjectId, ref: 'PartyAddresses' }
,lsp :                       { type: ObjectId, ref: 'LogisticServiceProviders' }
,lspParty :                  { type: ObjectId, ref: 'Parties' }
,orderFlowStatus :           { type: String, trim: true }//NEW,OPEN, BOOKED, AWAIT-DELIVERING, DELIVERED, RETURN, CLOSED, CANCELED
,orderFlowStatusReason :     { type: String, trim: true }
,site :                      { type: String, trim: true }
});

mongoose.model('OrderHeaders', OrderHeaderSchema );

