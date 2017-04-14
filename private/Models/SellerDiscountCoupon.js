/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var SellerDiscountCouponSchema = new mongoose.Schema({
 sellerId:            { type: ObjectId, ref: 'Sellers' }
,couponCode:          { type: String }
,discountType:        { type: String } //%, value, SKU
,discountValue:       { type: String }
,eligibility:         { minimumOrderAmount: Number }
,active:              { type: Boolean, default: true }
,effectiveStartDate:  Date
,effectiveEndDate:    Date
});

mongoose.model('SellerDiscountCoupons', SellerDiscountCouponSchema);



