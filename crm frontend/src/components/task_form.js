import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';
import { ToastContainer,toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from "../api";
import { Inventory, Try } from "@mui/icons-material";
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';



function Task_form() {
  
   const navigate = useNavigate();
   const location1=useLocation()

  const leadoption=location1?.state?.selectedItem


//============================================ fetch data for call fields start==================================================


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

    const fetchdataforcallfields=async(event)=>
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



// =======================================fetch data for call fields end==========================================================


  
  
    useEffect(()=>
    {
        fetchdata()
    },[])

    useEffect(()=>
        {
            fetchdata1()
        },[])
        useEffect(()=>
            {
                fetchcontactdata()
            },[])
            useEffect(()=>
                {
                    fetchdealdata()
                },[])
                useEffect(()=>
                  {
                      fetchsitevisitdata()
                  },[])
   
    
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

            const[sitevisitdata,setsitevisitdata]=useState([]);
            const fetchsitevisitdata=async(event)=>
            {
              
              try {
                const resp=await api.get('viewsitevisit')
                const result = resp.data?.sitevisit?.flatMap((item) => item.intrested_inventory) || [];
                setsitevisitdata(result)
              } catch (error) {
                console.log(error);
              }
            
            }

          
    const activitys=["Call","Email","Meeting","Site Visit"]
                                          
    const direction=["Incoming","Outgoing"]
    const visittype=["Site Visit","Home Visit","Online"]
    const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
    const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]
    const location=["Home","Office","Company","Site"]
    
    
    const [calltask,setcalltask]=useState({activity_type:"Call",title:"",reason:"",lead:"",executive:"",remarks:"",complete:"",due_date:"",due_time:"",
      title2:"",first_name:"",last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",direction:"",status:"",date:"",duration:"",
      result:"",intrested_inventory:"",feedback:""})

    
    const [mailtask,setmailtask]=useState({activity_type:"Mail",title:"",executive:"",lead:"",project:[],block:[],inventory:[],subject:"",remarks:"",
        complete:"",due_date:"",due_time:"",direction:"",status:"",date:"",feedback:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",})
   

    const [meetingtask,setmeetingtask]=useState({activity_type:"Meeting",title:"",executive:"",lead:"",location_type:"",location_address:"",
            reason:"",project:[],block:[],inventory:[],remark:"",stage:"",due_date:"",due_time:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",
            complete:"",status:"",meeting_result:"",date:"",feedback:""})
   
    const [sitevisit,setsitevisit]=useState({activity_type:"SiteVisit",title:"",executive:"",project:[],block:[],sitevisit_type:"",
                inventory:[],lead:"",confirmation:"",remark:"",participants:"",remind_me:"",start_date:"",end_date:"",start_time:"",end_time:"",complete:"",stage:"",title2:"",first_name:"",
                last_name:"",mobile_no:[],email:[],lead_id:"",stage:"",status:"",intrested_project:[],intrested_block:[],intrested_inventory:[''],result:[''],action1:[],date:"",feedback:""})
    
                const[activity,setactivity]=useState({activity_name:"", call_outcome:"", activity_note:"",lead:"",
                  direction:"",status:"",date:"",duration:"",intrested_inventory:"",message:"",subject:"",viewcount:0,
                  activity_note1:"",edit_field:"",edit_value:"",task_title:""})
       

                const Location=useLocation()
                const id=Location.state
                const lead=Location.state
                const getid = id?.id?.map((item) => item); 
              
               
              const[selecteddeal,setselecteddeal]=useState([])
                const getselecteddeal=async()=>
                {
                  try {
                    const resp=await api.get(`viewdealbyid/${getid}`)
                    setselecteddeal(resp.data.deal)
                    setsitevisit({
                      ...sitevisit,
                      project: Array.isArray(resp.data.deal.project)
                        ? resp.data.deal.project // If it's already an array, use it
                        : [resp.data.deal.project],
                         // If it's not an array, wrap it in an array
                         block: Array.isArray(resp.data.deal.block)
                         ? resp.data.deal.block // If it's already an array, use it
                         : [resp.data.deal.block],
                          // If it's not an array, wrap it in an array
                          inventory: Array.isArray(resp.data.deal.unit_number)
                          ? resp.data.deal.unit_number // If it's already an array, use it
                          : [resp.data.deal.unit_number]
                           // If it's not an array, wrap it in an array
                    });
                  } catch (error) {
                    console.log(error);
                    
                  }
                }
              
               useEffect(()=>
              {
                if(getid && getid.length>0)
                {
                  getselecteddeal()
                }
              },[getid])

// ================================all post methods start=============================================================================

       
            const calltaskdetails = async () => {
        const title1 = document.getElementById("title").innerText;

    // Update state
    const updatedCallTask = { ...calltask, title: title1 };
    const updatedCallTask1 = { ...activity, task_title: title1 };

    try {
        // Save the task first
        const resp = await api.post('calltask', updatedCallTask);

        if (resp.status === 200) {
             Swal.fire({
                        title: "Task Created",
                        text: "Task created successfully!",
                        icon: "success",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                    })

            // If task is saved successfully, save the activity
            const resp1 = await api.post('addactivity', updatedCallTask1);

            // Reload after both operations succeed
            setTimeout(() => {
                window.location.reload();
            }, 2000); // 2000 milliseconds = 2 seconds
        } else {
            toast.error("failed to create task");
        }
      } catch (error) 
        {
            Swal.fire({
                        title: "Incomplete Task",
                        text:error.response.data.message,
                        icon: "error",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                    })
        }
    };


   


        const mailtaskdetails=async()=>
            {
             
                const title1 = document.getElementById("mailtitle").innerText;
        
                // Update state
                const updatedMailTask = { ...mailtask, title: title1 };
                const updatedMailTask1 = { ...activity, task_title: title1 };
                try {
                    const resp=await api.post('mailtask',updatedMailTask)
                  

                       if (resp.status === 200) {
                       Swal.fire({
                        title: "Task Created",
                        text: "Task created successfully!",
                        icon: "success",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                        })

              // If task is saved successfully, save the activity
              const resp1=await api.post('addactivity',updatedMailTask1)

              // Reload after both operations succeed
               setTimeout(() => {
                  window.location.reload();
                  }, 2000); // 2000 milliseconds = 2 seconds
              } else {
                  toast.error("failed to create task");
              }
                  
                } catch (error) {
                    
                      Swal.fire({
                        title: "Incomplete Task",
                        text:error.response.data.message,
                        icon: "error",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                    })
                }
            }

            const meetingtaskdetails=async()=>
                {
                 
                    const title1 = document.getElementById("meetingtitle").innerText;
                   
                    const data = { stage: updatestagemeeting };
                    // Update state
                    const updatemeetingtask = { ...meetingtask, title: title1 };
                    const updatedMailTask2 = { ...activity, task_title: title1 };
                    try {
                        const resp=await api.post('meetingtask',updatemeetingtask)
                      

                        const data1 = { newstage: updatestagemeeting1 };

    // Loop through each selected project-block-unit combination
    let isValidCombination = true;
    for (let i = 0; i < meetingtask.inventory.length; i++) {
      const selectedCombination = meetingtask.inventory[i];
      const [unit_number, block, project] = selectedCombination.split('-');
      console.log(`Calling API: updatedealstage/${project}/${block}/${unit_number}`);

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
                        if(leadidmeeting)
                          {
                           const resp1 = await api.put(`updatelead/${leadidmeeting}`,data );
                          }
                        if(resp.status===200)
                        {
                            const resp1=await api.post('addactivity',updatedMailTask2)
                           Swal.fire({
                            title: "Task Created",
                            text: "Task created successfully!",
                            icon: "success",
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK',
                            })
                            setTimeout(() => {
                                window.location.reload();
                              }, 2000); // 2000 milliseconds = 2 seconds
                            
                        }
                    } catch (error) {
                        
                            Swal.fire({
                        title: "Incomplete Task",
                        text:error.response.data.message,
                        icon: "error",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                    })
                    }
                }
        
              
        
        
                const sitevisitdetails = async () => {
                  const title1 = document.getElementById("sitevisittitle").innerText;
                
                  
                  // Update state
                  const updatedsiteTask = { ...sitevisit, title: title1 };
                  const updatedsiteTask1 = { ...activity, task_title: title1 };
                
                  try {
                    // First API request to post sitevisit details
                    const resp = await api.post('sitevisit', updatedsiteTask);
                 
                
                   
                
                    if (resp.status === 200) {
                      const resp1=await api.post('addactivity',updatedsiteTask1)
                      Swal.fire({
                        title: "Task Created",
                        text: "Task created successfully!",
                        icon: "success",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                        })
                
                      // Reload the page after a brief delay
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000); // 2000 milliseconds = 2 seconds
                    }
                  } catch (error) {
                    // Catch any errors from the main API requests (sitevisit and lead updates)
                       Swal.fire({
                        title: "Incomplete Task",
                        text:error.response.data.message,
                        icon: "error",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                    })
                  }
                };
                

//========================================all post methods end =======================================================================       


    // ========================---------------------fetching lead data----------------------------------------------===================
    const[data,setdata]=useState([]);
  const fetchdata=async()=>
  {
    
    try {
      const resp=await api.get('leadinfo')
      setdata(resp.data.lead)
    } catch (error) {
      console.log(error);
    }
  
  }

//  ==================================== fetching lead data end=======================================================================


  const [units1,setunits1]=useState([])
  const[data1,setdata1]=useState([]);
  const fetchdata1=async()=>
  {
    
    try {
      const resp=await api.get('viewproject')
      setdata1(resp.data.project)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (data1.length >= 0) {
      const collectedUnits = data1.flatMap(item => item.add_unit); // Collect all add_unit arrays
      setunits1(collectedUnits); // Set allUnits with the collected units
    }
  }, [data1]);




//   const [units2,setunits2]=useState([])
// const [allUnits2,setallUnits2]=useState([])
// const fetchdatabyprojectname2 = async (e) => {
//     const projectName = e.target.value; // Get the project name directly from the event
  
//     try {
//       setmailtask(prev => ({ ...prev, project: projectName })); // Update the state
//       const resp = await api.get(`viewprojectbyname/${projectName}`);
//      setunits2(resp.data.project)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (units2.length >= 0) {
//       const collectedUnits = units2.flatMap(item => item.add_unit); // Collect all add_unit arrays
//       setallUnits2(collectedUnits); // Set allUnits with the collected units
//     }
//   }, [units2]);


//   const [units3,setunits3]=useState([])
//   const [allUnits3,setallUnits3]=useState([])
//   const fetchdatabyprojectname3 = async (e) => {
//       const projectName = e.target.value; // Get the project name directly from the event
    
//       try {
//         setmeetingtask(prev => ({ ...prev, project: projectName })); // Update the state
//         const resp = await api.get(`viewprojectbyname/${projectName}`);
//        setunits3(resp.data.project)
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     useEffect(() => {
//       if (units3.length >= 0) {
//         const collectedUnits = units3.flatMap(item => item.add_unit); // Collect all add_unit arrays
//         setallUnits3(collectedUnits); // Set allUnits with the collected units
//       }
//     }, [units3]);


//   const [allUnits,setallUnits]=useState([])
//   useEffect(()=>
// {
//     if (data1.length > 0) {
//         setallUnits (data1.flatMap(item => item.add_unit)); // Collect all add_unit arrays
//        // This will log all add_units combined into a single array
//      }
// },[data1])
//    console.log(allUnits);




    
    
    

//     const [projects, setprojects] = useState([]);


//   const handleprojectchange = (event) => {
//     const {
//         target: { value },
//     } = event;

//     const selectproject = typeof value === 'string' ? value.split(',') : value;

//     setprojects(selectproject);
//     setsitevisit({ ...sitevisit, project: selectproject });
//     fetchdatabyprojectname()
// };

// const [units,setunits]=useState([])
// const [allUnits,setallUnits]=useState([])
// const fetchdatabyprojectname = async (e) => {
//      const projectName = sitevisit.project; // Get the project name directly from the event
//      console.log(sitevisit.project);
    
  
//     try {
        
//       setsitevisit(prev => ({ ...prev, project: projectName })); // Update the state
//       const resp = await api.get(`viewprojectbyname/${projectName}`);
//      setunits(resp.data.project)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (units.length >= 0) {
//       const collectedUnits = units.flatMap(item => item.add_unit); // Collect all add_unit arrays
//       setallUnits(collectedUnits); // Set allUnits with the collected units
//     }
//   }, [units]);


// ===============================this project data is for sitevisit task============================================================
  




const allproject =[]
dealdata.map((item) => {
    if (!allproject.includes(item.project)) {
      allproject.push(item.project);
    }
  });



const [units, setunits] = useState([]);
const [allUnits, setallUnits] = useState([]);
const [allBlocks, setallBlocks] = useState([]);
const [projects, setprojects] = useState([]);

const handleprojectchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setprojects(selectproject);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, project: selectproject };
      // fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
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
// console.log(units);

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
  
  
  
  

  const[alldealblocks1,setalldealblocks1]=useState([])
  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      sitevisit.project.some((project) => project === item.project)
    );
    setalldealblocks1(dealblocks)
  }, [sitevisit.project]);

  const[allblocks,setallblocks]=useState([])
const handleblockchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    setallblocks(selectblock);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, block: selectblock};
    
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };


  const [alldealunits1, setalldealunits1] = useState([]);

  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      sitevisit.project.some((project) => project === item.project) &&
      sitevisit.block.some((block) => {
        // Split the block string by " - " and check only the block name (before the "-")
        const blockName = block.split('-')[0]; // Get the part before the "-" and remove any extra spaces
      
        // Check if the item.block matches the block name
        return item.block === blockName;
      })
    );
    setalldealunits1(dealblocks);
  }, [sitevisit.project, sitevisit.block]);
  
  


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





  // const [siteunits, setsiteunits] = useState([]);
