define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/ContactUsBannerView.html'
], function ($, _, Backbone, ContactUsBannerTemplate) {
  var ContactUsBannerView = Backbone.View.extend({
            tagName: 'div',
            className: "aboutus",
            render: function () {
                var that = this;
                $(that.el).append(_.template(ContactUsBannerTemplate, {}));
                return this.el;
            }
        });
    return ContactUsBannerView;
});


