define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/OfferThumbnailItem',
], function ($, _, Backbone, OfferProductThumbnailItemView) {
   var ThumbnailListView = Backbone.View.extend({
      render: function () {
         var that = this;
         $('ul.searhedProductList.sugestionList').html("");
         this.collection.forEach(that.addOneItem, that);
          return this.el;
      },

      addOneItem: function (item) {
         if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
            $('ul.searhedProductList.sugestionList').append(new OfferProductThumbnailItemView({model: item}).render());
         }
      }
 });
 return ThumbnailListView;
});
