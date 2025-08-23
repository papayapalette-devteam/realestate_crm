import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/addinventory.css';
import { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import { toast,ToastContainer } from "react-toastify";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { toWords } from 'number-to-words';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

function Deal() {
  const navigate=useNavigate()
    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unitString = queryParams.get('unit');

  let unitdata = null;
  try {
    unitdata = unitString ? JSON.parse(unitString) : null;
  } catch (e) {
    console.error('Invalid unit data in URL:', e);
  }

    
// ================================select project,units and block from project data start==============================================================
const[deal,setdeal]=useState({project_category:[],project_subcategory:"",location:"",ulocality:"",ucity:"",
  utype:"",ucategory:[],usub_category:[],usize:"",available_for:"",stage:"",project:"",block:"",unit_number:"",floors:"",
  expected_price:"",quote_price:"",security_deposite:"",owner_details:[],associated_contact:[],
maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
deal_type:"",deal_case:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
website:"",social_media:"",send_matchedlead:"",matchedleads:[],matchinglead:"",remarks:""})

const[activity]=useState({activity_name:"deal created", call_outcome:"", activity_note:"",lead:"",
  direction:"",status:"",date:"",duration:"",intrested_inventory:"",message:"",subject:"",viewcount:0,
  activity_note1:"",edit_field:"",edit_value:""})

const config = {
headers: {
'Content-Type': 'multipart/form-data' // Set the Content-Type here
}
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

const[matchedunit,setmatchedunit]=useState([])
React.useEffect(() => {
  if (flattenedUnits.length > 0 && deal.project && deal.block && deal.unit_number) {
    // Look for a unit that matches deal criteria
    const matchingUnit = flattenedUnits.find(
      (unit) =>
        unit.project_name === deal.project &&
        unit.block === deal.block &&
        unit.unit_no === deal.unit_number
    );




    // If a matching unit is found, update the deal's ulocality

    if (matchingUnit) {
      setmatchedunit(matchingUnit)
    }
  }
}, [flattenedUnits, deal.project, deal.block, deal.unit_number]);

// console.log(matchedunit.unit_type);
React.useEffect(() => {
  setdeal((prevDeal) => ({
    ...prevDeal,
    utype: matchedunit.unit_type,
  ulocality:matchedunit.ulocality,
  ucategory:matchedunit.category,
  usub_category:matchedunit.sub_category,
  ucity:matchedunit.ucity,
  usize:matchedunit.size,
  owner_details: Array.isArray(matchedunit.owner_details) 
      ? matchedunit.owner_details.map(contact => contact._id) 
      : [],  // Default to empty array if not an array
    associated_contact: Array.isArray(matchedunit.associated_contact) 
      ? matchedunit.associated_contact.map(contact => contact._id) 
      : []  // Default to empty array if not an array
  }));
}, [matchedunit]);
// console.log(matchedunit);
// console.log(deal.owner_details);
// console.log(deal.utype);




const[data1,setdata1]=useState([]);
        const fetchdata1=async()=>
        {
          
          try {
            const resp=await api.get('viewprojectforadddeal')
            setdata1(resp.data.allprojectwithoutunitdetails)
          } catch (error) {
            console.log(error);
          }
        }

        const[data2,setdata2]=useState([]);
        const fetchdata2=async()=>
        {
          
          try {
            const resp=await api.get('leadinfo')
            setdata2(resp.data.lead)
          } catch (error) {
            console.log(error);
          }
        }

       

  React.useEffect(()=>
  {fetchdata1()},[])

  React.useEffect(()=>
    {fetchdata2()},[])


  const allproject =[]
  data1.map((item)=>
  (
      allproject.push(item.name)
  ))
   

  const [units, setunits] = useState([]);
  const [allUnits, setallUnits] = useState([]);
  const [allblocks, setallblocks] = useState([]);



  const [numericValue, setNumericValue] = React.useState(null);
  const [measurementUnit, setMeasurementUnit] = React.useState('');

  const fetchdatabyprojectname = async (projectNames) => {

    try {
      
        const resp = await api.get(`viewprojectbyname/${projectNames}`);
        // const allFetchedUnits= resp.data.project;
        setunits(resp.data.project);// Assuming resp.data.project is an array of units for that project
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
    if (units.length >= 0) {
      const collectedUnits = units.flatMap(item => 
        item.add_unit.filter(unit => unit.stage === 'Active' && unit.block===deal.block) // Filter units where stage is 'active'
      );
   
    
      

      const collectedblocks=units.flatMap(item=>item.add_block)
      const collectcategory=units.flatMap(item=>item.category) 
      const collectsubcategory=units.flatMap(item=>item.sub_category) // Collect all add_unit arrays
      const fulllocation = units.flatMap(item => `${item.add_location}, ${item.address} ${item.street} ${item.locality} ${item.city}`).join(' ');
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
  const match = sizeValue?.match(regex);

  if (match) {
    setNumericValue(parseFloat(match[1]));
    setMeasurementUnit(match[3]);
  }
     
      }
      


    }
  }, [units,deal.block,deal.unit_number]);





  
 
 
  

  
  
  
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


  const handleallblockchange = (event) => {
     
    
      const selectblocks = event.target.value
    
       
      setdeal((prev) => {
        const updateblock = { ...prev, block: selectblocks };
        return updateblock; // Return the updated state
      });
    };

  
       


          React.useEffect(() => {
            const ownerDetails = Array.isArray(deal.owner_details) ? deal.owner_details : [];
            const associatedContact = Array.isArray(deal.associated_contact) ? deal.associated_contact : [];
          
            // Combine owner_details and associated_contact
            const combinedContacts = [...ownerDetails, ...associatedContact];

            fetchContacts(combinedContacts)
          
            // You can now use the uniqueContacts for further processing like fetching details
          }, [deal.owner_details, deal.associated_contact]);
          

          const [contacts, setContacts] = useState([]);

          const fetchContacts = async (contactIds) => {
            try {
              if (contactIds.length === 0) return; // Exit if no contactIds
        
              const fetchedContacts = [];
        
              // Loop through contactIds and make an individual API call for each
              for (let id of contactIds) {
                const response = await api.get(`viewcontactbyid/${id}`); // Adjust this based on your endpoint
                if (response.data && response.data.contact) {
                  fetchedContacts.push(response.data.contact);
                }
              }
        
              // After fetching all the contacts, update the state
              setContacts(fetchedContacts);
        
            } catch (error) {
              console.error('Error fetching contacts:', error);
            }
          };
         
          



          const add_deal=async(e)=>
            {
                e.preventDefault();
           
                  try {
       
          

                    // Loop through each contact and post activity separately
                    for (let contact of contacts) {
                      // Prepare the lead field with the current contact's name
                      const lead = `${contact.title} ${contact.first_name} ${contact.last_name}`;
                      
                      const activityForContact = {
                        ...activity, // Keep the default activity fields
                        lead: lead // Update the lead for this particular contact
                      };
                      
              
                      // Send POST request for activity (one request per contact)
                      const resp = await api.post('addactivity', activityForContact); // Adjust this endpoint as needed
                      
                    }
                    
                    const resp= await api.post('adddeal',deal)
                            if(resp.status===200)
                                {
                                          Swal.fire({
                                                icon:"success",
                                                title: '🎉 Success!',
                                                text:"Deal created successfully...",
                                                html: `Deal created successfully...<br></br>
                                        <img src="https://cdn.vectorstock.com/i/500p/63/50/thumbs-up-smiley-face-icon-vector-10176350.jpg"
                                        alt="Thumbs up" 
                                              width="80" 
                                              style="margin-bottom: 0px;"/>`,
                                        width: '400px', // makes it small
                                        padding: '1.2em',
                                                showConfirmButton: true,
                                              }).then((result) => {
                                              if (result.isConfirmed) {
                                                navigate('/dealdetails');
                                                }
                                              })
                                 }
                        } catch (error) {
                              Swal.fire({
                              title: 'Oops creating deal failed!',
                              icon:"error",
                              html: `
                                <img src="https://i.pinimg.com/originals/53/3f/f7/533ff77ef582abbfa00ccf9080137304.gif"
                                    alt="Sad face" 
                                    width="80" 
                                    style="margin-bottom: 0px;" />
                                <p style="font-size: 14px; margin: 0;">
                                  ${error.response?.data?.message || 'Something went wrong. Please try again.'}
                                </p>
                              `,
                              width: '400px', // makes it small
                              padding: '1.2em',
                              showConfirmButton: true,
                              confirmButtonText: 'Okay',
                              confirmButtonColor: '#d33',
                              background: '#fff',
                              customClass: {
                                popup: 'small-swal',
                              }
                            });

                                console.log(error);
                                
                        }
                       }
     
          

// =======================================add deal end=================================================================================

//================== add document and remove document inside deal start==================================================================


                                  const[document1,setdocument1]=useState([])
                                  const[documents,setdocuments]=useState({document_name:"",document_no:"",document_Date:"",
                                                                  linkded_contact:"",pic:[]})
  
                                                                  const handlepicchange = (e) => {
                                                                    const files = Array.from(e.target.files); // Get selected files
                                                                    setdocuments((prevDocs) => ({
                                                                      ...prevDocs,
                                                                      pic: files, // Update pics in state
                                                                    }));
                                                                  };

                                    const adddocument = () => {
                                     
                                        if (documents.document_name) 
                                          {
                                            const updatedocument= [...document1, documents];
                                            setdocument1(updatedocument);
                                            setdeal(prevState => ({
                                              ...prevState,
                                              document_details: updatedocument
                                            }));
                                          

                                            
                                            } 
                                            else
                                              {
                                                  toast.error("Please fill out all fields.");
                                              }
                                            };
                                const deletedocument = (index) => {


                                  // Filter out the destination at the given index
                                  const newdocument = deal.document_details.filter((_, i) => i !== index);
                                  // Set the updated destination details
                                  setdeal(prevState => ({
                                    ...prevState,
                                    document_details: newdocument
                                  }));
                                  setdocument1(newdocument);
                                };


//=============================== add document and remove document inside deal start=====================================================


//============================ add and delete code for adding more phots and videos start=================================================



function addFn() {
  setdeal({
    ...deal,
    s_no1: [...(deal.s_no1 || []), ''],  // Ensure s_no1 is an array
    url: [...(deal.url || []), ''],        // Ensure url is an array
    action1: [...(deal.action1 || []), ''] // Ensure action1 is an array
  });
}
const handlesno1change = (index, event) => {
  const newsno1 = [...deal.s_no1];
  newsno1[index] = event.target.value;
  setdeal({
    ...deal,
    s_no1: newsno1
  });
};
const handleurlChange = (index, event) => {
  const newurl = [...deal.url];
  newurl[index] = event.target.value;
  setdeal({
    ...deal,
    url: newurl
  });
};

const handlesnochange = (index, event) => {
  const newsno = [...deal.s_no];
  newsno[index] = event.target.value;
  setdeal({
    ...deal,
    s_no: newsno
  });
};
const handlepreviewchange = (index, event) => {
  const newpreview = [...deal.preview];
  const files = Array.from(event.target.files);
  const previewUrls = files.map(file => URL.createObjectURL(file));
  
  // Update the preview state with the selected files and preview URLs
  newpreview[index] = {
    files: files,  // The actual file objects
    previewUrls: previewUrls  // The URLs for previewing the images
  };
  
  setdeal({
    ...deal,
    preview: newpreview  // Update the preview array in the state
  });
};



const handledescriptionchange = (index, event) => {
  const newdescription = [...deal.descriptions];
  newdescription[index] = event.target.value;
  setdeal({
    ...deal,
    descriptions: newdescription
  });
};
const handlecategorychange = (index, event) => {
  const newcategory = [...deal.category];
  newcategory[index] = event.target.value;
  setdeal({
    ...deal,
    category: newcategory
  });
};


function addFn1() {
    
  setdeal({
    ...deal,
    s_no: [...(deal.s_no || []), ''],           // Ensure s_no is an array
    preview: [...(deal.preview || []), ''],       // Ensure preview is an array
    descriptions: [...(deal.descriptions || []), ''], // Ensure descriptions is an array
    category: [...(deal.category || []), ''],     // Ensure category is an array
    action: [...(deal.action || []), '']          // Ensure action is an array
  });
}

const deleteall=(index)=>
{
  // handleDeletesno(index)
  // handleDeletepreview(index)
  const newsno = deal.s_no.filter((_, i) => i !== index);
  const newpreview = deal.preview.filter((_, i) => i !== index);
  const newdescription = deal.descriptions.filter((_, i) => i !== index);
  const newcategory = deal.category.filter((_, i) => i !== index);
  const newaction = deal.action.filter((_, i) => i !== index);
  setdeal({
    ...deal,
    s_no: newsno,
    preview: newpreview,
    descriptions: newdescription,
    category: newcategory,
    action: newaction
  });
}
const deleteall1=(index)=>
  {
    // handleDeletesno(index)
    // handleDeletepreview(index)
    const newsno1 = deal.s_no1.filter((_, i) => i !== index);
    const newurl = deal.url.filter((_, i) => i !== index);
    const newaction1 = deal.action1.filter((_, i) => i !== index);
    setdeal({
      ...deal,
      s_no1: newsno1,
      url: newurl,
      action1: newaction1
    });
  }


//================================  add and delete code for adding more phots and videos end=============================================


//============================== code for show rent or sale form start================================================================


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

// ==============================code end for sale or rent form==========================================================================


//================================== mui table row and cell code and currency convert code start===========================================


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

const [result, setResult] = useState("");
const [resultText, setResultText] = useState('');

const calculateResult = () => {
  const areaValue = parseFloat(document.getElementById("earea").value) || 0; // Ensure valid number
  const priceValue = parseFloat(document.getElementById("eprice").value) || 0; // Ensure valid number
  const calculatedResult = areaValue * priceValue;

  setResult(calculatedResult);
  setdeal(prevDeal => ({ ...prevDeal, expected_price: calculatedResult }));
};

React.useEffect(() => {
  // Convert result to text format
  if (result) {
    const words = toWords(result, { format: 'en-IN' });
    setResultText(`(${words} only)`);
  } else {
    setResultText('');
  }
}, [result]);

const [result1, setResult1] = useState(0);
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


const [result2, setResult2] = useState(0);
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

const [result3, setResult3] = useState(0);
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


//============================mui table row and cell code and currency convert code start===============================================


//===============================Sort add contact form start===============================================================================


const [show1, setshow1] = useState(false);
    
const handleClose1 = () => setshow1(false);
const handleShow1=async()=>
{
  setshow1(true);
 
}

const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[''],mobile_no:[''],mobile_type:[''],action1:[],
  email:[''],email_type:[''],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

  profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
  company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

  father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
  birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
  social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[]});

  // const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data' // Set the Content-Type here
  //     }
  // }

  const addcontact=async(e)=>
    {
        e.preventDefault();
        try {

            const resp= await api.post('addcontact',contact,config)
        if(resp.status===200)
            {
                toast.success(resp.data.message,{ autoClose: 2000 })
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
            }
            
      
        } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
        }
    }

    function addFn3() {
        
      setcontact({
        ...contact,
        country_code: [...contact.country_code, ''],
        mobile_no: [...contact.mobile_no, ''],
        mobile_type: [...contact.mobile_type, ''],
        action1: [...contact.action1, '']
      });
    };

    const deleteall3=(index)=>
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
        setcontact({
          ...contact,
          country_code: newcountry_code
        });
      };
      const handlemobile_nochange = (index, event) => {
        const newmobile_no = [...contact.mobile_no];
        newmobile_no[index] = event.target.value;
        setcontact({
          ...contact,
          mobile_no: newmobile_no
        });
      };
      const handlemobile_typechange = (index, event) => {
        const newmobile_type = [...contact.mobile_type];
        newmobile_type[index] = event.target.value;
        setcontact({
          ...contact,
          mobile_type: newmobile_type
        });
      };

      function addFn4() {
  
        setcontact({
          ...contact,
          email: [...contact.email, ''],
          email_type: [...contact.email_type, ''],
          action2: [...contact.action2, '']
        });
      };

      const deleteall4=(index)=>
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
          setcontact({
            ...contact,
            email: newemail
          });
        };
        const handleemail_typechange = (index, event) => {
          const newemail_type = [...contact.email_type];
          newemail_type[index] = event.target.value;
          setcontact({
            ...contact,
            email_type: newemail_type
          });
        };
