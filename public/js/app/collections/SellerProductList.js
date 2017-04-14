define([
  'underscore',
  'backbone',
  'models/SellerProduct',
  'restApiServer'
], function(_, Backbone, SellerProduct, restApiServer){
   
  var SellerProducts = Backbone.Collection.extend({
    model: SellerProduct,
    url: restApiServer.ReSTFulAPIHost + '/seller'
  });
   
  return SellerProducts;
  
});

