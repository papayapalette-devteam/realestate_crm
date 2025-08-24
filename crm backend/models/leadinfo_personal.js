const mongoose=require('mongoose')

const lead_infopersonal=new mongoose.Schema({
gender:{type:String},
maritial_status:{type:String},
birth_date:{type:String},
anniversary_date:{type:String},
father_husband_name:{type:String},
h_no:{type:String},
street_address:{type:String},
location:{type:String},
city:{type:String},
pincode:{type:String},
state:{type:String},
country:{type:String},
website:{type:String},
industry:{type:String},
education:{type:Array},
degree:{type:Array},
college:{type:Array},
loan:{type:String},
bank:{type:String},
amount:{type:String},
social_media:{type:String},
url:{type:String},
income:{type:String},
amount1:{type:String},
document:{type:String},
number:{type:String},
file:{type:Array},
},{timestamps:true})

const leadinfo_personal=mongoose.model('leadinfo-personal',lead_infopersonal)
module.exports=leadinfo_personal