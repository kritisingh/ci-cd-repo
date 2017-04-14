define([
    'jquery',
    'underscore',
    'backbone',
    'collections/AttributeSet',
    'text!templates/MobileTemplates/FiltersView.html',
    'text!templates/desktopTemplates/FiltersBrandsView.html',
    'collections/Brand'
], function ($, _, Backbone, Attributes, FiltersTemplate, FiltersBrandsTemplate, Brand) {
    var FiltersView = Backbone.View.extend({
        tagName: 'div',
        className: "subMenuBar",
        render: function (cat) {
            var that = this, attributes = new Attributes(), brand = new Brand();
            attributes.fetch({ data: {dataType: "jsonp", "action": "FILTERATTRBYCAT", "_id": cat}, success: function () {
                $(that.el).append(_.template(FiltersTemplate, attributes.models[0].toJSON()));
                brand.fetch({data: { dataType: "jsonp", "categories": cat}, success: function () {
                    brand.each(that.addOneItem, that);
                }});
                $(".filtersContainer").css("height", $(window).height() - 24);
            }});
            return this.el;
        },
        addOneItem: function (item) {
            $('.atribute', this.el).append(_.template(FiltersBrandsTemplate, item.toJSON()));
        },
        events: {
            "click .filterBtn" : "slideFilters"
        },
        slideFilters: function () {
            $('.headerMenuBar').slideUp("fast");
            $(".wrapper").css("overflow-y", "hidden");
            $(".filtersContainer", this.el).slideToggle();
        }
    });
    return FiltersView;
});
