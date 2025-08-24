
const addproject = require('../models/add_project');

const add_project=async(req,res)=>
    {
        try {
            const{project_name,developer,joint_venture,secondary_developer,description,project_id,team,sales,notify_emails,
                    launched_on,expected_completion,possession,is_active,location_link}=req.body;
            const user=await addproject.findOne({project_name})
            if(user)
                {
                    return res.status(400).send({message:"project already exist"})
                }
                // if(!title || !first_name  || !last_name  || !country_code || !mobile_no || !mobile_type ||
                //     !email || !email_type ||
                //     !father_husband_name || !h_no || !street_address || !location || !city || !pincode ||
                //     !state || !country ||   !gender || !visible_to || !maritial_status ||
                //     !birth_date ||  !descriptions)
                //     {
                //         return res.status(400).send({message:"all fields are required"})
                //     }
                const new_add_project= new addproject({project_name,developer,joint_venture,secondary_developer,description,project_id,team,sales,notify_emails,
                    launched_on,expected_completion,possession,is_active,location_link})
            
            const resp=await new_add_project.save()
            res.status(200).send({message:"project added ",project:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_project=async(req,res)=>
        {
            try {
                const resp=await addproject.find()
                res.status(200).send({message:"project details fetch successfully",project:resp})
            } catch (error) {
                console.log(error)
            }
        }
        const view_projectbyid=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const resp=await addproject.findOne({_id:_id})
                    res.status(200).send({message:"project details fetch successfully",project:resp})
                } catch (error) {
                    console.log(error)
                }
            }
    

    
    module.exports={add_project,view_project,view_projectbyid};