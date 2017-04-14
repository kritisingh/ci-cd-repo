define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/TrackOrderView.html',
    'text!templates/MobileTemplates/TrackOrderDetailsView.html',
    'text!templates/MobileTemplates/FooterView.html',
    'collections/Order'
], function ($, _, Backbone, HeaderView, TrackOrderTemplate, TrackOrderDetailsTemplate, FooterTemplate, Order) {
    var trackOrderView = Backbone.View.extend({
        el: $('body'),
        render: function () {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render());
            $(".middleWrapper").html(_.template(TrackOrderTemplate, {}));
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        },
        events: {
            'click #moveToCartBtn'    : 'trackOrder',
            'blur input[type="text"]' : 'validate'
        },
        validate: function (e) {
            var value = $(e.target).val(), id = $(e.target).attr("id"), filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if ((id === "orderNumber")) {
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
                order.fetch({data: {dataType: "jsonp", "orderId": $("#orderNumber", this.el).val(), "emailId": $("#emailId", this.el).val(), "action": "ORDER-TRACK"}, success: function () {
                    if (order.length) {
                        $(".trackOrderDetails", this.el).html(_.template(TrackOrderDetailsTemplate, {orders: order}));
                        //$("#"+order.toJSON()[0].orderHeader.orderFlowStatus).children("span").addClass("statusSelect");
                    } else {
                        $(".trackOrderDetails", this.el).html();
                        $("#err", this.el).html("<div class='alert-error'>&nbsp;Order number or Email id is invalid.</div>").css("display", "block");
                    }
                }});
            } else {
                $("#err", this.el).html("<div class='alert-error'>&nbsp;Please enter your order number and Email id.</div>").css("display", "block");
            }
        }
    });
    return trackOrderView;
});
