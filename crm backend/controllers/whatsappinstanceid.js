
const addinstanceid = require('../models/instanceid');

const add_instanceid = async (req, res) => {
    try {
        const { user1, user2 } = req.body;

        // Find any existing document (you expect only one)
        const existing = await addinstanceid.findOne();

        let result;

        if (existing) {
            // Update the existing document
            result = await addinstanceid.findByIdAndUpdate(
                existing._id,
                { user1, user2 },
                { new: true }
            );
            res.status(200).send({ message: "Instance Id updated successfully", instanceid: result });
        } else {
            // Create a new document if none exists
            const newInstance = new addinstanceid({ user1, user2 });
            result = await newInstance.save();
            res.status(200).send({ message: "Instance Id created successfully", instanceid: result });
        }

    } catch (error) {
        console.error("Error in add_instanceid:", error);
        res.status(500).send({
            message: "Error saving or updating templet",
            error
        });
    }
};


    const view_instanceid=async(req,res)=>
        {
            try {
                const resp=await addinstanceid.find()
                res.status(200).send({message:"templetes fetch successfully",instanceid:resp})
            } catch (error) {
                console.log(error)
            }
        }

module.exports={add_instanceid,view_instanceid}