/**
 * Module dependencies.
 */
var mongoose    = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema      = mongoose.Schema
  , ObjectId    = Schema.ObjectId;

var CatalogueSchema = new Schema(
{_id:              { type: String,  trim: true }
,name:             { type: String,  trim: true }
,definition:       { type: String,  trim: true }
,active:           { type: Boolean, default: true }
});

CatalogueSchema.plugin(auditField, { index: true });

mongoose.model('Catalogues', CatalogueSchema);

var CatalogueTreeSchema = new mongoose.Schema(
{_id:               { type: String,  trim: true }
,categories:        []
});

CatalogueTreeSchema.plugin(auditField, { index: true });

mongoose.model('CatalogueTree', CatalogueTreeSchema);
