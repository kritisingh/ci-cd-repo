define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/FooterView.html',
    'text!templates/MobileTemplates/PoliciesView.html'
], function ($, _, Backbone, HeaderView, FooterTemplate, PoliciesViewTemplate) {
    var PoliciesView = Backbone.View.extend({
        el: $('body'),
        render: function () {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render());
            $(".middleWrapper").append(_.template(PoliciesViewTemplate, {}));
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        }
    });
    return PoliciesView;
});
