const express=require('express');
const {add_contact,view_contact, view_contact_Byid, remove_contact, update_contact, view_contact_Byemail, view_contact_Bymobile, view_contact_Bytags, view_contact_Bycompany, view_contact_ByName, update_contactsingledocument, delete_contactsingledocument, add_contactdocument, addbulkcontacts, update_contactforbulkupload, searchcontact} = require('../controllers/contact_details');
const {lead_info,leadinfo_find, view_lead_Byleadtype, remove_lead, update_lead, view_lead_Byid, view_lead_Bycompany, view_lead_Byemail, view_lead_Bymobile, view_lead_Bystage, update_leadstage, update_leaddocument, update_leadstagebyemail, update_leadsingledocument, delete_leadsingledocument,updatemany, addbulkleads, update_leadforbulkupload, searchlead} = require('../controllers/leadinfo');
const lead_info_personal = require('../controllers/leadinfo_personal');
const upload=require('../middlewares/file');
const {add_developer,view_developer, view_developer_Byid, update_developer, remove_developer} = require('../controllers/add_developer');
const { add_tower, view_tower } = require('../controllers/add_tower');
const add_project = require('../controllers/add_project');
const lead_info_requirment = require('../controllers/leadinfo_requirment');
const {mail_task_form,view_mail, remove_mailtask, view_mailtask_Byid, update_mailtask} = require('../controllers/mail_task_form');
const {call_task_form,view_call, update_calltask, remove_calltask, view_calltask_Byid} = require('../controllers/call_task_form');
const {meeting_task_form,viewmeeting_task, remove_meetingtask, view_meetingtask_Byid, update_meetingtask} = require('../controllers/meeting_task_form');
const {site_visit_form,view_site, remove_sitevisittask, view_sitevisittask_Byid, update_sitevisittask} = require('../controllers/site_visit_form');
const {booking_details,view_booking} = require('../controllers/booking_details');
const {addpayment_details,view_payment} = require('../controllers/addpayment_details');
const {inventory_details,view_inventory, remove_inventory, view_inventory_Bydeveloper, view_inventory_Bylocation, update_inventory}=require('../controllers/addinventory');
const send_mail = require('../controllers/sendmail');
const {createProject,view_project, view_projectbyname, view_projectbycityname, remove_project, view_project_Byid, update_project, view_projectforinventories, update_projectforinventories, update_projectaddunit, delete_projectforinventories, update_projectforinventoriesbulk, view_units, view_projectforadddeal} = require('../controllers/project');
const { add_deal, view_deal, view_deal_Bystage, remove_deal, update_deal, view_deal_Byid, update_dealbysingle, update_dealbyowner, update_dealbyprojectandunit, view_deal_Byproject, update_dealbyprojectandunitforownerdetails, getUnitDetails,updateMany, dealupdatemany } = require('../controllers/add_deal');
 const uploadFields = require('../middlewares/multifile');
const upload1 = require('../middlewares/multifile');
const { add_activity, view_activity, remove_activity, update_activity, view_activitybyid } = require('../controllers/addactivity');
const { sendmessage, makecall } = require('../controllers/sendsms');
const {sendwhatsapp,setWhatsAppWebhook, sendWhatsAppTextMessage, rcvmessage} = require('../controllers/sendwhatsapp');
const { add_leadscore, view_leadscore, delete_leadscore, updateleadscore } = require('../controllers/leadscore');
const { add_templete, view_templete } = require('../controllers/addtemplets');
const { add_instanceid, view_instanceid } = require('../controllers/whatsappinstanceid');
const { add_feedback } = require('../controllers/feedbackform');
const { add_user, view_user, update_user, remove_user } = require('../controllers/adduser');



const router=express.Router()

//============================== all routing for contact start=============================================================

