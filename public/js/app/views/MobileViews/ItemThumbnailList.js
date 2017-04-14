define([
    'jquery',
    'underscore',
    'backbone',
    'viewport',
    'views/MobileViews/ItemThumbnailItem',
    'collections/Items',
    'text!templates/MobileTemplates/LoadMoreItemView.html'
], function($, _, Backbone, Viewport, ThumbnailItemView, Items, LoadMoreItemTemplate) {
    var ThumbnailListView = Backbone.View.extend({
        productList : new Items(),
        render: function (cat) {
            //$(this.el).append(_.template(LoadMoreItemTemplate, {}));
            this.start = 0;
            this.end = 20;
            var that = this;
            this.productList.fetch({data: { dataType: "jsonp", "categoryIds": cat, "department": "ELECTRONICS", "itemssortBy": "", "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0 }, success: function () {
                if (!that.productList.length) {
                    $('ul.searhedProductList.sugestionList').html("<li id='msg'>No result found. We are working on it to serve you best.</li>");
                } else {
                    $('ul.searhedProductList.sugestionList').html("");
                    var items = that.productList.slice(that.start, that.end);
                    items.forEach(that.addOneItem, that);
                    if(that.productList.length > 20 ){
                        $(that.el).append(_.template(LoadMoreItemTemplate, {}));
                    }
                }
                $('#waitingIcon').remove();
            }});
            return this.el;
        },
        events: {
            "click .loadMoreBtnContainer": "loadMoreItems"
        },
        addOneItem: function (item) {
            if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
                $("ul.searhedProductList.sugestionList").append(new ThumbnailItemView({model: item}).render());
            }
        },
        loadMoreItems: function () {
            this.start = this.end;
            var that = this;
            if(this.productList.length - this.start <= 20 ){
                this.end = this.productList.length;
                $(".loadMoreBtnContainer").remove();
                this.count = 1;
            } else {
               this.end = this.start + 20;
            }
            var items1 = this.productList.slice(this.start, this.end);
            items1.forEach(this.addOneItem, this);
            $('ul.sugestionList li#waitingIcon', this.el).remove();
        }
    });
    return ThumbnailListView;
});
