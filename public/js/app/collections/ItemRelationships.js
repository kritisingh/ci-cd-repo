define([
  'underscore',
  'backbone',
  'models/ItemRelationship',
  'restApiServer'
], function(_, Backbone, ItemRelationship, restApiServer){
   
  var ItemRelationships = Backbone.Collection.extend({

    model: ItemRelationship,
    url: restApiServer.ReSTFulAPIHost + '/item'

  });
   
  return ItemRelationships;
  
});

