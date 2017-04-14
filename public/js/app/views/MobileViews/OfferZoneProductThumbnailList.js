define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/OfferZoneThumbnailItem',
], function ($, _, Backbone, OfferZoneThumbnailView) {
   var ThumbnailListView = Backbone.View.extend({
      render: function () {
         var that = this;
         $('ul.searhedProductList.sugestionList').html("");
         this.collection.forEach(that.addOneItem, that);
          return this.el;
      },

      addOneItem: function (item) {
         if (item.toJSON().itemStatus === "ACTIVE") {
            $('ul.searhedProductList.sugestionList').append(new OfferZoneThumbnailView({model: item}).render());
         }
      }
 });
 return ThumbnailListView;
});
