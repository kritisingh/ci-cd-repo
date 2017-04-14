/**
 * Define AudiField plugin
 */
var mongoose    = require('mongoose')
  , Schema      = mongoose.Schema
  , ObjectId    = Schema.ObjectId;

module.exports = exports = function auditFields(schema, options) {
  schema.add({creationDate: { type: Date, default: Date.now}});
  schema.add({createdBy:        { type: ObjectId, ref: 'parties'}});
  schema.add({LastModificationDate:  { type: Date, default: Date.now}});
  schema.add({LastModifiedBy:   { type: ObjectId, ref: 'parties'}});
}