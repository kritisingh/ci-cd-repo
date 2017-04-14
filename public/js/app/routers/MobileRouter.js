define([
  "jquery",
  "backbone",
  "jqueryCookie",
  "restApiServer",
  "views/MobileViews/HomePage",
  "views/MobileViews/ItemCategoryPage",
  "views/MobileViews/ItemFamilyCategoryPage",
  "views/MobileViews/ShoppingCartPage",
  "views/MobileViews/GroceryProdDetailPage",
  "views/MobileViews/OfferProdDetailPage",
  "views/MobileViews/BestSellingProdDetailPage",
  "views/MobileViews/shippingDetails",
  "views/MobileViews/ConfirmOrderPage",
  "views/MobileViews/PaymentPage",
  "views/MobileViews/SearchPage",
  "views/MobileViews/TrackOrder",
  "views/MobileViews/AboutusPage",
  "views/MobileViews/ContactusPage",
  "views/MobileViews/PoliciesPage",
  "views/MobileViews/OfferProductPage",
  "views/MobileViews/OfferZonePage",
  "views/MobileViews/SuggestProduct",
  'views/MobileViews/OrderDetails'
],
  function($, Backbone, jqueryCookie, restApiServer, HomePageView, ItemCategoryPageView, ItemFamilyCategoryPage, ShoppingCartPageView, GroceryProdDetailPageView, OfferProdDetailPageView, BestSellingProdDetailPageView, ShippingDetailsView, ConfirmOrderPageView, PaymentPageView, SearchPageView, TrackorderView, AboutusPageView, ContactusPageView, PoliciesPageView, OfferProductPageView, OfferZonePageView, SuggestProductView, OrderDetailsView) {
    var MobileRouter = Backbone.Router.extend({
      initialize: function() {
        Backbone.history.start();
      },
      routes: {
        ""                          : "homePage",
        "ifc/:catid"                : "itemFamilyCatPage",
        "ibc/:catid"                : "itemCatPage",
        "ShoppingCart"              : "cartPage",
        "gp/:id"                    : "groceryProdDetailPage",
        "op/:id"                    : "offerProdDetailPage",
        "bp/:id"                    : "BestSellingProdDetailPage",
        "checkout/ShippingDetails"  : "shippingDetails",
        "checkout/confirmOrder/:id" : "confirmOrder",
        "checkout/payment/:id/:amt" : "payment",
	"searchResult/:text"        : "searchPage",
        "trackorder"                : "trackorder",
        "aboutus"                   : "aboutus",
        "contactus"                 : "contactus",
        "policies"                  : "policies",
        "mostPopular"               : "mostpopular",
        "offerZone"                 : "offerZone",
        "suggestProduct"            : "suggestProd",
        "order_details/:orderNumber/:orderAcessToken/:emailId" : "orderDetails"
      },

      homePage: function(){
        //$.removeCookie('uid');
	if(!$.cookie('uid')){
	  $.ajax({
 	    type: "POST",
 	    url: restApiServer.ReSTFulAPIHost + '/uidReceive',
	    data: "",
 	    success: function(data) {
	      $.cookie('uid', data.uid, { expires: 700, path: '/'});
	      new HomePageView().render();
 	    },
	    error: function(err){
	      console.log(err);
	    },
 	    dataType: 'json'
          });	   
	}else{
          new HomePageView().render();
	}
      },

      itemFamilyCatPage: function(cat){
	new ItemFamilyCategoryPage().render(cat);
      },

      itemCatPage: function(cat){
	new ItemCategoryPageView().render(cat);
      },

      groceryProdDetailPage: function(id){
	new GroceryProdDetailPageView().render(id);
      },

      offerProdDetailPage: function(id){
	new OfferProdDetailPageView().render(id);
      },

      BestSellingProdDetailPage: function(id){
	new BestSellingProdDetailPageView().render(id);
      },

      searchPage: function(text){
	new SearchPageView().render(text);
      },

      cartPage: function(){
	new ShoppingCartPageView().render();
      },

      aboutus: function(){
	new AboutusPageView().render();
      },

      contactus: function(){
	new ContactusPageView().render();
      },

      policies: function(){
	new PoliciesPageView().render();
      },

      shippingDetails: function(){
	new ShippingDetailsView().render();
      },

      confirmOrder: function(id){
        new ConfirmOrderPageView().render(id);
      },

      payment: function(id, amt){
        new PaymentPageView().render(id, amt);
      },

      trackorder: function(){
        new TrackorderView().render();
      },

     mostpopular: function() {
        new OfferProductPageView().render();
     },

     offerZone: function() {
        new OfferZonePageView().render();
     },

     suggestProd: function() {
        new SuggestProductView().render();
     },

     orderDetails: function (odrno,token,emailid) {
        new OrderDetailsView().render(odrno,token,emailid);
     }

    });
    return MobileRouter;
  }
);
