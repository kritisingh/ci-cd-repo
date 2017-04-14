define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'text!templates/MobileTemplates/ShoppingCartItemView.html'
], function ($, _, Backbone, restApiServer, ShoppingCartItemTemplate) {
    var MyCartItemView = Backbone.View.extend({
        tagName:   'li',
        initialize: function (option) {
            this.parent = option.parent;
        },
        render: function () {
            var item = this.model.toJSON(), total = parseFloat(item.price) * parseInt(item.qty);
            $(this.el).html(_.template(ShoppingCartItemTemplate, item));
            $('td.total', this.el).html("Rs." + " " + (total).toFixed(2));
            return this.el;
        },
        events: {
            'click .removeCartItem': 'remove',
            'blur .qty'            : 'qtyChanged',
            'focus .qty'           : 'focus',
            "keyup .qty"           : "qtyChangeOnKeyPress"
        },
        qtyChangeOnKeyPress: function (e) {
            if (e.keyCode === 13) {
                this.qtyChanged(e);
            }
        },
        focus: function (e) {
            this.quantity = $(e.target).val().trim();
        },
        remove: function (e) {
            var obj = {"cartId": $(e.target).closest(".productDetails").attr("cartId")}, that = this;
            $.ajax({type: "DELETE",
                url: restApiServer.ReSTFulAPIHost + '/cart',
                data: obj,
                success: function () {
                    that.parent.render();
                },
                error: function (err) {
                    console.log(err);
                },
                dataType: 'json'
            });
        },
        qtyChanged: function (e) {
            if ((!isNaN($(e.target).val())) && ($(e.target).val() > 0)) {
                var obj = {"uid": $.cookie('uid'),
                        "cartLines": {"tradeItemId": $(e.target).closest(".productDetails").attr("tradeitemid"),
                        "qty": $(e.target).val().trim(),
                        "unitSellingPrice": $(e.target).closest(".productDetails").attr("offerPrice"),
                        "sellerId": $(e.target).closest(".productDetails").attr("sellerId"),
                        "site": "MYCITYKART",
                        "city": "BC-PUNE"
                    },
                    "cartId": $(e.target).closest(".productDetails").attr("cartId")
                },
                that = this;
                $.ajax({
                    type: "PUT",
                    url: restApiServer.ReSTFulAPIHost + '/cart',
                    data: obj,
                    success: function (data) {
                        that.parent.render();
                    },
                    error: function (err) {
                        console.log(err);
                    },
                    dataType: 'json'
                });
            } else {
                $(".qty").val(this.quantity);
            }
        }
    });
    return MyCartItemView;
});

