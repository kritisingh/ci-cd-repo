define([
  'underscore',
  'backbone',
  'models/SellerBrandModel',
  'restApiServer'
], function(_, Backbone, SellerBrand, restApiServer){
   
  var SellerBrands = Backbone.Collection.extend({
    model: SellerBrand,
    url: restApiServer.ReSTFulAPIHost + '/sellerBrand'
  });
   
  return SellerBrands;
  
});

