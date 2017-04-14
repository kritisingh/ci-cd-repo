define([
    'jquery',
    'underscore',
    'backbone',
    'collections/Banner',
    'text!templates/desktopTemplates/AddSubmenuBarView.html'
], function ($, _, Backbone, Banners, AddSubmenuBarTemplate) {
  var AddSubmenuBarView = Backbone.View.extend({
            tagName: 'div',
            className: "add",
            render: function (cat, context) {
                var banners = new Banners(), that = this;
                banners.fetch({data: { dataType: "jsonp", "site" : "MYCITYKART", "context" : context, "contextId" : cat, "sortBy": "-adImagePaths.rating", "limit": 3, "city": "BC-PUNE"}, success: function () {
                    $(that.el).append(_.template(AddSubmenuBarTemplate, {bannerImg : banners.models[0].toJSON() }));
                }});
                return this.el;
            }
        });
    return AddSubmenuBarView;
});
