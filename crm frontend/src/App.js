import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/App.css";
import AuthGuard from "./components/Others/autguard.js";


// Lazy imports
const Addcontact = lazy(() => import("./components/Contact/addcontact"));
const EditContact = lazy(() => import("./components/Contact/edit_contact.js"));
const Call_task_complete_form = lazy(() => import("./components/call_task_complete_form"));
const Call_task_form = lazy(() => import("./components/Task/task_form.js"));
const Dashboard = lazy(() => import("./components/dashboard"));
const Leadinfo = lazy(() => import("./components/Lead/leadinfo.js"));
const Leadinfo_personal = lazy(() => import("./components/leadinfo_personal"));
const Leadinfo_requirment = lazy(() => import("./components/leadinfo_requirment"));
const Login = lazy(() => import("./components/login"));
const Mail_task_form = lazy(() => import("./components/mail_task_form"));
const Meeting_task_form = lazy(() => import("./components/meeting_task_form"));
const Site_visit = lazy(() => import("./components/site_visit_form"));
const Booking_details = lazy(() => import("./components/booking_details"));
const Payment_details = lazy(() => import("./components/Payment_details"));
const Leadfetch = lazy(() => import("./components/Lead/leaddetails.js"));
const Fetchcontact = lazy(() => import("./components/Contact/contactdetails.js"));
const InventoryDetails = lazy(() => import("./components/inventorydetails"));
const Adddcompany = lazy(() => import("./components/Company/addcompany.js"));
const Projectform = lazy(() => import("./components/Project/projectform.js"));
const Deal = lazy(() => import("./components/Deal/deal.js"));
const Tasks = lazy(() => import("./components/Task/tasks.js"));
const Task_form = lazy(() => import("./components/Task/task_form.js"));
const Paymentdetails = lazy(() => import("./components/paymentdetails.js"));
const Bookingdetails = lazy(() => import("./components/bookingdetails.js"));
const Marketing = lazy(() => import("./components/marketing.js"));
const Dealdetails = lazy(() => import("./components/Deal/dealdetails.js"));
const Sortaddcontact = lazy(() => import("./components/sortaddcontact.js"));
const EditProjectform = lazy(() => import("./components/Project/editproject.js"));
const Leadsingleview = lazy(() => import("./components/Lead/leadsingleview.js"));
const Projectpreview = lazy(() => import("./components/Project/projectpreview.js"));
const Editinventory = lazy(() => import("./components/add_inventory.js"));
const Contactsingleview = lazy(() => import("./components/Contact/contactsingleview.js"));
const Companysingleview = lazy(() => import("./components/Company/companysingleview.js"));
const Dealsingleview = lazy(() => import("./components/dealsingleview.js"));
const Projectsingleview = lazy(() => import("./components/Project/projectsingleview.js"));
const Inventorysingleview = lazy(() => import("./components/Units/inventorysingleview.js"));
const Sendmail = lazy(() => import("./components/sendmail.js"));
const Crmsettings = lazy(() => import("./components/Settings/settings.js"));
const Leadscoresettings = lazy(() => import("./components/leadscoresettings.js"));
const Whatsapplogin = lazy(() => import("./components/whatsapplogin.js"));
const Users = lazy(() => import("./components/Settings/user_management.js"));
const Templets = lazy(() => import("./components/templets.js"));
const Leadrequirmentform = lazy(() => import("./components/leadrequirmentform.js"));
const Alldeals = lazy(() => import("./components/Deal/alldeals.js"));
const Allprojects = lazy(() => import("./components/Project/allprojects.js"));
const Allunits = lazy(() => import("./components/Units/allunits.js"));
const AddSubAdmin = lazy(() => import("./components/Settings/Add_Sub_Admin.js"));
const FormTitle = lazy(() => import("./components/Settings/Configuration/form_title.js"));
const CountryCode = lazy(() => import("./components/Settings/Configuration/country_code.js"));
const ProfessionCategory = lazy(() => import("./components/Settings/Configuration/profession_category.js"));
const ProfessionSubCategory = lazy(() => import("./components/Settings/Configuration/profession_subcategory.js"));
const Designation = lazy(() => import("./components/Settings/Configuration/desgination.js"));
const Country = lazy(() => import("./components/Settings/Configuration/country.js"));
const State = lazy(() => import("./components/Settings/Configuration/state.js"));
const City = lazy(() => import("./components/Settings/Configuration/city.js"));
const PropertyType = lazy(() => import("./components/Settings/Configuration/property_type.js"));
const PropertySubType = lazy(() => import("./components/Settings/Configuration/property_sub_type.js"));
const PropertyUnitType = lazy(() => import("./components/Settings/Configuration/property_unit_type.js"));




