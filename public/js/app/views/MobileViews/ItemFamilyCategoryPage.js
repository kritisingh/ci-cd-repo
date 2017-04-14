define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/BrickCatListView.html',
    'text!templates/MobileTemplates/FooterView.html',
    'collections/Category'
], function ($, _, Backbone, HeaderView, BrickCatListTemplate, FooterTemplate, Category) {
    var BrickCategory = Backbone.View.extend({
        el: $('body'),
        render: function (cat) {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            var brickCats = new Category(), that = this;
            $(".headerWrapper").html(new HeaderView().render(0, cat));
            brickCats.fetch({data: { dataType: "jsonp", "action": "CATEGORY", "type": "BRICK", "category": cat}, success: function () {
                $('.middleWrapper').html(_.template(BrickCatListTemplate, {collection: brickCats}));
            }});
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        }
    });
    return BrickCategory;
});
