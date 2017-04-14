var mongoose        = require('mongoose')
   ,ObjectId        = mongoose.Types.ObjectId
   ,fs              = require('fs'),   
   _		    = require('underscore');

module.exports.getCategoriesDetail = exports = function(query, callback) {
   var category = mongoose.model('Categories');
   category.find({$and:[{ancestors:query.category},{categoryType:query.type}]})
           .populate({ path: 'ancestors'})
           .exec(function(err, categories) {
	           if (!err) {
	              callback(null,categories);
		   } else {
		      callback(err,null);  
		   } 
                 });  
}

module.exports.getSegmentCategoriesDetail = exports = function(query, callback) {
   var ids = [];
   var categoryData = [];
   var category = mongoose.model('Categories');
   var promise = category.find({$and:[{categoryType:query.type}]})
                         .exec();
   promise.then(function(categories){
                _.forEach(categories,function(data){
                         categoryData[data._id]=data;
                         ids.push(data._id);
                 });console.log(ids)
       return category.find({$and:[{ancestors:{ $in: ids}},{categoryType:"FAMILY"}]})
                         .exec();
    }).then(function(results){ //console.log(results);
             
	      _.forEach(results,function(result){
                         categoryData[result.ancestors[0]].categories.push(result);
                        
	      }); 
        var categoryArray = [];
           _.forEach(ids, function(id) {
              categoryArray.push(categoryData[id]); 
           });console.log(categoryArray)
      callback(null,categoryArray);
    }); 
}


