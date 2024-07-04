const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    branchCode : { type : String , required : true } ,
    branchFullName : { type : String , required : true } ,
    // totalIntake : { type : Number , required : true } ,
    
    course : { type : Schema.Types.ObjectId , ref : 'Course' , required : true }

    // createdAt : Date , 
    // updatedAt : Date 
});

BranchSchema.plugin(timestamps , { index : true });

module.exports = mongoose.model( 'Branch' , BranchSchema );