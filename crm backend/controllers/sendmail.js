const nodemailer = require('nodemailer');

const cloudinary=require('cloudinary').v2
const fs=require('fs')
const path=require('path')

require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const send_mail = async (req, res) => {
    try {
        const { emails, message, subject } = req.body; 
        const files = req.files;
        const cloudinaryAttachments = [];
      
     
        
        if (!emails ) {
            return res.status(400).send('No recipients provided.');
        }

        // Upload files to Cloudinary and get URLs
        for (const file of files) {
          try {
            // Upload the file to Cloudinary
            const result = await cloudinary.uploader.upload(file.path);
            
            // Create an attachment object with the Cloudinary URL
            cloudinaryAttachments.push({
              filename: file.originalname,
              path: result.secure_url, // Use the URL returned by Cloudinary
            });
          } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            return res.status(500).send('Error uploading files');
          }
        }
      
         // Handle already uploaded cloud URLs
    if (req.body.cloudUrls) {
        const urls = Array.isArray(req.body.cloudUrls) ? req.body.cloudUrls : JSON.parse(req.body.cloudUrls);
        urls.forEach(({ filename, url }) => {
          cloudinaryAttachments.push({
            filename,
            path: url,
          });
        });
      }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bharatproperties570@gmail.com',
                pass: 'thpf pvbb pwfn idvf'
            }
        });

        const mailOptions = {
            from: 'bharatproperties570@gmail.com',
            subject: subject,
            html: message,
            attachments: cloudinaryAttachments,
        };

        // Send emails
        if (Array.isArray(emails) && emails.length>0) {

            for (const recipient of emails) {
                await transporter.sendMail({ ...mailOptions, to: recipient });
            }
        } else {
            await transporter.sendMail({ ...mailOptions, to: emails });
        }

        res.status(200).send('Emails sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email and missing email');
    }
};

module.exports = send_mail;
