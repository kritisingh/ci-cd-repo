define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var SellerBrand = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return SellerBrand;
  
});

