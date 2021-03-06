define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MobileTemplates/OfferProdDetailsView.html',
    'models/Cart'
], function ($, _, Backbone, ProductDetailsTemplate, Cart) {
    var HomePageView = Backbone.View.extend({
        tagName: 'div',
        initialize: function () { cartLine = new Cart(); },
        render: function () {
            $(this.el).html(_.template(ProductDetailsTemplate, this.model.toJSON()));
            return this.el;
        },
        events: {
            "click #addtocartBtn.buy_button" : "addToCart1"
        },
        addToCart1: function (e) {
            var that = this;
            $(e.target).html("<img src='http://cdn2.bcdsn.net/mycitykart/css/images/bx_loader.gif'>");
            cartLine.save({"uid": $.cookie('uid'), "cartLines": { "tradeItemId": $(".product_detail_div", this.el).children("h1").attr("id"), "qty": 1, "unitSellingPrice": $(".product_detail_div", this.el).attr("usp"), "sellerId": $(e.target).attr("sellerid"), "site": "MYCITYKART", "city": "BC-PUNE"}}, {success: function () {
               $(".cartSuccessMsgContainer",that.el).fadeIn().delay(700).fadeOut();
               $(e.target).html("Add to cart");
               $(".cartCount").html(parseInt($(".cartCount").html()) + 1);
            }});
        }
    });
    return HomePageView;
});
