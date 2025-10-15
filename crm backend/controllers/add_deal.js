
const adddeal = require('../models/deal.js');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 
const axios = require('axios');



require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})



const add_deal = async (req, res) => {
    try {

    const {
        project_category, project_subcategory, location,ulocality,ucity,utype,ucategory,usub_category,usize, available_for, stage, project, block, unit_number, floors, expected_price,
        quote_price, security_deposite, maintainence_charge, rent_escltion, rent_period, fitout_perioud, deal_type,deal_case, transaction_type,
        source, white_portion, team, user, visible_to, owner_details, associated_contact, relation, s_no, descriptions,
        category, s_no1, url, website, social_media, send_matchedlead, matchedleads, matchinglead, remarks
      } = req.body;
   
      const existingdeal=await adddeal.findOne({project:project,block:block,unit_number:unit_number})
      if(existingdeal)
      {
        res.status(400).send({message:"Deal already exist..."})
        return
      }

      const new_add_deal = new adddeal({
        project_category, project_subcategory, location,ulocality,ucity,utype,ucategory,usub_category,usize, available_for, stage, project, block, unit_number, floors, expected_price,
        quote_price, security_deposite, maintainence_charge, rent_escltion, rent_period, fitout_perioud, deal_type,deal_case, transaction_type,
        source, white_portion, team, user, visible_to, owner_details, associated_contact, relation, 
        s_no, descriptions, category, s_no1, url, website, social_media, send_matchedlead, matchedleads, matchinglead, remarks,
      });
  
      // Save the deal to the database
      const resp = await new_add_deal.save();
      res.status(200).send({ message: 'Deal added successfully', deal: resp });
  
    } catch (error) {
      console.error('Error adding deal:', error);
      res.status(500).send({ message: 'Error occurred while adding deal', error: error.message });
    }
  };



  


    const view_deal=async(req,res)=>
        {
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
      });
    }

                const resp=await adddeal.find(matchStage)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                 .populate('owner_details')  
                .populate('associated_contact').populate('matchedleads'); 
    
      const total = await adddeal.countDocuments(matchStage);
    const totalPages = Math.ceil(total / limit);
              
                res.status(200).send({message:"deal details fetch successfully",deal:resp,total:total,totalpages:totalPages})
            } catch (error) {
                console.log(error)
            }
        }

        const view_deal_Bystage=async(req,res)=>
            {
                try {
                    const stage=req.params.stage;
                    const resp= await adddeal.find({stage:stage})
                    if(!resp)
                        {
                           return res.send("lead info not available")
                        }
                       
                    res.status(200).send({message:"lead found and here are lead details:",deal:resp})
                } catch (error) {
                    console.log(error)
                }
            }

            const view_deal_Byproject=async(req,res)=>
                {
                    try {
                        const project=req.params.project;
                        const resp= await adddeal.find({project:project})
                        if(!resp)
                            {
                               return res.send("lead info not available")
                            }
                           
                        res.status(200).send({message:"lead found and here are lead details:",deal:resp})
                    } catch (error) {
                        console.log(error)
                    }
                }


            const remove_deal=async(req,res)=>
                {
                    try {
                        const id=req.params._id;
                        const user=await adddeal.findOne({_id:id})
                        if(!user)
                            {
                                return res.send({message:"deal not found"})
                            }
                        const resp=await adddeal.deleteOne({_id:id})
                        res.status(200).send({message:"deal deleted successfully"})
                    } catch (error) {
                        console.log(error)
                    }
                }

                const update_deal=async(req,res)=>
                    {
                        try {
                            const id=req.params._id;
                         
                            
                            const user=await adddeal.findOne({_id:id})
                            if(!user)
                                {
                                    return res.send({message:"deal not found"})
                                }
                                // const pics = req.files ? req.files.map(item => item.path) : [];
                                // const preview=req.files ? req.files.map((item=>item.path)):[]
                            
                             const updatedFields = {
                                ...req.body,
                          
                            };
                            const resp=await adddeal.findByIdAndUpdate(id,updatedFields,{ new: true })
                            res.status(200).send({message:"Deal update successfully"})
                        } catch (error) {
                            console.log(error)
                        }
                    }

                    const update_dealbyprojectandunit = async (req, res) => {
                        try {
                         
                          const { project, block,unit_number } = req.params;  // Extract project and unit from URL params
                          const { newstage } = req.body;  // Extract new stage from request body
                      
                        //   console.log(`Received stage: ${newstage} for project: ${project}, block: ${block}, unit_number: ${unit_number}`);
                      
                          // Update all matching deals in a single operation
                          const result = await adddeal.updateMany(
                            { project: project, block: block, unit_number: unit_number },
                            { $set: { stage: newstage } }
                          );
                      
                          // If no deals were updated
                          if (result.matchedCount === 0) {
                            return res.status(400).send({ message: "No deal found with the specified unit number and block" });
                          }
                      
                          // Return success message with the count of updated deals
                          return res.status(200).send({ message: `${result.modifiedCount} deal(s) updated successfully` });
                      
                        } catch (error) {
                          console.error(error);
                          return res.status(500).send({ message: "Internal Server Error" });
                        }
                      };
                      

                      const update_dealbyprojectandunitforownerdetails = async (req, res) => {
                        try {
                         
                          const { project, block,unit_number } = req.params;  // Extract project and unit from URL params
                          console.log(req.body);
                    
                          // Update all matching deals in a single operation
                          const result = await adddeal.updateMany(
                            { project: project, block: block, unit_number: unit_number },
                            { $set: { owner_details: req.body.owner_details,associated_contact:req.body.associated_contact } }
                          );
                      
                          // If no deals were updated
                          if (result.matchedCount === 0) {
                            return res.status(400).send({ message: "No deal found with the specified unit number and block" });
                          }
                          // Return success message with the count of updated deals
                          return res.status(200).send({ message: `${result.modifiedCount} deal(s) updated successfully` });
                      
                        } catch (error) {
                          console.error(error);
                          return res.status(500).send({ message: "Internal Server Error" });
                        }
                      };
                      
                      
                      

                        


                    const view_deal_Byid=async(req,res)=>
                        {
                            try {
                                const _id=req.params._id;
                                const resp= await adddeal.findOne({_id:_id}).populate('owner_details').populate('associated_contact')
                                if(!resp)
                                    {
                                       return res.send("lead info not available")
                                    }
                                res.status(200).send({message:"lead found and here are lead details:",deal:resp})
                            } catch (error) {
                                console.log(error)
                            }
                        }

                    const update_dealbysingle=async(req,res)=>
                        {
                            try {
                                const id=req.params._id;
                                const user=await adddeal.findOne({_id:id})
                                if(!user)
                                    {
                                        return res.send({message:"deal not found"})
                                    }
                                
                                 const updatedFields = {
                                    remarks:req.body.remarks,
                                    stage:req.body.stage,
                                };
                                const resp=await adddeal.findByIdAndUpdate(id,updatedFields,{ new: true })
                                res.status(200).send({message:"lead update successfully"})
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        const update_dealbyowner=async(req,res)=>
                            {
                                try {
                                    const id=req.params._id;
                                    const user=await adddeal.findOne({_id:id})
                                    if(!user)
                                        {
                                            return res.send({message:"deal not found"})
                                        }
                                    
                                     const updatedFields = {
                                       ...req.body
                                    };
                                    const resp=await adddeal.findByIdAndUpdate(id,updatedFields,{ new: true })
                                    res.status(200).send({message:"lead update successfully"})
                                } catch (error) {
                                    console.log(error)
                                }
                            }
        

                            

                        const getUnitDetails = async (req, res) => {
                        try {
                            const { deals } = req.body;


                            const unitDetails = await Promise.all(
                            deals.map(async (deal) => {
                               
                                try {
                                const response = await axios.get(
                                    `${process.env.API_URL}/viewprojectforinventories/${deal.project}/${deal.unit_number}/${deal.block}`
                                );
                               
                                
                                const unitData = response.data?.project?.add_unit?.[0] || null;

                                return {
                                   
                                    unitData,
                                };
                                } catch (err) {
                                // console.error(`Error fetching unit for ${deal.project} ${deal.unit_number}`, err.message);
                                return null;
                                }
                            })
                            );

                            res.status(200).json(unitDetails.filter(Boolean)); // remove nulls
                        } catch (error) {
                            console.error("Error in getUnitDetails:", error.message);
                            res.status(500).json({ message: 'Internal server error' });
                        }
                        };

                       
                          const dealupdatemany= async (req, res) => {
                                                        const { deals } = req.body;
                                                        if  (!Array.isArray(deals)) {
                                                        return res.status(400).json({ message: 'Invalid deals data' });
                                                        }
                                                    
                                                        const bulkOps = deals.map((deal) => ({
                                                        updateOne: {
                                                            filter: { _id: deal._id },
                                                            update: { $set: deal },
                                                        },
                                                        }));
                                                    
                                                        try {
                                                        await adddeal.bulkWrite(bulkOps);
                                                        res.status(200).json({ message: 'All deals updated successfully' });
                                                        } catch (error) {
                                                        console.error('Bulk update error:', error);
                                                        res.status(500).json({ message: 'Bulk update failed', error });
                                                        }
                                                    }
                              
                 
// Aggregate to get grouped data
// Get grouped data for dropdowns
const getGroupedDatadeal = async (req, res) => {
  try {
    const groupedData = await adddeal.aggregate([
      {
        $group: {
          _id: null,
          available_for: { $addToSet: "$available_for" },
          ucategory: { $addToSet: "$ucategory" },
          usub_category: { $addToSet: "$usub_category" },
          utype: { $addToSet: "$utype" },
          usize: { $addToSet: "$usize" },
          expected_price: { $addToSet: "$expected_price" },
          quote_price: { $addToSet: "$quote_price" },
          project: { $addToSet: "$project" },
          block: { $addToSet: "$block" },
          location: { $addToSet: "$ulocality" }, // renamed for clarity
          deal_type: { $addToSet: "$deal_type" },
          team: { $addToSet: "$team" },
          source: { $addToSet: "$source" },
          user: { $addToSet: "$user" },
        },
      },
      {
        $project: {
          _id: 0,
          available_for: 1,
          ucategory: 1,
          usub_category: 1,
          utype: 1,
          usize: 1,
          expected_price: 1,
          quote_price: 1,
          project: 1,
          block: 1,
          location: 1,
          deal_type: 1,
          team: 1,
          source: 1,
          user: 1,
        },
      },
    ]);

    res.status(200).json(groupedData[0] || {});
  } catch (err) {
    console.error("Error fetching grouped data:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


    
    module.exports={add_deal,view_deal,view_deal_Bystage,remove_deal,update_deal,view_deal_Byid,update_dealbysingle,update_dealbyowner,
        update_dealbyprojectandunit,view_deal_Byproject,update_dealbyprojectandunitforownerdetails,getUnitDetails,dealupdatemany,
        getGroupedDatadeal
    };