define([
  'underscore',
  'backbone',
  'models/OrderDetail',
  'restApiServer'
], function(_, Backbone, OrderDetail, restApiServer){
   
  var OrderDetails = Backbone.Collection.extend({

    model: OrderDetail,
    url: restApiServer.ReSTFulAPIHost + '/orderDetail'

  });
   
  return OrderDetails;
  
});

