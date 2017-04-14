/**
 * Module dependencies.
 */
var mongoose    = require('mongoose')
  , auditField  = require('./AuditField')
  , Schema      = mongoose.Schema
  , ObjectId    = Schema.ObjectId;

var AttributeSetSchema = new Schema(
{_id:              { type: String, trim: true }
,name:             { type: String, trim: true }
,definition:       { type: String, trim: true }
,attributes:       [{seqNo:     { type: Number } 
                    ,attribute: { type: String, ref: 'Attributes'}
                    ,values:    []
                    ,active:    Boolean
                    }]
,displayOnWeb:     { type: Boolean }
,filterBy:         { type: Boolean }
,isVariant:        { type: Boolean }
});

AttributeSetSchema.plugin(auditField, { index: true });

mongoose.model('AttributeSets', AttributeSetSchema);


