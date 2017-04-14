define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var SellerCategory = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return SellerCategory;
  
});

