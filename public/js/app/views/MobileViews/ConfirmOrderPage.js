define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/confirmOrder',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/FooterView.html'
], function ($, _, Backbone, ConfirmOrderView, HeaderView, FooterTemplate) {
    var shippingDetailsView = Backbone.View.extend({
        el: $('body'),
        render: function (id) {
            $(this.el).html("<div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div>");
            $(".headerWrapper").html(new HeaderView().render());
            $(".middleWrapper").html(new ConfirmOrderView().render(id));
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        }
    });
    return shippingDetailsView;
});
