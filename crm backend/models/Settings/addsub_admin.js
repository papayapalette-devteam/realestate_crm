const mongoose=require('mongoose')

const add_sub_admin=new mongoose.Schema({
    User:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    UserName:{type:String},
    Password:{type:String},

},
    {timestamps:true})

module.exports=mongoose.model('sub-admins',add_sub_admin)