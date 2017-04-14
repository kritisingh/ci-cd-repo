define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/OfferZoneView.html',
    'views/desktopViews/MainView',
    'views/desktopViews/OfferZoneProductThumbnailList',
    'collections/SKUs'
], function ($, _, Backbone, OfferZoneTemplate, MainView, OfferZoneProductThumbnailListView, OfferProduct) {
  var OfferZonePageView = Backbone.View.extend({
            el: $('#outerContainer'),
            render: function () {
                var that = this, offerProduct = new OfferProduct();
                this.$el.html(new MainView().render());
                $('#outerContainer').html(_.template(OfferZoneTemplate, {}));
                offerProduct.fetch({data: { dataType: "jsonp", "action": "OFFER-SKUS", "site": "MYCITYKART"}, success: function () {
                    $("#waitingIcon").hide();
                    $(that.el).append(new OfferZoneProductThumbnailListView({collection: offerProduct}).render());
                }});
            }
        });
    return OfferZonePageView;
});
