import { useState } from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { ToastContainer, toast} from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../api";
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {React, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Select, MenuItem, Checkbox, ListItemText  } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { Factory, House, School } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';





function EditProjectform() {
  
  const location=useLocation()
  const id=location.state.id[0]

   const [isLoading, setIsLoading] = useState(false);
  
    
       
     useEffect(()=>{fetchdeveloper()},[])

    const navigate=useNavigate(); 

    const add_developer=()=>
    {
      navigate('/addcompany')
    }

    const[data1,setdata1]=useState([]);
    const fetchdeveloper=async(event)=>
    {
      
      try {
        const resp=await api.get('viewcompany')
        
        setdata1(resp.data.developer)
      } catch (error) {
        console.log(error);
      }
    
    }

 
   
    

    const [project,setproject]=useState({name:"",developer_name:"",joint_venture:"",secondary_developer:"",rera_number:"",descriptions:"",
                                          category:[],sub_category:[],land_area:"",measurment1:"",total_block:"",total_floor:"",
                                          total_units:"",zone:[],status:"",launched_on:"",expected_competion:"",possession:"",parking_type:[],
                                          approved_bank:"",approvals:[''],registration_no:[''],date:[''],pic:[''],action1:[],owner:[],
                                          team:[],visible_to:"",
                         
                                          location:"",lattitude:"",langitude:"",address:"",street:"",locality:"",city:"",zip:"",state:"",country:"",

                                          add_block:[],add_size:[],add_unit:[],basic_aminities:[],features_aminities:[],nearby_aminities:[],
                                          price_list:[],Payment_plan:[]});
    
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }
      
const viewprojectbyid=async()=>
{
    try {
        const resp=await api.get(`viewprojectbyid/${id}`)
        setproject(resp.data.project)
    } catch (error) {
        console.log(error);
        
    }
}
useEffect(()=>
{
viewprojectbyid()
},[id])

    const addproject=async(e)=>
    {
      
        e.preventDefault();
        try {

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

            const resp= await api.put(`updateproject/${id}`,project,config)
        if(resp.status===200)
            {
                toast.success("Project Saved",{ autoClose: 2000 })
                setTimeout(() => {
                  navigate('/project')
                }, 2000);
            }
            
      
        } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
        }
    }

    const time=new Date()
    
    
     

        const mousehover=()=>
            {
               document.getElementById("r").style.marginLeft="15%"
               
            }
            const mouseout=()=>
                {
                    document.getElementById("r").style.marginLeft="0%"
                }

// ----------------------=========================all form tab view toggle code ======================------------------------------------------      
        const basicdetails=()=>
          {
                document.getElementById("basicdetails1").style.display="flex"
                document.getElementById("location").style.display="none"
                document.getElementById("block").style.display="none"
                document.getElementById("sizedetails").style.display="none"
                document.getElementById("unitdetails").style.display="none"
                document.getElementById("aminities").style.display="none"
                document.getElementById("price").style.display="none"
              
                document.getElementById("basic").style.color="green"
                document.getElementById("other").style.color="black"
                document.getElementById("professional").style.color="black"
                document.getElementById("size1").style.color="black"
                document.getElementById("unit").style.color="black"
                document.getElementById("aminities1").style.color="black"
                document.getElementById("prices").style.color="black"
          }
          const professionaldetails=()=>
            {
                document.getElementById("basicdetails1").style.display="none"
                document.getElementById("location").style.display="flex"
                document.getElementById("block").style.display="none"
                document.getElementById("sizedetails").style.display="none"
                document.getElementById("unitdetails").style.display="none"
                document.getElementById("aminities").style.display="none"
                document.getElementById("price").style.display="none"
              

                document.getElementById("basic").style.color="black"
                document.getElementById("other").style.color="black"
                document.getElementById("professional").style.color="green"
                document.getElementById("size1").style.color="black"
                document.getElementById("unit").style.color="black"
                document.getElementById("aminities1").style.color="black"
                document.getElementById("prices").style.color="black"
               
            }
          const otherdetails=()=>
            {
                  document.getElementById("basicdetails1").style.display="none"
                  document.getElementById("location").style.display="none"
                  document.getElementById("block").style.display="flex"
                  document.getElementById("sizedetails").style.display="none"
                  document.getElementById("unitdetails").style.display="none"
                  document.getElementById("aminities").style.display="none"
                  document.getElementById("price").style.display="none"

                  document.getElementById("basic").style.color="black"
                  document.getElementById("professional").style.color="black"
                  document.getElementById("other").style.color="green"
                  document.getElementById("size1").style.color="black"
                  document.getElementById("unit").style.color="black"
                  document.getElementById("aminities1").style.color="black"
                  document.getElementById("prices").style.color="black"
            }
            const sizedetails=()=>
                {
                      document.getElementById("basicdetails1").style.display="none"
                      document.getElementById("location").style.display="none"
                      document.getElementById("block").style.display="none"
                      document.getElementById("sizedetails").style.display="flex"
                      document.getElementById("unitdetails").style.display="none"
                      document.getElementById("aminities").style.display="none"
                      document.getElementById("price").style.display="none"

                      document.getElementById("basic").style.color="black"
                      document.getElementById("professional").style.color="black"
                      document.getElementById("other").style.color="black"
                      document.getElementById("size1").style.color="green"
                      document.getElementById("unit").style.color="black"
                      document.getElementById("aminities1").style.color="black"
                      document.getElementById("prices").style.color="black"
                }
                const unitdetails=()=>
                  {
                        document.getElementById("basicdetails1").style.display="none"
                        document.getElementById("location").style.display="none"
                        document.getElementById("block").style.display="none"
                        document.getElementById("sizedetails").style.display="none"
                        document.getElementById("unitdetails").style.display="flex"
                        document.getElementById("aminities").style.display="none"
                        document.getElementById("price").style.display="none"
      
                        document.getElementById("basic").style.color="black"
                        document.getElementById("professional").style.color="black"
                        document.getElementById("other").style.color="black"
                        document.getElementById("size1").style.color="black"
                        document.getElementById("unit").style.color="green"
                        document.getElementById("aminities1").style.color="black"
                        document.getElementById("prices").style.color="black"
                  }

                  const [activeUnit, setActiveUnit] = useState(1); // Track active unit tab



                                  const unitdetail1=()=>
                                    
                                    {
                                      setModalSize('lg');
                                      setActiveUnit(1);
                                      document.getElementById("unitdetails1").style.display="flex"
                                      document.getElementById("unitlocation").style.display="none"
                                      document.getElementById("ownerdetails").style.display="none"
                                      document.getElementById("uploadmedia").style.display="none"
                                      document.getElementById("documentform").style.display="none"
                                           
                                  
                                    
                                      // document.getElementById("unitdetail").style.color="green"
                                      // document.getElementById("unitlocationdetails").style.color="black"
                                      // document.getElementById("ownerdetails").style.color="black"
                                      
                                      
                                    }
                                    const unitdetail2=()=>
                                      {
                                        setModalSize('lg');
                                        setActiveUnit(2);
                                        document.getElementById("unitdetails1").style.display="none"
                                        document.getElementById("unitlocation").style.display="flex"
                                        document.getElementById("ownerdetails").style.display="none"
                                        document.getElementById("uploadmedia").style.display="none"
                                        document.getElementById("documentform").style.display="none"
                                    
                                      
                                        // document.getElementById("unitdetail").style.color="black"
                                        // document.getElementById("unitlocationdetails").style.color="green"
                                        // document.getElementById("ownerdetails").style.color="black"
                                        
                                      }
                                      const unitdetail3=()=>
                                        {
                                          setModalSize('lg');
                                          setActiveUnit(3);
                                          document.getElementById("unitdetails1").style.display="none"
                                          document.getElementById("unitlocation").style.display="none"
                                          document.getElementById("ownerdetails").style.display="flex"
                                          document.getElementById("uploadmedia").style.display="none"
                                          document.getElementById("documentform").style.display="none"
                                      
                                           
                                        }

                                        const unitdetail4=()=>
                                          {
                                            setModalSize('xl');
                                            setActiveUnit(4);
                                            document.getElementById("unitdetails1").style.display="none"
                                            document.getElementById("unitlocation").style.display="none"
                                            document.getElementById("ownerdetails").style.display="none"
                                            document.getElementById("documentform").style.display="inline-block"
                                            document.getElementById("uploadmedia").style.display="none"
                                           
                                          }

                                        const unitdetail5=()=>
                                          {
                                            setModalSize('lg');
                                            setActiveUnit(5);
                                            document.getElementById("unitdetails1").style.display="none"
                                            document.getElementById("unitlocation").style.display="none"
                                            document.getElementById("ownerdetails").style.display="none"
                                            document.getElementById("documentform").style.display="none"
                                            document.getElementById("uploadmedia").style.display="inline-block"
                                        
                                             
                                          }
                                     
                  const aminitiesdetails=()=>
                    {
                          document.getElementById("basicdetails1").style.display="none"
                          document.getElementById("location").style.display="none"
                          document.getElementById("block").style.display="none"
                          document.getElementById("sizedetails").style.display="none"
                          document.getElementById("unitdetails").style.display="none"
                          document.getElementById("aminities").style.display="flex"
                          document.getElementById("price").style.display="none"
          
                          document.getElementById("basic").style.color="black"
                          document.getElementById("professional").style.color="black"
                          document.getElementById("other").style.color="black"
                          document.getElementById("size1").style.color="black"
                          document.getElementById("unit").style.color="black"
                          document.getElementById("aminities1").style.color="green"
                          document.getElementById("prices").style.color="black"
                    }

                                    const basicaminities=()=>
                                      {
                                        document.getElementById("basicaminities").style.display="flex"
                                        document.getElementById("featuredaminities").style.display="none"
                                        document.getElementById("nearbyaminities").style.display="none"
                                    
                                          
                                        document.getElementById("featuredaminities1").style.color="black"
                                        document.getElementById("featuredaminities1").style.backgroundColor="white"
                                        document.getElementById("nearbyaminities1").style.color="black"
                                        document.getElementById("nearbyaminities1").style.backgroundColor="white"
                      
                                        document.getElementById("basicaminities1").style.backgroundColor="black"
                                        document.getElementById("basicaminities1").style.color="white"
                                        document.getElementById("basicaminities1").style.borderRadius="50px"
                                        document.getElementById("basicaminities1").style.width="80px"
                                        document.getElementById("basicaminities1").style.textAlign="center"
                                      
                                      
                                  
                                        
                                      }
                                      const featuredaminities=()=>
                                        {
                                          document.getElementById("basicaminities").style.display="none"
                                          document.getElementById("featuredaminities").style.display="flex"
                                          document.getElementById("nearbyaminities").style.display="none"
                                      
                                        
                                          document.getElementById("basicaminities1").style.color="black"
                                          document.getElementById("basicaminities1").style.backgroundColor="white"
                                          document.getElementById("nearbyaminities1").style.color="black"
                                          document.getElementById("nearbyaminities1").style.backgroundColor="white"
                      
                                          document.getElementById("featuredaminities1").style.backgroundColor="black"
                                          document.getElementById("featuredaminities1").style.color="white"
                                          document.getElementById("featuredaminities1").style.borderRadius="50px"
                                          document.getElementById("featuredaminities1").style.width="80px"
                                          document.getElementById("featuredaminities1").style.textAlign="center"
                                          
                                        }
                                        const nearbyaminities=()=>
                                          {
                                            
                                            document.getElementById("basicaminities").style.display="none"
                                            document.getElementById("featuredaminities").style.display="none"
                                            document.getElementById("nearbyaminities").style.display="flex"
                                        
                                          
                                            document.getElementById("basicaminities1").style.color="black"
                                            document.getElementById("basicaminities1").style.backgroundColor="white"
                                            document.getElementById("featuredaminities1").style.color="black"
                                            document.getElementById("featuredaminities1").style.backgroundColor="white"
                      
                                            document.getElementById("nearbyaminities1").style.backgroundColor="black"
                                            document.getElementById("nearbyaminities1").style.color="white"
                                            document.getElementById("nearbyaminities1").style.borderRadius="50px"
                                            document.getElementById("nearbyaminities1").style.width="80px"
                                            document.getElementById("nearbyaminities1").style.textAlign="center"
                                            
                                          }
                    const pricedetails=()=>
                      {
                            document.getElementById("basicdetails1").style.display="none"
                            document.getElementById("location").style.display="none"
                            document.getElementById("block").style.display="none"
                            document.getElementById("sizedetails").style.display="none"
                            document.getElementById("unitdetails").style.display="none"
                            document.getElementById("aminities").style.display="none"
                            document.getElementById("price").style.display="flex"
            
                            document.getElementById("basic").style.color="black"
                            document.getElementById("professional").style.color="black"
                            document.getElementById("other").style.color="black"
                            document.getElementById("size1").style.color="black"
                            document.getElementById("unit").style.color="black"
                            document.getElementById("aminities1").style.color="black"
                            document.getElementById("prices").style.color="green"
                      }
// ===================================-----------all form tab toggle code end------------------------------=================================
                   
  //--------------------------==========================  add delete and onchange event of array start -------------==================================     

          function addFn1() {
        
                    setproject({
                      ...project,
                      approvals: [...project.approvals, ''],
                      registration_no: [...project.registration_no, ''],
                      date: [...project.date, ''],
                      pic: [...project.pic, ''],
                      action1: Array.isArray(project.action1)? [...project.action1, '']: ['']
                    });
                  };

          const deleteall1=(index)=>
            {
             
              const newapprovals = project.approvals.filter((_, i) => i !== index);
              const newregistrationno = project.registration_no.filter((_, i) => i !== index);
              const newdate = project.date.filter((_, i) => i !== index);
              const newpic = project.pic.filter((_, i) => i !== index);
              const newaction1 = project.action1.filter((_, i) => i !== index);
              
              setproject({
                ...project,
                approvals: newapprovals,
                registration_no: newregistrationno,
                date: newdate,
                pic:newpic,
                action1: newaction1
              });
            }
            const handleapprovalschange = (index, event) => {
              const newapprovals = [...project.approvals];
              newapprovals[index] = event.target.value;
              setproject({
                ...project,
                approvals: newapprovals
              });
            };
            const handleregistrationchange = (index, event) => {
              const newregistration = [...project.registration_no];
              newregistration[index] = event.target.value;
              setproject({
                ...project,
                registration_no: newregistration
              });
            };
            const handledatechange = (index, event) => {
              const newdate = [...project.date];
              newdate[index] = event.target.value;
              setproject({
                ...project,
                date: newdate
              });
            };
            const handlepicchange = (index, event) => {
              const newpic = [...project.pic];
              const files = Array.from(event.target.files);
              newpic[index] = {files:files}
              setproject({
                ...project,
                pic: newpic
              });
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
                  action3: [...units.action3, '']
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
                  const newlength = [...units.length];
                  newlength[index] = event.target.value;
                  setunits({
                    ...units,
                    length: newlength
                  });
                };
                const handlebredthchange = (index, event) => {
                  const newbreadth = [...units.bredth];
                  newbreadth[index] = event.target.value;
                  setunits({
                    ...units,
                    bredth: newbreadth
                  });
                };
                const handletotalarea = (index, event) => {
                  const newtotalarea = [...units.total_area];
                  newtotalarea[index] = event.target.value;
                  setunits({
                    ...units,
                    total_area: newtotalarea
                  });
                };
              
          
            
               




                function addFn4() {
     
                  setpayments({
                    ...payments,
                    step_name: [...payments.step_name, ''],
                    calculation_type: [...payments.calculation_type, ''],
                    blank1: [...payments.blank1, ''],
                    blank2: [...payments.blank2, ''],
                    blank3: [...payments.blank3, ''],
                    action4:[...payments.action4,'']
                  });
                };
                const deleteall4=(index)=>
                  {
                   
                    const newstepname = payments.step_name.filter((_, i) => i !== index);
                    const newcalculationtype = payments.calculation_type.filter((_, i) => i !== index);
                    const newblank1 = payments.blank1.filter((_, i) => i !== index);
                    const newblank2 = payments.blank2.filter((_, i) => i !== index);
                    const newblank3 = payments.blank3.filter((_, i) => i !== index);
                    const newaction4=payments.action4.filter((_,i) => i !== index);
                    
                    setpayments({
                      ...payments,
                      step_name: newstepname,
                      calculation_type: newcalculationtype,
                      blank1: newblank1,
                      blank2: newblank2,
                      blank3: newblank3,
                      action4:newaction4
                    });
                  }
                  const handlestepnamechange = (index, event) => {
                    const newstep = [...payments.step_name];
                    newstep[index] = event.target.value;
                    setpayments({
                      ...payments,
                      step_name: newstep
                    });
                  };
                  const handlecalculationtypechange = (index, event) => {
                    const newcalculationtype = [...payments.calculation_type];
                    newcalculationtype[index] = event.target.value;
                    setpayments({
                      ...payments,
                      calculation_type: newcalculationtype
                    });
                  };
                  const handleblank1change = (index, event) => {
                    const newblank1 = [...payments.blank1];
                    newblank1[index] = event.target.value;
                    setpayments({
                      ...payments,
                      blank1: newblank1
                    });
                  };
                  const handleblank2change = (index, event) => {
                    const newblank2 = [...payments.blank2];
                    newblank2[index] = event.target.value;
                    setpayments({
                      ...payments,
                      blank2: newblank2
                    });
                  };
                  const handleblank3change = (index, event) => {
                    const newblank3 = [...payments.blank3];
                    newblank3[index] = event.target.value;
                    setpayments({
                      ...payments,
                      blank3: newblank3
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

    //==================----------------- add delete and onchange event of array end---------------------------===============================

// ==============---------------------------google location code start-----------------====================================================
const [mapLoaded, setMapLoaded] = useState(false);  // Tracks if the first map is loaded
const [mapLoaded1, setMapLoaded1] = useState(false);
                        const [coordinates, setCoordinates] = useState('');
                      //   const handleSubmit = async (e) => {
                      //     e.preventDefault();
                      //   try {
                      //     const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                      //       params: {
                      //         address: project.location,
                      //         key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc'  // Replace with your API key
                      //       }
                      //     });
                
                      //     if (response.data.results.length > 0) {
                          
                      //       const { lat, lng } = response.data.results[0].geometry.location;
                      //       setCoordinates({ lat, lng });
                      //       setproject({...project,lattitude:lat,langitude:lng})
                      //       setMapLoaded(true); 
                            
                      //     } else {
                      //       setCoordinates(null);
                      //       console.log('No results found');
                      //     }
                          
                      //   } catch (error) {
                      //     console.error('Error fetching coordinates:', error);
                      //   }
                      // }

                      const handleSubmit = async (e) => {
                        e.preventDefault();
                        try {
                          // Geocode the address entered by the user
                          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                            params: {
                              address: project.location,
                              key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc' // Replace with your API key
                            }
                          });
                      
                          // Check if we have results from the geocoding response
                          if (response.data.results.length > 0) {
                            const { lat, lng } = response.data.results[0].geometry.location;
                            setCoordinates({ lat, lng });
                            setproject(prevProject => ({
                              ...prevProject,
                              lattitude: lat,
                              langitude: lng
                            }));
                      
                            // Extract address components from the response
                            const addressComponents = response.data.results[0].address_components;
                            console.log('Geocode Response:', response.data);
                            let address = '';
                            let street = '';
                            let locality = '';
                            let city = '';
                            let zip = '';
                            let state = '';
                            let country = '';
                      
                            // Loop through address components to populate the fields
                            addressComponents.forEach(component => {
                              const types = component.types;
                      
                              if (types.includes('administrative_area_level_3') || types.includes('political')) {
                                address += component.long_name + ' ';
                              }
                              if (types.includes('sublocality_level_1') || types.includes('sublocality')) {
                                locality += component.long_name + ' ';
                              }
                              // if (types.includes('administrative_area_level_2')) {
                              //   locality = component.long_name;
                              // }
                              if (types.includes('administrative_area_level_1')) {
                                state = component.long_name;
                              }
                              if (types.includes('locality')) {
                                city = component.long_name;
                              }
                              if (types.includes('postal_code')) {
                                zip = component.long_name;
                              }
                              if (types.includes('country')) {
                                country = component.long_name;
                              }
                            });
                      
                            // Update the state with the extracted address components
                            setproject(prevProject => ({
                              ...prevProject,
                              address,
                              street: street.trim(),
                              locality,
                              city,
                              zip,
                              state,
                              country,
                              location: response.data.results[0].formatted_address
                            }));
                      
                            // Optionally mark the map as loaded (if you use a map component)
                            
                      
                          } else {
                            // Handle case when no results are found
                            setCoordinates1(null);
                            console.log('No results found');
                          }
                      
                        } catch (error) {
                          // Handle errors, such as invalid API key or issues with the network
                          console.error('Error fetching coordinates:', error);
                        }
                      };

                      const mapStyles = {
                        height: "500px",
                        width: "100%"
                      }
                    
                      const defaultCenter = {
                        lat: coordinates.lat || 37.7749, lng: coordinates.lng || -122.4194
                      };

                      const handleMarkerDragEnd = async (e) => {
                        const newLat = e.latLng.lat();
                        const newLng = e.latLng.lng();
                        setCoordinates({ lat: newLat, lng: newLng });
                    
                        // Reverse geocoding to get the location name from lat/lng
                        try {
                          const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                            params: {
                              latlng: `${newLat},${newLng}`,
                              key: "AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc",  // Replace with your API key
                            },
                          });
                    
                          if (response.data.results.length > 0) {
                            const locationName = response.data.results[0].formatted_address;
                            setproject({ ...project, location: locationName, lattitude: newLat, langitude: newLng });
                          } else {
                            console.log("No location name found");
                          }
                        } catch (error) {
                          console.error("Error fetching location name:", error);
                        }
                      };


                      const [coordinates1, setCoordinates1] = useState('');
                
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
                   
                    const mapStyles1 = {
                      height: "500px",
                      width: "100%"
                    }
                  
                    const defaultCenter1 = {
                      lat: coordinates1.lat || 37.7749, lng: coordinates1.lng || -122.4194
                    };
