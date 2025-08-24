const calltask_form=require('../models/call_task_form')

const call_task_form=async(req,res)=>
    {
        try {
            const{activity_type,title,reason,lead,executive,remarks,complete,due_date,due_time,title2,first_name,last_name,mobile_no,email,stage,
                lead_id,direction,status,date,duration,result,intrested_inventory,feedback}=req.body;

                
                const match=await calltask_form.find({lead:req.body.lead})

               for (let task of match) {
                    if (task.complete !== "true") {
                        return res.status(400).send({ message: `There is an incomplete call task of ${task.lead}. Please complete it first.` });
                    }
                }
                const newcalltaskform=new calltask_form({activity_type,title,reason,lead,executive,remarks,complete,due_date,due_time,
                    title2,first_name,last_name,mobile_no,email,stage,lead_id,direction,status,date,duration,result,intrested_inventory,feedback
                })
                    const resp=await newcalltaskform.save(); 
                    res.status(200).send({message:"call task details saved",calltask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    
    const view_call=async(req,res)=>
        {
            try {
                const resp=await calltask_form.find()
                res.status(200).send({message:"call details fetch successfully",call_task:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const view_calltask_Byid=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const resp= await calltask_form.findOne({_id:_id})
                    if(!resp)
                        {
                           return res.send("call  info not available")
                        }
                    res.status(200).send({message:"call task found and here are lead details:",calltask:resp})
                } catch (error) {
                    console.log(error)
                }
            }

        const update_calltask=async(req,res)=>
            {
                try {
                    const id=req.params._id;
               
                 
                    const user=await calltask_form.findOne({_id:id})
                    if(!user)
                        {
                            return res.send({message:"task not found"})
                        }
                      
                    
                     const updatedFields = {
                        ...req.body,
                    };
                    const resp=await calltask_form.findByIdAndUpdate(id,updatedFields,{ new: true })
                    res.status(200).send({message:"call task update successfully"})
                } catch (error) {
                    console.log(error)
                }
            }

            const remove_calltask=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await calltask_form.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"task not found"})
                            }
                        const resp=await calltask_form.deleteOne({_id:id})
                        res.status(200).send({message:"task deleted successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }

    module.exports={call_task_form,view_call,update_calltask,remove_calltask,view_calltask_Byid};
    