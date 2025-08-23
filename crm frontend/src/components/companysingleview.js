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
import { Tooltip } from 'react-bootstrap';
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
import matchedlead from '../icons/matchedlead.jpg'
import publish from '../icons/publish.jpg'
import createbooking from '../icons/createbooking.jpg'
import transferuser from '../icons/transferuser.jpg'

function Companysingleview() {

const navigate=useNavigate()
  

    const location=useLocation() 
    const lead=location.state || {}

    console.log(lead);
    
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

  
    

    const[matchsitevisitdata,setmatchsitevisitdata]=useState([])
    const matchLeadData = (site) => {
        const [title, firstName, lastName] = site.lead.split(" "); // Split full name into title, first name, last name
      
        if (
          lead.title === title &&
          lead.first_name === firstName &&
          lead.last_name === lastName
        ) {
            setmatchsitevisitdata((prevData) => [...prevData, site]);
            setalltask((prevData) => [...prevData, site]);
        }
      };

     




    useEffect(() => {
        if (sitevisitdata.length > 0) {
          sitevisitdata.forEach((site) => {
            if (site.lead) {
              // Now only need to match directly with site.lead
              matchLeadData(site); 
               // Assuming site contains lead.title, lead.first_name, lead.last_name
            }
          });
        }
      }, [sitevisitdata]);

      const[matchmeetingdata,setmatchmeetingdata]=useState([])
      const matchleaddatawithmeeting = (meeting) => {
          const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
        
          if (
            lead.title === title &&
            lead.first_name === firstName &&
            lead.last_name === lastName
          ) {
            setmatchmeetingdata((prevData) => [...prevData, meeting]);
            setalltask((prevData) => [...prevData, meeting]);
          }
        };
  
  
  
  
      useEffect(() => {
          if (meetingdata.length > 0) {
            meetingdata.forEach((meeting) => {
              if (meeting.lead) {
                // Now only need to match directly with site.lead
                matchleaddatawithmeeting(meeting);  // Assuming site contains lead.title, lead.first_name, lead.last_name
              }
            });
          }
        }, [meetingdata]);

        const[matchmaildata,setmatchmaildata]=useState([])
        const matchmaildatawithlead = (mail) => {
            // const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
          
            if (
              lead.title === mail.title2 &&
              lead.first_name === mail.first_name &&
              lead.last_name === mail.last_name
            ) {
                setmatchmaildata((prevData) => [...prevData, mail]);
                setalltask((prevData) => [...prevData, mail]);
            }
          };
    
    
    
    
        useEffect(() => {
            if (maildata.length > 0) {
              maildata.forEach((mail) => {
               
                  // Now only need to match directly with site.lead
                  matchmaildatawithlead(mail);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                
              });
            }
          }, [maildata]);
    

          const[matchcalldata,setmatchcalldata]=useState([])
          const matchcalldatawithlead = (call) => {
               const [title, firstName, lastName] = call.lead.split(" "); // Split full name into title, first name, last name
            
              if (
                lead.title === title &&
                lead.first_name === firstName &&
                lead.last_name === lastName
              ) {
                setmatchcalldata((prevData) => [...prevData, call]);
                setalltask((prevData) => [...prevData, call]);
              }
            };
      
      
      
      
          useEffect(() => {
              if (calldata.length > 0) {
                calldata.forEach((call) => {
                 
                    // Now only need to match directly with site.lead
                    matchcalldatawithlead(call);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                  
                });
              }
            }, [maildata]);

          console.log(alltask);
          


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



// ==========================================edit company start=========================================================


 const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[],mobile_no:[],mobile_type:[],action1:[],
  email:[],email_type:[],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

  profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
  company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[],company_url:[],action3:[],

  father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
  birth_date:"",anniversary_date:"",education:[],degree:[],school_college:[],action4:[],loan:[],bank:[],amount:[],action5:[],
  social_media:[],url:[],action6:[],income:[],amount1:[],action7:[],document_no:[],document_name:[],document_pic:[],action8:[]});

       const time=new Date()

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



  const [developer,setdeveloper]=useState({name:"",country_code1:[''],mobile_no1:[''],mobile_type1:[''],action11:[],email1:[''],email_type1:[''],
    action22:[],company_type:"",industry:"",descriptions:"",gst_no:"",
    source:"",team:"",owner:"",visible_to:"",area:"",location:"",city:"",pin_code:"",state:"",country:"",website:"",company_social_media1:[''],
    company_url1:[''],action33:[],employee:[]});
  
