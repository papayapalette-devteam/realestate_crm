import {React,useState,useEffect} from 'react'
import Header1 from './header1'
import Sidebar1 from './sidebar1'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../api";
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { ToastContainer,toast } from "react-toastify";
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

function Leadscoresettings() {


// =====================================fetch lead score data start=====================================================================


    useEffect(()=>{fetchdata()},[])
    const[data,setdata]=useState([]);
    const fetchdata=async(event)=>
      {
        
        try {
          const resp=await api.get('viewleadscore')
          setdata(resp.data.score)
        } catch (error) {
          console.log(error);
        }
      
      }

// ====================================================lead score fetching end=======================================================


// =================================pagination and data list view start===========================================================

  const allColumns = [
    { id: 'sno', name: '#' },
    { id: 'available_for', name: 'Type' },
    { id: 'reason', name: 'Call Reason/Email Subject' },
    { id: 'direction', name: 'Direction' },
    { id: 'status', name: 'Status' },
    { id: 'result', name: 'Result/Email_Subject' },
    { id: 'score', name: 'Score' },
    { id: 'stagerequirment', name: 'Stage_changed_Requirment' },

  ];


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7); // User-defined items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
    // Handle items per page change
    const handleItemsPerPageChange = (e) => {
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

//========================================= pagination and data list view end======================================================


//======================================= select all and single select code start=================================================


            const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
            const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
            const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 10));

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

// ====================================select all and single select code end=======================================================


const [leadscore,setleadscore] = useState({available_for:"",reason:"",direction:"",status:"",result:"",score:"",
                                            email_category:"",email_direction:"",email_status:"",email_score:"",email_subject:"",
                                            meeting_reason:"",meeting_status:"",meeting_result:"",meeting_score:"",
                                            sitevisit_visittype:"",sitevisit_status:"",sitevisit_result:"",sitevisit_score:"",
                                            leadstage:"",dealstage:"",stage_requirment:[],stage_requirment1:[],timeline:""});

//======================================= modal for add lead score for call start==================================================

       const [show1, setshow1] = useState(false);
      
       const handleClose1 = () => setshow1(false);

       const handleShow1=async()=>setshow1(true);

       const [reasons, setReasons] = useState(["Site Visit", "Builder Discount/Scheme","Construction Update","Documentation","Inventory Availability","Inventory Rights for Listing","Legal",
                                                "Loan Discussion","Meeting","Negotiation Discussion","Other","Registry Preparation & Timeline",
                                                "Requirement","Review/Feedback","Tax Discussion"
       ]);
       const [showInput, setShowInput] = useState(false);
       const [newReason, setNewReason] = useState(""); 

       const handleSelectChange = (e) => {
        const value = e.target.value;
        setleadscore({...leadscore,reason:e.target.value});
        if (value === "add_new") {
          setShowInput(true);
        } else {
          setShowInput(false);
        }
      };
    
      const handleAddReason = () => {
        if (newReason.trim() !== "") {
          setReasons([...reasons, newReason]);
          setleadscore({...leadscore,reason:newReason});
          setNewReason("");
          setShowInput(false);
        }
      };

      const [directions, setdirections] = useState(["Outgoing Call", "Incoming Call",]);
          const [showdirectionInput, setShowdirectionInput] = useState(false);
          const [newdirection, setNewdirection] = useState(""); 

          const handleSelectdirectionChange = (e) => {
          const value = e.target.value;
          setleadscore({...leadscore,direction:e.target.value});
          if (value === "add_new") {
          setShowdirectionInput(true);
          } else {
            setShowdirectionInput(false);
          }
          };

          const handleAdddirection = () => {
          if (newdirection.trim() !== "") {
            setdirections([...directions, newdirection]);
          setleadscore({...leadscore,direction:newdirection});
          setNewdirection("");
          setShowdirectionInput(false);
          }
          };

          const [callstatus, setcallstatus] = useState(["Answered", "Cut Call","Not Picked","Busy","Missed","Not Reachable","Switch Off",
                                                        "Number Invalid","Waiting"]);
          const [showcallstatusInput, setShowcallstatusInput] = useState(false);
          const [newcallstatus, setNewcallstatus] = useState(""); 

          const handleSelectstatusChange = (e) => {
          const value = e.target.value;
          setleadscore({...leadscore,status:e.target.value});
          if (value === "add_new") {
          setShowcallstatusInput(true);
          } else {
            setShowcallstatusInput(false);
          }
          };

          const handleAddstatus = () => {
          if (newcallstatus.trim() !== "") {
            setcallstatus([...callstatus, newcallstatus]);
          setleadscore({...leadscore,status:newcallstatus});
          setNewcallstatus("");
          setShowcallstatusInput(false);
          }
          };

          const [callresult, setcallresult] = useState(["Token Terms Accepted – Booking Discussion", "Budget Shared – Awaiting Options",
            "Interested – Wants More Options","Budget Approved – Awaiting Shortlist","Final Deal Discussion Pending","Possession Status Confirmed",
          "Wants Legal/Document Review","Need More Inventory Options"]);
            const [showcallresultInput, setShowcallresultInput] = useState(false);
            const [newcallresult, setNewcallresult] = useState(""); 

            const handleSelectresultChange = (e) => {
            const value = e.target.value;
            setleadscore({...leadscore,result:e.target.value});
            if (value === "add_new") {
              setShowcallresultInput(true);
            } else {
              setShowcallresultInput(false);
            }
            };

            const handleAddresult = () => {
            if (newcallresult.trim() !== "") {
              setcallresult([...callresult, newcallresult]);
            setleadscore({...leadscore,result:newcallresult});
            setNewcallresult("");
            setShowcallresultInput(false);
            }
            };

            const [callscore, setcallscore] = useState(["1", "2","3","4","5","6","7","8","9","-1","-2","-3","-4","-5","-6","-7","-8","-9"]);
              const [showcallscoreInput, setShowcallscoreInput] = useState(false);
              const [newcallscore, setNewcallscore] = useState(""); 
  
              const handleSelectscoreChange = (e) => {
              const value = e.target.value;
              setleadscore({...leadscore,score:e.target.value});
              if (value === "add_new") {
                setShowcallscoreInput(true);
              } else {
                setShowcallscoreInput(false);
              }
              };
  
              const handleAddscore = () => {
              if (newcallscore.trim() !== "") {
                setcallscore([...callscore, newcallscore]);
              setleadscore({...leadscore,score:newcallscore});
              setNewcallscore("");
              setShowcallscoreInput(false);
              }
              };
  
              const addleadscore=async(event)=>
                {
                  
                  try {
                    const resp=await api.post('addleadscore',leadscore)
                    if(resp.status===200)
                    {
                      Swal.fire({
                              title: "Lead Score",
                              text: "lead score criteria saved successfully",
                              icon: "success",
                              confirmButtonColor: '#d33',
                              confirmButtonText: 'OK',
                      })
                    }
                    handleClose1()
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000);
                  } catch (error) {
                    console.log(error);
                  }
                
                }

                   const updateleadscore=async(event)=>
                {
                  
                  try {
                    const resp=await api.put(`updateleadscore/${selectedItems}`,leadscore)
                    if(resp.status===200)
                    {
                      Swal.fire({
                              title: "Lead Score",
                              text: "lead score criteria update successfully",
                              icon: "success",
                              confirmButtonColor: '#d33',
                              confirmButtonText: 'OK',
                      })
                    }
                    handleClose1()
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000);
                  } catch (error) {
                    console.log(error);
                  }
                
                }

        const stagerequirment=["Call Scheduled Form","Mail Scheduled Form","Meeting Scheduled Form","Site Visit Scheduled Form",
          "Call Completed Form","Mail Completed Form","Meeting Completed Form","Site Visit Completed Form","Negotiation Form",
          "Requirment Form"]

        const stagerequirment1=["Call Scheduled Form","Mail Scheduled Form","Meeting Scheduled Form","Site Visit Scheduled Form",
          "Call Completed Form","Mail Completed Form","Meeting Completed Form","Site Visit Completed Form","Negotiation Form",
          ,"Requirment Form"]
          

