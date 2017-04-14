define([
  'underscore',
  'backbone',
  'restApiServer'
], function(_, Backbone,  restApiServer){
   
   var Login = Backbone.Model.extend({

    url: restApiServer.ReSTFulAPIHost + '/login'

   });
  
  return Login;
  
});

