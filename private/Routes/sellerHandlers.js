var mongoose    	= require('mongoose');

module.exports.getSellers = function (request, reply) {
      var libs_path =  '../libs';
      var sellerlib =  require(libs_path + '/sellerlib.js');
      
      if(request.query.action==="SELLER-DETAIL"){
                sellerlib.getSkusSellers(request.query,function(err,data){
			if (!err) {
				return reply(data);
				
			} else {
				return reply(err);  
			} 
		});
      }
}

module.exports.getSeller = function (request, reply) {
      var libs_path =  '../libs';
      if(request.query.action ==="SELLER-DETAIL"){
    	  var sellerlib =  require(libs_path + '/sellerlib.js');
	  sellerlib.getSellerDetail(request,function(err,data){
			   if (!err) {
					
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
 	}
        else if(request.query.action ==="SELLER-PRODUCTS-DETAIL"){
    	  var sellerlib =  require(libs_path + '/sellerlib.js');
	  sellerlib.getSellerProductDetail(request,function(err,data){
			   if (!err) {
					
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
 	}
	else if(request.query.action ==="SELLER-LIST"){
    	  var sellerlib =  require(libs_path + '/sellerlib.js');
	  sellerlib.getSellerList(request.query,function(err,data){
			   if (!err) {
					
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
 	}
      else {var sellerlib =  require(libs_path + '/sellerlib.js');
            sellerlib.getSellerDeliveryDetail(request.query,function(err,data){
		   if (!err) {
		              return reply(data);
             		     
	           }else{
	    		      return reply(err);  
	           } 
             });
      }
}

module.exports.postSeller = function (request, reply) {
    var libs_path =  '../../libs';
 if(request.payload.action ==="PRICE-REQUEST"){
    	  var sellerlib =  require(libs_path + '/sellerlib.js');
	  sellerlib.priceRequest(request.payload,function(err,data){
			   if (!err) {
			            var nodemailer = require("nodemailer");

					// create reusable transport method (opens pool of SMTP connections)
					var smtpTransport = nodemailer.createTransport("SMTP",{
					    service: "Gmail",
					    auth: {
						user: "prashantbiradar92@gmail.com",
						pass: "[tsfjsmy"
					    }
					});

					// setup e-mail data with unicode symbols
					var mailOptions = {
					    from: "prashantbiradar92@gmail.com", // sender address
					    to: "vishalkhambalkar43@gmail.com", // list of receivers
					    subject: "Hello ✔", // Subject line
					    text: "Hello world ✔", // plaintext body
					    html: "<b>Hello world ✔</b>" // html body
					}

					// send mail with defined transport object
					smtpTransport.sendMail(mailOptions, function(error, response){
					    if(error){
						console.log(error);
					    }else{
						console.log("Message sent: " + response.message);
					    }

					    // if you don't want to use this transport object anymore, uncomment following line
					    //smtpTransport.close(); // shut down the connection pool, no more messages
					});
			




					
				      return reply(data);
		     		      
			   }else{
		    		      return reply(err);  
			   } 
	  });
 	}
   	
}
