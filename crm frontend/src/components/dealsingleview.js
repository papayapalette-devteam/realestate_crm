import React, { act, useEffect,useRef } from 'react'
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/mystyle.css';
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
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { toWords } from 'number-to-words';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import matchedlead from '../icons/matchedlead.jpg'
import publish from '../icons/publish.jpg'
import createbooking from '../icons/createbooking.jpg'
import transferuser from '../icons/transferuser.jpg'

function Dealsingleview() {

const navigate=useNavigate()
  

    const location=useLocation() 
    const lead=location.state || {}

    // console.log(lead);
    
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
  
  
      

      const allColumnslead = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Full Name' },
        { id: 'status', name: 'Status' },
        { id: 'mobile_no', name: 'Contact' },
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
      const allColumnscontact = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Full Name' },
        { id: 'mobile_no', name: 'Contact' },
        { id: 'email', name: 'Email' },
      ];

      const allColumnspreviousowner = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Full Name' },
        { id: 'mobile_no', name: 'Contact' },
        { id: 'email', name: 'Email' },
      ];

      const allColumnsunitdetails = [
        { id: 'sno', name: '#' },
        { id: 'floor', name: 'Floor' },
        { id: 'cluter', name: 'Cluters' },
        { id: 'length', name: 'Length' },
        { id: 'breadth', name: 'Breadth' },
        { id: 'total_area', name: 'Total_Area' }
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

      const [isTableVisible5, setIsTableVisible5] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility5 = () => {
        setIsTableVisible5(prevState => !prevState);
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
      const ownerNames = lead.owner_details.map(owner => 
        `${owner.title} ${owner.first_name} ${owner.last_name}`
      );
  
      const associatedNames = lead.associated_contact.map(contact => 
        `${contact.title} ${contact.first_name} ${contact.last_name}`
      );
  
      // Combine both arrays into one array of full names
      const fullNames = [...ownerNames, ...associatedNames];
    
      const filteredtasks = combinealltask.filter(task => 
        fullNames.some(fullName => task.lead.includes(fullName)) // Check each full name
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
     // Extract full names from owner_details and associated_contact
     const ownerNames = lead.owner_details.map(owner => 
      `${owner.title} ${owner.first_name} ${owner.last_name}`
    );

    const associatedNames = lead.associated_contact.map(contact => 
      `${contact.title} ${contact.first_name} ${contact.last_name}`
    );

    // Combine both arrays into one array of full names
    const fullNames = [...ownerNames, ...associatedNames];
  
    const filteredActivities = resp.data.activity.filter(activity => 
      fullNames.some(fullName => activity.lead.includes(fullName)) // Check each full name
    );
    setallactivity(filteredActivities)
    setfilterdata(filteredActivities)
    console.log(filteredActivities);
    
    
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



// =======================================deal edit start==============================================================================

const[deal,setdeal]=useState({project_category:[],project_subcategory:"",location:"",ulocality:"",ucity:"",
  utype:"",ucategory:[],usize:"",available_for:"",stage:"",project:"",block:"",unit_number:"",floors:"",
  expected_price:"",quote_price:"",security_deposite:"",owner_details:[],associated_contact:[],
maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
deal_type:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
website:"",social_media:"",send_matchedlead:"",matchedleads:[],matchinglead:"",remarks:""})



const [show10, setshow10] = useState(false);
    
const handleClose10 = () => setshow10(false);
const handleShow10=async()=>
{
  setshow10(true);
  try {
    const resp=await api.get(`viewdealbyid/${lead._id}`)
    setdeal(resp.data.deal)
  } catch (error) {
    console.log(error);
    
  }
 
}


const [progress, setProgress] = useState(deal?.white_portion?deal.white_portion : 10); // Initialize with deal.whiteportion

const handleMouseMove = (e) => {
  const progressBar = e.target.getBoundingClientRect();
  const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
  const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
  setProgress(clampedProgress);
  setdeal((prevDeal) => ({ ...prevDeal, white_portion: clampedProgress })); // Update deal.whiteportion
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


function available_for()
{
    const available=document.getElementById("availablefor").value;
    if(available==="Sale")
        {
            document.getElementById("sale").style.display="flex"
            document.getElementById("rent").style.display="none"
            setdeal({...deal,available_for:"Sale"})
        }
        if(available==="Rent")
            {
                document.getElementById("rent").style.display="flex"
                document.getElementById("sale").style.display="none"
                setdeal({...deal,available_for:"Rent"})
            }   
       if(available==="Select") 
        {
             document.getElementById("rent").style.display="none"
                document.getElementById("sale").style.display="none"
        }
        
}


const handleprojectchange = (event) => {
 
  
  const selectproject = event.target.value


  setdeal((prev) => {
    const updateproject = { ...prev, project: selectproject };
    //  fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
    return updateproject; // Return the updated state
  });
};


const handleallunitschange = (event) => {
 
const selectunit = event.target.value

  
  setdeal((prev) => {
    const updateunit = { ...prev, unit_number: selectunit };
    return updateunit; // Return the updated state
  });
};


const handleallblockchange1 = (event) => {
   
  
    const selectblocks = event.target.value
  
     
    setdeal((prev) => {
      const updateblock = { ...prev, block: selectblocks };
      return updateblock; // Return the updated state
    });
  };

  const[projectdata1,setprojectdata1]=useState([]);
        const fetchdata1=async()=>
        {
          
          try {
            const resp=await api.get('viewproject')
            setprojectdata1(resp.data.project)
          } catch (error) {
            console.log(error);
          }
        }



       

  React.useEffect(()=>
  {fetchdata1()},[])




  const allproject =[]
  projectdata1.map((item)=>
  (
      allproject.push(item.name)
  ))
   

  const [units1, setunits1] = useState([]);
  const [allUnits, setallUnits] = useState([]);
  const [allblocks, setallblocks] = useState([]);



  const [numericValue, setNumericValue] = React.useState(null);
  const [measurementUnit, setMeasurementUnit] = React.useState('');

  const fetchdatabyprojectname = async (projectNames) => {

    try {
      
        const resp = await api.get(`viewprojectbyname/${projectNames}`);
        // const allFetchedUnits= resp.data.project;
        setunits1(resp.data.project);// Assuming resp.data.project is an array of units for that project
    } catch (error) {
      console.log(error);
    }
  };
 
  
  

  React.useEffect(() => {
    if (deal.project) {
      fetchdatabyprojectname(deal.project);
    }
  }, [deal.project]);
  
  
  React.useEffect(() => {
    if (units1.length >= 0) {
      const collectedUnits = units1.flatMap(item => 
        item.add_unit.filter(unit => unit.stage === 'Active' && unit.block===deal.block) // Filter units where stage is 'active'
      );
   
    
      

      const collectedblocks=units1.flatMap(item=>item.add_block)
      console.log(collectedblocks);
       
      const collectcategory=units1.flatMap(item=>item.category) 
      const collectsubcategory=units1.flatMap(item=>item.sub_category) // Collect all add_unit arrays
      const fulllocation = units1.flatMap(item => `${item.add_location}, ${item.address} ${item.street} ${item.locality} ${item.city}`).join(' ');
      setallUnits(collectedUnits);
      setallblocks(collectedblocks) 
      setdeal({...deal,project_category:collectcategory,project_subcategory:collectsubcategory,location:fulllocation})// Set allUnits with the collected units


      const collectedsize = collectedUnits.filter((item) => 
        item.block === deal.block && item.unit_no === deal.unit_number // Use strict equality === here
      );

      
      if (collectedsize.length > 0) {
        // Assuming 'size' is the field you're interested in
        const sizeValue = collectedsize[0].size; // Or collectedsize[0].sizeName based on your actual field name
    console.log(sizeValue);
    
    const regex = /\((\d+(\.\d+)?)\s*(\w+\s\w+)\)/;
  const match = sizeValue.match(regex);

  if (match) {
    setNumericValue(parseFloat(match[1]));
    setMeasurementUnit(match[3]);
  }
     
      }
      


    }
  }, [units1,deal.block,deal.unit_number]);



  const handleselectpricetypechang=(e)=>
    {

      const selectedValue = e.target.value;

      if (selectedValue === "absolute") {
          document.getElementById("price1").style.display="none"
        document.getElementById("multiply").style.display="none"
        document.getElementById("totalarea").style.display="none"
        document.getElementById("measurment").style.display="none"
         document.getElementById("priceintext").style.display="none"

        document.getElementById("totalprice").style.display="block"
        document.getElementById("divforprice1").style.display="block"
      } else if (selectedValue === "calculated") {
         document.getElementById("price1").style.display="block"
        document.getElementById("multiply").style.display="block"
        document.getElementById("totalarea").style.display="block"
        document.getElementById("measurment").style.display="block"
         document.getElementById("priceintext").style.display="block"
         
        document.getElementById("totalprice").style.display="none"
        document.getElementById("divforprice1").style.display="none"
      }
      setdeal((prev)=>({
        ...prev,
        calculated_type:e.target.value

      }))
     
    }

    const ehandleselectpricetypechang=(e)=>
      {

        const selectedValue = e.target.value;

        if (selectedValue === "absolute") {
            document.getElementById("price11").style.display="none"
          document.getElementById("multiply1").style.display="none"
          document.getElementById("totalarea1").style.display="none"
          document.getElementById("measurment1").style.display="none"
           document.getElementById("priceintext1").style.display="none"

          document.getElementById("totalprice1").style.display="block"
          document.getElementById("divforprice11").style.display="block"
        } else if (selectedValue === "calculated") {
           document.getElementById("price11").style.display="block"
          document.getElementById("multiply1").style.display="block"
          document.getElementById("totalarea1").style.display="block"
          document.getElementById("measurment1").style.display="block"
           document.getElementById("priceintext1").style.display="block"
           
          document.getElementById("totalprice1").style.display="none"
          document.getElementById("divforprice11").style.display="none"
        }
        setdeal((prev)=>({
          ...prev,
          calculated_type:e.target.value

        }))
       
      }

    const rhandleselectpricetypechang=(e)=>
      {

        const selectedValue1 = e.target.value;

        if (selectedValue1 === "absolute") {
            document.getElementById("rprice1").style.display="none"
          document.getElementById("rmultiply").style.display="none"
          document.getElementById("rtotalarea").style.display="none"
          document.getElementById("rmeasurment").style.display="none"
           document.getElementById("rpriceintext").style.display="none"

          document.getElementById("rtotalprice").style.display="block"
          document.getElementById("rdivforprice1").style.display="block"
        } else if (selectedValue1 === "calculated") {
           document.getElementById("rprice1").style.display="block"
          document.getElementById("rmultiply").style.display="block"
          document.getElementById("rtotalarea").style.display="block"
          document.getElementById("rmeasurment").style.display="block"
           document.getElementById("rpriceintext").style.display="block"
           
          document.getElementById("rtotalprice").style.display="none"
          document.getElementById("rdivforprice1").style.display="none"
        }
        setdeal((prev)=>({
          ...prev,
          calculated_type:e.target.value

        }))
       
      }

      const rhandleselectpricetypechang1=(e)=>
        {

          const selectedValue1 = e.target.value;

          if (selectedValue1 === "absolute") {
              document.getElementById("rprice11").style.display="none"
            document.getElementById("rmultiply1").style.display="none"
            document.getElementById("rtotalarea1").style.display="none"
            document.getElementById("rmeasurment1").style.display="none"
             document.getElementById("rpriceintext1").style.display="none"

            document.getElementById("rtotalprice1").style.display="block"
            document.getElementById("rdivforprice11").style.display="block"
          } else if (selectedValue1 === "calculated") {
             document.getElementById("rprice11").style.display="block"
            document.getElementById("rmultiply1").style.display="block"
            document.getElementById("rtotalarea1").style.display="block"
            document.getElementById("rmeasurment1").style.display="block"
             document.getElementById("rpriceintext1").style.display="block"
             
            document.getElementById("rtotalprice1").style.display="none"
            document.getElementById("rdivforprice11").style.display="none"
          }
          setdeal((prev)=>({
            ...prev,
            calculated_type:e.target.value

          }))
         
        }


        const formatCurrency = (num) => {
          if (num === 0) return "₹0"; // Handle zero case
        
          // Convert number to string
          const numStr = num.toString();
        
          // Split the number into whole and decimal parts
          const [whole, decimal] = numStr.split('.');
        
          // Format the whole part for Indian currency style
          const lastThreeDigits = whole.slice(-3);
          const otherDigits = whole.slice(0, -3);
          const formattedWhole = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits.length > 0 ? "," : "") + lastThreeDigits;
        
          // Combine whole and decimal parts, if any
          return `${formattedWhole}${decimal ? '.' + decimal : ''}`;
        };
        
        const [result0, setResult0] = useState("");
        const [resultText, setResultText] = useState('');
        
        const calculateResult = () => {
          const areaValue = parseFloat(document.getElementById("earea").value) || 0; // Ensure valid number
          const priceValue = parseFloat(document.getElementById("eprice").value) || 0; // Ensure valid number
          const calculatedResult = areaValue * priceValue;
        
          setResult0(calculatedResult);
          setdeal(prevDeal => ({ ...prevDeal, expected_price: calculatedResult }));
        };
        
        React.useEffect(() => {
          // Convert result to text format
          if (result0) {
            const words = toWords(result0, { format: 'en-IN' });
            setResultText(`(${words} only)`);
          } else {
            setResultText('');
          }
        }, [result0]);
        
        const [result1, setResult1] = useState("");
        const [resultText1, setResultText1] = useState('');
        
        const calculateResult1 = () => {
          const areaValue = parseFloat(document.getElementById("qarea").value) || 0; // Ensure valid number
          const priceValue = parseFloat(document.getElementById("qprice").value) || 0; // Ensure valid number
          const calculatedResult = areaValue * priceValue;
        
          setResult1(calculatedResult);
          setdeal(prevDeal => ({ ...prevDeal, quote_price: calculatedResult }));
        };
        
        
        React.useEffect(() => {
          // Convert result to text format
          if (result1) {
            const words = toWords(result1, { format: 'en-IN' });
            setResultText1(`(${words} only)`);
          } else {
            setResultText1('');
          }
        }, [result1]);
        
        
        const [result2, setResult2] = useState("");
        const [resultText2, setResultText2] = useState('');
        
        const calculateResult2 = () => {
          const areaValue = parseFloat(document.getElementById("rearea").value) || 0; // Ensure valid number
          const priceValue = parseFloat(document.getElementById("reprice").value) || 0; // Ensure valid number
          const calculatedResult = areaValue * priceValue;
        
          setResult2(calculatedResult);
          setdeal(prevDeal => ({ ...prevDeal, expected_price: calculatedResult }));
        };
        
        
        React.useEffect(() => {
          // Convert result to text format
          if (result2) {
            const words = toWords(result2, { format: 'en-IN' });
            setResultText2(`(${words} only)`);
          } else {
            setResultText2('');
          }
        }, [result2]);
        
        const [result3, setResult3] = useState("");
        const [resultText3, setResultText3] = useState('');
        
        const calculateResult3 = () => {
          const areaValue = parseFloat(document.getElementById("rqarea1").value) || 0; // Ensure valid number
          const priceValue = parseFloat(document.getElementById("rqprice1").value) || 0; // Ensure valid number
          const calculatedResult = areaValue * priceValue;
        
          setResult3(calculatedResult);
          setdeal(prevDeal => ({ ...prevDeal, quote_price: calculatedResult }));
        };
        
        React.useEffect(() => {
          // Convert result to text format
          if (result3) {
            const words = toWords(result3, { format: 'en-IN' });
            setResultText3(`(${words} only)`);
          } else {
            setResultText3('');
          }
        }, [result3]);


        const updatedeal=async()=>
        {
          try {
            const resp=await api.put(`updatedeal/${lead._id}`,deal)
            if(resp.status===200)
            {
                toast.success(resp.data.message,{ autoClose: 2000 })
            }
            setTimeout(() => {
              window.location.reload()
            }, 2000);
            
          } catch (error) {
            console.log(error);
            
          }
        }

  //================================================== deal edit end==============================================================

// ===================================location details code start==================================================================


        const[unitlocation,setunitlocation]=useState([])
  const getlocationdetails=async()=>
                  {
                    const project=lead.project
                    const block=lead.block
                    const unit=lead.unit_number


                    const resp=await api.get(`viewproject`)
                    const allUnits = resp.data.project.flatMap(project => project.add_unit || []);
                    
                     // Filter the flattened unit list
                      const filteredUnits = allUnits.filter(
                        (item) =>
                          item.project_name === project &&
                          item.unit_no === unit &&
                          item.block === block
                      );
                    setunitlocation(filteredUnits[0])
                  }

          
          
                  
                  useEffect(()=>
                  {
                    getlocationdetails()
                  },[])
 
       
        
               
               
               
                  
//======================================= location details code end=================================================================


// =======================================matchedlead code start=====================================================================


                  const[leaddata,setleaddata]=useState([])
                      const viewlead=async()=>
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
                        viewlead()
                      },[])
                  
                      const[filterlead,setfilterlead]=useState([])
                      
              
                  
                    React.useEffect(() => {
                      if (leaddata.length > 0) {
                       
                          // const price1 = lead.budget_min;
                          // const price2 = lead.budget_max;
                          const expected_price=lead.expected_price
                          const available_for = lead.available_for === 'Sale' ? 'Buy' : lead.available_for;

                          console.log(lead.expected_price);
                          
                    
                          // Filter leads based on the current deal's criteria
                          const filterlead = leaddata.filter(
                            (item) =>
                              
                              item.requirment === available_for &&
                              item.budget_min <= expected_price &&
                              item.budget_max >= expected_price
                         
                              
                          );
                        
                          
                          setfilterlead(filterlead)
                     
                        
                      }
                    }, [leaddata]);




// =====================================matchedlead conde end===============================================================================


// ======================================================show map start=================================================================================

const [show11, setshow11] = useState(false);


const handleClose11 = () => setshow11(false);
const handleShow11=async()=>
{
      setshow11(true);
}


const mapStyles1 = {
  height: "500px",
  width: "100%"
}

const defaultCenter1 = {
  lat: unitlocation?.lattitude ? parseFloat(unitlocation.lattitude) : 37.7749,
  lng: unitlocation?.langitude ? parseFloat(unitlocation.langitude) : -122.4194
};


// ======================================================show map end==================================================================

// ==================================builtup details toggle start================================================================

const [showTable, setShowTable] = useState(false);

const completionPercentage = 20; // Set default value here

//======================================== builtup details toggle end===================================================================


// ======================================unit edit start========================================================================

const [project,setproject]=useState({name:"",developer_name:"",joint_venture:"",secondary_developer:"",rera_number:"",descriptions:"",
  category:[],sub_category:[],land_area:"",measurment1:"",total_block:"",total_floor:"",
  total_units:"",zone:[],status:"",launched_on:"",expected_competion:"",possession:"",parking_type:[],
  approved_bank:"",approvals:[''],registration_no:[''],date:[''],pic:[''],action1:[],owner:[],
  team:[],visible_to:"",

  location:"",lattitude:"",langitude:"",address:"",street:"",locality:"",city:"",zip:"",state:"",country:"",

  add_block:[],add_size:[],add_unit:[],basic_aminities:[],features_aminities:[],nearby_aminities:[],
  price_list:[],Payment_plan:[]});



  const[units,setunits]=useState({unit_no:"",unit_type:"",category:"",block:"",
                                  size:"",land_type:"",khewat_no:[''],killa_no:[''],share:[''],action5:[],
                                  total_land_area:"",
                                  water_source:[''],water_level:[''],water_pump_type:[''],action6:[],
                                  direction:"",side_open:"",fornt_on_road:"",total_owner:"",facing:"",road:"",ownership:"",stage:"",type:"",floor:[''],
                                  cluter_details:[''],length:[''],bredth:[''],total_area:[''],measurment2:['sqfeet'],
                                  action3:[],ocupation_date:"",age_of_construction:"",furnishing_details:"",enter_furnishing_details:"",
                                  furnished_item:"",location:"",lattitude:"",langitude:"",uaddress:"",ustreet:"",
                                  ulocality:"",ucity:"",uzip:"",ustate:"",ucountry:"",owner_details:[],associated_contact:[],
                                  relation:"",s_no:[],preview:[],descriptions:[],category:[],action10:[],s_no1:[],url:[],action11:[],
                                  document_name:[''],document_no:[''],document_Date:[''],linkded_contact:[''],pic:[''],action12:[]})

                                  

const [show9, setshow9] = useState(false);
    
                  const handleClose9 = () => setshow9(false);
                  // const[fetchunit,setfetchunit]=useState([])
                  const handleShow9=async()=>
                  {
                    setshow9(true);
                    const project=unitlocation.project_name
                    const block=unitlocation.block
                    const unit=unitlocation.unit_no

                    const resp=await api.get(`viewprojectforinventories/${project}/${unit}/${block}`)
                    setunits(resp.data.project.add_unit[0])
                    
                    const resp1=await api.get(`viewdealbyid/${lead._id}`)
                    setdeal(resp1.data.deal)
                   
                  }
                // console.log(units.owner_details);
                
                  
          const updateinventories=async()=>
          {
            const project=unitlocation.project_name
            const block=unitlocation.block
            const unit=unitlocation.unit_no
            try {
              const resp2=await api.put(`updateprojectforinventories/${project}/${unit}/${block}`,units)
              const resp3=await api.put(`updatedeal/${lead._id}`,deal)
              toast.success(`Data updated successfully`,{autoClose:"2000"})
                              setTimeout(() => {
                                window.location.reload()
                              }, 2000);
            } catch (error) {
              console.log(error);
              
            }
          }
                  

                              const [input, setInput] = useState('');
                  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
                  const [showSuggestions, setShowSuggestions] = useState(false);
                  const [allSuggestions, setAllSuggestions] = useState([]);
                  const [selectedContacts, setSelectedContacts] = useState([]);
            
                  React.useEffect(() => {
                    const fetchSuggestions = async () => {
                      try {
                        const response = await api.get('viewcontact');
                        const data = response.data.contact;
                        
                        // Extract the first_name field from the fetched data
                        // const names = data.map(item => item.first_name);
                        setAllSuggestions(data);
                      } catch (error) {
                        console.error('Error fetching suggestions:', error);
                      }
                    };
                
                    fetchSuggestions();
                  }, []);
          
                  React.useEffect(() => {
                    if (input) {
                      const results = allSuggestions.filter(contact =>
                        contact.first_name?.toLowerCase().includes(input.toLowerCase())
                      );
                      setFilteredSuggestions(results);
                      setShowSuggestions(true);
                    } else {
                      setShowSuggestions(false)
                    }
                  }, [input,allSuggestions]);
          
                 
                
                  const handleInputChange = (event) => {
                    setInput(event.target.value);
                    handleClose2()
                  };
                  
                  
                  const [show22, setshow22] = useState(false);
                  const handleClose22 = () => setshow22(false);
                  const handleShow22=async()=>
                  {
                    setshow22(true);
                  
                  }
          
                  
                  
                  const [selectedcontact1,setselectedcontact1]=useState([])
                  const [selectedcontact2,setselectedcontact2]=useState([])
                  const[newcontact,setnewcontact]=useState([])
                  
                  const[relation,setrelation]=useState("")
          
                  const handlerelationchange = (e) => {
                    setrelation(e.target.value);
                  };
          
                  const [relation1,setrelation1]=useState("")
                  React.useEffect(() => {
                    
                    
                    if (relation === "Self") {
                      setrelation("")
                      setselectedcontact1(prevContacts => [
                        ...prevContacts,
                        newcontact // Add the new contact (assumed to be an object)
                      ]);
                      setunits(prevDeal => ({
                        ...prevDeal,
                        owner_details: [...(prevDeal.owner_details || []), newcontact._id] // Append new contact to the existing owner_details array
                      }));
                      setdeal(prevDeal => ({
                        ...prevDeal,
                        owner_details: [...(prevDeal.owner_details || []), newcontact._id] // Append new contact to the existing owner_details array
                      }));
                     
                    }
                     else if(relation==="Son" || relation==="Father" || relation==="Mother" || relation==="Other" || relation==="Uncle") {
                      
                      setselectedcontact2(prevContacts => [
                        ...prevContacts,
                        newcontact // Add the new contact for other relations
                      ]);
                      setunits(prevDeal => ({ ...prevDeal, relation: relation }));
                      setunits(prevDeal => ({
                        ...prevDeal,
                        associated_contact: [...(prevDeal.associated_contact || []), newcontact._id] // Append new contact to the existing owner_details array
                      }));
                      setdeal(prevDeal => ({
                        ...prevDeal,
                        associated_contact: [...(prevDeal.associated_contact || []), newcontact._id] // Append new contact to the existing owner_details array
                      }));
                      setrelation1(relation)
                      setrelation("")
                    }
                  }, [relation,newcontact]);
          
          
                 
                  const handleSuggestionClick = (contact) => {
                    handleShow22();
                    
                    setnewcontact(contact)
                    // Update the selectedContacts array
                    const updatedContacts = [...selectedContacts, contact];
                    setSelectedContacts(updatedContacts);
                  
                    setInput(''); // Clear the input after selection
                    setShowSuggestions(false); // Hide suggestions after selection
                    //setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));
                  };
          
                 
                   
                  const removeContact = (id) => {
              
                    const updatedContacts = selectedContacts.filter(contact => contact._id !== id);
                 
                   
                    const updatedContacts3 = units.owner_details.filter(contact => contact._id !== id);
                    const updatedContacts4 = units.associated_contact.filter(contact => contact._id !== id);
          
                    setSelectedContacts(updatedContacts);
          
                    const updatedContacts1 = selectedcontact1.filter(contact => contact._id !== id);
                    setselectedcontact1(updatedContacts1);
                    setunits((prevState) => ({
                      ...prevState,
                      owner_details: updatedContacts3,
                    }));
                    setdeal((prevState) => ({
                      ...prevState,
                      owner_details: updatedContacts3,
                    }));
          
                    const updatedContacts2 = selectedcontact2.filter(contact => contact._id !== id);
                    setselectedcontact2(updatedContacts2)
                    setunits((prevState) => ({
                      ...prevState,
                      associated_contact: updatedContacts4,
                    }));
                    setdeal((prevState) => ({
                      ...prevState,
                      associated_contact: updatedContacts4,
                    }));
          
                  };

// ========================================edit unit end===========================================================================


// =========================================unit location start======================================================================


                const [show12, setshow12] = useState(false);
                const handleClose12 = () => setshow12(false);
                const handleShow12=async()=>
                {
                  setshow12(true);

                  const project=unitlocation.project_name
                  const block=unitlocation.block
                  const unit=unitlocation.unit_no

                  const resp=await api.get(`viewprojectforinventories/${project}/${unit}/${block}`)
                  setunits(resp.data.project.add_unit[0])

                }


                
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
                                            UttarPradesh: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shrawasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
                                            WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"]
                                          };
                                          
                                          
                                          const states = Object.keys(statesAndCities);
                                          const cities = statesAndCities[project.state] || [];
                                          
                                          const ustates = Object.keys(statesAndCities);
                                          const ucities = statesAndCities[units.ustate] || [];
                
                
                                          const [coordinates1, setCoordinates1] = useState('');
                                          const [mapLoaded1, setMapLoaded1] = useState(false);
                                
                                          const handleSubmit1 = async (e) => {
                                            e.preventDefault();
                                            try {
                                              const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                                                params: {
                                                  address: units.location,
                                                  key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc'
                                                }
                                              });
                                          
                                              if (response.data.results.length > 0) {
                                                const { lat, lng } = response.data.results[0].geometry.location;
                                                setCoordinates1({ lat, lng });
                                                setunits(prevUnits => ({
                                                  ...prevUnits,
                                                  lattitude: lat,
                                                  langitude: lng
                                                }));
                                                const addressComponents = response.data.results[0].address_components;
                                                let uaddress = '';
                                                let ustreet = '';
                                                let ulocality = '';
                                                let ucity = '';
                                                let uzip = '';
                                                let ustate = '';
                                                let ucountry = '';
                                          
                                                // Extract address components
                                                addressComponents.forEach(component => {
                                                  const types = component.types;
                                                  if (types.includes('administrative_area_level_3')) uaddress += component.long_name + ' ';
                                                  if (types.includes('sublocality_level_1')) ustreet += component.long_name + ' ';
                                                  if (types.includes('administrative_area_level_2')) ulocality = component.long_name;
                                                  if (types.includes('administrative_area_level_1')) ustate = component.long_name;
                                                  if (types.includes('locality')) ucity = component.long_name;
                                                  if (types.includes('postal_code')) uzip = component.long_name;
                                                  if (types.includes('country')) ucountry = component.long_name;
                                                });
                                          
                                                // Update units state with the extracted information
                                                setunits(prevUnits => ({
                                                  ...prevUnits,
                                                  uaddress,
                                                  ustreet: ustreet.trim(),
                                                  ulocality,
                                                  ucity,
                                                  uzip,
                                                  ustate,
                                                  ucountry,
                                                  location: response.data.results[0].formatted_address
                                                }));
                                                setMapLoaded1(true);
                                              } else {
                                                setCoordinates1({ lat: null, lng: null });
                                                console.log('No results found');
                                              }
                                          
                                            } catch (error) {
                                              console.error('Error fetching coordinates:', error);
                                            }
                                          };
                                          
                                          const handleMarkerDragEnd1 = async (e) => {
                                            const newLat = e.latLng.lat();
                                            const newLng = e.latLng.lng();
                                            setCoordinates1({ lat: newLat, lng: newLng });
                                          
                                            try {
                                              const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                                                params: {
                                                  latlng: `${newLat},${newLng}`,
                                                  key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc'
                                                }
                                              });
                                          
                                              if (response.data.results.length > 0) {
                                                const addressComponents = response.data.results[0].address_components;
                                                let uaddress = '';
                                                let ustreet = '';
                                                let ulocality = '';
                                                let ucity = '';
                                                let uzip = '';
                                                let ustate = '';
                                                let ucountry = '';
                                          
                                                addressComponents.forEach(component => {
                                                  const types = component.types;
                                                  if (types.includes('administrative_area_level_3')) uaddress += component.long_name + ' ';
                                                  if (types.includes('sublocality_level_1')) ustreet += component.long_name + ' ';
                                                  if (types.includes('administrative_area_level_2')) ulocality = component.long_name;
                                                  if (types.includes('administrative_area_level_1')) ustate = component.long_name;
                                                  if (types.includes('locality')) ucity = component.long_name;
                                                  if (types.includes('postal_code')) uzip = component.long_name;
                                                  if (types.includes('country')) ucountry = component.long_name;
                                                });
                                          
                                                setunits(prevUnits => ({
                                                  ...prevUnits,
                                                  uaddress,
                                                  ustreet: ustreet.trim(),
                                                  ulocality,
                                                  ucity,
                                                  uzip,
                                                  ustate,
                                                  ucountry,
                                                  location: response.data.results[0].formatted_address
                                                }));
                                          
                                              } else {
                                                console.log("No location name found");
                                              }
                                            } catch (error) {
                                              console.error("Error fetching location name:", error);
                                            }
                                          };
                        
                                          const defaultCenter2 = {
                                            lat: coordinates1.lat || parseFloat(units.lattitude), lng: coordinates1.lng || parseFloat(units.langitude)
                                          };

