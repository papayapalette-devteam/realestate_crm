const mongoose=require('mongoose')

const mail_taskform=new mongoose.Schema({
activity_type:{type:String},
title:{type:String},
executive:{type:String},
lead:{type:String},
project:{type:Array},
block:{type:Array},
inventory:{type:Array},
subject:{type:String},
remarks:{type:String},
complete:{type:String},
due_date:{type:String},
due_time:{type:String},
direction:{type:String},
status:{type:String},
date:{type:String},
feedback:{type:String},
title2:{type:String},
first_name:{type:String},
last_name:{type:String},
mobile_no:{type:Array},
email:{type:Array},
stage:{type:String}
},{timestamps:true})

const mailtask_form=mongoose.model('mailtask_form',mail_taskform)
module.exports=mailtask_form