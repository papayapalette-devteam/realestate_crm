const express = require("express");
const upload = require("../../middlewares/file");
const send_mail = require("../../controllers/sendmail");

const {
  add_contact,
  view_contact,
  view_contact_Byid,
  remove_contact,
  update_contact,
  view_contact_Byemail,
  view_contact_Bymobile,
  view_contact_Bytags,
  view_contact_Bycompany,
  view_contact_ByName,
  update_contactsingledocument,
  delete_contactsingledocument,
  add_contactdocument,
  addbulkcontacts,
  update_contactforbulkupload,
  searchcontact,
  view_contact_for_editproject,
  getGroupedData,
} = require("../../controllers/Contact/contact_details");



const router=express.Router()




router.post("/addcontact", upload.any("document_pic"), add_contact);
router.post("/addbulkcontact", upload.any("document_pic"), addbulkcontacts);
router.get("/viewcontact", view_contact);
router.get("/viewcontact-for-edit-project", view_contact_for_editproject);
router.get("/viewcontactbyid/:_id", view_contact_Byid);
router.get("/viewcontactbyname/:first_name", view_contact_ByName);
router.get("/viewcontactbyemail/:email", view_contact_Byemail);
router.get("/viewcontactbymobile/:mobile_no", view_contact_Bymobile);
router.get("/viewcontactbytags/:tags", view_contact_Bytags);
router.get("/viewcontactbycompany/:company_name", view_contact_Bycompany);
// router.put("/updatecontact/:_id", upload.any("document_pic"), update_contact);
router.put("/updatecontact/:_id", update_contact);
router.put(
  "/adddocumentincontact/:_id",
  upload.any("document_pic"),
  add_contactdocument
);
router.put(
  "/updatecontactdocumentsingle/:_id",
  upload.any("document_pic"),
  update_contactsingledocument
);
router.put(
  "/updatecontactforbulkupload",
  upload.any("document_pic"),
  update_contactforbulkupload
);
router.delete("/deletecontact/:_id", remove_contact);
router.delete(
  "/deletecontactsingledocument/:_id",
  delete_contactsingledocument
);
router.post("/contact/sendmail", upload.array("attachments", 10), send_mail);
router.get("/searchcontact", searchcontact);
router.get("/contact-getgroupdata", getGroupedData);






module.exports=router