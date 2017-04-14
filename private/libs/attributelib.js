var mongoose            = require('mongoose')
   ,attribute           = mongoose.model('Attributes')
   ,attributeSet        = mongoose.model('AttributeSets')
   ,attributeValue      = mongoose.model('AttributeValues')
   ,category            = mongoose.model('Categories')
   ,ObjectId            = mongoose.Types.ObjectId;

module.exports.searchAttrbyCategory = exports = function (query, callback)
{       if(query._id!=null && query._id!=undefined && query._id!=""){
                     attributeSetswhere={_id:query._id};
        }
	var attributeSetsData = [];
	var promise = category.findOne(attributeSetswhere).exec();
	promise.then(function(category){
			 return attributeSet.find({ $and: [ { _id: { $in: category.attributeSets }}, { filterBy: true } ]},
                                                             '_id name attributes displayOnWeb filterBy ')   
                                            .populate({path: 'attributes.attribute',select: '_id name validationType '})
                                            .sort("attributes.seqNo")
		                            .exec();
	     }).then(function(attributeSets){
                        //console.log(attributeSets)
		        attributeSetsData.push.apply(attributeSetsData, attributeSets);
		        var attrIds = []
			attributeSets.forEach(function(attributeSet) {
			//console.log(attributeSet);
				var ids = attributeSet.attributes.map(function(m) {
					return m.attribute._id;
			        });
				attrIds.push.apply(attrIds, ids);

			});
			return attributeValue.find({attributeId: { $in: attrIds }},'_id attributeId name ').sort("seqNo").exec();
	    }).then(function(attrValues){
                        //console.log(attrValues);
			for(i = 0; i < attributeSetsData.length; i++){
			     for(j = 0; j < attributeSetsData[i].attributes.length; j++) {
			         attrValues = attrValues.filter(function(attrValue){
				   	       if(attrValue.attributeId === attributeSetsData[i].attributes[j].attribute._id){
				   		   attributeSetsData[i].attributes[j].values.push(attrValue);
				   	            return false;
				   		}else {return true; }
		                 });
			     }
		        }
                           //console.log(attributeSetsData);
		        return attributeSetsData;
	    }).then(function(data,err){
		        if(!err){				
			       //console.log(data);				
			       callback(null,data);
		         }else{callback(err,null);}           
             });

}
   
   

