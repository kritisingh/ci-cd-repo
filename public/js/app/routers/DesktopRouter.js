// DesktopRouter.js
// ----------------
define([
    'jquery',
    'backbone',
    'bootstrap',
    'restApiServer',
    'jqueryCookie',
    'views/desktopViews/HomePage',
    'views/desktopViews/ItemCatPage',
    'views/desktopViews/SearchResultPage',
    'views/desktopViews/MycartPage',
    'views/desktopViews/AboutUs',
    'views/desktopViews/ContactUs',
    'views/desktopViews/Policies',
    'views/desktopViews/ShippingDetails',
    'views/desktopViews/ConfirmOrderPage',
    'views/desktopViews/PaymentPage',
    'views/desktopViews/TrackOrder',
    'views/desktopViews/ItemFamilyCatPage',
    'views/desktopViews/BrandSearchPage',
    'views/desktopViews/OfferZonePage',
    'views/desktopViews/OrderDetails'
], function ($, Backbone, bootstrap, restApiServer, jqueryCookie, HomePageView, ItemCatPageView, SearchResultPageView, MycartPageView, AboutUsView, ContactUsView, PoliciesView, ShippingDetailsView, ConfirmOrderView, PaymentPageView, TrackOrderView, ItemFamilyCatPageView, BrandSearchPageView, OfferZonePageView, OrderDetailsView) {
  var DesktopRouter = Backbone.Router.extend({
            initialize: function () {
                Backbone.history.start();
            },

            routes: {
                "" : "homePage",
                "sbc/:catid" : "sbcPage",
                "ibc/:catid" : "ibcPage",
                "ifc/:catid" : "ifcPage",
                "bsp/:catid" : "bspPage",
                "Products/:prodid" : "prod_details",
                "searchResult/:text" : "searchResultPage",
                "ShoppingCart" : "myCartPage",
                "aboutus" : "aboutus",
                "contactus" : "contactus",
                "policies" : "policies",
                "placeOrder" : "shippingDetails",
                "confirmOrder/:orderNo" : "confirmOrder",
                "payment/:OrderNo/:amt" : "payment",
                "trackorder" : "trackOrder",
                "offerzone" : "offerZonePage",
                "order_details/:orderNumber/:orderAcessToken/:emailId" : "orderDetails"
            },

             homePage: function () {
                if (!$.cookie('uid')) {
                    $.ajax({
                        type: "POST",
                        url: restApiServer.ReSTFulAPIHost + '/uidReceive',
                        data: "",
                        dataType: 'json',
                        success: function(data) {
                            $.cookie('uid', data.uid, { expires: 700, path: '/'});
                        }
                    });
                }
                new HomePageView().render();
            },

            ibcPage: function (cat, dept) {
                new ItemCatPageView().render(cat, dept);
            },

            ifcPage: function (cat, dept) {
                new ItemFamilyCatPageView().render(cat, dept);
            },

            searchResultPage: function (text) {
                new SearchResultPageView().render(text);
            },

            myCartPage: function () {
                new MycartPageView().render();
            },

            aboutus: function () {
                new AboutUsView().render();
            },

            contactus: function () {
                new ContactUsView().render();
            },

            policies: function () {
                new PoliciesView().render();
            },

            shippingDetails: function () {
                var QueryString = function () {
                    var query_string = {}, query = window.location.search.substring(1), vars = query.split("&"),  pair, i, arr;
                    for (i = 0; i < vars.length; i++) {
                        pair = vars[i].split("=");
                        if (typeof query_string[pair[0]] === "undefined") {
                            query_string[pair[0]] = pair[1];
                        } else if (typeof query_string[pair[0]] === "string") {
                            arr = [ query_string[pair[0]], pair[1] ];
                            query_string[pair[0]] = arr;
                        } else {
                            query_string[pair[0]].push(pair[1]);
                        }
                    }
                    return query_string;
                }();
                new ShippingDetailsView().render(QueryString.text);
            },

            confirmOrder: function (orderNo) {
                new ConfirmOrderView().render(orderNo);
            },

            payment: function (OrderNo, amt) {
                new PaymentPageView().render(OrderNo, amt);
            },

            trackOrder: function () {
                new TrackOrderView().render();
            },

            bspPage: function (brand) {
               new BrandSearchPageView().render(brand);
            },

            offerZonePage: function () {
              new OfferZonePageView().render();
            },

            orderDetails: function (odrno,token,emailid) {
              new OrderDetailsView().render(odrno,token,emailid);
            }
        });
    return DesktopRouter;
});
