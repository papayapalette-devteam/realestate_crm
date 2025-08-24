const meetingtask_form=require('../models/meeting_task_form')

const meeting_task_form=async(req,res)=>
    {
        try {
            const{activity_type,title,executive,lead,location_type,location_address,reason,project,block,inventory,remark,complete,
                status,meeting_result,date,feedback,due_date,due_time,
                title2,first_name,last_name,mobile_no,email,stage}=req.body;

                
                                   const match=await meetingtask_form.find({lead:req.body.lead})
                    
                                   for (let task of match) {
                                        if (task.complete !== "true") {
                                            return res.status(400).send({ message: `There is an incomplete call task of ${task.lead}. Please complete it first.` });
                                        }
                                    }

                const newmeetingtaskform=new meetingtask_form({activity_type,title,executive,lead,location_type,location_address,
                                    reason,project,block,inventory,remark,complete,status,meeting_result,date,feedback,due_date,due_time,title2,first_name,last_name,mobile_no,email,stage})
                    const resp=await newmeetingtaskform.save(); 
                    res.status(200).send({message:"meeting task details saved",meetingtask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    const viewmeeting_task=async(req,res)=>
        {
            try {
                const resp= await meetingtask_form.find()
    
                  
                        res.status(200).send({message:"meeting task details ",meetingtask:resp})
            } catch (error) {
                console.log(error)
            }
    
        }

        const view_meetingtask_Byid=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const resp= await meetingtask_form.findOne({_id:_id})
                    if(!resp)
                        {
                           return res.send("lead info not available")
                        }
                    res.status(200).send({message:"meeting task found and here are lead details:",meetingtask:resp})
                } catch (error) {
                    console.log(error)
                }
            }

        const remove_meetingtask=async(req,res)=>
            {
                try {
                    const id=req.params._id;
                    const user=await meetingtask_form.findOne({_id:id})
                    if(!user)
                        {
                            return res.send({message:"deal not found"})
                        }
                    const resp=await meetingtask_form.deleteOne({_id:id})
                    res.status(200).send({message:"task deleted successfully"})
                } catch (error) {
                    console.log(error)
                }
            }

            const update_meetingtask=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await meetingtask_form.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"task not found"})
                            }
                          
                        
                         const updatedFields = {
                            ...req.body,
                        };
                        const resp=await meetingtask_form.findByIdAndUpdate(id,updatedFields,{ new: true })
                        res.status(200).send({message:"meeting task update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }
            
    module.exports={meeting_task_form,viewmeeting_task,remove_meetingtask,view_meetingtask_Byid,update_meetingtask};
    