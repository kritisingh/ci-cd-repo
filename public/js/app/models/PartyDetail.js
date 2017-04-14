define([
  'underscore',
  'backbone'
], function(_, Backbone){
   
   var PartyDetail = Backbone.Model.extend({

    idAttribute: "_id"

   });
  
  return PartyDetail;
  
});