//============================================Sort add contact form end==================================================================


//===============================suggestion box code start for owner form and documents==================================================


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
            setShowSuggestions(false);
          }
        }, [input,allSuggestions]);

        React.useEffect(() => {
          if (documents.linkded_contact) {
            const results = allSuggestions.filter(contact =>
              contact.first_name?.toLowerCase().includes(documents.linkded_contact.toLowerCase())
            );
            setFilteredSuggestions(results);
            setShowSuggestions(true);
          } else {
            setShowSuggestions(false);
          }
        }, [documents.linkded_contact, allSuggestions]);
      
        const handleInputChange = (event) => {
          setInput(event.target.value);
          handleClose2()
        };
        
        
        const [show2, setshow2] = useState(false);
        const handleClose2 = () => setshow2(false);
        const handleShow2=async()=>
        {
          setshow2(true);
        
        }

        const [selectedcontact1,setselectedcontact1]=useState([])
        const [selectedcontact2,setselectedcontact2]=useState([])
        const[newcontact,setnewcontact]=useState([])
        
        const[relation,setrelation]=useState("")

        const handlerelationchange = (e) => {
          setrelation(e.target.value);
        };

        // const [relation1,setrelation1]=useState("")
        React.useEffect(() => {
          
          
          if (relation === "Self" && newcontact) {
            
            setrelation("")
            setselectedcontact1(prevContacts => [
              ...prevContacts,
              newcontact // Add the new contact (assumed to be an object)
            ]);
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
            setdeal(prevDeal => ({
              ...prevDeal,
              associated_contact: [...(prevDeal.associated_contact || []), newcontact._id] // Append new contact to the existing owner_details array
            }));
            // setdeal(prevDeal => ({ ...prevDeal.associated_contact,  newcontact }));
            // setrelation1(relation)
            setrelation("")
          }
        }, [relation,newcontact]);


       
        const handleSuggestionClick = (contact) => {
          handleShow2();
          
          setnewcontact(contact)
          // Update the selectedContacts array
          const updatedContacts = [...selectedContacts, contact];
          setSelectedContacts(updatedContacts);
        
          setInput(''); // Clear the input after selection
          setShowSuggestions(false); // Hide suggestions after selection
          //setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));
        };

        const handleSuggestionClick1 = (contact) => {
         
          setShowSuggestions(false);
          const fullcontact=`${contact.title} ${contact.first_name} ${contact.last_name}`
          setdocuments({ ...documents, linkded_contact: fullcontact })
          
        };
         
        const removeContact = (id) => {
    
          const updatedContacts = selectedContacts.filter(contact => contact._id !== id);
          const updatedContacts1 = selectedcontact1.filter(contact => contact._id !== id);
          const updatedContacts2 = selectedcontact2.filter(contact => contact._id !== id);
          setSelectedContacts(updatedContacts);
          setselectedcontact1(updatedContacts1)
          setselectedcontact2(updatedContacts2)
          
          // Update deal.owner_details with the current selected contacts
          setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));

        };

 
        
