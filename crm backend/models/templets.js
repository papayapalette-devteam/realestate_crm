const mongoose=require('mongoose')

const add_template=new mongoose.Schema({
    templateName:{type:String},
    templateContent:{type:String},
 },{timestamps:true})

const addtemplate=mongoose.model('add_template',add_template)
module.exports=addtemplate