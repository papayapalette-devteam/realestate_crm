const express = require("express");
const { add_subadmin, view_sub_admins, remove_sub_admin } = require("../../controllers/Settings/add_sub_admin");
const { route } = require("../admin");
const { add_user, view_user, update_user, remove_user } = require("../../controllers/Settings/adduser");

const router=express.Router()


// sub-admin route
router.post("/add-sub-admin",  add_subadmin);

router.get("/get-sub-admins",  view_sub_admins);

router.delete("/remove-sub-admins/:_id",  remove_sub_admin);

// user route
router.post("/adduser", add_user);

router.get("/viewuser", view_user);

router.put("/updateuser/:_id", update_user);

router.delete("/deleteuser/:_id", remove_user);


module.exports=router