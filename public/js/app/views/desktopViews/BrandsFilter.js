define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/BrandFiltersView.html',
    'collections/Category'
], function($, _, Backbone, BrandFiltersTemplate, BrandAttributes) {
    var FiltersView = Backbone.View.extend({
            render: function (cat) {
                var that = this, brandAttributes = new BrandAttributes();
                brandAttributes.fetch({ data: {dataType: "jsonp", "_id": cat}, success: function () {
                    $(that.el).append(_.template(BrandFiltersTemplate, brandAttributes.models[0].toJSON()));
                }});
                return this.el;
            }
        });
    return FiltersView;
});
