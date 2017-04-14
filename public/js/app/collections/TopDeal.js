define([
  'underscore',
  'backbone',
  'models/TopDealModel',
  'restApiServer'
], function(_, Backbone, TopDealModel, restApiServer){
   
  var TopDeal = Backbone.Collection.extend({

    model: TopDealModel,
    url: restApiServer.ReSTFulAPIHost + '/topDeal'

  });
  return TopDeal;
});

