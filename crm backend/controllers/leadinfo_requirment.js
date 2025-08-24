const leadinfo_requirment= require('../models/lead_info_requirment');

const lead_info_requirment=async(req,res)=>
    {
        try {
            const{requirment,property_type,purpose,nri,sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,
                area_metric,search_location,street_address,city,area,country,pin_code,block,state,lattitude,longitude,specific_unit,
                measurement,funding,timeline,facing,road,transaction_type,furnishing}=req.body;
                
                
                const newleadinforequirment=new leadinfo_requirment({requirment,property_type,purpose,nri,sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,
                    area_metric,search_location,street_address,city,area,country,pin_code,block,state,lattitude,longitude,specific_unit,
                    measurement,funding,timeline,facing,road,transaction_type,furnishing})
                
                    const resp=await newleadinforequirment.save(); 
                    res.status(200).send({message:"lead information requirment details saved",requirment:resp})
        } catch (error) {
            console.log(error)
        }

    }
    module.exports=lead_info_requirment;
    