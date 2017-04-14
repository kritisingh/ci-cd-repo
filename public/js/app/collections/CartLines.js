define([
  'underscore',
  'backbone',
  'models/CartLine',
  'restApiServer'
], function(_, Backbone, CartLine, restApiServer){
   
  var CartLines = Backbone.Collection.extend({
    model: CartLine,
    url: restApiServer.ReSTFulAPIHost + '/cart'
  });
   
  return CartLines;
  
});

