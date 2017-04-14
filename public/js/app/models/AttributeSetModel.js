define([
  'underscore',
  'backbone',
], function(_, Backbone){
   
   var Attribute = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return Attribute;
  
});

