define([
  'underscore',
  'backbone',
  'models/SKUModel',
  'restApiServer'
], function(_, Backbone, ElectronicsItemRelationship, restApiServer){
   
  var ItemRelationships = Backbone.Collection.extend({

    model: ElectronicsItemRelationship,
    url: restApiServer.ReSTFulAPIHost + '/sku'

  });
   
  return ItemRelationships;
  
});

