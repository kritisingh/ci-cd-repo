define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/ConfirmOrderView.html',
    'text!templates/MobileTemplates/FooterView.html',
    'collections/Order'
], function ($, _, Backbone, restApiServer, HeaderView, ConfirmOrderTemplate, FooterTemplate, Order) {
    var SliderView = Backbone.View.extend({
        el: $('body'),
        render: function (id) {
            this.orderNo = id;
            var order = new Order(), that = this;
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render());
            order.fetch({data: { dataType: "jsonp", orderId: id}, success: function () {
                $(".middleWrapper").html(_.template(ConfirmOrderTemplate, { orders: order }));
                $(".middleWrapper").off('click', '#confirm');
                $("#confirm").click({ text: id }, that.done);
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
            }});
        },
        addOneItem: function (item) {
            $(this.el).html(_.template(ConfirmOrderTemplate, item.toJSON()));
        },
        events: {
            //"click #confirm"                         : "done",
            "click .timeSlot input[type='checkbox']" : "check"
        },

        check: function (e) {
            $(e.target).closest(".timeSlot").siblings(".timeSlot").children("input[type='checkbox']").prop('checked', false);
        },

        done: function (e) {
            var  orderNo = e.data.text;
            var that = this, id = $(".timeSlot input:checked").attr("id"), date = $(".timeSlot input:checked").attr("date"),  obj = {"orderId": orderNo, "Uid" : $.cookie('uid'), "scheduledDeliverySlot" : id, "scheduledDeliveryDate" : date };
            $.ajax({
                type: "PUT",
                url: restApiServer.ReSTFulAPIHost + '/order',
                data: obj,
                success: function (result) {
                   window.location = "#checkout/payment/" + orderNo + "/" + $(e.target).attr("grandTotal");
                },
                error: function (err) {
                    console.log(err);
                },
                dataType: 'json'
            });
        }
    });
    return SliderView;
});