// ================================----------------------google location code end-----------------------------================================
                    

//================----------------------------- styled table view code start-----------------------==========================================

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

// ===================--------------------styled table view code end--------------------------------=============================================


//=================================================== all model open and close code start----==================================================
                      const [show1, setshow1] = useState(false);
    
                      const handleClose1 = () => setshow1(false);
                      const handleShow1=async()=>
                      {
                        setshow1(true);
                       
                      }
                      const [show2, setshow2] = useState(false);
    
                      const handleClose2 = () => setshow2(false);
                      const handleShow2=async()=>
                      {
                        setshow2(true);
                       
                      }

                      const [modalSize, setModalSize] = useState('lg');
                      const [show3, setshow3] = useState(false);
    
                      const handleClose3 = () => setshow3(false);
                      const handleShow3=async()=>
                      {
                        setshow3(true);
                       
                      }
                      const [show4, setshow4] = useState(false);
    
                      const handleClose4 = () => setshow4(false);
                      const handleShow4=async()=>
                      {
                        setshow4(true);
                       
                      }
                      const [show5, setshow5] = useState(false);
    
                      const handleClose5 = () => setshow5(false);
                      const handleShow5=async()=>
                      {
                        setshow5(true);
                       
                      }
// ====================================----- all model open and close code end-------------===================================================
                     


// ---------------===============  size toggle start --------------===========================================================================
                



                      const [showPlotSize, setShowPlotSize] = useState(false); // Track the checkbox state

                          // Handle the checkbox change to show/hide plot size section
                          const handleCheckboxChange2 = (event) => {
                            setShowPlotSize(event.target.checked);
                          };
                          const [showapartmentSize, setShowapartmentSize] = useState(false); // Track the checkbox state

                          // Handle the checkbox change to show/hide plot size section
                          const handleCheckboxChange3 = (event) => {
                            setShowapartmentSize(event.target.checked);
                          };

                


                          const [showabuiltup, setSowbuiltup] = useState(false); // Track the checkbox state

                          // Handle the checkbox change to show/hide plot size section
                          const handleCheckboxChange4 = (event) => {
                            setSowbuiltup(event.target.checked);
                          };


  //==========================------------------------------- size toggle end--------------------------=================================
                 


// ======================------------------- both check boxes code start ---------------===============================================
                      const checkboxItems = [
                        "Car Parking",
                        "Intercom",
                        "Multi-Purpose Hall",
                        "24x7 Water Supply",
                        "Municipal Water Supply",
                        "Garbage Management System",
                        "Fire Fighting System",
                        "Visitor Car Parking",
                        "Earthquake Resistance",
                        "Lift",
                        "Maintenance Staff",
                        "Power Supply",
                        "Air Condition",
                        "Security",
                        "Bike Parking",
                        "Others"
                      ];
                      const [checkedItems, setCheckedItems] = useState(Array(checkboxItems.length).fill(false));
                      const [selectAll, setSelectAll] = useState(false);
                    
                      useEffect(() => {
                        const initialCheckedItems = checkboxItems.map(item => project.basic_aminities.includes(item));
                        setCheckedItems(initialCheckedItems);
                        // Update selectAll based on whether all items are selected
                        setSelectAll(initialCheckedItems.every(checked => checked));
                      }, [project.basic_aminities]); 


                      // Toggle individual checkboxes
                      const handleCheckboxChange = (index) => {
                        const updatedCheckedItems = [...checkedItems];
                        updatedCheckedItems[index] = !updatedCheckedItems[index];
                        setCheckedItems(updatedCheckedItems);

                        const selectedAminity = checkboxItems[index];

                        // Add or remove item from basic_aminities in the project state
                                setproject((prevState) => {
                                  const updatedBasicAminities = updatedCheckedItems[index]
                                    ? [...prevState.basic_aminities, selectedAminity]
                                    : prevState.basic_aminities.filter((item) => item !== selectedAminity);

                                  return {
                                    ...prevState,
                                    basic_aminities: updatedBasicAminities
                                  };
                                });
                    
                        // If any checkbox is unchecked, deselect "Select All"
                        if (updatedCheckedItems.some((item) => !item)) {
                          setSelectAll(false);
                        }
                      };
                    
                      // Handle "Select All" checkbox
                      const handleSelectAllChange = () => {
                        const newSelectAll = !selectAll;
                        setSelectAll(newSelectAll);
                        setCheckedItems(Array(checkboxItems.length).fill(newSelectAll));

                        setproject((prevState) => ({
                          ...prevState,
                          basic_aminities: newSelectAll ? checkboxItems : []
                        }));
                      };


                     

                      const checkboxItems1 = [
                          "Seniour Citizen Corner","Worship Place","HAVC System","Cricket Pitch",
                          "Two Tier Security","Cafeteria","Car Washing Area","No Common Wall",
                          "Driver Dormitory","EPABX System","CCTV","Gymaasium",
                          "Garden","Power Back Up","Party Lawn","Gazebo",
                          "Cold Storage","Solar Water Heater","Jogging Track","DTH Connection",
                          "Three Tier Security","Smoking Area","Spa & Saloon","Solar Power",
                          "Video Door Phone","Utility Shop","Steam Room","Amphi Theatre",
                          "Private Car Parking","Guest Room","Internet","Kids Play area",
                          "Barbeque Facility","Basket Ball Court","Skating Rink","Socity Office",
                          "Squash Court","Waiting Longue","Yoga And Meditation Center","Water Softener",
                          "Swipe Card Entry","Health Facilities","Library","Day Care Center",
                          "Reception","Shiping Stores","Laundry Room","Indoor Games",
                          "Piped Lpg Connection","Confrence Or Meeting Room","Badminton Court","Sauna Bath",
                          "Rain Water Harvesting","Jacuzzi","Massage Parlor","Tution Room",
                          "Restaurant","Tennis Court","Club House","Swimming Pool",
                          "Wi-Fi","Mini Theater","Modular Kitchen","Cycliing Track",
                          "Outdoor Games"


                      ];
                      const [checkedItems1, setCheckedItems1] = useState(Array(checkboxItems1.length).fill(false));
                      const [selectAll1, setSelectAll1] = useState(false);
                    

                        
                      useEffect(() => {
                        const initialCheckedItems = checkboxItems1.map(item => project.features_aminities.includes(item));
                        setCheckedItems1(initialCheckedItems);
                        // Update selectAll based on whether all items are selected
                        setSelectAll1(initialCheckedItems.every(checked => checked));
                      }, [project.features_aminities]); 


                      // Toggle individual checkboxes
                      const handleCheckboxChange1 = (index) => {
                        const updatedCheckedItems1 = [...checkedItems1];
                        updatedCheckedItems1[index] = !updatedCheckedItems1[index];
                        setCheckedItems1(updatedCheckedItems1);

                        const selectedAminity1 = checkboxItems1[index];

                        // Add or remove item from basic_aminities in the project state
                                setproject((prevState) => {
                                  const updatedBasicAminities = updatedCheckedItems1[index]
                                    ? [...prevState.features_aminities, selectedAminity1]
                                    : prevState.features_aminities.filter((item) => item !== selectedAminity1);

                                  return {
                                    ...prevState,
                                    features_aminities: updatedBasicAminities
                                  };
                                });
                    
                        // If any checkbox is unchecked, deselect "Select All"
                        if (updatedCheckedItems1.some((item) => !item)) {
                          setSelectAll1(false);
                        }
                      };
                    
                      // Handle "Select All" checkbox
                      const handleSelectAllChange1 = () => {
                        const newSelectAll1 = !selectAll1;
                        setSelectAll1(newSelectAll1);
                        setCheckedItems1(Array(checkboxItems1.length).fill(newSelectAll1));

                        setproject((prevState) => ({
                          ...prevState,
                          features_aminities: newSelectAll1 ? checkboxItems1 : []
                        }));
                      };
                    
                    

// ---------------------=============== both check box code end--------------------------------========================================

// ===========================------------------block add and remove code---------------------=================================================
                                    const[blocks,setblocks]=useState([])
                                    const[block,setblock]=useState({block_name:"",category:[],sub_category:[],land_area:"",
                                                                    measurment:"",total_blocks:"",total_floors:"",total_units:"",
                                                                    status:"",launched_on:"",expected_competion:"",possession:"",
                                                                    parking_type:[],zone:[],rera_no:""})

                                        const addblock = () => {
                       
                                            if (block.block_name ) 
                                              {
                                                 
                                                const updateblocks= [...project.add_block, block];
                                                setblocks(updateblocks);
                                                setproject(prevState => ({
                                                  ...prevState,
                                                  add_block: updateblocks
                                                }));
                                                
                                                handleClose1()
                                                 } 
                                                 else
                                                   {
                                                       toast.error("Please fill out all fields.");
                                                   }
                                                 };
                                                
                                                 
                                    const deleteblock = (index) => {
                                    

                                      // Filter out the destination at the given index
                                      const newblocks = project.add_block.filter((_, i) => i !== index);
                                      setblocks(newblocks)

                                      // Set the updated destination details
                                      setproject(prevState => ({
                                        ...prevState,
                                        add_block: newblocks
                                      }));
                                    };

                                    const handleblockSubCategoryChange = (event) => {
                                      const {
                                        target: { value },
                                      } = event;
                                      setblock({
                                        ...block,
                                        sub_category: typeof value === 'string' ? value.split(',') : value, // Handle multiple selections
                                      });
                                    };

                                    

//===================================--------------------------- size add and delete start---------------------------=======================


                                            const[size,setsize]=useState([])
                                            
                                            const[sizes,setsizes]=useState({size_name:"",block1:"",category:"",sub_category:"",unit_type:"",type:"",
                                                                            total_sealable_area:"",sq_feet1:"Feet",covered_area:"",sq_feet2:"",
                                                                            carpet_area:"",sq_feet3:"",loading:"",percentage:"%",
                                                                            length:"",yard1:"yard",bredth:"",yard2:"",total_area:"",yard3:"Sq Yard"})

                                                const addsize = () => {

                                                    if (sizes.size_name ) 
                                                      {
                                                       
                                                        const updatesizes= [...project.add_size, sizes];
                                                        setsize(updatesizes);
                                                        setproject(prevState => ({
                                                          ...prevState,
                                                          add_size: updatesizes
                                                        }));
                                                       
                                                        handleClose2()

                                                           document.getElementById("choosedestination").value="Select"
                                                        } 
                                                        else
                                                          {
                                                              toast.error("Please fill out all fields.");
                                                          }
                                                        };
                                            const deletesize = (index) => {


                                              // Filter out the destination at the given index
                                              const newsizes = project.add_size.filter((_, i) => i !== index);

                                              // Set the updated destination details
                                              setproject(prevState => ({
                                                ...prevState,
                                                add_size: newsizes
                                              }));
                                              setsize(newsizes)
                                            };

                                             const convertToSquareUnit = (area, fromUnit, toUnit) => {
                                                                                        const conversionFactors = {
                                                                                          Yard: { 'Sq Yard': 1, 'Sq Meter': 0.836127, 'Sq Feet': 9, 'Sq Inch': 1296 },
                                                                                          Meter: { 'Sq Yard': 1.19599, 'Sq Meter': 1, 'Sq Feet': 10.7639, 'Sq Inch': 1550.0031 },
                                                                                          Feet: { 'Sq Yard': 0.111111, 'Sq Meter': 0.092903, 'Sq Feet': 1, 'Sq Inch': 144 },
                                                                                          Inch: { 'Sq Yard': 0.000771605, 'Sq Meter': 0.00064516, 'Sq Feet': 0.00694444, 'Sq Inch': 1 },
                                                                                        };
                                                                                      
                                                                                        if (!conversionFactors[fromUnit] || !conversionFactors[fromUnit][toUnit]) {
                                                                                          console.error(`Invalid conversion from ${fromUnit} to ${toUnit}`);
                                                                                          return area;
                                                                                        }
                                                                                      
                                                                                        return area * conversionFactors[fromUnit][toUnit];
                                                                                      };
                                                                                      
                                                                                      const calculateTotalArea = () => {
                                                                                        const length = parseFloat(sizes.length);
                                                                                        const bredth = parseFloat(sizes.bredth);
                                                                                      
                                                                                        // Check if length, bredth, yard1, and yard3 are valid
                                                                                        if (!isNaN(length) && !isNaN(bredth) && sizes.yard1 && sizes.yard3) {
                                                                                          const area = length * bredth;
                                                                                          const fromUnit = sizes.yard1.replace('Sq ', ''); // Remove "Sq " to get the unit (Yard, Meter, etc.)
                                                                                          const toUnit = sizes.yard3; // The unit we want to convert to (Sq Yard, Sq Meter, etc.)
                                                                                      
                                                                                          // Perform the conversion
                                                                                          const convertedArea = convertToSquareUnit(area, fromUnit, toUnit);
                                                                                      
                                                                                          // Update the total_area first
                                                                                          setsizes(prev => ({
                                                                                            ...prev,
                                                                                            total_area: convertedArea.toFixed(2),  // Format the area to 2 decimal places
                                                                                          }));
                                                                                        } else {
                                                                                          setsizes(prev => ({ ...prev, total_area: '' }));
                                                                                        }
                                                                                      };
                                                                                      
                                                                                      // Separate useEffect to update size_name based on the total_area
                                                                                      useEffect(() => {
                                                                                        if (sizes.total_area && sizes.yard3) {
                                                                                          // Calculate the size_name based on the updated total_area
                                                                                          const sizeName = `${sizes.type} ${sizes.unit_type} (${sizes.total_area} ${sizes.yard3})`;
                                                                                          setsizes(prev => ({
                                                                                            ...prev,
                                                                                            size_name: sizeName,
                                                                                          }));
                                                                                        }
                                                                                      }, [sizes.total_area, sizes.yard3]);  // Run when total_area or yard3 changes
                                                                                      
                                                                                      // Main useEffect to handle changes in length, breadth, yard1, and yard3
                                                                                      useEffect(() => {
                                                                                        // Recalculate the total area when any relevant value changes
                                                                                        calculateTotalArea();
                                                                                      }, [sizes.length, sizes.bredth, sizes.yard1, sizes.yard3]); // Include yard3 here to trigger recalculation
                                                                                      
                                                                                      

                                      

                                           
                                            const totalpercentage=()=>
                                              {
                                                const sarea=sizes.total_sealable_area;
                                                const carea=sizes.carpet_area;
                                                const reductionPercentage = ((sarea - carea) / sarea) * 100;
                                                const sizeName = `${sizes.type} ${sizes.unit_type} (${sizes.total_sealable_area} ${sizes.sq_feet1})`
                                              setsizes((prevsizes)=>({
                                                ...prevsizes,
                                                loading:reductionPercentage,
                                                size_name: sizeName, 
                                             }))
                                            }
                    


// ================================-----------------size add and delete end------------------------=========================================


// ==============================----------------------add unit start===========================================---------------------------
                                          const[unit,setunit]=useState([])
                                          const[units,setunits]=useState({project_name:project?.name || "",unit_no:"",unit_type:"",category:"",
                                                                          sub_category:[],block:"",
                                                                          size:"",land_type:"",khewat_no:[''],killa_no:[''],share:[''],action5:[],
                                                                          total_land_area:"",
                                                                          water_source:[''],water_level:[''],water_pump_type:[''],action6:[],
                                                                          direction:"",side_open:"",fornt_on_road:"",total_owner:"",facing:"",road:"",ownership:"",stage:"",builtup_type:"",floor:[''],
                                                                          cluter_details:[''],length:[''],bredth:[''],total_area:[''],measurment2:['sqfeet'],
                                                                          action3:[],ocupation_date:"",age_of_construction:"",furnishing_details:"",enter_furnishing_details:"",
                                                                          furnished_item:"",location:"",lattitude:"",langitude:"",uaddress:"",ustreet:"",
                                                                          ulocality:"",ucity:"",uzip:"",ustate:"",ucountry:"",owner_details:[],associated_contact:[],
                                                                          relation:"",s_no:[],preview:[],descriptions:[],category:[],action10:[],s_no1:[],url:[],action11:[],
                                                                          document_name:[''],document_no:[''],document_Date:[''],linkded_contact:[''],image:[''],action12:[]})
