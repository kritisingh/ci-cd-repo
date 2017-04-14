/* BCTECH CONFIDENTIAL
   2013 Business Collaboration Technologies Pvt. Ltd. All Rights Reserved.
   This file is subject to the terms and conditions defined in
   file 'LICENSE.txt', which is part of this source code package.
   
   Description: This lib deals with mongoose model.
                                                                           
   Change Record:                                                             
   Version   Date        Author                Remarks                        
   =======   ==========  =============         ==============================
   DRAFT1.0  18-OCT-2013 Trimbak Mahajan       Initial draft version.
*/ 
var mongoose    	= require('mongoose');

module.exports.upsertModel = exports = function(obj,callback){
  var Xmodel = mongoose.model(obj.entity);
  Xmodel.findById(obj.data._id,function (err,doc){
     if(!err) {
       if(doc === undefined || doc === null) {
          Xmodel.create(obj.data,function(err,model) {
	     if (!err) {
		callback(null,model,1);
	     } else {
		callback(err,null,null);
	     }
	  });
       } else {
          var data = obj.data
             ,id   = data._id;
          delete data['_id'];
          console.log(id);
          Xmodel.update( { _id: id }, data).exec(function(err,numberAffected, model) { 
             if (!err) {
		callback(null,model,numberAffected);
	     } else {
		callback(err,null,null);
	     }
          });
       }
    } else {
      callback(err);
    }
  });
}
