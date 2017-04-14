define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var Locality = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return Locality;
  
});

