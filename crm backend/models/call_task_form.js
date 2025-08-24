const mongoose=require('mongoose')

const call_taskform=new mongoose.Schema({
activity_type:{type:String},
title:{type:String},
reason:{type:String},
lead:{type:String},
executive:{type:String},
remarks:{type:String},
complete:{type:String},
due_date:{type:String},
due_time:{type:String},
title2:{type:String},
first_name:{type:String},
last_name:{type:String},
mobile_no:{type:Array},
email:{type:Array},
stage:{type:String},
lead_id:{type:String},
direction:{type:String},
status:{type:String},
date:{type:String},
duration:{type:String},
result:{type:String},
intrested_inventory:{type:String},
feedback:{type:String}
},{timestamps:true})

const calltask_form=mongoose.model('calltask_form',call_taskform)
module.exports=calltask_form