// ==============================================unit location end=========================================================


// ===================================unit details edit start=====================================================================

const [show13, setshow13] = useState(false);

const handleClose13 = () => setshow13(false);
const handleShow13=async()=>
{
      setshow13(true);
      const project=unitlocation.project_name
      const block=unitlocation.block
      const unit=unitlocation.unit_no

      const resp=await api.get(`viewprojectforinventories/${project}/${unit}/${block}`)
      setunits(resp.data.project.add_unit[0])
  
}

    const [selectedType, setSelectedType] = useState(null);
                    
                              const handleTypeClick1 = (type) => {
                                setSelectedType(type);
                            setunits((prevunits)=>({
                              ...prevunits,
                              category:type
                            }))
                        };

     const [showabuiltup, setSowbuiltup] = useState(false); // Track the checkbox state
                              
                                                        // Handle the checkbox change to show/hide plot size section
                                                        const handleCheckboxChange4 = (event) => {
                                                          setSowbuiltup(event.target.checked);
                                                        };
    

                        function addFn3() {
     
                          setunits((prevunits)=>({
                            ...prevunits,
                            floor:[...units.floor,''],
                            cluter_details: [...units.cluter_details, ''],
                            length: [...units.length, ''],
                            bredth: [...units.bredth, ''],
                            total_area: [...units.total_area, ''],
                            measurment2: [...units.measurment2, ''],
                            action3: [...(units.action3 || []), ''] 
                          }));
                        };
                        const deleteall3=(index)=>
                          {
                            const newfloor = units.floor.filter((_, i) => i !== index);
                            const newcluter = units.cluter_details.filter((_, i) => i !== index);
                            const newlength = units.length.filter((_, i) => i !== index);
                            const newbreadth = units.bredth.filter((_, i) => i !== index);
                            const newtotalarea = units.total_area.filter((_, i) => i !== index);
                            const newmeasurement = units.measurment2.filter((_, i) => i !== index);
                            const newaction3=units.action3.filter((_,i) => i !== index);
                            
                            setunits({
                              ...units,
                              floor:newfloor,
                              cluter_details: newcluter,
                              length: newlength,
                              bredth: newbreadth,
                              total_area: newtotalarea,
                              measurment2: newmeasurement,
                              action3:newaction3
                            });
                          }
                          const handlefloorchange = (index, event) => {
                            const newfloor = [...units.floor];
                            newfloor[index] = event.target.value;
                            setunits({
                              ...units,
                              floor: newfloor
                            });
                          };
                          const handlecluterdetails = (index, event) => {
                            const newcluterdetails = [...units.cluter_details];
                            newcluterdetails[index] = event.target.value;
                            setunits({
                              ...units,
                              cluter_details: newcluterdetails
                            });
                          };
                          const handlelengthchange = (index, event) => {
                            const newLength = [...units.length];
                            newLength[index] = event.target.value;
                          
                            const newTotalArea = [...units.total_area];
                            newTotalArea[index] = newLength[index] && units.bredth[index] ? newLength[index] * units.bredth[index] : '';
                          
                            setunits((prev) => ({
                              ...prev,
                              length: newLength,
                              total_area: newTotalArea,
                            }));
                          };
                          
                          const handlebredthchange = (index, event) => {
                            const newBreadth = [...units.bredth];
                            newBreadth[index] = event.target.value;
                          
                            const newTotalArea = [...units.total_area];
                            newTotalArea[index] = units.length[index] && newBreadth[index] ? units.length[index] * newBreadth[index] : '';
                          
                            setunits((prev) => ({
                              ...prev,
                              bredth: newBreadth,
                              total_area: newTotalArea,
                            }));
                          };
                          





                        const handleSuggestionClick1 = (contact, index) => {
                          setShowSuggestions(false); 
                          const fullContact = `${contact.title} ${contact.first_name} ${contact.last_name}`;
                          setunits((prevUnits) => {
                            const updatedLinkedContacts = [...prevUnits.linkded_contact];
                            updatedLinkedContacts[index] = fullContact; // Update the specific contact at the index
                            return {
                              ...prevUnits,
                              linkded_contact: updatedLinkedContacts,
                            };
                          });
                          
                        }

                        
                  function addFn6() {
   
                    setunits({
                      ...units,
                      water_source:[...units.water_source,''],
                      water_level: [...units.water_level, ''],
                      water_pump_type: [...units.water_pump_type, ''],
                      action6: [...units.action6, '']
                    });
                  };
                  const deleteall6=(index)=>
                    {
                      const newwatersource = units.water_source.filter((_, i) => i !== index);
                      const newwaterlevel = units.water_level.filter((_, i) => i !== index);
                      const newpumptype = units.water_pump_type.filter((_, i) => i !== index);
                      const newaction6=units.action6.filter((_,i) => i !== index);
                      
                      setunits({
                        ...units,
                        water_source:newwatersource,
                        water_level: newwaterlevel,
                        water_pump_type: newpumptype,
                        action6:newaction6
                      });
                    }
                    const handlewatersourcechange = (index, event) => {
                      const newwatersource = [...units.water_source];
                      newwatersource[index] = event.target.value;
                      setunits({
                        ...units,
                        water_source: newwatersource
                      });
                    };
                    const handlewaterlevelchange = (index, event) => {
                      const newwaterlevel = [...units.water_level];
                      newwaterlevel[index] = event.target.value;
                      setunits({
                        ...units,
                        water_level: newwaterlevel
                      });
                    };
                    const handlewaterpumpchange = (index, event) => {
                      const newwaterpump = [...units.water_pump_type];
                      newwaterpump[index] = event.target.value;
                      setunits({
                        ...units,
                        water_pump_type: newwaterpump
                      });
                    };


                    
                function addFn5() {
   
                  setunits({
                    ...units,
                    khewat_no:[...units.khewat_no,''],
                    killa_no: [...units.killa_no, ''],
                    share: [...units.share, ''],
                    action5: [...units.action5, '']
                  });
                };
                const deleteall5=(index)=>
                  {
                    const newkhewatno = units.khewat_no.filter((_, i) => i !== index);
                    const newkillano = units.killa_no.filter((_, i) => i !== index);
                    const newshare = units.share.filter((_, i) => i !== index);
                    const newaction5=units.action5.filter((_,i) => i !== index);
                    
                    setunits({
                      ...units,
                      khewat_no:newkhewatno,
                      killa_no: newkillano,
                      share: newshare,
                      action5:newaction5
                    });
                  }
                  const handlekhewatnochange = (index, event) => {
                    const newkhewatno = [...units.khewat_no];
                    newkhewatno[index] = event.target.value;
                    setunits({
                      ...units,
                      khewat_no: newkhewatno
                    });
                  };
                  const handlekillanochange = (index, event) => {
                    const newkillano = [...units.killa_no];
                    newkillano[index] = event.target.value;
                    setunits({
                      ...units,
                      killa_no: newkillano
                    });
                  };
                  const handlesharenochange = (index, event) => {
                    const newshare = [...units.share];
                    newshare[index] = event.target.value;
                    setunits({
                      ...units,
                      share: newshare
                    });
                  };

                  const updateinventoriesunit=async()=>
                    {
                      const project=unitlocation.project_name
                      const block=unitlocation.block
                      const unit=unitlocation.unit_no
                      try {
                        const resp2=await api.put(`updateprojectforinventories/${project}/${unit}/${block}`,units)
                        toast.success(`Data updated successfully`,{autoClose:"2000"})
                                        setTimeout(() => {
                                          window.location.reload()
                                        }, 2000);
                      } catch (error) {
                        console.log(error);
                        
                      }
                    }
                                