const unit_type = {
  Plot: ["Vacant", "25% Built Up", "40% Built Up", "Fenced", "Boundry Wall"],
  'Independent House': ["Single Storey", "Duplex", "Triplex", "Double Storey", "Bunglow", "Courtyard", "Villa", "2.5 Storey", "Triple Storey"],
  'Flat/Apartment': ["Studio", "Penthouse", "Duplex", "Triplex", "Simplex"],
  'Builder Floor': ["Studio","Duplex", "Penthouse", "Simplex"],

  Shop: ["Booth With Basement", "Booth With First Floor","Booth With Basement & First Floor","Triple Storey","Double Storey"],
  Showroom: ["Ground Floor Builtup", "Ground Floor Builtup With Basement", "Double Storey","Double Storey With Basement","Double Height","Triple Storey Builtup","Triple Storey Builtup With Basement"],
  'Office Space': ["Locable Office", "Virtual Office"],
  'Retail Store': ["Hyper Market", "Departmetal Store"],
  Soho: ["Soho"],
  'Excutive Room': ["Room"],

  Land: ["Cropland", "Woodland", "Pasture", "Commercial"],
  'Farm House': ["Farm"],
  Plots: ["1 Kanal", "10 Marla", "2 Kanal", "1 Acre", "2 Kanal"],
  'Ware House': ["Wrhse"],
  'Cold Storage': ["Cldstrg"],
  'Rice Seller': ["Rcslr"],
  Building: ["Bldg"],
  Factory: ["Fctry"],

  School: ["Nursery School", "Crech", "High School", "Primery School"],
  Hotel: ["Hotel", "Guest House", "Homestays"],
  Universities: ["Deemed", "Private"],
  Hospital: ["Nursing Home", "Clinic"],
  College: ["Art College", "Technical College", "Medical College"]
};



                                                                          useEffect(() => {
                                                                            if (project?.name) {
                                                                              setunits(prevState => ({
                                                                                ...prevState,
                                                                                project_name: project.name
                                                                              }));
                                                                            }
                                                                          }, [project]); // Only re-run this effect if project changes
                                                                          
                                                                          function addFnunit1() {
                                                                            setunits({
                                                                              ...units,
                                                                              s_no1: [...(units.s_no1 || []), ''],  // Ensure s_no1 is an array
                                                                              url: [...(units.url || []), ''],        // Ensure url is an array
                                                                              action11: [...(units.action11 || []), ''] // Ensure action1 is an array
                                                                            });
                                                                          }

                                                                          const deleteallunit1=(index)=>
                                                                            {
                                                                              // handleDeletesno(index)
                                                                              // handleDeletepreview(index)
                                                                              const newsno1 = units.s_no1.filter((_, i) => i !== index);
                                                                              const newurl = units.url.filter((_, i) => i !== index);
                                                                              const newaction1 = units.action11.filter((_, i) => i !== index);
                                                                              setunits({
                                                                                ...units,
                                                                                s_no1: newsno1,
                                                                                url: newurl,
                                                                                action11: newaction1
                                                                              });
                                                                            }


                                                                          const handlesno1change = (index, event) => {
                                                                            const newsno1 = [...units.s_no1];
                                                                            newsno1[index] = event.target.value;
                                                                            setunits({
                                                                              ...units,
                                                                              s_no1: newsno1
                                                                            });
                                                                          };
                                                                          const handleurlChange = (index, event) => {
                                                                            const newurl = [...units.url];
                                                                            newurl[index] = event.target.value;
                                                                            setunits({
                                                                              ...units,
                                                                              url: newurl
                                                                            });
                                                                          };


                                                                          function addFnunit() {
                                                                              
                                                                            setunits({
                                                                              ...units,
                                                                              s_no: [...(units.s_no || []), ''],           // Ensure s_no is an array
                                                                              preview: [...(units.preview || []), ''],       // Ensure preview is an array
                                                                              descriptions: [...(units.descriptions || []), ''], // Ensure descriptions is an array
                                                                              category: [...(units.category || []), ''],     // Ensure category is an array
                                                                              action10: [...(units.action10 || []), '']          // Ensure action is an array
                                                                            });
                                                                          }
                                                                          
                                                                          const deleteallunit=(index)=>
                                                                          {
                                                                            // handleDeletesno(index)
                                                                            // handleDeletepreview(index)
                                                                            const newsno = units.s_no.filter((_, i) => i !== index);
                                                                            const newpreview = units.preview.filter((_, i) => i !== index);
                                                                            const newdescription = units.descriptions.filter((_, i) => i !== index);
                                                                            const newcategory = units.category.filter((_, i) => i !== index);
                                                                            const newaction = units.action10.filter((_, i) => i !== index);
                                                                            setunits({
                                                                              ...units,
                                                                              s_no: newsno,
                                                                              preview: newpreview,
                                                                              descriptions: newdescription,
                                                                              category: newcategory,
                                                                              action10: newaction
                                                                            });
                                                                          }


                                                                          
                                                                          const handlesnochange = (index, event) => {
                                                                            const newsno = [...units.s_no];
                                                                            newsno[index] = event.target.value;
                                                                            setunits({
                                                                              ...units,
                                                                              s_no: newsno
                                                                            });
                                                                          };

                                                                          const handlepreviewchange = (index, event) => {
                                                                            
                                                                            const newpreview = [...units.preview];
                                                                            const files = Array.from(event.target.files);
                                                                          
                                                                            newpreview[index] = {files:files}
                                                                            setunits({
                                                                              ...units,
                                                                              preview: newpreview
                                                                            })
                                                                          };
                                                                          
                                                                          // const handlepreviewchange = (index, event) => {
                                                                            
                                                                          //   const newpreview = [...units.preview];
                                                                          //   const files = Array.from(event.target.files);
                                                                          //   const previewUrls = files.map(file => URL.createObjectURL(file));
                                                                          //   newpreview[index] = {
                                                                          //     files: files,
                                                                          //     previewUrls: previewUrls
                                                                          //   };
                                                                          //   setunits({
                                                                          //     ...units,
                                                                          //     preview: newpreview
                                                                          //   });
                                                                          // };
                                                                          
                                                                          
                                                                          const handledescriptionchange = (index, event) => {
                                                                            const newdescription = [...units.descriptions];
                                                                            newdescription[index] = event.target.value;
                                                                            setunits({
                                                                              ...units,
                                                                              descriptions: newdescription
                                                                            });
                                                                          };
                                                                          const handlecategorychange = (index, event) => {
                                                                            const newcategory = [...units.category];
                                                                            newcategory[index] = event.target.value;
                                                                            setunits({
                                                                              ...units,
                                                                              category: newcategory
                                                                            });
                                                                          };
                                                                          
                                                                          
                                                                          function addFn12() {
                  
     
                                                                            setunits({
                                                                              ...units,
                                                                              document_no:[...units.document_no,''],
                                                                              document_name: [...units.document_name, ''],
                                                                              document_Date: [...units.document_Date, ''],
                                                                              image: [...units.image, ''],
                                                                              linkded_contact: [...units.linkded_contact, ''],
                                                                              action12: [...units.action12, '']
                                                                            });
                                                                          }
                                                                        
                                                                          const deleteall12=(index)=>
                                                                            {
                                                                              const newdocument_no = units.document_no.filter((_, i) => i !== index);
                                                                              const newdocumentname = units.document_name.filter((_, i) => i !== index);
                                                                              const newdocumentdate = units.document_Date.filter((_, i) => i !== index);
                                                                              const newpic = units.image.filter((_, i) => i !== index);
                                                                              const newlinkedcontact = units.linkded_contact.filter((_, i) => i !== index);
                                                                              const newaction12=units.action12.filter((_,i) => i !== index);
                                                                              
                                                                              setunits({
                                                                                ...units,
                                                                                document_no:newdocument_no,
                                                                                document_name: newdocumentname,
                                                                                document_Date: newdocumentdate,
                                                                                image: newpic,
                                                                                linkded_contact: newlinkedcontact,
                                                                                action12:newaction12
                                                                              });
                                                                            }
                                                                            const handledocumentnochange = (index, event) => {
                                                                              const newdocumentno = [...units.document_no];
                                                                              newdocumentno[index] = event.target.value;
                                                                              setunits({
                                                                                ...units,
                                                                                document_no: newdocumentno
                                                                              });
                                                                            };
                                                                            const handledocumentnamechange = (index, event) => {
                                                                              const newdocumentname = [...units.document_name];
                                                                              newdocumentname[index] = event.target.value;
                                                                              setunits({
                                                                                ...units,
                                                                                document_name: newdocumentname
                                                                              });
                                                                            };
                                                                            const handledocumentdatechange = (index, event) => {
                                                                              const newdocumentdate = [...units.document_Date];
                                                                              newdocumentdate[index] = event.target.value;
                                                                              setunits({
                                                                                ...units,
                                                                                document_Date: newdocumentdate
                                                                              });
                                                                            };
                                                                            const handlelinkedcontactchange = (index, event) => {
                                                                              const newlinkedcontact = [...units.linkded_contact];
                                                                              newlinkedcontact[index] = event.target.value;
                                                                              setunits({
                                                                                ...units,
                                                                                linkded_contact: newlinkedcontact
                                                                              });
                                                                            };
                                                                            const handlepicchange1 = (index, event) => {
                                                                              const newpic1 = [...units.image];
                                                                              const files = Array.from(event.target.files);
                                                                              newpic1[index] = {files:files}
                                                                              setunits({
                                                                                ...units,
                                                                                image: newpic1
                                                                              });
                                                                            };
                                                                     
                                                                            const handleSubCategoryChange1 = (event) => {
                                                                              const {
                                                                                target: { value },
                                                                              } = event;
                                                                              // Ensure the value is an array if multiple options are selected
                                                                              setunits({ ...units, sub_category: typeof value === "string" ? value.split(",") : value });
                                                                          
                                                                            };
                                                              
                                                                            const handleToggle1 = (value) => {
                                                                              const currentIndex = units.sub_category.indexOf(value);
                                                                              const newChecked = [...units.sub_category];
                                                                          
                                                                              if (currentIndex === -1) {
                                                                                newChecked.push(value);
                                                                              } else {
                                                                                newChecked.splice(currentIndex, 1);
                                                                              }
                                                                          
                                                                              setunits({ ...units, sub_category: newChecked });
                                                                         
                                                                            };  
                                                                     


                                              const addunit = () => {

                                                  if (units.unit_no ) 
                                                    {
                                                      const updateunit= [...project.add_unit, units];
                                                      setunit(updateunit);
                                                      setproject(prevState => ({
                                                        ...prevState,
                                                        add_unit: updateunit
                                                      }));
                                                      
                                                      handleClose3()

                                                        document.getElementById("choosedestination").value="Select"
                                                      } 
                                                      else
                                                        {
                                                            toast.error("Please fill out all fields.");
                                                        }
                                                      };
                                          const deleteunit = (index) => {


                                            // Filter out the destination at the given index
                                            const newunit = project.add_unit.filter((_, i) => i !== index);
                                          
                                            // Set the updated destination details
                                            setproject(prevState => ({
                                              ...prevState,
                                              add_unit: newunit
                                            }));
                                            setunit(newunit)
                                          };

                                          const uniqueUnits = project.add_unit.filter((value, index, self) => 
                                            index === self.findIndex((t) => (
                                              t.unit_no === value.unit_no
                                            ))
                                          );


// ================================------------------------add unit end========================================----------------------------


                                 
                              
                                    
// -------------------------==========================destinations add and delete code start---------------------------------====================

                    const[destinationdetails,setdestinationdetails]=useState([])
                      const[destinations,setdestinations]=useState({destination:"",name_of_destination:"",distance:"",measurment:""})
                   
                      const adddestination = () => {
                       
                        if (destinations.destination && destinations.name_of_destination && destinations.distance && destinations.measurment) {
                          const updatedestination= [...destinationdetails, destinations];
                          setdestinationdetails(updatedestination);
                          setproject(prevState => ({
                            ...prevState,
                            nearby_aminities: updatedestination
                          }));
                          

                          // Clear the input fields after adding
                        
                          document.getElementById("nameofdestination").value=""
                          document.getElementById("destination").value=""
                          document.getElementById("measurment").value=""
                          document.getElementById("choosedestination").value="Select"
                        } else {
                          toast.error("Please fill out all fields.");
                        }
                      };
                      const deletedestination = (index) => {
                       
                      
                        // Filter out the destination at the given index
                        const newDestinationDetails = project.nearby_aminities.filter((_, i) => i !== index);
                      
                        // Set the updated destination details
                        setproject(prevState => ({
                          ...prevState,
                          nearby_aminities: newDestinationDetails
                        }));
                      };
// ========================-----------------------------destination add and delete end--------------------------------------------============

// ====================-----------------------------price add and delete--------------------------------------------===========================
                          const[price,setprice]=useState([])
                          const[prices,setprices]=useState({block:"",category:[],sub_category:"",size:"",
                                                          covered_area:"",base_rate:"",
                                                          chargename:"",chargetype:"",calculation_type:"",blank1:"",blank2:"",blank3:"",
                                                          name1:"",type1:"",calculation_type1:"",blank4:""})

                              const addprice = () => {

                                  if (prices.block ) 
                                    {
                                      const updateprice= [...price, prices];
                                      setprice(updateprice);
                                      setproject(prevState => ({
                                        ...prevState,
                                        price_list: updateprice
                                      }));
                                      handleClose4()

                                      
                                      } 
                                      else
                                        {
                                            toast.error("Please fill out all fields.");
                                        }
                                      };
                          const deleteprice = (index) => {


                            // Filter out the destination at the given index
                            const newprice = project.price_list.filter((_, i) => i !== index);

                            // Set the updated destination details
                            setproject(prevState => ({
                              ...prevState,
                              price_list: newprice
                            }));
                          };

                          const chargeCategories = {
                            "Preferred Location Charges": [
                              "Corner",
                              "Floor Rise",
                              "Park Facing",
                              "Green Facing",
                              "Highway Facing",
                              "Wide Road",
                              "Two Side Open",
                              "Three Side Open",
                              "East Facing",
                              "Roof Right",
                            ],
                            "Amenities Charges": [
                              "Club Membership",
                              "Power Backup",
                              "Gas Pipeline Connection",
                              "External Electrification Charges",
                              "Infrastructure Development Charges",
                              "Society Formation Charges",
                              "Fire Fighting Charges",
                              "Parking Charges",
                              "Interior Charges",
                              "Water & Sewerage Connection",
                              "Interest Free Maintenance Security",
                              "Maintenance Charges",
                            ],
                            "Govt. Charges": [
                              "External Development Charges",
                              "City Development Charges",
                              "Land Under Construction Charges",
                              "Extension Fees",
                              "Enhanced External Development Charges",
                            ],
                          };
                          const handlechargenamechange = (e) => {
                            const chargename=e.target.value
                            setprices({...prices,chargename:chargename});
                          };

// =======================------------------------price add and delete end====================-----------------------------------------
  

// ===================================-----payment plan add and delete start-----------------------==================================


                                const[payment,setpayment]=useState([])
                                const[payments,setpayments]=useState({payment_planname:"",step_name:[''],calculation_type:[''],
                                                                blank1:[''],blank2:[''],blank3:[''],action4:[],condition:""})

                                    const addpayment = () => {

                                        if (payments.payment_planname) 
                                          {
                                            const updatepayment= [...payment, payments];
                                            setpayment(updatepayment);
                                            setproject(prevState => ({
                                              ...prevState,
                                              Payment_plan: updatepayment
                                            }));
                                            handleClose5()

                                            
                                            } 
                                            else
                                              {
                                                  toast.error("Please fill out all fields.");
                                              }
                                            };
                                const deletepayment = (index) => {


                                  // Filter out the destination at the given index
                                  const newpayment = project.Payment_plan.filter((_, i) => i !== index);

                                  // Set the updated destination details
                                  setproject(prevState => ({
                                    ...prevState,
                                    Payment_plan: newpayment
                                  }));
                                };

// -------------------------========================payment plan add and delete end--------------------------===========================

                 
// =============================code for descriptions formate start================================================================

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
                    ];

// ====================================formate descriptions end====================================================================


                const[ischecked,setischecked]=useState(false)
                const handleischeckedchange = (e) => {
                  setischecked(e.target.checked); // Update the state based on checkbox status
                };


// ======================code for set category and sub category======================================================================



                const handleTypeClick = (type) => {
                  setproject(prevProject => {
                    const { category } = prevProject;
                    
                    // If the category is 'Agricultural'
                    if (type === "Agricultural") {
                        if (category.includes("Agricultural")) {
                            // If already selected, remove it
                            return { ...prevProject, category: category.filter(item => item !== "Agricultural") };
                        } else {
                            // If not selected, add it and remove all other categories
                            return { ...prevProject, category: ["Agricultural"] };  // Only keep "Agricultural"
                        }
                    } else {
                        // For any other category
                        if (category.includes("Agricultural")) {
                            // If "Agricultural" is selected, don't allow selecting others
                            toast.error("if you select Agricultural then you can't select more category")
                            return prevProject;  // Return as is, do nothing
                        } else {
                            // If "Agricultural" is not selected, allow adding/removing this category
                            if (category.includes(type)) {
                                // Remove the category if already selected
                                return { ...prevProject, category: category.filter(item => item !== type) };
                            } else {
                                // Add the category if not already selected
                                return { ...prevProject, category: [...category, type] };
                            }
                        }
                    }
                });
          };

         
          const [selectedType, setSelectedType] = useState(null);

          const handleTypeClick1 = (type) => {
            setSelectedType(type);
        setunits((prevunits)=>({
          ...prevunits,
          category:type
        }))
    };

    const [selectedType1, setSelectedType1] = useState(null);

    const handleTypeClick2 = (type) => {
      setSelectedType1(type);
  setsizes((prevsizes)=>({
    ...prevsizes,
    category:type
  }))
};


const selectedType2 = (type) => block.category.includes(type);

const handleTypeClick3 = (type) => {  
  
  setblock((prevblock) => {
    // Check if the type is already in the category array
    if (prevblock.category.includes(type)) {
      // Remove the type if already selected
      return { ...prevblock, category: prevblock.category.filter(item => item !== type) };
    } else {
      // Add the type if not already selected
      return { ...prevblock, category: [...prevblock.category, type] };
    }
  });
};




             


                const isSelected = (type) => project.category.includes(type);
                const getSubcategories = () => {
                  const subcategories = [];
                  if (isSelected('Residential')) {
                      subcategories.push('Plot', 'Independent House','Flat/Apartment','Builder Floor');
                  }
                  if (isSelected('Commercial')) {
                    subcategories.push('Shop','Showroom','Office Space','Retail Store','Soho','Excutive Room','Multiplex','Virtual Space','Plot');
                  }
                  if (isSelected('Agricultural')) {
                      subcategories.push('Land','Farm House');
                      document.getElementById("withoutagriculture").style.display="none";
                      document.getElementById("totalfloors").style.display="none";
                      document.getElementById("zonelist").style.display="block";
                  }
                  if (isSelected('Industrial')) {
                    subcategories.push('Plot','Ware House','Cold Storage','Rice Seller','Building','Factory');
                  }
                if (isSelected('Institutional')) {
                  subcategories.push('School','Hotel','Universities','Hospital','College');
                }
                  return subcategories;
              };

              const handleSubCategoryChange = (event) => {
                const {
                  target: { value },
                } = event;
                // Ensure the value is an array if multiple options are selected
                setproject({ ...project, sub_category: typeof value === "string" ? value.split(",") : value });
            
              };

              const handleToggle = (value) => {
                const currentIndex = project.sub_category.indexOf(value);
                const newChecked = [...project.sub_category];
            
                if (currentIndex === -1) {
                  newChecked.push(value);
                } else {
                  newChecked.splice(currentIndex, 1);
                }
            
                setproject({ ...project, sub_category: newChecked });
           
              };
            
              
                
                const baseprice=()=>
                {
                  document.getElementById("baseprice").style.display="flex"
                  document.getElementById("baseprice1").style.color="green"
                  document.getElementById("charges").style.display="none"
                  document.getElementById("charges1").style.color="black"
                  document.getElementById("taxes").style.display="none"
                  document.getElementById("taxes1").style.color="black"
                }
                const charges=()=>
                  {
                    document.getElementById("baseprice").style.display="none"
                    document.getElementById("baseprice1").style.color="black"
                    document.getElementById("charges").style.display="flex"
                    document.getElementById("charges1").style.color="green"
                    document.getElementById("taxes").style.display="none"
                    document.getElementById("taxes1").style.color="black"
                  }
                  const taxes=()=>
                    {
                      document.getElementById("baseprice").style.display="none"
                      document.getElementById("baseprice1").style.color="black"
                      document.getElementById("charges").style.display="none"
                      document.getElementById("charges1").style.color="black"
                      document.getElementById("taxes").style.display="flex"
                      document.getElementById("taxes1").style.color="green"
                    }

                    const ownersList = [
                      'Suraj',
                      'Suresh Kumar',
                      'Ramesh Singh',
                      'Maanav Sharma',
                      'Sukram'
                  ];
                    const [owners, setOwners] = useState([]);

                    const handleOwnerChange = (event) => {
                      const {
                          target: { value },
                      } = event;
              
                      const selectedOwners = typeof value === 'string' ? value.split(',') : value;
              
                      setOwners(selectedOwners);
                      setproject({ ...project, owner: selectedOwners });
                  };

                  const teamlist = [
                    'Sales',
                    'Marketing',
                    'Post Sales',
                    'Pre Sales'
                ];
                  const [teams, setteams] = useState([]);

                  const handleteamchange = (event) => {
                    const {
                        target: { value },
                    } = event;
            
                    const selectedteam = typeof value === 'string' ? value.split(',') : value;
            
                    setteams(selectedteam);
                    setproject({ ...project, team: selectedteam });
                };
                const bankOptions = [ 'State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Punjab National Bank',
                  'Bank of Baroda','Union Bank of India','Kotak Mahindra Bank'];
              const [selectedBanks, setSelectedBanks] = useState([]);

              const handleChange = (event) => {
                const value = event.target.value;
              
                // Update selectedBanks with the new selection
                setSelectedBanks(value);
              
                // Update the approved_bank state (just store the names of selected banks)
                setproject((prevState) => ({
                  ...prevState,
                  approved_bank: value, // Only store the bank names
                }));
              };
        
              
              const zoneslist = [
                'Residential Zone',
                'Industrial Zone',
                'Institutional Zone',
                'MC Limit',
                'Agriculture Zone (Outside Controlled Area)',
                'Agriculture Zone (With in Controlled Area)',
                'No Construction Zone',
                'Transport & Communication Zone',
                'Mix Land Use Zone'
            ];
             
              const [zone, setzone] = useState([]);

              const handlezonechange = (event) => {
                const {
                    target: { value },
                } = event;
        
                const selectedzone = typeof value === 'string' ? value.split(',') : value;
        
                setzone(selectedzone);
                setproject({ ...project, zone: selectedzone });
                setblock({...block,zone:selectedzone})
                
            };
          

            useEffect(() => {
              // Check if project.add_size is valid and is an array
              if (project.add_size && Array.isArray(project.add_size)) {
                let totalAcre = 0;  // Store total area in acres
                let totalKanal = 0; // Store total area in kanal
                let totalMarla = 0; // Store total area in marla
            
                project.add_size.forEach((item) => {
                  console.log("Item:", item);
            
                  // Ensure that item.total_area and units.share are valid
                  if (item.total_area && Array.isArray(units.share) && units.share.length > 0) {
                    
                    // Helper function to convert a fraction string like '3/4' to a numeric value
                    const convertFractionToNumber = (fraction) => {
                      const [numerator, denominator] = fraction.split('/').map(Number);
                      return denominator !== 0 ? numerator / denominator : 0;  // Avoid division by zero
                    };
            
                    // Iterate over each value in units.share array (fractions like '3/4', '2/4', etc.)
                    units.share.forEach((fraction) => {
                      const shareValue = convertFractionToNumber(fraction);  // Convert fraction to numeric value
                      console.log(`Share value for fraction ${fraction}:`, shareValue);
            
                      // Calculate the effective area using the share value (as a number)
                      const effectiveArea = item.total_area * shareValue;
                      console.log(`Effective Area with share ${fraction}:`, effectiveArea);
                      
                      // Check for valid effectiveArea
                      if (isNaN(effectiveArea) || effectiveArea <= 0) {
                        console.warn("Invalid effectiveArea:", effectiveArea);
                        return; // Skip calculations if effectiveArea is invalid
                      }
            
                      // Calculate Acre, Kanal, and Marla directly (no conversion to square feet)
                      const acre = effectiveArea / 4840; // 1 Acre = 4840 square feet
                      const kanal = (effectiveArea % 4840) / 605;// 1 Kanal = 605 square feet
                      const marla = Math.floor((effectiveArea % 605) / 30.25);// 1 Kanal = 20 Marlas
            
                      // Accumulate the total Acre, Kanal, and Marla values
                      totalAcre += acre;
                      totalKanal += kanal;
                      totalMarla += marla;
                    });
                  } else {
                    console.warn("Invalid total_area or units.share in item", item);
                  }
                });
            
                // Normalize the total Kanal and Marla values
                const normalizedKanal = Math.floor(totalKanal); 
                const normalizedMarla = Math.floor(totalMarla);
            
                // Adjust the total Acre, Kanal, and Marla based on accumulated values
                const finalAcre = Math.floor(totalAcre);
                const finalKanal = Math.floor(normalizedKanal);  // Convert leftover Kanal to Marla
                const finalMarla = Math.floor(normalizedMarla); // Convert leftover Marla to proper format
            
                // Update the total_land_area state with the final result
                setunits({
                  ...units,
                  total_land_area: `${finalAcre} acre ${finalKanal} kanal ${finalMarla} marla`
                });
            
              } else {
                console.warn("Invalid project.add_size data");
              }
            }, [units.share]);  // Runs when units.share changes
            
         
            
            
            
            const parking=["Basement Parking","Stilt Parking","Open Parking","Double Basement Parking","Covered Parking","Multi Storey Parking"];
       
const [parkings, setparkings] = useState([]);

const handleparkingChange = (event) => {
  const {
    target: { value },
  } = event;

  // If "Select All" is clicked
  if (value.includes('select-all')) {
    // If all options are already selected, deselect them (uncheck all)
    if (parkings.length === parking.length) {
      setparkings([]); // Deselect all options
      setproject({ ...project, parking_type: [] }); 
      setblock({ ...block, parking_type: [] }); 
    } else {
      // Otherwise, select all options
      setparkings(parking); // Select all options
      setproject({ ...project, parking_type: parking });
      setblock({ ...block, parking_type: parking }); // Update facing in leadinfo
    }
  } else {
    // Handle individual selections/deselections
    const selectedparking = typeof value === 'string' ? value.split(',') : value;
    setparkings(selectedparking); // Update selected facings
    setproject({ ...project, parking_type: selectedparking });
    setblock({ ...block, parking_type: selectedparking }); // Update facing in leadinfo
  }
};


