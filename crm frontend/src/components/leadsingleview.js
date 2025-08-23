import React, { act, useEffect,useRef } from 'react'
import axios from "axios";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { useLocation, useNavigate } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import api from "../api";
import Tooltip from '@mui/material/Tooltip';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';  // Import ReactQuill
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'; 
import '../css/leadview.css'
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from "react-toastify";
import Dropdown from 'react-bootstrap/Dropdown';
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Icon from '@mdi/react';
import { mdiCurrencyUsd } from '@mdi/js';
import matcheddeal from '../icons/matcheddeal.jpg'
import inventories from '../icons/inventories.jpg'
import publish from '../icons/publish.jpg'
import createbooking from '../icons/createbooking.jpg'
import matchedlead from '../icons/matchedlead.jpg'
import transferuser from '../icons/transferuser.jpg'
import { event } from 'jquery';
import { CircularProgress,LinearProgress, Typography, Box } from "@mui/material";

function Leadsingleview() {

const navigate=useNavigate()
  

    const location=useLocation()
    const lead=location.state || {}

// =============================================fetch all data from lead score start==================================================

     useEffect(()=>{fetchdataforcallfields()},[])
                  const[callreason,setcallreason]=useState([]);
                  const[calldirection,setcalldirection]=useState([]);
                  const[callstatus,setcallstatus]=useState([]);
                  const[callresult,setcallresult]=useState([]);
    
                  const[mailsubject,setmailsubject]=useState([]);
                  const[maildirection,setmaildirection]=useState([]);
                  const[mailstatus,setmailstatus]=useState([]);
    
                  const[meetingreason,setmeetingreason]=useState([]);
                  const[meetingstatus,setmeetingstatus]=useState([]);
                  const[meetingresult,setmeetingresult]=useState([]);
    
                  const[sitevisit_visittype,setsitevisit_visittype]=useState([]);
                  const[sitevisit_status,setsitevisit_status]=useState([]);
                  const[sitevisit_result,setsitevisit_result]=useState([]);
    
    
                    const callreasons = ["Site Visit", "Builder Discount/Scheme","Construction Update","Documentation","Inventory Availability","Inventory Rights for Listing","Legal",
                              "Loan Discussion","Meeting","Negotiation Discussion","Other","Registry Preparation & Timeline",
                              "Requirement","Review/Feedback","Tax Discussion"];
            
          const calldirections = ["Outgoing Call", "Incoming Call",];
          const callstatus1 = ["Answered", "Cut Call","Not Picked","Busy","Missed","Not Reachable"," Switch Off",
                              "Number Invalid","Waiting"];
          const callresult1 = ["Token Terms Accepted – Booking Discussion", "Budget Shared – Awaiting Options",
                                "Interested – Wants More Options"," Budget Approved – Awaiting Shortlist","Final Deal Discussion Pending","Possession Status Confirmed",
                                "Wants Legal/Document Review","Need More Inventory Options"];
          const emailsubjects_purpose = ["Payment Reminder", "Agreement Reminder","Follow-Up","Meeting","Loan Discussion","Meeting","Negotiation Discussion","Other","Registry Preparation & Timeline",
                "Matched Deal Update","Feedback","Document","Site Visit Scheduling","Reschedule Attempt","Payment Follow-Up","Transactional Email",
                "Meeting/Call Setup"," Initial Meeting Request"," Follow-Up Reminder"," Reconnect Post-Site Visit"," Urgency / Reminder",
                "After Site Visit","Document Sharing","Booking Step","Occasion-based","Greeting","General Follow-Up","Informational","Recap Email",
                "Meeting Follow-Up"]
          const emaildirections=["Outgoing", "Inccoming"]
          const emailstatus = ["Read", "Delivered","Undelivered","Bounced","Sent & Replied","Sent","No Response",
                "Read & Replied","Unread","Replied","Read Only","Replied","Ignored","Clicked","Downloaded","Opened","No Response"]
          const meetingreason1 = ["Discuss For Deal", "Requirement","Site Visit","Meeting","Revival Meeting",
            "Cold Lead Revival","Owner Meeting","Broker Meeting","Builder Meeting", "Requirement Meeting","Shortlisting Discuss",
            "Post-Visit Feedback","Negotiation Meeting","Token/Booking","Deal Closing","Documentation Required"]
          const meetingstatus1 = ["Conducted", "Postponed","Cancelled"];
          const meetingresult1 = ["Interested", "Just Enquiry","Low Budget","Location Mismatch","Enquiry For Friend",
            "Cancelled","Not Interested","Requirement Updated","Price/Details Updated","Properties Exchanged","New Pricing Shared",
            "Requirement Captured","Shortlisted Finalized","Liked Property","Wants to Negotiate","Price Discussion","Token Received",
            "Buyer Backed Out","Registry Done","Docs Clear","Issue Found"]
          const sitevisit_visittype1 =["Site Visit", "Revisit","Online Visit","Developer Sample Vist"];
          const sitevisit_status1 = ["Conducted", "Postponed","Did Not Visit","Cancelled","Rescheduled"];
          const sitevisit_result1 = ["Interested", "Token Discussion","Shortlisted","Second Visit Required",
            "Family Discussion","Need More Options","Budget Issue","Postponed","Visit Cancelled","Visit Not Attended","Location Mismatch",
            "Not Interested"]
            
                  const fetchdataforcallfields=async()=>
                    {
                      
                      try {
                        const resp=await api.get('viewleadscore')
              
                        const newReasons = resp.data.score.map(item => item.reason);
                        const combinedReasons = Array.from(new Set([...callreasons, ...newReasons]));
                        setcallreason(combinedReasons)
    
                        const newdirection = resp.data.score.map(item => item.direction);
                        const combineddirections = Array.from(new Set([...calldirections, ...newdirection]));
                        setcalldirection(combineddirections)
    
                        const newstatus = resp.data.score.map(item => item.status);
                        const combinedstatus = Array.from(new Set([...callstatus1, ...newstatus]));
                        setcallstatus(combinedstatus)
    
                        const newresult = resp.data.score.map(item => item.result);
                        const combinedresult = Array.from(new Set([...callresult1, ...newresult]));
                        setcallresult(combinedresult)
    
                        const newsubject = resp.data.score.map(item => item.email_category);
                        const combinedcategory = Array.from(new Set([...emailsubjects_purpose, ...newsubject]));
                        setmailsubject(combinedcategory)
    
                        const newemaildirection = resp.data.score.map(item => item.email_direction);
                        const combinedemaildirection = Array.from(new Set([...emaildirections, ...newemaildirection]));
                        setmaildirection(combinedemaildirection)
    
                        const newemailstatus = resp.data.score.map(item => item.email_status);
                        const combinedemailstatus = Array.from(new Set([...emailstatus, ...newemailstatus]));
                        setmailstatus(combinedemailstatus)
                        
                        const newemeetingreason = resp.data.score.map(item => item.meeting_reason);
                        const combinedmeetingreason = Array.from(new Set([...meetingreason1, ...newemeetingreason]));
                        setmeetingreason(combinedmeetingreason)
                        
                        const newemeetingstatus = resp.data.score.map(item => item.meeting_status);
                        const combinedmeetingstatus = Array.from(new Set([...meetingstatus1, ...newemeetingstatus]));
                        setmeetingstatus(combinedmeetingstatus)
                        
                        const newemeetingresult = resp.data.score.map(item => item.meeting_result);
                        const combinedmeetingresult = Array.from(new Set([...meetingresult1, ...newemeetingresult]));
                        setmeetingresult(combinedmeetingresult)
    
                        const newsitevisitvisittype = resp.data.score.map(item => item.sitevisit_visittype);
                        const combinedsitevisitvisittype = Array.from(new Set([...sitevisit_visittype1, ...newsitevisitvisittype]));
                        setsitevisit_visittype(combinedsitevisitvisittype)
    
                        const newsitevisitstatus = resp.data.score.map(item => item.sitevisit_status);
                        const combinedsitevisitstatus = Array.from(new Set([...sitevisit_status1, ...newsitevisitstatus]));
                        setsitevisit_status(combinedsitevisitstatus)
    
                        const newsitevisitresult = resp.data.score.map(item => item.sitevisit_result);
                        const combinedsitevisitresult = Array.from(new Set([...sitevisit_result1, ...newsitevisitresult]));
                        setsitevisit_result(combinedsitevisitresult)
    
                      } catch (error) {
                        console.log(error);
                      }
                    
                    }


    //=============================================== fetch all data from leadscore end====================================================


    const[documents,setdouments]=useState([])

    useEffect(() => {
      if (lead && lead.document_name && lead.document_no && lead.document_pic) {
        // Merging the arrays together
        const mergedDocuments = lead.document_name.map((name, index) => ({
          name,
          number: lead.document_no[index],
          pic: lead.document_pic[index]
        }));
        setdouments(mergedDocuments);
      }
    }, [lead]);
  
    const[deal,setdeal]=useState([])
    const viewdeal=async()=>
    {
      const resp=await api.get('viewdeal')
      setdeal(resp.data.deal)
      try {
        
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>
    {
      viewdeal()
    },[])

    const[filterdeal,setfilterdeal]=useState([])
    

  React.useEffect(() => {
    if (deal.length > 0) {
     
        const price1 = lead.budget_min;
        const price2 = lead.budget_max;
        const requirment = lead.requirment === 'Buy' ? 'Sale' : lead.requirment;
  
        // Filter leads based on the current deal's criteria
        const filterdeals = deal.filter(
          (item) =>
            item.available_for === requirment &&
            item.expected_price >= parseFloat(price1) &&
            item.expected_price <= parseFloat(price2)
        );
      
        
       setfilterdeal(filterdeals)
   
      
    }
  }, [deal]);

 
  

    const formattedDate = new Date(lead.lastcommunication).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      

      const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'unit_no', name: 'Unit_No.' },
        { id: 'project_name', name: ' Project' },
        { id: 'size', name: ' Size' },
        { id: 'available_from', name: 'Available_From' },
      ];
      const allColumnsdocuments = [
        { id: 'sno', name: '#' },
        { id: 'document_name', name: 'Document Name' },
        { id: 'document_no', name: 'Document No.' },
        { id: 'document_pic', name: 'View' },
      ];
      const allColumnstask = [
        { id: 'sno', name: '#' },
        { id: 'activity_type', name: 'Type' },
        { id: 'start_date', name: 'Date' },
        { id: 'status', name: 'Status' },
      ];
      const allColumnsunit = [
        { id: 'sno', name: '#' },
        { id: 'unit_no', name: 'Unit No' },
        { id: 'project', name: 'Project' },
        { id: 'add_size', name: 'Size' },
        { id: 'relation', name: 'Relation' },
      ];
  
      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          lineHeight:"15px"
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
     
      const [isTableVisible, setIsTableVisible] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility = () => {
        setIsTableVisible(prevState => !prevState);
      };

      const [isTableVisible1, setIsTableVisible1] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility1 = () => {
        setIsTableVisible1(prevState => !prevState);
      };

      
      const [isTableVisible2, setIsTableVisible2] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility2 = () => {
        setIsTableVisible2(prevState => !prevState);
      };

      
      const [isTableVisible3, setIsTableVisible3] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility3 = () => {
        setIsTableVisible3(prevState => !prevState);
      };

         
      const [isTableVisible4, setIsTableVisible4] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility4 = () => {
        setIsTableVisible4(prevState => !prevState);
      };

      const [alltask,setalltask]=useState([])

      const[sitevisitdata,setsitevisitdata]=useState([])
      const sitevisittask=async()=>
      {
        try {
            const resp=await api.get('viewsitevisit')
            setsitevisitdata(resp.data.sitevisit)
            
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[meetingdata,setmeetingdata]=useState([])
      const meeting=async()=>
      {
        try {
            const resp=await api.get('viewmeetingtask')
            setmeetingdata(resp.data.meetingtask)
           
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[maildata,setmaildata]=useState([])
      const mail=async()=>
      {
        try {
            const resp=await api.get('viewmailtask')
            setmaildata(resp.data.mail_task)
          
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[calldata,setcalldata]=useState([])
      const call=async()=>
      {
        try {
            const resp=await api.get('viewcalltask')
            setcalldata(resp.data.call_task)
          
            
        } catch (error) {
            console.log(error);
            
        }
      }
      useEffect(()=>
    {
        sitevisittask()
        meeting()
        mail()
        call()
    },[])

      useEffect(()=>
        {
          const combinealltask=[...sitevisitdata,...meetingdata,...maildata,...calldata]
        
          const fullNames= `${lead.title} ${lead.first_name} ${lead.last_name}`
        
          const filteredtasks = combinealltask.filter(task => 
            (typeof fullNames === 'string' ? [fullNames] : fullNames).some(fullName => task.lead.includes(fullName))
        );
        
          
          setalltask(filteredtasks)
    
        },[sitevisitdata,meetingdata,maildata,calldata])
  
    

    // const[matchsitevisitdata,setmatchsitevisitdata]=useState([])
    // const matchLeadData = (site) => {
    //     const [title, firstName, lastName] = site.lead.split(" "); // Split full name into title, first name, last name
      
    //     if (
    //       lead.title === title &&
    //       lead.first_name === firstName &&
    //       lead.last_name === lastName
    //     ) {
    //         setmatchsitevisitdata((prevData) => [...prevData, site]);
    //         setalltask((prevData) => [...prevData, site]);
    //     }
    //   };

     




    // useEffect(() => {
    //     if (sitevisitdata.length > 0) {
    //       sitevisitdata.forEach((site) => {
    //         if (site.lead) {
    //           // Now only need to match directly with site.lead
    //           matchLeadData(site); 
    //            // Assuming site contains lead.title, lead.first_name, lead.last_name
    //         }
    //       });
    //     }
    //   }, [sitevisitdata]);

    //   const[matchmeetingdata,setmatchmeetingdata]=useState([])
    //   const matchleaddatawithmeeting = (meeting) => {
    //       const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
        
    //       if (
    //         lead.title === title &&
    //         lead.first_name === firstName &&
    //         lead.last_name === lastName
    //       ) {
    //         setmatchmeetingdata((prevData) => [...prevData, meeting]);
    //         setalltask((prevData) => [...prevData, meeting]);
    //       }
    //     };
  
  
  
  
    //   useEffect(() => {
    //       if (meetingdata.length > 0) {
    //         meetingdata.forEach((meeting) => {
    //           if (meeting.lead) {
    //             // Now only need to match directly with site.lead
    //             matchleaddatawithmeeting(meeting);  // Assuming site contains lead.title, lead.first_name, lead.last_name
    //           }
    //         });
    //       }
    //     }, [meetingdata]);

    //     const[matchmaildata,setmatchmaildata]=useState([])
    //     const matchmaildatawithlead = (mail) => {
    //         // const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
          
    //         if (
    //           lead.title === mail.title2 &&
    //           lead.first_name === mail.first_name &&
    //           lead.last_name === mail.last_name
    //         ) {
    //             setmatchmaildata((prevData) => [...prevData, mail]);
    //             setalltask((prevData) => [...prevData, mail]);
    //         }
    //       };
    
    
    
    
    //     useEffect(() => {
    //         if (maildata.length > 0) {
    //           maildata.forEach((mail) => {
               
    //               // Now only need to match directly with site.lead
    //               matchmaildatawithlead(mail);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                
    //           });
    //         }
    //       }, [maildata]);
    

    //       const[matchcalldata,setmatchcalldata]=useState([])
    //       const matchcalldatawithlead = (call) => {
    //            const [title, firstName, lastName] = call.lead.split(" "); // Split full name into title, first name, last name
            
    //           if (
    //             lead.title === title &&
    //             lead.first_name === firstName &&
    //             lead.last_name === lastName
    //           ) {
    //             setmatchcalldata((prevData) => [...prevData, call]);
    //             setalltask((prevData) => [...prevData, call]);
    //           }
    //         };
      
      
      
      
    //       useEffect(() => {
    //           if (calldata.length > 0) {
    //             calldata.forEach((call) => {
                 
    //                 // Now only need to match directly with site.lead
    //                 matchcalldatawithlead(call);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                  
    //             });
    //           }
    //         }, [maildata]);

          // console.log(alltask);
          


            const [imagePreview, setImagePreview] = useState(null);
            const [openPreview, setOpenPreview] = useState(false);
          
            const handlePreviewClick = (imageUrl) => {
              setImagePreview(imageUrl);
              setOpenPreview(true); // Open the preview modal
            };
          
            const handleClosePreview = () => {
              setOpenPreview(false);
              setImagePreview(null); // Close the modal
            };


            // Add some basic styles for modal
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '80vh',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: '5px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};


function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  // Get day suffix (st, nd, rd, th)
  let suffix = 'th';
  if (day === 1 || day % 10 === 1) suffix = 'st';
  if (day === 2 || day % 10 === 2) suffix = 'nd';
  if (day === 3 || day % 10 === 3) suffix = 'rd';

  // Get hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // Handle the case for 12 AM/PM
  minutes = minutes < 10 ? '0' + minutes : minutes; // Ensure minutes are always 2 digits

  // Format the date and time as "1st Jan 2025, 11:22 AM"
  return `${day}${suffix} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}


React.useEffect(()=>{fetchcdata()},[])


const [flattenedUnits, setFlattenedUnits] = useState([]);
const fetchcdata=async(event)=>
{
  
  try {
    const resp=await api.get('viewproject')
    const flattened = [];
      resp.data.project.forEach((project) => {
        if (Array.isArray(project.add_unit)) {
          // Flatten the add_unit array for each project
          const units = project.add_unit.flatMap((unitArray) => unitArray);
          flattened.push(...units);  // Add flattened units to the array
        } else {
          console.error('add_unit is not an array or is undefined');
        }
      });

      // Now update the flattenedUnits state with the flattened array
      setFlattenedUnits(flattened);

    // Log the flattened units
  
  } catch (error) {
    console.log(error);
  }

}

// console.log(flattenedUnits);

const [matchunit, setmatchunit] = useState([]); // To store matched data





useEffect(() => {
  const matchLeadWithUnit = async () => {
    let matchedUnits = []; // Temp array to store matched units

    // Iterate over each unit in flattenedUnits
    for (let item of flattenedUnits) {
      let matched = false; // Flag to check if a match is found

      // Check owner_details array for matches
      for (let owner of item.owner_details) {
        //  console.log(owner.title);
        //  console.log(owner.first_name);
        //  console.log(owner.last_name);
        //  console.log(lead.title);
        //  console.log(lead.first_name);
        //  console.log(lead.last_name);
        
        // const owner = await fetchOwnerDetails(ownerId); // Fetch owner details by ID
        if (owner && owner.title === lead.title && owner.first_name === lead.first_name && owner.last_name === lead.last_name) {
          matchedUnits.push({ ...item, matchedData: owner });
          matched = true; // Mark as matched
          break; // Break the loop once a match is found
        }
      }

      // If no match found in owner_details, check associated_contact
      if (!matched) {
        for (let contact of item.associated_contact) {
          // const contact = await fetchContactDetails(contactId); // Fetch contact details by ID
          if (contact && contact.title === lead.title && contact.first_name === lead.first_name && contact.last_name === lead.last_name) {
            matchedUnits.push({ ...item, matchedData: contact });
            break; // Break the loop once a match is found
          }
        }
      }
    }

    // Update state with the matched units
    setmatchunit(matchedUnits);
  };

  // Trigger the matching function
  matchLeadWithUnit();
}, [flattenedUnits]);


// ==============================================log a call model start===================================================================

const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
const [outcome, setoutcome] = useState(["Intrested", "Not Intrested", "Left Voicemail", "No Answer"]);
const[allactivity,setallactivity]=useState([])
const[filterdata,setfilterdata]=useState([])
const viewallactivity=async()=>
{
  try {
    const resp=await api.get('viewactivity')
    const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
    const filteredActivities = resp.data.activity.filter((activity) => {
      return activity.lead === fullname; // Filter based on the full name
    });
    setallactivity(filteredActivities)
    setfilterdata(filteredActivities)
    
  } catch (error) {
    console.log(error);
    
  }
}
useEffect(()=>
{
  viewallactivity()
},[])




const[activity,setactivity]=useState({activity_name:"", call_outcome:"", activity_note:"",lead:"",
  direction:"",status:"",date:"",duration:"",intrested_inventory:"",message:"",subject:"",viewcount:0,
  activity_note1:"",edit_field:"",edit_value:"",task_title:""})

const [show1, setshow1] = useState(false);

const handleClose1 = () => setshow1(false);
const handleShow1=async()=>
{
      setshow1(true);
      const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
      setactivity({...activity,activity_name:"call",lead:fullname})
}

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']  // Allows the user to clear formatting
  ],
};

const modules1 = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link'],
    // [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    // ['clean']  // Allows the user to clear formatting
  ],
};

const handleNoteChange = (value) => {
  setactivity({ ...activity, activity_note: value });
};

      const addactivity=async()=>
      {
        try {
          const resp=await api.post('addactivity',activity)
          if(resp.status===200)
          {
            Swal.fire({
              icon: 'success',
              title: 'Activity Saved',
              text: 'Your activity has been saved successfully!',
            });
            handleClose1()
          }
          setTimeout(() => {
            window.location.reload()
          }, 1000);
          
        } catch (error) {
          console.log(error);
          
        }
      }

      const deleteactivity=async(id)=>
      {
        try {
          const resp=await api.delete(`removeactivity/${id}`)
          if(resp.status===200)
            {
              Swal.fire({
                icon: 'success',
                title: 'Activity Deleted',
                text: 'Your activity has been deleted successfully!',
              });
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            }
          
        } catch (error) {
          console.log(error);
          
        }
      }
 

      const [show2, setshow2] = useState(false);

const handleClose2 = () => setshow2(false);
const handleShow2=async(e)=>
{
      setshow2(true);
}

const[newoutcome,setnewoutcome]=useState("")
const addoutcome = () => {
  // Make sure the new outcome is not empty
  if (newoutcome.trim() !== "") {
    setoutcome(prevOutcome => [...prevOutcome, newoutcome]);  // Add new outcome to the array
    handleClose2();  // Close the modal or perform any other action
    setnewoutcome(""); // Clear the newoutcome input field
  }
};


const handleCopy = () => {
  // Use the Clipboard API to copy the text to the clipboard
  navigator.clipboard.writeText(lead.mobile_no)
    .then(() => {
      // Optional: alert or feedback to user that the text was copied
      Swal.fire({
        icon: 'success',
        text: 'Text copied to clipboard',
      });
    })
    .catch((err) => {
      // Optional: handle error if clipboard write fails
      console.error("Failed to copy text: ", err);
    });
};


const[sitevisitdata1,setsitevisitdata1]=useState([]);
const fetchsitevisitdataformeeting=async(event)=>
{
  
  try {
    const resp=await api.get('viewsitevisit')
    const result = resp.data?.sitevisit?.flatMap((item) => item.intrested_inventory) || [];
    setsitevisitdata1(result)
  } catch (error) {
    console.log(error);
  }

}

useEffect(()=>
  {
    fetchsitevisitdataformeeting()
  },[])

// ==============================================log a call model end=================================================================





// /=================================================internal notes start===========================================================

const [selectedOption, setSelectedOption] = useState("Internal Notes"); // Set the default value to "Internal Notes"

const handleChange = (event) => {
  const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
  setSelectedOption(event.target.value);
  setactivity({...activity,activity_name:"email",lead:fullname})

};

const templates = {
  template1: "Hello, \n\nI hope this email finds you well. I wanted to follow up on our previous conversation regarding property. Please let me know if you have any questions.\n\nBest regards,\nDigvijay Kumar",
  template2: "Hi there, \n\nI just wanted to remind you about the upcoming event on [date]. It will be held at Noida. Please feel free to reach out if you need any additional information.\n\nSincerely,\nDigvijay Kumar",
  template3: `Dear sir, \n\nWe are excited to inform you that your application has been approved. Please find attached the documents with further details about the next steps.\n\nBest regards,\nDigvijay Kumar`
};
const[message,setmessage]=useState("")
const[subject,setsubject]=useState("")
const [selectedTemplate, setSelectedTemplate] = useState('');
const [attachments, setAttachments] = useState([]);

const { getRootProps, getInputProps } = useDropzone({
  onDrop: (acceptedFiles) => {
    setAttachments(acceptedFiles); // Store selected files
  },
});

const handleTemplateSelect = (e) => {
  const templateKey = e.target.value; // Get selected template key
  setSelectedTemplate(templateKey); // Set the selected template
  const selectedTemplateContent = templates[templateKey] || ''; // Get the template content

  // Convert '\n' to '<br>' for HTML email formatting
  const htmlFormattedMessage = selectedTemplateContent.replace(/\n/g, '<br>');
  
  // Set the message state with the formatted message (HTML-friendly)
  setmessage(htmlFormattedMessage); 
  setactivity({...activity,message:htmlFormattedMessage})
};

const sendmail=async(e)=>
  {
    e.preventDefault();
    const formData = new FormData();

// Add the subject, message, and recipient email to form data
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('emails', lead.email);
        
        // Append the files to form data
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });
    try {
      
      const resp=await api.post(`contact/sendmail`,formData)
      
      if(resp.status===200)
      {
        Swal.fire({
          icon: 'success',
          title: 'Mail',
          text: 'Mail Sent Successfully!',
        });
        const resp1=await api.post('addactivity',activity)
     setTimeout(() => {
      window.location.reload()
     }, 2000);
    
      }
     
    } catch (error) {
      toast.error(error.response.data,{ autoClose: 2000 });
    }
  }

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selectedValues = event.target.value;
    setSelectedOptions(selectedValues);

    // Update the subject with selected field values from the lead object
    const updatedSubject = selectedValues
      .map((field) => {
        switch (field) {
          case "name":
            return lead.title + " " + lead.first_name + " " + lead.last_name;
          case "mobile":
            return lead.mobile_no;
          case "city":
            return lead.city;
            case "email":
              return lead.email;
              case "company":
                return lead.company_name;
                case "designation":
                  return lead.designation;
          default:
            return "";
        }
      })
      .join(", "); // Join selected fields with a comma and space
    setsubject(updatedSubject); // Set the subject with the dynamically updated value
  };

const handlemailmessage=(value)=>
{
  setmessage(value)
  setactivity({...activity,message:value})
}
const [viewCount1, setViewCount1] = useState(0);
const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = async(id) => {
    setIsExpanded(!isExpanded);  // Toggle the expanded state
    if (!isExpanded) {
      try {
        const resp = await api.get(`viewactivitybyid/${id}`);
        console.log(resp);
        
        const currentViewCount = Number(resp.data.activity[0].viewcount); 
        const newViewCount = currentViewCount + 1;
        console.log(currentViewCount);
        
        const resp1=await api.put(`updateactivity/${id}`,{ viewCount1: newViewCount })
        
      } catch (error) {
        console.log(error);
        
      }
    }

  };

  useEffect(() => {
    // Access the editor container and editor area after the component is mounted
    const quillEditor = document.querySelector('.my-quill-editor .ql-container');
    const quillContent = document.querySelector('.my-quill-editor .ql-editor');

    if (quillEditor) {
      quillEditor.style.border = 'none';
    }
    if (quillContent) {
      quillContent.style.border = 'none';
    }
  }, []);
  
const handleactivitynoteschange=(value)=>
{
  const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
  setactivity({...activity,activity_note1:value,activity_name:"notes",lead:fullname})
}


// console.log(alltask);

//=================================================== internal notes end=============================================================
      
//======================================== filter activity start===============================================================


 const [showDropdown, setShowDropdown] = useState(false);
 const activityname = [
  'call', 
  'email', 
  'notes',
  'edit',
  'complete call task',
  'complete mail task',
  'complete meeting task',
  'complete site visit task',
  'create call task',
  'create mail task',
  'create meeting task',
  'create site visit task',
  'deal created',
  'add inventory',
  'added docuemnt'
];


const dropdownRef = useRef(null);
  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 const [selectactivity, setselectactivity] = useState([]);

 const handlefilterCheckboxChange = (activity) => {
   // Update selectactivity based on the checkbox change
   const updatedSelections = selectactivity.includes(activity)
     ? selectactivity.filter((p) => p !== activity)  // Remove the activity if already selected
     : [...selectactivity, activity];  // Add the activity if it's not selected
 
   setselectactivity(updatedSelections);
 
   // Filter the data based on selected activities (activity_name)
   const newFilteredData = filterdata.filter((item) =>
     updatedSelections.length === 0 || updatedSelections.includes(item.activity_name)
   );
 
   // Set allactivity with the newly filtered data (no need to merge previous data)
   setallactivity(newFilteredData);
 };

 




// =================================================filter activity end============================================================
    
const [buttonText, setButtonText] = useState("→"); // Button text
const [isSmall, setIsSmall] = useState(false);

  // Function to toggle size
  const handleToggle = () => {
    setIsSmall(!isSmall); // Toggle the state value
    setButtonText(isSmall ? "→" : "←");
  };


  const [calltask,setcalltask]=useState({activity_type:"",title:"",reason:"",lead:"",executive:"",remarks:"",complete:"",due_date:"",due_time:"",title2:"",
                      first_name:"",last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",direction:"",status:"",date:"",duration:"",
                      result:"",intrested_inventory:"",feedback:""})

  const [mailtask,setmailtask]=useState({activity_type:"Mail",title:"",executive:"",lead:"",project:[],block:[],inventory:[],subject:"",remarks:"",
                        complete:"",due_date:"",due_time:"",direction:"",status:"",date:"",feedback:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",})
                     
                     
  const [meetingtask,setmeetingtask]=useState({activity_type:"Meeting",title:"",executive:"",lead:"",location_type:"",location_address:"",
                       reason:"",project:[],block:[],inventory:[],remark:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",
                       complete:"",status:"",meeting_result:"",date:"",feedback:""})                  
                     
    const [sitevisit,setsitevisit]=useState({activity_type:"SiteVisit",title:"",executive:"",project:[],block:[],sitevisit_type:"",
                       inventory:[],lead:"",confirmation:"",remark:"",participants:"",remind_me:"",start_date:"",end_date:"",complete:"",stage:"",title2:"",first_name:"",
                       last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",status:"",intrested_project:[],intrested_block:[],intrested_inventory:[],date:"",feedback:""})                  
                        const handler1=()=>
                        {
                            document.getElementById("date1").style.color="black"
                        }

                        const [show3, setshow3] = useState(false);

                        const handleClose3 = () => setshow3(false);
                        const handleShow3=()=>
                        {
                              setshow3(true);
                        }


                        const [show4, setshow4] = useState(false);

                        const handleClose4 = () => setshow4(false);
                        const handleShow4=()=>
                        {
                              setshow4(true);
                        }

                        const [show5, setshow5] = useState(false);

                        const handleClose5 = () => setshow5(false);
                        const handleShow5=()=>
                        {
                              setshow5(true);
                        }

                        const [show6, setshow6] = useState(false);

                        const handleClose6 = () => setshow6(false);
                        const handleShow6=()=>
                        {
                              setshow6(true);
                        }



  const[taskid,settaskid]=useState("")
  const completetask=(item)=>
  {
    if(item.activity_type==="Call" && item.complete==="")
    {
      const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
      setcalltask(item)
      handleShow3()
      settaskid(item._id)
      setactivity({...activity,activity_name:"complete call task",lead:fullname})
    }
    else if(item.activity_type==="Mail" && item.complete==="")
      {
        const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
        setmailtask(item)
        handleShow4()
        settaskid(item._id)
        setactivity({...activity,activity_name:"complete mail task",lead:fullname})
      }
      else if(item.activity_type==="Meeting" && item.complete==="")
        {
          const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
          setmeetingtask(item)
          handleShow5()
          settaskid(item._id)
          setactivity({...activity,activity_name:"complete meeting task",lead:fullname})
        }
        else if(item.activity_type==="SiteVisit" && item.complete==="")
          {
            const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
            setsitevisit(item)
            handleShow6()
            settaskid(item._id)
            setactivity({...activity,activity_name:"complete site visit task",lead:fullname})
          }
    else
    {
      Swal.fire({
        icon:"success",
        text:"Task already completed..."
      })
    }
  }
  const calltaskdetails=async()=>
    {
   
     const updatedCallTask = { ...calltask, complete:"true" };
    
    try {
    const resp=await api.put(`updatecalltask/${taskid}`,updatedCallTask)
    const resp1=await api.post('addactivity',activity)
    if(resp.status===200)
    {
    toast.success("task completed success")
    checkrequirmentforms(updatedCallTask)
 
    }
} catch (error) {

    toast.error(error.message)
}
}


const mailtaskdetails=async()=>
  {
   

      // Update state
      const updatedMailTask = { ...mailtask, complete:"true" };
      try {
          const resp=await api.put(`updatemailtask/${taskid}`,updatedMailTask)
          const resp1=await api.post('addactivity',activity)
          if(resp.status===200)
          {
              toast.success(resp.data.message)
            checkrequirmentforms(updatedMailTask)
              
          }
      } catch (error) {
          
          toast.error(error.message)
      }
    }


       

    const meetingdetails = async () => {
    
      const updatemeetingtask = { ...meetingtask, complete:"true" };
    
      try {
        let isValidCombination = true;
        if (isValidCombination) {
          const resp = await api.put(`updatemeetingtask/${taskid}`, updatemeetingtask);
          const resp2=await api.post('addactivity',activity)
          // If successful, show a success toast and reload
          if (resp.status === 200) {
            toast.success("Task Completed", { autoClose: 2000 });
            checkrequirmentforms(updatemeetingtask)
          }
        } else {
          toast.error("Some project/block/unit combinations were invalid. Please check your data.");
        }
    
      } catch (error) {
        // Handle any errors during the process
        toast.error("An error occurred. Please check your data and try again.");
      }
    };


// ===================================sitevisit complete code start================================================

    const[dealdata,setdealdata]=useState([])
    const fetchdealdata=async(event)=>
        {
          
          try {
            const resp=await api.get('viewdeal')
            const all=(resp.data.deal)
            setdealdata(all)
          } catch (error) {
            console.log(error);
          }
        
        }

        useEffect(()=>
        {
          fetchdealdata()
        },[])

 const[updatestage,setupdatestage]=useState("")
    const[updatestage1,setupdatestage1]=useState("")


  const handleleadstatuschange =  (e) => {
    const newStatus = e.target.value;

    // Update the status first
    setsitevisit((prevState) => {
        return {
            ...prevState,
            status: newStatus
        };
    });

    // Now check if status is "Conducted" and update the stage
    if (newStatus === "Conducted") {
        setupdatestage("Opportunity");
        setupdatestage1("Quote");
    }
    else if (newStatus === "Did Not Visit" || "Not Intersted>") {
        setupdatestage("Prospect");
        setupdatestage1("Open");
    }
};


const [siteprojects, setsiteprojects] = useState([]);
const [siteunits, setsiteunits] = useState([]);

const handlesiteprojectchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setsiteprojects(selectproject);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, intrested_project: selectproject };
      fetchdatabysiteprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const fetchdatabysiteprojectname = async (projectNames) => {

    try {
      const fetchPromises = projectNames.map(async (projectName) => {
        const resp = await api.get(`viewdealbyproject/${projectName}`);
        return resp.data.deal; // Assuming resp.data.project is an array of units for that project
      });
  
      const results = await Promise.all(fetchPromises);
      const allFetchedUnits = results.flat();
      setsiteunits(allFetchedUnits); // Set the units to the flattened result
    } catch (error) {
      console.log(error);
    }
  };


    const[allblock,setallblock]=useState([])
  const handleallblockchange = (event) => {
    const {
      target: { value },
    } = event;
  
    // Convert value to an array if it's a string (for multiple selection)
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    // Update the allblock state with full block.block-project combinations (for selected blocks)
    setallblock(selectblock);
  
    // Update the sitevisit state with only block.block values (not both block.block and block.project)
    setsitevisit((prev) => {
      const updatedSiteVisit = { 
        ...prev, 
        intrested_block: selectblock.map(item => item.split('-')[0]) // Store only block.block in sitevisit
      };
setactivity({...activity, edit_field: "block",edit_value:selectblock})
      return updatedSiteVisit;
    });
  };
  
  const[alldealblocks,setalldealblocks]=useState([])
    useEffect(() => {
      const dealblocks = dealdata.filter((item) =>
        sitevisit.intrested_project.some((project) => project === item.project)
      );
      setalldealblocks(dealblocks)
    }, [sitevisit.intrested_project]);
  
    const[allunit1,setallunit1]=useState([])
    const handleallunitschange1 = (event) => {
      const { target: { value } } = event;
    
      // Convert value to an array if it's a string (for multiple selection)
      const selectunits = typeof value === 'string' ? value.split(',') : value;
    
      // Extract only the unit_number from the selected values (split by '-')
      const unitNumbers = selectunits.map(item => item.split('-')[0]); // Get only the unit_number part
    
      // Update allunit1 state with the selected unit numbers
      setallunit1(selectunits);
    
      // Update the sitevisit state with selected units in intrested_inventory
      setsitevisit((prev) => {
        const updatedSiteVisit = { ...prev, intrested_inventory: selectunits }; // Store only unit numbers
        return updatedSiteVisit;
      });
    };
    
  



  function addFn1() {
                  
  setsitevisit((prevsite)=>({
    ...prevsite,
    intrested_inventory: [...sitevisit.intrested_inventory, ''],
    result: [...sitevisit.result, ''],
    action1: Array.isArray(prevsite.action1) ? [...prevsite.action1, ''] : ['']
  }));
};
const deleteall1=(index)=>
  {
   
    const newsitevisitintrestedinventory = sitevisit.intrested_inventory.filter((_, i) => i !== index);
    const newsitevisitresult = sitevisit.result.filter((_, i) => i !== index);
    const newsitevisitaction1 = sitevisit.action1.filter((_, i) => i !== index);
    
    setsitevisit({
      ...sitevisit,
      intrested_inventory: newsitevisitintrestedinventory,
      result: newsitevisitresult,
      action1:newsitevisitaction1
    });
  }
  const handlesitevisitinventorychange = (index, event) => {
    const newsitevisit = [...sitevisit.intrested_inventory];
    newsitevisit[index] = event.target.value;
    setsitevisit({
      ...sitevisit,
      intrested_inventory: newsitevisit
    });
  };
  const handlesitevisitresultchange = (index, event) => {
    const newresult = [...sitevisit.result];
    newresult[index] = event.target.value;
    setsitevisit({
      ...sitevisit,
      result: newresult
    });
  };

  const sitevisitdetails = async () => {
    
    const updatedsiteTask = { ...sitevisit, complete:"true" };
  
    try {
   
        const resp = await api.put(`updatesitevisittask/${taskid}`, updatedsiteTask);
        const resp2=await api.post('addactivity',activity)
  
        if (resp.status === 200) {
          toast.success("Task Completed", { autoClose: 2000 });
           checkrequirmentforms(updatedsiteTask)
  
        }
       else {
        toast.error("Some project/block/unit combinations were invalid. Please check your data.");
      }
  
    } catch (error) {
      // Handle any errors during the process
      toast.error("An error occurred. Please check your data and try again.");
    }
  };

// ====================================site visit complete code end============================================================

// =============================================check requirment form start for change score and stage==================================

useEffect(()=>{fetchleadscoredata()},[])
              const[leadscoredata,setleadscoredata]=useState([]);
              const fetchleadscoredata=async(event)=>
                {
                  try {
                    const resp=await api.get('viewleadscore')
                    setleadscoredata(resp.data.score)
                  } catch (error) {
                    console.log(error);
                  }
                }

    
        const[leaddata,setleaddata]=useState([]);
        const fetchleaddata=async()=>
        {
          
          try {
            const resp=await api.get('leadinfo')
            setleaddata(resp.data.lead)
          } catch (error) {
            console.log(error);
          }
        
        }

        useEffect(()=>
        {
          fetchcdata()

        },[])

   const checkrequirmentforms=(taskdata)=>
                      {
                        const matchleadscore=leadscoredata.filter((item)=>item.available_for===taskdata.activity_type)
                        matchleadscore.map((item)=>
                        {
                           if (
                            (
                            taskdata?.activity_type?.trim() === item?.available_for?.trim() &&
                            taskdata?.direction?.trim() === item?.direction?.trim() &&
                            taskdata?.reason?.trim() === item?.reason?.trim() &&
                            taskdata?.status?.trim() === item?.status?.trim() &&
                            taskdata?.result?.trim() === item?.result?.trim()
                          ) ||
                          (
                            taskdata?.activity_type?.trim() === item?.available_for?.trim() &&
                            taskdata?.direction?.trim() === item?.email_direction?.trim() &&
                            taskdata?.subject?.trim() === item?.email_category?.trim() &&
                            taskdata?.status?.trim() === item?.email_status?.trim()
                          ) ||
                          (
                            taskdata?.activity_type?.trim() === item?.available_for?.trim() &&
                            taskdata?.reason?.trim() === item?.meeting_reason?.trim() &&
                            taskdata?.status?.trim() === item?.meeting_status?.trim() &&
                            taskdata?.meeting_result?.trim() === item?.meeting_result?.trim()
                          ) ||
                          (
                            taskdata?.activity_type?.trim() === item?.available_for?.trim() &&
                            taskdata?.sitevisit_type?.trim() === item?.sitevisit_visittype?.trim() &&
                            taskdata?.status?.trim() === item?.sitevisit_status?.trim() &&
                            (taskdata?.result || "").includes(item?.sitevisit_result?.trim())
                          )
                      )
                            
                       
                            
                            {
                               const formMap = {
                                "Call Scheduled Form":"Call scheduled",
                                "Mail Scheduled Form":"Mail scheduled",
                                "Meeting Scheduled Form":"Meeting scheduled",
                                "Site Visit Scheduled Form":"Sitevisit scheduled",
                                "Call Completed Form":"Call",
                                "Mail Completed Form":"Mail",
                                "Meeting Completed Form":"Meeting",
                                "Site Visit Completed Form":"SiteVisit",
                                "Negotiation Form": "Negotiation",
                                "Requirment Form": "Requirement",
                              };
                               const requirements = item.stage_requirment || [];
                              const incompleteForms = [];
                              const usedFormDates = new Set();
  
                                requirements.forEach((formName) => {
                                const expectedRequirment = formMap[formName]?.toLowerCase();
  
                                console.log(expectedRequirment);
                                
                                if (expectedRequirment === "sitevisit" || expectedRequirment === "meeting" || expectedRequirment === "call" || expectedRequirment === "mail") {
                                  console.log("hello");
                                  
                               const match = alltask?.find((form) => {
                              
                                    const formDate = new Date(form.date);
                                    const itemDate = new Date(taskdata.date);
                                    // Zero the time part
                                        itemDate.setHours(0, 0, 0, 0);
                                        formDate.setHours(0, 0, 0, 0);
                                    const formKey = `${form.activity_type?.toLowerCase()}_${form.date}`;
                                   
                                    return (
                                      form.activity_type?.toLowerCase() === expectedRequirment &&
                                      form.complete === "true" &&
                                      itemDate <= formDate &&
                                      !usedFormDates.has(formKey)
  
                                      
                                    );
                                  });
                         
                                if (match) {
                                  const formKey = `${match.activity_type?.toLowerCase()}_${match.date}`;
                                  usedFormDates.add(formKey); // ✅ Mark as used
                                } else {
                                  incompleteForms.push(formName);
                                   // ❌ No match found for this requirement
                                }
                              }
                            
                                 if (expectedRequirment === "call scheduled" || expectedRequirment === "mail scheduled" || expectedRequirment === "meeting scheduled" || expectedRequirment === "sitevisit scheduled") {
                         
                          
                              
                                  const match = alltask?.find((form) => {
                                    const formDate = new Date(form.due_date ? form.due_date : form.start_date );
                                    const itemDate = new Date(taskdata.due_date ? taskdata.due_date : taskdata.start_date);
                                    // Zero the time part
                                        itemDate.setHours(0, 0, 0, 0);
                                        formDate.setHours(0, 0, 0, 0);
                                       
                                    const formKey = `${form.activity_type?.toLowerCase()}_${form.date}`;
                                    return (
                                      (form.activity_type?.toLowerCase() === expectedRequirment.split(" ")[0].toLowerCase()) &&
                                      itemDate <= formDate &&
                                      !usedFormDates.has(formKey)
                                    );
                                  });
                         
                                if (match) {
                                  const formKey = `${match.activity_type?.toLowerCase()}_${match.date}`;
                                  usedFormDates.add(formKey); // ✅ Mark as used
                                } else {
                                  incompleteForms.push(formName); // ❌ No match found for this requirement
                                }
                              }
                             
                             else if (expectedRequirment === "requirement") {
                              const matchedLead = leaddata.find(
                                (item) => `${item.title} ${item.first_name} ${item.last_name}` === taskdata.lead
                              );
  
                              const match1 = matchedLead?.requirement?.trim() !== "";
  
                                if (!match1) {
                                  incompleteForms.push(formName);
                                }
                              }
                              });
  
                               if (incompleteForms.length > 0) 
                                {
                                Swal.fire({
                                  icon: 'warning',
                                  title: '⚠️ Incomplete Forms Detected!',
                                  html: `
                                    <div style="color: #333; font-size: 16px;">
                                      <p><strong style="color: #007BFF;">${taskdata.lead}</strong> is missing the following forms:</p>
                                      <ul style="text-align: left; padding-left: 20px; color: #D9534F; font-weight: bold;">
                                        ${incompleteForms.map(form => `<li>📌 ${form}</li>`).join('')}
                                      </ul>
                                      <p style="margin-top: 10px; color: #5A5A5A;">
                                        Please <span style="color: #28a745; font-weight: bold;">complete</span> these forms to move to 
                                        <strong style="color: #17a2b8;">${item.leadstage}</strong> stage.
                                      </p>
                                    </div>
                                  `,
                                  background: '#fefefe',
                                  confirmButtonColor: '#28a745',
                                  confirmButtonText: 'OK, Got it!'
                                });
  
  
                                } 
  
                            }
                        })
                      }

// =========================================check requirment form end for change score and stage====================================


// ==========================================edit lead start=========================================================


const [leadinfo,setleadinfo]=useState({title:"Mr.",first_name:"",last_name:"",country_code:"+91 India",mobile_no:"",mobile_type:"Personal",
  email:"",email_type:"Personal",tags:"",descriptions:"",stage:"",lead_type:"",owner:[],team:"",visible_to:"",campaign:"",source:"",
  sub_source:"",channel_partner:"",intrested_project:"",
  requirment:"",property_type:[],purpose:"",nri:"",sub_type:[],unit_type:[],budget_min:"",budget_max:"",minimum_area:"",
  maximum_area:"",area_metric:"Sq Yard",search_location:"",street_address:"",range:"",range_unit:"",city2:"",area2:[],block:[],pincode2:"",country2:"",state2:"",
  lattitude:"",longitude:"",country3:"",state3:"",city3:"",area_project:[],block3:[],specific_unit:"",specific_unitdetails:"",funding:"",timeline:"",facing:[],road:[],direction:"",transaction_type:"",
  unit_type2:"",white_portion:"",furnishing:"",matched_deal:[],
  profession_category:[],profession_subcategory:[],designation:"",company_name:"",country_code1:"",company_phone:"",
  company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

  father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
  birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
  social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[]
 })

 const requirment=["Buy","Rent","Lease"];
                    const property_type=["Residential","Commercial","Agricultural","Industrial","Institutional"];
                 
                    const transaction_type=["Full White","Collecter Rate","50% White","75% White"];
                    const furnishing=["Furnished","Unfurnished","Semi Furnished"];
                    const funding=["Home Loan","Self Funding","Loan Against Property","Personal Loan","Business Loan"]
                    const timeline=["Urgent","More then 1 month","Not Confirmed","Within 15 days"]


                    const [show7, setshow7] = useState(false);

                    const handleClose7 = () => setshow7(false);
                    const[data1,setdata1]=useState([])
                    const handleShow7=async()=>
                    {
                      const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
                      if(lead)
                      {
                        setactivity({...activity,activity_name:"edit",lead:fullname})
                        try {
                          const resp=await api.get(`viewbyid/${lead._id}`)//here search contact by id
                          //  console.log(resp);
                          
                          setshow7(true);
                         
                          
                            setdata1(resp.data.lead[0])
                          
                          setleadinfo(resp.data.lead[0])
                          
                        } catch (error) {
                          console.log(error);
                        }
                      }
                      else
                      {
                        toast.error("please select only one")
                      }
                     
                    }
         
                    
                    useEffect(()=>{fetchcdatacompany()},[])

                    const[cdata,setcdata]=useState([]);
                    const[totalcompany,settotalcompany]=useState()
                    const fetchcdatacompany=async(event)=>
                    {
                      
                      try {
                        const resp=await api.get('viewcompany')
                        setcdata(resp.data.developer)
                        const countcompany=Array.isArray(resp.data.developer) ? resp.data.developer : [resp.data.developer]
                        settotalcompany(countcompany.length)
                        // setFilteredData(countcontact);
                      } catch (error) {
                        console.log(error);
                      }
                    
                    }



                    const professtiondetails = {
                      profession_category: ["Govt. Employed", "Private Employee","Self Employed","Retired","Business Man","Student","House Wife"],
                    
                      profession_subcategory: {
                        "Govt. Employed": ["Teacher", "Scientist","Doctor","Nurse","Clerk","Engineer","Accountant","Architect","Auditor","Police",
                                            "Mechanic","Security","Driver","Officer","Peon","Chef","Pilot","IT Person","Analyst","Sales Person",
                                            "Banker","Legal"],
                        "Private Employee": ["Officer", "Accountant", "Human Resources (HR)", "Sales Person", "Manager", "IT Person", 
                                                "Analyst", "Scientist", "Technicians", "Designer", "Author", "Videographer", "Director", 
                                                "Telle Caller", "Legel", "Executive Officer", "Operators", "Security", "Journalists", 
                                                "Doctor", "Nurse", "Teacher", "Facility", "Driver", "Contractor", "Consultant", "Chef", 
                                                "Artist", "Engineer", "Banker", "Legal", "Clerk", "Architect", "Auditor", "Mechanic", 
                                                "Peon", "Pilot"],
                      
                        "Self Employed": ["Designer", "Photographer","Videographer","Independent Artist","Illustrator","Writer","Digital Content Creator",
                                          "Social Media Influencer","Podcaster","Music Producer","Management Consultant","Financial Advisor","IT Consultant",
                                          "Business Strategist","Marketing Consultant","Life Coach","Career Counselor","Freelance Software Developer","Web Developer",
                                          "Data Analyst","App Developer","UX/UI Designer","Cybersecurity Consultant","Private Practitioner (Doctor)","Physiotherapist",
                                          "Dietitian or Nutritionist","Yoga Instructor","Personal Trainer","Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)",
                                          "Private Tutor","Test Preparation Coach","Online Educator","Language Trainer","Corporate Trainer","Independent Lawyer",
                                          "Chartered Accountant (CA)","Tax Consultant","Auditor","Financial Planner","Tailor","Carpenter","Blacksmith",
                                          "Jewelry Maker","Ceramic Artist","Real Estate Agent","Broker","Sales Representative","Freelance Chef","Event Planner",
                                          "Makeup Artist","Hairstylist","Wedding Photographer","Independent Farmer","Organic Produce Supplier","Horticulturist"],
                        
                        Retired: ["Teacher", "Scientist", "Doctor", "Nurse", "Clerk", "Engineer", "Accountant", "Architect", "Auditor", "Police",
                                  "Mechanic", "Security", "Driver", "Officer", "Peon", "Chef", "Pilot", "IT Person", "Analyst", "Sales Person", "Banker",
                                  "Legal", "Manager", "Operators", "Human Resources (HR)", "Freelance Graphic Designer", "Photographer", "Videographer",
                                  "Independent Artist", "Illustrator", "Writer (Author, Blogger, or Copywriter)", "Digital Content Creator", "Social Media Influencer",
                                  "Podcaster", "Music Producer", "Management Consultant", "Financial Advisor", "IT Consultant", "Business Strategist", "Marketing Consultant",
                                  "Life Coach", "Career Counselor", "Freelance Software Developer", "Web Developer", "Data Analyst", "App Developer", "UX/UI Designer",
                                  "Cybersecurity Consultant", "Private Practitioner (Doctor)", "Physiotherapist", "Dietitian or Nutritionist", "Yoga Instructor",
                                  "Personal Trainer", "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)", "Private Tutor", "Test Preparation Coach",
                                  "Online Educator", "Language Trainer", "Corporate Trainer", "Independent Lawyer", "Chartered Accountant (CA)", "Tax Consultant",
                                  "Auditor", "Financial Planner", "Tailor", "Carpenter", "Blacksmith", "Jewelry Maker", "Ceramic Artist", "Real Estate Agent",
                                  "Property Consultant", "Broker", "Sales Representative", "Freelance Chef", "Event Planner", "Makeup Artist", "Hairstylist",
                                  "Wedding Photographer", "Independent Farmer", "Organic Produce Supplier", "Horticulturist"
                        ],
                    
                        Student:["Investor"],
                    
                        "House Wife":["Investor"],
                        
                        "Business Man": ["Entrepreneurs", "Start-up Founders", "Retailer", "Wholesaler", "Importer/Exporter", "Distributor", "Trader",
                                          "Real Estate Developer", "Real Estate Investor", "Real Estate Agent", "Manufacturer", "Industrialist", "Financer",
                                          "Stock Trader", "Hotel Owner", "Resort Owner", "Travel Agency", "Restaurant Owner", "Agriculturist", "Dairy Business Owner",
                                          "IT Person", "Coaching Centre Owner", "Training Institute Owner", "Online Tutor", "Private Tutor", "Hospital Owner",
                                          "Wellness Centre Owner", "Fitness Centre Owner", "Advertising Agency Owner", "Film Producer", "Media House Owner",
                                          "Designer", "Transporter", "Courier Servicer", "Renewable Energy and Environment", "Boutique", "Salon Owner",
                                          "Security Service Provider", "Legal Firm Owner", "Digital Business", "Infrastructure Developer", "Poultry Farm Owner",
                                          "Handicrafts Business Owner", "Investment Banker", "Loan Consultant", "IT Company Owner", "Cloud Service Provider",
                                          "Emigration", "Catering", "Baker", "Car Dealership Owner", "Bike Dealership Owner", "Bike Rental Business Owner",
                                          "Workshop Owner", "Environmental Consultant", "Cold Storage Business Owner", "Film Studio Owner", "Sports Organizer",
                                          "Event Organizer", "Cloth Merchant"
                        ]
                        
                      },
                      designation: {
                        Teacher: ["Primary Teacher (PRT)","Trained Graduate Teacher (TGT)","Post Graduate Teacher (PGT)","Assistant Professor",
                                  "Professor","Principal","Education Officer","Laboratory Technicians","Corporate Trainers","E-learning Specialists",
                                  "Academic Counselors","Kindergarten Teacher","Subject Teacher","Senior Educator","Head of Department"],
                        Scientist: ["Junior Scientist","Scientist B/C/D","Senior Scientist","Chief Scientist","Director","Data Scientists",
                                    "Research Scientists","Product Developers","Research Associate","Senior Research Scientist","Lead Scientist"],
                        Doctor: ["Doctors","Medical Officer (MO)","Senior Medical Officer (SMO)","Specialist Doctor","Chief Medical Officer (CMO)","Director of Health Services",
                                "Physical Therapists","Dietitians","Resident Doctor","Consultant","Senior Specialist","Medical Director"],
                        Nurse:["Nurses","Auxiliary Nurse Midwife (ANM)","Staff Nurse","Nursing Superintendent","Chief Nursing Officer","Staff Nurse",
                                "Charge Nurse","Nursing Director"],
                        Clerk:["Lower Division Clerk (LDC)","Upper Division Clerk (UDC)","Assistant Section Officer (ASO)","Section Officer (SO)",
                                "Data Entry Clerk","Office Assistant","Administrative Clerk"],
                        Engineer:["Junior Engineer (JE)","Assistant Engineer (AE)","Executive Engineer (EE)","Chief Engineer",],
                        Accountant:["Junior Accountant","Senior Accountant","Accounts Officer","Senior Accounts Officer","Controller of Accounts",
                                    "Accountants","Payroll Specialists","Tax Consultants","Junior Accountant","Senior Accountant","Finance Controller",
                                    "Chief Financial Officer (CFO)","Accountants", "Financial Analysts","Auditors","Payroll Specialists","Tax Consultants"],
                        Architect:["Assistant Architect","Architect","Senior Architect","Chief Architect","Architectural Intern","Project Architect",
                                    "Design Director"],
                        Auditor:["Junior Auditor","Senior Auditor","Audit Officer","Senior Audit Officer","Principal Auditor","Auditors","Internal Auditor",
                                  "Risk Auditor","Audit Manager"],
                        Police:["Constable","Head Constable","Assistant Sub-Inspector (ASI)","Sub-Inspector (SI)","Inspector","Deputy Superintendent of Police (DSP)",
                                "Superintendent of Police (SP)","Inspector General of Police (IGP)","Director General of Police (DGP)"],
                        Mechanic:["Junior Mechanic","Senior Mechanic","Workshop Superintendent","Service Technician","Workshop Supervisor"],
                        Security:["Security Guard","Security Supervisor","Security Officer","Chief Security Officer","Safety Officers"],
                        Driver:["Driver (Light/Heavy Vehicle)","Senior Driver","Motor Vehicle Inspector","Drivers","Delivery Agents","Company Driver",
                                "Heavy Vehicle Driver","Personal Driver"],
                        Officer:["Probationary Officer (PO)","Administrative Officer","Gazetted Officer (Class A, B, C)","Deputy Secretary",
                                "Under Secretary","Joint Secretary","Secretary","Administrative Assistants","Chief Executive Officer (CEO)",
                                "Chief Financial Officer (CFO)","Chief Operating Officer (COO)","Vice Presidents (VPs)","Directors","Entrepreneurs",
                              "Administrative Assistants","Office Managers","Executive Assistants","Receptionists","PData Entry Operators"],
                        Peon:["Office Attendant","Multi-Tasking Staff (MTS)","Office Helper","Support Staff"],
                        Chef:["Cook","Head Cook","Catering Supervisor","Chefs","Commis Chef","Sous Chef","Executive Chef"],
                        Pilot:["Commercial Pilot","Helicopter Pilot","Fighter Pilot","Co-Pilot","Chief Pilot"],
                        "IT Person":["Junior Programmer","Software Developer","Software Engineer","Senior Software Engineer","IT Officer",
                                    "Software Developers","System Administrators","IT Support Specialists","Junior Developer","Full Stack Developer"
                                    ],
                        "Sales Person":["Sales Assistant","Sales Supervisor","Marketing Executive","Sales Executives","Sales Associate","Sales Manager"],
                        Analyst:["Data Analyst","Research Analyst","Financial Analyst","System Analyst","Intelligence Analyst","Financial Analysts",
                                  "Cybersecurity Analysts","Supply Chain Analysts","Business Analyst","Senior Analyst","Supply Chain Analysts","Quality Inspector"],
                        Banker:["Bank Clerk","Senior Clerk","Probationary Officer (PO)","Assistant Manager","Branch Manager","Regional Manager",
                                "Chief Manager","Assistant General Manager (AGM)","General Manager (GM)","Managing Director (MD)","Relationship Manager",
                                "Loan Officer","Branch Manager","Investment Analyst"],
                        Legal:["Civil Judge (Junior Division)","Civil Judge (Senior Division)","District Judge","High Court Judge","Supreme Court Judge",
                                "Chief Justice","Legal Officer","Public Prosecutor","Solicitor General","Legal Advisors","Compliance Officers",
                                "Contract Specialists","Risk Managers","Legal Associate","Corporate Lawyer","Compliance Manager","Legal Consultant",
                              ],
                    
                        Designer:["Proprietor","Graphic Designers","UX/UI Designers","Instructional Designers","Freelance Designers/Writers",
                                  "Senior Designer","Creative Director"], Photographer:["Proprietor"],Videographer:["Proprietor","Video Editors"],"Independent Artist":["Proprietor"],
                        Illustrator:["Proprietor"],Writer:["Proprietor"],"Digital Content Creator":["Proprietor"],"Social Media Influencer":["Proprietor"],
                        Podcaster:["Proprietor"],"Music Producer":["Proprietor"],"Management Consultant":["Proprietor"],"Financial Advisor":["Proprietor"],
                        "IT Consultant":["Proprietor"],"Business Strategist":["Proprietor"],"Marketing Consultant":["Proprietor"],"Life Coach":["Proprietor"],
                        "Career Counselor":["Proprietor"],"Freelance Software Developer":["Proprietor"],"Web Developer":["Proprietor"],"Data Analyst":["Proprietor"],
                        "App Developer":["Proprietor"],"UX/UI Designer":["Proprietor"],"Cybersecurity Consultant":["Proprietor"],"Private Practitioner (Doctor)":["Proprietor"],
                        Physiotherapist:["Proprietor"],"Dietitian or Nutritionist":["Proprietor"],"Yoga Instructor":["Proprietor"],"Personal Trainer":["Proprietor"],
                        "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)":["Proprietor"],"Private Tutor":["Proprietor"],"Test Preparation Coach":["Proprietor"],
                        "Online Educator":["Proprietor"],"Language Trainer":["Proprietor"],"Corporate Trainer":["Proprietor"],"Independent Lawyer":["Proprietor"],
                        "Chartered Accountant (CA)":["Proprietor"],"Tax Consultant":["Proprietor"],"Auditor":["Proprietor"],"Financial Planner":["Proprietor"],
                        "Tailor":["Proprietor"],"Carpenter":["Proprietor"],"Blacksmith":["Proprietor"],"Jewelry Maker":["Proprietor"],"Ceramic Artist":["Proprietor"],
                        "Real Estate Agent":["Proprietor"],"Broker":["Proprietor"],"Sales Representative":["Proprietor"],"Freelance Chef":["Proprietor"],
                        "Event Planner":["Proprietor"],"Makeup Artist":["Proprietor"],"Hairstylist":["Proprietor"],"Wedding Photographer":["Proprietor"],
                        "Independent Farmer":["Proprietor"],"Organic Produce Supplier":["Proprietor"],"Horticulturist":["Proprietor"],
                    
                        "Software Developer":["Software Developer"],
                        Manager:[],
                        Operators:["Data Entry Operators","Operations Managers","Machine Operators"],
                        "Human Resources (HR)":["HR Executives","Talent Acquisition Specialists","Employee Relations Managers","Training and Development Specialists",
                                                "HR Business Partners","HR Executives","Talent Acquisition Specialists","Employee Relations Managers","Training and Development Specialists","HR Business Partners"],
                        Manager:["Marketing Managers","Brand Managers","Business Development Managers","Digital Marketing Specialists",
                                  "Logistics Coordinators","Procurement Specialists","Inventory Managers","Client Relationship Managers","Social Media Managers",
                                  "Event Planners","Facility Managers","Hotel Managers","Front Desk Executives","Event Coordinators","Start-up Employees",
                                  "Team Manager","Operations Manager","General Manager","Operations Managers","Logistics Coordinators","Procurement Specialists",
                                  "Inventory Managers","Innovation Managers","Customer Support Executives","Sales Manager","Public Relations Specialists",
                                "Office Managers","Executive Assistants","Receptionists","Innovation Managers","Customer Support Executives",
                                  "Plant Managers","Quality Inspectors","Fleet Managers","Marketing Managers","Brand Managers","Business Development Managers","Digital Marketing Specialists"],
                        Author:["Content Writers","Editors"],
                        Director:["Art Directors"],
                        "Tele Caller":["Call Center Agents"],
                        Technicians:["Technical Support Specialists","Maintenance Technicians","Lab Technicians","Technical Lead","Laboratory Technicians"],
                        Jounalists:["Journalists","Public Relations Specialists"],
                        Hospitality:["Housekeeping Staff"],
                        Contractor:["Independent Contractors"],
                        Consultant:["Management Consultants"],
                        Artist:["Creative Artists","Musicians"],
                        Engineer:["Junior Engineer","Project Engineer","Senior Engineer","Engineering Manager"],
                        "Freelance Graphic Designer":["Proprietor"],Photographer:["Proprietor"],Videographer:["Proprietor"],"Independent Artist":["Proprietor"],
                        Illustrator:["Proprietor"],"Writer (Author, Blogger, or Copywriter)":["Proprietor"],"Digital Content Creator":["Proprietor"],
                        "Social Media Influencer":["Proprietor"],Podcaster:["Proprietor"],"Music Producer":["Proprietor"],"Management Consultant":["Proprietor"],
                        "Financial Advisor":["Proprietor"],"IT Consultant":["Proprietor"],"Business Strategist":["Proprietor"],"Marketing Consultant":["Proprietor"],
                        "Life Coach":["Proprietor"],"Career Counselor":["Proprietor"],"Freelance Software Developer":["Proprietor"],"Web Developer":["Proprietor"],
                        "Data Analyst":["Proprietor"],"App Developer":["Proprietor"],"UX/UI Designer":["Proprietor"],"Cybersecurity Consultant":["Proprietor"],
                        "Private Practitioner (Doctor)":["Proprietor"],Physiotherapist:["Proprietor"],"Dietitian or Nutritionist":["Proprietor"],
                        "Yoga Instructor":["Proprietor"],"Personal Trainer":["Proprietor"],"Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)":["Proprietor"],
                        "Private Tutor":["Proprietor"],"Test Preparation Coach":["Proprietor"],"Online Educator":["Proprietor"],"Language Trainer":["Proprietor"],
                        "Corporate Trainer":["Proprietor"],"Independent Lawyer":["Proprietor"],"Chartered Accountant (CA)":["Proprietor"],"Tax Consultant":["Proprietor"],
                        Auditor:["Proprietor","Internal Auditor","Risk Auditor","Audit Manager"],"Financial Planner":["Proprietor"],Tailor:["Proprietor"],Carpenter:["Proprietor"],Blacksmith:["Proprietor"],
                        "Jewelry Maker":["Proprietor"],"Ceramic Artist":["Proprietor"],"Real Estate Agent":["Proprietor"],"Property Consultant":["Proprietor"],
                        Broker:["Proprietor"],"Sales Representative":["Proprietor"],"Freelance Chef":["Proprietor"],"Event Planner":["Proprietor"],
                        "Makeup Artist":["Proprietor"],Hairstylist:["Proprietor"],"Wedding Photographer":["Proprietor"],"Independent Farmer":["Proprietor"],
                        "Organic Produce Supplier":["Proprietor"],Horticulturist:["Proprietor"],
                        Investor:["Angel Investor", "Venture Capitalist", "Portfolio Manager"],
                        Entrepreneurs:["Founder", "Co-Founder", "CEO", "Managing Director"],
                        "Start-up Founders":["Founder", "Co-Founder, CEO", "Visionary Leader"],
                        Retailer:["Shop Owner", "Retail Manager", "Proprietor", "Franchise Owner"],
                        Wholesaler:["Wholesale Business Owner", "Distribution Head", "Supply Chain Owner"],
                        "Importer/Exporter":["Import/Export Manager", "Trade Consultant", "Supply Chain Owner"],
                        Distributor:["Chief Trading Officer", "Trading Business Owner", "Independent Trader"],
                        Trader:["Wholesale Business Owner", "Distribution Head", "Supply Chain Owner"],
                        "Real Estate Developer":["Real Estate Developer", "Managing Partner", "Property Consultant"],
                        "Real Eastate Investor":["Property Investor", "Real Estate Strategist", "Investment Manager"],
                        "Real Estate Agent":["Real Estate Consultant", "Real Estate Advisor", "Realtor"],
                        Manufacturer:["Factory Owner", "Production Head", "Chief Manufacturing Officer"],
                        Industrialist:["Business Tycoon", "Industry Leader", "Managing Director"],
                        Financer:["Chief Financial Officer (CFO)", "Financial Advisor", "Investment Consultant"],
                        "Stock Trader":["Equity Investor", "Day Trader", "Portfolio Manager"],
                        "Hotel Owner":["Hospitality Owner", "General Manager (GM)", "Managing Director"],
                        "Resort Owner":["Resort Manager", "Owner and Operator", "Hospitality Director"],
                        "Travel Agency":["Travel Consultant", "Tourism Business Owner", "Founder"],
                        "Restaurant Owner":["Restaurant Manager", "Food Entrepreneur", "Culinary Director"],
                        Agriculturist:["Farm Owner", "Agriculture Consultant", "Rural Entrepreneur"],
                        "Dairy Business Owner":["Dairy Farmer", "Milk Processing Entrepreneur", "Managing Partner"],
                        "IT Person":["IT Consultant", "Software Solutions Owner","IT Entrepreneur","Software Developers","System Administrators",
                                    "IT Support Specialists","Data Scientists","Cybersecurity Analysts","Junior Developer","Full Stack Developer",
                                    "Senior Software Engineer","Technical Lead"],
                        "Coaching Centre Owner":["Education Entrepreneur", "Coaching Director", "Academic Manager"],
                        "Training Institute Owner":["Training Consultant", "Institute Director", "Founder"],
                        "Online Tutor":["Founder and Educator", "Academic Content Creator"],
                        "Private Tutor":["Independent Tutor", "Education Consultant"],
                        "Hospital Owner":["Healthcare Entrepreneur", "Medical Director", "Hospital Administrator"],
                        "Wellness Centre Owner":["Wellness Consultant", "Health and Fitness Director", "Gym Owner"],
                        "Fitness Centre Owner":["Gym Owner", "Fitness Director", "Health Entrepreneur"],
                        "Advertising Agency Owner":["Creative Director", "Marketing Strategist", "Founder"],
                        "Film Producer":["Producer", "Film Studio Owner", "Creative Producer"],
                        "Media House Owner":["Media Entrepreneur","Chief Editor", "Publisher"],
                        Designer:	["Creative Director", "Fashion Entrepreneur"],
                        Transporter:	["Logistics Manager", "Transport Business Owner"],
                        "Courier Servicer":["Courier Business Owner", "Operations Manager"],
                        "Renewable Energy and Environment":["Renewable Energy Consultant", "Sustainable Entrepreneur"],
                        Boutique:["Fashion Boutique Owner", "Creative Head"],
                        "Salon Owner":["Salon Manager", "Beauty Entrepreneur"],
                        "Security Service Provider":["Security Agency Owner", "Operations Head"],
                        "Legal Firm Owner":["Advocate and Owner", "Managing Partner"],
                        "Digital Business":["Founder", "Digital Marketing Consultant"],
                        "Infrastructure Developer":["Real Estate Developer", "Project Consultant"],
                        Agriculturist:["Agribusiness Entrepreneur", "Food Processing Director"],
                        "Poultry Farm Owner":	["Poultry Business Owner", "Farm Manager"],
                        "Handicrafts Business Owner":["Artisan Entrepreneur", "Creative Entrepreneur"],
                        "Investment Banker":["Investment Advisor", "Wealth Manager"],
                        "Loan Cosultant":	["Financial Consultant", "Loan Advisor"],
                        "IT Company Owner":["IT Entrepreneur", "Chief Technology Officer (CTO)"],
                        "Cloud Service Provider":["Cloud Solutions Architect", "IT Entrepreneur"],
                        Emigration:	["Immigration Consultant", "Visa Solutions Provider"],
                        Catering:	["Catering Business Owner", "Culinary Director"],
                        Baker:["Bakery Owner", "Culinary Entrepreneur"],
                        "Car Dealership Owner":["Dealership Manager", "Auto Entrepreneur"],
                        "Bike Dealership Owner":	["Franchise Owner"],
                        "Bike Rental Business Owner":["Rental Business Owner", "Operations Head"],
                        "Workshop Owner":["Mechanic Entrepreneur", "Service Manager"],
                        "Environmental Consultant":["Sustainability Consultant", "Environmental Advisor"],
                        "Cold Storage Business Owner":["Logistics Entrepreneur", "Warehouse Manager"],
                        "Film Studio Owner":	["Film Producer", "Studio Head"],
                        "Sports Organizer":	["Event Manager", "Sports Entrepreneur"],
                        "Event Organizer":	["Founder, Director", "Creative Planner"],
                        "Cloth Merchant":	["Textile Business Owner", "Retail Manager"],
                        ExecutiveOfficer:["Chief Executive Officer (CEO)","Entrepreneurs","Chief Financial Officer (CFO)","Chief Operating Officer (COO)","Vice Presidents (VPs)","Directors",],
                        Facility:["Housekeeping Staff"]
                    
                    
                      },
                    };
                
                    
                    
 function addFn3() {
 
  setleadinfo((prevlead)=>({
    ...prevlead,
    company_social_media: [...prevlead.company_social_media, ''],
    company_url: [...prevlead.company_url, ''],
    action3: Array.isArray(prevlead.action3) ? [...prevlead.action3, ''] : ['']
  }));
};
const deleteall3=(index)=>
  {
   
    const newcomapnysocialmedia = leadinfo.company_social_media.filter((_, i) => i !== index);
    const newcompanyurl = leadinfo.company_url.filter((_, i) => i !== index);
    const newaction3=leadinfo.action3.filter((_,i) => i !== index);
    
    setleadinfo({
      ...leadinfo,
      company_social_media: newcomapnysocialmedia,
      company_url: newcompanyurl,
      action3:newaction3
    });
  }
  const handlecompanysocialmediachange = (index, event) => {
    const newcomapnysocialmedia = [...leadinfo.company_social_media];
    newcomapnysocialmedia[index] = event.target.value;
    setleadinfo((prevProfile)=>({
      ...prevProfile,
      company_social_media: newcomapnysocialmedia
    }));
  };
  const handlecompanyurlchange = (index, event) => {
    const newcompanyurl = [...leadinfo.company_url];
    newcompanyurl[index] = event.target.value;
    setleadinfo((prevProfile)=>({
      ...prevProfile,
      company_url: newcompanyurl
    }));
  };
  function addFn4() {

      setleadinfo((prevlead)=>({
        ...prevlead,
        education: [...leadinfo.education, ''],
        degree: [...leadinfo.degree, ''],
        school_college: [...leadinfo.school_college, ''],
        action4: Array.isArray(prevlead.action4) ? [...prevlead.action4, ''] : ['']
      }));
    };
    const deleteall4=(index)=>
      {
       
        const neweducation = leadinfo.education.filter((_, i) => i !== index);
        const newdegree = leadinfo.degree.filter((_, i) => i !== index);
        const newschool_college = leadinfo.school_college.filter((_, i) => i !== index);
        const newaction4=leadinfo.action4.filter((_,i) => i !== index);
        
        setleadinfo({
          ...leadinfo,
          education: neweducation,
          degree: newdegree,
          school_college: newschool_college,
          action4:newaction4
        });
      }
      const handleeducationChange = (index, event) => {
        const neweducation = [...leadinfo.education];
        neweducation[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          education: neweducation
        }));
      setactivity({...activity, edit_field: "education",edit_value:neweducation})
      };
      const handledegreeChange = (index, event) => {
        const newdegree = [...leadinfo.degree];
        newdegree[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          degree: newdegree
        }));
        setactivity({...activity, edit_field: "degree",edit_value:newdegree})
      };

      const handleschool_collegeChange = (index, event) => {
        const newschool = [...leadinfo.school_college];
        newschool[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          school_college: newschool
        }));
        setactivity({...activity, edit_field: "school/collage",edit_value:newschool})
      };

    function addFn5() {

      setleadinfo((prevlead)=>({
        ...prevlead,
        loan: [...prevlead.loan, ''],
        bank: [...prevlead.bank, ''],
        amount: [...prevlead.amount, ''],
        action5: Array.isArray(prevlead.action5) ? [...prevlead.action5, ''] : ['']
      }));
    };
    const deleteall5=(index)=>
      {
       
        const newloan = leadinfo.loan.filter((_, i) => i !== index);
        const newbank = leadinfo.bank.filter((_, i) => i !== index);
        const newamount = leadinfo.amount.filter((_, i) => i !== index);
        const newaction5=leadinfo.action5.filter((_,i) => i !== index);
        
        setleadinfo({
          ...leadinfo,
          loan: newloan,
          bank: newbank,
          amount: newamount,
          action5:newaction5
        });
      }
      const handleloanchange = (index, event) => {
        const newloan = [...leadinfo.loan];
        newloan[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          loan: newloan
        }));
        setactivity({...activity, edit_field: "loan",edit_value:newloan})
      };
      const handlebankchange = (index, event) => {
        const newbank = [...leadinfo.bank];
        newbank[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          bank: newbank
        }));
        setactivity({...activity, edit_field: "bank",edit_value:newbank})
      };
      const handleamountchange = (index, event) => {
        const newamount = [...leadinfo.amount];
        newamount[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          amount: newamount
        }));
        setactivity({...activity, edit_field: "amount",edit_value:newamount})
      };

      function addFn6() {

        setleadinfo((prevlead)=>({
          ...prevlead,
          social_media: [...prevlead.social_media, ''],
          url: [...prevlead.url, ''],
          action6: Array.isArray(prevlead.action6) ? [...prevlead.action6, ''] : ['']
        }));
      };
      const deleteall6=(index)=>
        {
         
          const newsocial_media = leadinfo.social_media.filter((_, i) => i !== index);
          const newurl = leadinfo.url.filter((_, i) => i !== index);
          const newaction6=leadinfo.action6.filter((_,i) => i !== index);
          
          setleadinfo({
            ...leadinfo,
            social_media: newsocial_media,
            url: newurl,
            action6:newaction6
          });
        }
        const handlesocial_mediachange = (index, event) => {
          const newsocial_media = [...leadinfo.social_media];
          newsocial_media[index] = event.target.value;
          setleadinfo((prevProfile)=>({
            ...prevProfile,
            social_media: newsocial_media
          }));
          setactivity({...activity, edit_field: "social media",edit_value:newsocial_media})
        };
        const handleurlChange = (index, event) => {
          const newurl = [...leadinfo.url];
          newurl[index] = event.target.value;
          setleadinfo((prevProfile)=>({
            ...prevProfile,
            url: newurl
          }));
          setactivity({...activity, edit_field: "url",edit_value:newurl})
        };

        function addFn7() {

          setleadinfo((prevlead)=>({
            ...prevlead,
            income: [...prevlead.income, ''],
            amount1: [...prevlead.amount1, ''],
            action7: Array.isArray(prevlead.action7) ? [...prevlead.action7, ''] : ['']
          }));
        };
        const deleteall7=(index)=>
          {
           
            const newincome = leadinfo.income.filter((_, i) => i !== index);
            const newamount1 = leadinfo.amount1.filter((_, i) => i !== index);
            const newaction7=leadinfo.action7.filter((_,i) => i !== index);
            
            setleadinfo({
              ...leadinfo,
              income: newincome,
              amount1: newamount1,
              action7:newaction7
            });
          }
          const handleincomechange = (index, event) => {
            const newincome = [...leadinfo.income];
            newincome[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              income: newincome
            }));
            setactivity({...activity, edit_field: "income",edit_value:newincome})
          };
          const handleamount1change = (index, event) => {
            const newamount1 = [...leadinfo.amount1];
            newamount1[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              amount1: newamount1
            }));
            setactivity({...activity, edit_field: "income-amount",edit_value:newamount1})
          };

          function addFn8() {

            setleadinfo((prevlead)=>({
              ...prevlead,
              document_no: [...prevlead.document_no, ''],
              document_name: [...prevlead.document_name, ''],
              document_pic: [...prevlead.document_pic, ''],
              action8: Array.isArray(prevlead.action8) ? [...prevlead.action8, ''] : ['']
            }));
          };
          const deleteall8=(index)=>
            {
             
              const newdocumentno = leadinfo.document_no.filter((_, i) => i !== index);
              const newdocumentname = leadinfo.document_name.filter((_, i) => i !== index);
              const newdocumentpic = leadinfo.document_pic.filter((_, i) => i !== index);
              const newaction8=leadinfo.action8.filter((_,i) => i !== index);
              
              setleadinfo({
                ...leadinfo,
                document_no: newdocumentno,
                document_name: newdocumentname,
                document_pic: newdocumentpic,
                action8:newaction8
              });
            }
            const handledocumentnochange = (index, event) => {
              const newdocumentno = [...leadinfo.document_no];
              newdocumentno[index] = event.target.value;
              setleadinfo((prevProfile)=>({
                ...prevProfile,
                document_no: newdocumentno
              }));
              setactivity({...activity, edit_field: "document no",edit_value:newdocumentno})
            };
            const handledocumentnamechange = (index, event) => {
              const newdocumentname = [...leadinfo.document_name];
              newdocumentname[index] = event.target.value;
              setleadinfo((prevProfile)=>({
                ...prevProfile,
                document_name: newdocumentname
              }));
              setactivity({...activity, edit_field: "document name",edit_value:newdocumentname})
            };
            const handledocumentpicchange = (index, event) => {
              const newdocumentpic = [...leadinfo.document_pic];
              const files = Array.from(event.target.files);
              newdocumentpic[index] = {files:files}
              setleadinfo((prevProfile)=>({
                ...prevProfile,
                document_pic: newdocumentpic
              }));
              setactivity({...activity, edit_field: "document pic",edit_value:newdocumentpic}) 
            };

            const leadinfobasic=()=>
              {
                  document.getElementById("leadinfobasic1").style.display="flex";
                  document.getElementById("leadinfobasic2").style.display="flex";
                  document.getElementById("span1").style.color="green";
      
                  document.getElementById("leadinforequirment").style.display="none";
                  document.getElementById("span2").style.color="black";
      
                  document.getElementById("leadinfoprofessional").style.display="none";
                  document.getElementById("span3").style.color="black";
      
                  document.getElementById("leadinfopersonal").style.display="none";
                  document.getElementById("span3").style.color="black";
               
              }
              const leadinforequirment=()=>
                  {
                      document.getElementById("leadinfobasic1").style.display="none";
                      document.getElementById("leadinfobasic2").style.display="none";
                      document.getElementById("span1").style.color="black";
          
                      document.getElementById("leadinforequirment").style.display="flex";
                      document.getElementById("span2").style.color="green";
          
                      document.getElementById("leadinfoprofessional").style.display="none";
                      document.getElementById("span3").style.color="black";
          
                      document.getElementById("leadinfopersonal").style.display="none";
                      document.getElementById("span3").style.color="black";
                   
                  }
                  const leadinfoprofessionaldetails=()=>
                      {
                          document.getElementById("leadinfobasic1").style.display="none";
                          document.getElementById("leadinfobasic2").style.display="none";
                          document.getElementById("span1").style.color="black";
              
                          document.getElementById("leadinforequirment").style.display="none";
                          document.getElementById("span2").style.color="black";
      
                          document.getElementById("leadinfoprofessional").style.display="flex";
                          document.getElementById("span3").style.color="green";
      
                          document.getElementById("leadinfopersonal").style.display="none";
                          document.getElementById("span4").style.color="black";
                       
                      }  
                    const leadinfopersonaldetails=()=>
                          {
                              document.getElementById("leadinfobasic1").style.display="none";
                              document.getElementById("leadinfobasic2").style.display="none";
                              document.getElementById("span1").style.color="black";
                  
                              document.getElementById("leadinforequirment").style.display="none";
                              document.getElementById("span2").style.color="black";
                  
                              document.getElementById("leadinfoprofessional").style.display="none";
                              document.getElementById("span3").style.color="black";
                  
                              document.getElementById("leadinfopersonal").style.display="flex";
                              document.getElementById("span4").style.color="green";
                           
                          }
                          const config = {
                            headers: {
                              'Content-Type': 'multipart/form-data' // Set the Content-Type here
                            }
                        }
      const updatelead=async()=>
        {
          try {
            const id=data1._id
            const resp=await api.put(`updatelead/${id}`,leadinfo,config)
            const resp1=await api.post('addactivity',activity)
            toast.success("lead updated",{ autoClose: 2000 })
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        }



         const matchdeal=["What'sApp","Message","Mail"];
        
        const [matchdeals, setmatcheddeals] = useState([]);
        
        const handlematcheddealChange = (event) => {
          const {
            target: { value },
          } = event;
        
          // If "Select All" is clicked
          if (value.includes('select-all')) {
            // If all options are already selected, deselect them (uncheck all)
            if (matchdeals.length === matchdeal.length) {
              setmatcheddeals([]); // Deselect all options
              setleadinfo({ ...leadinfo, matched_deal: [] }); // Update matched_deal in leadinfo
            } else {
              // Otherwise, select all options
              setmatcheddeals(matchdeal); // Select all options
              setleadinfo({ ...leadinfo, matched_deal: matchdeal }); // Update matched_deal in leadinfo
            setactivity({...activity, edit_field: "mathced deal",edit_value:matchdeal})
            }
          } else {
            // If individual items are selected/deselected
            const selectedmatcheddeal = typeof value === 'string' ? value.split(',') : value;
            setmatcheddeals(selectedmatcheddeal); // Update selected deals
            setleadinfo({ ...leadinfo, matched_deal: selectedmatcheddeal }); // Update matched_deal with selected options
            setactivity({...activity, edit_field: "matched deal",edit_value:selectedmatcheddeal})
          }
        };
        
        
        const [progress, setProgress] = useState(leadinfo.white_portion || 0); // Initialize with deal.whiteportion
        
        const handleMouseMove = (e) => {
          const progressBar = e.target.getBoundingClientRect();
          const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
          const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
          setProgress(clampedProgress);
          setleadinfo((prevLead) => ({ ...prevLead, white_portion: clampedProgress })); // Update deal.whiteportion
        setactivity({...activity, edit_field: "white portion",edit_value:clampedProgress});
        };
        
        const handleMouseDown = (e) => {
          handleMouseMove(e); // Set initial progress
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        };
        
        const handleMouseUp = () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
        
        const facing=["East","West","South","North","North East","South East","North West","South West"];
        const [facings, setfacings] = useState([]);
        
        const handlefacingChange = (event) => {
          const {
            target: { value },
          } = event;
        
          // If "Select All" is clicked
          if (value.includes('select-all')) {
            // If all options are already selected, deselect them (uncheck all)
            if (facings.length === facing.length) {
              setfacings([]); // Deselect all options
              setleadinfo({ ...leadinfo, facing: [] }); // Update facing in leadinfo
            } else {
              // Otherwise, select all options
              setfacings(facing); // Select all options
              setleadinfo({ ...leadinfo, facing: facing }); // Update facing in leadinfo
            setactivity({...activity, edit_field: "facing",edit_value:facing})
            }
          } else {
            // Handle individual selections/deselections
            const selectedfacing = typeof value === 'string' ? value.split(',') : value;
            setfacings(selectedfacing); // Update selected facings
            setleadinfo({ ...leadinfo, facing: selectedfacing }); // Update facing in leadinfo
            setactivity({...activity, edit_field: "facing",edit_value:selectedfacing});
          }
        };
        
        const road=["9 mtr road","12 mtr road","60 mtr road","100 mtr road"];
        
        const [roads, setroads] = useState([]);
        
        const handleroadChange = (event) => {
          const {
            target: { value },
          } = event;
        
          // If "Select All" is clicked
          if (value.includes('select-all')) {
            // If all options are already selected, deselect them (uncheck all)
            if (roads.length === road.length) {
              setroads([]); // Deselect all options
              setleadinfo({ ...leadinfo, road: [] }); // Update road in leadinfo
            } else {
              // Otherwise, select all options
              setroads(road); // Select all options
              setleadinfo({ ...leadinfo, road: road }); // Update road in leadinfo
          setactivity({...activity, edit_field: "road",edit_value:road})
            }
          } else {
            // Handle individual selections/deselections
            const selectedroad = typeof value === 'string' ? value.split(',') : value;
            setroads(selectedroad); // Update selected roads
            setleadinfo({ ...leadinfo, road: selectedroad }); // Update road in leadinfo
          setactivity({...activity, edit_field: "road",edit_value:selectedroad});
          }
        };
        
         const [availableSubcategories, setAvailableSubcategories] = useState([]);
                                                      const [availableDesignations, setAvailableDesignations] = useState([]);
                                                      
                                                      // Handle profession category change
                                                      const handleProfessionCategoryChange = (event) => {
                                                        const selectedCategory = event.target.value;
                                                      
                                                        setleadinfo((prevLead) => ({
                                                          ...prevLead,
                                                          profession_category: selectedCategory,
                                                          profession_subcategory: "", // Reset subcategory when category changes
                                                          designation: "", // Reset designation when category changes
                                                        }));
                                                        setactivity({...activity, edit_field: "profession category",edit_value:selectedCategory})
                                                        // Update available subcategories based on selected profession category
                                                        setAvailableSubcategories(professtiondetails.profession_subcategory[selectedCategory] || []);
                                                      };
                                                      
                                                      // Handle profession subcategory change
                                                      const handleProfessionSubcategoryChange = (event) => {
                                                        const selectedSubcategory = event.target.value;
                                                      
                                                        setleadinfo((prevLead) => ({
                                                          ...prevLead,
                                                          profession_subcategory: selectedSubcategory,
                                                          designation: "", // Reset designation when subcategory changes
                                                        }));
                                                        setactivity({...activity, edit_field: "profession subcategory",edit_value:selectedSubcategory})
                                                      
                                                        // Update available designations based on selected profession subcategory
                                                        setAvailableDesignations(professtiondetails.designation[selectedSubcategory] || []);
                                                      };
                                                      
                                                      // Handle designation change
                                                      const handleDesignationChange = (event) => {
                                                        const selectedDesignation = event.target.value;
                                                      
                                                        setleadinfo((prevLead) => ({
                                                          ...prevLead,
                                                          designation: selectedDesignation,
                                                        }));
                                                        setactivity({...activity, edit_field: "designation",edit_value:selectedDesignation})
                                                      };


                                                      const[data11,setdata11]=useState([]);
const fetchdatabyprojectcityname=async()=>
{
  
  try {
    const city=leadinfo.city2
    // console.log(city);
    
    const resp=await api.get(`viewprojectbycityname/${city}`)
    // console.log(resp);
    
    setdata11(resp.data.project)
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  fetchdatabyprojectcityname()
}, [leadinfo.city2]);

const allproject =[]
data11.map((item)=>
(
    allproject.push(item.name)
))

const [units, setunits] = useState([]);

const [allblocks, setallblocks] = useState([]);


const fetchdatabyprojectname = async (projectNames) => {

  try {
    
      const resp = await api.get(`viewprojectbyname/${projectNames}`);
      const allFetchedUnits= resp.data.project; 
      setunits(allFetchedUnits);// Assuming resp.data.project is an array of units for that project
    

  
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (units.length >= 0) {
   
    const collectedblocks=units.flatMap(item=>item.add_block)

    setallblocks(collectedblocks) 
   
  }
}, [units]);








const handleprojectchange = (event) => {
  const selectproject = event.target.value;

  // If the "Select All" option is selected
  if (selectproject.includes('select-all')) {
    // If all projects are already selected, deselect all
    if (leadinfo.area2.length === allproject.length) {
      setleadinfo((prev) => {
        const updateproject = { ...prev, area2: [] }; // Deselect all
        return updateproject;
      });
setactivity({...activity, edit_field: "area",edit_value:selectproject});
    } else {
      // Select all projects
      setleadinfo((prev) => {
        const updateproject = { ...prev, area2: allproject }; // Select all
        fetchdatabyprojectname(allproject); // Fetch data with the selected projects
        return updateproject;
      });
setactivity({...activity, edit_field: "area",edit_value:allproject})
    }
  } else {
    // Handle individual project selection/deselection
    setleadinfo((prev) => {
      const updateproject = { ...prev, area2: selectproject };
      fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updateproject;
    });
  }
};


const asianCountries = [
  "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", 
  "Brunei", "Burma (Myanmar)", "Cambodia", "China", "Cyprus", "Georgia", 
  "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", 
  "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", 
  "Maldives", "Mongolia", "Nepal", "North Korea", "Oman", "Pakistan", 
  "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", 
  "South Korea", "Sri Lanka", "Syria", "Tajikistan", "Thailand", 
  "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", 
  "Vietnam", "Yemen"
];
const statesAndCities = {
  AndhraPradesh: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  ArunachalPradesh: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
  Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  Goa: ["North Goa", "South Goa"],
  Gujarat: ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Narnaul", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  Karnataka: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kottayam", "Kollam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  MadhyaPradesh: ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Rajgarh", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  Meghalaya: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "West Garo Hills", "West Khasi Hills"],
  Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
  Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam", "Gajapati", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawan Shehar", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Sri Muktsar Sahib"],
  Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  TamilNadu: ["Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "The Nilgiris", "Thoothukudi", "Tiruvallur", "Tirunelveli", "Tirupur", "Vellore", "Viluppuram", "Virudhunagar"],
  Telangana: ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nalgonda", "Nagarkurnool", "Nirmal", "Nizamabad", "Peddapalli", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Khammam", "Kothagudem"],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  UttarPradesh: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar","Noida", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shrawasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"]
};

const states = Object.keys(statesAndCities);
const cities = statesAndCities[leadinfo.state2] || [];


const selectlocation=()=>
  {
    document.getElementById("select_location").style.display="flex"
    document.getElementById("search_location1").style.display="none"


      
    document.getElementById("searchlocation").style.color="black"
    document.getElementById("searchlocation").style.backgroundColor="white"


    document.getElementById("selectlocation").style.backgroundColor="black"
    document.getElementById("selectlocation").style.color="white"
    document.getElementById("selectlocation").style.borderRadius="50px"
    document.getElementById("selectlocation").style.width="150px"
    document.getElementById("selectlocation").style.textAlign="center"
  
  

    
  }
  const searchlocation=()=>
    {
      document.getElementById("select_location").style.display="none"
      document.getElementById("search_location1").style.display="flex"
  
  
    
      document.getElementById("selectlocation").style.color="black"
      document.getElementById("selectlocation").style.backgroundColor="white"


      document.getElementById("searchlocation").style.backgroundColor="black"
      document.getElementById("searchlocation").style.color="white"
      document.getElementById("searchlocation").style.borderRadius="50px"
      document.getElementById("searchlocation").style.width="150px"
      document.getElementById("searchlocation").style.textAlign="center"
      
    }


  
                                          const areaoptions = [
                                            { value: 10, label: "10" },                 
                                            { value: 25, label: "25" },
                                            { value: 50, label: "50" },
                                            { value: 75, label: "75" },
                                            { value: 100, label: "100" },
                                            { value: 125, label: "125" },
                                            { value: 150, label: "150" },
                                            { value: 175, label: "175" },
                                            { value: 200, label: "200" },
                                            { value: 225, label: "225" },
                                            { value: 250, label: "250" },
                                            { value: 300, label: "300" },
                                            { value: 350, label: "350" },
                                            { value: 400, label: "400" },
                                            { value: 450, label: "450" },
                                            { value: 550, label: "550" },
                                            { value: 750, label: "750" },
                                            { value: 1000, label: "1000" },
                                            { value: 2000, label: "2000" },
                                            { value: 5000, label: "5000" },
                                            { value: 7500, label: "7500" },
                                            { value: 10000, label: "10000" }
                                          ];

                                          const filteredarea = leadinfo.minimum_area
                                          ? areaoptions.filter((option) => option.value >= leadinfo.minimum_area)
                                          : areaoptions;

                                          const budgetOptions = [
                                            { value: 5000, label: "5,000/- (five thousand)" },
                                            { value: 10000, label: "10,000/- (ten thousand)" },
                                            { value: 20000, label: "20,000/- (twenty thousand)" },
                                            { value: 30000, label: "30,000/- (thirty thousand)" },
                                            { value: 50000, label: "50,000/- (fifty thousand)" },
                                            { value: 80000, label: "80,000/- (eighty thousand)" },
                                            { value: 100000, label: "1,00,000/- (one lakh)" },
                                            { value: 150000, label: "1,50,000/- (one and a half lakh)" },
                                            { value: 200000, label: "2,00,000/- (two lakh)" },
                                            { value: 250000, label: "2,50,000/- (two and a half lakh)" },
                                            { value: 350000, label: "3,50,000/- (three and a half lakh)" },
                                            { value: 500000, label: "5,00,000/- (five lakh)" },
                                            { value: 750000, label: "7,50,000/- (seven and a half lakh)" },
                                            { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                          ];
                                        
                                          // Filter max budget options based on selected min budget
                                          const filteredMaxBudgetOptions = leadinfo.budget_min
                                            ? budgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                            : budgetOptions;
  
                                            const buyBudgetOptions = [
                                              { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                              { value: 2500000, label: "25,00,000/- (twenty five lakh)" },
                                              { value: 5000000, label: "50,00,000/- (fifty lakh)" },
                                              { value: 7500000, label: "75,00,000/- (seventy five lakh)" },
                                              { value: 10000000, label: "1,00,00,000/- (one crore)" },
                                              { value: 12500000, label: "1,25,00,000/- (one crore twenty five lakh)" },
                                              { value: 15000000, label: "1,50,00,000/- (one crore fifty lakh)" },
                                              { value: 20000000, label: "2,00,00,000/- (two crore)" },
                                              { value: 30000000, label: "3,00,00,000/- (three crore)" },
                                              { value: 40000000, label: "4,00,00,000/- (four crore)" },
                                              { value: 50000000, label: "5,00,00,000/- (five crore)" },
                                              { value: 75000000, label: "7,50,00,000/- (seven crore fifty lakh)" },
                                              { value: 100000000, label: "10,00,00,000/- (ten crore)" },
                                              { value: 150000000, label: "15,00,00,000/- (fifteen crore)" },
                                              { value: 200000000, label: "20,00,00,000/- (twenty crore)" },
                                              { value: 300000000, label: "30,00,00,000/- (thirty crore)" },
                                              { value: 500000000, label: "50,00,00,000/- (fifty crore)" },
                                              { value: 750000000, label: "75,00,00,000/- (seventy five crore)" },
                                              { value: 1000000000, label: "100,00,00,000/- (one hundred crore)" },
                                            ];
                                            const filteredMaxBudgetOptionsbuy = leadinfo.budget_min
                                            ? buyBudgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                            : buyBudgetOptions;


                                            const getAvailableunittype = () => {
                                              // Step 1: Ensure leadinfo.sub_type is an array before calling flatMap
                                              if (Array.isArray(leadinfo.sub_type)) {
                                                return leadinfo.sub_type.flatMap((cat) => Array.isArray(options.unit_type[cat]) ? options.unit_type[cat] : []);
                                              }
                                              return [];  // Return an empty array if leadinfo.sub_type is not an array
                                            };
                                            
                                            const handleUnitTypeChange = (event) => {
                                              const selectedUnitTypes = event.target.value;
                                              setleadinfo((prevLead) => ({
                                                ...prevLead,
                                                unit_type: selectedUnitTypes,
                                              }));
                                              setactivity({...activity, edit_field: "refrencer",edit_value:selectedUnitTypes})
                                            };

                                            const handleSubcategoryChange = (event) => {
                                              const selectedSubcategories = event.target.value;
                                            
                                              // Update subcategories and dependent unit types
                                             
                                              setleadinfo((prevLead) => ({
                                                ...prevLead,
                                                sub_type: selectedSubcategories,
                                                unit_type: [], // Ensure uniqueness
                                              }));
                                              setactivity({...activity, edit_field: "sub category",edit_value:selectedSubcategories})
                                            };
                                            const getAvailableSubcategories = () => {
                                              if (Array.isArray(leadinfo.property_type)) {
                                                return leadinfo.property_type.flatMap((cat) => Array.isArray(options.sub_type[cat]) ? options.sub_type[cat] : []);
                                              }
                                              return [];  // Return an empty array if leadinfo.property_type is not an array
                                            };
                                            


                                            const options = {
                                              property_type: ["RESIDENTIAL", "COMMERCIAL","AGRICULTURE","INDUSTRIAL","INSTITUTIONAL"],
                                              sub_type: {
                                                RESIDENTIAL: ["PLOT", "INDEPENDENT HOUSE","FLAT/APARTMENT","BUILDER FLOOR"],
                                                COMMERCIAL: ["SHOP", "SHOWROOM","OFFICE SPACE","RETAIL STORE","SOHO","EXCUTIVE ROOM","MULTIPLEX","VIRTUAL SPACE","PLOT"],
                                                AGRICULTURE: ["LAND", "FARM HOUSE"],
                                                INDUSTRIAL: ["PLOTS", "WAREHOUSE","COLD STORAGE","RICE SELLER","BUILDING","FACTORY"],
                                                INSTITUTIONAL: ["SCHOOL", "HOTEL","UNIVERSITIES","HOSPITAL","COLLEGE"]
                                              },
                                              unit_type: {
                                                PLOT: ["1 Kanal", "2 Kanal","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
                                                "INDEPENDENT HOUSE": ["1 Kanal", "2 Kanal","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
                                                "FLAT/APARTMENT": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
                                                "BUILDER FLOOR": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
                                                SHOP:["BOOTH","KIOSAK",],
                                                SHOWROOM:["SCO","SCF","DSS"],
                                                "OFFICE SPACE":["LOCABLE OFFICE","VIRTUAL OFFICE"],
                                                "RETAIL STORE":["HYPER MARKET","DEPARTMETAL STORE"],
                                                SOHO:["SOHO"],
                                                "EXCUTIVE ROOM":["ROOM"],
                                                LAND:["CROPLAND","WOODLAND","PASTURE","COMMERCIAL"],
                                                "FARM HOUSE":["FARM"],
                                                PLOTS:["1 KANAL","10 MARLA","2 KANAL","1 ACRE","2 KANAL"],
                                                WAREHOUSE:["WRHSE"],
                                                "COLD STORAGE":["CLDSTRG"],
                                                "RICE SELLER":["RCSLR"],
                                                "BUILDING":["BLDG"],
                                                FACTORY:["FCTRY"],
                                                SCHOOL:["NURSERY SCHOOL","CRECH","HIGH SCHOOL","PRIMERY SCHOOL"],
                                                HOTEL:["HOTEL","GUEST HOUSE","HOMESTAYS"],
                                                UNIVERSITIES:["DEEMED","PRIVATE"],
                                                HOSPITAL:["NURSING HOME","CLINIC"],
                                                COLLEGE:["ART COLLEGE","TECHNICAL COLLEGE","MEDICAL COLLEGE"]
                                              },
                                            };
                                            
                                            const handleCategoryChange = (event) => {
                                              const selectedCategories = event.target.value;
                                            
                                              // Update categories and reset dependent fields
                                            
                                              
                                            
                                              setleadinfo((prevLead)=>({
                                                ...prevLead,
                                                property_type: selectedCategories,
                                                sub_type: [], // Ensure uniqueness
                                                unit_type: [], // Ensure uniqueness
                                              }));
                                            setactivity({...activity, edit_field: "property type",edit_value:selectedCategories})
                                            };


                                            const ownersList = [
                                              'Suraj',
                                              'Suresh Kumar',
                                              'Ramesh Singh',
                                              'Maanav Sharma',
                                              'Sukram'
                                            ];
                                            
                                            const [owners, setOwners] = useState([]);
                                        
                                            
                                            const handleOwnerChange1 = (event) => {
                                              const {
                                                  target: { value },
                                              } = event;
                                            
                                              const selectedOwners = typeof value === 'string' ? value.split(',') : value;
                                            
                                              setOwners(selectedOwners);
                                              setleadinfo({ ...leadinfo, owner: selectedOwners });
                                              setactivity({...activity, edit_field: "owner",edit_value:selectedOwners});
                                            };
                                            

                                            const onlineCampaignSources = [
                                              "Facebook", "Instagram", "Google", "X", "Linkedin", 
                                              "99 Acre", "Magicbricks", "Common Floor", "Sulekha", 
                                              "Housing", "Square Yard", "OLX", "Real Estate India"
                                            ];
                                            
                                            const offlineCampaignSources = [
                                              "SMS", "Email", "Whatsapp", "Website", "News Paper", "Cold Calling"
                                            ];
                                            
                                            const organicCampaignSources = [
                                              "Walk-In", "Old Client", "Friends", "Relative", "Hoarding", "Reference", "Channel Partner"
                                            ];

                                            const getSourceOptions = () => {
                                              if (leadinfo.campegin === "Online Campaign") {
                                                return onlineCampaignSources;
                                              } else if (leadinfo.campegin === "Offline Campaign") {
                                                return offlineCampaignSources;
                                              } else if (leadinfo.campegin === "Organic Campaign") {
                                                return organicCampaignSources;
                                              } else {
                                                return [];
                                              }
                                            };
  
  
                                            const[contactdata,setcontactdata]=useState([]);
                                            const fetchdata1=async()=>
                                            {
                                              
                                              try {
                                                const resp=await api.get('viewcontact')
                                                setcontactdata(resp.data.contact)
                                       
                                              } catch (error) {
                                                console.log(error);
                                              }
                                            
                                            }
                                            useEffect(() => {
                                              if (leadinfo.source) { // You can add more checks here if needed
                                                fetchdata1();
                                              }
                                            }, [leadinfo.source]);



                                            const countrycode=["Afghanistan +93","Aland Islands +358","Albania +355","Algeria +213","American Samoa +1684","Andorra +376",
                                              "Angola +244","Anguilla +1264","Antarctica +672","Antigua and Barbuda +1268","Argentina +54","Armenia +374",
                                              "Aruba +297","Australia +61","Austria +43","Azerbaijan +994","Bahamas +1242","Bahrain +973","Bangladesh +880",
                                              "Barbados +1246","Belarus +375","Belgium +32","Belize +501","Benin +229","Bermuda +1441","Bhutan +975",
                                              "Bolivia +591","Bonaire, Sint Eustatius and Saba +599","Bosnia and Herzegovina +387","Botswana +267",
                                              "Bouvet Island +55","Brazil +55","British Indian Ocean Territory +246","Brunei Darussalam +673","Bulgaria +359",
                                              "Burkina Faso +226","Burundi +257","Cambodia +855","Cameroon +237","Canada +1","Cape Verde +238","Cayman Islands +1345",
                                              "Central African Republic +236","Chad +235","Chile +56","China +86","Christmas Island +61","Cocos (Keeling) Islands +672",
                                              "Colombia +57","Comoros +269","Congo +242","Congo, Democratic Republic of the Congo +242","Cook Islands +682",
                                              "Costa Rica +506","Cote D'Ivoire +225","Croatia +385","Cuba +53","Curacao +599","Cyprus +357","Czech Republic +420",
                                              "Denmark +45","Djibouti +253","Dominica +1767","Dominican Republic +1809","Ecuador +593","Egypt +20",
                                              "El Salvador +503","Equatorial Guinea +240","Eritrea +291","Estonia +372","Ethiopia +251","Falkland Islands (Malvinas) +500",
                                              "Faroe Islands +298","Fiji +679","Finland +358","France +33","French Guiana +594","French Polynesia +689",
                                              "French Southern Territories +262","Gabon +241","Gambia +220","Georgia +995","Germany +49","Ghana +233","Gibraltar +350",
                                              "Greece +30","Greenland +299","Grenada +1473","Guadeloupe +590","Guam +1671","Guatemala +502","Guernsey +44",
                                              "Guinea +224","Guinea-Bissau +245","Guyana +592","Haiti +509","Holy See (Vatican City State) +39","Honduras +504",
                                              "Hong Kong +852","Hungary +36","Iceland +354","India +91","Indonesia +62","Iran, Islamic Republic of +98","Iraq +964",
                                              "Ireland +353","Isle of Man +44","Israel +972","Italy +39","Jamaica +1876","Japan +81","Jersey +44","Jordan +962",
                                              "Kazakhstan +7","Kenya +254","Kiribati +686","Korea Democratic People's Republic of +850","Korea Republic of +82","Kosovo +383",
                                              "Kuwait +965","Kyrgyzstan +996","Lao People's Democratic Republic +856","Latvia +371","Lebanon +961","Lesotho +266",
                                              "Liberia +231","Libyan Arab Jamahiriya +218","Liechtenstein +423","Lithuania +370","Luxembourg +352","Macao +853",
                                              "Macedonia, the Former Yugoslav Republic of +389","Madagascar +261","Malawi +265","Malaysia +60","Maldives +960",
                                              "Mali +223","Malta +356","Marshall Islands +692","Martinique +596","Mauritania +222","Mauritius +230","Mayotte +262",
                                              "Mexico +52","Micronesia, Federated States of +691","Moldova, Republic of +373","Monaco +377","Mongolia +976",
                                              "Montenegro +382","Montserrat +1664","Morocco +212","Mozambique +258","Myanmar +95","Namibia +264","Nauru +674",
                                              "Nepal +977","Netherlands +31","Netherlands Antilles +599","New Caledonia +687","New Zealand +64","Nicaragua +505",
                                              "Niger +227","Nigeria +234","Niue +683","Norfolk Island +672","Northern Mariana Islands +1670","Norway +47",
                                              "Oman +968","Pakistan +92","Palau +680","Palestinian Territory, Occupied +970","Panama +507","Papua New Guinea +675",
                                              "Paraguay +595","Peru +51","Philippines +63","Pitcairn +64","Poland +48","Portugal +351","Puerto Rico +1787",
                                              "Qatar +974","Reunion +262","Romania +40","Russian Federation +7","Rwanda +250","Saint Barthelemy +590",
                                              "Saint Helena +290","Saint Kitts and Nevis +1869","Saint Lucia +1758","Saint Martin +590","Saint Pierre and Miquelon +508",
                                              "Saint Vincent and the Grenadines +1784","Samoa +684","San Marino +378","Sao Tome and Principe +239","Saudi Arabia +966",
                                              "Senegal +221","Serbia +381","Serbia and Montenegro +381","Seychelles +248","Sierra Leone +232","Singapore +65",
                                              "Sint Maarten +721","Slovakia +421","Slovenia +386","Solomon Islands +677","Somalia +252","South Africa +27",
                                              "South Georgia and the South Sandwich Islands +500","South Sudan +211","Spain +34","Sri Lanka +94","Sudan +249",
                                              "Suriname +597","Svalbard and Jan Mayen +47","Swaziland +268","Sweden +46","Switzerland +41","Syrian Arab Republic +963",
                                              "Taiwan, Province of China +886","Tajikistan +992","Tanzania, United Republic of +255","Thailand +66","Timor-Leste +670",
                                              "Togo +228","Tokelau +690","Tonga +676","Trinidad and Tobago +1868","Tunisia +216","Turkey +90","Turkmenistan +7370",
                                              "Turks and Caicos Islands +1649","Tuvalu +688","Uganda +256","Ukraine +380","United Arab Emirates +971",
                                              "United Kingdom +44","United States +1","United States Minor Outlying Islands +1","Uruguay +598","Uzbekistan +998",
                                              "Vanuatu +678","Venezuela +58","Viet Nam +84","Virgin Islands, British +1284","Virgin Islands, U.s. +1340",
                                              "Wallis and Futuna +681","Western Sahara +212","Yemen +967","Zambia +260","Zimbabwe +263"]



// =========================edit lead end===================================================================================




// ===================================add document start=================================================================================



const [isLoading, setIsLoading] = useState(false);

const [show8, setshow8] = useState(false);

const[leaddocument,setleaddocument]=useState({document_no:[''],document_name:[''],document_pic:[''],action81:[]})

function addFn81() {
              
  setleaddocument({
    ...leaddocument,
    document_no: [...leaddocument.document_no, ''],
    document_name: [...leaddocument.document_name, ''],
    document_pic: [...leaddocument.document_pic, ''],
    action81: [...leaddocument.action81, '']
  });
};
const deleteall81=(index)=>
  {
   
    const newdocumentno = leaddocument.document_no.filter((_, i) => i !== index);
    const newdocumentname = leaddocument.document_name.filter((_, i) => i !== index);
    const newdocumentpic = leaddocument.document_pic.filter((_, i) => i !== index);
    const newaction8=leaddocument.action81.filter((_,i) => i !== index);
    
    setleaddocument({
      ...leaddocument,
      document_no: newdocumentno,
      document_name: newdocumentname,
      document_pic: newdocumentpic,
      action81:newaction8
    });
  }
  const handledocumentnochange1 = (index, event) => {
    const newdocumentno = [...leaddocument.document_no];
    newdocumentno[index] = event.target.value;
    setleaddocument({
      ...leaddocument,
      document_no: newdocumentno
    });
  };
  const handledocumentnamechange1 = (index, event) => {
    const newdocumentname = [...leaddocument.document_name];
    newdocumentname[index] = event.target.value;
    setleaddocument({
      ...leaddocument,
      document_name: newdocumentname
    });
  };
  const handledocumentpicchange1 = (index, event) => {
    const newdocumentpic = [...leaddocument.document_pic];
    const files = Array.from(event.target.files);
    newdocumentpic[index] = {files:files}
    setleaddocument({
      ...leaddocument,
      document_pic: newdocumentpic
    });
  };


const handleClose8 = () => setshow8(false);
const handleShow8=async()=>
{ 
setshow8(true);
const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
setactivity({...activity,activity_name:"added docuemnt",lead:fullname})
}

const updatedocumentoflead = async () => {
try {
  setIsLoading(true); // Show loader before API call
  const id = lead._id;  // Assuming selectedItems is the ID of the lead to update
  const resp = await api.put(`adddocumentinlead/${id}`, leaddocument, {
    headers: {
      'Content-Type': 'multipart/form-data', // Ensure proper content-type for form-data
    },
  });
  const resp1=await api.post('addactivity',activity)

  toast.success("Document added Successfully...", { autoClose: 2000 });

  // After success, navigate to the lead details page or reload
  // setTimeout(() => {
  //   navigate('/leaddetails');
  // }, 2000);
  setTimeout(() => {
    window.location.reload();  // If necessary, reload the page
  }, 2000);
} catch (error) {
  console.log(error);
}finally {
  setIsLoading(false); // Hide loader after API call
}
};



const handleDownload = (item) => {
  if (!item.pic) {
    console.error("Image URL is not provided!");
    return;
  }

  // Modify the Cloudinary URL to force download
  const downloadUrl = item.pic.replace("/upload/", "/upload/fl_attachment/");

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = item.name || "downloaded_image.png"; // Set filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


// =======================================================add document end==============================================================


//================================= update document start=========================================================================

const [show14, setshow14] = useState(false);

const[updatedocument,setupdatedocument]=useState({document_no:"",document_name:"",document_pic:['']})

const handleClose14 = () => setshow14(false);
const handleShow14=async(item)=>
{
      setupdatedocument({document_no:item.number,document_name:item.name,document_pic:item.pic})
      setshow14(true);
      
   
}

const handledocumentnochange11 = ( event) => {
  setupdatedocument({
    ...updatedocument,
    document_no: event.target.value
  });
};

const handledocumentpicchange11 = (event) => {
  
  const files = Array.from(event.target.files);
  setupdatedocument({
    ...updatedocument,
    document_pic: files
  });
};


  const updatesingledocument=async()=>
  {
    try {
      setIsLoading(true); 
      const resp=await api.put(`updateleaddocumentsingle/${lead._id}`,updatedocument,config)
      if(resp.status===200)
        {
          Swal.fire({
            icon: 'success',
            title: 'Document Updated',
            text: 'Your document has been update successfully!',
          });
          handleClose14()
        }
        setTimeout(() => {
         navigate('/leaddetails')
        }, 1000);
      
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false); // Hide loader after API call
    }
  }




//==================================================== update document end========================================================


//================================================= delete document start==========================================================

const deletesingledocument=async(item)=>
  {
    try {
      setIsLoading(true); 
      const document_name = { document_name: item.name }; // Wrap inside an object
      const resp=await api.delete(`deleteleadsingledocument/${lead._id}`,{data: document_name})
      if(resp.status===200)
        {
          Swal.fire({
            icon: 'success',
            title: 'Document Deleted',
            text: 'Your document has been deleted successfully!',
          });
        }
        setTimeout(() => {
         navigate('/leaddetails')
        }, 1000);
      
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false); // Hide loader after API call
    }
  }


// ================================================delete document end==========================================================



// ==============================================search loaction from google start========================================================
                                                
                                                    
                       
                                              const inputRef = useRef(null);
                                              const apiKey = 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc';
                                            
                                              useEffect(() => {
                                                const scriptExists = document.querySelector('#google-maps-script');
                                                if (!scriptExists) {
                                                  const script = document.createElement('script');
                                                  script.id = 'google-maps-script';
                                                  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                                                  script.async = true;
                                                  script.defer = true;
                                                  script.onload = initializeAutocomplete;
                                                  document.body.appendChild(script);
                                                } else {
                                                  initializeAutocomplete();
                                                }
                                              }, []);
                                            
                                              const initializeAutocomplete = () => {
                                                if (!inputRef.current || !window.google) return;
                                            
                                                const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                                                  types: ['geocode']
                                                });
                                            
                                                autocomplete.addListener('place_changed', () => {
                                                  const place = autocomplete.getPlace();
                                                  if (!place.geometry) return;
                                            
                                                  const lat = place.geometry.location.lat();
                                                  const lng = place.geometry.location.lng();
                                            
                                                  const components = place.address_components;
                                                  let address = '', city = '', zip = '', state = '', country = '';
                                            
                                                  components.forEach(component => {
                                                    const types = component.types;
                                                    if (types.includes('route') || types.includes('sublocality')) {
                                                      address += component.long_name + ' ';
                                                    }
                                                    if (types.includes('locality')) {
                                                      city = component.long_name;
                                                    }
                                                    if (types.includes('postal_code')) {
                                                      zip = component.long_name;
                                                    }
                                                    if (types.includes('administrative_area_level_1')) {
                                                      state = component.long_name;
                                                    }
                                                    if (types.includes('country')) {
                                                      country = component.long_name;
                                                    }
                                                  });
                                            
                                                  setleadinfo(prev => ({
                                                    ...prev,
                                                    search_location: place.formatted_address,
                                                    street_address: address.trim(),
                                                    city2: city,
                                                    pincode2: zip,
                                                    state2: state,
                                                    country2: country,
                                                    lattitude: lat,
                                                    longitude: lng
                                                  }));
                                                });
                                              };
                                            
                                              const getlocation = async (e) => {
                                                e.preventDefault();
                                                try {
                                                  const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                                                    params: {
                                                      address: leadinfo.search_location,
                                                      key: apiKey
                                                    }
                                                  });
                                            
                                                  if (res.data.results.length > 0) {
                                                    const result = res.data.results[0];
                                                    const lat = result.geometry.location.lat;
                                                    const lng = result.geometry.location.lng;
                                            
                                                    const components = result.address_components;
                                                    let address = '', city = '', zip = '', state = '', country = '';
                                            
                                                    components.forEach(component => {
                                                      const types = component.types;
                                                      if (types.includes('route') || types.includes('sublocality')) {
                                                        address += component.long_name + ' ';
                                                      }
                                                      if (types.includes('locality')) {
                                                        city = component.long_name;
                                                      }
                                                      if (types.includes('postal_code')) {
                                                        zip = component.long_name;
                                                      }
                                                      if (types.includes('administrative_area_level_1')) {
                                                        state = component.long_name;
                                                      }
                                                      if (types.includes('country')) {
                                                        country = component.long_name;
                                                      }
                                                    });
                                            
                                                    setleadinfo(prev => ({
                                                      ...prev,
                                                      street_address: address.trim(),
                                                      city2: city,
                                                      pincode2: zip,
                                                      state2: state,
                                                      country2: country,
                                                      lattitude: lat,
                                                      longitude: lng
                                                    }));
                                                  }
                                                } catch (err) {
                                                  console.error('Geocode error:', err);
                                                }
                                              };
                      
                                                
                                                
//================================================ search location from google end=====================================================

  return (
    <div style={{overflowX:"hidden"}}>
      <Header1/>
      <Sidebar1/>


       <div style={{marginTop:"60px",backgroundColor:"white",height:"80px",paddingLeft:"80px"}}>
        <div  style={{padding:"10px",borderRadius:"10px"}} >
          <h6>Lead</h6>
          <h3 style={{fontWeight:"normal",color:"blue",fontFamily:"times-new-roman"}}>{lead.title} {lead.first_name} {lead.last_name}<span style={{fontSize:"14px",marginLeft:"10px",color:"black"}}>{lead.company_name}
          <a class=" dropdown"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-three-dots-vertical" style={{fontSize:"24px",cursor:"pointer",color:"black"}}></i>
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{cursor:"pointer",lineHeight:"30px",paddingLeft:"10px",fontFamily:"arial",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",fontSize:"14px"}}>
              <li><img src='https://png.pngtree.com/png-clipart/20230502/original/pngtree-vision-line-icon-png-image_9133793.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Preview</li>
              <li><img src={publish} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Publish</li>
              <li><img src={createbooking} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Create Booking</li>
              <li><img src={matchedlead} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Matched Lead</li>
              <li><img src={transferuser} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Transfer User
              <span style={{content: '""',position: "absolute",bottom: "60px",left: "10px",right: "10px",height: "1px",backgroundColor: "black"}}></span>
              </li>
              <li onClick={handleShow7}><img src='https://icons.veryicon.com/png/o/miscellaneous/iconfonts/edit-423.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Edit</li>
              <li><img src='https://static-00.iconduck.com/assets.00/delete-icon-932x1024-nylj0i2z.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Delete</li>
            </ul>
            <button style={{width:"50px",height:"30px",borderColor:"blue",borderRadius:"5px",fontSize:"14px", position: "absolute",  right: "10px",backgroundColor:"white"}} onClick={handleToggle}>{buttonText}</button>
    
          </span>
          </h3>
        </div>
      </div>
      

      <div className='row' style={{display:"flex",height:"100%",marginLeft:"60px",width:"100%",gap:"10px",marginTop:"5px",paddingBottom:"50px",backgroundColor:"white"}}>
        <div className='col-md-3' style={{padding:"20px",fontSize:"14px",fontFamily:"arial"}}>
            {/* <div style={{display:"flex",}}>
                <h6 style={{fontFamily:"times-new-roman"}}>{lead.title} {lead.first_name} {lead.last_name}
                    <p style={{fontSize:"12px",fontWeight:"normal"}}>{lead.email}</p>
                </h6>
                <h6 style={{marginLeft:"35%"}}>Site Visit</h6>
                <h6 style={{marginLeft:"20px"}}>Task</h6>
            </div> */}
            {/* <hr style={{ border: "none", borderTop: "2px solid gray",marginTop:"-10px" }} /> */}
            <div className='row'>
            <div className="col-md-3 d-flex justify-content-center align-items-center">
        <div style={{ width: 60, height: 60 }}>
          {/* <CircularProgressbar
            value={lead?.score}
            stkroeWidth={30}
          
            text={`${lead?.score}`}
            styles={buildStyles({
              pathColor:
              lead?.score > 90
                ? '#4caf50' : lead?.score >= 71 ? '#f44336' : lead?.score >= 46 ? '#ff9800' : lead?.score >= 26 ? '#ffeb3b' : '#2196f3',
              textColor:"#000000",
              trailColor: "#f0f0f0",
              strokeLinecap: "round",
              textSize: "18px",
            })}
          /> */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
   {/* Circular Progress with dynamic color and percentage in center */}
              <Box position="relative" display="inline-flex">
                <CircularProgress
                  variant="determinate"
                  value={lead?.score}
                  size={50}
                  thickness={30}
                  style={{
                    color:
                    lead.score > 90
                    ? '#4caf50' // Green
                    : lead.score >= 71
                    ? '#f44336' // Red
                    : lead.score >= 46
                    ? '#ff9800' // Orange
                    : lead.score >= 26
                    ? '#ffeb3b' // Yellow
                    : '#2196f3', // Blue

                    transition: 'all 3s ease-in-out',
                  }}
                />
                <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="caption"
                    component="div"
                    style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}
                  >
                    {lead.score}
                  </Typography>
                </Box>
              </Box>
              </Box>
          
        </div>
      </div>
      <div className="col-md-5">
        <label style={{ color: "#B85042" }}>Status</label>
        <select className="form-control form-control-sm">
          <option>{lead?.stage ? String(lead.stage) : "---Select---"}</option>
                        <option>---select---</option>
                        <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Oppurtunity</option>
                        <option>Booked</option>
                        <optgroup label="Closed" style={{fontWeight:"bolder",color:"blue"}}>
                        <option style={{color:"green"}}>Won</option>
                        <option style={{color:"red"}}>Lost</option>
                        <option style={{color:"gray"}}>Unqualified </option>
                        </optgroup>
        </select>
      </div>

                <div className='col-md-4'>
                   <Tooltip title="Update Status..." arrow>
                  <img src='https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png' style={{height:"30px",marginTop:"30px",cursor:"pointer"}} ></img>
                </Tooltip>
                  </div>

                <div className="col-md-6" >
                            <label  style={{color:"#B85042"}}>Mobile</label>
                <FormControl fullWidth size="small">
                  <InputLabel id="mobile-label" style={{paddingTop:"23px",fontSize:"18px"}}>
                  <img
                        src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg"
                        alt="call-icon"
                        style={{ height: '30px', marginRight: '4px' }}
                      />
                  {lead.mobile_no}</InputLabel>
                  <Select
                    labelId="mobile-label"
                    id="mobile-select"
                    value={lead.mobile_no}  // Always keep the mobile number as the value
                    style={{ fontSize: '14px', boxShadow: 'none' }}  // Remove outline and any box shadow
                    MenuProps={{
                      PaperProps: {
                        // style: {
                        //   maxHeight: 200, // Limit dropdown height
                        // },
                      },
                    }}
                  >
                
                    {/* Action options */}
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg"
                        alt="call-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Call Directly
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/005/911/524/non_2x/desktop-computer-icon-desktop-computer-symbol-free-vector.jpg"
                        alt="message-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Call Via Desktop App
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://static.thenounproject.com/png/888710-200.png"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Add To Call List
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}} onClick={handleShow1}>
                      <img
                        src="https://www.iconpacks.net/icons/2/free-plus-icon-3107-thumb.png"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Log a Call
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://static-00.iconduck.com/assets.00/view-list-text-icon-512x512-5d2by98p.png"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      View Script
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}} onClick={handleCopy }>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0e6jgH9MKFXVyOdjqtb-8Y2AGgtNybnD4g&s"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                    Copy {lead.mobile_no}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
                <div className='col-md-3' style={{marginTop:"25px"}}><label style={{color:"#B85042"}}>Tags</label><p style={{lineHeight:"0px",fontWeight:"normal"}}>{lead.tags}</p></div>
                <div className='col-md-3'></div>

            

                <div className='col-md-5' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>User</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.owner}({lead.team})</p>
                </div>
                <div className='col-md-3' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>Team</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.team}</p></div>
                <div className='col-md-4' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>Time Zone</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>Asia/Kolkata</p></div>


                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Recived On</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{new Date(lead.createdAt).toLocaleString()}</p>
                </div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Source</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.campegin}, {lead.source}, {lead.sub_source}</p></div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Last Conduct At</label><p style={{ wordWrap: "break-word", whiteSpace: "normal",marginTop:"-10px",fontWeight:"normal"}}>{formattedDate}</p></div>
                <div className='col-md-12'><hr></hr></div>

                <div className='row' style={{border:"1px solid gray",margin:"10px",width:"100%",borderRadius:"5px",padding:"10px"}}> 
                    <div className='col-md-10' style={{color:"blue",fontWeight:"normal"}}>{lead.requirment}</div>
                    <div className='col-md-2'  style={{cursor: "pointer",fontSize: "30px",marginTop: "-7px",fontWeight:"lighter"}}>+</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p style={{fontWeight:"normal"}}>Location-{lead.location} {lead.city}</p></div>

                    <div className='col-md-4' ><label style={{color:"#B85042"}}>Property Type</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal",fontWeight:"normal"}}>{lead.property_type?.join(',')}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Sub Type</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.sub_type}</p></div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Unit Type</label><p style={{marginTop:"-10px",fontWeight:"normal",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.unit_type}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Budget</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.budget_min} to {lead.budget_max}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Area/Size</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.minimum_area}{lead.area_metric} to {lead.maximum_area}{lead.area_metric}</p></div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Furnishing</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.furnishing}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Facing</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.facing?.join(',')}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Transaction Type</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.transaction_type}</p></div>
                <div className='col-md-4' ><label>Timeline</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.timeline}</p></div>

                <div className='col-md-8' ><label style={{color:"#B85042"}}>Specific Requirment</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}></p>
                </div>
                
                
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Road</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.road?.join(',')}</p></div>

                </div>

                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12' style={{color:"blue",fontWeight:"normal"}}>Personal Details</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p style={{fontWeight:"normal"}}>Father/Husband Name-{lead.father_husband_name} {lead.city}</p></div>

                    <div className='col-md-3' ><label style={{color:"#B85042"}}>Address</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal",fontWeight:"normal"}}>{lead.h_no}</p>
                </div>
                <div className='col-md-3'><label style={{color:"#B85042"}}>Area/Location</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.area1}</p></div>
                <div className='col-md-2' ><label style={{color:"#B85042"}}>City</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.city1}</p></div>
                <div className='col-md-2'><label style={{color:"#B85042"}}>State</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.state1}</p></div>
                <div className='col-md-2' ><label style={{color:"#B85042"}}>Zip</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.pincode1}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Job Title</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.designation}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Company/Organisation</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.company_name}</p></div>
             


                </div>



            </div>
        </div>
        <div className={isSmall ? 'col-md-8' : 'col-md-5'} style={{padding:"10px",transition:"className 1s ease"}}>
            <div className='row'>

            {/* <div className="col-md-12"><select className='form-control form-control-sm' style={{border:"none",backgroundColor:" #ffe6e6",backgroundImage: "url('https://p7.hiclipart.com/preview/218/63/773/writing-computer-icons-website-content-writer-reading-download-png-writing-icon.jpg')", backgroundSize: "30px 30px",backgroundRepeat: "no-repeat",backgroundPosition: "left center",paddingLeft: "40px", appearance: 'none',paddingRight: "30px"}}>
                <option>Internal Notes</option>
                <option>Email</option>
                <option>SMS</option>
                </select>
                <div style={{
    position: 'absolute',
    right: '65%',
    top: '15%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  }}>
    <span style={{
      fontSize: '16px', 
      color: '#333', 
      fontWeight: 'bold'
    }}>▼</span> {/* You can replace this with an image or icon 
  </div>

                <textarea  className='form-control form-control-sm' style={{ position: "relative",height:"100px",backgroundColor:" #ffe6e6",border:"none"}}/></div> */}
            
            {/* <div className='col-md-7'></div>
            <div className='col-md-3' style={{position: 'absolute', top: '100px',marginLeft:"60%",transition: 'background-color 0.3s ease'}} onMouseOver={(e) => e.target.style.backgroundColor = '#2196F3'} // On hover, change color to blue
                 onMouseOut={(e) => e.target.style.backgroundColor = ' #ffe6e6'}><button className='form-control form-control-sm' style={{backgroundColor:" #ffe6e6",border:"none"}}>Cancel</button></div>
            <div className='col-md-2' style={{position: 'absolute', top: '100px',marginLeft:"80%",transition: 'background-color 0.3s ease'}}    onMouseOver={(e) => e.target.style.backgroundColor = '#2196F3'} // On hover, change color to blue
                 onMouseOut={(e) => e.target.style.backgroundColor = ' #ffe6e6'}><button className='form-control form-control-sm' style={{backgroundColor:" #ffe6e6",border:"none"}}>Add</button></div> */}


<div className="col-md-11">
      <FormControl fullWidth size="small">
        <Select
          labelId="mobile-label"
          id="mobile-select"
          value={selectedOption} // Bind the value to state
          onChange={handleChange} // Update the state when the value changes
          style={{ fontSize: "14px", boxShadow: "none",height: selectedOption === "Email" ? "300px" : selectedOption === "Internal Notes" ? "180px" : "50px",
            display: "flex", // Flexbox to align items
            flexDirection: "column", // Stack items vertically
            justifyContent: "flex-start", // Align items to the top
            paddingLeft: "15px",paddingTop:"5px",
            backgroundColor:selectedOption==="Internal Notes"?"#ffe6e6":"white"
           }}
            IconComponent={null}
            
        >
          {/* Action options */}
          <MenuItem value="Email" style={{ fontSize: "14px" }}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-email-icon-download-in-svg-png-gif-file-formats--envenlope-letter-mail-user-interface-pack-icons-83578.png"
              alt="call-icon"
              style={{ height: "16px", marginRight: "8px" }}
            />
            Email             {selectedOption === "Email" && lead && (
              <span style={{marginLeft:"20%"}}>
                {" |"}
                {lead.title} {lead.first_name} {lead.last_name}
              </span>
              
            )}
          </MenuItem>
          <MenuItem value="SMS" style={{ fontSize: "14px" }}>
            <img
              src="https://thumbs.dreamstime.com/b/sms-sign-icon-black-editable-vector-illustration-isolated-white-background-sms-icon-black-124325394.jpg"
              alt="message-icon"
              style={{ height: "16px", marginRight: "8px" }}
            />
            SMS
          </MenuItem>

          <MenuItem value="Whats App" style={{ fontSize: "14px",}}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/001/505/060/non_2x/notes-icon-free-vector.jpg"
              alt="whatsapp-icon"
              style={{ height: "16px", marginRight: "8px" }}
            />
            Whats App
          </MenuItem>
          
          <MenuItem value="Internal Notes" style={{ fontSize: "14px",backgroundColor:"#ffe6e6" }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/001/505/060/non_2x/notes-icon-free-vector.jpg"
              alt="whatsapp-icon"
              style={{ height: "16px", marginRight: "8px" }}
            />
            Internal Notes
          </MenuItem>

         
         
        </Select>
        {selectedOption === "Email" && (
          <div style={{marginTop:"-250px",  padding: "10px", border: "1px solid #ccc",height:"250px" }}>
         
         <div className="row mt-2" id="sendmail" style={{fontSize:"12px"}}>
       {/* <div className="col-md-12"><label className="labels">Recipients</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={lead.email} /></div> */}
       <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <input type="text" style={{border:"none",fontSize:"12px",borderBottom:"1px solid gray"}} required="true" className="form-control form-control-sm" placeholder='subject' value={subject} onChange={(e)=>setsubject(e.target.value)}/>
       <Select
                multiple
                value={selectedOptions}
                onChange={handleSelectChange}
                style={{ fontSize: "12px", width: "20%",border:"none" }}
                displayEmpty
              >
                {/* Dropdown for selecting fields to include in the subject */}
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="city">City</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="company">Company</MenuItem>
                <MenuItem value="designation">Designation</MenuItem>
              </Select>
       </div>
      

       <div className="col-md-12" style={{marginTop:"5px"}}>
          <ReactQuill
        modules={modules1}  // Add the toolbar options for formatting
        style={{ height: '80px', width: '100%',fontSize:"12px",marginTop:"5px"}}
        className="my-quill-editor"
        value={message}   placeholder="Enter Your Message"  onChange={handlemailmessage}/>
        </div>
       <div className="col-md-4" style={{fontSize:"12px",marginTop:"40px"}}><label className="labels" style={{fontSize:"12px"}}>Templates</label>
       <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate} onChange={handleTemplateSelect} style={{fontSize:"12px"}}>
          <option value="">---Select Template---</option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>
       </div>

       <div className="col-md-4" {...getRootProps()} style={{ border: '1px dashed #ccc',marginTop:"60px", cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p style={{fontSize:"12px"}}>Drag & drop files here, or click to select files</p>
        <ul>
          {attachments.length > 0 && attachments.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <div className='col-md-2' style={{marginTop:"70px",marginLeft:"50px"}}><button className='form-control form-control-sm' onClick={sendmail}>send</button></div>
   </div>

          </div>
        )}


{selectedOption === "Internal Notes" && (
          <div style={{marginTop:"-130px",  padding: "10px", border: "1px solid #ccc",height:"130px",backgroundColor:"#ffe6e6" }}>
         
         <div className="col-md-12">
          {/* <textarea  className="form-control form-control-sm" value={message?message:''}  placeholder="Enter Your Message" style={{height:"80px",border:"none",fontSize:"12px",}} onChange={handlemailmessage}/> */}
          <ReactQuill
        modules={modules1}  // Add the toolbar options for formatting
        style={{ height: '80px', width: '100%',fontSize:"12px"}}
        className="my-quill-editor"
        value={activity.activity_note1}  // Bind the editor with state
        onChange={handleactivitynoteschange}
      />
          </div>
          <div className='col-md-2' style={{marginTop:"10px",marginLeft:"85%"}}><button style={{backgroundColor:"#ffe6e6",border:"none"}} className='form-control form-control-sm' onClick={addactivity}>Add</button></div>

          </div>
        )}
   
      </FormControl>
    </div>

    

    




            <div className='col-md-12' style={{marginTop:"20px"}}><input type='checkbox'></input><span>show on primary contact</span></div>

         

<div className='col-md-4' style={{display:"flex",marginTop:"20px"}}>
    <p style={{marginLeft: "10px",fontSize:"14px" }}>Displaying</p>
        <div style={{paddingLeft:"10px"}}>
        <span style={{fontWeight:"bold",fontSize:"12px",cursor:"pointer"}}   onClick={() => setShowDropdown(!showDropdown)} >all activity</span>
        {showDropdown && (
  <div
  ref={dropdownRef}
    className="dropdown-container"
    style={{
      position: 'absolute',
      marginTop: '0px',
      left: '10%',
      width: '200px',
      height:"200px",
      overflowY:"scroll",
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      
    }}
  >
    {activityname.map((activity) => (
      <div key={activity} className="dropdown-item" style={{height:"40px",fontSize:"14px",color:"#783894"}} >
        <label>
                <input
                  type="checkbox"
                  checked={selectactivity.includes(activity)}
                  onChange={() => handlefilterCheckboxChange(activity)}
                  style={{ marginRight: '8px', }}
                />
                {activity}
              </label>
            </div>
              ))}
            </div>
          )}

        </div>
    {/* <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
      fontWeight:"bold",
      marginTop:"-8px"
      }}
    >
      <option>all activity</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select> */}
</div>

<div className='col-md-4' style={{display:"flex",marginTop:"20px"}}>
    <p style={{marginBottom: "0" }}>By</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
        fontWeight:"bold",
         marginTop:"-8px"
      
      }}
    >
      <option>everyone</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>
    </div>


    {/* <p style={{marginBottom: "0", whiteSpace: "nowrap" }}>Related to</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
    fontWeight:"bold",
     marginTop:"-8px",
      width:"80px"
      }}
    >
      <option>all</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select> */}


<div className='col-md-4' style={{display:"flex",marginTop:"20px"}}>
    <p style={{marginBottom: "0" }}>Tagged</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
       fontWeight:"bold",
        marginTop:"-8px",
        marginRight:"20px",
       
      }}
    >
      <option>any</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>
    </div>

<div className='col-md-12'><hr></hr></div>



                {
                allactivity && allactivity.length>0 ? (
                    <div className='col-md-11' style={{maxHeight:"830px",overflowY:"scroll",borderRadius:"5px",width:"100%",marginLeft:"20px",padding:"10px",marginTop:"10px",fontSize:"12px"}}>
                
                        {allactivity.slice().reverse().map((item, index) => (
                          item.activity_name==="call"?(
                            <div id='callaction' >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src='https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg' alt='' style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            {/* <span  style={{marginLeft:"5%"}}><img id='deletebutton' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgCtB72sd2csn3h4Xoktuuub7vFQQ-dGBOw&s' style={{height:"20px",cursor:"pointer"}} onClick={()=>deleteactivity(item._id)}></img></span> */}
                            <span  style={{marginLeft:"0%",display:"inline-block"}}>
                            <Dropdown >
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>
                            </div>
                            <span>{lead.owner} called <u> {lead.title} {lead.first_name} {lead.last_name}</u></span><br></br>
                            <span style={{fontWeight:"bold"}}>{item.call_outcome}</span> Outcome<br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.activity_note }} />
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) :  item.activity_name==="email"?(
                            <div id='mailaction' onClick={()=>toggleExpand(item._id)}
                                style={{
                                  cursor: "pointer",
                                  overflow: "hidden",
                                  height: isExpanded ? "auto" : "80px", // Height based on expanded state
                                  transition: "height 0.3s ease", // Smooth transition for height change
                                }}>
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src='https://illustoon.com/photo/2751.png' alt='' style={{height:"20px"}}></img>
                            
         
                           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown >
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>

                            <span style={{fontSize:"10px"}}>you sent an email to {lead.title} {lead.first_name} {lead.last_name}</span><br></br>
                            <span><u> {lead.email}  </u></span><br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.message }} /><br></br>
                            <span style={{fontWeight:"bold"}}>{lead.owner}</span>
                           <hr></hr>
                            <br></br>
                            {!isExpanded && (
                              <hr style={{ marginTop: "10px", borderTop: "1px solid black" }} />
                            )}
                            </div>
                           
                       
                          ) : item.activity_name==="notes"?(
                            <div id='noteaction' >
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                <img src="https://static.vecteezy.com/system/resources/previews/001/505/060/non_2x/notes-icon-free-vector.jpg" alt='' style={{height:"20px"}}></img>
                            
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            {/* <span  style={{marginLeft:"5%"}}><img id='deletebutton' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgCtB72sd2csn3h4Xoktuuub7vFQQ-dGBOw&s' style={{height:"20px",cursor:"pointer"}} onClick={()=>deleteactivity(item._id)}></img></span> */}

                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown >
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span><u>{lead.owner}</u> left a note</span><br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.activity_note1 }} />
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="complete call task"?(
                            <div id='completecallaction' >
                           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                          <img 
                            src="https://cdn3d.iconscout.com/3d/premium/thumb/two-way-communication-3d-icon-download-in-png-blend-fbx-gltf-file-formats--chat-chatting-people-join-call-center-pack-icons-8400040.png" 
                            alt='' 
                            style={{ height: "20px" }} 
                          />

                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>

                            <Dropdown>
                              <Dropdown.Toggle 
                                variant="success" 
                                id="dropdown-basic" 
                                style={{ border: "none", color: "black", backgroundColor: "transparent" }}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{ fontSize: "12px" }}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => deleteactivity(item._id)} style={{ fontSize: "12px" }}>Delete</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>

                            <span><u>{lead.owner}</u> {item.activity_name} of {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="complete mail task"?(
                            <div id='completemailaction' >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.flaticon.com/512/4697/4697867.png" alt='' style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>
                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} of {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) :  item.activity_name==="complete meeting task"?(
                            <div id='completemeetingaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.flaticon.com/512/1081/1081530.png" alt='' style={{height:"20px"}}></img>

                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>
                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} with {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) :  item.activity_name==="complete site visit task"?(
                            <div id='completsitevisitaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.freepik.com/512/8094/8094388.png" alt='' style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} with {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="edit"?(
                            <div id='editaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://www.freeiconspng.com/uploads/document-edit-icon-19.png" alt='' style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} {item.lead} {item.edit_field} with {item.edit_value}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create call task"?(
                            <div id='createcalltaskaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://www.shutterstock.com/image-vector/call-planner-icon-time-management-260nw-1414111730.jpg" alt='' style={{height:"40px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span>{item.task_title}</span><br></br>
                            <span style={{color:"blue"}}>Created by <u>{lead.owner}</u></span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create mail task"?(
                            <div id='createmailtaskaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.freepik.com/256/16294/16294372.png?semt=ais_hybrid" alt='' style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create meeting task"?(
                            <div id='createmeetingtaskaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://t4.ftcdn.net/jpg/03/67/61/45/360_F_367614596_kyv8YYMpghwJ6pR6NHp7oyIN1IVnfHvF.jpg" alt='' style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create site visit task"?(
                            <div id='createsitevisittaskction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.freepik.com/256/13156/13156025.png?semt=ais_hybrid" alt='' style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="deal created"?(
                            <div id='createsitevisittaskction' >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.flaticon.com/512/2132/2132939.png" alt='' style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>
                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="add inventory"?(
                            <div id='createsitevisittaskction' >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://icons.veryicon.com/png/o/miscellaneous/seiko-cloud-map-standard-library/add-inventory.png" alt='' style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>
                            </div>
                            <span style={{color:"blue"}}><u>{lead.owner}</u></span><span> {item.activity_name} {item.unitno} in {item.projectname}.</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="added docuemnt"?(
                            <div id='createsitevisittaskction' >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.flaticon.com/512/9425/9425017.png" alt='' style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"0%",display:"inline-block",}}>
                            <Dropdown>
                                   <Dropdown.Toggle variant="success" id="dropdown-basic" style={{border:"none",color:"black",backgroundColor:"transparent"}}>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item style={{fontSize:"12px"}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={()=>deleteactivity(item._id)} style={{fontSize:"12px"}}>Delete</Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                            </span>
                            </div>

                            </div>
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : <p>no activity</p>
                        ))}
                  

                    </div>
                    ): (
                      <p className="no-activity-flash" style={{fontSize:"14px",color:"red",paddingLeft:"20px"}}>no activity till now</p>
                    )
                }
                <div className='col-md-2'></div>

              

             

                <div className='col-md-12' style={{marginTop:"10px"}}>
                    <p style={{fontSize:"14px"}}><u>{lead.title} {lead.first_name} {lead.last_name}</u> added by {lead.owner?.join(',')}</p>
                </div>

            </div>

        </div>




        <div className='col-md-3' style={{padding:"10px",display:isSmall?"none":"block"}}>

        <div className='row'>

          <div className='col-md-12' style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px"}}>
        <div className='col-md-12' ><img src={matcheddeal} style={{height:"25px",paddingRight:"10px"}}></img>Deal Match (<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{lead.matcheddeals?.length || 0}</span>)
        <span 
          onClick={toggleTableVisibility} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "4px", // Align the arrow properly
           
          }}
        >
          ▽
        </span>
        <span 
         onClick={()=>navigate('/deal')}
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "15px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
            fontWeight:"lighter"
    
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,height: isTableVisible ? "200px" : "0",overflow: "auto",transition: "height 0.3s ease"}}>
      <TableContainer component={Paper} style={{ height: '200px'}}>
    <Table sx={{}} aria-label="customized table">
    {/* <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow style={{backgroundColor:"gray"}}>
          {allColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px",lineHeight:"5px" }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </thead> */}
       <tbody>
        {
         
        lead.matcheddeals?.map ((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            {/* <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px" }}>
              {index + 1}
            </StyledTableCell> */}
            <StyledTableCell style={{fontSize:"12px",cursor:"pointer",whiteSpace:"wrap" }} onClick={()=>navigate('/dealsingleview',{state:item})}>
              <img src='https://i.pinimg.com/736x/d3/fd/bf/d3fdbf302be1e85fe5f61594328bcb71.jpg' style={{height:"15px"}}></img>
            <span style={{fontWeight:"bolder",fontSize:"14px",color:"#0086b3",marginLeft:"5px"}}>{item.unit_number} {item.project}</span><br></br>
            <span style={{marginLeft:"30px"}}>{item.block}-{item.usize}</span>
            </StyledTableCell>
            {/* <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
            {item.project}
            </StyledTableCell> */}

            {/* <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
            {item.usize}
            </StyledTableCell> */}

            <StyledTableCell style={{fontSize:"12px",whiteSpace: "nowrap" }}>
            ₹{(Number(item.expected_price)).toLocaleString("en-IN")}/-
            </StyledTableCell>

          </StyledTableRow>
        ))}
      </tbody> 
    </Table>
  </TableContainer>
 
  </div>
  </div>

  <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>
  <div className='col-md-12'><img src={inventories} style={{height:"25px",paddingRight:"10px"}}/> Inventories (<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{matchunit.length}</span>)
        <span 
          onClick={toggleTableVisibility1} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible1 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
            ▽
        </span>
        <span 
         onClick={()=>navigate('/addinventory',{state:lead})}
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "15px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",width:"100%",overflow:"auto",marginTop:"10px",position:"sticky",zIndex:10,height: isTableVisible1 ? "200px" : "0",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ height: '200px' }}>
    <Table sx={{}} aria-label="customized table">
    {/* <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow  style={{backgroundColor:"gray"}}>
          {allColumnsunit.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px",lineHeight:"5px" }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </thead> */}
      <tbody>
        {
         
        matchunit.map ((item, index) => (
          <StyledTableRow key={index}>
         
               <StyledTableCell style={{fontSize:"12px",whiteSpace: "nowrap",cursor:"pointer" }} onClick={()=>navigate('/inventorysingleview',{state:item})}>
              <img src='https://cdn-icons-png.freepik.com/256/7875/7875876.png?semt=ais_hybrid' style={{height:"20px"}}></img>
            <span style={{fontWeight:"bolder",fontSize:"14px",color:"#0086b3",marginLeft:"5px"}}>{item.unit_no} {item.project_name}</span><br></br>
            <span style={{marginLeft:"30px"}}>{item.block}-{item.size}</span>
            </StyledTableCell>
          
         
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
        </div>
        </div>


        <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>
        <div className='col-md-12'><img src="https://w7.pngwing.com/pngs/36/68/png-transparent-project-management-computer-icons-task-task-text-logo-project-management.png" style={{height:"25px",paddingRight:"10px"}}/>
  Tasks (<span className="no-activity-flash" style={{ fontSize: "12px", color: "blue" }}>
     {alltask.filter(item => 
      item.complete === "" && (new Date(item.due_date) > new Date() || new Date(item.start_date) > new Date())
    ).length} active
  </span>)


        <span 
          onClick={toggleTableVisibility2} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible2 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
            ▽
        </span>
        <span 
         onClick={()=>navigate('/tasksform',{state:lead})}
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "15px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",width:"100%",marginTop:"10px",position:"sticky",zIndex:10,height: isTableVisible2 ? "300px" : "0",transition: "height 0.3s ease",overflow:"auto"}}>
         
        <TableContainer component={Paper} style={{  maxHeight: '300px'}}>
    <Table sx={{}} aria-label="customized table">
      {/* <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow style={{backgroundColor:"gray"}}>
          {allColumnstask.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px",lineHeight:"5px" }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </thead> */}
      <tbody>
        {
         
        alltask.map ((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            <StyledTableCell style={{ fontSize:"12px" }}>
              {/* {index + 1} */}<input type='checkbox'></input>
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"14px",color:"#0086b3",whiteSpace:"wrap",cursor:"pointer"}}  onClick={()=>completetask(item)}>
              <span style={{fontWeight:"bold"}}>{item.activity_type}</span> 
            {
              item.activity_type=="Meeting" ? (
                <span style={{marginLeft:"5px"}}> [{item.reason}]<br></br></span>

              ): item.activity_type=="SiteVisit" ? (
              <span> [{Array.isArray(item.inventory)?item.inventory.join(','):item.inventory || item.reason}]<br></br></span>
              ) : item.activity_type=="Mail" ? (
                <span>[{item.subject}]<br></br></span>
                ) :  <span> [{item.reason}]<br></br></span>
            }
             

              {item.complete === "true" ? (
          <span style={{color:"green",fontSize:"12px"}}>{item.start_date
          ? formatDate(new Date(item.start_date)) 
          : formatDate(new Date(item.due_date))}.</span>

        ) : (item.complete === "" && new Date(item.due_date) > new Date()) || new Date(item.start_date) > new Date() ? (
          <span style={{color:"blue"}}>{item.start_date
          ? formatDate(new Date(item.start_date)) 
          : formatDate(new Date(item.due_date))}.</span>

        ) : (item.complete === "" && new Date(item.due_date) < new Date()) || new Date(item.start_date) < new Date() ? (
          <span className='no-activity-flash' style={{fontSize:"12px"}}>{item.start_date
            ? formatDate(new Date(item.start_date)) 
            : formatDate(new Date(item.due_date))}.</span>
        ) : ""}  <span style={{color:"gray"}}>{item.executive}</span>
              
            </StyledTableCell>
       

          <StyledTableCell style={{ fontSize: "12px" }}>
          {allColumnstask.map((col) => (
        col.id === "status" ? (
      <span>
        {item.complete === "true" ? (
          <span style={{color:"green"}}>Complete</span>
        ) : (item.complete === "" && new Date(item.due_date) > new Date()) || new Date(item.start_date) > new Date() ? (
          <span style={{color:"blue"}}>Pending</span>
        ) : (item.complete === "" && new Date(item.due_date) < new Date()) || new Date(item.start_date) < new Date() ? (
          <span className='no-activity-flash' style={{fontSize:"12px"}}>Overdue</span>
        ) : ""}
      </span>
    ) : null
  ))}
        </StyledTableCell>

          </StyledTableRow>
        ))}
      </tbody> 
    </Table>
  </TableContainer>
        </div>
        </div>

        <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>

        <div className='col-md-12'><img src="https://www.freeiconspng.com/thumbs/document-icon/document-icon-19.png" style={{height:"25px",paddingRight:"10px"}}/> Documents (<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{documents.length}</span>)
        <span 
          onClick={toggleTableVisibility3} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right:  "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible3 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
            ▽
        </span>
        <span 
         onClick={handleShow8}
          style={{ 
            cursor: "pointer", 
            position:"absolute",
            right: "15px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,height: isTableVisible3 ? "200px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '200px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
    {/* <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow style={{backgroundColor:"gray"}}>
          {allColumnsdocuments.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px",lineHeight:"5px" }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </thead> */}
      <tbody>
        {
        
        documents.map ((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
        
        <StyledTableCell className="leaddocumentscolomn">
  {/* Determine the document icon based on file extension */}
  {(() => {
    const fileName = item?.pic?.toLowerCase();
    let fileIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe2devawXGAc34_HeWIm-44fpa-pljPOnNyw&s"; // Default icon

    if (fileName?.endsWith(".jpg") || fileName?.endsWith(".jpeg") || fileName?.endsWith(".png")) {
      fileIcon = "https://i.pinimg.com/736x/c9/c1/43/c9c143f4f9bcf8e8ea5dec5047757307.jpg"; // Image icon
    } else if (fileName?.endsWith(".pdf")) {
      fileIcon = "https://www.freeiconspng.com/thumbs/pdf-icon-png/pdf-icon-png-pdf-zum-download-2.png"; // PDF icon
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      fileIcon = "https://png.pngtree.com/png-vector/20241025/ourlarge/pngtree-blue-document-color-icon-vector-illustration-png-image_14165553.png"; // Word document icon
    } else if (fileName?.endsWith(".xlsx") || fileName?.endsWith(".xls")) {
      fileIcon = "https://img.icons8.com/?size=512&id=13654&format=png"; // Excel icon
    }

    return (
      <img
        src={fileIcon}
        alt={item.name}
        style={{ width: 30, height: 30, marginRight: 5, cursor: "pointer" }}
        onClick={() => handlePreviewClick(item.pic)}
      />
    );
  })()}

  <span style={{ fontSize: "14px", color: "#0086b3" }}>{item.name}</span> [{item.number}]

  <span className="documentsactions">
    <Tooltip title="download...">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4007/4007698.png"
        onClick={() => handleDownload(item)}
        style={{ height: "20px", cursor: "pointer" }}
      />
    </Tooltip>
    <Tooltip title="update...">
      <img onClick={()=>handleShow14(item)}
        src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"
        style={{ height: "20px", marginLeft: "10px", cursor: "pointer" }}
      />
    </Tooltip>
    <Tooltip title="delete...">
      <img
      onClick={()=>deletesingledocument(item)}
        src="https://png.pngtree.com/png-clipart/20220926/original/pngtree-delete-button-3d-icon-png-image_8633077.png"
        style={{ height: "20px", marginLeft: "10px", cursor: "pointer" }}
      />
    </Tooltip>
  </span>
</StyledTableCell>

   
          
          </StyledTableRow>
        ))}
      </tbody>

       {/* Modal or Image Preview */}
       {openPreview && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
            <button onClick={handleClosePreview} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}


    </Table>
  </TableContainer>
        </div>
        </div>


        <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>

<div className='col-md-12'><img src="https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/512x512/plain/history.png" style={{height:"25px",paddingRight:"10px"}}/>
History 
<span 
  onClick={toggleTableVisibility4} 
  style={{ 
    position:"absolute",
    cursor: "pointer", 
    right:  "50px", 
    fontSize: "20px", 
    display: "inline-block", 
    transition: "transform 0.3s ease", // Smooth transition for rotation
    transform: isTableVisible4 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
    marginTop: "0px", // Align the arrow properly
  }}
>
▽
</span>
<span 
//  onClick={handleShow8}
  style={{ 
    cursor: "pointer", 
    position:"absolute",
    right: "15px", 
    fontSize: "30px", 
    display: "inline-block", 
    transition: "transform 0.3s ease", // Smooth transition for rotation
    marginTop: "-7px", // Align the arrow properly
fontWeight:"lighter"
  }}
>
  +
</span>
</div>

<div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,height: isTableVisible4 ? "300px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
 
<TableContainer component={Paper} style={{ maxHeight: '300px', overflow: 'auto' }}>
<Table sx={{}} aria-label="customized table">
<thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
<TableRow style={{backgroundColor:"gray"}}>
  {/* {allColumnsdocuments.map((col) => (
    <StyledTableCell
      key={col.id}
      style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px",lineHeight:"5px" }}
    >
      {col.name}
    </StyledTableCell>
  ))} */}
</TableRow>
</thead>
<tbody>



</tbody>

</Table>
</TableContainer>
</div>
</div>
      



        </div>

        </div>

      </div>

      <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>
                <h6 style={{fontWeight:"normal", fontSize:"12px"}}>CALL SUMMARY</h6>
              <h3>{lead.title} {lead.first_name} {lead.last_name}</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
            <div className="row">

            <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setactivity({...activity,direction:e.target.value})}>
                    <option>---Select---</option>
                    <option>Incoming</option>
                    <option>Outgoing</option>
                        </select>
                        </div>

                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setactivity({...activity,status:e.target.value})} >
                         <option>---Select---</option>
                         {
                            status.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>

                        <div className="col-md-4"><label className="labels">Date</label><input type="date" id="date1" className="form-control form-control-sm" onChange={(e)=>setactivity({...activity,date:e.target.value})}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" className="form-control form-control-sm" onChange={(e)=>setactivity({...activity,duration:e.target.value})}/></div>
                <div className="col-md-4"> </div>

                <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setactivity({...activity,intrested_inventory:e.target.value})}>
                    <option>---Select---</option>
                    {
                          sitevisitdata1.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select>
                        </div>

            <div className="col-md-10"><label className="labels">Call Outcome</label>
                        <select className="form-control form-control-sm" required="true" 
                         onChange={(e) => {
                          const selectedValue = e.target.value;
                          setactivity({ ...activity, call_outcome: selectedValue });
                    
                          // Check if the selected option is "Add New Outcome" and call handleShow2
                          if (selectedValue === 'Add New Outcome') {
                            handleShow2();  // Call the function to show the modal or open the new outcome form
                          }
                        }}
                        >
                              <option>---Select---</option>
                            {
                              outcome.map((item)=>
                              (
                                <option>{item}</option>
                              ))
                            }
                            <option onClick={handleShow2}>Add New Outcome</option>
                             
                        </select>
            </div>
            <div className='col-md-2'></div>

         
            <div className="col-md-10">
      <label className="labels" style={{ visibility: "hidden" }}>Note</label>
      <ReactQuill
        modules={modules}  // Add the toolbar options for formatting
        placeholder="Add a note about this call."
        style={{ height: '100px', width: '100%' }}
        value={activity.activity_note}  // Bind the editor with state
        onChange={handleNoteChange}
      />
    </div>
            <div className='col-md-2'></div>
                
            </div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={handleClose1} >
               Do Not Log
              </Button>
              <Button variant="secondary" onClick={addactivity}>
                Save
              </Button>
            </Modal.Footer>
      </Modal>
      

      <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>
                <h6 style={{fontWeight:"normal", fontSize:"12px"}}>Call Outcome</h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
            <div className="row">

            <div className="col-md-10"><label className="labels">Call Outcome</label>
                        <input type='text' className="form-control form-control-sm" required="true" onChange={(e)=>setnewoutcome(e.target.value)}/>
                         
            </div>
        
            </div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={addoutcome} >
               Add
              </Button>
            </Modal.Footer>
      </Modal>

      {/* ====================================================complete call task start ==================================================*/}

      <Modal show={show3} onHide={handleClose3} size='lg'>
            <Modal.Header>
              <Modal.Title>
               Complete Call Task
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Direction</label>
                      <select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,direction:e.target.value}))} >
                    <option>{calltask.direction}</option>
                    <option>---Select---</option>
                        {
                            calldirection.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Status</label>
                     <select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,status:e.target.value}))}>
                    <option>{calltask.status}</option>
                    <option>---Select---</option>
                        {
                            callstatus.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                
               
                 <div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" id="date1"  value={calltask.date ? calltask.date.slice(0, 16) : ""}  className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1} onChange={(e)=>setcalltask((prevState)=>({...calltask,date:e.target.value}))}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time"  className="form-control form-control-sm" onChange={(e)=>setcalltask((prevState)=>({...prevState,duration:e.target.value}))}/></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label>
                   <select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,result:e.target.value}))}>
                    <option>{calltask.result}</option>
                    <option>---Select---</option>
                       {
                        callresult.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                       </select>
                        </div>
                        <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...prevState,intrested_inventory:e.target.value}))}>
                    
                    <option>---Select---</option>
                        {
                          sitevisitdata1.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'   style={{height:"100px"}} onChange={(e)=>setcalltask((prevState)=>({...prevState,feedback:e.target.value}))}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     
                  
                    </div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={calltaskdetails} >
               Complete
              </Button>
              <Button variant="secondary" onClick={handleClose3} >
               Close
              </Button>
            </Modal.Footer>
      </Modal>
      
      {/* ============================================complete call task end========================================================= */}


      {/*=========================================== complete mail task start ========================================================*/}

      <Modal show={show4} onHide={handleClose4} size='lg'>
            <Modal.Header>
              <Modal.Title>
               Complete Mail Task
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row mt-2">
                    
            <div className="col-md-4"><label className="labels">Direction</label>
          <select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,direction:e.target.value})}>
            <option>{mailtask.direction}</option>
            <option>---Select---</option>
              {
                  maildirection.map(item=>
                      (
                          <option>{item}</option>
                      )
                  )
              }
              </select>
             </div>

             <div className="col-md-4"><label className="labels">Status</label>
             <select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,status:e.target.value})}>
              <option>{mailtask.status}</option>
              <option>---Select---</option>
              {
                  mailstatus.map(item=>
                      (
                          <option>{item}</option>
                      )
                  )
              }
              </select>
               </div>
               <div className="col-md-4"></div>

                 <div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" value={mailtask.date ? mailtask.date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,date:e.target.value})}/></div>
                <div className="col-md-8"> </div>

                   <div className="col-md-4"></div>

                   <div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={mailtask.feedback}  style={{height:"100px"}} onChange={(e)=>setmailtask({...mailtask,feedback:e.target.value})}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div>      
                  
                    </div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={mailtaskdetails} >
               Complete
              </Button>
              <Button variant="secondary" onClick={handleClose4} >
               Close
              </Button>
            </Modal.Footer>
      </Modal>

{/* ==============================================complete mail task end=========================================================== */}



{/* ===================================complete meeting task start======================================================================= */}

<Modal show={show5} onHide={handleClose5} size='lg'>
            <Modal.Header>
              <Modal.Title>
               Complete Meeting Task
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row mt-2">
                    
            <div className="col-md-4"><label className="labels">Select Status</label>
         <select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask((prevState)=>({...prevState,status:e.target.value}))} >
        <option>{meetingtask.status}</option>
                            <option>---Select---</option>
                            {
                                    meetingstatus.map(item=>
                                        (
                                            <option>{item}</option>
                                        )
                                    )
                                }
            </select>
          </div>

       {
      meetingtask.status==="Conducted" && 
      (
        <div className="col-md-4"><label className="labels">Meeting Result</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask((prevState)=>({...prevState,meeting_result:e.target.value}))}>
        <option>{meetingtask.meeting_result}</option>
                        <option>---Select---</option>
                        {
                            meetingresult.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
            </select>
            </div>
      )
     
    }
    {
      meetingtask.meeting_result==="Deal Done" && (
      <div className="col-md-3"><label className="labels" style={{visibility:"none"}}>.</label><button style={{backgroundColor:"greenyellow"}} className="form-control form-control-sm"  onClick={() => window.open('/bookingdetails', '_blank')}> Create Booking</button></div>
      )
    }

              <div className="col-md-1"></div>

              <div className="col-md-4"><label className="labels">Select Date</label><input type="datetime-local" className="form-control form-control-sm" value={meetingtask.date ? meetingtask.date.slice(0, 16) : ""} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,date:e.target.value}))} /></div>

              <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,feedback:e.target.value}))}/></div>

            </div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={meetingdetails} >
               Complete
              </Button>
              <Button variant="secondary" onClick={handleClose5} >
               Close
              </Button>
            </Modal.Footer>
      </Modal>




{/* ==========================================complete meeting task end============================================================= */}


{/* =========================================complete sitevisit task start========================================================= */}


<Modal show={show6} onHide={handleClose6} size='lg'>
            <Modal.Header>
              <Modal.Title>
               Complete Site Visit Task
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <div className="row mt-2">

<div className="col-md-4"><label className="labels">Select Status</label>
<select className="form-control form-control-sm" required="true" onChange={handleleadstatuschange} >
              <option>{sitevisit.status}</option>
              <option>---Select---</option>
                    {
                        sitevisit_status.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
    </select>
    </div>
    <div className="col-md-8"></div>
    {
        sitevisit.status==="Conducted" &&(
            <>

        

<div className="col-md-4"><label className="labels">Select Intersted Inventory</label>
              {Array.isArray(sitevisit.intrested_inventory) ?
                sitevisit.intrested_inventory.map((item,index)=>
                (
                  <select
                  style={{marginTop:"10px"}}
                  className="form-control form-control-sm"
                  // value={sitevisit.intrested_inventory} 
                  onChange={(event)=>handlesitevisitinventorychange(index,event)}// Handle changes for unit selection
                  >
                    <option>{sitevisit.intrested_inventory[index]}</option>
                 <option>---select---</option>
                 {
                  sitevisit.inventory.map((item)=>
                  (
                    <option>{item}</option>
                  ))
                 }
                  </select>

                )):[]
              }
         
      </div> 

      <div className="col-md-4"><label className="labels">Result</label>
                                      
      {
                               Array.isArray(sitevisit.result)?
                            sitevisit.result.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handlesitevisitresultchange(index,event)}>
                            
                            <option>{sitevisit.result[index]}</option>
                             <option>---Select---</option>
                             {
                               sitevisit_result.map(item=>
                            (
                                <option>{item}</option>
                            )
                           )
                           }
                            </select>
                            )):[]
                            }
                  </div> 

                  <div className="col-md-1" style={{marginTop:"70px"}}>
                            {
                               Array.isArray(sitevisit.action1)?
                               sitevisit.action1.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>

      <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn1}>+</button></div>
      <div className="col-md-2"></div>
                </>
        )
    }
 



<div className="col-md-4"><label className="labels">Select Date</label><input type="datetime-local" value={sitevisit.date ? sitevisit.date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,date:e.target.value})}/></div>
<div className="col-md-8"></div>

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>


</div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={sitevisitdetails} >
               Complete
              </Button>
              <Button variant="secondary" onClick={handleClose6} >
               Close
              </Button>
            </Modal.Footer>
      </Modal>





{/* =======================================complete site vist task end ===========================================================*/}



{/*============================= edit lead start====================================================================== */}



<Modal show={show7} onHide={handleClose7} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Lead</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
                <div className="d-flex justify-content-between align-items-center experience" style={{fontFamily:"times new roman",fontWeight:"bold"}}>
                <span onClick={leadinfobasic} id="span1" style={{cursor:"pointer"}}>Basic Details</span>
                <span onClick={leadinforequirment} id="span2" style={{cursor:"pointer"}}>Requirment</span>
                <span onClick={leadinfoprofessionaldetails} id="span3" style={{cursor:"pointer"}}> Professional Details</span>
                <span onClick={leadinfopersonaldetails} id="span4" style={{cursor:"pointer"}}> Personal Details</span>
                </div>
                <hr></hr>
              <div className="row mt-2" id="leadinfobasic1">
                    
                    <div className="col-md-3"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, title: updatedTags});setactivity({...activity, edit_field: "title",edit_value:updatedTags});}}>
                        <option>{leadinfo?.title|| ''}</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" defaultValue={leadinfo?.first_name || ''} required="true" className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, first_name: updatedTags});setactivity({...activity, edit_field: "first Name",edit_value:updatedTags});}}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" defaultValue={leadinfo?.last_name || ''} className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, last_name: updatedTags});setactivity({...activity, edit_field: "last Name",edit_value:updatedTags});}}/></div>
                </div>
                <div className="row mt-3" id="leadinfobasic2">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, country_code: updatedTags});setactivity({...activity, edit_field: "country code",edit_value:updatedTags});}}>
                    <option value="">{leadinfo?.country_code[0] || '+91 India'}</option>
                   {
                   
                    countrycode.map(item=>
                    (
                        <option>{item}</option>
                    )
                    )
                   }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text"  required="true"defaultValue={leadinfo?.mobile_no || ''} className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, mobile_no: updatedTags});setactivity({...activity, edit_field: "mobile no.",edit_value:updatedTags});}}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, mobile_type: updatedTags});setactivity({...activity, edit_field: "mobile type",edit_value:updatedTags});}}>
                    <option>{leadinfo?.mobile_type || '---Personal---'}</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" defaultValue={leadinfo?.email[0] || ''} className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, email: updatedTags});setactivity({...activity, edit_field: "email",edit_value:updatedTags});}}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, email_type: updatedTags});setactivity({...activity, edit_field: "email type",edit_value:updatedTags});}}>
                    <option>{leadinfo?.email_type || '---Personal---'}</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                     <div className="col-md-8"><label className="labels">Tags</label><input type="text" defaultValue={leadinfo?.tags || ''} className="form-control form-control-sm"    onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, tags: updatedTags});setactivity({...activity, edit_field: "tags",edit_value:updatedTags});}}/></div>
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea defaultValue={leadinfo?.descriptions || ''} className='form-control form-control-sm' onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, descriptions: updatedTags});setactivity({...activity, edit_field: "descriptions",edit_value:updatedTags});}}/></div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Stage</label><select className="form-control form-control-sm"onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, stage: updatedTags});setactivity({...activity, edit_field: "stage",edit_value:updatedTags});}}>
                    <option>{leadinfo?.stage || '---Select---'}</option>
                    <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Oppurtunity</option>
                        <option>Booked</option>
                        <optgroup label="Closed" style={{fontWeight:"bolder",color:"blue"}}>
                        <option style={{color:"green"}}>Won</option>
                        <option style={{color:"red"}}>Lost</option>
                        <option style={{color:"gray"}}>Unqualified </option>
                        </optgroup>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Lead Type</label>
                    <select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, lead_type: updatedTags});setactivity({...activity, edit_field: "lead type",edit_value:updatedTags});}}>
                    <option>{leadinfo?.lead_type || '---Select---'}</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label>
                   
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={leadinfo.owner}
                    onChange={handleOwnerChange1}
                    renderValue={(selected) => selected.join(', ')}
                >
                   <MenuItem disabled value="---select---">
                    {leadinfo?.owner || '---select---'}
                </MenuItem>
                    {ownersList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={leadinfo.owner.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, team: updatedTags});setactivity({...activity, edit_field: "team",edit_value:updatedTags});}}>
                              <option>{leadinfo?.team || '---select---'}</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, visible_to: updatedTags});setactivity({...activity, edit_field: "visible to",edit_value:updatedTags});}}>
                                <option>{leadinfo?.visible_to || '---Select---'}</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"></div>
                   
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Campegin Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                   
                        <div className="col-md-6"><label className="labels">Campaign</label><select className="form-control form-control-sm"onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, campegin: updatedTags});setactivity({...activity, edit_field: "campegin",edit_value:updatedTags});}}>
                    <option>{leadinfo?.campaign || '---Select---'}</option>
                        <option>Online Campaign</option>
                        <option>Offline Campaign</option>
                        <option>Organic Campaign</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm"onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, source: updatedTags});setactivity({...activity, edit_field: "source",edit_value:updatedTags});}}>
                    <option>{leadinfo?.source || '---Select---'}</option>
                    {getSourceOptions().map((source, index) => (
                      <option key={index} value={source}>
                        {source}
                      </option>
                    ))}
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Sub-Source</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, sub_source: updatedTags});setactivity({...activity, edit_field: "sub source",edit_value:updatedTags});}}>
                    <option>{leadinfo?.sub_source || '---Select---'}</option>
                        <option>Call</option>
                        <option>Sms</option>
                        <option>Email</option>
                        <option>Whatsapp</option>
                        </select>
                    </div>
                    {((leadinfo.source === "Reference" || leadinfo.source === "Channel Partner") && leadinfo.campaign === "Organic Campaign") && (
                     <>
                     <div className="col-md-5">
                        <label className="labels">Referrer Name</label>
                        <select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, refrencer_no: updatedTags});setactivity({...activity, edit_field: "refrencer",edit_value:updatedTags});}}>
                          <option>{leadinfo?.refrencer_no || '---Select---'}</option>
                         
                      {
                        contactdata.map((item)=>
                        (
                          <option>{item.title} {item.first_name} {item.last_name}</option>
                        ))
                      }
                        </select>
                      </div>
                  <div className="col-md-1" onClick={handleShow1}><label className="labels">Add</label><button className="form-control form-control-sm">+</button></div>
                  </>
                    )}
                    
                    <div className="col-md-12"><hr></hr></div>
                 
                    </div>
{/* ---------------------------------------leadinfo basic details end ------------------------------------------------------------------------*/}
            

{/*---------------------------------------- leadinfo requirment details start--------------------------------------------------------------- */}
              
              
<div className="row mt-2" id="leadinforequirment" style={{display:"none"}}>
                <div className="col-md-3"><label className="labels">Requirment</label><select className="form-control form-control-sm" required="true" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, requirment: updatedTags});setactivity({...activity, edit_field: "requirment",edit_value:updatedTags});}}>
                    <option>Select</option>
                       {
                        requirment.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Property Type</label>
                
                         <Select
                         className="form-control form-control-sm" style={{border:"none"}}
                          multiple
                          value={leadinfo.property_type}
                          onChange={handleCategoryChange}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {options.property_type.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                              <Checkbox checked={leadinfo.property_type.includes(cat)} />
                              <ListItemText primary={cat} />
                            </MenuItem>
                          ))}
                        </Select>
                        </div>
                        
                        <div className="col-md-4"><label className="labels" style={{display:"inline-block"}}>Purpose</label><br></br>
                        <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, purpose: updatedTags});setactivity({...activity, edit_field: "purpose",edit_value:updatedTags});}}/>End use<input type="radio" name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, purpose: updatedTags});setactivity({...activity, edit_field: "purpose",edit_value:updatedTags});}}/>Investor
                        </div>
                        <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                        <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, nri: updatedTags});setactivity({...activity, edit_field: "nri",edit_value:updatedTags});}}/>Yes
                        </div>
                        <div className="col-md-6"><label className="labels">Sub Type</label>
                        
                        <Select
                        className="form-control form-control-sm" style={{border:"none"}}
                      multiple
                      value={leadinfo.sub_type}
                      onChange={handleSubcategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {getAvailableSubcategories().map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        <Checkbox checked={leadinfo.sub_type.includes(sub)} />
                        <ListItemText primary={sub} />
                      </MenuItem>
                    ))}
                    </Select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Unit Type</label>
                    <Select
                        className="form-control form-control-sm" style={{border:"none"}}
                      multiple
                      value={leadinfo.unit_type}
                      onChange={handleUnitTypeChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {getAvailableunittype().map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        <Checkbox checked={leadinfo.unit_type.includes(sub)} />
                        <ListItemText primary={sub} />
                      </MenuItem>
                    ))}
                    </Select>
                        </div>
                        {leadinfo.requirment === "Rent" && (
                          <>
                            <div id="rentbudgetmin" className="col-md-6">
                              <label className="labels">Budget Min</label>
                              <select
                                className="form-control form-control-sm"
                                onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, budget_min: updatedTags});setactivity({...activity, edit_field: "min budget",edit_value:updatedTags});}}
                                value={leadinfo.budget_min}
                              >
                                <option>---Select---</option>
                                {budgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div id="rentbudgetmax" className="col-md-6">
                              <label className="labels">Budget Max</label>
                              <select
                                className="form-control form-control-sm"
                                onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, budget_max: updatedTags});setactivity({...activity, edit_field: "max budget",edit_value:updatedTags});}}
                                value={leadinfo.budget_max}
                              >
                                <option>---Select---</option>
                                {filteredMaxBudgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}

                        {leadinfo.requirment === "Buy" && (
                       <>
                        <div id="buybudgetmin" className="col-md-6"><label className="labels">Budget Min</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, budget_min: updatedTags});setactivity({...activity, edit_field: "min budget",edit_value:updatedTags});}}>
                        <option>---Select---</option>
                        {buyBudgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                      
                      
                        <div id="buybudgetmax" className="col-md-6"><label className="labels">Budget Max</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, budget_max: updatedTags});setactivity({...activity, edit_field: "max budget",edit_value:updatedTags});}}>
                        <option>---Select---</option>
                        {filteredMaxBudgetOptionsbuy.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                        </>
                      )}
                        <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, minimum_area: updatedTags});setactivity({...activity, edit_field: "minimum area",edit_value:updatedTags});}}>
                        <option>Select</option>
                        {areaoptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, maximum_area: updatedTags});setactivity({...activity, edit_field: "maximun area",edit_value:updatedTags});}}>
                        <option>Select</option>
                        {filteredarea.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                
                        </select></div>
                   
                        <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, area_metric: updatedTags});setactivity({...activity, edit_field: "area matric",edit_value:updatedTags});}} >
                      
                        <option>Sq Yard</option>
                        <option>Marla</option>
                        <option>Acre</option>
                        <option>Sq Feet</option>
                        <option>Kanal</option>
                        </select></div> 
                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Location Details</label></div>
                       
                          <div className="row" id="search_location" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                                            <div style={{display:"flex",gap:"50px",border:"1px solid gray",padding:"5px",borderRadius:"50px",marginLeft:"20%"}}>
                                                 <div  id='selectlocation' onClick={selectlocation} style={{cursor:'pointer',fontWeight:"bold",backgroundColor:"black",color:"white",borderRadius:"50px",width:"150px",textAlign:"center",transition:"0.5s ease-out"}}>Select Location </div>
                                                 <div  id='searchlocation' onClick={searchlocation} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Search Loacation</div>
                                                 
                                             </div>
                    
                                                      <div className="row" id="select_location" style={{margin:"5px",padding:"10px"}}>
                                                                      <div className="col-md-5"><label className="labels">Country</label>
                                                                      <select  className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,country3:e.target.value})}>
                                                                      <option>India</option>
                                                                  {asianCountries.map((country, index) => (
                                                                    <option key={index} value={country.toLowerCase().replace(/\s+/g, '-')}>
                                                                      {country}
                                                                    </option>
                                                                  ))}
                                                                        </select>
                                                                      </div>
                                                                     
                                                                      <div className="col-md-5"><label className="labels">State</label><select type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state3:e.target.value})}>
                                                                      <option value="">--Select State--</option>
                                                                    {states.map((state) => (
                                                                      <option key={state} value={state}>
                                                                        {state}
                                                                      </option>
                                                                    ))}
                                                                        </select>
                                                                      </div>
                                                                      <div className="col-md-2"></div>
                                              
                                                                      <div className="col-md-5"><label className="labels">City</label>
                                                                      {/* <select  className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}>
                                                                        <option>---select country---</option>
                                                                        <option>India</option>
                                                                        </select> */}
                                                                           <select
                                                                  className="form-control form-control-sm"
                                                                  value={leadinfo.city3}
                                                                  onChange={(e)=>setleadinfo({...leadinfo,city3:e.target.value})}
                                                                  disabled={!leadinfo.state3 || cities.length === 0} // Disable if no state or invalid state
                                                                >
                                                                  <option value="">--Select City--</option>
                                                                  {cities.map((city) => (
                                                                    <option key={city} value={city}>
                                                                      {city}
                                                                    </option>
                                                                  ))}
                                                                </select>
                                                                      </div>
                                                                      <div className="col-md-5">
                                                                    <label className="labels">Area/Project</label>
                                                                    <Select
                                                                      className="form-control form-control-sm"
                                                                      multiple
                                                                      value={leadinfo.area_project}
                                                                      onChange={handleprojectchange}
                                                                      style={{ border: 'none' }}
                                                                      renderValue={(selected) => selected.join(', ')}
                                                                      label="Area/Project"
                                                                    >
                                                                      {/* "Select All" MenuItem */}
                                                                      <MenuItem value="select-all">
                                                                        <Checkbox checked={leadinfo.area_project.length === allproject.length} />
                                                                        <ListItemText primary="--- Select All ---" />
                                                                      </MenuItem>
                                              
                                                                      {/* Individual Project MenuItems */}
                                                                      {allproject.map((project) => (
                                                                        <MenuItem key={project} value={project}>
                                                                          <Checkbox checked={leadinfo.area_project.indexOf(project) > -1} />
                                                                          <ListItemText primary={project} />
                                                                        </MenuItem>
                                                                      ))}
                                                                    </Select>
                                                                  </div>
                                                                      <div className="col-md-5">
                                                                      <label className="labels">Block</label>
                                                                      <Select
                                                                        className="form-control form-control-sm"
                                                                        multiple
                                                                        value={leadinfo.block3}
                                                                        onChange={handleallblockchange}
                                                                        style={{ border: "none" }}
                                                                        renderValue={(selected) => selected.join(', ')}
                                                                        label="Block"
                                                                      >
                                                                        {/* "Select All" MenuItem */}
                                                                        <MenuItem value="select-all">
                                                                          <Checkbox checked={leadinfo.block3.length === allblocks.length} />
                                                                          <ListItemText primary="--- Select All ---" />
                                                                        </MenuItem>
                                              
                                                                        {/* Individual Block MenuItems */}
                                                                        {[...new Map(allblocks.map(item => [item.block_name, item])).values()].map((project) => (
                                                                          <MenuItem key={project.block_name} value={project.block_name}>
                                                                            <Checkbox checked={leadinfo.block3.indexOf(project.block_name) > -1} />
                                                                            <ListItemText primary={project.block_name} />
                                                                          </MenuItem>
                                                                        ))}
                                                                      </Select>
                                                                    </div>
                                                               
                                                                      <div className="col-md-5"><label className="labels">Specific Unit</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,specific_unit:e.target.value})}/></div>
                                                                  </div>
                    
                                        <div className="row" id="search_location1" style={{margin:"5px",padding:"10px",display:"none"}}>
                                            <div className="col-md-8"><label className="labels">Search Location</label><input type="text" className="form-control form-control-sm"   ref={inputRef} value={leadinfo.search_location} onChange={(e)=>setleadinfo({...leadinfo,search_location:e.target.value})}/></div>
                                           <div className="col-md-2"></div>
                                            <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>Search</label><button className="form-control form-control-sm" onClick={getlocation}>Get</button></div>
                                            <div className="col-md-8"><label className="labels">Street Address</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,street_address:e.target.value})}/></div>
                                            <div className="col-md-4"><label className="labels">Range</label>
                                            <select  className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,range:e.target.value})}>
                                            <option>---select---</option>
                                            <option value="1">Within 1 km.</option>
                                            <option value="3">Within 3 km.</option>
                                            <option value="5">Within 5 km.</option>
                                            <option value="10">Within 10 km.</option>
                                            <option value="15">Within 15 km.</option>
                                            <option value="20">Within 20 km.</option>
                                            <option value="25">Within 25 km.</option>
                                              </select>
                                            </div>
                                            {/* <div className="col-md-4"></div> */}
                    
                                        <div className="col-md-3"><label className="labels">City</label><input type="text" className="form-control form-control-sm" value={leadinfo.city2} onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}/></div>
                                        <div className="col-md-3"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area2:e.target.value})}/></div>
                                        <div className="col-md-3"><label className="labels">Block</label><input type="text" className="form-control form-control-sm" value={leadinfo.block} onChange={(e)=>setleadinfo({...leadinfo,block:e.target.value})}/></div>
                                        <div className="col-md-3"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" value={leadinfo.pincode2} onChange={(e)=>setleadinfo({...leadinfo,pincode2:e.target.value})}/></div>
                                        
                                        <div className="col-md-3"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" value={leadinfo.country2} onChange={(e)=>setleadinfo({...leadinfo,country2:e.target.value})}/></div>
                                        <div className="col-md-3"><label className="labels">State</label><input type="text" className="form-control form-control-sm" value={leadinfo.state2} onChange={(e)=>setleadinfo({...leadinfo,state2:e.target.value})}/></div>
                                        <div className="col-md-3"><label className="labels">Lattitude</label><input type="text" className="form-control form-control-sm" value={leadinfo.lattitude} onChange={(e)=>setleadinfo({...leadinfo,lattitude:e.target.value})}/></div>
                                        <div className="col-md-3"><label className="labels">Longitude</label><input type="text" className="form-control form-control-sm" value={leadinfo.longitude} onChange={(e)=>setleadinfo({...leadinfo,longitude:e.target.value})}/></div>
                                        {/* <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" /></div> */}
                                        </div>
                                        
                                        </div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                   
                    <div className="col-md-4"><label className="labels">Facing</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={facings}
                    onChange={handlefacingChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.facing || '---select---'}
                </MenuItem> */}
                 <MenuItem value="select-all">
                    <Checkbox checked={facings.length === facing.length} />
                    <ListItemText
                      primary={leadinfo?.facing || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {facing.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={facings.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>
                    <div className="col-md-4"><label className="labels">Road</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={roads}
                    onChange={handleroadChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.road || '---select---'}
                </MenuItem> */}
                <MenuItem value="select-all">
                    <Checkbox checked={roads.length === road.length} />
                    <ListItemText
                      primary={leadinfo?.road || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {road.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={roads.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>
                    <div className="col-md-4"><label className="labels">Funding</label>
                    <select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, funding: updatedTags});setactivity({...activity, edit_field: "funding",edit_value:updatedTags});}}>
                    <option>Select</option>
                   {
                    funding.map(item=>
                        (
                            <option>{item}</option>
                        )
                    )
                   }
                        </select>
                    </div>
                   
                    <div className="col-md-4"><label className="labels">Timeline</label>
                    <select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, timeline: updatedTags});setactivity({...activity, edit_field: "timeline",edit_value:updatedTags});}}>
                    <option>Select</option>
                      {
                        timeline.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                      }
                        </select>
                    </div>
                  
                
                   
                
                    <div className="col-md-4"><label className="labels">Furnishing</label>
                    <select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, furnishing: updatedTags});setactivity({...activity, edit_field: "furnishing",edit_value:updatedTags});}}>
                    <option>Select</option>
                       {
                        furnishing.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                    </div>     
                    <div className="col-md-4"></div>

                    <div className="col-md-4"><label className="labels">Transaction Type</label>
                    <select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, transaction_type: updatedTags});setactivity({...activity, edit_field: "transaction type",edit_value:updatedTags});}}>
                    <option>Select</option>
                     {
                        transaction_type.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                     }
                        </select>
                    </div>

                    
                     
                      {/* Conditionally render the progress bar */}
                      {leadinfo.transaction_type === "Flexiable" && (
                        <div className="col-md-8">
                           <label className="labels">White Portion</label>
                        <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                          <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                          <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                      )}
                  


                    <div className="col-md-4"><label className="labels">Send Matched Deal</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={matchdeals}
                    onChange={handlematcheddealChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   <MenuItem value="select-all">
                    <Checkbox checked={matchdeals.length === matchdeal.length} />
                    <ListItemText
                      primary={leadinfo?.matched_deal || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {matchdeal.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={matchdeals.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div> 
                    
                </div>
 {/*==========--------------------------============-----------================= leadinfo professional details start=============-------------==============-------------=======------ */}
         
         
 <div className="row mt-2" id="leadinfoprofessional" style={{display:"none"}}>
                     <div className="col-md-5"><label className="labels">Profession Category</label>
                     <select className="form-control form-control-sm"  onChange={handleProfessionCategoryChange} >
                                <option>{leadinfo?.profession_subcategory || '---Select---'}</option>
                                {professtiondetails.profession_category.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Profession Sub-Category</label>
                    <select className="form-control form-control-sm"  onChange={handleProfessionSubcategoryChange} >
                                <option>{leadinfo?.profession_subcategory || '---Select---'}</option>
                                {availableSubcategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                  {subcategory}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-5"><label className="labels">Designation</label>
                    <select className="form-control form-control-sm" onChange={handleDesignationChange}>
                    <option>{leadinfo?.designation || '---Select---'}</option>
                    {availableDesignations.map((designation) => (
                      <option key={designation} value={designation}>
                              {designation}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, company_name: updatedTags});setactivity({...activity, edit_field: "company name",edit_value:updatedTags});}}>
                    <option>{leadinfo?.company_name || '---Select---'}</option>
                    <option>---Select company---</option>
                      {
                        cdata.map((item)=>
                        (
                          <option>{item.name}</option>
                        ))
                      }
                        </select>
                    </div>
                    <div className="col-md-1"><label className="labels">Add</label><button className="form-control form-control-sm" onClick={()=>{navigate('/addcompany')}}>+</button></div>
                  
                    <div className='col-md-12'><hr></hr></div>  

                     </div>

 {/*-------------+++++++++++++++++++++++++--------------========= leadinfo professional end================---------------------===============-------- */}


{/*=====================--------------------- leadinfo personal start-------------------------------------------============================= */}
     <div className="row mt-2" id="leadinfopersonal" style={{display:"none"}}>
                     <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control form-control-sm" defaultValue={data1.father_husband_name} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, father_husband_name: updatedTags});setactivity({...activity, edit_field: "father/husband name",edit_value:updatedTags});}}/></div>

                            <div className="col-md-3"><label className="labels">H.No</label><input type="text" className="form-control form-control-sm" defaultValue={data1.h_no} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, h_no: updatedTags});setactivity({...activity, edit_field: "house no.",edit_value:updatedTags});}}/></div>
                            <div className="col-md-9"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" defaultValue={data1.area1} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, area1: updatedTags});setactivity({...activity, edit_field: "area",edit_value:updatedTags});}}/></div>

                            <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" defaultValue={data1.location1} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, location1: updatedTags});setactivity({...activity, edit_field: "location",edit_value:updatedTags});}}/></div>
                            <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" defaultValue={data1.city1} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, city1: updatedTags});setactivity({...activity, edit_field: "city",edit_value:updatedTags});}} /></div>
                            <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" defaultValue={data1.pincode1} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, pincode1: updatedTags});setactivity({...activity, edit_field: "pincode",edit_value:updatedTags});}}/></div>

                            <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" defaultValue={data1.country1} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, country1: updatedTags});setactivity({...activity, edit_field: "country",edit_value:updatedTags});}}/></div>
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" defaultValue={data1.state1} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, state1: updatedTags});setactivity({...activity, edit_field: "state",edit_value:updatedTags});}} /></div>

                            <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                            <div className="col-md-5"><label className="labels">Gender</label><select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, gender: updatedTags});setactivity({...activity, edit_field: "gender",edit_value:updatedTags});}}>
                                        <option>{data1.gender}</option>
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                </select>
                            </div>
                            <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, maritial_status: updatedTags});setactivity({...activity, edit_field: "maritial status",edit_value:updatedTags});}}>
                                    <option>{data1.maritial_status}</option>
                                    <option>Select</option>
                                    <option>Married</option>
                                    <option>Unmarried</option>
                                    <option>Single</option>
                                </select>
                            </div>

                            <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" className="form-control form-control-sm" defaultValue={data1.birth_date} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, birth_date: updatedTags});setactivity({...activity, edit_field: "birth date",edit_value:updatedTags});}}/></div>
                            <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" className="form-control form-control-sm" defaultValue={data1.anniversary_date} onChange={(e) => {const updatedTags = e.target.value;setleadinfo({...leadinfo, anniversary_date: updatedTags});setactivity({...activity, edit_field: "anniversary date",edit_value:updatedTags});}}/></div>

                            <div className="col-md-3"> <label className="labels">Education</label>
                                
                                    {
                                        Array.isArray(leadinfo.education) ?
                                    leadinfo.education.map((name, index) => (
                                        <div key={index} style={{marginTop:"10px"}}>
                                        <select className="form-control form-control-sm"
                                            onChange={(event) => handleeducationChange(index, event)}
                                        >
                                            <option>{leadinfo?.education[index]}</option>
                                            <option>choose</option>
                                            <option>Kindergaren</option><option>School</option><option>Primery Education</option><option> Secondary Education</option><option>Master</option><option>Commerce</option>
                                            <option>Vocational Education</option>
                                        </select>
                                        
                                        </div>
                                    )):[]
                                  }
                                </div>
                            <div className="col-md-3"><label className="labels">Degree</label>
                            {
                                Array.isArray(leadinfo.degree) ?
                            leadinfo.degree.map((name, index) => (
                                        <div key={index} style={{marginTop:"10px"}}>
                                        <select
                                            className="form-control form-control-sm"
                                            onChange={(event) => handledegreeChange(index, event)}
                                        >
                                          <option>{leadinfo.degree[index]}</option>
                                            <option>choose</option>
                                            <optgroup label='Bachelor’s '>
                                                <option>Bachelor of Arts (BA) </option><option>Bachelor of Science (BS or BSc) </option><option>Bachelor of Fine Arts (BFA)</option><option> Bachelor of Education (BEd) </option>
                                                <option> Bachelor of Business Administration (BBA) </option><option>Bachelor of Engineering (BE or BEng) </option><option>Bachelor of Science in Nursing (BSN)</option>
                                                <option>B.Bachelor of Laws (LLB) </option><option>B.Bachelor of Architecture (BArch)</option><option>Bachelor of Social Work (BSW) </option><option> Bachelor of Music (BM) </option>
                                                <option>Bachelor of Pharmacy (BPharm)</option><option>Bachelor of Technology (BTech) </option>
                                            </optgroup>
                                            <optgroup label='Master’s '>
                                                <option>Master of Arts (MA)</option><option>Master of Science (MS or MSc)</option><option>Master of Business Administration (MBA)</option><option>Master of Fine Arts (MFA)</option>
                                                <option>Master of Engineering (ME or MEng)</option><option>Master of Education (MEd or EdM)</option><option>Master of Public Health (MPH) </option>
                                                <option>Master of Social Work (MSW)</option><option> Master of Laws (LLM)</option><option>Master of Public Administration (MPA)</option><option>Master of Architecture (MArch)</option>
                                                <option>Master of Library Science (MLS or MLIS)</option><option> Master of Music (MM or MMus)</option><option>Master of Philosophy (MPhil)</option>
                                                <option>Master of Arts in Teaching (MAT)</option><option>Master of Theology (MTh or ThM)</option>
                                            </optgroup>
                                            <optgroup label='Doctoral '>
                                                <option>Doctor of Philosophy (PhD)</option><option>Doctor of Medicine (MD)</option><option>Doctor of Education (EdD)</option><option>Doctor of Business Administration (DBA) </option>
                                                <option>Juris Doctor (JD) </option><option>Doctor of Nursing Practice (DNP) </option><option>Doctor of Public Health (DrPH)</option><option>Doctor of Psychology (PsyD)</option>
                                                <option>Doctor of Engineering (EngD or DEng) </option><option> Doctor of Pharmacy (PharmD)</option><option> Doctor of Social Work (DSW) </option><option>Doctor of Theology (ThD) </option>
                                                <option>Doctor of Veterinary Medicine (DVM) </option><option>Doctor of Musical Arts (DMA)</option><option>Doctor of Dental Surgery (DDS) or Doctor of Dental Medicine (DMD) </option>
                                                <option>Doctor of Public Administration (DPA)</option><option>Doctor of Health Administration (DHA) </option>
                                            </optgroup>
                                
                                        </select>
                                        
                                        </div>
                                    )):[]
                                  }
                            </div>
                            <div className="col-md-4"><label className="labels">School/College/University</label>
                            {
                                Array.isArray(leadinfo.school_college) ?
                            leadinfo.school_college.map((name, index) => (
                                        <div key={index} style={{marginTop:"10px"}}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={leadinfo.school_college[index]}
                                            onChange={(event) => handleschool_collegeChange(index, event)}
                                        />
                                        
                                        </div>
                                    )):[]
                                  }                    
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action4) ?
                            leadinfo.action4.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn4}>+</button></div>

                            <div className="col-md-4"><label className="labels">Loan</label>
                            {
                                  Array.isArray(leadinfo.loan) ?
                            leadinfo.loan.map((item,index)=>
                            (
                                <select type="text"
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleloanchange(index,event)}
                                >
                                <option>{leadinfo.loan[index]}</option><option>Select</option><option>Home Loan </option><option>Auto Loan</option><option>Personal Loan </option>
                                <option>Education Loan</option> <option>Agriculture Loan </option> <option>Credit Card Loan</option>
                                </select>
                            )):[]
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Bank</label>
                            {
                                  Array.isArray(leadinfo.bank) ?
                            leadinfo.bank.map((item,index)=>
                            (
                                <select type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm"
                                onChange={(event)=>handlebankchange(index,event)}
                                >
                                  <option>{leadinfo.bank[index]}</option>
                                <option>Select</option>
                                    <option>State Bank of India (SBI) </option><option>Punjab National Bank (PNB)</option><option>Bank of Baroda</option><option>Canara Bank</option>
                                    <option>Union Bank of India</option><option>Bank of India (BOI)</option><option>Indian Bank </option><option>Central Bank of India</option>
                                    <option>Indian Overseas Bank (IOB)</option><option>UCO Bank</option><option>Bank of Maharashtra</option><option></option>
                                    <option>HDFC Bank </option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra Bank </option>
                                    <option>IndusInd Bank </option><option>Yes Bank </option><option>IDFC FIRST Bank</option><option>Federal Bank </option>
                                    <option>RBL Bank </option><option>South Indian Bank</option><option>Karur Vysya Bank </option><option>Tamilnad Mercantile Bank </option>
                                    <option>Bandhan Bank</option><option>Jammu & Kashmir Bank </option><option>DCB Bank </option><option>Citibank </option><option></option>
                                    <option>HSBC</option><option>Standard Chartered Bank </option><option>Deutsche Bank </option><option>Barclays Bank</option>
                                    <option>Royal Bank of Scotland (RBS) </option><option>Bank of America</option><option>American Express Bank </option><option>UBS</option>
                                    <option>Nabard Financial Services Ltd. (NABARD)</option><option></option>
                                    <option>The Saraswat Cooperative Bank</option><option>The Mumbai District Central Cooperative Bank</option><option>The Delhi State Cooperative Bank</option>
                                    <option>The Karnataka Vikas Grameen Bank</option><option>The Maharashtra State Cooperative Bank </option><option>The Uttar Bihar Gramin Bank</option>
                                    <option>The Punjab State Cooperative Bank</option><option>Gramin Bank of Aryavart </option><option></option>
                                    <option>Haryana Gramin Bank</option><option>Bangiya Gramin Vikash Bank </option><option>Kaveri Grameena Bank</option>
                                    <option>Prathama Bank </option><option>Small Industries Development Bank of India (SIDBI) </option><option></option>
                                    <option>Export-Import Bank of India (EXIM Bank) </option><option>National Bank for Agriculture and Rural Development (NABARD) </option><option></option>
                                </select>
                            )):[]

                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Amount</label>
                            {
                                  Array.isArray(leadinfo.amount) ?
                            leadinfo.amount.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                value={leadinfo.amount[index]}
                                className="form-control form-control-sm"
                                onChange={(event)=>handleamountchange(index,event)} />
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action5) ?
                            leadinfo.action5.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>


                            <div className="col-md-4"><label className="labels">Social Media</label>
                            {
                                  Array.isArray(leadinfo.social_media) ?
                            leadinfo.social_media.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handlesocial_mediachange(index,event)}>
                                <option>{leadinfo.social_media[index]}</option>
                                <option>select</option>
                                <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option><option>Google</option>
                                </select>

                            )):[]
                            }
                            </div>
                            <div className="col-md-6"><label className="labels">Url</label>
                            {
                                  Array.isArray(leadinfo.url) ?
                            leadinfo.url.map((item,index)=>
                            (
                                <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                                defaultValue={leadinfo.url[index]}
                                onChange={(event)=>handleurlChange(index,event)}/>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action6) ?
                            leadinfo.action6.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                            <div className="col-md-4"><label className="labels">Income</label>
                            {
                                  Array.isArray(leadinfo.income) ?
                            leadinfo.income.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handleincomechange(index,event)}>
                            <option>{leadinfo.income[index]}</option>
                            <option>select</option>
                            <option>Personal Income</option><option>Business Income</option>
                            </select>
                            )):[]
                            }
                            </div>
                            <div className="col-md-6"><label className="labels">Amount</label>
                            {
                                  Array.isArray(leadinfo.amount1) ?
                            leadinfo.amount1.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                defaultValue={leadinfo.amount1[index]}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleamount1change(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action7) ?
                            leadinfo.action7.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn7}>+</button></div>

                            <div className="col-md-3"><label className="labels">Document No.</label>
                            {
                                  Array.isArray(leadinfo.document_no) ?
                            leadinfo.document_no.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                defaultValue={leadinfo.document_no[index]}
                                onChange={(event)=>handledocumentnochange(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Document Name</label>
                            {
                                  Array.isArray(leadinfo.document_name) ?
                            leadinfo.document_name.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handledocumentnamechange(index,event)}>
                            <option>{leadinfo.document_name[index]}</option>
                            <option>select</option>
                            <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                            <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                            </select>
                            )):[]
                            }
                            </div>
                            {/* <div className="col-md-4"><label className="labels">Document Picture</label>
                            {
                                  Array.isArray(leadinfo.document_pic) ?
                            leadinfo.document_pic.map((item,index)=>
                            (
                              
                                <input type="file" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                                
                            )):[]
                            
                            }
                            
                            </div> */}
                            <div className="col-md-4">
                              <label className="labels">Document Picture</label>
                              {
                                Array.isArray(leadinfo.document_pic) ? 
                                leadinfo.document_pic.map((item, index) => (
                                  <div key={index} style={{marginTop:"10px"}}>
                                    {/* Show the image if it's available */}
                                    {item && (
                                      <img 
                                        // src={typeof item === 'string' ? item : URL.createObjectURL(item)} 
                                        src={`${item}`}
                                        alt="document preview" 
                                        style={{width: "50px", height: "50px", objectFit: "cover", marginBottom: "10px"}}
                                      />
                                    )}
                                    {/* Input for uploading a new image */}
                                    <input 
                                      type="file" 
                                      className="form-control form-control-sm" 
                                      onChange={(event) => handledocumentpicchange(index, event)} 
                                    />
                                  </div>
                                )) : []
                              }
                            </div>
                              
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                              Array.isArray(leadinfo.action8) ?
                            leadinfo.action8.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn8}>+</button></div>

                     </div>
 {/*==================================================== leadinfo personal end======================================================= */}
                 
                           
        
   
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatelead}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose7}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>



{/*============================================== edit lead end============================================================== */}



{/* =========================================add document details start =================================================================*/}


<Modal show={show8} onHide={handleClose8} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
            <div className="col-md-3"><label className="labels">Document No.</label>
                            {
                               Array.isArray(leaddocument.document_no)?
                               leaddocument.document_no.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentnochange1(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Document Name</label>
                            {
                               Array.isArray(leaddocument.document_name)?
                            leaddocument.document_name.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handledocumentnamechange1(index,event)}>
                            
                            {/* <option>{leaddata?.document_name[index] || '---Select---'}</option> */}
                             <option>---Select---</option>
                            <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                            <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                            </select>
                            )):[]
                            }
                            </div>
                            {/* <div className="col-md-4"><label className="labels">Document Picture</label>
                            {
                            leadinfo.document_pic.map((item,index)=>
                            (
                                <input type="file" 
                                
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                            ))
                            }
                            </div> */}
                            <div className="col-md-4">
                              <label className="labels">Document Picture</label>
                              {Array.isArray(leaddocument.document_pic)
                                ? leaddocument.document_pic.map((pic, index) => 
                                 
                                  <input type="file" 
                                
                                  style={{marginTop:"10px"}}
                                  className="form-control form-control-sm" 
                                  onChange={(event)=>handledocumentpicchange1(index,event)}
                                  />
                                ) 
                                : []}
                            
                             {/* {
                               Array.isArray(leadinfo.document_pic)?
                            leadinfo.document_pic.map((item,index)=>
                            (
                                <input type="file" 
                                
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                            )):[]
                            } */}
                        </div>

                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                               Array.isArray(leaddocument.action81)?
                               leaddocument.action81.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall81(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn81}>+</button></div>
                      </div>
            
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedocumentoflead}>
                Add Document
              </Button>
              <Button variant="secondary" onClick={handleClose8}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>







{/*========================================== add document details end ===================================================================*/}


{/*====================================================== update document start=================================================== */}

<Modal show={show14} onHide={handleClose14} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <div className="row">
                        <div className="col-md-3"><label className="labels">Document No.</label>
                         
                                <input type="text" 
                                value={updatedocument.document_no}
                                name='document_no'
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentnochange11(event)}
                                />
                          
                            </div>
                            <div className="col-md-3"><label className="labels">Document Name</label>
                           
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                
                                >
                             <option>{updatedocument.document_name}</option>
                            </select>
                          
                            </div>
                          
                            <div className="col-md-4">
                              <label className="labels">Document Picture</label>
                    
                                  <input type="file" 
                                  name='document_pic'
                                  style={{marginTop:"10px"}}
                                  className="form-control form-control-sm" 
                                  onChange={(event)=>handledocumentpicchange11(event)}
                                  />
                                  <img src={updatedocument.document_pic}></img>
                        </div>
                      </div>

                      </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatesingledocument}>
                Update Document
              </Button>
              <Button variant="secondary" onClick={handleClose14}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/*===================================================== update document end =========================================================*/}


{/* ========================================loader start============================================================== */}

<>
    {isLoading && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}>
        <div style={{
          background: "rgba(0, 0, 0, 0.8)",
          padding: "20px 40px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white",
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "5px solid white",
            borderTop: "5px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 10px",
          }}></div>
          <p>Uploading document...</p>
        </div>
      </div>
    )}
  </>

{/*=================================== loader end======================================================================= */}
<ToastContainer/>
    </div>
  )
}

export default Leadsingleview
