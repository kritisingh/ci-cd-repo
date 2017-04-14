define([
  'underscore',
  'backbone',
  'models/CartItem',
  'restApiServer'
], function(_, Backbone, CartItem, restApiServer){
   
  var CartItems = Backbone.Collection.extend({

    model: CartItem,
    url: restApiServer.ReSTFulAPIHost + '/cart'

  });
   
  return CartItems;
  
});

