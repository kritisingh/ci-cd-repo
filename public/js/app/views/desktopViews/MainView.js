define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/Header',
    'views/desktopViews/Menubar',
    'views/desktopViews/Footer'
], function ($, _, Backbone, HeaderView, MenubarView, FooterView) {
  var MainView = Backbone.View.extend({
            el: $('body'),
            render: function () {
                //$('.wrapper').append("<img src='pics/up.png' class='goTop' style='position: fixed; top: 50%; right: 7px;'>");
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 200) {
                        $('.goTop').fadeIn();
                    } else {
                        $('.goTop').fadeOut();
                    }
                });
                $('#header').html(new HeaderView().render());
                $('#footer').html(new FooterView().render());
                $('.headerBottomMenuWrapper').html(new MenubarView().render());
                //return this.el;
            },

            events: {
                "click .goTop"  : "goTop"
            },

            goTop: function () {
                $(window).scrollTop(0);
            }
        });
    return MainView;
});
