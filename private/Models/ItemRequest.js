
/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var ItemRequestSchema = new mongoose.Schema({
 itemName:       { type: String }
,marketPrice:         { type: Number } 
,status:              String // REQUESTED,PENDING,APPROVED
,sellerId:            { type: ObjectId, ref: 'Sellers'    }
,category:            String
,brand:               String
});

module.exports =  mongoose.model('ItemRequests', ItemRequestSchema);
