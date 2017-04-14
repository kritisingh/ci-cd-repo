define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/PaymentOptions',
    'text!templates/MobileTemplates/FooterView.html',
    'text!templates/MobileTemplates/checkOutHeaderView.html'
], function ($, _, Backbone, PaymentOptionsView, FooterTemplate, checkOutHeaderTemplate) {
    var shippingDetailsView = Backbone.View.extend({
        el: $('body'),
        render: function (id, amt) {
            $(this.el).html("<div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div>");
            $(".headerWrapper").html(_.template(checkOutHeaderTemplate, {}));
            $(".middleWrapper").html(new PaymentOptionsView().render(id, amt));
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        }
    });
    return shippingDetailsView;
});
