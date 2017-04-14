/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var PartySchema = new mongoose.Schema({
 registrationNo:     Number
,partyType:         String //Person or Group
,partyKey:          String
,partyShortName:    String	
,person:            {title:        String
                    ,fullName:     String
	            ,firstName:    String
                    ,middleName:   String
	            ,lastName:     String
	            ,alias:        String
	            ,dateOfBirth:  Date
	            ,gender:       String
                    ,maritialStaus: String
                    ,marriageDate:  Date
	            }
,group:             { name: String, groupType: String } //type is Company, Family, Govt Agency etc. Loyal Club etc.
,identifiers:       [{ identifierType: String, identifier: String, issuerName: String }] //identifierType VAT-NUM, '1900090' , Govt. Tax Department
,contactNumber:     [{ contactType: String, contactNum: String, active: Boolean } ] //contactType MOBILE, LANDLINE, FAX
,electronicAddress: [{ electronicType: String, eAddress: String }] // Type EMAIL, WEBSITE
,partyRoles:        [String] // Employee, Consumer, Partner Organization, Organization, Internal Organization
,tradeNature:	    [String]
,annualTurnover:    String
,onlinePresence:    Boolean
,createdFor:	    String // New field - for MyCityKart or Seller App				 
});

mongoose.model('Parties', PartySchema );

