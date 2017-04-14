define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'views/MobileViews/BestSellingProdDetailsView',
    'text!templates/MobileTemplates/FooterView.html',
    'collections/Items',
    'models/Cart'
], function ($, _, Backbone, HeaderView, BestSellingProdDetailsView, FooterTemplate, Items, Cart) {
    var HomePageView = Backbone.View.extend({
        el: $('body'),
        initialize: function () { cartLine = new Cart(); },
        render: function (id) {
            this.id = id;
            var productDetails = new Items();
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render());
            productDetails.fetch({data: { dataType: "jsonp", "itemid": id, "itemssortBy": "", "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0}, success: function () {
                $(".middleWrapper").html(new BestSellingProdDetailsView({model: productDetails.models[0] }).render());
            }});
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        },
        events: {
            "click .smallImgContainer img"      : "zoomImg",
            "click #closePopup"                 : "closePopup",
            "click .wrapper"                    : "click",
            "click .itemVarientsContainer div" : "varients",
        },
        varients: function (e) {
            $(".mrp", this.el).html($(e.target).attr("mrp"));
            $(".unitSellingPrice", this.el).html($(e.target).attr("usp"));
            $(e.target).addClass("prodDetailSelectedOption").siblings().removeClass("prodDetailSelectedOption");
        },
        click: function (e) {
            if (($(e.target).closest(".headerMenuBar").length === 0) && ($(e.target).closest(".menuBar").length === 0)) {
                $(".headerMenuBar").slideUp();
            }
        },
        closePopup: function () {
            $(".popUp").remove();
        },
        zoomImg: function (e) {
            $('#prodImg').hide();
            $('#loadingImg').show();
            var src = $(e.target).attr("data-src");
            $("#prodImg", this.el).attr("src", src);
            $('#prodImg', this.el).load(function () {
                $('#loadingImg').hide();
                $('#prodImg').show();
            });
        }
    });
    return HomePageView;
});
