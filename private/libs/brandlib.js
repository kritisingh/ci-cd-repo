var mongoose        = require('mongoose')
   ,brand           = mongoose.model('Brands')
   ,ObjectId        = mongoose.Types.ObjectId;

module.exports.getBrandDetail = exports = function(req, res, next) {
   var brandId = req.params.brandId;
       brand.findOne({_id: brandId })
            .populate({ path: 'categories', select: '_id name categoryType ' })
	   .exec(function(err, brand){
		   if (!err){
			 res.send(brand)
			 return next();
		   } else {
			 return next(new restify.InternalError(err));
		   }
	   });
   return next();
}

module.exports.getBrandsByCategory = exports = function(query,callback) { 
	console.log(query.categories);
   if(query.categories!=null && query.categories!=undefined && query.categories!=""){
                     categorywhere={categories:query.categories};
   }
   brand.find(categorywhere).select('name imagePaths')
	.exec(function(err, brands){
	   if (!err){
              
	      callback(null,brands);
	   } else {
	      callback(err,null);
	   }
        });
}

module.exports.getCategoriesByBrand = exports = function(query,callback) {
   if(query._id!=null && query._id!=undefined && query._id!=""){
                     brandwhere={_id:query._id};
   }
   brand.find(brandwhere).select('_id categories').populate({path: 'categories', select: '_id name categoryType ' })
	.exec(function(err, categories){
	   if (!err){
	      callback(null,categories);
	   } else {
	      callback(err,null);
	   }
        });
}
