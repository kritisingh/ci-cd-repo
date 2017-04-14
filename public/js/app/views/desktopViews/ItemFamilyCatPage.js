define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/CatPageTemplateView.html',
    'text!templates/desktopTemplates/FiltersBrandsView.html',
    'text!templates/desktopTemplates/BrickCatListView.html',
    'views/desktopViews/MainView',
    'views/desktopViews/Filters',
    'views/desktopViews/AddSubmenuBar',
    'views/desktopViews/ItemThumbnailList',
    'collections/Brand',
    'collections/Items',
    'collections/Category'
], function ($, _, Backbone, CatPageTemplate, FiltersBrandsTemplate, BrickCatListTemplate, MainView, FiltersView, AddSubmenuBarView, ItemThumbnailListView, Brands, Items, Category) {
        var CatSearchPageView = Backbone.View.extend({
            el: $('#outerContainer'),
            cat: '',
            pageNumber: 1,
            attributes: {},
            productList: new Items(),
            render: function (cat, dept) {
                var that = this, brands = new Brands(), brickCats = new Category(), catname, FamilyCat;
                this.cat = cat;
                this.dept = dept;
                new MainView().render();
                catname = $("#" + cat).text();
                FamilyCat = $("." + cat).children("a").html();
                $(this.el).html(_.template(CatPageTemplate, {catname: catname, familyCat: "", fcat: FamilyCat}));
                brickCats.fetch({data: { dataType: "jsonp", "action": "CATEGORY", "type": "BRICK", "category": that.cat}, success: function () {
                    $('.brickCats').html(_.template(BrickCatListTemplate, {collection: brickCats}));
                    $(that.el).off('click', '.seeMoreContainer');
                    $(".seeMoreContainer", that.el).click(that.see_more);
                }});
                $('.filtersBrands').append(new FiltersView().render(this.cat));
                brands.fetch({data: { dataType: "jsonp", "categories": this.cat}, success: function () {
                    brands.each(that.addOneItem, that);
                    if((brands.length) && (brands.length > 7)) {
                        var number = brands.length -7;
                        if (number !== 0) {
                            $(".seeMoreItem").html("<span class='seeMore2'>See"+" " +number+ " " +"more ...</span><span class='seeFewer2'>See fewer ...</span>");
                            $(that.el).off('click', '.seeMoreItem');
                            $(".seeMoreItem", that.el).click(that.see_more);
                        }
                    }
                }});
                $('.catAd').append(new AddSubmenuBarView().render(cat, "CATEGORY-LEVEL"));
                this.productList.fetch({data: {dataType: "jsonp", "categoryIds": cat, "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0 }, success: function () {
                    $('.prodList').append(new ItemThumbnailListView({collection: that.productList}).render(cat));
                }});
                
             },

            events: {
                "click .filter_container .catpage input" : "checked"
            },

            addOneItem: function (item) {
                var that = this;
                $('.brandsFilters .atribute', this.el).append(_.template(FiltersBrandsTemplate, {item :item.toJSON() }));
            },

            checked: function () {
                var that = this;
                this.newCollection = new Backbone.Collection();
                if ($(".filter_container ul li .checkbox").children("input").is(':checked')) {
                    that.checkedList();
                    $('.prodList .searhedProductList.sugestionList', this.el).html("");
                    that.filterCollection();
                } else {
                    $('.prodList').html("<ul class='searhedProductList sugestionList'></ul>");
                    new ItemThumbnailListView({collection: that.productList}).render(that.cat);
                }
            },

            filterCollection: function () {
                var that = this;
                this.collection = new Backbone.Collection();
                if (that.attributes.brandsAttr.length) {
                    var productlist = _.extend({}, that.productList);
                    _.each(productlist.models, function(item) {
                        _.each(that.attributes.brandsAttr, function(ele) {
                            if (item.toJSON().brandId._id === ele) {
                                that.collection.push(item);
                            }
                        });
                    });
                    /*that.productList.forEach(function (item) {
                        that.attributes.brandsAttr.forEach(function (ele) {
                            if (item.toJSON().brandId._id === ele) {
                                that.collection.push(item);
                            }
                        });
                    });*/
                    if (that.attributes.filterAttributes.length) {
                        that.attrProduct(that.collection);
                    } else {
                        $('.prodList').html("<ul class='searhedProductList sugestionList'></ul>");
                        new ItemThumbnailListView({collection: that.collection}).render(this.cat);
                    }
                } else {
                    that.attrProduct(this.productList);
                }
            },

            attrProduct: function (collection) {
                this.collection1 = collection;
                var that = this;
                 _.each(that.attributes.filterAttributes, function(ele) {
                    var clonedCollection = new Backbone.Collection();
                    _.each(ele.attrListValues, function(attr) {
                        _.each(that.collection1, function(item) {
                            _.each(item.toJSON().tradeItems[0].itemSpec[0].attributes, function(attribute) {
                                if (attribute.attrListValues[0] === attr) {
                                    clonedCollection.push(item);
                                }
                            });
                        });
                    });
                    that.collection1 = clonedCollection;
                });
                /*that.attributes.filterAttributes.forEach(function (ele) {
                    var clonedCollection = new Backbone.Collection();
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
                });*/
                $('.prodList').html("<ul class='searhedProductList sugestionList'></ul>");
                new ItemThumbnailListView({collection: that.collection1}).render(this.cat);
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
 
            see_more: function (e) {console.log(e.target);
                var that = this;
                if (!$(e.target).parents().siblings("ul").hasClass("down")) {
                    $(e.target).parents().siblings("ul").addClass("down");
                    $(e.target).hide();
                    $(e.target).siblings(".seeFewer").show();
                    $(e.target).siblings(".seeFewer2").show();
                } else {
                    $(e.target).parents().siblings("ul").removeClass("down");
                    $(e.target).hide();
                    $(e.target).siblings(".seeMore").show();
                     $(e.target).siblings(".seeMore2").show();
                }
            }
        });
    return CatSearchPageView;
});
