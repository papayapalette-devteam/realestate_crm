const addproject = require("../models/project");
const adddeal = require('../models/deal.js');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 
const mongoose=require('mongoose')


require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})



const createProject = async (req, res) => {
    try {

      const {
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date,owner, team, visible_to, location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block,add_size,add_unit,basic_aminities,
        features_aminities,nearby_aminities,price_list,Payment_plan} = req.body;

        if(!developer_name)
        {
          res.status(400).send({message:"Developer name is required"})
          return
        }
         const imagefiles = [];
    
                if (req.files) {
        
               
                  const imagefield = req.files.filter(file => file.fieldname.includes('pic'));
                  
                  if (imagefield.length > 0) {
                    for (let file of imagefield) {
                      const result = await cloudinary.uploader.upload(file.path);
                      imagefiles.push(result.secure_url);  
                      fs.unlink(file.path, (err) => {
                        if (err) {
                          console.error(`Failed to delete file: ${file.path}`, err);
                        } else {
                          console.log(`Successfully deleted file: ${file.path}`);
                        }
                      });
                    }
                  }
                }


      const addunit_details = [];
      let u = 0;
while (u < req.body.add_unit?.length) {
  const unit = req.body.add_unit[u];
 
unitDetails={

  project_name: unit.project_name,
  unit_no: unit.unit_no,
  owner_details: unit.owner_details,
  associated_contact: unit.associated_contact,
  unit_type: unit.unit_type,
  category: unit.category,
  sub_category:unit.sub_category,
  block: unit.block,
  size: unit.size,
  direction: unit.direction,
  facing: unit.facing,
  road:unit.road ,
  ownership:unit.ownership,
  stage: unit.stage,
  builtup_type:unit.builtup_type,
  floor: unit.floor,
  cluter_details:unit.cluter_details ,
  length: unit.length,
  bredth: unit.bredth,
  total_area: unit.total_area,
  measurment2: unit.measurment2,
  ocupation_date: unit.ocupation_date,
  age_of_construction: unit.age_of_construction,
  furnishing_details: unit.furnishing_details,
  furnished_item: unit.furnished_item,
  remarks:unit.remarks,
  location: unit.location,
  lattitude: unit.lattitude,
  langitude: unit.langitude,
  uaddress: unit.uaddress,
  ustreet: unit.ustreet,
  ulocality: unit.ulocality,
  ucity: unit.ucity,
  uzip: unit.uzip,
  ustate: unit.ustate,
  ucountry: unit.ucountry,
  relation: unit.relation,
  s_no: unit.s_no,
  descriptions: unit.descriptions,
  category: unit.category,
  s_no1: unit.s_no1,
  url: unit.url,
  document_name: unit.document_name,
  document_no: unit.document_no,
  document_Date: unit.document_Date,
  linkded_contact: unit.linkded_contact
}


  // Prepare for file upload
  const imagefiles = [];
  const imagefiles1 = [];
  
  
  if (req.files) {
    const imagefield = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][preview]`));
    const imagefield1 = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][image]`));
   
    
    for (let file of imagefield) {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        imagefiles.push(result.secure_url);  

        // Delete file after upload
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`Failed to delete file: ${file.path}`, err);
          } else {
            console.log(`Successfully deleted file: ${file.path}`);
          }
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }


    for (let file of imagefield1) {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        imagefiles1.push(result.secure_url);  

        // Delete file after upload
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`Failed to delete file: ${file.path}`, err);
          } else {
            console.log(`Successfully deleted file: ${file.path}`);
          }
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

  }
  if (imagefiles.length > 0) {
    unitDetails.preview = imagefiles;  // Attach preview images
  }
  if (imagefiles1.length > 0) {
    unitDetails.image = imagefiles1;  // Attach main images
  }

  addunit_details.push(unitDetails);
  u++;
}



      // Simply pass the add_block as it is if no further modification is needed
      const newProject = new addproject({
        name, developer_name, joint_venture, secondary_developer, rera_number, descriptions,
        category, sub_category, land_area, measurment1, total_block, total_floor, total_units,
        status, launched_on, expected_competion, possession, parking_type, approved_bank,
        approvals, registration_no, date, pic:imagefiles, owner, team, visible_to,location,lattitude,langitude,address,
        street,locality,city,zip,state,country, add_block,add_size,add_unit:addunit_details,basic_aminities,
        features_aminities,nearby_aminities,price_list,Payment_plan
      });
  
      const savedProject = await newProject.save(); // Save the project
      res.status(200).json(savedProject); // Return the saved project
    } catch (error) {
      res.status(500).json({ error: 'Error creating project', message: error.message });
    }
  };

  const view_project=async(req,res)=>
    {
        try {
          const resp = await addproject.find().select( "-add_unit")
          //  const resp = await addproject.find()
          .populate({
              path: 'add_unit.owner_details', // Populate the 'owner_details' field inside 'add_unit'
              model: 'add_contact' // Specify the model to populate
          })
          .populate({
              path: 'add_unit.associated_contact', // Populate the 'associated_contact' field inside 'add_unit'
              model: 'add_contact' // Specify the model to populate
          })
           .populate({
            path: 'add_unit.previousowner_details', // Populate 'owner_details' inside 'add_unit'
            model: 'add_contact' // Specify the model for population
          })
          .populate({
            path: 'developer_name', 
            model: 'add_developer' // Specify the model to populate
        })

          const allprojectwithoutunitdetails = await addproject.find()
            .select("-add_unit")
            .populate({
              path: 'developer_name',
              model: 'add_developer'
            });

            res.status(200).send({message:"project details fetch successfully",project:resp,allprojectwithoutunitdetails})
        } catch (error) {
            console.log(error)
        }
    }


      const view_projectforadddeal=async(req,res)=>
    {
        try {
          

          const allprojectwithoutunitdetails = await addproject.find()
            .select("-add_unit")
          

            res.status(200).send({message:"project details fetch successfully",allprojectwithoutunitdetails})
        } catch (error) {
            console.log(error)
        }
    }





