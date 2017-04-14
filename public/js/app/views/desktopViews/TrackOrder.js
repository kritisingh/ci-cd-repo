define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MainView',
    'text!templates/desktopTemplates/TrackOrderView.html',
    'text!templates/desktopTemplates/TrackOrderDetailsView.html',
    'collections/Order'
], function ($, _, Backbone, MainView, TrackOrderTemplate, TrackOrderDetailsTemplate, Order) {

 var TrackOrderView = Backbone.View.extend({
        el: $('#outerContainer'),
        render: function () {
            this.$el.append(new MainView().render());
            $(this.el).html(_.template(TrackOrderTemplate, {}));
            return this.el;
        },

        events: {
            "click #moveToCartBtn"      : "trackOrder",
            'blur input[type="text"]'   : 'validate'
        },

        validate: function (e) {
            var value = $(e.target).val(), id = $(e.target).attr("id"), filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            //************ password Validations ************
            if (id === "orderNo") {
                if ((!$.isNumeric(value)) || (value === "")) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
            } else if (id === "emailId") {
                if ((!filter.test(value)) || (value === "")) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
            }
        },

        invalid: function (e) {
            $(e.target).removeClass("valid");
            $(e.target).css("border-color", "red");
        },

        valid: function (e) {
            $(e.target).css("border-color", "#cccccc");
            $(e.target).addClass("valid");
            $("#err", this.el).html("");
        },

        trackOrder: function () {
            var flag = 0, order = new Order();
            $(".mandatory").each(function () {
                if (!($(this).hasClass("valid"))) {
                    flag = 1;
                }
            });
            if (flag === 0) {
                //order.fetch({data: {dataType: "jsonp", "orderId":"131" ,"emailId":"edfhskjdhfkjashl@gmail.com" ,"action":"ORDER-TRACK"}
                order.fetch({data: {dataType: "jsonp", "orderId": $("#orderNo", this.el).val(), "emailId": $("#emailId", this.el).val(), "action": "ORDER-TRACK"}, success: function () {
                    if (order.length) {
                        $(".trackOrderDetails", this.el).html(_.template(TrackOrderDetailsTemplate, {order: order.toJSON()}));
                        //$("#"+order.toJSON()[0].orderHeader.orderFlowStatus).children("span").addClass("statusSelect");
                    } else {
                        $(".trackOrderDetails", this.el).html("");
                        $("#err", this.el).html("<div class='alert-error'>&nbsp;Order number or Email id is invalid.</div>").css("display", "block");
                    }
                }});
            } else {
                $(".trackOrderDetails", this.el).html("");
                $("#err", this.el).html("<div class='alert-error'>&nbsp;Please enter your order number and Email id.</div>").css("display", "block");
            }
        }
    });
    return TrackOrderView;
});
