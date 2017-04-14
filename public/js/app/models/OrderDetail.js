define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var OrderDetail = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return OrderDetail;
  
});

