import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState,useRef } from "react";

import { ToastContainer,toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { event } from "jquery";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { utils, writeFile } from "xlsx";
import api from "../api";
// import {  AlternateEmail, Remove as RemoveIcon } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
import'../css/addcontact.css';
import Tooltip from '@mui/material/Tooltip';
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';  // Import ReactQuill
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'; 



function Fetchcontact() {
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

    const navigate=useNavigate()
  
    const [isLoading, setIsLoading] = useState(false);
/*-------------------------------------------------------------------fetching all contact data start---------------------------------------------------------------------------- */                                                     
    const[data,setdata]=useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const[totalcontact,settotalcontact]=useState()
    const[contactforsearch,setcontactforsearch]=useState([])
 
  /*-------------------------------------------------------------------fetching all contact data end---------------------------------------------------------------------------- */                                                     

  /*-------------------------------------------------------------------delete  contact data start---------------------------------------------------------------------------- */                                                     
    // const deletecontact=async(item)=>
    //     {
    //       try {
    //         const id=item._id
    //         const resp=await api.delete(`deletecontact/${id}`)
    //         toast.success("contact deleted successfully",{ autoClose: 2000 })
    //         setTimeout(() => {
    //           window.location.reload()
    //         }, 2000);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }

        const [isLoading4, setIsLoading4] = useState(false);

        const deleteSelectedItems = async () => {
          try {
            if(selectedItems.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }

            // Show confirmation message
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, delete it!",
            });
        
            if (!result.isConfirmed) {
              return; // Stop execution if user cancels
            }

             setIsLoading4(true)
             await Promise.all(
                selectedItems.map((itemId) => api.delete(`deletecontact/${itemId}`))
              );
                    Swal.fire({
                          title: '🎉 Selected items deleted successfully...!',
                          html: `
                          <img src="https://cdn.vectorstock.com/i/500p/63/50/thumbs-up-smiley-face-icon-vector-10176350.jpg"
                          alt="Thumbs up" 
                          width="80" 
                          style="margin-bottom: 0px;"/>`,
                          width: '400px', // makes it small
                          padding: '1.2em',
                          showConfirmButton: true,
                        }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                          }
                        })
            
            
          } catch (error) {
            console.log(error);
          }finally
          {
              setIsLoading4(false)
          }
        };
     
/*-------------------------------------------------------------------delete  contact data end---------------------------------------------------------------------------- */                                                     

                    
/*-------------------------------------------------------------------searching all contact data by mobile email tags and company start---------------------------------------------------------------------------- */                                                     
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
/*-------------------------------------------------------------------searching all contact data by mobile email tags and company end---------------------------------------------------------------------------- */                                                     
      
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10); // User-defined items per page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const filteredDatas = data.filter(item => item.createdAt && !isNaN(new Date(item.createdAt)));
// const sortedData = [...filteredDatas].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
const currentItems = data;
const totalPages = Math.ceil(data.length / itemsPerPage);

  const [windowStartPage, setWindowStartPage] = useState(1);
    const maxPageNumbersToShow = 3;


 const [contacttotalPages, setcontacttotalPages] = useState(0);
   const fetchdata=async(page, limit)=>
    {
      try {
        const resp=await api.get(`/viewcontact?page=${page}&limit=${limit}`)
  
        setdata(resp.data.contact)
        setcontacttotalPages(resp.data.totalPages);
        setcontactforsearch(resp.data.contact)
        const countcontact=Array.isArray(resp.data.contact) ? resp.data.contact : [resp.data.contact]
        settotalcontact(resp.data.total)
        setFilteredData(countcontact);
      } catch (error) {
        console.log(error);
      }
    
    }

    const[cdata,setcdata]=useState([]);
    // const [filteredData, setFilteredData] = useState([]);
    const[totalcompany,settotalcompany]=useState()
    const fetchcdata=async(event)=>
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


 useEffect(() => {
    fetchdata(currentPage, itemsPerPage);

    // If current page moves outside window, adjust windowStartPage
    if (currentPage < windowStartPage) {
      setWindowStartPage(currentPage);
    } else if (currentPage >= windowStartPage + maxPageNumbersToShow) {
      setWindowStartPage(currentPage - maxPageNumbersToShow + 1);
    }
  }, [currentPage, itemsPerPage]);


    React.useEffect(()=>{fetchcdata()},[])


    const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setWindowStartPage(1);
  };

// Function to handle page changes
const paginate = (pageNumber) => setCurrentPage(pageNumber);

// Function to handle "Next" and "Previous" page changes
const goToNextPage = () => {
  if (currentPage < contacttotalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const goToPreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  const renderPageNumbers = () => {
    const endPage = Math.min(windowStartPage + maxPageNumbersToShow - 1, contacttotalPages);
    const pages = [];

    for (let number = windowStartPage; number <= endPage; number++) {
      pages.push(
        <button
          key={number}
          onClick={() => paginate(number)}
          style={{
            minWidth: 30,
            marginRight: 10,
            borderRadius: 4,
            cursor: 'pointer',
            backgroundColor: number === currentPage ? '#1976d2' : '#e0e0e0',
            color: number === currentPage ? 'white' : 'black',
            border: 'none',
            // padding: '0px 10px',
          }}
        >
          {number}
        </button>
      );
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 0 }}>
        {/* Previous Button */}
        <button
          onClick={() => {
            goToPreviousPage();
          }}
          disabled={currentPage === 1}
          style={{ minWidth: 60, padding: '5px 10px',borderRadius:"5px" }}
        >
          Prev
        </button>

        {/* Page Number Buttons */}
        {pages}

        {/* Next Button */}
        <button
          onClick={() => {
            goToNextPage();
          }}
          disabled={currentPage === contacttotalPages}
          style={{ minWidth: 60, padding: '5px 10px',borderRadius:"5px" }}
        >
          Next
        </button>
      </div>
    );
  };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
          lineHeight:"0px"
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
    const exportToExcel = () => {
      const filteredData = data.map(({ title,first_name, last_name,mobile_no,email,h_no,street_address,city,source,team,owner,tags,designation,company_name }) => ({ title,first_name, last_name,mobile_no,email,h_no,street_address,city,source,team,owner,tags,designation,company_name }));
      // Create a new workbook
      const workbook = utils.book_new();
  
      // Convert data to a worksheet
      const worksheet = utils.json_to_sheet(filteredData);
  
      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Export the workbook to an Excel file
      writeFile(workbook, "table_data.xlsx");
    };

/*-------------------------------------------------------------------pagination,mui table and export to excel end---------------------------------------------------------------------------- */                                                     
    


    const [show2, setshow2] = useState(false);
    const[data2,setdata2]=useState([])
    const handleClose2 = () => setshow2(false);
    const[educationdata,seteducationdata]=useState([])
    const[degreedata,setdegreedata]=useState([])
    const[schooldata,setschooldata]=useState([])
    const handleShow2=(item)=>
    {
      setshow2(true);
      setdata2(item)
      seteducationdata(item.education)
      setdegreedata(item.degree)
      setschooldata(item.school_college)
    }
   
  

//========================================== send code start========================================================================
    
    const[emails,setemails]=useState([])
    const [show3, setshow3] = useState(false);
  
    const handleClose3 = () => setshow3(false);
    const handleShow3 = async () => {
      setshow3(true);
  
      const currentDateTime = new Date().toISOString(); // Get the current date and time
  
      const updatedData = await Promise.all(
        selectedItems.map(async (item) => {
          const resp1 = await api.get(`viewcontactbyid/${item}`); // Use ID to search contact
          const emailData = resp1.data.contact.email;

          
          await api.put(`updatecontact/${item}`, {
            lastcommunication: currentDateTime,
          });
  
          // Add the email to the emails array
          setemails((prevEmails) => [...prevEmails, emailData]);
  
          // Update the lastcommunication field for each item in the data
          return {
            ...data.find((contact) => contact._id === item),
            lastcommunication: currentDateTime,
          };
        })
      );
  
      // Update the data state with the new lastcommunication values
      setdata((prevData) =>
        prevData.map((contact) =>
          updatedData.find((updatedContact) => updatedContact._id === contact._id) ||
          contact
        )
      );
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

            const handlemailmessage=(value)=>
              {
                setmessage(value)
              }

              const modules1 = {
                toolbar: {
                  container: "#custom-toolbar"
                }
              };

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
            };

              const [selectedOptions, setSelectedOptions] = useState([]);
            
              const handleSelectChange = (event) => {
                const selectedValues = event.target.value;
                setSelectedOptions(selectedValues);
            
                // Update the subject with selected field values from the lead object
                const updatedSubject = selectedValues
                  .map((field) => {
                    switch (field) {
                      case "name":
                        // return lead.title + " " + lead.first_name + " " + lead.last_name;
                      case "mobile":
                        // return lead.mobile_no;
                      case "city":
                        // return lead.city;
                        case "email":
                          // return lead.email;
                          case "company":
                            // return lead.company_name;
                            case "designation":
                              // return lead.designation;
                      default:
                        return "";
                    }
                  })
                  .join(", "); // Join selected fields with a comma and space
                setsubject(updatedSubject); // Set the subject with the dynamically updated value
              };
            


            const sendmail=async(e)=>
              {
                e.preventDefault();
                const formData = new FormData();
    
    // Add the subject, message, and recipient email to form data
                    formData.append('subject', subject);
                    formData.append('message', message);
                    formData.append('emails', emails);
                    
                    // Append the files to form data
                    attachments.forEach((file) => {
                      formData.append('attachments', file);
                    });
                try {
                  
                  const resp=await api.post(`contact/sendmail`,formData)
                  if(resp.status===200)
                  {
                    toast.success("Mail Sent Successfully",{ autoClose: 2000 })
                    setTimeout(() => {
                      navigate('/contactdetails')
                    }, 2000);
                    setTimeout(() => {
                      setshow3(false)
                    }, 2000);
                  }
                 
                } catch (error) {
                  toast.error(error.response.data,{ autoClose: 2000 });
                }
              }
        
              const sendmailfunction=()=>
                {
                  document.getElementById("sendmail").style.display="flex"
                  document.getElementById("sendmessage").style.display="none"
                  document.getElementById("sendwhatsapp").style.display="none"
    
                  document.getElementById("sendmessage1").style.color="black"
                  document.getElementById("sendmessage1").style.backgroundColor="white"
                  document.getElementById("sendwhatsapp1").style.color="black"
                  document.getElementById("sendwhatsapp1").style.backgroundColor="white"
    
                  document.getElementById("sendmail1").style.backgroundColor="black"
                  document.getElementById("sendmail1").style.color="white"
                  document.getElementById("sendmail1").style.borderRadius="50px"
                  document.getElementById("sendmail1").style.width="100px"
                  document.getElementById("sendmail1").style.textAlign="center"
                }
                const sendmessagefunction=()=>
                  {
                    document.getElementById("sendmail").style.display="none"
                    document.getElementById("sendmessage").style.display="flex"
                    document.getElementById("sendwhatsapp").style.display="none"
      
                    document.getElementById("sendmail1").style.color="black"
                    document.getElementById("sendmail1").style.backgroundColor="white"
                    document.getElementById("sendwhatsapp1").style.color="black"
                    document.getElementById("sendwhatsapp1").style.backgroundColor="white"
      
                    document.getElementById("sendmessage1").style.backgroundColor="black"
                    document.getElementById("sendmessage1").style.color="white"
                    document.getElementById("sendmessage1").style.borderRadius="50px"
                    document.getElementById("sendmessage1").style.width="150px"
                    document.getElementById("sendmessage1").style.textAlign="center"
                  }
    
                  const sendwhatsappfunction=()=>
                    {
                      document.getElementById("sendmail").style.display="none"
                      document.getElementById("sendmessage").style.display="none"
                      document.getElementById("sendwhatsapp").style.display="flex"
        
                      document.getElementById("sendmail1").style.color="black"
                      document.getElementById("sendmail1").style.backgroundColor="white"
                      document.getElementById("sendmessage1").style.color="black"
                      document.getElementById("sendmessage1").style.backgroundColor="white"
        
                      document.getElementById("sendwhatsapp1").style.backgroundColor="black"
                      document.getElementById("sendwhatsapp1").style.color="white"
                      document.getElementById("sendwhatsapp1").style.borderRadius="50px"
                      document.getElementById("sendwhatsapp1").style.width="150px"
                      document.getElementById("sendwhatsapp1").style.textAlign="center"
                    }


// ========================================send code end==================================================================================


    const formatRelativeDate = (date) => {
      const now = new Date();
      const communicationDate = new Date(date);
      const differenceInTime = now - communicationDate;
      const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    
      if (differenceInDays === 0) return 'Today';
      if (differenceInDays === 1) return '1 day ago';
      return `${differenceInDays} days ago`;
    };

    // const[message,setmessage]=useState("")
    
 