function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>}>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<AuthGuard/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addcontact" element={<Addcontact />} />
            <Route path="/edit-contact" element={<EditContact />} />
            <Route path="/leadinfo" element={<Leadinfo />} />
            <Route path="/leadinfo-personal" element={<Leadinfo_personal />} />
            <Route path="/leadinfo-requirment" element={<Leadinfo_requirment />} />
            <Route path="/calltaskform" element={<Call_task_form />} />
            <Route path="/call-task-complete-form" element={<Call_task_complete_form />} />
            <Route path="/mailtaskform" element={<Mail_task_form />} />
            <Route path="/meetingtaskform" element={<Meeting_task_form />} />
            <Route path="/sitevisitform" element={<Site_visit />} />
            <Route path="/paymentdetails" element={<Payment_details />} />
            <Route path="/bookingdetails" element={<Booking_details />} />
            <Route path="/leaddetails" element={<Leadfetch />} />
            <Route path="/contactdetails" element={<Fetchcontact />} />
            <Route path="/inventorydetails" element={<InventoryDetails />} />
            <Route path="/project" element={<Projectform />} />
            <Route path="/addcompany" element={<Adddcompany />} />
            <Route path="/deal" element={<Deal />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasksform" element={<Task_form />} />
            <Route path="/bookingdetails" element={<Booking_details />} />
            <Route path="/paymentdetails" element={<Payment_details />} />
            <Route path="/paymentdetailsdata" element={<Paymentdetails />} />
            <Route path="/bookingdetailsdata" element={<Bookingdetails />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/dealdetails" element={<Dealdetails />} />
            <Route path="/sortaddcontact" element={<Sortaddcontact />} />
            <Route path="/editproject" element={<EditProjectform />} />
            <Route path="/leadsingleview" element={<Leadsingleview />} />
            <Route path="/contactsingleview" element={<Contactsingleview />} />
            <Route path="/companysingleview" element={<Companysingleview />} />
            <Route path="/dealsingleview" element={<Dealsingleview />} />
            <Route path="/projectsingleview" element={<Projectsingleview />} />
            <Route path="/inventorysingleview" element={<Inventorysingleview />} />
            <Route path="/allprojects/projectpreview" element={<Projectpreview />} />
            <Route path="/addinventory" element={<Editinventory />} />
            <Route path="/sendmail" element={<Sendmail />} />
            <Route path="/crmsettings" element={<Crmsettings />} />
            <Route path="/leadscoreseetings" element={<Leadscoresettings />} />
            <Route path="/whatsapplogin" element={<Whatsapplogin />} />
            <Route path="/addusers" element={<Users />} />
            <Route path="/createtemplets" element={<Templets />} />
            <Route path="/leadrequirment" element={<Leadrequirmentform />} />
            <Route path="/alldeals" element={<Alldeals />} />
            <Route path="/allprojects" element={<Allprojects />} />
            <Route path="/allunits" element={<Allunits />} />
            <Route path="/add-sub-admin" element={<AddSubAdmin />} />

            <Route path="/configuration-form-title" element={<FormTitle/>} />
            <Route path="/configuration-country-code" element={<CountryCode/>} />
            <Route path="/configuration-profession-category" element={<ProfessionCategory/>} />
            <Route path="/configuration-profession-sub-category" element={<ProfessionSubCategory/>} />
            <Route path="/configuration-designation" element={<Designation/>} />
            <Route path="/configuration-country" element={<Country/>} />
            <Route path="/configuration-state" element={<State/>} />
            <Route path="/configuration-city" element={<City/>} />
            <Route path="/configuration-property-type" element={<PropertyType/>} />
            <Route path="/configuration-property-sub-type" element={<PropertySubType/>} />
            <Route path="/configuration-property-unit-type" element={<PropertyUnitType/>} />
            </Route>
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
