
const add_payment_details = require('../models/payment_details');

const addpayment_details=async(req,res)=>
    {
        try {
            const{date,account_name_to,recieved_from,payment_mode,cheque_number,cheque_bank_name,cheque_date,in_favour_of,amount,tds,
                tds_amount,tax_type,discount_type,sgst,sgst_value,cgst,cgst_value,discount,payment_for,narration}=req.body;

                const file=req.files ? req.files.map(item => item.path) : [];
           
                const new_payment_details= new add_payment_details({date,account_name_to,recieved_from,payment_mode,cheque_number,cheque_bank_name,cheque_date,in_favour_of,amount,tds,
                    tds_amount,tax_type,discount_type,sgst,sgst_value,cgst,cgst_value,discount,payment_for,narration,image:file})
            
            const resp=await new_payment_details.save()
            res.status(200).send({message:"payment details saved ",payment_details:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_payment=async(req,res)=>
        {
            try {
                const resp=await add_payment_details.find()
                res.status(200).send({message:"payment details fetch successfully",payment:resp})
            } catch (error) {
                console.log(error)
            }
        }

    module.exports={addpayment_details,view_payment}