/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var BannerAdSchema = new mongoose.Schema({
 bannerAdName:     { type: String,   trim: true }
,site:             { type: String,   ref: "Sites"}
,context:          { type: String,   trim: true }
,contextId:        { type: String,   trim: true }
,adImagePaths:     [{rating: Number, path: String}]
,city:             [{type  : String, ref:"Cities"}]
,active:           { type: Boolean,  default: true }
});

mongoose.model('BannerAds', BannerAdSchema);
