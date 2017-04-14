define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var Category = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return Category;
  
});

