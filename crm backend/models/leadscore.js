const mongoose=require('mongoose')

const add_leadscore=new mongoose.Schema({
    available_for:{type:String},
    reason:{type:String},
    direction:{type:String},
    status:{type:String},
    result:{type:String},
    score:{type:String},

    email_category:{type:String},
    email_direction:{type:String},
    email_status:{type:String},
    email_score:{type:String},
    email_subject:{type:String},

    meeting_reason:{type:String},
    meeting_status:{type:String},
    meeting_result:{type:String},
    meeting_score:{type:String},

    sitevisit_visittype:{type:String},
    sitevisit_status:{type:String},
    sitevisit_result:{type:String},
    sitevisit_score:{type:String},

    leadstage:{type:String},
    dealstage:{type:String},
    stage_requirment:{type:Array},
    stage_requirment1:{type:Array},
    timeline:{type:String}
    },{timestamps:true})

const addleadscore=mongoose.model('add_leadscore',add_leadscore)
module.exports=addleadscore