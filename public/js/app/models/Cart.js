define([
  'underscore',
  'backbone',
  'restApiServer'
], function(_, Backbone, restApiServer){
   
  var Cart = Backbone.Model.extend({

    url: restApiServer.ReSTFulAPIHost + '/cart'

  });
   
  return Cart;
  
});

