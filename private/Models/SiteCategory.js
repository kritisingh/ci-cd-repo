/**
 * Module dependencies.
 */
var mongoose           = require('mongoose')
  , auditField         = require('./AuditField')
  , Schema             = mongoose.Schema
  , ObjectId           = Schema.ObjectId;

var SiteCategorySchema = new mongoose.Schema(
{_id:                { type: String,  trim: true }
,site:               { type: String,  trim: true }
,name:               { type: String,  trim: true }
,categoryType:       { type: String,  trim: true } // SEGMENT, FAMILY, BRICK, ASSORTMENT
,parentSegmentId:    { type: String, ref:  'Categories'}
,parentFamilyId:     { type: String, ref:  'Categories'}
,pageType :          { type: String, trim: true }
,imagePaths:         [{imageSize: String,imageType: String, path: String, active: Boolean}]
,status:             { type: Boolean, default: true }
,rating:             { type: Number }
});

SiteCategorySchema.plugin(auditField, { index: true });

mongoose.model('SiteCategories',SiteCategorySchema);
