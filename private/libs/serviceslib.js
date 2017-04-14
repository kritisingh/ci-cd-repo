var mongoose        	= require('mongoose')
   ,ObjectId        	= mongoose.Types.ObjectId
   ,sellerTradeItem 	= mongoose.model('SellerTradeItems')
   ,item                = mongoose.model('Items')
   ,tradeItem           = mongoose.model('TradeItems')
   ,_		    	= require('underscore')
   ,seller              = mongoose.model('Sellers')
   ,async               = require('async')
   ,partyaddress        = mongoose.model('PartyAddresses')
   ,counter             = mongoose.model('Counters')
;

function getNextSequence(name,callback) {
  counter.findOneAndUpdate({ _id: name },{ $inc: { seq: 1 } }, {new: true, upsert: true}, function(err,doc){
    if(!err){
      callback(doc.seq);
    }
  });
}


var getSellerDetail = function (city,sellerId,callback ) {
		
	    var sellerData=[];
             var promise=seller.findOne({$and:[{ _id: sellerId},{ cities: city},{ site: "MYCITYKART"}]})
			       .select('_id party address categories brands') 	
                               .populate({ path: 'party',select: 'group'})
	                       .populate({ path: 'address',select: '-purposes'})
			       .populate({ path: 'categories',select:'_id name'})
			       .populate({ path: 'brands',select:'_id name'})	
			       .exec();
             promise.then(function(sellerDetail){
			console.log(sellerDetail);
                      sellerData[sellerDetail._id] = sellerDetail;

                      return partyaddress.findOne({ _id: sellerDetail.address._id})
					 .select('-purposes')
					 .populate({ path: 'locality'})
                                         .populate({ path: 'city'})
		       	                 .exec();
            }).then(function(data){
		      sellerData[sellerId].address=data;
		      callback(sellerData[sellerId]);
            });
}
module.exports.getServiceProviders = function (request, callback) { 
	var query = request.query;
        var serviceSTData = [];
        var ids  = [];
	var sids  = [];
     	var sellerData  = [];	
	var promise = sellerTradeItem.find({$and:[{item:request.query.item},{city:query.city},{site:"MYCITYKART"}]})
			.select('item tradeItem sellerId _id unitSellingPrice')
		        .populate({path:'sellerId',select:'_id party address categories brands '})		
			.populate({path:'item',select:'_id name'})
		        .populate({path:'tradeItem',select:'_id tradeItemName'})	       
			.exec();
	    promise.then(function(serviceSTs){
		        _.forEach(serviceSTs,function(st){
			        ids.push(st.sellerId._id);
				serviceSTData[st._id] = st;
				sids.push(st._id);	
			    });
			  ids = _.uniq(ids);
			 async.each(ids,function(id,cb){
			    getSellerDetail(query.city,id,function(s){
				sellerData[id] = s;
				cb(null);
			    });
			},
		   function(err){
			  if(!err){
				var serviceSTArray = [];	
			      _.forEach(sids,function(sid){
				serviceSTData[sid].sellerId = sellerData[serviceSTData[sid].sellerId._id];
				serviceSTArray.push(serviceSTData[sid]);
			      });
			      callback(null,serviceSTArray);
			  }
		   });	
	    });
}
module.exports.priceRequest = function (payload, callback) { 
	
	var sellerLead      = mongoose.model('SellerLeads');
	getNextSequence("LEAD", function(leadNumber){
             payload.sellerLead.leadNO = leadNumber++;
             payload.sellerLead.status = "NEW";
  sellerLead.create(payload.sellerLead,function(err,SData) {
		if (!err) {
		seller.findOne({_id:SData.seller})
		      .populate({path:'party'})				 
		      .exec(function(err,sellerData){
		if(!err){
	   	for(var i = 0;i< sellerData.party.electronicAddress.length; i++){
			if( sellerData.party.electronicAddress[i].electronicType === "EMAIL"){
				var seller_email = sellerData.party.electronicAddress[i].eAddress;
				var sendmail = require('./sendmaillib');
				var emailtemplate = require('./emailtemplatelib');
				var subject = "Lead of "+SData.leadType+" "+"from MYCITYKART.COM";
				var description = SData.description;
				var templateFile = "";

				if(SData.leadType === "Sales")
				{
					templateFile = "SalesLeads.html";
					tradeItem.find({_id:{$in:SData.tradeItem}})
					 .select('_id marketPrice tradeItemName imagePaths')
					 .exec(function(err,SKUData){
						if(!err){
							//console.log(SKUData);
							var propertydata = {
								LeadType:SData.leadType,
								firstName:SData.firstName,
								lastName:SData.lastName,
								mobNo:SData.mobileNo,
								email:SData.emailId,
								comments:SData.description,
								data: SKUData
							};
						  
						emailtemplate.generateEmailTemplate(seller_email
								,subject,description,propertydata,templateFile,function(err,data){
								if(!err){
									console.log(data);
								}
							});
							callback(null,{sucess:"sucessfully lead generated"});
						}
					});
				}
				else if(SData.leadType === "Service"){
					templateFile = "ServiceLeads.html";
					tradeItem.find({_id:{$in:SData.tradeItem}})
						 .select('_id marketPrice item tradeItemName imagePaths')
						 .exec(function(err,SKUData){
						if(!err){
							
							var propertydata = {
								LeadType:SData.leadType,
								firstName:SData.firstName,
								lastName:SData.lastName,
								mobNo:SData.mobileNo,
								email:payload.sellerLead.emailId,
								comments:SData.description,
								data: SKUData
							};
						  
							emailtemplate.generateEmailTemplate(seller_email
								,subject,description,propertydata,templateFile,function(err,data){
								if(!err){
									console.log(data);
								}
							});
							callback(null,{sucess:"sucessfully lead generated"});
						}
					});
				}	
                       }
                 }
	   }
	   else{
					  callback(err,null);	

		}				
	});			
    }
     else{
		callback(err,null);
	}					
 });
});						
}
module.exports.getServicetradeItems = function (query, callback) { 
	var promise=item.findOne({_id:query.item}).exec();
        promise.then(function(Item){console.log(Item._id)
                  return tradeItem.find({item:Item._id})
                                  .select('tradeItemName item')
      	       	                  .exec();
        }).then(function(data){
                  callback(data);
        });
}






