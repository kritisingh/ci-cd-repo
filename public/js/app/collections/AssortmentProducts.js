define([
  'underscore',
  'backbone',
  'models/AssortmentProduct',
  'restApiServer'
], function(_, Backbone, AssortmentProduct, restApiServer){
   
  var AssortmentProducts = Backbone.Collection.extend({

    model: AssortmentProduct,

    url: restApiServer.ReSTFulAPIHost + '/items'

  });
   
  return AssortmentProducts;
  
});

