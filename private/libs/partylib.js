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
var async               = require('async')
   ,_		    	= require('underscore')
, sublocality           = mongoose.model('SubLocalities');

module.exports.upsertParty = exports = function(obj,callback){
  var Party   = mongoose.model('Parties');
  var Address = mongoose.model('PartyAddresses');
  Party.create(obj,function(err,party) {
      if (!err) {
        async.each( obj.addresses
                  , function(address,cb){ 
                       address['party'] = party._id;
                       Address.create(address,function(err) {
			     if (!err) {
				cb(null);
			     } else {
				cb(err);
			     }
		       });
                    }
                  , function(err){
                     if (!err) {
	                callback(null);
                        return;
	             } else {
	                callback(err);
                     }
                   });
     } else {
	callback(err);
     }
   });
}

module.exports.createParty = exports = function(customer,callback){
  var Party   = mongoose.model('Parties');
  var Address = mongoose.model('PartyAddresses');
  Party.findOne({partyKey: customer.party.partyKey }).exec(function(err,party){
    if(!err) { 
       if(!party){console.log("party not exist");
          Party.create(customer.party,function(err,party) {
            if (!err) { console.log("New party created with ",party._id);
	            customer.address.party = party._id;
                if(customer.address.society === undefined || obj.address.society === null || obj.address.society === ''){
		              Address.create(customer.address,function(err,addr) { console.log("New address created",customer.address)
	                  if (!err){
		                  callback(null,{partyId: party._id, addressId: addr._id});
		                } else {
                      console.log("err..")
		                  callback(err,null);
	                  }
		              }); 
                }/*else{
                  console.log("hii.........");
                  sublocality.findOne({_id:customer.address.society, postCode:customer.address.postalCode, wings:customer.address.wing}).exec(function(err,updatedParty){ 
			              if(updatedParty) {  console.log("party address society is valid and", updatedParty);
			                  //obj.address.party = party._id ;
                        //customer.address.addressLine1 =  updatedParty.address.addressLine1;
                        customer.address.postalCode =   obj.address.postCode ;  
                        //customer.address.subLocality = obj.address.society ;
                        //customer.address.wings = [obj.address.wing] ;
                        //customer.address.city  = obj.address.city;
					              Address.create(customer.address,function(err,addr) {
					                if (!err){
						                callback(null,{partyId: party._id, addressId: addr._id});
					                } else {
                            console.log("err...")
						                callback(err,null);
					                }
					              });
					          }else{
                        obj.address.party = party._id ;
                        obj.address.addressLine1 =  obj.address.flatNo ;
                        obj.address.postalCode =   obj.address.postCode ;  
                        obj.address.subLocality = obj.address.society ;
                        obj.address.wings = [obj.address.wing] ;
                        obj.address.city  = obj.address.city;
					              Address.create(obj.address,function(err,addr) {
					                 if (!err){
						                 callback(null,{partyId: party._id, addressId: addr._id});
					                 } else {console.log("err......")
						                 callback(err,null);
					                 }
					              });
                    }
                  });
                }*/    
            } else { 
              callback(err);
            }
         });
       }else{ console.log("party already exist");
            customer.address.party = party._id;
            if(customer.address.society === undefined || customer.address.society === null || customer.address.society === ''){
		          Address.create(customer.address,function(err,addr) {
                if (!err){
		              callback(null,{partyId: party._id, addressId: addr._id});
		            } else {
                  console.log("err....")
		              callback(err,null);
	              }
		          });
            }/*else{
              sublocality.findOne({_id:obj.address.society , postCode:obj.address.postcode , wings:obj.address.wing}).exec(function(err,updatedParty){ 
                if(updatedParty) {
			               obj.address.party = party._id ;
                     obj.address.addressLine1 =  obj.address.flatNo +", "+ updatedParty.location +" ,"+ updatedParty.landmark ;
                     obj.address.postalCode =   obj.address.postCode ;  
                     obj.address.subLocality = obj.address.society ;
                     obj.address.wings = [obj.address.wing] ;
                     obj.address.city  = obj.address.city;
					         Address.create(obj.address,function(err,addr) {
  					         if (!err){
  						          callback(null,{partyId: party._id, addressId: addr._id});
  					         } else {
                        console.log("err......")
  						          callback(err,null);
  					         }
					         });
					      }else{
                    obj.address.party = party._id ;
                    obj.address.addressLine1 =  obj.address.flatNo  ;
                    obj.address.postalCode =   obj.address.postCode ;  
                    obj.address.subLocality = obj.address.society ;
                    obj.address.wings = [obj.address.wing] ;
                    obj.address.city  = obj.address.city;
					         Address.create(obj.address,function(err,addr) {
					           if (!err){
  						          callback(null,{partyId: party._id, addressId: addr._id});
					           } else {
                        console.log("err......")
						            callback(err,null);
					           }
					         });

                }
              });
            }*/   
       }
     }else{
       callback(err);
     }
  }); 
}
