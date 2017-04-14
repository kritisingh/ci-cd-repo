define([
  'underscore',
  'backbone',
  'models/SKUsModel',
  'restApiServer'
], function(_, Backbone, SKUModel, restApiServer){
   
  var Varients = Backbone.Collection.extend({

    model: SKUModel,
    url: restApiServer.ReSTFulAPIHost + '/skus'

  });
   
  return Varients;
  
});

