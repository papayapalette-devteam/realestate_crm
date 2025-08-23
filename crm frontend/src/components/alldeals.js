
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer,toast } from "react-toastify";
import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { utils, writeFile } from "xlsx";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import {  SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';
import api from "../api";
import '../css/deal.css';
import { toWords } from 'number-to-words';
import { CircularProgress,LinearProgress, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';  // Import ReactQuill
import Lottie from "lottie-react";
import deallogo from '../icons/deal.jpg'
import { Percent } from "@mui/icons-material";
import numWords from 'num-words';
import { FormControl, InputLabel, Select, MenuItem,IconButton} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";




function Alldeals() {

    const navigate=useNavigate()

    //========================================= loader code start============================================================

     const [animationData, setAnimationData] = useState(null);
      useEffect(() => {
        fetch("https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json")
          .then((res) => res.json())
          .then((data) => setAnimationData(data));
      }, []);

    //========================================= loader code end=============================================================

       //===================================== fetch deal data start============================================================

       React.useEffect(()=>{fetchdata()},[])
    
    
        const[data,setdata]=useState([])
        const fetchdata=async(event)=>
            {
              
              try {
                const resp=await api.get('viewdeal')
                const all=(resp.data.deal)
                setdata(all)
              } catch (error) {
                console.log(error);
              }
            
            }


const numberToIndianWords = (num) => {
  const n = Number(String(num).replace(/,/g, ''));
  if (isNaN(n) || !isFinite(n) || n > 9999999999 || n < 0) {
    return 'Invalid amount';
  }

  if (n === 0) return 'Zero Only';

  const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const numToWords = (n) => {
    let str = '';

    if (Math.floor(n / 10000000) > 0) {
      str += numToWords(Math.floor(n / 10000000)) + ' crore ';
      n %= 10000000;
    }

    if (Math.floor(n / 100000) > 0) {
      str += numToWords(Math.floor(n / 100000)) + ' lakh ';
      n %= 100000;
    }

    if (Math.floor(n / 1000) > 0) {
      str += numToWords(Math.floor(n / 1000)) + ' thousand ';
      n %= 1000;
    }

    if (Math.floor(n / 100) > 0) {
      str += numToWords(Math.floor(n / 100)) + ' hundred ';
      n %= 100;
    }

    if (n > 0) {
      if (str !== '') str += 'and ';
      if (n < 10) str += units[n];
      else if (n < 20) str += teens[n - 10];
      else {
        str += tens[Math.floor(n / 10)];
        if (n % 10 > 0) str += '-' + units[n % 10];
      }
    }

    return str.trim();
  };

  const words = numToWords(n);
  return words.charAt(0).toUpperCase() + words.slice(1) + ' Only';
};




  const [sortField, setSortField] = React.useState('');
    const [sortOrder, setSortOrder] = useState("asc");

   // Whenever sortField changes (e.g., in a useEffect)
  useEffect(() => {
    if (!sortField) return; // Or reset original data if needed

    const sorted = [...data].sort((a, b) => {
      let aVal, bVal;

      switch (sortField) {
        case "price":
          aVal = a.expected_price || 0;
          bVal = b.expected_price || 0;
          break;
        case "matchinglead":
          aVal = a.matchinglead || "";
          bVal = b.matchinglead || "";
          break;
        case "unit_number":
          aVal = a.unit_number || "";
          bVal = b.unit_number || "";
          break;
        case "usize":
          aVal = a.usize || 0;
          bVal = b.usize || 0;
          break;
        case "project":
          aVal = a.project || 0;
          bVal = b.project || 0;
          break;
        default:
          return 0;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        const cmp = aVal.localeCompare(bVal);
        return sortOrder === "asc" ? cmp : -cmp;
      } else {
        const cmp = aVal - bVal;
        return sortOrder === "asc" ? cmp : -cmp;
      }
    });

    setdata(sorted);
  }, [sortField, sortOrder]);



    //============================================= fetch deal data end=========================================================

    //================================================ fetch lead data start==================================================

       const[leaddata,setleaddata]=useState([]);
                  const fetchleaddata=async(event)=>
                  {
                    
                    try {
                      const resp=await api.get('leadinfo')
                      const all=(resp.data.lead)
                      setleaddata(all)
                
                    } catch (error) {
                      console.log(error);
                    }
                  
                  }
                  
                  
                  React.useEffect(()=>{fetchleaddata()},[])
    // =================================================fetch lead data start======================================================

    //==================================== deal auto update for matching Percent start==================================================

          const [isLoading,setIsLoading] = useState(false);


    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
 
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // in kilometers
  return distance;
}


    useEffect(() => {
      const fetchMatchingLeads = async () => {
        if (leaddata.length > 0 && data.length > 0) {
          try {
            setIsLoading(true)
            const updatedDeals = await Promise.all(
              data.map(async (singleDeal) => {
                try {
                  // const response = await api.get(
                  //   `viewprojectforinventories/${singleDeal.project}/${singleDeal.unit_number}/${singleDeal.block}`
                  // );
    
                  const unitData =flattenedUnits.find((unit)=>
                  (
                    unit.project_name==singleDeal.project &&
                    unit.unit_no==singleDeal.unit_number &&
                    unit.block==singleDeal.block
                  ))
                 
                  const availableFor = singleDeal.available_for === 'Sale' ? 'Buy' : singleDeal.available_for;
                  const price=unitData?.expected_price;
    
                  const propertytype = unitData?.category;
                  const subtype=unitData?.sub_category;
    
                  const facing=unitData?.facing;
                  const road=unitData?.road;
                  const direction=unitData?.direction;
                  
                  const unitlat= parseFloat(unitData?.lattitude) || 0;
                  const unitlang= parseFloat(unitData?.langitude || 0);
    
    
                  const matchedLeads = leaddata.filter((lead) => {
                    const leadLat = parseFloat(lead.lattitude || 0);
                    const leadLng = parseFloat(lead.longitude || 0);
                  
                    const distance = getDistanceFromLatLonInKm(unitlat, unitlang, leadLat, leadLng);
                
                    const unitsize=unitData.size
                    const match = unitsize.match(/^([\d.]+)\s+([^\(]+)\s+\(([\d.]+)\s+Sq\s+Yard\)/);
    
                      // Default values
                      let unittype = '';
                      let size = 0;
    
                      if (match) {
                        unittype = match[1] + " " + match[2].trim(); // "2 Kanal"
                        size = parseFloat(match[3]); // 4840.00
                      }
                     
                  
                    return (
                      
                      lead.requirment === availableFor &&
                      (
                        lead.facing.includes(facing) ||
                        lead.road.includes(road) ||
                        lead.direction == direction ||
                        (price >= parseFloat(lead.budget_min) && price <= parseFloat(lead.budget_max)) ||
                        lead.property_type.some(pt => propertytype.includes(pt)) ||
                        lead.sub_type.some(st => subtype.includes(st)) || 
                        lead.area_project.includes(singleDeal.project) ||
                        lead.block3.includes(singleDeal.block) ||
                        lead.specific_unit == singleDeal.unit_number || 
                        lead.unit_type.includes(unittype) || 
                        (size >= parseFloat(lead.minimum_area) && size <= parseFloat(lead.maximum_area)) ||
                        distance <= lead.range
                      )
                    );
                  });
                
                  
                  return {
                    ...singleDeal,
                    matchedleads: matchedLeads.map((lead) => lead._id),
                    matchinglead: matchedLeads.length,
                  };
                } catch (err) {
                  console.error(`Error fetching unit data for deal ${singleDeal._id}:`, err);
                  return singleDeal; // return as-is if there's an error
                }
              })
            );
    
         
    
       
        
              try {
                const response = await api.put(`dealbulkupdate`, {deals:updatedDeals});
                console.log('all dealupdated');
                
              } catch (err) {
                console.error(`Error updating deal :`, err);
              }
            
    
          } catch (error) {
            console.error("Error in fetchMatchingLeads:", error);
          }
          finally
          {
            setIsLoading(false)
          }
        }
      };
    
      fetchMatchingLeads();
    }, [data, leaddata]);


    //================================================= deal auto update for match Percent end==========================================


 

    //============================================= all fetch data of deal with condition=====================================================

      const fetchdatabystage_open=async()=>
            {
              
              try {
                const resp=await api.get(`viewdealbystage/Open`);
                setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
              } catch (error) {
                console.log(error);
              }
            }
            const[countopen,setcountopen]=useState('')
            const fetchdatabystage_opencount=async()=>
              {
                
                try {
                  const resp=await api.get(`viewdealbystage/Open`);
                  const incoming=(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
                  setcountopen(incoming.length);
                } catch (error) {
                  console.log(error);
                }
              }
             
            const fetchdatabystage_quote=async(e)=>
              {
                e.preventDefault()
                try {
                  const resp=await api.get(`viewdealbystage/Quote`);
                   setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
                } catch (error) {
                  console.log(error);
                }
              }
              const[countquote,setcountquote]=useState('')
              const fetchdatabystage_quotecount=async()=>
                {
                  
                  try {
                    const resp=await api.get(`viewdealbystage/Quote`);
                    const quote=(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
                    setcountquote(quote.length);
                    
                  } catch (error) {
                    console.log(error);
                  }
                }
              
              const fetchdatabystage_Negotiation=async()=>
                {
                  
                  try {
                    const resp=await api.get(`viewdealbystage/Negotiation`);
                    setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal])
                  } catch (error) {
                    console.log(error);
                  }
                }
                const[countnegotiation,setcountnegotiation]=useState('')
                const fetchdatabystage_Negotiationcount=async()=>
                  {
                    
                    try {
                      const resp=await api.get(`viewdealbystage/Negotiation`);
                      const negotiation=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                      setcountnegotiation(negotiation.length)
                    } catch (error) {
                      console.log(error);
                    }
                  }
    
                  const fetchdatabystage_booked=async()=>
                    {
                      
                      try {
                        const resp=await api.get(`viewdealbystage/Booked`);
                        setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal])
                      } catch (error) {
                        console.log(error);
                      }
                    }
                    const[countbooked,setcountbooked]=useState('')
                    const fetchdatabystage_bookedcount=async()=>
                      {
                        
                        try {
                          const resp=await api.get(`viewdealbystage/Booked`);
                          const booked=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                          setcountbooked(booked.length)
                        } catch (error) {
                          console.log(error);
                        }
                      }
                  const[countwon,setcountwon]=useState('')
                  const fetchdatabystage_woncount=async()=>
                    {
                      
                      try {
                        const resp=await api.get(`viewdealbystage/Won`);
                        const Won=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                        setcountwon(Won.length)
                      } catch (error) {
                        console.log(error);
                      }
                    }
                    const[countlost,setcountlost]=useState('')
                    const fetchdatabystage_lostcount=async()=>
                      {
                        
                        try {
                          const resp=await api.get(`viewdealbystage/Lost`);
                          const Lost=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                          setcountlost(Lost.length)
                        } catch (error) {
                          console.log(error);
                        }
                      }
    
                      const[countreject,setcountreject]=useState('')
                      const fetchdatabystage_rejectcount=async()=>
                        {
                          
                          try {
                            const resp=await api.get(`viewdealbystage/Lost`);
                            const reject=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                            setcountreject(reject.length)
                          } catch (error) {
                            console.log(error);
                          }
                        }
      
                       React.useEffect(()=>{fetchdatabystage_opencount()},[])  
                      React.useEffect(()=>{fetchdatabystage_quotecount()},[]) 
                      React.useEffect(()=>{fetchdatabystage_Negotiationcount()},[]) 
                      React.useEffect(()=>{fetchdatabystage_bookedcount()},[])
                      React.useEffect(()=>{fetchdatabystage_woncount()},[]) 
                      React.useEffect(()=>{fetchdatabystage_lostcount()},[])
                      React.useEffect(()=>{fetchdatabystage_rejectcount()},[])
    

    //========================================== all fetch data of deal with condition end================================================

    // ========================================show 5 and 6 modal code start=======================================================

    
                      const[dealdata,setdealdata]=useState([])
                      const[note,setnote]=useState(dealdata.descriptions)
    
    
                      const [show6, setshow6] = useState(false);
                      
                      const handleClose6 = () => setshow6(false);
                      
                         const handleShow6=async()=>
                          { 
                            setshow6(true);
                            try {
                              const resp=await api.get(`viewdealbyid/${selectedItems}`)
                              setdealdata(resp.data.deal)
                            } catch (error) {
                              console.log(error);
                            }
                          }
    
                          const updatedealdata = async () => {
                            try {
                              const id = selectedItems;  // Assuming selectedItems is the ID of the lead to update
                              const data = {remarks:note,stage:updatestage };  // Send only the stage field in the request body
                          
                              const resp = await api.put(`updatedealbysingle/${id}`, data);  // Send the request with only stage in the body
                          
                              toast.success("Deal Updated Successfully...", { autoClose: 2000 });
                          
                              // After success, navigate to the lead details page or reload
                              setTimeout(() => {
                                navigate('/dealdetails');
                              }, 2000);
                              setTimeout(() => {
                                window.location.reload();  // If necessary, reload the page
                              }, 2000);
                            } catch (error) {
                              console.log(error);
                            }
                          };

         const [show5, setshow5] = useState(false);
                          const[updatestage,setupdatestage]=useState(dealdata.stage)
    
                          const handleClose5 = () => setshow5(false);
                          const handleShow5=async()=>
                            { 
                              setshow5(true);
                              try {
                                const resp=await api.get(`viewdealbyid/${selectedItems}`)
                                setdealdata(resp.data.deal)
                               
                              } catch (error) {
                                console.log(error);
                              }
                            }

    // ==========================================show 5 and 5 modal code end=============================================================

//========================================== export to excel code start==========================================================


     const exportToExcel = () => {
      const filteredData = data.map(({ developer,block_tower, project,unit_number,location,linkded_contact,ownership,facing}) => ({ developer,block_tower, project,unit_number,location,linkded_contact,ownership,facing }));
      // Create a new workbook
      const workbook = utils.book_new();
    
      // Convert data to a worksheet
      const worksheet = utils.json_to_sheet(filteredData);
    
      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
      // Export the workbook to an Excel file
      writeFile(workbook, "inventory_data.xlsx");
    };

// ==========================================export to excel code end==================================================================

//==========================================deal suggestion box for search code start================================================================

React.useEffect(()=>{fetchalldealdata()},[])


const[alldealdata,setalldealdata]=useState([])
const fetchalldealdata=async(event)=>
    {
      
      try {
        const resp=await api.get('viewdeal')
        const all=(resp.data.deal)
        setalldealdata(all)
      } catch (error) {
        console.log(error);
      }
    
    }


const [searchTerm, setSearchTerm] = useState('');
const [suggestions, setSuggestions] = useState([]);

                const handleSearchChange = (e) => {
                  const value = e.target.value;
                  setSearchTerm(value);

                  if (value.trim() === '') {
                    setSuggestions([]);
                    fetchdata()
                    return;
                  }

                  const filtered = alldealdata.filter(item =>
                    (item.project && item.project.toLowerCase().includes(value.toLowerCase())) ||
                    (item.block && item.block.toLowerCase().includes(value.toLowerCase())) ||
                    (item.unit_number && item.unit_number.toLowerCase().includes(value.toLowerCase()))
                  );

                  setSuggestions(filtered);
                  setdata(filtered) // Limit to 5 suggestions
                };

                const handleSuggestionClickdeal = (item) => {
                  setSearchTerm(`${item.project} - ${item.block} - ${item.unit_number}`);
                  setSuggestions([]);
                  setdata([item])
                  // You can also do something with the selected item (e.g. set selectedDeal)
                };
                



//==============================================deal suggestion box for search code end==================================================


//=================================================== delete deal start============================================================

  const deletedealSelectedItems = async () => {
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
              await api.delete(`removedeal/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };

//================================================== delete deal end=======================================================================

// ================================pagination and all coloumns with selected items start================================================

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


      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10); // User-defined items per page
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
              <button onClick={goToPreviousPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px',height:"30px" }}>
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
                  height:"30px",
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
              <button onClick={goToNextPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px',height:"30px" }}>
                Next
              </button>
            )}
          </div>
        );
      };
      

      const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'owner_details', name: 'Owner_Details' },
        { id: 'associated_contact', name: 'Associated_Contact' },
        { id: 'expected_price', name: 'Expectation' },
        { id: 'matchinglead', name: 'Matched_Lead' },
        { id: 'stage', name: 'Status' },
        { id: 'user', name: 'Assigned_To' },
        { id: 'remarks', name: 'Remarks' },
        { id: 'follow_up', name: 'Follow_Up' },
        { id: 'last_contacted', name: 'Last_Contacted_Date_&_Time' },
        { id: 'available_for', name: 'Available For' },
        { id: 'mobile_type', name: 'Mobile Type' },
        { id: 'email_type', name: 'Email Type' },
        { id: 'designation', name: 'Designation' },
        { id: 'company_name', name: 'Company Name' },
        { id: 'tags', name: 'Tags' },
        { id: 'father_husband_name', name: 'Father/Husband Name' },
        { id: 'h_no', name: 'House No' },
        { id: 'area1', name: 'Street Address' },
        { id: 'location1', name: 'Location' },
        { id: 'city1', name: 'City' },
        { id: 'pincode1', name: 'Pincode' },
        { id: 'state1', name: 'State' },
        { id: 'country1', name: 'Country' },
        { id: 'source', name: 'Source' },
        { id: 'category', name: 'Category' },
        { id: 'profession_category', name: 'Profession Category' },
        { id: 'profession_subcategory', name: 'Profession Dub-Category' },
        { id: 'company_name', name: 'Company Name' },
        { id: 'country_code1', name: 'Country Code' },
        { id: 'company_phone', name: 'Company Phone' },
        { id: 'company_email', name: 'Company Email' },
        { id: 'owner', name: 'Owner' },
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
      const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 11));
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

// ========================================== pagination and all coloumns with selected items end===========================================


 //=========================================== matched lead code start=========================================================

                  const [matchedLeads, setMatchedLeads] = useState([]);

                  const[fetchingdeal,setfeatchingdeal]=useState([])
                  const dealallColumns = [
                    // { id: 'unit_number', name: 'Unit Number' },
                    // { id: 'location', name: 'Project Name' },
                    // { id: 'block', name: 'Block' },
                    { id: 'available_for', name: 'For' },
                    { id: 'ucategory', name: 'Category' },
                    { id: 'u_subcategory', name: 'Sub_Category' },
                    { id: 'unit_type', name: 'Unit_Type' },
                    { id: 'location', name: 'Location' },
                    { id: 'facing', name: 'Facing' },
                    { id: 'road', name: 'Road' },
                    { id: 'direction', name: 'Direction' },
                
                    { id: 'size', name: 'Size' },
                    { id: 'price', name: 'Price' }
                  ]

                  const leadallColumns = [
                    { id: 'score', name: 'Score' },
                
                    { id: 'lead_details', name: 'Lead_Details' },
                    { id: 'matched_percentange', name: 'Matched(%)' },
                    
                    { id: 'requirment', name: 'Requirment' },
                    { id: 'budget', name: 'Budget' },
                    { id: 'stage', name: 'Stage' },
                    { id: 'source', name: 'Source' },
                    { id: 'recived_on', name: 'Recived_On' },
                    { id: 'site_visit', name: 'Site_Visit' }
                  
                  ]
                    
                    
                  const [show1, setshow1] = useState(false);
    
                  const handleClose1 = () => 
                    {
                      setshow1(false);
                    
                      
                    }
                  const handleShow1=()=>
                  {
                    
                    setshow1(true);
                   
                  }

                  const[deal1,setdeal1]=useState([])
                  const[lead1,setlead1]=useState([])
                  const[deallocation,setdeallocation]=useState("")

           

              const handleMatchLeadClick = async (item) => {
                    try {
                      setIsLoading(true)
                      handleShow1();
                      setMatchedLeads([]);

                      setdeal1([item]);
                      setdeallocation(item.location);
                      setlead1(item.matchedleads);

                      const response = await api.get(`viewprojectforinventories/${item.project}/${item.unit_number}/${item.block}`);
                      setfeatchingdeal(response.data.project.add_unit[0]);

                      if (!item.matchedleads || item.matchedleads.length === 0) return;

                      const project = item.project;
                      const block = item.block;
                      const unit = item.unit_number;
                      const price = item.expected_price;
                      const propertytype = Array.isArray(response.data.project.add_unit[0].category) 
                        ? response.data.project.add_unit[0].category 
                        : [response.data.project.add_unit[0].category];
                      const subtype = Array.isArray(response.data.project.add_unit[0].sub_category) 
                        ? response.data.project.add_unit[0].sub_category 
                        : [response.data.project.add_unit[0].sub_category];
                      const unittype = response.data.project.add_unit[0].unit_type;
                      const facing = response.data.project.add_unit[0].facing;
                      const road = response.data.project.add_unit[0].road;
                      const city = response.data.project.add_unit[0].ucity;
                      const direction = response.data.project.add_unit[0].direction;

                      const deallat = parseFloat(response.data.project.add_unit[0].lattitude);
                      const deallang = parseFloat(response.data.project.add_unit[0].langitude);

                      const unitsize=response.data.project.add_unit[0].size
                      const match = unitsize.match(/^([\d.]+)\s+([^\(]+)\s+\(([\d.]+)\s+Sq\s+Yard\)/);
      
                        // Default values
                        let unittypeofsize = '';
                        let size = 0;
      
                        if (match) {
                          unittypeofsize = match[1] + " " + match[2].trim(); // "2 Kanal"
                          size = parseFloat(match[3]); // 4840.00
                        }
                      

                      const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
                        const R = 6371; // Radius of the earth in km
                        const dLat = (lat2 - lat1) * Math.PI / 180;
                        const dLon = (lon2 - lon1) * Math.PI / 180;
                        const a =
                          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                          Math.cos(lat1 * Math.PI / 180) *
                          Math.cos(lat2 * Math.PI / 180) *
                          Math.sin(dLon / 2) * Math.sin(dLon / 2);
                  
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        return R * c;
                      };

                      const updatedLeads = item.matchedleads.map((lead) => {
                        let matchScore = 0;
                        let score=0;

                        if (lead.city3 === city) matchScore += 5;

                        if (lead.area_project.includes(project)) matchScore += 5;
                        if (
                          Array.isArray(lead.area_project) &&
                          lead.area_project.length > 0 &&
                          !(lead.area_project.length === 1 && lead.area_project[0].trim() === '')
                        ) {
                          score += 2;
                        }

                        if (lead.block3.includes(block)) matchScore += 5;

                        if (lead.specific_unit && lead.specific_unit.trim() === unit) matchScore += 10;

                        if (price >= parseFloat(lead.budget_min) && price <= parseFloat(lead.budget_max)) matchScore += 5;
                            const twentyFivePercent = 1.25 * parseFloat(lead.budget_max);
                            if (price === lead.budget_max || price === lead.budget_min) {
                              score += 10;
                            } else if (price >= twentyFivePercent) {
                              score += 2;
                            } else if (
                              price <= twentyFivePercent) {
                              score += 6;
                            }

                        if (size >= parseFloat(lead.minimum_area) && size <= parseFloat(lead.maximum_area)) matchScore += 5;

                        if (lead.unit_type.includes(unittypeofsize)) matchScore += 5;
                        if (
                          Array.isArray(lead.unit_type) &&
                          lead.unit_type.length > 0 &&
                          !(lead.unit_type.length === 1 && lead.unit_type[0].trim() === '')
                        ) {
                          score += 2;
                        }

                        if (
                          Array.isArray(lead.property_type) &&
                          propertytype.some(type =>
                            lead.property_type.some(leadType =>
                              leadType.toLowerCase().includes(type.toLowerCase())
                            )
                          )
                        ) {
                          matchScore += 10;
                        }
                        if (
                          Array.isArray(lead.property_type) &&
                          lead.property_type.length > 0 &&
                          !(lead.property_type.length === 1 && lead.property_type[0].trim() === '')
                        ) {
                          score += 2;
                        }
                        

                        
                        if (
                          Array.isArray(lead.sub_type) &&
                          subtype.some(type =>
                            lead.sub_type.some(leadType =>
                              leadType.toLowerCase().includes(type.toLowerCase())
                            )
                          )
                        ) {
                          matchScore += 10;
                        }
                        if (
                          Array.isArray(lead.sub_type) &&
                          lead.sub_type.length > 0 &&
                          !(lead.sub_type.length === 1 && lead.sub_type[0].trim() === '')
                        ) {
                          score += 2;
                        }
                        
                        // if (unittype === lead.unit_type2) matchScore += 10;
                         if (lead.unit_type2.includes(unittype)) matchScore += 10;
                        if (lead.unit_type2 && lead.unit_type2.length !=0) score += 1;

                        if (lead.facing.includes(facing)) matchScore += 5;
                        if (
                          Array.isArray(lead.facing) &&
                          lead.facing.length > 0 &&
                          !(lead.facing.length === 1 && lead.facing[0].trim() === '')
                        ) {
                          score += 1;
                        }

                        if (lead.road.includes(road)) matchScore += 5;
                        if (
                          Array.isArray(lead.road) &&
                          lead.road.length > 0 &&
                          !(lead.road.length === 1 && lead.road[0].trim() === '')
                        ) {
                          score += 1;
                        }
                        
                        if (lead.direction.includes(direction)) matchScore += 10;
                        // if (lead.direction && lead.direction === direction) matchScore += 10;
                        if (lead.direction && lead.direction.length !=0) score += 1;

                        if (lead.timeline) {
                          switch (lead.timeline) {
                            case "Urgent":
                              matchScore += 10;
                              score +=10;
                              break;
                            case "Within 15 days":
                              matchScore += 7.5;
                              score +=7;
                              break;
                            case "More then 1 month":
                              matchScore += 5;
                              score +=5;
                              break;
                            case "Not Confirmed":
                              matchScore += 2.5;
                              break;
                            default:
                              // optional: no points if timeline is unknown or empty
                              break;
                          }
                        }

                        if (lead.funding) {
                          switch (lead.funding) {
                            case "Self Funding":
                              score +=5;
                              break;
                              case "Home Loan":
                              case "Loan Against Property":
                              case "Personal Loan":
                              case "Business Loan":
                              score +=3;
                              break;
                            default:
                              // optional: no points if timeline is unknown or empty
                              break;
                          }
                        }

                        if (lead.transaction_type) {
                          switch (lead.transaction_type) {
                            case "Full White":
                              score +=2;
                              break;
                              case "Collecter Rate":
                              score +=5;
                              break;
                              case "Flexiable":
                              score +=5;
                              break;
                              default:
                              // optional: no points if timeline is unknown or empty
                              break;
                          }
                        }

                        
                        if (lead.source) {
                          switch (lead.source) {
                            case "Old Client":
                              score +=5;
                              break;
                            case "Walk-In":
                              score +=5;
                              break;
                            case "Friends":
                              score +=5;
                              break;
                            case "Relative":
                              score +=5;
                              break;
                            case "Hoarding":
                              score +=4;
                              break;
                            case "Channel Partner":
                              score +=5;
                              break;
                            case "SMS":
                              score +=2;
                              break;
                            case "News Paper":
                              score +=3;
                              break;
                            case "Whatsapp":
                              score +=3;
                              break;
                            case "Website":
                              score +=4;
                              break;
                            case "Cold Calling":
                              score +=3;
                              break;
                            case "Facebook":
                              score +=1;
                              break;
                            case "Instagram":
                              score +=1;
                              break;
                            case "Google":
                              score +=2;
                              break;
                            case "X":
                              score +=1;
                              break;
                            case "Linkedin":
                              score +=2;
                              break;
                            case "99 Acre":
                              score +=3;
                              break;
                            case "Magicbricks":
                              score +=3;
                              break;
                            case "Common Floor":
                              score +=3;
                              break;
                            case "Sulekha":
                              score +=3;
                              break;
                            case "Housing":
                              score +=3;
                              break;
                            case "Square Yard":
                              score +=3;
                              break;
                            case "OLX":
                              score +=3;
                              break;
                            case "Real Estate India":
                              score +=3;
                              break;
                              default:
                              // optional: no points if timeline is unknown or empty
                              break;
                          }
                        }
                 


                        let locationMatch = 0;
                        let locationscore=0
                    if (lead.lattitude && lead.longitude) {
                      const leadLat = parseFloat(lead.lattitude);
                      const leadLng = parseFloat(lead.longitude);
                      
                      const distance = getDistanceInKm(deallat, deallang, leadLat, leadLng);

                  
                      
                      if (distance <= 1) locationMatch = 25;
                      else if (distance <= 2) locationMatch = 17;
                      else if (distance <= 3) locationMatch = 15;
                      else if (distance <= 4) locationMatch = 12;
                      else if (distance <= 5) locationMatch = 10;
                      else if (distance <= 8) locationMatch = 7;
                      else if (distance <= 11) locationMatch = 5;

                    // Second set of scores (locationscore)
                        if (distance <= 1) locationscore = 10;
                        else if (distance <= 3) locationscore = 8;
                        else if (distance <= 6) locationscore = 5;
                        else if (distance > 6) locationscore = 2;

                      matchScore += locationMatch;
                      score+=locationscore
                    }


                        return { ...lead, matchPercentage: matchScore,leadscore:score };
                      });

                      setMatchedLeads(updatedLeads);

                    } catch (error) {
                      console.error("Error fetching project details:", error);
                      Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to fetch project details. Please try again later.',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK',
                      });
                    
                    } finally
                    {
                      setIsLoading(false)
                    }
                  };

                  
              
                  
                  // useEffect(() => {
                  //   if (!lead1 || lead1.length === 0) return; // Exit if no leads
                    
                  //   const project = deal1[0].project;
                  //   const block = deal1[0].block;
                  //   const unit = deal1[0].unit_number;
                  //   const price = deal1[0].expected_price;
                  //   const propertytype = Array.isArray(fetchingdeal.category) ? fetchingdeal.category : [fetchingdeal.category];
                  //   const unittype = fetchingdeal.unit_type;
                  //   const facing = fetchingdeal.facing;
                  //   const road = fetchingdeal.road;
                  //   const city = fetchingdeal.ucity;
                  //   const direction = fetchingdeal.direction;
                  
                  
                  //   // Process each lead
                  //   const updatedLeads = lead1.map((item) => {
                  //     let matchScore = 0;
                  
                  //     // **Matching Conditions (Total: 100%)**
                      
                  //     // **Major Matches (50%)**
                  //     if (item.city2 === city) matchScore += 15; // 15%
                  //     if (item.area2.includes(project)) matchScore += 15; // 15%
                  //     if (item.block.includes(block)) matchScore += 10; // 10%
                  //     if (item.specific_unit && item.specific_unit.trim() !== "" ? item.specific_unit === unit : true) matchScore += 10; // 10%
                  
                  //     // **Other Conditions (50%)**
          
                  //     if (price >= parseFloat(item.budget_min) && price <= parseFloat(item.budget_max)) matchScore += 10; // 10%
                  //     if (Array.isArray(item.property_type) && propertytype.some(type => item.property_type.includes(type))) matchScore += 10; // 10%
                  //     if (unittype === item.unit_type2) matchScore += 10; // 10%
                  //     if (item.facing.includes(facing)) matchScore += 5; // 5%
                  //     if (item.road.includes(road)) matchScore += 5; // 5%
                  //     if (item.direction === direction) matchScore += 10; // **Now 10% instead of 5%**

                  
                  //     // **Final Match Percentage**
                  //     const matchPercentage = matchScore;
                  //     return { ...item, matchPercentage };
                  //   });
                  
                  //   setMatchedLeads(updatedLeads);
                  
                  // }, [lead1, deal1, fetchingdeal]);
                  
                  



               
                  const [selectedItems1, setSelectedItems1] = useState([]); // To track selected rows
                  const [selectAll1, setSelectAll1] = useState(false);
                  const handleSelectAll1 = () => {
                   
                    
                    setSelectAll1(!selectAll1);
                    if (!selectAll1) {
                      // Add all current page item IDs to selectedItems
                      setSelectedItems1(lead1.map((item) => item._id));
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

                  const [removedColumns, setRemovedColumns] = useState([]);

                  // Track visibility of '-' buttons for column removal
                  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
                
                  // Handle filter icon click to toggle visibility of '-' buttons
                  const handleFilterClick = () => {
                    setShowRemoveButtons((prev) => !prev); // Toggle visibility of '-' buttons
                  };
                
                  // Handle column removal (when `-` icon is clicked)
                  const handleColumnRemove = (colId) => {
                    setRemovedColumns((prev) => [...prev, colId]); // Add the column ID to removedColumns
                  };

               

           
                  
                  
                  

                 
                  // useEffect(() => {
                  //   const filterLeadsByRemovedColumns = () => {
                  //      let newFilteredLeads = [...leaddata];
                  //      const price = deal1[0]?.expected_price;
                  //      const availableFor = deal1[0]?.available_for === "Sale" ? "Buy" : deal1[0]?.available_for;
                  //     if(lead1.length!==0){
                  //     // If the 'price' column is removed, don't filter based on price
                  //     newFilteredLeads = !removedColumns.includes('price')
                  //       ? leaddata.filter((item) => item.requirment === availableFor)
                  //       : leaddata.filter(
                  //           (item) =>
                  //             item.requirment === availableFor &&
                  //             price >= parseFloat(item.budget_min) &&
                  //             price <= parseFloat(item.budget_max)
                  //         );
                      
                
                  //     setlead1(newFilteredLeads); // Update filtered leads
                  //   };
                  // }

                  // if(lead1.length==0){
                  //   let newFilteredLeads = [...leaddata];
                  //   const availableForFallback =deal1[0]?.available_for === "Sale" ? "Buy" : deal1[0]?.available_for;
                  //   newFilteredLeads = leaddata.filter((item) =>
                  //     item.requirment === availableForFallback // Use availableFor as fallback
                  //   );
                  //   setlead1(newFilteredLeads);
                  // }
              
                  //   filterLeadsByRemovedColumns(); // Trigger filtering when removedColumns change
                
                  // }, [removedColumns]);
                

// =================================matched lead code end=========================================================================


// ====================================send Details code start===================================================================

         const [show12, setshow12] = useState(false);
    
                  const handleClose12 = () => 
                    {
                      setshow12(false);
                    
                      
                    }
                  const handleShow12=()=>
                  {
                    handleClose1()
                    setshow12(true);
                   
                  }


                               const sendmailfunction1=()=>
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
                                      const sendmessagefunction1=()=>
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
                          
                                        const sendwhatsappfunction1=()=>
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
                          const[unitdata,setunitdata]=useState({})
                          const[projectdata,setprojectdata]=useState({})
                        
                          useEffect(()=>
                          {
                            setunitdata(flattenedUnits?.find((unit)=>
                              (
                                unit?.project_name==deal1[0]?.project &&
                                unit?.unit_no==deal1[0]?.unit_number &&
                                unit?.block==deal1[0]?.block
                              )))
                              setprojectdata(cdata?.filter((item)=>
                              (
                                item.name==deal1[0]?.project
                              )))

                             
                          },[deal1])

                          const[builtupdetails,setbuiltupdetails]=useState("")
                          const[picture,setpicture]=useState("")
                          useEffect(()=>
                          {
                            setbuiltupdetails( unitdata?.cluter_details?.map((item, index) => {
                              const length = unitdata.length?.[index] || '-';
                              const breadth = unitdata.bredth?.[index] || '-';
                              return ` • ${item}: ${length}x${breadth} ${unitdata.measurment2[0]}.`;
                            }).join('\n')|| '• Builtup details not available')

                            const formattedpicture = Array.isArray(unitdata?.descriptions)
                            ? unitdata.descriptions.map((item) => ` ✔️ ${item}`).join('\n')
                            : '• no picture';

                            setpicture(formattedpicture)
                          },[unitdata])

                          const[aminitiesdetails,setaminitiesdetails]=useState("")
                          const[nearbyaminities,setnearbyaminities]=useState("")
                          
                          useEffect(() => {
                            const formattedAminities = Array.isArray(projectdata?.[0]?.features_aminities)
                              ? projectdata[0].features_aminities.map((item) => ` ✔️ ${item}`).join('\n')
                              : '• no aminities';
                          
                              const formattedNearby = Array.isArray(projectdata?.[0]?.nearby_aminities)
                              ? projectdata[0].nearby_aminities
                                  .map(item => ` ✔️ ${item.name_of_destination} ${item.destination} ${item.distance} ${item.measurment}`)
                                  .join('\n')
                              : '• Nearby highlights not available';
                          
                              setnearbyaminities(formattedNearby);
                            setaminitiesdetails(formattedAminities);
                          }, [projectdata]);

                          useEffect(() => {
                            if (unitdata?.preview?.length) {
                              const previewFiles = unitdata.preview.map((url) => ({
                                type: 'url',
                                name: url.split('/').pop(),
                                url,
                              }));
                              setAttachments1(previewFiles);
                            }
                          }, [unitdata?.preview]);
                          
                          
                          const [emails, setEmails] = useState([]);
                           const [number, setNumber] = useState([]);

                          useEffect(() => {
                         
                            if (Array.isArray(matchedLeads) && Array.isArray(selectedItems1)) {
                              const extractedEmails = matchedLeads
                                .filter(item => selectedItems1.some(selected => selected === item._id))
                                .flatMap(item => item.email || []);

                                const extractedmobile = matchedLeads
                                .filter(item => selectedItems1.some(selected => selected === item._id))
                                .flatMap(item => item.mobile_no || []);
                              
                                setEmails(extractedEmails)
                                setNumber(extractedmobile);
                            }
                          }, [selectedItems1, matchedLeads]);
                    

                                      const templates1 = {
                                        template1: "Hello, \n\nI hope this email finds you well. I wanted to follow up on our previous conversation regarding property. Please let me know if you have any questions.\n\nBest regards,\nDigvijay Kumar",
                                        template2: "Hi there, \n\nI just wanted to remind you about the upcoming event on [date]. It will be held at Noida. Please feel free to reach out if you need any additional information.\n\nSincerely,\nDigvijay Kumar",
                                        template3: `
                                        Dear sir/madam,
                                    
                                        Thank you for showing interest in exploring real estate opportunities with us.
                                    
                                        We are pleased to share a premium property that closely matches your preferences. Please find the details below:
                                    
                                        🔑🏠${unitdata?.size} ${Array.isArray(unitdata?.category) ? unitdata.category.join(", ") : unitdata?.category || ""} ${Array.isArray(unitdata?.sub_category) ? unitdata.sub_category.join(", ") : unitdata?.sub_category || ""}
                                        • Location: ${unitdata?.block}, ${unitdata?.project_name}
                                        • Price: ₹ ${Number(deal1[0]?.expected_price)?.toLocaleString('en-IN')}/- [Negotiable]
                                          
                                    
                                        • Facing: ${unitdata?.facing}
                                        • Direction: ${unitdata?.direction}
                                        • Road: ${unitdata?.road}
                                        • Ownership: ${unitdata?.ownership}
                                        • Registry Status: {{registry_status}}
                                        • Possession: ${projectdata[0]?.possession? projectdata[0].possession : "no date available"}
                                        • Parking: ${Array.isArray(projectdata[0]?.parking_type) ? projectdata[0].parking_type.join(',') : projectdata[0]?.parking_type}
                                    
                                        BuiltupDetails:-
                                       ${builtupdetails}	
                                    
                                        🌟 Key Amenities:
                                         ${aminitiesdetails}
                                    
                                        ✨Near By Highlights:
                                        ${nearbyaminities}
                                    
                                        Picture:
                                        ${picture}         

                                        🗓️ Want to See This Property in Person?
                                        We would love to arrange a personal site visit for you. Let us know your convenient date and time.
                                    
                                        📞 Click here to book your visit: {{booking_link}}
                                    
                                        If this property doesn’t fully match your expectations, don’t worry. We have many more listings that might interest you. Just reply with your updated preferences and we’ll tailor options accordingly.
                                    
                                        Looking forward to assisting you further.
                                    
                                        Warm regards,  
                                        Suraj Keshwar  
                                        Bharat Properties – Kurukshetra  
                                        📞 +91-9991333570  
                                        📧 bharatproperties570@gmail.com  
                                        🌐 www.bharatproperties.co
                                      `

                                        
                                      };
                                      const[message1,setmessage1]=useState("")
                                      const[subject1,setsubject1]=useState("•New Property That Matches Your Needs – Ready for Site Visit?")
                                      const [selectedTemplate1, setSelectedTemplate1] = useState('');
                                      const [attachments1, setAttachments1] = useState([]);
                          
                                      const modules11 = {
                                          toolbar: {
                                            container: "#custom-toolbar"
                                          }
                                        };
                                        
                  
                                      
                                      const handlemailmessage1=(value)=>
                                        {
                                          setmessage1(value)
                                        }


                                        const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
                                          onDrop: (acceptedFiles) => {
                                            const localFiles = acceptedFiles.map((file) => ({
                                              type: 'file',
                                              name: file.name,
                                              file,
                                            }));
                                        
                                            setAttachments1((prev) => [...prev, ...localFiles]); // keep preview files already set
                                          },
                                        });
                                        
                                        
                                        
                          
                                      const handleTemplateSelect1 = (e) => {
                                        const templateKey = e.target.value; // Get selected template key
                                        setSelectedTemplate1(templateKey); // Set the selected template
                                        const selectedTemplateContent = templates1[templateKey] || ''; // Get the template content
                                    
                                        // Convert '\n' to '<br>' for HTML email formatting
                                        const htmlFormattedMessage = selectedTemplateContent.replace(/\n/g, '<br>');
                                        
                                        // Set the message state with the formatted message (HTML-friendly)
                                        setmessage1(htmlFormattedMessage); 
                                      };
                                      

                                      const [isLoading1, setIsLoading1] = useState(false);
                                      const [currentSendingType, setCurrentSendingType] = useState("");
                                      const [sentProgress, setSentProgress] = useState(0);


                                      const sendmail1=async(e)=>
                                        {
                                          setIsLoading1(true)
                                          setCurrentSendingType("email");
                                          e.preventDefault();
                                          const formData = new FormData();
                              
                         
                                              formData.append('subject', subject1);
                                              formData.append('message', message1);
                                              formData.append('emails', emails);
                                              
                                              // Append the files to form data
                                              for (const item of attachments1) {
                                                if (item.type === 'file') {
                                                  // Already a file
                                                  formData.append('attachments', item.file);
                                                } else if (item.type === 'url') {
                                                  try {
                                                    const response = await fetch(item.url);
                                                    const blob = await response.blob();
                                                    const file = new File([blob], item.name, { type: blob.type });
                                                    formData.append('attachments', file);
                                                  } catch (error) {
                                                    console.error('Error fetching image from URL:', item.url, error);
                                                  }
                                                }
                                              }

                                          try {
                                            
                                            const resp=await api.post(`contact/sendmail`,formData)
                                            if(resp.status===200)
                                            {
                                              Swal.fire({
                                                icon:'success',
                                                title: 'Mail Sent...',
                                                text:"All Mail Send Successfully",
                                                confirmButtonColor: '#d33',
                                                confirmButtonText: 'OK',
                                              });
                                              setTimeout(() => {
                                                window.location.reload()
                                              }, 2000);
                                             
                                            }
                                           
                                          } catch (error) {
                                            toast.error(error.response.data,{ autoClose: 2000 });
                                          }finally
                                          {
                                            setIsLoading1(false)
                                          }
                                        }
                                        
                                        const modules112 = {
                                          toolbar: {
                                            container: "#custom-toolbar1"
                                          }
                                        };
                                        
                                      
                                        
                                        const handleSendwhatsapp = async () => {
                                          setIsLoading1(true);
                                          setCurrentSendingType("whatsapp");
                                          setSentProgress(0);
                                          let sentCount = 0;
                                          let errorCount = 0;
                                        
                                          try {
                                            for (let i = 0; i < number.length; i++) {
                                              const singleNumber = number[i];
                                              setSentProgress(i + 1); // 👈 update UI progress
                                        
                                              try {
                                                const res = await api.post('sendwhatsappmessage', {
                                                  number: singleNumber,
                                                  message1,
                                                  media_url: attachments1[0]?.url,
                                                });
                                        
                                                if (res.status === 200) {
                                                  sentCount++;
                                                } else {
                                                  errorCount++;
                                                }
                                              } catch (err) {
                                                errorCount++;
                                                console.error(`Failed for ${singleNumber}:`, err.message);
                                              }
                                            }
                                        
                                            Swal.fire({
                                              icon: sentCount > 0 ? 'success' : 'error',
                                              title: 'WhatsApp Summary',
                                              html: `
                                                <b>Total:</b> ${number.length}<br/>
                                                <b>Sent:</b> ${sentCount}<br/>
                                                <b>Failed:</b> ${errorCount}
                                              `,
                                              confirmButtonColor: '#d33',
                                              confirmButtonText: 'OK',
                                            });
                                            setTimeout(() => {
                                              window.location.reload()
                                            }, 2000);
                                        
                                          } catch (mainErr) {
                                            Swal.fire({
                                              icon: 'error',
                                              title: 'WhatsApp Error!',
                                              text: mainErr.response?.data.message || mainErr.message,
                                              confirmButtonColor: '#d33',
                                              confirmButtonText: 'OK',
                                            });
                                          } finally {
                                            setIsLoading1(false);
                                            setSentProgress(0);
                                          }
                                        };
                                                            

// =================================================send details code end=======================================================



// ===================================================edit deal start===================================================================

const [project,setproject]=useState({name:"",developer_name:"",joint_venture:"",secondary_developer:"",rera_number:"",descriptions:"",
  category:[],sub_category:[],land_area:"",measurment1:"",total_block:"",total_floor:"",
  total_units:"",zone:[],status:"",launched_on:"",expected_competion:"",possession:"",parking_type:[],
  approved_bank:"",approvals:[''],registration_no:[''],date:[''],pic:[''],action1:[],owner:[],
  team:[],visible_to:"",

  location:"",lattitude:"",langitude:"",address:"",street:"",locality:"",city:"",zip:"",state:"",country:"",

  add_block:[],add_size:[],add_unit:[],basic_aminities:[],features_aminities:[],nearby_aminities:[],
  price_list:[],Payment_plan:[]});

       const[deal,setdeal]=useState({project_category:[],project_subcategory:"",location:"",ulocality:"",ucity:"",
                            utype:"",ucategory:[],usize:"",available_for:"",stage:"",project:"",block:"",unit_number:"",floors:"",
                            expected_price:"",quote_price:"",security_deposite:"",owner_details:[],associated_contact:[],relation:"",
                          maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
                          deal_type:"",deal_case:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
                          website:"",social_media:"",send_matchedlead:"",matchedleads:[],matchinglead:"",remarks:""})


const [show10, setshow10] = useState(false);
    
const handleClose10 = () => setshow10(false);
const handleShow10=async()=>
{
  setshow10(true);
  try {
    const resp=await api.get(`viewdealbyid/${selectedItems}`)
    setdeal(resp.data.deal)
  } catch (error) {
    console.log(error);
    
  }
 
}


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


const handleallblockchange = (event) => {
   
  
    const selectblocks = event.target.value
  
     
    setdeal((prev) => {
      const updateblock = { ...prev, block: selectblocks };
      return updateblock; // Return the updated state
    });
  };

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



       

  React.useEffect(()=>
  {fetchdata1()},[])




  const allproject =[]
  data1.map((item)=>
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
        setunits1(resp.data.project);
        setproject(resp.data.project[0])
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

            const resp=await api.put(`updatedeal/${selectedItems}`,deal)
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
          



// ===================================================edit deal end====================================================================

// =================================================units data code start===========================================================


        React.useEffect(()=>{fetchcdata()},[])

                  const[allprojectforsearch,setallprojectforsearch]=useState([])
                  const[cdata,setcdata]=useState([]);
                  const [flattenedUnits, setFlattenedUnits] = useState([]);
                 
                  
                  const[allunitsforsearch,setallunitsforsearch]=useState([])
                  // const [filteredData, setFilteredData] = useState([]);
                  const[totalproject,settotalproject]=useState()
                  const[totalupcoming,settotalupcoming]=useState()
                  const[totalprelaunch,settotalprelaunch]=useState()
                  const[totalreadytomove,settotalreadytomove]=useState()
                  const[totalunderconstruction,settotalunderconstrction]=useState()
                  const fetchcdata=async(event)=>
                  {
                    
                    try {
                      const resp=await api.get('viewproject')
                      setcdata(resp.data.project)
                      setallprojectforsearch(resp.data.project)
                      const countproject=Array.isArray(resp.data.project) ? resp.data.project : [resp.data.project]
                      settotalproject(countproject.length)
                    
                      const totalaupcomingproject=resp.data.project.filter(item=>item.status==='Upcoming').length
                      settotalupcoming(totalaupcomingproject)

                      const totalprelaunchproject=resp.data.project.filter(item=>item.status==='Pre Launch').length
                      settotalprelaunch(totalprelaunchproject)

                      const totalreadytomoveproject=resp.data.project.filter(item=>item.status==='Ready to Move').length
                      settotalreadytomove(totalreadytomoveproject)

                      const totalunderconstrctionproject=resp.data.project.filter(item=>item.status==='Under Construction').length
                      settotalunderconstrction(totalunderconstrctionproject)
                      
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
                        setallunitsforsearch(flattened)
                
                      // Log the flattened units
                    
                    } catch (error) {
                      console.log(error);
                    }
                  
                  }
//================================================ units data code end============================================================

// ===================================add to task for sitevisit start============================================================


const handleformchange=()=>
  {
      const tasks=document.getElementById("forms").value;
       if(tasks==="Call")
       {
          document.getElementById("call").style.display="flex"
          document.getElementById("email").style.display="none"
           document.getElementById("sitevisit").style.display="none"
           document.getElementById("meeting").style.display="none"

             document.getElementById("calladdtask").style.display="flex"
             document.getElementById("mailaddtask").style.display="none"
             document.getElementById("sitevisitaddtask").style.display="none"
             document.getElementById("meetingaddtask").style.display="none"
       }
      if(tasks==="Email")
          {
              document.getElementById("call").style.display="none"
              document.getElementById("email").style.display="flex"
              document.getElementById("sitevisit").style.display="none"
               document.getElementById("meeting").style.display="none"

                 document.getElementById("mailaddtask").style.display="flex"
                 document.getElementById("sitevisitaddtask").style.display="none"
                 document.getElementById("meetingaddtask").style.display="none"
                  document.getElementById("calladdtask").style.display="none"
          }
          if(tasks==="Site Visit")
              {
                   document.getElementById("call").style.display="none"
                   document.getElementById("email").style.display="none"
                  document.getElementById("sitevisit").style.display="flex"
                    document.getElementById("meeting").style.display="none"

                       document.getElementById("sitevisitaddtask").style.display="flex"
                        document.getElementById("meetingaddtask").style.display="none"
                         document.getElementById("calladdtask").style.display="none"
                       document.getElementById("mailaddtask").style.display="none"
              }
               if(tasks==="Meeting")
                  {
                       document.getElementById("call").style.display="none"
                       document.getElementById("email").style.display="none"
                      document.getElementById("sitevisit").style.display="none"
                       document.getElementById("meeting").style.display="flex"

                       document.getElementById("calladdtask").style.display="none"
                       document.getElementById("mailaddtask").style.display="none"
                        document.getElementById("sitevisitaddtask").style.display="none"
                         document.getElementById("meetingaddtask").style.display="flex"
                  }
  }




const [show8, setshow8] = useState(false);
    
const handleClose8 = () => setshow8(false);
const handleShow8=async()=>
{
  setshow8(true);
}


const [sitevisit,setsitevisit]=useState({activity_type:"SiteVisit",title:"",executive:"",project:[],block:[],sitevisit_type:"",
  inventory:[],lead:"",confirmation:"",remark:"",participants:"",remind_me:"",start_date:"",end_date:"",start_time:"",end_time:"",complete:"",stage:"",title2:"",first_name:"",
  last_name:"",mobile_no:[],email:[],lead_id:"",stage:"",status:"",intrested_project:[],intrested_block:[],intrested_inventory:[],date:"",feedback:""})


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


  const[leadid,setleadid]=useState("")
    const handleLeadChange = (e) => {
        const selectedLead = Leaddata.find(item => item._id === e.target.value);
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
  const[updatestage2,setupdatestage2]=useState("")
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
            setupdatestage2("Opportunity");
            setupdatestage1("Quote");
        }
        else if (newStatus === "Did Not Visit" || "Not Intersted>") {
            setupdatestage2("Prospect");
            setupdatestage1("Open");
        }
    };


    const[Leaddata,setLeaddata]=useState([]);
    const fetchLeaddata=async()=>
    {
      
      try {
        const resp=await api.get('leadinfo')
        setLeaddata(resp.data.lead)
      } catch (error) {
        console.log(error);
      }
    
    }

    useEffect(()=>
    {fetchLeaddata()},[])



    const[selecteddeal,setselecteddeal]=useState([])
    const getselecteddeal=async()=>
    {
      try {
        const resp=await api.get(`viewdealbyid/${selectedItems}`)
        setselecteddeal(resp.data.deal)
        setsitevisit((prevState)=>({
          ...prevState,
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
        }));
        setmeetingtask((prevState)=>({
          ...prevState,
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
               
        }));

        setmailtask((prevState)=>({
          ...prevState,
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
               
        }));

        
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>
    {
      getselecteddeal()
    },[selectedItems])

    const sitevisitdetails = async () => {
      const title1 = document.getElementById("sitevisittitle").innerText;
    
      // Update state
      const updatedsiteTask = { ...sitevisit, title: title1 };
      const updatedData = {
        stage: 'Quote'  // Directly add 'Quote' to the request data
      };
    
      try {
        // First API request to post sitevisit details
        const resp = await api.post('sitevisit', updatedsiteTask);
    
       if(leadid)
       {
        
        const resp1 = await api.put(`updatelead/${leadid}`, updatedData);
        console.log(resp1);
        
       }
       
    
        if (resp.status === 200) {
          toast.success(resp.data.message);
    
          // Reload the page after a brief delay
          setTimeout(() => {
            window.location.reload();
          }, 2000); // 2000 milliseconds = 2 seconds
        }
      } catch (error) {
        // Catch any errors from the main API requests (sitevisit and lead updates)
        toast.error("Please select Project Block and Unit sequencely or Missing Lead...");
      }
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
      setsitevisit({ ...sitevisit, start_date: formattedDate });
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
      setsitevisit({ ...sitevisit, end_date: formattedDate });
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






// ===============================================add to task for sitevisit end=========================================================


//================================ add to task for meeting start======================================================================


const activity=["Call","Email","Meeting","Site Visit"]
const location=["Home","Office","Company","Site"]
const[leadidmeeting,setleadidmeeting]=useState("")

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

  useEffect(()=>
    {
        fetchsitevisitdata()
    },[])


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


    const [meetingtask,setmeetingtask]=useState({activity_type:"Meeting",title:"",executive:"",lead:"",location_type:"",location_address:"",
      reason:"",project:[],block:[],inventory:[],remark:"",stage:"",due_date:"",due_time:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",
      complete:"",status:"",meeting_result:"",date:"",feedback:""})


    const meetingtaskdetails=async()=>
      {
       
          const title1 = document.getElementById("meetingtitle").innerText;
         
          const data = { stage: updatestagemeeting };
          // Update state
          const updatemeetingtask = { ...meetingtask, title: title1 };
          try {
              const resp=await api.post('meetingtask',updatemeetingtask)

              const data1 = { newstage: updatestagemeeting1 };

// Loop through each selected project-block-unit combination
if(meetingtask.reason==="Negotiation")
{
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
          toast.error(`API request faileddddddddddd for ${project} - ${block} - ${unit_number}`);
          isValidCombination = false; // Set to false if the combination fails
          }
          } else {
          // If any part is missing, skip the combination
          toast.warn(`Skipping API call for invalid combination: ${selectedCombination}`);
          isValidCombination = false;
          }
          }
        }
        
if(meetingtask.reason==="Discuss")
{
          if(meetingtask.project && meetingtask.block && meetingtask.inventory)
          {
            const project=meetingtask.project[0]
            const block=meetingtask.block[0]
            const unit_number=meetingtask.inventory[0]
            try {
          // Call API for each valid combination
          const resp2 = await api.put(`updatedealstage/${project}/${block}/${unit_number}`, data1);
          } catch (error) {
          // Handle API errors for the individual combination
          toast.error(`API request failed for ${project} - ${block} - ${unit_number}`);
        
          }
          } else {
          // If any part is missing, skip the combination
          toast.warn(`Skipping API call for invalid combination`);
         
          }
        }



              if(leadidmeeting)
                {
                 const resp1 = await api.put(`updatelead/${leadidmeeting}`,data );
                }
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
        setmeetingtask({ ...meetingtask, due_date: formattedDate });
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


      //========================================= add to task for meeting end==============================================================



      //============================== add to task for call start======================================================================




      const [calltask,setcalltask]=useState({activity_type:"Call",title:"",reason:"",lead:"",executive:"",remarks:"",complete:"",due_date:"",due_time:"",
        title2:"",first_name:"",last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",direction:"",status:"",date:"",duration:"",
        result:"",intrested_inventory:"",feedback:""})


        const reason=["Meeting","Site Visit","Discuss","For Requirment","etc"]
        const direction=["Incoming","Outgoing"]
        const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]
        const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]

        const handler1=()=>
          {
              document.getElementById("date1").style.color="black"
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


      const calltaskdetails=async()=>
        {
        const title1 = document.getElementById("title").innerText;
        // Update state
        const updatedCallTask = { ...calltask, title: title1 };
        
        try {
        const resp=await api.post('calltask',updatedCallTask)
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

const formatdate = (dateString) => {
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
  const formattedDate = formatdate(selectedDate);
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


// =============================add to task for mail start============================================================================


const [mailtask,setmailtask]=useState({activity_type:"Mail",title:"",executive:"",lead:"",project:[],block:[],inventory:[],subject:"",remarks:"",
  complete:"",due_date:"",due_time:"",direction:"",status:"",date:"",feedback:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",})


  const mailtaskdetails=async()=>
    {
     
        const title1 = document.getElementById("mailtitle").innerText;

        // Update state
        const updatedMailTask = { ...mailtask, title: title1 };
        try {
            const resp=await api.post('mailtask',updatedMailTask)
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






const[leaddatamail,setleaddatamail]=useState([]);
const fetchleaddatamail=async(event)=>
{
  
  try {
    const resp=await api.get('leadinfo')
    const all=(resp.data.lead)
    setleaddatamail(all)

  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>
{
fetchleaddatamail()
},[])


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
  setmailtask({ ...mailtask, due_date: formattedDate });
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





// ============================================add to task mail end====================================================================

// ============================================action buttons toggle code start==================================================


                        useEffect(()=>
                          {
                            if(selectedItems.length===0)
                            {
                              document.getElementById("dealdelete").style.display="none"
                              document.getElementById("dealedit").style.display="none"
                              document.getElementById("sendall").style.display="none"
                          
                                  document.getElementById("dealaddtask").style.display="none"
                                  document.getElementById("dealcreatebooking").style.display="none"
                                
                                
                                  document.getElementById("dealcall").style.display="none"
                                  document.getElementById("dealaddtag").style.display="none"
                                  document.getElementById("dealaddremarks").style.display="none"
                                  document.getElementById("dealpublishon").style.display="none"
                                  document.getElementById("dealupdatestage").style.display="none"
                                  document.getElementById("dealpreview").style.display="none"
                                  document.getElementById("dealadddocument").style.display="none"
                                  document.getElementById("dealuploadpicture").style.display="none"
                                document.getElementById("dealsearch").style.display="flex"
                                // document.getElementById("dealtoggelsearch").style.display="flex"
                            }
                            if(selectedItems.length===1)
                            {
                              document.getElementById("dealdelete").style.display="inline-block"
                              document.getElementById("dealedit").style.display="inline-block"
                             document.getElementById("sendall").style.display="inline-block"
                                document.getElementById("dealaddtask").style.display="inline-block"
                                document.getElementById("dealcreatebooking").style.display="inline-block"
                           
                                document.getElementById("dealcall").style.display="inline-block"
                                document.getElementById("dealaddtag").style.display="inline-block"
                                document.getElementById("dealaddremarks").style.display="inline-block"
                                document.getElementById("dealpublishon").style.display="inline-block"
                                document.getElementById("dealupdatestage").style.display="inline-block"
                                document.getElementById("dealpreview").style.display="inline-block"
                                document.getElementById("dealadddocument").style.display="inline-block"
                                document.getElementById("dealuploadpicture").style.display="inline-block"
                            document.getElementById("dealsearch").style.display="none"
                              // document.getElementById("dealtoggelsearch").style.display="none"
                            }
      
                            if(selectedItems.length>1)
                            {
                              document.getElementById("dealdelete").style.display="inline-block"
                              document.getElementById("dealedit").style.display="none"
                              document.getElementById("sendall").style.display="inline-block"
                                document.getElementById("dealaddtask").style.display="none"
                                document.getElementById("dealcreatebooking").style.display="none"
                            
                                document.getElementById("dealcall").style.display="none"
                                document.getElementById("dealaddtag").style.display="none"
                                document.getElementById("dealaddremarks").style.display="none"
                                document.getElementById("dealpublishon").style.display="none"
                                document.getElementById("dealupdatestage").style.display="none"
                                document.getElementById("dealpreview").style.display="none"
                                document.getElementById("dealadddocument").style.display="none"
                                document.getElementById("dealuploadpicture").style.display="none"
                                document.getElementById("dealsearch").style.display="none"
                              // document.getElementById("dealtoggelsearch").style.display="none"
                            }
      
                          
                          },[selectedItems])

// ==============================================action buttons toggle code end====================================================


//=============================================== deal action buttons toggle start=============================================================

              const [isHoveringDelete, setIsHoveringDelete] = useState(false);
              const [isHoveringEdit, setIsHoveringEdit] = useState(false);
              const [isHoveringaddtotask, setIsHoveringaddtotask] = useState(false);
              const [isHoveringuploadpicture, setIsHoveringuploadpicture] = useState(false);
              const [isHoveringupdate, setIsHoveringupdate] = useState(false);
              const [isHoveringpublishon, setIsHoveringpublishon] = useState(false);
              const [isHoveringcall, setIsHoveringcall] = useState(false);
              const [isHoveringaddtag, setIsHoveringaddtag] = useState(false);
              const [isHoveringaddremarks, setIsHoveringaddremarks] = useState(false);
              const [isHoveringadddocuments, setIsHoveringadddocuments] = useState(false);
              const [isHoveringpreview, setIsHoveringpreview] = useState(false);
              const [isHoveringsendmail, setIsHoveringsendmail] = useState(false);
              const [isHoveringcreatebooking, setIsHoveringcreatebooking] = useState(false);
              const [isHoveringprojectmatchedlead, setIsHoveringprojectmatchedlead] = useState(false);
              const [isHoveringprojectupdate, setIsHoveringprojectupdate] = useState(false);
              const [isHoveringunitadduser, setIsHoveringunitadduser] = useState(false);
              const [isHoveringunitcreatedeal, setIsHoveringunitcreatedeal] = useState(false);
              const [isHoveringunitupdate, setIsHoveringunitupdate] = useState(false);
              const [isHoveringunitcustomerfeedback, setIsHoveringunitcustomerfeedback] = useState(false);

// =============================================================deal action button toggle end==================================================
  return (
    <div>
            <Header1/>
            <Sidebar1/>

                    <div id="deallistview" className="flip-card-front">
              <div style={{marginTop:"52px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
                
                <h3 style={{marginLeft:"10px",marginTop:"10px",cursor:"pointer"}}>Deals</h3>
                <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
                    <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}}/>
                </button>
                    <ul class="dropdown-menu" id="exporttoexcel"> 
                      
                    <li  onClick={exportToExcel} >Export Data</li>
                      
                    </ul>
                {/* <button className="form-control" style={{width:"200px",marginLeft:"10px"}}>Select Team</button>
                <button className="form-control" style={{width:"300px",marginLeft:"10px"}}>Select Sales Manager</button>
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",marginLeft:"40%"}}>
                    Add Inventory
                </button>
                    <ul class="dropdown-menu">
                      <li><Link to={'/addinventory'} class="dropdown-item">Add Inventory</Link></li>
                    </ul> */}
                    <div style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px",marginLeft:"70%"}}>
                    <button  class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"5px",color:"black",backgroundColor:"transparent",width:"120px"}}>
                    Filter
                </button>
                    {/* <ul class="dropdown-menu">
                      <li>
                        <label className="labels">By developer</label><input type="text" className="form-control form-control-sm" placeholder="filter from developer" /></li>
                      <li><label className="labels">By location</label><input type="text" className="form-control form-control-sm" placeholder="filter from location" onChange={(e)=>setlocation(e.target.value)} onKeyDown={handlepress2}/></li>
                    </ul> */}
                </div>  
              </div>
              <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
                <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px"}} onClick={fetchdatabystage_open}>
                  <h6>OPEN</h6>
                  <p>{countopen}</p>
                </div>
                <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_quote}>
                  <h6>QUOTE</h6>
                  <p>{countquote}</p>
                </div>
                <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_Negotiation}>
                  <h6>NEGOTIATION</h6>
                  <p>{countnegotiation}</p>
                </div>
                <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_booked}>
                  <h6>BOOKED</h6>
                  <p>{countbooked}</p>
                </div>
                <div style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
             
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none",fontWeight:"bold",marginTop:"-10px"}}>
                    CLOSED
                </button>
                    <ul class="dropdown-menu">
                      <li className="form-control">Won <span style={{fontSize:"30px",color:"green",fontWeight:"bolder"}}><sup>{countwon}</sup></span></li>
                      <li className="form-control">Reject <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup>{countlost}</sup></span></li>
                      <li className="form-control">Lost <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup>{countreject}</sup></span></li>
                    </ul>
                </div>  
                
                
              </div>
        
              <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"10px",paddingTop:"10px",position:"sticky",top:"50px",zIndex:"1"}}>
              {/* <input id="dealtoggelsearch" type="checkbox" onChange={handleischeckedchange}/> */}
              
            {/* <input id="dealsearch" type="text" disabled={!ischecked} className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search for deals via project name" style={{width:"25%"}} onChange={(e)=>handlesearchchange(e)} onKeyDown={handlekeypress2} /> */}
                      
                        <input
                          // ref={wrapperRef}
                      id="dealsearch"
                      type="text"
                      // disabled={!ischecked}
                      className="form-control form-control-sm"
                      placeholder="Search for deals via project, block or unit no"
                      style={{ width: "25%" }}
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e)}
                      // onKeyDown={handleKeyPress2}
                      autoComplete="off"
                    />
                    {/* {suggestions.length > 0 && (
                      <ul className="list-group position-absolute" style={{ width: "20%", zIndex: 1000,marginTop:"40px",fontSize:"14px",cursor:"pointer", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",backgroundColor: "#fff", borderRadius: "4px",  maxHeight: "300px", overflowY: "auto"}}>
                        {suggestions.map((item, index) => (
                          <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClickdeal(item)}
                          >
                            {item.project} - {item.block} - {item.unit_number}
                          </li>
                        ))}
                      </ul>
                    )} */}
        
             
              <div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>
        
        <Tooltip title="Delete Data.." arrow>
              <img
                id="dealdelete"
                src={
                  isHoveringDelete
                    ? "https://cdn-icons-png.freepik.com/512/6861/6861362.png" // hover image
                    : "https://cdn-icons-png.freepik.com/512/7078/7078067.png" // default image
                }
               onClick={deletedealSelectedItems}
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
                id="dealedit"
                src={
                  isHoveringEdit
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7BrBLmrMYynVUzMxsgv8AtIEkFjStD6cFRNYv1to6LupNkPMgkEaEzD5-HIGrjcPj4&usqp=CAU" // hover image
                    : "https://static.thenounproject.com/png/1416596-200.png" // default image
                }
                onClick={handleShow10}
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
        
        
            <Tooltip title="Send Mail,WhatsApp and Message..." arrow>
              <img
                id="sendall"
                src={
                  isHoveringsendmail
                    ? "https://cdn-icons-png.flaticon.com/512/786/786407.png" // hover image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkAryM3dt6AWqQt1fHHBAtQ-YFVel4wnqEA&s" // default image
                }
                // onClick={handleShow3}
                onMouseEnter={() => setIsHoveringsendmail(true)}
                onMouseLeave={() => setIsHoveringsendmail(false)}
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
        
        <Tooltip title="Add to task.." arrow>
              <img
                id="dealaddtask"
                src={
                  isHoveringaddtotask
                    ? "https://cdn-icons-png.flaticon.com/512/12692/12692378.png" // hover image
                    : "https://cdn2.iconfinder.com/data/icons/interface-solid-7/30/interface-solid-task-add-512.png" // default image
                }
               onClick={handleShow8}
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
        
        
        <Tooltip title="Create Booking.." arrow>
              <img
                id="dealcreatebooking"
                src={
                  isHoveringcreatebooking
                    ? "https://cdn-icons-png.freepik.com/512/489/489379.png" // hover image
                    : "https://www.housecallpro.com/wp-content/uploads/2024/01/schedule-mono-300x300-1.png" // default image
                }
                onClick={()=>{navigate('/bookingdetails')}}
                onMouseEnter={() => setIsHoveringcreatebooking(true)}
                onMouseLeave={() => setIsHoveringcreatebooking(false)}
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
        
          <Tooltip title="Call.." arrow>
              <img
                id="dealcall"
                src={
                  isHoveringcall
                    ? "https://cdn-icons-png.flaticon.com/512/561/561253.png" // hover image
                    : "https://icons.veryicon.com/png/o/miscellaneous/mime-icon/call-14.png" // default image
                }
                onMouseEnter={() => setIsHoveringcall(true)}
                onMouseLeave={() => setIsHoveringcall(false)}
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
        
         <Tooltip title="Add Tag.." arrow>
              <img
                id="dealaddtag"
                src={
                  isHoveringaddtag
                    ? "https://cdn-icons-png.freepik.com/512/11500/11500120.png" // hover image
                    : "https://cdn-icons-png.flaticon.com/512/118/118061.png" // default image
                }
                onMouseEnter={() => setIsHoveringaddtag(true)}
                onMouseLeave={() => setIsHoveringaddtag(false)}
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
        
         <Tooltip title="Add Remarks/Note.." arrow>
              <img
                id="dealaddremarks"
                src={
                  isHoveringaddremarks
                    ? "https://cdn-icons-png.flaticon.com/512/1381/1381552.png" // hover image
                    : "https://static-00.iconduck.com/assets.00/comment-add-icon-2048x2048-5tgm7wfd.png" // default image
                }
               onClick={handleShow6}
                onMouseEnter={() => setIsHoveringaddremarks(true)}
                onMouseLeave={() => setIsHoveringaddremarks(false)}
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
        
        
         <Tooltip title="Publish On.." arrow>
              <img
                id="dealpublishon"
                src={
                  isHoveringpublishon
                    ? "https://cdn-icons-png.freepik.com/512/3559/3559259.png" // hover image
                    : "https://thumbs.dreamstime.com/b/ebook-publishing-glyph-icon-ebook-publishing-sign-isolated-symbol-illustration-ebook-publishing-glyph-icon-illustration-326090359.jpg" // default image
                }
               onClick={handleShow5} 
                onMouseEnter={() => setIsHoveringpublishon(true)}
                onMouseLeave={() => setIsHoveringpublishon(false)}
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
        
          <Tooltip title="Update.." arrow>
              <img
                id="dealupdatestage"
                src={
                  isHoveringupdate
                    ? "https://cdn-icons-png.flaticon.com/512/6713/6713079.png" // hover image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFo9g6QLJ-P3k8PTrjfrkWBOZI5ptsWJW4g&s" // default image
                }
               onClick={handleShow5} 
                onMouseEnter={() => setIsHoveringupdate(true)}
                onMouseLeave={() => setIsHoveringupdate(false)}
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
        
        
          <Tooltip title="Preview.." arrow>
              <img
                id="dealpreview"
                src={
                  isHoveringpreview
                    ? "https://cdn-icons-png.flaticon.com/512/143/143594.png" // hover image
                    : "https://icon-library.com/images/preview-icon-png/preview-icon-png-26.jpg" // default image
                }
               onClick={handleShow5} 
                onMouseEnter={() => setIsHoveringpreview(true)}
                onMouseLeave={() => setIsHoveringpreview(false)}
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
        
           <Tooltip title="Add Document.." arrow>
              <img
                id="dealadddocument"
                src={
                  isHoveringadddocuments
                    ? "https://cdn-icons-png.freepik.com/512/5442/5442207.png" // hover image
                    : "https://www.pngkey.com/png/detail/268-2688000_add-document-icon-add-file-icon-png.png" // default image
                }
            
                onMouseEnter={() => setIsHoveringadddocuments(true)}
                onMouseLeave={() => setIsHoveringadddocuments(false)}
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
        
        
        <Tooltip title="Upload Image.." arrow>
              <img
                id="dealuploadpicture"
                src={
                  isHoveringuploadpicture
                    ? "https://www.pngall.com/wp-content/uploads/15/Open-File-PNG-Clipart.png" // hover image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlz-TKOccaHn9IPHPOBVUJKOxcrSMhc3uhkw&s" // default image
                }
            
                onMouseEnter={() => setIsHoveringuploadpicture(true)}
                onMouseLeave={() => setIsHoveringuploadpicture(false)}
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
            
            
              {/* <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"80%",position:"absolute"}}>
           
              
              <label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
              <select id="itemsPerPage" value={itemsPerPage}  style={{fontSize:"16px",height:"30px"}}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            
            {renderPageNumbers()}
            </div>  */}
        
            <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"60%",position:"absolute"}}>
      <div style={{height:"10px"}}>
       <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        fontSize: "0.85rem",
        lineHeight: 1,         
        py: 0.25,  
        marginTop:"-10px"           
      }}
    >
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 140,
          backgroundColor: "white",
          borderRadius: 1,
          boxShadow: 1,
          "& .MuiInputLabel-root": { fontSize: "0.8rem", lineHeight: 1 },
          "& .MuiSelect-root": {
            fontSize: "0.85rem",
            py: "2px",             // smaller vertical padding in select field
            lineHeight: 1,
            height: 30,            // explicitly reduce height of select input
          },
          "& .MuiSelect-icon": { color: "#1976d2", fontSize: "1.1rem" },
        }}
      >
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortField}
          label="Sort By"
          onChange={(e) => setSortField(e.target.value)}
          size="small"
          MenuProps={{
            PaperProps: {
              style: {
                fontSize: "0.8rem",
              },
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="matchinglead">Matched Lead</MenuItem>
          <MenuItem value="unit_number">Unit Number</MenuItem>
          <MenuItem value="usize">Unit Size</MenuItem>
          <MenuItem value="project">Project</MenuItem>
        </Select>
      </FormControl>

      <Tooltip title={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}>
        <IconButton
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          sx={{
            backgroundColor: "white",
            boxShadow: 1,
            p: "4px",       // reduce padding around icon button
            "& svg": { fontSize: "1.2rem" }, // slightly smaller icon
            height: 32,
            width: 32,
          }}
          size="small"
          aria-label="Toggle sort order"
        >
          {sortOrder === "asc" ? (
            <ArrowUpwardIcon color="primary" />
          ) : (
            <ArrowDownwardIcon color="primary" />
          )}
        </IconButton>
      </Tooltip>
    </Box>
    </div>
              
              <label htmlFor="itemsPerPage" style={{fontSize:"16px",paddingTop:"0px"}}>Items: </label>
              <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",height:"30px"}}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
            
            {renderPageNumbers()}
            </div>
              </div>
              {/* <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>
                  <button className="form-control" style={{width:"150px",marginLeft:"86.5%"}} onClick={exportToExcel} >Export Data</button>
                  </div> */}
                <div style={{marginLeft:"60px",marginTop:"2px",backgroundColor:"white"}}>
                  <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
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
                        checked={selectedItems.includes(item._id)}
                        onChange={() => handleRowSelect(item._id)}
                      />
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell style={{ cursor:"pointer",fontSize:"12px" }} onClick={()=>navigate('/dealsingleview',{state:item})}>
                    <span style={{fontWeight:"bolder",color:"#0086b3"}}>{item.unit_number}</span>({item.utype})<br></br>
                     {item.ucategory} {item.usize}<br></br>
                     {/* {item.ulocality} {item.ucity} */}{item.project}
                    </StyledTableCell>
                    
                    {visibleColumns
                      .filter((col) => col.id !== 'sno' && col.id !== 'details')
                      .map((col) => (
                        <StyledTableCell 
                        key={col.id} 
                        style={{ padding: "10px", cursor: col.id === 'matchinglead' ? 'pointer' : 'default',fontSize:"12px" }}
                        onClick={col.id === 'matchinglead' ? () => handleMatchLeadClick(item) : undefined} // Handle click if it's 'matchlead'
                      >
                        {col.id === 'owner_details' && Array.isArray(item.owner_details) ? (
                          item.owner_details.map(detail => (
                            <div key={detail._id}>
                              {detail.first_name} {detail.last_name} <br />
                              {Array.isArray(detail.mobile_no) ? (
                                detail.mobile_no.map((mobile, index) => (
                                  <div key={index}>
                                    <SvgIcon component={PhoneIphoneIcon} />
                                    <span style={{color:"#9400D3"}}>{mobile}</span>
                                    <br />
                                  </div>
                                ))
                              ) : (
                                detail.mobile_no
                              )}
                            </div>
                          ))
                        ) : col.id === 'associated_contact' && Array.isArray(item.associated_contact) ? (
                          item.associated_contact.map(contact => (
                            <div key={contact._id}>
                                {item.relation} <br></br>
                              {contact.first_name} {contact.last_name} <br />
                              {Array.isArray(contact.mobile_no) ? (
                                contact.mobile_no.map((mobile, index) => (
                                  <div key={index}>
                                    <SvgIcon component={PhoneIphoneIcon} />
                                    <span style={{color:"#9400D3"}}>{mobile}</span>
                                    <br />
                                  </div>
                                ))
                              ) : (
                                contact.mobile_no
                              )}
                            </div>
                          ))
                        ) : col.id === 'action' ? (
                            <div className="dropdown">
                              <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button" 
                                id={`dropdownMenuButton${index}`} 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                              >
                                
                              </button>
                              <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                                <li><a className="dropdown-item" href="#">Edit</a></li>
                                <li><a className="dropdown-item" href="#">Delete</a></li>
                              </ul>
                            </div>
                          ) :   col.id === 'expected_price' ? (
                            <>
                            <span>₹{Number(item.expected_price).toLocaleString('en-IN')}/-</span><br></br>
                      <span style={{ fontSize: "12px", color: "#333" }}>
  { numberToIndianWords(item.expected_price) }
</span>


                            </>
                          ) :  col.id === 'matchinglead' ? (
                            <>
                            <span style={{fontWeight:"bold",color:"green",fontSize:"14px"}}>{item.matchinglead}</span>
                            </>
                          ) :  (
                          typeof item[col.id] === 'object' ? JSON.stringify(item[col.id]) : item[col.id]
                        )}
                      </StyledTableCell>
                      ))}
                      
                  </StyledTableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
            <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa",marginLeft:"10px"}}>
                  <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
                  <h6 style={{lineHeight:"50px"}}>Total Deals <span style={{color:"green",fontSize:"20px"}}>{data.length}</span></h6>
                </footer>
              </div>
            {/* <div style={{height:"100px"}}>
              <div style={{display:"flex",fontSize:"20px",gap:"10px",justifyContent:"right",paddingRight:"60px", marginTop:"10px"}}>{renderPageNumbers()}</div></div> */}
              
    
              <Modal  show={show1} onHide={handleClose1} size='xl' style={{transition:"0.5s ease-in"}}>
                    <Modal.Header>
                      <Modal.Title>Matched Lead for<br></br> <span style={{color:"blue",fontWeight:"normal",fontSize:"16px"}}>{fetchingdeal.unit_no} {fetchingdeal.project_name} ({fetchingdeal.block})</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              
        
                {/* Render the column headers */}
                <TableRow>
                  {dealallColumns.map((col) => (
                    // Only render columns that are NOT in the removedColumns list
                    !removedColumns.includes(col.id) && (
                      <StyledTableCell key={col.id} style={{backgroundColor:"gray",}} >
                        <span>{col.name}</span>
        
                        {/* Conditionally render '-' button based on showRemoveButtons */}
                        {showRemoveButtons && (
                          <Tooltip title="Click to remove column">
                            <button
                              onClick={() => handleColumnRemove(col.id)} // Remove the column
                              style={{
                                marginLeft: '10px',
                                cursor: 'pointer',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                textAlign: 'center',
                                fontSize: '14px',
                              }}
                            >
                              -
                            </button>
                          </Tooltip>
                        )}
                      </StyledTableCell>
                    )
                  ))}
                   <TableRow>
                  {/* Single Filter Image Icon */}
                  {/* <StyledTableCell >
                    <Tooltip title="Click to toggle filter" arrow>
                      <img
                        src="https://static-00.iconduck.com/assets.00/filter-icon-1024x1024-g4w8llud.png"
                        alt="filter"
                        style={{ height: '25px', border: 'none', cursor: 'pointer' }}
                        onClick={handleFilterClick} // Toggle the visibility of '-' buttons
                      />
                    </Tooltip>
                  </StyledTableCell> */}
                </TableRow>
                </TableRow>
              </TableHead>
            
              <tbody>
                {
                 
                deal1.map ((item, index) => (
                  <StyledTableRow key={index}>
                    
                 
                    
                    {dealallColumns
                      .filter((col) => col.id !== 'sno')
                      .map((col) => (
                        !removedColumns.includes(col.id) &&
                        <StyledTableCell 
                        key={col.id} 
                        style={{ padding: "10px",fontSize:"12px",backgroundColor:"white" }}
                        
                      >
                      {col.id === 'unit_type' ?
                          (
                              <>
                               {fetchingdeal.unit_type}
                               </>
                            ) : col.id === 'location' ?
                            (
                                <>
                                 {fetchingdeal.location}
                                 </>
                              ) : 
                              col.id === 'facing' ?
                            (
                                <>
                                 {fetchingdeal.facing}
                                 </>
                              ) :
                              col.id === 'road' ?
                            (
                                <>
                                 {fetchingdeal.road}
                                 </>
                              ) :
                              col.id === 'direction' ?
                            (
                                <>
                                 {fetchingdeal.direction}
                                 </>
                              ) : col.id === 'size' ?
                              (
                                  <>
                                   {fetchingdeal.size}
                                   </>
                                ) : 
                                col.id === 'price' ?
                              (
                                  <>
                                   ₹{Number(item.expected_price)?.toLocaleString('en-IN')}/-
                                   </>
                                ) : item[col.id]
                      }
        
                       
                      </StyledTableCell>
                      ))}
                      
                  </StyledTableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <div style={{marginTop:"10px",backgroundColor:"gray",padding:"12px",height:"60px",display:"flex",gap:"10px"}}>
             
              <input id="search" type="text"  className="form-control form-control-sm form-control form-control-sm-sm" placeholder="Type here for search" style={{width:"25%"}} />
              <div style={{marginLeft:"45%"}}><button className="form-control form-control-sm"  onClick={handleShow12}>Send Details</button></div>
              <div><button className="form-control form-control-sm">Mark As Intrested</button></div>
              </div>
        
              <TableContainer component={Paper} style={{marginTop:"20px"}}>
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
                  {leadallColumns.map((col) => (
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
                 [...matchedLeads]
                 .sort((a, b) => b.matchPercentage - a.matchPercentage).map ((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell >
                      <input 
                        type="checkbox"
                        checked={selectedItems1.includes(item._id)}
                        onChange={() => handleRowSelect1(item._id)}
                      />
                      {index + 1}
                    </StyledTableCell>
        
                    
                    
                    {leadallColumns
                      .filter((col) => col.id !== 'sno' )
                      .map((col) => (
                        <StyledTableCell 
                        key={col.id} 
                        style={{ padding: "10px",fontSize:"12px" }}
                        
                      >
                        
                        { col.id === 'lead_details' ? (
                      <>
                        {item.title} {item.first_name} {item.last_name} <br></br>
                     {
                      Array.isArray(item.mobile_no) 
                        ? item.mobile_no.map((mobile, index) => (
                            <div key={index}>
                              <SvgIcon component={PhoneIphoneIcon} style={{fontSize:"10px"}} />
                              <span style={{ color: "#9400D3" }}>{mobile}</span>
                            </div>
                          ))
                        :  <div>
                            <SvgIcon component={PhoneIphoneIcon} />  
                            <span style={{ color: "#9400D3" }}>{item.mobile_no}</span> 
                        </div> 
                    }
                      </>
                    ) : col.id === 'stage' ? (
                      <>
                        {item.stage} <br />
                        <span style={{ color: item.lead_type === 'Hot' ? 'red' : item.lead_type === 'Warm' ? 'green' : item.lead_type === 'Cold' ? 'blue' : 'black' }}>
                          {item.lead_type}
                        </span>
                      </>
                    ) :   col.id === 'budget' ? (
                      <>
                        Min:  ₹{Number(item.budget_min)?.toLocaleString('en-IN')}/- <br />
                        Max:  ₹{Number(item.budget_max)?.toLocaleString('en-IN')}/-
                      
                      </>
                    ) :   col.id === 'score' ? (
                      <>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        
        {/* Circular Progress with dynamic color and percentage in center */}
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={item.leadscore}
            size={40}
            thickness={30}
            style={{
              color:
              item.leadscore > 90
              ? '#4caf50' // Green
              : item.score >= 71
              ? '#f44336' // Red
              : item.score >= 46
              ? '#ff9800' // Orange
              : item.score >= 26
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
              {item.leadscore}
            </Typography>
          </Box>
        </Box>
        </Box>
        
                      
                      </>
                    ):  col.id === 'matched_percentange' ? (
                      <>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {/* Linear Progress with same color logic and center text */}
        <Box width="100%" position="relative">
          <LinearProgress
            variant="determinate"
            value={item.matchPercentage}
            style={{
              height: 6,
              borderRadius: 6,
              backgroundColor: '#eee',
              transition: 'all 3s ease-in-out',
            }}
            sx={{
              '& .MuiLinearProgress-bar': {
                borderRadius: 6,
                backgroundColor:
                
                    item.matchPercentage > 90
                      ? '#4caf50' // Green
                      : item.matchPercentage >= 71
                      ? '#f44336' // Red
                      : item.matchPercentage >= 46
                      ? '#ff9800' // Orange
                      : item.matchPercentage >= 26
                      ? '#ffeb3b' // Yellow
                      : '#2196f3', // Blue
                  fontWeight: 'bold',
                
                transition: 'all 0.5s ease-in-out',
              },
            }}
          />
          <Box
            position="absolute"
            top={0}
            left="50%"
            transform="translateX(-50%)"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" style={{ color: '#000', fontWeight: 'bold' }}>
              {item.matchPercentage}%
            </Typography>
          </Box>
        </Box>
        
        </Box>
        
                      
                      </>
                    ):col.id === 'requirment' ? (
                      <>
                       {item.property_type.map((ptype, pIndex) =>
                        item.unit_type.map((utype, uIndex) =>
                          item.sub_type.map((stype, sIndex) => (
                            <div key={`${pIndex}-${uIndex}-${sIndex}`}>
                              {ptype} {utype} {stype}
                            </div>
                          ))
                        )
                      )}
                      {item.search_location?item.search_location:item.area_project.join(',')}
                    </>
                    
                    
                    ) : col.id === 'recived_on' ? (
                      <>
                  
                  {new Date(item.createdAt).toLocaleDateString()}
        
                    </>
                    
                    
                    ) :( 
                      item[col.id]
                    )}
                          
        
                     
                      </StyledTableCell>
                      ))}
                      
                  </StyledTableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose1}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
        
{/*============================================ edit modal start============================================================ */}

 <Modal show={show10} onHide={handleClose10} size='xl'>
            <Modal.Header>
              <Modal.Title>Update Deal</Modal.Title>
            </Modal.Header>
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
                    <option>---Select---</option>
                        <option>Direct Owner Deal</option>
                        <option>Builder Deal</option>
                        <option>Investor Deal</option>
                        <option>Joint Venture Deal</option>
                        <option>Bank Auction Deal</option>
                        <option>Institutional Owner Deal</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Transaction Type</label><select className="form-control form-control-sm" name="transaction_type" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                    <option>Select</option>
                        <option>Full White</option>
                        <option>Collecter Rate</option>
                        <option>Flexiable</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Deal Case</label><select className="form-control form-control-sm" name="deal_case" onChange={(e)=>setdeal({...deal,deal_case:e.target.value})}>
                    <option>---Select---</option>
                        <option>Registry Case</option>
                        <option>Transfer Case</option>
                        <option>GPA Case</option>
                        <option>SPA Case</option>
                        <option>Letter of Intent</option>
                        </select></div>

                        <div className="col-md-4"><label className="labels">Source</label><select className="form-control form-control-sm" name="source" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
                    <option>Select</option>
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
                    <option>Select</option>
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">User</label><select className="form-control form-control-sm" name="user" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Visible To</label><select className="form-control form-control-sm" name="visible_to" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                    <option>Select</option>
                        <option>Only Me</option>
                        <option>Team</option>
                        <option>All User</option>
                        </select></div>

                        <div className="col-md-12"><label className="labels">Publish On</label></div>
                    <div className="col-md-12"><hr></hr></div>
                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Website</label>
                                      <select className="form-control form-control-sm" name="website" required="true" onChange={(e)=>setdeal({...deal,website:e.target.value})}>
                                          <option>select</option>
                                          <option>Own Website</option>
                                          <option>99 Acre</option>
                                          <option>Olx</option>
                                          <option>Magicbricks</option>
                                          <option>Etc.</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Social Media</label>
                                      <select className="form-control form-control-sm" name="social_media" required="true" onChange={(e)=>setdeal({...deal,social_media:e.target.value})}>
                                          <option>select</option>
                                          <option>Facebook</option>
                                          <option>Instagram</option>
                                          <option>Googe Page</option>
                                          <option>Linkdin</option>
                                          <option>Twitter</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Send(Matched Lead)</label>
                                      <select className="form-control form-control-sm" name="send_matchedlead" required="true" onChange={(e)=>setdeal({...deal,send_matchedlead:e.target.value})}>
                                          <option>select</option>
                                          <option>Message</option>
                                          <option>What's App</option>
                                          <option>Email</option>
                                          </select>
                                    </div>
                                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea type="text" style={{height:"100px"}} className="form-control form-control-sm"  onChange={(e)=>setdeal({...deal,remarks:e.target.value})}/></div>
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
                        <option>---Select---</option>
                        <option>Direct Owner Deal</option>
                        <option>Builder Deal</option>
                        <option>Investor Deal</option>
                        <option>Joint Venture Deal</option>
                        <option>Bank Auction Deal</option>
                        <option>Institutional Owner Deal</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Transaction Type</label><select className="form-control form-control-sm" name="transaction_type" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                        <option>{deal.transaction_type}</option>
                         <option>---select---</option>
                         <option>Full White</option>
                        <option>Collecter Rate</option>
                        <option>Flexiable</option>
                        </select></div>
                        <div className="col-md-4"></div>

                        <div className="col-md-4"><label className="labels">Source</label><select className="form-control form-control-sm" name="source" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
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
                Update Deal 
              </Button>
              <Button variant="secondary" onClick={handleClose10}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/* ===============================================edit modal end================================================================== */}
        
{/* ========================================add to task model for start=========================================================== */}


<Modal show={show8} onHide={handleClose8} size='lg'>
            <Modal.Header>
              <Modal.Title>Create Site Visit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        
            <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Activity Type</label><select className="form-control form-control-sm" id="forms" required="true" onChange={handleformchange}>
                    <option>Select</option>
                        {
                            activity.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-8"></div>
                        </div>
{/* =============================================this task for site visit ========================================================*/}

            <div className="row" id="sitevisit" style={{display:"none"}}>

            <div className="col-md-12"><label className="labels">Title</label><p id="sitevisittitle">Site Visit with {sitevisit.lead} For {sitevisit.inventory.join(',')} @ {sitevisit.start_date} on time {sitevisit.start_time} {sitevisit.participants ? ` also associate with ${sitevisit.participants}` : ""}</p></div>

    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})} >
<option>Select </option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>

    <div className="col-md-4"><label className="labels">Select Site Visit Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,sitevisit_type:e.target.value})}>
<option>Select </option>
  <option>Site Visit</option>
  <option>Home Visit</option>
  <option>Online</option>
    </select>
    </div>
    <div className="col-md-4"></div>






        <div className="col-md-4"> <label className="labels">Select Project</label>  <input type="text"  className="form-control form-control-sm" value={sitevisit.project} /></div>

<div className="col-md-4"><label className="labels">Select Block</label><input type="text" className="form-control form-control-sm" value={sitevisit.block}/></div>



<div className="col-md-4"><label className="labels">Select Inventory</label><input type="text" className="form-control form-control-sm" value={sitevisit.inventory}/></div>


    <div className="col-md-4"><label className="labels">Select Lead</label>
    <select
    className="form-control form-control-sm"
    required
    onChange={handleLeadChange}>
<option>Select</option>
    {
        Leaddata.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
<option>Select </option>
   <option>Confirmed</option>
   <option>Tentative</option>
    </select>
    </div>
    <div className="col-md-4"></div>

    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remark:e.target.value})} /></div>


    <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
<option>Select</option>
   {
    contactdata.map((item)=>
    (
        <option>{item.title} {item.first_name} {item.last_name} ({item.company_name})</option>
    )) 
   }
    </select>
    </div>
    <div className="col-md-6"></div>

    <div className="col-md-6"><label className="labels">Remind Me?</label> 
<label class="switch">
<input type="checkbox" onChange={(e)=>setsitevisit({...sitevisit,remind_me:e.target.checked})}/>
    <span class="slider round"></span>
    </label>
</div>

{
    sitevisit.remind_me && (
        <>
        <div className="col-md-3"><label className="labels">Select Start Date</label><input type="date" className="form-control form-control-sm" onChange={handleDateChangesite}/></div>
                            <div className="col-md-3"><label className="labels">Select End Date</label><input type="date" className="form-control form-control-sm" onChange={handleDateChangesite1}/></div>
                            <div className="col-md-3"><label className="labels">Start Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChangesite}/></div>
                            <div className="col-md-3"><label className="labels">End Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChangesite1}/></div>
        </>
    )
}

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
            <input type="text" className="form-control form-control-sm"/></div>

            <div className="col-md-4">
<label className="labels">Select Interested Block</label>
<input type="text" className="form-control form-control-sm"/></div>



            <div className="col-md-4"><label className="labels">Select Intersted Inventory</label>
         
            <input type="text" className="form-control form-control-sm"/>





                </div>
                </>
        )
    }
 



<div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,date:e.target.value})}/></div>
<div className="col-md-8"></div>

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>


</div>
</div>
</div>

{/*======================================= site visit task end ========================================================================*/}



{/*============================================= meeting task start=============================================================== */}

<div className="row" id="meeting" style={{display:"none"}}>

<div className="col-md-12"><label className="labels">Title</label><p id="meetingtitle">MEETING with {meetingtask.lead} For {meetingtask.reason} of {meetingtask.inventory.join(',')} at {meetingtask.location_type} @ {meetingtask.due_date} on time {meetingtask.due_time}</p></div>
    
    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,executive:e.target.value})}>
<option>Select </option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>
    
<div className="col-md-4"><label className="labels">Select Lead</label> <select
className="form-control form-control-sm"
required
onChange={(e) => {
const selectedLead = leaddata.find(item => item._id === e.target.value);
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
<option>Select</option>
    {
        leaddata.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"></div>
    
    <div className="col-md-4"><label className="labels">Select Location Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,location_type:e.target.value})}>
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
<div className="col-md-8"></div>

<div className="col-md-8"><label className="labels">Location Address</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,location_address:e.target.value})}/></div>
<div className="col-md-4"></div>


<div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={handlereasonchangemeeting}>
<option>Select</option>
    <option>Negotiation</option>
    <option>Discuss</option>
    <option>Agreement</option>
    <option>Token</option>
    </select>
    </div>
<div className="col-md-8"></div>

{
  meetingtask.reason==="Discuss" && (
    <>

<div className="col-md-4"> <label className="labels">Select Project</label>  <input type="text"  className="form-control form-control-sm" value={meetingtask.project} /></div>

<div className="col-md-4"><label className="labels">Select Block</label><input type="text" className="form-control form-control-sm" value={meetingtask.block}/></div>



<div className="col-md-4"><label className="labels">Select Inventory</label><input type="text" className="form-control form-control-sm" value={meetingtask.inventory}/></div>

    





        </>

  )
}

{
  meetingtask.reason !=="Discuss" && (

    <div className="col-md-4"><label className="labels">Inventory</label>
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



<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setmeetingtask({...meetingtask,remark:e.target.value})}/></div>
<div className="col-md-2"></div>

<div className="col-md-4"><label className="labels">Select Due Date</label><input type="date" className="form-control form-control-sm" onChange={handleDateChangemeeting}/></div>
                    <div className="col-md-4"><label className="labels">Select Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChangemeeting}/></div>
                    <div className="col-md-4"></div>


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

<div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" >
<option>Select</option>
  <option>Conducted</option>
  <option>Cancelled</option>
  <option> Postponed</option>
    </select>
    </div>
    <div className="col-md-4"><label className="labels">Meeting Result</label><select className="form-control form-control-sm" required="true" >
<option>Select</option>
  <option>Deal Done</option>
  <option>Negotiation Uncomplete</option>
  <option>Deal Not Done</option>
  <option>Site Visit</option>
    </select>
    </div>
<div className="col-md-4"></div>
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" /></div>

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
 </div>

    </div>
    
{/* <div className="col-md-2"  style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={meetingtaskdetails}>Submit</button></div>
<div className="col-md-2"  style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div> */}

    </div> 



    {/*============================= meeting task end ================================================================================*/}


{/* =====================================call task start =========================================================================*/}


<div className="row" id="call" style={{display:"none",padding:"10px"}}>
                        
<div className="col-md-12"><label className="labels">Title</label><p id="title">Call {calltask.lead} for {calltask.reason} @ {calltask.due_date} on time {calltask.due_time}.</p></div>
                        <div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,reason:e.target.value})}>
                    <option>Select</option>
                        {
                            reason.map(item=>
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
                const selectedLead = leaddata.find(item => item._id === e.target.value);
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
                    stage:selectedLead.stage,
                    lead_id:selectedLead._id
                    }));
                }
                }}
  >
                    <option>Select</option>
                        {
                            leaddata.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,executive:e.target.value})}>
                    <option>Select</option>
                        <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setcalltask({...calltask,remarks:e.target.value})}/></div>

                  
                    <div className="col-md-2"></div>

                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" className="form-control form-control-sm"  onChange={handleDateChange}/></div>
                    <div className="col-md-4"><label className="labels">Select Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChange}/></div>
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
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" >
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
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" >
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
                    <div className="col-md-4"></div>
                
               
                <div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" id="date1" className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" className="form-control form-control-sm" /></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label><select className="form-control form-control-sm" required="true" >
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
                        <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" >
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

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     
                    {/* <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div>
                    </div> */}
                    </div>
                    
        </div>
        </div>
                    
                    {/* <div className="row">
                    <div className="col-md-2" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={calltaskdetails}>Submit</button></div>
                    <div className="col-md-2" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    </div> */}
                    </div>
                    </div>




{/* ==================================================call task end================================================================= */}



{/*============================================ mail task start =====================================================================*/}



<div className="row" id="email" style={{padding:"10px",display:"none"}}>

<div className="col-md-12"><label className="labels">Title</label><p id="mailtitle">Mail to {mailtask.lead} For {mailtask.subject} @ {mailtask.due_date} on time {mailtask.due_time} of {mailtask.inventory.join(',')} </p></div> 

<div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,executive:e.target.value})}>
<option>Select </option>
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
const selectedLead = leaddatamail.find(item => item._id === e.target.value);
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
<option>Select</option>
    {
        leaddatamail.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-8"></div>

    <div className="col-md-4"> <label className="labels">Select Project</label>  <input type="text"  className="form-control form-control-sm" value={mailtask.project} /></div>

<div className="col-md-4"><label className="labels">Select Block</label><input type="text" className="form-control form-control-sm" value={mailtask.block}/></div>



<div className="col-md-4"><label className="labels">Select Inventory</label><input type="text" className="form-control form-control-sm" value={mailtask.inventory}/></div>


<div className="col-md-4"><label className="labels">Subject</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,subject:e.target.value})}>
<option>Select</option>
    <option>Payment Reminder</option>
    <option>Agreement Reminder</option>
    <option>Feedback</option>
    <option>Matched inventory update</option>
    <option>Document Required for Submision</option>
    </select>
    </div>

<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setmailtask({...mailtask,remarks:e.target.value})}/></div>
    <div className="col-md-2"></div>

    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="date" className="form-control form-control-sm" onChange={handleDateChangemail}/></div>
    <div className="col-md-4"><label className="labels">Select Time</label><input type="time" className="form-control form-control-sm"  onChange={handleTimeChangemail}/></div>
<div className="col-md-4"></div>

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

<div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" >
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
    <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" >
<option>Select</option>
   <option>Read</option>
   <option>Delivered</option>
   <option>Bounced</option>
   <option>Undelivered</option>
    </select>
    </div>
<div className="col-md-4"></div>
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Date</label><input type="date" className="form-control form-control-sm" /></div>
<div className="col-md-8"> </div>

<div className="col-md-4"></div>

<div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
<div className="col-md-12"><br></br></div>
<div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
 </div>

</div>

{/* <div className="col-md-2" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={mailtaskdetails}>Submit</button></div>
<div className="col-md-2" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div> */}
</div>




{/*/=================================================== mail task end =================================================================*/}




</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" id="sitevisitaddtask" onClick={sitevisitdetails} style={{display:"none"}}>
                Add Task 
              </Button>
              <Button variant="secondary" id="meetingaddtask" onClick={meetingtaskdetails} style={{display:"none"}}>
                Add Task 
              </Button>
              <Button variant="secondary" id="calladdtask" onClick={calltaskdetails} style={{display:"none"}}>
                Add Task 
              </Button>
              <Button variant="secondary" id="mailaddtask" onClick={mailtaskdetails} style={{display:"none"}}>
                Add Task 
              </Button>
              <Button variant="secondary" onClick={handleClose8}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/*=========================================== add to task modal end============================================================== */}


{/* =================================add remarks modal start================================================================ */}

    <Modal show={show6} onHide={handleClose6} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Note/Remarks</Modal.Title>
            </Modal.Header>
            <Modal.Body>
         

     
            <div className="col-md-6"><label className="labels">Note</label>
            <input type="textarea" className="form-control form-control-sm" style={{height:"100px"}} placeholder={dealdata.remarks} onChange={(e)=>setnote(e.target.value)}/>       
            </div>


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedealdata}>
                Add Note
              </Button>
              <Button variant="secondary" onClick={handleClose6}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/* ======================================add remarks modal end=============================================================== */}


{/* =============================================update action modal start======================================================= */}

  <Modal show={show5} onHide={handleClose5} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Stage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="col-md-6"><label className="labels">From</label>
                  
            <select  className="form-control form-control-sm" required="true">
                    <option>{dealdata.stage}</option>
                        </select>
              </div>
              <div className="col-md-6"></div>

        
          <div className="col-md-6"><label className="labels">To</label><select className="form-control form-control-sm" onChange={(e)=>setupdatestage(e.target.value)}>       
                       
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
           
            


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedealdata}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose5}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/* ================================================update action modal end======================================================== */}
        </div>

            <>
              {isLoading && (
                <div style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  // background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}>
                  <div style={{
                    // backgroundColor: "rgba(0,0,0,0.75)",
                    padding: "40px 60px",
                    borderRadius: "20px",
                    // boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#fff",
                    textAlign: "center",
                  }}>
                    <Lottie
                      animationData={animationData}
                      loop
                      autoplay
                      style={{ height: '120px', width: '120px', marginBottom: '20px' }}
                    />
                    <div style={{ fontSize: "18px", fontWeight: 500 }}>
                      Uploading Data...
                    </div>
                  </div>
                </div>
              )}
            </>
      <ToastContainer/>
    </div>
  )
}

export default Alldeals
