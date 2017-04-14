/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var PartyRelationshipSchema = new mongoose.Schema({
 partyId:           { type: ObjectId, ref: 'Parties' }
,relationshipType:  String
,ofPartyId:         { type: ObjectId, ref: 'Parties' }
,validFrom:         Date
,validTo:           Date
});

mongoose.model('PartyRelationships', PartyRelationshipSchema);

