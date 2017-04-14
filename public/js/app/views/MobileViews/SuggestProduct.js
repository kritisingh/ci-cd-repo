define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/ProductSuggestView.html',
    'text!templates/MobileTemplates/FooterView.html'
], function ($, _, Backbone, restApiServer, HeaderView, ProductSuggestTemplate,FooterTemplate) {
    var trackOrderView = Backbone.View.extend({
        el: $('body'),
        render: function () {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render());
            $(".middleWrapper").html(_.template( ProductSuggestTemplate, {}));
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        },

        events: {
            'click #suggestProd'    : 'suggestProduct',
            'blur input[type="text"]' : 'validate',
            'focus input[type="text"]' : 'removeErrMsg'
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
        },

        removeErrMsg: function () {
            $("#err").css("display", "none");
        },

        suggestProduct: function () {
            var flag = 0, that = this, suggestProduct = {"emailid": $("#email").val(), "tradeItemName": $("#ProductName").val(), "status": "REQUESTED", "category": $("#categoryName").val(), "brand": $("#BrandName").val(), "description": $("#productDetails").val()};console.log(suggestProduct);
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
                        success: function (result) {
                           window.location = "#";
                        }
                    });                    
                } else {
                    $("#err").html("<div class='alert-error'>Please enter valid information</div>").css("display", "block");
                }
        }
    });
    return trackOrderView;
});