const [input, setInput] = useState('');
const [filteredSuggestions, setFilteredSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
const [allSuggestions, setAllSuggestions] = useState([]);
const [selectedContacts, setSelectedContacts] = useState([]);

useEffect(() => {
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

useEffect(() => {
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



const handleInputChange = (event) => {
  setInput(event.target.value);
  handleClose6()
};


// ==========================add owner tab start=================================================================================

const [show6, setshow6] = useState(false);
const handleClose6 = () => setshow6(false);
const handleShow6=async()=>
{
  setshow6(true);

}

const [selectedcontact1,setselectedcontact1]=useState([])
const [selectedcontact2,setselectedcontact2]=useState([])
const[newcontact,setnewcontact]=useState([])

const[relation,setrelation]=useState("")

const handlerelationchange = (e) => {
  setrelation(e.target.value);
};

// const [relation1,setrelation1]=useState("")
useEffect(() => {
  
  
  if (relation === "Self") {
    setrelation("")
    setselectedcontact1(prevContacts => [
      ...prevContacts,
      newcontact // Add the new contact (assumed to be an object)
    ]);
    setunits(prevDeal => ({
      ...prevDeal,
      owner_details: [...prevDeal.owner_details, newcontact._id] // Append new contact to the existing owner_details array
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
      associated_contact: [...prevDeal.associated_contact, newcontact._id] // Append new contact to the existing owner_details array
    }));
    // setrelation1(relation)
    setrelation("")
  }
}, [relation,newcontact]);
// console.log(units.associated_contact);


const handleSuggestionClick = (contact) => {
  handleShow6();
  
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
  const updatedContacts1 = selectedcontact1.filter(contact => contact._id !== id);
  const updatedContacts2 = selectedcontact2.filter(contact => contact._id !== id);
  setSelectedContacts(updatedContacts);
  setselectedcontact1(updatedContacts1)
  setselectedcontact2(updatedContacts2)
  
  // Update deal.owner_details with the current selected contacts
  setunits(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));

};




useEffect(()=>
{
  const fullunit=`${units.total_land_area} ${units.category} ${units.land_type}`
  setunits({...units,unit_no:fullunit})
},[units.total_land_area])

// ========================================add onwer end==============================================================================

const options = {
 unit_type: {
    Plot: ["1 Kanal","12 Marla", "3 Kanal","4 Kanal","5 Kanal","6 Kanal","7 Kanal","1 Acre","2 Acre","3 Acre","4 Acre","5 Acre","6 Acre","7 Acre","8 Acre","9 Acre","10 Acre","5 Marla", "2 Kanal","16 Marla","14 Marla","12 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
    "Independent House": ["1 Kanal", "2 Kanal","12 Marla", "3 Kanal","4 Kanal","5 Kanal","6 Kanal","7 Kanal","1 Acre","2 Acre","3 Acre","4 Acre","5 Acre","6 Acre","7 Acre","8 Acre","9 Acre","10 Acre","5 Marla","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
    "Flat/Apartment": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK",,"STUDIO"],
    "Builder Floor": ["1 BHK", "12 Marla", "3 Kanal","4 Kanal","5 Kanal","6 Kanal","7 Kanal","1 Acre","2 Acre","3 Acre","4 Acre","5 Acre","6 Acre","7 Acre","8 Acre","9 Acre","10 Acre","5 Marla","2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
    Shop:["BOOTH","KIOSAK",],
    Showroom:["SCO","SCF","DSS"],
    "Office Space":["LOCABLE OFFICE","VIRTUAL OFFICE"],
    "Retail Store":["HYPER MARKET","DEPARTMETAL STORE"],
    Soho:["SOHO"],
    "Excutive Room":["ROOM"],
    Land:["CROPLAND","WOODLAND","PASTURE","COMMERCIAL"],
    "Farm House":["FARM"],
    Plots:["1 KANAL","10 MARLA","2 KANAL","1 ACRE","2 KANAL"],
    "Ware house":["WRHSE"],
    "Cold Storage":["CLDSTRG"],
    "Rice Seller":["RCSLR"],
    "Building":["BLDG"],
    Factory:["FCTRY"],
    School:["NURSERY SCHOOL","CRECH","HIGH SCHOOL","PRIMERY SCHOOL"],
    Hotel:["HOTEL","GUEST HOUSE","HOMESTAYS"],
    Universities:["DEEMED","PRIVATE"],
    Hospital:["NURSING HOME","CLINIC"],
    College:["ART COLLEGE","TECHNICAL COLLEGE","MEDICAL COLLEGE"]
  },
}

const [availableunit, setavailableunit] = useState([]);

const handlesizesubcategorychange = (event) => {
  const selectedSubcategory = event.target.value;

  setsizes((precsize) => ({
    ...precsize,
    sub_category: selectedSubcategory,
    unit_type: "", // Reset designation when subcategory changes
  }));

  // Update available designations based on selected profession subcategory
  setavailableunit(options.unit_type[selectedSubcategory] || []);
};



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


// useEffect(() => {
//   // Check if units.linkded_contact is an array and has at least one element
//   if (Array.isArray(units.linkded_contact) && units.linkded_contact.length > 0) {
//     // Convert the array of contacts to lowercase and check if any match
//     const results = allSuggestions.filter(contact =>
//       units.linkded_contact.some(linkedContact =>
//         linkedContact?.toLowerCase().includes(contact.first_name?.toLowerCase())
//       )
//     );
//     setFilteredSuggestions(results);
//     setShowSuggestions(true);
//   } else {
//     setShowSuggestions(false);
//   }
// }, [units.linkded_contact, allSuggestions]);

useEffect(() => {
  // console.log('Checking units.linkded_contact:', units.linkded_contact);
  // console.log('Checking allSuggestions:', allSuggestions);

  // Ensure that units.linkded_contact is an array before proceeding
  if (Array.isArray(units.linkded_contact)) {
    // Filter out empty strings from units.linkded_contact and only filter when there's some text
    const validContacts = units.linkded_contact.filter(contact => contact.trim() !== '');

    if (validContacts.length > 0) {
      // Partial matching logic: check if the input text is a substring of any first_name in allSuggestions
      const results = allSuggestions.filter(contact =>
        validContacts.some(linkedContact =>
          typeof linkedContact === 'string' &&
          linkedContact.trim().toLowerCase() // Matching against lowercase version of the input text
            .split(" ").some(word => contact.first_name?.toLowerCase().includes(word)) // Matching against each word
        )
      );

      console.log('Filtered Results:', results);  // Log filtered results

      setFilteredSuggestions(results);
      setShowSuggestions(results.length > 0);  // Show suggestions only if results exist
    } else {
      setShowSuggestions(false);
    }
  } else {
    // If units.linkded_contact is not an array, reset or handle it as needed
    console.warn('Expected an array for units.linkded_contact, but received:', units.linkded_contact);
    setShowSuggestions(false); // Hide suggestions if data is malformed
  }
}, [units.linkded_contact, allSuggestions]);



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

//     // Ensure the data has at least one row
//     if (data.length > 0) {
//       const updatedUnits = data.map((row) => {
//         // Create a new unit object by copying the base unit template
//         const newUnit = { ...units };

//         // Iterate through each key in the row (Excel columns)
//         Object.keys(row).forEach((key) => {
//           // Check if the key exists in the unit's state and update
//           if (newUnit.hasOwnProperty(key)) {
//             if (Array.isArray(newUnit[key])) {
//               // If the field is an array (like khewat_no, water_source), push the value
//               newUnit[key] = [...newUnit[key], row[key]];
//             } else {
//               // Otherwise, just assign the value directly
//               newUnit[key] = row[key];
//             }
//           }
//         });

//         return newUnit;
//       });

//       // Update the unit state and project state
//       setunit((prevUnit) => [...prevUnit, ...updatedUnits]); // Append new units to the list
//       setproject((prevState) => ({
//         ...prevState,
//         add_unit: [...prevState.add_unit, ...updatedUnits] // Add the new units to the project state
//       }));

//       // Close any modal or reset other states
//       handleClose7();
//       document.getElementById('choosedestination').value = 'Select';
//     } else {
//       toast.error('No data found in the Excel file.');
//     }
//   };

//   reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
// };

// ===========================================add to unit start=================================================================


const databasefieldsunit = [
    'project_name', 'unit_no', 'unit_type','category','sub_category','block','size','land_type',
    'khewat_no','killa_no','share','total_land_area','water_source','water_level','water_pump_type','direction',
    'side_open','fornt_on_road','total_owner','facing','road','ownership','stage','type','floor','cluter_details',
    'length','bredth','total_area','measurment2','ocupation_date','age_of_construction','furnishing_details',
    'enter_furnishing_details','furnished_item','location','lattitude','langitude','uaddress','ustreet','ulocality',
    'ucity','uzip','ustate','ucountry','owner_details','associated_contact','relation','s_no','preview','descriptions',
    'category','s_no1','url','document_name','document_no','document_Date','linkded_contact','pic'];

  
const [excelHeaders, setExcelHeaders] = useState([]); // Store Excel headers
const [mappedFields, setMappedFields] = useState({}); // Store user-selected mapping
const [selectedFile, setSelectedFile] = useState(null); // Store uploaded file

const [duplicateEntries, setDuplicateEntries] = useState([]);
const [pendingContacts, setPendingContacts] = useState([]);

// 🔹 Step 1: Extract Headers from Excel File
const handleFileChange = (event) => {
  const file = event.target.files[0];
 
  
  if (!file) return;

  setIsLoading(true); // Start loading
  setSelectedFile(file); // Store file for later use

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet,{ header: 1 });


      if (data.length > 0) {
        const headers = data[0].map((cell, index) => cell || `Column${index + 1}`);
        setExcelHeaders(headers); // Set headers manually
      } else {
        toast.error("No data found in the Excel file.");
      }
    } catch (error) {
      toast.error("Error processing the Excel file.");
    } finally {
      setIsLoading(false); // Stop loading
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
      const updatedUnits = data.map((row) => {
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

      // setunit((prevUnit) => [...prevUnit, ...updatedUnits]); // Append new units to the list
      // setproject((prevState) => ({
      //   ...prevState,
      //   add_unit: [...prevState.add_unit, ...updatedUnits] // Add the new units to the project state
      // }));
      // setcontact(updatecontact); // Update state with processed data
      checkForDuplicates(updatedUnits); // Call duplicate check after mapping
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

const [allcontacts, setallcontacts] = useState([]);

const normalizeMobile = (mobile) => {
  return mobile?.toString().replace(/\D/g, "").trim(); // Remove non-digits & trim spaces
};


const checkForDuplicates = async (contacts) => {
  try {
    setIsLoading(true);

    // Fetch existing units
    const response = await api.get("viewproject");
    const allunits = response.data.project.flatMap(project => project.add_unit);

    

    // Fetch all contacts
    const contactResponse = await api.get("viewcontact");
    console.log(contactResponse);
    
    const contactList = contactResponse.data.allcontact; // Existing contacts

    // Create a mapping of mobile_no to ObjectId
    const mobileToIdMap = new Map();
    contactList.forEach(contact => {
      if (Array.isArray(contact.mobile_no)) {
        contact.mobile_no?.forEach(mobile => {
          const normalizedMobile = normalizeMobile(mobile);
          if (normalizedMobile) {
            mobileToIdMap.set(normalizedMobile, contact._id);
          }
        });
      }
    });

    let newContacts = [];
    let duplicates = [];
    let newContactList = []; // Stores new contacts to be created

    contacts.forEach((contact) => {
      let updatedOwnerDetails = [];
      let updatedAssociatedContact = [];

      // Check and update `owner_details`
      if (Array.isArray(contact.owner_details)) {
        updatedOwnerDetails = contact.owner_details.map(mobile => {
          const normalizedMobile = normalizeMobile(mobile);
          return mobileToIdMap.get(normalizedMobile) || null; // Replace with ObjectId if found
        }).filter(Boolean);
      } else if (contact.owner_details) {
        const normalizedMobile = normalizeMobile(contact.owner_details);
        const existingId = mobileToIdMap.get(normalizedMobile);
        if (existingId) {
          updatedOwnerDetails = [existingId];
        } else {
          // If contact not found, add it to newContactList
          newContactList.push({
            title:contact.owner_title,
            first_name: contact.owner_first_name || "",
            last_name:contact.owner_last_name || "",
            country_code:contact.owner_country_code || [],
             mobile_no: contact.owner_mobile_no || [],
             mobile_type: contact.owner_mobile_type || [],
             email:contact.owner_email || [],
             email_type:contact.owner_email_type || [],
             father_husband_name:contact.owner_father_name,
             h_no:contact.owner_hno,
             area1:contact.owner_area,
             location1:contact.owner_location,
             city1:contact.owner_city,
             pincode1:contact.owner_pincode,
             state1:contact.owner_state,
             country1:contact.owner_country,
          });
        }
      }

      // Check and update `associated_contact`
      if (Array.isArray(contact.associated_contact)) {
        updatedAssociatedContact = contact.associated_contact.map(mobile => {
          const normalizedMobile = normalizeMobile(mobile);
          return mobileToIdMap.get(normalizedMobile) || null;
        }).filter(Boolean);
      } else if (contact.associated_contact) {
        const normalizedMobile = normalizeMobile(contact.associated_contact);
        const existingId = mobileToIdMap.get(normalizedMobile);
        if (existingId) {
          updatedAssociatedContact = [existingId];
        } else {
          newContactList.push({
            title:contact.associated_title,
            first_name: contact.associated_first_name || "",
            last_name:contact.associated_last_name || "",
             mobile_no: contact.associated_mobile_no || [],
             mobile_type: contact.associated_mobile_type || [],
             country_code:contact.associated_country_code || [],
             email:contact.associated_email || [],
             email_type: contact.associated_email_type || [],
             father_husband_name:contact.associated_father_name,
             h_no:contact.associated_hno,
             area1:contact.associated_area,
             location1:contact.associated_location,
             city1:contact.associated_city,
             pincode1:contact.associated_pincode,
             state1:contact.associated_state,
             country1:contact.associated_country,

          });
        }
      }

      // Create updated unit object **inside the loop**
      const unitDetails = {
        ...contact,
        owner_details: updatedOwnerDetails,
        associated_contact: updatedAssociatedContact
      };

      // Check if unit is duplicate
      const isDuplicate = allunits.some(unit =>
        unit.project_name == unitDetails.project_name &&
        unit.unit_no == unitDetails.unit_no &&
        unit.block == unitDetails.block
      );

      if (isDuplicate) {
        duplicates.push(unitDetails);
      } else {
        newContacts.push(unitDetails);
      }
    });

    
    
    // If there are new contacts, stop and prompt the user to re-upload
    if (newContactList.length > 0) {
      const contactListHtml = newContactList.map(contact => 
          `<li>${contact.title} ${contact.first_name} ${contact.last_name}</li>`
      ).join("");
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
      html: `
        <p>Do you want to add <strong>${newContactList.length}</strong> new contacts?</p>
        <details style="text-align: left; margin-top: 10px;">
            <summary style="cursor: pointer; font-weight: bold;">View contact list</summary>
            <ul style="margin-top: 10px;">
                ${contactListHtml}
            </ul>
        </details>
    `,
        showCancelButton: true,
        confirmButtonText: "Yes, add them!",
        cancelButtonText: "No, cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true); // Show loading state
    
          try {
            await api.post("addbulkcontact", newContactList);
    
            Swal.fire({
              title: "Success",
              icon: "success",
              text: `${newContactList.length} new contacts added. Please refresh the page and re-upload the Excel sheet.`,
            }).then(() => {
              window.location.reload(); // Reload after user clicks "OK"
            });
          } catch (error) {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "Something went wrong while adding contacts. plz check your excel file avoid coma(,) if fields are non array and if values are empthy then blabk it ",
            });
          }
    
          setIsLoading(false); // Hide loading state
        }
      });
    
      return; // Stop further execution
    }
    

    // Update state only if no new contacts were found
    setDuplicateEntries(duplicates);
    setPendingContacts(newContacts);
    setallcontacts([...newContacts, ...duplicates]);

  } catch (error) {
    console.error("❌ Error checking for duplicates:", error);
  } finally {
    setIsLoading(false);
  }
};


const addunits = () => {
  // Step 1: Identify duplicates within pendingContacts
  const seen = new Set();
  const uniqueUnits = [];
  const allUnitsWithColor = [];

  pendingContacts.forEach((unit) => {
    const unitIdentifier = `${unit.project_name}-${unit.unit_no}-${unit.block}`; // Unique identifier for each unit
    
    if (seen.has(unitIdentifier)) {
      // If the unit is a duplicate, mark it as duplicate and set color
      unit.isDuplicate = true;
      allUnitsWithColor.push(unit); // Add duplicate unit
    } else {
      // Otherwise, add to the unique units list and mark as non-duplicate
      seen.add(unitIdentifier);
      unit.isDuplicate = false;
      allUnitsWithColor.push(unit); // Add unique unit
    }
  });

  // Step 2: Update state with all units (including duplicates)
  setunit((prevUnit) => [...prevUnit, ...allUnitsWithColor]); // Append all units (unique + duplicate) to the unit list
  setproject((prevState) => ({
    ...prevState,
    add_unit: [...prevState.add_unit, ...allUnitsWithColor], // Add all units to the project state
  }));


};

const updateunits=async()=>
          {
            try {

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
        
                setIsLoading(true);

                    const total = duplicateEntries.length;
                      let successCount = 0;
                      let failCount = 0;
                      const batchSize = 50;


                          for (let i = 0; i < total; i += batchSize) {
                            const batch = duplicateEntries.slice(i, i + batchSize);
                      
                            try {
                              const [resp1] = await Promise.all([
                                api.put('updateprojectforinventoriesbulk', batch, config),
                              ]);
                      
                              if (resp1.status === 200) {
                                successCount += batch.length;
                                toast.success(`Updated ${successCount}/${total} units`, { autoClose: 2000 });
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
                                  title: 'Updated Complete',
                                  html: `All <b>${successCount}</b> units updated successfully.`,
                                });
                              } else {
                                Swal.fire({
                                  icon: 'warning',
                                  title: 'Partial Updated Complete',
                                  html: `<b>${successCount}</b> uunits updated successfully.<br><b>${failCount}</b> failed.`,
                                });
                              }

                           } 
            catch (error) {
              Swal.fire({
                title: "not found?",
                text: "The project is not found plz check !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "ok",
              });
              console.log(error);
              
            }finally
            {
              setIsLoading(false)
            }
          }

const headerSuggestions = {
  owner_details: "Suggestion: Enter owner mobile no",
  associated_contact: "Suggestion: Enter associated mobile no",
  unit_no: "Suggestion: Enter unit no",
  block: "Suggestion: Enter Block",
  project_name: "Suggestion: Project Name",
  unit_type:"Suggestion: Select unit type",
  size:"Suggestion: Size of unit"
  // Add more as needed
};

// ========================================add unit in project end===================================================================

// ===========================================add to size start=================================================================

const [show10, setshow10] = useState(false);
const handleClose10 = () => setshow10(false);
const handleShow10=async()=>
{
  setshow10(true);

}

const databasefieldsize = [
    'size_name', 'block1', 'category','sub_category','unit_type','total_sealable_area','sq_feet1',
    'covered_area','sq_feet2','carpet_area','sq_feet3','loading','percentage','length','yard1',
    'bredth','yard2','total_area','yard3'];
  
const [excelHeaderssize, setExcelHeaderssize] = useState([]); // Store Excel headers
const [mappedFieldssize, setMappedFieldssize] = useState({}); // Store user-selected mapping
const [selectedFilesize, setSelectedFilesize] = useState(null); // Store uploaded file

const [duplicateEntriessize, setDuplicateEntriessize] = useState([]);
const [pendingContactssize, setPendingContactssize] = useState([]);

// 🔹 Step 1: Extract Headers from Excel File
const handleFileChangesize1 = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setIsLoading(true); // Start loading
  setSelectedFilesize
  (file); // Store file for later use

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet,{ header: 1 });

      if (data.length > 0) {
        const headers = data[0].map((cell, index) => cell || `Column${index + 1}`);
        setExcelHeaderssize(headers); // Set headers manually
      } else {
        toast.error("No data found in the Excel file.");
      }
    } catch (error) {
      toast.error("Error processing the Excel file.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  reader.readAsArrayBuffer(file);
};





// 🔹 Step 2: Process & Map Data Based on User Selection
const handleProcessFilesize = () => {
  try {
    
  setIsLoading(true);
  if (!selectedFilesize) {
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
      const updatedsize = data.map((row) => {
        let newcontact = {};

        Object.keys(row).forEach((key) => {
          let mappedKey = mappedFieldssize[key] || key; // Use mapped key or original key
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

 
      checkForDuplicatessize(updatedsize); // Call duplicate check after mapping
    } else {
      toast.error("No data found in the Excel file.");
    }
  };

  reader.readAsArrayBuffer(selectedFilesize);
} catch (error) {
    console.log(error);
    
}finally {
  setIsLoading(false); // Hide loader after API call
}
};


const [allcontactssize, setallcontactssize] = useState([]);
const checkForDuplicatessize = async (contacts) => {
  try {
    setIsLoading(true);

    // Fetch existing units
    const response = await api.get("viewproject");
    const allsize = response.data.project.flatMap(project => project.add_size);

    let newContacts = [];
    let duplicates = [];

    contacts.forEach((contact) => {
   
   // Check if unit is duplicate (case-insensitive and trimmed)
        const isDuplicate = allsize.some(unit =>
          unit.category.trim().toLowerCase() === contact.category.trim().toLowerCase() &&
          unit.size_name.trim().toLowerCase() === contact.size_name.trim().toLowerCase()
        );


      if (isDuplicate) {
        duplicates.push(contact);
      } else {
        newContacts.push(contact);
      }
    });

    
    setDuplicateEntriessize(duplicates);
    setPendingContactssize(newContacts);
    setallcontactssize([...newContacts, ...duplicates]);

  } catch (error) {
    console.error("❌ Error checking for duplicates:", error);
  } finally {
    setIsLoading(false);
  }
};


const addbulksize = () => {
  // Step 1: Identify duplicates within pendingContacts
  const seen = new Set();
  const uniqueUnits = [];
  const allUnitsWithColor = [];

  pendingContactssize.forEach((unit) => {
    const unitIdentifier = `${unit.size_name}-${unit.category}`; // Unique identifier for each unit
    
    if (seen.has(unitIdentifier)) {
      // If the unit is a duplicate, mark it as duplicate and set color
      unit.isDuplicate = true;
      allUnitsWithColor.push(unit); // Add duplicate unit
    } else {
      // Otherwise, add to the unique units list and mark as non-duplicate
      seen.add(unitIdentifier);
      unit.isDuplicate = false;
      allUnitsWithColor.push(unit); // Add unique unit
    }
  });


  // Step 2: Update state with all units (including duplicates)
  setsize((prevUnit) => [...prevUnit, ...allUnitsWithColor]); // Append all units (unique + duplicate) to the unit list
  setproject((prevState) => ({
    ...prevState,
    add_size: [...prevState.add_size, ...allUnitsWithColor], // Add all units to the project state
  }));


};

const headerSuggestionssize = {
  owner_details: "Suggestion: Enter owner mobile no",
  associated_contact: "Suggestion: Enter associated mobile no",
  unit_no: "Suggestion: Enter unit no",
  block: "Suggestion: Enter Block",
  project_name: "Suggestion: Project Name",
  unit_type:"Suggestion: Select unit type",
  size:"Suggestion: Size of unit"
  // Add more as needed
};

// ========================================add size in project end===================================================================

// ===========================================add to size start=================================================================

const [show11, setshow11] = useState(false);
const handleClose11 = () => setshow11(false);
const handleShow11=async()=>
{
  setshow11(true);

}

const databasefieldblock = [
    'block_name', 'category', 'sub_category','land_area','measurment','total_blocks','total_floors',
    'total_units','status','launched_on','expected_competion','possession','parking_type','rera_no'];
  
const [excelHeadersblock, setExcelHeadersblock] = useState([]); // Store Excel headers
const [mappedFieldsblock, setMappedFieldsblock] = useState({}); // Store user-selected mapping
const [selectedFileblock, setSelectedFileblock] = useState(null); // Store uploaded file

const [duplicateEntriesblock, setDuplicateEntriesblock] = useState([]);
const [pendingContactsblock, setPendingContactsblock] = useState([]);

// 🔹 Step 1: Extract Headers from Excel File
const handleFileChangeblock1 = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setIsLoading(true); // Start loading
  setSelectedFileblock(file); // Store file for later use

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet,{ header: 1 });

      if (data.length > 0) {
        const headers = data[0].map((cell, index) => cell || `Column${index + 1}`);
        setExcelHeadersblock(headers); // Set headers manually
      } else {
        toast.error("No data found in the Excel file.");
      }
    } catch (error) {
      toast.error("Error processing the Excel file.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  reader.readAsArrayBuffer(file);
};





// 🔹 Step 2: Process & Map Data Based on User Selection
const handleProcessFileblock = () => {
  try {
    
  setIsLoading(true);
  if (!selectedFileblock) {
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
      const updatedblock = data.map((row) => {
        let newcontact = {};

        Object.keys(row).forEach((key) => {
          let mappedKey = mappedFieldsblock[key] || key; // Use mapped key or original key
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

 
      checkForDuplicatesblock(updatedblock); // Call duplicate check after mapping
    } else {
      toast.error("No data found in the Excel file.");
    }
  };

  reader.readAsArrayBuffer(selectedFileblock);
} catch (error) {
    console.log(error);
    
}finally {
  setIsLoading(false); // Hide loader after API call
}
};


const [allcontactsblock, setallcontactsblock] = useState([]);
const checkForDuplicatesblock = async (contacts) => {
  try {
    setIsLoading(true);

    // Fetch existing units
    const response = await api.get("viewproject");
    const allblock = response.data.project.flatMap(project => project.add_block);

    let newContacts = [];
    let duplicates = [];

    contacts.forEach((contact) => {
   
   // Check if unit is duplicate (case-insensitive and trimmed)
       const isDuplicate = allblock.some(unit =>
        String(unit.block_name).trim().toLowerCase() === String(contact.block_name).trim().toLowerCase() &&
        Array.isArray(unit.category) &&
        Array.isArray(contact.category) &&
        unit.category.map(item => item.trim().toLowerCase()).join(',') === contact.category.map(item => item.trim().toLowerCase()).join(',') &&
        Array.isArray(unit.sub_category) &&
        Array.isArray(contact.sub_category) &&
        unit.sub_category.map(item => item.trim().toLowerCase()).join(',') === contact.sub_category.map(item => item.trim().toLowerCase()).join(',')
      );



      if (isDuplicate) {
        duplicates.push(contact);
      } else {
        newContacts.push(contact);
      }
    });

    
    setDuplicateEntriesblock(duplicates);
    setPendingContactsblock(newContacts);
    setallcontactsblock([...newContacts, ...duplicates]);

  } catch (error) {
    console.error("❌ Error checking for duplicates:", error);
  } finally {
    setIsLoading(false);
  }
};



const addbulkblock = () => {
  // Step 1: Identify duplicates within pendingContacts
  const seen = new Set();
  const uniqueUnits = [];
  const allUnitsWithColor = [];

  pendingContactsblock.forEach((unit) => {
    const unitIdentifier = `${unit.block_name}-${unit.category}-${unit.sub_category}`; // Unique identifier for each unit
    
    if (seen.has(unitIdentifier)) {
      // If the unit is a duplicate, mark it as duplicate and set color
      unit.isDuplicate = true;
      allUnitsWithColor.push(unit); // Add duplicate unit
    } else {
      // Otherwise, add to the unique units list and mark as non-duplicate
      seen.add(unitIdentifier);
      unit.isDuplicate = false;
      allUnitsWithColor.push(unit); // Add unique unit
    }
  });


  // Step 2: Update state with all units (including duplicates)
  setblocks((prevUnit) => [...prevUnit, ...allUnitsWithColor]); // Append all units (unique + duplicate) to the unit list
  setproject((prevState) => ({
    ...prevState,
    add_block: [...prevState.add_block, ...allUnitsWithColor], // Add all units to the project state
  }));


};

const headerSuggestionsblock = {
  owner_details: "Suggestion: Enter owner mobile no",
  associated_contact: "Suggestion: Enter associated mobile no",
  unit_no: "Suggestion: Enter unit no",
  block: "Suggestion: Enter Block",
  project_name: "Suggestion: Project Name",
  unit_type:"Suggestion: Select unit type",
  size:"Suggestion: Size of unit"
  // Add more as needed
};

// ========================================add size in project end===================================================================


const [show8, setshow8] = useState(false);
const handleClose8 = () => setshow8(false);
const handleShow8=async()=>
{
  setshow8(true);

}


const handleFileChangeblock = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Ensure the data has at least one row
    if (data.length > 0) {
      const updatedblock = data.map((row) => {
        // Create a new unit object by copying the base unit template
        const newblock = { ...block };

        // Iterate through each key in the row (Excel columns)
        Object.keys(row).forEach((key) => {
          // Check if the key exists in the unit's state and update
          if (newblock.hasOwnProperty(key)) {
            if (Array.isArray(newblock[key])) {
              // If the field is an array (like khewat_no, water_source), push the value
              newblock[key] = [...newblock[key], row[key]];
            } else {
              // Otherwise, just assign the value directly
              newblock[key] = row[key];
            }
          }
        });

        return newblock;
      });

      // Update the unit state and project state
      setblocks((prevblock) => [...prevblock, ...updatedblock]); // Append new units to the list
      setproject((prevState) => ({
        ...prevState,
        add_block: [...prevState.add_block, ...updatedblock] // Add the new units to the project state
      }));

      // Close any modal or reset other states
      handleClose8();
      document.getElementById('choosedestination').value = 'Select';
    } else {
      toast.error('No data found in the Excel file.');
    }
  };

  reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
};


const [show9, setshow9] = useState(false);
const handleClose9 = () => setshow9(false);
const handleShow9=async()=>
{
  setshow9(true);

}

const handleFileChangesize = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Ensure the data has at least one row
    if (data.length > 0) {
      const updatedsize = data.map((row) => {
        // Create a new unit object by copying the base unit template
        const newsize = { ...sizes };

        // Iterate through each key in the row (Excel columns)
        Object.keys(row).forEach((key) => {
          // Check if the key exists in the unit's state and update
          if (newsize.hasOwnProperty(key)) {
            if (Array.isArray(newsize[key])) {
              // If the field is an array (like khewat_no, water_source), push the value
              newsize[key] = [...newsize[key], row[key]];
            } else {
              // Otherwise, just assign the value directly
              newsize[key] = row[key];
            }
          }
        });

        return newsize;
      });

      // Update the unit state and project state
      setsize((prevsize) => [...prevsize, ...updatedsize]); // Append new units to the list
      setproject((prevState) => ({
        ...prevState,
        add_size: [...prevState.add_size, ...updatedsize] // Add the new units to the project state
      }));

      // Close any modal or reset other states
      handleClose9();
      document.getElementById('choosedestination').value = 'Select';
    } else {
      toast.error('No data found in the Excel file.');
    }
  };

  reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
};



const sizedata = [
  { size_name: 'size 1', block1: 'b1', category: 'residential',sub_category:'plot',unit_type:'corner',total_sealable_area:'',sq_feet1:'',
    covered_area:'',sq_feet2:'',carpet_area:'',sq_feet3:'',loading:'',percentage:'',length:10,yard1:'feet',bredth:10,yard2:'feet',
    total_area:100,yard3:'Sqfeet'
   }
];

const generateExcelFilesize = () => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert the data into a worksheet
  const ws = XLSX.utils.json_to_sheet(sizedata);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate the Excel file as a Blob
  const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Save the file using file-saver
  const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'data.xlsx');
};


                    
                    

const blockdata = [
  { block_name: 'block 1', category: 'residential', sub_category: 'plot',land_area:1000,measurment:'Sqfeet',total_blocks:2,total_floors:2,
    total_units:2,status:'open',parking_type:'all',rera_no:1001}
];

const generateExcelFileblock = () => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert the data into a worksheet
  const ws = XLSX.utils.json_to_sheet(blockdata);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate the Excel file as a Blob
  const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Save the file using file-saver
  const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'data.xlsx');
};



 

  


