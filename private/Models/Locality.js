/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var LocalitySchema = new mongoose.Schema({
 _id:              { type: String,   trim: true } // BC-PUNE-WAKAD
,suburb:           { type: String,   trim: true } // WAKAD
,postCode:         { type: String,   trim: true } // 411057
,city:             { type: String,   ref: 'Cities' }
,GeoJSON:          { geoJSONtype: String, coordinates: [] }
});

mongoose.model('Localities', LocalitySchema);

