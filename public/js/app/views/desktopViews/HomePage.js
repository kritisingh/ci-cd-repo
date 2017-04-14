define([
    'jquery',
    'underscore',
    'backbone',
    'jcarousel',
    'text!templates/desktopTemplates/HomePageCatView.html',
    'text!templates/desktopTemplates/OffersView.html',
    'text!templates/desktopTemplates/DeliveryDetailView.html',
    'text!templates/desktopTemplates/DeliverySlotTime.html',
    'text!templates/desktopTemplates/AboutMycityKartView.html',
    'text!templates/desktopTemplates/HomePageAssortmentView.html',
    'views/desktopViews/MainView',
    'views/desktopViews/Slider',
    'views/desktopViews/OfferProductThumbnailList',
    'collections/sitecategory',
    'collections/SKUs'
], function ($, _, Backbone, jcarousel, HomePageCatTemplate, OffersTemplate, DeliveryDetailsTemplate, DeliverySlotTimeTemplate, AboutMycityKartTemplate, HomePageAssortmentTemplate, MainView, SliderView, OfferProductThumbnailListView, Sitecategory, BestSeller) {
  var HomePageView = Backbone.View.extend({
            el: $('#outerContainer'),
            render: function () {
                this.$el.append(new MainView().render());
                $('#outerContainer').html(_.template(DeliverySlotTimeTemplate, {}));
                $('#outerContainer').append(new SliderView().render());
                $('#outerContainer').append(_.template(OffersTemplate, {}));
                $('#outerContainer').append(_.template(DeliveryDetailsTemplate, {}));
                $('#outerContainer').append(_.template(HomePageAssortmentTemplate, {}));
                var bestSeller = new BestSeller(), that = this, featuredcategory = new Sitecategory();
               /* bestSeller.fetch({data: { dataType: "jsonp", "action": "BEST-SELLING", "site": "MYCITYKART"}, success: function () {
                    $(".homePageBestSellingHeader", that.el).html('MOST POPULAR');
                    $('.offersContainer2', that.el).append(new OfferProductThumbnailListView({collection: bestSeller}).render());
                }});*/
                $('.homePageCatList').append(_.template(HomePageCatTemplate, {}));
                /*featuredcategory.fetch({data: { dataType: "jsonp", "action": "SITE-CATEGORY"}, success: function () {
                   featuredcategory.each(that.addOneItem, that);
                    $('.first-and-second-carousel', that.el).jcarousel({
                        scroll: 1,
                        initCallback: mycarousel_initCallback1,
                        btnnext: "#next",
                        btnprev: "#prev",
                        wrap: 'circular',
                        itemFallbackDimension: 145
                    });
                }});
                function mycarousel_initCallback1(carousel) {
                    jQuery('#next').bind('click', function () {
                        carousel.next();
                        return false;
                    });
                    jQuery('#prev').bind('click', function () {
                        carousel.prev();
                        return false;
                    });
                };*/
                $('#outerContainer').append(_.template(AboutMycityKartTemplate, {}));
                return this.el;
            },

            addOneItem: function (item) {
                $('.homePageCatList').append(_.template(HomePageCatTemplate, {collection: item.toJSON()}));
            }
        });
    return HomePageView;
});