// const [siteallUnits, setsiteallUnits] = useState([]);
// const [siteallblock, setsiteallblock] = useState([]);
const [siteprojects, setsiteprojects] = useState([]);

const handlesiteprojectchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setsiteprojects(selectproject);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, intrested_project: selectproject };
      // fetchdatabysiteprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  // const alldealblock =[]
  // dealdata.map((item) => {
  //     if (!alldealblock.includes(item.block)) {
  //         alldealblock.push(item.block);
  //     }
  //   });
  
  //   const alldealunit =[]
  // dealdata.map((item) => {
  //     if (!alldealunit.includes(item.unit_number)) {
  //         alldealunit.push(item.unit_number);
  //     }
  //   });
  

  const[alldealblocks,setalldealblocks]=useState([])
  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      sitevisit.intrested_project.some((project) => project === item.project)
    );
    setalldealblocks(dealblocks)
  }, [sitevisit.intrested_project]);
  
 



// const fetchdatabysiteprojectname = async (projectNames) => {

//   try {
//     const fetchPromises = projectNames.map(async (projectName) => {
//       const resp = await api.get(`viewdealbyproject/${projectName}`);
//       return resp.data.deal; // Assuming resp.data.project is an array of units for that project
//     });

//     const results = await Promise.all(fetchPromises);
//     const allFetchedUnits = results.flat();
//     setsiteunits(allFetchedUnits); // Set the units to the flattened result
//   } catch (error) {
//     console.log(error);
//   }
// };

