import React, { act, useEffect } from 'react'
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
import publish from '../icons/publish.jpg'
import createbooking from '../icons/createbooking.jpg'
import matchedlead from '../icons/matchedlead.jpg'
import transferuser from '../icons/transferuser.jpg'
import inventories from '../icons/inventories.jpg'

function Contactsingleview() {

const navigate=useNavigate()
  

    const location=useLocation()
    const lead=location.state || {}

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
        { id: 'house_details', name: 'House Details' },
        { id: 'contact', name: 'Contact' },
        { id: 'available_from', name: 'Available' },
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

    //       console.log(alltask);
          


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
   React.useEffect(()=>{fetchcdata1()},[])


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

console.log(flattenedUnits);

const [matchunit, setmatchunit] = useState([]); // To store matched data





useEffect(() => {
  const matchLeadWithUnit = async () => {
    let matchedUnits = []; // Temp array to store matched units

    // Iterate over each unit in flattenedUnits
    for (let item of flattenedUnits) {
      let matched = false; // Flag to check if a match is found

      // Check owner_details array for matches
      for (let owner of item.owner_details) {
         console.log(owner.title);
         console.log(owner.first_name);
         console.log(owner.last_name);
         console.log(lead.title);
         console.log(lead.first_name);
         console.log(lead.last_name);
        
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
  activity_note1:"",edit_field:"",edit_value:""})

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
  navigator.clipboard.writeText(lead.mobile_no[0])
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


console.log(alltask);

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
    setTimeout(() => {
    window.location.reload();
    }, 2000); // 2000 milliseconds = 2 seconds

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
              setTimeout(() => {
                  window.location.reload();
                }, 2000); // 2000 milliseconds = 2 seconds
              
          }
      } catch (error) {
          
          toast.error(error.message)
      }
    }


        const[leadupdatestage,setleadupdatestage]=useState("")
        const[dealupdatestage,setdealupdatestage]=useState("")
    useEffect(()=>
    {
      if(meetingtask.meeting_result==="Deal Done")
      {
        setleadupdatestage("Booked")
        setdealupdatestage("Booking")
      }
    
    },[meetingtask.meeting_result])

    const meetingdetails = async () => {
    
      const updatemeetingtask = { ...meetingtask, complete:"true" };
    
      try {
        const data1 = { newstage: dealupdatestage };
        const stage = { stage:leadupdatestage };
    
        
     
        // Loop through each selected project-block-unit combination
        let isValidCombination = true;
        for (let i = 0; i < meetingtask.inventory.length; i++) {
          const selectedCombination = meetingtask.inventory[i];
          const [unit_number, block, project] = selectedCombination.split('-');
    
          // Check if the unit_number, block, and project exist
          if (unit_number && block && project) {
            console.log(`Calling API: updatedealstage/${project}/${block}/${unit_number}`);
    
            try {
              // Call API for each valid combination
              const resp2 = await api.put(`updatedealstage/${project}/${block}/${unit_number}`, data1);
            } catch (error) {
              // Handle API errors for the individual combination
              toast.error(`API request failed for ${project} - ${block} - ${unit_number}`);
              isValidCombination = false; // Set to false if the combination fails
            }
          } else {
            // If any part is missing, skip the combination
            toast.warn(`Skipping API call for invalid combination: ${selectedCombination}`);
            isValidCombination = false;
          }
        }
    
        // Post site visit data if the combination is valid
        if (isValidCombination) {
          const resp = await api.put(`updatemeetingtask/${taskid}`, updatemeetingtask);
    
          const resp1 = await api.put(`updateleadbystagebyemail/${meetingtask.email[0]}`,stage );
          const resp2=await api.post('addactivity',activity)
          // If successful, show a success toast and reload
          if (resp.status === 200) {
            toast.success("Task Completed", { autoClose: 2000 });
    
            setTimeout(() => {
              window.location.reload();
            }, 2000);
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
    
  
    const [alldealunits, setalldealunits] = useState([]);
  
  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      sitevisit.intrested_project.some((project) => project === item.project) &&
      sitevisit.intrested_block.some((block) => block === item.block) // Add the condition for interested blocks
    );
    setalldealunits(dealblocks);
  }, [sitevisit.intrested_project, sitevisit.intrested_block]); 



  const sitevisitdetails = async () => {
    
 
  
    
    // Update site visit task
    const updatedsiteTask = { ...sitevisit, complete:"true" };
  
    try {
      const data1 = { newstage: updatestage1 };
      const stage = { stage:updatestage };
  
   
        
        
        
        
  
      // Loop through each selected project-block-unit combination
      let isValidCombination = true;
      for (let i = 0; i < allunit1.length; i++) {
        const selectedCombination = allunit1[i];
        const [unit_number, block, project] = selectedCombination.split('-');
  
        // Check if the unit_number, block, and project exist
        if (unit_number && block && project) {
          console.log(`Calling API: updatedealstage/${project}/${block}/${unit_number}`);
  
          try {
            // Call API for each valid combination
            const resp2 = await api.put(`updatedealstage/${project}/${block}/${unit_number}`, data1);
          } catch (error) {
            // Handle API errors for the individual combination
            toast.error(`API request failed for ${project} - ${block} - ${unit_number}`);
            isValidCombination = false; // Set to false if the combination fails
          }
        } else {
          // If any part is missing, skip the combination
          toast.warn(`Skipping API call for invalid combination: ${selectedCombination}`);
          isValidCombination = false;
        }
      }
  
      // Post site visit data if the combination is valid
      if (isValidCombination) {
        const resp = await api.put(`updatesitevisittask/${taskid}`, updatedsiteTask);
        const resp1 = await api.put(`updatelead/${sitevisit.lead_id}`,stage );
        const resp2=await api.post('addactivity',activity)
        // If successful, show a success toast and reload
        if (resp.status === 200) {
          toast.success("Task Completed", { autoClose: 2000 });
  
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } else {
        toast.error("Some project/block/unit combinations were invalid. Please check your data.");
      }
  
    } catch (error) {
      // Handle any errors during the process
      toast.error("An error occurred. Please check your data and try again.");
    }
  };

// ====================================site visit complete code end============================================================



// ==========================================edit contact start=========================================================

  

    const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[],mobile_no:[],mobile_type:[],action1:[],
      email:[],email_type:[],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",
    
      profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
      company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[],company_url:[],action3:[],
    
      father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
      birth_date:"",anniversary_date:"",education:[],degree:[],school_college:[],action4:[],loan:[],bank:[],amount:[],action5:[],
      social_media:[],url:[],action6:[],income:[],amount1:[],action7:[],document_no:[],document_name:[],document_pic:[],action8:[]});
    
           const time=new Date()
        
            const [show7, setshow7] = useState(false);
    
            const handleClose7 = () => setshow7(false);
            const[data1,setdata1]=useState([])
            const handleShow7=async()=>
            {
              
                try {
                  const resp=await api.get(`viewcontactbyid/${lead._id}`)//here search contact by id
                  setshow7(true);
                 
                  setcontact(resp.data.contact)
                  setdata1(resp.data.contact)
                } catch (error) {
                  console.log(error);
                }
              
             
            }
          
            
           
           
            const basicdetails=()=>
              {
                document.getElementById("basicdetails1").style.display="flex"
                document.getElementById("basicdetails2").style.display="flex"
                document.getElementById("basic").style.color="green"
                document.getElementById("other").style.color="black"
                
                document.getElementById("otherdetails").style.display="none"
               
              }
         
              const otherdetails=()=>
                {
                  document.getElementById("basicdetails1").style.display="none"
                  document.getElementById("basicdetails2").style.display="none"
                 
                     document.getElementById("otherdetails").style.display="flex"
                   document.getElementById("basic").style.color="black"
                    
                   document.getElementById("other").style.color="green"
                }
    
               
                function addFn1() {
                  setcontact(prevContact => ({
                    ...prevContact,
                    country_code: [...prevContact.country_code, ''],
                    mobile_no: [...prevContact.mobile_no, ''],
                    mobile_type: [...prevContact.mobile_type, ''],
                    action1: Array.isArray(prevContact.action1) ? [...prevContact.action1, ''] : ['']
                   
                  }));
                }
      
                const deleteall1=(index)=>
                  {
                   
                    const newcountry_code = contact.country_code.filter((_, i) => i !== index);
                    const newmobile_no = contact.mobile_no.filter((_, i) => i !== index);
                    const newmobile_type = contact.mobile_type.filter((_, i) => i !== index);
                    const newaction1 = contact.action1.filter((_, i) => i !== index);
                    
                    setcontact({
                      ...contact,
                      country_code: newcountry_code,
                      mobile_no: newmobile_no,
                      mobile_type: newmobile_type,
                      action1: newaction1
                    });
                  }
                  const handlecountry_codechange = (index, event) => {
                    const newcountry_code = [...contact.country_code];
                    newcountry_code[index] = event.target.value;
                    setcontact((prevProfile)=>({
                      ...prevProfile,
                      country_code: newcountry_code
                    }));
                  };
                  const handlemobile_nochange = (index, event) => {
                    const newmobile_no = [...contact.mobile_no];
                    newmobile_no[index] = event.target.value;
                    setcontact((prevProfile)=>({
                      ...prevProfile,
                      mobile_no:newmobile_no
                    }));
                  };
                  const handlemobile_typechange = (index, event) => {
                    const newmobile_type = [...contact.mobile_type];
                    newmobile_type[index] = event.target.value;
                    setcontact((prevProfile)=>({
                      ...prevProfile,
                      mobile_type: newmobile_type
                    }));
                  };
      
                  function addFn2() {
                    setcontact(prevContact => ({
                      ...prevContact,
                      email: [...prevContact.email, ''],
                      email_type: [...prevContact.email_type, ''],
                      action2: Array.isArray(prevContact.action2) ? [...prevContact.action2, ''] : ['']
                     
                    }));
                  }
        
                  const deleteall2=(index)=>
                    {
                     
                      const newemail = contact.email.filter((_, i) => i !== index);
                      const newemail_type = contact.email_type.filter((_, i) => i !== index);
                      const newaction2 = contact.action2.filter((_, i) => i !== index);
                      
                      setcontact({
                        ...contact,
                        email: newemail,
                        email_type: newemail_type,
                        action2: newaction2
                      });
                    }
                    const handleemailchange = (index, event) => {
                      const newemail = [...contact.email];
                      newemail[index] = event.target.value;
                      setcontact((prevProfile)=>({
                        ...prevProfile,
                        email:newemail
                      }));
                    };
                    const handleemail_typechange = (index, event) => {
                      const newemail_type = [...contact.email_type];
                      newemail_type[index] = event.target.value;
                      setcontact((prevProfile)=>({
                        ...prevProfile,
                        email_type:newemail_type
                      }));
                    };
      
                    function addFn3() {
           
                      setcontact(prevContact=>({
                        ...prevContact,
                        company_social_media: [...prevContact.company_social_media, ''],
                        company_url: [...prevContact.company_url, ''],
                        action3:Array.isArray(prevContact.action3)? [...prevContact.action3, '']:['']
                      }));
                    };
                    const deleteall3=(index)=>
                      {
                       
                        const newcomapnysocialmedia = contact.company_social_media.filter((_, i) => i !== index);
                        const newcompanyurl = contact.company_url.filter((_, i) => i !== index);
                        const newaction3=contact.action3.filter((_,i) => i !== index);
                        
                        setcontact({
                          ...contact,
                          company_social_media: newcomapnysocialmedia,
                          company_url: newcompanyurl,
                          action3:newaction3
                        });
                      }
                      const handlecompanysocialmediachange = (index, event) => {
                        const newcomapnysocialmedia = [...contact.company_social_media];
                        newcomapnysocialmedia[index] = event.target.value;
                        setcontact(prevContact=>({
                          ...prevContact,
                          company_social_media: newcomapnysocialmedia
                        }));
                      };
                      const handlecompanyurlchange = (index, event) => {
                        const newcompanyurl = [...contact.company_url];
                        newcompanyurl[index] = event.target.value;
                        setcontact(prevContact=>({
                          ...prevContact,
                          company_url: newcompanyurl
                        }));
                      };
                
                    
                      function addFn4() {
           
                        setcontact(prevContact=>({
                          ...prevContact,
                          education: [...prevContact.education, ''],
                          degree: [...prevContact.degree, ''],
                          school_college: [...prevContact.school_college, ''],
                          action4: Array.isArray(prevContact.action4) ? [...prevContact.action4, ''] : ['']
                        }));
                      };
                      const deleteall4=(index)=>
                        {
                         
                          const neweducation = contact.education.filter((_, i) => i !== index);
                          const newdegree = contact.degree.filter((_, i) => i !== index);
                          const newschool_college = contact.school_college.filter((_, i) => i !== index);
                          const newaction4=contact.action4.filter((_,i) => i !== index);
                          
                          setcontact({
                            ...contact,
                            education: neweducation,
                            degree: newdegree,
                            school_college: newschool_college,
                            action4:newaction4
                          });
                        }
                        const handleeducationChange = (index, event) => {
                          const neweducation = [...contact.education];
                          neweducation[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            education: neweducation
                          }));
                        };
                        const handledegreeChange = (index, event) => {
                          const newdegree = [...contact.degree];
                          newdegree[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            degree: newdegree
                          }));
                        };
                  
                        const handleschool_collegeChange = (index, event) => {
                          const newschool = [...contact.school_college];
                          newschool[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            school_college: newschool
                          }));
                        };
      
                      function addFn5() {
              
                        setcontact(prevContact=>({
                          ...prevContact,
                          loan: [...prevContact.loan, ''],
                          bank: [...prevContact.bank, ''],
                          amount: [...prevContact.amount, ''],
                          action5: Array.isArray(prevContact.action5) ? [...prevContact.action5, ''] : ['']
                        }));
                      };
                      const deleteall5=(index)=>
                        {
                         
                          const newloan = contact.loan.filter((_, i) => i !== index);
                          const newbank = contact.bank.filter((_, i) => i !== index);
                          const newamount = contact.amount.filter((_, i) => i !== index);
                          const newaction5=contact.action5.filter((_,i) => i !== index);
                          
                          setcontact({
                            ...contact,
                            loan: newloan,
                            bank: newbank,
                            amount: newamount,
                            action5:newaction5
                          });
                        }
                        const handleloanchange = (index, event) => {
                          const newloan = [...contact.loan];
                          newloan[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            loan: newloan
                          }));
                        };
                        const handlebankchange = (index, event) => {
                          const newbank = [...contact.bank];
                          newbank[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            bank: newbank
                          }));
                        };
                        const handleamountchange = (index, event) => {
                          const newamount = [...contact.amount];
                          newamount[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            amount: newamount
                          }));
                        };
      
                        function addFn6() {
              
                          setcontact(prevContact=>({
                            ...prevContact,
                            social_media: [...prevContact.social_media, ''],
                            url: [...prevContact.url, ''],
                            action6: Array.isArray(prevContact.action6) ? [...prevContact.action6, ''] : ['']
                          }));
                        };
                        const deleteall6=(index)=>
                          {
                           
                            const newsocial_media = contact.social_media.filter((_, i) => i !== index);
                            const newurl = contact.url.filter((_, i) => i !== index);
                            const newaction6=contact.action6.filter((_,i) => i !== index);
                            
                            setcontact({
                              ...contact,
                              social_media: newsocial_media,
                              url: newurl,
                              action6:newaction6
                            });
                          }
                          const handlesocial_mediachange = (index, event) => {
                            const newsocial_media = [...contact.social_media];
                            newsocial_media[index] = event.target.value;
                            setcontact(prevContact=>({
                              ...prevContact,
                              social_media: newsocial_media
                            }));
                          };
                          const handleurlChange = (index, event) => {
                            const newurl = [...contact.url];
                            newurl[index] = event.target.value;
                            setcontact(prevContact=>({
                              ...prevContact,
                              url: newurl
                            }));
                          };
      
                          function addFn7() {
              
                            setcontact(prevContact=>({
                              ...prevContact,
                              income: [...prevContact.income, ''],
                              amount1: [...prevContact.amount1, ''],
                              action7: Array.isArray(prevContact.action7) ? [...prevContact.action7, ''] : ['']
                            }));
                          };
                          const deleteall7=(index)=>
                            {
                             
                              const newincome = contact.income.filter((_, i) => i !== index);
                              const newamount1 = contact.amount1.filter((_, i) => i !== index);
                              const newaction7=contact.action7.filter((_,i) => i !== index);
                              
                              setcontact({
                                ...contact,
                                income: newincome,
                                amount1: newamount1,
                                action7:newaction7
                              });
                            }
                            const handleincomechange = (index, event) => {
                              const newincome = [...contact.income];
                              newincome[index] = event.target.value;
                              setcontact(prevContact=>({
                                ...prevContact,
                                income: newincome
                              }));
                            };
                            const handleamount1change = (index, event) => {
                              const newamount1 = [...contact.amount1];
                              newamount1[index] = event.target.value;
                              setcontact(prevContact=>({
                                ...prevContact,
                                amount1: newamount1
                              }));
                            };
      
                            function addFn8() {
              
                              setcontact(prevContact=>({
                                ...prevContact,
                                document_no: [...prevContact.document_no, ''],
                                document_name: [...prevContact.document_name, ''],
                                document_pic: [...prevContact.document_pic, ''],
                                action8: Array.isArray(prevContact.action8) ? [...prevContact.action8, ''] : ['']
                              }));
                            };
                            const deleteall8=(index)=>
                              {
                               
                                const newdocumentno = contact.document_no.filter((_, i) => i !== index);
                                const newdocumentname = contact.document_name.filter((_, i) => i !== index);
                                const newdocumentpic = contact.document_pic.filter((_, i) => i !== index);
                                const newaction8=contact.action8.filter((_,i) => i !== index);
                                
                                setcontact({
                                  ...contact,
                                  document_no: newdocumentno,
                                  document_name: newdocumentname,
                                  document_pic: newdocumentpic,
                                  action8:newaction8
                                });
                              }
                              const handledocumentnochange = (index, event) => {
                                const newdocumentno = [...contact.document_no];
                                newdocumentno[index] = event.target.value;
                                setcontact(prevContact=>({
                                  ...prevContact,
                                  document_no: newdocumentno
                                }));
                              };
                              const handledocumentnamechange = (index, event) => {
                                const newdocumentname = [...contact.document_name];
                                newdocumentname[index] = event.target.value;
                                setcontact(prevContact=>({
                                  ...prevContact,
                                  document_name: newdocumentname
                                }));
                              };
                              const handledocumentpicchange = (index, event) => {
                                const newdocumentpic = [...contact.document_pic];
                                const files = Array.from(event.target.files);
                                newdocumentpic[index] = {files:files}
                                setcontact(prevContact=>({
                                  ...prevContact,
                                  document_pic: newdocumentpic
                                }));
                              };
                            
                              const config = {
                                headers: {
                                  'Content-Type': 'multipart/form-data' // Set the Content-Type here
                                }
                            }
          const updatecontact=async()=>
            {
              try {
                
                const id=data1._id
                const resp=await api.put(`updatecontact/${id}`,contact,config)
                toast.success("contact updated",{ autoClose: 2000 })
                setTimeout(() => {
                  navigate('/contactdetails')
                }, 2000);
                // setTimeout(() => {
                //   handleClose1()
                // }, 2000);
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
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
                            
                            const [availableSubcategories, setAvailableSubcategories] = useState([]);
                            const [availableDesignations, setAvailableDesignations] = useState([]);
                            
                            // Handle profession category change
                            const handleProfessionCategoryChange = (event) => {
                              const selectedCategory = event.target.value;
                            
                              setcontact((prevLead) => ({
                                ...prevLead,
                                profession_category: selectedCategory,
                                profession_subcategory: "", // Reset subcategory when category changes
                                designation: "", // Reset designation when category changes
                              }));
                            
                              // Update available subcategories based on selected profession category
                              setAvailableSubcategories(professtiondetails.profession_subcategory[selectedCategory] || []);
                            };
                            
                            // Handle profession subcategory change
                            const handleProfessionSubcategoryChange = (event) => {
                              const selectedSubcategory = event.target.value;
                            
                              setcontact((prevLead) => ({
                                ...prevLead,
                                profession_subcategory: selectedSubcategory,
                                designation: "", // Reset designation when subcategory changes
                              }));
                            
                              // Update available designations based on selected profession subcategory
                              setAvailableDesignations(professtiondetails.designation[selectedSubcategory] || []);
                            };
                            
                            // Handle designation change
                            const handleDesignationChange = (event) => {
                              const selectedDesignation = event.target.value;
                            
                              setcontact((prevLead) => ({
                                ...prevLead,
                                designation: selectedDesignation,
                              }));
                            };

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
    
                      
                              const[cdata,setcdata]=useState([]);
                              const fetchcdata1=async(event)=>
                              {
                                
                                try {
                                  const resp=await api.get('viewcompany')
                                  setcdata(resp.data.developer)
                                  const countcompany=Array.isArray(resp.data.developer) ? resp.data.developer : [resp.data.developer]
                                  // settotalcompany(countcompany.length)
                                  // setFilteredData(countcontact);
                                } catch (error) {
                                  console.log(error);
                                }
                              
                              }




// =========================edit contact end===================================================================================




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
  setIsLoading(true)
  const id = lead._id;  // Assuming selectedItems is the ID of the lead to update

  const resp = await api.put(`adddocumentincontact/${id}`, leaddocument, {
    headers: {
      'Content-Type': 'multipart/form-data', // Ensure proper content-type for form-data
    },
  });
  const resp1=await api.post('addactivity',activity)

  if(resp1.status===200)
    {
      Swal.fire({
        icon: 'success',
        title: 'Document Added',
        text: 'Your document has been added successfully!',
      });
    }

  setTimeout(() => {
    window.location.reload();  // If necessary, reload the page
  }, 2000);
} catch (error) {
  console.log(error);
} finally {
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
      const resp=await api.put(`updatecontactdocumentsingle/${lead._id}`,updatedocument,config)
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
         navigate('/contactdetails')
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
      const resp=await api.delete(`deletecontactsingledocument/${lead._id}`,{data: document_name})
      if(resp.status===200)
        {
          Swal.fire({
            icon: 'success',
            title: 'Document Deleted',
            text: 'Your document has been deleted successfully!',
          });
        }
        setTimeout(() => {
         navigate('/contactdetails')
        }, 1000);
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: `Error coming!!! ${error}`,
      });
    }
    finally {
      setIsLoading(false); // Hide loader after API call
    }
  }