//================================suggestion box code end for owner form and documents======================================================



// ============================price change by calculated or absoulute code start======================================================


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

//================================== price change by calculated or absoulute code start====================================================
        
const [progress, setProgress] = useState(deal.white_portion || 10); // Initialize with deal.whiteportion

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
        
const modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }], // font and size
    [{ 'header': '1'}, { 'header': '2'}, { 'header': [3, 4, 5, 6, false] }], // headers
    [{ 'color': [] }, { 'background': [] }], // color and background
    ['bold', 'italic', 'underline', 'strike'], // formatting buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }], // lists
    [{ 'align': [] }], // text alignment
    ['link', 'image'], // link and image options
    ['clean'] // remove formatting button
  ]
};

// Formats that should be available
const formats = [
  'font', 'size', 'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'align',
  'link', 'image'
]

  // Function to strip HTML tags and save plain text
  const stripHTML = (htmlContent) => {
    const plainText = new DOMParser().parseFromString(htmlContent, 'text/html').body.textContent || "";
    return plainText;
  };

  // Automatically save the description when it changes
  const handleChange = (value) => {
    const plainText = stripHTML(value); // Strip HTML tags
    setdeal({ ...deal, remarks: plainText });
    // Optionally, save `plainText` to the database here as well (e.g., send API request)
    console.log("Saving plain text to DB:", plainText);
  };



    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"80%",marginLeft:"170px"}}>
            <div className="row" style={{marginTop:"50px"}}>
        <div className="col-12 border-right border-left">
            <div className="p-3">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" onClick={()=>window.location.reload()} style={{cursor:"pointer"}}>Add Deal</h4>
                </div><hr></hr><br></br>
          
