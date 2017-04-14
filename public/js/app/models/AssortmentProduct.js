define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var AssortmentProduct = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return AssortmentProduct;
  
});

