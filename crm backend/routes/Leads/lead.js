const express = require("express");
const { createLeads,
     deleteLead, 
     getLeadById,
      getLeads, 
      updateLead }= require("../../controllers/Leads/lead");


const router = express.Router();

router.post("/create-lead", createLeads);
router.get("/get-lead", getLeads); // pagination + search
router.get("/get-lead-by-id/:id", getLeadById);
router.put("/update-lead/:id", updateLead);
router.delete("/delete-lead/:id", deleteLead);

module.exports=router
