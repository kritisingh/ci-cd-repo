define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/PopupCartItemView.html',
    'restApiServer'
], function ($, _, Backbone, PopupCartItemTemplate, restApiServer) {
   var MyCartListItemView = Backbone.View.extend({
            tagName:   'li',
            className: 'popupCartline',
            initialize: function (option) {
                this.parent = option.parent;
            },

            render: function () {
                var item = this.model.toJSON();
                this.cartId = item.cartId;
                $(this.el).html(_.template(PopupCartItemTemplate, item));
                return this.el;
            },

            events: {
                'blur .cartListQty' : 'qtyChanged',
                'click .removeItem' : 'remove',
                'keyup .cartListQty' : 'qtyChangedOnKeyPress',
                'focus .numeric' : 'qtyFocus'
            },

            qtyChangedOnKeyPress: function (e) {
                if (e.keyCode === 13) {
                    this.qtyChanged();
                }
            },

            qtyFocus: function (e) {
                this.quantity = $(e.target).val().trim();
            },

            qtyChanged: function (evn) {
                var that = this, cartUpdate;
                this.count = 0;
                cartUpdate = { "uid": $.cookie('uid'), "cartLines": {"tradeItemId": $(".name", that.el).attr("id"), "qty": $(".cartListQty", that.el).val().trim(), "unitSellingPrice": $(".name", that.el).attr("unitePrice"), "sellerId": $(".name", that.el).attr("sellerId"), "site":  "MYCITYKART", "city": "BC-PUNE"}, "cartId": that.cartId};
                if ((!isNaN($(evn.target).val())) && ($(evn.target).val() > 0)) {
                    $.ajax({
                        type: "PUT",
                        contentType : "application/json",
                        url: restApiServer.ReSTFulAPIHost + '/cart',
                        data: JSON.stringify(cartUpdate),
                        dataType: 'json',
                        success: function () {
                            that.parent.render(that.cartId);
                        }
                    });
                } else {
                    $(".numeric").val(this.quantity);
                }
            },

            remove: function () {
                var that = this, obj = {"cartId" : this.cartId};
                this.count = 0;
                $.ajax({
                    type: "DELETE",
                    contentType : "application/json",
                    url: restApiServer.ReSTFulAPIHost + '/cart',
                    data: JSON.stringify(obj),
                    dataType: 'json',
                    success: function () {
                        that.parent.render(that.cartId);
                    }
                });
            }
        });
    return MyCartListItemView;
});
