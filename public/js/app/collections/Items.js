define([
  'underscore',
  'backbone',
  'models/ItemsModel',
  'restApiServer'
], function(_, Backbone, ItemsModel, restApiServer){
   
  var Items = Backbone.Collection.extend({

    model: ItemsModel,
    url: restApiServer.ReSTFulAPIHost + '/items'

  });
   
  return Items;
  
});

