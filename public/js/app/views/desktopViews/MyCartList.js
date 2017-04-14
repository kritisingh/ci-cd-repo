define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/ShoppingCartItem',
    'collections/CartItems',
    'text!templates/desktopTemplates/MyCartListView.html',
    'text!templates/desktopTemplates/GrandTotalView.html'
], function ($, _, Backbone, ShoppingCartItemView, CartItems, MyCartListTemplate, GrandTotalViewTemplate) {

  var MyCartListView = Backbone.View.extend({
            tagName: "div",
            className: "myCart",
            initialize: function () {},
            render: function () {
                var that = this, cartItem = new CartItems();
                this.totalAmt = 0;
                this.totalSaving = 0;
                this.totalQty = 0;
                this.saving = 0;
                this.tAmount = 0;
                $(this.el).html(_.template(MyCartListTemplate, {}));
                this.cartLines = [];
                cartItem.fetch({data: { dataType: "jsonp",  "uid": $.cookie('uid')}, success: function () {
                    $("#waitingIcon").remove();
                    cartItem.forEach(that.addOneItem, that);
                    if ((cartItem.length === 0) || (that.totalAmt < 500)) {
                        $(".checkoutBtnContainer").html("<a id='checkOut_btn' class='btn btn-success button'>CHECKOUT</a>");
                        $("#checkOut_btn", that.el).css("opacity", "0.3");
                    }
                    $(".grand_total_div", this.el).html(_.template(GrandTotalViewTemplate, {"totalItems": that.totalQty, "totalAmt": that.tAmount, "totalSaving": that.saving}));
                }});
                $(".grand_total_div", this.el).html(_.template(GrandTotalViewTemplate, {"totalItems": that.totalQty, "totalAmt": that.tAmount, "totalSaving": that.saving}));
                return this.el;
            },

            addOneItem: function (item) {
                var that = this, cartId = item.toJSON().cartId;
                this.totalAmt = this.totalAmt + (parseFloat(item.toJSON().price) * parseInt(item.toJSON().qty));
                this.totalSaving = this.totalSaving + parseInt(item.toJSON().qty)  *(parseFloat(item.toJSON().marketPrice) - parseFloat(item.toJSON().price));
                this.saving = ((this.totalSaving * 100 ) / 100).toFixed(2);
                this.tAmount = ((this.totalAmt * 100 ) / 100).toFixed(2);
                this.totalQty = this.totalQty + parseInt(item.toJSON().qty);
                $('.my_cart_list tbody', this.el).append(new ShoppingCartItemView({parent: that, model: item}).render(cartId));
            }
        });
    return MyCartListView;
});
