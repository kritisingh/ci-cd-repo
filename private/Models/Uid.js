/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var UidSchema = new mongoose.Schema({
   creationDate: Date,
   expiryDate:   Date
});
UidSchema.plugin(auditField, { index: true });
mongoose.model('Uids', UidSchema);
