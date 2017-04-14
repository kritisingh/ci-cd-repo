define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/TermsAndConditionsView.html'
], function ($, _, Backbone, TermsAndConditionsTemplate) {
   var TermsAndConditionsView = Backbone.View.extend({
            tagName: "div",
            className: "termsAndConditionsBlock tcBlock",
            render: function () {
                $(this.el).html(_.template(TermsAndConditionsTemplate, {})).css("display", "block");
                return this.el;
            },

            events: {
                'click .closeIcon' : 'closeTerms'
            },

            closeTerms: function () {
                $('.termsAndConditionsContainer').html("");
            }
        });
    return TermsAndConditionsView;
});
