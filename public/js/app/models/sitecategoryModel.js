define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var sitecategory = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return sitecategory;
  
});

