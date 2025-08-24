const sitevisit_form=require('../models/site_visit_form')

const site_visit_form=async(req,res)=>
    {
        try {
            const{activity_type,title,executive,project,sitevisit_type,inventory,block,lead,confirmation,remark,participants,
                remind_me,start_date,end_date,start_time,end_time,complete, title2,first_name,last_name,mobile_no,email,stage,lead_id,status,intrested_inventory,result,
                intrested_project,intrested_block,date,feedback}=req.body;

                     const match=await sitevisit_form.find({lead:req.body.lead})
                                    
                                                   for (let task of match) {
                                                        if (task.complete !== "true") {
                                                            return res.status(400).send({ message: `There is an incomplete call task of ${task.lead}. Please complete it first.` });
                                                        }
                                                    }
                const newsitevisitform=new sitevisit_form({activity_type,title,executive,project,sitevisit_type,inventory,block,lead,confirmation,remark,participants,
                    remind_me,start_date,end_date,start_time,end_time,complete, title2,first_name,last_name,mobile_no,email,stage,lead_id,status,intrested_inventory,result,
                    intrested_project,intrested_block,date,feedback})

                    const resp=await newsitevisitform.save(); 
                    res.status(200).send({message:"site visit details saved",site_visit:resp})
        } catch (error) {
            console.log(error)
        }

    }

    const view_site=async(req,res)=>
        {
            try {
                const resp=await sitevisit_form.find()
                res.status(200).send({message:"site visit details fetch successfully",sitevisit:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const view_sitevisittask_Byid=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const resp= await sitevisit_form.findOne({_id:_id})
                    if(!resp)
                        {
                           return res.send("lead info not available")
                        }
                    res.status(200).send({message:"sitevisit task found and here are lead details:",sitevisit:resp})
                } catch (error) {
                    console.log(error)
                }
            }

        const remove_sitevisittask=async(req,res)=>
            {
                try {
                    const id=req.params._id;
                    const user=await sitevisit_form.findOne({_id:id})
                    if(!user)
                        {
                            return res.send({message:"deal not found"})
                        }
                    const resp=await sitevisit_form.deleteOne({_id:id})
                    res.status(200).send({message:"task deleted successfully"})
                } catch (error) {
                    console.log(error)
                }
            }

            const update_sitevisittask=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await sitevisit_form.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"task not found"})
                            }
                          
                        
                         const updatedFields = {
                            ...req.body,
                        };
                        const resp=await sitevisit_form.findByIdAndUpdate(id,updatedFields,{ new: true })
                        res.status(200).send({message:"sitevisit task update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }



    module.exports={site_visit_form,view_site,remove_sitevisittask,view_sitevisittask_Byid,update_sitevisittask};
    