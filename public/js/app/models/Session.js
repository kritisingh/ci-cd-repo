define([
  'underscore',
  'backbone',
  'restApiServer'
], function(_, Backbone, restApiServer){
   
   var Session = Backbone.Model.extend({

   url: restApiServer.ReSTFulAPIHost + '/session'

   });
  
  return Session;
  
});

