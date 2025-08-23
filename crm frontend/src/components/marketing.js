import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

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



function Marketing() {


    const navigate=useNavigate()
    // React.useEffect(()=>{fetchdata()},[])
    // React.useEffect(()=>{fetchdata1()},[])
    // React.useEffect(()=>{fetchdata2()},[])

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
        const resp=await api.get('viesitevisit')
        const incoming=resp.data.sitevisit
        setsitedata([...incoming])
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
              await axios.delete(`http://localhost:5000/deletecontact/${itemId}`);
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
                        const handlekeypress1=(event)=>
                        {
                            if(event.key==="Enter")
                                {
                                  fetchdatabyemail_mobile_tags_company()
                                    setsearchdata('')
                                }
                            
                        }
/*-------------------------------------------------------------------searching all contact data by mobile email tags and company end---------------------------------------------------------------------------- */                                                     
      







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


const [currentPage2, setCurrentPage2] = useState(1);
const [itemsPerPage2, setItemsPerPage2] = useState(5); // User-defined items per page
const indexOfLastItem2 = currentPage2 * itemsPerPage2;
const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
const currentItems2 = sitedata.slice(indexOfFirstItem2, indexOfLastItem2);
const totalPages2 = Math.ceil(sitedata.length / itemsPerPage2);
 
const offlinecampegin = [
  { id: 'sno', name: '#' },
  { id: 'nameremark', name: 'Name & Remark' },
  { id: 'contact', name: 'Contact' },
  { id: 'sourcetype', name: 'Source Type' },
  { id: 'status', name: 'Status' },
  { id: 'delivered', name: 'Delivered' },
  { id: 'failed', name: 'Failed' },
  { id: 'templatename', name: 'Template Name' },
  { id: 'createddate', name: 'Created Date' },
  { id: 'executed', name: 'Executed Date' },
  { id: 'createdby', name: 'Created By' },
  { id: 'action', name: 'Action' },
];
      
      const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns, setVisibleColumns] = useState(offlinecampegin.slice(1));
     

      
    
    
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

// ----------------------------------------------------------------------------------------------------------------------------------------

      const [currentPage1, setCurrentPage1] = useState(1);
      const [itemsPerPage1, setItemsPerPage1] = useState(5); // User-defined items per page
      const indexOfLastItem1 = currentPage1 * itemsPerPage1;
      const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
      const currentItems1 = meetingdata.slice(indexOfFirstItem1, indexOfLastItem1);
      const totalPages1 = Math.ceil(meetingdata.length / itemsPerPage1);

      const onlinecampeign = [
        { id: 'sno', name: '#' },
        { id: 'name', name: 'Name' },
        { id: 'source', name: 'Source' },
        { id: 'campeignid', name: 'Campeign Id' },
        { id: 'leads', name: 'Leads' },
        { id: 'createddate', name: 'Created Date' },
        { id: 'action', name: 'Action' },
      ];
      const [selectedItems1, setSelectedItems1] = useState([]); // To track selected rows
      const [selectAll1, setSelectAll1] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns1, setVisibleColumns1] = useState(onlinecampeign.slice(1));
    

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

      
//------------------------------------------------------------------------------------------------------------------------------------------

      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(5); // User-defined items per page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(data.length / itemsPerPage);


      const organiccampeign = [
        { id: 'sno', name: '#' },
        { id: 'campeignsource', name: 'Campeign Source' },
        { id: 'lead', name: 'Lead(Buyer)' },
        { id: 'inventoryseller', name: 'Inventory Owner(Seller)' },
        { id: 'action', name: 'Action' },
      ];
      const [selectedItems2, setSelectedItems2] = useState([]); // To track selected rows
      const [selectAll2, setSelectAll2] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns2, setVisibleColumns2] = useState(organiccampeign.slice(1));


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

    /*-------------------------------------------------------------------custome table end---------------------------------------------------------------------------- */                                                     
    
    
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


const online=()=>
  {
    document.getElementById("online").style.display="block"
    document.getElementById("online1").style.backgroundColor="gray"
    document.getElementById("online1").style.borderRadius="10px"

    document.getElementById("offline").style.display="none"
    document.getElementById("offline1").style.backgroundColor="white"
    document.getElementById("offline1").style.borderRadius="0px"

    document.getElementById("organic").style.display="none"
    document.getElementById("organic1").style.backgroundColor="white"
    document.getElementById("organic1").style.borderRadius="0px"
  }