// console.log(siteunits);

// useEffect(() => {
//     if (siteunits.length > 0) {
//       // Collect all add_unit arrays and ensure uniqueness by using unit_no or unit_id
//       const collectedblocks = siteunits.flatMap(item => item.block);
//       const collectedUnits = siteunits.flatMap(item => item.unit_number);
  
//       // Create a Map to filter out duplicates based on unit_no (or any other unique property like unit_id)
//       const uniqueUnits = [
//         ...new Map(collectedUnits.map(unit => [unit, unit])).values()
//       ];
//       const uniqueblock = [
//         ...new Map(collectedblocks.map(block => [block, block])).values()
//       ];
//       // setsiteallUnits(uniqueUnits);// Set allUnits with the unique units
//       // setsiteallblock(uniqueblock)
//     }
//   }, [siteunits]);

// console.log(siteallUnits);
// console.log(sitevisit.block);


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






const [alldealunits, setalldealunits] = useState([]);

useEffect(() => {
  const dealblocks = dealdata.filter((item) =>
    sitevisit.intrested_project.some((project) => project === item.project) &&
    sitevisit.intrested_block.some((block) => block === item.block) // Add the condition for interested blocks
  );
  setalldealunits(dealblocks);
}, [sitevisit.intrested_project, sitevisit.intrested_block]); // Depend on both interested_project and interested_block

