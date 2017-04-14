/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , auditField  = require('./AuditField')
  , ObjectId = Schema.ObjectId;

var SellerLSPSchema = new mongoose.Schema({
 seller:	        { type: ObjectId, ref:'Sellers'}	
,lsp:                   { type: ObjectId,   ref: 'LogisticServiceProviders'}
,city:                  { type: String,   ref:'Cities'} 
,effectiveStartDate :     Date
,effectiveEndDate :      Date
,active :		Boolean
,site :			String
});
SellerLSPSchema.plugin(auditField, { index: true });
mongoose.model('SellerLSPs',SellerLSPSchema);