router.post('/addcontact',upload.any('document_pic'),add_contact)
router.post('/addbulkcontact',upload.any('document_pic'),addbulkcontacts)
router.get('/viewcontact',view_contact)
router.get('/viewcontactbyid/:_id',view_contact_Byid)
router.get('/viewcontactbyname/:first_name',view_contact_ByName)
router.get('/viewcontactbyemail/:email',view_contact_Byemail)
router.get('/viewcontactbymobile/:mobile_no',view_contact_Bymobile)
router.get('/viewcontactbytags/:tags',view_contact_Bytags)
router.get('/viewcontactbycompany/:company_name',view_contact_Bycompany)
router.put('/updatecontact/:_id',upload.any('document_pic'),update_contact)
router.put('/adddocumentincontact/:_id',upload.any('document_pic'),add_contactdocument)
router.put('/updatecontactdocumentsingle/:_id',upload.any('document_pic'),update_contactsingledocument)
router.put('/updatecontactforbulkupload',upload.any('document_pic'),update_contactforbulkupload)
router.delete('/deletecontact/:_id',remove_contact)
router.delete('/deletecontactsingledocument/:_id',delete_contactsingledocument)
router.post('/contact/sendmail',upload.array('attachments', 10),send_mail)
router.get('/searchcontact',searchcontact)

//======================================= all routing for contact end=========================================================


// ==============================================all routing for lead start=================================================

router.post('/leadinfo',upload.any('document_pic'),lead_info)
router.post('/bulkleadinfo',upload.any('document_pic'),addbulkleads)
router.get('/leadinfo',leadinfo_find)
router.get('/viewbyleadtype/:lead_type',view_lead_Byleadtype)
router.get('/viewbyid/:_id',view_lead_Byid)
router.delete('/removelead/:_id',remove_lead)
router.put('/updatelead/:_id',upload.any('document_pic'),update_lead)
router.put('/adddocumentinlead/:_id',upload.any('document_pic'),update_leaddocument)
router.put('/updateleadbystage/:_id',update_leadstage)
router.put('/updateleadbystagebyemail/:email',update_leadstagebyemail)
router.put('/updateleaddocumentsingle/:_id',upload.any('document_pic'),update_leadsingledocument)
router.put('/updateleadforbulkupload',upload.any('document_pic'),update_leadforbulkupload)
router.delete('/deleteleadsingledocument/:_id',delete_leadsingledocument)
router.get('/viewleadbycompany/:company_name',view_lead_Bycompany)
router.get('/viewleadbystage/:stage',view_lead_Bystage)
router.get('/viewleadbyemail/:email',view_lead_Byemail)
router.get('/viewleadbymobile/:mobile_no',view_lead_Bymobile)
router.get('/searchlead',searchlead)

//============================================= all routing for lead end=======================================================

router.post('/project',uploadFields,createProject)
router.get('/viewproject',view_project)
router.get('/viewprojectforadddeal',view_projectforadddeal)
router.get('/viewallunits',view_units)
router.get('/viewprojectbyid/:_id',view_project_Byid)
router.get('/viewprojectbyname/:name',view_projectbyname)
router.get('/viewprojectbycityname/:city',view_projectbycityname)
router.get('/viewprojectforinventories/:project_name/:unit_no/:block', view_projectforinventories);
router.put('/updateprojectforinventories/:project_name/:unit_no/:block',uploadFields, update_projectforinventories);
router.put('/updateprojectforinventoriesbulk',uploadFields, update_projectforinventoriesbulk);
router.delete('/deleteprojectforinventories/:project_name/:unit_no/:block', delete_projectforinventories);
router.delete('/deleteproject/:_id',remove_project)
router.put('/updateproject/:_id',upload.any('pic','preview'),update_project)
router.put('/addinventory/:name',uploadFields,update_projectaddunit)

//router.post('/adddeal',upload.any('preview'),add_deal)
 router.post('/adddeal',add_deal)
router.get('/viewdeal',view_deal)
router.get('/viewdealbyid/:_id',view_deal_Byid)
router.get('/viewdealbystage/:stage',view_deal_Bystage)
router.get('/viewdealbyproject/:project',view_deal_Byproject)
router.delete('/removedeal/:_id',remove_deal)
router.put('/updatedeal/:_id',update_deal)
router.put('/updatedealbysingle/:_id',upload.any('pic','preview'),update_dealbysingle)
router.put('/updatedealbyowner/:_id',update_dealbyowner)
router.put('/updatedealstage/:project/:block/:unit_number',update_dealbyprojectandunit)
router.put('/updatedealowner/:project/:block/:unit_number',update_dealbyprojectandunitforownerdetails)

