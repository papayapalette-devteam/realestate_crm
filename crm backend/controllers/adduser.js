const adduser = require('../models/adduser')


const add_user = async (req, res) => {
    try {

    const {
    
      full_name,email,mobile,manager,team,role_name,descriptions,permission,assign_permission, manage,data,communication_channels,cutomize,integration,
      bussiness_rule,canview_properties,canadd_properties,canupdate_properties,canreassign_properties,candeletproperties,canview_properties_owner,
      } = req.body;
   
      const existinguser=await adduser.findOne({email:email,mobile:mobile})
      if(existinguser)
      {
        res.status(400).send({message:"User Already Exist..."})
        return
      }

      const new_add_user= new adduser({
        full_name,email,mobile,manager,team,role_name,descriptions,permission,assign_permission, manage,data,communication_channels,cutomize,integration,
      bussiness_rule,canview_properties,canadd_properties,canupdate_properties,canreassign_properties,candeletproperties,canview_properties_owner,
      });
  
      // Save the user to the database
      const resp = await new_add_user.save();
      res.status(200).send({ message: 'User added successfully', user: resp });
  
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).send({ message: 'Error occurred while adding user', error: error.message });
    }
  };


     const view_user=async(req,res)=>
        {
            try {
                const resp=await adduser.find()
                res.status(200).send({message:"User details fetch successfully",user:resp})
            } catch (error) {
                console.log(error)
            }
        }


         const update_user=async(req,res)=>
                    {
                        try {
                            const id=req.params._id;
                         
                            
                            const user=await adduser.findOne({_id:id})
                            if(!user)
                                {
                                    return res.send({message:"user not found"})
                                }
                                // const pics = req.files ? req.files.map(item => item.path) : [];
                                // const preview=req.files ? req.files.map((item=>item.path)):[]
                            
                             const updatedFields = {
                                ...req.body,
                          
                            };
                            const resp=await adduser.findByIdAndUpdate(id,updatedFields,{ new: true })
                            res.status(200).send({message:"User update successfully"})
                        } catch (error) {
                            console.log(error)
                        }
                    }

                    const remove_user=async(req,res)=>
                                    {
                                        try {
                                            const id=req.params._id;
                                            const user=await adduser.findOne({_id:id})
                                            if(!user)
                                                {
                                                    return res.send({message:"User not found"})
                                                }
                                            const resp=await adduser.deleteOne({_id:id})
                                            res.status(200).send({message:"User deleted successfully"})
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }

  module.exports={add_user,view_user,update_user,remove_user}