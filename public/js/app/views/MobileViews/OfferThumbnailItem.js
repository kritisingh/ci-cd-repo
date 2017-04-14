define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MobileTemplates/BestSellingThumbnailView.html'
], function ($, _, Backbone, ItemThumbnailTemplate) {
    var ThumbnailItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'prod',
        render: function () {
            $(this.el).html(_.template(ItemThumbnailTemplate, this.model.toJSON()));
           //$(".itemVarientsContainer span:first-child", this.el).addClass("selectedOption");
            return this.el;
        }
    });
    return ThumbnailItemView;
});