// console.log(alldealunits);


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
  
  

  const formatDatesite = (dateString) => {
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
  
  const handleDateChangesite = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDatesite(selectedDate);
    setsitevisit({ ...sitevisit, start_date: selectedDate });
  };


  const formatDatesite1 = (dateString) => {
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
  
  const handleDateChangesite1 = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDatesite1(selectedDate);
    setsitevisit({ ...sitevisit, end_date: selectedDate });
  };
  
  
  
  const formatTimesite = (timeString) => {
    let [hours, minutes] = timeString.split(':').map(Number);
    const isPM = hours >= 12;
    
    // Convert to 12-hour format
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
    const period = isPM ? 'PM' : 'AM';
    
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  };
  
  const handleTimeChangesite = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = formatTimesite(selectedTime);
    setsitevisit({ ...sitevisit, start_time: formattedTime });
  };


    
  const formatTimesite1 = (timeString) => {
    let [hours, minutes] = timeString.split(':').map(Number);
    const isPM = hours >= 12;
    
    // Convert to 12-hour format
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
    const period = isPM ? 'PM' : 'AM';
    
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  };
  
  const handleTimeChangesite1 = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = formatTimesite1(selectedTime);
    setsitevisit({ ...sitevisit, end_time: formattedTime });
  };


  function addFn1() {
                  
    setsitevisit({
      ...sitevisit,
      intrested_inventory: [...sitevisit.intrested_inventory, ''],
      result: [...sitevisit.result, ''],
      action1: [...sitevisit.action1, '']

    });
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
    








//== ================================this project data is for meeting task=============================================================

  // const [units2, setunits2] = useState([]);
// const [allUnits2, setallUnits2] = useState([]);

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
      // const unitNumbers = selectunits.map(item => item.split('-')[0]); // Get only the unit_number part
    
      // Update allunit1 state with the selected unit numbers
      setallunit1meeting(selectunits);
    
      // Update the sitevisit state with selected units in intrested_inventory
      setmeetingtask((prev) => {
        const updatemeetingtask = { ...prev, inventory: selectunits }; // Store only unit numbers
        return updatemeetingtask;
      });
    };

    const formatDatemeeting = (dateString) => {
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
    
    const handleDateChangemeeting = (e) => {
      const selectedDate = e.target.value;
      const formattedDate = formatDatemeeting(selectedDate);
      setmeetingtask({ ...meetingtask, due_date: selectedDate });
    };
    
    
    
    const formatTimemeeting = (timeString) => {
      let [hours, minutes] = timeString.split(':').map(Number);
      const isPM = hours >= 12;
      
      // Convert to 12-hour format
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
      const period = isPM ? 'PM' : 'AM';
      
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
    };
    
    const handleTimeChangemeeting = (e) => {
      const selectedTime = e.target.value;
      const formattedTime = formatTimemeeting(selectedTime);
      setmeetingtask({ ...meetingtask, due_time: formattedTime });
    };

    //=============================== meetingtask all project,block and inventory end===================================================
// const fetchdatabyprojectname2 = async (projectNames) => {

//   try {
//     const fetchPromises = projectNames.map(async (projectName) => {
//       const resp = await api.get(`viewprojectbyname/${projectName}`);
//       return resp.data.project; // Assuming resp.data.project is an array of units for that project
//     });

//     const results = await Promise.all(fetchPromises);
//     const allFetchedUnits = results.flat();
//     setunits2(allFetchedUnits); // Set the units to the flattened result
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   if (units2.length > 0) {
//     const collectedUnits = units2.flatMap(item => item.add_unit); // Collect all add_unit arrays
//     setallUnits2(collectedUnits); // Set allUnits with the collected units
//   }
// }, [units2]);




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

  const [units3, setunits3] = useState([]);
  const [allUnits3, setallUnits3] = useState([]);
  const [projects3, setprojects3] = useState([]);
  
  const fetchdatabyprojectname3 = async (projectNames) => {
  
    try {
      const fetchPromises = projectNames.map(async (projectName) => {
        const resp = await api.get(`viewprojectbyname/${projectName}`);
        return resp.data.project; // Assuming resp.data.project is an array of units for that project
      });
  
      const results = await Promise.all(fetchPromises);
      const allFetchedUnits = results.flat();
      setunits3(allFetchedUnits); // Set the units to the flattened result
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (units3.length > 0) {
      const collectedUnits = units3.flatMap(item => item.add_unit); // Collect all add_unit arrays
      setallUnits3(collectedUnits); // Set allUnits with the collected units
    }
  }, [units3]);
  
  const handleprojectchange3 = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setprojects3(selectproject);
    setmailtask((prev) => {
      const updatedSiteVisit = { ...prev, project: selectproject };
      fetchdatabyprojectname3(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };
  
  const[allunit3,setallunit3]=useState([])
  const handleallunitschange3 = (event) => {
      const {
        target: { value },
      } = event;
    
      const selectunits = typeof value === 'string' ? value.split(',') : value;
    
       setallunit3(selectunits);
      setmailtask((prev) => {
        const updatedSiteVisit = { ...prev, inventory: selectunits };
      //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
        return updatedSiteVisit; // Return the updated state
      });
    };




  
  
  


   
    const [show1, setshow1] = useState(false);
    
    const handleClose1 = () => setshow1(false);
    const handleShow1=()=>
    {
      setshow1(true);
     
    }
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
    const handler1=()=>
        {
            document.getElementById("date1").style.color="black"
        }

    const handleformchange=()=>
    {
        const tasks=document.getElementById("forms").value;
        if(tasks==="Call")
        {
            document.getElementById("call").style.display="flex"
            document.getElementById("email").style.display="none"
            document.getElementById("sitevisit").style.display="none"
            document.getElementById("meeting").style.display="none"
        }
        if(tasks==="Email")
            {
                document.getElementById("call").style.display="none"
                document.getElementById("email").style.display="flex"
                document.getElementById("sitevisit").style.display="none"
                 document.getElementById("meeting").style.display="none"
            }
            if(tasks==="Site Visit")
                {
                    document.getElementById("call").style.display="none"
                    document.getElementById("email").style.display="none"
                    document.getElementById("sitevisit").style.display="flex"
                     document.getElementById("meeting").style.display="none"
                }
                if(tasks==="Meeting")
                    {
                        document.getElementById("call").style.display="none"
                        document.getElementById("email").style.display="none"
                        document.getElementById("sitevisit").style.display="none"
                         document.getElementById("meeting").style.display="flex"
                    }
    }
   
const[leadid,setleadid]=useState("")
    const handleLeadChange = (e) => {
        const selectedLead = data.find(item => item._id === e.target.value);
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
            setactivity({...activity,activity_name:"create site visit task",lead:fullName})
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
    
        // Now check if status is "Conducted" and update the stage
        if (newStatus === "Conducted") {
            setupdatestage("Opportunity");
            setupdatestage1("Quote");
        }
        else if (newStatus === "Did Not Visit" || newStatus==="Not Intersted>") {
            setupdatestage("Prospect");
            setupdatestage1("Open");
        }
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
   
    
// ==================================mail task onchange event and all function start================================================

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
      block: selectblock.map(item => item.split('-')[0]) // Store only block.block in sitevisit
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


  const formatDatemail = (dateString) => {
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
  
  const handleDateChangemail = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDatemail(selectedDate);
    setmailtask({ ...mailtask, due_date: selectedDate });
  };
  
  
  
  const formatTimemail = (timeString) => {
    let [hours, minutes] = timeString.split(':').map(Number);
    const isPM = hours >= 12;
    
    // Convert to 12-hour format
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
    const period = isPM ? 'PM' : 'AM';
    
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  };
  
  const handleTimeChangemail = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = formatTimemail(selectedTime);
    setmailtask({ ...mailtask, due_time: formattedTime });
  };




// ===============================call task onchange events================================================================

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
  setcalltask({ ...calltask, due_date: selectedDate });
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




    

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
                <div className="container rounded bg-white mt-5 mb-12" style={{width:"70%",marginLeft:"200px"}}>
            
        <div className="col-12">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Create Task</h4>
                </div>

               
                
                <hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Activity Type</label><select className="form-control form-control-sm" id="forms" required="true" onChange={handleformchange}>
                    <option>---Select---</option>
                        {
                            activitys.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-8 mb-8 custom-input"></div>
                        </div>
{/*============================================ call task form=============================================================================== */}

                        <div className="row" id="call" style={{display:"none"}}>
                        
                        <div className="col-md-12 mb-12 custom-input"><label className="form-label">Title</label><p id="title">Call {calltask.lead} for {calltask.reason} @ {calltask.due_date}.</p></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Reason</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,reason:e.target.value})}>
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
                        <div className="col-md-4 mb-4 custom-input"></div>
                    <div className="col-md-4 mb-4 custom-input"> <label className="form-label">Select Lead</label>
                    <Autocomplete
                    const options = {leadoption?data.filter(item => item._id === leadoption): data}
                    getOptionLabel={(option) =>
                    `${option.title} ${option.first_name} ${option.last_name}`
                  }

                    renderInput={(params) => (
                      <TextField {...params} size="small" placeholder="---select---" />
                    )}
                    openOnFocus
                    onChange={(event, selectedLead) => {
                      if (selectedLead) {
                        const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
                        setcalltask((prevState) => ({
                          ...prevState,
                          lead: fullName,
                          title2: selectedLead.title,
                          first_name: selectedLead.first_name,
                          last_name: selectedLead.last_name,
                          mobile_no: selectedLead.mobile_no,
                          email: selectedLead.email,
                          stage: selectedLead.stage,
                        }));
                        setactivity({
                          ...activity,
                          activity_name: 'create call task',
                          lead: fullName,
                        });
                      }
                    }}
                  />
                  </div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,executive:e.target.value})}>
                    <option>Select</option>
                        <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-4 mb-4 custom-input"></div>

                    <div className="col-md-10 mb-10 custom-input"><label className="form-label">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setcalltask({...calltask,remarks:e.target.value})}/></div>

                  
                    <div className="col-md-2 mb-2 custom-input"></div>

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Due Date</label><input type="datetime-local" className="form-control form-control-sm"  onChange={handleDateChange}/></div>
                    {/* <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChange}/></div> */}
                    <div className="col-md-8 mb-8 custom-input"></div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                  <div className="col-md-2 mb-2 custom-input"></div>

                  <div style={{width:"100%"}}>
            <div className="row" id='calldetails' style={{display:"none"}}>
           
        <div className="col-12">
            
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,direction:e.target.value})}>
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
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,status:e.target.value})}>
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
                    <div className="col-md-4 mb-4 custom-input"></div>
                
                
               
                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Date</label><input type="datetime-local" id="date1" className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1} onChange={(e)=>setcalltask({...calltask,date:e.target.value})}/></div>
                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Duration</label><input type="time" className="form-control form-control-sm" onChange={(e)=>setcalltask({...calltask,duration:e.target.value})}/></div>
                <div className="col-md-4 mb-4 custom-input"> </div>

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Result</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,result:e.target.value})}>
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
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,intrested_inventory:e.target.value})}>
                        <option>---select---</option>
                        {
                          sitevisitdata.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select>
                        </div>
                    <div className="col-md-4 mb-4 custom-input"></div>

                    <div className="col-md-8 mb-8 custom-input"><label className="form-label">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}} onChange={(e)=>setcalltask({...calltask,feedback:e.target.value})}/></div>
                    <div className="col-md-12 mb-12 custom-input"><br></br></div>
                    <div className="col-md-12 mb-12 custom-input"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="form-label" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     
                    {/* <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6 mb-6 custom-input"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6 mb-6 custom-input"><button className="form-control form-control-sm">Cancel</button></div>
                    </div> */}
                    </div>
                    
        </div>
        </div>
                    
                    <div className="row">
                    <div className="col-md-2 mb-2 custom-input" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm save-btn" onClick={calltaskdetails}>Submit</button></div>
                    <div className="col-md-2 mb-2 custom-input" style={{marginTop:"20px"}}><button className="form-control form-control-sm cancel-btn" onClick={()=>navigate(-1)}>Cancel</button></div>
                    </div>
                    </div>
                    </div>
{/* ==========================================call task form end========================================================================= */}


