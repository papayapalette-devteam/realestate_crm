const leadinfo_personal= require('../models/leadinfo_personal');

const lead_info_personal=async(req,res)=>
    {
        try {
            const{gender,maritial_status,birth_date,anniversary_date,father_husband_name,h_no,
                street_address,location,city,pincode,state,country,website,industry,education,
                degree,college,loan,bank,amount,social_media,url,income,amount1,document,number}=req.body;
                
                const file=req.files;
                
                const newleadinfopersonal=new leadinfo_personal({gender,maritial_status,birth_date,anniversary_date,father_husband_name,h_no,
                    street_address,location,city,pincode,state,country,website,industry,education,
                    degree,college,loan,bank,amount,social_media,url,income,amount1,document,number,file:file})
                
                    const resp=await newleadinfopersonal.save();
                    res.status(200).send({message:"lead information personal details saved",lead:resp})
        } catch (error) {
            console.log(error)
        }

    }
    module.exports=lead_info_personal
    