/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SellerSchema = new mongoose.Schema({
 sellerGroup:         { type: String }
,sellerShortName:     { type: String }	  	
,site:                { type: String,   ref: 'Sites'     }
,segments:	      [{ type: String, ref: 'Categories' } ]	
,categories:          [{ type: String, ref: 'Categories' } ]
,brands:              [{ type: String, ref: 'Brands'     } ]
,party:               { type: ObjectId, ref: 'Parties' }
,address:             { type: ObjectId, ref: 'PartyAddresses' }
,cities:              [{ type: String, ref: 'Cities' }]
,active:              { type: Boolean, default: true }
,hasStore:            { type: Boolean }
,effectiveStartDate:  Date
,effectiveEndDate:    Date
});

mongoose.model('Sellers', SellerSchema);




