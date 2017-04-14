/**
 * Module dependencies.
 */
var mongoose           = require('mongoose')
  , auditField         = require('./AuditField')
  , Schema             = mongoose.Schema
  , ObjectId           = Schema.ObjectId;

var CategorySchema = new mongoose.Schema(
{_id:                { type: String,  trim: true }
,name:               { type: String,  trim: true }
,definition:         { type: String,  trim: true }
,pageType :          { type: String, trim: true }
,categoryType:       { type: String,  trim: true } // SEGMENT, FAMILY, BRICK, ASSORTMENT
,catalogueId:        { type: String,  ref: 'Catalogues' }
,ancestors:          [{type: String, ref:  'Categories'}]
,imagePaths:         [{imageType: String, path: String, active: Boolean}]
,status:             { type: Boolean, default: true }
,attributeSets:      [{type: String, ref:  'AttributeSets'}]
,categoryVariance:   Number
,categories:         []
});

CategorySchema.plugin(auditField, { index: true });

mongoose.model('Categories', CategorySchema);
