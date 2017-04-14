define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/SelectCityPopupView.html'
], function ($, _, Backbone, SelectCityPopupTemplate) {

   var SelectCityPopupView = Backbone.View.extend({
            el: $('body'),
            render: function () {
                $(this.el).append(_.template(SelectCityPopupTemplate, {}));
            },

            events: {
                "click #setCity": "setCity"
            },

            setCity: function () {
                var city = $(".cityList option:selected").attr("id");
                $.cookie('city', city, { expires: 700, path: '/' });
                $(".popupContainer").remove();
                window.location.reload();
            }
        });
    return SelectCityPopupView;
});
