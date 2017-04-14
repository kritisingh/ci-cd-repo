define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'text!templates/desktopTemplates/ItemQuickView.html',
], function ($, _, Backbone, restApiServer, ItemQuickViewTemplate) {
  var ThumbnailItemView = Backbone.View.extend({
            tagName: 'div',
            className: "PopupContainer",
            render: function () {
                $(this.el).html(_.template(ItemQuickViewTemplate, this.model.toJSON()));
                $(".optionContainer:first-child", this.el).children(".option").addClass("selected");
                return this.el;
            },

            events: {
                "click .icon-chevron-up"       : "increment",
                "click .icon-chevron-down"     : "decrement",
                "click .option"                : "selectOption",
                "click .closePopup"            : "closePopup",
                "click #quickViewAddToCartBtn" : "addtoCart",
                'blur #qty'                    : 'qtyChanged',
                'focus .numeric'               : 'qtyFocus',
                'click .optionContainer .option'  : 'varients'
            },

            qtyFocus: function (e) {
                this.quantity = $(e.target).val().trim();
            },

            varients: function (e) {
                if ($(e.target).attr("mrp") === $(e.target).attr("usp")) {
                    $(".product_detail_div", this.el).children("h1").html($(e.target).attr("tradeItemName"));
                } else {
                    $(".product_detail_div", this.el).children("h1").html($(e.target).attr("tradeItemName"));
                }
            },

            addtoCart: function (e) {
                $(".loadingIconContainer", this.el).show();
                var that = this, cartData = {"uid": $.cookie('uid'), "cartLines": {"tradeItemId": $(".selected", this.el).attr("id"), "qty": $("#qty", this.el).val(), "unitSellingPrice": $(".selected", this.el).attr("usp"), "sellerId": $(e.target).attr("sellerid"), "site":  "MYCITYKART", "city": "BC-PUNE"}};
                $.ajax({
                    type: "POST",
                    contentType : "application/json",
                    url: restApiServer.ReSTFulAPIHost + '/cart',
                    data: JSON.stringify(cartData),
                    dataType: 'json',
                    success: function () {
                        $(".count").html((parseInt($(".count").html())) + (parseInt($("#qty", this.el).val())));
                        $(".loadingIconContainer", this.el).hide();
                        $(".cartSuccessMsg", that.el).fadeIn().delay(700).fadeOut();
                        //window.location ="#ShoppingCart/CartPage";
                    }
                });
            },

            closePopup: function () {
                $(".PopupContainer").remove();
            },

            changeTotal: function () {
                $(".price .rsMRP", this.el).html("Rs&nbsp" + parseFloat($("#qty").val())  * parseFloat($(".selected", this.el).attr("mrp")));
                $(".price .rsOfferPrice", this.el).html("Rs&nbsp" + parseInt($("#qty").val()) * parseFloat($(".selected", this.el).attr("usp")));
            },

            increment: function () {
                $("#qty").val(parseInt($("#qty").val()) + 1);
                this.changeTotal();
            },

            decrement: function () {
                if ($("#qty").val() > 1) {
                    $("#qty").val(parseInt($("#qty").val()) - 1);
                    this.changeTotal();
                }
            },

            selectOption: function (e) {
                if ($(e.target).hasClass("option")) {
                    $(e.target).closest(".optionContainer").siblings(".optionContainer").children(".option").removeClass("selected");
                    $(e.target).addClass("selected");
                }
                this.changeTotal();
            },

            qtyChanged: function (evn) {
                var that = this;
                if ((!isNaN($(evn.target).val())) && ($(evn.target).val() > 0)) {
                    that.changeTotal();
                } else {
                    $(".numeric").val(this.quantity);
                }
            }
        });
    return ThumbnailItemView;
});


