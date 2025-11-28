const addfeedback=require('../models/feedbackform')


const add_feedback = async (req, res) => {
    try {
        const {owner,unit_no,owner_response,discussed_reason,other_discussed_reason,seller_price,my_price,next_call_date,no_reason,other_no_reason,
                stage,remarks} = req.body;

        const newAddfeedback = new addfeedback({owner,unit_no,owner_response,discussed_reason,other_discussed_reason,seller_price,my_price,next_call_date,
                                                    no_reason,other_no_reason,stage,remarks});

        const resp = await newAddfeedback.save();
        res.status(200).send({ message: "Feedback Submitted", user: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error submitting feedback", error });
    }
};

module.exports={add_feedback}