/*-------------------------------------------------------------------custome table settings start---------------------------------------------------------------------------- */                                                     
      
 
const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'personaldetails', name: 'Personal_Details' },
        { id: 'address', name: 'Address' },
        { id: 'professionaldetails', name: 'Professional_Details' },
        { id: 'tags', name: 'Tags' },
        { id: 'source', name: 'Source' },
        { id: 'lastcommunication', name: 'Last_Communication' },
        { id: 'actionable', name: 'Actionable' },
        { id: 'ownership', name: 'Ownership' },
        { id: 'createdAt', name: 'Add_On' },
        { id: 'mobile_type', name: 'Mobile_Type' },
        { id: 'email_type', name: 'Email_Type' },
        { id: 'designation', name: 'Designation' },
        { id: 'company_name', name: 'Company_Name' },
      
        { id: 'father_husband_name', name: 'Father/Husband Name' },
        { id: 'h_no', name: 'House_No' },
        { id: 'area1', name: 'Street Address' },
        { id: 'location1', name: 'Location' },
        { id: 'city1', name: 'City' },
        { id: 'pincode1', name: 'Pincode' },
        { id: 'state1', name: 'State' },
        { id: 'country1', name: 'Country' },
       
        { id: 'category', name: 'Category' },
        { id: 'profession_category', name: 'Profession Category' },
        { id: 'profession_subcategory', name: 'Profession Sub-Category' },
        { id: 'company_name', name: 'Company Name' },
        { id: 'country_code1', name: 'Country Code' },
        { id: 'company_phone', name: 'Company Phone' },
        { id: 'company_email', name: 'Company Email' },
   
        { id: 'team', name: 'Team' },
        { id: 'gender', name: 'Gender' },
        { id: 'visible_to', name: 'Visible To' },
        { id: 'maritial_status', name: 'Marital Status' },
        { id: 'birth_date', name: 'Birth Date' },
        { id: 'anniversary_date', name: 'Anniversary Date' },
        { id: 'education', name: 'Education' },
        { id: 'degree', name: 'Degree' },
        { id: 'school_college', name: 'School/College' },
        { id: 'loan', name: 'Loan' },
        { id: 'bank', name: 'Bank' },
        { id: 'amount', name: 'Amount' },
        { id: 'social_media', name: 'Social Media' },
        { id: 'url', name: 'URL' },
        { id: 'income', name: 'Income' },
        { id: 'amount1', name: 'Amount 1' },
        { id: 'document_no', name: 'Document No' },
        { id: 'document_name', name: 'Document Name' },
        { id: 'industry', name: 'Industry' },
        { id: 'area', name: 'Company Address' },
        { id: 'location', name: 'Company Location' },
        { id: 'city', name: 'Company City' },
        { id: 'pincode', name: 'Company Pincode' },
        { id: 'state', name: 'Company State' },
        { id: 'country', name: 'Company Country' },
        { id: 'company_social_media', name: 'Company Social Media' },
        { id: 'company_url', name: 'Company Url' },
        { id: 'descriptions', name: 'Descriptions' },
        { id: 'relation', name: 'Relation' }
      ];


      const formatDate = (isoString) => {
        if (!isoString) return "-"; // Fallback for missing date
        const date = new Date(isoString);
        const localDate = date.toLocaleDateString();
        const localTime = date.toLocaleTimeString();
        return (
          <>
            <div>{localDate}</div>
            <div>{localTime}</div>
          </>
        );
      };

      const formatDate1 = (isoString) => {
        if (!isoString) return "-"; // Fallback for missing date
        const date = new Date(isoString);
        const localDate = date.toLocaleDateString();
        const localTime = date.toLocaleTimeString();
        return (
          <>
            <div>{localDate}</div>
            <div>{localTime}</div>
          </>
        );
      };


      
      
      const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 10));
      const [showColumnList, setShowColumnList] = useState(false);

      const handleAddColumnClick = () => {
        setShowColumnList(!showColumnList);
      };
    
      const handleCheckboxChange = (column) => {
        if (visibleColumns.some((col) => col.id === column.id)) {
          // Remove column from visibleColumns if it's already present
          setVisibleColumns(visibleColumns.filter((col) => col.id !== column.id));
        } else {
          // Add column to visibleColumns
          setVisibleColumns([...visibleColumns, column]);
        }
      };
      const handleSelectAll = () => {
 
        setSelectAll(!selectAll);
        if (!selectAll) {
          // Add all current page item IDs to selectedItems
          setSelectedItems(currentItems.map((item) => item._id));
        } else {
          // Deselect all
           setSelectedItems([]);
   
        }
      };
    
      const handleRowSelect = (id) => {
     
        if (selectedItems.includes(id)) {
          setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
          setSelectedItems([...selectedItems, id]);
      
        }
      };

   
      
    /*-------------------------------------------------------------------custome table end---------------------------------------------------------------------------- */                                                     
    
    
    const [isFlipped, setIsFlipped] = useState(false);

  const pagereload = () => {
    // Flip effect for contactlistview to companylistview
    setIsFlipped(true);
    setTimeout(() => {
      document.getElementById("contactlistview").style.display = "none";
      document.getElementById("companylistview").style.display = "block";
    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
  };

  const pagereload2 = () => {
    // Flip effect for companylistview to contactlistview
    setIsFlipped(false);
    setTimeout(() => {
      document.getElementById("contactlistview").style.display = "block";
      document.getElementById("companylistview").style.display = "none";
    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
  };

 /*-------------------------------------------------------------------updation start---------------------------------------------------------------------------- */                                                     

 const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[],mobile_no:[],mobile_type:[],action1:[],
  email:[],email_type:[],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

  profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
  company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[],company_url:[],action3:[],

  father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
  birth_date:"",anniversary_date:"",education:[],degree:[],school_college:[],action4:[],loan:[],bank:[],amount:[],action5:[],
  social_media:[],url:[],action6:[],income:[],amount1:[],action7:[],document_no:[],document_name:[],document_pic:[],action8:[]});

       const time=new Date()
    
        const [show1, setshow1] = useState(false);

        const handleClose1 = () => setshow1(false);
        const[data1,setdata1]=useState([])
        const handleShow1=async()=>
        {
          if(selectedItems.length===1)
          {
            try {
              const resp=await api.get(`viewcontactbyid/${selectedItems}`)//here search contact by id
              setshow1(true);
             
              
              setcontact(resp.data.contact)
              setdata1(resp.data.contact)
            } catch (error) {
              console.log(error);
            }
          }
          else
          {
            toast.error("please select only one")
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

             // Show confirmation message
             const result = await Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, update it!",
            });
        
            if (!result.isConfirmed) {
              return; // Stop execution if user cancels
            }

            const resp=await api.put(`updatecontact/${id}`,contact,config)
            toast.success("contact updated",{ autoClose: 2000 })
            // setTimeout(() => {
            //   navigate('/contactdetails')
            // }, 2000);
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        }

        //======================================= update contact end===========================================================

        const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

      
const handleSort = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  
  const sortedData = [...data].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  setSortConfig({ key, direction });
  setdata(sortedData)
};

// ===============================================filter code start==================================================================

      const [show, setShow] = useState(false);
                const [isClosing, setIsClosing] = useState(false);
                const toastRef = useRef(null);

                    const toggleToast = async() => {
                      setShow(true);
                    };


              const handleCancel = () => {
                setIsClosing(true); // trigger slide-out
                setTimeout(() => {
                  setShow(false);     // hide the toast completely
                  setIsClosing(false); // reset for next open
                }, 500); // duration should match animation time
              };

              const handleResetFilters = () => {
              setSelectedProfessions([]);        // Clear profession selections
              setselectfield({});                // Clear custom field filters
            };


const professions = [
  'Self Employed', 
  'Business Man', 
  'Govt. Employee', 
  'Private Job', 
  'Retired', 
  'Student', 
  'House Wife'
];

        
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
 
    const filterRef = useRef();

    const [activeTab, setActiveTab] = useState('profession');


const enhancedInputStyle = {
  display: 'block',
  marginTop: '6px',
  marginLeft: '20px',
  width: '85%',
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '14px',
  transition: '0.3s ease',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  background: '#fff',
  color: '#333'
};



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowDropdown(false); // close the filter box
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlefilterCheckboxChange = (profession) => {
    const updatedSelections = selectedProfessions.includes(profession)
      ? selectedProfessions.filter((p) => p !== profession)
      : [...selectedProfessions, profession];
    setSelectedProfessions(updatedSelections);
    
    // Filter the data based on selected professions
   const newFilteredData = filteredData.filter((item) =>
      updatedSelections.length === 0 || updatedSelections.includes(item.profession_category)
    );
    setdata(newFilteredData);
  };

 
  const contactfields = [
    { label: 'First Name', field: 'first_name' },
    { label: 'Last Name', field: 'last_name' },
    { label: 'Mobile No.', field: 'mobile_no' },
    { label: 'Email Id', field: 'email' },
    { label: 'Tags', field: 'tags' },
    { label: 'Source', field: 'source' },
    { label: 'Owner', field: 'owner' },
    { label: 'City', field: 'city1' },
    { label: 'State', field: 'state1' },
    { label: 'Pincode', field: 'pincode1' },
    { label: 'From Date', field: 'from_date' }, // Added field for from date
    { label: 'To Date', field: 'to_date' }
  ];
  

  const [showDropdown2, setShowDropdown2] = useState(false);
  const [selectfield, setselectfield] = useState([]);

   // Handle checkbox toggle
   const handlefilterCheckboxChange1 = (field) => {
    setselectfield(prev => {
      if (prev.hasOwnProperty(field)) {
        // Remove the field
        const { [field]: _, ...rest } = prev;
        return rest;
      } else {
        // Add the field with empty value
        return { ...prev, [field]: '' };
      }
    });
  };

    // Handle input change for filtering values
    const handleFieldInputChange = (field, value) => {
      setselectfield((prev) => ({
        ...prev,
        [field]: value,
      }));
    };


    useEffect(() => {
      const formatDate = (date) => new Date(date).toISOString().split("T")[0];
    
      const filtered = filteredData.filter(contact => {
        const matchesTextFilters = Object.keys(selectfield).every(field => {
          if (field === 'from_date' || field === 'to_date') return true;
          const value = selectfield[field]?.toLowerCase();
          const contactValue = contact[field]?.toString().toLowerCase() || '';
          return !value || contactValue.includes(value);
        });
    
        const contactDate = formatDate(contact.createdAt);
        const from = selectfield.from_date;
        const to = selectfield.to_date;
    
        const isAfterFromDate = !from || contactDate >= from;
        const isBeforeToDate = !to || contactDate <= to;
    
        return matchesTextFilters && isAfterFromDate && isBeforeToDate;
      });
    
      setdata(filtered);
    }, [selectfield, filteredData]);
    
    
    
    
  


//================================================== filter code end==================================================================



  const [currentPage1, setCurrentPage1] = useState(1);
const [itemsPerPage1, setItemsPerPage1] = useState(8); // User-defined items per page
const indexOfLastItem1 = currentPage1 * itemsPerPage1;
const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
const currentItems1 = cdata.slice(indexOfFirstItem1, indexOfLastItem1);
const totalPages1 = Math.ceil(cdata.length / itemsPerPage1);

  // Handle items per page change
  const handleItemsPerPageChange1 = (e) => {
    setItemsPerPage1(Number(e.target.value));
    setCurrentPage1(1); // Reset to first page whenever items per page changes
  };

// Function to handle page changes
const paginate1 = (pageNumber) => setCurrentPage1(pageNumber);

// Function to handle "Next" and "Previous" page changes
const goToNextPage1 = () => {
  if (currentPage1 < totalPages1) {
    setCurrentPage1(currentPage1 + 1);
  }
};

const goToPreviousPage1 = () => {
  if (currentPage1 > 1) {
    setCurrentPage1(currentPage1 - 1);
  }
};

