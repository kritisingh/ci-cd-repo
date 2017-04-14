define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var ServiceProvider = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return ServiceProvider;
  
});

