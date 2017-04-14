define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/desktopViews/ItemQuickView',
    'text!templates/desktopTemplates/ItemThumbnailView.html'
], function ($, _, Backbone, restApiServer, ItemQuickView, ItemThumbnailTemplate) {
  var ThumbnailItemView = Backbone.View.extend({
            tagName: 'li',
            className: "item prod slide",
            render: function () {
                $(this.el).html(_.template(ItemThumbnailTemplate, this.model.toJSON()));
                $(".itemVarientsContainer span:first-child", this.el).addClass("selectedOption");
                return this.el;
            },

            events: {
                "click .quickViewBtn"               : "quickVew",
                "click .itemVarientsContainer span" : "varients",
                "click #thumbnailAddToCartBtn"      : "addToCart1"
            },

            quickVew: function () {
                $('.outerContainer').append(new ItemQuickView({model: this.model}).render());
            },

            varients: function (e) {
                if ($(e.target).attr("mrp") === $(e.target).attr("usp")) {
                    $(".discount", this.el).html("");
                    $(".offerPrice", this.el).html($(e.target).attr("usp"));
                    $(".productListText", this.el).children("h4").children("a").html($(e.target).attr("tradeItemName"));
                } else {
                    $(".rsMRP", this.el).children(".mrp").html($(e.target).attr("mrp"));
                    $(".rsOfferPrice", this.el).children(".offerPrice").html($(e.target).attr("usp"));
                    $(".productListText", this.el).children("h4").children("a").html($(e.target).attr("tradeItemName"));
                    var discount = (100 * (($(e.target).attr("mrp") - $(e.target).attr("usp")) / $(e.target).attr("mrp")));
                    $(".discount", this.el).html(Math.round(discount) + "%");
                }
                $(e.target).addClass("selectedOption").siblings().removeClass("selectedOption");
            },

            addToCart1: function (e) {
                $(".loadingIconContainer", this.el).show();
                var that = this, cartData = {"uid": $.cookie('uid'), "cartLines": { "tradeItemId": $(".selectedOption", this.el).attr("id"), "qty": 1, "unitSellingPrice": $(".offerPrice").html(), "sellerId": $(e.target).attr("sellerid"), "site": "MYCITYKART", "city": "BC-PUNE" }};
                console.log(cartData);
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


