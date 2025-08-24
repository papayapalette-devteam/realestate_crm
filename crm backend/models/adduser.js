const mongoose=require('mongoose')


const user=new mongoose.Schema({
full_name:{type:String},
email:{type:String},
mobile:{type:String},
manager:{type:String},
team:{type:String},
role_name:{type:String},
descriptions:{type:String},
 permission: {type: String},
   assign_permission: {type: String},
  manage : {type: Array },
  data: {type: Array },
 communication_channels: {type: Array },
 cutomize: {type: Array },
 integration: {type: Array },
 bussiness_rule: {type: Array },
canview_properties: {type: String },
canadd_properties: {type: String },
canupdate_properties: {type: String },
canreassign_properties: {type: String },
candeletproperties: {type: String },
canview_properties_owner: {type: String },
},{timestamps:true})


const adduser=mongoose.model('user',user)
module.exports=adduser