

const axios = require('axios');

const { htmlToText } = require('html-to-text');


  const accesstoken='681dad5418c1e'
  let instanceId=""
const sendwhatsapp = async (req, res) => {
  try {
    // Step 1: Get the instance_id by calling the create_instance API
    const createInstanceResponse = await axios.get('https://wamaster.metalivingrich.in/api/create_instance', {
      params: {
        access_token: accesstoken
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://wamaster.metalivingrich.in/'
      }
    });


    // Extract instance_id from the response (adjust according to actual response structure)
     instanceId = createInstanceResponse.data.instance_id;

    // Step 2: Use the instance_id to get the QR code
    const qrCodeResponse = await axios.get('https://wamaster.metalivingrich.in/api/get_qrcode', {
      params: {
        instance_id:instanceId,
        access_token: accesstoken
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://wamaster.metalivingrich.in/'
      }
    });

    // Step 3: Send the QR code data back to the frontend
    res.json(qrCodeResponse.data);
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).send('Error fetching QR code');
  }
};

const setWhatsAppWebhook = async (req,res) => {
    try {
      const instanceId = '6807851782359';
      const accessToken = '68076d9808e66';
      const webhookUrl = 'https://webhook.site/1b25464d6833784f96eef4xxxxxxxxxx'; // Replace with your real webhook URL
  
      const response = await axios.post('https://wamaster.metalivingrich.in/api/set_webhook', null, {
        params: {
          webhook_url: webhookUrl,
          enable: true,
          instance_id: instanceId,
          access_token: accessToken
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
  
      res.json(response.data)
    } catch (error) {
      console.error('Error setting webhook:', error.response?.data || error.message);
    }
  };



const sendWhatsAppTextMessage = async (req, res) => {
  const { number, message1,media_url,instanceId } = req.body; // Get data from frontend

  if (!number || !message1) {
    return res.status(400).json({ status: 'error', message: 'Number and message are required' });
  }


  
const plainTextMessage = htmlToText(message1, {
  wordwrap: false, // or set to any value you prefer
});

  // Clean number (just digits)
  let rawNumber = number.toString().replace(/\D/g, ''); // remove any non-digit characters

  if (rawNumber.length < 10) {
    return res.status(400).json({ status: 'error', message: 'Invalid number: less than 10 digits' });
  }

  if (rawNumber.length === 10) {
    rawNumber = '91' + rawNumber;
  }

  try {
    const payload = {
      number:rawNumber,
      type: 'media',
      media_url,
      message:plainTextMessage,
      instance_id: instanceId,
      access_token: accesstoken
    };
    
    const response = await axios.post('https://wamaster.metalivingrich.in/api/send', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    

    res.json({ status: 'success', data: response.data });
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    res.status(500).json({ status: 'error', message: 'Failed to send message' });
  }
};

// Setup socket.io for real-time communication with React

 const rcvmessage=async (req, res) => {
    console.log('Received WhatsApp message:', req.body);
    io.emit('whatsapp-reply', req.body);  // Using socket.io for real-time updates
  
  }



  module.exports={sendwhatsapp,setWhatsAppWebhook,sendWhatsAppTextMessage,rcvmessage}