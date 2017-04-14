define([
  'underscore',
  'backbone',
  'models/AttributeSetModel',
  'restApiServer'
], function(_, Backbone, AttributeSetModel, restApiServer){
   
  var AttributeSet = Backbone.Collection.extend({
    model: AttributeSetModel,
    url: restApiServer.ReSTFulAPIHost + '/attributeSet'
  });
   
  return AttributeSet;
  
});

