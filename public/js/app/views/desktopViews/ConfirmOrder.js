define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'text!templates/desktopTemplates/ConfirmOrderView.html'
], function ($, _, Backbone, restApiServer, ConfirmOrderTemplate) {
  var ConfirmOrderView = Backbone.View.extend({
            el: $('body'),
            render: function (orderno) {
                var data = this.model;
                $('#outerContainer').html(_.template(ConfirmOrderTemplate, {order : data}));
                $(this.el).off('click', '#confirmOrderBtn');
                $("#confirmOrderBtn", this.el).click({ text: orderno }, this.confirmOrder);
                return this.el;
            },

            events : {
                'click input[type="checkbox"]' : 'checked'
                //'click #confirmOrderBtn'       : 'confirmOrder'
            },

            checked: function (e) {
                $(e.target).parent(".timeSlot").siblings(".timeSlot").children("input").removeAttr('checked');
            },

            confirmOrder : function (e) {
                var id = $(".timeSlot input:checked").attr("id"), date = $(".timeSlot input:checked").attr("date"), orderNo = e.data.text, that = this, obj = {"orderId": orderNo, "Uid": $.cookie('uid'), "scheduledDeliverySlot": id, "scheduledDeliveryDate": date};
                $.ajax({
                    type: "PUT",
                    url: restApiServer.ReSTFulAPIHost + '/order',
                    data: obj,
                    success: function () {
                        if ($(".timeSlot").children("input").is(':checked')) {
                            window.location = "#payment/" + orderNo + "/" + $(e.target).attr("grandTotal");
                        } else {
                            $("#err", that.el).html("<div class='alert-error'>Please select atleast one time slots.</div>").css("display", "block");
                        }
                    },
                    dataType: 'json'
                });
            }
        });
    return ConfirmOrderView;
});
