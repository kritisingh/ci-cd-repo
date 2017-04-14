define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'text!templates/desktopTemplates/ProductSuggestQuickView.html'
], function ($, _, Backbone, restApiServer, ProductSuggestQuickViewTemplate) {
  var ThumbnailItemView = Backbone.View.extend({
            tagName: 'div',
            className: "PopupContainer",
            render: function () {
                $(this.el).html(_.template(ProductSuggestQuickViewTemplate, {}));
                return this.el;
            },

            events: {
                "click .closePopup"                  : "closePopup",
                'blur input[type="text"].mandatory'  : 'validate',
                "click .suggest_button"              : "suggestProduct",
                'focus input[type="text"]' : 'removeErrMsg'
            },

            closePopup: function () {
                $(".PopupContainer").remove();
            },

            removeErrMsg: function () {
                $("#err1").css("display", "none");
            },

            validate: function (e) {
                var value = $(e.target).val(), id = $(e.target).attr("id"),  filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (id === "ProductName") {                              //************ Name Validations ************
                    if ((value === "") || (!isNaN(value)) || (value.length < 3) || (value.length > 15)) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "email") {                  //************ E-mail Validations ************
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
                $("#err").html("");
                $("#err1").html("");
            },

            suggestProduct: function () {
                var flag = 0, that = this, suggestProduct = {"emailid": $("#email").val(), "tradeItemName": $("#ProductName").val(), "status": "REQUESTED", "category": $("#categoryName").val(), "brand": $("#BrandName").val(), "description": $("#productDetails").val()};
                $(".mandatory").each(function () {
                    if (!($(this).hasClass("valid"))) {
                        flag = 1;
                    }
                });
                if (flag === 0) {
                    $.ajax({
                        type: "POST",
                        contentType : "application/json",
                        url: restApiServer.ReSTFulAPIHost + '/reqSku',
                        data: JSON.stringify(suggestProduct),
                        dataType: 'json',
                        success: function () {
                            that.closePopup();
                        }
                    });
                } else {
                    $("#err1").html("<div class='alert-error'>Please enter valid information</div>").css("display", "block");
                }
            }
        });
    return ThumbnailItemView;
});


