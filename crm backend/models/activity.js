const mongoose=require('mongoose')

const add_activity=new mongoose.Schema({
    activity_name:{type:String},
    call_outcome:{type:String},
    activity_note:{type:String},
    lead:{type:String},
    direction:{type:String},
    status:{type:String},
    date:{type:String},
    duration:{type:String},
    intrested_inventory:{type:String},
    message:{type:String},
    viewcount:{type:Number,default:0},
    activity_note1:{type:String},
    edit_field:{type:Array},
    edit_value:{type:Array},
    task_title:{type:String},
    projectname:{type:String},
    unitno:{type:String}
    },{timestamps:true})

const addactivity=mongoose.model('add_activity',add_activity)
module.exports=addactivity