const unitdata = [
  { project_name: 'block 1', unit_no: 'residential', unit_type: 'plot',category:'residential',block:'b1',size:'',land_type:'',
    khewat_no:[''],killa_no:[''],share:[''],total_land_area:'',water_source:[''],water_level:[''],water_pump_type:[''],direction:'',
    side_open:'',fornt_on_road:'',total_owner:'',facing:'',road:'',ownership:'',stage:'',type:'',floor:[''],cluter_details:[''],
    length:[''],bredth:[''],total_area:[''],measurment2:[''],ocupation_date:'',age_of_construction:'',furnishing_details:'',
    enter_furnishing_details:'',furnished_item:'',location:'',lattitude:'',langitude:'',uaddress:'',ustreet:'',ulocality:'',
    ucity:'',uzip:'',ustate:'',ucountry:'',owner_details:[''],associated_contact:[''],relation:'',
    owner_title:"Mr.",owner_first_name:"alex",owner_last_name:"kumar",owner_country_code:"91",owner_mobile_no:"9944554411",
    owner_mobile_type:"personal",owner_email:"alex@gmail.com",owner_email_type:"personal",owner_father_name:"jon",owner_hno:"f13",
    owner_area:"bishanpura",owner_location:"sec 58",owner_city:"noida",owner_pincode:"201301",owner_state:"up",owner_country:"india",
    associated_hno:"f13",associated_area:"bishanpura",associated_location:"sec58",associated_city:"noida",associated_pincode:"201301",
    associated_state:"up",associated_country:"india",
    associated_title:"Mr.",associated_first_name:"jon",associated_last_name:"dow",associated_country_code:"91",
    associated_mobile_no:"9454226644",associated_mobile_type:"personal",associated_email:"jon@gmail.com",associated_email_type:"home",
    associated_father_name:"alex"
  }
];

