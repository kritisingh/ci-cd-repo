/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var UserRoleSchema = new mongoose.Schema({
  roleTypeCode:     { type: String, trim: true  } // sellerAdmin, salesAdmin, pimAdmin, sellerSalesRep 
 ,roleType:         [{ type: String, trim: true  }] // Seller Admin, Sales Admin, PIM Admin, Seller Sales Representitaive 
 ,user:             { type: ObjectId, ref: 'User' }
 ,userParty:        { type: ObjectId, ref: 'Parties'}
 ,seller:           { type: ObjectId, ref: 'Sellers'}
 ,taskLists:        [{ taskList: { type: String, ref: 'TaskList' }, displaySeq: Number}]
 ,active:           { type: Boolean, default: true }
 ,startDate:        Date
 ,endDate:          Date
});

mongoose.model('UserRoles', UserRoleSchema);