router.post('/getUnitDetails',getUnitDetails)

router.post('/leadinfopersonal',upload.any('file'),lead_info_personal)

router.post('/leadinforequirment',lead_info_requirment)

router.put('/dealbulkupdate',dealupdatemany)

router.put('/bulkupdate',updatemany)

//============================ route for all task======================================================================

router.post('/mailtask',mail_task_form)
router.get('/viewmailtask',view_mail)
router.delete('/removemailask/:_id',remove_mailtask)
router.get('/viewmailtaskbyid/:_id',view_mailtask_Byid)
router.put('/updatemailtask/:_id',update_mailtask)

router.post('/calltask',call_task_form)
router.get('/viewcalltask',view_call)
router.get('/viewcalltaskbyid/:_id',view_calltask_Byid)
router.put('/updatecalltask/:_id',update_calltask)
router.delete('/removecallask/:_id',remove_calltask)

router.post('/meetingtask',meeting_task_form)
router.get('/viewmeetingtask',viewmeeting_task)
router.get('/viewmeetingtaskbyid/:_id',view_meetingtask_Byid)
router.delete('/removemeetingtask/:_id',remove_meetingtask)
router.put('/updatemeetingtask/:_id',update_meetingtask)

router.post('/sitevisit',site_visit_form)
router.get('/viewsitevisit',view_site)
router.delete('/removesitevisittask/:_id',remove_sitevisittask)
router.get('/viewsitevisitbyid/:_id',view_sitevisittask_Byid)
router.put('/updatesitevisittask/:_id',update_sitevisittask)

// =======================================route for all task end=============================================================================

router.post('/bookingdetails',booking_details)
router.get('/viewbookingdetails',view_booking)


router.post('/paymentdetails',upload.any('image'),addpayment_details)
router.get('/viewpaymentdetails',view_payment)

router.post('/inventorydetails',upload.array('preview',10),inventory_details)
router.get('/viewinventory',view_inventory)
router.delete('/removeinventory/:_id',remove_inventory)
router.get('/viewinventorybydeveloper/:developer',view_inventory_Bydeveloper)
router.get('/viewinventorybylocation/:location',view_inventory_Bylocation)
router.put('/updateinventory/:_id',upload.any('preview',10),update_inventory)


router.post('/addcompany',add_developer)
router.get('/viewcompany',view_developer)
router.get('/viewcompanybyid/:_id',view_developer_Byid)
router.put('/updatecompany/:_id',update_developer)
router.delete('/removecompany/:_id',remove_developer)
router.post('/addproperty/addtower',add_tower)
router.get('/addproperty/viewtower',view_tower)
router.post('/addproperty/addproject')
router.get('/addproperty/viewproject',view_project)

// ======================================activity route========================================================

router.post('/addactivity',add_activity)
router.get('/viewactivity',view_activity)
router.get('/viewactivitybyid/:_id',view_activitybyid)
router.delete('/removeactivity/:_id',remove_activity)
router.put('/updateactivity/:_id',update_activity)


router.post('/sendmessage',sendmessage)
router.post('/makecall',makecall)

router.get('/get-qr-code',sendwhatsapp)
router.post('/setwebhook',setWhatsAppWebhook)
router.post('/sendwhatsappmessage',sendWhatsAppTextMessage)
router.post('/rcvmessage',rcvmessage)


router.post('/addleadscore',add_leadscore)
router.get('/viewleadscore',view_leadscore)
router.delete('/deleteleadscore/:_id',delete_leadscore)
router.put('/updateleadscore/:_id',updateleadscore)

router.post('/addtemplete',add_templete)
router.get('/viewtemplets',view_templete)

router.post('/addinstanceid',add_instanceid)
router.get('/viewinstanceid',view_instanceid)

router.post('/addfeedback',add_feedback)


router.post('/adduser',add_user)
router.get('/viewuser',view_user)
router.put('/updateuser/:_id',update_user)
router.delete('/deleteuser/:_id',remove_user)

module.exports=router;