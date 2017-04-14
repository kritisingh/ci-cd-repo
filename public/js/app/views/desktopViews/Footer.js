define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/FooterView.html'
], function ($, _, Backbone, FooterTemplate) {
  var FooterView = Backbone.View.extend({
            render: function () {
                var compiledTemplate = _.template(FooterTemplate, {});
                return compiledTemplate;
            }
        });
    return FooterView;
});
