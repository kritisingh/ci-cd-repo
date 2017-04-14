define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/desktopViews/MainView',
    'views/desktopViews/ContactUsForm',
    'text!templates/desktopTemplates/ContactUsContainerView.html'
], function ($, _, Backbone, restApiServer, MainView, ContactUsFormView, ContactUsContainerTemplate) {
       var ContactUsView = Backbone.View.extend({
            el: $('#outerContainer'),
            render: function () {
                this.$el.append(new MainView().render());
                $('#outerContainer').html(_.template(ContactUsContainerTemplate, {}));
                $('.contactUsBlock').append(new ContactUsFormView().render());
                return this.el;
            },

            events: {
                'click .okBtn' : 'send',
                'blur input[type="text"]' : 'validate',
                'blur #comment' : 'validate',
                'click #closePopup' : 'closePopup'
            },

            closePopup: function () {
                $('input[type="text"]').val("");
                $('#comment').val("");
                $('.msgContainer').remove();
            },

            validate: function (e) {
                var value = $(e.target).val(), id = $(e.target).attr("id"), number = /^0/, filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if ((id === "firstName") || (id === "lastName")) {            //************ Name Validations ************
                    if ((value === "") || (!isNaN(value)) || (value.length < 3) || (value.length > 15)) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "comment") {                                  //************ Comments Validations ************
                    if ((value ===  "") || (value.length < 3)) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "mobNumber") {    //************ Mobile Number Validations ************   
                    if ((((value === "") || (value.length !== 10) || (isNaN(value))) && ((value.search(number)) || (value.length !== 11))) || ((value.search(number)) || (value.length === 10)) && ((!value.search(number)) || (value.length !== 10))) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "emailId") {//************ E-mail Validations ************
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

            send: function () {
                var flag = 0, fname = $(".firstName").val(), lname = $(".lastName").val(), email = $(".mailId").val(), number = $(".mbNumber").val(), description = $("#comment").val(), obj = {"name" : fname + " " + lname, "mobileNo" : number, "emailId"  : email, "description" : description};
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
                            $(".nigotiateOperationDialog").append("<div class='msgContainer'><div class='successMsg'>Your message is sent successfully.</br> Our sales team will contact you ASAP.</br><button id='closePopup' style='margin: 12px 0 0 120px;' class='btn-success btn'>OK</button></div></div>");
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
