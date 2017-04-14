/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , auditField  = require('./AuditField')
  , ObjectId = Schema.ObjectId;

var BuyerSchema = new mongoose.Schema({
 accountNumber:	       String	
,partyId:              { type: ObjectId ,   ref: 'Parties'}
,address:              { type: ObjectId ,   ref: 'PartyAddresses'}
,user:		       { type: ObjectId ,   ref: 'User'}	
,profileClass:	       String //General, Family, starFamily  
,status:	       String //ACTIVE ,INACTIVE
});
BuyerSchema.plugin(auditField, { index: true });
mongoose.model('Buyers',BuyerSchema);





