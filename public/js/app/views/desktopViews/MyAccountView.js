define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/MyAccountView.html',
    'text!templates/desktopTemplates/NewUserFormView.html'
], function ($, _, Backbone, MyAccountTemplate, NewUserFormTemplate) {
  var ThumbnailItemView = Backbone.View.extend({
            tagName: 'div',
            className: "PopupContainer",
            render: function () {
                $(this.el).html(_.template(MyAccountTemplate, {}));
                return this.el;
            },

            events: {
                "click .closePopup"                  : "closePopup",
                "click .newUser_btn"                 : "newUserForm",
                "click span#backToSignIn"            : "signInPage",
                "click .signIn_btn"                  : "userDetail",
                'blur input[type="text"].mandatory'  : 'validate',
                'blur input[type="password"].mandatory'  : 'validate',
                'focus input[type="text"]' : 'removeErrMsg'
            },

            signInPage: function () {
                $(".newUserDetailContainer").hide();
                $(".myAccountDetailsContainer").show();
            },

            closePopup: function () {
                $(".PopupContainer").remove();
            },

            removeErrMsg: function () {
                $("#err1").css("display", "none");
            },

            validate: function (e) {
                var value = $(e.target).val(), id = $(e.target).attr("id"),  filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, number = /^0/;
                if (id === "password") {                              //************ Name Validations ************
                    if ((value === "") || (value.length < 6) || (value.length > 15)) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "newEmailId") {                  //************ E-mail Validations ************
                    if ((!filter.test(value)) || (value === "")) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "useremail") {                  //************ E-mail Validations ************
                    if ((!filter.test(value)) || (value === "")) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if ((id === "newFirstName") || (id === "newLastName")) {              //************ Name Validations ************
                    if ((value === "") || (!isNaN(value)) || (value.length < 3) || (value.length > 15)) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "newMobNo") {                    //************ Mobile Number Validations ************
                    if ((((value === "") || (value.length !== 10) || (isNaN(value))) && ((value.search(number)) || (value.length !== 11))) || ((value.search(number)) || (value.length === 10)) && ((!value.search(number)) || (value.length !== 10))) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "zipNo") {                  //************ E-mail Validations ************
                    if ((value.length !== 6) || (value === "")) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "crpassword") {                              //************ Name Validations ************
                    if ((value === "") || (value.length < 6) || (value.length > 15)) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "conpassword") {                              //************ Name Validations ************
                    if ((value === "") || (value.length < 6) || (value.length > 15)) {
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
                $("#err3").html("");
                $("#err2").html("");
            },

            newUserForm: function () {
                $(".myAccountDetailsContainer").hide();
                $(".newUserDetailContainer").html(_.template(NewUserFormTemplate, {})).css("display", "block");
            }
        });
    return ThumbnailItemView;
});


