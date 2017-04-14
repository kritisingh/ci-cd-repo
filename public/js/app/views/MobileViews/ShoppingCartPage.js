define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'views/MobileViews/shoppingCartItemList',
    'text!templates/MobileTemplates/FooterView.html'
], function ($, _, Backbone, HeaderView, ShoppingCartItemListView, FooterTemplate) {
    var ShoppingCart = Backbone.View.extend({
        el: $('body'),
        render: function () {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render(0, ""));
            $('.middleWrapper', this.el).html("<div id='waitingIcon'><img src='http://cdn2.bcdsn.net/mycitykart/css/images/bx_loader.gif'></div><div class='condition'>( <sup>*</sup>Minimum Order Rs. 500 )</div>");
            $(".middleWrapper").append(new ShoppingCartItemListView().render());
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        }
    });
    return ShoppingCart;
});
