/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var PartyAddressSchema = new mongoose.Schema({
 purposes:      [{usage: String // HOME-DELIVERY, OFFICE, WAREHOUSE, RETAILSTORE, PICKUPPOINT
                 ,validFrom: {type: Date, default: Date.now}, validTo: Date}]
,isPrimary:     Boolean
,party:         { type: ObjectId, ref: 'Parties' }
,addressLine1:  { type: String,   trim: true }
,addressLine2:  { type: String,   trim: true }
,streetName:    { type: String,   trim: true }
,city:          { type: String,   ref: 'Cities'}
,locality:      { type: String,   ref: 'Localities' }
,subLocality:   { type: String,   ref: 'SubLocalities' }
,postalCode:    { type: String,   trim: true }
,wings:         [{ type: String,  trim: true  }]
,contactPerson: { type: ObjectId, ref: 'Parties' }
,GLN:           { type: String, trim: true }
});

mongoose.model('PartyAddresses', PartyAddressSchema);

