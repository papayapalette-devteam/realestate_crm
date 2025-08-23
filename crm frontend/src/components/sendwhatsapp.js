import React, { useState } from 'react';
import axios from 'axios';

const WhatsAppLogin = () => {
    
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const getQrCode = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-qr-code');
      
      // Assuming the response contains a direct QR code image URL
      setQrCodeUrl(response.data.base64); // or adjust this based on the actual API response
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  const getmessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/setwebhook');
      
    console.log(response);

    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post('http://localhost:5000/sendwhatsappmessage', {
        number,
        message
      });
      console.log('Message sent:', res);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
    }
  };
  return (
    <div className="p-4">
      <button onClick={getQrCode} className="bg-green-500 text-white px-4 py-2 rounded">
        Generate QR Code
      </button>
      <button onClick={getmessage} className="bg-green-500 text-white px-4 py-2 rounded">
        fetch message
      </button>
      {qrCodeUrl && (
        <div className="mt-4">
          <img src={qrCodeUrl} alt="WhatsApp QR Code" />
        </div>
      )}

    <div>
      <input
        type="text"
        placeholder="Enter phone number with country code"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send WhatsApp Message</button>
    </div>
    </div>
  );
};

export default WhatsAppLogin;
