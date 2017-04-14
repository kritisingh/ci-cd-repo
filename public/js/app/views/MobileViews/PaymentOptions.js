define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MobileTemplates/PaymentOptions.html'
], function ($, _, Backbone, PaymentOptionsTemplate) {
    var PaymentOptions = Backbone.View.extend({
        render: function (id, amt) {
            $(this.el).html(_.template(PaymentOptionsTemplate, {amt: amt, id: id}));
            return this.el;
        },
        events: {
            "click .okBtn": "done"
        },
        done: function () {
            window.location = "#";
        }
    });
    return PaymentOptions;
});

