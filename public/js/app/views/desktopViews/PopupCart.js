define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/PopupCartItem',
    'collections/CartItems'
], function ($, _, Backbone, PopupCartItemView, CartItems) {
   var PopupCartView = Backbone.View.extend({
            tagName:   'ul',
            className: 'popupCartList',
            render: function () {
                this.totalAmt = 0;
                this.totalSaving = 0;
                this.totalQty = 0;
                $(this.el).html("<img class='loadingImg' src='http://cdn2.bcdsn.net/mycitykart/css/images/bx_loader.gif' />");
                var that = this, cartItem = new CartItems();
                cartItem.fetch({data: { dataType: "jsonp",  "uid": $.cookie('uid')}, success: function () {
                    cartItem.forEach(that.addOneItem, that);
                    $(".count").html(that.totalQty);
                    $(".popupCartGrandTotal").html("<b>Total :&nbsp</b>Rs&nbsp" + that.totalAmt.toFixed(2) + "<br><b>You saved : &nbsp<b>Rs&nbsp" + that.totalSaving.toFixed(2));
                    $(".loadingImg").remove();
                }});
                return this.el;
            },

            addOneItem: function (item) {
                this.totalAmt = this.totalAmt + (parseFloat(item.toJSON().price) * parseInt(item.toJSON().qty));
                this.totalSaving = this.totalSaving + parseInt(item.toJSON().qty) * (parseFloat(item.toJSON().marketPrice) - parseFloat(item.toJSON().price));
                this.totalQty = this.totalQty + parseInt(item.toJSON().qty);
                $(this.el).append(new PopupCartItemView({parent: this, model: item}).render());
            }
        });
    return PopupCartView;
});
