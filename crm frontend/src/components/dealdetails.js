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

function Dealdetails() {

  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch("https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

        const [isLoading4, setIsLoading4] = useState(false);

  const navigate=useNavigate()
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


        const deleteprojectSelectedItems = async () => {
          try {
            if(selectedItems2.length===0)
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

            const resp = selectedItems2.map(async (itemId) => {
              await api.delete(`deleteproject/${itemId}`);
            });
            Swal.fire({
            title: '🎉 Success!',
            text: `Selected items deleted successfully!`,
            icon: 'success',
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });

          } catch (error) {
            Swal.fire({
            title: 'Error ❌',
            text: error.response?.data?.message || 'Something went wrong!',
            icon: 'error',
            timer: 2000,
            showConfirmButton: true,
          });
          }
        };

      
    // ===================================search deal via search box start========================================================

    const[searchinput,setsearchinput]=useState('')
      const handlesearchchange=(e)=>
      {
        setsearchinput(e.target.value)
      }

      const handlekeypress2=(event)=>
        {
            if(event.key==="Enter")
                {
                    setdata(data.filter((item)=>
                    (
                      item.project==searchinput
                    )))
                    document.getElementById("dealsearch").value=''
                }
            
        }


    //=========================================== search deal via search box end===============================================

       
         
/*-------------------------------------------------------------------update inventory start---------------------------------------------------------------------------- */

        
     
        
        
      
      
       
       

 /*-------------------------------------------------------------------update updatecontactdata end---------------------------------------------------------------------------- */                                                     
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
 
 
 
 
 
 
 
 
     
        
          
    

    const[ischecked,setischecked]=useState(false)
    const handleischeckedchange=(e)=>
    {
      setischecked(e.target.checked)
    }

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
      
    //   ({:"",stage:"",project:"",block:"",unit_number:"",floors:"",
    //     expected_price:"",quote_price:"",security_deposite:"",
    //  maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
    //  deal_type:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
    //  owner_details:[],document_details:[],s_no:[],preview:[],descriptions:[],category:[],action:[],s_no1:[],url:[],action1:[],
    //  website:"",social_media:"",send_matchedlead:""})
      const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'owner_details', name: 'Owner_Details' },
        { id: 'associated_contact', name: 'Associated_Contact' },
        { id: 'expected_price', name: 'Expectation' },
        { id: 'matchinglead', name: 'Matched_Lead' },
        { id: 'stage', name: 'Status' },
        { id: 'user', name: 'Assigned To' },
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

                 const [isLoading,setIsLoading] = useState(false);

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
                

// =================================matched lead code end=======================================================================


// ==========================================project code start======================================================================


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
                
                  
      const [allcitis,setallcitis]=useState([])
      useEffect(()=>
      {
     const result=flattenedUnits.map((item)=>item.ucity)
     setallcitis([...new Set(result)]);
     
     },[flattenedUnits])
     // console.log(allcitis);


                  const[activeunits,setactiveunits]=useState([])
                  const[inactiveunits,setinactiveunits]=useState([])
                  useEffect(()=>
                  {
                    const active=flattenedUnits.filter((item)=>item.stage==="Active")
                    setactiveunits(active)

                    const inactive=flattenedUnits.filter((item)=>item.stage==="InActive")
                    setinactiveunits(inactive)

                  },[flattenedUnits])
  
                  
                  const[totalinventories,settotalinventories]=useState(0)
                  const [totalResidential, setTotalResidential] = useState(0);
                  const [totalcommercial, settotalcommercial] = useState(0);
                  const [totalagriculture, settotalagriculture] = useState(0);
                  const [totalindustrial, settotalindustrial] = useState(0);
                  const [totalinstitutional, settotalinstitutional] = useState(0);
                  useEffect(()=>
                  {
                    const tinventories=flattenedUnits.length
                    settotalinventories(tinventories)

                    const residentialCount = flattenedUnits.filter(unit => unit.category === 'Residential').length;
                    setTotalResidential(residentialCount);

                    const commercialcount = flattenedUnits.filter(unit => unit.category === 'Commercial').length;
                    settotalcommercial(commercialcount);

                    const agriculturecount = flattenedUnits.filter(unit => unit.category === 'Agriculture').length;
                    settotalagriculture(agriculturecount);

                    const insdustrialcount = flattenedUnits.filter(unit => unit.category === 'Industrial').length;
                    settotalindustrial(insdustrialcount);

                    const institutionalcount = flattenedUnits.filter(unit => unit.category === 'Institutional').length;
                    settotalinstitutional(institutionalcount);
                  },[flattenedUnits])

                  const [isFlipped, setIsFlipped] = useState(false);

                  const pagereload = () => {
                    // Flip effect for contactlistview to companylistview
                    setIsFlipped(true);
                    setTimeout(() => {
                      document.getElementById("contactlistview").style.display = "none";
                      document.getElementById("projectlistview").style.display = "block";
                    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
                  };
                
                  const pagereload2 = () => {
                    // Flip effect for companylistview to contactlistview
                    setIsFlipped(false);
                    setTimeout(() => {
                      document.getElementById("unitlistview").style.display = "block";
                      document.getElementById("projectlistview").style.display = "none";
                    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
                  };

                  const pagereload3 = () => {
                    // Flip effect for companylistview to contactlistview
                    setIsFlipped(false);
                    setTimeout(() => {
                      document.getElementById("unitlistview").style.display = "none";
                      document.getElementById("contactlistview").style.display = "block";
                    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
                  };

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


                  const [currentPage1, setCurrentPage1] = useState(1);
                  const [itemsPerPage1, setItemsPerPage1] = useState(10); // User-defined items per page
                  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
                  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
                  const currentItems2 = cdata.slice(indexOfFirstItem1, indexOfLastItem1);
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

                 


                  
                  

                  const allprojectColumns = [
                  
                    { id: 'sno', name: '#' },
                    { id: 'projectname', name: 'Project Name' },
                    { id: 'location', name: 'Location' },
                    { id: 'block', name: 'Block' },
                    { id: 'category', name: ' Category' },
                    { id: 'unit_type', name: 'Unit Type ' },
                    { id: 'user', name: 'User ' },
                    { id: 'date', name: 'Date' },
                  ];
                  const [selectedItems2, setSelectedItems2] = useState([]); // To track selected rows
                  const [selectAll2, setSelectAll2] = useState(false); // To track the state of the "Select All" checkbox
                  const [visibleColumns2, setVisibleColumns2] = useState(allprojectColumns.slice(1, 8));
                  const [showColumnList1, setShowColumnList1] = useState(false);
                
                  const handleAddColumnClick1 = () => {
                    setShowColumnList1(!showColumnList1);
                  };
                
                  const handleCheckboxChange1 = (column) => {
                    if (visibleColumns2.some((col) => col.id === column.id)) {
                      // Remove column from visibleColumns if it's already present
                      setVisibleColumns2(visibleColumns2.filter((col) => col.id !== column.id));
                    } else {
                      // Add column to visibleColumns
                      setVisibleColumns2([...visibleColumns2, column]);
                    }
                  };
                  const handleSelectAll2 = () => {
                
                    setSelectAll2(!selectAll2);
                    if (!selectAll2) {
                      // Add all current page item IDs to selectedItems
                      setSelectedItems2(currentItems2.map((item) => item._id));
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

      

 // ===================================search deal via search box start========================================================

                      const[projectsearchinput,setprojectsearchinput]=useState('')
                      const handleprojectsearchchange=(e)=>
                      {
                        setprojectsearchinput(e.target.value)
                      }

                      const handlekeypress3=(event)=>
                        {
                            if(event.key==="Enter")
                                {
                                    setcdata(cdata.filter((item)=>
                                    (
                                      item.name==projectsearchinput
                                    )))
                                    document.getElementById("projectsearch").value=''
                                }
                            
                        }


  //=========================================== search deal via search box end===============================================

  //========================================= units code start =======================================================================

                  const allunitColumns = [
                  
                    { id: 'sno', name: '#' },
                    { id: 'details', name: 'Details' },
                    { id: 'stage', name: 'Status' },
                    { id: 'ownerdetails', name: 'Owner_Details' },
                    { id: 'owneraddress', name: ' Owner_Address' },
                    { id: 'associatedcontact', name: 'Associated_Contact ' },
                    { id: 'remarks', name: 'Remarks ' },
                    { id: 'locationbrief', name: 'Location_Brief' },
                    { id: 'ownership', name: 'OwnerShip' },
                    { id: 'followup', name: 'Follow_Up' },
                    { id: 'lastconduct', name: 'Last_Conduct_Date_&_Time' },
                  ];
                  const [selectedItems3, setSelectedItems3] = useState([]); // To track selected rows
                  const [selectAll3, setSelectAll3] = useState(false); // To track the state of the "Select All" checkbox
                  const [visibleColumns3, setVisibleColumns3] = useState(allunitColumns.slice(1, 11));
                  const [showColumnList2, setShowColumnList2] = useState(false);

                  const handleAddColumnClick2 = () => {
                    setShowColumnList2(!showColumnList2);
                  };
                
                  const handleCheckboxChange2 = (column) => {
                    if (visibleColumns3.some((col) => col.id === column.id)) {
                      // Remove column from visibleColumns if it's already present
                      setVisibleColumns3(visibleColumns3.filter((col) => col.id !== column.id));
                    } else {
                      // Add column to visibleColumns
                      setVisibleColumns3([...visibleColumns3, column]);
                    }
                  };
                  const handleSelectAll3 = () => {
              
                    setSelectAll3(!selectAll3);
                    if (!selectAll3) {
                      // Add all current page item IDs to selectedItems
                      setSelectedItems3(currentItems3.map((item) => item));
                    } else {
                      // Deselect all
                       setSelectedItems3([]);
                
                    }
                  };
                
                  const handleRowSelect3 = (item) => {
            
                    if (selectedItems3.includes(item)) {
                      setSelectedItems3(selectedItems3.filter((itemId) => itemId !== item));
                    } else {
                      setSelectedItems3([...selectedItems3, item]);
                  
                    }
                  };





                  const [currentPage2, setCurrentPage2] = useState(1);
                  const [itemsPerPage2, setItemsPerPage2] = useState(10); // User-defined items per page
                  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
                  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
               
                  const totalPages2 = Math.ceil(flattenedUnits.length / itemsPerPage2);
                  
                const extractUnitNumber = (value) => {
                if (!value) return 0;
                const str = String(value); // Ensure it's a string
                const match = str.match(/\d+/); // Extract first number
                return match ? parseInt(match[0], 10) : 0;
              };
              const sortedUnits = [...flattenedUnits].sort(
              (a, b) => extractUnitNumber(a.unit_no) - extractUnitNumber(b.unit_no)
            );
               const currentItems3 = sortedUnits.slice(indexOfFirstItem2, indexOfLastItem2);

              
                  
                    // Handle items per page change
                    const handleItemsPerPageChange2 = (e) => {
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


          
 // ===================================search deal via search box start========================================================

                const[unitsearchinput,setunitsearchinput]=useState('')
                const handleunitsearchchange=(e)=>
                {
                  setunitsearchinput(e.target.value)
                }

                const handlekeypress4=(event)=>
                  {
                      if(event.key==="Enter")
                          {
                              setFlattenedUnits(flattenedUnits.filter((item)=>
                              (
                                item.project_name==unitsearchinput
                              )))
                              document.getElementById("unitsearch").value=''
                          }
                      
                  }


//=========================================== search deal via search box end===============================================

  
              

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
      
                            if(selectedItems2.length===0)
                              {
                                document.getElementById("projectdelete").style.display="none"
                                document.getElementById("projectedit").style.display="none"
                           
                                    document.getElementById("projectsendall").style.display="none"
                
                                    document.getElementById("projectupdate").style.display="none"
                                    document.getElementById("projectmatchedlead").style.display="none"
                              
                                    document.getElementById("projectaddtag").style.display="none"
                                 
                                    document.getElementById("projectpublishon").style.display="none"
                                    
                                    document.getElementById("projectpreview").style.display="none"
                                    document.getElementById("projectadddocument").style.display="none"
                                    document.getElementById("projectuploadpicture").style.display="none"
                                  document.getElementById("projectsearch").style.display="flex"
                                  
                              }
                            if(selectedItems2.length===1)
                              {
                                document.getElementById("projectdelete").style.display="inline-block"
                                document.getElementById("projectedit").style.display="inline-block"
                                document.getElementById("projectsendall").style.display="inline-block"
                          
                
                                    document.getElementById("projectupdate").style.display="inline-block"
                                    document.getElementById("projectmatchedlead").style.display="inline-block"
                              
                                    document.getElementById("projectaddtag").style.display="inline-block"
                                 
                                    document.getElementById("projectpublishon").style.display="inline-block"
                                    
                                    document.getElementById("projectpreview").style.display="inline-block"
                                    document.getElementById("projectadddocument").style.display="inline-block"
                                    document.getElementById("projectuploadpicture").style.display="inline-block"
                                  document.getElementById("projectsearch").style.display="none"
                           
                              }
                           
                    
                                if(selectedItems2.length>1)
                                  {
                                    document.getElementById("projectdelete").style.display="inline-block"
                                    document.getElementById("projectedit").style.display="none"
                                    document.getElementById("projectsendall").style.display="inline-block"
                        
                    
                                        document.getElementById("projectupdate").style.display="none"
                                        document.getElementById("projectmatchedlead").style.display="none"
                                  
                                        document.getElementById("projectaddtag").style.display="none"
                                     
                                        document.getElementById("projectpublishon").style.display="none"
                                        
                                        document.getElementById("projectpreview").style.display="none"
                                        document.getElementById("projectadddocument").style.display="none"
                                        document.getElementById("projectuploadpicture").style.display="none"
                                      document.getElementById("projectsearch").style.display="none"
                                  }
                                  if(selectedItems3.length===0)
                                    {
                                      document.getElementById("unitdelete").style.display="none"
                                      document.getElementById("unitedit").style.display="none"
                                      document.getElementById("unitsendall").style.display="none"
                                   
                                           document.getElementById("unitcreatedeal").style.display="none"
                                            // document.getElementById("unitaddunit").style.display="none"
                                         
                                          document.getElementById("unitaddremoveowner").style.display="none"
                                          document.getElementById("unitmatchedlead").style.display="none"
                                          document.getElementById("unitcall").style.display="none"
                                          document.getElementById("unitaddtag").style.display="none"
                                          document.getElementById("unitaddremarks").style.display="none"
                                         
                                          document.getElementById("unitupdatestage").style.display="none"
                                          document.getElementById("unitpreview").style.display="none"
                                          document.getElementById("unitadddocument").style.display="none"
                                          document.getElementById("unituploadpicture").style.display="none"
                                          document.getElementById("unitcustomerfeedback").style.display="none"
                                        document.getElementById("unitsearch").style.display="flex"
                                       
                                    }
                                    if(selectedItems3.length===1)
                                      {
                                        document.getElementById("unitdelete").style.display="inline-block"
                                        document.getElementById("unitedit").style.display="inline-block"
                                        document.getElementById("unitsendall").style.display="inline-block"
                                     
                                             document.getElementById("unitcreatedeal").style.display="inline-block"
                                              // document.getElementById("unitaddunit").style.display="inline-block"
                                           
                                            document.getElementById("unitaddremoveowner").style.display="inline-block"
                                            document.getElementById("unitmatchedlead").style.display="inline-block"
                                            document.getElementById("unitcall").style.display="inline-block"
                                            document.getElementById("unitaddtag").style.display="inline-block"
                                            document.getElementById("unitaddremarks").style.display="inline-block"
                                           
                                            document.getElementById("unitupdatestage").style.display="inline-block"
                                            document.getElementById("unitpreview").style.display="inline-block"
                                            document.getElementById("unitadddocument").style.display="inline-block"
                                            document.getElementById("unituploadpicture").style.display="inline-block"
                                            document.getElementById("unitcustomerfeedback").style.display="inline-block"
                                          document.getElementById("unitsearch").style.display="none"
                                         
                                      }
                                      if(selectedItems3.length>1)
                                        {
                                          document.getElementById("unitdelete").style.display="inline-block"
                                          document.getElementById("unitedit").style.display="none"
                                          document.getElementById("unitsendall").style.display="inline-block"
                                        
                                               document.getElementById("unitcreatedeal").style.display="none"
                                                // document.getElementById("unitaddunit").style.display="none"
                                             
                                              document.getElementById("unitaddremoveowner").style.display="none"
                                              document.getElementById("unitmatchedlead").style.display="none"
                                              document.getElementById("unitcall").style.display="none"
                                              document.getElementById("unitaddtag").style.display="none"
                                              document.getElementById("unitaddremarks").style.display="none"
                                             
                                              document.getElementById("unitupdatestage").style.display="none"
                                              document.getElementById("unitpreview").style.display="none"
                                              document.getElementById("unitadddocument").style.display="none"
                                              document.getElementById("unituploadpicture").style.display="none"
                                              document.getElementById("unitcustomerfeedback").style.display="none"
                                            document.getElementById("unitsearch").style.display="none"
                                           
                                        }
                        
                          },[selectedItems,selectedItems2,selectedItems3])

                          const[deal,setdeal]=useState({project_category:[],project_subcategory:"",location:"",ulocality:"",ucity:"",
                            utype:"",ucategory:[],usize:"",available_for:"",stage:"",project:"",block:"",unit_number:"",floors:"",
                            expected_price:"",quote_price:"",security_deposite:"",owner_details:[],associated_contact:[],relation:"",
                          maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
                          deal_type:"",deal_case:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
                          website:"",social_media:"",send_matchedlead:"",matchedleads:[],matchinglead:"",remarks:""})


                        
      


        
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


// ======================================unit edit start========================================================================

const [project,setproject]=useState({name:"",developer_name:"",joint_venture:"",secondary_developer:"",rera_number:"",descriptions:"",
  category:[],sub_category:[],land_area:"",measurment1:"",total_block:"",total_floor:"",
  total_units:"",zone:[],status:"",launched_on:"",expected_competion:"",possession:"",parking_type:[],
  approved_bank:"",approvals:[''],registration_no:[''],date:[''],pic:[''],action1:[],owner:[],
  team:[],visible_to:"",

  location:"",lattitude:"",langitude:"",address:"",street:"",locality:"",city:"",zip:"",state:"",country:"",

  add_block:[],add_size:[],add_unit:[],basic_aminities:[],features_aminities:[],nearby_aminities:[],
  price_list:[],Payment_plan:[]});


  const[unit,setunit]=useState([])
  const[units,setunits]=useState({unit_no:"",unit_type:"",category:"",block:"",
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


const [show9, setshow9] = useState(false);
    
                  const handleClose9 = () => setshow9(false);
                  // const[fetchunit,setfetchunit]=useState([])
                  const handleShow9=async()=>
                  {
                    setshow9(true);
                    const project=selectedItems3[0].project_name
                    const block=selectedItems3[0].block
                    const unit=selectedItems3[0].unit_no

                    const resp=await api.get(`viewprojectforinventories/${project}/${unit}/${block}`)
                    setunits(resp.data.project.add_unit[0])
                   fetchdatabyprojectname(project)
                  }
                // console.log(units.owner_details);
                
                const config = {
                  headers: {
                    'Content-Type': 'multipart/form-data' // Set the Content-Type here
                  }
              }
      
              
          const updateinventories=async()=>
          {
            const project=selectedItems3[0].project_name
            const block=selectedItems3[0].block
            const unit=selectedItems3[0].unit_no
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


               // ✅ Run both updates in parallel
                const [resp, resp1] = await Promise.all([
                  api.put(`updateprojectforinventories/${project}/${unit}/${block}`, units, config),
                  // api.put(`updatedealowner/${project}/${block}/${unit}`, units, config),
                ]);

             
              toast.success(`new owner added successfully`,{autoClose:"2000"})
                              setTimeout(() => {
                                window.location.reload()
                              }, 2000);
            } catch (error) {
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
              
            }
          }
                  

                
                      


                                  


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
                                                                          
                                                                          
                                                                      
                                                                     


                                              const addunit = () => {

                                                  if (units.unit_no ) 
                                                    {
                                                      const updateunit= [...unit,...project.add_unit, units];
                                                      setunit(updateunit);
                                                      setproject(prevState => ({
                                                        ...prevState,
                                                        add_unit: updateunit
                                                      }));
                                                      
                                                      handleClose9()

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

  const [activeUnit, setActiveUnit] = useState(1); // Track active unit tab
      const [modalSize, setModalSize] = useState('lg');



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

                         const [selectedType, setSelectedType] = useState(null);
                    
                              const handleTypeClick1 = (type) => {
                                setSelectedType(type);
                            setunits((prevunits)=>({
                              ...prevunits,
                              category:type
                            }))
                        };


                        function addFn12() {
                  
     
                          setunits({
                            ...units,
                            document_no:[...units.document_no,''],
                            document_name: [...units.document_name, ''],
                            document_Date: [...units.document_Date, ''],
                            image: [...units.image, ''],
                            action12: [...(units.action12 || []), ''] 
                          });
                        }
                      
                        const deleteall12 = (index) => {
                          const newdocument_no = (units.document_no || []).filter((_, i) => i !== index);
                          const newdocumentname = (units.document_name || []).filter((_, i) => i !== index);
                          const newdocumentdate = (units.document_Date || []).filter((_, i) => i !== index);
                          const newpic = (units.image || []).filter((_, i) => i !== index);
                          const newaction12 = (units.action12 || []).filter((_, i) => i !== index);
                        
                          setunits({
                            ...units,
                            document_no: newdocument_no,
                            document_name: newdocumentname,
                            document_Date: newdocumentdate,
                            image: newpic,
                            action12: newaction12
                          });
                        };
                        
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
                         
                          const mapStyles1 = {
                            height: "500px",
                            width: "100%"
                          }
                        
                          const defaultCenter1 = {
                            lat: coordinates1.lat || 37.7749, lng: coordinates1.lng || -122.4194
                          };


                             const [showabuiltup, setSowbuiltup] = useState(false); // Track the checkbox state
                          
                                                    // Handle the checkbox change to show/hide plot size section
                                                    const handleCheckboxChange4 = (event) => {
                                                      setSowbuiltup(event.target.checked);
                                                    };


// ========================================edit unit end===========================================================================


// ========================================delete unit start=========================================================================


const deleteinventories=async()=>
  {
    console.log(selectedItems3);
    
    // const project=selectedItems3[0].project_name
    // const block=selectedItems3[0].block
    // const unit=selectedItems3[0].unit_no
    
    try {

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
       await Promise.all(selectedItems3.map(item =>
      api.delete(`deleteprojectforinventories/${item.project_name}/${item.unit_no}/${item.block}`)
    ));
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
      toast.error(`failed to delete units`,{autoClose:"2000"})
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      console.log(error);
      
    }finally
          {
              setIsLoading4(false)
          }
  }


// ==============================================delete unit end==================================================================



// ===================================================edit deal start===================================================================

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


// useEffect(() => {
//   const updateDealsWithMatchedLeads = async () => {
//     if (deals.length > 0 && leads.length > 0) {
//       const updatedDeals = deals.map((deal) => {
//         const dealType = deal.available_for === 'Sale' ? 'Buy' : deal.available_for;

//         const matchingLeads = leads.filter(
//           (lead) => lead.requirment === dealType
//         );

//         const matchedLeadIds = matchingLeads.map((lead) => lead._id);

//         return {
//           ...deal,
//           matchedleads: matchedLeadIds,
//           matchinglead: matchedLeadIds.length,
//         };
//       });

//       setDeals(updatedDeals); // or however you're updating all deal state
//     }
//   };

//   updateDealsWithMatchedLeads();
// }, [deals, leads]);




// ===================================update deal each time while adding or delete lead start================================================

// const[unitData,setunitData]=useState([])
// const fetchunitfordeal=async(item)=>
// {
//   try {
//     console.log(item);
    
//     const response = await api.get(`viewprojectforinventories/${item.project}/${item.unit_number}/${item.block}`);
//     setunitData(response?.data?.project?.add_unit?.[0]);
    
//   } catch (error) {
//     console.log(error);
    
//   }
// }


// useEffect(() => {
//   if (leaddata.length > 0 && data.length > 0) {
//     const updatedDeals = data.map((singleDeal) => {
//       fetchunitfordeal(singleDeal)
//       const availableFor = singleDeal.available_for === 'Sale' ? 'Buy' : singleDeal.available_for;
//       const price=singleDeal.expected_price;
//       const propertytype=unitData.category
//      console.log(propertytype);
     

//       const matchedLeads = leaddata.filter(
//         (lead) => lead.requirment === availableFor
//       );

//       return {
//         ...singleDeal,
//         matchedleads: matchedLeads.map((lead) => lead._id),
//         matchinglead: matchedLeads.length,
//       };
//     });

  
    
//     updatedDeals.forEach(async (deal) => {
//       try {
//         const response = await api.put(`updatedeal/${deal._id}`,deal);

//         // if (!response.status===200) {
//         //   console.error(`Failed to update deal ${deal._id}`);
//         // }
//         // else {
//         //   console.log(`Successfully updated deal ${deal._id}`);
//         // }
//       } catch (err) {
//         console.error(`Error updating deal ${deal._id}:`, err);
//       }
//     });
//   }
// }, [data,leaddata]);

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




// ===================================update deal each time while adding or delete lead  end===========================================


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


//========================================== project suggestion box code start=======================================================

const [searchTermproject, setSearchTermproject] = useState('');
const [suggestionsproject, setSuggestionsproject] = useState([]);

                const handleSearchChangeproject = (e) => {
                  const value = e.target.value;
                  setSearchTermproject(value);

                  if (value.trim() === '') {
                    setSuggestionsproject([]);
                    fetchcdata()
                    return;
                  }

                  const filtered = allprojectforsearch.filter(item =>
                  {
                    const nameMatch =
                      item.name && item.name.toLowerCase().includes(value.toLowerCase());

                    const blockMatch =
                      Array.isArray(item.add_block) &&
                      item.add_block.some(block =>
                        String(block.block_name).toLowerCase().includes(value.toLowerCase())
                      );

                    const unitMatch =
                      Array.isArray(item.add_unit) &&
                      item.add_unit.some(unit =>
                        String(unit.unit_no).toLowerCase().includes(value.toLowerCase())
                      );

                    return nameMatch || blockMatch || unitMatch;
                    
                 } );

                  setSuggestionsproject(filtered); // Limit to 5 suggestions
                  setcdata(filtered)
                };

                const handleSuggestionClickproject = (item) => {
                  const blockStr = Array.isArray(item.add_block) ? item.add_block.map(block=>block.block_name).join(", ") : "";
                  const unitStr = Array.isArray(item.add_unit) ? item.add_unit.map(unit=>unit.unit_no).join(", ") : "";
                
                  setSearchTermproject(`${item.name} - ${blockStr} - ${unitStr}`);
                  setSuggestionsproject([]);
                  setcdata([item])

                  // You can also do something with the selected item (e.g. set selectedDeal)
                };

                const wrapperRef = useRef(null);


                useEffect(() => {
                  function handleClickOutside(event) {
                    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                      setSuggestionsproject([]); // 👈 close suggestions
                      setSuggestions([])
                    }
                  }
                
                  document.addEventListener("mousedown", handleClickOutside);
                  return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
                  };
                }, []);
                

// ============================================project suggestion box code end======================================================
  

//========================================= units suggestion box code start=============================================================

const [searchTermunits, setSearchTermunits] = useState('');
const [suggestionsunit, setSuggestionsunit] = useState([]);

                const handleSearchChangeunit = (e) => {
                  const value = e.target.value;
                  setSearchTermunits(value);

                  if (value.trim() === '') {
                    setSuggestionsunit([]);
                    fetchcdata()
                    return;
                  }

                  const filtered = allunitsforsearch.filter(item =>
                  {
                    const projectmatch =item.project_name && item.project_name.toLowerCase().includes(value.toLowerCase());

                    const blockmatch =item.block && item.block.toLowerCase().includes(value.toLowerCase());

                    const unitmatch =item.unit_no && item.unit_no.toLowerCase().includes(value.toLowerCase());

                    const ownermatch =
                      Array.isArray(item.owner_details) &&
                      item.owner_details.some(owner =>
                        (owner.first_name && owner.first_name.toLowerCase().includes(value.toLowerCase())) ||
                        (owner.last_name && owner.last_name.toLowerCase().includes(value.toLowerCase())) ||
                        (owner.mobile_no && String(owner.mobile_no).toLowerCase().includes(value.toLowerCase()))
                      );

                    const associatematch =
                      Array.isArray(item.associated_contact) &&
                      item.associated_contact.some(contact =>
                        (contact.first_name && contact.first_name.toLowerCase().includes(value.toLowerCase())) ||
                        (contact.last_name && contact.last_name.toLowerCase().includes(value.toLowerCase())) ||
                        (contact.mobile_no && String(contact.mobile_no).toLowerCase().includes(value.toLowerCase()))
                      );

                    return projectmatch || blockmatch || unitmatch || ownermatch || associatematch
                    
                 } );

                  setSuggestionsunit(filtered); // Limit to 5 suggestions
                  setFlattenedUnits(filtered)
                };

                const handleSuggestionClickunit = (item) => {
                  const ownerStr = Array.isArray(item.owner_details) ? item.owner_details.map(owner=>`${owner.title || ""} ${owner.first_name || ""} ${owner.last_name || ""}`).join(", ") : "";
                  const associateStr = Array.isArray(item.associated_contact) ? item.associated_contact.map(contact=>`${contact.title || ""} ${contact.first_name || ""} ${contact.last_name || ""}`).join(", ") : "";
                
                  setSearchTermunits(`${item.project_name} -${item.block} -${item.unit_no} - ${ownerStr} - ${associateStr}`);
                  setSuggestionsunit([]);
                  setFlattenedUnits([item])

                  // You can also do something with the selected item (e.g. set selectedDeal)
                };



// ====================================units suggestion box code end=============================================================


//============================================== feedback form start================================================================

                const [show, setShow] = useState(false);
                const [isClosing, setIsClosing] = useState(false);
                const toastRef = useRef(null);

                    const toggleToast = async() => {

                      setShow(true);
                      document.getElementById('unitlistview').style.filter = 'blur(5px)';
                    
                    const project=selectedItems3[0].project_name
                    const block=selectedItems3[0].block
                    const unit=selectedItems3[0].unit_no

                    const resp=await api.get(`viewprojectforinventories/${project}/${unit}/${block}`)
                    setunits(resp.data.project.add_unit[0])
                    };


              const handleCancel = () => {
                 document.getElementById('unitlistview').style.filter = 'none';
                setIsClosing(true); // trigger slide-out
                setTimeout(() => {
                  setShow(false);     // hide the toast completely
                  setIsClosing(false); // reset for next open
                }, 500); // duration should match animation time
              };

            const[feedbackform,setfeedbackform]=useState({owner:"",unit_no:"",owner_response:"",discussed_reason:"",other_discussed_reason:"",
                                                          seller_price:"",my_price:"",next_call_date:"",no_reason:"",other_no_reason:"",stage:"",remarks:""})
          
        const[ownerlist,setownerlist]=useState([])
          useEffect(() => {
          if (selectedItems3?.[0]?.unit_no) {
            setfeedbackform(prev => ({
              ...prev,
              unit_no: selectedItems3[0].unit_no,
            }));
            const alllist=[...selectedItems3[0].owner_details,...selectedItems3[0].associated_contact]
            setownerlist(alllist)
          }
        }, [selectedItems3]);
        // console.log(ownerlist);
        

          useEffect(() => {
          if (feedbackform.owner_response==="Yes" || feedbackform.owner_response==="Yes -Sell this property but buy another") {
            setfeedbackform(prev => ({
              ...prev,
              stage: "Active",
            }));
          }
          if (feedbackform.owner_response==="Sold" || feedbackform.owner_response==="No -But discussed about price"
            || feedbackform.owner_response==="No -But wants to buy another property" || feedbackform.owner_response==="Thinking may/be in future"
            || feedbackform.owner==="Sold -But Interested to sell Another Property" || feedbackform.owner_response==="Sold -But Interested to Buy Another Property")
             {
            setfeedbackform(prev => ({
              ...prev,
              stage: "Active",
            }));
          }
            if (feedbackform.owner_response==="No") {
            setfeedbackform(prev => ({
              ...prev,
              stage: "Inactive",
            }));
          }
        }, [feedbackform.owner_response]);


          const reasonsList = [
            "Had bad experience with previous agent",
            "Will sell after completion of construction",
            "Will sell after registry",
            "Don’t want to involve brokers / privacy concern",
            "Already dealing with another broker",
            "Waiting for better market price",
            "Price expectations not matching",
            "Other"
          ];

const noreasonsList = [
  "Family not agreed yet / Internal family issue",
  "Property is under dispute / Legal issue",
  "Still under use (self-living / family living)",
  "Currently rented out / tenant issue",
  "Emotional attachment with property",
  "Recently bought, not planning to sell yet",
  "Joint ownership, others not willing",
  "Will sell only if urgent need arises",
  "Planning to construct house",
  "Can’t decide right now / need more time",
  "Not interested in selling at all",
  "Other"
];

const addfeedback = async () => {
  try {
            const project=selectedItems3[0].project_name
            const block=selectedItems3[0].block
            const unit=selectedItems3[0].unit_no
            let updatedUnits = { ...units, stage: feedbackform.stage };
    const resp = await api.post('addfeedback', feedbackform);
    if (resp.status === 200) {
  
      let htmlContent = "<p>Feedback submitted successfully!</p>";

      // Generate dynamic buttons based on owner_response
      switch (feedbackform.owner_response) {
        case "Yes":
        await api.put(`updateprojectforinventories/${project}/${unit}/${block}`, updatedUnits, config)
        case "Sold -But Interested to sell Another Property":
          htmlContent += `
            <button id="createDealBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Create Deal
            </button>
          `;
          break;

        case "Yes -Sell this property but buy another":
          htmlContent += `
            <button id="createDealBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Create Deal
            </button>
            <button id="leadRequirementBtn" style="${buttonStyle}; margin-left: 10%;">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Lead Requirement
            </button>
          `;
          break;

        case "No -But wants to buy another property":
          htmlContent += `
            <button id="leadRequirementBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Lead Requirement
            </button>
          `;
          break;

        case "Sold":
          await api.put(`updateprojectforinventories/${project}/${unit}/${block}`, updatedUnits, config)
          htmlContent += `
            <button id="addOwnerBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Add New Owner
            </button>
          `;
          break;

        case "Sold -But Interested to Buy Another Property":
          await api.put(`updateprojectforinventories/${project}/${unit}/${block}`, updatedUnits, config)
          htmlContent += `
            <button id="addLeadBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Add Lead
            </button>
          `;
          break;

        default:
          // no buttons for other values
          break;
      }

      Swal.fire({
        title: "Feedback Submitted",
        html: htmlContent,
        icon: "success",
        showConfirmButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
        didOpen: () => {
          const addHoverEffects = (btn) => {
            btn.addEventListener('mouseenter', () => {
              btn.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
              btn.style.transform = "scale(1.03)";
            });
            btn.addEventListener('mouseleave', () => {
              btn.style.background = "linear-gradient(135deg, #28a745, #218838)";
              btn.style.transform = "scale(1)";
            });
          };

          const dealBtn = document.getElementById('createDealBtn');
          if (dealBtn) {
            addHoverEffects(dealBtn);
            dealBtn.addEventListener('click', () => {
              const unit = encodeURIComponent(JSON.stringify(selectedItems3[0]));
              window.open(`/deal?unit=${unit}`, '_blank');
            });
          }

          const leadBtn = document.getElementById('leadRequirementBtn');
          if (leadBtn) {
            addHoverEffects(leadBtn);
            leadBtn.addEventListener('click', () => {
              const owner = encodeURIComponent(feedbackform.owner);
              window.open(`/leadrequirment?owner=${owner}`, '_blank');
            });
          }

          const addOwnerBtn = document.getElementById('addOwnerBtn');
          if (addOwnerBtn) {
            addHoverEffects(addOwnerBtn);
            addOwnerBtn.addEventListener('click', () => {
              handleShow7();
            });
          }

          const addLeadBtn = document.getElementById('addLeadBtn');
          if (addLeadBtn) {
            addHoverEffects(addLeadBtn);
            addLeadBtn.addEventListener('click', () => {
              window.open('/leadinfo', '_blank');
            });
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          handleCancel(); // Close or reset form
        }
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Feedback Error",
      text: error?.response?.data?.message || "Something went wrong!",
      icon: "error",
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
    });
  }
};

// Button style reused
const buttonStyle = `
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
`;




  

// ============================================feedback form end=====================================================================
  
//============================================= add new owner start =======================================================================

    const [show7, setshow7] = useState(false);
                          const handleClose7 = () => setshow7(false);
                          const handleShow7=async()=>
                          {
                            setshow7(true);
                            handleCancel()
                             const project=selectedItems3[0].project_name
                              const block=selectedItems3[0].block
                              const unit=selectedItems3[0].unit_no

                              const resp=await api.get(`viewprojectforinventories/${project}/${unit}/${block}`)
                              setunits(resp.data.project.add_unit[0])
                          
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
            setrelation1(relation)
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

          const updatedContacts2 = selectedcontact2.filter(contact => contact._id !== id);
          setselectedcontact2(updatedContacts2)
          setunits((prevState) => ({
            ...prevState,
            associated_contact: updatedContacts4,
          }));

        };


// =================================================add new owner end===================================================================


  // ===============================================filter code start==================================================================
  
        const [showunit, setShowunit] = useState(false);
                  const [isClosingunit, setIsClosingunit] = useState(false);
                  const toastRefunit = useRef(null);
  
                      const toggleToastunit = async() => {
                        setShowunit(true);
                      };
  
  
                const handleCancelunit = () => {
                  setIsClosingunit(true); // trigger slide-out
                  setTimeout(() => {
                    setShowunit(false);     // hide the toast completely
                    setIsClosingunit(false); // reset for next open
                  }, 500); // duration should match animation time
                };
  
                const handleResetFiltersunit = () => {
                setSelectedunitcategory([]);        // Clear profession selections
                setselectfieldunit({});                // Clear custom field filters
              };
  
  
  const unitcategory = [
    'Residential', 
    'Commercial', 
    'Agricultural', 
    'Institutional', 
    'Industrial', 
  ];
  
          
    const [selectedunitcategory, setSelectedunitcategory] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown1, setShowDropdown1] = useState(false);
   
      const filterRefunit = useRef();
  
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
        if (filterRefunit.current && !filterRefunit.current.contains(event.target)) {
          setShowDropdown(false); // close the filter box
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handlefilterCheckboxChange = (profession) => {
      const updatedSelections = selectedunitcategory.includes(profession)
        ? selectedunitcategory.filter((p) => p !== profession)
        : [...selectedunitcategory, profession];
      setSelectedunitcategory(updatedSelections);
      
      // Filter the data based on selected professions
     const newFilteredData = allunitsforsearch.filter((item) =>
        updatedSelections.length === 0 ||  item.category?.some(cat => updatedSelections.includes(cat))
      );
      setFlattenedUnits(newFilteredData);
    };
  
   
    const unitfields = [
      { label: 'City', field: 'ucity' },
      { label: 'Location', field: 'location' },
      { label: 'Project Name', field: 'project_name' },
      { label: 'Block/Tower', field: 'block' },
      { label: 'Category', field: 'category' },
      { label: 'Sub Category', field: 'sub_category' },
      { label: 'Unit Type', field: 'unit_type' },
      { label: 'Size', field: 'size' },
      { label: 'Stages/Status', field: 'stage' },
      { label: 'Direction', field: 'direction' },
      { label: 'Road', field: 'road' }, // Added field for from date
      { label: 'Facing', field: 'facing' }
    ];
    
  
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [selectfieldunit, setselectfieldunit] = useState([]);
  
     // Handle checkbox toggle
     const handlefilterCheckboxChange1 = (field) => {
      setselectfieldunit(prev => {
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
        setselectfieldunit((prev) => ({
          ...prev,
          [field]: value,
        }));
      };
  
  
      useEffect(() => {
    
        const filtered = allunitsforsearch.filter(contact => {
          const matchesTextFilters = Object.keys(selectfieldunit).every(field => {
            const value = selectfieldunit[field]?.toLowerCase();
            const contactValue = contact[field]?.toString().toLowerCase() || '';
            return !value || contactValue.includes(value);
          });
          return matchesTextFilters
        });
      
        setFlattenedUnits(filtered);
      }, [selectfieldunit, allunitsforsearch]);
      
      
      
      
    
  
  
  //================================================== filter code end==================================================================


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

//=============================== convert date format start==============================================================================
const excelSerialToDateString = (serial) => {
  const excelEpoch = new Date(1900, 0, 1); // Jan 1, 1900
  const jsDate = new Date(excelEpoch.getTime() + (serial - 1) * 86400000);
  return jsDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
};

// ===========================================convert date format end================================================================
return (
        <div>
            <Header1/>
            <Sidebar1/>
            <div className={`flip-container ${isFlipped ? 'flipped' : ''}`}>
            <div id="contactlistview" className="flip-card-front">
      <div style={{marginTop:"52px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",marginTop:"10px",cursor:"pointer"}} onClick={pagereload}>Deals</h3>
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

      <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"10px",paddingTop:"10px",position:"sticky",top:"50px",zIndex:"999"}}>
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

    <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute"}}>
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
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
                  ) :   col.id === 'matchinglead' ? (
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
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
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
                    
      
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>



</div>

{/* =========================================project list view start ============================================================*/}


          <div id="projectlistview" className="flip-card-back" style={{display:"none"}}>
          <div style={{marginTop:"53px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload2}>Project </h3>
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

      <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px",position:"sticky",top:"50px",zIndex:"999"}}>

{/* <input id="projectsearch" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by name,email,mobile,company and tags" style={{width:"25%"}} onChange={(e)=>handleprojectsearchchange(e)} onKeyDown={handlekeypress3} /> */}

              <input
              // ref={wrapperRef}
              id="projectsearch"
              type="text"
              className="form-control form-control-sm"
              placeholder="Search for project via project name, block or unit no"
              style={{ width: "25%" }}
              value={searchTermproject}
              onChange={(e) => handleSearchChangeproject(e)}
              // onKeyDown={handleKeyPress2}
              autoComplete="off"
            />
          {/* {suggestionsproject.length > 0 && (
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
    {suggestionsproject.map((item, index) => {
      const blockStr = Array.isArray(item.add_block)
      ? item.add_block.map(block => block.block_name).join(", ")
      : "";
      const unitStr = Array.isArray(item.add_unit)
       ? item.add_unit.map(unit=>unit.unit_no).join(',') : "";

      return (
              <li
                key={index}
                className="suggestion-item px-2 py-1"
                onClick={() => handleSuggestionClickproject(item)}
                style={{
                  borderBottom: "1px solid #e0e0e0",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
              >
                <strong>{item.name}</strong><br />
                <span style={{ color: "#555" }}>
                  Block(s): {blockStr} <br />
                  Unit(s): {unitStr}
                </span>
              </li>
            );
          })}
        </ul>
      )} */}


<div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>


<Tooltip title="Delete Data.." arrow>
      <img
        id="projectdelete"
        src={
          isHoveringDelete
            ? "https://cdn-icons-png.freepik.com/512/6861/6861362.png" // hover image
            : "https://cdn-icons-png.freepik.com/512/7078/7078067.png" // default image
        }
       onClick={deleteprojectSelectedItems}
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
        id="projectedit"
        src={
          isHoveringEdit
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7BrBLmrMYynVUzMxsgv8AtIEkFjStD6cFRNYv1to6LupNkPMgkEaEzD5-HIGrjcPj4&usqp=CAU" // hover image
            : "https://static.thenounproject.com/png/1416596-200.png" // default image
        }
        onClick={() => navigate('/editproject', { state: { id: selectedItems2 } })}
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
        id="projectsendall"
        src={
          isHoveringsendmail
            ? "https://cdn-icons-png.flaticon.com/512/786/786407.png" // hover image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkAryM3dt6AWqQt1fHHBAtQ-YFVel4wnqEA&s" // default image
        }
    
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

  <Tooltip title="Preview.." arrow>
      <img
        id="projectpreview"
        src={
          isHoveringpreview
            ? "https://cdn-icons-png.flaticon.com/512/143/143594.png" // hover image
            : "https://icon-library.com/images/preview-icon-png/preview-icon-png-26.jpg" // default image
        }
        onClick={()=>navigate('projectpreview',{state:selectedItems2})} 
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
 <Tooltip title="Update.." arrow>
      <img
        id="projectupdate"
        src={
          isHoveringprojectupdate
            ? "https://cdn-icons-png.flaticon.com/512/6713/6713079.png" // hover image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFo9g6QLJ-P3k8PTrjfrkWBOZI5ptsWJW4g&s" // default image
        }
        onMouseEnter={() => setIsHoveringprojectupdate(true)}
        onMouseLeave={() => setIsHoveringprojectupdate(false)}
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

<Tooltip title="Matched Lead.." arrow>
      <img
        id="projectmatchedlead"
        src={
          isHoveringprojectmatchedlead
            ? "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512w/external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3.png" // hover image
            : "https://cdn.iconscout.com/icon/premium/png-256-thumb/lead-management-986101.png" // default image
        }
       
        onMouseEnter={() => setIsHoveringprojectmatchedlead(true)}
        onMouseLeave={() => setIsHoveringprojectmatchedlead(false)}
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
        id="projectaddtag"
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

<Tooltip title="Publish On.." arrow>
      <img
        id="projectpublishon"
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

   <Tooltip title="Add Document.." arrow>
      <img
        id="projectadddocument"
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
        id="projectuploadpicture"
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


<div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute"}}>

<label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
<select id="itemsPerPage" value={itemsPerPage1} onChange={handleItemsPerPageChange1} style={{fontSize:"16px",height:"30px"}}>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  <option value="50">50</option>
  <option value="100">100</option>
  <option value="500">500</option>
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
                {allprojectColumns.slice(2).map((col) => (
                  <li key={col.id} style={{ padding: '5px 0' }}>
                    <input
                      type="checkbox"
                      checked={visibleColumns2.some((visibleCol) => visibleCol.id === col.id)}
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


<div style={{marginLeft:"60px",marginTop:"2px",backgroundColor:"white"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll2}
              onChange={handleSelectAll2}
            />
          </StyledTableCell>
          {visibleColumns2.map((col) => (
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
         
        currentItems2.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell >
              <input 
                type="checkbox"
                checked={selectedItems2.includes(item._id)}
                onChange={() => handleRowSelect2(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor:"pointer",color:"#0086b3",fontWeight:"bold",fontSize:"13px"}} onClick={()=>navigate('/projectsingleview',{state:item})} >
              {item.name}
          
            </StyledTableCell>
            {visibleColumns2
              .filter((col) => col.id !== 'projectname' && col.id !== 'sno')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px",fontSize:"12px"}}
                >
                  {
                    col.id==='location' ?
                    (
                      <>
                      {item.area} {item.location} {item.city} <br></br>
                      {item.state} {item.pincode}
                      </>
                    ) :   col.id==='unit_type' ?
                    (
                      <>
                      "{item.add_size.map((unit, index) => (
                        <div key={index} style={{display:"inline-block"}}>{unit.unit_type},</div>// You need to return a valid JSX element
                      ))}"
                    </>
                    ) :  col.id==='block' ?
                    (
                      <>
                      {item.add_block.map((block, index) => (
                        <div key={index} style={{backgroundColor:"blue",color:"white",display:"inline-block",marginRight: "10px", }}>{block.block_name} </div>// You need to return a valid JSX element
                      ))}
                    </>
                    ) :  col.id==='category' ?
                    (
                      <>
                      {item.category}<br></br>
                       {item.sub_category.map((cat, index) => (
                        <div key={index} style={{border:"1px solid orange",color:"orange",padding:"2px",display:"inline-block",marginRight: "10px", }}>{cat} </div>// You need to return a valid JSX element
                      ))}
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
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"50px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          <h6 style={{lineHeight:"50px"}}>Total Project <span style={{color:"green",fontSize:"20px"}}>{totalproject}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Ready To Move <span style={{color:"blue",fontSize:"20px"}}>{totalreadytomove}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Under Construction <span style={{color:"red",fontSize:"20px"}}>{totalunderconstruction}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Pre Launch <span style={{color:"gray",fontSize:"20px"}}>{totalprelaunch}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Upcoming <span style={{color:"pink",fontSize:"20px"}}>{totalupcoming}</span></h6>
        </footer>
      </div>



          </div>


{/* ==========================================unit list view start=========================================================== */}

          <div id="unitlistview" className="flip-card-back1" style={{display:"none"}}>
          <div style={{marginTop:"53px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload3}>Inventories</h3>
        <Tooltip title="Export Data.." arrow>
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button></Tooltip>
            <ul class="dropdown-menu" id="exporttoexcel"> 
            
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
            

<Tooltip title="Filter here.." arrow>
             <div   style={{marginLeft:"65%",border:"none",cursor:"pointer"}}>
              <button
                // onClick={() => setShowDropdown(!showDropdown)}
                  onClick={toggleToastunit}
                style={{
                  position: "relative",
                  marginLeft: '65%',
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

              </div>
             </Tooltip>

                 <div
            ref={toastRefunit}
            className={`feedback-toast ${showunit ? (isClosingunit ? 'hide' : 'show') : ''}`}
            style={{ zIndex: 9999 }}
          >
            <div
              ref={filterRefunit}
              style={{
                position: 'absolute',
                top: '60px',
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
                🔍 Filter Units
              </h3>

              {/* Tab Navigation */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: '#f2f4f7',
                borderBottom: '1px solid #ccc'
              }}>
                {[
                  { id: 'profession', label: '🗂️ Category' },
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
                    {unitcategory.map((profession) => (
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
                          checked={selectedunitcategory.includes(profession)}
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
                    {unitfields.map(({ label, field }) => (
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
                          marginBottom: field in selectfieldunit ? '10px' : 0
                        }}>
                          <input
                            type="checkbox"
                            checked={field in selectfieldunit}
                            onChange={() => handlefilterCheckboxChange1(field)}
                            style={{
                              marginRight: '10px',
                              accentColor: '#28a745'
                            }}
                          />
                          {label}
                        </label>

                        {field in selectfieldunit && (
                          field.includes('date') ? (
                            <input
                              type="date"
                              value={selectfieldunit[field]}
                              onChange={(e) => handleFieldInputChange(field, e.target.value)}
                              style={enhancedInputStyle}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder={`Search by ${label}`}
                              value={selectfieldunit[field]}
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
                    onClick={handleResetFiltersunit}
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
                    onClick={handleCancelunit}
                  >
                    ❌ Cancel
                  </button>
                </div>

            </div>
          </div>


            {/* <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"65%"}}>Filter</button> */}
            <button onClick={handleAddColumnClick1} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"3%"}}>Add Fields</button>
        
       
       
          
      </div> 

      <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px"}} onClick={()=>setFlattenedUnits(activeunits)}>
          <h6>Active</h6>
          <p>{activeunits.length}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={()=>setFlattenedUnits(inactiveunits)}>
          <h6>Inactive</h6>
          <p>{inactiveunits.length}</p>
        </div>
       
      </div>

      <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px",position:"sticky",top:"50px",zIndex:"999"}}>

{/* <input id="unitsearch" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by name,email,mobile,company and tags" style={{width:"25%"}} onChange={(e)=>handleunitsearchchange(e)} onKeyDown={handlekeypress4}/> */}

<input
              // ref={wrapperRef}
              id="unitsearch"
              type="text"
              className="form-control form-control-sm"
              placeholder="Search for project via project name, block or unit no"
              style={{ width: "25%" }}
              value={searchTermunits}
              onChange={(e) => handleSearchChangeunit(e)}
              // onKeyDown={handleKeyPress2}
              autoComplete="off"
            />
          {/* {suggestionsunit.length > 0 && (
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
    {suggestionsunit.map((item, index) => {
       const ownerStr = Array.isArray(item.owner_details) ? item.owner_details.map(owner=>`${owner.title || ""} ${owner.first_name || ""} ${owner.last_name || ""} (${owner.mobile_no.join(',') || ""})`).join("<br />") : "";
       const associateStr = Array.isArray(item.associated_contact) ? item.associated_contact.map(contact=>`${contact.title || ""} ${contact.first_name || ""} ${contact.last_name || ""} (${contact.mobile_no.join("<br />") || ""})`).join(", ") : "";

      return (
              <li
                key={index}
                className="suggestion-item px-2 py-1"
                onClick={() => handleSuggestionClickunit(item)}
                style={{
                  borderBottom: "1px solid #e0e0e0",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
              >
                <strong>{item.project_name}-{item.block}-{item.unit_no}</strong><br />
                <span style={{ color: "#555" }}>
                  Owners: <div dangerouslySetInnerHTML={{ __html: ownerStr }} />
                  <br />
                  Associated Contact: <div dangerouslySetInnerHTML={{ __html: associateStr }} />
                </span>
              </li>
            );
          })}
        </ul>
      )} */}


<div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>

<Tooltip title="Delete Data.." arrow>
      <img
        id="unitdelete"
        src={
          isHoveringDelete
            ? "https://cdn-icons-png.freepik.com/512/6861/6861362.png" // hover image
            : "https://cdn-icons-png.freepik.com/512/7078/7078067.png" // default image
        }
        onClick={deleteinventories}
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
        id="unitedit"
        src={
          isHoveringEdit
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7BrBLmrMYynVUzMxsgv8AtIEkFjStD6cFRNYv1to6LupNkPMgkEaEzD5-HIGrjcPj4&usqp=CAU" // hover image
            : "https://static.thenounproject.com/png/1416596-200.png" // default image
        }
        onClick={handleShow9}
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
{/* <Tooltip title="add task..." arrow>
<img id="unitaddtask" src="https://cdn-icons-png.flaticon.com/512/12692/12692378.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>  */}
{/* <Tooltip title="add unit..." arrow>
<img id="unitaddunit" src="https://png.pngtree.com/png-vector/20190505/ourmid/pngtree-vector-add-icon-png-image_1023418.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>  */}

<Tooltip title="create deal..." arrow>
      <img
        id="unitcreatedeal"
        src={
          isHoveringunitcreatedeal
            ? "https://static.vecteezy.com/system/resources/previews/049/672/081/non_2x/two-people-shaking-hands-in-a-circle-free-png.png" // hover image
            : "https://cdn-icons-png.flaticon.com/512/2622/2622718.png" // default image
        }
        onClick={()=>navigate('/deal')}
        onMouseEnter={() => setIsHoveringunitcreatedeal(true)}
        onMouseLeave={() => setIsHoveringunitcreatedeal(false)}
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


<Tooltip title="Add Property Owner/ Owner/Associate Contact/Remove Owner.." arrow>
      <img
        id="unitaddremoveowner"
        src={
          isHoveringunitadduser
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4zfekzYjrE20ZK13_QCNaD79Ckw0ALRGgGA&s" // hover image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Ip10smoBiUPAxllgXOutryiGqQIj8CzJPQ&s" // default image
        }
        
        onMouseEnter={() => setIsHoveringunitadduser(true)}
        onMouseLeave={() => setIsHoveringunitadduser(false)}
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

<Tooltip title="Matched Lead.." arrow>
      <img
        id="unitmatchedlead"
        src={
          isHoveringprojectmatchedlead
            ? "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512w/external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3.png" // hover image
            : "https://cdn.iconscout.com/icon/premium/png-256-thumb/lead-management-986101.png" // default image
        }
       
        onMouseEnter={() => setIsHoveringprojectmatchedlead(true)}
        onMouseLeave={() => setIsHoveringprojectmatchedlead(false)}
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
        id="unitcall"
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
 <Tooltip title="Send Mail,WhatsApp and Message..." arrow>
      <img
        id="unitsendall"
        src={
          isHoveringsendmail
            ? "https://cdn-icons-png.flaticon.com/512/786/786407.png" // hover image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkAryM3dt6AWqQt1fHHBAtQ-YFVel4wnqEA&s" // default image
        }
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

 <Tooltip title="Add Remarks/Note.." arrow>
      <img
        id="unitaddremarks"
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

 <Tooltip title="Add Tag.." arrow>
      <img
        id="unitaddtag"
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

<Tooltip title="Update.." arrow>
      <img
        id="unitupdatestage"
        src={
          isHoveringunitupdate
            ? "https://cdn-icons-png.flaticon.com/512/6713/6713079.png" // hover image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFo9g6QLJ-P3k8PTrjfrkWBOZI5ptsWJW4g&s" // default image
        }
        onClick={handleShow5}
        onMouseEnter={() => setIsHoveringunitupdate(true)}
        onMouseLeave={() => setIsHoveringunitupdate(false)}
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
        id="unitpreview"
        src={
          isHoveringpreview
            ? "https://cdn-icons-png.flaticon.com/512/143/143594.png" // hover image
            : "https://icon-library.com/images/preview-icon-png/preview-icon-png-26.jpg" // default image
        }
        onClick={()=>navigate('projectpreview',{state:selectedItems2})} 
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
        id="unitadddocument"
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
        id="unituploadpicture"
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


<Tooltip title="Customer Feedback.." arrow>
      <img
        id="unitcustomerfeedback"
        src={
          isHoveringunitcustomerfeedback
            ? "https://cdn-icons-png.freepik.com/512/12534/12534997.png" // hover image
            : "https://png.pngitem.com/pimgs/s/69-690659_expert-customer-feedback-icon-png-transparent-png.png" // default image
        }
         onClick={toggleToast}
        onMouseEnter={() => setIsHoveringunitcustomerfeedback(true)}
        onMouseLeave={() => setIsHoveringunitcustomerfeedback(false)}
        alt="edit"
        style={{
          height: "28px",
          width: "30px",
          cursor: "pointer",
          marginTop: "6px",
          marginLeft: "20px",
          display: "none"
        }}
      />
    </Tooltip>

</div>


<div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"68%",position:"absolute"}}>

<label htmlFor="itemsPerPage" style={{fontSize:"16px"}}>Items: </label>
<select id="itemsPerPage" value={itemsPerPage2} onChange={handleItemsPerPageChange2} style={{fontSize:"16px",height:"30px"}}>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  <option value="50">50</option>
  <option value="100">100</option>
  <option value="500">500</option>
</select>

{renderPageNumbers2()}
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
                {allprojectColumns.slice(2).map((col) => (
                  <li key={col.id} style={{ padding: '5px 0' }}>
                    <input
                      type="checkbox"
                      checked={visibleColumns2.some((visibleCol) => visibleCol.id === col.id)}
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


<div style={{marginLeft:"60px",marginTop:"2px",backgroundColor:"white"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ backgroundColor:"gray"}}>
            <input
              type="checkbox"
              checked={selectAll3}
              onChange={handleSelectAll3}
            />
          </StyledTableCell>
          {visibleColumns3.map((col) => (
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
     [...currentItems3]
      .sort((a, b) => extractUnitNumber(a.unit_no) - extractUnitNumber(b.unit_no))
      .map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell>
              <input 
                type="checkbox"
                checked={selectedItems3.includes(item)}
                onChange={() => handleRowSelect3(item)}
              />
              {index + 1}
            </StyledTableCell>
        <StyledTableCell 
          style={{ padding: "10px", cursor: "pointer", fontSize: "12px" }}
          onClick={() => navigate('/inventorysingleview', { state: item })}
        >
          {(() => {
            const isMatched = data.some(deal =>
              String(deal.project) === String(item.project_name) &&
              String(deal.block) === String(item.block) &&
              String(deal.unit_number) === String(item.unit_no)
            );

            return (
              <>
                <span style={{
                  fontWeight: "bolder",
                  fontSize: "14px",
                  color: isMatched ? "green" : "#0086b3"
                }}>
                  {item.unit_no}
                </span> ({item.unit_type}) {item.builtup_type} {item.sub_category.join(',')}<br />
                {item.category} {item.size} <br />
                {item.project_name}
              </>
            );
          })()}
        </StyledTableCell>

            {visibleColumns3
              .filter((col) => col.id !== 'details' && col.id !== 'sno')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px",fontSize:"12px" }}
                >
                  {
                    col.id==='ownerdetails' ?
                    (
                      <>
                    { Array.isArray(item.owner_details)?
                    item.owner_details.map((item)=>
                    (
                      <>
                     {item.title} {item.first_name} {item.last_name}<br></br>
                     {Array.isArray(item.mobile_no) ? (
                        item.mobile_no.map((mobile, idx) => (
                          <div key={idx}><SvgIcon component={PhoneIphoneIcon} />{mobile}</div>  // Each mobile number gets its own div
                        ))
                      ) : (
                        <div><SvgIcon component={PhoneIphoneIcon} />{item.mobile_no}</div>  // If not an array, just display the mobile_no
                      )}
                      </>
                    )):[]}
                      </>
                    ) : col.id==='stage' ?
                    (
                      <>
                       {(() => {
                    const isMatched = data.some(deal =>
                      String(deal.project) === String(item.project_name) &&
                      String(deal.block) === String(item.block) &&
                      String(deal.unit_number) === String(item.unit_no)
                    );

                    return (
                      <>
                      <img style={{height:"30px",display:isMatched?"block":"none"}} src={deallogo}></img>
                        {item.stage}
                      </>
                    );
                  })()}
                      
                    </>
                    ) :   col.id==='owneraddress' ?
                    (
                      <>
                      {Array.isArray(item.owner_details)?
                      item.owner_details.map((item, index) => (
                        <div key={index} >
                          s/h/o:-{item.father_husband_name}<br></br>
                          {item.h_no} {item.area1} {item.location1} <br></br>
                          {item.city1} {item.state1} {item.pincode1}
                        </div>
                      )):[]}
                    </>
                    ) :  col.id==='associatedcontact' ?
                    (
                      <>
                      {Array.isArray(item.associated_contact)?
                      item.associated_contact.map((item)=>
                      (
                        <>
                       {item.title} {item.first_name} {item.last_name}<br></br>
                       {Array.isArray(item.mobile_no) ? (
                          item.mobile_no.map((mobile, idx) => (
                            <div key={idx}><SvgIcon component={PhoneIphoneIcon} />{mobile}</div>  // Each mobile number gets its own div
                          ))
                        ) : (
                          <div><SvgIcon component={PhoneIphoneIcon} />{item.mobile_no}</div>  // If not an array, just display the mobile_no
                        )}
                        </>
                      )):[]}
                        </>
                    ) :  col.id==='locationbrief' ?
                    (
                      <>
                      {item.direction}(Direction)<br></br>
                      {item.facing}(Facing)<br></br>
                      {item.road}(Road)
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
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"50px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h6 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h6>
          <h6 style={{lineHeight:"50px"}}>Total Inventories <span style={{color:"black",fontSize:"20px"}}>{totalinventories}</span></h6>
          <h6 style={{lineHeight:"50px"}}> Residential <span style={{color:"green",fontSize:"20px"}}>{totalResidential}</span></h6>
          <h6 style={{lineHeight:"50px"}}> Commercial <span style={{color:"blue",fontSize:"20px"}}>{totalcommercial}</span></h6>
          <h6 style={{lineHeight:"50px"}}> Agriculture <span style={{color:"orange",fontSize:"20px"}}>{totalagriculture}</span></h6>
          <h6 style={{lineHeight:"50px"}}> Industrial <span style={{color:"red",fontSize:"20px"}}>{totalindustrial}</span></h6>
          <h6 style={{lineHeight:"50px"}}> Institutional <span style={{color:"gray",fontSize:"20px"}}>{totalinstitutional}</span></h6>
        </footer>
      </div>



          </div>
     
            
         

          </div>

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


        

          <Modal show={show2} onHide={handleClose2} size='lg' style={{transition:"0.5s ease-in",backgroundColor:"gray"}}>
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
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>



{/* ========================================add to task model for sitevisit=========================================================== */}


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


{/* ====================================edit units modal =============================================================*/}


<Modal show={show9} onHide={handleClose9} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>



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
                        project?.category?.map((type) => (
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
                    <option>---choose---</option>
                    {
                                project?.add_block?.map((item)=>
                                (
                                  <option>{item.block_name}</option>
                                ))
                               }
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Size</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,size:e.target.value})}>
                    <option>{units.size}</option>
                    <option>---choose---</option>
                    {
                                project?.add_size?.map((item)=>
                                (
                                  <option>{item.size_name}</option>
                                ))
                               }
                                </select>
                    </div>
                  

                  {
                      project?.category?.includes("Agricultural") &&(

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
                      !project?.category?.includes("Agricultural") &&(

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

                    <div className='col-md-6' ><label className='labels'>Type</label> <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(e)=>setunits({...units,builtup_type:e.target.value})}>
                          <option>{units.builtup_type}</option>
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

                    <div className='col-md-6'><label>Occupation Date</label><input type='date' className='form-control form-control-sm' value={
      !isNaN(units.ocupation_date)
        ? excelSerialToDateString(Number(units.ocupation_date))
        : units.ocupation_date
    } onChange={(e)=>setunits({...units,ocupation_date:e.target.value})}/></div>
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
                                <StyledTableCell  style={{   cursor: 'pointer' }}>
                                    {contact.title} {contact.first_name} {contact.last_name}<br></br>
                                    <SvgIcon component={EmailIcon} />
                                    <span>{contact.email}</span>
                                </StyledTableCell>

                                <StyledTableCell  style={{   cursor: 'pointer' }}>
                                  {Array.isArray(contact.mobile_no)?
                                  contact.mobile_no.map((number, index) => (
                                    <span key={index}>
                                      <SvgIcon component={PhoneIphoneIcon} />
                                      {number}<br></br>
                                    </span>
                                  )):[]}
                                </StyledTableCell>

                                <StyledTableCell  style={{   cursor: 'pointer' }}>
                                  S/W/O <br></br>{contact.father_husband_name}
                                  </StyledTableCell>

                                  <StyledTableCell  style={{   cursor: 'pointer' }}>
                                  permanent address: <br></br>{contact.h_no}<br></br>{contact.area1}
                                  {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1} 
                                  </StyledTableCell>

                                  <StyledTableCell style={{  cursor: 'pointer' }}>
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
                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        {contact.title} {contact.first_name} {contact.last_name}<br />
                                        <SvgIcon component={EmailIcon} />
                                        <span>{contact.email}</span>
                                    </StyledTableCell>

                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        {
                                        Array.isArray(contact.mobile_no) ?
                                        contact.mobile_no.map((number, index) => (
                                            <span key={index}>
                                                <SvgIcon component={PhoneIphoneIcon} />
                                                {number}<br />
                                            </span>
                                        )):[]}
                                    </StyledTableCell>

                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        S/W/O <br />{contact.father_husband_name}
                                    </StyledTableCell>

                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        permanent address: <br />{contact.h_no}<br />{contact.area1} {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1}
                                    </StyledTableCell>

                                    <StyledTableCell style={{  cursor: 'pointer' }}>
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
                     {/* <th style={{width:"300px",textAlign:"center"}}>Category</th> */}
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
                                     {name && (
                                      <img 
                                        // src={typeof item === 'string' ? item : URL.createObjectURL(item)} 
                                        src={`${name}`}
                                        alt="preview" 
                                        style={{width: "50px", height: "50px", objectFit: "cover", marginBottom: "10px"}}
                                      />
                                    )}
                                   <input 
                                   name="preview"
                                     type="file"
                                     className="form-control form-control-sm"
                                     multiple
                                     onChange={(event) => handlepreviewchange(index, event)}
                                   />
                                   {

                                   }
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
                       {/* <td>
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
                       </td> */}
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
                        <option>{units.document_name[index]}</option>
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
                        <input type="text" value={units.document_no[index]} className="form-control form-control-sm"onChange={(event)=>handledocumentnochange(index,event)} style={{marginTop:"5px"}} />
                        
                      )):[]
                    }
                    </div>

                    <div className='col-md-2' ><label className='labels'>Date</label>
                    {
                      Array.isArray(units.document_Date) ?
                      units.document_Date.map((item,index)=>
                      (
                        <input type="date" value={units.document_Date[index]} className="form-control form-control-sm"onChange={(event)=>handledocumentdatechange(index,event)} style={{marginTop:"5px"}} />
                        
                      )):[]
                    }
                    </div>

                    <div className='col-md-2'  style={{ position: 'relative' }}><label className='labels'>Pic</label>
                       {
                       Array.isArray(units.image)?
                       units.image.map((name, index) => (
                                 <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                     {name && (
                                      <img 
                                        // src={typeof item === 'string' ? item : URL.createObjectURL(item)} 
                                        src={`${name}`}
                                        alt="preview" 
                                        style={{width: "50px", height: "50px", objectFit: "cover", marginBottom: "10px"}}
                                      />
                                    )}
                                   <input 
                                   name="image"
                                     type="file"
                                     className="form-control form-control-sm"
                                     multiple
                                     onChange={(event) => handlepicchange1(index, event)}
                                     style={{width:"90px",fontSize:"10px",paddingTop:"7px"}}
                                   />
                      
                                     {name.previewUrls && name.previewUrls.map((url, idx) => (
                                         <img key={idx} src={url} alt={`preview ${index}-${idx}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                       ))}
                                 </div>
                               )):[]}
                       </div>

                       <div className="col-md-1" style={{ marginTop: "70px" }}>
    {
      Array.isArray(units.document_name) ?
        units.document_name.map((item, index) => (
          <div key={index} style={{ marginTop: "10px" }}>
            {units.document_name[index] && ( // Show delete button only if document name exists
              <img
                src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                alt="delete button"
                onClick={() => deleteall12(index)} // Call deleteDocument for the selected index
                style={{ height: "40px", cursor: "pointer" }}
              />
            )}
          </div>
        )) : null
    }
  </div>


                    {/* <div className="col-md-1" style={{marginTop:"70px"}}>
                    {
                      Array.isArray(units.action12)?
                       units.action12.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall12(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div> */}

                        <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>Add</label><button className="form-control form-control-sm" onClick={addFn12}>+</button></div>
                       
                </div>

            </div>



            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={updateinventories}>
                Update Unit 
              </Button>
              <Button variant="secondary" onClick={handleClose9}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>



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

                    

{/* ===========================================modal for send details start========================================================= */}

  <Modal  show={show12} onHide={handleClose12} size='xl' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Send Details<br></br>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
       
          <div style={{width:"99%",marginLeft:"1%",marginTop:"2%",border:"1px solid gray",borderRadius:"5px",padding:"50px",backgroundColor:"white"}}>
               <div style={{display:"flex", gap:"100px"}}>
                 <div style={{cursor:"pointer"}} id="sendmail1" onClick={sendmailfunction1}>Send Mail</div> 
                 <div style={{cursor:"pointer"}} id="sendmessage1" onClick={sendmessagefunction1}>Send Message</div>
                 <div style={{cursor:"pointer"}} id="sendwhatsapp1" onClick={sendwhatsappfunction1}>Send WhatsApp</div>
          
               </div>
               <div className="col-md-12"><hr></hr></div>
         
          
       
       <div className="row mt-2" id="sendmail" style={{fontSize:"12px",display:"none"}}>
             <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder",fontSize:"1vw"}}> Send Mail</div>
                 <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <input type="text" style={{border:"none",fontSize:"12px",borderBottom:"1px solid gray"}} required="true" className="form-control form-control-sm" placeholder='subject' value={subject1} onChange={(e)=>setsubject1(e.target.value)}/>
             
                 </div>
                
          
                 <div className="col-md-12" style={{marginTop:"10px"}}>
                    <ReactQuill
                  modules={modules11}  // Add the toolbar options for formatting
                  style={{ height: '200px', width: '100%',fontSize:"12px",marginTop:"5px"}}
                  className="my-quill-editor"
                  value={message1}   placeholder="Enter Your Message"  onChange={handlemailmessage1}/>
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
                 <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate1} onChange={handleTemplateSelect1} style={{fontSize:"12px"}}>
                    <option value="">---Select Template---</option>
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                    <option value="template3">Template 3</option>
                  </select>
                 </div>
          
                 <div className="col-md-4" {...getRootProps1()} style={{ border: '1px dashed #ccc',marginTop:"35px", cursor: 'pointer' }}>
                  <input {...getInputProps1()} />
                  <p style={{fontSize:"12px"}}>Drag & drop files here, or click to select files</p>
                  <ul>
                    {attachments1.length > 0 && attachments1.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              
             </div>
       
          <div className="row mt-2" id="sendmessage" style={{display:"none"}}>
          <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send Message</div>
           </div>
       
           <div className="row mt-2" id="sendwhatsapp" style={{display:"none"}}>
           <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send WhatsApp</div>

             <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                             <input type="text" style={{border:"none",fontSize:"12px",borderBottom:"1px solid gray"}} required="true" className="form-control form-control-sm" placeholder='subject' value={subject1} onChange={(e)=>setsubject1(e.target.value)}/>
                        
                            </div>
                           
                     
                            <div className="col-md-12" style={{marginTop:"10px"}}>
                               <ReactQuill
                             modules={modules112}  // Add the toolbar options for formatting
                             style={{ height: '200px', width: '100%',fontSize:"12px",marginTop:"5px"}}
                             className="my-quill-editor"
                             value={message1}   placeholder="Enter Your Message"  onChange={handlemailmessage1}/>
                             </div>
                  
                             <div id="custom-toolbar1" className="ql-toolbar ql-snow" style={{ marginTop: "10px" }}>
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
                            <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate1} onChange={handleTemplateSelect1} style={{fontSize:"12px"}}>
                               <option value="">---Select Template---</option>
                               <option value="template1">Template 1</option>
                               <option value="template2">Template 2</option>
                               <option value="template3">Template 3</option>
                             </select>
                            </div>
                             <div className="col-md-4" {...getRootProps1()} style={{ border: '1px dashed #ccc',marginTop:"35px", cursor: 'pointer' }}>
                  <input {...getInputProps1()} />
                  <p style={{fontSize:"12px"}}>Drag & drop files here, or click to select files</p>
                  <ul>
                    {attachments1.length > 0 && attachments1.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
                            

           </div>
       
       </div>

       <>
    {isLoading1 && (
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
          {/* <p>sending...</p> */}
          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
    {currentSendingType === "whatsapp" && (
      <>🟢 Sending WhatsApp message {sentProgress} of {number.length}...</>
    )}
    {currentSendingType === "email" && (
      <>✉️ Sending Email  {emails.length}...</>
    )}
  </p>
        </div>
      </div>
    )}
  </>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={sendmail1}>
                Send Mail
              </Button>
              <Button variant="secondary" onClick={handleSendwhatsapp}>
                Send WhatsApp
              </Button>
              <Button variant="secondary" onClick={handleClose12}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/*========================================= modal for add new owner in feedback form start =========================================*/}

       <Modal show={show7} onHide={handleClose7} size='xl'>
            <Modal.Header>
              <Modal.Title>Add New Owner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        

            <div  style={{padding:"5px"}}>
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
                        <div className="col-md-3"><label className="labels">Add Contact</label><button className="form-control form-control-sm" style={{width:"50px"}} >+</button></div>
                    
                     <div className="col-md-12" style={{marginTop:"20px"}}><label className="labels" >Owner Contact</label><div className="col-md-12"><hr></hr></div>
                     {selectedcontact1.length >= 0 && (
                      <div className="contact-details">
                        <table  style={{width:"100%"}}>
                          
                          <tbody>
                          {
                         [...selectedcontact1, ...units.owner_details]
                        .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                        .filter((contact, index, self) => 
                          // Ensure that we only keep unique contacts based on _id
                          index === self.findIndex((c) => c._id === contact._id)
                        ).map(contact => (
                              <StyledTableRow>
                                <img style={{height:"70px",width:"80px"}} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt=""></img>
                                <StyledTableCell  style={{   cursor: 'pointer' }}>
                                    {contact.title} {contact.first_name} {contact.last_name}<br></br>
                                    <SvgIcon component={EmailIcon} />
                                    <span>{contact.email}</span>
                                </StyledTableCell>

                                <StyledTableCell  style={{   cursor: 'pointer' }}>
                                  {contact?.mobile_no?.map((number, index) => (
                                    <span key={index}>
                                      <SvgIcon component={PhoneIphoneIcon} />
                                      {number}<br></br>
                                    </span>
                                  ))}
                                </StyledTableCell>

                                <StyledTableCell  style={{ cursor: 'pointer' }}>
                                  S/W/O <br></br>{contact.father_husband_name}
                                  </StyledTableCell>

                                  <StyledTableCell  style={{   cursor: 'pointer' }}>
                                  permanent address: <br></br>{contact.h_no}<br></br>{contact.area1}
                                  {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1} 
                                  </StyledTableCell>

                                  <StyledTableCell style={{  cursor: 'pointer' }}>
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
                              
                              [...selectedcontact2, ...units.associated_contact]
                                .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                                .filter((contact, index, self) => 
                                  // Ensure that we only keep unique contacts based on _id
                                  index === self.findIndex((c) => c._id === contact._id)
                                ).map(contact => (
                                <StyledTableRow>
                                    <img style={{ height: "70px", width: "80px" }} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt="Contact" />
                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        {contact.title} {contact.first_name} {contact.last_name}<br />
                                        <SvgIcon component={EmailIcon} />
                                        <span>{contact.email}</span>
                                    </StyledTableCell>

                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        {
                                        Array.isArray(contact.mobile_no) ?
                                        contact.mobile_no.map((number, index) => (
                                            <span key={index}>
                                                <SvgIcon component={PhoneIphoneIcon} />
                                                {number}<br />
                                            </span>
                                        )):[]}
                                    </StyledTableCell>

                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        S/W/O <br />{contact.father_husband_name}
                                    </StyledTableCell>

                                    <StyledTableCell style={{  cursor: 'pointer' }}>
                                        permanent address: <br />{contact.h_no}<br />{contact.area1} {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1}
                                    </StyledTableCell>

                                    <StyledTableCell style={{ cursor: 'pointer' }}>
                                    <span style={{color:"orange",fontWeight:"bolder"}}>{relation1}</span>
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
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose7}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> 


{/* ====================================modal for add new owner in feedback form end=============================================== */}

{/* =============================================feedback form with toast start================================================== */}

 <div
  ref={toastRef}
  className={`feedback-toast ${show ? (isClosing ? 'hide' : 'show') : ''}`}
  style={{ zIndex: 9999 }}
>
  <div className="toast show">
    <div className="toast-header">
      <strong className="me-auto">Customer Feedback of unit <span style={{fontWeight:'bold',color:"green"}}>{feedbackform.unit_no}</span></strong>
    </div>
    <div className="toast-body"  style={{maxHeight: '90vh',overflowY: 'auto',paddingRight: '10px'}}>
          <div className="mb-2">
          <label className="form-label">Owner Name</label>
          <div className="d-flex align-items-center">
            <select className="form-control form-control-sm me-2"   name="owner" onChange={(e)=>setfeedbackform({...feedbackform,owner:e.target.value})}>
              <option>---select owner---</option>
             {
              ownerlist.map((item)=>
              {
                return <option>{item.title} {item.first_name} {item.last_name}</option>
              })
             }
            </select>
            {/* <button className="btn btn-sm btn-primary"  onClick={() => window.open('/addcontact', '_blank')}>+</button> */}
          </div>
        </div>

      {/* <div className="mb-2">
        <label className="form-label">Unit No.</label>
        <input type="text" name="unit_no"  className="form-control form-control-sm"  value={feedbackform.unit_no || ""}/>
      </div> */}
      <div className="mb-2">
        <label className="form-label">Owner Response on Sale</label>
        <select className="form-control form-control-sm" name="owner_response" onChange={(e)=>setfeedbackform({...feedbackform,owner_response:e.target.value})}>
          <option>---select response---</option>
          <option>Yes</option>
          <option>Yes -Sell this property but buy another</option>
          <option>Sold</option>
          <option>No -But discussed about price</option>
          <option>No -But wants to buy another property</option>
          <option>Thinking may/be in future</option>
          <option>No</option>
          <option>Sold -But Interested to Buy Another Property</option>
          <option>Sold -But Interested to sell Another Property</option>
        </select>
      </div>
      {/* {
        feedbackform.owner_response==="Yes" && 
        (
            <div className="mb-2">
              <button
             onClick={() =>window.open(`/deal?unit=${encodeURIComponent(JSON.stringify(selectedItems3[0]))}`, '_blank')}

              className="btn btn-sm"
              style={{
                background: "linear-gradient(135deg, #28a745, #218838)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                padding: "6px 16px",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="bi bi-handshake-fill me-2"></i> Create Deal
            </button>
           
          </div>
        )
      } */}

      {/* {
        feedbackform.owner_response==="Yes -Sell this property but buy another" && 
        (
            <div className="mb-2">
              <button
             onClick={() =>window.open(`/deal?unit=${encodeURIComponent(JSON.stringify(selectedItems3[0]))}`, '_blank')}
    className="btn btn-sm"
    style={{
      background: "linear-gradient(135deg, #28a745, #218838)",
      color: "white",
      fontWeight: "600",
      fontSize: "14px",
      padding: "6px 16px",
      borderRadius: "6px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      border: "none",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
      e.target.style.transform = "scale(1.03)";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
      e.target.style.transform = "scale(1)";
    }}
  >
    <i className="bi bi-handshake-fill me-2"></i> Create Deal
  </button>
    <button
    onClick={() => window.open(`/leadrequirment?owner=${feedbackform.owner}`, '_blank')}
      className="btn btn-sm"
      style={{
        marginLeft: "10%",
        background: "linear-gradient(135deg, #28a745, #218838)",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        padding: "6px 16px",
        borderRadius: "6px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        border: "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
        e.target.style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
        e.target.style.transform = "scale(1)";
      }}
    >
      <i className="bi bi-handshake-fill me-2"></i> Lead Requirment
    </button>
          
          </div>
        )

      } */}

      {/* {
        feedbackform.owner_response==="Sold" && 
        (
            <div className="mb-2">
               <button
               onClick={handleShow7}
              className="btn btn-sm"
              style={{
                background: "linear-gradient(135deg, #28a745, #218838)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                padding: "6px 16px",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="bi bi-handshake-fill me-2"></i> Add New owner
            </button>
        
          </div>
        )

      } */}

  {
  feedbackform.owner_response === "No -But discussed about price" && (
    <div style={{border:"1px solid gray",borderRadius:"8px",padding:"5px"}}>
    <div className="mb-2">
      <label className="form-label">Reason</label>
      <div>
        {[
          "Had bad experience with previous agent",
          "Will sell after completion of construction",
          "Will sell after registry",
          "Don’t want to involve brokers / privacy concern",
          "Already dealing with another broker",
          "Waiting for better market price",
          "Price expectations not matching",
          "Other",
        ].map((reason, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name="discussed_reason"
              value={reason}
              id={`reason-${index}`}
              checked={
                feedbackform.discussed_reason === reason ||
                (reason === "Other" &&
                  typeof feedbackform.discussed_reason === "string" &&
                  !reasonsList.includes(feedbackform.discussed_reason))
              }
              onChange={(e) =>
                setfeedbackform({
                  ...feedbackform,
                  discussed_reason: e.target.value,
                })
              }
            />
            <label className="form-check-label" htmlFor={`reason-${index}`}>
              {reason}
            </label>

            {reason === "Other" && feedbackform.discussed_reason === "Other" && (
                <input
                  type="text"
                  name="other_discussed_reason"
                  className="form-control form-control-sm mt-2"
                  placeholder="Please specify"
                  onChange={(e)=>setfeedbackform({...feedbackform,other_discussed_reason:e.target.value})}
                
                />
              )}
          </div>
        ))}
      </div>
    </div>
       <div className="mb-2">
        <label className="form-label">Price by Seller (₹)</label>
        <input className="form-control form-control-sm" value={feedbackform.seller_price} name="seller_price" onChange={(e)=>setfeedbackform({...feedbackform,seller_price:e.target.value})}/>
      </div>
         <div className="mb-2">
        <label className="form-label">Price Suggested by Me (₹)</label>
        <input className="form-control form-control-sm" value={feedbackform.my_price} name="my_price" onChange={(e)=>setfeedbackform({...feedbackform,my_price:e.target.value})}/>
      </div>

      </div>
  )
}
   {/* {
        feedbackform.owner_response==="No -But wants to buy another property" && 
        (
            <div className="mb-2">
               <button
              onClick={() => window.open(`/leadrequirment?owner=${feedbackform.owner}`, '_blank')}
              className="btn btn-sm"
              style={{
                background: "linear-gradient(135deg, #28a745, #218838)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                padding: "6px 16px",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="bi bi-handshake-fill me-2"></i> Lead Requirment
            </button>
          </div>
        )

      } */}
        {
        feedbackform.owner_response==="Thinking may/be in future" && 
        (
            <div className="mb-2">
            <label className="form-label">Schedule Next Call Date</label>
           <input type="datetime-local" name="next_call_date" className="form-control form-control-sm" onChange={(e)=>setfeedbackform({...feedbackform,next_call_date:e.target.value})} />
            </div>
        )

      }
      {
  feedbackform.owner_response === "No" && (
   
    <div className="mb-2" style={{border:"1px solid gray",borderRadius:"8px",padding:"5px"}}>
      <label className="form-label">Reason</label>
      <div>
        {[
           "Family not agreed yet / Internal family issue",
            "Property is under dispute / Legal issue",
            "Still under use (self-living / family living)",
            "Currently rented out / tenant issue",
            "Emotional attachment with property",
            "Recently bought, not planning to sell yet",
            "Joint ownership, others not willing",
            "Will sell only if urgent need arises",
            "Planning to construct house",
            "Can’t decide right now / need more time",
            "Not interested in selling at all",
            "Other"
        ].map((reason, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name="no_reason"
              value={reason}
              id={`reason-${index}`}
              checked={
                feedbackform.no_reason === reason ||
                (reason === "Other" &&
                  typeof feedbackform.no_reason === "string" &&
                  !noreasonsList.includes(feedbackform.no_reason))
              }
              onChange={(e) =>
                setfeedbackform({
                  ...feedbackform,
                  no_reason: e.target.value,
                })
              }
            />
            <label className="form-check-label" htmlFor={`reason-${index}`}>
              {reason}
            </label>

            {reason === "Other" && feedbackform.no_reason === "Other" && (
                <input
                  type="text"
                  name="other_no_reason"
                  className="form-control form-control-sm mt-2"
                  placeholder="Please specify"
                  onChange={(e)=>setfeedbackform({...feedbackform,other_no_reason:e.target.value})}
                
                />
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
  {/* {
        feedbackform.owner_response==="Sold -But Interested to Buy Another Property" && 
        (
            <div className="mb-2">
                <button
                   onClick={() => window.open('/leadinfo', '_blank')}
              className="btn btn-sm"
              style={{
                background: "linear-gradient(135deg, #28a745, #218838)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                padding: "6px 16px",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="bi bi-handshake-fill me-2"></i> Add Lead
            </button>
            </div>
        )

      } */}
        {/* {
        feedbackform.owner_response==="Sold -But Interested to sell Another Property" && 
        (
    <div className="mb-2">
  <button
       onClick={() =>window.open(`/deal?unit=${encodeURIComponent(JSON.stringify(selectedItems3[0]))}`, '_blank')}
    className="btn btn-sm"
    style={{
      background: "linear-gradient(135deg, #28a745, #218838)",
      color: "white",
      fontWeight: "600",
      fontSize: "14px",
      padding: "6px 16px",
      borderRadius: "6px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      border: "none",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
      e.target.style.transform = "scale(1.03)";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
      e.target.style.transform = "scale(1)";
    }}
  >
    <i className="bi bi-handshake-fill me-2"></i> Create Deal
  </button>
    </div>

        )

      } */}

       <div className="mb-2">
        <label className="form-label">Stage</label>
        <input className="form-control form-control-sm" value={feedbackform.stage} name="stage"/>
      </div>
        <div className="mb-2">
        <label className="form-label">Remarks/Notes</label>
        <textarea name="remarks"  className="form-control form-control-sm" style={{height:"100px"}} onChange={(e)=>setfeedbackform({...feedbackform,remarks:e.target.value})}></textarea>
      </div>
    
      <button className="btn btn-danger w-30" onClick={handleCancel}>Cancel</button>
      <button className="btn btn-success w-60" style={{ marginLeft: "10%" }} onClick={addfeedback}>Submit Feedback</button>
    </div>
  </div>
</div>


{/* =======================================feedback form with toast end===================================================== */}






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

export default Dealdetails;