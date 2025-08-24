const addactivity = require("../models/activity");





const add_activity = async (req, res) => {
    try {
        const {activity_name, call_outcome, activity_note,lead,direction,status,date,duration,
            intrested_inventory,message,viewcount,activity_note1,edit_field,edit_value,task_title,projectname,unitno} = req.body;
     
      
        const newaddactivity = new addactivity({activity_name, call_outcome, activity_note,lead,direction,status,date,
            duration,intrested_inventory,message,viewcount,activity_note1,edit_field,edit_value,task_title,projectname,unitno});

        // Save to database
        const resp = await newaddactivity.save();
        res.status(200).send({ message: "activity saved", activity: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error saving contact", error });
    }
};

const view_activity=async(req,res)=>
    {
        try {
            const resp=await addactivity.find()
            res.status(200).send({message:"activity details fetch successfully",activity:resp})
        } catch (error) {
            console.log(error)
        }
    }

    const view_activitybyid=async(req,res)=>
        {
            try {
                const id=req.params._id
                const resp=await addactivity.find({_id:id})
                res.status(200).send({message:"activity details fetch successfully",activity:resp})
            } catch (error) {
                console.log(error)
            }
        }

      
    

    const remove_activity=async(req,res)=>
        {
            try {
                const _id=req.params._id;
                const user=await addactivity.find({_id:_id})
                if(!user)
                    {
                        return res.send({message:"activity not found"})
                    }
                const resp=await addactivity.deleteOne({_id:_id})
                res.status(200).send({message:"activity deleted successfully"})
            } catch (error) {
                console.log(error)
            }
        }

        const update_activity=async(req,res)=>
            {
                try {
                   
                    
                    const id=req.params._id
                    const {viewCount1}=req.body
                    const resp=await addactivity.findByIdAndUpdate(id, { $set: { viewcount:viewCount1 } },{ new: true })
                    res.status(200).send({message:"activity update  successfully",activity:resp})
                } catch (error) {
                    console.log(error)
                }
            }
    

module.exports={add_activity,view_activity,remove_activity,update_activity,view_activitybyid}