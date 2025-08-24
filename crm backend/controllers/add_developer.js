
const adddeveloper = require('../models/add_developer');

const add_developer=async(req,res)=>
    {
        try {
            const{name,country_code1,mobile_no1,mobile_type1,email1,email_type1,company_type,industry,descriptions,gst_no,source,
                    team,owner,visible_to,area,location,city,pin_code,state,country,website,company_social_media1,company_url1,
                    employee}=req.body;
           
             
                const new_add_developer= new adddeveloper({name,country_code1,mobile_no1,mobile_type1,email1,email_type1,company_type,industry,descriptions,gst_no,source,
                    team,owner,visible_to,area,location,city,pin_code,state,country,website,company_social_media1,company_url1,
                    employee})
            
            const resp=await new_add_developer.save()
            res.status(200).send({message:"developer added ",developer:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_developer=async(req,res)=>
        {
            try {
                const resp=await adddeveloper.find()
                res.status(200).send({message:"developer details fetch successfully",developer:resp})
            } catch (error) {
                console.log(error)
            }
        }
        const view_developer_Byid=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const resp= await adddeveloper.findOne({_id:_id})
                    if(!resp)
                        {
                           return res.send("developer details not available")
                        }
                    res.status(200).send({message:"developer found and here are contact details:",developer:resp})
                } catch (error) {
                    console.log(error)
                }
            }

            const update_developer=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await adddeveloper.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"company not found"})
                            }

                        const resp=await adddeveloper.findByIdAndUpdate(id,req.body,{ new: true })
                        res.status(200).send({message:"company update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }
                const remove_developer=async(req,res)=>
                    {
                        try {
                            const _id=req.params._id;
                            const user=await adddeveloper.find({_id:_id})
                            if(!user)
                                {
                                    return res.send({message:"developer not found"})
                                }
                            const resp=await adddeveloper.deleteOne({_id:_id})
                            res.status(200).send({message:"developer deleted successfully"})
                        } catch (error) {
                            console.log(error)
                        }
                    }
    
    module.exports={add_developer,view_developer,view_developer_Byid,update_developer,remove_developer};