{/*=========================================== mail task form=========================================================================== */}

                    <div className="row" id="email" style={{display:"none"}}>

                    <div className="col-md-12 mb-12 custom-input"><label className="form-label">Title</label><p id="mailtitle">Mail to {mailtask.lead} For {mailtask.subject} @ {mailtask.due_date}  of {mailtask.inventory.join(',')} </p></div> 

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,executive:e.target.value})}>
                    <option>Select </option>
                    <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-8 mb-8 custom-input"></div>
                
                
                    <div className="col-md-4 mb-4 custom-input">
                <label className="form-label">Select Lead</label>
                <Autocomplete
                   const options = {leadoption?data.filter(item => item._id === leadoption): data}
                    getOptionLabel={(option) =>
                    `${option.title} ${option.first_name} ${option.last_name}`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="---select---" variant="outlined" size="small" />
                  )}
                  onChange={(event, selectedLead) => {
                    if (selectedLead) {
                      const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
                      setmailtask(prevState => ({
                        ...prevState,
                        lead: fullName,
                        title2: selectedLead.title,
                        first_name: selectedLead.first_name,
                        last_name: selectedLead.last_name,
                        mobile_no: selectedLead.mobile_no,
                        email: selectedLead.email,
                        stage: selectedLead.stage
                      }));
                      setactivity({
                        ...activity,
                        activity_name: "create mail task",
                        lead: fullName
                      });
                    }
                  }}
                />
              </div>

                        <div className="col-md-8 mb-8 custom-input"></div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Intrested Project</label> 
                                <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={mailprojects}
                            onChange={handlesiteprojectchangemail}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {allproject.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={mailprojects.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                                </div>

                                <div className="col-md-4 mb-4 custom-input">
              <label className="form-label">Select Interested Block</label>
              <Select
                className="form-control form-control-sm"
                style={{ border: "none" }}
                multiple
                value={allblockmail}  // Value contains the full block.block-project combinations
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
                          checked={allblockmail.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
                        />
                        <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
                      </MenuItem>
                    );
                  })
                }
              </Select>
