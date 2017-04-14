define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/desktopViews/Footer',
    'views/desktopViews/TermsAndConditions',
    'views/desktopViews/MainView',
    'text!templates/desktopTemplates/ShippingDetailsView.html',
    'text!templates/desktopTemplates/OrderSummaryView.html',
    'text!templates/desktopTemplates/TermsAndConditionsContainerView.html',
    'collections/CartItems',
    'collections/City',
    'collections/PartyUids'
], function ($, _, Backbone, restApiServer, FooterView, TermsAndConditionsView, MainView, ShippingDetailsTemplate, OrderSummaryTemplate, TermsAndConditionsContainerTemplate, CartItems, CityLocation, PartyUids) {
  var ShippingDetailsView = Backbone.View.extend({
            el: $('body'),
            render: function () {
                var that = this,  cartItem = new CartItems(), cityLocation = new CityLocation(), shippingUid = new PartyUids();
                this.subTotal = 0;
                this.grandTotal = 0;
                this.count = 0;
                this.$el.append(new MainView().render());
                $('#outerContainer', that.el).html(_.template(ShippingDetailsTemplate, {}));
                //$(".shippingDetailForm", this.el).append("<img class='loadingImg' src='http://cdn2.bcdsn.net/mycitykart/css/images/bx_loader.gif' />");
                shippingUid.fetch({data: { dataType: "jsonp",  "uid": $.cookie('uid'), "action": "SHIPPING-INFO"}, success: function (party) {
                    if (party.toJSON().length) {
                        $("#firstName", that.el).val(party.toJSON()[0].firstName).addClass("valid", that.el);
                        $("#lastName", that.el).val(party.toJSON()[0].lastName).addClass("valid", that.el);
                        $("#mobNo", that.el).val(party.toJSON()[0].contactNumber[0].contactNum).addClass("valid", that.el);
                        $("#emailId", that.el).val(party.toJSON()[0].partyKey).addClass("valid", that.el);
                        $("#postalCode", that.el).val(party.toJSON()[0].pincode).addClass("valid", that.el);
                        $("#address", that.el).val(party.toJSON()[0].address).addClass("valid", that.el);
                    }
                    $(".loadingImg").remove();
                }});
                $(this.el).off('click', '#submit');
                $("#submit", this.el).click(this.submitOrder);
                //$('.continueOrderbtn', this.el).append(new ShippingDetailsPageView().render());
                $('.content', this.el).append(_.template(OrderSummaryTemplate, {}));
                $('#footer').html(new FooterView().render());
                cartItem.fetch({data: { dataType: "jsonp",  "uid": $.cookie('uid')}, success: function () {
                    cartItem.forEach(that.addItem, that);
                    $(".items").html(that.count);
                    $(".subTotal").html(that.subTotal.toFixed(2));
                    $(".grandTotal").html(that.subTotal.toFixed(2));
                    $(".count", that.el).html(that.count);
                }});
                cityLocation.fetch({ data: { dataType: "jsonp", "city": "BC-PUNE"}, success: function () {
                    cityLocation.each(function (locality) {
                        $("#locality", this.el).append("<option id= " + locality.toJSON()._id + ">" + locality.toJSON().suburb + "</option>");
                    });
                }});
                $(that.el).append(_.template(TermsAndConditionsContainerTemplate, {}));
                //$(".disabledContainer", this.el).show();
            },

            events: {
                'blur input[type="text"]' : 'validate',
                'blur textarea' : 'validate',
                'focus input[type="text"]' : 'removeErrMsg',
                'focus input[type="checkbox"]' : 'removeErrMsg',
                'click .termsAndConditions #terms' : 'terms',
                'click .termsAndConditions a' : 'termsAndConditionsPopup'
                //'click #submit' : 'submitOrder'
            },

            addItem: function (item) {
                this.subTotal = this.subTotal + ((parseFloat(item.toJSON().price)) * (parseInt(item.toJSON().qty)));
                this.count = this.count + (parseInt(item.toJSON().qty));
            },

            removeErrMsg: function () {
                $("#err").css("display", "none");
            },

            validate: function (e) {
                var value = $(e.target).val(), id = $(e.target).attr("id"),  filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, number = /^0/;
                if ((id === "firstName") || (id === "lastName")) {                              //************ Name Validations ************
                    if ((value === "") || (!isNaN(value)) || (value.length < 3) || (value.length > 15)) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "mobNo") {                    //************ Mobile Number Validations ************
                    if ((((value === "") || (value.length !== 10) || (isNaN(value))) && ((value.search(number)) || (value.length !== 11))) || ((value.search(number)) || (value.length === 10)) && ((!value.search(number)) || (value.length !== 10))) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "emailId") {                  //************ E-mail Validations ************
                    if ((!filter.test(value)) || (value === "")) {
                        this.invalid(e);
                    } else {
                        this.valid(e);
                    }
                } else if (id === "postalCode") {                  //************ E-mail Validations ************
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
                $("#err1").html("");
            },

            terms: function (e) {
                if ($(e.target).is(":checked")) {
                    $(e.target).addClass("valid");
                } else {
                    $(e.target).removeClass("valid");
                }
            },

            termsAndConditionsPopup: function () {
                $('.termsAndConditionsContainer').append(new TermsAndConditionsView().render());
            },

            submitOrder: function () {
                var flag = 0, orderNo, CustomerData = { "shippingDetail": {"emailId": $('#emailId').val(), "fullName": $(".firstName").val() + " " + $(".lastName").val(), "mobileNumber": $('#mobNo').val(), "address": $("#address").val(), "city": $("#city option:selected").attr("id"), "postcode": $("#postalCode").val() }, "uid": $.cookie('uid')};
                $(".mandatory").each(function () {
                    if (!($(this).hasClass("valid"))) {
                        flag = 1;
                    }
                });
                if ((flag === 0) && ($("#terms").is(":checked"))) {console.log(CustomerData);
                    $.ajax({
                        type: "POST",
                        contentType : "application/json",
                        url: restApiServer.ReSTFulAPIHost + '/order',
                        data: JSON.stringify(CustomerData),
                        dataType: 'json',
                        success: function (result) {
                            orderNo = result.orderNumber;
                            window.location = "#confirmOrder/" + orderNo;
                        }
                    });
                } else if ((flag === 0) && (!$("#terms").is(":checked"))) {
                    $("#err").html("<div class='alert-error'>Accept terms and conditions</div>").css("display", "block");
                } else {
                    $("#err").html("<div class='alert-error'>Please enter valid information</div>");
                }
            }
        });
    return ShippingDetailsView;
});
