/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var OrderHeaderSearchSchema = new mongoose.Schema({
 orderId:                    { type: ObjectId, ref: 'OrderHeaders' } 
,orderNumber :               { type: String, trim: true }
,orderSeq :                  { type: String, trim: true }
,orderDate :                 { type: Date, default: Date.now  }
,buyer :                     { type: ObjectId, ref: 'Buyers' }
,buyerParty :                { type: ObjectId, ref: 'Parties' }
,buyerAccountNumber:         String
,buyerPartyName :            String
,buyerPartyEmail :           String
,buyerPartyMobileNum :       String
,buyerPartyPostalCode :      String
,buyerPartySociety :         String
,buyerPartyAddress :         { type: ObjectId, ref: 'PartyAddresses' }
,seller :                    { type: ObjectId, ref: 'Sellers' }
,sellerParty :               { type: ObjectId, ref: 'Parties' }
,sellerPartyName :           String
,sellerPartyAddress :        { type: ObjectId, ref: 'PartyAddresses' }
,lsp :                       { type: ObjectId, ref: 'LogisticServiceProviders' }
,lspNumber :                 Number
,lspParty :                  { type: ObjectId, ref: 'Parties' }
,lspPartyName :              String
,orderFlowStatus :           { type: String, trim: true }//OPEN, BOOKED, AWAIT-DELIVERING, DELIVERED, RETURN, CLOSED, CANCELED
,orderFlowStatusReason :     { type: String, trim: true }
,site :                      { type: String, trim: true }
});

mongoose.model('OrderHeaderSearches', OrderHeaderSearchSchema );

