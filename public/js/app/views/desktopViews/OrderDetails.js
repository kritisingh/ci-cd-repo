define([
    'jquery',
    'underscore',
    'backbone',
    'views/desktopViews/MainView',
    'text!templates/desktopTemplates/TrackOrderDetailsView.html',
    'collections/OrderDetail'
], function ($, _, Backbone, MainView, TrackOrderDetailsTemplate, OrderDetails) {
   var OrderView = Backbone.View.extend({
            el: $('#outerContainer'),
            render: function (odrno, token, emailid) {
                this.$el.append(new MainView().render()); 
                var order = new OrderDetails(), that = this, orderId = "", ActivationToken = "", EmailId = "", temp = [];
                temp = odrno.split("=");
                orderId = temp[1];
                temp = token.split("=");
                ActivationToken = temp[1];
                temp = emailid.split("=");
                EmailId = temp[1];
                order.fetch({data: {dataType: "jsonp", "action": "ORDER-STATUS", "orderNumber": orderId, "orderAcessToken": ActivationToken}, success: function () {
                    $(that.el).html(_.template(TrackOrderDetailsTemplate, {order : order.toJSON()}));
                }});
                return this.el;
            }
        });
    return OrderView;
});