//===============================================modal for add lead score for call end============================================


//=========================================== modal for add lead score for email start===============================================

    const [emailsubjects_purpose, setemailsubjects_purpose] = useState(["Payment Reminder", "Agreement Reminder","Follow-Up",
      "Meeting","Loan Discussion","Meeting","Negotiation Discussion","Other","Registry Preparation & Timeline",
      "Matched Deal Update","Feedback","Document","Site Visit Scheduling","Reschedule Attempt","Payment Follow-Up","Transactional Email",
      "Meeting/Call Setup","Initial Meeting Request","Follow-Up Reminder","Reconnect Post-Site Visit","Urgency / Reminder",
      "After Site Visit","Document Sharing","Booking Step","Occasion-based","Greeting","General Follow-Up","Informational","Recap Email",
      "Meeting Follow-Up"
    ]);
    const [showInputemailsubjects_purpose, setShowInputemailsubjects_purpose] = useState(false);
    const [newemailsubjects_purpose, setNewemailsubjects_purpose] = useState(""); 

    const handleSelectChangeemailsubjects_purpose = (e) => {
    const value = e.target.value;
    setleadscore({...leadscore,email_category:e.target.value});
    if (value === "add_new") {
      setShowInputemailsubjects_purpose(true);
    } else {
      setShowInputemailsubjects_purpose(false);
    }
    };

    const handleAddemailsubjects_purpose = () => {
    if (newemailsubjects_purpose.trim() !== "") {
      setemailsubjects_purpose([...emailsubjects_purpose, newemailsubjects_purpose]);
    setleadscore({...leadscore,email_category:newemailsubjects_purpose});
    setNewemailsubjects_purpose("");
    setShowInputemailsubjects_purpose(false);
    }
    };


    const [emaildirections, setemaildirections] = useState(["Outgoing", "Inccoming",]);
    const [showInputemaildirections, setShowInputemaildirections] = useState(false);
    const [newemaildirections, setNewemaildirections] = useState(""); 

    const handleSelectChangeemaildirections = (e) => {
    const value = e.target.value;
    setleadscore({...leadscore,email_direction:e.target.value});
    if (value === "add_new") {
      setShowInputemaildirections(true);
    } else {
      setShowInputemaildirections(false);
    }
    };

    const handleAdddemaildirections = () => {
    if (newemaildirections.trim() !== "") {
      setemaildirections([...emaildirections, newemaildirections]);
    setleadscore({...leadscore,email_direction:newemaildirections});
    setNewemaildirections("");
    setShowInputemaildirections(false);
    }
    };


    const [emailstatus, setemailstatus] = useState(["Read", "Delivered","Undelivered","Bounced","Sent & Replied","Sent", "No Response",
      "Read & Replied","Unread","Replied","Read Only","Replied","Ignored","Clicked","Downloaded","Opened","No Response"
    ]);
    const [showInputemailstatus, setShowInputemailstatus] = useState(false);
    const [newemailstatus, setNewemailstatus] = useState(""); 

    const handleSelectChangeemailstatus = (e) => {
    const value = e.target.value;
    setleadscore({...leadscore,email_status:e.target.value});
    if (value === "add_new") {
      setShowInputemailstatus(true);
    } else {
      setShowInputemailstatus(false);
    }
    };

    const handleAdddemailstatus = () => {
    if (newemailstatus.trim() !== "") {
      setemailstatus([...emailstatus, newemailstatus]);
    setleadscore({...leadscore,email_status:newemailstatus});
    setNewemailstatus("");
    setShowInputemailstatus(false);
    }
    };

    const [emailsubject, setemailsubject] = useState(["Reminder: Your Payment is Due – Complete the Process", "Pending Payment for Your Property Booking",
      "Secure Your Deal – Complete Payment Today","Please Review & Sign the Property Agreement","Action Needed: Property Agreement Pending",
      "Reminder: Signature Required for Your Agreement","Finalize Your Property – Complete the Agreement","Following Up on Your Property Inquiry"
    ]);
    const [showInputemailsubject, setShowInputemailsubject] = useState(false);
    const [newemailsubject, setNewemailsubject] = useState(""); 

    const handleSelectChangeemailsubject = (e) => {
    const value = e.target.value;
    setleadscore({...leadscore,email_subject:e.target.value});
    if (value === "add_new") {
      setShowInputemailsubject(true);
    } else {
      setShowInputemailsubject(false);
    }
    };

    const handleAdddemailsubject = () => {
    if (newemailsubject.trim() !== "") {
      setemailsubject([...emailsubject, newemailsubject]);
    setleadscore({...leadscore,email_subject:newemailsubject});
    setNewemailsubject("");
    setShowInputemailsubject(false);
    }
    };

    const [emailscore, setemailscore] = useState(["1", "2","3","4","5","-1","-2"])
    const [showInputemailscore, setShowInputemailscore] = useState(false);
    const [newemailscore, setNewemailscore] = useState(""); 

    const handleSelectChangeemailscore = (e) => {
    const value = e.target.value;
    setleadscore({...leadscore,email_score:e.target.value});
    if (value === "add_new") {
      setShowInputemailscore(true);
    } else {
      setShowInputemailscore(false);
    }
    };

    const handleAdddemailscore = () => {
    if (newemailscore.trim() !== "") {
      setemailscore([...emailscore, newemailscore]);
    setleadscore({...leadscore,email_score:newemailscore});
    setNewemailscore("");
    setShowInputemailscore(false);
    }
    };