</div>



                                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Intersted Inventory</label>
                             
                                <Select
  className="form-control form-control-sm"
  style={{ border: "none" }}
  multiple
  value={allunitmail} // Holds selected units
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
          <Checkbox checked={allunitmail.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
          <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
        </MenuItem>
      );
    })}
</Select>


                                    </div>

                      
                 

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Subject</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,subject:e.target.value})}>
                    <option>---Select---</option>
                       {
                        mailsubject.map((item)=>
                        (
                          <option>{item}</option>
                        ))
                       }
                        </select>
                        </div>

                    <div className="col-md-10 mb-10 custom-input"><label className="form-label">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setmailtask({...mailtask,remarks:e.target.value})}/></div>
                        <div className="col-md-2 mb-2 custom-input"></div>
                 
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Due Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={handleDateChangemail}/></div>
                    {/* <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChangemail}/></div> */}
                    <div className="col-md-8 mb-8 custom-input"></div>
                    
                  
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Completed?</label>
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
                    
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,direction:e.target.value})}>
                    <option>Select</option>
                        {
                            maildirection.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,status:e.target.value})}>
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
                    <div className="col-md-4 mb-4 custom-input"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,date:e.target.value})}/></div>
                <div className="col-md-8 mb-8 custom-input"> </div>

                    <div className="col-md-4 mb-4 custom-input"></div>

                    <div className="col-md-10 mb-10 custom-input"><label className="form-label">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}} onChange={(e)=>setmailtask({...mailtask,feedback:e.target.value})}/></div>
                    <div className="col-md-12 mb-12 custom-input"><br></br></div>
                    <div className="col-md-12 mb-12 custom-input"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="form-label" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     </div>
                   
                    </div>
                  
                   <div className="col-md-2 mb-2 custom-input" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm save-btn" onClick={mailtaskdetails}>Submit</button></div>
                   <div className="col-md-2 mb-2 custom-input" style={{marginTop:"20px"}}><button className="form-control form-control-sm cancel-btn" onClick={()=>navigate(-1)}>Cancel</button></div>
                    </div>

{/* ==========================================================mail task end================================================================= */}



{/* ==============================================site visit task=============================================================================== */}
                  
                  
                    <div className="row" id="sitevisit" style={{display:"none"}}>

                    <div className="col-md-12 mb-12 custom-input"><label className="form-label">Title</label><p id="sitevisittitle">Site Visit with {sitevisit.lead} For {sitevisit.inventory.join(',')} @ {sitevisit.start_date}  {sitevisit.participants ? ` also associate with ${sitevisit.participants}` : ""}</p></div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})} >
                    <option>Select </option>
                    <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Site Visit Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,sitevisit_type:e.target.value})}>
                    <option>---Select---</option>
                       {
                        sitevisit_visittype.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"></div>


      

    
   
      <div className="col-md-4 mb-4 custom-input">
        <label className="form-label">Select Project</label> 
        <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={projects}
          onChange={handleprojectchange}
          renderValue={(selected) => selected.join(', ')}
        >
          {allproject.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={projects.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* <div className="col-md-4 mb-4 custom-input">
        <label className="form-label">Select Block</label>
        <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={allblocks}
          onChange={handleblockchange}
          renderValue={(selected) => selected.join(', ')}
        >
          {allBlocks.map((block) => (
            <MenuItem key={block} value={block}>
              <Checkbox checked={allblocks.indexOf(block) > -1} />
              <ListItemText primary={block} />
            </MenuItem>
          ))}
        </Select>
      </div> */}

      <div className="col-md-4 mb-4 custom-input">
              <label className="form-label">Select Block</label>
              <Select
                className="form-control form-control-sm"
                style={{ border: "none" }}
                multiple
                value={allblocks}  // Value contains the full block.block-project combinations
                onChange={handleblockchange}  // Handle the change when blocks are selected/deselected
                renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
              >
                {alldealblocks1
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
                          checked={allblocks.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
                        />
                        <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
                      </MenuItem>
                    );
                  })
                }
              </Select>
