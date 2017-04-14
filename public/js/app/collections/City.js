define([
  'underscore',
  'backbone',
  'models/CityModel',
  'restApiServer'
], function(_, Backbone, Locality, restApiServer){
   
  var Localities = Backbone.Collection.extend({

    model: Locality,
    url: restApiServer.ReSTFulAPIHost + '/city'

  });
   
  return Localities;
  
});

