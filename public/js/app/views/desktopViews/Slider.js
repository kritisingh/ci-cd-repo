define([
    'jquery',
    'underscore',
    'backbone',
    'slider',
    'collections/Banner',
    'text!templates/desktopTemplates/SliderView.html'
], function ($, _, Backbone, Slider, Banners, SliderTemplate) {
   var SliderView = Backbone.View.extend({
            tagName: 'div',
            className: "sliderContainer",
            render: function () {
                var banners = new Banners(), that = this;
                $(this.el).append("<div id='slides'></div>");
                $("#slides", this.el).append(_.template(SliderTemplate, {}));
                /*banners.fetch({data: { dataType: "jsonp", "site" : "MYCITYKART", "context" : "SITE-LEVEL", "contextId" : "MAIN-SLIDER-01", "sortBy": "-adImagePaths.rating", "city": "BC-PUNE"}, success: function () {
                    $(that.el).append("<div id='slides'><a href='#' class='slidesjs-previous slidesjs-navigation'><div class='prev'></div></a><a href='#' class='slidesjs-next slidesjs-navigation'><div class='next'></div></a></div>");

                    banners.forEach(that.addOneItem, that);

                    $('#slides').slidesjs({
                        width: 716,
                        height: 295,
                        navigation: true,
                        play: {
                            auto: true,
                            interval: 4000,
                            swap: true,
                            effect: "fade"
                        },
                        pagination: {
                            active: true,
                            effect: "fade"
                        }
                    });
                }});*/
                return this.el;
            },

            addOneItem: function (item) {
                $("#slides", this.el).append(_.template(SliderTemplate, item.toJSON()));
            }
        });
    return SliderView;
});