const offline=()=>
{
  document.getElementById("online").style.display="none"
  document.getElementById("online1").style.backgroundColor="white"
  document.getElementById("online1").style.borderRadius="0px"

  document.getElementById("offline").style.display="block"
  document.getElementById("offline1").style.backgroundColor="gray"
  document.getElementById("offline1").style.borderRadius="10px"

  document.getElementById("organic").style.display="none"
  document.getElementById("organic1").style.backgroundColor="white"
  document.getElementById("organic1").style.borderRadius="0px"
}

  const organic=()=>
    {

      document.getElementById("online").style.display="none"
      document.getElementById("online1").style.backgroundColor="white"
      document.getElementById("online1").style.borderRadius="0px"
  
      document.getElementById("offline").style.display="none"
      document.getElementById("offline1").style.backgroundColor="white"
      document.getElementById("offline1").style.borderRadius="0px"

      document.getElementById("organic").style.display="block"
      document.getElementById("organic1").style.backgroundColor="gray"
      document.getElementById("organic1").style.borderRadius="10px"
    }
        

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
      
        
        
            <label className="labels" id="online1" style={{marginLeft:"30px",cursor:"pointer",width:"150px",textAlign:"center"}} onClick={online}>Online Campeign </label>
            <label className="labels" id="offline1" style={{marginLeft:"30px",cursor:"pointer",width:"150px",textAlign:"center"}} onClick={offline}>Offline Campeign </label>
            <label className="labels" id="organic1" style={{marginLeft:"30px",cursor:"pointer",width:"150px",textAlign:"center"}} onClick={organic}>Organic Campeign </label>

           
            <div class="dropdown" style={{width:"150px",marginLeft:"40%"}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Create Campeign
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Online Campeign</a></li>
    <li><a class="dropdown-item" href="#">Offline Campeign</a></li>
  </ul>
</div>
       
       
          
      </div>
  
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"10px",paddingTop:"10px"}}>
      <input type="checkbox" onChange={handleischeckedchange}/>
      <input id="search" type="text" disabled={!ischecked} className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search for tasks calls etc." style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>
      <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",position:"absolute"}}>
           {/* <Button className="form-control form-control-sm" style={{width:"120px",backgroundColor:"transparent"}}>Play Task</Button> */}
         
           </div>

    
    
      <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"80%",position:"absolute"}}>
   
      
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
{/* ==============================---------------------online campeign table start==============================================---------- */}


          <div id="online" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell>
          {visibleColumns1.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman",  cursor: 'pointer' }}
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
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman" }} 
              onClick={() => handleShow2(item)}
            >
               {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon} />
              <span>{item.email}</span>
            </StyledTableCell>

            <StyledTableCell>
              {item.due_date}
            </StyledTableCell>
            <StyledTableCell>
              <b>{item.title}</b> <br></br>
              {item.remarks}
            </StyledTableCell>
            <StyledTableCell>
              {item.activity_type}
            </StyledTableCell>
            <StyledTableCell>
            {item.executive}
            </StyledTableCell>
            <StyledTableCell>
              
            </StyledTableCell>
            <StyledTableCell>
             {item.stage}
            </StyledTableCell>
            <StyledTableCell>
             
            </StyledTableCell>
            <StyledTableCell>
              <img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" style={{height:"50px",width:"50px",cursor:"pointer"}}></img>
            </StyledTableCell>
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/* ===========================-----------------online campeign end============================---------------------------------------- */}


{/* =============================offline campeign table start=============================================================================== */}


      <div id="offline" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </StyledTableCell>
          {visibleColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman",  cursor: 'pointer' }}
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
              <StyledTableCell style={{ fontFamily: "times new roman" }}>
                <input 
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleRowSelect(item._id)}
                />
                {index + 1}
              </StyledTableCell>
              <StyledTableCell  style={{ padding: "10px", fontFamily: "times new roman" }}  >
              
              </StyledTableCell>
           
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
             
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 
                </StyledTableCell>
              
           
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>


{/* =======================================offline campeign end========================================================================== */}


{/* ===========================-------------------organic campeign table start============================-------------------------------- */}

      <div id="organic" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>
            <input
              type="checkbox"
              checked={selectAll2}
              onChange={handleSelectAll2}
            />
          </StyledTableCell>
          {visibleColumns2.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman",  cursor: 'pointer' }}
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
              <StyledTableCell style={{ fontFamily: "times new roman" }}>
                <input 
                  type="checkbox"
                  checked={selectedItems2.includes(item._id)}
                  onChange={() => handleRowSelect2(item._id)}
                />
                {index + 1}
              </StyledTableCell>
              <StyledTableCell  style={{ padding: "10px", fontFamily: "times new roman" }} >
              
              </StyledTableCell>
           
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}>
                 
                </StyledTableCell>

                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }} >
                 
                </StyledTableCell>
                <StyledTableCell  style={{ padding: "10px", fontFamily: "times new roman" }}>
                
               </StyledTableCell>
              
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>
       
      


          <ToastContainer/>
        </div>
     );
}

export default Marketing;