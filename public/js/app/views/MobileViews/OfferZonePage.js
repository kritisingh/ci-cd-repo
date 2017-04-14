define([
    'jquery',
    'underscore',
    'backbone',
    'viewport',
    'collections/SKUs',
    'views/MobileViews/HeaderView',
    'views/MobileViews/OfferZoneProductThumbnailList',
    'text!templates/MobileTemplates/FooterView.html'
], function($, _, Backbone, Viewport, OfferProduct, HeaderView, OfferProductThumbnailList, FooterTemplate) {
    var ThumbnailListView = Backbone.View.extend({
        el: $('body'),
        render: function () {
             $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
             $(".headerWrapper").html(new HeaderView().render());
            $(".middleWrapper").append("<div class='list'><div id = 'waitingIcon'><img src = 'http://cdn2.bcdsn.net/mycitykart/css/images/bx_loader.gif' /></div><ul class='searhedProductList sugestionList'></ul></div>");
             var offerProduct = new OfferProduct(), that = this;
             offerProduct.fetch({data: { dataType: "jsonp", "action": "OFFER-SKUS","site": "MYCITYKART" }, success: function () {
                    $("#waitingIcon").remove();
                    $(".list").append(new OfferProductThumbnailList({collection: offerProduct}).render());
             }});  
             $(".footerWrapper").html(_.template(FooterTemplate, {}));
            return this.el;
        }        
    });
    return ThumbnailListView;
});
