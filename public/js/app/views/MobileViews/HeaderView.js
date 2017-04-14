define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/Filters',
    'views/MobileViews/ServeCities',
    'text!templates/MobileTemplates/HeaderView.html',
    'collections/CartItems',
    'collections/sitecategory'
], function ($, _, Backbone, FiltersView, ServeCitiesView, HeaderTemplate, Cart, Sitecategory) {
    var HeaderView = Backbone.View.extend({
        tagName: 'div',
        className: 'headerContainer',
        render: function (flag, cat) {
            var that = this, featuredcategory = new Sitecategory(), cartItems = new Cart();
            this.totalCartItems = 0;
            featuredcategory.fetch({data: { dataType: "jsonp", "action": "SITE-CATEGORY"}, success: function () {
                $(that.el).append(_.template(HeaderTemplate, {collection: featuredcategory}));
                cartItems.fetch({data: { dataType: "jsonp", "uid": $.cookie('uid')}, success: function () {
                    cartItems.each(function (item) {
                        that.totalCartItems = that.totalCartItems + parseInt(item.toJSON().qty);
                    });
                    $(".cartCount").html(that.totalCartItems);
                }});
                if (flag === 1) {
                    $(".searchContainer").append(new FiltersView().render(cat));
                    $(".searchBlock").removeClass("searchBlock").addClass("catSearchBlock");
                }
            }});
            return this.el;
        },
        events: {
            "click .menuBar"    : "menuBar",
            "click .searchIcon" : "serchResult",
            "keyup #search"     : "searchOnKeyPress",
            "click .cityList"   : "selectCity"
        },
        menuBar: function () {
            $(".filtersContainer").slideUp("fast");
            $('.headerMenuBar').slideToggle();
        },
        serchResult: function () {
            var text = $("#search").val();
            if (text.length) {
                Backbone.history.navigate("#searchResult/" + text, true);
            }
        },
        searchOnKeyPress: function (e) {
            if (e.keyCode === 13) {
                this.serchResult(e);
            }
        },
        selectCity: function () {
           $(this.el).append(new ServeCitiesView().render());
        }
    });
    return HeaderView;
});