const [show7, setshow7] = useState(false);
    
const handleClose7 = () => setshow7(false);
const[data1,setdata1]=useState([])
const handleShow7=async()=>
{
  
    try {
      const resp=await api.get(`viewcompanybyid/${lead._id}`)//here search contact by id
      setshow7(true);
     
      setdeveloper(resp.data.developer)
    } catch (error) {
      console.log(error);
    }
  
 
}


const basicdetails1=()=>
  {
    document.getElementById("basicdetails1").style.display="flex"
 
    document.getElementById("basic").style.color="green"
    document.getElementById("other").style.color="black"
     document.getElementById("professional").style.color="black"
    document.getElementById("otherdetails").style.display="none"
    document.getElementById("profession").style.display="none"
  }
  const professionaldetails1=()=>
    {
      document.getElementById("basicdetails1").style.display="none"
     
      document.getElementById("otherdetails").style.display="none"
      document.getElementById("profession").style.display="flex"
       document.getElementById("basic").style.color="black"
       document.getElementById("other").style.color="black"
         document.getElementById("professional").style.color="green"
       
    }
  const otherdetails1=()=>
    {
      document.getElementById("basicdetails1").style.display="none"
    
       document.getElementById("profession").style.display="none"
         document.getElementById("otherdetails").style.display="flex"
       document.getElementById("basic").style.color="black"
        document.getElementById("professional").style.color="black"
       document.getElementById("other").style.color="green"
    }



    function addFn11() {
        
      setdeveloper({
        ...developer,
        country_code1: [...(developer.country_code1 || []), ''],
        mobile_no1: [...(developer.mobile_no1 || []), ''],
        mobile_type1: [...(developer.mobile_type1 || []), ''],
        action11: [...(developer.action11 || []), '']
      });
    };

    const deleteall11=(index)=>
      {
       
        const newcountry_code = developer.country_code1.filter((_, i) => i !== index);
        const newmobile_no = developer.mobile_no1.filter((_, i) => i !== index);
        const newmobile_type = developer.mobile_type1.filter((_, i) => i !== index);
        const newaction1 = developer.action11.filter((_, i) => i !== index);
        
        setdeveloper({
          ...developer,
          country_code1: newcountry_code,
          mobile_no1: newmobile_no,
          mobile_type1: newmobile_type,
          action11: newaction1
        });
      }
      const handlecountry_codechange1 = (index, event) => {
        const newcountry_code1 = [...developer.country_code1];
        newcountry_code1[index] = event.target.value;
        setdeveloper({
          ...developer,
          country_code1: newcountry_code1
        });
      };
      const handlemobile_nochange1 = (index, event) => {
        const newmobile_no = [...developer.mobile_no1];
        newmobile_no[index] = event.target.value;
        setdeveloper({
          ...developer,
          mobile_no1: newmobile_no
        });
      };
      const handlemobile_typechange1 = (index, event) => {
        const newmobile_type = [...developer.mobile_type1];
        newmobile_type[index] = event.target.value;
        setdeveloper({
          ...developer,
          mobile_type1: newmobile_type
        });
      };

      function addFn22() {
        setdeveloper({
          ...developer,
          // Ensure these properties are arrays before spreading
          email1: [...(developer.email1 || []), ''],
          email_type1: [...(developer.email_type1 || []), ''],
          action22: [...(developer.action22 || []), ''],
        });
      }
      

      const deleteall22=(index)=>
        {
         
          const newemail = developer.email1.filter((_, i) => i !== index);
          const newemail_type = developer.email_type1.filter((_, i) => i !== index);
          const newaction2 = developer.action22.filter((_, i) => i !== index);
          
          setdeveloper({
            ...developer,
            email1: newemail,
            email_type1: newemail_type,
            action22: newaction2
          });
        }
        const handleemailchange1 = (index, event) => {
          const newemail = [...developer.email1];
          newemail[index] = event.target.value;
          setdeveloper({
            ...developer,
            email1: newemail
          });
        };
        const handleemail_typechange1 = (index, event) => {
          const newemail_type = [...developer.email_type1];
          newemail_type[index] = event.target.value;
          setdeveloper({
            ...developer,
            email_type1: newemail_type
          });
        };
      function addFn33() {

        setdeveloper({
          ...developer,
          company_social_media1: [...(developer.company_social_media1 || []), ''],
          company_url1: [...(developer.company_url1 || []), ''],
          action33: [...(developer.action33 || []), '']
        });
      };
      const deleteall33=(index)=>
        {
         
          const newcomapnysocialmedia = developer.company_social_media1.filter((_, i) => i !== index);
          const newcompanyurl = developer.company_url1.filter((_, i) => i !== index);
          const newaction3=developer.action33.filter((_,i) => i !== index);
          
          setdeveloper({
            ...developer,
            company_social_media1: newcomapnysocialmedia,
            company_url1: newcompanyurl,
            action33:newaction3
          });
        }
        const handlecompanysocialmediachange1 = (index, event) => {
          const newcomapnysocialmedia = [...developer.company_social_media1];
          newcomapnysocialmedia[index] = event.target.value;
          setdeveloper({
            ...developer,
            company_social_media1: newcomapnysocialmedia
          });
        };
        const handlecompanyurlchange1 = (index, event) => {
          const newcompanyurl = [...developer.company_url1];
          newcompanyurl[index] = event.target.value;
          setdeveloper({
            ...developer,
            company_url1: newcompanyurl
          });
        };


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


             const[totalcontact,settotalcontact]=useState()
            const[data,setdata]=useState([]);
            const[searchdata,setsearchdata]=useState()
            const fetchdatabyemail_mobile_tags_company=async(e)=>
              {
                // e.preventDefault()
                try {
                  const resp=await api.get(`viewcontactbyemail/${searchdata}`);
                    const incoming=(Array.isArray(resp.data.contact) ? resp.data.contact : [resp.data.contact]);
                    // setdata(incoming)

                  const resp1=await api.get(`viewcontactbymobile/${searchdata}`);
                  const incoming1=(Array.isArray(resp1.data.contact) ? resp1.data.contact : [resp1.data.contact]);
                  setdata([...incoming,...incoming1])

                  const resp2=await api.get(`viewcontactbytags/${searchdata}`);
                  const incoming2=(Array.isArray(resp2.data.contact) ? resp2.data.contact : [resp2.data.contact]);
                  setdata([...incoming,...incoming1,...incoming2])
                  
                  const resp3=await api.get(`viewcontactbycompany/${searchdata}`);
                  const incoming3=(Array.isArray(resp3.data.contact) ? resp3.data.contact : [resp3.data.contact]);
                  setdata([...incoming,...incoming1,...incoming2,...incoming3])

                  const resp4=await api.get(`viewcontactbyname/${searchdata}`);
                  const incoming4=(Array.isArray(resp4.data.contact) ? resp4.data.contact : [resp4.data.contact]);
                  setdata([...incoming,...incoming1,...incoming2,...incoming3,...incoming4])

                } catch (error) {
                  console.log(error);
                }
              }
              const handlekeypress1=(event)=>
              {
                  if(event.key==="Enter")
                      {
                        fetchdatabyemail_mobile_tags_company()
                          setsearchdata('')
                      }
                  
              }

  
  const updatecompany=async()=>
    {
      try {
    
        const resp=await api.put(`updatecompany/${lead._id}`,developer)
        toast.success("company updated",{ autoClose: 2000 })
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
    






// =========================edit company end===================================================================================




// ===================================add document start=================================================================================




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
}
};


