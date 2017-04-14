define([
  'underscore',
  'backbone',
  'restApiServer'
], function(_, Backbone, restApiServer){
   
  var PartyUid = Backbone.Model.extend({

    url: restApiServer.ReSTFulAPIHost + '/uidparty'

  });
   
  return PartyUid;
  
});