// ================================================delete document end==========================================================




  return (
    <div style={{overflowX:"hidden"}}>

      <Header1/>
      <Sidebar1/>

  

       <div style={{marginTop:"60px",backgroundColor:"white",height:"80px",paddingLeft:"80px"}}>
        <div  style={{padding:"10px",borderRadius:"10px"}} >
          <h6>Contact</h6>
          <h3 style={{fontWeight:"normal",color:"blue",fontFamily:"times-new-roman"}}>{lead.title} {lead.first_name} {lead.last_name}<span style={{fontSize:"14px",marginLeft:"10px",color:"black"}}>{lead.company_name}
             <a class=" dropdown"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical" style={{fontSize:"24px",cursor:"pointer",color:"black"}}></i>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{cursor:"pointer",lineHeight:"30px",paddingLeft:"10px",fontFamily:"arial",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",fontSize:"14px"}}>
                          <li><img src='https://cdn2.iconfinder.com/data/icons/top-business-1/32/business_profile_person_plus_invite_add-512.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Add to Lead</li>
                          <li><img src='https://icons.veryicon.com/png/o/miscellaneous/seiko-cloud-map-standard-library/add-inventory.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Add to Inventory</li>
                          <li><img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/sequence-204506.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img> ⁠Add Sequence</li>
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
            <div className="col-md-3">
                      
                      </div>
                <div className='col-md-5'><label style={{color:"#B85042"}}>Status</label>
                <select className="form-control form-control-sm">
                    <option >{lead?.status || '---Select---'}</option>
                    <option>---select---</option>
                        <option>Customer</option>
                        <option>Prospect</option>
                </select>
                </div>
                <div className='col-md-4'></div>

                <div className="col-md-6" >
                            <label  style={{color:"#B85042"}}>Mobile</label>
                <FormControl fullWidth size="small">
                  <InputLabel id="mobile-label" style={{paddingTop:"23px",fontSize:"18px"}}>
                  <img
                        src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg"
                        alt="call-icon"
                        style={{ height: '30px', marginRight: '4px' }}
                      />
                  {lead.mobile_no[0]}</InputLabel>
                  <Select
                    labelId="mobile-label"
                    id="mobile-select"
                    value={lead.mobile_no[0]}  // Always keep the mobile number as the value
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
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.owner}</p>
                </div>
                <div className='col-md-3' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>Team</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.team}</p></div>
                <div className='col-md-4' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>Time Zone</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>Asia/Kolkata</p></div>


                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Recived On</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{new Date(lead.createdAt).toLocaleString()}</p>
                </div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Source</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.campegin} {lead.source}</p></div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Last Conduct At</label><p style={{ wordWrap: "break-word", whiteSpace: "normal",marginTop:"-10px",fontWeight:"normal"}}>{formattedDate}</p></div>
                <div className='col-md-12'><hr></hr></div>

            

                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12' style={{color:"blue",fontWeight:"normal"}}>Personal Details</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p style={{fontWeight:"normal"}}>Father/Husband Name-{lead.father_husband_name}</p></div>

                    <div className='col-md-12'><p style={{fontWeight:"normal"}}>Location- <span style={{color:"#B85042"}}>{lead.location1}</span></p></div>
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
                            <div><img src='https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg' style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"61%"}}>{new Date(item.createdAt).toLocaleString()}</span>
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
                            <div><img src='https://illustoon.com/photo/2751.png' style={{height:"20px"}}></img>
                            <span style={{fontSize:"10px"}}>you sent an email to {lead.title} {lead.first_name} {lead.last_name}</span>
                            <img
          src="https://cdn-icons-png.flaticon.com/512/301/301687.png"
          style={{
            height: "15px",
            marginLeft:"10%",
            cursor: "pointer",
            marginRight: "5px",
          }}
          onClick={toggleExpand} // Eye icon also toggles the expand/collapse
        />
        <span> {item.viewcount}</span>
                            <span style={{marginLeft:"15%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                            {/* <span  style={{marginLeft:"5%"}}><img id='deletebutton' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgCtB72sd2csn3h4Xoktuuub7vFQQ-dGBOw&s' style={{height:"20px",cursor:"pointer"}} onClick={()=>deleteactivity(item._id)}></img></span> */}

                            <span  style={{marginLeft:"0%",position:"absolute",marginTop:"-10px"}}>
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
                            <div><img src="https://static.vecteezy.com/system/resources/previews/001/505/060/non_2x/notes-icon-free-vector.jpg" style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"60%"}}>{new Date(item.createdAt).toLocaleString()}</span>
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
                            <span><u>{lead.owner}</u> left a note</span><br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.activity_note1 }} />
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="complete call task"?(
                            <div id='completecallaction' >
                            <div><img src="https://cdn3d.iconscout.com/3d/premium/thumb/two-way-communication-3d-icon-download-in-png-blend-fbx-gltf-file-formats--chat-chatting-people-join-call-center-pack-icons-8400040.png" style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} of {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="complete mail task"?(
                            <div id='completemailaction' >
                            <div><img src="https://cdn-icons-png.flaticon.com/512/4697/4697867.png" style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} of {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) :  item.activity_name==="complete meeting task"?(
                            <div id='completemeetingaction' >
                            <div><img src="https://cdn-icons-png.flaticon.com/512/1081/1081530.png" style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} with {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) :  item.activity_name==="complete site visit task"?(
                            <div id='completsitevisitaction' >
                            <div><img src="https://cdn-icons-png.freepik.com/512/8094/8094388.png" style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} with {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="edit"?(
                            <div id='editaction' >
                            <div><img src="https://www.freeiconspng.com/uploads/document-edit-icon-19.png" style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} {item.lead} {item.edit_field} with {item.edit_value}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create call task"?(
                            <div id='createcalltaskaction' >
                            <div><img src="https://www.shutterstock.com/image-vector/call-planner-icon-time-management-260nw-1414111730.jpg" style={{height:"40px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create mail task"?(
                            <div id='createmailtaskaction' >
                            <div><img src="https://cdn-icons-png.freepik.com/256/16294/16294372.png?semt=ais_hybrid" style={{height:"30px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create meeting task"?(
                            <div id='createmeetingtaskaction' >
                            <div><img src="https://t4.ftcdn.net/jpg/03/67/61/45/360_F_367614596_kyv8YYMpghwJ6pR6NHp7oyIN1IVnfHvF.jpg" style={{height:"30px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="create site visit task"?(
                            <div id='createsitevisittaskction' >
                            <div><img src="https://cdn-icons-png.freepik.com/256/13156/13156025.png?semt=ais_hybrid" style={{height:"30px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="deal created"?(
                            <div id='createsitevisittaskction' >
                            <div><img src="https://cdn-icons-png.flaticon.com/512/2132/2132939.png" style={{height:"30px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="add inventory"?(
                            <div id='createsitevisittaskction' >
                            <div><img src="https://icons.veryicon.com/png/o/miscellaneous/seiko-cloud-map-standard-library/add-inventory.png" style={{height:"30px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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
                            <span><u>{lead.owner}</u> {item.activity_name} for {item.lead}</span><br></br>
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="added docuemnt"?(
                            <div id='createsitevisittaskction' >
                            <div><img src="https://cdn-icons-png.flaticon.com/512/9425/9425017.png" style={{height:"30px"}}></img>
                            
                            <span style={{marginLeft:"56%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                          

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

        

  <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>
  <div className='col-md-12'><img src={inventories} style={{height:"25px",paddingRight:"10px"}}/> Inventories(<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{matchunit.length}</span>)
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
              style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px" }}
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
         Tasks(<span className="no-activity-flash" style={{ fontSize: "12px", color: "blue" }}>
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
         onClick={()=>navigate('/tasksform')}
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

        <div style={{backgroundColor:"white",width:"100%",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"0px",height: isTableVisible2 ? "300px" : "0",transition: "height 0.3s ease",overflow:"auto"}}>
         
        <TableContainer component={Paper} style={{  maxHeight: '300px'}}>
    <Table sx={{}} aria-label="customized table">
      <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
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
      </thead>
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

        <div className='col-md-12'> <img src="https://www.freeiconspng.com/thumbs/document-icon/document-icon-19.png" style={{height:"25px",paddingRight:"10px"}}/> Documents (<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{documents.length}</span>)
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
         
        <TableContainer component={Paper} style={{ height: '200px', overflow: 'auto' }}>
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
          
          <StyledTableCell className="leaddocumentscolomncontact">
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
  
    <span className="documentsactionscontact">
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

<div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible4 ? "300px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
 
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
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...prevState,direction:e.target.value}))} >
                    
                    <option>---Select---</option>
                        
                          <option>Incoming</option>
                          <option>Outgoing</option>
                        
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...prevState,status:e.target.value}))}>
                   
                    <option>---Select---</option>
                    <option>Answered</option>
                    <option>Missed</option>
                    <option>Not Pic</option>
                    <option>Busy</option>
                    <option>Cut Call</option>
                    <option>Number Not Reachable</option>
                    <option>Switch Off</option>
                    <option>Incoming</option>
                    <option>Not Available</option>
                    <option>Number Invalid</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                
               
                <div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" id="date1"  className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1} onChange={(e)=>setcalltask((prevState)=>({...prevState,date:e.target.value}))}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time"  className="form-control form-control-sm" onChange={(e)=>setcalltask((prevState)=>({...prevState,duration:e.target.value}))}/></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...prevState,result:e.target.value}))}>
                   
                    <option>---Select---</option>
                    <option>Interested</option>
                    <option>Not Interested</option>
                    <option>Postponed</option>
                    <option>Low Budget</option>
                    <option>Location Mismatch</option>
                       
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
                    
            <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" >
            <option>---Select---</option>
                        
                        <option>Incoming</option>
                        <option>Outgoing</option>
                        </select>
             </div>

             <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" >
                    <option>---select---</option>
                       <option>Read</option>
                       <option>Delivered</option>
                       <option>Bounced</option>
                       <option>Undelivered</option>
                        </select>
               </div>
               <div className="col-md-4"></div>

                  <div className="col-md-4"><label className="labels">Date</label><input type="date" className="form-control form-control-sm" /></div>
                <div className="col-md-8"> </div>

                   <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
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
                    
            <div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask((prevState)=>({...prevState,status:e.target.value}))} >

              <option>---Select---</option>
                <option>Conducted</option>
                <option>Cancelled</option>
                <option> Postponed</option>
                  </select>
          </div>

          {
      meetingtask.status==="Conducted" && 
            (
              <div className="col-md-4"><label className="labels">Meeting Result</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask((prevState)=>({...prevState,meeting_result:e.target.value}))}>
              <option>{meetingtask.meeting_result}</option>
              <option>---Select---</option>
                <option>Deal Done</option>
                <option>Negotiation Uncomplete</option>
                <option>Deal Not Done</option>
                <option>Site Visit</option>
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

              <div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" value={meetingtask.date} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,date:e.target.value}))} /></div>

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
          
          <div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" onChange={handleleadstatuschange} >
          <option>Select</option>
             <option>Conducted</option>
             <option>Did Not Visit</option>
             <option>Not Intersted</option>
              </select>
              </div>
              <div className="col-md-8"></div>
              {
                  sitevisit.status==="Conducted" &&(
                      <>
          
                      <div className="col-md-4"><label className="labels">Select Intrested Project</label> 
                      <Select className="form-control form-control-sm" style={{border:"none"}}
                  multiple
                  value={siteprojects}
                  onChange={handlesiteprojectchange}
                  renderValue={(selected) => selected.join(', ')}
              >
                  {sitevisit.project.map((name) => (
                      <MenuItem key={name} value={name}>
                          <Checkbox checked={siteprojects.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                      </MenuItem>
                  ))}
              </Select>
                      </div>
          
                      <div className="col-md-4">
          <label className="labels">Select Interested Block</label>
          <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={allblock}  // Value contains the full block.block-project combinations
          onChange={handleallblockchange}  // Handle the change when blocks are selected/deselected
          renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
          >
          {alldealblocks
          .filter((value, index, self) =>
          // Ensure unique combinations of block.block and block.project
          index === self.findIndex((t) => (
            t.block === value.block && t.project === value.project
          ))
          )
          .map((block) => {
          // Create a unique identifier by combining block.block and block.project
          const uniqueBlockKey = `${block.block}-${block.project}`;
          
          return (
            <MenuItem key={uniqueBlockKey} value={uniqueBlockKey}> {/* Use block.block-project for value */}
              <Checkbox 
                checked={allblock.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
              />
              <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
            </MenuItem>
          );
          })
          }
          </Select>
          </div>
          
          
          
                      <div className="col-md-4"><label className="labels">Select Intersted Inventory</label>
                   
                      <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={allunit1} // Holds selected units
          onChange={handleallunitschange1} // Handle changes for unit selection
          renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
          >
          {alldealunits
          .filter((value, index, self) =>
          // Ensure unique combinations of project, block, and unit
          index === self.findIndex((t) => (
          t.project === value.project &&
          t.block === value.block &&
          t.unit_number === value.unit_number // Ensure uniqueness by comparing unit_number
          ))
          )
          .map((unit) => {
          // Create a unique key for project-block-unit combination
          const uniqueKey = `${unit.unit_number}-${unit.block}-${unit.project}`;
          
          return (
          <MenuItem key={uniqueKey} value={uniqueKey}> {/* Use project-block-unit combination for value */}
          <Checkbox checked={allunit1.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
          <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
          </MenuItem>
          );
          })}
          </Select>
          
          
                          </div>
                          </>
                  )
              }
           
          
          
          
          <div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,date:e.target.value})}/></div>
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



<Modal show={show7} onHide={handleClose7} size='xl'>
            {/* <Modal.Header>
              <Modal.Title>Update Lead</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
          
              
            <div >
            <div  >
    <div className="row" id='r' >
        <div className="col-md-12 border">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Update Contact</h4><input type='checkbox'  style={{marginLeft:"60%",height:"20px",width:"20px"}} /><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               
         
             <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"100px"}}>
               <div  id='basic'><span onClick={basicdetails} style={{cursor:'pointer',fontWeight:"bold",width:"200px"}}>Basic Details|</span></div>
                <div  id='other'><span onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold",width:"150px"}}>Personal Detail|</span></div> 
               </div>
						    <div style={{marginLeft:"450px",width:"18%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
                <div className=" col-md-12 d-flex justify-content-between align-items-center experience"><span>Basic Details</span></div>
                <div className='col-md-12'><hr></hr></div>
                    <div className="col-md-2"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,title:e.target.value}))}>
                              <option>{data1.title}</option>
                              <option>Select</option>
                              <option>Mr.</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                        </div>
                    <div className="col-md-5"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={data1.first_name} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,first_name:e.target.value}))}/></div>
                    <div className="col-md-5"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm"  defaultValue={data1.last_name} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,last_name:e.target.value}))}/></div>
                </div>
                <div className="row mt-3" id='basicdetails2'>
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      Array.isArray(contact.country_code)?
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)} >
                        <option value={item} >{data1.country_code[index]}</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                      )):[]
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                      Array.isArray(contact.mobile_no)?
                       contact.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                           defaultValue={data1.mobile_no[index]}
                          className="form-control form-control-sm" 
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
                        )):[]
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                      Array.isArray(contact.mobile_type)?
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}}
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                  <option>{data1.mobile_type[index]}</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        )):[]
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action1)?
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                      Array.isArray(contact.email)?
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
                          defaultValue={data1.email[index]}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange(index,event)}/>
                        )):[]
                    }
                    </div>
                    
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                      Array.isArray(contact.email_type)?
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          
                          onChange={(event)=>handleemail_typechange(index,event)}>
                             <option>{data1.email_type[index]}</option>
                                <option>Select Type</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        )):[]
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action2)?
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall2(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                    <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                    
                    <div className="col-md-12"><label className="labels">Tags</label><input type="text" className="form-control form-control-sm" defaultValue={data1.tags} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,tags:e.target.value}))}/></div>
                    
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm'defaultValue={data1.descriptions} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,descriptions:e.target.value}))}/></div>
                    <div className="col-md-2"></div>

                    <div className="col-md-12" style={{marginTop:"10px"}}><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Profession Details</label><hr style={{marginTop:"-5px"}}></hr></div>
               
               <div className="col-md-5"><label className="labels">Profession Category</label>
               <select className="form-control form-control-sm" onChange={handleProfessionCategoryChange}>
                             <option>{contact.profession_category}</option>    
                          
                           {professtiondetails.profession_category.map((category) => (
                           <option key={category} value={category}>
                             {category}
                           </option>
                         ))}
                   </select>
               </div>
               <div className="col-md-7"><label className="labels">Profession Sub-Category</label>
               <select className="form-control form-control-sm" onChange={handleProfessionSubcategoryChange}>
                           <option>{contact.profession_subcategory}</option>
                           {availableSubcategories.map((subcategory) => (
                           <option key={subcategory} value={subcategory}>
                             {subcategory}
                           </option>
                         ))}
                   </select>
               </div>
               <div className="col-md-5"><label className="labels">Designation</label>
               <select className="form-control form-control-sm" onChange={handleDesignationChange}>
               <option>{contact.designation}</option>
               {availableDesignations.map((designation) => (
                 <option key={designation} value={designation}>
                         {designation}
                       </option>
                   ))}
                   </select>
               </div>
               <div className="col-md-6"><label className="labels">Company/Organisation/Department Name</label>
               <select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,company_name:e.target.value})}>
               <option>{contact.company_name}</option>
                 {
                   cdata.map((item)=>
                   (
                     <option>{item.name}</option>
                   ))
                 }
                   </select>
               </div>
               <div className="col-md-1"><label className="labels">Add</label><button className="form-control form-control-sm" onClick={()=>{navigate('/addcompany')}}>+</button></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm"onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,source:e.target.value}))} >
                                    <option>{data1.source}</option><option>Select</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,team:e.target.value}))} >
                              <option>{data1.team}</option> 
                              <option>Select</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,owner:e.target.value}))} >
                              <option>{data1.owner}</option>     
                              <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select>
                        
                        </div>
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,visible_to:e.target.value}))} >
                               <option>{data1.visible_to}</option> 
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>

          
                       </div>
                  </div>
             </div> 

   {/*------------------------------------------------------------ basic details end---------------------------------------------------- */}
                  


 {/*-------------------------------------------------- personal details start--------------------------------------------------------- */
 
 }
        <div className="col-md-12" id='otherdetails' style={{display:"none",marginTop:"-40px"}}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Personal Details</span></div><hr></hr>
                <div className="row " >

                <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control form-control-sm" defaultValue={data1.father_husband_name} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,father_husband_name:e.target.value}))}/></div>

                    <div className="col-md-3"><label className="labels">H.No</label><input type="text" defaultValue={data1.h_no} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,h_no:e.target.value}))}/></div>
                    <div className="col-md-9"><label className="labels">Area</label><input type="text" defaultValue={data1.area1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,area1:e.target.value}))}/></div>

                    <div className="col-md-4"><label className="labels">Location</label><input type="text" defaultValue={data1.location1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,location1:e.target.value}))}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" defaultValue={data1.city1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,city1:e.target.value}))}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" defaultValue={data1.pincode1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,pincode1:e.target.value}))}/></div>

                    <div className="col-md-6"><label className="labels">State</label><input type="text" defaultValue={data1.state1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,state1:e.target.value}))}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" defaultValue={data1.country1} className="form-control form-control-sm"  onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,country1:e.target.value}))}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-5"><label className="labels">Gender</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,gender:e.target.value}))}>
                                <option>{data1.gender}</option>
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,maritial_status:e.target.value}))}>
                            <option>{data1.maritial_status}</option>
                            <option>Select</option>
                            <option>Married</option>
                            <option>Unmarried</option>
                            <option>Single</option>
                        </select>
                    </div>

                    <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" defaultValue={data1.birth_date} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,birth_date:e.target.value}))}/></div>
                    <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" defaultValue={data1.anniversary_date} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,anniversary_date:e.target.value}))}/></div>

                    <div className="col-md-3"> <label className="labels">Education</label>
                        
                             {
                             Array.isArray(contact.education)?
                             contact.education.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <select className="form-control form-control-sm"
                                    onChange={(event) => handleeducationChange(index, event)}
                                  >
                                    <option>{data1.education[index]}</option>
                                    <option>choose</option>
                                    <option>Kindergaren</option><option>School</option><option>Primery Education</option><option> Secondary Education</option><option>Master</option><option>Commerce</option>
                                    <option>Vocational Education</option>
                                  </select>
                                  
                                </div>
                              )):[]}
                        </div>
                    <div className="col-md-3"><label className="labels">Degree</label>
                    {
                    Array.isArray(contact.degree)?
                    contact.degree.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <select
                                    className="form-control form-control-sm"
                                    onChange={(event) => handledegreeChange(index, event)}
                                  >
                                    <option>{data1.degree[index]}</option>
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
                              )):[]}
                    </div>
                    <div className="col-md-4"><label className="labels">School/College/University</label>
                    {
                    Array.isArray(contact.school_college)?
                    contact.school_college.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    defaultValue={data1.school_college[index]}
                                    onChange={(event) => handleschool_collegeChange(index, event)}
                                  />
                                  
                                </div>
                              )):[]}                    
                    </div>
                     <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action4)?
                      contact.action4.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                     <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn4}>+</button></div>
                
                    <div className="col-md-4"><label className="labels">Loan</label>
                    {
                      Array.isArray(contact.loan)?
                      contact.loan.map((item,index)=>
                      (
                        <select type="text"
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handleloanchange(index,event)}
                        >
                          <option>{data1.loan[index]}</option> <option>Select</option><option>Home Loan </option><option>Auto Loan</option><option>Personal Loan </option>
                          <option>Education Loan</option> <option>Agriculture Loan </option> <option>Credit Card Loan</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className="col-md-3"><label className="labels">Bank</label>
                    {
                      Array.isArray(contact.bank)?
                      contact.bank.map((item,index)=>
                      (
                        <select type="text" 
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm"
                        onChange={(event)=>handlebankchange(index,event)}
                        >
                                <option>{data1.bank[index]}</option><option>Select</option>
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
                      Array.isArray(contact.amount)?
                      contact.amount.map((item,index)=>
                      (
                        <input type="text" 
                        defaultValue={data1.amount[index]}
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm"
                        onCanPlay={(event)=>handleamountchange(index,event)} />
                      )):[]
                    }
                  </div>
                  <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action5)?
                      contact.action5.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>

                    
                    <div className="col-md-4"><label className="labels">Social Media</label>
                    {
                      Array.isArray(contact.social_media)?
                      contact.social_media.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                          onChange={(event)=>handlesocial_mediachange(index,event)}>
                        
                        <option>{data1.social_media[index]}</option><option>select</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option><option>Google</option>
                        </select>

                      )):[]
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Url</label>
                    {
                      Array.isArray(contact.url)?
                      contact.url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} defaultValue={data1.url[index]}
                        onChange={(event)=>handleurlChange(index,event)}/>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action6)?
                      contact.action6.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                    <div className="col-md-4"><label className="labels">Income</label>
                    {
                      Array.isArray(contact.income)?
                      contact.income.map((item,index)=>
                      (
                        <select
                        className='form-control form-control-sm'
                         style={{marginTop:"10px"}}
                         onChange={(event)=>handleincomechange(index,event)}>
                       
                       <option>{data1.income[index]}</option><option>select</option>
                       <option>Personal Income</option><option>Business Income</option>
                       </select>
                      )):[]
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Amount</label>
                    {
                      Array.isArray(contact.amount1)?
                      contact.amount1.map((item,index)=>
                      (
                        <input type="text" defaultValue={data1.amount1[index]}
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handleamount1change(index,event)}
                        />
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action7)?
                      contact.action7.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn7}>+</button></div>
                   
                    <div className="col-md-3"><label className="labels">Document No.</label>
                    {
                      Array.isArray(contact.document_no)?
                      contact.document_no.map((item,index)=>
                      (
                        <input type="text" 
                        defaultValue={data1.document_no[index]}
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handledocumentnochange(index,event)}
                        />
                      )):[]
                    }
                    </div>
                    <div className="col-md-3"><label className="labels">Document Name</label>
                    {
                      Array.isArray(contact.document_name)?
                      contact.document_name.map((item,index)=>
                      (
                        <select
                        className='form-control form-control-sm'
                         style={{marginTop:"10px"}}
                         onChange={(event)=>handledocumentnamechange(index,event)}>
                       
                       <option>{data1.document_name}</option><option>select</option>
                       <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                       <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                       </select>
                      )):[]
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Document Picture</label>
                    {
                      Array.isArray(contact.document_pic)?
                      contact.document_pic.map((item,index)=>
                      (
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
                        <input type="file"
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handledocumentpicchange(index,event)}
                        />
                        </div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action8)?
                      contact.action8.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn8}>+</button></div>
                 <div className='col-md-12'><hr></hr></div> 
                </div>
               
            </div>
        </div>
    </div>
</div>
</div>
 
                 
                           
        
   
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatecontact}>
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

export default Contactsingleview
