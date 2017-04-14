define([
  'underscore',
  'backbone',
  'models/CartItemProto'
], function(_, Backbone, CartItem){
   
  var CartItems = Backbone.Collection.extend({

    model: CartItem,
    //localStorage: new Backbone.LocalStorage("MyCartList32")

  });
   
  return CartItems;
  
});

