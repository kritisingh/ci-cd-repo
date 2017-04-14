/**
 * Module dependencies.
 */
var mongoose    = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema      = mongoose.Schema
  , ObjectId    = Schema.ObjectId;

var AttributeValueSchema = new Schema(
{_id:              { type: String, trim: true }
,seqNo:            { type: Number }
,attributeId:      { type: String, trim: true }
,name:             { type: String, trim: true }
,definition:       { type: String, trim: true }
,status:           Boolean
});

AttributeValueSchema.plugin(auditField, { index: true });

mongoose.model('AttributeValues', AttributeValueSchema);

