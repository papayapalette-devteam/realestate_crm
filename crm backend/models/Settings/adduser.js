const mongoose=require('mongoose')


const user=new mongoose.Schema({
full_name:{type:String},
email:{type:String},
mobile:{type:String},
manager:{type:String},
team:{type:String},
permission: {type: String},
assign_permission: {type: String},
},{timestamps:true})


const adduser=mongoose.model('user',user)
module.exports=adduser