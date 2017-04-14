define([
    'jquery',
    'underscore',
    'backbone',
    'restApiServer',
    'views/MobileViews/HeaderView',
    'text!templates/MobileTemplates/TrackOrderDetailsView.html',
    'text!templates/MobileTemplates/FooterView.html',
    'collections/OrderDetail'
], function ($, _, Backbone, restApiServer, HeaderView, TrackOrderDetailsTemplate, FooterTemplate, OrderDetails) {
   var OrderDetailsView = Backbone.View.extend({
           el: $('body'),
           render: function (odrno,token,emailid) {
                $(this.el).html("<div class='wrapper'><div class='info'></div><div class='headerWrapper'></div><div class='middleWrapper'></div><div class='footerWrapper'></div></div>");
                $(".headerWrapper").html(new HeaderView().render());
                $(".footerWrapper").html(_.template(FooterTemplate, {}));
                var orderno = odrno, order = new OrderDetails(), that = this, orderId="", ActivationToken="", EmailId="", temp= [];
	        temp=odrno.split("=");
	        orderId=temp[1];
	        temp=token.split("=");
	        ActivationToken=temp[1];
	        temp=emailid.split("=");
                EmailId=temp[1];
                order.fetch({data: {dataType: "jsonp", "action":"ORDER-STATUS", "orderNumber":orderId, "orderAcessToken":ActivationToken}, success: function () {
                    $(".middleWrapper").html(_.template(TrackOrderDetailsTemplate, {orders : order}));
                }});
                return this.el;
            }
        });
    return OrderDetailsView;
});
