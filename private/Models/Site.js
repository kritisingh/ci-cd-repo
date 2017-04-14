/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SiteSchema = new mongoose.Schema({
 _id:              { type: String,  trim: true }
,name:             { type: String,  trim: true }
,description:      { type: String,  trim: true }
,imagePaths:       [{imageType: String, path: String, active: Boolean}]
,catalogues:       [{type: String, ref: "Catalogues"}]
,cities:           [{type: String, ref: "Cities"}]
,status:           { type: Boolean, default: true }
});

mongoose.model('Sites', SiteSchema);
