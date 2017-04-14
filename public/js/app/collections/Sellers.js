define([
  'underscore',
  'backbone',
  'models/SellersModel',
  'restApiServer'
], function(_, Backbone, Seller, restApiServer){
   
  var Sellers = Backbone.Collection.extend({
    model: Seller,
    url: restApiServer.ReSTFulAPIHost + '/sellers'
  });
   
  return Sellers;
  
});