//======================================================= unit details edit end====================================================


// =============================================delete deal start====================================================================

      const deletedeal = async () => {
          try {
           
              const resp=await api.delete(`removedeal/${lead._id}`);
            toast.success('Deal deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              navigate('/dealdetails')
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };


//============================================================ delete deal end====================================================

  return (
    <div style={{overflowX:"hidden"}}>

      <Header1/>
      <Sidebar1/>

  

       <div style={{marginTop:"60px",backgroundColor:"white",height:"80px",paddingLeft:"80px"}}>
        <div  style={{padding:"10px",borderRadius:"10px"}} >
          <h6>Deal</h6>
          <h3 style={{fontWeight:"normal",color:"blue",fontFamily:"times-new-roman"}}>{lead.unit_number} <span style={{fontSize:"18px",marginLeft:"10px",color:"black"}}> {lead.project}<span style={{fontSize:"14px"}}>({lead.block})</span>
         
            <a class=" dropdown"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-three-dots-vertical" style={{fontSize:"24px",cursor:"pointer"}}></i>
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{cursor:"pointer",lineHeight:"30px",padding:"10px",fontFamily:"arial",fontSize:"14px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"}}>
              <li><img src='https://png.pngtree.com/png-clipart/20230502/original/pngtree-vision-line-icon-png-image_9133793.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Preview</li>
              <li><img src={publish} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Publish</li>
              <li><img src={createbooking} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Create Booking</li>
              <li><img src={matchedlead} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Matched Lead</li>
              <li><img src={transferuser} style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Transfer User
              <span style={{content: '""',position: "absolute",bottom: "60px",left: "10px",right: "10px",height: "1px",backgroundColor: "black"}}></span>
              </li>
              <li onClick={handleShow10} style={{borderBottom:"1px solid black",borderRadius:"5px"}}><img src='https://icons.veryicon.com/png/o/miscellaneous/iconfonts/edit-423.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Edit</li>
              <li onClick={deletedeal}><img src='https://static-00.iconduck.com/assets.00/delete-icon-932x1024-nylj0i2z.png' style={{height:"20px",paddingRight:"10px",paddingTop:"5px"}}></img>Delete</li>
            </ul>

         
          <button style={{width:"50px",height:"30px",borderColor:"blue",borderRadius:"5px",fontSize:"14px",  position: "absolute",  right: "10px",backgroundColor:"white"}} onClick={handleToggle}>{buttonText}</button>
     
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
                      </div>
                <div className='col-md-5'><label style={{color:"#B85042"}}>Status</label>
                <select className="form-control form-control-sm" >
                    <option >{lead?.stage || '---Select---'}</option>
                    <option>---Select---</option>
                        <option>Open</option>
                        <option>Quote</option>
                        <option>Negotiation </option>
                        <option>Booked </option>
                        <optgroup label="Closed">
                          <option>Won</option><option>Lost</option><option>Reject</option>
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
                        style={{ height: '25px', marginRight: '4px' }}
                      />
                   {lead.owner_details?.[0]?.mobile_no?.[0] || "N/A"}</InputLabel>
                  <Select
                    labelId="mobile-label"
                    id="mobile-select"
                    value= {lead.owner_details?.[0]?.mobile_no?.[0] || "N/A"}  // Always keep the mobile number as the value
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
            
                    <div className='col-md-3'></div>
                <div className='col-md-3' style={{marginTop:"10px"}}><label style={{color:"#B85042"}}>Tag</label><p style={{fontWeight:"normal"}}>{lead.available_for}</p></div>

                <div className='col-md-4' style={{marginTop:"30px"}}><label style={{color:"#B85042"}}>Available For</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.available_for}</p></div>
                <div className='col-md-4' style={{marginTop:"30px"}}><label style={{color:"#B85042"}}>Expected Price</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.expected_price}</p></div>
                <div className='col-md-4' style={{marginTop:"30px"}}><label style={{color:"#B85042"}}>Quote Price</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.quote_price}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Deal Type</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.deal_type}</p>
                </div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Transaction Type</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.transaction_type}</p></div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Source</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.campegin} {lead.source}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>User</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.user}</p>
                </div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Team</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.team}</p></div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Time Zone</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>Asia/Kolkata</p></div>

               

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Recived On</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{new Date(lead.createdAt).toLocaleString()}</p>
                </div>
                <div className='col-md-8' ><label style={{color:"#B85042"}}>Last Conduct Date/Time</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{new Date(lead.createdAt).toLocaleString()}</p>
                </div>
                
                
                <div className='col-md-12'><hr></hr></div>

                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12' style={{color:"blue",fontWeight:"normal"}}>Unit Details
                    <Tooltip title="Update Unit..." arrow>
                                  <img src='https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png' onClick={handleShow13} style={{height:"30px",marginLeft:"5px",cursor:"pointer",marginTop:"-5px"}} ></img>
                                </Tooltip>
                    </div>
                    <div className='col-md-12'><hr></hr></div>
                   
                    <div className='col-md-4' ><label style={{color:"#B85042"}}>Road</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{unitlocation?.road}</p></div>
                    <div className='col-md-4' ><label style={{color:"#B85042"}}>Direction</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{unitlocation?.direction}</p></div>
                    <div className='col-md-4' ><label style={{color:"#B85042"}}>Facing</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{unitlocation?.facing}</p></div>
                  
                  <div className='col-md-12'><input type='checkbox' onChange={(e) => setShowTable(e.target.checked)}></input>Show Builtup Details</div>
                   {
                showTable && (
                       <TableContainer component={Paper} style={{ height: '200px' }}>
    <Table sx={{}} aria-label="customized table">
    <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow  style={{backgroundColor:"gray"}}>
          {allColumnsunitdetails.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px", whiteSpace: "nowrap",lineHeight:"2px"}}>
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {
         
        unitlocation?.floor?.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px" }}>
              {index + 1}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
              {item}
            </StyledTableCell >
            <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
           {unitlocation.cluter_details[index]}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
            {unitlocation.length[index]}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
            {unitlocation.bredth[index]}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
            {unitlocation.total_area[index]} {unitlocation.measurment2[0]}
            </StyledTableCell>
                </StyledTableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
                )
            }
                </div>


                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-10' style={{color:"blue",fontWeight:"normal"}}>Location Details
                    <Tooltip title="Update location..." arrow>
                                  <img src='https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png' onClick={handleShow12} style={{height:"30px",marginLeft:"5px",cursor:"pointer",marginTop:"-5px"}} ></img>
                                </Tooltip>
                    </div>
               
                  <div className='col-md-2'>
                  <Tooltip title="View on map..." arrow>
                      <img src='https://png.pngtree.com/png-clipart/20220429/original/pngtree-pin-location-icon-with-folded-map-png-image_7581594.png' style={{height:"30px",cursor:"pointer",marginTop:"-5px"}} onClick={handleShow11}></img>
                      </Tooltip>
                  </div>

                    <div className='col-md-12'><hr></hr></div>
                   
                    <div className='col-md-12'><label style={{color:"#B85042"}}>Location</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{unitlocation?.location}</p></div>

                    <div className='col-md-4'><label style={{color:"#B85042"}}>Lattitude</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.lattitude}</p></div>
                    <div className='col-md-4'><label style={{color:"#B85042"}}>Langitude</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.langitude}</p></div>
                    <div className='col-md-4'></div>

                    <div className='col-md-6'><label style={{color:"#B85042"}}>Address</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.uaddress}</p></div>
                    <div className='col-md-6'><label style={{color:"#B85042"}}>Street</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.ustreet}</p></div>
             
                    <div className='col-md-6'><label style={{color:"#B85042"}}>Locality</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.ulocality}</p></div>
                    <div className='col-md-6'><label style={{color:"#B85042"}}>City</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.ucity}</p></div>
              
                    <div className='col-md-4'><label style={{color:"#B85042"}}>State</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.ustate}</p></div>
                    <div className='col-md-4'><label style={{color:"#B85042"}}>Country</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.ucountry}</p></div>
                    <div className='col-md-4'><label style={{color:"#B85042"}}>Zip</label><p style={{marginTop:"-10px",fontWeight:"normal",fontSize:"12px"}}>{unitlocation?.uzip}</p></div>
                   
                </div>
 
            

                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-9' style={{color:"blue",fontWeight:"normal"}}>Owner Details
                    <Tooltip title="Update Owner details..." arrow>
                                  <img src='https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png' style={{height:"30px",marginLeft:"5px",marginTop:"-5px",cursor:"pointer"}} ></img>
                                </Tooltip>
                              
                    </div>
                    {/* <div className='col-md-3'>  <Tooltip title="Change Owner..." arrow>
                                  <img src='https://static.vecteezy.com/system/resources/thumbnails/020/589/549/small/icon-with-simple-left-arrow-and-right-arrow-vector.jpg' onClick={handleShow9} style={{height:"40px",right:"5px",cursor:"pointer",marginTop:"-5px"}} ></img>
                                </Tooltip></div>  */}
                    <div className='col-md-12'><hr></hr></div>
                   

                 {
                  lead.owner_details?.map((item)=>
                  (
                    <>
                    <div className='col-md-12'><label style={{color:"#B85042"}}>Full Name</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{item.title} {item.first_name} {item.last_name}</p></div>

                    <div className='col-md-5'><label style={{color:"#B85042"}}>Contact</label>
                    <p style={{ marginTop: "-10px", fontWeight: "normal" }}>
                        {item.mobile_no.map((contact, index) => (
                         
                          <span key={index} style={{fontSize:"12px"}}>  <SvgIcon component={PhoneIphoneIcon} sx={{ fontSize: 14}} />{contact}<br></br></span> 
                        ))}
                       
                      </p>
                    </div>
                    <div className='col-md-7'><label style={{color:"#B85042"}}>Email</label>
                    <p style={{ marginTop: "-10px", fontWeight: "normal" }}>
                        {item.email.map((email, index) => (
                         
                          <span key={index} style={{fontSize:"12px"}}>  <SvgIcon component={EmailIcon}  sx={{ fontSize: 14}}/>{email}<br></br></span> 
                        ))}
                       
                      </p>
                      </div>

                      <div className='col-md-12'><label style={{color:"#B85042"}}>Address</label>
                    <p style={{ marginTop: "-10px", fontWeight: "normal",fontSize:"12px" }}>
                     {item.location1},
                     {item.area1},{item.city1}<br></br>
                     {item.state1},{item.pincode1}
                      </p>
                      </div>

                   
                  
                    </>
                  ))
                  
                 }
              

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
                              <img src='https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg' style={{height:"20px"}}></img>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span >{new Date(item.createdAt).toLocaleString()}</span>
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
                              <img src='https://illustoon.com/photo/2751.png' style={{height:"20px"}}></img>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                              <span>{new Date(item.createdAt).toLocaleString()}</span>
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
                            <span style={{fontSize:"10px"}}>you sent an email to {lead.title} {lead.first_name} {lead.last_name}</span>
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
                              <img src="https://static.vecteezy.com/system/resources/previews/001/505/060/non_2x/notes-icon-free-vector.jpg" style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
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
                            <span><u>{lead.owner}</u> left a note</span><br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.activity_note1 }} />
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) : item.activity_name==="complete call task"?(
                            <div id='completecallaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/two-way-communication-3d-icon-download-in-png-blend-fbx-gltf-file-formats--chat-chatting-people-join-call-center-pack-icons-8400040.png" style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                       
                          ) : item.activity_name==="complete mail task"?(
                            <div id='completemailaction' >
                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.flaticon.com/512/4697/4697867.png" style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://cdn-icons-png.flaticon.com/512/1081/1081530.png" style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://cdn-icons-png.freepik.com/512/8094/8094388.png" style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://www.freeiconspng.com/uploads/document-edit-icon-19.png" style={{height:"20px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://www.shutterstock.com/image-vector/call-planner-icon-time-management-260nw-1414111730.jpg" style={{height:"40px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                       
                          ) : item.activity_name==="create mail task"?(
                            <div id='createmailtaskaction' >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.freepik.com/256/16294/16294372.png?semt=ais_hybrid" style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://t4.ftcdn.net/jpg/03/67/61/45/360_F_367614596_kyv8YYMpghwJ6pR6NHp7oyIN1IVnfHvF.jpg" style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://cdn-icons-png.freepik.com/256/13156/13156025.png?semt=ais_hybrid" style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://cdn-icons-png.flaticon.com/512/2132/2132939.png" style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                              <img src="https://icons.veryicon.com/png/o/miscellaneous/seiko-cloud-map-standard-library/add-inventory.png" style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                       
                          ) : item.activity_name==="added docuemnt"?(
                            <div id='createsitevisittaskction' >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <img src="https://cdn-icons-png.flaticon.com/512/9425/9425017.png" style={{height:"30px"}}></img>
                            
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          <span  style={{marginLeft:"0%",display:"inline-block"}}>
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
                    <p style={{fontSize:"14px"}}><u>{lead.title} {lead.first_name} {lead.last_name}</u> added by {lead.owner}</p>
                </div>

            </div>

        </div>




        <div className='col-md-3' style={{padding:"10px",display:isSmall?"none":"block"}}>

        <div className='row'>

        <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>
  <div className='col-md-12'><img src={matchedlead} style={{height:"25px",paddingRight:"10px"}}></img> Matched Lead (<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{lead.matchedleads?.length}</span>)
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

        <div style={{backgroundColor:"white",width:"100%",overflow:"auto",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"0px",height: isTableVisible ? "300px" : "0",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ height: '300px' }}>
    <Table sx={{}} aria-label="customized table">
    {/* <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow  style={{backgroundColor:"gray"}}>
          {allColumnslead.map((col) => (
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
         
         lead.matchedleads.map ((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
         
            <StyledTableCell style={{fontSize:"12px",whiteSpace:"wrap",cursor:"pointer"}} onClick={()=>navigate('/leadsingleview',{state:item})}>
              <span style={{fontSize:"14px",color:"#0086b3",fontWeight:"bold"}}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTOqj4skHnCbXKGTKqt5ZRudGOYolS4W8Bg&s' style={{height:"20px",paddingRight:"5px"}}></img>
                {item.title} {item.first_name} {item.last_name}</span><br></br>
                 <div style={{whiteSpace:"wrap",marginLeft:"38px"}}>{item.company_name}</div>
                <div style={{paddingLeft:"38px",color:"#0086b3",marginTop:"2px"}}>
                {item.mobile_no.map((contact, index) => (
                         <span key={index} style={{fontSize:"10px",border:"1px solid blue",borderRadius:"5px",padding:"5px",marginLeft:"2px"}}>
                          <img src='https://harrogatebusinesscentre.com/wp-content/uploads/156-1568270_blue-phone-icon-png-clipart-png-download-transparent.png' style={{height:"15px"}}></img>{contact}</span>
                      ))} <span>mobile</span> <br></br><br></br>
                       {item.email.map((contact, index) => (
                         <span key={index} style={{fontSize:"10px",border:"1px solid blue",borderRadius:"5px",padding:"5px",marginTop:"20px",whiteSpace:"nowrap"}}>
                          <img src='https://cdn2.iconfinder.com/data/icons/basic-thin-line-color/21/19-512.png' style={{height:"15px",marginTop:"2px"}}></img>{contact}<br></br></span> 
                      ))}
                      </div>
            </StyledTableCell >
      
            <StyledTableCell style={{fontSize:"14px",paddingLeft: "10px" }}>
              <span style={{fontWeight:"bold"}}>{item.stage}</span><br></br>
              {item.owner.map((contact, index) => (
                         <span>{contact}<br></br></span>
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
  <div className='col-md-12'><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/associate-2977574-2472890.png" style={{height:"25px",paddingRight:"10px"}}/> Associated Contact (<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{lead.associated_contact.length}</span>)
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
            marginTop: "4px", // Align the arrow properly
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

        <div style={{backgroundColor:"white",width:"100%",overflow:"auto",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"0px",height: isTableVisible1 ? "200px" : "0",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ height: '200px' }}>
    <Table sx={{}} aria-label="customized table">
    {/* <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow  style={{backgroundColor:"gray"}}>
          {allColumnscontact.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px", whiteSpace: "nowrap",lineHeight:"5px"}}>
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </thead> */}
      <tbody>
        {
         
        lead.associated_contact?.map ((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
          
          <StyledTableCell style={{fontSize:"12px",whiteSpace:"nowrap",cursor:"pointer"}} onClick={()=>navigate('/contactsingleview',{state:item})}>
              <span style={{fontSize:"16px",color:"#0086b3",fontWeight:"bold"}}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTOqj4skHnCbXKGTKqt5ZRudGOYolS4W8Bg&s' style={{height:"20px",paddingRight:"10px"}}></img>
                {item.title} {item.first_name} {item.last_name}</span> <span style={{whiteSpace:"wrap"}}>{item.company_name}</span><br></br>
                <div style={{paddingLeft:"38px",color:"#0086b3",marginTop:"2px"}}>
                {item.mobile_no.map((contact, index) => (
                         <span key={index} style={{fontSize:"12px",border:"1px solid blue",borderRadius:"5px",padding:"5px",marginLeft:"2px"}}>
                          <img src='https://harrogatebusinesscentre.com/wp-content/uploads/156-1568270_blue-phone-icon-png-clipart-png-download-transparent.png' style={{height:"15px"}}></img>{contact}</span>
                      ))} <span>mobile</span> <br></br><br></br>
                       {item.email.map((contact, index) => (
                         <span key={index} style={{fontSize:"12px",border:"1px solid blue",borderRadius:"5px",padding:"5px",marginTop:"20px"}}>
                          <img src='https://cdn2.iconfinder.com/data/icons/basic-thin-line-color/21/19-512.png' style={{height:"15px",marginTop:"2px"}}></img>{contact}<br></br></span> 
                      ))}
                      </div>
            </StyledTableCell >
      
            {/* <StyledTableCell style={{fontSize:"14px",paddingLeft: "70px" }}>
              <span style={{fontWeight:"bold"}}>{item.stage}</span><br></br>
              {item.owner.join(',')}
            </StyledTableCell> */}
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
            marginTop: "4px", // Align the arrow properly
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
            marginTop: "4px", // Align the arrow properly
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

<div className='col-md-12'><img src="https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/512x512/plain/history.png" style={{height:"25px",paddingRight:"10px"}}/> History (<span className="no-activity-flash" style={{fontSize:"12px",color:"blue"}}>{unitlocation?.previousowner_details?.length}</span>)
<span 
  onClick={toggleTableVisibility5} 
  style={{ 
    position:"absolute",
    cursor: "pointer", 
    right:  "50px", 
    fontSize: "20px", 
    display: "inline-block", 
    transition: "transform 0.3s ease", // Smooth transition for rotation
    transform: isTableVisible4 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
    marginTop: "4px", // Align the arrow properly
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

<div style={{backgroundColor:"white",width:"100%",overflow:"auto",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"10px",height: isTableVisible5 ? "200px" : "0",transition: "height 0.3s ease"}}>
         
         <TableContainer component={Paper} style={{ height: '200px' }}>
     <Table sx={{}} aria-label="customized table">
     <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
         <TableRow  style={{backgroundColor:"gray"}}>
           {allColumnspreviousowner.map((col) => (
             <StyledTableCell
               key={col.id}
               style={{ fontFamily: "times new roman", cursor: 'pointer',fontSize:"12px", whiteSpace: "nowrap",lineHeight:"5px"}}>
               {col.name}
             </StyledTableCell>
           ))}
         </TableRow>
       </thead>
        <tbody>
         {
          
         unitlocation?.previousowner_details?.map ((item, index) => (
           <StyledTableRow key={index}>
             <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px" }}>
            
               {index + 1}
             </StyledTableCell>
             <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
               {item.title} {item.first_name} {item.last_name}
             </StyledTableCell >
             <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
             {item.mobile_no.map((contact, index) => (
                          
                          <span key={index} style={{fontSize:"12px"}}>  <SvgIcon component={PhoneIphoneIcon} sx={{ fontSize: 14}} />{contact}<br></br></span> 
              ))
              }
             </StyledTableCell>
             <StyledTableCell style={{ fontFamily: "times new roman",fontSize:"12px",whiteSpace: "nowrap" }}>
             {item.email.map((contact, index) => (
                          
                          <span key={index} style={{fontSize:"12px"}}>  <SvgIcon component={EmailIcon} sx={{ fontSize: 14}} /> {contact}<br></br></span> 
                       ))
             }
             </StyledTableCell>
           </StyledTableRow>
         ))}
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



<Modal show={show10} onHide={handleClose10} size='xl'>
            {/* <Modal.Header>
              <Modal.Title>Update Lead</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
          
            <div className="row"  id="projectform" >
        <div className="col-12">
            <div >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Sale or Rent</h4>
                </div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Available For</label><select name="availablefor" id="availablefor" className="form-control form-control-sm" required="true" onChange={available_for} >
                    <option>{deal.available_for}</option>
                    <option>---select---</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                        
                        <div className="col-md-4"><label className="labels">Stage</label><select name="stage"  className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,stage:e.target.value})}>
                    <option>{deal.stage}</option>
                    <option>---select---</option>
                        <option>Open</option>
                        <option>Quote</option>
                        <option>Negotiation </option>
                        <option>Booked </option>
                        <optgroup label="Closed">
                          <option>Won</option><option>Lost</option><option>Reject</option>
                        </optgroup>
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="col-md-4"><label className="labels">Project</label>
                        <select className="form-control form-control-sm" name="project" onChange={handleprojectchange}>
                        <option>{deal.project}</option>
                        <option>---select---</option>
                        {
                          allproject.map((project)=>
                          (
                            <option>{project}</option>
                          ))
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Block</label>
                        <select className="form-control form-control-sm" name="block" onChange={handleallblockchange} >
                        <option>{deal.block}</option>
                        <option>---select---</option>
                    {
                      allblocks.map((block)=>
                      (
                        <option>{block.block_name}</option>
                      ))
                    }
                      
  
                </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Unit No.</label>
                        <select className="form-control form-control-sm" name="unit_no" onChange={handleallunitschange}  >
                      <option>{deal.unit_number}</option>
                      <option>---select---</option>
                      {
                        allUnits.map((units)=>
                        (
                          <option>{units.unit_no}</option>
                        ))
                      }
                </select>
                        </div>
                  
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Terms Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                </div>

    {/* ===============================================sale start======================================================================== */}


                <div className="row" id="sale" style={{display:"none"}}>
                  <div className="col-md-12"><u><b>Expected Price</b></u></div>
                 
                    <div className="col-md-2"><label className="labels" >Type</label><select id="calculatedorabsoulute" required="true" className="form-control form-control-sm" onChange={handleselectpricetypechang} >
                    <option value="calculated">calculated</option><option value="absolute">absolute</option>
                    </select></div>
                    <div id="price1" className="col-md-2"><label className="labels">Price</label>
                    <input id="eprice" onChange={calculateResult} type="number" className="form-control form-control-sm" /></div>
                    
                    <div className="col-md-0" id="multiply"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                    <p>X</p>
                    </div>
                    <div className="col-md-2" id="totalarea"><label className="labels" > Total Area</label><input type="number" id="earea" onChange={calculateResult} value={numericValue} className="form-control form-control-sm"  /></div>
                    <div className="col-md-2" id="measurment"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,measurment1:e.target.value})} >
                    <option value="">{measurementUnit}</option>
                    <option value="">sq feet</option>
                    <option value="">sq yard</option>
                    </select></div>
                    
                   <div className="col-md-3"><label className="labels">Total Price<span id="priceintext"><br></br>{deal.expected_price}{formatCurrency(result0)}<br></br>{resultText}</span></label><input type="text" id="totalprice" style={{display:"none"}} className="form-control form-control-sm" name="expected_price" onChange={(e)=>setdeal({...deal,expected_price:e.target.value})}/></div>
                   <div id="divforprice1" className="col-md-5" style={{display:"none"}}></div>


                 
                  <div className="col-md-12"><u><b>Quote Price</b></u></div>
              

                    <div className="col-md-2"><label className="labels" >Type</label><select id="calculatedorabsoulute1" required="true" className="form-control form-control-sm" onChange={ehandleselectpricetypechang} >
                    <option value="calculated">calculated</option><option value="absolute">absolute</option>
                    </select></div>
                    <div id="price11" className="col-md-2"><label className="labels">Price</label>
                    <input id="qprice" onChange={calculateResult1} type="number" className="form-control form-control-sm" /></div>
                    
                    <div className="col-md-0" id="multiply1"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                    <p>X</p>
                    </div>
                    <div className="col-md-2" id="totalarea1"><label className="labels" > Total Area</label><input type="number" id="qarea" value={numericValue}  onChange={calculateResult1}  className="form-control form-control-sm"/></div>
                    <div className="col-md-2" id="measurment1"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm"  >
                    <option>{measurementUnit}</option>
                    <option value="">sq feet</option>
                    <option value="">sq yard</option>
                    </select></div>
                    
                   <div className="col-md-3"><label className="labels">Total Price<span id="priceintext1"><br></br>{deal.quote_price}{formatCurrency(result1)}<br></br>{resultText1}</span></label><input type="text" id="totalprice1" style={{display:"none"}} className="form-control form-control-sm" name="quote_price" onChange={(e)=>setdeal({...deal,quote_price:e.target.value})}/></div>
                   <div id="divforprice11" className="col-md-5" style={{display:"none"}}></div>

                    <div className="col-md-4"><label className="labels">Deal Type</label><select className="form-control form-control-sm" name="deal_type" onChange={(e)=>setdeal({...deal,deal_type:e.target.value})}>
                        <option>{deal.deal_type}</option>
                        <option>---Select---</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Transaction Type</label><select className="form-control form-control-sm" name="transaction_type" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                        <option>{deal.transaction_type}</option>
                        <option>---Select---</option>
                        <option>Full White</option>
                        <option>Collecter Rate</option>
                        <option>Flexiable</option>
                        </select></div>
                        <div className="col-md-4"></div>

                        <div className="col-md-5"><label className="labels">Source</label><select className="form-control form-control-sm" name="source" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
                        <option>{deal.source}</option>
                        <option>---Select---</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>

                        {deal.transaction_type === "Flexiable" && (
                        <div className="col-md-8">
                           <label className="labels">White Portion</label>
                        <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                          <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                          <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                      )}
                       

                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4"><label className="labels">Team</label><select className="form-control form-control-sm" name="team" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                              <option>{deal.team}</option>
                              <option>---Select---</option>
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">User</label><select className="form-control form-control-sm" name="user" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                        <option>{deal.user}</option>
                               <option>---Select---</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Visible To</label><select className="form-control form-control-sm" name="visible_to" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                        <option>{deal.visible_to}</option>
                        <option>---Select---</option>
                        <option>Only Me</option>
                        <option>Team</option>
                        <option>All User</option>
                        </select></div>

                        <div className="col-md-12"><label className="labels">Publish On</label></div>
                    <div className="col-md-12"><hr></hr></div>
                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Website</label>
                                      <select className="form-control form-control-sm" name="website" required="true" onChange={(e)=>setdeal({...deal,website:e.target.value})}>
                                      <option>{deal.website}</option>
                                          <option>---select---</option>
                                          <option>Own Website</option>
                                          <option>99 Acre</option>
                                          <option>Olx</option>
                                          <option>Magicbricks</option>
                                          <option>Etc.</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Social Media</label>
                                      <select className="form-control form-control-sm" name="social_media" required="true" onChange={(e)=>setdeal({...deal,social_media:e.target.value})}>
                                      <option>{deal.social_media}</option>
                                          <option>---select---</option>
                                          <option>Facebook</option>
                                          <option>Instagram</option>
                                          <option>Googe Page</option>
                                          <option>Linkdin</option>
                                          <option>Twitter</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Send(Matched Lead)</label>
                                      <select className="form-control form-control-sm" name="send_matchedlead" required="true" onChange={(e)=>setdeal({...deal,send_matchedlead:e.target.value})}>
                                          <option>{deal.send_matchedlead}</option>
                                          <option>---select---</option>
                                          <option>Message</option>
                                          <option>What's App</option>
                                          <option>Email</option>
                                          </select>
                                    </div>
                                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea type="text" value={deal.remarks} style={{height:"100px"}} className="form-control form-control-sm"  onChange={(e)=>setdeal({...deal,remarks:e.target.value})}/></div>
                                    <div className="col-md-2"></div>


                      </div>
{/* -----------------------=========================sale end====================================-------------------------------------- */}

{/* ------------------------------------------------============rent start========================-------------------------------------- */}
                     
                     
                        <div className="row" id="rent" style={{display:"none"}}>
                        <div className="col-md-4"><label className="labels">Floors</label><select className="form-control form-control-sm" name="floors" onChange={(e)=>setdeal({...deal,floors:e.target.value})}>
                        <option>{deal.floors}</option>
                        <option>---select---</option>
                        <option>Ground</option>
                        <option>1st</option>
                        <option>2nd</option>
                        <option>3rd</option>
                        <option>4th</option>
                        <option>Top</option>
                        </select></div>
                        <div className="col-md-8"></div>

                        <div className="col-md-12"><u><b>Expected Price</b></u></div>
                 
                 <div className="col-md-2"><label className="labels" >Type</label><select id="rcalculatedorabsoulute" required="true" className="form-control form-control-sm" onChange={rhandleselectpricetypechang} >
                 <option value="calculated">calculated</option><option value="absolute">absolute</option>
                 </select></div>
                 <div id="rprice1" className="col-md-2"><label className="labels">Price</label>
                 <input id="reprice" onChange={calculateResult2} type="number" className="form-control form-control-sm" /></div>
                 
                 <div className="col-md-0" id="rmultiply"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                 <p>X</p>
                 </div>
                 <div className="col-md-2" id="rtotalarea"><label className="labels" > Total Area</label><input type="number" onChange={calculateResult2} value={numericValue} id="rearea"  className="form-control form-control-sm"  /></div>
                 <div className="col-md-2" id="rmeasurment"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm"  >
                 <option value="">{measurementUnit}</option>
                 <option value="">sq feet</option>
                 <option value="">sq yard</option>
                 </select></div>
                 
                <div className="col-md-3"><label className="labels">Total Price<span id="rpriceintext"><br></br>{deal.expected_price}{formatCurrency(result2)}<br></br>{resultText2}</span></label><input type="text" id="rtotalprice" style={{display:"none"}} className="form-control form-control-sm" name="expected_price" onChange={(e)=>setdeal({...deal,expected_price:e.target.value})}/></div>
                <div id="rdivforprice1" className="col-md-5" style={{display:"none"}}></div>


              
               <div className="col-md-12"><u><b>Quote Price</b></u></div>
           

                 <div className="col-md-2"><label className="labels" >Type</label><select id="rcalculatedorabsoulute11" required="true" className="form-control form-control-sm" onChange={rhandleselectpricetypechang1} >
                 <option value="calculated">calculated</option><option value="absolute">absolute</option>
                 </select></div>
                 <div id="rprice11" className="col-md-2"><label className="labels">Price</label>
                 <input id="rqprice1" onChange={calculateResult3} type="number" className="form-control form-control-sm" /></div>
                 
                 <div className="col-md-0" id="rmultiply1"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                 <p>X</p>
                 </div>
                 <div className="col-md-2" id="rtotalarea1"><label className="labels" > Total Area</label><input type="number" onChange={calculateResult3} value={numericValue} id="rqarea1"  className="form-control form-control-sm"/></div>
                 <div className="col-md-2" id="rmeasurment1"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm" >
                 <option>{measurementUnit}</option>
                 <option value="">sq feet</option>
                 <option value="">sq yard</option>
                 </select></div>
                 
                <div className="col-md-3"><label className="labels">Total Price<span id="rpriceintext1"><br></br>{deal.quote_price}{formatCurrency(result3)}<br></br>{resultText3}</span></label><input type="text" id="rtotalprice1" style={{display:"none"}} className="form-control form-control-sm" name="quote_price" onChange={(e)=>setdeal({...deal,quote_price:e.target.value})}/></div>
                <div id="rdivforprice11" className="col-md-5" style={{display:"none"}}></div>

                
                    <div className="col-md-3"><label className="labels">Security Deposite</label><input type="text" required="true" value={deal.security_deposite} className="form-control form-control-sm" name="security_deposite" onChange={(e)=>setdeal({...deal,security_deposite:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Maintanance Charge</label><input type="text" required="true" value={deal.maintainence_charge} className="form-control form-control-sm" name="maintainence_charge" onChange={(e)=>setdeal({...deal,maintainence_charge:e.target.value})}/></div>
                    <div className="col-md-2"><label className="labels">Rent Esclation</label><select className="form-control form-control-sm" name="rent_escltion" onChange={(e)=>setdeal({...deal,rent_escltion:e.target.value})}>
                    <option>{deal.rent_escltion}</option>
                         <option>---select---</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-2"><label className="labels">Rent Period</label><select className="form-control form-control-sm" name="rent_period" onChange={(e)=>setdeal({...deal,rent_period:e.target.value})}>
                        <option>{deal.rent_period}</option>
                         <option>---select---</option>
                        <option>06 months</option>
                        <option>11 months</option>
                        <option>24 months</option>
                        <option>36 months</option>
                        </select></div>
                        <div className="col-md-2"><label className="labels">Fitout Period</label><select className="form-control form-control-sm" name="fitout_perioud" onChange={(e)=>setdeal({...deal,fitout_perioud:e.target.value})}>
                        <option>{deal.fitout_perioud}</option>
                        <option>---select---</option>
                        <option>06 months</option>
                        <option>11 months</option>
                        <option>24 months</option>
                        <option>36 months</option>
                        </select></div>

                        <div className="col-md-4"><label className="labels">Deal Type</label><select className="form-control form-control-sm" name="deal_type" onChange={(e)=>setdeal({...deal,deal_type:e.target.value})}>
                        <option>{deal.deal_type}</option>
                        <option>---select---</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Transaction Type</label><select className="form-control form-control-sm" name="transaction_type" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                        <option>{deal.transaction_type}</option>
                         <option>---select---</option>
                         <option>Full White</option>
                        <option>Collecter Rate</option>
                        <option>Flexiable</option>
                        </select></div>
                        <div className="col-md-4"></div>

                        <div className="col-md-5"><label className="labels">Source</label><select className="form-control form-control-sm" name="source" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
                        <option>{deal.source}</option>
                         <option>---select---</option>
                         <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                
                        {deal.transaction_type === "Flexiable" && (
                        <div className="col-md-8">
                           <label className="labels">White Portion</label>
                        <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                          <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                          <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                      )}
                       
                        

                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4"><label className="labels">Team</label><select className="form-control form-control-sm" name="team" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                        <option>{deal.team}</option>
                              <option>---select---</option>
                               <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">User</label><select className="form-control form-control-sm" name="user" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                        <option>{deal.user}</option>
                              <option>---select---</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Visible To</label><select className="form-control form-control-sm" name="visible_to" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                        <option>{deal.visible_to}</option>
                              <option>---select---</option>
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>

                        <div className="col-md-12"><label className="labels">Publish On</label></div>
                    <div className="col-md-12"><hr></hr></div>
                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Website</label>
                                      <select className="form-control form-control-sm" name="website" required="true" onChange={(e)=>setdeal({...deal,website:e.target.value})}>
                                      <option>{deal.website}</option>
                                          <option>---select---</option>
                                          <option>Own Website</option>
                                          <option>99 Acre</option>
                                          <option>Olx</option>
                                          <option>Magicbricks</option>
                                          <option>Etc.</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Social Media</label>
                                      <select className="form-control form-control-sm" name="social_media" required="true" onChange={(e)=>setdeal({...deal,social_media:e.target.value})}>
                                      <option>{deal.social_media}</option>
                                          <option>---select---</option>
                                          <option>Facebook</option>
                                          <option>Instagram</option>
                                          <option>Googe Page</option>
                                          <option>Linkdin</option>
                                          <option>Twitter</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Send(Matched Lead)</label>
                                      <select className="form-control form-control-sm" name="send_matchedlead" required="true" onChange={(e)=>setdeal({...deal,send_matchedlead:e.target.value})}>
                                      <option>{deal.send_matchedlead}</option>
                                          <option>---select---</option>
                                          <option>Message</option>
                                          <option>What's App</option>
                                          <option>Email</option>
                                          </select>
                                    </div>
                                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea type="text" style={{height:"100px"}} className="form-control form-control-sm"  onChange={(e)=>setdeal({...deal,remarks:e.target.value})}/></div>
                                    <div className="col-md-2"></div>
                                    


                      </div>
                  </div>
  
  {/*============================================ rent end=========================================================================== */}
                   
                    </div>
                    
        </div>
          
 
                 
                           
        
   
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedeal}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose10}>
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




   <Modal show={show11} onHide={handleClose11} size='xl' animation={true}>
            <Modal.Header>
              <Modal.Title>Map</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                               <div style={{border:"1px solid black",marginTop:"10px"}}>
                                              
                                                
                                                        <LoadScript
                                                          googleMapsApiKey="AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc">
                                                                  <GoogleMap
                                                            mapContainerStyle={mapStyles1}
                                                              zoom={13}
                                                              center={defaultCenter1}
                                                              >
                                                          <Marker
                                                            position={{ lat: defaultCenter1.lat, lng: defaultCenter1.lng }}
                                                            draggable={true}
                                                           
                                                          />
                                                          </GoogleMap>
                                                          </LoadScript>
                                           
                                                        </div>

        </Modal.Body>
            <Modal.Footer>
           
              <Button variant="secondary" onClick={handleClose11}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


{/*==================================================== map modal end============================================================== */}


{/* ============================================owner change modal start============================================================ */}


<Modal show={show9} onHide={handleClose9} size='xl' animation={true}>
            <Modal.Header>
              <Modal.Title>Change Owner</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                              <div id="ownerdetails" style={{padding:"5px"}}>
                                            <div className="row" style={{width:"100%"}}>
                                           
                                                    <div className="col-md-9" id="suggestion-box" style={{ position: 'relative' }}><label className="labels" style={{visibility:"hidden"}}>Search</label><input type="search"className="form-control form-control-sm" value={input} placeholder="Type here For Search in Contact" required="true" onChange={handleInputChange}/></div>
                                                    {showSuggestions && input && filteredSuggestions.length > 0 && (
                                                        <ul className="suggestion-list">
                                                          {filteredSuggestions.map((suggestion, index) => (
                                                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                                              {suggestion.first_name}
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      )}
                                                    <div className="col-md-3"><label className="labels">Add Contact</label><button className="form-control form-control-sm" style={{width:"50px"}} onClick={()=>navigate('/sortaddcontact')}>+</button></div>
                                                
                                                 <div className="col-md-12" style={{marginTop:"20px"}}><label className="labels" >Owner Contact</label><div className="col-md-12"><hr></hr></div>
                                                 {units.owner_details.length >= 0 && (
                                                  <div className="contact-details">
                                                    <table  style={{width:"100%"}}>
                                                      
                                                      <tbody>
                                                       {/* Combine selectedcontact1 with units.owner_details while removing duplicates */}
                                      {[...selectedcontact1, ...units.owner_details]
                                        .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                                        .filter((contact, index, self) => 
                                          // Ensure that we only keep unique contacts based on _id
                                          index === self.findIndex((c) => c._id === contact._id)
                                        ).map(contact => (
                                                          <StyledTableRow>
                                                            <img style={{height:"70px",width:"80px"}} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt=""></img>
                                                            <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                                                {contact.title} {contact.first_name} {contact.last_name}<br></br>
                                                                <SvgIcon component={EmailIcon} />
                                                                <span>{contact.email}</span>
                                                            </StyledTableCell>
                            
                                                            <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                                              {Array.isArray(contact.mobile_no)?
                                                              contact.mobile_no.map((number, index) => (
                                                                <span key={index}>
                                                                  <SvgIcon component={PhoneIphoneIcon} />
                                                                  {number}<br></br>
                                                                </span>
                                                              )):[]}
                                                            </StyledTableCell>
                            
                                                            <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                                              S/W/O <br></br>{contact.father_husband_name}
                                                              </StyledTableCell>
                            
                                                              <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                                              permanent address: <br></br>{contact.h_no}<br></br>{contact.area1}
                                                              {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1} 
                                                              </StyledTableCell>
                            
                                                              <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                                                    <span style={{color:"orange",fontWeight:"bolder"}}>Owner</span>
                                                                </StyledTableCell>
                            
                                                            <StyledTableCell>
                                                              <img style={{height:"40px",cursor:"pointer"}} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="" onClick={() => removeContact(contact._id)}></img>
                                                               </StyledTableCell>
                                                            
                                                          </StyledTableRow>
                                                        ))}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                )}
                                            </div>
                                            
                                            <div className="col-md-12" style={{marginTop:"20px"}}><label className="labels" >Associate Contact</label><div className="col-md-12"><hr></hr></div>
                                            {units.associated_contact.length >= 0 && (
                                            <div className="contact-details">
                                                <table style={{width:"100%"}}>
                                                    <tbody>
                                                         {
                                                          
                                                          [...selectedcontact2, ...units.associated_contact]
                                                            .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                                                            .filter((contact, index, self) => 
                                                              // Ensure that we only keep unique contacts based on _id
                                                              index === self.findIndex((c) => c._id === contact._id)
                                                            ).map(contact => (
                                                            <StyledTableRow>
                                                                <img style={{ height: "70px", width: "80px" }} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt="Contact" />
                                                                <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                                                    {contact.title} {contact.first_name} {contact.last_name}<br />
                                                                    <SvgIcon component={EmailIcon} />
                                                                    <span>{contact.email}</span>
                                                                </StyledTableCell>
                            
                                                                <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                                                    {
                                                                    Array.isArray(contact.mobile_no) ?
                                                                    contact.mobile_no.map((number, index) => (
                                                                        <span key={index}>
                                                                            <SvgIcon component={PhoneIphoneIcon} />
                                                                            {number}<br />
                                                                        </span>
                                                                    )):[]}
                                                                </StyledTableCell>
                            
                                                                <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                                                    S/W/O <br />{contact.father_husband_name}
                                                                </StyledTableCell>
                            
                                                                <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                                                    permanent address: <br />{contact.h_no}<br />{contact.area1} {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1}
                                                                </StyledTableCell>
                            
                                                                <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                                                <span style={{color:"orange",fontWeight:"bolder"}}>{units.relation}</span>
                                                                </StyledTableCell>
                                                                    
                                                                <StyledTableCell>
                                                                    <img style={{ height: "40px", cursor: "pointer" }} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" onClick={() => removeContact(contact._id)} alt="Remove" />
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))} 
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                        </div>
                                        </div>
                                        </div>

        </Modal.Body>
            <Modal.Footer>
           
            <Button variant="secondary" onClick={updateinventories}>
                Change Owner
              </Button>
              <Button variant="secondary" onClick={handleClose9}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


            <Modal show={show22} onHide={handleClose22} size='lg' style={{transition:"0.5s ease-in",backgroundColor:"gray"}}>
                      <Modal.Header>
                        <Modal.Title>Choose Relation</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <div style={{width:"100%"}}>
                      <div className="row">
                              <div className="col-md-4"><label className="labels">Relation</label><select className="form-control form-control-sm" required="true" onChange={handlerelationchange}>
                                        <option>Select</option>
                                        <option value="Self">Self</option>
                                        <option value="Son">Son</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Uncle">Uncle</option>
                                        <option value="Other">Other</option>
                                  </select>
                            </div>
                         </div>
                     </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose22}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>


{/* ===============================================owner change modal end=========================================================== */}


{/*============================================ unit location details edit start================================================ */}


<Modal show={show12} onHide={handleClose12} size='lg' style={{transition:"0.5s ease-in",backgroundColor:"gray"}}>
                      <Modal.Header>
                        <Modal.Title>Change Location</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <div style={{width:"100%"}}>

                            <div className="row">
                                        <div className="col-md-12" id='unitlocation' style={{lineHeight:"30px"}}>
                                       
                                        <div className="col-md-12" style={{border:"1px solid black",marginTop:"30px",padding:"10px"}}>
                                        <div style={{border:"1px solid black"}}>
                                        
                                          
                                                  <LoadScript
                                                    googleMapsApiKey="AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc"
                                                                                        >
                                                            <GoogleMap
                                                      mapContainerStyle={mapStyles1}
                                                        zoom={13}
                                                        center={defaultCenter2}
                                                        >
                                                    <Marker
                                                      position={{ lat: defaultCenter2.lat, lng: defaultCenter2.lng }}
                                                      draggable={true}
                                                      onDragEnd={handleMarkerDragEnd1}
                                                    />
                                                    </GoogleMap>
                                                    </LoadScript>
                                     
                                                  </div>
                                                  <div className="row">
                                                  <div className="col-md-6" ><label className="labels">Location</label><input  type="text" className="form-control form-control-sm" required="true" value={units.location} onChange={(e)=>setunits({...units,location:e.target.value})}/></div>
                                                  {/* <div className='col-md-5'></div> */}
                                                  <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label><button className="form-control form-control-sm" required="true" onClick={handleSubmit1}>Get</button></div>
                                                  <div className='col-md-4'></div>
                                                  <div className="col-md-5"><label className="labels">Lattitude</label><input type="number"className="form-control form-control-sm" required="true" value={units.lattitude}  readOnly/></div>
                                                  <div className="col-md-5"><label className="labels">Langitude</label><input type="number"className="form-control form-control-sm" required="true" value={units.langitude} readOnly/></div>
                                                  <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address</label></div>
                                           
                                            <div className="col-md-8"><label className="labels">ADDRESS</label><input type="text" value={units.uaddress} className="form-control form-control-sm" onChange={(e)=>setunits({...units,uaddress:e.target.value})}/></div>
                                            <div className="col-md-4"></div>
                                            <div className="col-md-8"><label className="labels">STREET</label><input type="text" value={units.ustreet} className="form-control form-control-sm" onChange={(e)=>setunits({...units,ustreet:e.target.value})}/></div>
                                            <div className="col-md-4"></div>
                                            <div className="col-md-4"><label className="labels">LOCALITY</label><input type="text" value={units.ulocality} className="form-control form-control-sm" onChange={(e)=>setunits({...units,ulocality:e.target.value})}/></div>
                                            <div className="col-md-4"><label className="labels">CITY</label>
                                            <select type="text"  className="form-control form-control-sm" onChange={(e)=>setunits({...units,ucity:e.target.value})}>
                                            <option>{units.ucity}</option>
                                            {ucities.map((city) => (
                                              <option key={city} value={city}>
                                                {city}
                                              </option>
                                            ))}
                                            </select>
                                            </div>
                                            <div className="col-md-4"><label className="labels">ZIP</label><input type="text" value={units.uzip} className="form-control form-control-sm" onChange={(e)=>setunits({...units,uzip:e.target.value})}/></div>
                                            <div className="col-md-6"><label className="labels">State</label><select  className="form-control form-control-sm" onChange={(e)=>setunits({...units,ustate:e.target.value})}>
                                                        <option>{units.ustate}</option>
                                                        {ustates.map((state) => (
                                                        <option key={state} value={state}>
                                                          {state}
                                                        </option>
                                                         ))}
                                                        </select>
                                            </div>
                                            <div className="col-md-6"><label className="labels">Country</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,ucountry:e.target.value})}>
                                                        <option>{units.ucountry}</option>
                                                        <option>My Team</option>
                                                        <option>My Self</option>
                                                        <option>All Users</option>
                                                        </select>
                                            </div>
                                                  </div>
                                                  </div>
                                   
                                  
                                        </div>
                                        </div>
                 
                     </div>
                      </Modal.Body>
                      <Modal.Footer>
                      <Button variant="secondary" onClick={updateinventories}>
                          Update Location
                        </Button>
                        <Button variant="secondary" onClick={handleClose12}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>



{/*===================================================== unit location details edit end========================================= */}


{/* ==================================unit details edit modal start=========================================================== */}


<Modal show={show13} onHide={handleClose13} size='lg' style={{transition:"0.5s ease-in",backgroundColor:"gray"}}>
                      <Modal.Header>
                        <Modal.Title>Update Unit Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>

                      <div style={{width:"100%"}}>
            <div className="row" id='unitdetails1'>
             
                    <div className="col-md-8"><label className="labels">Unit Number</label><input type="text" required="true"  className="form-control form-control-sm" value={units.unit_no} placeholder="unit number" onChange={(e)=>setunits({...units,unit_no:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Unit Type</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,unit_type:e.target.value})}>
                               <option>{units.unit_type}</option>
                                <option>---Select---</option>
                                <option>Corner</option>
                                <option> Two Side Open</option>
                                <option>Three Side Open</option>
                                <option>Ordinary </option>
                                </select>
                    </div>
                    <div className="col-md-12" style={{display:"flex"}} ><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                    <div className="col-md-12" style={{ display: "flex", flexWrap: "wrap" }}>
                      {
                        project.category.map((type) => (
                          <div className="col-md-3" key={type}>
                            <button 
                              className="form-control form-control-sm"
                              onClick={() => handleTypeClick1(type)} 
                              style={{  backgroundColor: selectedType === type ? 'green' : '', }}
                            >
                              {type}
                            </button>
                          </div>
                        ))
                      }
                    </div>
                    </div>

                    <div className="col-md-6"><label className="labels">Block</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,block:e.target.value})}>
                    <option>{units.block}</option>
                    <option>choose</option>
                    {
                                project.add_block.map((item)=>
                                (
                                  <option>{item.block_name}</option>
                                ))
                               }
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Size</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,size:e.target.value})}>
                    <option>{units.size}</option>
                    <option>choose</option>
                    {
                                project.add_size.map((item)=>
                                (
                                  <option>{item.size_name}</option>
                                ))
                               }
                                </select>
                    </div>
                  

                  {
                      project.category.includes("Agricultural") &&(

                          <>


                    <div className="col-md-6"><label className="labels">Land Type</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,land_type:e.target.value})}>
                                <option>{units.land_type}</option>
                                <option>---Select---</option>
                                <option>Crop Land</option>
                                <option>Wood Land</option>
                                <option>Pasture</option>
                                </select>
                    </div>
                    <div className='col-md-6'></div>
                    <div className='col-md-12' style={{color:"green",fontWeight:"bolder",marginTop:"10px"}}>Land Details<hr></hr></div>

                    <div className='col-md-3' ><label className='labels'>Khewat No</label>
                    {
                      Array.isArray(units.khewat_no) ?
                      units.khewat_no.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} value={units.khewat_no} onChange={(event)=>handlekhewatnochange(index,event)}/>
                        
                      )):[]
                    }
                    </div>

                    <div className='col-md-3' ><label className='labels'>Killa No</label>
                    {
                      Array.isArray(units.killa_no) ?
                      units.killa_no.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} value={units.killa_no} onChange={(event)=>handlekillanochange(index,event)}/>
                       
                      )):[]
                    }
                    </div>

                    <div className='col-md-3' ><label className='labels'>Share</label>
                    {
                      Array.isArray(units.share) ?
                      units.share.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} value={units.share} onChange={(event)=>handlesharenochange(index,event)}/>
                      )):[]
                    }
                    </div>

                  <div className='col-md-1' style={{marginTop:"90px"}}>
                  {
                    Array.isArray(units.action5) ?
                    units.action5.map((item,index)=>
                    (
                      
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      
                    )):[]
                  }
                  </div>

                       <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>
                    <div className='col-md-12'>Total Land Area:-{units.total_land_area}</div>
                       <div className='col-md-12' style={{color:"green",fontWeight:"bolder",marginTop:"10px"}}>Water Details<hr></hr></div>

                       <div className='col-md-3' ><label className='labels'>Water Source</label>
                    {
                          Array.isArray(units.water_source) ?
                      units.water_source.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlewatersourcechange(index,event)}>
                          <option>{units.water_source}</option><option>---select---</option><option>Ground Water</option><option>Canal Water</option><option>Pond Water</option><option>Rain Water</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className='col-md-3' ><label className='labels'>Water Level</label>
                    {
                          Array.isArray(units.water_level) ?
                      units.water_level.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlewaterlevelchange(index,event)}>
                          <option>{units.water_level}</option><option>---select---</option><option>100ft.</option><option>200Ft.</option>
                        </select>
                      )):[]
                    }
                    </div>

                    <div className='col-md-3' ><label className='labels'>Water Pump Type</label>
                    {
                          Array.isArray(units.water_pump_type) ?
                      units.water_pump_type.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlewaterpumpchange(index,event)}>
                        <option>{units.water_pump_type}</option>  <option>---select---</option><option>Submersible Motor(15 HP)</option><option>Sumersible Motor(20 HP)</option>
                          <option>Monoblock Motor(10HP)</option><option>Diesel Engine Pump</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className='col-md-1' style={{marginTop:"90px"}}>
                  {
                    Array.isArray(units.action6) ?
                    units.action6.map((item,index)=>
                    (
                      
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      
                    )):[]
                  }
                  </div>
                  <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                  <div className='col-md-12' style={{color:"green",fontWeight:"bolder"}}>Basic Details<hr></hr></div>

                  <div className="col-md-4"><label className="labels">Facing</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,facing:e.target.value})}>
                                <option>{units.facing}</option>
                                <option>---Select---</option>
                                <option>Village Link Road</option>
                                <option>Highway</option>
                                <option>Expressway</option>
                                <option>Unconstructed Road</option>
                                </select>
                    </div>

                    <div className="col-md-4"><label className="labels">Side Open</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,side_open:e.target.value})}>
                                <option>{units.side_open}</option>
                                <option>---Select---</option>
                                <option>1 Side Open</option>
                                <option>2 Side Open</option>
                                <option>3 Side Open</option>
                                </select>
                    </div>

                    <div className="col-md-4"><label className="labels">Road</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,road:e.target.value})}>
                                <option>{units.road}</option>
                                <option>---Select---</option>
                                <option>11 Ft wide</option>
                                <option>22 Ft Wide</option>
                                <option>33 Ft Wide</option>
                                <option>60 Ft Wide</option>
                                <option>100 Ft Wide</option>
                                <option>200 Ft Wide</option>
                                </select>
                    </div>

                    <div className="col-md-4"><label className="labels">Front On Road</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,fornt_on_road:e.target.value})}>
                                <option>{units.fornt_on_road}</option>
                                <option>---Select---</option>
                                <option>10 ft</option>
                                <option>20 ft</option>
                                <option>30 ft</option>
                                <option>50 ft</option>
                                <option>70 ft</option>
                                <option>100 ft</option>
                                <option>200 ft</option>
                                <option>500 ft</option>
                                <option>1000 ft</option>
                                </select>
                    </div>

                    <div className="col-md-4"><label className="labels">Ownership</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,ownership:e.target.value})}>
                                <option>{units.ownership}</option>
                                <option>---Select---</option>
                                <option>Mustraka</option>
                                <option>Individual</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">No. Of Owner</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,total_owner:e.target.value})}>
                                <option>{units.total_owner}</option>
                                <option>---Select---</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                </select>
                    </div>
              </>
            )


          }

                      {
                      !project.category.includes("Agricultural") &&(

                          <>

                    <div className="col-md-4"><label className="labels">Direction</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,direction:e.target.value})}>
                                <option>{units.direction}</option>
                                <option>---Select---</option>
                                <option>East</option>
                                <option>West</option>
                                <option>North</option>
                                <option>South</option>
                                <option>North East</option>
                                <option>South East</option>
                                <option>South West</option>
                                <option>North West</option>
                               
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Facing</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,facing:e.target.value})}>
                                <option>{units.facing}</option>
                                <option>---Select---</option>
                                <option>Park</option>
                                <option>Green Belt</option>
                                <option>Highway</option>
                                <option>Commercial</option>
                                <option>School</option>
                                <option>Hospital</option>
                                <option>Mandir</option>
                                <option>Gurudwara</option>
                                <option>Crech</option>
                                <option>Clinic</option>
                                <option>Community Centre</option>
                                <option>1 Kanal</option>
                                <option>14m Marla</option>
                                <option>10 Marla</option>
                                <option>8 Marla</option>
                                <option>6 Marla</option>
                                <option>4 Marla</option>
                                <option>2 Marla</option>
                                <option> 3 Marla</option>
                                <option> 2 Kanal</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Road</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,road:e.target.value})}>
                                <option>{units.road}</option>
                                <option>---Select---</option>
                                <option>9 Mtr Wide</option>
                                <option>12 Mtr Wide</option>
                                <option> 18 Mtr Wide</option>
                                <option>24 Mtr Wide</option>
                                <option> 60 Mtr Wide</option>
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Ownership</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,ownership:e.target.value})}>
                                <option>{units.ownership}</option>
                                <option>---Select---</option>
                                <option>Freehold</option>
                                <option>Leasehold</option>
                                <option>Co-OPerative Society</option>
                                <option>Sale Agreement(Lal Dora)</option>
                                </select>
                    </div>
                    <div className='col-md-6'><label className="labels">Stage</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,stage:e.target.value})}>
                                <option>{units.stage}</option>
                                <option>---Select---</option>
                                <option>Active</option>
                                <option>Inactive</option>
                                </select></div>
                    </>
            )


          }


                    <div  className='col-md-6' style={{marginTop:"10px"}}>
                        <input
                          type="checkbox"
                          checked={showabuiltup}
                          onChange={handleCheckboxChange4}
                        />
                        <label>Show Builtup Details</label>
                      </div>
                      <div className='col-md-6'></div>
              {showabuiltup && (
                <>
                    <div className='col-md-12'><label className='labels'>Builtup Details</label><hr></hr></div>

                    <div className='col-md-6' ><label className='labels'>Type</label> <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(e)=>setunits({...units,unit_type:e.target.value})}>
                          <option>{units.type}</option>
                          <option>---Select---</option>
                          <option>Duplex</option>
                          <option>Triplex</option>
                          <option>Independent House</option>
                          <option>Penthouse</option>
                          <option>Apartments</option>
                          <option>Studio Apartments</option>
                          <option>Bunglow</option>
                          <option>Farmhouse</option>
                          <option>Courtyard House</option>
                        </select>
                    </div>
                    <div className='col-md-6'></div>
                  
                    <div className='row mt-2' style={{border:"1px dashed black",margin:"10px",marginTop:"0",padding:"10px",width:"100%"}}>
                    <div className='col-md-2' ><label className='labels'>Floor</label>
                    {
                      Array.isArray(units.floor) ?
                      units.floor.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlefloorchange(index,event)} >
                          <option>{units.floor[index]}</option>
                          <option>---Select---</option>
                          <option>Ground Floor</option>
                          <option>First Floor</option>
                          <option>Second Floor</option>
                          <option>Lower Ground</option>
                          <option>Upper Ground</option>
                          <option>Third Floor</option>
                          <option> Fourth Floor</option>
                          <option>Lower Ground</option>
                          <option>Lower Ground</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels' style={{width:"500px"}}>Cluter Details</label>
                    {
                       Array.isArray(units.cluter_details) ?
                      units.cluter_details.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlecluterdetails(index,event)}>
                          <option>{units.cluter_details[index]}</option>
                          <option>---Select---</option>
                          <option>Living Room</option>
                          <option>Lobby</option>
                          <option>Bedroom</option>
                          <option>Master Bedroom</option>
                          <option>Kitchen</option>
                          <option>Bathroom</option>
                          <option>Pooja room,</option>
                          <option>Study Room</option>
                          <option>Frontward</option>
                          <option>Backyard</option>
                          <option>Balcony</option>
                          <option>Store</option>
                          <option>Guest Room</option>
                          <option>Servent Room</option>
                          <option>Dressing</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Length</label>
                    {
                          Array.isArray(units.length) ?
                      units.length.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} value={units.length[index]} onChange={(event)=>handlelengthchange(index,event)}/>
                      )):[]
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Breadth</label>
                    {
                      Array.isArray(units.bredth) ?
                      units.bredth.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} value={units.bredth[index]} onChange={(event)=>handlebredthchange(index,event)}/>
                      
                      )):[]
                    }
                    </div>
                      <div className='col-md-2' ><label className='labels'>Total Area</label>
                    {
                      Array.isArray(units.total_area) ?
                      units.total_area.map((item,index)=>
                      (
                        <input className="form-control form-control-sm"  value={units.length[index] && units.bredth[index] ? units.length[index] * units.bredth[index] : ''} style={{marginTop:"10px"}}  readOnly/>
                    
                      )):[]
                    }
                    </div>
                   
                    <div className='col-md-1' style={{marginTop:"90px"}}>
                    {
                      Array.isArray(units.action3) ?
                      units.action3.map((item,index)=>
                      (
                        
                            <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                        
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                   
                    </div>
                    </>
                    )}

                    <div className='col-md-6'><label>Occupation Date</label><input type='date' className='form-control form-control-sm' value={units.ocupation_date} onChange={(e)=>setunits({...units,ocupation_date:e.target.value})}/></div>
                    <div className='col-md-6'><label>Age of Construction</label><input type='text' className='form-control form-control-sm' value={units.age_of_construction} onChange={(e)=>setunits({...units,age_of_construction:e.target.value})}/></div>
                    

                    <div className="col-md-6"><label className="labels">Furnishing Details</label><select id='subcategory'  className="form-control form-control-sm" onChange={(e)=>setunits({...units,furnishing_details:e.target.value})}>
                                <option>{units.furnishing_details}</option>
                                <option>---Select---</option>
                                <option>Furnished</option>
                                <option>Unfurnished</option>
                                <option>Semi Furnished</option>
                                </select>
                    </div>   
                    {
                      (units.furnishing_details==="Furnished" || units.furnishing_details==="Semi Furnished") && (
                     
                     <div className='col-md-12'><label>Enter Furnishing Details</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setunits({...units,age_of_construction:e.target.value})}/></div>
                    )}
                    <div className='col-md-6'></div>

                    <div className='col-md-8'><label>Furnished Items</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setunits({...units,furnished_item:e.target.value})}/></div>
                 
                </div>
                </div>


                      </Modal.Body>
                      <Modal.Footer>
                      <Button variant="secondary" onClick={updateinventoriesunit}>
                          Update Unit
                        </Button>
                        <Button variant="secondary" onClick={handleClose13}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>


{/*============================================ unit details edit modal end =======================================================*/}

<ToastContainer/>
    </div>
  )
}

export default Dealsingleview
