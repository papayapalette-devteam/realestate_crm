const leadinfo = require("../models/leadinfo.js");
const addactivity = require("../models/activity");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const lead_info = async (req, res) => {
  try {
    const {
      title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,owner,team,
      visible_to,campegin,source,sub_source,refrencer_no,channel_partner,intrested_project,requirment,property_type,purpose,nri,sub_type,
      unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,range,range_unit,city2,area2,
      block,pincode2,country2,state2,lattitude,longitude,country3,state3,city3,area_project,block3,specific_unit,specific_unitdetails,
      funding,timeline,facing,road,direction,unit_type2,transaction_type,furnishing,profession_category,profession_subcategory,
      designation,company_name,country_code1,company_phone,company_email,area,location,city,pincode,state,country,industry,company_social_media,
      company_url,father_husband_name,h_no,area1,location1,city1,pincode1,state1,country1,gender,maritial_status,birth_date,anniversary_date,
      education,degree,school_college,loan,bank,amount,social_media,url,income,amount1,document_no,document_name,document_pic,
      lastcommunication,matcheddeals,matchingdeal,score} = req.body;

         // Check if mobile_no exists (and is array with values)
          if (Array.isArray(mobile_no)) {
            const validMobileNos = mobile_no.filter(num => num && num.trim() !== "");
            
            if (validMobileNos.length > 0) {
              const existingMobile = await leadinfo.findOne({ mobile_no: { $in: validMobileNos } });
              if (existingMobile) {
                return res.status(400).send({ message: "Mobile number already exists..." });
              }
            }
          }

          if (Array.isArray(email)) {
          const validemails = email.filter(num => num && num.trim() !== "");
          
          if (validemails.length > 0) {
            const existingemail = await leadinfo.findOne({ email: { $in: validemails } });
            if (existingemail) {
              return res.status(400).send({ message: "Email id already exists..." });
            }
          }
        }

    const newDocumentPic = [];

    if (req.files) {
      // Upload files to Cloudinary and get the URLs
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        newDocumentPic.push(result.secure_url); // Store the URL of the uploaded image
        // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
        // fs.unlinkSync(file.path);
      }
    }

    const newleadinfo = new leadinfo({
      title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,owner,team,
      visible_to,campegin,source,sub_source,refrencer_no,channel_partner,intrested_project,requirment,property_type,purpose,nri,
      sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,range,range_unit,
      city2,area2,block,pincode2,country2,state2,lattitude,longitude,country3,state3,city3,area_project,block3,specific_unit,
      specific_unitdetails,funding,timeline,facing,road,direction,unit_type2,transaction_type,furnishing,profession_category,
      profession_subcategory,designation,company_name,country_code1,company_phone,company_email,area,location,city,pincode,state,
      country,industry,company_social_media,company_url,father_husband_name,h_no,area1,location1,city1,pincode1,state1,country1,gender,
      maritial_status,birth_date,anniversary_date,education,degree,school_college,loan,bank,amount,social_media,url,income,amount1,
      document_no,document_name,document_pic: newDocumentPic,lastcommunication,matcheddeals,matchingdeal,score});

    const resp = await newleadinfo.save();
    res.status(200).send({ message: "lead information saved", lead: resp });
  } catch (error) {
    console.log(error);
  }
};

