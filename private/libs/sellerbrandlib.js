var mongoose    	= require('mongoose')
   ,seller		= mongoose.model('Sellers');
module.exports.getSellerBrands = exports = function(query, callback){
   seller.findOne({_id:query.sellerId})
	 .select('brands')
	 .populate({path:'brands',select:'_id name'})	
	 .exec(function(err,Brands){
  	if(!err){
		callback(null,Brands);

	}
	else
	{
		callback(err,null);
	}
   });
   
}

