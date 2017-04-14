define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/ShippingDetailsForm',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/FooterView.html'
], function ($, _, Backbone, ShippingDetailsFormView, HeaderView, FooterTemplate) {
    var shippingDetailsView = Backbone.View.extend({
        el: $('body'),
        render: function () {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render());
            $(".middleWrapper").html(new ShippingDetailsFormView().render());
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        }
    });
    return shippingDetailsView;
});
