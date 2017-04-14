define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/ContactUsView.html'
], function ($, _, Backbone, ContactUsTemplate) {
  var ContactUsFormView = Backbone.View.extend({
            tagName: 'div',
            className: "ContactUsForm",
            render: function () {
                var that = this;
                $(that.el).html(_.template(ContactUsTemplate, {}));
                return this.el;
            }
        });
    return ContactUsFormView;
});


