define([
  'underscore',
  'backbone',
  'models/ProductDetail',
  'restApiServer'
], function(_, Backbone, ProductDetail, restApiServer){
   
  var ProductDetails = Backbone.Collection.extend({

    model: ProductDetail,
    url: restApiServer.ReSTFulAPIHost + '/item'

  });
   
  return ProductDetails;
  
});
