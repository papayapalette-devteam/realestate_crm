const mongoose=require('mongoose')

const add_project=new mongoose.Schema({
project_name:{type:String},
developer:{type:String},
joint_venture:{type:String},
secondary_developer:{type:String},
description:{type:String},
project_id:{type:String},
team:{type:Array},
sales:{type:Array},
notify_emails:{type:Array},
launched_on:{type:String},
expected_completion:{type:String},
possession:{type:String},
is_active:{type:String},
location_link:{type:String}
},{timestamps:true})

const addproject=mongoose.model('add_project',add_project)
module.exports=addproject