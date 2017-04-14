define([
    'jquery',
    'underscore',
    'backbone',
    'views/MobileViews/HeaderView',
    'views/MobileViews/ItemThumbnailList',
    'views/MobileViews/ItemThumbnailItem',
    'text!templates/MobileTemplates/FooterView.html',
    'collections/Items'
], function ($, _, Backbone, HeaderView, ThumbnailListView, ThumbnailItemView, FooterTemplate, Items) {
    var BrickCategory = Backbone.View.extend({
        el: $('body'),
        render: function (cat) {
            $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
            $(".headerWrapper").html(new HeaderView().render(1, cat));
            $(".middleWrapper").append("<div class='list'><div id = 'waitingIcon'><img src = 'http://cdn2.bcdsn.net/mycitykart/css/images/bx_loader.gif' /></div><ul class='searhedProductList sugestionList'></ul></div>");
            $('.list', this.el).append(new ThumbnailListView().render(cat));
            this.productList = new Items();
            this.productList.fetch({data: { dataType: "jsonp", "department": "ELECTRONICS", "categoryIds": cat, "itemssortBy": "", "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0}});
            $(".footerWrapper").html(_.template(FooterTemplate, {}));
        },
        events: {
            "click .filterList"      : "applyFilters",
            "click .removeFilterBtn" : "removeFilter",
            "click .close"           : "closeFilterBlock",
            "click .wrapper"         : "click",
        },
        closeFilterBlock: function () {
            $(".wrapper").css("overflow-y", "scroll");
            $(".filtersContainer").slideUp();
        },
        click: function (e) {
            if (($(e.target).closest(".headerMenuBar").length === 0) && ($(e.target).closest(".menuBar").length === 0)) {
                $(".headerMenuBar").slideUp();
            }
        },
        applyFilters: function () {
            $(".wrapper").css("overflow-y", "scroll");
            $(".filtersContainer").slideUp();
            this.newCollection = new Backbone.Collection();
            this.checkedList();
            $('.list', this.el).html("<ul class='searhedProductList'></ul>");
            this.filterCollection();
        },
        removeFilter: function () {
            $(".removeFilterBtn").remove();
            $(".filtersContainer ul li .checkbox").children("input").prop('checked', false);
            $('ul.searhedProductList').html("");
            this.productList.forEach(function (item) {
                $('ul.searhedProductList').append(new ThumbnailItemView({model: item}).render());
            });
        },
        checkedList: function () {
            var brandsAttr = [], filterAttributes = [];
            if ($(".atribute li .checkbox").children("input").is(':checked')) {
                $(".atribute").children("li").each(function () {
                    if ($(this).children(".checkbox").children("input").is(':checked')) {
                        brandsAttr.push($(this).attr("id"));
                    }
                });
            }
            $(".display").each(function () {
                if ($(this).children("li").children(".checkbox").children("input").is(':checked')) {
                    var attribute = {attributeSetId: $(this).attr("attributeSetId"), attributeId: $(this).attr("attributeId"), attrListValues: []};
                    $(this).children("li").each(function () {
                        if ($(this).children(".checkbox").children("input").is(':checked')) {
                            attribute.attrListValues.push($(this).attr("id"));
                        }
                    });
                    filterAttributes.push(attribute);
                }
            });
            this.attributes = { brandsAttr: brandsAttr, filterAttributes: filterAttributes};
        },
        filterCollection: function () {
            var that = this;
            if (!$(".filtersContainer ul li .checkbox").children("input").is(':checked')) {
                $(".removeFilterBtn").remove();
                that.productList.forEach(function (item1) {
                    if (item1.toJSON().status === "NEW") {
                        $('ul.searhedProductList').append(new ThumbnailItemView({model: item1}).render());
                    }
                });
            } else {
                if (!$(".filterButtons").hasClass("removeFilterBtn")) {
                    $(".subMenuBarBtns").append("<div class='filterButtons removeFilterBtn'><span class='removeFilterIcon'></span></div>");
                }
                this.collection = new Backbone.Collection();
                if (that.attributes.brandsAttr.length) {
                    that.productList.forEach(function (item) {
                        that.attributes.brandsAttr.forEach(function (ele) {
                            if (item.toJSON().brandId._id === ele) {
                                that.collection.push(item);
                            }
                        });
                    });
                    if (that.attributes.filterAttributes.length) {
                        that.attrProduct(that.collection);
                    } else {
                        that.collection.forEach(function (item1) {
                            $('ul.searhedProductList').append(new ThumbnailItemView({model: item1}).render());
                        });
                    }
                } else {
                    that.attrProduct(this.productList);
                }
            }
        },
        attrProduct: function (collection) {
            this.collection1 = collection;
            var that = this, clonedCollection = new Backbone.Collection();
            that.attributes.filterAttributes.forEach(function (ele) {
                ele.attrListValues.forEach(function (attr) {
                    that.collection1.forEach(function (item) {
                        item.toJSON().tradeItems[0].itemSpec[0].attributes.forEach(function (attribute) {
                            if (attribute.attrListValues[0] === attr) {
                                clonedCollection.push(item);
                            }
                        });
                    });
                });
                that.collection1 = clonedCollection;
            });
            that.collection1.forEach(function (item1) {
                $('ul.searhedProductList').append(new ThumbnailItemView({model: item1}).render());
            });
        }
    });
    return BrickCategory;
});
