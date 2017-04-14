define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var topDeal = Backbone.Model.extend({

    idAttribute: "_id"

  });
  
  return topDeal;
  
});

