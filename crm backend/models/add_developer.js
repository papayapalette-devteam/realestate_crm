const mongoose=require('mongoose')

const add_developer=new mongoose.Schema({
name:{type:String},
country_code1:{type:Array},
mobile_no1:{type:Array},
mobile_type1:{type:Array},
email1:{type:Array},
email_type1:{type:Array},
company_type:{type:String},
industry:{type:String},
descriptions:{type:String},
gst_no:{type:String},
source:{type:String},
team:{type:String},
owner:{type:String},
visible_to:{type:String},
area:{type:String},
location:{type:String},
city:{type:String},
pin_code:{type:String},
state:{type:String},
country:{type:String},
website:{type:String},
company_social_media1:{type:Array},
company_url1:{type:Array},
employee:{type:Array}
},{timestamps:true})

const adddeveloper=mongoose.model('add_developer',add_developer)
module.exports=adddeveloper