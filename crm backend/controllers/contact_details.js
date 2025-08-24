
const addcontact = require('../models/add_contact');
const adddeal = require('../models/deal.js');
const addactivity = require("../models/activity");

const cloudinary=require('cloudinary').v2
const fs=require('fs')
const path=require('path')

require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})




const add_contact = async (req, res) => {
    try {
        const { 
            title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
            source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
            company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
            father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
            birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
            income, amount1, document_no, document_name,document_pic, relation, lastcommunication
        } = req.body;

        // 'req.files' will contain the uploaded files
        const newDocumentPic = [];

        if (req.files) {
            // Upload files to Cloudinary and get the URLs
            for (let file of req.files) {
              const result = await cloudinary.uploader.upload(file.path);
              newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
              // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
              // fs.unlinkSync(file.path);
            }
          }

         // Check if mobile_no exists (and is array with values)
          if (Array.isArray(mobile_no)) {
            const validMobileNos = mobile_no.filter(num => num && num.trim() !== "");
            
            if (validMobileNos.length > 0) {
              const existingMobile = await addcontact.findOne({ mobile_no: { $in: validMobileNos } });
              if (existingMobile) {
                return res.status(400).send({ message: "Mobile number already exists..." });
              }
            }
          }

          if (Array.isArray(email)) {
          const validemails = email.filter(num => num && num.trim() !== "");
          
          if (validemails.length > 0) {
            const existingemail = await addcontact.findOne({ email: { $in: validemails } });
            if (existingemail) {
              return res.status(400).send({ message: "Email id already exists..." });
            }
          }
        }






        // Create a new contact with the uploaded Cloudinary URLs
        const newAddContact = new addcontact({
            title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
            source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
            company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
            father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
            birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
            income, amount1, document_no, document_name, document_pic: newDocumentPic, relation, lastcommunication
        });

        // Save to database
        const resp = await newAddContact.save();
        res.status(200).send({ message: "Contact saved", user: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error saving contact", error });
    }
};

    const view_contact=async(req,res)=>
        {
          try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    
    // Fetch contacts with pagination and sorting by createdAt descending
    const allcontact=await addcontact.find()
    const contacts = await addcontact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      // .select('name phone email createdAt');

    // Get total count of documents to calculate total pages on frontend
    const total = await addcontact.countDocuments();

    res.status(200).json({
      message: "Contacts fetched successfully",
      contact: contacts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      allcontact:allcontact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
        }
        

        // /viewcontact route with search + pagination
const searchcontact=async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 100;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    const searchRegex = new RegExp(search, 'i'); // case-insensitive partial match

    // Build filter for searching across fields
    const filter = search
      ? {
          $or: [
            { title: searchRegex },
            { first_name: searchRegex },
            { last_name: searchRegex },
            { mobile_no: { $elemMatch: { $regex: searchRegex } } },
            { email: { $elemMatch: { $regex: searchRegex } } },
          ],
        }
      : {};

    // Fetch paginated & searched
    const contacts = await addcontact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total for filtered result
    const total = await addcontact.countDocuments(filter);

    res.status(200).json({
      message: 'Contacts fetched successfully',
      contact: contacts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

    
    const view_contact_Byid=async(req,res)=>
        {
            try {
                const _id=req.params._id;
                const resp= await addcontact.findOne({_id:_id})
                if(!resp)
                    {
                       return res.send("contact details not available")
                    }
                res.status(200).send({message:"name found and here are contact details:",contact:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const view_contact_ByName=async(req,res)=>
            {
                try {
                    const name=req.params.first_name;
                    const resp= await addcontact.find({first_name:name})
                    if(!resp)
                        {
                           return res.send("contact details not available")
                        }
                    res.status(200).send({message:"name found and here are contact details:",contact:resp})
                } catch (error) {
                    console.log(error)
                }
            }
        const view_contact_Byemail=async(req,res)=>
            {
                try {
                    const email=req.params.email;
                    const resp= await addcontact.find({email:email})
                    if(!resp)
                        {
                           return res.send("contact details not available")
                        }
                    res.status(200).send({message:"name found and here are contact details:",contact:resp})
                } catch (error) {
                    console.log(error)
                }
            }
            const view_contact_Bymobile=async(req,res)=>
                {
                    try {
                        const mobile_no=req.params.mobile_no;
                        const resp= await addcontact.find({mobile_no:mobile_no})
                        if(!resp)
                            {
                               return res.send("contact details not available")
                            }
                        res.status(200).send({message:"name found and here are contact details:",contact:resp})
                    } catch (error) {
                        console.log(error)
                    }
                }
                const view_contact_Bytags=async(req,res)=>
                    {
                        try {
                            const tags=req.params.tags;
                            const resp= await addcontact.find({tags:tags})
                            if(!resp)
                                {
                                   return res.send("contact details not available")
                                }
                            res.status(200).send({message:"name found and here are contact details:",contact:resp})
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const view_contact_Bycompany=async(req,res)=>
                        {
                            try {
                                const company_name=req.params.company_name;
                                const resp= await addcontact.find({company_name:company_name})
                                if(!resp)
                                    {
                                       return res.send("contact details not available")
                                    }
                                res.status(200).send({message:"name found and here are contact details:",contact:resp})
                            } catch (error) {
                                console.log(error)
                            }
                        }
        const remove_contact=async(req,res)=>
            {
                try {
                    const _id=req.params._id;
                    const user=await addcontact.find({_id:_id})
                    if(!user)
                        {
                            return res.send({message:"contact not found"})
                        }
                    const resp=await addcontact.deleteOne({_id:_id})
                    res.status(200).send({message:"contact deleted successfully"})
                } catch (error) {
                    console.log(error)
                }
            }
            const update_contact=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await addcontact.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"lead not found"})
                            }

                            const newDocumentPic = [];

                            if (req.files) {
                                // Upload files to Cloudinary and get the URLs
                                for (let file of req.files) {
                                  const result = await cloudinary.uploader.upload(file.path);
                                  newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
                                  // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
                                  // fs.unlinkSync(file.path);
                                }
                              }
                        
                        const updatedFields = {
                            ...req.body,
                            document_pic:newDocumentPic // Update preview field with new images if provided
                        };
                        const resp=await addcontact.findByIdAndUpdate(id,updatedFields,{ new: true })

                        // await updateDealsWithUpdatedContact(id, resp);

                        res.status(200).send({message:"lead update successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }

                // const updateDealsWithUpdatedContact = async (id, resp) => {
                //     try {
                //       // Find and update deals where the contact._id exists in either owner_details or associated_contact
                //       const updatedDeals = await adddeal.updateMany(
                //         {
                //           $or: [
                //             { 'owner_details._id': id }, // Match contact in owner_details
                //             { 'associated_contact._id': id } // Match contact in associated_contact
                //           ]
                //         },
                //         {
                //           $set: {
                //             // Update the specific contact data inside the arrays, without replacing the whole array
                //             'owner_details.$[owner]': resp,    // Update matched contact in owner_details
                //             'associated_contact.$[assoc]': resp // Update matched contact in associated_contact
                //           }
                //         },
                //         {
                //           arrayFilters: [
                //             { 'owner._id': id },    // Filter for matching contact in owner_details
                //             { 'assoc._id': id }     // Filter for matching contact in associated_contact
                //           ]
                //         }
                //       );
                  
                //       console.log(`Deals updated where contact id: ${id} was referenced. Deals updated: ${updatedDeals.nModified}`);
                //     } catch (error) {
                //       console.error('Error updating related deals:', error);
                //     }
                //   };

                      const add_contactdocument = async (req, res) => {
                                            try {
                                              const id = req.params._id;  // Get lead ID from URL parameter
                                              const user = await addcontact.findOne({ _id: id });  // Find the lead by ID
                                          
                                              if (!user) {
                                                return res.send({ message: "Lead not found" });
                                              }
                                          
                                              // Initialize arrays to hold new data
                                              const newDocumentNo = req.body.document_no || [];
                                              const newDocumentName = req.body.document_name || [];
                                              const newDocumentPic = [];
                                          
                                              // Process files (if any)
                                              if (req.files) {
                                                // Upload files to Cloudinary and get the URLs
                                                for (let file of req.files) {
                                                  const result = await cloudinary.uploader.upload(file.path);
                                                  newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
                                                  // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
                                                  // fs.unlinkSync(file.path);
                                                }
                                              }
                                          
                                              // Retrieve the current document fields (if any) from the user document
                                              const oldDocumentNo = user.document_no || [];
                                              const oldDocumentName = user.document_name || [];
                                              const oldDocumentPic = user.document_pic || [];
                                          
                                              // Combine old and new document fields
                                              const updatedDocumentNo = [...oldDocumentNo, ...newDocumentNo];  // Append new document numbers to the existing ones
                                              const updatedDocumentName = [...oldDocumentName, ...newDocumentName];  // Append new document names to the existing ones
                                              const updatedDocumentPic = [...oldDocumentPic, ...newDocumentPic];  // Append new document pictures to the existing ones
                                          
                                              // Prepare updated fields object
                                              const updatedFields = {
                                                ...req.body,  // Keep other fields intact from the request body
                                                document_no: updatedDocumentNo,  // Updated document_no array
                                                document_name: updatedDocumentName,  // Updated document_name array
                                                document_pic: updatedDocumentPic,  // Updated document_pic array
                                              };
                                          
                                              // Update the lead document in the database
                                              const resp = await addcontact.findByIdAndUpdate(id, updatedFields, { new: true });
                                          
                                              // Return a success message
                                              res.status(200).send({ message: "Lead updated successfully" });
                                            } catch (error) {
                                              console.error(error);  // Log error for debugging
                                              res.status(500).send({ message: "An error occurred while updating the lead" });
                                            }
                                          };

                     const update_contactsingledocument = async (req, res) => {
                                                try {
                                                  const id = req.params._id; // Get lead ID from URL parameter
                                                  const { document_name, document_no } = req.body; // Get new values
                                              
                                              
                                                     // Find the lead document by ID
                                                  const user = await addcontact.findOne({ _id: id });
                                              
                                                  if (!user) {
                                                    return res.status(404).send({ message: "Lead not found" });
                                                  }
                                              
                                                  // Ensure document_name array exists
                                                  if (!user.document_name || !Array.isArray(user.document_name)) {
                                                    return res.status(400).send({ message: "No documents found in the lead" });
                                                  }
                                              
                                                  // Find index where document_name matches
                                                  const index = user.document_name.findIndex(name => name === document_name);
                                                  
                                                  if (index === -1) {
                                                    return res.status(404).send({ message: "Document name not found" });
                                                  }
                                              
                                                  // Handle file upload if a new document image is provided
                                                  let newDocumentPic = user.document_pic[index]; // Keep existing image if no new file
                                                  if (req.files && req.files.length > 0) {
                                                    const result = await cloudinary.uploader.upload(req.files[0].path);
                                                    newDocumentPic = result.secure_url; // Replace with new uploaded image
                                                  }
                                              
                                                  // Update only the specific index
                                                  user.document_no[index] = document_no;
                                                  user.document_pic[index] = newDocumentPic;
                                              
                                                  // Save the updated document
                                                  await user.save();
                                              
                                                  res.status(200).send({ message: "Contact document updated successfully" });
                                                } catch (error) {
                                                  console.error(error);
                                                  res.status(500).send({ message: "An error occurred while updating the lead" });
                                                }
                                              };
                  const delete_contactsingledocument = async (req, res) => {
                                                try {
                                                  const id = req.params._id; // Get lead ID from URL parameter
                                                  const { document_name } = req.body; // Get document_name to delete
                                      
                                              
                                                  // Find the lead document by ID
                                                  const user = await addcontact.findOne({ _id: id });
                                              
                                                  if (!user) {
                                                    return res.status(404).send({ message: "Lead not found" });
                                                  }
                                              
                                                  // Ensure document_name array exists
                                                  if (!user.document_name || !Array.isArray(user.document_name)) {
                                                    return res.status(400).send({ message: "No documents found in the lead" });
                                                  }
                                              
                                                  // Find index where document_name matches
                                                  const index = user.document_name.findIndex(name => name === document_name);
                                              
                                                  if (index === -1) {
                                                    return res.status(404).send({ message: "Document name not found" });
                                                  }
                                              
                                                  // Remove elements at found index
                                                  user.document_name.splice(index, 1);
                                                  user.document_no.splice(index, 1);
                                                  user.document_pic.splice(index, 1);
                                              
                                                  // Save the updated document
                                                  await user.save();
                                              
                                                  res.status(200).send({ message: "Document deleted successfully" });
                                                } catch (error) {
                                                  console.error(error);
                                                  res.status(500).send({ message: "An error occurred while deleting the document" });
                                                }
                                              };
                  
                                            //   const addbulkcontacts = async (req, res) => {
                                            //     try {
                                            //         const contacts = req.body
                                            
                                            //         if (!Array.isArray(contacts)) {
                                            //         return res.status(400).send({ message: 'Invalid data format. Expected an array of employees.' });
                                            //         }
                                            
                                            //          // Iterate over each employee and save to the database
                                            //          const savedcontacts = [];
                                            //         for (const contact of contacts) {
                                            //         const {  title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
                                            //             source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
                                            //             company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
                                            //             father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
                                            //             birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
                                            //             income, amount1, document_no, document_name,document_pic, relation, lastcommunication } = contact;
                                            
                                            //         const contact_data = new addcontact({ title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
                                            //             source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
                                            //             company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
                                            //             father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
                                            //             birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
                                            //             income, amount1, document_no, document_name,document_pic, relation, lastcommunication})
                                            
                                            //         const savedcontact = await contact_data.save();  // Save each employee
                                            //         savedcontacts.push(savedcontact);
                                            //         }
                                            
                                            //     res.status(200).send({ message: 'Contacts saved successfully', contacts: savedcontacts });
                                            
                                            //     } catch (error) {
                                            //         console.error('Error occurred during saving data:', error);
                                            //         res.status(500).send({ message: 'An error occurred while saving employee data', error });
                                            //     }
                                            // }

                                            const addbulkcontacts = async (req, res) => {
                                                try {
                                                    let contacts = req.body;
                                                    
                                                    // Ensure contacts is always an array
                                                    if (!Array.isArray(contacts)) {
                                                        contacts = Object.values(contacts); // Converts object with keys '0', '1', etc. into an array
                                                    }
                                                    
                                           
                                                 
                                       let savedContacts = [];
                                            let skippedContacts = [];
                                            let duplicateCount = 0;

                                            for (let contact of contacts) {
                                              const {
                                                title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
                                                source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
                                                company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
                                                father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
                                                birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
                                                income, amount1, document_no, document_name, relation, lastcommunication
                                              } = contact;

                                              let newDocumentPic = [];

                                              // Upload files if provided
                                              if (req.files && req.files.length > 0) {
                                                for (let file of req.files) {
                                                  const result = await cloudinary.uploader.upload(file.path);
                                                  newDocumentPic.push(result.secure_url);
                                                }
                                              }

                                              // Check for duplicate mobile number
                                              const validMobileNos = Array.isArray(mobile_no) ? mobile_no.filter(num => num && num.trim() !== "") : [];
                                              if (validMobileNos.length > 0) {
                                                const existingMobile = await addcontact.findOne({ mobile_no: { $in: validMobileNos } });
                                                if (existingMobile) {
                                                  duplicateCount++;
                                                  skippedContacts.push({ reason: "Duplicate mobile_no", contact });
                                                  continue;
                                                }
                                              }

                                              // Check for duplicate email
                                              const validEmails = Array.isArray(email) ? email.filter(e => e && e.trim() !== "") : [];
                                              if (validEmails.length > 0) {
                                                const existingEmail = await addcontact.findOne({ email: { $in: validEmails } });
                                                if (existingEmail) {
                                                  duplicateCount++;
                                                  skippedContacts.push({ reason: "Duplicate email", contact });
                                                  continue;
                                                }
                                              }

                                              // Save contact
                                              const newContact = new addcontact({
                                                title, first_name, last_name, country_code, mobile_no, mobile_type, email, email_type, tags, descriptions,
                                                source, team, owner, visible_to, profession_category, profession_subcategory, designation, company_name, country_code1,
                                                company_phone, company_email, area, location, city, pincode, state, country, industry, company_social_media, company_url,
                                                father_husband_name, h_no, area1, location1, city1, pincode1, state1, country1, gender, marital_status,
                                                birth_date, anniversary_date, education, degree, school_college, loan, bank, amount, social_media, url,
                                                income, amount1, document_no, document_name, document_pic: newDocumentPic, relation, lastcommunication
                                              });

                                              const resp = await newContact.save();
                                              savedContacts.push(resp);
                                            }

                                            // Final response
                                            res.status(200).send({
                                              message: "Bulk upload completed",
                                              totalReceived: contacts.length,
                                              savedCount: savedContacts.length,
                                              duplicateCount,
                                              savedContacts,
                                              skippedContacts,
                                            });

                                            
                                                } catch (error) {
                                                    console.log(error);
                                                    res.status(500).send({ message: "Error saving contacts", error });
                                                }
                                                
                                            };

                                            const update_contactforbulkupload = async (req, res) => {
                                                try {
                                                  const contacts = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's an array
                                              
                                                  if (contacts.length === 0) {
                                                    return res.status(400).json({ message: "No contacts provided!" });
                                                  }
                                              
                                                  let updatedContacts = [];
                                              
                                                  for (let contact of contacts) {
                                                    let { mobile_no } = contact;
                                              
                                                    if (!mobile_no) {
                                                      continue; // Skip if mobile_no is missing
                                                    }
                                              
                                                    // Ensure mobile_no is always treated as an array
                                                    const mobileNumbers = Array.isArray(mobile_no) ? mobile_no : [mobile_no];
                                              
                                                    // Find existing contact by mobile_no
                                                    let existingContact = await addcontact.findOne({
                                                      mobile_no: { $in: mobileNumbers },
                                                    });
                                              
                                                    if (!existingContact) {
                                                      continue; // Skip if no matching contact found
                                                    }
                                              
                                                    let updatedFields = {};
                                                    let editFields = []; // Store updated field names
                                                    let editValues = []; 
                                              
                                                    // Only update fields that are missing in the existing contact
                                                    for (let key in contact) {
                                                        if (
                                                          !existingContact[key] || // If the field is missing
                                                          existingContact[key] === "" || // If it's an empty string
                                                          (Array.isArray(existingContact[key]) && existingContact[key].length === 0) // If it's an empty array
                                                        ) {
                                                          updatedFields[key] = contact[key]; // Set the new value
                                                          editFields.push(key); 
                                                          editValues.push(contact[key]); // Track updated value
                                                        }
                                                      }
                                              
                                                    // Update contact in the database
                                                    const updatedContact = await addcontact.findOneAndUpdate(
                                                      { mobile_no: { $in: mobileNumbers } },
                                                      { $set: updatedFields },
                                                      { new: true }
                                                    );
                                              
                                                    updatedContacts.push(updatedContact);

                                                    await addactivity.create({
                                                        activity_name: "edit",
                                                        lead: `${existingContact.title || ""} ${existingContact.first_name || ""} ${existingContact.last_name || ""}`.trim(), 
                                                        edit_field: editFields.join(", "), // Convert updated fields to a string
                                                        edit_value: editValues.join(", "),
                                                        date: new Date(), // Log timestamp
                                                      });
                                                  }
                                              
                                                  res.status(200).json({
                                                    message: `${updatedContacts.length} contacts updated successfully!`,
                                                    updatedContacts,
                                                  });
                                              
                                                } catch (error) {
                                                  console.error("Error updating contacts:", error);
                                                  res.status(500).json({ message: "Internal Server Error" });
                                                }
                                              };
                                              
                                              
                                              
                

    module.exports={add_contact,view_contact,view_contact_Byid,remove_contact,update_contact,
                    view_contact_Byemail,view_contact_Bymobile,view_contact_Bytags,view_contact_Bycompany,
                view_contact_ByName,update_contactsingledocument,delete_contactsingledocument,add_contactdocument,addbulkcontacts,
            update_contactforbulkupload,searchcontact};