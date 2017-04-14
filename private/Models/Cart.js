/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var CartSchema = new mongoose.Schema({
  uid :         {type: ObjectId , ref: 'Uids' }
, cartLines:    {tradeItemId:        {type:String,ref: 'TradeItems'}
		 ,qty :         Number
		 ,sellerId:           {type: ObjectId,ref: 'Sellers',trim:true}
		 ,unitSellingPrice:  Number
		 ,site:             {type: String,ref: 'Sites'}
		 ,city:             {type: String,ref: 'Cities'}
                }
});

CartSchema.plugin(auditField, { index: true });

mongoose.model('Carts', CartSchema );
