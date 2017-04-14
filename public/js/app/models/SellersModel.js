define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var Store = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return Store;
  
});

