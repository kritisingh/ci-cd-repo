define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/desktopViews/OfferZoneItemQuickView',
    'text!templates/desktopTemplates/OfferZoneItemThumbnailView.html'
], function ($, _, Backbone, restApiServer, OfferZoneItemQuickView, OfferZoneItemThumbnailTemplate) {
  var ThumbnailItemView = Backbone.View.extend({
            tagName: 'li',
            className: "item prod slide",
            render: function () {
                $(this.el).html(_.template(OfferZoneItemThumbnailTemplate, this.model.toJSON()));
                $(".itemVarientsContainer span:first-child", this.el).addClass("selectedOption");
                return this.el;
            },

            events: {
                "click .quickViewBtn"               : "quickVew",
                //"click .itemVarientsContainer span" : "varients",
                "click #offerAddToCartBtn"          : "addToCart3"
            },

            quickVew: function () {
                $('.outerContainer').append(new OfferZoneItemQuickView({model: this.model}).render());
            },

            varients: function (e) {
                $(".mrp", this.el).html($(e.target).attr("mrp"));
                $(".offerPrice", this.el).html($(e.target).attr("usp"));
                $(".productListText", this.el).children("h4").children("a").html($(e.target).attr("tradeItemName"));
                $(".discount", this.el).html($(e.target).attr("discount") + "% OFF");
                $(e.target).addClass("selectedOption").siblings().removeClass("selectedOption");
            },

            addToCart3: function (e) {
                $(".loadingIconContainer", this.el).show();
                var that = this, cartData = {"uid": $.cookie('uid'), "cartLines": { "tradeItemId": $(".productItem", this.el).attr("id"), "qty": 1, "unitSellingPrice": $(".offerPrice", this.el).html(), "sellerId": $(e.target).attr("sellerid"), "site": "MYCITYKART", "city": "BC-PUNE" }};
                $.ajax({
                    type: "POST",
                    contentType : "application/json",
                    url: restApiServer.ReSTFulAPIHost + '/cart',
                    data: JSON.stringify(cartData),
                    dataType: 'json',
                    success: function () {
                        $(".count").html(parseInt($(".count").html()) + 1);
                        $(".loadingIconContainer", this.el).hide();
                        $(".cartSuccessMsg", that.el).fadeIn().delay(700).fadeOut();
                    }
                });
            }
        });
    return ThumbnailItemView;
});


