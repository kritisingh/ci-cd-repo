/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var CitySchema = new mongoose.Schema({
 _id:              { type: String,   trim: true } // BC-PUNE
,city:             { type: String,   trim: true } // Pune
,state:            { type: String,   trim: true }
,country:          { type: String,   trim: true }
,GeoJSON:          { geoJSONtype: String, coordinates: [] }
});

mongoose.model('Cities', CitySchema);

