const mongoose=require('mongoose')

const lead_inforequirment=new mongoose.Schema({
requirment:{type:String},
property_type:{type:String},
purpose:{type:String},
nri:{type:String},
sub_type:{type:String},
unit_type:{type:String},
budget_min:{type:String},
budget_max:{type:String},
minimum_area:{type:String},
maximum_area:{type:String},
area_metric:{type:String},
search_location:{type:String},
street_address:{type:String},
city:{type:String},
area:{type:String},
country:{type:String},
pin_code:{type:String},
block:{type:String},
state:{type:String},
lattitude:{type:String},
longitude:{type:String},
specific_unit:{type:String},
measurement:{type:String},
funding:{type:String},
timeline:{type:String},
facing:{type:String},
road:{type:String},
transaction_type:{type:String},
furnishing:{type:String},
},{timestamps:true})

const leadinfo_requirment=mongoose.model('leadinfo-requirment',lead_inforequirment)
module.exports=leadinfo_requirment