// =======================================================add document end==============================================================

const completionPercentage = 20; // Set default value here

  return (
    <div style={{overflowX:"hidden"}}>

      <Header1/>
      <Sidebar1/>

  

       <div style={{marginTop:"60px",backgroundColor:"white",height:"80px",paddingLeft:"80px"}}>
        <div  style={{padding:"10px",borderRadius:"10px"}} >
          <h6>Company</h6>
          <h3 style={{fontWeight:"normal",color:"blue",fontFamily:"times-new-roman"}}>{lead.name} <span style={{fontSize:"14px",marginLeft:"10px",color:"black"}}>
          <a class=" dropdown"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-three-dots-vertical" style={{fontSize:"24px",cursor:"pointer"}}></i>
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{cursor:"pointer",lineHeight:"25px",paddingLeft:"10px",fontFamily:"arial",fontSize:"14px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"}}>
              <li><img src='https://png.pngtree.com/png-clipart/20230502/original/pngtree-vision-line-icon-png-image_9133793.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Preview</li>
              <li><img src={publish} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Publish</li>
              <li><img src={createbooking} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Create Booking</li>
              <li><img src={matchedlead} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Matched Lead</li>
              <li><img src={transferuser} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Transfer User
              <span style={{content: '""',position: "absolute",bottom: "50px",left: "10px",right: "10px",height: "1px",backgroundColor: "black"}}></span>
              </li>
              <li><img src='https://icons.veryicon.com/png/o/miscellaneous/iconfonts/edit-423.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Edit</li>
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
                            {/* <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbar
                            value={completionPercentage}
                            text={`${completionPercentage}%`}
                            styles={buildStyles({
                              pathColor: "#B85042",
                              textColor: "#B85042",
                              trailColor: "#f0f0f0",
                              strokeLinecap: "round",
                              textSize: "18px",
                            })}
                          />
                        </div>
                      </div> */}
                      <div className='col-md-3'></div>
                <div className='col-md-5'><label style={{color:"#B85042"}}>Status</label>
                <select className="form-control form-control-sm" style={{color:"red"}}>
                    <option >{lead?.stage || '---Select---'}</option>
                        {/* <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option> */}
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
                        style={{ height: '25px', marginRight: '4px' }}
                      />
                  {lead.mobile_no1}</InputLabel>
                  <Select
                    labelId="mobile-label"
                    id="mobile-select"
                    value={lead.mobile_no1}  // Always keep the mobile number as the value
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
                    Copy {lead.mobile_no1}
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
                
                <div className='col-md-12'><hr></hr></div>

            

                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12' style={{color:"blue",fontWeight:"normal"}}>Location Details</div>
                    <div className='col-md-12'><hr></hr></div>
                   

                 
                <div className='col-md-3'><label style={{color:"#B85042"}}>Area/Location</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.area}</p></div>
                <div className='col-md-2' ><label style={{color:"#B85042"}}>City</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.city}</p></div>
                <div className='col-md-2'><label style={{color:"#B85042"}}>State</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.state}</p></div>
                <div className='col-md-2' ><label style={{color:"#B85042"}}>Zip</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.pin_code}</p></div>

                
             


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
                    <p style={{fontSize:"14px"}}><u>{lead.title} {lead.first_name} {lead.last_name}</u> added by {lead.owner}</p>
                </div>

            </div>

        </div>




        <div className='col-md-3' style={{padding:"10px",display:isSmall?"none":"block"}}>

        <div className='row'>

        <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>

        <div className='col-md-12'> Documents
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

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible3 ? "200px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '200px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
    <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
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
      </thead>
      <tbody>
        {
        
        documents.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px"}}>
              {index + 1}
            </StyledTableCell>
        <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px"}}>
          {item.name}
        </StyledTableCell>
        <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px"}}>
          {item.number}
        </StyledTableCell>
        <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px"}}>
              {/* Eye button to trigger image preview */}
              <button onClick={() => handlePreviewClick(item.pic)}>
                👁️ {/* You can replace this with an icon */}
              </button>
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

<div className='col-md-12'> History
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
          
              
            <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Update Company</h4><input type='checkbox'  style={{marginLeft:"60%",height:"20px",width:"20px"}} /><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               
         
             <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"30px"}}>
               <div  id='basic' onClick={basicdetails1} style={{cursor:'pointer',fontWeight:"bold",width:"150px"}}><span>Basic Details</span></div>
                <div  id='professional' onClick={professionaldetails1} style={{cursor:'pointer',fontWeight:"bold",width:"150px"}}><span>Address</span></div>
                <div  id='other' onClick={otherdetails1} style={{cursor:'pointer',fontWeight:"bold",width:"150px"}}><span>Employee</span></div> 
               </div>
						   <div style={{marginLeft:"31%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                    <hr></hr>
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
            
                    <div className="col-md-8"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" value={developer.name} onChange={(e)=>setdeveloper({...developer,name:e.target.value})}/></div>
                    <div className='col-md-4'></div>
             
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      developer.country_code1.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange1(index,event)}>
                        <option>{developer.country_code1[index]}</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                       developer.mobile_no1.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          value={developer.mobile_no1[index]}
                          onChange={(event)=>handlemobile_nochange1(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       developer.mobile_type1.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                         onChange={(event)=>handlemobile_typechange1(index,event)}>
                                  <option>{developer.mobile_type1[index]}</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(developer.action11) ?
                       developer.action11.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall11(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn11}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                        developer.email1.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          value={developer.email1[index]}
                          onChange={(event)=>handleemailchange1(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       developer.email_type1.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          onChange={(event)=>handleemail_typechange1(index,event)}>
                                <option>{developer.email_type1[index]}</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(developer.action22) ?
                       developer.action22.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall22(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn22}>+</button></div>
                    
                  <div className="col-md-5"><label className="labels">Company Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,company_type:e.target.value})}>
                                  <option>{developer.company_type}</option>    
                                  <option>Sole Proprietorship</option>
                                  <option>Partnership Firm </option>
                                  <option>Limited Liability Partnership  </option>
                                  <option>Private Limited Companies</option>
                                  <option>Public Limited Companies</option>
                                  <option>One-Person Companies</option>
                                  <option>Section 8 Company</option>
                                  <option>Joint-Venture Company</option>
                                  <option>Government Company</option>
                                  <option>Non-Government Organization (NGO)</option>

                        </select>
                    </div>
                 

                <div className="col-md-6"><label className="labels">Industry</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,industry:e.target.value})}>
                    <option>{developer.industry}</option>
                          <optgroup label='Agriculture'>
                                <option>Farming</option><option>horticulture</option><option>forestry</option>
                                <option>fishing</option><option>Others</option>
                          </optgroup>
                          <optgroup label='Mining'>
                                <option>Extraction of minerals</option><option>oil</option><option>gas</option>
                                <option>other natural resources.</option>
                          </optgroup>
                          <optgroup label='Fishing and Hunting'>
                                <option>Commercial fishing</option><option>aquaculture</option><option>others</option>
                          </optgroup>
                          <optgroup label='Forestry'>
                                <option>Logging</option><option>timber production</option><option>others</option>
                          </optgroup>
                          <optgroup label='Manufacturing'>
                                <option>Production of goods from raw materials (e.g., automotive, 
                                  electronics, textiles, food processing)</option>
                          </optgroup>
                          <optgroup label='Construction'>
                                <option>Building infrastructure</option><option>residential and commercial properties</option><option>roads</option>
                                <option>bridges</option><option>others</option>
                          </optgroup>
                          <optgroup label='Utilities'>
                                <option>Production and distribution of electricity</option><option>water</option><option>gas</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Refining'>
                                <option>Processing raw materials like oil</option><option>metals</option><option>into usable products</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Retail'>
                                <option>Selling goods directly to consumers</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Hospitality'>
                                <option>Hotels</option><option>restaurants</option><option>tourism</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Healthcare'>
                                <option>Hospitals</option><option>clinics</option><option>medical services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education'>
                                <option>Schools</option><option>colleges</option><option>universities</option>
                                <option>training centers</option><option>others</option>
                          </optgroup>
                          <optgroup label='Finance and Insurance'>
                                <option>Banks</option><option>investment firms</option><option>insurance companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Transportation'>
                                <option>Airlines</option><option>railways</option><option>shipping</option>
                                <option>logistics</option><option>others</option>
                          </optgroup>
                          <optgroup label='Telecommunications'>
                                <option>Internet services</option><option>phone companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Entertainment'>
                                <option>Film</option><option>television</option><option>music</option>
                                <option>gaming</option><option>sports</option><option>others</option>
                          </optgroup>
                          <optgroup label='Real Estate'>
                                <option>Property sales</option><option>rentals</option><option>management</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Information Technology'>
                                <option>Software development</option><option>data processing</option><option>IT services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Research and Development'>
                                <option>Innovation</option><option>scientific research</option><option>product development</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Consultancy'>
                                <option>Professional advice in management</option><option>law</option><option>finance</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Media and Communication'>
                                <option>Publishing</option><option>broadcasting</option><option>online media</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Government'>
                                <option>Public administration</option><option>defense</option><option>public services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Non-Profit Organizations'>
                                <option>NGOs</option><option>charities</option><option>foundations</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education (Executive)'>
                                <option>High-level educational services</option><option>executive education</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='High-Level Decision-Making'>
                                <option>Top management roles in large organizations</option><option>think tanks</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Green Industry'>
                                <option>Renewable energy</option><option>environmental services</option><option>sustainability</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Biotechnology'>
                                <option>Genetic engineering</option><option>pharmaceuticals</option><option>life sciences</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Creative Industries'>
                                <option>Advertising</option><option>design</option><option>fashion</option><option>arts</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='E-commerce'>
                                <option>Online</option><option>retail</option><option>digital marketplaces</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Aerospace'>
                                <option>Aircraft manufacturing</option><option>space exploration</option><option>satellite services</option>
                                <option>others</option>
                          </optgroup>
                        </select>
                    </div>

                    
                    
                    <div className="col-md-8"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm' value={developer.descriptions} style={{height:"100px"}} onChange={(e)=>setdeveloper({...developer,descriptions:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">GST Number</label><input type="text" value={developer.gst_no} required="true" className="form-control form-control-sm" placeholder="enter gst no." onChange={(e)=>setdeveloper({...developer,gst_no:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,source:e.target.value})}>
                                    <option>{developer.source}</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,team:e.target.value})}>
                              <option>{developer.team}</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,owner:e.target.value})}>
                            <option>{developer.owner}</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,visible_to:e.target.value})}>
                                <option>{developer.visible_to}</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    </div>
               
       

   {/*------------------------------------------------------------ basic details end---------------------------------------------------- */}
                  
  {/* -----------------------------------------address Details start------------------------------------------------------------------- */}

        <div className="col-md-12" id='profession' style={{display:"none",lineHeight:"30px"}}>
            <div className="p-3 py-5">
               
                <div className="row " >
              
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}> Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">Area</label><input type="text" value={developer.area} className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,area:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" value={developer.location} className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,location:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" value={developer.city} className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" value={developer.pin_code} className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,pin_code:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">State</label><input type="text" value={developer.state} className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,state:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" value={developer.country} className="form-control form-control-sm"  onChange={(e)=>setdeveloper({...developer,country:e.target.value})}/></div>
                    </div>
                    
                    <div className='col-md-5'></div>
                    <div className="col-md-8"><label className="labels">Website</label><input type="text" value={developer.website} className="form-control form-control-sm"  onChange={(e)=>setdeveloper({...developer,website:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-4"><label className="labels">Company Social-Media Page</label>
                    {
                      developer.company_social_media1.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                          onChange={(event)=>handlecompanysocialmediachange1(index,event)}>
                        
                        <option>{developer.company_social_media1[index]}</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option>
                        </select>

                      ))
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Url</label>
                    {
                      developer.company_url1.map((item,index)=>
                      (
                        <input type="text" value={developer.company_url1[index]} className="form-control form-control-sm" style={{marginTop:"10px"}} 
                        onChange={(event)=>handlecompanyurlchange1(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(developer.action33) ?
                      developer.action33.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall33(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn33}>+</button></div>
                    <div className='col-md-12'><hr></hr></div> 
              </div>
            
             </div>
           </div>
 {/* ------------------------------------------------------professional Details end--------------------------------------------------------------  */}

 {/*-------------------------------------------------- employee details start--------------------------------------------------------- */}
 {/* <div className="col-md-12" id='otherdetails' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
               
                <div className="row " >
                <div className="col-md-8"><label className="labels" style={{fontSize:"16px"}}> Search Contact</label><input className='form-control form-control-sm' type='search' placeholder='enter name for search'/></div>
                <div className="col-md-1" ><label className="labels" style={{width:"150px"}}>Quick Add Contact</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}> Employee List</label></div>
                 
             </div>
         </div>
     </div> */}
                        <div className="col-md-12" id="otherdetails" style={{display:"none",  lineHeight:"30px"}}>
                    <div className="p-3 py-5">
                        <div className="row">
                        <div className="col-md-9">
                            <label className="labels" style={{fontSize:"16px"}}>Search Contact</label>
                            <input className="form-control form-control-sm" id='searchcontact' type="search" placeholder="enter email or mobile no for search" onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-1">
                            <label className="labels" style={{fontSize:"16px",width:"150px"}}>Quick Add Contact</label>
                            <button className="form-control form-control-sm" onClick={handleShow1}>+</button>
                        </div>
                        <div className="col-md-10" style={{marginTop:"50px"}}>
                            <label className="labels" style={{fontSize:"16px", marginTop:"10px"}}>Employee List</label>
                        </div>
                        <div className="col-md-2" style={{marginTop:"50px"}}>
                            <label className="labels" style={{fontSize:"16px", marginTop:"10px"}}>Total Employee:</label>
                           <span style={{color:"green",fontWeight:"bold",fontSize:"20px"}}>{totalcontact}</span> 
                        </div>
                        <div className='col-md-12'><hr></hr></div>
                        <div className="row" style={{margin:"5px",padding:"10px"}}>
                        <div style={{marginLeft:"20px",marginTop:"10px",backgroundColor:"white"}}>
          <TableContainer component={Paper} style={{height:"400px",overflowY:"scroll"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
      <tbody>
        {
         
        data.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
             <img src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' alt='' style={{height:"30px"}}/>
             
            </StyledTableCell>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
              {item.title} {item.first_name} {item.last_name}<br></br>
              {item.designation}
            </StyledTableCell>
           
                <StyledTableCell >
                {item.mobile_no.join(',')}<br></br>
                {item.email.join(',')}
                </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>

    <Modal show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Quick Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
                    <div className="col-md-2"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                    <div className="col-md-5"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-5"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
                </div>
                </div>
                <div className="row mt-3" id='basicdetails2'>
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
                        <option value={item} >phone</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                       contact.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                  <option>Select Type</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action1) ?
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          onChange={(event)=>handleemail_typechange(index,event)}>
                                <option>Select Type</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action2) ?
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall2(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                  <div className="col-md-5"><label className="labels">Designation</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,designation:e.target.value})}>
                    <option>Select</option>
                        <option>Developer</option>
                        <option>HR</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,company_name:e.target.value})}>
                    <option>Select</option>
                        <option>TCS</option>
                        <option>Microsoft</option>
                        <option>Others</option>
                        </select>
                    </div>
            </div>
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" >
                Add Contact
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


        
  </TableContainer>
   
      
     </div>
     </div>
 </div>

{/*-------------------------==================== employee details end --------------------==============================================*/}
                
 
    
                   
                   
                </div>
              
            </div>
 
                 
                           
        
   
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatecompany}>
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


<ToastContainer/>
    </div>
  )
}

export default Companysingleview
