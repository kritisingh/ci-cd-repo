/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SiteLeadSchema = new mongoose.Schema({
 name:	               String
,leadType:             String //Service,Sales,Others
,mobileNo:	       String
,emailId:	       String
,description:	       String
});

SiteLeadSchema.plugin(auditField, { index: true });

mongoose.model('SiteLeads', SiteLeadSchema);
