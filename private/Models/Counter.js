/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var CounterSchema = new mongoose.Schema({
  _id: { type: String }
 ,seq: { type: Number, default: 0} 
});

mongoose.model('Counters', CounterSchema );
