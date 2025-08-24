

const twilio=require('twilio')
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendmessage=async(req,res)=>
{
    try {
        console.log(req.body);
        
        const { to, message } = req.body;

    const resp = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: to, // Receiver's phone number
    });
    res.status(200).send({message:"message send successfully",resp})
        
    } catch (error) {
        console.log(error);
        
    }
}

const makecall=async(req,res)=>
    {
        try {
       
            
            const { to} = req.body;
    
            const resp = await client.calls.create({
                url: "http://demo.twilio.com/docs/voice.xml",
                to: to,
                from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
              });
        res.status(200).send({message:"call send successfully",resp})
            
        } catch (error) {
            console.log(error);
            
        }
    }

module.exports={sendmessage,makecall}