/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var OrderAdjustmentSchema = new mongoose.Schema({
 adjustmentType:      { type: String }   // promotion, discount etc.
,adjustmentCode:      { type: String }   // promotion, discount etc.
,adjuestedEntity:     { type: String }   // ORDER or LINE
,adjuestedEntityId:   { type: ObjectId } // OrderId or LineId
,orderHeaderId:       { type: ObjectId, ref: 'OrderHeaders' } // New Field Added
,orderLineId:         { type: ObjectId, ref: 'OrderLines' }   // New Field Added
,adjustmentUnit:      { type: String }   // flat or %
,adjustmentRate:      { type: Number }   // 10, 15 etc
,adjustmentAmount:    { type: Number }   // New Field Added
,adjustmentStatus:    { type: String }   // APPLIED, CANCEL
,changeReason:        { type: String }   // Status change reason
,changedBy:           { type: ObjectId, ref: 'Parties' } // Person changed the status
,soldByseller:        { type: String,   ref: 'Sellers' }
,deliveredBySeller:   { type: ObjectId, ref: 'Sellers' }
});

mongoose.model('OrderAdjustments', OrderAdjustmentSchema );


