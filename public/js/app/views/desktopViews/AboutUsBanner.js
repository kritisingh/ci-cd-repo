define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/AboutUsView.html'
], function ($, _, Backbone, AboutUsTemplate) {
  var AboutUsBannerView = Backbone.View.extend({
            tagName: 'div',
            className: "aboutus",
            render: function () {
                var that = this;
                $(that.el).append(_.template(AboutUsTemplate, {}));
                return this.el;
            }
        });
    return AboutUsBannerView;
});


