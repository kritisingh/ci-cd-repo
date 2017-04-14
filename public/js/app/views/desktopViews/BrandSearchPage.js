define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/desktopTemplates/BrandSearchPageView.html',
    'views/desktopViews/MainView',
    'views/desktopViews/AddSubmenuBar',
    'views/desktopViews/BrandsFilter',
    'views/desktopViews/ItemThumbnailList',
    'collections/Items',
], function($, _, Backbone, BrandSearchPageTemplate, MainView, AddSubmenuBarView, BrandsFiltersView, ItemThumbnailListView, ProductList){

  var BrandSearchPageView = Backbone.View.extend({
            el: $('#outerContainer'),
            cat: '',
            pageNumber: 1,
            attributes: {},
            productList: new ProductList(),
            render: function (brand) {
                var that = this, name = $("#" + brand).text();
                this.cat = brand;
                new MainView().render();
                //var name = $("#" + cat).text(), familyCat = $("#" + cat).attr("familyCat"), familyCatId = $("#" + cat).attr("familyCatId");
                $(this.el).html(_.template(BrandSearchPageTemplate, {catname: name}));
                $('.filtersBrands').append(new BrandsFiltersView().render(this.cat));
                $('.catAd').append(new AddSubmenuBarView().render(brand, "BRAND-LEVEL"));
                this.productList.fetch({data: {dataType: "jsonp", "brandId": brand, "site": "MYCITYKART", "city": "BC-PUNE", "limit": 0}, success: function () {
                    $('.prodList').append(new ItemThumbnailListView({collection: that.productList}).render(brand));
                }});
            },

            events: {
                "click #brandInput input" : "checked"
            },

            checked: function () {
                var that = this;
                this.newCollection = new Backbone.Collection();
                if ($(".filter_container ul li .checkbox", this.el).children("input").is(':checked')) {
                    that.CheckedList();
                    $('.prodList .searhedProductList.sugestionList', this.el).html("");
                    that.attrProduct(that.productList);
                } else {
                    $('.prodList').html("<ul class='searhedProductList sugestionList'></ul>");
                    new ItemThumbnailListView({collection: that.productList}).render(that.cat);
                }
            },

            attrProduct: function (collection) {
                this.collection1 = collection;
                var that = this;
                _.each(that.attributes.filterAttributes, function(ele) {
                    var clonedCollection = new Backbone.Collection();
                    _.each(ele.attrListValues, function(attr) {
                        _.each(that.collection1.models, function(item) {
                            _.each(item.toJSON().categoryIds, function(attribute) {
                                if (attribute.categoryType === "BRICK") {
                                    if (attribute._id === attr) {
                                        clonedCollection.push(item);
                                    }
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
                            item.toJSON().categoryIds.forEach(function (attribute) {
                                if (attribute.categoryType === "BRICK") {
                                    if (attribute._id === attr) {
                                        clonedCollection.push(item);
                                    }
                                }
                            });
                        });
                    });
                    that.collection1 = clonedCollection;
                });*/
                $('.prodList').html("<ul class='searhedProductList sugestionList'></ul>");
                new ItemThumbnailListView({collection: that.collection1}).render(this.cat);
            },

            CheckedList: function () {
                var filterAttributes = [];
                $(".display", this.el).each(function () {
                    if ($(this).children("li").children(".checkbox").children("input").is(':checked')) {
                        var attribute = {attrListValues: []};
                        $(this).children("li").each(function () {
                            if ($(this).children(".checkbox").children("input").is(':checked')) {
                                attribute.attrListValues.push($(this).attr("id"));
                            }
                        });
                        filterAttributes.push(attribute);
                    }
                });
                this.attributes = {filterAttributes: filterAttributes};
            }
        });
    return BrandSearchPageView;
});
