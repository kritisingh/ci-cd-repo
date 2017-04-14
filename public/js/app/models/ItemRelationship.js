define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var ItemRelationship = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return ItemRelationship;
  
});

