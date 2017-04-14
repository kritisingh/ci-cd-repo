define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'views/MobileViews/ItemThumbnailItem',
    'collections/Items'
], function ($, _, Backbone, HeaderView, ThumbnailItemView, Items) {
    var HomePageView = Backbone.View.extend({
        el: $('body'),
        render: function (text) {
            $(this.el).html("<div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div>");
            var searchItems = new Items(), that = this;
            $('.middleWrapper', this.el).html("<ul class='searhedProductList'></ul>");
            $(".headerWrapper").html(new HeaderView().render());
            searchItems.fetch({data: {dataType: "jsonp", "text": text, "itemssortBy": "", "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0}, success: function () {
                searchItems.forEach(that.addOneItem, that);
            }});
        },
        addOneItem: function (item) {
            if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
              $("ul.searhedProductList", this.el).append(new ThumbnailItemView({model: item}).render());
           }
        }
    });
    return HomePageView;
});
