var mongoose        = require('mongoose')
   ,bannerAds       = mongoose.model('BannerAds')
   ,ObjectId        = mongoose.Types.ObjectId;

module.exports.getBannerDetail = exports = function(query, callback) {
          
          bannerAds.findOne({ $and: [ {site       : "MYCITYKART"},{ context    : query.context} ,{ contextId  : query.contextId}
                             ,{ city       : query.city }] }).limit(query.limit).sort(query.sortBy)
                   .exec(function(err, bannerDetail){
		        if (!err){
                                var a=[];
                                a=bannerDetail.adImagePaths;
                                a.sort(function(b) { return b.rating; } );
                                console.log(a);
	     		        callback(null,bannerDetail.adImagePaths);
	   	            } else {
	      	                callback(err,null);
	   	        }
	            });
}

