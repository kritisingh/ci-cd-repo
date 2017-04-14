define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var BrandAttribute = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return BrandAttribute;
  
});

