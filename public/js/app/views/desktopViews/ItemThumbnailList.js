define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/ItemThumbnailItem',
    'text!templates/desktopTemplates/LoadMoreItemView.html'
], function ($, _, Backbone, ItemThumbnailItemView, LoadMoreItemTemplate) {
 var ThumbnailListView = Backbone.View.extend({
            attributes: {},
            start: 0,
            end: 28,
            render: function () {
                $(".loadMoreBtnContainer").remove();
                var that = this;
                this.products = this.collection;
                if (!that.products.length) {
                    $('ul.searhedProductList.sugestionList').html("<li id='msg'>No result found. We are working on it to serve you best.</li>");
                    $(".loadMoreBtnContainer", that.el).remove();
                } else {
                    $('ul.searhedProductList.sugestionList').html("");
                    var items = that.products.slice(that.start, that.end);
                    var obj = _.extend({}, items);
                    _.each(obj, function(item) {
                        if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
                            $('ul.searhedProductList.sugestionList').append(new ItemThumbnailItemView({model: item}).render());
                        }
                    });
                    //items.forEach(that.addOneItem,that);
                    if (that.products.length > 28) {
                        $(that.el).append(_.template(LoadMoreItemTemplate, {}));
                    }
                }
                $('#waitingIcon').remove();
                return this.el;
            },

            events: {
                "click .loadMoreBtnContainer": "loadMoreItems"
            },

            addOneItem: function (item) {
                if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
                    $('ul.searhedProductList.sugestionList').append(new ItemThumbnailItemView({model: item}).render());
                }
            },

            loadMoreItems: function () {
                this.start = this.end;
                var that = this;
                if (this.products.length - this.start <= 28) {
                    this.end = this.products.length;
                    $(".loadMoreBtnContainer", that.el).remove();
                    this.count = 1;
                } else {
                    this.end = this.start + 28;
                }
                var items1 = this.products.slice(this.start, this.end);
                var obj1 = _.extend({}, items1);
                    _.each(obj1, function(item) {
                        if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
                            $('ul.searhedProductList.sugestionList').append(new ItemThumbnailItemView({model: item}).render());
                        }
                    });
                //items1.forEach(this.addOneItem, this);
                $('ul.sugestionList li#waitingIcon', this.el).remove();
            }
        });
    return ThumbnailListView;
});
