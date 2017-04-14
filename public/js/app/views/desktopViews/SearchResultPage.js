define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MainView',
    'views/desktopViews/ItemThumbnailItem',
    'collections/Items'
], function ($, _, Backbone, MainView, ThumbnailItemView, SearchItems) {

  var SearchResultPageView = Backbone.View.extend({
            el: $('body'),
            render: function (text) {
                this.$el.append(new MainView().render());
                $('#outerContainer', this.el).html("<ul class='searhedProductList sugestionList textSearch'></ul>");
                $('.searhedProductList', this.el).html("<li id='waitingIcon'><img src='/../css/images/bx_loader.gif'></li>");
                $("#search_txt", this.el).val(text);
                var searchItems = new SearchItems(), that = this;
                searchItems.fetch({data: { dataType: "jsonp", "text": text, "itemssortBy": "", "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0}, success: function () {
                    if (!searchItems.length) {
                        $('ul.searhedProductList').html("<li id='msg'>No result found. We are working on it to serve you best.</li>");
                    } else {
                        searchItems.forEach(that.addOneItem, that);
                        $('ul.sugestionList li#waitingIcon', this.el).remove();
                    }
                }});
                return this.el;
            },

            addOneItem: function (item) {
                if ((item.toJSON().status === "ACTIVE") && (item.toJSON().tradeItems.length)) {
                    $('ul.searhedProductList', this.el).append(new ThumbnailItemView({ model: item}).render());
                }
            }
        });
    return SearchResultPageView;
});
