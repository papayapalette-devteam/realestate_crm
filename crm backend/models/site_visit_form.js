const mongoose=require('mongoose')

const site_visitform=new mongoose.Schema({
activity_type:{type:String},
title:{type:String},
executive:{type:String},
project:{type:Array},
sitevisit_type:{type:String},
inventory:{type:Array},
block:{type:Array},
lead:{type:String},
confirmation:{type:String},
remark:{type:String},
participants:{type:String},
remind_me:{type:String},
start_date:{type:String},
end_date:{type:String},
start_time:{type:String},
end_time:{type:String},
complete:{type:String},
title2:{type:String},
first_name:{type:String},
last_name:{type:String},
mobile_no:{type:Array},
email:{type:Array},
stage:{type:String},
lead_id:{type:String},
status:{type:String},
intrested_project:{type:Array},
intrested_block:{type:Array},
intrested_inventory:{type:Array},
result:{type:Array},
date:{type:String},
feedback:{type:String}
},{timestamps:true})

const sitevisit_form=mongoose.model('sitevisit_form',site_visitform)
module.exports=sitevisit_form