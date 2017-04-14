/**
 * Module dependencies.
 */
var mongoose    = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema      = mongoose.Schema
  , ObjectId    = Schema.ObjectId;

var AttributeSchema = new Schema(
{_id:              { type: String, trim: true }
,name:             { type: String, trim: true }
,definition:       { type: String, trim: true }
,validationType:   { type: String, trim: true } //FREETEXT, NUMBER, DATE, LOV, and LOUOM
,status:           Boolean
});

AttributeSchema.plugin(auditField, { index: true });

mongoose.model('Attributes', AttributeSchema);


