const express = require("express");
const { add_subadmin, view_sub_admins, remove_sub_admin } = require("../../controllers/Settings/add_sub_admin");
const { route } = require("../admin");

const router=express.Router()





router.post("/add-sub-admin",  add_subadmin);

router.get("/get-sub-admins",  view_sub_admins);

router.delete("/remove-sub-admins/:_id",  remove_sub_admin);

module.exports=router