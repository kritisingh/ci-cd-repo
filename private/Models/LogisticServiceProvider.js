/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , auditField  = require('./AuditField')
  , ObjectId = Schema.ObjectId;

var LogisticServiceProviderSchema = new mongoose.Schema({
 LSPNumber:	       Number	
,party:                { type: ObjectId,   ref: 'Parties'}
,active:               Boolean 
,site:		       String
});
LogisticServiceProviderSchema.plugin(auditField, { index: true });
mongoose.model('LogisticServiceProviders',LogisticServiceProviderSchema);


