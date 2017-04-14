define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/OfferThumbnailItem'
], function ($, _, Backbone, OfferThumbnailItemView) {
   var ThumbnailListView = Backbone.View.extend({
            render: function () {
                var that = this;
                $('ul.searhedProductList.sugestionList').html("");
                 var collectionList = _.extend({}, this.collection);
                _.each(collectionList.models, function(item) {
                    if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
                         $('ul.searhedProductList.sugestionList').append(new OfferThumbnailItemView({model: item}).render());
                    }
                });
                //this.collection.forEach(that.addOneItem, that);
                return this.el;
            },

            addOneItem: function (item) {
                if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
                    $('ul.searhedProductList.sugestionList').append(new OfferThumbnailItemView({model: item}).render());
                }
            }
        });
    return ThumbnailListView;
});