const leadinfo_find = async (req, res) => {
  try {
     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

  // 🔹 Parse filters from query
    let activeFilters = [];
    if (req.query.activeFilters) {
      try {
        activeFilters = JSON.parse(req.query.activeFilters);
      } catch (err) {
        console.error("Invalid activeFilters JSON:", err);
      }
    }

    // 🔹 Build MongoDB match query
    let matchStage = {};

   if (activeFilters.length > 0) {
      activeFilters.forEach((filter) => {
        const field = filter.field;

        // ✅ Case 1: Checkbox filters
        if (Array.isArray(filter.checked) && filter.checked.length > 0) {
          const cleanValues = filter.checked.filter(
            (v) => v !== null && v !== undefined && v !== ""
          );

          if (cleanValues.length > 0) {
            if (filter.radio === "with") {
              matchStage[field] = { $in: cleanValues };
            } else if (filter.radio === "without") {
              matchStage[field] = { $nin: cleanValues };
            }
          }
        }

        // ✅ Case 2: Text input filters
        if (filter.input && filter.input.trim() !== "") {
          const regex = new RegExp(filter.input.trim(), "i");
          if (filter.radio === "with") {
            matchStage[field] = regex;
          } else if (filter.radio === "without") {
            matchStage[field] = { $not: regex };
          }
        }

        // ✅ Case 3: Date range filters
        if (
          filter.type === "date-range" &&
          filter.dateRange &&
          (filter.dateRange.from || filter.dateRange.to)
        ) {
          const fromDate = filter.dateRange.from
            ? new Date(filter.dateRange.from)
            : null;
          const toDate = filter.dateRange.to
            ? new Date(filter.dateRange.to)
            : null;

          // Ensure valid date range query
          if (fromDate && toDate) {
            matchStage[field] = {
              $gte: fromDate,
              $lte: new Date(toDate.setHours(23, 59, 59, 999)), // include full day
            };
          } else if (fromDate) {
            matchStage[field] = { $gte: fromDate };
          } else if (toDate) {
            matchStage[field] = {
              $lte: new Date(toDate.setHours(23, 59, 59, 999)),
            };
          }
        }
      });
    }


    
    // const allleads=await leadinfo.find()
    const leads = await leadinfo.find(matchStage)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate("matcheddeals")

     const total = await leadinfo.countDocuments(matchStage);

    // const resp = await leadinfo.find().populate("matcheddeals");
    // if (!resp) {
    //   return res.send("no lead infomartion available");
    // }
    res.status(200).send({
       message: "lead infomation:", 
      //  lead: allleads,
       total, 
       totalPages: Math.ceil(total / limit),
        pagelead:leads
      });
       
  } catch (error) {
    console.log(error);
  }
};

