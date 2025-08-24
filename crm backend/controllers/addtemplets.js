
const addtemplate = require('../models/templets');

const add_templete = async (req, res) => {
    try {
        const {templateName, templateContent} = req.body;

        const newAddtemplete = new addtemplate({templateName,templateContent});
        
        const resp = await newAddtemplete.save();
        res.status(200).send({ message: "templets saved", templete: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error saving templete", error });
    }
};

    const view_templete=async(req,res)=>
        {
            try {
                const resp=await addtemplate.find()
                res.status(200).send({message:"templetes fetch successfully",templetes:resp})
            } catch (error) {
                console.log(error)
            }
        }

module.exports={add_templete,view_templete}