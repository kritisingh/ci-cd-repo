define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MainView',
    'views/desktopViews/Footer',
    'views/desktopViews/ConfirmOrder',
    'collections/Order'
], function ($, _, Backbone, MainView, FooterView, ConfirmOrderView, Order) {
  var ConfirmOrderPageView = Backbone.View.extend({
            el: $('body'),
            render: function (orderNo) {
                this.$el.html(new MainView().render());
                var confirmOrders = new Order();
                $('#footer').html(new FooterView().render());
                confirmOrders.fetch({data: {dataType: "jsonp",  "orderId": orderNo}, success: function () {
                    new ConfirmOrderView({model: confirmOrders.toJSON()}).render(orderNo);
                }});
                return this.el;
            }
        });
    return ConfirmOrderPageView;
});
