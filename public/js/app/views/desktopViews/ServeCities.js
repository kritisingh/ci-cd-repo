define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'text!templates/desktopTemplates/ServeCitiesQuickView.html',
], function ($, _, Backbone, restApiServer, ServeCitiesQuickViewTemplate) {
  var ThumbnailItemView = Backbone.View.extend({
            tagName: 'div',
            className: "PopupContainer",
            render: function () {
                $(this.el).html(_.template(ServeCitiesQuickViewTemplate, {}));
                return this.el;
            },

            events: {
                "click .closePopup"                  : "closePopup"
            },

            closePopup: function () {
                $(".PopupContainer").remove();
            }
        });
    return ThumbnailItemView;
});


