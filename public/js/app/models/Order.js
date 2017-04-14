define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var Order = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return Order;
  
});

