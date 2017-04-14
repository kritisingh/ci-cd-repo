define([
  'underscore',
  'backbone',
  'restApiServer'
], function(_, Backbone, restApiServer){
   
  var location = Backbone.Model.extend({

    url: restApiServer.ReSTFulAPIHost + '/seller'

  });
   
  return location;
  
});


