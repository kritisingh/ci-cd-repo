define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'text!templates/MobileTemplates/ServeCitiesQuickView.html',
], function ($, _, Backbone, restApiServer, ServeCitiesQuickViewTemplate) {
  var CityView = Backbone.View.extend({
            render: function () {
                $(this.el).append(_.template(ServeCitiesQuickViewTemplate, {}));
                $(".suggestProductDetailsContainer").css("height", $(window).height());
                return this.el;
            },

            events: {
              'click .closeIcon': 'closeTermsPopup'
            },

            closeTermsPopup: function () {console.log("hhhh");
              $(".suggestProductDetailsContainer").remove();
            }
    });
    return CityView;
});


