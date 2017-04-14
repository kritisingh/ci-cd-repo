define([
  'underscore',
  'backbone',
  'models/PartyDetail'
], function(_, Backbone, PartyDetail){
   
  var PartyDetails = Backbone.Collection.extend({

    model: PartyDetail,
    localStorage: new Backbone.LocalStorage("PartyDetails1")

  });
   
  return PartyDetails;
  
});

