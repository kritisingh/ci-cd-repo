define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/HeaderView.html',
    'text!templates/desktopTemplates/NigitiatePopupContainerView.html',
    'views/desktopViews/ServeCities',
    'views/desktopViews/PopupCart',
    'views/desktopViews/SuggestProductQuickView',
    'views/desktopViews/MyAccountView',
    'collections/CartItems'
], function ($, _, Backbone, HeaderTemplate, NigotiatePopupContainerTemplate, ServeCitiesView, PopupCartView, SuggestProductQuickView, MyAccountView,CartItems) {
  var HeaderView = Backbone.View.extend({
            tagName: 'div',
            className: "headerContentWrapper",
            render: function () {
                var that = this, cartItem = new CartItems();
                this.count = 0;
                $(this.el).html(_.template(HeaderTemplate, {}));
                cartItem.fetch({data: { dataType: "jsonp",  "uid": $.cookie('uid')}, success: function () {
                    cartItem.forEach(that.addItem, that);
                    $(".count", that.el).html(that.count);
                }});
                $(that.el).append(_.template(NigotiatePopupContainerTemplate, {}));
                return this.el;
            },

            events: {
                "click .searchBtn" : "search",
                "keyup #search_txt" : "searchOnKeyPress",
                //"change select" : "changeCity",
                "click .shoppingCartBtn" : "dropDownCart",
                "click .closePopup" : "closePopupCart",
                "click .suggestProduct" : "suggestProduct",
                "mouseleave .selectCityContainer" : "menubarMouseleave",
                "click .tagLine a " : "serverCities",
                "click .myAccount" : "createMyAccount"
            },

            closePopupCart: function () {
                $(".cartDropdownContainer").slideUp();
            },

            menubarMouseleave: function () {
                $('li.tagLine').removeClass('hoverMenuActive');
                $(".selectCityContainer").css("display", "none");
            },

            dropDownCart: function () {
                if (!$(".cartDropdownContainer").is(":visible")) {
                    //$(".cartList").html("<img class='loadingImg' src='css/images/bx_loader.gif' />");
                    $(".cartDropdownContainer").slideDown();
                    $(".cartList").html(new PopupCartView().render());
                    //$(".loadingImg").remove();
                } else {
                    $(".cartDropdownContainer").slideUp();
                }
            },

            addItem: function (item) {
                this.count = this.count + (parseInt(item.toJSON().qty));
            },

            search: function () {
                if ($("#search_txt").val().length !== 0) {
                    var text = $("#search_txt").val();
                    Backbone.history.navigate("#searchResult/" + text, true);
                }
            },

            searchOnKeyPress: function (e) {
                if (e.keyCode === 13) {
                    this.search(e);
                }
            },

           /* changeCity: function () {
                var city = $(".city option:selected").attr("id");
                $.cookie('city', city, { expires: 700, path: '/' });
                Backbone.history.navigate("#", true);
            },*/

            serverCities: function () {
                $('.outerContainer').append(new ServeCitiesView().render());
            },

            suggestProduct: function () {
                $('.outerContainer').append(new SuggestProductQuickView().render());
            },

            createMyAccount: function () {
                $('.outerContainer').append(new MyAccountView().render());
            }
        });
    return HeaderView;
});
