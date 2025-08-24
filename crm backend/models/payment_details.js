const mongoose=require('mongoose')

const add_paymentdetails=new mongoose.Schema({
date:{type:String},
account_name_to:{type:String},
recieved_from:{type:String},
payment_mode:{type:String},
cheque_number:{type:String},
cheque_bank_name:{type:String},
cheque_date:{type:String},
in_favour_of:{type:String},
amount:{type:String},
tds:{type:String},
tds_amount:{type:String},
tax_type:{type:String},
discount_type:{type:String},
sgst:{type:String},
sgst_value:{type:String},
cgst:{type:String},
cgst_value:{type:String},
discount:{type:String},
payment_for:{type:String},
narration:{type:String},
image:{type:Array}
},{timestamps:true})

const add_payment_details=mongoose.model('add_payment_details',add_paymentdetails)
module.exports=add_payment_details