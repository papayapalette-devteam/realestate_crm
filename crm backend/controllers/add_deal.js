
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

// const add_deal=async(req,res)=>
//     {
//         try {
//             const{project_category,project_subcategory,location,available_for,stage,project,block,unit_number,floors,expected_price,quote_price,security_deposite,
//                     maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
//                     team,user,visible_to,owner_details,associated_contact,relation,document_details,s_no,descriptions,category,s_no1,url,
//                     website,social_media,send_matchedlead,matchedleads,matchinglead,remarks}=req.body;
                    
   
//                     //  if (req.files.pic) {
//                     //             // Upload files to Cloudinary and get the URLs
//                     //             for (let file of req.files.pic) {
//                     //               const result = await cloudinary.uploader.upload(file.path);
//                     //               newDocumentPic1.push(result.secure_url);  // Store the URL of the uploaded image
//                     //               // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
//                     //               // fs.unlinkSync(file.path);
//                     //             }
//                     //           }
//                     const images=[];
//                     if (req.files) {
//                                for (let file of req.files) {
//                                             const result = await cloudinary.uploader.upload(file.path);
//                                   images.push(result.secure_url);
//                                 }
//                             }
                    
                    

                   
                 
                    
//                     // const updatedDocumentDetails = document_details ? document_details.map((doc, index) => ({
//                     //     ...doc,
//                     //     pic: pics[index] || doc.pic // Add pic from files if available
//                     // })):[];
           
//                 const new_add_deal= new adddeal({project_category,project_subcategory,location,available_for,stage,project,block,unit_number,floors,expected_price,quote_price,security_deposite,
//                     maintainence_charge,rent_escltion,rent_period,fitout_perioud,deal_type,transaction_type,source,white_portion,
//                     team,user,visible_to,owner_details,associated_contact,relation,document_details,
//                     s_no,preview:images,descriptions,category,s_no1,url,website,social_media,send_matchedlead,matchedleads,matchinglead,remarks})
            
//             const resp=await new_add_deal.save()
//             res.status(200).send({message:"deal added ",deal:resp})
//         } catch (error) {
//             console.log(error)
//         }
//     }

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
                const resp=await adddeal.find() .populate('owner_details')  // Populate owner_details with contact data
                .populate('associated_contact').populate('matchedleads');  // Populate associated_contact with contact data
                res.status(200).send({message:"deal details fetch successfully",deal:resp})
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
                              
                 


    
    module.exports={add_deal,view_deal,view_deal_Bystage,remove_deal,update_deal,view_deal_Byid,update_dealbysingle,update_dealbyowner,
        update_dealbyprojectandunit,view_deal_Byproject,update_dealbyprojectandunitforownerdetails,getUnitDetails,dealupdatemany
    };