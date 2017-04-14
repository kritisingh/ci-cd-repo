define([
  'underscore',
  'backbone',
  'models/ServiceModel',
  'restApiServer'
], function(_, Backbone, ServiceProvider, restApiServer){
   
  var ServiceProviders = Backbone.Collection.extend({

    model: ServiceProvider,
    url: restApiServer.ReSTFulAPIHost + '/service'

  });
   
  return ServiceProviders;
  
});

