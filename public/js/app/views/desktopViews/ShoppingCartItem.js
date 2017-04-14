define([
    'jquery',
    'underscore',
    'backbone',
    'collections/CartItems',
    'text!templates/desktopTemplates/MyCartListItemView.html',
    'restApiServer'
], function ($, _, Backbone, CartItems, MyCartListItemTemplate, restApiServer) {

   var MyCartListItemView = Backbone.View.extend({
            tagName: 'tr',
            className: 'my_cart_item_row',
            initialize: function (option) {
                this.parent = option.parent;
            },

            render: function (cartId) {console.log(cartId);
                this.cartId = cartId;
                var item = this.model.toJSON(), total = parseFloat(item.price) * parseInt(item.qty);
                $(this.el).html(_.template(MyCartListItemTemplate, {item: item}));
                $('td.total', this.el).html("Rs." + " " + total.toFixed(2));
                return this.el;
            },

            events: {
                'blur #qty' : 'qtyChanged',
                'click .removeItem' : 'remove',
                'focus .numeric' : 'qtyFocus'
            },

            qtyFocus: function (e) {
                this.quantity = $(e.target).val().trim();
            },

            qtyChanged: function (evn) {
                var that = this, Qty = $(evn.target).val().trim(), cartUpdate, cartItem = new CartItems();
                this.count = 0;
                cartUpdate = { "uid": $.cookie('uid'), "cartLines": {"tradeItemId": $(evn.target).closest("tr").children(".my_cart_item_row td").attr("id"), "qty": Qty, "unitSellingPrice": $(evn.target).closest("tr").children(".my_cart_item_row td").attr("unitePrice"), "sellerId": $(evn.target).closest("tr").children(".my_cart_item_row td").attr("sellerId"), "site": "MYCITYKART", "city": "BC-PUNE"}, "cartId": $(evn.target).closest("tr").children(".my_cart_item_row td").attr("cartid")};
                if ((!isNaN($(evn.target).val())) && ($(evn.target).val() > 0)) {
                    $.ajax({
                        type: "PUT",
                        contentType : "application/json",
                        url: restApiServer.ReSTFulAPIHost + '/cart',
                        data: JSON.stringify(cartUpdate),
                        dataType: 'json',
                        success: function () {
                            cartItem.fetch({data: { dataType: "jsonp",  "uid": $.cookie('uid')}, success: function () {
                                cartItem.forEach(that.addItem, that);
                                $(".count").html(that.count);
                            }});
                            that.parent.render(that.cartId);
                        }
                    });
                } else {
                    $(".numeric").val(this.quantity);
                }
            },

            addItem: function (item) {
                this.count = this.count + (parseInt(item.toJSON().qty));
            },

            remove: function (e) {
                var that = this, cartId = $(e.target).closest("tr").children(".my_cart_item_row td").attr("cartid"), obj, cartItem = new CartItems();
                this.count = 0;
                obj = {"cartId": cartId};
                $.ajax({
                    type: "DELETE",
                    contentType : "application/json",
                    url: restApiServer.ReSTFulAPIHost + '/cart',
                    data: JSON.stringify(obj),
                    dataType: 'json',
                    success: function () {
                        $(e.target).parent().parent('tr').remove();
                        cartItem.fetch({data: { dataType: "jsonp",  "uid": $.cookie('uid')}, success: function () {
                            cartItem.forEach(that.addItem, that);
                            $(".count").html(that.count);
                            if ((cartItem.length === 0) || (that.totalAmt < 500)) {
                                $(".checkoutBtnContainer").html("<a id='checkOut_btn' class='btn btn-success button'>CHECKOUT</a>");
                                $("#checkOut_btn").css("opacity", "0.3");
                            }
                        }});
                        that.parent.render(that.cartId);
                    }
                });
            }
        });
    return MyCartListItemView;
});