{/*-------------------------------------------------------------------price form----------------------------------------------------- */}
               
                <div className="row"  id="projectform" >
        <div className="col-12">
            <div >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Sale or Rent</h4>
                </div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Available For</label><select name="availablefor" id="availablefor" className="form-control form-control-sm " required="true" onChange={available_for} >
                    <option>---Select---</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                        
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Stage</label><select name="stage"  className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,stage:e.target.value})}>
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
                        <div className="col-md-4 mb-4 custom-input"></div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Project</label>
                        <select className="form-control form-control-sm" name="project" onChange={handleprojectchange}>
                          <option style={{color:"blue",fontWeight:"bold"}}>{unitdata?unitdata.project_name:"---select---"}</option>
                        {
                          allproject.map((project)=>
                          (
                            <option>{project}</option>
                          ))
                        }
                        </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Block</label>
                        <select className="form-control form-control-sm" name="block" onChange={handleallblockchange} >
                         <option style={{color:"blue",fontWeight:"bold"}}>{unitdata?unitdata.block:"---select---"}</option>
                    {
                      allblocks.map((block)=>
                      (
                        <option>{block.block_name}</option>
                      ))
                    }
                      
  
                </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Unit No.</label>
                        <select className="form-control form-control-sm" name="unit_no" onChange={handleallunitschange}  >
                            <option style={{color:"blue",fontWeight:"bold"}}>{unitdata?unitdata.unit_no:"---select---"}</option>
                      {
                        allUnits.map((units)=>
                        (
                          <option>{units.unit_no}</option>
                        ))
                      }
                </select>
                        </div>
                  
                    <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Terms Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                </div>

    {/* ===============================================sale start======================================================================== */}


                <div className="row" id="sale" style={{display:"none"}}>
                  <div className="col-md-12 mb-12 custom-input"><u><b>Expected Price</b></u></div>
                 
                    <div className="col-md-2 mb-2 custom-input"><label className="form-label" >Type</label><select id="calculatedorabsoulute" required="true" className="form-control form-control-sm" onChange={handleselectpricetypechang} >
                    <option value="calculated">calculated</option><option value="absolute">absolute</option>
                    </select></div>
                    <div id="price1" className="col-md-2 mb-2 custom-input"><label className="form-label">Price</label>
                    <input id="eprice" onChange={calculateResult} type="number" className="form-control form-control-sm" /></div>
                    
                    <div className="col-md-0" id="multiply"><label className="form-label" style={{visibility:"hidden"}}>Blank</label>
                    <p>X</p>
                    </div>
                    <div className="col-md-2 mb-2 custom-input" id="totalarea"><label className="form-label" > Total Area</label><input type="number" id="earea" onChange={calculateResult} value={numericValue} className="form-control form-control-sm"  /></div>
                    <div className="col-md-2 mb-2 custom-input" id="measurment"><label className="form-label" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,measurment1:e.target.value})} >
                    <option value="">{measurementUnit}</option>
                    <option value="">sq feet</option>
                    <option value="">sq yard</option>
                    </select></div>
                    
                   <div className="col-md-3 mb-3 custom-input"><label className="form-label">Total Price<span id="priceintext"><br></br>{formatCurrency(result)}<br></br>{resultText}</span></label><input type="text" id="totalprice" style={{display:"none"}} className="form-control form-control-sm" name="expected_price" onChange={(e)=>setdeal({...deal,expected_price:e.target.value})}/></div>
                   <div id="divforprice1" className="col-md-5 mb-5 custom-input" style={{display:"none"}}></div>


                 
                  <div className="col-md-12 mb-12 custom-input"><u><b>Quote Price</b></u></div>
              

                    <div className="col-md-2 mb-2 custom-input"><label className="form-label" >Type</label><select id="calculatedorabsoulute1" required="true" className="form-control form-control-sm" onChange={ehandleselectpricetypechang} >
                    <option value="calculated">calculated</option><option value="absolute">absolute</option>
                    </select></div>
                    <div id="price11" className="col-md-2 mb-2 custom-input"><label className="form-label">Price</label>
                    <input id="qprice" onChange={calculateResult1} type="number" className="form-control form-control-sm" /></div>
                    
                    <div className="col-md-0" id="multiply1"><label className="form-label" style={{visibility:"hidden"}}>Blank</label>
                    <p>X</p>
                    </div>
                    <div className="col-md-2 mb-2 custom-input" id="totalarea1"><label className="form-label" > Total Area</label><input type="number" id="qarea" value={numericValue}  onChange={calculateResult1}  className="form-control form-control-sm"/></div>
                    <div className="col-md-2 mb-2 custom-input" id="measurment1"><label className="form-label" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm"  >
                    <option>{measurementUnit}</option>
                    <option value="">sq feet</option>
                    <option value="">sq yard</option>
                    </select></div>
                    
                   <div className="col-md-3 mb-3 custom-input"><label className="form-label">Total Price<span id="priceintext1"><br></br>{formatCurrency(result1)}<br></br>{resultText1}</span></label><input type="text" id="totalprice1" style={{display:"none"}} className="form-control form-control-sm" name="quote_price" onChange={(e)=>setdeal({...deal,quote_price:e.target.value})}/></div>
                   <div id="divforprice11" className="col-md-5 mb-5 custom-input" style={{display:"none"}}></div>

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Deal Type</label><select className="form-control form-control-sm" name="deal_type" onChange={(e)=>setdeal({...deal,deal_type:e.target.value})}>
                    <option>---Select---</option>
                        <option>Direct Owner Deal</option>
                        <option>Builder Deal</option>
                        <option>Investor Deal</option>
                        <option>Joint Venture Deal</option>
                        <option>Bank Auction Deal</option>
                        <option>Institutional Owner Deal</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Transaction Type</label><select className="form-control form-control-sm" name="transaction_type" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                    <option>Select</option>
                        <option>Full White</option>
                        <option>Collecter Rate</option>
                        <option>Flexiable</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Deal Case</label><select className="form-control form-control-sm" name="deal_case" onChange={(e)=>setdeal({...deal,deal_case:e.target.value})}>
                    <option>---Select---</option>
                        <option>Registry Case</option>
                        <option>Transfer Case</option>
                        <option>GPA Case</option>
                        <option>SPA Case</option>
                        <option>Letter of Intent</option>
                        </select></div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Source</label><select className="form-control form-control-sm" name="source" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>

                        {deal.transaction_type === "Flexiable" && (
                        <div className="col-md-8 mb-8 custom-input">
                           <label className="form-label">White Portion</label>
                        <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                          <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                          <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                      )}
                       

                        <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Team</label><select className="form-control form-control-sm" name="team" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                    <option>Select</option>
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">User</label><select className="form-control form-control-sm" name="user" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Visible To</label><select className="form-control form-control-sm" name="visible_to" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                    <option>Select</option>
                        <option>Only Me</option>
                        <option>Team</option>
                        <option>All User</option>
                        </select></div>

                        <div className="col-md-12 mb-12 custom-input"><label className="form-label">Publish On</label></div>
                    <div className="col-md-12 mb-12 custom-input"><hr></hr></div>
                    <div className="col-md-4 mb-4 custom-input" style={{marginTop:"10px"}}><label className="form-label">Website</label>
                                      <select className="form-control form-control-sm" name="website" required="true" onChange={(e)=>setdeal({...deal,website:e.target.value})}>
                                          <option>select</option>
                                          <option>Own Website</option>
                                          <option>99 Acre</option>
                                          <option>Olx</option>
                                          <option>Magicbricks</option>
                                          <option>Etc.</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4 mb-4 custom-input" style={{marginTop:"10px"}}><label className="form-label">Social Media</label>
                                      <select className="form-control form-control-sm" name="social_media" required="true" onChange={(e)=>setdeal({...deal,social_media:e.target.value})}>
                                          <option>select</option>
                                          <option>Facebook</option>
                                          <option>Instagram</option>
                                          <option>Googe Page</option>
                                          <option>Linkdin</option>
                                          <option>Twitter</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4 mb-4 custom-input" style={{marginTop:"10px"}}><label className="form-label">Send(Matched Lead)</label>
                                      <select className="form-control form-control-sm" name="send_matchedlead" required="true" onChange={(e)=>setdeal({...deal,send_matchedlead:e.target.value})}>
                                          <option>select</option>
                                          <option>Message</option>
                                          <option>What's App</option>
                                          <option>Email</option>
                                          </select>
                                    </div>
                                    <div className="col-md-10 mb-10 custom-input"><label className="form-label">Descriptions</label><textarea type="text" style={{height:"100px"}} className="form-control form-control-sm"  onChange={(e)=>setdeal({...deal,remarks:e.target.value})}/></div>
                                    <div className="col-md-2 mb-2 custom-input"></div>


                      </div>
{/* -----------------------=========================sale end====================================-------------------------------------- */}