const renderPageNumbers1 = () => {
  // Define the range of page numbers to display
  const maxPageNumbersToShow1 = 5;
  const startPage1 = Math.max(1, currentPage1 - Math.floor(maxPageNumbersToShow1 / 2));
  const endPage1 = Math.min(totalPages1, startPage1 + maxPageNumbersToShow1 - 1);
  
  return (
    <div
      style={{
        display: 'flex',
       
        whiteSpace: 'nowrap',
        padding: '10px-15px',
        maxWidth: '100%', 
        position: 'relative'
      }}
    >
      {/* Previous Button */}
      {currentPage1 > 1 && (
        <button onClick={goToPreviousPage1} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {Array.from({ length: endPage1 - startPage1 + 1 }, (_, i) => startPage1 + i).map((number) => (
        <button
          key={number}
          onClick={() => paginate1(number)}
          style={{
            width: '30px',
            borderRadius: '5px',
            marginRight: '5px',
            flexShrink: 0, // Prevent buttons from shrinking
            backgroundColor: number === currentPage ? 'lightblue' : 'white',
          }}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      {currentPage1 < totalPages1 && (
        <button onClick={goToNextPage1} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Next
        </button>
      )}
    </div>
  );
};


  const allcompanyColumns = [
                  
    { id: 'sno', name: '#' },
    { id: 'personaldetails', name: 'Personal Details' },
    { id: 'address', name: 'Address' },
    { id: 'employees', name: 'Employees' },
    { id: 'company_type', name: ' Category' },
    { id: 'source', name: 'Source ' },
    { id: 'team', name: 'Team ' },
    { id: 'owner', name: 'Ownership' },
    { id: 'createdAt', name: 'Add On ' },
  
    { id: 'mobile_type1', name: 'Mobile Type' },
    { id: 'email_type1', name: 'Email Type' },
 
    { id: 'profession_subcategory', name: 'Profession Subcategory' },
    { id: 'gst_no', name: 'Gst No' },
    { id: 'industry', name: 'Industry ' },
    
    
    { id: 'visible_to', name: 'Visible To' },
    { id: 'area', name: 'Area' },
    { id: 'location', name: 'Location' },
    { id: 'pin_code', name: 'Pin Code' },
    { id: 'state', name: 'State' },
    { id: 'country', name: 'Country' },
    { id: 'website', name: 'Website ' },
    { id: 'company_social_media1', name: 'Company Social Media' },
    { id: 'company_url1', name: 'Company Url ' },
    { id: 'descriptions', name: 'Descriptions  ' },
  ];
  const [selectedItems1, setSelectedItems1] = useState([]); // To track selected rows
  const [selectAll1, setSelectAll1] = useState(false); // To track the state of the "Select All" checkbox
  const [visibleColumns1, setVisibleColumns1] = useState(allcompanyColumns.slice(1, 9));
  const [showColumnList1, setShowColumnList1] = useState(false);

  const handleAddColumnClick1 = () => {
    setShowColumnList1(!showColumnList1);
  };

  const handleCheckboxChange1 = (column) => {
    if (visibleColumns1.some((col) => col.id === column.id)) {
      // Remove column from visibleColumns if it's already present
      setVisibleColumns1(visibleColumns1.filter((col) => col.id !== column.id));
    } else {
      // Add column to visibleColumns
      setVisibleColumns1([...visibleColumns1, column]);
    }
  };
  const handleSelectAll1 = () => {

    setSelectAll1(!selectAll1);
    if (!selectAll1) {
      // Add all current page item IDs to selectedItems
      setSelectedItems1(currentItems1.map((item) => item._id));
    } else {
      // Deselect all
       setSelectedItems1([]);

    }
  };

  const handleRowSelect1 = (id) => {
 
    if (selectedItems1.includes(id)) {
      setSelectedItems1(selectedItems1.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems1([...selectedItems1, id]);
  
    }
  };
  const [isFlashing, setIsFlashing] = useState(false);
  const handleFocus = () => {
    setIsFlashing(true); // Start the flash effect when focused
    
  };

  const handleBlur = () => {
    setIsFlashing(false); // Remove the flash effect when focus is lost
  };


const mergeAndSave = async (selectedItems) => {
  try {
    // Fetch data for each selected item asynchronously
    const fetchedData = await Promise.all(
      selectedItems.map(async (item) => {
        const response = await api.get(`viewcontactbyid/${item}`);
        return response.data.contact; // Assuming response.data contains the contact data
      })
    );

    // Merge the fetched data
    const mergedData = fetchedData.reduce((acc, item) => {
      Object.keys(item).forEach((key) => {
        if (!acc[key]) {
          // If the key doesn't exist in acc, add it directly
          acc[key] = item[key];
        } else {
          // Concatenate strings or merge arrays without duplicates
          if (typeof acc[key] === 'string' && typeof item[key] === 'string') {
            acc[key] = `${acc[key]} ${item[key]}`;
          } else if (Array.isArray(acc[key]) && Array.isArray(item[key])) {
            acc[key] = [...new Set([...acc[key], ...item[key]])];
          }
        }
      });
      return acc;
    }, {});

    

    // Save the merged data to the API
    const resp=await api.post('addcontact', mergedData,config);
    if(resp.status===200)
      {
        toast.success("Contact data merged and saved Successfully",{ autoClose: 2000 })
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      
      }
 
    
    return mergedData; // Return if you need to use it further
  } catch (error) {
    console.error("Error merging and saving data:", error);
    toast.error('Failed to merge and save data.');
  }
};


useEffect(()=>
  {
    if(selectedItems.length===0)
      {
        document.getElementById("delete").style.display="none"
        document.getElementById("edit").style.display="none"
      // document.getElementById("mail").style.display="none"
      //  document.getElementById("whatsapp").style.display="none"
      //     document.getElementById("message").style.display="none"
           document.getElementById("sendall").style.display="none"
          document.getElementById("call").style.display="none"
          document.getElementById("addtask").style.display="none"
          document.getElementById("addtolead").style.display="none"
          document.getElementById("transfercontact").style.display="none"
          document.getElementById("sequence").style.display="none"
          document.getElementById("mergecontact").style.display="none"
         document.getElementById("search").style.display="flex"
      }
    if(selectedItems.length===1)
      {
        document.getElementById("delete").style.display="inline-block"
        document.getElementById("edit").style.display="inline-block"
      // document.getElementById("mail").style.display="inline-block"
      //  document.getElementById("whatsapp").style.display="inline-block"
      //     document.getElementById("message").style.display="inline-block"
             document.getElementById("sendall").style.display="inline-block"
          document.getElementById("call").style.display="inline-block"
          document.getElementById("addtask").style.display="inline-block"
          document.getElementById("addtolead").style.display="inline-block"
          document.getElementById("transfercontact").style.display="inline-block"
          document.getElementById("sequence").style.display="inline-block"
          document.getElementById("mergecontact").style.display="none"
         document.getElementById("search").style.display="none"
      }
      if(selectedItems.length===2)
        {
       

          document.getElementById("delete").style.display="inline-block"
          document.getElementById("edit").style.display="none"
        // document.getElementById("mail").style.display="inline-block"
        //  document.getElementById("whatsapp").style.display="inline-block"
        //     document.getElementById("message").style.display="inline-block"
              document.getElementById("sendall").style.display="inline-block"
            document.getElementById("call").style.display="none"
            document.getElementById("addtask").style.display="none"
            document.getElementById("addtolead").style.display="none"
            document.getElementById("transfercontact").style.display="inline-block"
            document.getElementById("sequence").style.display="inline-block"
            document.getElementById("mergecontact").style.display="inline-block"
           document.getElementById("search").style.display="none"
        }

        if(selectedItems.length>2)
          {
            document.getElementById("delete").style.display="inline-block"
            document.getElementById("edit").style.display="none"
          // document.getElementById("mail").style.display="inline-block"
          //  document.getElementById("whatsapp").style.display="inline-block"
          //     document.getElementById("message").style.display="inline-block"
              document.getElementById("call").style.display="none"
                    document.getElementById("sendall").style.display="inline-block"
              document.getElementById("addtask").style.display="none"
              document.getElementById("addtolead").style.display="none"
              document.getElementById("transfercontact").style.display="inline-block"
              document.getElementById("sequence").style.display="inline-block"
              document.getElementById("mergecontact").style.display="none"
             document.getElementById("search").style.display="none"
          }
          if(selectedItems1.length===0)
            {
              document.getElementById("companydelete").style.display="none"
              document.getElementById("companyedit").style.display="none"
            document.getElementById("companymail").style.display="none"
             document.getElementById("companywhatsapp").style.display="none"
                document.getElementById("companymessage").style.display="none"
                document.getElementById("companycall").style.display="none"
             
                document.getElementById("companysequence").style.display="none"
              
               document.getElementById("companysearch").style.display="flex"
            }
            if(selectedItems1.length===1)
              {
                document.getElementById("companydelete").style.display="inline-block"
                document.getElementById("companyedit").style.display="inline-block"
              document.getElementById("companymail").style.display="inline-block"
               document.getElementById("companywhatsapp").style.display="inline-block"
                  document.getElementById("companymessage").style.display="inline-block"
                  document.getElementById("companycall").style.display="inline-block"
               
                  document.getElementById("companysequence").style.display="inline-block"
                
                 document.getElementById("companysearch").style.display="none"
              }
              if(selectedItems1.length>1)
                {
                  document.getElementById("companydelete").style.display="inline-block"
                  document.getElementById("companyedit").style.display="none"
                document.getElementById("companymail").style.display="inline-block"
                 document.getElementById("companywhatsapp").style.display="inline-block"
                    document.getElementById("companymessage").style.display="inline-block"
                    document.getElementById("companycall").style.display="none"
                 
                    document.getElementById("companysequence").style.display="inline-block"
                  
                   document.getElementById("companysearch").style.display="none"
                }

  },[selectedItems,selectedItems1])


  const [developer,setdeveloper]=useState({name:"",country_code1:[''],mobile_no1:[''],mobile_type1:[''],action11:[],email1:[''],email_type1:[''],
    action22:[],company_type:"",industry:"",descriptions:"",gst_no:"",
    source:"",team:"",owner:"",visible_to:"",area:"",location:"",city:"",pin_code:"",state:"",country:"",website:"",company_social_media1:[''],
    company_url1:[''],action33:[],employee:[]});


  const [show4, setshow4] = useState(false);

        const handleClose4 = () => setshow4(false);
        
        const[cdata1,setcdata1]=useState([])
        const handleShow4=async()=>
        {
          if(selectedItems1.length===1)
          {
            setshow4(true);
            try {
              const resp=await api.get(`viewcompanybyid/${selectedItems1}`)
          
              
               setdeveloper(resp.data.developer)
              // setdata1(resp.data.contact)
            } catch (error) {
              console.log(error);
            }
          }
          else
          {
            toast.error("please select only one")
          }
         
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


              
              const updatecompany=async()=>
                {
                  try {
                
                    const resp=await api.put(`updatecompany/${selectedItems1}`,developer)
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

                const deleteSelectedItems1 = async () => {
                  try {
                    if(selectedItems.length1===0)
                    {
                      toast.error("please select first",{autoClose:"2000"})
                      return
                    }
                    const resp = selectedItems1.map(async (itemId) => {
                      await api.delete(`removecompany/${itemId}`);
                    });
                    
                    toast.success('Selected items deleted successfully',{autoClose:"2000"})
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  } catch (error) {
                    console.log(error);
                  }
                };
     
                
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


  const [leadinfo,setleadinfo]=useState({title:"Mr.",first_name:"",last_name:"",country_code:[''],mobile_no:[''],mobile_type:[''],action11:[],
        email:[''],email_type:[''],action22:[],tags:"",descriptions:"",stage:"",lead_type:"",owner:[],team:"",visible_to:"",campaign:"",source:"",
        sub_source:"",channel_partner:"",intrested_project:"",
        requirment:"",property_type:[],purpose:"",nri:"",sub_type:[],unit_type:[],budget_min:"",budget_max:"",minimum_area:"",
        maximum_area:"",area_metric:"Sq Yard",search_location:"",street_address:"",range:"",range_unit:"",city2:"",area2:[],block:[],pincode2:"",country2:"",state2:"",
        lattitude:"",longitude:"",country3:"",state3:"",city3:"",area_project:[],block3:[],specific_unit:"",specific_unitdetails:"",funding:"",timeline:"",facing:[],road:[],direction:[],transaction_type:"",
        unit_type2:"",white_portion:"",furnishing:"",
        profession_category:[],profession_subcategory:[],designation:"",company_name:"",country_code1:"",company_phone:"",
        company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

        father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
        social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[],
        matcheddeals:[],matchingdeal:"",})


                 const requirment=["Buy","Rent","Lease"];
                 const transaction_type=["Full White","Collecter Rate","Flexiable"];
                 const furnishing=["Furnished","Unfurnished","Semi Furnished"];
                 const funding=["Home Loan","Self Funding","Loan Against Property","Personal Loan","Business Loan"]
                 const timeline=["Urgent","More then 1 month","Not Confirmed","Within 15 days"]

                                const options = {
                                                property_type: ["Residential", "Commercial","Agricultural","Industrial","Institutional"],
                                                sub_type: {
                                                  Residential: ["PLOT", "INDEPENDENT HOUSE","FLAT/APARTMENT","BUILDER FLOOR"],
                                                  Commercial: ["SHOP", "SHOWROOM","OFFICE SPACE","RETAIL STORE","SOHO","EXCUTIVE ROOM","MULTIPLEX","VIRTUAL SPACE","PLOT"],
                                                  Agricultural: ["LAND", "FARM HOUSE"],
                                                  Industrial: ["PLOTS", "WAREHOUSE","COLD STORAGE","RICE SELLER","BUILDING","FACTORY"],
                                                  Institutional: ["SCHOOL", "HOTEL","UNIVERSITIES","HOSPITAL","COLLEGE"]
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
                };
                
                const handleSubcategoryChange = (event) => {
                  const selectedSubcategories = event.target.value;
                
                  // Update subcategories and dependent unit types
                 
                  setleadinfo((prevLead) => ({
                    ...prevLead,
                    sub_type: selectedSubcategories,
                    unit_type: [], // Ensure uniqueness
                  }));
                };
                const getAvailableSubcategories = () => {
                  return (leadinfo.property_type || []).flatMap((cat) => options.sub_type[cat] || []);
                };
                
                
                const handleUnitTypeChange = (event) => {
                  const selectedUnitTypes = event.target.value;
                  setleadinfo((prevLead) => ({
                    ...prevLead,
                    unit_type: selectedUnitTypes,
                  }));
                };
                
                const getAvailableunittype = () => {
                  // Step 1: Ensure leadinfo.sub_type is always an array
                  let availableOptions = (leadinfo.sub_type || []).flatMap((cat) => options.unit_type[cat] || []);
                  
                  // Step 2: Remove duplicates by using Set and return unique options
                  return Array.from(new Set(availableOptions));
                };
                


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
                
                  // Filter max budget options based on selected min budget
                  const filteredarea = leadinfo.minimum_area
                    ? areaoptions.filter((option) => option.value >= leadinfo.minimum_area)
                    : areaoptions;


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
                      WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"],
                      "Andaman And Nicobar Islands": ["Port Blair", "Car Nicobar", "Mayabunder", "Diglipur", "Rangat"],
                      Chandigarh: ["Chandigarh"],
                      "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
                      "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Doda", "Gulmarg", "Kathua", "Poonch", "Rajouri", "Udhampur"],
                      Ladakh: ["Leh", "Kargil"],
                      Lakshadweep: ["Kavaratti", "Andrott", "Kalapeni", "Minicoy", "Agatti", "Kadmat", "Chetlat"],
                      Puducherry: ["Puducherry", "Karaikal","Mahe","Yanam"],
                    };

  const states = Object.keys(statesAndCities);
  const cities = statesAndCities[contact.state1] || [];

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
    }
  } else {
    // Handle individual selections/deselections
    const selectedfacing = typeof value === 'string' ? value.split(',') : value;
    setfacings(selectedfacing); // Update selected facings
    setleadinfo({ ...leadinfo, facing: selectedfacing }); // Update facing in leadinfo
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
    }
  } else {
    // Handle individual selections/deselections
    const selectedroad = typeof value === 'string' ? value.split(',') : value;
    setroads(selectedroad); // Update selected roads
    setleadinfo({ ...leadinfo, road: selectedroad }); // Update road in leadinfo
  }
};


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
    }
  } else {
    // If individual items are selected/deselected
    const selectedmatcheddeal = typeof value === 'string' ? value.split(',') : value;
    setmatcheddeals(selectedmatcheddeal); // Update selected deals
    setleadinfo({ ...leadinfo, matched_deal: selectedmatcheddeal }); // Update matched_deal with selected options
  }
};

const direction=["East","West","North","South","North East","South East","South West","North West"];      
 
const [directions, setdirections] = useState([]);

const handledirectionChange = (event) => {
  const {
    target: { value },
  } = event;

  if (value.includes('select-all')) {

    if (directions.length === direction.length) {
      setdirections([]);
      setleadinfo({ ...leadinfo, direction: [] }); 
    } else {
      setdirections(direction);
      setleadinfo({ ...leadinfo, direction: direction });
    }
  } else {
    const selecteddirections = typeof value === 'string' ? value.split(',') : value;
    setdirections(selecteddirections); 
    setleadinfo({ ...leadinfo, direction: selecteddirections }); 
  }
};

const propertyunittype=["Two Side Open","Three Side Open","Ordinary","Corner"];      

const [propertyunitstypes, setpropertyunitstypes] = useState([]);

const handlepropertyunitstypesChange = (event) => {
  const {
    target: { value },
  } = event;

  if (value.includes('select-all')) {

    if (propertyunitstypes.length === propertyunittype.length) {
      setpropertyunitstypes([]);
      setleadinfo({ ...leadinfo, unit_type2: [] }); 
    } else {
      setpropertyunitstypes(propertyunittype);
      setleadinfo({ ...leadinfo, unit_type2: propertyunittype });
    }
  } else {
    const selectedpropertyunittype = typeof value === 'string' ? value.split(',') : value;
    setpropertyunitstypes(selectedpropertyunittype); 
    setleadinfo({ ...leadinfo, unit_type2: selectedpropertyunittype }); 
  }
};


const [progress, setProgress] = useState(leadinfo.white_portion || 0); // Initialize with deal.whiteportion

const handleMouseMove = (e) => {
  const progressBar = e.target.getBoundingClientRect();
  const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
  const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
  setProgress(clampedProgress);
  setleadinfo((prevLead) => ({ ...prevLead, white_portion: clampedProgress })); // Update deal.whiteportion
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

                const [show5, setshow5] = useState(false);

                const handleClose5 = () => setshow5(false);
                
                // const handleShow5=async()=>
                // {
                //   if(selectedItems.length===1)
                //   {
                //     try {
                //       const resp=await api.get(`viewcontactbyid/${selectedItems}`)//here search contact by id
                //       setshow5(true);
                    
                    
                //     } catch (error) {
                //       console.log(error);
                //     }
                //   }
                //   else
                //   {
                //     toast.error("please select only one")
                //   }
                 
                // }

                const handleShow5 = async () => {
                  // const navigate = useNavigate(); // Initialize navigate
                  setshow5(true);
                  try {
                    const resp1 = await api.get(`viewcontactbyid/${selectedItems}`);
                    // Assuming resp1.data.contact.mobile_no is an array, we take the first element
                      const contact = resp1.data.contact;
                      setleadinfo(contact);  // Set the lead info with the updated mobile_no
                  
                  } catch (error) {
                    console.error("Error fetching lead data:", error);
                  }
                };


                const[data11,setdata11]=useState([]);
                const fetchdatabyprojectcityname=async()=>
                {
                  
                  try {
                    const city=leadinfo.city3
                    const resp=await api.get(`viewprojectbycityname/${city}`)
                    setdata11(resp.data.project)
                  } catch (error) {
                    console.log(error);
                  }
                }
                useEffect(() => {
                  fetchdatabyprojectcityname()
                }, [leadinfo.city3]);

                const allproject =[]
                data11.map((item)=>
                (
                    allproject.push(item.name)
                ))

                const [units, setunits] = useState([]);
              
                const [allblocks, setallblocks] = useState([]);
              
              
                const fetchdatabyprojectname = async (projectNames) => {
                  try {
                    // Initialize a temporary array to hold all fetched units
                    const allUnits = [];
                
                    // Fetch the data sequentially for each project
                    for (const projectName of projectNames) {
                      const resp = await api.get(`viewprojectbyname/${projectName}`);
                      const allFetchedUnits = resp.data.project; // Assuming resp.data.project is an array of units
                      allUnits.push(...allFetchedUnits); // Accumulate the fetched units
                    }
                
                    // Update the state with the accumulated units
                    setunits(allUnits);
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
                                          if (leadinfo?.area_project?.length === allproject?.length) {
                                            setleadinfo((prev) => {
                                              const updateproject = { ...prev, area_project: [] }; // Deselect all
                                              return updateproject;
                                            });
                                          } else {
                                            // Select all projects
                                            setleadinfo((prev) => {
                                              const updateproject = { ...prev, area_project: allproject }; // Select all
                                              fetchdatabyprojectname(allproject); // Fetch data with the selected projects
                                              return updateproject;
                                            });
                                          }
                                        } else {
                                          // Handle individual project selection/deselection
                                          setleadinfo((prev) => {
                                            const updateproject = { ...prev, area_project: selectproject };
                                            fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
                                            return updateproject;
                                          });
                                        }
                                      };
              
         
              
              
                   const handleallblockchange = (event) => {
                                        const selectblocks = event.target.value;
                                    
                                        // If the "Select All" option is selected
                                        if (selectblocks.includes("select-all")) {
                                          // If all blocks are selected, deselect all
                                          if (leadinfo?.block3?.length === allblocks?.length) {
                                            setleadinfo((prev) => {
                                              const updateblock = { ...prev, block3: [] }; // Deselect all
                                              return updateblock;
                                            });
                                          } else {
                                            // Select all blocks
                                            const allBlockNames = allblocks.map(project => project.block_name);
                                            setleadinfo((prev) => {
                                              const updateblock = { ...prev, block3: allBlockNames }; // Select all
                                              return updateblock;
                                            });
                                          }
                                        } else {
                                          // Handle individual block selection or deselection
                                          setleadinfo((prev) => {
                                            const updateblock = { ...prev, block3: selectblocks };
                                            return updateblock;
                                          });
                                        }
                                      }



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


                      const addtolead = async (selectedItems) => {
                        // const navigate = useNavigate(); // Initialize navigate
                        
                        try {
                          const resp=await api.post('leadinfo',leadinfo,config)
                          if(resp.status===200)
                            {
                                toast.success(resp.data.message)
                                setTimeout(() => {
                                    navigate('/leaddetails')
                                }, 2000);
                            }
                        } catch (error) {
                          console.error("Error fetching lead data:", error);
                        }
                      };


 // =====================================import and download sample data code start====================================================

 const contactdata = [
  { title:"mr.",first_name:"alex",last_name:"dow",country_code:['+91','+92'].join(', '),mobile_no:['7047752734','9755882635'].join(', '),
    mobile_type:['home','personal'].join(', '),
    email:['alex@gmail.com','xyz@gmail.com'].join(', '),email_type:['personal','home'].join(', '),tags:"no",descriptions:"my account",
    source:"online",team:"marketing",owner:"suraj",visible_to:"all",
  
    profession_category:"engineer",profession_subcategory:"it",designation:"developer",company_name:"papaya palette",country_code1:"+91",
    company_phone:"99554459405",
    company_email:"papaya@gmail.com",area:"sec 63",location:"worx ways",city:"noida",pincode:"201301",state:"up",country:"india",
    industry:"it",company_social_media:['papaya@facebook.com','papaya@twitter.com'].join(', '),company_url:['papaya.com','papayapalette.com'].join(', '),
  
    father_husband_name:"jon dow",h_no:"13",area1:"bishanpura",location1:"sec 58",city1:"noida",pincode1:"201301",state1:"up",
    country1:"india",gender:"male",maritial_status:"married",
    birth_date:"26th feb 1993",anniversary_date:"25th feb 2025",education:['btec','bsi.it'].join(', '),degree:['enginner','mern'].join(', '),
    school_college:['skmu','interanshala'].join(', '),loan:['personal','home'].join(', '),bank:['sbi','pnb'].join(', '),amount:['100','200'].join(', '),
    social_media:['facebook','twitter'].join(', '),url:['alex12548.facebook.com','alex@twitter.com'].join(', '),
    income:['personal','job'].join(', '),amount1:['10000','25000'].join(', '),document_no:['01','02'].join(', '),
    document_name:['aadhar card','pan card'].join(', '),document_pic:['url.cloudinary.com','url2.cloudinary.com'].join(', ')
  }
];

const generateExcelFileunit = () => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert the data into a worksheet
  const ws = XLSX.utils.json_to_sheet(contactdata);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate the Excel file as a Blob
  const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Save the file using file-saver
  const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'data.xlsx');
};


