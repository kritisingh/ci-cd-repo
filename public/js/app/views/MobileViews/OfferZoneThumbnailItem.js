define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MobileTemplates/OfferZoneThumbnailView.html'
], function ($, _, Backbone, OfferZoneThumbnailTemplate) {
    var ThumbnailItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'prod',
        render: function () {
            $(this.el).html(_.template(OfferZoneThumbnailTemplate, this.model.toJSON()));
           //$(".itemVarientsContainer span:first-child", this.el).addClass("selectedOption");
            return this.el;
        }
    });
    return ThumbnailItemView;
});
