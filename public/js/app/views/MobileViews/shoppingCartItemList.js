define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/ShoppingCartItem',
    'collections/CartItems',
    'text!templates/MobileTemplates/ShoppingCartItemListView.html'
], function ($, _, Backbone, ShoppingCartItemView, CartItems, ShoppingCartItemListTemplate) {
    var MyCartView = Backbone.View.extend({
        render: function () {
            $(this.el).html(_.template(ShoppingCartItemListTemplate, {}));
            this.totalAmt = 0;
            this.totalSaving = 0;
            this.totalQty = 0;
            var that = this, cartItems = new CartItems();
            cartItems.fetch({data: { dataType: "jsonp", "uid": $.cookie('uid')}, success: function () {
                if (cartItems.length) {
                    cartItems.each(that.addOneItem, that);
                    $(".cartCount").html(that.totalQty);
                    $('.totalItems', that.el).html(that.totalQty);
                    $('.gTotal', that.el).html(" Rs. " + (that.totalAmt).toFixed(2));
                    $('.totalAmt', that.el).html(" Rs. " + (that.totalAmt).toFixed(2));
                    $('.amtPayable', that.el).html(" Rs. " + (that.totalAmt).toFixed(2));
                    $('.savings', that.el).html(" Rs. " + (that.totalSaving).toFixed(2));
                    if(that.totalAmt < 500){$(".checkoutButton", that.el).remove(); }
                } else {
                    $(".checkoutButton", that.el).remove();
                    $('.totalItems', that.el).html(0);
                    $('.gTotal', that.el).html(" Rs. 00 ");
                }
                $("#waitingIcon").remove();
            }});
            return this.el;
        },
        addOneItem: function (item) {
            this.totalAmt = this.totalAmt + (parseFloat(item.toJSON().price) * parseInt(item.toJSON().qty));
            this.totalSaving = this.totalSaving + parseFloat(item.toJSON().qty) * (parseFloat(item.toJSON().marketPrice) - parseInt(item.toJSON().price));
            this.totalQty = this.totalQty + parseInt(item.toJSON().qty);
            $('ul.cartList', this.el).append(new ShoppingCartItemView({parent: this, model: item}).render());
        }
    });
    return MyCartView;
});