const [show7, setshow7] = useState(false);
const handleClose7 = () => setshow7(false);
const handleShow7=async()=>
{
  setshow7(true);

}

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const arrayBuffer = e.target.result;
//     const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     if (data.length > 0) {
//       const updatecontact = data.map((row) => {
//         let newcontact = {}; // Instead of spreading undefined 'contact', create a new object

//         Object.keys(row).forEach((key) => {
//           if (Array.isArray(contact[key])) {
//             newcontact[key] = row[key] ? row[key].split(', ') : []; // Convert string back to array
//           } else {
//             newcontact[key] = row[key];
//           }
//         });

//         return newcontact;
//       });

//       setcontact(updatecontact); // Properly update state with new contact data
//     } else {
//       toast.error('No data found in the Excel file.');
//     }
//   };

//   reader.readAsArrayBuffer(file);
// };

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const arrayBuffer = e.target.result;
//     const workbook = XLSX.read(arrayBuffer, { type: "array" });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     if (data.length > 0) {
//       const updatecontact = data.map((row) => {
//         let newcontact = {}; // Create a new contact object

//         Object.keys(row).forEach((key) => {
//           let value = row[key];

//           // Automatically detect and convert CSV-style values back to arrays
//           if (typeof value === "string" && value.includes(",")) {
//             newcontact[key] = value.split(",").map((v) => v.trim());
//           } else {
//             newcontact[key] = value;
//           }
//         });

//         return newcontact;
//       });

//       setcontact(updatecontact); // Update state with the new contact data
//     } else {
//       toast.error("No data found in the Excel file.");
//     }
//   };

//   reader.readAsArrayBuffer(file);
// };


const databaseFields = [
  "title", "first_name", "last_name", "country_code", "mobile_no", "mobile_type",
  "email", "email_type", "tags", "descriptions", "source", "team", "owner", "visible_to",
  "profession_category", "profession_subcategory", "designation", "company_name",
  "company_phone", "company_email", "area", "location", "city", "pincode", "state", "country",
  "industry", "company_social_media", "company_url", "father_husband_name", "h_no", "area1",
  "location1", "city1", "pincode1", "state1", "country1", "gender", "maritial_status",
  "birth_date", "anniversary_date", "education", "degree", "school_college", "loan",
  "bank", "amount", "social_media", "url", "income", "amount1", "document_no",
  "document_name", "document_pic"
];

