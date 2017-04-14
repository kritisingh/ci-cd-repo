define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/HomePageCategoriesView.html',
    'text!templates/MobileTemplates/FooterView.html',
    'text!templates/MobileTemplates/DeliverySlotsView.html',
    'text!templates/MobileTemplates/HomePageOfferView.html',
    'collections/sitecategory'
], function ($, _, Backbone, HeaderView, HomePageCategoriesTemplate, FooterTemplate, DeliverySlotsTemplate, HomePageOfferTemplate, Sitecategory) {
    var HomePageView = Backbone.View.extend({
        el: $('body'),
        render: function () {
            var featuredcategory = new Sitecategory();
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render(0, ""));
            $('.middleWrapper').append(_.template(HomePageOfferTemplate, {}));
            $('.middleWrapper').append(_.template(HomePageCategoriesTemplate, {}));
            var now = new Date(), hour = now.getHours();
            $('.middleWrapper').append(_.template(DeliverySlotsTemplate, {hour:hour}));
            /*featuredcategory.fetch({data: { dataType: "jsonp", "action": "SITE-CATEGORY"}, success: function () {
                $('.middleWrapper').append(_.template(HomePageCategoriesTemplate, {collection: featuredcategory}));
                var now = new Date(), hour = now.getHours();
                $('.middleWrapper').append(_.template(DeliverySlotsTemplate, {hour:hour}));
            }});*/
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        }
    });
    return HomePageView;
});
