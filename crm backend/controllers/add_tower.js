
const addtower = require('../models/add_tower');

const add_tower=async(req,res)=>
    {
        try {
            const{tower_name,project,land_area,in_metric,total_units,total_floors,units_per_floor,rera_tower_id,
                professional_status,category,possession_date,completion_date,sub_category,size,total_selable_area,
                measurement1,carpet,measurement2,covered_area,measurement3,loading}=req.body;
            const user=await addtower.findOne({tower_name})
            if(user)
                {
                    return res.status(400).send({message:"tower already exist"})
                }
                // if(!title || !first_name  || !last_name  || !country_code || !mobile_no || !mobile_type ||
                //     !email || !email_type ||
                //     !father_husband_name || !h_no || !street_address || !location || !city || !pincode ||
                //     !state || !country ||   !gender || !visible_to || !maritial_status ||
                //     !birth_date ||  !descriptions)
                //     {
                //         return res.status(400).send({message:"all fields are required"})
                //     }
                const new_add_tower= new addtower({tower_name,project,land_area,in_metric,total_units,total_floors,units_per_floor,rera_tower_id,
                    professional_status,category,possession_date,completion_date,sub_category,size,total_selable_area,
                    measurement1,carpet,measurement2,covered_area,measurement3,loading})
            
            const resp=await new_add_tower.save()
            res.status(200).send({message:"tower added ",tower:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_tower=async(req,res)=>
        {
            try {
                const resp=await addtower.find()
                res.status(200).send({message:"tower details fetch successfully",tower:resp})
            } catch (error) {
                console.log(error)
            }
        }

    
    module.exports={add_tower,view_tower};