// ==============================================modal for add lead score for email end==================================================


//=========================================== modal for add lead score for meeting start===============================================

const [meetingreason, setmeetingreason] = useState(["Discuss For Deal", "Requirement","Site Visit","Meeting","Revival Meeting",
  "Cold Lead Revival","Owner Meeting","Broker Meeting","Builder Meeting", "Requirement Meeting","Shortlisting Discuss",
  "Post-Visit Feedback","Negotiation Meeting","Token/Booking","Deal Closing","Documentation Required",
]);
const [showInputmeetingreason, setShowInputmeetingreason] = useState(false);
const [newmeetingreason, setNewmeetingreason] = useState(""); 

const handleSelectChangemeetingreason = (e) => {
const value = e.target.value;
setleadscore({...leadscore,meeting_reason:e.target.value});
if (value === "add_new") {
  setShowInputmeetingreason(true);
} else {
  setShowInputmeetingreason(false);
}
};

const handleAddmeetingreason = () => {
if (newmeetingreason.trim() !== "") {
  setmeetingreason([...meetingreason, newmeetingreason]);
setleadscore({...leadscore,meeting_reason:newmeetingreason});
setNewmeetingreason("");
setShowInputmeetingreason(false);
}
};

const [meetingstatus, setmeetingstatus] = useState(["Conducted", "Postponed","Cancelled"]);
const [showInputmeetingstatus, setShowInputmeetingstatus] = useState(false);
const [newmeetingstatus, setNewmeetingstatus] = useState(""); 

const handleSelectChangemeetingstatus = (e) => {
const value = e.target.value;
setleadscore({...leadscore,meeting_status:e.target.value});
if (value === "add_new") {
  setShowInputmeetingstatus(true);
} else {
  setShowInputmeetingstatus(false);
}
};

const 
handleAddmeetingstatus = () => {
if (newmeetingstatus.trim() !== "") {
  setmeetingstatus([...meetingstatus, newmeetingstatus]);
setleadscore({...leadscore,meeting_status:newmeetingstatus});
setNewmeetingstatus("");
setShowInputmeetingstatus(false);
}
};

