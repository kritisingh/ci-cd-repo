/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var ItemSchema = new mongoose.Schema({
 _id:              String
,name:             String
,itemType:         String //PRODUCT OR SERVICE
,pageType :        { type: String, trim: true }
,description:      String
,longDescription:  String
,categoryIds:      [{ type: String, ref: 'Categories' }]
,brandId:          { type: String, ref:  'Brands' }
,imagePaths:       [{imageSize: String,imageType: String, path: String, active: Boolean}]
,status:           String // NEW, ACTIVE, INACTIVE, ONHOLD
,SEOMetaTags:      [{ name: { type: String }, content: { type: String } }] //new field 22/11/2013 TM Title, Description, Keywords
,features:          [{title:          { type: String }
                     ,description:    { type: String }
                     }]

,tradeItems:         []
});

module.exports = mongoose.model('Items', ItemSchema);

