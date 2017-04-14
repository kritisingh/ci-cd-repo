var mongoose        = require('mongoose')
   ,ObjectId        = mongoose.Types.ObjectId
   ,fs              = require('fs'),   
   _		    = require('underscore');

module.exports.getSiteCategoriesDetail = exports = function(query, callback) {
   var sitecategory = mongoose.model('SiteCategories');
   sitecategory.find({site:"MYCITYKART"})
               .populate({ path: 'parentSegmentId'})
               .populate({ path: 'parentFamilyId'})
               .sort("rating")
               .exec(function(err, categories) {
	           if (!err) {
	              callback(null,categories);
		   } else {
		      callback(err,null);  
		   } 
                 });  
}


