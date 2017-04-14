var mongoose    	= require('mongoose');

module.exports.getAttributeSet = function (request, reply) {
   //fs.createWrite
        //console.log(req.query);
      var libs_path =  '../libs';
      var attributelib =  require(libs_path + '/attributelib.js');
      if(request.query.action==="FILTERATTRBYCAT")
      {
 		attributelib.searchAttrbyCategory(request.query,function(err,data){
		   if (!err) {
		              return reply({attributeSets:data});
             		     
	           }else{
	    		      return reply(err)  
	           } 
              });	
      } 
   
}
