var mongoose    	= require('mongoose')
   ,seller		= mongoose.model('Sellers');
module.exports.getSellerCategories = exports = function(query, callback){
   seller.findOne({_id:query.sellerId})
	 .select('categories')
	 .populate({path:'categories',select:'_id name'})	
	 .exec(function(err,categories){
  	if(!err){
		callback(null,categories);

	}
	else
	{
		callback(err,null);
	}
   

   });
   
}

