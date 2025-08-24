const mongoose=require('mongoose')

const meeting_taskform=new mongoose.Schema({
activity_type:{type:String},
title:{type:String},
executive:{type:String},
lead:{type:String},
location_type:{type:String},
location_address:{type:String},
reason:{type:String},
project:{type:Array},
block:{type:Array},
inventory:{type:Array},
remark:{type:String},
complete:{type:String},
status:{type:String},
meeting_result:{type:String},
date:{type:String},
feedback:{type:String},
due_date:{type:String},
due_time:{type:String},
title2:{type:String},
first_name:{type:String},
last_name:{type:String},
mobile_no:{type:Array},
email:{type:Array},
stage:{type:String}
},{timestamps:true})

const meetingtask_form=mongoose.model('meetingtask_form',meeting_taskform)
module.exports=meetingtask_form