/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SellerTradeItemSchema = new mongoose.Schema({
 sellerId:            { type: ObjectId, ref: 'Sellers'    }
,site:                { type: String,   ref: 'Sites'      }
,city:                { type: String,   ref: 'Cities'     }
,item:                { type: String,   ref: 'Items'      }
,tradeItem:           { type: String,   ref: 'TradeItems' }
,unitSellingPrice:    Number
,offer:               {type: String}
,active:              { type: Boolean, default: true }
,negotiable:          { type: Boolean }
,effectiveStartDate:  Date
,effectiveEndDate:    Date
,instock:             { type: Boolean, default: true }
,availableQuantity:   Number
});
mongoose.model('SellerTradeItems', SellerTradeItemSchema);

