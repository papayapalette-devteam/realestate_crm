
const Booking_details = require('../models/booking_details');

const booking_details=async(req,res)=>
    {
        try {
            const{type,property,booked_lead,booking_date,form_application_no,total_deal_amount,booking_date1,agreement_amount,agreement_date,
                    part_payment_amount,part_payment_date,full_final_payment_date,sales_agent,channel,side,seller_brokerage,brokerage,
                    buyer_brokerage,brokerage1,executive_incentive,executive_incentive1,remarks}=req.body;
           
                const new_booking_details= new Booking_details({type,property,booked_lead,booking_date,form_application_no,total_deal_amount,booking_date1,agreement_amount,agreement_date,
                    part_payment_amount,part_payment_date,full_final_payment_date,sales_agent,channel,side,seller_brokerage,brokerage,
                    buyer_brokerage,brokerage1,executive_incentive,executive_incentive1,remarks})
            
            const resp=await new_booking_details.save()
            res.status(200).send({message:"booking details saved ",booking_details:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_booking=async(req,res)=>
        {
            try {
                const resp=await Booking_details.find()
                res.status(200).send({message:"booking details fetch successfully",booking:resp})
            } catch (error) {
                console.log(error)
            }
        }
    module.exports={booking_details,view_booking}