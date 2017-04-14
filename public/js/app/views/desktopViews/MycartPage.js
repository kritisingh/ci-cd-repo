define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MyCartList',
    'views/desktopViews/MainView'
], function ($, _, Backbone, MyCartListView, MainView) {

   var MycartPageView = Backbone.View.extend({
            el: $('body'),
            render: function () {
                this.$el.append(new MainView().render());
                $('#outerContainer', this.el).html("<div id='waitingIcon'><img src='css/images/bx_loader.gif'></div><div class='condition'>(<span class='red'>*</span>Minimum Order of Rs. 500)</div>");
                this.$('#outerContainer').append(new MyCartListView().render());
            }
        });
    return MycartPageView;
});
