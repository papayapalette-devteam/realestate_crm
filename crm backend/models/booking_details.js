const mongoose=require('mongoose')

const bookingdetails=new mongoose.Schema({
type:{type:String},
property:{type:String},
booked_lead:{type:String},
booking_date:{type:String},
form_application_no:{type:String},
total_deal_amount:{type:String},
booking_date1:{type:String},
agreement_amount:{type:String},
agreement_date:{type:String},
part_payment_amount:{type:String},
part_payment_date:{type:String},
full_final_payment_date:{type:String},
sales_agent:{type:String},
channel:{type:String},
side:{type:String},
seller_brokerage:{type:String},
brokerage:{type:String},
buyer_brokerage:{type:String},
brokerage1:{type:String},
executive_incentive:{type:String},
executive_incentive1:{type:String},
remarks:{type:String}
},{timestamps:true})

const Booking_details=mongoose.model('booking-details',bookingdetails)
module.exports=Booking_details