const [excelHeaders, setExcelHeaders] = useState([]); // Store Excel headers
const [mappedFields, setMappedFields] = useState({}); // Store user-selected mapping
const [selectedFile, setSelectedFile] = useState(null); // Store uploaded file

const [duplicateEntries, setDuplicateEntries] = useState([]);
const [pendingContacts, setPendingContacts] = useState([]);
const [showPopup, setShowPopup] = useState(false);
// 🔹 Step 1: Extract Headers from Excel File
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setSelectedFile(file); // Store file for later use

  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet,{ header: 1 });

    if (data.length > 0) {
      const headers = data[0].map((cell, index) => cell || `Column${index + 1}`)
      setExcelHeaders(headers);
    } else {
      toast.error("No data found in the Excel file.");
    }
  };

  reader.readAsArrayBuffer(file);
};



// 🔹 Step 2: Process & Map Data Based on User Selection
const handleProcessFile = () => {
  try {
    
 
  setIsLoading(true);
  if (!selectedFile) {
    toast.error("No file selected. Please upload a file first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    if (data.length > 0) {
      const mappedContacts = data.map((row) => {
        let newcontact = {};

        Object.keys(row).forEach((key) => {
          let mappedKey = mappedFields[key] || key; // Use mapped key or original key
          let value = row[key];

          // Automatically detect and convert CSV-style values to arrays
          if (typeof value === "string" && value.includes(",")) {
            newcontact[mappedKey] = value.split(",").map((v) => v.trim());
          } else {
            newcontact[mappedKey] = value;
          }
        });

        return newcontact;
      });

      // setcontact(updatecontact); // Update state with processed data
      checkForDuplicates(mappedContacts); // Call duplicate check after mapping
    } else {
      toast.error("No data found in the Excel file.");
    }
  };

  reader.readAsArrayBuffer(selectedFile);
} catch (error) {
    console.log(error);
    
}finally {
  setIsLoading(false); // Hide loader after API call
}
};


const[allcontacts,setallcontacts]=useState([])
const checkForDuplicates = async (contacts) => {
  try {
    setIsLoading(true);
    // Fetch existing contacts from the database
    const response = await api.get("viewcontact");

    // Extract all mobile numbers from existing contacts into a Set
    const existingMobileNos = new Set();
    response.data.contact.forEach((existing) => {
      if (Array.isArray(existing.mobile_no)) {
        existing.mobile_no.forEach((num) => existingMobileNos.add(String(num).trim()));
      } else if (typeof existing.mobile_no === "string") {
        existingMobileNos.add(existing.mobile_no.trim());
      }
    });

    let newContacts = [];
    let duplicates = [];

    contacts.forEach((contact) => {
      let contactNumber = contact.mobile_no?.toString().trim(); // Convert to string

      if (existingMobileNos.has(contactNumber)) {
        duplicates.push(contact);
      } else {
        newContacts.push(contact);
      }
    });

    // Update state to display new contacts and duplicates
    setDuplicateEntries(duplicates);
    setPendingContacts(newContacts);

    // ✅ No popup: Data is now shown with "Add" & "Update" buttons in UI
    setallcontacts([...newContacts, ...duplicates]); // Store processed data
  } catch (error) {
    console.error("Error checking for duplicates:", error);
  }finally {
    setIsLoading(false); // Hide loader after API call
  }
};




// console.log(pendingContacts);
// console.log(duplicateEntries);
// console.log(contact);



  
const[isloading3,setisloading3]=useState(false)
 const addcontact = async (e) => {
  setisloading3(true);

  try {
    // Confirmation prompt
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `You are about to import <b>${pendingContacts.length}</b> leads.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, import it!",
    });

    if (!result.isConfirmed) {
      setisloading3(false);
      return;
    }

    const total = pendingContacts.length;
    let successCount = 0;
    let failCount = 0;
    const batchSize = 200;


    for (let i = 0; i < total; i += batchSize) {
      const batch = pendingContacts.slice(i, i + batchSize);

      try {
        const resp1 = await api.post('addbulkcontact', batch, config);

        if (resp1.status === 200) {
          successCount += batch.length;
          toast.success(`Imported ${successCount}/${total} contacts`, { autoClose: 2000 });
        } else {
          failCount += batch.length;
           toast.error(`Batch ${i + 1}-${i + batch.length} failed`, { autoClose: 2000 });
        }
      } catch (batchError) {
        failCount += batch.length;
        toast.error(`Error importing batch ${i + 1}-${i + batch.length}`, { autoClose: 3000 });
      }

    }


    // Final result popup
    if (successCount === total) {
      Swal.fire({
        icon: 'success',
        title: 'Import Complete',
        html: `All <b>${successCount}</b> Contacts imported successfully.`,
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title:  'Partial Import Complete',
        html: `<b>${successCount}</b> imported successfully.<br><b>${failCount}</b> failed.`,
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Import Failed',
      text: error?.response?.data?.message || "Something went wrong.",
    });
  } finally {
    setisloading3(false);
  }
};



    const updatecontactforbulkupload = async (e) => {
      try {
        // Show confirmation message
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Are you sure you want to update the data?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        });
    
        if (!result.isConfirmed) {
          return; // Stop execution if user cancels
        }

         const total = duplicateEntries.length;
          let successCount = 0;
          let failCount = 0;
          const batchSize = 50;

           for (let i = 0; i < total; i += batchSize) {
      const batch = pendingContacts.slice(i, i + batchSize);

      try {
        const resp1 = await api.put('updatecontactforbulkupload', batch, config);

        if (resp1.status === 200) {
          successCount += batch.length;
          toast.success(`Updated ${successCount}/${total} contacts`, { autoClose: 2000 });
        } else {
          failCount += batch.length;
           toast.error(`Batch ${i + 1}-${i + batch.length} failed`, { autoClose: 2000 });
        }
      } catch (batchError) {
        failCount += batch.length;
        toast.error(`Error updating batch ${i + 1}-${i + batch.length}`, { autoClose: 3000 });
      }

    }
    
       if (successCount === total) {
          Swal.fire({
            icon: 'success',
            title: 'Update Complete',
            html: `All <b>${successCount}</b> Contacts updated successfully.`,
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title:  'Partial Update Complete',
            html: `<b>${successCount}</b> update successfully.<br><b>${failCount}</b> failed.`,
          });
        }
        
      } catch (error) {
       Swal.fire({
      icon: 'error',
      title: 'Import Failed',
      text: error?.response?.data?.message || "Something went wrong.",
        });
      }
    };
    

   

//======================================import and download sample data code end===========================================================

// =======================================lead search box code start============================================================


                          const [searchTermcontact, setSearchTermcontact] = useState('');
                          const [suggestionscontact, setSuggestionscontact] = useState([]);
                      
                          
                          const fetchsearchdata = async (page, limit, search) => {
  try {
    // Call backend with search param
    const resp = await api.get(`/searchcontact?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
    const contacts = resp.data.contact || [];

    setdata(contacts);
    setSuggestionscontact(contacts); // suggestions can be the current filtered page

    setcontacttotalPages(resp.data.totalPages || 0);
    settotalcontact(resp.data.total || 0);

  } catch (error) {
    console.error(error);
  }
};

const handleSearchChangecontact = async (e) => {
  const value = e.target.value;
  setSearchTermcontact(value);
  setCurrentPage(1); // reset to first page on new search

  if (value.trim() === '') {
    // Empty search - fetch default data (first page, no search)
    await fetchdata(1, itemsPerPage, '');
    setSuggestionscontact([]); // clear suggestions
    return;
  }

  // Fetch contacts filtered by search term from backend
  await fetchsearchdata(currentPage, itemsPerPage, value);
};

                                          // const handleSearchChangecontact = (e) => {
                                          //   const value = e.target.value;
                                          //   setSearchTermcontact(value);
                          
                                          //   if (value.trim() === '') {
                                          //     setSuggestionscontact([]);
                                          //     fetchdata()
                                          //     return;
                                          //   }
                          
                                          //   const filtered = contactforsearch.filter(item =>
                                          //   {
                                          //     const titlematch=item.title && item.title.toLowerCase().includes(value.toLowerCase())
                                          //     const firstnamematch =item.first_name && item.first_name.toLowerCase().includes(value.toLowerCase());
                                          //     const lastnamematch =item.last_name && item.last_name.toLowerCase().includes(value.toLowerCase());
                          
                                          //     const mobile_no =
                                          //       Array.isArray(item.mobile_no) &&
                                          //       item.mobile_no.some(mobile =>
                                          //         String(mobile).toLowerCase().includes(value.toLowerCase())
                                          //       );

                                          //       const email =
                                          //       Array.isArray(item.email) &&
                                          //       item.email.some(emailid =>
                                          //         String(emailid).toLowerCase().includes(value.toLowerCase())
                                          //       );
                          
                                              
                          
                                          //     return titlematch || firstnamematch || lastnamematch || mobile_no || email;
                                              
                                          //  } );
                          
                                          //   setSuggestionscontact(filtered);
                                          //   setdata(filtered) // Limit to 5 suggestions
                                          // };
                          
                                          // const handleSuggestionClickcontact = (item) => {
                                
                                          
                                          //   setSearchTermcontact(`${item.title} ${item.first_name} ${item.last_name} -${item.mobile_no.join(',')} -${item.email.join(',')}`);
                                          //   setSuggestionscontact([]);
                                          //   setdata([item])
                          
                                          //   // You can also do something with the selected item (e.g. set selectedDeal)
                                          // };
                          
  
                                          