const view_units = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search ? req.query.search.trim() : "";

 
    
    // Parse active filters from query (array of objects)
    let activeFilters = [];
    if (req.query.activeFilters) {
      try {
        activeFilters = JSON.parse(req.query.activeFilters);
      } catch (e) {
        console.error("Invalid activeFilters JSON:", e);
      }
    }

    
    let matchStage = {};

    // 🔹 If search text exists
    if (search) {
      matchStage.$or = [
        { "add_unit.unit_no": { $regex: search, $options: "i" } },
        { "add_unit.block": { $regex: search, $options: "i" } },
        { "add_unit.project_name": { $regex: search, $options: "i" } }
      ];
    }

    // 🔹 Apply active filters
    // 🔹 Apply active filters
if (activeFilters.length > 0) {
  activeFilters.forEach((filter) => {
    const fieldPath = `add_unit.${filter.field}`;

    // 🔹 Case 1: Checked values
    if (filter.field && Array.isArray(filter.checked) && filter.checked.length > 0) {
      const cleanValues = filter.checked.filter(
        (v) => v !== null && v !== undefined && v !== ""
      );

      if (cleanValues.length > 0) {
        if (filter.radio === "with") {
          matchStage[fieldPath] = { $in: cleanValues };
        } else if (filter.radio === "without") {
          matchStage[fieldPath] = { $nin: cleanValues };
        }
      }
    }

    // 🔹 Case 2: Text input
    if (filter.field && filter.input && filter.input.trim() !== "") {
      if (filter.radio === "with") {
        matchStage[fieldPath] = {
          $regex: filter.input.trim(),
          $options: "i",
        };
      } else if (filter.radio === "without") {
        matchStage[fieldPath] = {
          $not: new RegExp(filter.input.trim(), "i"),
        };
      }
    }
  });
}



    const units = await addproject.aggregate([
      { $unwind: "$add_unit" },
      Object.keys(matchStage).length > 0 ? { $match: matchStage } : null,
      { $skip: skip },
      { $limit: limit },

      // lookups...
      {
        $lookup: {
          from: "add_contacts",
          localField: "add_unit.owner_details",
          foreignField: "_id",
          as: "add_unit.owner_details"
        }
      },
      { $unwind: { path: "$add_unit.owner_details", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "add_contacts",
          localField: "add_unit.associated_contact",
          foreignField: "_id",
          as: "add_unit.associated_contact"
        }
      },
      { $unwind: { path: "$add_unit.associated_contact", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "add_contacts",
          localField: "add_unit.previousowner_details",
          foreignField: "_id",
          as: "add_unit.previousowner_details"
        }
      },
      { $unwind: { path: "$add_unit.previousowner_details", preserveNullAndEmptyArrays: true } },
    ].filter(Boolean)); // remove null stages

    // count query with same matchStage
    const totalCount = await addproject.aggregate([
      { $unwind: "$add_unit" },
      Object.keys(matchStage).length > 0 ? { $match: matchStage } : null,
      { $count: "count" }
    ].filter(Boolean));

    const total = totalCount[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

   
    
    res.status(200).json({
      message: "Units fetched successfully",
      units: units.map(u => u.add_unit),
      total,
      page,
      totalPages
    });
  } catch (error) {
    console.error("view_units error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





    const view_project_Byid=async(req,res)=>
      {
          try {
              const _id=req.params._id;
              const resp= await addproject.findOne({_id:_id}).populate({
                path: 'add_unit.owner_details', // Populate the 'owner_details' field inside 'add_unit'
                model: 'add_contact' // Specify the model to populate
            })
            .populate({
                path: 'add_unit.associated_contact', // Populate the 'associated_contact' field inside 'add_unit'
                model: 'add_contact' // Specify the model to populate
            })
             .populate({
              path: 'add_unit.previousowner_details', // Populate 'owner_details' inside 'add_unit'
              model: 'add_contact' // Specify the model for population
            })
            .populate({
              path: 'developer_name', 
              model: 'add_developer' // Specify the model to populate
          })
              if(!resp)
                  {
                     return res.send("project details not available")
                  }
              res.status(200).send({message:"project found and here are contact details:",project:resp})
          } catch (error) {
              console.log(error)
          }
      }
    const view_projectbyname=async(req,res)=>
      {
          try {
            const name=req.params.name
              const resp=await addproject.find({name:name})
              
              
              res.status(200).send({message:"project details fetch successfully",project:resp})
          } catch (error) {
              console.log(error)
          }
      }

      const view_projectbycityname=async(req,res)=>
        {
            try {
              const cityname=req.params.city
                const resp=await addproject.find({city:cityname})
                res.status(200).send({message:"project details fetch successfully",project:resp})
            } catch (error) {
                console.log(error)
            }
        }

        const remove_project=async(req,res)=>
          {
              try {
                  const _id=req.params._id;
                  const user=await addproject.find({_id:_id})
                  if(!user)
                      {
                          return res.send({message:"contact not found"})
                      }
                  const resp=await addproject.deleteOne({_id:_id})
                  res.status(200).send({message:"contact deleted successfully"})
              } catch (error) {
                  console.log(error)
              }
          }

          const update_project=async(req,res)=>
            {
                try {
                    const id=req.params._id;
                    const user=await addproject.findOne({_id:id})
                    if(!user)
                        {
                            return res.send({message:"deal not found"})
                        }

                        let existingUnits = user.add_unit || [];
                       
                        const imagefiles = [];
    
                        if (req.files) {
                
                       
                          const imagefield = req.files.filter(file => file.fieldname.includes('pic'));
                          
                          if (imagefield.length > 0) {
                            for (let file of imagefield) {
                              const result = await cloudinary.uploader.upload(file.path);
                              imagefiles.push(result.secure_url);  
                              fs.unlink(file.path, (err) => {
                                if (err) {
                                  console.error(`Failed to delete file: ${file.path}`, err);
                                } else {
                                  console.log(`Successfully deleted file: ${file.path}`);
                                }
                              });
                            }
                          }
                        }

                        
                        const addunit_details = [];
                        let u = 0;
                  
                  
                  while (u < req.body.add_unit?.length) {
                    const unit = req.body.add_unit[u];
              
                  unitDetails={
                  
                    project_name: unit.project_name,
                    unit_no: unit.unit_no,
                    owner_details: unit.owner_details,
                    associated_contact: unit.associated_contact,
                    unit_type: unit.unit_type,
                    category: unit.category,
                    sub_category:unit.sub_category,
                    block: unit.block,
                    size: unit.size,
                    direction: unit.direction,
                    facing: unit.facing,
                    road:unit.road ,
                    ownership:unit.ownership,
                    stage: unit.stage,
                    builtup_type:unit.builtup_type,
                    floor: unit.floor,
                    cluter_details:unit.cluter_details ,
                    length: unit.length,
                    bredth: unit.bredth,
                    total_area: unit.total_area,
                    measurment2: unit.measurment2,
                    ocupation_date: unit.ocupation_date,
                    age_of_construction: unit.age_of_construction,
                    furnishing_details: unit.furnishing_details,
                    furnished_item: unit.furnished_item,
                    remarks:unit.remarks,
                    location: unit.location,
                    lattitude: unit.lattitude,
                    langitude: unit.langitude,
                    uaddress: unit.uaddress,
                    ustreet: unit.ustreet,
                    ulocality: unit.ulocality,
                    ucity: unit.ucity,
                    uzip: unit.uzip,
                    ustate: unit.ustate,
                    ucountry: unit.ucountry,
                    relation: unit.relation,
                    s_no: unit.s_no,
                    descriptions: unit.descriptions,
                    category: unit.category,
                    s_no1: unit.s_no1,
                    url: unit.url,
                    document_name: unit.document_name,
                    document_no: unit.document_no,
                    document_Date: unit.document_Date,
                    linkded_contact: unit.linkded_contact
                  }
                  
                  
                    // Prepare for file upload
                    const imagefiles = [];
                    const imagefiles1 = [];
                    
                    
                    if (req.files) {
                    
                      
                      const imagefield = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][preview]`));
                      const imagefield1 = req.files.filter(file => file.fieldname.includes(`add_unit[${u}][image]`));
                     
                 
                      
                      for (let file of imagefield) {
                        try {
                          const result = await cloudinary.uploader.upload(file.path);
                          imagefiles.push(result.secure_url);  
                  
                          // Delete file after upload
                          fs.unlink(file.path, (err) => {
                            if (err) {
                              console.error(`Failed to delete file: ${file.path}`, err);
                            } else {
                              console.log(`Successfully deleted file: ${file.path}`);
                            }
                          });
                        } catch (error) {
                          console.error('Error uploading file:', error);
                        }
                      }
                  
                  
                      for (let file of imagefield1) {
                        try {
                          const result = await cloudinary.uploader.upload(file.path);
                          imagefiles1.push(result.secure_url);  
                  
                          // Delete file after upload
                          fs.unlink(file.path, (err) => {
                            if (err) {
                              console.error(`Failed to delete file: ${file.path}`, err);
                            } else {
                              console.log(`Successfully deleted file: ${file.path}`);
                            }
                          });
                        } catch (error) {
                          console.error('Error uploading file:', error);
                        }
                      }
                  
                    }
                    if (imagefiles.length > 0) {
                      unitDetails.preview = imagefiles;  // Attach preview images
                    }
                    if (imagefiles1.length > 0) {
                      unitDetails.image = imagefiles1;  // Attach main images
                    }

                     // Find if the unit_no already exists in the existing units
      const existingUnitIndex = existingUnits.findIndex(existingUnit => existingUnit.unit_no === unit.unit_no);

      // If the unit already exists, keep the existing data
      if (existingUnitIndex !== -1) {
        addunit_details.push(existingUnits[existingUnitIndex]);  // Push the existing unit data
      } else {
        // If unit doesn't exist, add the new unit
        addunit_details.push(unitDetails);
      }
                  
                    
                    u++;
                  }
                    
                     const updatedFields = {
                        ...req.body,
                        pic:imagefiles,
                        add_unit:addunit_details
                    };
                    const resp=await addproject.findByIdAndUpdate(id,updatedFields,{ new: true })
                    res.status(200).send({message:"lead update successfully"})
                } catch (error) {
                    console.log(error)
                }
            }

            const view_projectforinventories = async (req, res) => {
                try {
                  // Retrieve project_name, block, and unit_no from request params or body
                  const { project_name, block, unit_no } = req.params; // Assuming you are sending these in the request body
             
                  
                  
                  // Perform the query on the project model and filter the add_unit array using $elemMatch
                  // const project = await addproject.findOne(
                  //   {
                  //     'add_unit': {
                  //       $elemMatch: {
                  //         project_name: project_name,
                  //         block: block,
                  //         unit_no: unit_no
                  //       }
                  //     }
                  //   },
                  //   {
                  //     'add_unit.$': 1 // This will return only the matching `add_unit` element
                  //   }
                  // )

                  
                  const project = await addproject.findOne(
                    {
                      'add_unit': {
                        $elemMatch: {
                          project_name: project_name,
                          block: block,
                          unit_no: unit_no
                        }
                      }
                    },
                    {
                      'add_unit.$': 1 // This ensures only the matching `add_unit` element is returned
                    }
                  )
                  .populate({
                    path: 'add_unit.owner_details', // Populate 'owner_details' inside 'add_unit'
                    model: 'add_contact' // Specify the model for population
                  })
                  .populate({
                    path: 'add_unit.associated_contact', // Populate 'associated_contact' inside 'add_unit'
                    model: 'add_contact' // Specify the model for population
                  })
                   .populate({
                    path: 'add_unit.previousowner_details', // Populate 'owner_details' inside 'add_unit'
                    model: 'add_contact' // Specify the model for population
                  })
                  
              
                  if (!project) {
                    return res.status(404).send({ message: "No project found matching the criteria" });
                  }
              
                  // Send the response with the project details
                  res.status(200).send({ message: "Project details fetched successfully", project: project });
                } catch (error) {
                  console.log(error);
                  res.status(500).send({ message: "An error occurred while fetching project details", error: error.message });
                }
              };



              const update_projectforinventories = async (req, res) => {
                try {
                  // Retrieve project_name, block, and unit_no from the URL parameters (params)
                  const { project_name, block, unit_no } = req.params;
                    
                  let dealproject=req.params.project_name
                     let dealblock=req.params.block
                        let dealunit=req.params.unit_no


                  const exitproject=await addproject.findOne({name:project_name})
                  if(!exitproject)
                  {
                    res.status(404).send('project not found')
                    return
                  }

                  const project = await addproject.findOne({
                    'add_unit': { $elemMatch: { project_name, block, unit_no } }
                });

                if (!project) {
                  return res.status(404).send({ message: "No project found matching the criteria" });
              }
    
      
              // Step 2: Find the index of the unit to update
              const unitIndex = project.add_unit.findIndex(unit => unit.unit_no === unit_no);
              if (unitIndex === -1) {
                  return res.status(404).send({ message: "Unit not found" });
              }

              const existingUnit = project.add_unit[unitIndex];
              const unit = req.body
          
  // ============================this is for deal owner update start============================================
              const result = await adddeal.updateMany(
                { project: dealproject, block: dealblock, unit_number: dealunit },
                {
                  $set: {
                    owner_details: unit.owner_details !== undefined ? unit.owner_details : [],
                    associated_contact: unit.associated_contact !== undefined ? unit.associated_contact : []
                  }
                }
              );
  //====================================== deal owner update end=================================================

              let previousOwnerDetails = existingUnit.owner_details || [];
         
            unitDetails={
            
              project_name: unit.project_name,
              unit_no: unit.unit_no,
              previousowner_details: previousOwnerDetails, 
              owner_details: unit.owner_details,
              associated_contact:unit.associated_contact,
              unit_type: unit.unit_type,
              category: unit.category,
              sub_category:unit.sub_category,
              block: unit.block,
              size: unit.size,
              direction: unit.direction,
              facing: unit.facing,
              road:unit.road ,
              ownership:unit.ownership,
              stage: unit.stage,
              builtup_type:unit.builtup_type,
              floor: unit.floor,
              cluter_details:unit.cluter_details ,
              length: unit.length,
              bredth: unit.bredth,
              total_area: unit.total_area,
              measurment2: unit.measurment2,
              ocupation_date: unit.ocupation_date,
              age_of_construction: unit.age_of_construction,
              furnishing_details: unit.furnishing_details,
              furnished_item: unit.furnished_item,
              remarks:unit.remarks,
              location: unit.location,
              lattitude: unit.lattitude,
              langitude: unit.langitude,
              uaddress: unit.uaddress,
              ustreet: unit.ustreet,
              ulocality: unit.ulocality,
              ucity: unit.ucity,
              uzip: unit.uzip,
              ustate: unit.ustate,
              ucountry: unit.ucountry,
              relation: unit.relation,
              s_no: unit.s_no,
              descriptions: unit.descriptions,
              category: unit.category,
              s_no1: unit.s_no1,
              url: unit.url,
              document_name: unit.document_name,
              document_no: unit.document_no,
              document_Date: unit.document_Date,
              linkded_contact: unit.linkded_contact,
              preview: existingUnit.preview,
              image:existingUnit.image

            }
          
            
            
              // Prepare for file upload
              const imagefiles = [];
              const imagefiles1 = [];
              
              
              if (req.files) {
            
                const imagefield = req.files.filter(file => file.fieldname.includes(`preview`));
                const imagefield1 = req.files.filter(file => file.fieldname.includes(`image`));
               
            
                
                for (let file of imagefield) {
                  try {
                    const result = await cloudinary.uploader.upload(file.path);
                    imagefiles.push(result.secure_url);  
            
                    // Delete file after upload
                    fs.unlink(file.path, (err) => {
                      if (err) {
                        console.error(`Failed to delete file: ${file.path}`, err);
                      } else {
                        console.log(`Successfully deleted file: ${file.path}`);
                      }
                    });
                  } catch (error) {
                    console.error('Error uploading file:', error);
                  }
                }
            
            
                for (let file of imagefield1) {
                  try {
                    const result = await cloudinary.uploader.upload(file.path);
                    imagefiles1.push(result.secure_url);  
            
                    // Delete file after upload
                    fs.unlink(file.path, (err) => {
                      if (err) {
                        console.error(`Failed to delete file: ${file.path}`, err);
                      } else {
                        console.log(`Successfully deleted file: ${file.path}`);
                      }
                    });
                  } catch (error) {
                    console.error('Error uploading file:', error);
                  }
                }
            
              }
              if (imagefiles.length > 0) {
                unitDetails.preview = imagefiles;  // Attach preview images
              }
              if (imagefiles1.length > 0) {
                unitDetails.image = imagefiles1;  // Attach main images
              }

            
              


                  project.add_unit[unitIndex] = unitDetails;


                  await project.save();
                                
             
            

                 
                  res.status(200).send({
                    message: "add_unit updated successfully",
                    project: project
                  });
                } catch (error) {
                  console.log(error);
                  res.status(500).send({ message: "An error occurred while updating the project details", error: error.message });
                }
              };

                const update_projectforinventoriesbulk = async (req, res) => {
                try {
                  // Retrieve project_name, block, and unit_no from the URL parameters (params)
                  const unitsdata = Array.isArray(req.body) ? req.body : Object.values(req.body);
                  // console.log(unitsdata);
                  
                 for(let unit of unitsdata)
                 {
                  let projectname=unit.project_name
                  let block=unit.block
                  let unitno=unit.unit_no

                  const exitproject=await addproject.findOne({name:projectname})
                  if(!exitproject)
                  {
                    res.status(404).send('project not found')
                    return
                  }

                   const project = await addproject.findOne({
                    'add_unit': { $elemMatch: { project_name:projectname, block:block, unit_no:unitno} }
                    });

                       if (!project) {
                                      return res.status(404).send({ message: "No project found matching the criteria" });
                                      }

                        // Step 2: Find the index of the unit to update
                       const unitIndex = project.add_unit.findIndex(
                        u => u.project_name === projectname && u.block === block && u.unit_no === unitno
                      );
                        if (unitIndex === -1) {
                            return res.status(404).send({ message: "Unit not found" });
                        }

                        const existingUnit = project.add_unit[unitIndex];
                        const upcomingunit = unit

// ============================this is for deal owner update start============================================
              const result = await adddeal.updateMany(
                { project: projectname, block: block, unit_number: unitno },
                {
                  $set: {
                    owner_details: upcomingunit.owner_details !== undefined ? upcomingunit.owner_details : [],
                    associated_contact: upcomingunit.associated_contact !== undefined ? upcomingunit.associated_contact : []
                  }
                }
              );
  //====================================== deal owner update end=================================================
                      let previousOwnerDetails = existingUnit.owner_details || [];

                        //   unitDetails={
                        //   project_name: upcomingunit.project_name ? upcomingunit.project_name : existingUnit.project_name,
                        //   unit_no: upcomingunit.unit_no ? upcomingunit.unit_no : existingUnit.unit_no,
                        //   previousowner_details: previousOwnerDetails, 
                        //   owner_details: upcomingunit.owner_details ? upcomingunit.owner_details : existingUnit.owner_details,
                        //   associated_contact:upcomingunit.associated_contact ? upcomingunit.associated_contact : existingUnit.associated_contact,
                        //   unit_type: upcomingunit.unit_type ? upcomingunit.unit_type : existingUnit.unit_type,
                        //   category: upcomingunit.category ? upcomingunit.category : existingUnit.category,
                        //   sub_category:upcomingunit.sub_category,
                        //   block: upcomingunit.block,
                        //   size: upcomingunit.size,
                        //   direction: upcomingunit.direction,
                        //   facing: upcomingunit.facing,
                        //   road:upcomingunit.road ,
                        //   ownership:upcomingunit.ownership,
                        //   stage: upcomingunit.stage,
                        //   builtup_type:upcomingunit.builtup_type,
                        //   floor: upcomingunit.floor,
                        //   cluter_details:upcomingunit.cluter_details ,
                        //   length: upcomingunit.length,
                        //   bredth: upcomingunit.bredth,
                        //   total_area: upcomingunit.total_area,
                        //   measurment2: upcomingunit.measurment2,
                        //   ocupation_date: upcomingunit.ocupation_date,
                        //   age_of_construction: upcomingunit.age_of_construction,
                        //   furnishing_details: upcomingunit.furnishing_details,
                        //   furnished_item: upcomingunit.furnished_item,
                        //   remarks:upcomingunit.remarks,
                        //   location: upcomingunit.location,
                        //   lattitude: upcomingunit.lattitude,
                        //   langitude: upcomingunit.langitude,
                        //   uaddress: upcomingunit.uaddress,
                        //   ustreet: upcomingunit.ustreet,
                        //   ulocality: upcomingunit.ulocality,
                        //   ucity: upcomingunit.ucity,
                        //   uzip: upcomingunit.uzip,
                        //   ustate: upcomingunit.ustate,
                        //   ucountry: upcomingunit.ucountry,
                        //   relation: upcomingunit.relation,
                        //   s_no: upcomingunit.s_no,
                        //   descriptions: upcomingunit.descriptions,
                        //   category: upcomingunit.category,
                        //   s_no1: upcomingunit.s_no1,
                        //   url: upcomingunit.url,
                        //   document_name: upcomingunit.document_name,
                        //   document_no: upcomingunit.document_no,
                        //   document_Date: upcomingunit.document_Date,
                        //   linkded_contact: upcomingunit.linkded_contact,
                        //   preview: existingUnit.preview,
                        //   image:existingUnit.image

                        // }

                        const unitDetails = {
                              project_name: upcomingunit?.project_name ?? existingUnit.project_name,
                              unit_no: upcomingunit?.unit_no ?? existingUnit.unit_no,
                              previousowner_details: previousOwnerDetails, // static fallback
                              owner_details: upcomingunit?.owner_details ?? existingUnit.owner_details,
                              associated_contact: upcomingunit?.associated_contact ?? existingUnit.associated_contact,
                              unit_type: upcomingunit?.unit_type ?? existingUnit.unit_type,
                              category: upcomingunit?.category ?? existingUnit.category,
                              sub_category: upcomingunit?.sub_category ?? existingUnit.sub_category,
                              block: upcomingunit?.block ?? existingUnit.block,
                              size: upcomingunit?.size ?? existingUnit.size,
                              direction: upcomingunit?.direction ?? existingUnit.direction,
                              facing: upcomingunit?.facing ?? existingUnit.facing,
                              road: upcomingunit?.road ?? existingUnit.road,
                              ownership: upcomingunit?.ownership ?? existingUnit.ownership,
                              stage: upcomingunit?.stage ?? existingUnit.stage,
                              builtup_type: upcomingunit?.builtup_type ?? existingUnit.builtup_type,
                              floor: upcomingunit?.floor ?? existingUnit.floor,
                              cluter_details: upcomingunit?.cluter_details ?? existingUnit.cluter_details,
                              length: upcomingunit?.length ?? existingUnit.length,
                              bredth: upcomingunit?.bredth ?? existingUnit.bredth,
                              total_area: upcomingunit?.total_area ?? existingUnit.total_area,
                              measurment2: upcomingunit?.measurment2 ?? existingUnit.measurment2,
                              ocupation_date: upcomingunit?.ocupation_date ?? existingUnit.ocupation_date,
                              age_of_construction: upcomingunit?.age_of_construction ?? existingUnit.age_of_construction,
                              furnishing_details: upcomingunit?.furnishing_details ?? existingUnit.furnishing_details,
                              furnished_item: upcomingunit?.furnished_item ?? existingUnit.furnished_item,
                              remarks: upcomingunit?.remarks ?? existingUnit.remarks,
                              location: upcomingunit?.location ?? existingUnit.location,
                              lattitude: upcomingunit?.lattitude ?? existingUnit.lattitude,
                              langitude: upcomingunit?.langitude ?? existingUnit.langitude,
                              uaddress: upcomingunit?.uaddress ?? existingUnit.uaddress,
                              ustreet: upcomingunit?.ustreet ?? existingUnit.ustreet,
                              ulocality: upcomingunit?.ulocality ?? existingUnit.ulocality,
                              ucity: upcomingunit?.ucity ?? existingUnit.ucity,
                              uzip: upcomingunit?.uzip ?? existingUnit.uzip,
                              ustate: upcomingunit?.ustate ?? existingUnit.ustate,
                              ucountry: upcomingunit?.ucountry ?? existingUnit.ucountry,
                              relation: upcomingunit?.relation ?? existingUnit.relation,
                              s_no: upcomingunit?.s_no ?? existingUnit.s_no,
                              descriptions: upcomingunit?.descriptions ?? existingUnit.descriptions,
                              s_no1: upcomingunit?.s_no1 ?? existingUnit.s_no1,
                              url: upcomingunit?.url ?? existingUnit.url,
                              document_name: upcomingunit?.document_name ?? existingUnit.document_name,
                              document_no: upcomingunit?.document_no ?? existingUnit.document_no,
                              document_Date: upcomingunit?.document_Date ?? existingUnit.document_Date,
                              linkded_contact: upcomingunit?.linkded_contact ?? existingUnit.linkded_contact,
                              preview: existingUnit.preview,
                              image: existingUnit.image
                            };


                            // Prepare for file upload
                            const imagefiles = [];
                            const imagefiles1 = [];
                            
                            
                            if (req.files) {
                          
                              const imagefield = req.files.filter(file => file.fieldname.includes(`preview`));
                              const imagefield1 = req.files.filter(file => file.fieldname.includes(`image`));
                            
                          
                              
                              for (let file of imagefield) {
                                try {
                                  const result = await cloudinary.uploader.upload(file.path);
                                  imagefiles.push(result.secure_url);  
                          
                                  // Delete file after upload
                                  fs.unlink(file.path, (err) => {
                                    if (err) {
                                      console.error(`Failed to delete file: ${file.path}`, err);
                                    } else {
                                      console.log(`Successfully deleted file: ${file.path}`);
                                    }
                                  });
                                } catch (error) {
                                  console.error('Error uploading file:', error);
                                }
                              }
                          
                          
                              for (let file of imagefield1) {
                                try {
                                  const result = await cloudinary.uploader.upload(file.path);
                                  imagefiles1.push(result.secure_url);  
                          
                                  // Delete file after upload
                                  fs.unlink(file.path, (err) => {
                                    if (err) {
                                      console.error(`Failed to delete file: ${file.path}`, err);
                                    } else {
                                      console.log(`Successfully deleted file: ${file.path}`);
                                    }
                                  });
                                } catch (error) {
                                  console.error('Error uploading file:', error);
                                }
                              }
                          
                            }
                            if (imagefiles.length > 0) {
                              unitDetails.preview = imagefiles;  // Attach preview images
                            }
                            if (imagefiles1.length > 0) {
                              unitDetails.image = imagefiles1;  // Attach main images
                            }

                              project.add_unit[unitIndex] = unitDetails;
                              await project.save();

                 }
                  
                  res.status(200).send({
                    message: "units updated successfully",
                    // project: project
                  });
                } catch (error) {
                  console.log(error);
                  res.status(500).send({ message: "An error occurred while updating the project details", error: error.message });
                }
              };


              const update_projectaddunit=async(req,res)=>
                {
                    try {
                  
                        const name=req.params.name;
                        const user=await addproject.findOne({name:name})
                        if(!user)
                            {
                                return res.send({message:"project not found"})
                            }
    
                            let existingUnits = user.add_unit || [];
                           
                            const addunit_details = [];
                           const unit=req.body
                          
                           
                      unitDetails={
                      
                        project_name: unit.project_name,
                        unit_no: unit.unit_no,
                        owner_details: unit.owner_details,
                        associated_contact: unit.associated_contact,
                        unit_type: unit.unit_type,
                        category: unit.category,
                        sub_category:unit.sub_category,
                        block: unit.block,
                        size: unit.size,
                        direction: unit.direction,
                        facing: unit.facing,
                        road:unit.road ,
                        ownership:unit.ownership,
                        stage: unit.stage,
                        builtup_type:unit.builtup_type,
                        floor: unit.floor,
                        cluter_details:unit.cluter_details ,
                        length: unit.length,
                        bredth: unit.bredth,
                        total_area: unit.total_area,
                        measurment2: unit.measurment2,
                        ocupation_date: unit.ocupation_date,
                        age_of_construction: unit.age_of_construction,
                        furnishing_details: unit.furnishing_details,
                        furnished_item: unit.furnished_item,
                        remarks:unit.remarks,
                        location: unit.location,
                        lattitude: unit.lattitude,
                        langitude: unit.langitude,
                        uaddress: unit.uaddress,
                        ustreet: unit.ustreet,
                        ulocality: unit.ulocality,
                        ucity: unit.ucity,
                        uzip: unit.uzip,
                        ustate: unit.ustate,
                        ucountry: unit.ucountry,
                        relation: unit.relation,
                        s_no: unit.s_no,
                        descriptions: unit.descriptions,
                        category: unit.category,
                        s_no1: unit.s_no1,
                        url: unit.url,
                        document_name: unit.document_name,
                        document_no: unit.document_no,
                        document_Date: unit.document_Date,
                        linkded_contact: unit.linkded_contact,
                        preview:[],
                        image:[]
                      }
                      
                      
                        // Prepare for file upload
                        const imagefiles = [];
                        const imagefiles1 = [];
                        
                        
                        if (req.files) {
                        
                          
                          const imagefield = req.files.filter(file => file.fieldname.includes('preview'));
                          const imagefield1 = req.files.filter(file => file.fieldname.includes('image'));
                         
            
                          
                          for  (let file of imagefield) {
                            try {
                              const result = await cloudinary.uploader.upload(file.path);
                              imagefiles.push(result.secure_url);  
                      
                              // Delete file after upload
                              fs.unlink(file.path, (err) => {
                                if (err) {
                                  console.error(`Failed to delete file: ${file.path}`, err);
                                } else {
                                  console.log(`Successfully deleted file: ${file.path}`);
                                }
                              });
                            } catch (error) {
                              console.error('Error uploading file:', error);
                            }
                          }
                      
                       
                          
                         

                          for (let file of imagefield1) {
                            try {
                              const result = await cloudinary.uploader.upload(file.path);
                              imagefiles1.push(result.secure_url);  
                      
                              // Delete file after upload
                              fs.unlink(file.path, (err) => {
                                if (err) {
                                  console.error(`Failed to delete file: ${file.path}`, err);
                                } else {
                                  console.log(`Successfully deleted file: ${file.path}`);
                                }
                              });
                            } catch (error) {
                              console.error('Error uploading file:', error);
                            }
                          }
                      
                        }
                        if (imagefiles.length > 0) {
                          unitDetails.preview = imagefiles;  // Attach preview images
                        }
                        if (imagefiles1.length > 0) {
                          unitDetails.image = imagefiles1;  // Attach main images
                        }
                     
    
                         // Find if the unit_no already exists in the existing units
          const existingUnitIndex = existingUnits.findIndex(existingUnit => existingUnit.unit_no === unit.unit_no);
    
          // If the unit already exists, keep the existing data
          if (existingUnitIndex !== -1) {
            res.send({message:"unit no already exist"})
            return  // Push the existing unit data
          } else {
            // If unit doesn't exist, add the new unit
            addunit_details.push(unitDetails);
          }
                      
                        
                    
      

                    
                      
                      const resp = await addproject.findOneAndUpdate(
                        { name: name },
                        { $push: { add_unit: { $each: addunit_details } } }, // ✅ Appends new units without removing old ones
                        { new: true }
                      );
                        res.status(200).send({message:"unit added successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }
              


                const delete_projectforinventories = async (req, res) => {
                  try {
                      // Retrieve project_name, block, and unit_no from the URL parameters (params)
                      const { project_name, block, unit_no } = req.params;
              
                      // Find the project that contains the unit
                      const project = await addproject.findOne({
                          'add_unit': { $elemMatch: { project_name, block, unit_no } }
                      });
              
                      if (!project) {
                          return res.status(404).send({ message: "No project found matching the criteria" });
                      }
              
                      // Remove the matching unit from the add_unit array
                      await addproject.updateOne(
                          { _id: project._id }, 
                          { $pull: { add_unit: { project_name, block, unit_no } } }
                      );
              
                      res.status(200).send({ message: "Unit deleted successfully" });
              
                  } catch (error) {
                      res.status(500).send({ message: "Error deleting project unit", error });
                  }
              };
              

              

   module.exports={createProject,view_project,view_projectbyname,view_projectbycityname,remove_project,view_project_Byid,
    update_project,view_projectforinventories,update_projectforinventories,update_projectaddunit,
    delete_projectforinventories,update_projectforinventoriesbulk,view_units,view_projectforadddeal}