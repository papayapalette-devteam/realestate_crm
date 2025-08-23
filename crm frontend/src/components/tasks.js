import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import {   useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";


function Tasks() {

  

// ==============================================fetch data for call fields start=================================================

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


// ===============================================fetch data for call fields end=====================================================

    const navigate=useNavigate()
    React.useEffect(()=>{fetchdata()},[])
    React.useEffect(()=>{fetchdata1()},[])
    React.useEffect(()=>{fetchdata2()},[])

/*-------------------------------------------------------------------fetching all contact data start---------------------------------------------------------------------------- */                                                     
    const[data,setdata]=useState([]);
    const fetchdata=async(event)=>
    {
      
      try {
        const resp=await api.get('viewcalltask')
        const callincoming=resp.data.call_task

        const resp1=await api.get('viewmailtask')
        const mailincoming=resp1.data.mail_task

        setdata([...callincoming,...mailincoming])
      } catch (error) {
        console.log(error);
      }
    
    }

    const[meetingdata,setmeetingdata]=useState([]);
    const fetchdata1=async()=>
    {
      
      try {
        const resp=await api.get('viewmeetingtask')
        const incoming=resp.data.meetingtask
        setmeetingdata([...incoming])
      } catch (error) {
        console.log(error);
      }
    
    }

    const[sitedata,setsitedata]=useState([]);
    const fetchdata2=async()=>
    {
      
      try {
        const resp=await api.get('viewsitevisit')
        const incoming=resp.data.sitevisit
        setsitedata([...incoming])
      } catch (error) {
        console.log(error);
      }
    
    }

    const[alltask,setalltask]=useState([])
    
    useEffect(()=>
    {
      setalltask([...data,...sitedata,...meetingdata])

    },[sitedata,meetingdata,data])

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

        const deleteSelectedItems = async () => {
          try {
            if(selectedItems.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems.map(async (itemId) => {
              await api.delete(`removesitevisittask/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };

        const deleteSelectedItems1 = async () => {
          try {
            if(selectedItems1.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems1.map(async (itemId) => {
              await api.delete(`removecallask/${itemId}`);
            });

            const resp1 = selectedItems1.map(async (itemId) => {
              await api.delete(`removemailask/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };


        const deleteSelectedItems2 = async () => {
          try {
            if(selectedItems2.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems2.map(async (itemId) => {
              await api.delete(`removemeetingtask/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
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

                          } catch (error) {
                            console.log(error);
                          }
                        }
                      
/*-------------------------------------------------------------------searching all contact data by mobile email tags and company end---------------------------------------------------------------------------- */                                                     
      

// ============================site visit task pagination==============================================================

const [currentPage2, setCurrentPage2] = useState(1);
const [itemsPerPage2, setItemsPerPage2] = useState(8); // User-defined items per page
const indexOfLastItem2 = currentPage2 * itemsPerPage2;
const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
const currentItems2 = [...sitedata].reverse().slice(indexOfFirstItem2, indexOfLastItem2);
const totalPages2 = Math.ceil(sitedata.length / itemsPerPage2);


  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage2(Number(e.target.value));
    setCurrentPage2(1); // Reset to first page whenever items per page changes
  };

// Function to handle page changes
const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

// Function to handle "Next" and "Previous" page changes
const goToNextPage2 = () => {
  if (currentPage2 < totalPages2) {
    setCurrentPage2(currentPage2 + 1);
  }
};

const goToPreviousPage2 = () => {
  if (currentPage2 > 1) {
    setCurrentPage2(currentPage2 - 1);
  }
};

const renderPageNumbers2 = () => {
  // Define the range of page numbers to display
  const maxPageNumbersToShow2 = 5;
  const startPage2 = Math.max(1, currentPage2 - Math.floor(maxPageNumbersToShow2 / 2));
  const endPage2 = Math.min(totalPages2, startPage2 + maxPageNumbersToShow2 - 1);

  return (
    <div
      style={{
        display: 'flex',
       
        whiteSpace: 'nowrap',
        padding: '10px-15px',
        width: '100%', 
        position: 'relative'
      }}
    >
      {/* Previous Button */}
      {currentPage2 > 1 && (
        <button onClick={goToPreviousPage2} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {Array.from({ length: endPage2 - startPage2 + 1 }, (_, i) => startPage2 + i).map((number) => (
        <button
          key={number}
          onClick={() => paginate2(number)}
          style={{
            width: '30px',
            borderRadius: '5px',
            marginRight: '5px',
            flexShrink: 0, // Prevent buttons from shrinking
            backgroundColor: number === currentPage2 ? 'lightblue' : 'white',
          }}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      {currentPage2 < totalPages2 && (
        <button onClick={goToNextPage2} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Next
        </button>
      )}
    </div>
  );
};


  // ================================followup task pagination=====================================================

  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(8); // User-defined items per page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = [...data].reverse().slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(data.length / itemsPerPage);


  // Handle items per page change
  const handleItemsPerPageChangefollowup = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

// Function to handle page changes
const paginate = (pageNumber) => setCurrentPage(pageNumber);

// Function to handle "Next" and "Previous" page changes
const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const goToPreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const renderPageNumbers = () => {
  // Define the range of page numbers to display
  const maxPageNumbersToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  return (
    <div
      style={{
        display: 'flex',
       
        whiteSpace: 'nowrap',
        padding: '10px-15px',
        width: '100%', 
        position: 'relative'
      }}
    >
      {/* Previous Button */}
      {currentPage > 1 && (
        <button onClick={goToPreviousPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
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
      {currentPage < totalPages && (
        <button onClick={goToNextPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Next
        </button>
      )}
    </div>
  );
};



// ===========================================meeting task pagination===========================================================


const [currentPage1, setCurrentPage1] = useState(1);
const [itemsPerPage1, setItemsPerPage1] = useState(8); // User-defined items per page
const indexOfLastItem1 = currentPage1 * itemsPerPage1;
const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
const currentItems1 = [...meetingdata].reverse().slice(indexOfFirstItem1, indexOfLastItem1);
const totalPages1 = Math.ceil(meetingdata.length / itemsPerPage1);


  // Handle items per page change
  const handleItemsPerPageChangemeeting = (e) => {
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
        width: '100%', 
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
            backgroundColor: number === currentPage1 ? 'lightblue' : 'white',
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



      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'gray', // use string or valid color code
          color: theme.palette.common.white,
          lineHeight: '0px',
          fontSize: '12px', // added here for consistency
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: '10px', // changed to '12px' from 12
        },
      }));

      
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        lineHeight: '0px',
        fontSize: '12px', 
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
   
  


    
    const[emails,setemails]=useState([])
    const [show3, setshow3] = useState(false);
  
    const handleClose3 = () => setshow3(false);
    const handleShow3=async()=>
    {
      setshow3(true);
      selectedItems.map(async(item)=>
            {
              const resp1=await api.get(`viewcontactbyname/${item}`)// here search contact by id not name
              const emaildata=(resp1.data.contact.email)
              setemails((prevProfile)=>([...prevProfile,emaildata]))
            })
    }
    const[message,setmessage]=useState("")
    
    const sendmail=async(e)=>
      {
        e.preventDefault();
        try {
          
          const resp=await api.post(`contact/sendmail`,{emails,message})
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


/*-------------------------------------------------------------------custome table settings start---------------------------------------------------------------------------- */                                                     
      

// =================================site visit table start===========================================================================
 
const sitevisitcolumns = [
        { id: 'sno', name: '#' },
        { id: 'lead', name: 'Lead' },
        { id: 'project', name: 'Project' },
        { id: 'date', name: 'Date' },
        { id: 'scheduled_for', name: 'Scheduled For' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'source', name: 'Source' },
        { id: 'feedback', name: 'Feedback' },
        { id: 'stage', name: 'Stage' },
        { id: 'status', name: 'Status' },

      ];
      
      const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns, setVisibleColumns] = useState(sitevisitcolumns.slice(1));
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
          setSelectedItems(currentItems2.map((item) => item._id));
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

      useEffect(()=>
        {
          if(selectedItems.length===0)
          {
            document.getElementById("siteaction").style.display="none"
             document.getElementById("meetingaction").style.display="none"
           
          }
          if(selectedItems.length===1)
          {
            document.getElementById("siteaction").style.display="inline-block"
             document.getElementById("meetingaction").style.display="none"
          }

          if(selectedItems.length>1)
          {
            document.getElementById("siteaction").style.display="inline-block"
             document.getElementById("meetingaction").style.display="none"
          
          }
        },[selectedItems])

  //=============================== site visit task table end==================================================================

      const followupcolumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'scheduled_date', name: 'Scheduled Date' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'activity_type', name: 'Activity Type' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'scheduled_for', name: 'Scheduled For' },
        { id: 'stage', name: 'Stage' },
        { id: 'status', name: 'Status' },
     
      ];
      const [selectedItems1, setSelectedItems1] = useState([]); // To track selected rows
      const [selectAll1, setSelectAll1] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns1, setVisibleColumns1] = useState(followupcolumns.slice(1));
      const [showColumnList1, setShowColumnList1] = useState(false);

      const handleSelectAll1 = () => {
       
        setSelectAll1(!selectAll1);
        if (!selectAll1) {
          // Add all current page item IDs to selectedItems
          setSelectedItems1(currentItems.map((item) => item._id));
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

      useEffect(()=>
        {
          if(selectedItems1.length===0)
          {
            document.getElementById("siteaction").style.display="none"
            document.getElementById("meetingaction").style.display="none"
            document.getElementById("followupaction").style.display="none"
           
          }
          if(selectedItems1.length===1)
          {
            document.getElementById("siteaction").style.display="none"
            document.getElementById("meetingaction").style.display="none"
            document.getElementById("followupaction").style.display="inline-block"
          }

          if(selectedItems1.length>1)
          {
            document.getElementById("siteaction").style.display="none"
            document.getElementById("meetingaction").style.display="none"
            document.getElementById("followupaction").style.display="inline-block"
          
          }
        },[selectedItems1])



  //=================================== this is for meeting task==================================================================
      
      const meetingcolumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'scheduled_date', name: 'Scheduled Date' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'activity_type', name: 'Activity Type' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'scheduled_for', name: 'Scheduled For' },
        { id: 'stage', name: 'Stage' },
        { id: 'status', name: 'Status' },
       
      ];
      const [selectedItems2, setSelectedItems2] = useState([]); // To track selected rows
      const [selectAll2, setSelectAll2] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns2, setVisibleColumns2] = useState(meetingcolumns.slice(1));
      const [showColumnList2, setShowColumnList2] = useState(false);

      const handleSelectAll2 = () => {
       
        setSelectAll2(!selectAll2);
        if (!selectAll2) {
          // Add all current page item IDs to selectedItems
          setSelectedItems2(currentItems1.map((item) => item._id));
        } else {
          // Deselect all
          setSelectedItems2([]);
       
        }
      };
    
      const handleRowSelect2 = (id) => {
     
        if (selectedItems2.includes(id)) {
          setSelectedItems2(selectedItems2.filter((itemId) => itemId !== id));
        } else {
          setSelectedItems2([...selectedItems2, id]);
        
        }
      };

      useEffect(()=>
        {
          if(selectedItems2.length===0)
          {
            document.getElementById("meetingaction").style.display="none"
                document.getElementById("siteaction").style.display="none"
           
          }
          if(selectedItems2.length===1)
          {
            document.getElementById("meetingaction").style.display="inline-block"
             document.getElementById("siteaction").style.display="none"
          }

          if(selectedItems2.length>1)
          {
            document.getElementById("meetingaction").style.display="inline-block"
             document.getElementById("siteaction").style.display="none"
          
          }
        },[selectedItems2])


    /*-------------------------------------------------------------------meeting task end---------------------------------------------------------------------------- */                                                     
    
    
      const pagereload=()=>
      {
        window.location.reload()
      }

 /*-------------------------------------------------------------------updation start---------------------------------------------------------------------------- */                                                     


       
       
      

           
         
                        
                     
     

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

const[ischecked,setischecked]=useState(false)
const handleischeckedchange=(e)=>
{
  setischecked(e.target.checked)
}

const Sitevisit=()=>
{
  document.getElementById("followup").style.display="none"
  document.getElementById("followup1").style.backgroundColor="white"
  document.getElementById("followup1").style.borderRadius="0px"

  document.getElementById("sitevisit").style.display="block"
  document.getElementById("sitevisit1").style.backgroundColor="gray"
  document.getElementById("sitevisit1").style.borderRadius="10px"

  document.getElementById("meeting").style.display="none"
  document.getElementById("meeting1").style.backgroundColor="white"
  document.getElementById("meeting1").style.borderRadius="0px"

  document.getElementById("sitevisitpagination").style.display="flex"
  document.getElementById("followuppagination").style.display="none"
      document.getElementById("meetingpagination").style.display="none"
}
const followup=()=>
  {
    document.getElementById("followup").style.display="block"
    document.getElementById("followup1").style.backgroundColor="gray"
    document.getElementById("followup1").style.borderRadius="10px"

    document.getElementById("sitevisit").style.display="none"
    document.getElementById("sitevisit1").style.backgroundColor="white"
    document.getElementById("sitevisit1").style.borderRadius="0px"

    document.getElementById("meeting").style.display="none"
      document.getElementById("meeting1").style.backgroundColor="white"
      document.getElementById("meeting1").style.borderRadius="0px"

  document.getElementById("sitevisitpagination").style.display="none"
  document.getElementById("followuppagination").style.display="flex"
    document.getElementById("meetingpagination").style.display="none"
  }
  const meeting=()=>
    {

      document.getElementById("meeting").style.display="block"
      document.getElementById("meeting1").style.backgroundColor="gray"
      document.getElementById("meeting1").style.borderRadius="10px"

      document.getElementById("followup").style.display="none"
      document.getElementById("followup1").style.backgroundColor="white"
      document.getElementById("followup1").style.borderRadius="0px"
  
      document.getElementById("sitevisit").style.display="none"
      document.getElementById("sitevisit1").style.backgroundColor="white"
      document.getElementById("sitevisit1").style.borderRadius="0px"

      document.getElementById("sitevisitpagination").style.display="none"
      document.getElementById("followuppagination").style.display="none"
        document.getElementById("meetingpagination").style.display="flex"
    }
        


       

                              

// ==================================site visit update with deal update start=============================================================


      const [show1, setshow1] = useState(false);
    
                  const handleClose1 = () => setshow1(false);
                  const handleShow1=async()=>
                  {
                    setshow1(true);
                    fetchsitevisitdata()
                    fetchleaddata()
                   
                  }

                  const [sitevisit,setsitevisit]=useState({activity_type:"SiteVisit",title:"",executive:"",project:[],block:[],sitevisit_type:"",
                    inventory:[],lead:"",confirmation:"",remark:"",participants:"",remind_me:"",start_date:"",end_date:"",complete:"",stage:"",title2:"",first_name:"",
                    last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",status:"",intrested_project:[],intrested_block:[],intrested_inventory:[''],result:[''],action1:[],date:"",feedback:""})


                   

    const fetchsitevisitdata=async(event)=>
    {
    
      
      try {
        const resp=await api.get(`viewsitevisitbyid/${selectedItems}`)
        console.log(resp);
        
        setsitevisit(resp.data.sitevisit)
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

    

                    const activity=["Call","Email","Meeting","Site Visit"]
                    const reason=["Meeting","Site Visit","Discuss","For Requirment","etc"]
                    const direction=["Incoming","Outgoing"]
                    const visittype=["Site Visit","Home Visit","Online"]
                    const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
                    const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]
                    const location=["Home","Office","Company","Site"]
                    


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
                          
                          


                    const [projects, setprojects] = useState([]);
                    const [units, setunits] = useState([]);
                    const [allBlocks, setallBlocks] = useState([]);
                    const [allUnits, setallUnits] = useState([]);

                    const handleprojectchange = (event) => {
                        const {
                          target: { value },
                        } = event;
                      
                        const selectproject = typeof value === 'string' ? value.split(',') : value;
                      
                        setprojects(selectproject);
                        setsitevisit((prev) => {
                          const updatedSiteVisit = { ...prev, project: selectproject };
                          fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
                          return updatedSiteVisit; // Return the updated state
                        });
                      };

                      const fetchdatabyprojectname = async (projectNames) => {

                        try {
                          const fetchPromises = projectNames.map(async (projectName) => {
                            const resp = await api.get(`viewdealbyproject/${projectName}`);
                            return resp.data.deal; // Assuming resp.data.project is an array of units for that project
                          });
                      
                          const results = await Promise.all(fetchPromises);
                          const allFetchedUnits = results.flat();
                          setunits(allFetchedUnits); // Set the units to the flattened result
                        } catch (error) {
                          console.log(error);
                        }
                      };

                      const allproject =[]
    dealdata.map((item) => {
    if (!allproject.includes(item.project)) {
      allproject.push(item.project);
    }
  });

  useEffect(() => {
    if (units.length > 0) {
      // Collect only the unit_number and block from the units array
      const collectedUnits = units.map(item => item.unit_number);
      const collecteblocks = units.map(item => item.block);
  
      // Create a Map to filter out duplicates based on unit_number and get unique unit_numbers
      const uniqueUnits = [
        ...new Map(collectedUnits.map(unit_number => [unit_number, unit_number])).values()
      ];
  
      // Create a Map to filter out duplicates based on block and get unique blocks
      const uniqueblocks = [
        ...new Map(collecteblocks.map(block => [block, block])).values()
      ];
  
      // Set the state with the unique unit_numbers and blocks
      setallUnits(uniqueUnits);
      setallBlocks(uniqueblocks); // Set allBlocks with the unique blocks
    }
  }, [units]);


  const[allblocks,setallblocks]=useState([])
const handleblockchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    setallblocks(selectblock);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, block: selectblock };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const[allunit,setallunit]=useState([])
const handleallunitschange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
     setallunit(selectunits);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, inventory: selectunits };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const[leadid,setleadid]=useState("")
  const handleLeadChange = (e) => {
      const selectedLead = leaddata.find(item => item._id === e.target.value);
      setleadid(selectedLead._id)
      if (selectedLead) {
          const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
          setsitevisit(prevState => ({
              ...prevState,
              lead: fullName,
              title2: selectedLead.title,
              first_name: selectedLead.first_name,
              last_name: selectedLead.last_name,
              mobile_no: selectedLead.mobile_no,
              email: selectedLead.email,
              stage: selectedLead.stage,
              lead_id:selectedLead._id
          }));
      }

  }

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
}, [sitevisit.intrested_project, sitevisit.intrested_block]); // Depend on both interested_project and interested_block


const[contactdata,setcontactdata]=useState([]);
const fetchcontactdata=async(event)=>
{
  
  try {
    const resp=await api.get('viewcontact')
    setcontactdata(resp.data.contact)
  } catch (error) {
    console.log(error);
  }

}

useEffect(()=>
  {
      fetchcontactdata()
  },[])

  const handleToggle3 = (e) => {
    const isChecked = e.target.checked; // Get the checked state
    setsitevisit({ ...sitevisit, complete: isChecked }); // Update the calltask state

    // Open the modal only if the checkbox is checked
    if (isChecked) {
       document.getElementById("sitevisitdetails").style.display="block"
    }
    else{
        document.getElementById("sitevisitdetails").style.display="none"
    }
};


// const updatesite_visit=async()=>
// {
//   try {
//     const resp=await api.put(`updatesitevisittask/${selectedItems}`,sitevisit)
//     if(resp.status===200)
//     {
//       toast.success("Task Completed Successfully",{autoClose:2000})
//     }
//   } catch (error) {
//     console.log(error);
    
//   }
// }




const sitevisitdetails = async () => {
  const title1 = document.getElementById("sitevisittitle").innerText;
const id=selectedItems[0]

  const updatedsiteTask = { ...sitevisit, title: title1 };

  try {
    // const data1 = { newstage: updatestage1 };
    // const stage = { stage:updatestage };

    // if(id)
    //   {
    //    const resp1 = await api.put(`updatelead/${sitevisit.lead_id}`,stage );
    //   }
    
    let isValidCombination = true;
    // for (let i = 0; i < allunit1.length; i++) {
    //   const selectedCombination = allunit1[i];
    //   const [unit_number, block, project] = selectedCombination.split('-');

     
    //   if (unit_number && block && project) {
    //     console.log(`Calling API: updatedealstage/${project}/${block}/${unit_number}`);

    //     try {
    //       // Call API for each valid combination
    //       const resp2 = await api.put(`updatedealstage/${project}/${block}/${unit_number}`, data1);
    //     } catch (error) {
    //       // Handle API errors for the individual combination
    //       toast.error(`API request failed for ${project} - ${block} - ${unit_number}`);
    //       isValidCombination = false; // Set to false if the combination fails
    //     }
    //   } else {
    //     // If any part is missing, skip the combination
    //     toast.warn(`Skipping API call for invalid combination: ${selectedCombination}`);
    //     isValidCombination = false;
    //   }
    // }

    // Post site visit data if the combination is valid
    if (isValidCombination) {
      const resp = await api.put(`updatesitevisittask/${selectedItems}`, updatedsiteTask);

      // If successful, show a success toast and reload
      if (resp.status === 200) {
        toast.success("Task Completed", { autoClose: 2000 });

          checkrequirmentforms(updatedsiteTask)
      }
    } else {
      toast.error("Some project/block/unit combinations were invalid. Please check your data.");
    }

  } catch (error) {
    // Handle any errors during the process
    toast.error("An error occurred. Please check your data and try again.");
  }
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


// ===============================site visit task update with deal update end===========================================================


//============================================ meeting task complete form start=======================================================

const [show4, setshow4] = useState(false);
    
                  const handleClose4 = () => setshow4(false);
                  const handleShow4=async()=>
                  {
                    setshow4(true);
                    fetchmeetingdata()
                    // fetchleaddata()
                  }
                  const [meetingtask,setmeetingtask]=useState({activity_type:"Meeting",title:"",executive:"",lead:"",location_type:"",location_address:"",
                    reason:"",project:[],block:[],inventory:[],remark:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",
                    complete:"",status:"",meeting_result:"",date:"",feedback:""})

                    const fetchmeetingdata=async(event)=>
                      {
                      
                        
                        try {
                          const resp=await api.get(`viewmeetingtaskbyid/${selectedItems2}`)
                          console.log(resp);
                          
                          setmeetingtask(resp.data.meetingtask)
                        } catch (error) {
                          console.log(error);
                        }
                      }

                    


                    const[leadidmeeting,setleadidmeeting]=useState("")
const [projects2, setprojects2] = useState([]);

const handleprojectchange2 = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setprojects2(selectproject);
    setmeetingtask((prev) => {
      const updatedSiteVisit = { ...prev, project: selectproject };
      // fetchdatabyprojectname2(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };


  const[alldealblocksmeeting,setalldealblocksmeeting]=useState([])
  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      meetingtask.project.some((project) => project === item.project)
    );
    setalldealblocksmeeting(dealblocks)
  }, [meetingtask.project]);

  const[allblockmeeting,setallblockmeeting]=useState([])
  const handleallblockchangemeeting = (event) => {
    const {
      target: { value },
    } = event;
  
    // Convert value to an array if it's a string (for multiple selection)
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    // Update the allblock state with full block.block-project combinations (for selected blocks)
    setallblockmeeting(selectblock);
  
    // Update the sitevisit state with only block.block values (not both block.block and block.project)
    setmeetingtask((prev) => {
      const updatemeetingtask = { 
        ...prev, 
        block: selectblock // Store only block.block in sitevisit
      };
      return updatemeetingtask;
    });
  };

  const [alldealunitsmeeting, setalldealunitsmeeting] = useState([]);

  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      meetingtask.project.some((project) => project === item.project) &&
      meetingtask.block.some((block) => block.split('-')[0] === item.block)// Add the condition for interested blocks
    );
    setalldealunitsmeeting(dealblocks);
  }, [meetingtask.project, meetingtask.block]); // Depend on both interested_project and interested_block
  
  // console.log(alldealunits);
  
  
    const[allunit1meeting,setallunit1meeting]=useState([])
    const handleallunitschange1meeting = (event) => {
      const { target: { value } } = event;
    
      // Convert value to an array if it's a string (for multiple selection)
      const selectunits = typeof value === 'string' ? value.split(',') : value;
    
      // Extract only the unit_number from the selected values (split by '-')
      const unitNumbers = selectunits.map(item => item.split('-')[0]); // Get only the unit_number part
    
      // Update allunit1 state with the selected unit numbers
      setallunit1meeting(selectunits);
    
      // Update the sitevisit state with selected units in intrested_inventory
      setmeetingtask((prev) => {
        const updatemeetingtask = { ...prev, inventory: selectunits }; // Store only unit numbers
        return updatemeetingtask;
      });
    };


    const[updatestagemeeting,setupdatestagemeeting]=useState("")
    const[updatestagemeeting1,setupdatestagemeeting1]=useState("")
    const handlereasonchangemeeting =  (e) => {
        const newreason = e.target.value;
    
        // Update the status first
        setmeetingtask((prevState) => {
            return {
                ...prevState,
                reason: newreason
            };
        });
    
        // Now check if status is "Conducted" and update the stage
        if (newreason === "Negotiation") {
          setupdatestagemeeting("Negotiation");
          setupdatestagemeeting1("Negotiation");
        }
        else if (newreason === "Agreement" || newreason === "Token") {
          setupdatestagemeeting("Booked");
          setupdatestagemeeting1("Booked");
      }
        else if (newreason === "Discuss") {
          setupdatestagemeeting("Prospect & Opurtunity");
          setupdatestagemeeting1("Qoute");
        }
    };

    const handleallunitschange2 = (event) => {
      const {
        target: { value },
      } = event;
    
      const selectunits = typeof value === 'string' ? value.split(',') : value;
    
    
      setmeetingtask((prev) => {
        const updatedSiteVisit = { ...prev, inventory: selectunits };
      //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
        return updatedSiteVisit; // Return the updated state
      });
    };

    const[sitevisitdata,setsitevisitdata]=useState([]);
    const fetchsitevisitdataformeeting=async(event)=>
    {
      
      try {
        const resp=await api.get('viewsitevisit')
        const result = resp.data?.sitevisit?.flatMap((item) => item.intrested_inventory) || [];
        setsitevisitdata(result)
      } catch (error) {
        console.log(error);
      }
    
    }

    useEffect(()=>
      {
        fetchsitevisitdataformeeting()
      },[])

    const handleToggle2 = (e) => {
      const isChecked = e.target.checked; // Get the checked state
      setmeetingtask({ ...meetingtask, complete: isChecked }); // Update the calltask state
  
      // Open the modal only if the checkbox is checked
      if (isChecked) {
         document.getElementById("meetingdetails").style.display="block"
      }
      else{
          document.getElementById("meetingdetails").style.display="none"
      }
  };


  const[leaddatameeting,setleaddatameeting]=useState([]);
  const fetchleaddatameeting=async()=>
  {
    
    try {
      const resp=await api.get('leadinfo')
      setleaddatameeting(resp.data.lead)
    } catch (error) {
      console.log(error);
    }
  
  }
  useEffect(()=>
    {
      fetchleaddatameeting()
    },[])

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
      const title1 = document.getElementById("meetingtitle").innerText;
    const id=selectedItems2[0]
    console.log(id);
    
      
      // Update site visit task
      const updatemeetingtask = { ...meetingtask, title: title1 };
    
      try {
        const data1 = { newstage: dealupdatestage };
        const stage = { stage:leadupdatestage };
    
        if(id)
          {
           const resp1 = await api.put(`updateleadbystagebyemail/${meetingtask.email}`,stage );
          }
          
          
    
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
          const resp = await api.put(`updatemeetingtask/${selectedItems2}`, updatemeetingtask);
    
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




    
// =====================================meeting task complete form end===============================================================


// ================================call task complete form start==================================================================

const [show5, setshow5] = useState(false);
    
                  const handleClose5 = () => setshow5(false);
                  const handleShow5=async()=>
                  {
                    setshow5(true);
                    fetchcalldata()
                    // fetchleaddata()
                  }

                  const [calltask,setcalltask]=useState({activity_type:"",title:"",reason:"",lead:"",executive:"",remarks:"",complete:"",due_date:"",due_time:"",title2:"",
                    first_name:"",last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",direction:"",status:"",date:"",duration:"",
                    result:"",intrested_inventory:"",feedback:""})


                  const fetchcalldata=async(event)=>
                    {
                      try {
                        const resp=await api.get(`viewcalltaskbyid/${selectedItems1}`)
                        setcalltask(resp.data.calltask)
                      } catch (error) {
                        console.log(error);
                      }
                    }

                    const[leaddatacall,setleaddatacall]=useState([]);
                    const fetchleaddatacall=async()=>
                    {
                      
                      try {
                        const resp=await api.get('leadinfo')
                        setleaddatacall(resp.data.lead)
                      } catch (error) {
                        console.log(error);
                      }
                    
                    }
                    useEffect(()=>
                      {
                        fetchleaddatacall()
                      },[])


                    const handleToggle = (e) => {
                      const isChecked = e.target.checked; // Get the checked state
                      setcalltask({ ...calltask, complete: isChecked }); // Update the calltask state
                  
                      // Open the modal only if the checkbox is checked
                      if (isChecked) {
                         document.getElementById("calldetails").style.display="flex"
                      }
                      else{
                          document.getElementById("calldetails").style.display="none"
                      }
                  };

                  const handler1=()=>
                    {
                        document.getElementById("date1").style.color="black"
                    }


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
                    const calltaskdetails=async()=>
                      {
                       
                        
                      const title1 = document.getElementById("calltitle").innerText;
                      // Update state
                      const updatedCallTask = { ...calltask, title: title1 };
                      
                      try {
                      const resp=await api.put(`updatecalltask/${selectedItems1}`,updatedCallTask)
                      if(resp.status===200)
                      {
                      toast.success(resp.data.message)
                      checkrequirmentforms(updatedCallTask)
                      }
                  } catch (error) {
          
                      toast.error(error.message)
                  }
              }
          

// ======================================mail task complete form start=============================================================


const [show6, setshow6] = useState(false);
    
                  const handleClose6 = () => setshow6(false);
                  const handleShow6=async()=>
                  {
                    setshow6(true);
                    fetchmaildata()
                    // fetchleaddata()
                  }

const [mailtask,setmailtask]=useState({activity_type:"Mail",title:"",executive:"",lead:"",project:[],block:[],inventory:[],subject:"",remarks:"",
  complete:"",due_date:"",direction:"",status:"",date:"",feedback:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",})


  const fetchmaildata=async(event)=>
    {
      try {
        const resp=await api.get(`viewmailtaskbyid/${selectedItems1}`)
        setmailtask(resp.data.mailtask)
      } catch (error) {
        console.log(error);
      }
    }
console.log(mailtask.block);


    const [mailprojects, setmailprojects] = useState([]);
const handlesiteprojectchangemail = (event) => {
  const {
    target: { value },
  } = event;

  const selectproject = typeof value === 'string' ? value.split(',') : value;

  setmailprojects(selectproject);
  setmailtask((prev) => {
    const updatedmail = { ...prev, project: selectproject };
    // fetchdatabysiteprojectname(selectproject); // Fetch data with the updated project names
    return updatedmail; // Return the updated state
  });
};

const[alldealblocksmail,setalldealblocksmail]=useState([])
useEffect(() => {
  const dealblocks = dealdata.filter((item) =>
    mailtask.project.some((project) => project === item.project)
  );
  setalldealblocksmail(dealblocks)
}, [mailtask.project]);

const[allblockmail,setallblockmail]=useState([])
const handleallblockchangemail = (event) => {
  const {
    target: { value },
  } = event;

  // Convert value to an array if it's a string (for multiple selection)
  const selectblock = typeof value === 'string' ? value.split(',') : value;

  // Update the allblock state with full block.block-project combinations (for selected blocks)
  setallblockmail(selectblock);

  // Update the sitevisit state with only block.block values (not both block.block and block.project)
  setmailtask((prev) => {
    const updatemailtask = { 
      ...prev, 
      block: selectblock // Store only block.block in sitevisit
    };
    return updatemailtask;
  });
};



const [alldealunitsmail, setalldealunitsmail] = useState([]);

useEffect(() => {
  const dealblocks = dealdata.filter((item) =>
    mailtask.project.some((project) => project === item.project) &&
    mailtask.block.some((block) => block === item.block) // Add the condition for interested blocks
  );
  setalldealunitsmail(dealblocks);
}, [mailtask.project, mailtask.block]); // Depend on both interested_project and interested_block

// console.log(alldealunits);


  const[allunitmail,setallunitmail]=useState([])
  const handleallunitschangemail = (event) => {
    const { target: { value } } = event;
  
    // Convert value to an array if it's a string (for multiple selection)
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
    // Extract only the unit_number from the selected values (split by '-')
    const unitNumbers = selectunits.map(item => item.split('-')[0]); // Get only the unit_number part
  
    // Update allunit1 state with the selected unit numbers
    setallunitmail(selectunits);
  
    // Update the sitevisit state with selected units in intrested_inventory
    setmailtask((prev) => {
      const updatemailtask = { ...prev, inventory: selectunits }; // Store only unit numbers
      return updatemailtask;
    });
  };


  const handleToggle1 = (e) => {
    const isChecked = e.target.checked; // Get the checked state
    setmailtask({ ...mailtask, complete: isChecked }); // Update the calltask state

    // Open the modal only if the checkbox is checked
    if (isChecked) {
       document.getElementById("maildetails").style.display="block"
    }
    else{
        document.getElementById("maildetails").style.display="none"
    }
};

const mailtaskdetails=async()=>
  {
   
      const title1 = document.getElementById("mailtitle").innerText;

      // Update state
      const updatedMailTask = { ...mailtask, title: title1 };
      try {
          const resp=await api.put(`updatemailtask/${selectedItems1}`,updatedMailTask)
          if(resp.status===200)
          {
              toast.success(resp.data.message)
             checkrequirmentforms(updatedMailTask)
              
          }
      } catch (error) {
          
          toast.error(error.message)
      }
    }






  //======================================== mail task complete form end==============================================================



// ======================================call task edit start===================================================================


const [show7, setshow7] = useState(false);
    
                  const handleClose7 = () => setshow7(false);
                  const handleShow7=async()=>
                  {
                    setshow7(true);
                    fetchcalldata()
                    // fetchleaddata()
                  }


                  const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    
                    // Day of the month with suffix
                    const day = date.getDate();
                    const suffix = (day === 1 || day === 21 || day === 31)
                      ? 'st' : (day === 2 || day === 22)
                      ? 'nd' : (day === 3 || day === 23)
                      ? 'rd' : 'th';
                      
                    const formattedDay = `${day}${suffix}`;
                    
                    // Month (abbreviated to 3 letters)
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const month = months[date.getMonth()];
                    
                    // Year (4 digits)
                    const year = date.getFullYear();
                    
                    return `${formattedDay} ${month} ${year}`;
                  };
                  
                  const handleDateChange = (e) => {
                    const selectedDate = e.target.value;
                    const formattedDate = formatDate(selectedDate);
                    setcalltask({ ...calltask, due_date: formattedDate });
                  };
                  
                  
                  
                  const formatTime = (timeString) => {
                    let [hours, minutes] = timeString.split(':').map(Number);
                    const isPM = hours >= 12;
                    
                    // Convert to 12-hour format
                    if (hours > 12) hours -= 12;
                    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
                    const period = isPM ? 'PM' : 'AM';
                    
                    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
                  };
                  
                  const handleTimeChange = (e) => {
                    const selectedTime = e.target.value;
                    const formattedTime = formatTime(selectedTime);
                    setcalltask({ ...calltask, due_time: formattedTime });
                  };


// ================================================call task edit end==============================================

// =========================================mail task edit start==============================================================


const [show8, setshow8] = useState(false);
    
                  const handleClose8 = () => setshow8(false);
                  const handleShow8=async()=>
                  {
                    setshow8(true);
                    fetchmaildata()
                  }



// ==================================================mail task edit end====================================================================


// ===========================================site visit edit start============================================================


const [show9, setshow9] = useState(false);
    
                  const handleClose9 = () => setshow9(false);
                  const handleShow9=async()=>
                  {
                    setshow9(true);
                    fetchsitevisitdata()
                  }


                  const updatesitevisit = async () => {
                    const title1 = document.getElementById("sitevisittitle").innerText;
                    // Update site visit task
                    const updatedsiteTask = { ...sitevisit, title: title1 };
                  
                    try {
                   
                        const resp = await api.put(`updatesitevisittask/${selectedItems}`, updatedsiteTask);
                  
                        // If successful, show a success toast and reload
                        if (resp.status === 200) {
                          toast.success("Task Updated", { autoClose: 2000 });
                  
                          setTimeout(() => {
                            window.location.reload();
                          }, 2000);
                        }
                      } 
                  
                     catch (error) {
                      // Handle any errors during the process
                      toast.error("An error occurred. Please check your data and try again.");
                    }
                  };





// =================================================site visit edit end=============================================================


//=================================================== meeting task edit start===========================================================


const [show10, setshow10] = useState(false);
    
                  const handleClose10 = () => setshow10(false);
                  const handleShow10=async()=>
                  {
                    setshow10(true);
                    fetchmeetingdata()
                  }

                  const updatemeetingtask = async () => {
                    const title1 = document.getElementById("meetingtitle").innerText;
                    
                    // Update site visit task
                    const updatemeetingtask = { ...meetingtask, title: title1 };
                  
                    try {
                    
                        const resp = await api.put(`updatemeetingtask/${selectedItems2}`, updatemeetingtask);
                        if (resp.status === 200) {
                          toast.success("Task Updated", { autoClose: 2000 });
                  
                          setTimeout(() => {
                            window.location.reload();
                          }, 2000);
                        }
                      
                    } catch (error) {
                      // Handle any errors during the process
                      toast.error("An error occurred. Please check your data and try again.");
                    }
                  };
              



//================================================== meeting task edit end===============================================================

const[displaytask,setdisplaytask]=useState("")//this is for show follow up ,sitevisit,meeting,today and all task while on click

// ===================================all task for Today start===================================================================

const today = new Date().toISOString().split("T")[0];

 const [currentPagetoday, setCurrentPagetoday] = useState(1);
const [itemsPerPagetoday, setItemsPerPagetoday] = useState(8); // User-defined items per page
const indexOfLastItemtoday = currentPagetoday * itemsPerPagetoday;
const indexOfFirstItemtoday = indexOfLastItemtoday - itemsPerPagetoday;
const currentItemstoday = [...alltask].reverse().slice(indexOfFirstItemtoday, indexOfLastItemtoday);
const totalPagestoday = Math.ceil(alltask.length / itemsPerPagetoday);


  // Handle items per page change
  const handleItemsPerPageChangetoday = (e) => {
    setItemsPerPagetoday(Number(e.target.value));
    setCurrentPagetoday(1); // Reset to first page whenever items per page changes
  };

// Function to handle page changes
const paginatetoday = (pageNumber) => setCurrentPagetoday(pageNumber);

// Function to handle "Next" and "Previous" page changes
const goToNextPagetoday = () => {
  if (currentPagetoday < totalPagestoday) {
    setCurrentPagetoday(currentPagetoday + 1);
  }
};

const goToPreviousPagetoday = () => {
  if (currentPagetoday > 1) {
    setCurrentPagetoday(currentPagetoday - 1);
  }
};

const renderPageNumberstoday = () => {
  // Define the range of page numbers to display
  const maxPageNumbersToShow = 5;
  const startPage = Math.max(1, currentPagetoday - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPagestoday, startPage + maxPageNumbersToShow - 1);

  return (
    <div
      style={{
        display: 'flex',
       
        whiteSpace: 'nowrap',
        padding: '10px-15px',
        width: '100%', 
        position: 'relative'
      }}
    >
      {/* Previous Button */}
      {currentPagetoday > 1 && (
        <button onClick={goToPreviousPagetoday} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((number) => (
        <button
          key={number}
          onClick={() => paginatetoday(number)}
          style={{
            width: '30px',
            borderRadius: '5px',
            marginRight: '5px',
            flexShrink: 0, // Prevent buttons from shrinking
            backgroundColor: number === currentPagetoday ? 'lightblue' : 'white',
          }}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      {currentPagetoday < totalPagestoday && (
        <button onClick={goToNextPagetoday} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Next
        </button>
      )}
    </div>
  );
};

          const alltaskcolumns = [
        { id: 'sno', name: '#' },
        { id: 'activity_type', name: 'Activity_Type' },
        { id: 'details', name: 'Details' },
        { id: 'scheduled_date', name: 'Scheduled_Date' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'source', name: 'Source' },
        { id: 'remark', name: 'Remarks' },
      ];
      const [visibleColumnstoday, setVisibleColumnstoday] = useState(alltaskcolumns.slice(0));

     

// ===============================all task for Today end============================================================================


    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload}>Tasks </h3>
        
        <Tooltip title="Export Data.." arrow>
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button></Tooltip>
            <ul class="dropdown-menu" id="exporttoexcel"> 
            
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
            <label className="labels" id="followup1" style={{marginLeft:"30px",cursor:"pointer",width:"120px",textAlign:"center",backgroundColor:displaytask==="followup"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("followup")}>Follow Up </label>
            <label className="labels" id="sitevisit1" style={{marginLeft:"30px",cursor:"pointer",width:"100px",textAlign:"center",backgroundColor:displaytask==="sitevisit"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("sitevisit")}>Site Visit </label>
            <label className="labels" id="meeting1" style={{marginLeft:"30px",cursor:"pointer",width:"100px",textAlign:"center",backgroundColor:displaytask==="meeting"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("meeting")}>Meeting </label>

            <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"40%"}}>Play Task</button>
            <button onClick={handleAddColumnClick} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"120px",marginLeft:"1%"}}><img src="https://cdn-icons-png.flaticon.com/512/566/566737.png" style={{height:"20px"}}/>Filter</button>
        
       
       
          
      </div>
      <div style={{marginTop:"10px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px",gap:"50px",fontFamily:"times-new-roman",fontWeight:"bold"}}>
        
        <div style={{width:"80px",textAlign:"center",cursor:"pointer",backgroundColor:displaytask==="today"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("today")}>Today</div>
        <div style={{width:"100px",textAlign:"center",cursor:"pointer",backgroundColor:displaytask==="upcoming"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("upcoming")}>Upcoming</div>
        <div style={{width:"100px",textAlign:"center",cursor:"pointer",backgroundColor:displaytask==="overdue"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("overdue")}>Overdue</div>
        <div style={{width:"120px",textAlign:"center",cursor:"pointer",backgroundColor:displaytask==="noduedate"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("noduedate")}>No Due Date</div>
        <div style={{width:"100px",textAlign:"center",cursor:"pointer",backgroundColor:displaytask==="complete"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("complete")}>Completed</div>
        <div style={{width:"50px",textAlign:"center",cursor:"pointer",backgroundColor:displaytask==="all"?"green":"",borderRadius:"20px"}} onClick={()=>setdisplaytask("all")}>All</div>
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"10px",paddingTop:"10px"}}>
      {/* <input type="checkbox" onChange={handleischeckedchange}/>
      <input id="search" type="text" disabled={!ischecked} className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search for tasks calls etc." style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/> */}
           <div id="siteaction" style={{position:"absolute",marginLeft:"1%",gap:"20px",display:"none"}}>
     
     <Tooltip title="Delete Task.." arrow>
     <img id="dealdelete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" onClick={deleteSelectedItems}   style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Edit Task.." arrow>
     <img id="dealedit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png" onClick={handleShow9} style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Complete Task.." arrow>
     <img id="completetask"  src="https://static.vecteezy.com/system/resources/previews/019/513/217/non_2x/tasks-the-woman-marks-the-completed-tasks-on-the-tablet-vector.jpg" onClick={handleShow1}   style={{height:"45px",width:"45px",cursor:"pointer",marginTop:"0px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
   
     
     </div>

     <div id="meetingaction" style={{position:"absolute",marginLeft:"1%",gap:"20px",display:"none"}}>
     
     <Tooltip title="Delete Task.." arrow>
     <img id="dealdelete" src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-delete-button-3d-icon-png-image_6217492.png" onClick={deleteSelectedItems2}   style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Edit Task.." arrow>
     <img id="dealedit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/UniversalEditButton3.svg/1200px-UniversalEditButton3.svg.png" onClick={handleShow10}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Complete Task.." arrow>
     <img id="completetask"  src="https://cdn-icons-png.flaticon.com/512/1632/1632670.png" onClick={handleShow4}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
   
     
     </div>

     <div id="followupaction" style={{position:"absolute",marginLeft:"1%",gap:"20px",display:"none"}}>
     
     <Tooltip title="Delete Task.." arrow>
     <img id="dealdelete" src="https://cdn3d.iconscout.com/3d/premium/thumb/delete-button-3d-icon-download-in-png-blend-fbx-gltf-file-formats--remove-cancel-pack-user-interface-icons-6307914.png?f=webp" onClick={deleteSelectedItems1}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Edit Call Task.." arrow>
     <img id="dealedit" src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png" onClick={handleShow7}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>

     <Tooltip title="Edit Mail Task.." arrow>
     <img id="dealedit" src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png" onClick={handleShow8}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Complete Call Task.." arrow>
     <img id="completetask"  src="https://www.shareicon.net/data/2015/06/12/53127_task_256x256.png" onClick={handleShow5}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     <Tooltip title="Complete Mail Task.." arrow>
     <img id="completetask"  src="https://www.shareicon.net/data/2015/06/12/53127_task_256x256.png" onClick={handleShow6}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
   
     
     </div>
     
      {/* <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",position:"absolute"}}> */}
           {/* <Button className="form-control form-control-sm" style={{width:"120px",backgroundColor:"transparent"}}>Play Task</Button> */}
           {/* <label className="labels" style={{width:"350px"}}>Sorted By Due Date</label>
           </div> */}

    
    
      <div id="sitevisitpagination" style={{fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute",display:displaytask==="sitevisit"?"flex":"none"}}>
   
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers2()}
    </div>

    <div id="followuppagination" style={{fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute",display:displaytask==="followup"?"flex":"none"}}>
   
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChangefollowup} style={{fontSize:"16px",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers()}
    </div>

    <div id="meetingpagination" style={{fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute",display:displaytask==="meeting"?"flex":"none"}}>
   
      
   <label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
   <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChangemeeting} style={{fontSize:"16px",height:"30px"}}>
     <option value="5">5</option>
     <option value="10">10</option>
     <option value="20">20</option>
     <option value="50">50</option>
   </select>
 
 {renderPageNumbers1()}
 </div>

  <div id="alltasktoday" style={{fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute",display:displaytask==="today"||"upcoming"||"overdue"||"noduedate"||"complete"||"all"?"flex":"none"}}>
   
      
   <label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
   <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChangetoday} style={{fontSize:"16px",height:"30px"}}>
     <option value="5">5</option>
     <option value="10">10</option>
     <option value="20">20</option>
     <option value="50">50</option>
   </select>
 
 {renderPageNumberstoday()}
 </div>
        


       
        
      </div>
     
     {/*================================= this list view is for followup =========================================================*/}


          <div id="followup" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="followup"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell>
          {visibleColumns1.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer' ,backgroundColor:"gray"}}
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
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
               {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon} style={{fontSize:"12px"}} />
              <span>{item.email}</span>
            </StyledTableCell>

            <StyledTableCell style={{fontSize:"12px"}}>
              {item.due_date}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              <b>{item.title}</b> <br></br>
              {item.remarks}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.activity_type}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.executive}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
             {item.stage}
            </StyledTableCell>
          <StyledTableCell style={{ fontSize: "12px" }}>
            {(() => {
              const today = new Date();
              const dueDate = new Date(item.due_date);

              // Normalize both dates to remove time
              today.setHours(0, 0, 0, 0);
              dueDate.setHours(0, 0, 0, 0);

              if (item.complete === "true") 
                {
                  return <span style={{ color: "green",fontWeight:"bold"}}>complete</span>;
                }
              if (dueDate.getTime() === today.getTime()) return "today";
              if (dueDate > today)
                {
                   return <span style={{ color: "orange",fontWeight:"bold"}}>pending</span>;
                } 
              if (dueDate < today)
                {
                      return <span style={{ color: "red",fontWeight:"bold"}}>overdue</span>;
                } 
           
            })()}
          </StyledTableCell>

      
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/*====================================followup list view end===================================================================== */}


{/* =========================================list view of site visit============================================================== */}


      <div id="sitevisit" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="sitevisit"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell >
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </StyledTableCell>
          {visibleColumns.map((col) => (
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
         
        currentItems2.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              <input 
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => handleRowSelect(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />

              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
           
                <StyledTableCell style={{ padding: "10px",fontSize:"12px"}}  >
                {
                  Array.isArray(item.project) ? 
                    item.project.map((project, index) => (
                      <div key={index}>{project}</div>  // Replace <div> with the appropriate tag you want
                    )) : 
                    <div>{item.project}</div>  // Render directly if it's not an array
                }

                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px",fontSize:"12px"}}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px",fontSize:"12px"}}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}  >
                {item.executive}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px" ,fontSize:"12px"}}  >
                 {item.title}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}  >
                 
                </StyledTableCell>
                 <StyledTableCell style={{ padding: "10px",fontSize:"12px"}}  >
                    {item.feedback === "" ? item.remark : item.feedback}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px",fontSize:"12px"}}  >
                {item.stage}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px",fontSize:"12px"}}  >
                   {(() => {
              const today = new Date();
              const dueDate = new Date(item.start_date);

              // Normalize both dates to remove time
              today.setHours(0, 0, 0, 0);
              dueDate.setHours(0, 0, 0, 0);

              if (item.complete === "true") 
                {
                  return <span style={{ color: "green",fontWeight:"bold"}}>complete</span>;
                }
              if (dueDate.getTime() === today.getTime()) return "today";
              if (dueDate > today)
                {
                   return <span style={{ color: "orange",fontWeight:"bold"}}>pending</span>;
                } 
              if (dueDate < today)
                {
                      return <span style={{ color: "red",fontWeight:"bold"}}>overdue</span>;
                } 
           
            })()}
                </StyledTableCell>
             
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/*================================== list view of site visit end===================================================================== */}


{/*======================================= meeting list view start================================================================= */}


      <div id="meeting" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="meeting"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell >
            <input
              type="checkbox"
              checked={selectAll2}
              onChange={handleSelectAll2}
            />
          </StyledTableCell>
          {visibleColumns2.map((col) => (
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
                checked={selectedItems2.includes(item._id)}
                onChange={() => handleRowSelect2(item._id)}
              />
              {index + 1}
            </StyledTableCell>
                 <StyledTableCell 
                 
                 style={{ padding: "10px" ,fontSize:"12px"}}
               >
                 {item.activity_type}
               </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon}  style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
           
                <StyledTableCell 
                 
                  style={{ padding: "10px",fontSize:"12px" }}
                >
                  {item.due_date}
                </StyledTableCell>

                <StyledTableCell 
                 
                  style={{ padding: "10px",fontSize:"12px" }}
                >
                  {item.title}
                </StyledTableCell>
           
               <StyledTableCell 
                 
                 style={{ padding: "10px" ,fontSize:"12px"}}
               >
                  {item.executive}
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px" ,fontSize:"12px"}}
               >
                 
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px",fontSize:"12px" }}
               >
                {item.stage}
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px" ,fontSize:"12px"}}
               >
                   {(() => {
              const today = new Date();
              const dueDate = new Date(item.due_date);

              // Normalize both dates to remove time
              today.setHours(0, 0, 0, 0);
              dueDate.setHours(0, 0, 0, 0);

              if (item.complete === "true") 
                {
                  return <span style={{ color: "green",fontWeight:"bold"}}>complete</span>;
                }
              if (dueDate.getTime() === today.getTime()) return "today";
              if (dueDate > today)
                {
                   return <span style={{ color: "orange",fontWeight:"bold"}}>pending</span>;
                } 
              if (dueDate < today)
                {
                      return <span style={{ color: "red",fontWeight:"bold"}}>overdue</span>;
                } 
           
            })()}
               
               </StyledTableCell>
         
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px""}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>
       
    {/*============================================= meeting task list view end====================================================== */}


{/* ===========================================today list view start============================================================== */}

        
          <div id="today" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="today"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {/* <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell> */}
          {visibleColumnstoday.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer' ,backgroundColor:"gray"}}
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
         
       currentItemstoday
        .filter(item => {
          const dateString = item.due_date || item.start_date;
          if (!dateString) return false;

          const dateOnly = dateString.split("T")[0];
          return dateOnly === today && item.complete!=="true";
        }).map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              {/* <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              /> */}
              {index + 1}
            </StyledTableCell>
         
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.activity_type}
            </StyledTableCell>

               <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon}  style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.due_date} {item.start_date}
              </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.executive}
            </StyledTableCell>
              <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.title}
              </StyledTableCell>
                 <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
              
              </StyledTableCell> 
             <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                 {item.feedback === "" ? (item.remark || item.remarks) : item.feedback}
              </StyledTableCell>
      
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/* ==================================================today list view end ===========================================================*/}

{/*======================================== upcoming list view start============================================================== */}

         <div id="upcoming" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="upcoming"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {/* <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell> */}
          {visibleColumnstoday.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer' ,backgroundColor:"gray"}}
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
         
       currentItemstoday
        .filter(item => {
          const dateString = item.due_date || item.start_date;
          if (!dateString) return false;

          const dateOnly = dateString.split("T")[0];
          return dateOnly>today && item.complete!=="true";
        }).map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              {/* <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              /> */}
              {index + 1}
            </StyledTableCell>
         
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.activity_type}
            </StyledTableCell>

               <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon}  style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.due_date} {item.start_date}
              </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.executive}
            </StyledTableCell>
              <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.title}
              </StyledTableCell>
                 <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
              
              </StyledTableCell> 
             <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.feedback === "" ? (item.remark || item.remarks) : item.feedback}
              </StyledTableCell>
      
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/*=========================================== upcoming list view end ===========================================================*/}

{/*======================================== overdue list view start============================================================== */}

         <div id="overdue" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="overdue"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {/* <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell> */}
          {visibleColumnstoday.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer' ,backgroundColor:"gray"}}
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
         
       currentItemstoday
        .filter(item => {
          const dateString = item.due_date || item.start_date;
          if (!dateString) return false;

          const dateOnly = dateString.split("T")[0];
          return dateOnly<today && item.complete!=="true";
        }).map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              {/* <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              /> */}
              {index + 1}
            </StyledTableCell>
         
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.activity_type}
            </StyledTableCell>

               <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon}  style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.due_date} {item.start_date}
              </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.executive}
            </StyledTableCell>
              <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.title}
              </StyledTableCell>
                 <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
              
              </StyledTableCell> 
             <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                {item.feedback === "" ? (item.remark || item.remarks) : item.feedback}
              </StyledTableCell>
      
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/*=========================================== overdue list view end ===========================================================*/}

{/*======================================== noduedate list view start============================================================== */}

         <div id="noduedate" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="noduedate"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {/* <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell> */}
          {visibleColumnstoday.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer' ,backgroundColor:"gray"}}
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
         
       currentItemstoday
        .filter(item => {
          const dateString = item.due_date || item.start_date;
          return !dateString && item.complete!=="true"
        }).map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              {/* <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              /> */}
              {index + 1}
            </StyledTableCell>
         
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.activity_type}
            </StyledTableCell>

               <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon}  style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.due_date} {item.start_date}
              </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.executive}
            </StyledTableCell>
              <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.title}
              </StyledTableCell>
                 <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
              
              </StyledTableCell> 
             <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.feedback === "" ? (item.remark || item.remarks) : item.feedback}
              </StyledTableCell>
      
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/*=========================================== noduedate list view end ===========================================================*/}

{/*======================================== complete list view start============================================================== */}

         <div id="complete" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:displaytask==="complete"?"block":"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {/* <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell> */}
          {visibleColumnstoday.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer' ,backgroundColor:"gray"}}
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
         
       currentItemstoday
        .filter(item => {
          const dateString = item.complete==="true"
          return dateString
        }).map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              {/* <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              /> */}
              {index + 1}
            </StyledTableCell>
         
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.activity_type}
            </StyledTableCell>

               <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon}  style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.due_date} {item.start_date}
              </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.executive}
            </StyledTableCell>
              <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.title}
              </StyledTableCell>
                 <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
              
              </StyledTableCell> 
             <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
               {item.feedback === "" ? (item.remark || item.remarks) : item.feedback}
              </StyledTableCell>
      
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/*=========================================== complete list view end ===========================================================*/}


{/*======================================== all list view start============================================================== */}

         <div id="all" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display: displaytask === "all" || !displaytask ? "block" : "none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {/* <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell> */}
          {visibleColumnstoday.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{   cursor: 'pointer' ,backgroundColor:"gray"}}
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
         
       currentItemstoday
        .map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              {/* <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              /> */}
              {index + 1}
            </StyledTableCell>
         
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.activity_type}
            </StyledTableCell>

               <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon}  style={{fontSize:"12px"}}/>
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon}  style={{fontSize:"12px"}}/>
              <span>{item.email}</span>
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
              {item.due_date} {item.start_date}
              </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.executive}
            </StyledTableCell>
              <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                  {item.title}
              </StyledTableCell>
                 <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
              
              </StyledTableCell> 
             <StyledTableCell style={{ padding: "10px",fontSize:"12px" }}>
                {item.feedback === "" ? (item.remark || item.remarks) : item.feedback}
              </StyledTableCell>
      
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/*=========================================== all list view end ===========================================================*/}

   
  {/* =================================sitevisit complete task model=========================================================== */}

         <Modal show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Site-Visit Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>



                  <div className="row" id="sitevisit" >

<div className="col-md-12"><label className="labels">Title</label><p id="sitevisittitle">Site Visit with {sitevisit.lead} For {sitevisit.project.join(',')}, {sitevisit.inventory.join(',')} on {sitevisit.start_date}</p></div>

    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})} >
<option>{sitevisit.executive} </option>
<option>---select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>

    <div className="col-md-4"><label className="labels">Select Site Visit Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,sitevisit_type:e.target.value})}>
<option>{sitevisit.sitevisit_type} </option>
<option>---select---</option>
   {
    sitevisit_visittype.map(item=>
        (
            <option>{item}</option>
        )
    )
   }
    </select>
    </div>
    <div className="col-md-4"></div>

    <div className="col-md-4"><label className="labels">Select Project</label> 
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.project}
onChange={handleprojectchange}
renderValue={(selected) => selected.join(', ')}
>
{allproject.map((name) => (
    <MenuItem key={name} value={name}>
        <Checkbox checked={sitevisit.project.indexOf(name) > -1} />
        <ListItemText primary={name} />
    </MenuItem>
))}
</Select>
    </div>
   


    <div className="col-md-4"><label className="labels">Select Block</label>
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.block}
onChange={handleblockchange}
renderValue={(selected) => selected.join(', ')}
>
{allBlocks.map((block) => (
<MenuItem key={block} value={block}> {/* Ensure unit_no is the value you want */}
    <Checkbox checked={sitevisit.block.indexOf(block) > -1} />
    <ListItemText primary={block} /> {/* Render unit_no or other relevant property */}
</MenuItem>
))}
</Select>
    </div>
    <div className="col-md-4"><label className="labels">Select Inventory</label>
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.inventory}
onChange={handleallunitschange}
renderValue={(selected) => selected.join(', ')}
>
{allUnits.map((unit) => (
<MenuItem key={unit} value={unit}> {/* Ensure unit_no is the value you want */}
    <Checkbox checked={sitevisit.inventory.indexOf(unit) > -1} />
    <ListItemText primary={unit} /> {/* Render unit_no or other relevant property */}
</MenuItem>
))}
</Select>
    </div>


  
  

     
    <div className="col-md-4"><label className="labels">Select Lead</label>
    <select
    className="form-control form-control-sm"
    required
    onChange={handleLeadChange}>
      <option>{sitevisit.lead}</option>
<option>---Select---</option>
    {
        leaddata.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
    <option>{sitevisit.confirmation}</option>
<option>---Select---</option>
   <option>Confirmed</option>
   <option>Tentative</option>
    </select>
    </div>
    <div className="col-md-4"></div>

    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={sitevisit.remark} style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remark:e.target.value})} /></div>


    <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
    <option>{sitevisit.participants}</option>
<option>---Select---</option>
   {
    contactdata.map((item)=>
    (
        <option>{item.title} {item.first_name} {item.last_name} ({item.company_name})</option>
    )) 
   }
    </select>
    </div>
    <div className="col-md-6"></div>

    {/* <div className="col-md-6"><label className="labels">Remind Me?</label> 
<label class="switch">
<input type="checkbox" checked={sitevisit.remind_me} onChange={(e)=>setsitevisit({...sitevisit,remind_me:e.target.checked})}/>
    <span class="slider round"></span>
    </label>
</div> */}

     
        <div className="col-md-4"><label className="labels">Select Start Date</label><input type="datetime-local"  value={sitevisit.start_date ? sitevisit.start_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,start_date:e.target.value})}/></div>
        <div className="col-md-4"><label className="labels">Select End Date</label><input type="datetime-local"  value={sitevisit.start_date ? sitevisit.start_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,end_date:e.target.value})}/></div>
       <div className="col-md-4"></div>


<div className="col-md-6"><label className="labels">Mark As Completed?</label> 
<label class="switch">
<input type="checkbox" onChange={handleToggle3}/>
    <span class="slider round"></span>
    </label>
</div>



<div className="p-3 py-5" id="sitevisitdetails" style={{width:"100%",display:"none"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Site Visit</h4>
</div><hr></hr>

<div className="row mt-2">

<div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" onChange={handleleadstatuschange} >
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

            {/* <div className="col-md-4"><label className="labels">Select Intrested Project</label> 
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
  <MenuItem key={uniqueBlockKey} value={uniqueBlockKey}> 
    <Checkbox 
      checked={allblock.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
    />
    <ListItemText primary={`${block.block} - ${block.project}`} /> 
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
value={allunit1} 
onChange={handleallunitschange1} 
renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} 
>
{alldealunits
.filter((value, index, self) =>

index === self.findIndex((t) => (
t.project === value.project &&
t.block === value.block &&
t.unit_number === value.unit_number 
))
)
.map((unit) => {

const uniqueKey = `${unit.unit_number}-${unit.block}-${unit.project}`;

return (
<MenuItem key={uniqueKey} value={uniqueKey}> 
<Checkbox checked={allunit1.includes(uniqueKey)} /> 
<ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> 
</MenuItem>
);
})}
</Select>


                </div>*/}

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
</div>


<div className="col-md-2"></div>


</div>




                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={sitevisitdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>


{/* =============================meeting task complete modal=============================================================== */}


<Modal show={show4} onHide={handleClose4} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Meeting Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>



                  <div className="row" id="meeting">

<div className="col-md-12"><label className="labels">Title</label><p id="meetingtitle">MEETING with {meetingtask.lead} For {meetingtask.reason} of {meetingtask.project}, {meetingtask.inventory} on {meetingtask.location_type} @ {meetingtask.due_date}</p></div>
    
    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,executive:e.target.value})}>
<option>{meetingtask.executive}</option>
<option>---Select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>
    
        <div className="col-md-4"><label className="labels">Select Lead</label> <select
        className="form-control form-control-sm"
        required
        onChange={(e) => {
        const selectedLead = leaddatameeting.find(item => item._id === e.target.value);
        if (selectedLead) {
        setleadidmeeting(selectedLead._id)

          const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
          setmeetingtask(prevState => ({
          ...prevState,
          lead: fullName,
          title2: selectedLead.title,
          first_name: selectedLead.first_name,
          last_name: selectedLead.last_name,
          mobile_no:selectedLead.mobile_no,
          email:selectedLead.email,
          stage:selectedLead.stage
          }));
          }
          }}
          >
            <option>{meetingtask.lead}</option>
<option>---Select---</option>
    {
        leaddatameeting.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"></div>
    
    <div className="col-md-4"><label className="labels">Select Location Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,location_type:e.target.value})}>
<option>{meetingtask.location_type}</option>
<option>---Select---</option>
    {
        location.map(item=>
            (
                <option>{item}</option>
            )
        )
    }
    </select>
    </div>
<div className="col-md-8"></div>

<div className="col-md-8"><label className="labels">Location Address</label><input type="text" required="true" value={meetingtask.location_address} className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,location_address:e.target.value})}/></div>
<div className="col-md-4"></div>


<div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={handlereasonchangemeeting}>
<option>{meetingtask.reason}</option>
<option>---Select---</option>
                        {
                            meetingreason.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
    </select>
    </div>
<div className="col-md-8"></div>

{
  meetingtask.reason==="Discuss" && (
    <>

  

        <div className="col-md-4">
      <label className="labels">Select Project</label> 
      <Select
      className="form-control form-control-sm"
      style={{ border: "none" }}
      multiple
      value={meetingtask.project}
      onChange={handleprojectchange2}
      renderValue={(selected) => selected.join(', ')}
      >
      {allproject.map((name) => (
      <MenuItem key={name} value={name}>
      <Checkbox checked={meetingtask.project.indexOf(name) > -1} />
      <ListItemText primary={name} />
      </MenuItem>
      ))}
      </Select>
      </div>


<div className="col-md-4">
<label className="labels">Select Block</label>
<Select
className="form-control form-control-sm"
style={{ border: "none" }}
multiple
value={meetingtask.block}  // Value contains the full block.block-project combinations
onChange={handleallblockchangemeeting}  // Handle the change when blocks are selected/deselected
renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
>
{alldealblocksmeeting
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
      checked={meetingtask.block.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
    />
    <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
  </MenuItem>
);
})
}
</Select>
</div>

<div className="col-md-4"><label className="labels">Select Inventory</label>
         
         <Select
    className="form-control form-control-sm"
    style={{ border: "none" }}
    multiple
    value={meetingtask.inventory} // Holds selected units
    onChange={handleallunitschange1meeting} // Handle changes for unit selection
    renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
    >
    {alldealunitsmeeting
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
          <Checkbox checked={meetingtask.inventory.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
          <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
        </MenuItem>
      );
    })}
    </Select>


             </div>
        </>

  )
}

{
  meetingtask.reason !=="Discuss" && (

    <div className="col-md-4"><label className="labels">Inventory</label>
    <select className="form-control form-control-sm"
onChange={handleallunitschange2}
>
  <option>{meetingtask.inventory}</option>
<option>---select---</option>
{
sitevisitdata.map((item)=>
(
  <option>{item}</option>
))
}

</select>
    </div>

  )
}



<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={meetingtask.remark} style={{height:"100px"}} onChange={(e)=>setmeetingtask({...meetingtask,remark:e.target.value})}/></div>
<div className="col-md-2"></div>

<div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" value={meetingtask.due_date ? meetingtask.due_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,due_date:e.target.value})}/></div>
<div className="col-md-8"></div>


<div className="col-md-6"><label className="labels">Completed?</label> 
<label class="switch">
<input type="checkbox" onChange={handleToggle2} />
    <span class="slider round"></span>
    </label>
</div>


   




<div className="p-3 py-5" id="meetingdetails" style={{display:"none",width:"100%"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Meeting Task</h4>
</div><hr></hr>

<div className="row mt-2">

<div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask((prevState)=>({...prevState,status:e.target.value}))} >
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
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Select Date</label><input type="datetime-local"  className="form-control form-control-sm" value={meetingtask.date ? meetingtask.date.slice(0, 16) : ""} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,date:e.target.value}))} /></div>

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={meetingtask.feedback} style={{height:"100px"}} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,feedback:e.target.value}))}/></div>
 </div>

    </div>
    


    </div> 


                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={meetingdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>

{/* ====================================call task complete modal================================================================ */}

<Modal show={show5} onHide={handleClose5} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Call Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  

                  <div className="row" id="call" style={{padding:"10px"}}>
                        
                        <div className="col-md-12"><label className="labels">Title</label><p id="calltitle">Call {calltask.lead} For Meeting at {calltask.due_date}</p></div>
                        <div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,reason:e.target.value})}>
                    <option>{calltask.reason}</option>
                    <option>---Select---</option>
                        {
                            callreason.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
              
               
                <div className="col-md-4"><label className="labels">Select Lead</label>
                <select
                className="form-control form-control-sm"
                required
                onChange={(e) => {
                const selectedLead = leaddatacall.find(item => item._id === e.target.value);
                if (selectedLead) {
                    const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
                    setcalltask(prevState => ({
                    ...prevState,
                    lead: fullName,
                    title2: selectedLead.title,
                    first_name: selectedLead.first_name,
                    last_name: selectedLead.last_name,
                    mobile_no:selectedLead.mobile_no,
                    email:selectedLead.email,
                    stage:selectedLead.stage
                    }));
                }
                }}
  >
                    <option>{calltask.lead}</option>
                    <option>---Select---</option>
                        {
                            leaddatacall.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,executive:e.target.value})}>
                        <option>{calltask.executive}</option>
                        <option>---Select---</option>
                        <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea value={calltask.remarks} className='form-control form-control-sm' onChange={(e)=>setcalltask({...calltask,remarks:e.target.value})}/></div>

                  
                    <div className="col-md-2"></div>

                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local"  value={calltask.due_date ? calltask.due_date.slice(0, 16) : ""} className="form-control form-control-sm"  onChange={(e)=>setcalltask({...calltask,due_date:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                  <div className="col-md-2"></div>

                  <div style={{width:"100%"}}>
            <div className="row" id='calldetails' style={{display:"none"}}>
           
        <div className="col-12">
            
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
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
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" value={calltask.duration} className="form-control form-control-sm" onChange={(e)=>setcalltask((prevState)=>({...calltask,duration:e.target.value}))}/></div>
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
                        <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,intrested_inventory:e.target.value}))}>
                    <option>{calltask.intrested_inventory}</option>
                    <option>---Select---</option>
                        {
                          sitevisitdata.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={calltask.feedback}  style={{height:"100px"}} onChange={(e)=>setcalltask((prevState)=>({...calltask,feedback:e.target.value}))}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     
                  
                    </div>
                    
        </div>
        </div>
                   
                    </div>
                    </div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose5}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={calltaskdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>


{/*========================================== mail task modal========================================================== */}

                <Modal show={show6} onHide={handleClose6} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Mail Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                  <div className="row" id="email" >

<div className="col-md-12"><label className="labels">Title</label><p id="mailtitle">Mail {mailtask.lead} For Meeting at {mailtask.due_date} for {mailtask.subject} of {mailtask.inventory}</p></div> 

<div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,executive:e.target.value})}>
<option>{mailtask.executive}</option>
<option>---Select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>
<div className="col-md-8"></div>


<div className="col-md-4"><label className="labels">Select Lead</label>     <select
      className="form-control form-control-sm"
      required
      onChange={(e) => {
      const selectedLead = leaddatacall.find(item => item._id === e.target.value);
      if (selectedLead) {
      const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
      setmailtask(prevState => ({
      ...prevState,
      lead: fullName,
      title2: selectedLead.title,
      first_name: selectedLead.first_name,
      last_name: selectedLead.last_name,
      mobile_no:selectedLead.mobile_no,
      email:selectedLead.email,
      stage:selectedLead.stage
      }));
      }
      }}
      >
  <option>{mailtask.lead}</option>
<option>---Select---</option>
    {
        leaddatacall.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-8"></div>

    <div className="col-md-4"><label className="labels">Select Project</label> 
            <Select className="form-control form-control-sm" style={{border:"none"}}
        multiple
        value={mailtask.project?mailtask.project:mailprojects}
        onChange={handlesiteprojectchangemail}
        renderValue={(selected) => selected.join(', ')}
    >
        {allproject.map((name) => (
            <MenuItem key={name} value={name}>
                <Checkbox checked={mailtask.project?mailtask.project.indexOf(name) > -1:mailprojects.indexOf(name) > -1} />
                <ListItemText primary={name} />
            </MenuItem>
        ))}
    </Select>
            </div>

            <div className="col-md-4">
          <label className="labels">Select Block</label>
          <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={mailtask.block?mailtask.block:allblockmail}  // Value contains the full block.block-project combinations
          onChange={handleallblockchangemail}  // Handle the change when blocks are selected/deselected
          renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
          >
          {alldealblocksmail
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
                checked={mailtask.block?mailtask.block.includes(uniqueBlockKey):allblockmail.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
              />
              <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
            </MenuItem>
          );
          })
          }
          </Select>
          </div>



            <div className="col-md-4"><label className="labels">Select Inventory</label>
         
            <Select
        className="form-control form-control-sm"
        style={{ border: "none" }}
        multiple
        value={mailtask.inventory?mailtask.inventory:allunitmail} // Holds selected units
        onChange={handleallunitschangemail} // Handle changes for unit selection
        renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
        >
        {alldealunitsmail
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
        <Checkbox checked={mailtask.inventory?mailtask.inventory.includes(uniqueKey):allunitmail.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
        <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
        </MenuItem>
        );
        })}
        </Select>


                </div>

  


<div className="col-md-4"><label className="labels">Subject</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,subject:e.target.value})}>
    <option>{mailtask.subject}</option>
    <option>---Select---</option>
    {
      mailsubject.map((item)=>
      (
        <option>{item}</option>
      ))
    }
    </select>
    </div>

<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={mailtask.remarks} onChange={(e)=>setmailtask({...mailtask,remarks:e.target.value})}/></div>
    <div className="col-md-2"></div>

<div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local"  value={mailtask.due_date ? mailtask.due_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,due_date:e.target.value})}/></div>


<div className="col-md-6"><label className="labels">Completed?</label> 
<label class="switch" onChange={handleToggle1}>
<input type="checkbox" />
    <span class="slider round"></span>
    </label>
</div>

<div className="p-3 py-5" id="maildetails" style={{display:"none"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Mail Task</h4>
</div><hr></hr>

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
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" value={mailtask.date ? mailtask.date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,date:e.target.value})}/></div>
<div className="col-md-8"> </div>

<div className="col-md-4"></div>

<div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={mailtask.feedback}  style={{height:"100px"}} onChange={(e)=>setmailtask({...mailtask,feedback:e.target.value})}/></div>
<div className="col-md-12"><br></br></div>
<div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
 </div>

</div>


</div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose6}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={mailtaskdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>



{/* ===============================================edit call task=========================================================== */}


<Modal show={show7} onHide={handleClose7} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Edit Call Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  

                  <div className="row" id="call" style={{padding:"10px"}}>
                        
                        <div className="col-md-12"><label className="labels">Title</label><p id="calltitle">Call {calltask.lead} For Meeting at {calltask.due_date}</p></div>
                        <div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,reason:e.target.value})}>
                    <option>{calltask.reason}</option>
                    <option>---Select---</option>
                        {
                            callreason.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
              
               
                <div className="col-md-4"><label className="labels">Select Lead</label>
                <select
                className="form-control form-control-sm"
                required
                onChange={(e) => {
                const selectedLead = leaddatacall.find(item => item._id === e.target.value);
                if (selectedLead) {
                    const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
                    setcalltask(prevState => ({
                    ...prevState,
                    lead: fullName,
                    title2: selectedLead.title,
                    first_name: selectedLead.first_name,
                    last_name: selectedLead.last_name,
                    mobile_no:selectedLead.mobile_no,
                    email:selectedLead.email,
                    stage:selectedLead.stage
                    }));
                }
                }}
  >
                    <option>{calltask.lead}</option>
                    <option>---Select---</option>
                        {
                            leaddatacall.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,executive:e.target.value})}>
                        <option>{calltask.executive}</option>
                        <option>---Select---</option>
                        <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea value={calltask.remarks} className='form-control form-control-sm' onChange={(e)=>setcalltask({...calltask,remarks:e.target.value})}/></div>

                  
                    <div className="col-md-2"></div>

                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" value={calltask.due_date ? calltask.due_date.slice(0, 16) : ""} className="form-control form-control-sm"  onChange={(e)=>setcalltask({...calltask,due_date:e.target.value})}/></div>
                    {/* <div className="col-md-4"><label className="labels">Select Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChange}/></div> */}
                    <div className="col-md-8"></div>

                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                  <div className="col-md-2"></div>

                  <div style={{width:"100%"}}>
            <div className="row" id='calldetails' style={{display:"none"}}>
           
        <div className="col-12">
            
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,direction:e.target.value}))} >
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
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,status:e.target.value}))}>
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
                
               
                <div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" id="date1" value={calltask.date ? calltask.date.slice(0, 16) : ""} className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1} onChange={(e)=>setcalltask((prevState)=>({...calltask,date:e.target.value}))}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" value={calltask.duration} className="form-control form-control-sm" onChange={(e)=>setcalltask((prevState)=>({...calltask,duration:e.target.value}))}/></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,result:e.target.value}))}>
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
                        <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,intrested_inventory:e.target.value}))}>
                    <option>{calltask.intrested_inventory}</option>
                    <option>---Select---</option>
                        {
                          sitevisitdata.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={calltask.feedback}  style={{height:"100px"}} onChange={(e)=>setcalltask((prevState)=>({...calltask,feedback:e.target.value}))}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     
                  
                    </div>
                    
        </div>
        </div>
                    
                  
                    </div>
                    </div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose7}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={calltaskdetails}>
                      Edit Task
                    </Button>
                  </Modal.Footer>
                </Modal>
{/* ========================================================edit call task end================================================== */}
   


{/* ====================================================edit mail task start=============================================== */}


<Modal show={show8} onHide={handleClose8} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Update Mail Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                  <div className="row" id="email" >

<div className="col-md-12"><label className="labels">Title</label><p id="mailtitle">Mail {mailtask.lead} For Meeting at {mailtask.due_date} for {mailtask.subject} of {mailtask.inventory}</p></div> 

<div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,executive:e.target.value})}>
<option>{mailtask.executive}</option>
<option>---Select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>
<div className="col-md-8"></div>


<div className="col-md-4"><label className="labels">Select Lead</label>     <select
      className="form-control form-control-sm"
      required
      onChange={(e) => {
      const selectedLead = leaddatacall.find(item => item._id === e.target.value);
      if (selectedLead) {
      const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
      setmailtask(prevState => ({
      ...prevState,
      lead: fullName,
      title2: selectedLead.title,
      first_name: selectedLead.first_name,
      last_name: selectedLead.last_name,
      mobile_no:selectedLead.mobile_no,
      email:selectedLead.email,
      stage:selectedLead.stage
      }));
      }
      }}
      >
  <option>{mailtask.lead}</option>
<option>---Select---</option>
    {
        leaddatacall.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-8"></div>

    <div className="col-md-4"><label className="labels">Select Project</label> 
            <Select className="form-control form-control-sm" style={{border:"none"}}
        multiple
        value={mailtask.project?mailtask.project:mailprojects}
        onChange={handlesiteprojectchangemail}
        renderValue={(selected) => selected.join(', ')}
    >
        {allproject.map((name) => (
            <MenuItem key={name} value={name}>
                <Checkbox checked={mailtask.project?mailtask.project.indexOf(name) > -1:mailprojects.indexOf(name) > -1} />
                <ListItemText primary={name} />
            </MenuItem>
        ))}
    </Select>
            </div>

            <div className="col-md-4">
          <label className="labels">Select Block</label>
          <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={mailtask.block?mailtask.block:allblockmail}  // Value contains the full block.block-project combinations
          onChange={handleallblockchangemail}  // Handle the change when blocks are selected/deselected
          renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
          >
          {alldealblocksmail
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
                checked={mailtask.block?mailtask.block.includes(uniqueBlockKey):allblockmail.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
              />
              <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
            </MenuItem>
          );
          })
          }
          </Select>
          </div>



            <div className="col-md-4"><label className="labels">Select Inventory</label>
         
            <Select
        className="form-control form-control-sm"
        style={{ border: "none" }}
        multiple
        value={mailtask.inventory?mailtask.inventory:allunitmail} // Holds selected units
        onChange={handleallunitschangemail} // Handle changes for unit selection
        renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
        >
        {alldealunitsmail
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
        <Checkbox checked={mailtask.inventory?mailtask.inventory.includes(uniqueKey):allunitmail.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
        <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
        </MenuItem>
        );
        })}
        </Select>


                </div>

  


<div className="col-md-4"><label className="labels">Subject</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,subject:e.target.value})}>
    <option>{mailtask.subject}</option>
    <option>---Select---</option>
    <option>Payment Reminder</option>
    <option>Agreement Reminder</option>
    <option>Feedback</option>
    <option>Matched inventory update</option>
    <option>Document Required for Submision</option>
    </select>
    </div>

<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={mailtask.remarks} onChange={(e)=>setmailtask({...mailtask,remarks:e.target.value})}/></div>
    <div className="col-md-2"></div>

<div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" value={mailtask.due_date ? mailtask.due_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,due_date:e.target.value})}/></div>


<div className="col-md-6"><label className="labels">Completed?</label> 
<label class="switch" onChange={handleToggle1}>
<input type="checkbox" />
    <span class="slider round"></span>
    </label>
</div>

<div className="p-3 py-5" id="maildetails" style={{display:"none"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Mail Task</h4>
</div><hr></hr>

<div className="row mt-2">

<div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,direction:e.target.value})}>
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
    <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,status:e.target.value})}>
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
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" value={mailtask.date ? mailtask.date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,date:e.target.value})}/></div>
<div className="col-md-8"> </div>

<div className="col-md-4"></div>

<div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={mailtask.feedback}  style={{height:"100px"}} onChange={(e)=>setmailtask({...mailtask,feedback:e.target.value})}/></div>
<div className="col-md-12"><br></br></div>
<div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
 </div>

</div>


</div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose8}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={mailtaskdetails}>
                      Update Task
                    </Button>
                  </Modal.Footer>
                </Modal>




{/* ==================================================edit mail task end========================================================== */}


{/* ============================================edit site visit task start ========================================================*/}

<Modal show={show9} onHide={handleClose9} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Update Site-Visit Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>



                  <div className="row" id="sitevisit" >

<div className="col-md-12"><label className="labels">Title</label><p id="sitevisittitle">Site Visit with {sitevisit.lead} For {sitevisit.project.join(',')}, {sitevisit.inventory.join(',')} on {sitevisit.start_date}</p></div>

    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})} >
<option>{sitevisit.executive} </option>
<option>---select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>

    <div className="col-md-4"><label className="labels">Select Site Visit Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,sitevisit_type:e.target.value})}>
<option>{sitevisit.sitevisit_type} </option>
<option>---select---</option>
   {
    sitevisit_visittype.map(item=>
        (
            <option>{item}</option>
        )
    )
   }
    </select>
    </div>
    <div className="col-md-4"></div>

    <div className="col-md-4"><label className="labels">Select Project</label> 
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.project}
onChange={handleprojectchange}
renderValue={(selected) => selected.join(', ')}
>
{allproject.map((name) => (
    <MenuItem key={name} value={name}>
        <Checkbox checked={sitevisit.project.indexOf(name) > -1} />
        <ListItemText primary={name} />
    </MenuItem>
))}
</Select>
    </div>
   


    <div className="col-md-4"><label className="labels">Select Block</label>
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.block}
onChange={handleblockchange}
renderValue={(selected) => selected.join(', ')}
>
{allBlocks.map((block) => (
<MenuItem key={block} value={block}> {/* Ensure unit_no is the value you want */}
    <Checkbox checked={sitevisit.block.indexOf(block) > -1} />
    <ListItemText primary={block} /> {/* Render unit_no or other relevant property */}
</MenuItem>
))}
</Select>
    </div>
    <div className="col-md-4"><label className="labels">Select Inventory</label>
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.inventory}
onChange={handleallunitschange}
renderValue={(selected) => selected.join(', ')}
>
{allUnits.map((unit) => (
<MenuItem key={unit} value={unit}> {/* Ensure unit_no is the value you want */}
    <Checkbox checked={sitevisit.inventory.indexOf(unit) > -1} />
    <ListItemText primary={unit} /> {/* Render unit_no or other relevant property */}
</MenuItem>
))}
</Select>
    </div>


  
  

     
    <div className="col-md-4"><label className="labels">Select Lead</label>
    <select
    className="form-control form-control-sm"
    required
    onChange={handleLeadChange}>
      <option>{sitevisit.lead}</option>
<option>---Select---</option>
    {
        leaddata.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
    <option>{sitevisit.confirmation}</option>
<option>---Select---</option>
   <option>Confirmed</option>
   <option>Tentative</option>
    </select>
    </div>
    <div className="col-md-4"></div>

    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={sitevisit.remark} style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remark:e.target.value})} /></div>


    <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
    <option>{sitevisit.participants}</option>
<option>---Select---</option>
   {
    contactdata.map((item)=>
    (
        <option>{item.title} {item.first_name} {item.last_name} ({item.company_name})</option>
    )) 
   }
    </select>
    </div>
    <div className="col-md-6"></div>

    {/* <div className="col-md-6"><label className="labels">Remind Me?</label> 
<label class="switch">
<input type="checkbox" checked={sitevisit.remind_me} onChange={(e)=>setsitevisit({...sitevisit,remind_me:e.target.checked})}/>
    <span class="slider round"></span>
    </label>
</div> */}


       
        <div className="col-md-4"><label className="labels">Select Start Date</label><input type="datetime-local" value={sitevisit.start_date ? sitevisit.start_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,start_date:e.target.value})}/></div>
        <div className="col-md-4"><label className="labels">Select End Date</label><input type="datetime-local" value={sitevisit.end_date ? sitevisit.end_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,end_date:e.target.value})}/></div>
      <div className="col-md-4"></div>

<div className="col-md-6"><label className="labels">Mark As Completed?</label> 
<label class="switch">
<input type="checkbox" onChange={handleToggle3}/>
    <span class="slider round"></span>
    </label>
</div>



<div className="p-3 py-5" id="sitevisitdetails" style={{width:"100%",display:"none"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Site Visit</h4>
</div><hr></hr>

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

            {/* <div className="col-md-4"><label className="labels">Select Intrested Project</label> 
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
  <MenuItem key={uniqueBlockKey} value={uniqueBlockKey}> 
    <Checkbox 
      checked={allblock.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
    />
    <ListItemText primary={`${block.block} - ${block.project}`} /> 
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
<MenuItem key={uniqueKey} value={uniqueKey}> 
<Checkbox checked={allunit1.includes(uniqueKey)} /> 
<ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} />
</MenuItem>
);
})}
</Select>


                </div> */}

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

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,feedback:e.target.value})}/></div>


</div>
</div>


<div className="col-md-2"></div>


</div>




                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose9}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={updatesitevisit}>
                      Update Task
                    </Button>
                  </Modal.Footer>
                </Modal>




{/* ==========================================================edit site visit task end =======================================*/}


{/*================================================ edit meeting task start =================================================*/}


<Modal show={show10} onHide={handleClose10} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Update Meeting Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>



                  <div className="row" id="meeting">

<div className="col-md-12"><label className="labels">Title</label><p id="meetingtitle">MEETING with {meetingtask.lead} For {meetingtask.reason} of {meetingtask.project}, {meetingtask.inventory} on {meetingtask.location_type} @ {meetingtask.due_date}</p></div>
    
    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,executive:e.target.value})}>
<option>{meetingtask.executive}</option>
<option>---Select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>
    
        <div className="col-md-4"><label className="labels">Select Lead</label> <select
        className="form-control form-control-sm"
        required
        onChange={(e) => {
        const selectedLead = leaddatameeting.find(item => item._id === e.target.value);
        if (selectedLead) {
        setleadidmeeting(selectedLead._id)

          const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
          setmeetingtask(prevState => ({
          ...prevState,
          lead: fullName,
          title2: selectedLead.title,
          first_name: selectedLead.first_name,
          last_name: selectedLead.last_name,
          mobile_no:selectedLead.mobile_no,
          email:selectedLead.email,
          stage:selectedLead.stage
          }));
          }
          }}
          >
            <option>{meetingtask.lead}</option>
<option>---Select---</option>
    {
        leaddatameeting.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"></div>
    
    <div className="col-md-4"><label className="labels">Select Location Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,location_type:e.target.value})}>
<option>{meetingtask.location_type}</option>
<option>---Select---</option>
    {
        location.map(item=>
            (
                <option>{item}</option>
            )
        )
    }
    </select>
    </div>
<div className="col-md-8"></div>

<div className="col-md-8"><label className="labels">Location Address</label><input type="text" required="true" value={meetingtask.location_address} className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,location_address:e.target.value})}/></div>
<div className="col-md-4"></div>


<div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={handlereasonchangemeeting}>
<option>{meetingtask.reason}</option>
                        <option>---Select---</option>
                        {
                            meetingreason.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
    </select>
    </div>
<div className="col-md-8"></div>

{
  meetingtask.reason==="Discuss" && (
    <>

  

        <div className="col-md-4">
      <label className="labels">Select Project</label> 
      <Select
      className="form-control form-control-sm"
      style={{ border: "none" }}
      multiple
      value={meetingtask.project}
      onChange={handleprojectchange2}
      renderValue={(selected) => selected.join(', ')}
      >
      {allproject.map((name) => (
      <MenuItem key={name} value={name}>
      <Checkbox checked={meetingtask.project.indexOf(name) > -1} />
      <ListItemText primary={name} />
      </MenuItem>
      ))}
      </Select>
      </div>


<div className="col-md-4">
<label className="labels">Select Block</label>
<Select
className="form-control form-control-sm"
style={{ border: "none" }}
multiple
value={meetingtask.block}  // Value contains the full block.block-project combinations
onChange={handleallblockchangemeeting}  // Handle the change when blocks are selected/deselected
renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
>
{alldealblocksmeeting
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
      checked={meetingtask.block.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
    />
    <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
  </MenuItem>
);
})
}
</Select>
</div>

<div className="col-md-4"><label className="labels">Select Inventory</label>
         
         <Select
    className="form-control form-control-sm"
    style={{ border: "none" }}
    multiple
    value={meetingtask.inventory} // Holds selected units
    onChange={handleallunitschange1meeting} // Handle changes for unit selection
    renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
    >
    {alldealunitsmeeting
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
          <Checkbox checked={meetingtask.inventory.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
          <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
        </MenuItem>
      );
    })}
    </Select>


             </div>
        </>

  )
}

{
  meetingtask.reason !=="Discuss" && (

    <div className="col-md-4"><label className="labels">Inventory</label>
    <select className="form-control form-control-sm"
onChange={handleallunitschange2}
>
  <option>{meetingtask.inventory}</option>
<option>---select---</option>
{
sitevisitdata.map((item)=>
(
  <option>{item}</option>
))
}

</select>
    </div>

  )
}



<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={meetingtask.remark} style={{height:"100px"}} onChange={(e)=>setmeetingtask({...meetingtask,remark:e.target.value})}/></div>
<div className="col-md-2"></div>

<div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" value={meetingtask.due_date ? meetingtask.due_date.slice(0, 16) : ""} className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,due_date:e.target.value})}/></div>
<div className="col-md-8"></div>


<div className="col-md-6"><label className="labels">Completed?</label> 
<label class="switch">
<input type="checkbox" onChange={handleToggle2} />
    <span class="slider round"></span>
    </label>
</div>


   




<div className="p-3 py-5" id="meetingdetails" style={{display:"none",width:"100%"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Meeting Task</h4>
</div><hr></hr>

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
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Select Date</label><input type="datetime-local" className="form-control form-control-sm" value={meetingtask.date ? meetingtask.date.slice(0, 16) : ""} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,date:e.target.value}))} /></div>

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={meetingtask.feedback} style={{height:"100px"}} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,feedback:e.target.value}))}/></div>
 </div>

    </div>
    


    </div> 


                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose10}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={updatemeetingtask}>
                      Update Task
                    </Button>
                  </Modal.Footer>
                </Modal>



{/*===================================================== edit meeting task end ===================================================*/}



          <ToastContainer/>
        </div>
     );
}

export default Tasks;