const mongoose=require('mongoose')

const add_inventory=new mongoose.Schema({
developer:{type:String},
block_tower:{type:String},
project:{type:String},
unit_number:{type:String},
sub_category:{type:String},
size:{type:String},
project1:{type:String},
facing:{type:String},
road:{type:String},
ownership:{type:String},
type:{type:String},
cluter_details:{type:String},
length:{type:String},
breadth:{type:String},
total_area:{type:String},
in_metrics:{type:String},
occupation_date:{type:String},
age_of_construction:{type:String},
furnish_details:{type:String},
furnished_item:{type:String},
aminities:{type:String},
location:{type:String},
lattitude:{type:String},
langitude:{type:String},
s_no:{type:Array},
preview:{type:Array},
descriptions:{type:Array},
category:{type:Array},
s_no1:{type:Array},
url:{type:Array},
search_contact:{type:String},
relation:{type:String},
document_name:{type:String},
number:{type:String},
date:{type:String},
linkded_contact:{type:String}
},{timestamps:true})

const addinventory=mongoose.model('add_inventory',add_inventory)
module.exports=addinventory