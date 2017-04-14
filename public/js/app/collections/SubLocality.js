define([
  'underscore',
  'backbone',
  'models/SubLocalityModel',
  'restApiServer'
], function(_, Backbone, Locality, restApiServer){
   
  var SubLocality = Backbone.Collection.extend({

    model: Locality,
    url: restApiServer.ReSTFulAPIHost + '/sublocality'

  });
   
  return SubLocality;
  
});