const [meetingresult, setmeetingresult] = useState(["Interested", "Just Enquiry","Low Budget","Location Mismatch","Enquiry For Friend",
  "Cancelled","Not Interested","Requirement Updated","Price/Details Updated","Properties Exchanged","New Pricing Shared",
  "Requirement Captured","Shortlisted Finalized","Liked Property","Wants to Negotiate","Price Discussion","Token Received",
  "Buyer Backed Out","Registry Done","Docs Clear","Issue Found"
]);
const [showInputmeetingresult, setShowInputmeetingresult] = useState(false);
const [newmeetingresult, setNewmeetingresult] = useState(""); 

const handleSelectChangemeetingresult = (e) => {
const value = e.target.value;
setleadscore({...leadscore,meeting_result:e.target.value});
if (value === "add_new") {
  setShowInputmeetingresult(true);
} else {
  setShowInputmeetingresult(false);
}
};

const handleAddmeetingresult = () => {
if (newmeetingresult.trim() !== "") {
  setmeetingresult([...meetingresult, newmeetingresult]);
setleadscore({...leadscore,meeting_result:newmeetingresult});
setNewmeetingresult("");
setShowInputmeetingresult(false);
}
};

const [meetingscore, setmeetingscore] = useState(["1","2","3","4","5","6","7","10","15","0","-1",

]);
const [showInputmeetingscore, setShowInputmeetingscore] = useState(false);
const [newmeetingscore, setNewmeetingscore] = useState(""); 

const handleSelectChangemeetingscore = (e) => {
const value = e.target.value;
setleadscore({...leadscore,meeting_score:e.target.value});
if (value === "add_new") {
  setShowInputmeetingscore(true);
} else {
  setShowInputmeetingscore(false);
}
};

const handleAddmeetingscore = () => {
if (newmeetingscore.trim() !== "") {
  setmeetingscore([...meetingscore, newmeetingscore]);
setleadscore({...leadscore,meeting_score:newmeetingscore});
setNewmeetingscore("");
setShowInputmeetingscore(false);
}
};




// ==============================================modal for add lead score for meeting end==================================================


//=========================================== modal for add lead score for sitevisit start===============================================

const [sitevisit_visittype, setsitevisit_visittype] = useState(["Site Visit", "Revisit","Online Visit","Developer Sample Vist"]);
const [showInputsitevisit_visittype, setshowInputsitevisit_visittype] = useState(false);
const [newsitevisit_visittype, setNewsitevisit_visittype] = useState(""); 

const handleSelectChangesitevisit_visittype = (e) => {
const value = e.target.value;
setleadscore({...leadscore,sitevisit_visittype:e.target.value});
if (value === "add_new") {
  setshowInputsitevisit_visittype(true);
} else {
  setshowInputsitevisit_visittype(false);
}
};

const handleAddsitevisit_visittype = () => {
if (newsitevisit_visittype.trim() !== "") {
  setsitevisit_visittype([...sitevisit_visittype, newsitevisit_visittype]);
setleadscore({...leadscore,sitevisit_visittype:newsitevisit_visittype});
setNewsitevisit_visittype("");
setshowInputsitevisit_visittype(false);
}
};

const [sitevisit_status, setsitevisit_status] = useState(["Conducted", "Postponed","Did Not Visit","Cancelled","Rescheduled"]);
const [showInputsitevisit_status, setshowInputsitevisit_status] = useState(false);
const [newsitevisit_status, setNewsitevisit_status] = useState(""); 

const handleSelectChangesitevisit_status = (e) => {
const value = e.target.value;
setleadscore({...leadscore,sitevisit_status:e.target.value});
if (value === "add_new") {
  setshowInputsitevisit_status(true);
} else {
  setshowInputsitevisit_status(false);
}
};

const handleAddsitevisit_status = () => {
if (newsitevisit_status.trim() !== "") {
  setsitevisit_status([...sitevisit_status, newsitevisit_status]);
setleadscore({...leadscore,sitevisit_status:newsitevisit_status});
setNewsitevisit_status("");
setshowInputsitevisit_status(false);
}
};

const [sitevisit_result, setsitevisit_result] = useState(["Interested", "Token Discussion","Shortlisted","Second Visit Required",
  "Family Discussion","Need More Options","Budget Issue","Postponed","Visit Cancelled","Visit Not Attended","Location Mismatch",
  "Not Interested"]);
const [showInputsitevisit_result, setshowInputsitevisit_result] = useState(false);
const [newsitevisit_result, setNewsitevisit_result] = useState(""); 

const handleSelectChangesitevisit_result = (e) => {
const value = e.target.value;
setleadscore({...leadscore,sitevisit_result:e.target.value});
if (value === "add_new") {
  setshowInputsitevisit_result(true);
} else {
  setshowInputsitevisit_result(false);
}
};

const handleAddsitevisit_result = () => {
if (newsitevisit_result.trim() !== "") {
  setsitevisit_result([...sitevisit_result, newsitevisit_result]);
setleadscore({...leadscore,sitevisit_result:newsitevisit_result});
setNewsitevisit_result("");
setshowInputsitevisit_result(false);
}
};

const [sitevisit_score, setsitevisit_score] = useState(["1", "2","3","4","5","6","7","8","10","12","15","-1","-2","-3","-4","-5","-6"]);
const [showInputsitevisit_score, setshowInputsitevisit_score] = useState(false);
const [newsitevisit_score, setNewsitevisit_score] = useState(""); 

const handleSelectChangesitevisit_score = (e) => {
const value = e.target.value;
setleadscore({...leadscore,sitevisit_score:e.target.value});
if (value === "add_new") {
  setshowInputsitevisit_score(true);
} else {
  setshowInputsitevisit_score(false);
}
};

