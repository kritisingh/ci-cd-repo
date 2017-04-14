/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var TaskListSchema = new mongoose.Schema({
  _id:              { type: String, trim: true  } // catalogueTaskList, CRMTaskList 
 ,taskListName:     { type: String, trim: true  } // Catalogue, CRM 
 ,tasks:            [{task: {taskId:   String
                            ,taskName: String
                            ,taskView: String
                            ,create:   { type: Boolean, default: true }
                            ,update:   { type: Boolean, default: true }
                            ,read:     { type: Boolean, default: true }
                            ,destory:  { type: Boolean, default: true } //delete
                            }
                     ,displaySeq: Number
                    }]
 ,active:           { type: Boolean, default: true }
 ,startDate:        Date
 ,endDate:          Date
});

mongoose.model('TaskList', TaskListSchema);

