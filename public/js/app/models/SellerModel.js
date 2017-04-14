define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var SellerProduct = Backbone.Model.extend({
    idAttribute: "_id"

   });
  
  return SellerProduct;
  
});

