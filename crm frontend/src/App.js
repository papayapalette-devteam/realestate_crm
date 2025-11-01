import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/App.css";

// Lazy imports
const Addcontact = lazy(() => import("./components/Contact/addcontact"));
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
const Adddcompany = lazy(() => import("./components/addcompany.js"));
const Projectform = lazy(() => import("./components/Project/projectform.js"));
const Deal = lazy(() => import("./components/deal"));
const Tasks = lazy(() => import("./components/Task/tasks.js"));
const Task_form = lazy(() => import("./components/Task/task_form.js"));
const Paymentdetails = lazy(() => import("./components/paymentdetails.js"));
const Bookingdetails = lazy(() => import("./components/bookingdetails.js"));
const Marketing = lazy(() => import("./components/marketing.js"));
const Dealdetails = lazy(() => import("./components/dealdetails.js"));
const Sortaddcontact = lazy(() => import("./components/sortaddcontact.js"));
const EditProjectform = lazy(() => import("./components/Project/editproject.js"));
const Leadsingleview = lazy(() => import("./components/Lead/leadsingleview.js"));
const Projectpreview = lazy(() => import("./components/Project/projectpreview.js"));
const Editinventory = lazy(() => import("./components/add_inventory.js"));
const Contactsingleview = lazy(() => import("./components/Contact/contactsingleview.js"));
const Companysingleview = lazy(() => import("./components/companysingleview.js"));
const Dealsingleview = lazy(() => import("./components/dealsingleview.js"));
const Projectsingleview = lazy(() => import("./components/Project/projectsingleview.js"));
const Inventorysingleview = lazy(() => import("./components/Units/inventorysingleview.js"));
const Sendmail = lazy(() => import("./components/sendmail.js"));
const Crmsettings = lazy(() => import("./components/settings.js"));
const Leadscoresettings = lazy(() => import("./components/leadscoresettings.js"));
const Whatsapplogin = lazy(() => import("./components/whatsapplogin.js"));
const Users = lazy(() => import("./components/users.js"));
const Templets = lazy(() => import("./components/templets.js"));
const Leadrequirmentform = lazy(() => import("./components/leadrequirmentform.js"));
const Alldeals = lazy(() => import("./components/alldeals.js"));
const Allprojects = lazy(() => import("./components/Project/allprojects.js"));
const Allunits = lazy(() => import("./components/Units/allunits.js"));

const AddSubAdmin = lazy(() => import("./components/Settings/Add_Sub_Admin.js"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>}>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addcontact" element={<Addcontact />} />
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
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
