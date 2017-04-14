/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SellerLocationSchema = new mongoose.Schema({
 sellerId:            { type: ObjectId, ref: 'Sellers'    }
,site:                { type: String,   ref: 'Sites'      }
,city:                { type: String,   ref: 'Cities'     }
,locality:            { type: String,   ref: 'Localities' }
,deliveredByseller:   { type: ObjectId, ref: 'Sellers'    }
,pickFromShop:        { type: Boolean, default: true }
,homeDelivery:        { type: Boolean }
,shippingCharges:     Number
,leadTimeHours:       Number       
});

mongoose.model('SellerLocations', SellerLocationSchema);


