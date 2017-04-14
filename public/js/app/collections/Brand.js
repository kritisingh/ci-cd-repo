define([
  'underscore',
  'backbone',
  'models/BrandModel',
  'restApiServer'
], function(_, Backbone, Brand, restApiServer){
   
  var Brands = Backbone.Collection.extend({
    model: Brand,
    url: restApiServer.ReSTFulAPIHost + '/brand'
  });
   
  return Brands;
  
});