const handleAddsitevisit_score = () => {
if (newsitevisit_score.trim() !== "") {
  setsitevisit_score([...sitevisit_score, newsitevisit_score]);
setleadscore({...leadscore,sitevisit_score:newsitevisit_score});
setNewsitevisit_score("");
setshowInputsitevisit_score(false);
}
};

// =======================================modal for lead score sitevisit end=======================================================


// ============================================delect select items code start====================================================


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
                
                            const resp = selectedItems.map(async (itemId) => {
                              await api.delete(`deleteleadscore/${itemId}`);
                            });
                            
                              Swal.fire({
                                          icon: 'success',
                                          title: 'Lead Score Criteria Deleted',
                                          text: 'Selected items deleted successfully!',
                                        });
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);
                          } catch (error) {
                            console.log(error);
                          }
                        };

                        useEffect(()=>
                          {
                            if(selectedItems.length===0)
                              {
                                document.getElementById("delete").style.display="none"
                                document.getElementById("edit").style.display="none"
                             
                              }
                            if(selectedItems.length===1)
                              {
                                document.getElementById("delete").style.display="inline-block"
                                document.getElementById("edit").style.display="inline-block"
                               
                              }
                            
                                if(selectedItems.length>1)
                                  {
                                    document.getElementById("delete").style.display="inline-block"
                                    document.getElementById("edit").style.display="none"
                                  
                                  }
                          },[selectedItems])

//================================ delete code for selected items code end=========================================================


// ===========================================edit code for selected items start====================================================

const handleedit = async () => {
  handleShow1();
  try {
    const resp = await api.get('viewleadscore');
    
    // find the item whose _id matches selectedItems[0]
    const filteredleadscore = resp.data.score.find(
      (item) => item._id === selectedItems[0]
    );

    if (filteredleadscore) {
      setleadscore(filteredleadscore);
    } else {
      console.warn("No matching lead score found.");
    }

  } catch (error) {
    console.log("Error fetching lead score:", error);
  }
};

