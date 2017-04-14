define([
  'underscore',
  'backbone',
  'models/SellerCatModel',
  'restApiServer'
], function(_, Backbone, SellerCategory, restApiServer){
   
  var SellerCategories = Backbone.Collection.extend({
    model: SellerCategory,
    url: restApiServer.ReSTFulAPIHost + '/sellerCat'
  });
   
  return SellerCategories;
  
});

