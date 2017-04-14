/**
 * Module dependencies.
 */
var mongoose           = require('mongoose')
  , auditField         = require('./AuditField')
  , Schema             = mongoose.Schema
  , ObjectId           = Schema.ObjectId;

var DeliveryTimeSlotSchema = new mongoose.Schema(
{_id:                { type: String,  trim: true }
,cutoff_time:          Number
,deliverytimeslot:   { type: String,  trim: true }
,site:               { type: String,  trim: true }
,city:               { type: String,  trim: true }
});

mongoose.model('DeliveryTimeSlots', DeliveryTimeSlotSchema);
