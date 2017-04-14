define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/OfferZoneThumbnailItem'
], function ($, _, Backbone, OfferZoneThumbnailItemView) {
        var ThumbnailListView = Backbone.View.extend({
            render: function () {
                var that = this;
                $('ul.searhedProductList.sugestionList').html("");
                var collectionList = _.extend({}, this.collection);
                _.each(collectionList.models, function(item) {
                    if ((item.toJSON().itemStatus === "ACTIVE") && (item.toJSON().variantAttributes.length)) {
                         $('ul.searhedProductList.sugestionList').append(new OfferZoneThumbnailItemView({model: item}).render());
                    }
                });
                //this.collection.forEach(that.addOneItem, that);
            },

            addOneItem: function (item) {
                if ((item.toJSON().itemStatus === "ACTIVE") && (item.toJSON().variantAttributes.length)) {
                    $('ul.searhedProductList.sugestionList').append(new OfferZoneThumbnailItemView({model: item}).render());
                }
            }
        });
    return ThumbnailListView;
});
