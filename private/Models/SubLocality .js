/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SubLocalitySchema = new mongoose.Schema({
 _id:              String // NB-PUNE-WAKAD-ISLAND
,locality:         String // NB-PUNE-WAKAD
,location:         String // THE ISLAND
,postCode:         { type: String,   trim: true } // 411057
,landmark:         String
,GeoJSON:          { geoJSONtype: String, coordinates: [] }
,wings:             [{ type: String,  trim: true  }]
});

mongoose.model('SubLocalities', SubLocalitySchema);
