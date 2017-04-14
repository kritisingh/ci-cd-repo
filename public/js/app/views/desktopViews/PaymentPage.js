define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MainView',
    'views/desktopViews/Footer',
    'text!templates/desktopTemplates/PaymentPageView.html'
], function ($, _, Backbone, MainView, FooterView, PaymentPageTemplate) {
   var PoliciesView = Backbone.View.extend({
            el: $('body'),
            render: function (OrderNo, amt) {
                this.$el.append(new MainView().render());
                $("#outerContainer").html(_.template(PaymentPageTemplate, {orderno: OrderNo, amt : amt}));
                $('#footer').html(new FooterView().render());
                return this.el;
            }
        });
    return PoliciesView;
});
