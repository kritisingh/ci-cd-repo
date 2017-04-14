define([
  'underscore',
  'backbone',
  'models/PartyUid',
  'restApiServer'
], function(_, Backbone, PartyUid, restApiServer){
   
  var PartyUids = Backbone.Collection.extend({

    model: PartyUid,
    url: restApiServer.ReSTFulAPIHost + '/uidparty'

  });
   
  return PartyUids;
  
});

