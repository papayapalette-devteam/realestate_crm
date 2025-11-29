const express = require("express");
const { login } = require("../../controllers/Others/sign_in");
const { saveLookup, getLookup, remove_lookup } = require("../../controllers/Lookup Table/lookup_table");
const { exportUnits } = require("../../controllers/Export/export");


const router=express.Router()



router.post("/sign-in",login);

router.post("/SaveLookup",saveLookup);

router.get("/LookupList",getLookup);

router.delete("/RemoveLookup",remove_lookup);

router.get("/export-excel/:name", exportUnits);





module.exports=router