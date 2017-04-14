define([
  'underscore',
  'backbone',
  'models/CategoryModel',
  'restApiServer'
], function(_, Backbone, Category, restApiServer){
   
  var Categories = Backbone.Collection.extend({
    model: Category,
    url: restApiServer.ReSTFulAPIHost + '/category'
  });
   
  return Categories;
  
});

