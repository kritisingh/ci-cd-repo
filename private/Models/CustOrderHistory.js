/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var CustOrderHistorySchema = new mongoose.Schema({
 party       :         { type: ObjectId, ref: 'Parties' }
,orderNumber :         { type: String, ref: 'OrderHeaders' }

});

CustOrderHistorySchema.plugin(auditField, { index: true });

mongoose.model('CustOrderHistorys', CustOrderHistorySchema);
