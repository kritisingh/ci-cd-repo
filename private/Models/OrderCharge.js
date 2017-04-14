/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var OrderChargeSchema = new mongoose.Schema({
 chargeType:          { type: String }   // tax or shipping etc
,chargeCode:          { type: String }   // tax or shipping etc
,chargedEntity:       { type: String }   // ORDER or LINE
,chargedEntityId:     { type: ObjectId } // OrderId or LineId
,orderHeaderId:       { type: ObjectId, ref: 'OrderHeaders' } //New Field Added
,orderLineId:         { type: ObjectId, ref: 'OrderLines' } //New Field Added
,chargeUnit:          { type: String }   // flat or %
,chargeRate:          { type: Number }   // 10,15.. etc
,chargeAmount:        { type: Number }   // New Field Added
,chargeStatus:        { type: String }   // APPLIED, WAIVED or CANCEL
,changeReason:        { type: String }   // Waived because of royal customer
,changedBy:           { type: ObjectId, ref: 'Parties' }
,soldByseller:        { type: String,   ref: 'Sellers' }
,deliveredBySeller:   { type: ObjectId, ref: 'Sellers' }
});

mongoose.model('OrderCharges', OrderChargeSchema );
