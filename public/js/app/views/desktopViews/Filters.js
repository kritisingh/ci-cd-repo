define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/FiltersView.html',
    'collections/AttributeSet'
], function ($, _, Backbone, FiltersTemplate, Attributes) {
  var FiltersView = Backbone.View.extend({
            render: function (cat) {
                var that = this, attributes = new Attributes();
                attributes.fetch({ data: {dataType: "jsonp", "action": "FILTERATTRBYCAT", "_id": cat}, success: function () {
                    $(that.el).append(_.template(FiltersTemplate, attributes.models[0].toJSON()));
                }});
                return this.el;
            }
        });
    return FiltersView;
});
