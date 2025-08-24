const mongoose=require('mongoose')

const add_tower=new mongoose.Schema({
tower_name:{type:String},
project:{type:String},
land_area:{type:String},
in_metric:{type:String},
total_units:{type:String},
total_floors:{type:String},
units_per_floor:{type:String},
rera_tower_id:{type:String},
professional_status:{type:String},
category:{type:String},
possession_date:{type:String},
completion_date:{type:String},
sub_category:{type:String},
size:{type:String},
total_selable_area:{type:String},
measurement1:{type:String},
carpet:{type:String},
measurement2:{type:String},
covered_area:{type:String},
measurement3:{type:String},
loading:{type:String},
},{timestamps:true})

const addtower=mongoose.model('add_tower',add_tower)
module.exports=addtower