</div>


      {/* <div className="col-md-4 mb-4 custom-input">
        <label className="form-label">Select Inventory</label>
        <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={allunit}
          onChange={handleallunitschange}
          renderValue={(selected) => selected.join(', ')}
        >
          {allUnits.map((unit) => (
            <MenuItem key={unit} value={unit}>
              <Checkbox checked={allunit.indexOf(unit) > -1} />
              <ListItemText primary={unit} />
            </MenuItem>
          ))}
        </Select>
      </div> */}

<div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Inventory</label>
                             
                             <Select
className="form-control form-control-sm"
style={{ border: "none" }}
multiple
value={allunit} // Holds selected units
onChange={handleallunitschange} // Handle changes for unit selection
renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
>
{alldealunits1
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
       <Checkbox checked={allunit.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
       <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
     </MenuItem>
   );
 })}
</Select>


                                 </div>


                    
                      
                      
                     <div className="col-md-4 mb-4 custom-input">
                <label className="form-label">Select Lead</label>
                <Autocomplete
                  const options = {leadoption?data.filter(item => item._id === leadoption): data}
                    getOptionLabel={(option) =>
                    `${option.title} ${option.first_name} ${option.last_name}`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="---select---" variant="outlined" size="small" />
                  )}
                  onChange={(event, selectedLead) => {
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
                setactivity({...activity,activity_name:"create site visit task",lead:fullName})
                    }
                  }}
                />
              </div>
                         
                        {/* <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Lead</label>
                        <select
                        className="form-control form-control-sm"
                        required
                        onChange={handleLeadChange}>
                     <option>---select---</option>

                    {lead?._id && (
                          <option value={lead._id}>
                              {id.title} {id.first_name} {id.last_name}
                          </option>
                      )}
                        {
                          !lead && (
                            data.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                          )
                            
                        }
                        </select>
                        </div> */}
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
                    <option>Select </option>
                       <option>Confirmed</option>
                       <option>Tentative</option>
                        </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"></div>

                        <div className="col-md-10 mb-10 custom-input"><label className="form-label">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remark:e.target.value})} /></div>
                
               
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
                    <option>Select</option>
                       {
                        contactdata.filter((item)=>item.profession_category==="Self Employed" && item.profession_subcategory==="Real Estate Agent" || item.profession_category==="Private Employee" && item.profession_subcategory==="Sales Person").map((item)=>
                        (
                            <option>{item.title} {item.first_name} {item.last_name} ({item.company_name})</option>
                        )) 
                       }
                        </select>
                        </div>
                        <div className="col-md-6 mb-6 custom-input"></div>

                        {/* <div className="col-md-6 mb-6 custom-input"><label className="form-label">Remind Me?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={(e)=>setsitevisit({...sitevisit,remind_me:e.target.checked})}/>
                        <span class="slider round"></span>
                        </label>
                    </div> */}
                    {/* <div className="col-md-6 mb-6 custom-input"></div> */}

                   
                            
                          <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Start Date</label><input type="datetime-local"  className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,start_date:e.target.value})}/></div>
                          <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select End Date</label><input type="datetime-local"  className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,end_date:e.target.value})}/></div>
                            <div className="col-md-4 mb-4 custom-input"></div>
             
                  
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Mark As Completed?</label> 
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
                    
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Status</label><select className="form-control form-control-sm" required="true" onChange={handleleadstatuschange} >
                    <option>---Select---</option>
                     {
                      sitevisit_status.map((item)=>
                      (
                      <option>{item}</option>
                      ))
                     }
                        </select>
                        </div>
                        <div className="col-md-8 mb-8 custom-input"></div>
                        {
                            sitevisit.status==="Conducted" &&(
                                <>

                                {/* <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Intrested Project</label> 
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

                                <div className="col-md-4 mb-4 custom-input">
              <label className="form-label">Select Interested Block</label>
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
                      <MenuItem key={uniqueBlockKey} value={uniqueBlockKey}> {/* Use block.block-project for value 
                        <Checkbox 
                          checked={allblock.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
                        />
                        <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project 
                      </MenuItem>
                    );
                  })
                }
              </Select>
</div>



                                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Intersted Inventory</label>
                             
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

          <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Intersted Inventory</label>
              {Array.isArray(sitevisit.intrested_inventory) ?
                sitevisit.intrested_inventory.map((item,index)=>
                (
                  <select
                  style={{marginTop:"10px"}}
                  className="form-control form-control-sm"
                  // value={sitevisit.intrested_inventory} 
                  onChange={(event)=>handlesitevisitinventorychange(index,event)}// Handle changes for unit selection
                  >
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

      <div className="col-md-4 mb-4 custom-input"><label className="form-label">Result</label>
                                      
      {
                               Array.isArray(sitevisit.result)?
                            sitevisit.result.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handlesitevisitresultchange(index,event)}>
                            
                         
                             <option>---Select---</option>
                             {
                                sitevisit_result.map((item)=>
                                (
                                <option>{item}</option>
                                ))
                              }
                            </select>
                            )):[]
                            }
                  </div> 

                  <div className="col-md-1 mb-1 custom-input" style={{marginTop:"70px"}}>
                            {
                               Array.isArray(sitevisit.action1)?
                               sitevisit.action1.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>

      <div className="col-md-1 mb-1 custom-input" ><label className="form-label">add</label><button className="form-control form-control-sm" onClick={addFn1}>+</button></div>
      <div className="col-md-2 mb-2 custom-input"></div>
                                    </>
                            )
                        }
                     
                    
              
                
               <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,date:e.target.value})}/></div>
                <div className="col-md-8 mb-8 custom-input"></div>

                    <div className="col-md-8 mb-8 custom-input"><label className="form-label">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,feedback:e.target.value})}/></div>
                 
                   
                    </div>
                    </div>
       

                    <div className="col-md-2 mb-2 custom-input"></div>
                    <div className="col-md-2 mb-2 custom-input" style={{marginLeft:"50%",marginTop:"20px"}}><button className="form-control form-control-sm save-btn" onClick={sitevisitdetails}>Submit</button></div>
                    <div className="col-md-2 mb-2 custom-input" style={{marginTop:"20px"}}><button className="form-control form-control-sm cancel-btn" onClick={()=>navigate(-1)}>Cancel</button></div>
                   
                    
                    {/* <div className="col-md-6 mb-6 custom-input"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6 mb-6 custom-input"><button className="form-control form-control-sm">Cancel</button></div> */}
                   
                    </div>
                

        {/*=========================================== meeting task=================================================================================== */}
                
                
                    <div className="row" id="meeting" style={{display:"none"}}>

                    <div className="col-md-12 mb-12 custom-input"><label className="form-label">Title</label><p id="meetingtitle">MEETING with {meetingtask.lead} For {meetingtask.reason} of {meetingtask.inventory.join(',')} at {meetingtask.location_type} @ {meetingtask.due_date}.
                      </p></div>
                        
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,executive:e.target.value})}>
                    <option>Select </option>
                    <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                             <div className="col-md-4 mb-4 custom-input">
                <label className="form-label">Select Lead</label>
                <Autocomplete
                  const options = {leadoption?data.filter(item => item._id === leadoption): data}
                    getOptionLabel={(option) =>
                    `${option.title} ${option.first_name} ${option.last_name}`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="---select---" variant="outlined" size="small" />
                  )}
                  onChange={(event, selectedLead) => {
                    if (selectedLead) {
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
                      setactivity({...activity,activity_name:"create meeting task",lead:fullName})
                    }
                  }}
                />
              </div>
             
                        <div className="col-md-4 mb-4 custom-input"></div>
                        
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Location Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,location_type:e.target.value})}>
                    <option>Select</option>
                        {
                            location.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-8 mb-8 custom-input"></div>

                    <div className="col-md-8 mb-8 custom-input"><label className="form-label">Location Address</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,location_address:e.target.value})}/></div>
                    <div className="col-md-4 mb-4 custom-input"></div>
                  

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Reason</label><select className="form-control form-control-sm" required="true" onChange={handlereasonchangemeeting}>
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
                    <div className="col-md-8 mb-8 custom-input"></div>

                    {
                      meetingtask.reason==="Discuss" && (
                        <>

                      

                            <div className="col-md-4 mb-4 custom-input">
        <label className="form-label">Select Project</label> 
        <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={projects2}
          onChange={handleprojectchange2}
          renderValue={(selected) => selected.join(', ')}
        >
          {allproject.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={projects2.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </div>


<div className="col-md-4 mb-4 custom-input">
              <label className="form-label">Select Block</label>
              <Select
                className="form-control form-control-sm"
                style={{ border: "none" }}
                multiple
                value={allblockmeeting}  // Value contains the full block.block-project combinations
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
                          checked={allblockmeeting.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
                        />
                        <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
                      </MenuItem>
                    );
                  })
                }
              </Select>
        </div>

            <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Inventory</label>
                             
                             <Select
                        className="form-control form-control-sm"
                        style={{ border: "none" }}
                        multiple
                        value={allunit1meeting} // Holds selected units
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
                              <Checkbox checked={allunit1meeting.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
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

                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Inventory</label>
                        <select className="form-control form-control-sm"
                    onChange={handleallunitschange2}
                >
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

                   

                    <div className="col-md-10 mb-10 custom-input"><label className="form-label">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setmeetingtask({...meetingtask,remark:e.target.value})}/></div>
                    <div className="col-md-2 mb-2 custom-input"></div>

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Due Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={handleDateChangemeeting}/></div>
                    {/* <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChangemeeting}/></div> */}
                    <div className="col-md-8 mb-8 custom-input"></div>
                    
                  
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Completed?</label> 
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
                    
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Status</label><select className="form-control form-control-sm" required="true"  onChange={(e)=>setmeetingtask({...meetingtask,status:e.target.value})}>
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
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Meeting Result</label><select className="form-control form-control-sm" required="true"  onChange={(e)=>setmeetingtask({...meetingtask,meeting_result:e.target.value})}>
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
                    <div className="col-md-4 mb-4 custom-input"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Select Date</label><input type="datetime-local" className="form-control form-control-sm"  onChange={(e)=>setmeetingtask({...meetingtask,date:e.target.value})}/></div>

                    <div className="col-md-8 mb-8 custom-input"><label className="form-label">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}  onChange={(e)=>setmeetingtask({...meetingtask,feedback:e.target.value})}/></div>
                     </div>
                   
                        </div>
                        
                    <div className="col-md-2 mb-2 custom-input"  style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm save-btn" onClick={meetingtaskdetails}>Submit</button></div>
                    <div className="col-md-2 mb-2 custom-input"  style={{marginTop:"20px"}}><button className="form-control form-control-sm cancel-btn" onClick={()=>navigate(-1)}>Cancel</button></div>
                   
                        </div> 
                       

                    {/* <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
           
        <div className="col-12">
            
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Direction</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        {
                            direction.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Status</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        {
                            status.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4 mb-4 custom-input"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Date</label><input type="date" id="date1" className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1}/></div>
                <div className="col-md-4 mb-4 custom-input"><label className="form-label">Duration</label><input type="time" className="form-control form-control-sm" /></div>
                <div className="col-md-4 mb-4 custom-input"> </div>

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Result</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                       {
                        result.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                       </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                    <div className="col-md-4 mb-4 custom-input"></div>

                    <div className="col-md-8 mb-8 custom-input"><label className="form-label">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                    <div className="col-md-12 mb-12 custom-input"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="form-label" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     </div>
                    {/* <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6 mb-6 custom-input"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6 mb-6 custom-input"><button className="form-control form-control-sm">Cancel</button></div>
                    </div> 
                    </div>
                    
        </div>
        </div>
        
                    

                      
              
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" >
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}
                  
                    </div>
                    </div>
        
        </div>
        </div>
        <ToastContainer/>
        </div>
     );
}

export default Task_form;