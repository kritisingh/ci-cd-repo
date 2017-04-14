define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MainView',
    'text!templates/desktopTemplates/PoliciesView.html'
], function ($, _, Backbone, MainView, PoliciesTemplate) {
   var PoliciesView = Backbone.View.extend({
            el: $('#outerContainer'),
            render: function () {
                this.$el.append(new MainView().render());
                $(this.el).html(_.template(PoliciesTemplate, {}));
                return this.el;
            }
        });
    return PoliciesView;
});