const searchlead=async (req, res) => {
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
    const leads = await leadinfo.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("matcheddeals")

    // Get total for filtered result
    const total = await leadinfo.countDocuments(filter);

    res.status(200).json({
      message: 'Contacts fetched successfully',
      lead: leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



const view_lead_Byleadtype = async (req, res) => {
  try {
    const lead = req.params.lead_type;
    const resp = await leadinfo.find({ lead_type: lead });
    if (!resp) {
      return res.send("lead info not available");
    }
    res
      .status(200)
      .send({ message: "lead found and here are lead details:", lead: resp });
  } catch (error) {
    console.log(error);
  }
};

const view_lead_Byid = async (req, res) => {
  try {
    const _id = req.params._id;
    const resp = await leadinfo.find({ _id: _id });
    if (!resp) {
      return res.send("lead info not available");
    }
    res
      .status(200)
      .send({ message: "lead found and here are lead details:", lead: resp });
  } catch (error) {
    console.log(error);
  }
};
const view_lead_Bycompany = async (req, res) => {
  try {
    const company_name = req.params.company_name;
    const resp = await leadinfo.find({ company_name: company_name });
    if (!resp) {
      return res.send("lead info not available");
    }

    res
      .status(200)
      .send({ message: "lead found and here are lead details:", lead: resp });
  } catch (error) {
    console.log(error);
  }
};
const view_lead_Bystage = async (req, res) => {
  try {
    const stage = req.params.stage;
    const resp = await leadinfo.find({ stage: stage });
    if (!resp) {
      return res.send("lead info not available");
    }

    res
      .status(200)
      .send({ message: "lead found and here are lead details:", lead: resp });
  } catch (error) {
    console.log(error);
  }
};
const view_lead_Byemail = async (req, res) => {
  try {
    const email = req.params.email;
    const resp = await leadinfo.find({ email: email });
    if (!resp) {
      return res.send("lead info not available");
    }

    res
      .status(200)
      .send({ message: "lead found and here are lead details:", lead: resp });
  } catch (error) {
    console.log(error);
  }
};
const view_lead_Bymobile = async (req, res) => {
  try {
    const mobile_no = req.params.mobile_no;
    const resp = await leadinfo.find({ mobile_no: mobile_no });
    if (!resp) {
      return res.send("lead info not available");
    }

    res
      .status(200)
      .send({ message: "lead found and here are lead details:", lead: resp });
  } catch (error) {
    console.log(error);
  }
};

const remove_lead = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await leadinfo.findOne({ _id: id });
    if (!user) {
      return res.send({ message: "lead not found" });
    }
    const resp = await leadinfo.deleteOne({ _id: id });
    res.status(200).send({ message: "lead deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
const update_lead = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await leadinfo.findOne({ _id: id });

    if (!user) {
      return res.send({ message: "Lead not found" });
    }

    const olddocuments = user.document_pic;
    // Create an object to hold fields to be updated
    let updatedFields = { ...req.body };

    // Only process files if they are provided
    if (req.files) {
      const newDocumentPic = [];
      // Upload files to Cloudinary and get the URLs
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        newDocumentPic.push(result.secure_url); // Store the URL of the uploaded image
      }

      // Only update the document_pic field if new images are uploaded
      if (newDocumentPic.length > 0) {
        updatedFields.document_pic = newDocumentPic; // Update document_pic with new images
      }
    }

    if (!req.files) {
      updatedFields.document_pic = olddocuments;
    }

    // Update the lead document with the new data
    const resp = await leadinfo.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).send({ message: "Lead updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

const update_leadstage = async (req, res) => {
  try {
    const id = req.params._id;
    console.log(req.body);

    const user = await leadinfo.findOne({ _id: id });
    if (!user) {
      return res.send({ message: "lead not found" });
    }

    const updatedFields = {
      stage: req.body.stage,
      owner: req.body.owner,
      descriptions: req.body.descriptions,
    };
    const resp = await leadinfo.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.status(200).send({ message: "stage update successfully" });
  } catch (error) {
    console.log(error);
  }
};

const update_leaddocument = async (req, res) => {
  try {
    const id = req.params._id; // Get lead ID from URL parameter
    const user = await leadinfo.findOne({ _id: id }); // Find the lead by ID

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
        newDocumentPic.push(result.secure_url); // Store the URL of the uploaded image
        // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
        // fs.unlinkSync(file.path);
      }
    }

    // Retrieve the current document fields (if any) from the user document
    const oldDocumentNo = user.document_no || [];
    const oldDocumentName = user.document_name || [];
    const oldDocumentPic = user.document_pic || [];

    // Combine old and new document fields
    const updatedDocumentNo = [...oldDocumentNo, ...newDocumentNo]; // Append new document numbers to the existing ones
    const updatedDocumentName = [...oldDocumentName, ...newDocumentName]; // Append new document names to the existing ones
    const updatedDocumentPic = [...oldDocumentPic, ...newDocumentPic]; // Append new document pictures to the existing ones

    // Prepare updated fields object
    const updatedFields = {
      ...req.body, // Keep other fields intact from the request body
      document_no: updatedDocumentNo, // Updated document_no array
      document_name: updatedDocumentName, // Updated document_name array
      document_pic: updatedDocumentPic, // Updated document_pic array
    };

    // Update the lead document in the database
    const resp = await leadinfo.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    // Return a success message
    res.status(200).send({ message: "Lead updated successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res
      .status(500)
      .send({ message: "An error occurred while updating the lead" });
  }
};

const update_leadstagebyemail = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await leadinfo.findOne({ email: email });
    if (!user) {
      return res.send({ message: "lead not found" });
    }

    const resp = await leadinfo.findOneAndUpdate({ email }, req.body);
    res.status(200).send({ message: "stage update successfully" });
  } catch (error) {
    console.log(error);
  }
};

const update_leadsingledocument = async (req, res) => {
  try {
    const id = req.params._id; // Get lead ID from URL parameter
    const { document_name, document_no } = req.body; // Get new values

    // Find the lead document by ID
    const user = await leadinfo.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({ message: "Lead not found" });
    }

    // Ensure document_name array exists
    if (!user.document_name || !Array.isArray(user.document_name)) {
      return res
        .status(400)
        .send({ message: "No documents found in the lead" });
    }

    // Find index where document_name matches
    const index = user.document_name.findIndex(
      (name) => name === document_name
    );

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

    res.status(200).send({ message: "Lead document updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while updating the lead" });
  }
};

const delete_leadsingledocument = async (req, res) => {
  try {
    const id = req.params._id; // Get lead ID from URL parameter
    const { document_name } = req.body; // Get document_name to delete

    // Find the lead document by ID
    const user = await leadinfo.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({ message: "Lead not found" });
    }

    // Ensure document_name array exists
    if (!user.document_name || !Array.isArray(user.document_name)) {
      return res
        .status(400)
        .send({ message: "No documents found in the lead" });
    }

    // Find index where document_name matches
    const index = user.document_name.findIndex(
      (name) => name === document_name
    );

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
    res
      .status(500)
      .send({ message: "An error occurred while deleting the document" });
  }
};

const updatemany = async (req, res) => {
  const { leads } = req.body;

  if (!Array.isArray(leads)) {
    return res.status(400).json({ message: "Invalid leads data" });
  }

  const bulkOps = leads.map((lead) => ({
    updateOne: {
      filter: { _id: lead._id },
      update: { $set: lead },
    },
  }));

  try {
    await leadinfo.bulkWrite(bulkOps);
    res.status(200).json({ message: "All leads updated successfully" });
  } catch (error) {
    console.error("Bulk update error:", error);
    res.status(500).json({ message: "Bulk update failed", error });
  }
};

const addbulkleads = async (req, res) => {
  try {
    let contacts = req.body;

    // Ensure contacts is always an array
    if (!Array.isArray(contacts)) {
      contacts = Object.values(contacts); // Converts object with keys '0', '1', etc. into an array
    }

    let savedContacts = [];

    for (let contact of contacts) {
      const {
        title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,owner,team,
        visible_to,campegin,source,sub_source,refrencer_no,channel_partner,intrested_project,requirment,property_type,purpose,nri,
        sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,range,range_unit,
        city2,area2,block,pincode2,country2,state2,lattitude,longitude,country3,state3,city3,area_project,block3,specific_unit,
        specific_unitdetails,funding,timeline,facing,road,direction,unit_type2,transaction_type,furnishing,profession_category,
        profession_subcategory,designation,company_name,country_code1,company_phone,company_email,area,location,city,pincode,state,
        country,industry,company_social_media,company_url,father_husband_name,h_no,area1,location1,city1,pincode1,state1,country1,
        gender,maritial_status,birth_date,anniversary_date,education,degree,school_college,loan,bank,amount,social_media,url,income,
        amount1,document_no,document_name,document_pic,lastcommunication,matcheddeals,matchingdeal,score} = contact;

      let newDocumentPic = [];

      // Check if there are files to upload
      if (req.files && req.files.length > 0) {
        for (let file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
          newDocumentPic.push(result.secure_url);
        }
      }

      // Create a new contact object
      const newContact = new leadinfo({
        title,first_name,last_name,country_code,mobile_no,mobile_type,email,email_type,tags,descriptions,stage,lead_type,owner,
        team,visible_to,campegin,source,sub_source,refrencer_no,channel_partner,intrested_project,requirment,property_type,purpose,
        nri,sub_type,unit_type,budget_min,budget_max,minimum_area,maximum_area,area_metric,search_location,street_address,range,
        range_unit,city2,area2,block,pincode2,country2,state2,lattitude,longitude,country3,state3,city3,area_project,block3,
        specific_unit,specific_unitdetails,funding,timeline,facing,road,direction,unit_type2,transaction_type,furnishing,
        profession_category,profession_subcategory,designation,company_name,country_code1,company_phone,company_email,area,location,
        city,pincode,state,country,industry,company_social_media,company_url,father_husband_name,h_no,area1,location1,city1,pincode1,
        state1,country1,gender,maritial_status,birth_date,anniversary_date,education,degree,school_college,loan,bank,amount,social_media,
        url,income,amount1,document_no,document_name,document_pic,lastcommunication,matcheddeals,matchingdeal,score,
      });

      // Save each contact
      const resp = await newContact.save();
      savedContacts.push(resp);
    }

    res.status(200).send({ message: "Lead saved", contacts: savedContacts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error saving leads", error });
  }
};

const update_leadforbulkupload = async (req, res) => {
  try {
    const contacts = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's an array

    if (contacts.length === 0) {
      return res.status(400).json({ message: "No leads provided!" });
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
      let existingContact = await leadinfo.findOne({
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
          (Array.isArray(existingContact[key]) &&
            existingContact[key].length === 0) // If it's an empty array
        ) {
          updatedFields[key] = contact[key]; // Set the new value
          editFields.push(key);
          editValues.push(contact[key]); // Track updated value
        }
      }

      // Update contact in the database
      const updatedContact = await leadinfo.findOneAndUpdate(
        { mobile_no: { $in: mobileNumbers } },
        { $set: updatedFields },
        { new: true }
      );

      updatedContacts.push(updatedContact);

      await addactivity.create({
        activity_name: "edit",
        lead: `${existingContact.title || ""} ${
          existingContact.first_name || ""
        } ${existingContact.last_name || ""}`.trim(),
        edit_field: editFields.join(", "), // Convert updated fields to a string
        edit_value: editValues.join(", "),
        date: new Date(), // Log timestamp
      });
    }

    res.status(200).json({
      message: `${updatedContacts.length} leads updated successfully!`,
      updatedContacts,
    });
  } catch (error) {
    console.error("Error updating leads:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





const getGroupedDataLead = async (req, res) => {
  try {
    const groupedData = await leadinfo.aggregate([
      { $unwind: { path: "$owner", preserveNullAndEmptyArrays: true } },

      {
        $group: {
          _id: null,

          // Professional Info
          profession_categories: { $addToSet: "$profession_category" },
          profession_subcategories: { $addToSet: "$profession_subcategory" },
          industries: { $addToSet: "$industry" },
          designations: { $addToSet: "$designation" },
          company_names: { $addToSet: "$company_name" },

          // Lead Classification
          lead_stages: { $addToSet: "$stage" },
          lead_types: { $addToSet: "$lead_type" },
          requirements: { $addToSet: "$requirment" },
          property_types: { $addToSet: "$property_type" },
          sub_types: { $addToSet: "$sub_type" },
          purposes: { $addToSet: "$purpose" },
          campaigns: { $addToSet: "$campaign" },
          sources: { $addToSet: "$source" },
          sub_sources: { $addToSet: "$sub_source" },
          channel_partners: { $addToSet: "$channel_partner" },

          // Ownership & Team
          owners: { $addToSet: "$owner" },
          teams: { $addToSet: "$team" },
          visible_to: { $addToSet: "$visible_to" },

          // Location Info
          cities: { $addToSet: "$city1" },
          states: { $addToSet: "$state1" },
          countries: { $addToSet: "$country1" },
          locations: { $addToSet: "$location1" },

          // Safe numeric range aggregation
          min_budget: {
            $min: {
              $cond: [
                {
                  $regexMatch: {
                    input: "$budget_min",
                    regex: /^[0-9.]+$/
                  }
                },
                { $toDouble: "$budget_min" },
                null
              ]
            }
          },
          max_budget: {
            $max: {
              $cond: [
                {
                  $regexMatch: {
                    input: "$budget_max",
                    regex: /^[0-9.]+$/
                  }
                },
                { $toDouble: "$budget_max" },
                null
              ]
            }
          },
          min_size: {
            $min: {
              $cond: [
                {
                  $regexMatch: {
                    input: "$minimum_area",
                    regex: /^[0-9.]+$/
                  }
                },
                { $toDouble: "$minimum_area" },
                null
              ]
            }
          },
          max_size: {
            $max: {
              $cond: [
                {
                  $regexMatch: {
                    input: "$maximum_area",
                    regex: /^[0-9.]+$/
                  }
                },
                { $toDouble: "$maximum_area" },
                null
              ]
            }
          },
          area_metrics: { $addToSet: "$area_metric" },
        },
      },

      // Create human-readable "range" strings
      {
        $addFields: {
          budget_range: {
            $cond: [
              { $and: [{ $ne: ["$min_budget", null] }, { $ne: ["$max_budget", null] }] },
              {
                $concat: [
                  { $toString: { $round: ["$min_budget", 0] } },
                  " - ",
                  { $toString: { $round: ["$max_budget", 0] } }
                ]
              },
              null
            ]
          },
          size_range: {
            $cond: [
              { $and: [{ $ne: ["$min_size", null] }, { $ne: ["$max_size", null] }] },
              {
                $concat: [
                  { $toString: { $round: ["$min_size", 0] } },
                  " - ",
                  { $toString: { $round: ["$max_size", 0] } }
                ]
              },
              null
            ]
          }
        }
      },

      {
        $project: {
          _id: 0,
          profession_categories: 1,
          profession_subcategories: 1,
          industries: 1,
          designations: 1,
          company_names: 1,
          lead_stages: 1,
          lead_types: 1,
          requirements: 1,
          property_types: 1,
          sub_types: 1,
          purposes: 1,
          campaigns: 1,
          sources: 1,
          sub_sources: 1,
          channel_partners: 1,
          owners: 1,
          teams: 1,
          visible_to: 1,
          cities: 1,
          states: 1,
          countries: 1,
          locations: 1,
          area_metrics: 1,
          budget_range: 1,
          size_range: 1,
        },
      },
    ]);

    res.status(200).json(groupedData[0] || {});
  } catch (err) {
    console.error("Error in getGroupedData:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};







module.exports = {
  lead_info,
  leadinfo_find,
  view_lead_Byleadtype,
  remove_lead,
  update_lead,
  view_lead_Byid,
  view_lead_Bycompany,
  view_lead_Byemail,
  view_lead_Bymobile,
  view_lead_Bystage,
  update_leadstage,
  update_leaddocument,
  update_leadstagebyemail,
  update_leadsingledocument,
  delete_leadsingledocument,
  updatemany,
  addbulkleads,
  update_leadforbulkupload,
  searchlead,
  getGroupedDataLead
};