// =============================================add to lead search location via google start================================================

      
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
                                
                                  const getlocation = async () => {
                                 
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


// ======================================================add to lead search location via google end==============================================


// ================================================lead search box code end=======================================================
const [isHoveringDelete, setIsHoveringDelete] = useState(false);
const [isHoveringEdit, setIsHoveringEdit] = useState(false);
const [isHoveringaddtotask, setIsHoveringaddtotask] = useState(false);

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div className={`flip-container ${isFlipped ? 'flipped' : ''}`}>
            <div id="contactlistview" className="flip-card-front">
      <div style={{marginTop:"52px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload}>Contact </h3>
       
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button>
            <ul class="dropdown-menu" id="exporttoexcel" style={{textAlign:"left",padding:"0px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",fontFamily:"arial",fontSize:"14px",lineHeight:"30px"}}> 
            
            <li  onClick={exportToExcel} ><img src="https://static.thenounproject.com/png/1960252-200.png" style={{height:"20px",marginTop:"5px"}}></img>
            Export Data
            </li>
            <li  onClick={handleShow7}><img src="https://www.svgrepo.com/show/447311/database-import.svg" style={{height:"20px",marginTop:"5px"}}></img>
            Import Data</li>
            <li  onClick={generateExcelFileunit}><img src="https://static.thenounproject.com/png/2406231-200.png"  style={{height:"20px",marginTop:"5px"}}></img>
            Download Data(sample)</li>
            </ul>
            
    <Tooltip title="Filter contacts..." arrow>
  <button
    // onClick={() => setShowDropdown(!showDropdown)}
      onClick={toggleToast}
    style={{
      position: "relative",
      marginLeft: '75%',
      width: "50px",
      padding: '8px',
      backgroundColor: '#6366f1', // modern indigo color
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
    }}
  >
    {/* Funnel Icon - SVG (modern look) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h18" />
      <path d="M6 8h12" />
      <path d="M10 12h4" />
      <path d="M12 16v4" />
    </svg>
  </button>
</Tooltip>

 <div
  ref={toastRef}
  className={`feedback-toast ${show ? (isClosing ? 'hide' : 'show') : ''}`}
  style={{ zIndex: 9999 }}
>
  <div
    ref={filterRef}
    style={{
      position: 'absolute',
      top: '100px',
      right: '25px',
      width: '380px',
      background: 'linear-gradient(135deg, #ffffff, #f7f9fb)',
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      padding: 0,
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      fontFamily: 'Segoe UI, sans-serif',
      overflow: 'hidden',
    }}
  >
    {/* Header */}
    <h3 style={{
      fontSize: '16px',
      margin: 0,
      padding: '16px',
      textAlign: 'center',
      background: 'linear-gradient(to right, #00b4db, #0083b0)',
      color: '#fff',
      borderBottom: '1px solid #ddd',
      letterSpacing: '0.5px'
    }}>
      🔍 Filter Contacts
    </h3>

    {/* Tab Navigation */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: '#f2f4f7',
      borderBottom: '1px solid #ccc'
    }}>
      {[
        { id: 'profession', label: '📌 Profession' },
        { id: 'custom', label: '📋 Custom Fields' }
      ].map(tab => (
        <div
          key={tab.id}
          style={{
            flex: 1,
            textAlign: 'center',
            cursor: 'pointer',
            padding: '10px 0',
            fontWeight: 'bold',
            color: activeTab === tab.id ? '#007bff' : '#555',
            background: activeTab === tab.id ? '#fff' : '#f2f4f7',
            borderBottom: activeTab === tab.id ? '3px solid #007bff' : '3px solid transparent',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>

    {/* Tab Content */}
    <div style={{ padding: '20px', maxHeight: '400px', overflowY: 'auto' }}>
      {/* Profession Tab */}
      {activeTab === 'profession' && (
       <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}>
          {professions.map((profession) => (
            <label
              key={profession}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '14px',
                color: '#333',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0f8ff';
                e.currentTarget.style.borderColor = '#007bff';
                e.currentTarget.style.boxShadow = '0 3px 8px rgba(0, 123, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = '#ddd';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)';
              }}
            >
              <input
                type="checkbox"
                checked={selectedProfessions.includes(profession)}
                onChange={() => handlefilterCheckboxChange(profession)}
                style={{
                  marginRight: '10px',
                  accentColor: '#007bff'
                }}
              />
              {profession}
            </label>
          ))}
        </div>

      )}

      {/* Custom Fields Tab */}
      {activeTab === 'custom' && (
       <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '14px',
        }}>
          {contactfields.map(({ label, field }) => (
            <div
              key={field}
              style={{
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '14px 16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fdfc';
                e.currentTarget.style.borderColor = '#28a745';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(40,167,69,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = '#ddd';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)';
              }}
            >
              <label style={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                marginBottom: field in selectfield ? '10px' : 0
              }}>
                <input
                  type="checkbox"
                  checked={field in selectfield}
                  onChange={() => handlefilterCheckboxChange1(field)}
                  style={{
                    marginRight: '10px',
                    accentColor: '#28a745'
                  }}
                />
                {label}
              </label>

              {field in selectfield && (
                field.includes('date') ? (
                  <input
                    type="date"
                    value={selectfield[field]}
                    onChange={(e) => handleFieldInputChange(field, e.target.value)}
                    style={enhancedInputStyle}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={`Search by ${label}`}
                    value={selectfield[field]}
                    onChange={(e) => handleFieldInputChange(field, e.target.value)}
                    style={enhancedInputStyle}
                  />
                )
              )}
            </div>
          ))}
        </div>

              )}
            </div>

    {/* Cancel Button */}
        <div style={{
        padding: '14px',
        borderTop: '1px solid #eee',
        background: '#f9f9f9',
        display: 'flex',
        justifyContent: 'space-around',
        gap: '10px'
      }}>
        <button
          className="btn btn-secondary"
          style={{
            width: '45%',
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '6px',
            backgroundColor: '#6c757d',
            border: 'none',
            color: '#fff',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
            transition: 'background 0.3s ease',
          }}
          onClick={handleResetFilters}
        >
          🔄 Reset
        </button>

        <button
          className="btn btn-danger"
          style={{
            width: '45%',
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '6px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)'
          }}
          onClick={handleCancel}
        >
          ❌ Cancel
        </button>
      </div>

  </div>
</div>


        
        
     

      
            <button onClick={handleAddColumnClick} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"1%"}}>Add Fields</button>
        
       
       
          
      </div>
      <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>

      {/* <input id="search" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by name,email,mobile,company and tags" 
      style={{width:"25%",padding: '8px',
        borderRadius: '4px',
        border: isFlashing ? '2px solid #4CAF50' : '1px solid #ccc',
        boxShadow: isFlashing ? '0px 0px 8px rgba(76, 175, 80, 0.6)' : 'none',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',}} 
        onFocus={handleFocus} onBlur={handleBlur}  
        onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/> */}
      
      <input
       style={{width:"25%",padding: '8px',
        borderRadius: '4px',
        border: isFlashing ? '2px solid #4CAF50' : '1px solid #ccc',
        boxShadow: isFlashing ? '0px 0px 8px rgba(76, 175, 80, 0.6)' : 'none',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',}} 
        onFocus={handleFocus} onBlur={handleBlur}  
              
              id="search"
              type="text"
              className="form-control form-control-sm"
              placeholder="Search for contact via name, mobile no and email"
              value={searchTermcontact}
              onChange={(e) => handleSearchChangecontact(e)}
              // onKeyDown={handleKeyPress2}
              autoComplete="off"
            />
          {/* {suggestionscontact.length > 0 && (
  <ul
    className="list-group position-absolute"
    style={{
      width: "20%",
      zIndex: 1000,
      marginTop: "40px",
      fontSize: "14px",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
      backgroundColor: "#fff",
      borderRadius: "4px",
      maxHeight: "300px",
      overflowY: "auto",
    }}
  >
    {suggestionscontact.map((item, index) => {

      return (
              <li
                key={index}
                className="suggestion-item px-2 py-1"
                onClick={() => handleSuggestionClickcontact(item)}
                style={{
                  borderBottom: "1px solid #e0e0e0",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
              >
                <strong>{item.title} {item.first_name} {item.last_name}</strong><br />
                <span style={{ color: "#555" }}>
                  Mobile(s): {item.mobile_no.join(',')} <br />
                  email(s):{item.email.join(',')}
                </span>
              </li>
            );
          })}
        </ul>
      )} */}


      <div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>
   
      <Tooltip title="Delete Data.." arrow>
            <img
              id="delete"
              src={
                isHoveringDelete
                  ? "https://cdn-icons-png.freepik.com/512/6861/6861362.png" // hover image
                  : "https://cdn-icons-png.freepik.com/512/7078/7078067.png" // default image
              }
              onClick={deleteSelectedItems}
              onMouseEnter={() => setIsHoveringDelete(true)}
              onMouseLeave={() => setIsHoveringDelete(false)}
              alt=""
              style={{
                display:"none",
                height: "25px",
                width: "25px",
                cursor: "pointer",
                marginTop: "6px"
              }}
            />
          </Tooltip>
    
    <Tooltip title="Edit Data.." arrow>
          <img
            id="edit"
            src={
              isHoveringEdit
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7BrBLmrMYynVUzMxsgv8AtIEkFjStD6cFRNYv1to6LupNkPMgkEaEzD5-HIGrjcPj4&usqp=CAU" // hover image
                : "https://static.thenounproject.com/png/1416596-200.png" // default image
            }
            onClick={handleShow1}
            onMouseEnter={() => setIsHoveringEdit(true)}
            onMouseLeave={() => setIsHoveringEdit(false)}
            alt="edit"
            style={{
              height: "25px",
              width: "25px",
              cursor: "pointer",
              marginTop: "6px",
              marginLeft: "20px",
              display: "none"
            }}
          />
        </Tooltip>
  

      <Tooltip title="Add to lead.." arrow>
      <img id="addtolead" src="https://static.vecteezy.com/system/resources/previews/048/294/744/non_2x/black-and-white-dollar-coin-increasing-value-with-plus-sign-vector.jpg" onClick={handleShow5}   style={{height:"25px",width:"25px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
      </Tooltip>

      <Tooltip title="Call.." arrow>
      <img id="call" src="https://icons.veryicon.com/png/o/miscellaneous/mime-icon/call-14.png"   style={{height:"25px",width:"25px",display:"none",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
      </Tooltip>

      <Tooltip title="transfer contact.." arrow>
      <img id="transfercontact" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuMCIGx_Q2PJ8_eWpfakE9WZyNJzn-MApug&s"   style={{height:"25px",width:"25px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
      </Tooltip>

      <Tooltip title="merge contact..." arrow>
      <img id="mergecontact" onClick={()=>mergeAndSave(selectedItems)} src="https://www.shutterstock.com/image-vector/merge-business-gear-one-icon-260nw-1432583180.jpg"   style={{height:"25px",width:"25px",display:"none",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
      </Tooltip>    

<Tooltip title="Add to task.." arrow>
      <img
        id="addtask"
        src={
          isHoveringaddtotask
            ? "https://cdn-icons-png.flaticon.com/512/12692/12692378.png" // hover image
            : "https://cdn2.iconfinder.com/data/icons/interface-solid-7/30/interface-solid-task-add-512.png" // default image
        }
        onClick={() => navigate('/tasksform', { state: { selectedItem: selectedItems[0] } })}
        onMouseEnter={() => setIsHoveringaddtotask(true)}
        onMouseLeave={() => setIsHoveringaddtotask(false)}
        alt="edit"
        style={{
          height: "25px",
          width: "25px",
          cursor: "pointer",
          marginTop: "6px",
          marginLeft: "20px",
          display: "none"
        }}
      />
    </Tooltip>


      <Tooltip title="sequence.." arrow>
      <img id="sequence" src="https://static.vecteezy.com/system/resources/previews/052/379/772/non_2x/dependencies-glyph-icon-design-vector.jpg"   style={{height:"25px",width:"25px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
      </Tooltip>  

      {/* <Tooltip title="Send Mail.." arrow>
      <img id="mail" onClick={handleShow3} src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png"  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
      </Tooltip>
      <Tooltip title="Send WhatsApp.." arrow>
      <img id="whatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
      </Tooltip>
      <Tooltip title="Send Message.." arrow>
      <img id="message"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
      </Tooltip> */}
      <Tooltip title="Send Mail,WhatsApp and Message..." arrow>
      <img id="sendall"  src="https://static-00.iconduck.com/assets.00/send-icon-512x466-b67uw2ug.png" onClick={handleShow3}  style={{height:"25px",width:"25px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
      </Tooltip>
      </div>
    
    
      <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"65%",position:"absolute"}}>
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
      </select>
    
    {renderPageNumbers()}
    </div>
        

      <div style={{ position: 'relative', display: 'inline-block',marginLeft:"65%"}}>
              
                {showColumnList && (
                  <div
                    style={{
                      width:"200px",
                      height:"500px",
                      overflow:"scroll",
                     backgroundColor:"gray",
                      position: 'absolute',
                      top: '-40%',
                      left: '-80px',
                      border: '1px solid #ccc',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      zIndex: 1000,
                    }}
                  >
                    <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
                      {allColumns.slice(4).map((col) => (
                        <li key={col.id} style={{ padding: '5px 0' }}>
                          <input
                            type="checkbox"
                            checked={visibleColumns.some((visibleCol) => visibleCol.id === col.id)}
                            onChange={() => handleCheckboxChange(col)}
                          />{' '}
                          {col.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
      
       
        
      </div>
     
          <div style={{marginLeft:"60px",marginTop:"2px",backgroundColor:"white"}}>
          <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <TableRow >
          <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </StyledTableCell>
          {visibleColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer',backgroundColor:"gray" }}
              onClick={() => handleSort(col.id)}
            >
              {col.name}
              {sortConfig.key === col.id ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        currentItems.map ((item, index) => (
          <StyledTableRow key={index} >
            <StyledTableCell >
              <input 
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => handleRowSelect(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => navigate('/contactsingleview',{state:item})}
            >
              <span style={{color:"#0086b3",fontWeight:"bold",fontSize:"13px"}}>{item.title} {item.first_name} {item.last_name}</span>
              <br />
              {
                item?.mobile_no?.map((item1)=>
                (
                  <>
                  <SvgIcon component={PhoneIphoneIcon} style={{fontSize:"12px"}} />
              <span>{item1}</span>
              <br />
            
              </>
                ))
              }
            
              <SvgIcon component={EmailIcon} style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>

            <StyledTableCell 
              style={{ padding: "10px",fontSize:"12px" }} 
             
            >
              {item.h_no} {item.area1}
              <br />
              
              {item.location1} 
              <br />
             
              {item.city1} {item.pincode1}
            </StyledTableCell>

            <StyledTableCell 
              style={{ padding: "10px",fontSize:"12px" }} 
             
            >
              {item.profession_category} ({item.profession_subcategory})
              <br />
              
              {item.designation} 
              <br />
             
              {item.company_name} 
            </StyledTableCell>
            {visibleColumns
              .filter((col) => col.id !== 'personaldetails' && col.id !== 'sno' && col.id !== 'professionaldetails' && col.id !== 'address')
              .map((col) => (
                <StyledTableCell key={col.id} style={{ padding: "10px",fontSize:"12px" }}>
                {col.id === "createdAt" ? (
                  formatDate(item[col.id]) // Format createdAt date
                ) : col.id === "ownership" ? (
                  <>
                    {item?.owner?.map((owner, index) => (
                      <span key={index}>
                        {owner} ({item.team || ""})
                        <br />
                      </span>
                    ))}
                  </>
                ) : col.id === "lastcommunication" ? (
                  item[col.id] ? formatRelativeDate(item[col.id]) : "No communication yet" // Format last communication
                ) : (
                  item[col.id] || "-" // Default display if not createdAt, ownership, or lastcommunication
                )}
              </StyledTableCell>
              
              ))}
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa",marginLeft:"10px"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Customer  <span style={{color:"#A92904",fontSize:"25px"}}>{totalcontact}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Prospect  <span style={{color:"#A90490",fontSize:"25px"}}>{totalcontact}</span></h5>
        </footer>
      </div>
       
      <Modal show={show1} onHide={handleClose1} size='xl'>
            {/* <Modal.Header>
              <Modal.Title></Modal.Title>
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
                                    <option>{data1.source}</option><option>---Select---</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,team:e.target.value}))} >
                              <option>{data1.team}</option> 
                              <option>---Select---</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,owner:e.target.value}))} >
                              <option>{data1.owner}</option>     
                              <option>---Select---</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select>
                        
                        </div>
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,visible_to:e.target.value}))} >
                               <option>{data1.visible_to}</option> 
                                <option>---Select---</option>
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
                    <div className="col-md-4"><label className="labels">City</label>
                    {/* <input type="text" defaultValue={data1.city1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,city1:e.target.value}))}/> */}
                         <select
                    className="form-control form-control-sm"
                    onChange={(e) => setcontact({ ...contact, city1: e.target.value })}
                  >
                    <option>{data1.city1}</option>
                    <option value="">--Select City--</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" defaultValue={data1.pincode1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,pincode1:e.target.value}))}/></div>

                    <div className="col-md-6"><label className="labels">State</label>
                    {/* <input type="text" defaultValue={data1.state1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,state1:e.target.value}))}/> */}
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        const state = e.target.value;
                        setcontact({ ...contact, state1: state, city1: "" }); // Clear city when state changes
                      }}>
                        <option>{data1.state1}</option>
                        <option value="">--Select State--</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  

                    </div>
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
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px",fontFamily:"times-new roman"}}>Personal Deatils:</h4><hr></hr>
              <b>Full Name:</b> <span >{data2.title}</span> <span>{data2.first_name} </span><span>{data2.last_name}</span><br></br>
              <b>Mobile no:</b> <span>{data2.country_code}</span> <span>{data2.mobile_no}</span>,<span>{data2.mobile_type}</span><br></br>
              <b>Email id:</b> <span>{data2.email}</span>,<span>{data2.email_type}</span><br></br>
              <b>Title & Company:</b> <span>{data2.title_company}</span><br></br>
              <b>Designation:</b> <span>{data2.designation}</span><br></br>
              <b>Company Name:</b> <span>{data2.company_name}</span><br></br>
              <b>Tags:</b> <span>{data2.tags}</span><br></br>
              </div>

              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px"}}>Address Deatils:</h4><hr></hr>
              <b>Father/Husband Name:</b> <span>{data2.father_husband_name}</span><br></br>
              <b>H No.:</b> <span>{data2.h_no}</span><br></br>
              <b>Area:</b> <span>{data2.street_address}</span><br></br>
              <b>Tags:</b> <span>{data2.tags}</span><br></br>
              <b>Location:</b> <span>{data2.location}</span><br></br>
              <b>City:</b> <span>{data2.city}</span><br></br>
              <b>Pin Code:</b> <span>{data2.pincode}</span><br></br>
              <b>State:</b> <span>{data2.state}</span><br></br>
              <b>Country:</b> <span>{data2.country}</span><br></br>
              </div>

              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px"}}>System Deatils:</h4><hr></hr>
              <b>Source:</b> <span>{data2.source}</span><br></br>
              <b>Category.:</b> <span>{data2.category}</span><br></br>
              <b>Owner:</b> <span>{data2.owner}</span><br></br>
              <b>Team:</b> <span>{data2.team}</span><br></br>
              <b>Visible to:</b> <span>{data2.visible_to}</span><br></br>
              </div>

              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px"}}>Other Deatils:</h4><hr></hr>
              <b>Gender:</b> <span>{data2.gender}</span><br></br>
              <b>Maritial Status.:</b> <span>{data2.maritial_status}</span><br></br>
              <b>Birth Date:</b> <span>{data2.birth_date}</span><br></br>
              <b>Anniversary Date:</b> <span>{data2.anniversary_date}</span><br></br>
              <b>Education:</b> <span>
                {educationdata.join(',')}
                </span><br></br>
              <b>Degree:</b> <span>
                {degreedata.join(",")}
                </span><br></br>
              <b>School/College/University:</b> <span>
                {schooldata.join(",")}
                </span><br></br>
              <b>Loan:</b> <span>{data2.loan}</span><br></br>
              <b>Amount:</b> <span>{data2.amount}</span><br></br>
              <b>Social Media:</b> <span>{data2.social_media}</span><br></br>
              <b>Url:</b> <span>{data2.url}</span><br></br>
              <b>Income:</b> <span>{data2.income}</span><br></br>
              <b>Amount:</b> <span>{data2.amount1}</span><br></br>
              <b>Website:</b> <span>{data2.website}</span><br></br>
              <b>Industry:</b> <span>{data2.industry}</span><br></br>
              <b>Descriptions:</b> <span>{data2.descriptions}</span><br></br>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show3} onHide={handleClose3} size='lg'>
            <Modal.Header>
              <Modal.Title>Send Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div style={{display:"flex", gap:"100px"}}>
          <div style={{cursor:"pointer"}} id="sendmail1" onClick={sendmailfunction}>Send Mail</div> 
          <div style={{cursor:"pointer"}} id="sendmessage1" onClick={sendmessagefunction}>Send Message</div>
          <div style={{cursor:"pointer"}} id="sendwhatsapp1" onClick={sendwhatsappfunction}>Send WhatsApp</div>
   
        </div>
        <div className="col-md-12"><hr></hr></div>
  
        {/* <div className="row mt-2" id="sendmail" style={{display:"none"}}>
    <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send Mail</div>
    <div className="col-md-12"><hr></hr></div>
       <div className="col-md-12"><label className="labels">Recipients</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={emails} /></div>
       <div className="col-md-12"><label className="labels">Subject</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setsubject(e.target.value)}/></div>
       <div className="col-md-12"><label className="labels">Compose</label><textarea className="form-control form-control-sm" value={message}  placeholder="Enter Your Message" style={{height:"100px"}} onChange={e => setmessage(prevProfile => ({ ...prevProfile, message: e.target.value }))}/></div>
       <div className="col-md-4"><label className="labels">Templates</label>
       <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate} onChange={handleTemplateSelect}>
          <option value="">---Select Template---</option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>
       </div>

       <div className="col-md-4" {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '10px', cursor: 'pointer',margin:"10px" }}>
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
        <ul>
          {attachments.length > 0 && attachments.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
   </div> */}

      <div className="row mt-2" id="sendmail" style={{fontSize:"12px",display:"none"}}>
      <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder",fontSize:"1vw"}}> Send Mail</div>
          {/* <div className="col-md-12"><label className="labels">Recipients</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={lead.email} /></div> */}
          <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
           <input type="text" style={{border:"none",fontSize:"12px",borderBottom:"1px solid gray"}} required="true" className="form-control form-control-sm" placeholder='subject' value={subject} onChange={(e)=>setsubject(e.target.value)}/>
      
          </div>
         
   
          <div className="col-md-12" style={{marginTop:"5px"}}>
             <ReactQuill
           modules={modules1}  // Add the toolbar options for formatting
           style={{ height: '150px', width: '100%',fontSize:"12px",marginTop:"5px"}}
           className="my-quill-editor"
           value={message}   placeholder="Enter Your Message"  onChange={handlemailmessage}/>
           </div>

           <div id="custom-toolbar" className="ql-toolbar ql-snow" style={{ marginTop: "10px" }}>
         {/* Text formatting */}
         <span className="ql-formats">
           <button className="ql-bold" />
           <button className="ql-italic" />
           <button className="ql-underline" />
           <button className="ql-strike" />
         </span>
       
         {/* Font family */}
         <span className="ql-formats">
           <select className="ql-font">
             <option value="sans-serif">Sans Serif</option>
             <option value="serif">Serif</option>
             <option value="monospace">Monospace</option>
           </select>
         </span>
       
         {/* Font size */}
         <span className="ql-formats">
           <select className="ql-size">
             <option value="small" />
             <option value="normal" selected />
             <option value="large" />
             <option value="huge" />
           </select>
         </span>
       
         {/* Lists and indent */}
         <span className="ql-formats">
           <button className="ql-list" value="ordered" />
           <button className="ql-list" value="bullet" />
           <button className="ql-indent" value="-1" />
           <button className="ql-indent" value="+1" />
         </span>
       
         {/* Alignment */}
         <span className="ql-formats">
           <button className="ql-align" value="" />
           <button className="ql-align" value="center" />
           <button className="ql-align" value="right" />
           <button className="ql-align" value="justify" />
         </span>
       
         {/* Colors */}
         <span className="ql-formats">
           <button className="ql-color" />
           <button className="ql-background" />
         </span>
       
         {/* Code, blockquote */}
         <span className="ql-formats">
           <button className="ql-blockquote" />
           <button className="ql-code-block" />
         </span>
       
         {/* Media */}
         <span className="ql-formats">
           <button className="ql-link" />
           <button className="ql-image" />
         </span>
       
         {/* Clear formatting */}
         <span className="ql-formats">
           <button className="ql-clean" />
         </span>
       </div>

          <div className="col-md-4" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"12px"}}>Templates</label>
          <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate} onChange={handleTemplateSelect} style={{fontSize:"12px"}}>
             <option value="">---Select Template---</option>
             <option value="template1">Template 1</option>
             <option value="template2">Template 2</option>
             <option value="template3">Template 3</option>
           </select>
          </div>
   
          <div className="col-md-4" {...getRootProps()} style={{ border: '1px dashed #ccc',marginTop:"20px", cursor: 'pointer' }}>
           <input {...getInputProps()} />
           <p style={{fontSize:"12px"}}>Drag & drop files here, or click to select files</p>
           <ul>
             {attachments.length > 0 && attachments.map((file, index) => (
               <li key={index}>{file.name}</li>
             ))}
           </ul>
         </div>
         {/* <div className='col-md-2' style={{marginTop:"70px",marginLeft:"50px"}}><button className='form-control form-control-sm' onClick={sendmail}>send</button></div> */}
      </div>

   <div className="row mt-2" id="sendmessage" style={{display:"none"}}>
   <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send Message</div>
    </div>

    <div className="row mt-2" id="sendwhatsapp" style={{display:"none"}}>
    <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send WhatsApp</div>

    
    </div>
</div>
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={sendmail}>
                Send
              </Button>
              <Button variant="secondary" onClick={handleClose3}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
         
          </div>

          <div id="companylistview" className="flip-card-back" style={{display:"none"}}>
          <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload2}>Company </h3>
        <Tooltip title="Export Data.." arrow>
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button></Tooltip>
            <ul class="dropdown-menu" id="exporttoexcel"> 
            
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
            

            <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"65%"}}>Filter</button>
            <button onClick={handleAddColumnClick1} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"1%"}}>Add Fields</button>
        
       
       
          
      </div> 

      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>

<input id="companysearch" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by name,email,mobile,company and tags" style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>

<div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>

<Tooltip title="Delete Data.." arrow>
<img id="companydelete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" onClick={deleteSelectedItems1} style={{height:"50px",width:"50px",cursor:"pointer",display:"none",marginTop:"-2px"}} alt=""/>
</Tooltip>

<Tooltip title="Edit Data.." arrow>
<img id="companyedit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png" onClick={handleShow4}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Call.." arrow>
<img id="companycall" src="https://static.vecteezy.com/system/resources/thumbnails/025/225/156/small_2x/3d-illustration-icon-of-phone-call-with-circular-or-round-podium-png.png"   style={{height:"35px",width:"35px",display:"none",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
</Tooltip>


<Tooltip title="sequence.." arrow>
<img id="companysequence" src="https://e7.pngegg.com/pngimages/862/55/png-clipart-computer-icons-sequence-digital-sequence-miscellaneous-blue.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>  

<Tooltip title="Send Mail.." arrow>
<img id="companymail" onClick={handleShow3} src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png"  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Send WhatsApp.." arrow>
<img id="companywhatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
</Tooltip>
<Tooltip title="Send Message.." arrow>
<img id="companymessage"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
</Tooltip>
</div>


<div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute"}}>

<label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
<select id="itemsPerPage" value={itemsPerPage1} onChange={handleItemsPerPageChange1} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
  <option value="5">10</option>
  <option value="10">15</option>
  <option value="20">20</option>
  <option value="50">50</option>
</select>

{renderPageNumbers1()}
</div>
  

<div style={{ position: 'relative', display: 'inline-block',marginLeft:"65%"}}>
        
          {showColumnList1 && (
            <div
              style={{
                width:"200px",
                height:"500px",
                overflow:"scroll",
               backgroundColor:"gray",
                position: 'absolute',
                top: '-40%',
                left: '-80px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
              }}
            >
              <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
                {allcompanyColumns.slice(2).map((col) => (
                  <li key={col.id} style={{ padding: '5px 0' }}>
                    <input
                      type="checkbox"
                      checked={visibleColumns1.some((visibleCol) => visibleCol.id === col.id)}
                      onChange={() => handleCheckboxChange1(col)}
                    />{' '}
                    {col.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

 
  
</div>


<div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
          <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto', }}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow >
          <StyledTableCell >
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell>
          {visibleColumns1.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{  cursor: 'pointer' }}
              onClick={() => handleSort(col.id)}
            >
              {col.name}
              {sortConfig.key === col.id ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        currentItems1.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px",cursor:"pointer",fontSize:"12px" }} 
             onClick={()=>navigate('/companysingleview',{state:item})}
            >
              {item.name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no1}</span>
              <br />
              <SvgIcon component={EmailIcon} />
              <span>{item.email1}</span>
            </StyledTableCell>
            {visibleColumns1
              .filter((col) => col.id !== 'personaldetails' && col.id !== 'sno')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px",fontSize:"12px"}}
                >
                  {
                    col.id=='address' ?
                    (
                      <>
                      {item.area} {item.location} {item.city} <br></br>
                      {item.state} {item.pincode}
                      </>
                    ): col.id === "createdAt" ? (
                      formatDate(item[col.id]) // Format createdAt date
                    ) : item[col.id]
                  }
               
                </StyledTableCell>
              ))}
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Company <span style={{color:"green",fontSize:"25px"}}>{totalcompany}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Govt. Company/Organisation <span style={{color:"green",fontSize:"25px"}}>{totalcompany}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Private Company <span style={{color:"green",fontSize:"25px"}}>{totalcompany}</span></h5>
        </footer>
      </div>



          </div>
          </div>


          <Modal show={show4} onHide={handleClose4} size='xl'>
            <Modal.Header>
              <Modal.Title></Modal.Title>
            </Modal.Header>
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
            <StyledTableCell style={{  fontSize: "10px" }}>
             <img src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' alt='' style={{height:"30px"}}/>
             
            </StyledTableCell>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer",fontSize: "10px" }}  >
              {item.title} {item.first_name} {item.last_name}<br></br>
              {item.designation}
            </StyledTableCell>
           
                <StyledTableCell >
                {item?.mobile_no?.join(',')}<br></br>
                {item?.email?.join(',')}
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
                      Array.isArray(contact.country_code)?
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
                      )):[]
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                      Array.isArray(contact.mobile_no)?
                       contact.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
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
                                  <option>Select Type</option>
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
                       Array.isArray(contact.email)?
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
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
                Update Company
              </Button>
              <Button variant="secondary" onClick={handleClose4}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/*================================================= add to lead start ================================================================*/}

          <Modal show={show5} onHide={handleClose5} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Add To Lead</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <div className="row mt-2" id="leadinforequirment" >
                <div className="col-md-3"><label className="labels">Requirment</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,requirment:e.target.value})}>
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
                          value={leadinfo.property_type || []}
                          onChange={handleCategoryChange}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {options.property_type.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                              <Checkbox checked={leadinfo.property_type?.includes(cat)|| false} />
                              <ListItemText primary={cat} />
                            </MenuItem>
                          ))}
                        </Select>
                        </div>
                        
                        <div className="col-md-4"><label className="labels" style={{display:"inline-block"}}>Purpose</label><br></br>
                        <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>End use<input type="radio" name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>Investor
                        </div>
                        <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                        <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,nri:e.target.value})}/>Yes
                        </div>
                        <div className="col-md-6"><label className="labels">Sub Type</label>
                        
                        <Select
                        className="form-control form-control-sm" style={{border:"none"}}
                      multiple
                      value={leadinfo.sub_type || []}
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
                      value={leadinfo.unit_type || []}
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
                                onChange={(e) =>
                                  setleadinfo({ ...leadinfo, budget_min: e.target.value })
                                }
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
                                onChange={(e) =>
                                  setleadinfo({ ...leadinfo, budget_max: e.target.value })
                                }
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
                        <div id="buybudgetmin" className="col-md-6"><label className="labels">Budget Min</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_min:e.target.value})}>
                        <option>---Select---</option>
                        {buyBudgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                      
                      
                        <div id="buybudgetmax" className="col-md-6"><label className="labels">Budget Max</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_max:e.target.value})}>
                        <option>---Select---</option>
                        {filteredMaxBudgetOptionsbuy.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                        </>
                      )}
                        <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,minimum_area:e.target.value})}>
                        <option>Select</option>
                        {areaoptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maximum_area:e.target.value})}>
                        <option>Select</option>
                        {filteredarea.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                
                        </select></div>
                   
                        <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area_metric:e.target.value})} >
                      
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
                                            value={leadinfo?.area_project? leadinfo.area_project:[]}
                                            onChange={handleprojectchange}
                                            style={{ border: 'none' }}
                                            renderValue={(selected) => selected.join(', ')}
                                            label="Area/Project"
                                          >
                                           "Select All" MenuItem 
                                            <MenuItem value="select-all">
                                              <Checkbox checked={leadinfo?.area_project?.length === allproject?.length} />
                                              <ListItemText primary="--- Select All ---" />
                                            </MenuItem>
                    
                                           
                                            {allproject.map((project) => (
                                              <MenuItem key={project} value={project}>
                                                <Checkbox checked={leadinfo?.area_project?.indexOf(project) > -1} />
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
                                              value={leadinfo?.block3? leadinfo.block3:[]}
                                              onChange={handleallblockchange}
                                              style={{ border: "none" }}
                                              renderValue={(selected) => selected.join(', ')}
                                              label="Block"
                                            >
                                          
                                              <MenuItem value="select-all">
                                                <Checkbox checked={leadinfo?.block3?.length === allblocks?.length} />
                                                <ListItemText primary="--- Select All ---" />
                                              </MenuItem>
                    
                                            
                                              {[...new Map(allblocks.map(item => [item.block_name, item])).values()].map((project) => (
                                                <MenuItem key={project.block_name} value={project.block_name}>
                                                  <Checkbox checked={leadinfo?.block3?.indexOf(project.block_name) > -1} />
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
                                            {/* <div className="col-md-2"><label className="labels">Unit</label>
                                            <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,range_unit:e.target.value})}>
                                              <option>---select---</option>
                                              <option>K.M</option>
                                            </select>
                                            </div> */}
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
                    value={facings || []}
                    onChange={handlefacingChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.facing || '---select---'}
                </MenuItem> */}
                 <MenuItem value="select-all">
                    <Checkbox checked={facings.length === facing.length} />
                    <ListItemText
                      primary={ '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
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
                    value={roads || []}
                    onChange={handleroadChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.road || '---select---'}
                </MenuItem> */}
                <MenuItem value="select-all">
                    <Checkbox checked={roads.length === road.length} />
                    <ListItemText
                      primary={ '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
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

                        <div className="col-md-4"><label className="labels">Direction</label>
                                          <Select className="form-control form-control-sm" style={{border:"none"}}
                                        multiple
                                        value={directions}
                                        onChange={handledirectionChange}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                       {/* <MenuItem disabled value="---select---">
                                        {leadData?.road || '---select---'}
                                    </MenuItem> */}
                                    <MenuItem value="select-all">
                                        <Checkbox checked={directions.length === direction.length} />
                                        <ListItemText
                                          primary={'---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                                        />
                                      </MenuItem>
                                        {direction.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={directions.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                       
                                        </div>

                    <div className="col-md-4"><label className="labels">Funding</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,funding:e.target.value})}>
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
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,timeline:e.target.value})}>
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
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,furnishing:e.target.value})}>
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
                     <div className="col-md-4"><label className="labels">Property Unit Type</label>
                                     <Select className="form-control form-control-sm" style={{border:"none"}}
                                       multiple
                                       value={propertyunitstypes}
                                       onChange={handlepropertyunitstypesChange}
                                       renderValue={(selected) => selected.join(', ')}
                                   >
                                      {/* <MenuItem disabled value="---select---">
                                       {leadData?.road || '---select---'}
                                   </MenuItem> */}
                                   <MenuItem value="select-all">
                                       <Checkbox checked={propertyunitstypes.length === propertyunittype.length} />
                                       <ListItemText
                                         primary={ '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                                       />
                                     </MenuItem>
                                       {propertyunittype.map((name) => (
                                           <MenuItem key={name} value={name}>
                                               <Checkbox checked={propertyunitstypes.indexOf(name) > -1} />
                                               <ListItemText primary={name} />
                                           </MenuItem>
                                       ))}
                                   </Select>
                                       </div>

                    <div className="col-md-4"><label className="labels">Transaction Type</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,transaction_type:e.target.value})}>
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
                    value={matchdeals || []}
                    onChange={handlematcheddealChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   <MenuItem value="select-all">
                    <Checkbox checked={matchdeals.length === matchdeal.length} />
                    <ListItemText
                      primary={ '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
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



            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary"  onClick={addtolead} >
                Add To Lead
              </Button>
              <Button variant="secondary" onClick={handleClose5}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/*=================================================== add to lead end ============================================================*/}



{/* =============================================import file modal start ============================================================*/}

                    <Modal show={show7} onHide={handleClose7} size='lg'>
                                <Modal.Header>
                                  <Modal.Title>Import Contact Data</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                    
                                <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
        📂 Upload & Map Your Excel Data
      </h3>

      {/* File Upload Input */}
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx, .xls"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700 cursor-pointer"
        />
      </div>

      {/* Mapping UI */}
      {excelHeaders.length > 0 && (
       <div className="mt-4">
       <h5 className="text-lg font-semibold mb-3 text-gray-700">🗺️ Map Your Excel Columns</h5>
   
       <div className="row">
         {excelHeaders.map((header, index) => (
           <div key={index} className="col-md-4 mb-3 ">
             <div className="p-2 border rounded shadow-sm bg-light zoom-card">
               <label className="form-label fw-semibold">{header} ➝</label>
               <select
                 className="form-control form-control-sm"
                 onChange={(e) =>
                   setMappedFields((prev) => ({
                     ...prev,
                     [header]: e.target.value,
                   }))
                 }
               >
                 <option value="">Select a field</option>
                 {databaseFields.map((dbField, idx) => (
                   <option key={idx} value={dbField}>
                     {dbField}
                   </option>
                 ))}
               </select>
                {/* ✅ Suggestion Text */}
                {/* {headerSuggestions[header] && (
                 <small  style={{color:"blue"}}>{headerSuggestions[header]}</small>
               )} */}
             </div>
           </div>
         ))}
       </div>
   
       <button
         style={{ backgroundColor: "gray", width: "200px" }}
         onClick={handleProcessFile}
         className="mt-3 btn btn-success fw-semibold"
       >
         ✅ Process File
       </button>
     </div>
   )}

      {/* Show Processed Data */}
      {allcontacts.length > 0 && (
  <div className="mt-6 bg-gray-100 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">📜 Processed Data</h3>
    
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800" style={{fontFamily:"arial"}}>New Contacts</h4>
      <pre className="text-sm text-gray-600 overflow-x-auto" >
      {JSON.stringify(
      pendingContacts.map(({ title, first_name, last_name, mobile_no }) => ({
        title,
        first_name,
        last_name,
        mobile_no,
      })),
      null,
      2
    )}
      </pre>
      <button className="form-control form-control-sm" onClick={addcontact} style={{width:"150px"}}>
        ➕ Add Contact
      </button>
    </div>

    <div>
      <h4 className="font-semibold text-gray-800" style={{fontFamily:"arial"}}>Duplicate Contacts</h4>
      <pre className="text-sm text-gray-600 overflow-x-auto">
      {JSON.stringify(
      duplicateEntries.map(({ title, first_name, last_name, mobile_no }) => ({
        title,
        first_name,
        last_name,
        mobile_no,
      })),
      null,
      2
    )}
      </pre>
      <button className="form-control form-control-sm" style={{width:"200px"}} onClick={updatecontactforbulkupload}>
        🔄 Update Contacts
      </button>
    </div>
  </div>
)}

    </div>

    {/* {showPopup && (
      <div className="popup-container">
        <div className="popup">
          <h3>Duplicate Contacts Found</h3>
          <p>Some contacts already exist. Do you want to update them?</p>
          <button className="form-control form-control-sm" onClick={handleSkipDuplicates}>Skip</button>
          <button className="form-control form-control-sm" >Update</button>
        </div>
      </div>
    )} */}
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
          <p>Uploading data...</p>
        </div>
      </div>
    )}
  </>
   <>
    {isloading3 && (
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
          background: "rgba(9, 101, 52, 0.8)",
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
          <p>importing leads...</p>
        </div>
      </div>
    )}
  </>
                    
                                </Modal.Body>
                                <Modal.Footer>
                                {/* <Button variant="secondary" onClick={addcontact}>
                                    Add Contact
                                  </Button> */}
                                  <Button variant="secondary" onClick={handleClose7}>
                                    Close
                                  </Button>
                                </Modal.Footer>
                              </Modal>

{/*=============================================== import file modal end============================================================= */}

{/* ========================================loader start============================================================== */}



{/*=================================== loader end======================================================================= */}

          <ToastContainer/>

           <>
    {isLoading4 && (
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
          background: "rgba(187, 16, 19, 0.8)",
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
          <p>deleting contacts...</p>
        </div>
      </div>
    )}
  </>

        </div>
     );
}

export default Fetchcontact;