define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var SubLocality = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return SubLocality;
  
});

