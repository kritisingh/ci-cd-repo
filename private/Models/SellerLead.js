/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , auditField  = require('./AuditField')
  , ObjectId = Schema.ObjectId;

var SellerLeadSchema = new mongoose.Schema({
 leadNO:	       Number	
,seller:               { type: ObjectId, ref: 'Sellers'}
,party:                { type: String,   ref: 'Parties'}
,leadType:             String //Service,Sales,Others
,firstName:	       String
,lastName:	       String
,mobileNo:	       String
,emailId:	       String
,description:	       String
,tradeItem:            [{ type: String,   ref: 'TradeItems' }]
,status:	       String
});
SellerLeadSchema.plugin(auditField, { index: true });
mongoose.model('SellerLeads',SellerLeadSchema);

