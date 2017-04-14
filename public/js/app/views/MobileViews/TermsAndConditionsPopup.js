define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MobileTemplates/TermsAndConditionsPopupView.html'
], function ($, _, Backbone, TermsAndConditionsPopupTemplate) {
    var TermsAndConditionsPopup = Backbone.View.extend({
        render: function () {
            $(this.el).append(_.template(TermsAndConditionsPopupTemplate, {}));
            $(".termsContainer").css("height", $(window).height());
            return this.el;
        },
        events: {
            'click .closeIcon': 'closeTermsPopup'
        },
        closeTermsPopup: function () {
            $(".termsContainer").remove();
        }
    });
    return TermsAndConditionsPopup;
});