//=============================================== edit code for selected items end===================================================


                const [isHoveringDelete, setIsHoveringDelete] = useState(false);
                const [isHoveringEdit, setIsHoveringEdit] = useState(false);

  return (
    <div>
        <Header1/>
        <Sidebar1/>
   
     <div style={{marginTop:"60px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
           
           <h3 style={{marginLeft:"10px",cursor:"pointer"}}>Lead Score Creating </h3>
          
               <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
               <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
           </button>
               <ul class="dropdown-menu" id="exporttoexcel" style={{textAlign:"left",padding:"0px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",fontFamily:"arial",fontSize:"14px",lineHeight:"30px"}}> 
               
               <li   ><img src="https://static.thenounproject.com/png/1960252-200.png" style={{height:"20px",marginTop:"5px"}}></img>
               Export Data
               </li>
               <li  ><img src="https://www.svgrepo.com/show/447311/database-import.svg" style={{height:"20px",marginTop:"5px"}}></img>
               Import Data</li>
               <li ><img src="https://static.thenounproject.com/png/2406231-200.png"  style={{height:"20px",marginTop:"5px"}}></img>
               Download Data(sample)</li>
               </ul>

                 <Tooltip title="Add Lead Score Criteria..." arrow>
                           <button onClick={handleShow1}  style={{ position:"relative",marginLeft: '40%',width:"50px",padding: '8px',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer',fontWeight: 'bold',textAlign: 'center'}} className="form-control form-control-sm form-control form-control-sm-sm"  >
                                  <img src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-vector-plus-icon-png-image_5169416.jpg" style={{height:"25px"}}></img>
                           </button>
                </Tooltip>

                           <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",position:"absolute"}}>
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers()}
    </div>

    
     </div>

     <div id="action" style={{position:"relative",marginLeft:"6%",gap:"20px"}}>
          
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
                   //  display:"none",
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
        onClick={handleedit}
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
           </div>

         
           
             
  
            <div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
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
                  >
                    {col.name}
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
                  >
                  {item.available_for}
        
                  </StyledTableCell>

                  <StyledTableCell 
                    style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
                  >
                  {item.reason}
                  {item.email_category}
                  {item.meeting_reason}
                  {item.sitevisit_visittype}
                  </StyledTableCell>
      
                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                    {item.direction}
                    {item.email_direction}
                  </StyledTableCell>
      
                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                   {item.status}
                   {item.email_status}
                   {item.meeting_status}
                   {item.sitevisit_status}
                  </StyledTableCell>
                
                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                   {item.result}
                   {item.email_subject}
                   {item.meeting_result}
                   {item.sitevisit_result}
                  </StyledTableCell>

                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                   {item.score}
                   {item.email_score}
                   {item.meeting_score}
                   {item.sitevisit_score}
                  </StyledTableCell>

                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                   Lead Requirment:{item.stage_requirment.join(',')}<br></br>
                   Deal Requirment:{item.stage_requirment1.join(',')}<br></br>
                   Lead Stage:{item.leadstage}<br></br>
                   Deal Stage: {item.dealstage} {item.timeline ? `(${item.timeline} days)` : ""}
                  </StyledTableCell>
                   
         
                    
              
                </StyledTableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        
            </div>

        <Modal  show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                    <Modal.Header>
                      <Modal.Title>Add Lead Score Criteria<br></br>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
               
               <div className="row">
        
                        <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Available For</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.available_for}
                              onChange={(e)=>setleadscore({...leadscore,available_for:e.target.value})}
                            >
                              <option value="">{leadscore.available_for?leadscore.available_for:"---Select---"}</option>
                              <option>Call</option>
                              <option>Mail</option>
                              <option>Meeting</option>
                              <option value="SiteVisit">Site Visit</option>
                            </select>
                          </div>

{/*==================================================== call entry start======================================================== */}


                          <div id='call' className='row' style={{padding:"10px",display:leadscore.available_for == "Call" ? "flex":"none"}}>
                             <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Reason</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.reason}
                              onChange={handleSelectChange}
                            >
                              <option value="">{leadscore.reason? leadscore.reason:"---Select---"}</option>
                              {reasons.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new reason"
                                  value={newReason}
                                  onChange={(e) => setNewReason(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddReason}
                                >
                                  Add Reason
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Call Direction</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.direction}
                              onChange={handleSelectdirectionChange}
                            >
                              <option value="">---Select---</option>
                              {directions.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showdirectionInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new direction"
                                  value={newdirection}
                                  onChange={(e) => setNewdirection(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAdddirection}
                                >
                                  Add Direction
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Call Status</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.status}
                              onChange={handleSelectstatusChange}
                            >
                              <option value="">---Select---</option>
                              {callstatus.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showcallstatusInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new status"
                                  value={newcallstatus}
                                  onChange={(e) => setNewcallstatus(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddstatus}
                                >
                                  Add Status
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Result</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.result}
                              onChange={handleSelectresultChange}
                            >
                              <option value="">---Select---</option>
                              {callresult.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showcallresultInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new result"
                                  value={newcallresult}
                                  onChange={(e) => setNewcallresult(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddresult}
                                >
                                  Add Result
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Score</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.score}
                              onChange={handleSelectscoreChange}
                            >
                              <option value="">---Select---</option>
                              {callscore.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showcallscoreInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new score"
                                  value={newcallscore}
                                  onChange={(e) => setNewcallscore(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddscore}
                                >
                                  Add Score
                                </button>
                              </div>
                            )}
                          </div>
                          <div className='col-md-6'></div>

                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Lead Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.leadstage}
                              onChange={(e)=>setleadscore({...leadscore,leadstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Prospect</option>
                              <option>Closed</option>
                              <option>Opportunity</option>
                            </select>
                          </div>
                         
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}>Lead Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment.map((cat) => {
                                  const isCallMode = leadscore.available_for === "Call";
                                  const isDisabled =
                                    isCallMode &&
                                    (cat === "Call Scheduled Form" || cat === "Call Completed Form");
                                  return(
                                 <MenuItem key={cat} value={cat}>
                                    <Checkbox checked={leadscore.stage_requirment?.includes(cat)} disabled={isDisabled} style={{color:isDisabled?"red":"black"}}/>
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                      );
                                    })}
                                </Select>
                          </div>
                          <div className='col-md-3'></div>
                          
                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Deal Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.dealstage}
                              onChange={(e)=>setleadscore({...leadscore,dealstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Open</option>
                              <option>Closed</option>
                              <option>Quote</option>
                            </select>
                          </div>
                          
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}> Deal Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment1 || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment1:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment1.map((cat) => (
                                 <MenuItem key={cat} value={cat}>
                                    <Checkbox checked={leadscore.stage_requirment1?.includes(cat)} />
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                    ))}
                                </Select>
                          </div>
                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Timeline</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.timeline}
                              onChange={(e)=>setleadscore({...leadscore,timeline:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option value="10">10 days</option>
                              <option value="15">15 days</option>
                              <option value="20">20 days</option>
                              <option value="25">25 days</option>
                              <option value="30">30 days</option>
                            </select>
                          </div>

                          </div>

  {/*==================================================== call entry end========================================================== */}


{/*======================================= email entry start ==================================================================*/}

                          <div id='email' className='row' style={{padding:"10px",display:leadscore.available_for == "Mail" ? "flex":"none"}}>
                             <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Email Category/Purpose</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.emailsubjects_purpose}
                              onChange={handleSelectChangeemailsubjects_purpose}
                            >
                              <option value="">---Select---</option>
                              {emailsubjects_purpose.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInputemailsubjects_purpose && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new subject/purpose"
                                  value={newemailsubjects_purpose}
                                  onChange={(e) => setNewemailsubjects_purpose(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddemailsubjects_purpose}
                                >
                                  Add Subject/Purpose
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Email Direction</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.email_direction}
                              onChange={handleSelectChangeemaildirections}
                            >
                              <option value="">---Select---</option>
                              {emaildirections.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInputemaildirections && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new direction"
                                  value={newemaildirections}
                                  onChange={(e) => setNewemaildirections(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAdddemaildirections}
                                >
                                  Add Direction
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Email Status</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.email_status}
                              onChange={handleSelectChangeemailstatus}
                            >
                              <option value="">---Select---</option>
                              {emailstatus.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInputemailstatus && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new status"
                                  value={newemailstatus}
                                  onChange={(e) => setNewemailstatus(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAdddemailstatus}
                                >
                                  Add Status
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Email Subject</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.email_subject}
                              onChange={handleSelectChangeemailsubject}
                            >
                              <option value="">---Select---</option>
                              {emailsubject.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInputemailsubject && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new subject"
                                  value={newemailsubject}
                                  onChange={(e) => setNewemailsubject(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAdddemailsubject}
                                >
                                  Add Subject
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Email Score</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.email_score}
                              onChange={handleSelectChangeemailscore}
                            >
                              <option value="">---Select---</option>
                              {emailscore.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInputemailscore && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new score"
                                  value={newemailscore}
                                  onChange={(e) => setNewemailscore(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAdddemailscore}
                                >
                                  Add Score
                                </button>
                              </div>
                            )}
                          </div>
                          <div className='col-md-6'></div>

                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Lead Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.leadstage}
                              onChange={(e)=>setleadscore({...leadscore,leadstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Prospect</option>
                              <option>Closed</option>
                              <option>Opportunity</option>
                            </select>
                          </div>
                          
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}>Lead Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment.map((cat) => {
                                   const isCallMode = leadscore.available_for === "Mail";
                                  const isDisabled =
                                    isCallMode &&
                                    (cat === "Mail Scheduled Form" || cat === "Mail Completed Form");
                                  return(
                                 <MenuItem key={cat} value={cat}>
                                      <Checkbox checked={leadscore.stage_requirment?.includes(cat)} disabled={isDisabled} style={{color:isDisabled?"red":"black"}}/>
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                 );
                                })}
                                </Select>
                          </div>
                          <div className='col-md-3'></div>

                          
                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Deal Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.dealstage}
                              onChange={(e)=>setleadscore({...leadscore,dealstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Open</option>
                              <option>Closed</option>
                              <option>Quote</option>
                            </select>
                          </div>
                          
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}> Deal Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment1 || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment1:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment1.map((cat) => (
                                 <MenuItem key={cat} value={cat}>
                                    <Checkbox checked={leadscore.stage_requirment1?.includes(cat)} />
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                    ))}
                                </Select>
                          </div>
                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Timeline</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.timeline}
                              onChange={(e)=>setleadscore({...leadscore,timeline:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option value="10">10 days</option>
                              <option value="15">15 days</option>
                              <option value="20">20 days</option>
                              <option value="25">25 days</option>
                              <option value="30">30 days</option>
                            </select>
                          </div>

                          </div>
{/* ==========================================email entry end===================================================================== */}


{/* ================================================meeting entry start ===========================================================*/}

<div id='meeting' className='row' style={{padding:"10px",display:leadscore.available_for == "Meeting" ? "flex":"none"}}>
                             <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Meeting Reason</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.meeting_reason}
                              onChange={handleSelectChangemeetingreason}
                            >
                              <option value="">---Select---</option>
                              {meetingreason.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInputmeetingreason && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new reason"
                                  value={newmeetingreason}
                                  onChange={(e) => setNewmeetingreason(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddmeetingreason}
                                >
                                  Add Reason
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Meeting Status</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.meeting_status}
                              onChange={handleSelectChangemeetingstatus}
                            >
                              <option value="">---Select---</option>
                              {meetingstatus.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Status</option>
                            </select>

                            {showInputmeetingstatus && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new status"
                                  value={newmeetingstatus}
                                  onChange={(e) => setNewmeetingstatus(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddmeetingstatus}
                                >
                                  Add Status
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Meeting Result</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.meeting_result}
                              onChange={handleSelectChangemeetingresult}
                            >
                              <option value="">---Select---</option>
                              {meetingresult.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Result</option>
                            </select>

                            {showInputmeetingresult && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new result"
                                  value={newmeetingresult}
                                  onChange={(e) => setNewmeetingresult(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddmeetingresult}
                                >
                                  Add Result
                                </button>
                              </div>
                            )}
                          </div>

                        
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Meeting Score</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.meeting_score}
                              onChange={handleSelectChangemeetingscore}
                            >
                              <option value="">---Select---</option>
                              {meetingscore.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Score</option>
                            </select>

                            {showInputmeetingscore && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new score"
                                  value={newmeetingscore}
                                  onChange={(e) => setNewmeetingscore(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddmeetingscore}
                                >
                                  Add Score
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Lead Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.leadstage}
                              onChange={(e)=>setleadscore({...leadscore,leadstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Prospect</option>
                              <option>Closed</option>
                              <option>Opportunity</option>
                            </select>
                          </div>
                       

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}>Lead Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment.map((cat) => {
                                   const isCallMode = leadscore.available_for === "Meeting";
                                  const isDisabled =
                                    isCallMode &&
                                    (cat === "Meeting Scheduled Form" || cat === "Meeting Completed Form");
                                  return(
                                 <MenuItem key={cat} value={cat}>
                                  <Checkbox checked={leadscore.stage_requirment?.includes(cat)} disabled={isDisabled} style={{color:isDisabled?"red":"black"}}/>
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                  )
                                  })}
                                </Select>
                          </div>
                          <div className='col-md-3'></div>

                          
                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Deal Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.dealstage}
                              onChange={(e)=>setleadscore({...leadscore,dealstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Open</option>
                              <option>Closed</option>
                              <option>Quote</option>
                            </select>
                          </div>
                          
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}> Deal Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment1 || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment1:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment1.map((cat) => (
                                 <MenuItem key={cat} value={cat}>
                                    <Checkbox checked={leadscore.stage_requirment1?.includes(cat)} />
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                    ))}
                                </Select>
                          </div>
                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Timeline</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.timeline}
                              onChange={(e)=>setleadscore({...leadscore,timeline:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option value="10">10 days</option>
                              <option value="15">15 days</option>
                              <option value="20">20 days</option>
                              <option value="25">25 days</option>
                              <option value="30">30 days</option>
                            </select>
                          </div>

                          </div>

                          


{/*============================================ meeting entry end =================================================================*/}
        
{/*======================================= site visit entry start ================================================================*/}

<div id='sitevisit' className='row' style={{padding:"10px",display:leadscore.available_for == "SiteVisit" ? "flex":"none"}}>
                             <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Visit Type</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.sitevisit_visittype}
                              onChange={handleSelectChangesitevisit_visittype}
                            >
                              <option value="">---Select---</option>
                              {sitevisit_visittype.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New</option>
                            </select>

                            {showInputsitevisit_visittype && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new visit type"
                                  value={newsitevisit_visittype}
                                  onChange={(e) => setNewsitevisit_visittype(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddsitevisit_visittype}
                                >
                                  Add Visit Type
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Site Visit Status</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.sitevisit_status}
                              onChange={handleSelectChangesitevisit_status}
                            >
                              <option value="">---Select---</option>
                              {sitevisit_status.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Status</option>
                            </select>

                            {showInputsitevisit_status && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new status"
                                  value={newsitevisit_status}
                                  onChange={(e) => setNewsitevisit_status(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddsitevisit_status}
                                >
                                  Add Status
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Site Visit Result</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.sitevisit_result}
                              onChange={handleSelectChangesitevisit_result}
                            >
                              <option value="">---Select---</option>
                              {sitevisit_result.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Result</option>
                            </select>

                            {showInputsitevisit_result && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new result"
                                  value={newsitevisit_result}
                                  onChange={(e) => setNewsitevisit_result(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddsitevisit_result}
                                >
                                  Add Result
                                </button>
                              </div>
                            )}
                          </div>

                        
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Site Visit Score</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.sitevisit_score}
                              onChange={handleSelectChangesitevisit_score}
                            >
                              <option value="">---Select---</option>
                              {sitevisit_score.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Score</option>
                            </select>

                            {showInputsitevisit_score && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new score"
                                  value={newsitevisit_score}
                                  onChange={(e) => setNewsitevisit_score(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddsitevisit_score}
                                >
                                  Add Score
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Lead Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.leadstage}
                              onChange={(e)=>setleadscore({...leadscore,leadstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Prospect</option>
                              <option>Closed</option>
                              <option>Opportunity</option>
                            </select>
                          </div>
                       

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}>Lead Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment.map((cat) => {
                                   const isCallMode = leadscore.available_for === "SiteVisit";
                                  const isDisabled =
                                    isCallMode &&
                                    (cat === "Site Visit Scheduled Form" || cat === "Site Visit Completed Form");
                                  return(
                                 <MenuItem key={cat} value={cat}>
                                   <Checkbox checked={leadscore.stage_requirment?.includes(cat)} disabled={isDisabled} style={{color:isDisabled?"red":"black"}}/>
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                  )
                                    })}
                                </Select>
                          </div>
                          <div className='col-md-3'></div>

                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Deal Stage</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.dealstage}
                              onChange={(e)=>setleadscore({...leadscore,dealstage:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option>Negotiation</option>
                              <option>Open</option>
                              <option>Closed</option>
                              <option>Quote</option>
                            </select>
                          </div>
                          
                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                          <label className="labels" style={{ fontSize: "12px" }}> Deal Stage Changed Requirment</label>
                               <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                              value={leadscore.stage_requirment1 || []}
                              onChange={(e)=>setleadscore({...leadscore,stage_requirment1:e.target.value})}
                                 renderValue={(selected) => selected.join(", ")}
                                 >
                                {stagerequirment1.map((cat) => (
                                 <MenuItem key={cat} value={cat}>
                                    <Checkbox checked={leadscore.stage_requirment1?.includes(cat)} />
                                      <ListItemText primary={cat} />
                                      </MenuItem>
                                    ))}
                                </Select>
                          </div>
                          <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Timeline</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.timeline}
                              onChange={(e)=>setleadscore({...leadscore,timeline:e.target.value})}
                            >
                              <option value="">---Select---</option>
                              <option value="10">10 days</option>
                              <option value="15">15 days</option>
                              <option value="20">20 days</option>
                              <option value="25">25 days</option>
                              <option value="30">30 days</option>
                            </select>
                          </div>

                          </div>


{/*========================================= site visit entry end================================================================ */}


               </div>
                
        
          
        
                    </Modal.Body>
                    <Modal.Footer>
                 
                      <Button variant="secondary" onClick={handleClose1}>
                        Close
                      </Button>
                      <Button variant="secondary" onClick={addleadscore} style={{display:selectedItems.length===0?"block":"none"}}>
                        Save
                      </Button>
                        <Button variant="secondary" onClick={updateleadscore} style={{display:selectedItems.length===1?"block":"none"}}>
                        Update
                      </Button>
                    </Modal.Footer>
                  </Modal>

    </div>
  )
}

export default Leadscoresettings
