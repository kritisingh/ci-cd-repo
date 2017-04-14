define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var Varient = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return Varient;
  
});

