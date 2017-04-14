define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var Brand = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return Brand;
  
});

