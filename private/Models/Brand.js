/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var BrandSchema = new mongoose.Schema({
 _id:          { type: String, trim: true }
,SEOMetaTags:      [{ name: { type: String }, content: { type: String } }]
,partyId:      { type: ObjectId, ref: 'Parties' }
,name:         { type: String, trim: true }
,definition:   { type: String, trim: true }
,catalogueId:  { type: String,  ref: 'Catalogues' }
,categories:   [{ type: String, ref: 'Categories'}]
,pageType :    { type: String, trim: true }
,imagePaths:   [{imageType: String, path: String, active: Boolean}]
});

BrandSchema.plugin(auditField, { index: true });

mongoose.model('Brands', BrandSchema );
