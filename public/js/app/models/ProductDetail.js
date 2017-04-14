define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var ProductDetail = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return ProductDetail;
  
});

