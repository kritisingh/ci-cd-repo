define([
  'underscore',
  'backbone',
  'models/sitecategoryModel',
  'restApiServer'
], function(_, Backbone, sitecategoryModel, restApiServer){
   
  var sitecategory = Backbone.Collection.extend({

    model: sitecategoryModel,
    url: restApiServer.ReSTFulAPIHost + '/sitecategory'

  });
   
  return sitecategory;
  
});

