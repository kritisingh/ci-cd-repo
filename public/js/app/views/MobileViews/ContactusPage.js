define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/FooterView.html',
    'text!templates/MobileTemplates/ContactUsView.html'
], function ($, _, Backbone, restApiServer, HeaderView, FooterTemplate, ContactUsTemplate) {
    var ContactUsView = Backbone.View.extend({
        el: $('body'),
        render: function () {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render());
            $(".middleWrapper").append(_.template(ContactUsTemplate, {}));
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        },
        events: {
            'click #sendRequest'      : 'sendRequest',
            'blur input[type="text"]' : 'validate',
            'click #terms'            : 'terms',
            'click #closePopup'       : 'closePopup',
            'blur #comment'           : 'validate'
        },
        closePopup: function () {
            $('input[type="text"]').val("");
            $('#comment').val("");
            $('.msgContainer').remove();
        },
        validate: function (e) {
            var value = $(e.target).val(), id = $(e.target).attr("id"), filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            //************ Name Validations ************
            if ((id === "firstName") || (id === "lastName")) {
                if ((value === "") || (!isNaN(value)) || (value.length < 3) || (value.length > 15)) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
            }
            if (id === "comment") { //************ Comments Validations ************
                if ((value === "") || (value.length < 3)) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
            } else if (id === "mobNumber") { //************ Mobile Number Validations ************
                if ((value === "") || (value.length !== 10) || (isNaN(value))) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
            } else if (id === "emailId") { //************ E-mail Validations ************
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

        terms: function (e) {
            if ($(e.target).is(":checked")) {
                $(e.target).addClass("valid");
            } else {
                $(e.target).removeClass("valid");
            }
        },
        sendRequest: function () {
            var flag = 0, obj  = {};
            $(".mandatory").each(function () {
                if (!($(this).hasClass("valid"))) {
                    flag = 1;
                }
            });
            if (flag === 0) {
                $.ajax({
                    type: "POST",
                    url: restApiServer.ReSTFulAPIHost + '/site',
                    data: obj,
                    success: function () {
                        $(".nigotiateOperationDialog").append("<div class='msgContainer'><div class='successMsg'>Your request is send successfully </br></br><button id='closePopup' style='margin: 12px 0 0;' class='btn-success btn'>OK</button></div></div>");
                    },
                    error: function (err) {
                        console.log(err);
                    },
                    dataType: 'json'
                });
            } else {
                $("#err").html("<div class='alert-error'>Please enter valid information</div>");
            }
        }
    });
    return ContactUsView;
});
