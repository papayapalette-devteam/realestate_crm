const mongoose=require('mongoose')

const add_feedback=new mongoose.Schema({
    owner:{type:String},
    unit_no:{type:String},
    owner_response:{type:String},
    discussed_reason:{type:String},
    other_discussed_reason:{type:String},
    seller_price:{type:String},
    my_price:{type:String},
    next_call_date:{type:String},
    no_reason:{type:String},
    other_no_reason:{type:String},
    stage:{type:String},
    remarks:{type:String},

    },{timestamps:true})

const addfeedback=mongoose.model('add_feedback',add_feedback)
module.exports=addfeedback