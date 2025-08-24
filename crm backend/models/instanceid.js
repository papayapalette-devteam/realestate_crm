const mongoose=require('mongoose')

const add_instanceid=new mongoose.Schema({
    user1:{type:String},
    user2:{type:String},

    },{timestamps:true})

const addinstanceid=mongoose.model('add_instanceid',add_instanceid)
module.exports=addinstanceid