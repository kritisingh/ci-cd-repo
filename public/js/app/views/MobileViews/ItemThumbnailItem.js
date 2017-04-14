define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MobileTemplates/ItemThumbnailView.html'
], function ($, _, Backbone, ThumbnailTemplate) {
    var ThumbnailItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'prod',
        render: function () {
            $(this.el).html(_.template(ThumbnailTemplate, this.model.toJSON()));
            $(".itemVarientsContainer span:first-child", this.el).addClass("selectedOption");
            return this.el;
        }
    });
    return ThumbnailItemView;
});