const generateExcelFileunit = () => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert the data into a worksheet
  const ws = XLSX.utils.json_to_sheet(unitdata);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate the Excel file as a Blob
  const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Save the file using file-saver
  const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'data.xlsx');
};



              
    return ( 
        <div>
            <div id='h'><Header1/></div>
            <div onMouseOver={mousehover} onMouseOut={mouseout}><Sidebar1/></div>
           
           <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-5" style={{width:"80%",marginLeft:"150px"}}>
    <div className="row" id='r' style={{transition:"0.5s"}}>
        <div className="col-md-12 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Update Project</h4><input type='checkbox'  style={{marginLeft:"60%",height:"20px",width:"20px"}} /><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               
         
                <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"30px"}}>
               <div  id='basic' onClick={basicdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Basic |</div>
                <div  id='professional' onClick={professionaldetails} style={{cursor:'pointer',fontWeight:"bold"}}>Location |</div>
                <div  id='other' onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Block |</div> 
                <div  id='size1' onClick={sizedetails} style={{cursor:'pointer',fontWeight:"bold"}}>Size |</div>
                <div  id='unit' onClick={unitdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Unit |</div>
                <div  id='aminities1' onClick={aminitiesdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Aminities |</div> 
                <div  id='prices' onClick={pricedetails} style={{cursor:'pointer',fontWeight:"bold"}}>Price |</div> 
               </div>
						    <div style={{marginLeft:"20%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                    <hr></hr>
                
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
                <div className="col-md-6"><label className="labels">Name</label><input type="text" value={project.name}  className="form-control form-control-sm"  onChange={(e)=>setproject({...project,name:e.target.value})}/></div>
                <div className='col-md-6'></div>
                    <div className="col-md-6"><label className="labels">Developer Name</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,developer_name:e.target.value})}>
                             <option>{project.developer_name?.name}</option>
                              <option>---Select---</option>
                              {
                                data1.map((item)=>
                                (
                                  <option value={item._id}>{item.name}</option>
                                ))
                              }
                        </select>
                        </div>
                        <div className='col-md-1'><label style={{visibility:"hidden"}}>add</label><button className='form-control form-control-sm' onClick={add_developer}>+</button></div>
                        <div className='col-md-5'></div>
                        <div className="col-md-6"><input  type='checkbox' onChange={handleischeckedchange} checked={ischecked} /><label style={{margin:"10px"}}>Is this a Joint Venture?</label></div>
                        <div className="col-md-6"><label className="labels">Secondary Developer</label><select id='secondarydeveloper'  className="form-control form-control-sm" required="true"  onChange={(e)=>setproject({...project,secondary_developer:e.target.value})}>
                        <option>{project.secondary_developer}</option>
                        <option>---Select---</option>
                              {
                                data1.map((item)=>
                                (
                                  <option>{item.name}</option>
                                ))
                              }
                        </select>
                        </div>

                    <div className="col-md-5"><label className="labels">Rera Number</label><input type="text" required="true" className="form-control form-control-sm" value={project.rera_number}  onChange={(e)=>setproject({...project,rera_number:e.target.value})}/></div>
                    <div className='col-md-7'></div>

                    <div className="col-md-10"><label className="labels">Descriptions</label><ReactQuill  key={project.descriptions} value={project.descriptions} formats={formats} modules={modules}   style={{height:"200px"}} onChange={(value) => setproject({ ...project, descriptions: value })}/></div>
                    <div className="col-md-2"></div>
                    
                   
                    <div className="col-md-12" style={{ display: "flex",marginTop:"70px" }}><label className="labels">Category</label>
            {['Residential', 'Commercial', 'Agricultural', 'Institutional', 'Industrial'].map((type) => (
                <div className="col-md-2" key={type} style={{marginTop:"20px"}}>
                    <button 
                        className='form-control form-control-sm' 
                        onClick={() => handleTypeClick(type)} 
                        style={{ backgroundColor: isSelected(type) ? 'green' : '' }}
                    >
                        {type}
                    </button>
                </div>
            ))}
        </div>
                    <div className="col-md-6"><label className="labels">Sub Category</label>
                    
                    <Select
                    className='form-control form-control-sm'
                    style={{border:"none"}}
          labelId="subcategory-label"
          id="subcategory"
          multiple
          value={project.sub_category}
          onChange={handleSubCategoryChange}
          renderValue={(selected) => selected.join(", ")} 
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {getSubcategories().map((subCategory) => (
            <MenuItem key={subCategory} value={subCategory}>
              <Checkbox
                checked={project.sub_category.indexOf(subCategory) > -1}
                onChange={() => handleToggle(subCategory)}
              />
              <ListItemText primary={subCategory} />
            </MenuItem>
          ))}
        </Select>
                    </div>
                    <div className="col-md-6"></div>

                        <div className="col-md-2"><label className="labels">Land Area</label><input type="text" value={project.land_area}  className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,land_area:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,measurment1:e.target.value})}>
                              <option>{project.measurment1}</option>
                              <option>---select---</option>
                              <option>Acres.</option>
                              <option>Yard</option>
                                <option>Meter</option>
                                <option>Feet</option>
                                <option>Inch</option>
                        </select>
                       </div>
                        <div className="col-md-2"><label className="labels">Total Blocks</label><input type="number" value={project.total_block} className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,total_block:e.target.value})}/></div>
                        <div className="col-md-2" id='totalfloors'><label className="labels">TOTAL Floor</label><input type="number" value={project.total_floor} className="form-control form-control-sm" required="true"  onChange={(e)=>setproject({...project,total_floor:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">TOTAL Units</label><input type="number" value={project.total_units} className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,total_units:e.target.value})}/></div>
                        <div className="col-md-2"></div>

                        <div className="col-md-10" id='zonelist' style={{display:"none"}}><label className="labels">Zone</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={project.zone?project.zone:zone}
                            onChange={handlezonechange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {zoneslist.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={project.zone?project.zone.indexOf(name) > -1:zone.indexOf(name)> -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                       </div>
                     <div className='row' id='withoutagriculture' style={{padding:"20px,0"}}>
                        <div className="col-md-8"><label className="labels">Status</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,status:e.target.value})}>
                             <option>{project.status}</option>
                             <option>---select---</option>
                              <option>Upcoming</option>
                              <option>Pre Launch</option>
                              <option>Launched</option>
                              <option>Under Construction</option>
                              <option>Ready to Move</option>
                        </select>
                       </div>
                       <div className="col-md-4"></div>

                       <div className="col-md-4" ><label className="labels">Launched On</label><input type="date" value={project.launched_on} className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,launched_on:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Expected Competion</label><input type="date" value={project.expected_competion} className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,expected_competion:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Possession</label><input type="date" value={project.possession}   className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,possession:e.target.value})}/></div>

                       <div className="col-md-6"><label className="labels">Parking Type</label>
                       <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={project.parking_type?project.parking_type:parkings}
                    onChange={handleparkingChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                
                 <MenuItem value="select-all">
                    <Checkbox checked={project.parking_type? project.parking_type.length === parking.length:parkings.length === parking.length} />
                    <ListItemText
                      primary={ '---select all---'} //
                    />
                  </MenuItem>
                    {parking.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={project.parking_type? project.parking_type.indexOf(name) > -1: parkings.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                       </div>
                       <div className="col-md-6"><label className="labels">Approved Bank</label>
                       <Select
                      className="form-control form-control-sm"
                      style={{ border: 'none' }}
                      labelId="bank-select-label"
                      multiple
                      value={project.approved_bank || selectedBanks} // Ensure value is an array of bank names
                      onChange={handleChange}
                      renderValue={(selected) => selected.join(', ')} // Display selected bank names
                    >
                      {bankOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox
                            checked={project.approved_bank
                              ? project.approved_bank.indexOf(option) > -1
                              : selectedBanks.indexOf(option) > -1
                            }
                          />
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                       </div>
                <div className="col-md-2" > <label className="labels">Approvals</label>
                    {
                      project.approvals.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handleapprovalschange(index,event)}>
                        <option>{project.approvals[index]}</option>
                        <option>---select---</option>
                        <option>Upcoming</option>
                              <option>Rera Certificate</option>
                              <option>Layout Plan Approval</option>
                              <option>Storm & Drain Water NOC</option>
                              <option>Fire NOC</option>
                              <option>Change of Land Use Approval</option>
                              <option>Environmental Clearance</option>
                              <option>Occupation Certificate</option>
                              <option>Commencement Certificate</option>
                              <option>Ownership Document</option>
                              <option>Non-Encumbrance Certificate</option>
                              <option> Airport Clearance</option>
                              <option> Development/Construction Certificate</option>
                              <option>NOC Tree Cutting</option>
                              <option>Electrical Scheme Approval</option>
                              <option>Traffic & Coordination NOC</option>
                              <option>Ancient Monument Approval</option>
                              <option> Pollution Control Board Approval</option>
                              <option>Borewell Registration Certificate</option>
                              <option>Excavation/Mining Approval</option>
                              <option>Road Access Plan Approval</option>
                              <option>Labour Deptt. Approval</option>
                              <option>Permanent Power Connection</option>
                              <option>Permanent Sewerage Connection</option>
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-3"><label className="labels">Registration No.</label>
                    {
                       project.registration_no.map((item,index)=>
                        (
                          <input type="text" required="true" value={project.registration_no[index]} style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          
                          onChange={(event)=>handleregistrationchange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Date</label>
                    {
                       project.date.map((item,index)=>
                        (
                          <input type="date" value={project.date[index]} required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handledatechange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Pic</label>
                    {
                      project.pic.map((item,index)=>
                      (
                        <input type="file" 
                        src={`${project.pic}`}
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handlepicchange(index,event)}
                        />
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                        Array.isArray(project.action1) ?
                       project.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  </div>
                  
                 
                  

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Owner</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={project.owner?project.owner:owners}
                    onChange={handleOwnerChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {ownersList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={project.owner?project.owner.indexOf(name) > -1:owners.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>
                  
                        <div className="col-md-6"><label className="labels">Team</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={project.team?project.team:teams}
                    onChange={handleteamchange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {teamlist.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={project.team?project.team.indexOf(name) > -1:teams.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>

                    </div>
                  
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setproject({...project,visible_to:e.target.value})}>
                                <option>{project.visible_to}</option>
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
                  
  {/* -----------------------------------------location Details start------------------------------------------------------------------- */}

        <div className="col-md-12" id='location' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="row " >
                <div className="col-md-12" style={{border:"1px solid black",padding:"10px"}}>
                {/* <div style={{border:"1px solid black",marginTop:"10px"}}>
                {mapLoaded && (
                          <LoadScript
                            googleMapsApiKey="AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc"
                                                                >
                                    <GoogleMap
                              mapContainerStyle={mapStyles}
                                zoom={13}
                                center={defaultCenter}
                                >
                            <Marker
                              position={{ lat: defaultCenter.lat, lng: defaultCenter.lng }}
                              draggable={true}
                              onDragEnd={handleMarkerDragEnd}
                            />
                            </GoogleMap>
                            </LoadScript>
                )}
                          </div> */}
                          <div className="row">
                          <div className="col-md-6" ><label className="labels">Location</label><input  type="text" className="form-control form-control-sm" required="true" placeholder="Enter location" value={project.location} onChange={(e)=>setproject({...project,location:e.target.value})}/></div>
                          {/* <div className='col-md-5'></div> */}
                          <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>.</label><button className="form-control form-control-sm" required="true" onClick={handleSubmit}>Get</button></div>
                          <div className='col-md-5'></div>
                          <div className="col-md-5"><label className="labels">Lattitude</label><input type="number"className="form-control form-control-sm" required="true" value={project.lattitude?project.lattitude:coordinates.lat} readOnly/></div>
                          <div className="col-md-5"><label className="labels">Langitude</label><input type="number"className="form-control form-control-sm" required="true" value={project.langitude?project.langitude:coordinates.lng} readOnly/></div>
                          </div>
                          </div>
                          
                          <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">ADDRESS</label><input type="text" value={project.address} className="form-control form-control-sm" onChange={(e)=>setproject({...project,address:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-8"><label className="labels">STREET</label><input type="text" value={project.street} className="form-control form-control-sm" onChange={(e)=>setproject({...project,street:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">LOCALITY</label><input type="text" value={project.locality} className="form-control form-control-sm" onChange={(e)=>setproject({...project,locality:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">CITY</label>
                    <select type="text" className="form-control form-control-sm" onChange={(e)=>setproject({...project,city:e.target.value})}>
                   <option>{project.city} </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                    </select>
                    </div>
                    <div className="col-md-4"><label className="labels">ZIP</label><input type="text" value={project.zip} className="form-control form-control-sm" onChange={(e)=>setproject({...project,zip:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">State</label><select  className="form-control form-control-sm" onChange={(e)=>setproject({...project,state:e.target.value})}>
                                <option>{project.state}</option>
                                {states.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                                 ))}
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Country</label><select  className="form-control form-control-sm"  onChange={(e)=>setproject({...project,country:e.target.value})}>
                                <option>{project.country}</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    </div>
              </div>
             </div>
           </div>
 {/* ------------------------------------------------------location Details end--------------------------------------------------------------  */}

 {/*-------------------------------------------------- block details start--------------------------------------------------------- */
 
 }
        <div className="col-md-12" id='block' style={{display:"none",marginTop:"-80px"}}>
            <div className="p-3 py-5">
     
                <div className="row " >

                    <div className="col-md-7"></div>
                    <div className="col-md-2">
                      <button
                        onClick={handleShow1}
                        style={{
                          width: '100%',
                          height:"45px",
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          letterSpacing: '0.6px',
                          backgroundColor: '#2c3e50', // dark navy blue, classy and modern
                          color: '#ecf0f1',           // light grey text
                          border: '1.5px solid #2c3e50',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          outline: 'none',
                          userSelect: 'none',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#ecf0f1';  // light background on hover
                          e.currentTarget.style.color = '#2c3e50';            // dark text on hover
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#2c3e50';
                          e.currentTarget.style.color = '#ecf0f1';
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Add Block
                      </button>
                    </div>

                      <div className="col-md-2">
                      <button
                        onClick={handleShow11}
                        style={{
                          width: '100%',
                          height:"45px",
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          letterSpacing: '0.6px',
                          backgroundColor: '#2c3e50', // dark navy blue, classy and modern
                          color: '#ecf0f1',           // light grey text
                          border: '1.5px solid #2c3e50',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          outline: 'none',
                          userSelect: 'none',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#ecf0f1';  // light background on hover
                          e.currentTarget.style.color = '#2c3e50';            // dark text on hover
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#2c3e50';
                          e.currentTarget.style.color = '#ecf0f1';
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Import Block
                      </button>
                    </div>
                        <Tooltip title="Download Data.." arrow>
                                        <div className="col-md-1"><img src='https://cdn-icons-png.flaticon.com/512/4007/4007698.png' onClick={generateExcelFileblock} style={{height:"40px",cursor:"pointer"}} alt=''></img></div>
                                        </Tooltip>
                    <TableContainer component={Paper} style={{height:"400px",width:"1000px",overflowY:"scroll",marginTop:"40px",marginLeft:"50px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Block Name</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Category</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Sub-Category</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Status</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        project.add_block.map ((item, index) => (
          <StyledTableRow key={index} style={{ color: item.isDuplicate ? "red" : "black"}}>
            <StyledTableCell style={{fontSize:"12px"}}>
            {item.block_name}
             </StyledTableCell>
             <StyledTableCell style={{fontSize:"12px"}}>Import Block
              {Array.isArray(item.category) ? (
                item.category.map((categoryItem, index) => (
                  <span key={index}>{categoryItem}<br></br></span> // Render each item with a key
                ))
              ) : (
                <span>{item.category}</span> // Render a single category if it's not an array
              )}
            </StyledTableCell>

             <StyledTableCell style={{fontSize:"12px"}}>
            {item.sub_category}
             </StyledTableCell>
             <StyledTableCell style={{fontSize:"12px"}}>
            {item.status}
             </StyledTableCell>
             <StyledTableCell style={{fontSize:"12px"}}>
             <div style={{marginTop:"10px"}}>
               <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteblock(index)}>delete</span>
              {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteblock(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
              </div>
             </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Block/Tower</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
             
                    <div className="col-md-6"><label className="labels">Block/Tower Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setblock({...block,block_name:e.target.value})}/></div>
                    <div className='col-md-6'></div>

                    <div className="col-md-12"><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex",flexWrap:"wrap"}} >
                       {
                        project.category.map((type) => (
                          <div className="col-md-3" key={type}>
                            <button 
                              className="form-control form-control-sm"
                              onClick={() => handleTypeClick3(type)} 
                              style={{ backgroundColor: selectedType2(type) ? 'green' : '' }}
                            >
                              {type}
                            </button>
                          </div>
                        ))
                       }
                    </div>

                   
                    <div className="col-md-12"><label className="labels">Sub Category</label>
                    <Select
                    className="form-control form-control-sm"
                      labelId="subcategory-label"
                      id="subcategory"
                      multiple
                      value={block.sub_category} // Bind the state to the Select component
                      onChange={handleblockSubCategoryChange} // Handle change to update the state
                      renderValue={(selected) => selected.join(', ')}
                      style={{border:"none"}} // Render the selected values as a comma-separated list
                    >
                      <MenuItem value="">
                        <em>---select---</em>
                      </MenuItem>
                      {project.sub_category.map((item) => (
                        <MenuItem key={item} value={item}>
                          <Checkbox checked={block.sub_category.indexOf(item) > -1} />
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}
                    </Select>
                    </div>   

                    {
                    project.category.includes('Agricultural') && (
                        <>
                         <div className="col-md-3"><label className="labels">Land Area</label><input type="text" className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,land_area:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>measurment</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,measurment:e.target.value})}>
                              <option>Acres.</option>
                              <option>Kanal</option>
                              <option>Marla</option>
                              <option>Square Yard</option>
                              <option>Hectare</option>
                        </select>
                       </div>
                       <div className="col-md-3"><label className="labels">TOTAL Units</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,total_units:e.target.value})}/></div>
                       <div className='col-md-3'></div>
                       <div className="col-md-10" id='zonelist' ><label className="labels">Zone</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={zone}
                            onChange={handlezonechange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {zoneslist.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={zone.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                       </div>
                       <div className="col-md-7" ><label className="labels">Rera Number</label><input type="text"   className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,rera_no:e.target.value})}/></div>
                        </>
                      )
                    }
                      {
                     !project.category.includes('Agricultural') && (
                        <>
                    <div className="col-md-2"><label className="labels">Land Area</label><input type="text" className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,land_area:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>measurment</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,measurment:e.target.value})}>
                              <option>Acres.</option>
                              <option>Kanal</option>
                              <option>Marla</option>
                              <option>Square Yard</option>
                              <option>Hectare</option>
                        </select>
                       </div>
                        <div className="col-md-2"><label className="labels">Total Blocks</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,total_blocks:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">TOTAL Floor</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,total_floors:e.target.value})} /></div>
                        <div className="col-md-2"><label className="labels">TOTAL Units</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,total_units:e.target.value})}/></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-12"><label className="labels">Status</label><select  className="form-control form-control-sm"  onChange={(e)=>setblock({...block,status:e.target.value})}>
                                <option>---Select---</option>
                                <option>Upcoming</option>
                                <option>Pre Launch</option>
                                <option>Launched</option>
                                <option>Under Construction</option>
                                <option>Ready to Move</option>
                                </select>
                    </div>
                    <div className="col-md-4" ><label className="labels">Launched On</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,launched_on:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Expected Competion</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,expected_competion:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Possession</label><input type="date"   className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,possession:e.target.value})}/></div>

                       <div className="col-md-10"><label className="labels">Parking Type</label>
                       <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={parkings}
                    onChange={handleparkingChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                
                 <MenuItem value="select-all">
                    <Checkbox checked={parkings.length === parking.length} />
                    <ListItemText
                      primary={ '---select all---'} //
                    />
                  </MenuItem>
                    {parking.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={parkings.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                       </div>
                       <div className='col-md-6'></div>
                       <div className="col-md-7" ><label className="labels">Rera Number</label><input type="text"   className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,rera_no:e.target.value})}/></div>
              </>
                      )}
                </div>
                </div>
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addblock}>
                Add Block
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
           </div>
             </div>
           </div>
{/*--------------------================================= block details end------------------------------============================== */}

{/*------------------------------======================== size details start================----------------------------------- */}
<div className="col-md-12" id='sizedetails' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="row " >
                <div className="col-md-7"></div>
                    <div className="col-md-2">
                      <button
                        onClick={handleShow2}
                        style={{
                          width: '100%',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          letterSpacing: '0.6px',
                          backgroundColor: '#2c3e50', // dark navy blue, classy and modern
                          color: '#ecf0f1',           // light grey text
                          border: '1.5px solid #2c3e50',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          outline: 'none',
                          userSelect: 'none',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#ecf0f1';  // light background on hover
                          e.currentTarget.style.color = '#2c3e50';            // dark text on hover
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#2c3e50';
                          e.currentTarget.style.color = '#ecf0f1';
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Add Size
                      </button>
                    </div>

                    <div className="col-md-2">
                      <button
                        onClick={handleShow10}
                        style={{
                          width: '100%',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          letterSpacing: '0.6px',
                          backgroundColor: '#2c3e50', // dark navy blue, classy and modern
                          color: '#ecf0f1',           // light grey text
                          border: '1.5px solid #2c3e50',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          outline: 'none',
                          userSelect: 'none',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#ecf0f1';  // light background on hover
                          e.currentTarget.style.color = '#2c3e50';            // dark text on hover
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#2c3e50';
                          e.currentTarget.style.color = '#ecf0f1';
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Import Size
                      </button>
                    </div>

                          <Tooltip title="Download Data.." arrow>
                                        <div className="col-md-1"><img src='https://cdn-icons-png.flaticon.com/512/4007/4007698.png' onClick={generateExcelFilesize} style={{height:"40px",cursor:"pointer"}} alt=''></img></div>
                                        </Tooltip>
                    <TableContainer component={Paper} style={{height:"400px",width:"1000px",overflowY:"scroll",marginTop:"40px",marginLeft:"50px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Block Name</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Category</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Sub-Category</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Size</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        project.add_size.map ((item, index) => (
          <StyledTableRow key={index} style={{ color: item.isDuplicate ? "red" : "black"}}>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.block1}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px"  }}>
             {item.category}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px"  }}>
             {item.sub_category}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"  }}>
             {item.size_name}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px"  }}>
            <div style={{marginTop:"10px"}}>
              <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deletesize(index)}>delete</span>
            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deletesize(index)}  style={{height:"40px",cursor:"pointer"}}/>*/}
            </div> 
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Size</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
             
                    <div className="col-md-8"><label className="labels">Size Name</label><input type="text" readOnly value={sizes.size_name} required="true" className="form-control form-control-sm" placeholder="first name"/></div>
                    <div className='col-md-4'></div>

                    <div className="col-md-8"><label className="labels">Block</label><select  className="form-control form-control-sm"  onChange={(e)=>setsizes({...sizes,block1:e.target.value})}>
                                <option>choose</option>
                               {
                                project.add_block.map((item)=>
                                (
                                  <option>{item.block_name}</option>
                                ))
                               }
                                </select>
                    </div>
                    <div className='col-md-4'></div>

                    <div className="col-md-12"><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                    <div className="col-md-12" style={{ display: "flex", flexWrap: "wrap" }}>
                      {
                        project.category.map((type) => (
                          <div className="col-md-3" key={type}>
                            <button 
                              className="form-control form-control-sm"
                              onClick={() => handleTypeClick2(type)} 
                              style={{  backgroundColor: selectedType1 === type ? 'green' : '', }}
                            >
                              {type}
                            </button>
                          </div>
                        ))
                      }
                    </div>

                    </div>

                    <div className="col-md-12"><label className="labels">Sub Category</label>
                    <select
                    className='form-control form-control-sm'
                      labelId="subcategory-label"
                      id="subcategory"
                      onChange={handlesizesubcategorychange}>
                      <option>---select---</option>
                      {
                        project.sub_category.map((item)=>
                        (
                          <option>{item}</option>
                        ))
                      }
                </select>
                    </div>   

                    {
                              
                              !project.category.includes('Agricultural') && (
                                  <>
                    <div className="col-md-6"><label className="labels">Unit Type</label>
                    <select
                    className='form-control form-control-sm'
                      onChange={(e)=>setsizes({...sizes,unit_type:e.target.value})}>
                      <option>---select---</option>
                      {
                        availableunit.map((item)=>
                        (
                          <option>{item}</option>
                        ))
                      }
                </select>
                    </div>  
                    <div className='col-md-6'></div>
                    </>
                              )}

                     {
                              
                              project.category.includes('Agricultural') && (
                                  <>
               
                    <div className="col-md-4"><label className="labels" >Type</label><select  className="form-control form-control-sm" onChange={(e)=>setsizes({...sizes,type:e.target.value})}>
                                <option>---select---</option>
                                <option>Acre</option>
                                <option>Kanal</option>
                                <option>Marla</option>
                                
                                </select>
                             </div>
                             <div className='col-md-8'></div>

                                      {/* <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Total Seleble Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,length:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Yard</option>
                                <option>Sq Feet</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                
                             <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}> Carpet Area</label><input type='text' onBlur={calculateTotalArea}  className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,bredth:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Yard</option>
                                <option>Sq Feet</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}> Total Area</label><input type='text' className='form-control form-control-sm'  value={sizes.total_area} readOnly /></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div> */}
                                  </>
                              )
                          } 

                    <div className='col-md-6' style={{marginTop:"10px"}}>
                            <input
                              type="checkbox"
                              checked={showapartmentSize}
                              onChange={handleCheckboxChange3}
                            />
                            <label>Show Apartment Size</label>
                    </div>
     
                   {showapartmentSize && (
                    <div className='row' id='apartmentsize' style={{margin:"20px",padding:"20px",border:"1px dashed black"}}>
                    <div className="col-md-3"><label className="labels">Total Seleble Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,total_sealable_area:e.target.value})} /></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm" onChange={(e)=>setsizes({...sizes,sq_feet1:e.target.value})}>
                                <option>Feet</option>
                                <option>Yard</option>
                                <option>Meter</option>
                                <option>Inch</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                             <div className="col-md-3"><label className="labels"> Covered Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,covered_area:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>{sizes.sq_feet1}</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                             <div className="col-md-3"><label className="labels"> Carpet Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,carpet_area:e.target.value})} onBlur={totalpercentage}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                               <option>{sizes.sq_feet1}</option>
                                </select>
                             </div>
                             <div className="col-md-3"><label className="labels"> Loading</label><input type='text' className='form-control form-control-sm' value={sizes.loading}/></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>%</option>
                                </select>
                             </div>
                             <div className='col-md-1'></div>
                            </div>
                     )}

                            <div  className='col-md-6' style={{marginTop:"10px"}}>
                        <input
                          type="checkbox"
                          checked={showPlotSize}
                          onChange={handleCheckboxChange2}
                        />
                        <label>Show Size</label>
                      </div>
                {showPlotSize && (
                            <div className='row' id='plotsize' style={{margin:"20px",padding:"20px",border:"1px dashed black"}}>
                    <div className="col-md-3"><label className="labels" >Total Length</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,length:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm" onChange={(e)=>setsizes({...sizes,yard1:e.target.value})}>
                              <option>---select---</option>
                               <option>Yard</option>
                                <option>Meter</option>
                                <option>Feet</option>
                                <option>Inch</option>
                                
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                
                             <div className="col-md-3"><label className="labels" > Total Breadth</label><input type='text'  onBlur={calculateTotalArea} className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,bredth:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm" value={sizes.yard1} onChange={(e)=>setsizes({...sizes,yard2:e.target.value})}>
                                <option>{sizes.yard1}</option>     
                                </select>
                             </div>
                             <div className="col-md-3"><label className="labels" > Total Area</label><input type='text' value={sizes.total_area} readOnly  className='form-control form-control-sm' /></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm" onChange={(e)=>setsizes({...sizes,yard3:e.target.value})}>
                               
                                <option>Sq Yard</option>
                                <option>Sq Meter</option>
                                <option>Sq Feet</option>
                                <option>Sq Inch</option>
                                
                                </select>
                             </div>
                             
                            </div>
      )}
                         
                </div>
                </div>
               
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addsize}>
                Add Size
              </Button>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
                         
                          
                   
                         
                    </div>
                    </div>
                    </div>
             
  {/*-------------------========================== size details end ==================================--------------------------------------*/}

{/*---------------------------------=========================== unit details start-------------------===================================== */}

<div className="col-md-12" id='unitdetails' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="row " >
                <div className="col-md-7"></div>
                  <div className="col-md-2">
                    <button
                      onClick={handleShow3}
                      style={{
                        width: '100%',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        letterSpacing: '0.6px',
                        backgroundColor: '#2c3e50', // dark navy blue, classy and modern
                        color: '#ecf0f1',           // light grey text
                        border: '1.5px solid #2c3e50',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        outline: 'none',
                        userSelect: 'none',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#ecf0f1';  // light background on hover
                        e.currentTarget.style.color = '#2c3e50';            // dark text on hover
                        e.currentTarget.style.borderColor = '#2c3e50';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#2c3e50';
                        e.currentTarget.style.color = '#ecf0f1';
                        e.currentTarget.style.borderColor = '#2c3e50';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Add Unit
                    </button>
                  </div>

                      <div className="col-md-2">
                      <button
                        onClick={handleShow7}
                        style={{
                          width: '100%',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          letterSpacing: '0.6px',
                          backgroundColor: '#2c3e50', // dark navy blue, classy and modern
                          color: '#ecf0f1',           // light grey text
                          border: '1.5px solid #2c3e50',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          outline: 'none',
                          userSelect: 'none',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#ecf0f1';  // light background on hover
                          e.currentTarget.style.color = '#2c3e50';            // dark text on hover
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#2c3e50';
                          e.currentTarget.style.color = '#ecf0f1';
                          e.currentTarget.style.borderColor = '#2c3e50';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Import Unit
                      </button>
                    </div>

         
                     <Tooltip title="Download Data.." arrow>
                                        <div className="col-md-1"><img src='https://cdn-icons-png.flaticon.com/512/4007/4007698.png' onClick={generateExcelFileunit} style={{height:"40px",cursor:"pointer"}} alt=''></img></div>
                                        </Tooltip>
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginTop:"40px",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow >
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Unit_No.</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Block</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Category</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Unit_Type</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Size</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Direction</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Road</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Facing</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Ownership</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Lattitude</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Longitude</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Builtup_Details</StyledTableCell>
          <StyledTableCell style={{fontSize:"12px",backgroundColor:"gray"}}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {

      project.add_unit.map ((item, index) => (
          <StyledTableRow key={index}  style={{ color: item.isDuplicate ? "red" : "black",  }}   className={item.isDuplicate ? 'no-activity-flash' : ''}>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.unit_no}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.block}
             </StyledTableCell>
             <StyledTableCell style={{ fontSize:"12px" }}>
             {item.category}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.unit_type}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.size}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.direction}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.road}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.facing}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px" }}>
             {item.ownership}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px" }}>
             {item.lattitude}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px" }}>
             {item.langitude}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize:"12px"}}>
             {item.type}
            </StyledTableCell>
            
            <StyledTableCell style={{ fontSize: "10px" }}>
              <div style={{marginTop:"10px"}}>
               <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteunit(index)}>delete</span>
                {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteunit(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                </div>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show3} onHide={handleClose3} size={modalSize}>
            <Modal.Header>
              <Modal.Title>Add Unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
               {/* <div style={{display:"flex",gap:"50px"}}>
               <div  id='unitdetail'  style={{cursor:'pointer',fontWeight:"bold"}} onClick={unitdetail1}><span>Unit</span> </div>
                <div  id='unitlocationdetails' style={{cursor:'pointer',fontWeight:"bold"}}  onClick={unitdetail2}><span>Location</span></div>
                <div  id='ownerdetails' style={{cursor:'pointer',fontWeight:"bold"}}  onClick={unitdetail3}><span>Add Owner</span></div>
               </div> */}
               <div style={{ display: "flex", gap: "50px" }}>
  <div
    id="unitdetail"
    style={{
      cursor: 'pointer',
      fontWeight: 'bold',
      backgroundColor: activeUnit === 1 ? '#f0f0f0' : 'transparent', // Optional: to highlight active tab
    }}
    onClick={unitdetail1}
  >
    <span>Unit</span>
  </div>
  <div
    id="unitlocationdetails"
    style={{
      cursor: 'pointer',
      fontWeight: 'bold',
      backgroundColor: activeUnit === 2 ? '#f0f0f0' : 'transparent', // Optional: to highlight active tab
    }}
    onClick={unitdetail2}
  >
    <span>Location</span>
  </div>
  <div
    id="ownerdetails1"
    style={{
      cursor: 'pointer',
      fontWeight: 'bold',
      backgroundColor: activeUnit === 3 ? '#f0f0f0' : 'transparent', // Optional: to highlight active tab
    }}
    onClick={unitdetail3}
  >
    <span>Add Owner</span>
  </div>
  <div
    id="adddocuments"
    style={{
      cursor: 'pointer',
      fontWeight: 'bold',
      backgroundColor: activeUnit === 4 ? '#f0f0f0' : 'transparent', // Optional: to highlight active tab
    }}
    onClick={unitdetail4}
  >
    <span>Add Documents</span>
  </div>
  <div
    id="upload"
    style={{
      cursor: 'pointer',
      fontWeight: 'bold',
      backgroundColor: activeUnit === 5 ? '#f0f0f0' : 'transparent', // Optional: to highlight active tab
    }}
    onClick={unitdetail5}
  >
    <span>Upload</span>
  </div>
</div>

              
              <hr></hr>
            <div style={{width:"100%"}}>
            <div className="row" id='unitdetails1'>
             
                    <div className="col-md-8"><label className="labels">Unit Number</label><input type="text"   className="form-control form-control-sm"  placeholder="unit number" onChange={(e) => setunits({...units, unit_no: e.target.value})} /></div>
                    <div className="col-md-4"><label className="labels">Unit Type</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,unit_type:e.target.value})}>
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

                    <div className="col-md-6"><label className="labels">Sub Category</label>
                    
                    <Select
                    className='form-control form-control-sm'
                    style={{border:"none"}}
          labelId="subcategory-label"
          id="subcategory"
          multiple
          value={units.sub_category}
          onChange={handleSubCategoryChange1}
          renderValue={(selected) => selected.join(", ")} 
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {project.sub_category.map((subCategory) => (
            <MenuItem key={subCategory} value={subCategory}>
              <Checkbox
                checked={units.sub_category.indexOf(subCategory) > -1}
                onChange={() => handleToggle1(subCategory)}
              />
              <ListItemText primary={subCategory} />
            </MenuItem>
          ))}
        </Select>
                    </div>
                    <div className='col-md-6'></div>

                    <div className="col-md-6"><label className="labels">Block</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,block:e.target.value})}>
                    <option>---choose---</option>
                    {
                                project.add_block.map((item)=>
                                (
                                  <option>{item.block_name}</option>
                                ))
                               }
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Size</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,size:e.target.value})}>
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
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlekhewatnochange(index,event)}/>
                        
                      )):[]
                    }
                    </div>

                    <div className='col-md-3' ><label className='labels'>Killa No</label>
                    {
                      Array.isArray(units.killa_no) ?
                      units.killa_no.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlekillanochange(index,event)}/>
                       
                      )):[]
                    }
                    </div>

                    <div className='col-md-3' ><label className='labels'>Share</label>
                    {
                      Array.isArray(units.share) ?
                      units.share.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlesharenochange(index,event)}/>
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
                          <option>---select---</option><option>Ground Water</option><option>Canal Water</option><option>Pond Water</option><option>Rain Water</option>
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
                          <option>---select---</option><option>100ft.</option><option>200Ft.</option>
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
                          <option>---select---</option><option>Submersible Motor(15 HP)</option><option>Sumersible Motor(20 HP)</option>
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
                                <option>---Select---</option>
                                <option>Village Link Road</option>
                                <option>Highway</option>
                                <option>Expressway</option>
                                <option>Unconstructed Road</option>
                                </select>
                    </div>

                    <div className="col-md-4"><label className="labels">Side Open</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,facing:e.target.value})}>
                                <option>---Select---</option>
                                <option>1 Side Open</option>
                                <option>2 Side Open</option>
                                <option>3 Side Open</option>
                                </select>
                    </div>

                    <div className="col-md-4"><label className="labels">Road</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,road:e.target.value})}>
                                <option>---Select---</option>
                                <option>11 Ft wide</option>
                                <option>22 Ft Wide</option>
                                <option>33 Ft Wide</option>
                                <option>60 Ft Wide</option>
                                <option>100 Ft Wide</option>
                                <option>200 Ft Wide</option>
                                </select>
                    </div>

                    <div className="col-md-4"><label className="labels">Front On Road</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,facing:e.target.value})}>
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
                                <option>---Select---</option>
                                <option>Mustraka</option>
                                <option>Individual</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">No. Of Owner</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,facing:e.target.value})}>
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
                                <option>---Select---</option>
                                <option>9 Mtr Wide</option>
                                <option>12 Mtr Wide</option>
                                <option> 18 Mtr Wide</option>
                                <option>24 Mtr Wide</option>
                                <option> 60 Mtr Wide</option>
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Ownership</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,ownership:e.target.value})}>
                                <option>---Select---</option>
                                <option>Freehold</option>
                                <option>Leasehold</option>
                                <option>Co-OPerative Society</option>
                                <option>Sale Agreement(Lal Dora)</option>
                                </select>
                    </div>
                    <div className='col-md-6'><label className="labels">Stage</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,stage:e.target.value})}>
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

                    <div className='col-md-6' ><label className='labels'>Type</label>
                     <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(e)=>setunits({...units,builtup_type:e.target.value})}>
                          <option>---Select---</option>
                       
                         {
                            // Combine all unit types for selected sub_categories
                            [...new Set(
                              units.sub_category
                                .flatMap(sub => unit_type[sub] || [])
                            )].map((item, index) => (
                              <option key={index} value={item}>{item}</option>
                            ))
                          }
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
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlelengthchange(index,event)}/>
                      )):[]
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Breadth</label>
                    {
                      Array.isArray(units.bredth) ?
                      units.bredth.map((item,index)=>
                      (
                        <input className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlebredthchange(index,event)}/>
                      
                      )):[]
                    }
                    </div>
                      <div className='col-md-2' ><label className='labels'>Total Area</label>
                    {
                      Array.isArray(units.total_area) ?
                      units.total_area.map((item,index)=>
                      (
                        <input className="form-control form-control-sm"  value={units.length[index] && units.bredth[index] ? units.length[index] * units.bredth[index] : ''} style={{marginTop:"10px"}} onChange={(event)=>handletotalarea(index,event)}/>
                    
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

                    <div className='col-md-6'><label>Occupation Date</label><input type='date'   value={units.ocupation_date} className='form-control form-control-sm' onChange={(e)=>setunits({...units,ocupation_date:e.target.value})}/></div>
                    <div className='col-md-6'><label>Age of Construction</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setunits({...units,age_of_construction:e.target.value})}/></div>
                    

                    <div className="col-md-6"><label className="labels">Furnishing Details</label><select id='subcategory'  className="form-control form-control-sm" onChange={(e)=>setunits({...units,furnishing_details:e.target.value})}>
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
                <div className="row">
                <div className="col-md-12" id='unitlocation' style={{display:"none",lineHeight:"30px"}}>
                 <div className="p-3 py-5">
                <div className="col-md-12" style={{border:"1px solid black",marginTop:"30px",padding:"10px"}}>
                <div style={{border:"1px solid black",marginTop:"10px"}}>
                
                  
                          <LoadScript
                            googleMapsApiKey="AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc"
                                                                >
                                    <GoogleMap
                              mapContainerStyle={mapStyles1}
                                zoom={13}
                                center={defaultCenter1}
                                >
                            <Marker
                              position={{ lat: defaultCenter1.lat, lng: defaultCenter1.lng }}
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

                <div id="ownerdetails" style={{padding:"5px",display:"none"}}>
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
                     {selectedcontact1.length >= 0 && (
                      <div className="contact-details">
                        <table  style={{width:"100%"}}>
                          
                          <tbody>
                          {selectedcontact1.map(contact => (
                              <StyledTableRow>
                                <img style={{height:"70px",width:"80px"}} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt=""></img>
                                <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                    {contact.title} {contact.first_name} {contact.last_name}<br></br>
                                    <SvgIcon component={EmailIcon} />
                                    <span>{contact.email}</span>
                                </StyledTableCell>

                                <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                  {contact.mobile_no.map((number, index) => (
                                    <span key={index}>
                                      <SvgIcon component={PhoneIphoneIcon} />
                                      {number}<br></br>
                                    </span>
                                  ))}
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
                {selectedcontact2.length >= 0 && (
                <div className="contact-details">
                    <table style={{width:"100%"}}>
                        <tbody>
                             {
                              
                              selectedcontact2.map(contact => (
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


            <div id="uploadmedia" style={{padding:"5px",display:"none"}}>
               
               <div className="d-flex justify-content-between align-items-center mb-3">
                     <h6 className="text-right">Upload Images</h6>
                 </div><hr></hr>
                 <div className="row mt-2">
                 <table style={{marginLeft:"25px"}}>
                 <thead >
                   <tr>
                     <th style={{width:"100px"}}>#</th>
                     <th style={{width:"400px",textAlign:"center"}}>Preview</th>
                     <th style={{width:"300px",textAlign:"center"}}>Description</th>
                     <th style={{width:"300px",textAlign:"center"}}>Category</th>
                     <th style={{width:"150px",textAlign:"center"}}>Action</th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr>
                       <td>
                       {
                       Array.isArray(units.s_no)?
                       units.s_no.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                   <input 
                                     type="text"
                                     className="form-control form-control-sm"
                                     
                                     onChange={(event) => handlesnochange(index, event)}
                                   />
                                   
                                 </div>
                               )):[]}
                       </td>
                       <td>
                       {
                       Array.isArray(units.preview)?
                       units.preview.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                   <input 
                                   name="preview"
                                     type="file"
                                     className="form-control form-control-sm"
                                     multiple
                                     onChange={(event) => handlepreviewchange(index, event)}
                                   />
                                     {name.previewUrls && name.previewUrls.map((url, idx) => (
                                         <img key={idx} src={url} alt={`preview ${index}-${idx}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                       ))}
                                 </div>
                               )):[]}
                       </td>
                       <td>
                       {Array.isArray(units.descriptions)?
                       units.descriptions.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                   <input 
                                     type="text"
                                     className="form-control form-control-sm"
                                   
                                     onChange={(event) => handledescriptionchange(index, event)}
                                   />
                                   
                                 </div>
                               )):[]}
                       </td>
                       <td>
                       {Array.isArray(units.category)?
                       units.category.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                   <select className="form-control form-control-sm" required="true" onChange={(event) => handlecategorychange(index, event)}>
                                       <option>select</option>
                                       <option>Bedroom</option>
                                       <option>Hall</option>
                                       <option>Kitchen</option>
                                       <option>Balcony</option>
                                       <option>Washroom</option>
                                       <option>Pooja Room</option>
                                       <option>Dining Room</option>
                                       <option>Drawing Room</option>
                                       </select>
                                 </div>
                               )):[]}
                       </td>
                       <td>
                       {Array.isArray(units.action10)?
                       units.action10.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                 
                                   <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteallunit(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                 </div>
                               )):[]}
                       </td>

                       </tr>
                     </tbody>
               </table>
                   </div>
                   <div className="row mt-4">
                   <div className="col-md-3" style={{marginLeft:"70%"}} onClick={addFnunit}><button className="form-control form-control-sm">Add Image</button></div>
                 </div>
                 <div className="d-flex justify-content-between align-items-center mb-3">
                     <h6 className="text-right">Upload Videos</h6>
                 </div><hr></hr>
                 <div className="row mt-2">
                 <table style={{marginLeft:"25px"}}>
                 <thead >
                   <tr>
                     <th style={{width:"100px",textAlign:"center"}}>SR.NO.</th>
                     <th style={{width:"950px",textAlign:"center"}}>URL</th>
                     <th style={{width:"150px",textAlign:"center"}}>Action</th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr>
                       <td>
                       {Array.isArray(units.s_no1)?
                       units.s_no1.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                   <input 
                                     type="text"
                                     className="form-control form-control-sm"
                                     value={name}
                                     onChange={(event) => handlesno1change(index, event)}
                                   />
                               
                                 </div>
                               )):[]}
                       </td>
                       <td>
                       {Array.isArray(units.url)?
                       units.url.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                   <input 
                                     type="text"
                                     className="form-control form-control-sm"
                                     value={name}
                                     onChange={(event) => handleurlChange(index, event)}
                                   />
                                   
                                 </div>
                               )):[]}
                               
                       </td>
                       <td>
                       {Array.isArray(units.action11)?
                       units.action11.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                 
                                   <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteallunit1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                 </div>
                               )):[]}
                       </td>
                       </tr>
                     </tbody>
               </table>

               </div>
                 <div className="row mt-4">
                 <div className="col-md-3" style={{marginLeft:"70%"}} onClick={addFnunit1}><button className="form-control form-control-sm">Add Video Link</button></div>
                
                 
                 <div className="col-md-12"><hr></hr></div>
           
                               
                             
                                
                                 <div className="col-md-2"></div>
                 
                                 </div>
               </div>

               <div id="documentform" style={{padding:"5px",display:"none"}}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                </div><hr></hr>

             

                <div className="row mt-2">

                <div className='col-md-3' ><label className='labels'>Document Name</label>
                    {
                      Array.isArray(units.document_name) ?
                      units.document_name.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" onChange={(event)=>handledocumentnamechange(index,event)} style={{marginTop:"5px"}}>
                        <option>Choose</option>
                        <option>Aadhar Card</option>
                        <option>Pan Card</option>
                        <option>Voter Id</option>
                        <option>Passport</option>
                        <option>Driving Licence</option>
                        <option>Other</option>
                        </select>
                        
                      )):[]
                    }
                    </div>

                    <div className='col-md-2' ><label className='labels'>Document No</label>
                    {
                      Array.isArray(units.document_no) ?
                      units.document_no.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm"onChange={(event)=>handledocumentnochange(index,event)} style={{marginTop:"5px"}} />
                        
                      )):[]
                    }
                    </div>

                    <div className='col-md-2' ><label className='labels'>Date</label>
                    {
                      Array.isArray(units.document_Date) ?
                      units.document_Date.map((item,index)=>
                      (
                        <input type="date" className="form-control form-control-sm"onChange={(event)=>handledocumentdatechange(index,event)} style={{marginTop:"5px"}} />
                        
                      )):[]
                    }
                    </div>

                    {/* <div className='col-md-2' id="suggestion-box" style={{ position: 'relative' }}><label className='labels'>Linked Contact</label>
                    {
                      Array.isArray(units.linkded_contact) ?
                      units.linkded_contact.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" value={units.linkded_contact} onChange={(event)=>handlelinkedcontactchange(index,event)} style={{marginTop:"5px"}} />
                        
                      )):[]
                    }
                    </div> */}
                        

                        {/* <div className="col-md-9" id="suggestion-box" style={{ position: 'relative' }}><label className="labels" style={{visibility:"hidden"}}>Search</label><input type="search"className="form-control form-control-sm" value={documents.linkded_contact}  placeholder="Type here For Search in Contact" required="true" onChange={(e)=>setdocuments({...documents,linkded_contact:e.target.value})}/></div> */}
                        {showSuggestions  && filteredSuggestions.length > 0 && (
                            <ul className="suggestion-list">
                              {filteredSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionClick1(suggestion,index)}>
                                  {suggestion.title} {suggestion.first_name} {suggestion.last_name}
                                </li>
                              ))}
                            </ul>
                          )}


                      <div className='col-md-3' id="suggestion-box" style={{ position: 'relative' }}><label className='labels'>Pic</label>
                    {
                      Array.isArray(units.image) ?
                      units.image.map((item,index)=>
                      (
                        <input type="file" className="form-control form-control-sm"  onChange={(event)=>handlepicchange1(index,event)} style={{marginTop:"5px"}} />
                        
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"70px"}}>
                    {
                       units.action12.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall12(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                        
                        <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>Add</label><button className="form-control form-control-sm" onClick={addFn12}>+</button></div>
                        {/* <TableContainer component={Paper} style={{height:"400px",width:"1000px",overflowY:"scroll",marginTop:"40px",marginLeft:"50px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Serial</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Document Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Linked Contact</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Number</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Date</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         Array.isArray(project.add_unit)?
         project.add_unit.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell >
             {index+1}
            </StyledTableCell>
            <StyledTableCell  >
            {item.document_name}
            </StyledTableCell>
            <StyledTableCell  >
            {item.linkded_contact}
            </StyledTableCell>
            <StyledTableCell  >
            {item.document_no}
            </StyledTableCell>
            <StyledTableCell >
            {item.document_Date}
            </StyledTableCell>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
            <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall12(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
            </StyledTableCell>
          </StyledTableRow>
        )):[]}
      </tbody>
    </Table>
    </TableContainer> */}
                  
                  </div>
              </div>



                     
               
               
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addunit}>
                Add Unit
              </Button>
              <Button variant="secondary" onClick={handleClose3}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={show6} onHide={handleClose6} size='lg' style={{transition:"0.5s ease-in",backgroundColor:"gray"}}>
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
              <Button variant="secondary" onClick={handleClose6}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
                         
                          
                   
                         
                    </div>
                    </div>
                    </div>
{/*=======================----------------------------------------- unit details end====================------------------------------ */}


{/* -----------------------=========================aminities details===================----------------------------------------------- */}


          <div className="col-md-12" id='aminities' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
                      <div className="p-3 py-5">
                          <div className="row " >
                            <div style={{display:"flex"}}>
                          <div style={{display:"flex",gap:"50px",border:"1px solid gray",padding:"5px",borderRadius:"50px",marginLeft:"20%"}}>
                             <div  id='basicaminities1' onClick={basicaminities} style={{cursor:'pointer',fontWeight:"bold",backgroundColor:"black",color:"white",borderRadius:"50px",width:"80px",textAlign:"center",transition:"0.5s ease-out"}}>Basic </div>
                             <div  id='featuredaminities1' onClick={featuredaminities} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Featured</div>
                             <div  id='nearbyaminities1' onClick={nearbyaminities} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Nearby</div>
                         </div>
                        
                         </div>
                           <div className="row" id='basicaminities' style={{ marginTop: "20px" }}>
                           <div className='col-md-12' style={{width:"250px",marginLeft:"200px"}}><input type="checkbox" style={{transform:"scale(1.5)",marginRight:"10px"}} checked={selectAll} onChange={handleSelectAllChange}></input>Select All</div>
                              {checkboxItems.map((item, index) => (
                                <div className="col-md-6" style={{ marginTop: "20px" }} key={index}>
                                  <input
                                    type="checkbox"
                                    style={{ transform: "scale(1.5)", marginRight: "10px" }}
                                    checked={checkedItems[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                  />
                                  {item}
                                </div>
                              ))}
                        </div>
                        <div className="row" id='featuredaminities' style={{ marginTop: "20px",display:"none" }}>
                        <div className='col-md-12' style={{width:"250px",marginLeft:"200px"}}><input type="checkbox" style={{transform:"scale(1.5)",marginRight:"10px"}} checked={selectAll1} onChange={handleSelectAllChange1}></input>Select All</div>
                              {checkboxItems1.map((item, index) => (
                                <div className="col-md-3" style={{ marginTop: "20px" }} key={index}>
                                  <input
                                    type="checkbox"
                                    style={{ transform: "scale(1.5)", marginRight: "10px" }}
                                    checked={checkedItems1[index]}
                                    onChange={() => handleCheckboxChange1(index)}
                                  />
                                  {item}
                                </div>
                              ))}
                        </div>
                        <div className="row" id='nearbyaminities' style={{ marginTop: "20px",display:"none"}}>
                        <div className='col-md-12'></div><br></br>
                       
                        <div className="col-md-3"><label className='labels'>Destination</label><select id='choosedestination' className='form-control form-control-sm' onChange={(e)=>setdestinations({...destinations,destination:e.target.value})} >
                        <option>Select</option>
                              <option>Bus Stop</option>
                              <option>Railway Station</option>
                              <option>Airport</option>
                              <option>Taxi Stand</option>
                              <option>Atm</option>
                              <option>Bank</option>
                              <option>Church</option>
                              <option>Mosque</option>
                              <option>Park</option>
                              <option>Restaurants</option>
                              <option>School</option>
                              <option>Temple</option>
                              <option>Super Market</option>
                        </select>
                        </div>
                        <div className="col-md-3"><label className='labels'>Name Of Destination</label><input id='nameofdestination' type='text' className='form-control form-control-sm' onChange={(e)=>setdestinations((prevprofile)=>({...prevprofile,name_of_destination:e.target.value}))}/> </div>
                        <div className="col-md-2"><label className='labels'>Distance</label><input id='destination' type='text' className='form-control form-control-sm' onChange={(e)=>setdestinations((prevprofile)=>({...prevprofile,distance:e.target.value}))}/> </div>
                        <div className="col-md-2"><label className='labels' style={{visibility:"hidden"}}>Measurement</label><select id='measurment' className='form-control form-control-sm' onChange={(e)=>setdestinations((prevprofile)=>({...prevprofile,measurment:e.target.value}))}>
                         <option>Select</option><option>K.M</option><option>Miles</option><option>Meter</option>
                          </select>
                           </div>
                         <div className="col-md-1"><label className='labels' style={{visibility:"hidden"}} >Add</label><button className='form-control form-control-sm' onClick={adddestination}>+</button></div>
                    <div className='col-md-4'></div><br></br>
                    <div className='col-md-12'><label className='labels'>List Of Destinations</label></div>
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginTop:"40px",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Sr.</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Name Of Destination</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Type Of Destination</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Distance</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Action</StyledTableCell>
          
        </TableRow>
      </TableHead>
      <tbody>
        {
          project.nearby_aminities.map((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
              {index+1}
            </StyledTableCell>
            <StyledTableCell >{item.name_of_destination} </StyledTableCell>
            <StyledTableCell >{item.destination} </StyledTableCell>
            <StyledTableCell >{item.distance}{item.measurment} </StyledTableCell> 
            <StyledTableCell >
              <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deletedestination(index)}   style={{height:"40px",cursor:"pointer"}}/>
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
{/* ==========================-----------------------------aminities details end---------------------------------============================= */}

{/* -------------------=====================================price start==================================---------------------------------- */}

<div className="col-md-12" id='price' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
                      <div className="p-3 py-5">
                        
                        <div className="row" id='nearbyaminities' style={{ marginTop: "20px"}}>
                        <div className='col-md-12'></div><br></br>
                       
                      
                        <div className='col-md-10'><label className='labels'>Price List</label></div>
                         <div className="col-md-1"><button className='form-control form-control-sm' onClick={handleShow4}>Add</button></div>
                    <div className='col-md-12'><hr></hr></div>
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Block Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Sub Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Charge</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Taxes</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Total Price</StyledTableCell>
          
        </TableRow>
      </TableHead>
      <tbody>
        {
          project.price_list.map((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman"}}  >
             {item.block}
            </StyledTableCell>
            <StyledTableCell >{item.sub_category} </StyledTableCell>
            <StyledTableCell >{item.size} </StyledTableCell>
            <StyledTableCell >{item.blank1}</StyledTableCell> 
            <StyledTableCell >{item.blank4}</StyledTableCell> 
            <StyledTableCell >
              <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteprice(index)}   style={{height:"40px",cursor:"pointer"}}/>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show4} onHide={handleClose4} size='lg'>
            <Modal.Header>
              <Modal.Title>Price Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
              <div className='col-md-12'  style={{marginTop:"20px",display:"flex",gap:"30px"}}> <u id='baseprice1' onClick={baseprice} style={{cursor:"pointer",fontWeight:"bold"}}>Base Price</u><u id='charges1' onClick={charges} style={{cursor:"pointer",fontWeight:"bold"}}>Charges</u><u id='taxes1' onClick={taxes} style={{cursor:"pointer",fontWeight:"bold"}}>Taxes</u></div>
              <div className='row' id='baseprice' style={{marginTop:"20px",padding:"30px"}}><hr></hr>
            <div className="col-md-4"><label className="labels">Block</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,block:e.target.value})}>
                                <option>---Select---</option>
                                {
                                  project.add_block.map((item)=>
                                  (
                                    <option>{item.block_name}</option>
                                  ))
                                }
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Category</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,category:e.target.value})}>
                            <option>---Select---</option>
                       {
                        project.category.map((type)=>
                        (
                        <option>{type}</option>
                        ))
                       }
                        </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Sub Category</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,sub_category:e.target.value})}>
                    <option>---Select---</option>
                                {
                                  project.sub_category.map((item)=>
                                  (
                                    <option>{item}</option>
                                  ))
                                }
                                </select>
                    </div>
                    <div className="col-md-8"><label className="labels">Size</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,size:e.target.value})}>
                    <option>---Select---</option>
                                {
                                  project.add_size.map((item)=>
                                  (
                                    <option>{item.size_name}</option>
                                  ))
                                }
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Covered Area</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,covered_area:e.target.value})}>
                                <option>---Select---</option>
                                <option>Covered Area</option>
                                <option> Carpet Area</option>
                                <option>Total Area</option>
                                </select>
                    </div>
                    <div className='col-md-6'><label className='labels'>Base Rate</label><input type='text' className='form-control form-control-sm'></input></div><br></br>
                    <div className='col-md-6'></div>
                    </div>

                    <div className='row' id='charges' style={{marginTop:"20px",padding:"30px",display:"none"}}>
                  <div className='col-md-12'><hr></hr></div>
                  <div className="col-md-4"><label className="labels">Name</label><select className="form-control form-control-sm" onChange={handlechargenamechange}>
                                <option>---Select---</option>
                                <option>Preferred Location Charges</option>
                                <option>Amenities Charges</option>
                                <option>Govt. Charges</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Type</label>
                    {prices.chargename && (
                    <select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,chargetype:e.target.value})}>
                                <option>Select</option>
                                {chargeCategories[prices.chargename].map((charge, index) => (
                                  <option key={index} value={charge}>
                                    {charge}
                                  </option>
                                ))}
                                </select>
                    )}
                    </div>
                    <div className='col-md-4'></div>

                    <div className="col-md-4"><label className="labels">Calculation ype</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,calculation_type:e.target.value})}>
                                <option>Select</option>
                                <option>Calculate</option>
                                <option>Absolute</option>
                              
                                </select>
                    </div>
                    <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>blank1</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setprices({...prices,blank1:e.target.value})}></input></div><br></br>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>blank2</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,blank2:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>blank3</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,blank3:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    </div>
                    <div className='row' id='taxes' style={{marginTop:"20px",padding:"30px",display:"none"}}>
                  <div className='col-md-12'><hr></hr></div>
                  <div className="col-md-5"><label className="labels">Name</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,name1:e.target.value})}>
                                <option>Select</option>
                                <option>Goods and Service Tax(GST)</option>
                                <option>Registration Charges</option>
                                <option>Stamp Duty</option>
                                </select>
                    </div>
                    <div className="col-md-5"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,type1:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-2'></div>

                    <div className="col-md-4"><label className="labels">Calculation ype</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,calculation_type1:e.target.value})}>
                                <option>---Select---</option>
                                <option>Calculate</option>
                                <option>Absolute</option>
                               
                                </select>
                    </div>
                    <div className='col-md-4'><label className='labels' style={{visibility:"hidden"}}>blank4</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setprices({...prices,blank4:e.target.value})}></input></div><br></br>
                   </div>
                  </div>
    </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addprice}>
                Add Price
              </Button>
              <Button variant="secondary" onClick={handleClose4}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

    <div className='col-md-10' style={{marginTop:"10px"}}><label className='labels'>Payment Plan</label></div>
    <div className='col-md-1' style={{marginTop:"10px"}}><button className='form-control form-control-sm' onClick={handleShow5}>Add</button></div>
                    <div className='col-md-12'><hr></hr></div>
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Serial</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Plan Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Action</StyledTableCell>
          
        </TableRow>
      </TableHead>
      <tbody>
        {
          project.Payment_plan.map((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "14px" }}  >
              {index+1}
            </StyledTableCell>
            <StyledTableCell >{item.payment_planname} </StyledTableCell>
            <StyledTableCell >
              <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deletepayment(index)}   style={{height:"40px",cursor:"pointer"}}/>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>
    <Modal show={show5} onHide={handleClose5} size='xl'>
            <Modal.Header>
              <Modal.Title>Add Payment Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
              <div className='col-md-6'><label className='labels'>Payment Plan Name</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setpayments({...payments,payment_planname:e.target.value})}></input></div>
              <div className='col-md-6'></div>

              <div className='col-md-4'><label className='labels'>Step Name</label>
            {
              payments.step_name.map((item,index)=>
              (
                <input type='text' className='form-control form-control-sm' style={{marginTop:"10px"}} onChange={(event)=>handlestepnamechange(index,event)}></input>
              ))
            }
            </div>
            <div className='col-md-2'><label className='labels' style={{width:"200px"}}>Calculation Type</label>
            {
              payments.calculation_type.map((item,index)=>
              (
              <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlecalculationtypechange(index,event)}>
                <option>---Select---</option>
                <option>Calculate</option>
                <option>Absolute</option>
                
                </select>
              ))
            }
            </div>

            <div className='col-md-1'><label className='labels' style={{visibility:"hidden"}}>Blank1</label>
             {
              payments.blank1.map((item,index)=>
              (
                <input type='text'style={{marginTop:"10px"}} className='form-control form-control-sm'onChange={(event)=>handleblank1change(index,event)}></input>
                
              ))
            }
            </div>

            <div className='col-md-1'><label className='labels' style={{visibility:"hidden"}}>Blank2</label>
            {
              payments.blank2.map((item,index)=>
              (
               <input type='text' style={{marginTop:"10px"}} className='form-control form-control-sm' onChange={(event)=>handleblank2change(index,event)}></input>
               
              ))
            }
             </div>

             <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>Blank3</label>
              {
              payments.blank3.map((item,index)=>
              (
                <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handleblank3change(index,event)}>
                <option>Select</option>
                <option>My Team</option>
                <option>My Self</option>
                <option>All Users</option>
                </select>
               
              ))
            }
             </div>

             <div className='col-md-1' style={{marginTop:"90px"}}>
              {
              payments.action4.map((item,index)=>
              (
               <img   src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)} style={{height:"40px",cursor:"pointer"}}/>
              ))
            }
            </div>
            <div className='col-md-1'><label className='labels' style={{visibility:"hidden"}}>add</label><button className='form-control form-control-sm' onClick={addFn4}>+</button></div>
           
           <div className='col-md-8'><label className='labels'>Terms & Condition</label>
              <textarea className='form-control form-control-sm' style={{height:"100px"}}/>
           </div>
           <div className='col-md-4'></div>
                 
                   
                  
                    
              </div>
    </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addpayment}>
                Add Payment
              </Button>
              <Button variant="secondary" onClick={handleClose5}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    
                </div>
              </div>
          </div>


          <Modal show={show7} onHide={handleClose7} size='lg'>
            <Modal.Header>
              <Modal.Title>Import Units Data</Modal.Title>
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
              {databasefieldsunit.map((dbField, idx) => (
                <option key={idx} value={dbField}>
                  {dbField}
                </option>
              ))}
            </select>
             {/* ✅ Suggestion Text */}
             {headerSuggestions[header] && (
              <small  style={{color:"blue"}}>{headerSuggestions[header]}</small>
            )}
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
  <h4 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "arial" }}>
    New Units
  </h4>

  <div className="row">
    {pendingContacts.map((entry, index) => (
      <div key={index} className="col-md-4 mb-3">
        <div className="p-2 border rounded bg-light">
          <p className="mb-1"><strong>Project:</strong> {entry.project_name}</p>
          <p className="mb-1"><strong>Block:</strong> {entry.block}</p>
          <p className="mb-0"><strong>Unit No:</strong> {entry.unit_no}</p>
        </div>
      </div>
    ))}
  </div>

  <button
    className="btn btn-primary mt-2"
    style={{ width: "150px" }}
    onClick={addunits}
  >
    ➕ Add Units
  </button>
</div>


    <div>
  <h4 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "arial" }}>
    Duplicate Units
  </h4>

  <div className="row">
    {duplicateEntries.map((entry, index) => (
      <div key={index} className="col-md-4 mb-3">
        <div className="p-2 border rounded bg-light">
          <p className="mb-1"><strong>Project:</strong> {entry.project_name}</p>
          <p className="mb-1"><strong>Block:</strong> {entry.block}</p>
          <p className="mb-0"><strong>Unit No:</strong> {entry.unit_no}</p>
        </div>
      </div>
    ))}
  </div>

  <button className="btn btn-secondary mt-3" style={{ width: "200px" }} onClick={updateunits}>
    🔄 Update Units
  </button>
</div>

  </div>
)}

    </div>
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
            </Modal.Body>
            <Modal.Footer>
            {/* <Button variant="secondary" onClick={addpayment}>
                Import
              </Button> */}
              <Button variant="secondary" onClick={handleClose7}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

            <Modal show={show11} onHide={handleClose11} size='lg'>
            <Modal.Header>
              <Modal.Title>Import Blocks Data</Modal.Title>
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
          onChange={handleFileChangeblock1}
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
      {excelHeadersblock.length > 0 && (
  <div className="mt-4">
    <h5 className="text-lg font-semibold mb-3 text-gray-700">🗺️ Map Your Excel Columns</h5>

    <div className="row">
      {excelHeadersblock.map((header, index) => (
        <div key={index} className="col-md-4 mb-3 ">
          <div className="p-2 border rounded shadow-sm bg-light zoom-card">
            <label className="form-label fw-semibold">{header} ➝</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) =>
                setMappedFieldsblock((prev) => ({
                  ...prev,
                  [header]: e.target.value,
                }))
              }
            >
              <option value="">Select a field</option>
              {databasefieldblock.map((dbField, idx) => (
                <option key={idx} value={dbField}>
                  {dbField}
                </option>
              ))}
            </select>
             {/* ✅ Suggestion Text */}
             {/* {headerSuggestionsblock[header] && (
              <small  style={{color:"blue"}}>{headerSuggestions[header]}</small>
            )} */}
          </div>
        </div>
      ))}
    </div>

    <button
      style={{ backgroundColor: "gray", width: "200px" }}
      onClick={handleProcessFileblock}
      className="mt-3 btn btn-success fw-semibold"
    >
      ✅ Process File
    </button>
  </div>
)}


      {/* Show Processed Data */}
      {allcontactsblock.length > 0 && (
  <div className="mt-6 bg-gray-100 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">📜 Processed Data</h3>
    
    <div className="mb-4">
  <h4 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "arial" }}>
    New Blocks
  </h4>

  <div className="row">
    {pendingContactsblock.map((entry, index) => (
      <div key={index} className="col-md-4 mb-3">
        <div className="p-2 border rounded bg-light">
          <p className="mb-1"><strong>Block Name:</strong> {entry.block_name}</p>
          <p className="mb-1"><strong>Category:</strong> {entry.category}</p>
          <p className="mb-0"><strong>Sub Category:</strong> {entry.sub_category}</p>
        </div>
      </div>
    ))}
  </div>

  <button
    className="btn btn-primary mt-2"
    style={{ width: "150px" }}
    onClick={addbulkblock}
  >
    ➕ Add Blocks
  </button>
</div>


    <div>
  <h4 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "arial" }}>
    Duplicate Blocks
  </h4>

  <div className="row">
    {duplicateEntriesblock.map((entry, index) => (
      <div key={index} className="col-md-4 mb-3">
        <div className="p-2 border rounded bg-light">
          <p className="mb-1"><strong>Block Name:</strong> {entry.block_name}</p>
          <p className="mb-1"><strong>Category:</strong> {entry.category}</p>
          <p className="mb-0"><strong>Sub Category:</strong> {entry.sub_category}</p>
        </div>
      </div>
    ))}
  </div>

  <button className="btn btn-secondary mt-3" style={{ width: "200px" }}>
    🔄 Update Blocks
  </button>
</div>

  </div>
)}

    </div>
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
            </Modal.Body>
            <Modal.Footer>
            {/* <Button variant="secondary" onClick={addpayment}>
                Import
              </Button> */}
              <Button variant="secondary" onClick={handleClose11}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


           <Modal show={show10} onHide={handleClose10} size='lg'>
            <Modal.Header>
              <Modal.Title>Import Size Data</Modal.Title>
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
          onChange={handleFileChangesize1}
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
      {excelHeaderssize.length > 0 && (
  <div className="mt-4">
    <h5 className="text-lg font-semibold mb-3 text-gray-700">🗺️ Map Your Excel Columns</h5>

    <div className="row">
      {excelHeaderssize.map((header, index) => (
        <div key={index} className="col-md-4 mb-3 ">
          <div className="p-2 border rounded shadow-sm bg-light zoom-card">
            <label className="form-label fw-semibold">{header} ➝</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) =>
                setMappedFieldssize((prev) => ({
                  ...prev,
                  [header]: e.target.value,
                }))
              }
            >
              <option value="">Select a field</option>
              {databasefieldsize.map((dbField, idx) => (
                <option key={idx} value={dbField}>
                  {dbField}
                </option>
              ))}
            </select>
             {/* ✅ Suggestion Text */}
             {/* {headerSuggestionssize[header] && (
              <small  style={{color:"blue"}}>{headerSuggestionssize[header]}</small>
            )} */}
          </div>
        </div>
      ))}
    </div>

    <button
      style={{ backgroundColor: "gray", width: "200px" }}
      onClick={handleProcessFilesize}
      className="mt-3 btn btn-success fw-semibold"
    >
      ✅ Process File
    </button>
  </div>
)}


      {/* Show Processed Data */}
      {allcontactssize.length > 0 && (
  <div className="mt-6 bg-gray-100 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">📜 Processed Data</h3>
    
    <div className="mb-4">
  <h4 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "arial" }}>
    New Size
  </h4>

  <div className="row">
    {pendingContactssize.map((entry, index) => (
      <div key={index} className="col-md-4 mb-3">
        <div className="p-2 border rounded bg-light">
          <p className="mb-1"><strong>Size:</strong> {entry.size_name}</p>
          <p className="mb-1"><strong>Category:</strong> {entry.category}</p>
        </div>
      </div>
    ))}
  </div>

  <button
    className="btn btn-primary mt-2"
    style={{ width: "150px" }}
    onClick={addbulksize}
  >
    ➕ Add Sizes
  </button>
</div>


    <div>
  <h4 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "arial" }}>
    Duplicate Sizes
  </h4>

  <div className="row">
    {duplicateEntriessize.map((entry, index) => (
      <div key={index} className="col-md-4 mb-3">
        <div className="p-2 border rounded bg-light">
         <p className="mb-1"><strong>Size:</strong> {entry.size_name}</p>
          <p className="mb-1"><strong>Category:</strong> {entry.category}</p>
        </div>
      </div>
    ))}
  </div>

  <button className="btn btn-secondary mt-3" style={{ width: "200px" }}>
    🔄 Update Sizes
  </button>
</div>

  </div>
)}

    </div>
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
            </Modal.Body>
            <Modal.Footer>
            {/* <Button variant="secondary" onClick={addpayment}>
                Import
              </Button> */}
              <Button variant="secondary" onClick={handleClose10}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show8} onHide={handleClose8} size='lg'>
            <Modal.Header>
              <Modal.Title>Import Blocks Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <input type="file" accept=".xlsx,.xls" onChange={handleFileChangeblock}  id="import-file" />

            </Modal.Body>
            <Modal.Footer>
            {/* <Button variant="secondary" onClick={addpayment}>
                Import
              </Button> */}
              <Button variant="secondary" onClick={handleClose8}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

           <Modal show={show9} onHide={handleClose9} size='lg'>
            <Modal.Header>
              <Modal.Title>Import Sizes Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <input type="file" accept=".xlsx,.xls" onChange={handleFileChangesize}  id="import-file" />

            </Modal.Body>
            <Modal.Footer>
             <Button variant="secondary" onClick={addpayment}>
                Import
              </Button> 
               <Button variant="secondary" onClick={handleClose9}>
                Close
              </Button> 
             </Modal.Footer> 
           </Modal> 


{/* ===========================-----------------------------price end--------------------------=============================================== */}


                 <div className='col-md-12'><hr></hr></div> 
                    <ToastContainer/>
                </div>
                <div className='row' style={{marginLeft:"60%",marginBottom:"20px"}}>
                  <div className='col-md-4'></div>
                   <div className="col-md-4">
                    <button
                      onClick={() => navigate(-1)}
                      style={{
                        width: '100%',
                        height: '45px',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '15px',
                        letterSpacing: '0.5px',
                        backgroundColor: '#e74c3c', // classic red
                        color: '#ffffff',           // white text
                        border: '1.5px solid #e74c3c',
                        transition: 'all 0.25s ease-in-out',
                        cursor: 'pointer',
                        outline: 'none',
                        userSelect: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#c0392b'; // darker red on hover
                        e.currentTarget.style.borderColor = '#c0392b';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(192, 57, 43, 0.3)';
                        e.currentTarget.style.transform = 'scale(1.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#e74c3c';
                        e.currentTarget.style.borderColor = '#e74c3c';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Cancel
                    </button>
                  </div>


                    {/* <div className="col-md-5" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Project</button></div> */}
                    {/* <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={addproject}>Update</button></div> */}
                    <div className="col-md-4">
                      <button
                        onClick={addproject} 
                        style={{
                          width: '100%',
                          height: '45px',
                          padding: '10px 20px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '15px',
                          letterSpacing: '0.5px',
                          backgroundColor: '#27ae60', // green color for update
                          color: '#ffffff',
                          border: '1.5px solid #27ae60',
                          transition: 'all 0.25s ease-in-out',
                          cursor: 'pointer',
                          outline: 'none',
                          userSelect: 'none',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1e8449'; // darker green on hover
                          e.currentTarget.style.borderColor = '#1e8449';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
                          e.currentTarget.style.transform = 'scale(1.03)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#27ae60';
                          e.currentTarget.style.borderColor = '#27ae60';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Update
                      </button>
                    </div>

                    </div>
            </div>
        </div>
    </div>


);
}
export default EditProjectform;
