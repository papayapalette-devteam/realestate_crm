const mailtask_form=require('../models/mail_task_form')

const mail_task_form=async(req,res)=>
    {
        try {
            const{activity_type,title,executive,lead,project,block,inventory,subject,remarks,complete,due_date,due_time,direction,status,
                    date,feedback,title2,first_name,last_name,mobile_no,email,stage}=req.body;
                
                                   const match=await mailtask_form.find({lead:req.body.lead})
                    
                                   for (let task of match) {
                                        if (task.complete !== "true") {
                                            return res.status(400).send({ message: `There is an incomplete call task of ${task.lead}. Please complete it first.` });
                                        }
                                    }
                
                const newmailtaskform=new mailtask_form({activity_type,title,executive,lead,project,block,inventory,subject,remarks,
                    complete,due_date,due_time,direction,status,date,feedback,title2,first_name,last_name, mobile_no,email,stage })
                
                    const resp=await newmailtaskform.save(); 
                    res.status(200).send({message:"mail task details saved",mailtask:resp})
        } catch (error) {
            console.log(error)
        }

    }
    const view_mail=async(req,res)=>
        {
            try {
                const resp=await mailtask_form.find()
                res.status(200).send({message:"mail details fetch successfully",mail_task:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const remove_mailtask=async(req,res)=>
            {
                try {
                    const id=req.params._id;
                    const user=await mailtask_form.findOne({_id:id})
                    if(!user)
                        {
                            return res.send({message:"task not found"})
                        }
                    const resp=await mailtask_form.deleteOne({_id:id})
                    res.status(200).send({message:"task deleted successfully"})
                } catch (error) {
                    console.log(error)
                }
            }

            const view_mailtask_Byid=async(req,res)=>
                {
                    try {
                        const _id=req.params._id;
                        const resp= await mailtask_form.findOne({_id:_id})
                        if(!resp)
                            {
                               return res.send("call  info not available")
                            }
                        res.status(200).send({message:"mail task found and here are lead details:",mailtask:resp})
                    } catch (error) {
                        console.log(error)
                    }
                }
    
            const update_mailtask=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await mailtask_form.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"task not found"})
                            }
                          
                        
                         const updatedFields = {
                            ...req.body,
                        };
                        const resp=await mailtask_form.findByIdAndUpdate(id,updatedFields,{ new: true })
                        res.status(200).send({message:"mail task update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }


    module.exports={mail_task_form,view_mail,remove_mailtask,view_mailtask_Byid,update_mailtask};
    