define([
  'underscore',
  'backbone',
  'models/BannerModel',
  'restApiServer'
], function(_, Backbone, Banner, restApiServer){
   
  var Banners = Backbone.Collection.extend({
    model: Banner,
    url: restApiServer.ReSTFulAPIHost + '/banner'
  });
   
  return Banners;
  
});

