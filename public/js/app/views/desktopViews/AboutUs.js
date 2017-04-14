define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MainView',
    'views/desktopViews/AboutUsBanner'
], function ($, _, Backbone, MainView, AboutUsBannerView) {
  var AboutUsView = Backbone.View.extend({
            el: $('#outerContainer'),
            render: function () {
                this.$el.append(new MainView().render());
                $('#outerContainer').html(new AboutUsBannerView().render());
                return this.el;
            }
        });
    return AboutUsView;
});
