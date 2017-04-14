define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var CartItem = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return CartItem;
  
});