{/* ------------------------------------------------============rent start========================-------------------------------------- */}
                     
                     
                        <div className="row" id="rent" style={{display:"none"}}>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Floors</label><select className="form-control form-control-sm" name="floors" onChange={(e)=>setdeal({...deal,floors:e.target.value})}>
                    <option>Select</option>
                        <option>Ground</option>
                        <option>1st</option>
                        <option>2nd</option>
                        <option>3rd</option>
                        <option>4th</option>
                        <option>Top</option>
                        </select></div>
                        <div className="col-md-8 mb-8 custom-input"></div>

                        <div className="col-md-12 mb-12 custom-input"><u><b>Expected Price</b></u></div>
                 
                 <div className="col-md-2 mb-2 custom-input"><label className="form-label" >Type</label><select id="rcalculatedorabsoulute" required="true" className="form-control form-control-sm" onChange={rhandleselectpricetypechang} >
                 <option value="calculated">calculated</option><option value="absolute">absolute</option>
                 </select></div>
                 <div id="rprice1" className="col-md-2 mb-2 custom-input"><label className="form-label">Price</label>
                 <input id="reprice" onChange={calculateResult2} type="number" className="form-control form-control-sm" /></div>
                 
                 <div className="col-md-0" id="rmultiply"><label className="form-label" style={{visibility:"hidden"}}>Blank</label>
                 <p>X</p>
                 </div>
                 <div className="col-md-2 mb-2 custom-input" id="rtotalarea"><label className="form-label" > Total Area</label><input type="number" onChange={calculateResult2} value={numericValue} id="rearea"  className="form-control form-control-sm"  /></div>
                 <div className="col-md-2 mb-2 custom-input" id="rmeasurment"><label className="form-label" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm"  >
                 <option value="">{measurementUnit}</option>
                 <option value="">sq feet</option>
                 <option value="">sq yard</option>
                 </select></div>
                 
                <div className="col-md-3 mb-3 custom-input"><label className="form-label">Total Price<span id="rpriceintext"><br></br>{formatCurrency(result2)}<br></br>{resultText2}</span></label><input type="text" id="rtotalprice" style={{display:"none"}} className="form-control form-control-sm" name="expected_price" onChange={(e)=>setdeal({...deal,expected_price:e.target.value})}/></div>
                <div id="rdivforprice1" className="col-md-5 mb-5 custom-input" style={{display:"none"}}></div>


              
               <div className="col-md-12 mb-12 custom-input"><u><b>Quote Price</b></u></div>
           

                 <div className="col-md-2 mb-2 custom-input"><label className="form-label" >Type</label><select id="rcalculatedorabsoulute11" required="true" className="form-control form-control-sm" onChange={rhandleselectpricetypechang1} >
                 <option value="calculated">calculated</option><option value="absolute">absolute</option>
                 </select></div>
                 <div id="rprice11" className="col-md-2 mb-2 custom-input"><label className="form-label">Price</label>
                 <input id="rqprice1" onChange={calculateResult3} type="number" className="form-control form-control-sm" /></div>
                 
                 <div className="col-md-0" id="rmultiply1"><label className="form-label" style={{visibility:"hidden"}}>Blank</label>
                 <p>X</p>
                 </div>
                 <div className="col-md-2 mb-2 custom-input" id="rtotalarea1"><label className="form-label" > Total Area</label><input type="number" onChange={calculateResult3} value={numericValue} id="rqarea1"  className="form-control form-control-sm"/></div>
                 <div className="col-md-2 mb-2 custom-input" id="rmeasurment1"><label className="form-label" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm" >
                 <option>{measurementUnit}</option>
                 <option value="">sq feet</option>
                 <option value="">sq yard</option>
                 </select></div>
                 
                <div className="col-md-3 mb-3 custom-input"><label className="form-label">Total Price<span id="rpriceintext1"><br></br>{formatCurrency(result3)}<br></br>{resultText3}</span></label><input type="text" id="rtotalprice1" style={{display:"none"}} className="form-control form-control-sm" name="quote_price" onChange={(e)=>setdeal({...deal,quote_price:e.target.value})}/></div>
                <div id="rdivforprice11" className="col-md-5 mb-5 custom-input" style={{display:"none"}}></div>

                
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Security Deposite</label><input type="text" required="true" className="form-control form-control-sm" name="security_deposite" onChange={(e)=>setdeal({...deal,security_deposite:e.target.value})}/></div>
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Maintanance Charge</label><input type="text" required="true" className="form-control form-control-sm" name="maintainence_charge" onChange={(e)=>setdeal({...deal,maintainence_charge:e.target.value})}/></div>
                    <div className="col-md-2 mb-2 custom-input"><label className="form-label">Rent Esclation</label><select className="form-control form-control-sm" name="rent_escltion" onChange={(e)=>setdeal({...deal,rent_escltion:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-2 mb-2 custom-input"><label className="form-label">Rent Period</label><select className="form-control form-control-sm" name="rent_period" onChange={(e)=>setdeal({...deal,rent_period:e.target.value})}>
                    <option>Select</option>
                        <option>06 months</option>
                        <option>11 months</option>
                        <option>24 months</option>
                        <option>36 months</option>
                        </select></div>
                        <div className="col-md-2 mb-2 custom-input"><label className="form-label">Fitout Period</label><select className="form-control form-control-sm" name="fitout_perioud" onChange={(e)=>setdeal({...deal,fitout_perioud:e.target.value})}>
                    <option>Select</option>
                        <option>06 months</option>
                        <option>11 months</option>
                        <option>24 months</option>
                        <option>36 months</option>
                        </select></div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Deal Type</label><select className="form-control form-control-sm" name="deal_type" onChange={(e)=>setdeal({...deal,deal_type:e.target.value})}>
                        <option>---Select---</option>
                        <option>Direct Owner Deal</option>
                        <option>Builder Deal</option>
                        <option>Investor Deal</option>
                        <option>Joint Venture Deal</option>
                        <option>Bank Auction Deal</option>
                        <option>Institutional Owner Deal</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Transaction Type</label><select className="form-control form-control-sm" name="transaction_type" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                    <option>Select</option>
                    <option>Full White</option>
                        <option>Collecter Rate</option>
                        <option>Flexiable</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"></div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Source</label><select className="form-control form-control-sm" name="source" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
                    <option>Select</option>
                    <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                
                        {deal.transaction_type === "Flexiable" && (
                        <div className="col-md-8 mb-8 custom-input">
                           <label className="form-label">White Portion</label>
                        <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                          <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                          <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                      )}
                       
                        

                        <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Team</label><select className="form-control form-control-sm" name="team" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                    <option>Select</option>
                               <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">User</label><select className="form-control form-control-sm" name="user" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                    <option>Select</option>
                    <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Visible To</label><select className="form-control form-control-sm" name="visible_to" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                    <option>Select</option>
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>

                        <div className="col-md-12 mb-12 custom-input"><label className="form-label">Publish On</label></div>
                    <div className="col-md-12 mb-12 custom-input"><hr></hr></div>
                    <div className="col-md-4 mb-4 custom-input" style={{marginTop:"10px"}}><label className="form-label">Website</label>
                                      <select className="form-control form-control-sm" name="website" required="true" onChange={(e)=>setdeal({...deal,website:e.target.value})}>
                                          <option>select</option>
                                          <option>Own Website</option>
                                          <option>99 Acre</option>
                                          <option>Olx</option>
                                          <option>Magicbricks</option>
                                          <option>Etc.</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4 mb-4 custom-input" style={{marginTop:"10px"}}><label className="form-label">Social Media</label>
                                      <select className="form-control form-control-sm" name="social_media" required="true" onChange={(e)=>setdeal({...deal,social_media:e.target.value})}>
                                          <option>select</option>
                                          <option>Facebook</option>
                                          <option>Instagram</option>
                                          <option>Googe Page</option>
                                          <option>Linkdin</option>
                                          <option>Twitter</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4 mb-4 custom-input" style={{marginTop:"10px"}}><label className="form-label">Send(Matched Lead)</label>
                                      <select className="form-control form-control-sm" name="send_matchedlead" required="true" onChange={(e)=>setdeal({...deal,send_matchedlead:e.target.value})}>
                                          <option>select</option>
                                          <option>Message</option>
                                          <option>What's App</option>
                                          <option>Email</option>
                                          </select>
                                    </div>
                                    <div className="col-md-10 mb-10 custom-input"><label className="form-label">Descriptions</label><textarea type="text" style={{height:"100px"}} className="form-control form-control-sm"  onChange={(e)=>setdeal({...deal,remarks:e.target.value})}/></div>
                                    <div className="col-md-2 mb-2 custom-input"></div>
                                    


                      </div>
                  </div>
  
  {/*============================================ rent end=========================================================================== */}
                   
                    </div>
                    
        </div>
        <       div className="row mt-2">
                      <div className="col-md-2 mb-2 custom-input"  style={{marginLeft:"70%",marginBottom:"40px",marginTop:"70px"}} id="ownerbtn"><button className="form-control form-control-sm cancel-btn" onClick={() => navigate(-1)} style={{width:"100px"}}>Cancel</button></div>
                    <div className="col-md-2 mb-2 custom-input"  style={{marginLeft:"-6%",marginBottom:"40px",marginTop:"70px"}} id="ownerbtn"><button className="form-control form-control-sm save-btn" onClick={add_deal} style={{width:"100px"}}>Save</button></div>
                    </div>
        </div>


                </div>
              </div>

        </div>
    </div>
               <ToastContainer/>
        </div>
    );
    }
export default Deal;