define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/MobileViews/TermsAndConditionsPopup',
    'text!templates/MobileTemplates/ShippingDetailsFormView.html',
    'collections/City',
    'collections/SubLocality',
    'collections/PartyUids'
], function ($, _, Backbone, restApiServer, TermsAndConditionsView, ShippingDetailsFormTemplate, City, SubLocality, PartyUids) {
    var SliderView = Backbone.View.extend({
        render: function() {
            this.count = 0;
            var shippingUid = new PartyUids(), that = this;
            $(this.el).html(_.template(ShippingDetailsFormTemplate, {}));
            $(".form", this.el).append("<img class='loadingImg' src='http://cdn2.bcdsn.net/mycitykart/css/images/bx_loader.gif' />");
                shippingUid.fetch({data: { dataType: "jsonp",  "uid":$.cookie('uid'), "action":"SHIPPING-INFO"}, success: function (party) {
                   if(party.toJSON().length){
                       $("#firstName", that.el).val(party.toJSON()[0].firstName).addClass("valid", that.el);
                       $("#lastName", that.el).val(party.toJSON()[0].lastName).addClass("valid" ,that.el);
                       $("#mobNumber", that.el).val(party.toJSON()[0].contactNumber[0].contactNum).addClass("valid", that.el);
                       $("#emailId", that.el).val(party.toJSON()[0].partyKey).addClass("valid", that.el);
                       $("#postalCode", that.el).val(party.toJSON()[0].pincode).addClass("valid", that.el);
                       $("#address", that.el).val(party.toJSON()[0].address).addClass("valid", that.el);
                   }
                  $(".loadingImg").remove();
                }});
            return this.el;
        },
        events: {
            'blur input[type="text"]'                     : 'validate',
            'blur #address'                               : 'validate',
            'click #terms'                                : 'terms',
            'click .terms_conditions'                     : 'termsAndConditionsPopup',
            'click #continue'                             : 'confirmOrderPage',
            'focus input[type="text"]'                    : 'removeErrMsg'
            //'click .formTabs ul.shopByCatDiv li .formTab' : 'formTabs',
            //'blur #postalCode'                            : 'verifyPostalCode',
            //'focus #postalCode'                           : 'disableAddress',
            //'blur #society'                               : 'wings',
            //'click #society'                              : 'emptyWings',
            //'click .loadingIconContainer'                 : 'errMessage',
        },
        emptyWings: function () {
            $("#wing").html("<option></option>");
        },
        errMessage: function (e) {
            $(".postalCode").removeClass("valid");
            $(".postalCode").css("border-color", "red");
        },
        disableAddress: function () {
            $(".loadingIconContainer", this.el).show();
        },
        wings: function () {
            $("#wing").html("<option></option>");
            var societyWings = $("#society option:selected").attr("wings").split(',');
            societyWings.forEach(function (wing) {
                $("#wing").append("<option>" + wing + "</option>");
            });
        },
        verifyPostalCode: function (e) {
            this.count = 1;
            var cityLocation = new City(), subLocality = new SubLocality(), that = this;
            cityLocation.fetch({data: {dataType: "jsonp", "pincode": $("#postalCode").val()}, success: function () {
                if (cityLocation.models[0].attributes.flag === 1) {
                    $(".loadingIconContainer img").show();
                    subLocality.fetch({data: {dataType: "jsonp", "pincode": $("#postalCode").val()}, success: function () {
                        $(".loadingIconContainer", this.el).show();
                        $("#society").html("<option></option>");
                        $("#wing").html("<option></option>");
                        subLocality.each(function (society) {
                            $("#society").append("<option wings=" + "\'" + society.toJSON().wings + "\'" + "id=" + "\'" + society.toJSON()._id + "\'" + ">" + society.toJSON().location + "</option>");
                        });
                        /*var societyWings = $("#society option:selected").attr("wings").split(',');
                        societyWings.forEach(function (wing) {
                        $("#wing").append("<option>"+wing+"</option>");
                        });*/
                        $(".loadingIconContainer img", that.el).hide();
                        $(".loadingIconContainer", that.el).hide();
                    }});
                    that.valid(e);
                } else {
                    $("#society").html("<option></option>");
                    that.invalid(e);
                    $("#wing").html("<option></option>");
                }
            }});
        },
        formTabs: function (e) {
            $("." + $(e.target).closest("li").attr("id"), this.el).show().siblings(".formTabContainer").hide();
            $(e.target).closest("li").addClass("activeTab").siblings().removeClass("activeTab");
        },
        termsAndConditionsPopup: function () {
            $(this.el).append(new TermsAndConditionsView().render());
        },

        removeErrMsg: function () {
            $("#err").css("display", "none");
        },

        validate: function (e) {
            var value = $(e.target).val(), id = $(e.target).attr("id"),  filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, number=/^0/;
            if ((id === "firstName") || (id === "lastName")) { //************ Name Validations ************
                if ((value === "") || (!isNaN(value)) || (value.length < 3) || (value.length > 15)) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
            } else if (id === "mobNumber") {             //************ Mobile Number Validations ************
                if ((((value === "") || (value.length !== 10) || (isNaN(value))) && ((value.search(number)) || (value.length !== 11))) || ((value.search(number)) || (value.length === 10)) && ((!value.search(number)) || (value.length !== 10))) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
            } else if (id === "emailId") {                 //************ E-mail Validations ************
                if ((!filter.test(value)) || (value === "")) {
                    this.invalid(e);
                } else {
                    this.valid(e);
                }
           } else if (id === "postalCode") {                 //************ E-mail Validations ************
                if ((value.length !== 6) || (value === "")) {
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
        confirmOrderPage: function () {
            var flag = 0;
            $(".mandatory").each(function () {
                if (!($(this).hasClass("valid"))) {
                    flag = 1;
                }
            });
            if ((flag === 0) && ($("#terms").is(":checked"))) {
                var obj = { "shippingDetail": {"emailId": $('#emailId').val(),
                                            "fullName": $(".firstName").val() + " " + $(".lastName").val(),
                                            "mobileNumber": $('#mobNumber').val(),
                                            "address": $("#address").val(),
                                            "city": $("#city option:selected").attr("id"),
                                            "postcode": $("#postalCode").val()
                                           },
                            "uid": $.cookie('uid')
                };
                $.ajax({
                    type: "POST",
                    url: restApiServer.ReSTFulAPIHost + '/order',
                    data: obj,
                    success: function (data) {
                        window.location = "#checkout/confirmOrder/" + data.orderNumber;
                    },
                    error: function (err) {
                        console.log(err);
                    },
                    dataType: 'json'
                });
            } else if ((flag === 0) && (!$("#terms").is(":checked"))) {
                $("#err").html("<div class='alert-error'>Accept terms and conditions</div>").css("display", "block");
            } else {
                $("#err").html("<div class='alert-error'>Please enter valid information</div>").css("display", "block");
            }
        }
    });
    return SliderView;
});
