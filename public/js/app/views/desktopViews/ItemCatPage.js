define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/CatPageTemplateView.html',
    'text!templates/desktopTemplates/FiltersBrandsView.html',
    'views/desktopViews/MainView',
    'views/desktopViews/Filters',
    'views/desktopViews/AddSubmenuBar',
    'views/desktopViews/ItemThumbnailList',
    'collections/Brand',
    'collections/Items'
], function ($, _, Backbone, CatPageTemplate, FiltersBrandsTemplate, MainView, FiltersView, AddSubmenuBarView, ItemThumbnailListView, Brands, Items) {
  var CatSearchPageView = Backbone.View.extend({
            el: $('#outerContainer'),
            cat: '',
            pageNumber: 1,
            attributes: {},
            productList: new Items(),
            render: function (cat, dept) {
                var that = this, brands = new Brands(), name = $("#" + cat).text(), familyCat = $("#" + cat).attr("familyCat"), familyCatId = $("#" + cat).attr("familyCatId");
                this.cat = cat;
                this.dept = dept;
                new MainView().render();
                $(this.el).html(_.template(CatPageTemplate, {familyCat: {name: familyCat, id: familyCatId }, catname: name}));
                $('.filtersBrands').append(new FiltersView().render(this.cat));
                brands.fetch({data: { dataType: "jsonp", "categories": this.cat}, success: function () {
                    brands.each(that.addOneItem, that);
                    if((brands.length) && (brands.length > 7)) {
                        var number = brands.length -7;
                        if (number !== 0) {
                            $(".seeMoreItemContainer").html("<span class='seeMore1'>See"+" " +number+ " " +"more ...</span><span class='seeFewer1'>See fewer ...</span>");
                            $(that.el).off('click', '.seeMoreItemContainer');
                            $(".seeMoreItemContainer", that.el).click(that.see_more);
                        }
                    }
                }});
                $('.catAd').append(new AddSubmenuBarView().render(cat, "CATEGORY-LEVEL"));
                this.productList.fetch({data: {dataType: "jsonp", "categoryIds": cat, "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0}, success: function () {
                    $('.prodList').append(new ItemThumbnailListView({collection: that.productList}).render(cat));
                }});
            },

            events: {
                "click .filter_container .catpage input": "checked"
            },

            addOneItem: function (item) {
                $('.brandsFilters .atribute', this.el).append(_.template(FiltersBrandsTemplate, {item :item.toJSON()}));
            },

            checked: function () {
                var that = this;
                this.newCollection = new Backbone.Collection();
                if ($(".filter_container ul li .checkbox").children("input").is(':checked')) {
                    this.checkedList();
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
                    /*that.productList.forEach(function (item) {
                        that.attributes.brandsAttr.forEach(function (ele) {
                            if (item.toJSON().brandId._id === ele) {
                                that.collection.push(item);
                            }
                        });
                    });*/
                    var productlist = _.extend({}, that.productList);
                    _.each(productlist.models, function(item) {
                        _.each(that.attributes.brandsAttr, function(ele) {
                            if (item.toJSON().brandId._id === ele) {
                                that.collection.push(item);
                            }
                        });
                    });
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

            see_more: function (e) {
                var that = this;
                if (!$(e.target).parents().siblings("ul").hasClass("down")) {console.log($(e.target));
                    $(e.target).parents().siblings("ul").addClass("down");
                    $(e.target).hide();
                    $(e.target).siblings(".seeFewer1").show();
                } else {
                    $(e.target).parents().siblings("ul").removeClass("down");
                    $(e.target).hide();
                    $(e.target).siblings(".seeMore1").show();
                }
            }
        });
    return CatSearchPageView;
});
