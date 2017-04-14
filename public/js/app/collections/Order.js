define([
  'underscore',
  'backbone',
  'models/Order',
  'restApiServer'
], function(_, Backbone, Order, restApiServer){
   
  var Orders = Backbone.Collection.extend({

    model: Order,
    url: restApiServer.ReSTFulAPIHost + '/order'

  });
   
  return Orders;
  
});

