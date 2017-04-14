define([
    'jquery',
    'underscore',
    'backbone',
    'hoverIntent',
    'text!templates/desktopTemplates/MenubarView.html',
], function ($, _, Backbone, hoverIntent, MenubarTemplate) {

 var MenubarView = Backbone.View.extend({
            tagName: 'div',
            className: "headerContentWrapper",
            render: function () {
                var that = this, div;
                $(that.el).html(_.template(MenubarTemplate, {}));
                $('.shopByCatDiv li', this.el).hoverIntent(function () {
                    div = $(this).attr("id");
                    $('.shopByCatContainer').css("display", "none");
                    $('.shopByCat').addClass('hoverMenuActive');
                    $(this).siblings('.shopByCat').removeClass('hoverMenuActive');
                    $("." + div).css("display", "block");
                }, function () {});
                return this.el;
            },

            events: {
                "mouseleave .shopByCatDiv" : "shopByCatDivMouseleave",
                "mouseleave .shopByCatContainer" : "menubarMouseleave",
                "mouseleave .navigationBar" : "menubarMouseleave",
                "click .menuList li" : "displayBlock",
                "mouseleave .subMenuContainer" : "hideBlock",
                "click .searchBtn" : "search",
                "keyup #search_txt" : "searchOnKeyPress",
                "click .menuBlock li" : "Tab"
            },

            menubarMouseleave: function () {
                $('li.shopByCat').removeClass('hoverMenuActive');
                $(".shopByCatContainer").css("display", "none");
            },

            displayBlock: function (event) {
                this.render();
                $($(event.target).parents("ul")).siblings().css('display', 'none');
                $(event.target).parents("li").siblings('li').children('a').children('.signIn').removeClass('hoverMenuActive');
                $("." + $(event.target).parents("li").attr('id')).css('display', 'block');
                $('#' + $(event.target).parents("li").attr('id') + ' ' + 'a .signIn').addClass('hoverMenuActive');
            },

            hideBlock: function () {
                $('.f').css('display', 'none');
                $('a .signIn').removeClass('hoverMenuActive');
                $('a .signIn .shopByCategoryTopText').removeClass('hoverMenuActive');
            },

            shopByCatMouseenter: function (e) {
                var div = $(e.target).attr("id");
                $('.shopByCatContainer').css("display", "none");
                $('.shopByCat').addClass('hoverMenuActive');
                $(e.target).siblings('.shopByCat').removeClass('hoverMenuActive');
                $("." + div).css("display", "block");
            },

            search: function () {
                var text = $("#search_txt").val();
                window.location = 'search.html?text =' + text;
            },

            searchOnKeyPress: function (e) {
                if (e.keyCode === 13) {
                    this.search(e);
                }
            },

            Tab: function (event) {
                var tab = $(event.target).attr("class");
                $("#" + tab, this.el).show();
                $("#" + tab, this.el).siblings(".catMenu").hide();
                //$(".menuBlock li:first", this.el).addClass("color").show();
                $(event.target).addClass('color').siblings('li', this.el).removeClass('color');
            }
        });
    return MenubarView;
});
