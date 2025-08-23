import {React,useState,useEffect} from 'react'
import Header1 from './header1'
import Sidebar1 from './sidebar1'
import Tooltip from '@mui/material/Tooltip';
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
import Swal from 'sweetalert2';
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {  SvgIcon } from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

function Users() {

const navigate=useNavigate()
    
  //===================================== get user and table code start========================================================

    const[data,setdata]=useState([])

    const getalluserdata=async()=>
    {
      try {
        const resp=await api.get('viewuser')
        setdata(resp.data.user)
        
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(()=>
    {
      getalluserdata()
    },[])
 
    
  //=================================== get user and table code end==============================================================

    const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'full_name', name: 'Full Name' },
        { id: 'email', name: 'Email' },
        { id: 'manager', name: 'Manager' },
        { id: 'team', name: 'Team' },
        { id: 'role_name', name: 'Role Name' },
        { id: 'bussiness_rule', name: 'Bussiness Rule' },
        { id: 'communication_channels', name: 'Communication' },
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
                                        await api.delete(`deleteuser/${itemId}`);
                                      });
                                      
                                        Swal.fire({
                                                    icon: 'success',
                                                    title: 'User Deleted',
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
                                       
                                        }
                                      if(selectedItems.length===1)
                                        {
                                          document.getElementById("delete").style.display="inline-block"
                                         
                                        }
                                      
                                          if(selectedItems.length>1)
                                            {
                                              document.getElementById("delete").style.display="inline-block"
                                            
                                            }
                                    },[selectedItems])

                                             const [show1, setshow1] = useState(false);
                                                   
                                                    const handleClose1 = () => setshow1(false);
                                             
                                                    const handleShow1=async()=>setshow1(true);


  //===================================================== save user start========================================================

        const [user,setuser]=useState({full_name:"",email:"",mobile:"",manager:"",team:"",role_name:"",descriptions:"",permission:"",
                                        assign_permission:"",manage:[],data:[],communication_channels:[],cutomize:[],integration:[],
                                        bussiness_rule:[],canview_properties:"",canadd_properties:"",canupdate_properties:"",
                                        canreassign_properties:"",candeletproperties:"",canview_properties_owner:""
                                      })  


        const handlechange = (e) => {
        const { name, type, value, checked } = e.target;

        setuser((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? (checked ? 'yes' : 'no') : value
        }));
      };

                               
const handleCheckboxChange = (e) => {
  const { name, value, checked } = e.target;

  setuser((prev) => {
    if (checked) {
      // Add the value to array
      return { 
        ...prev, 
        [name]: [...prev[name], value] 
      };
    } else {
      // Remove the value from array
      return { 
        ...prev, 
        [name]: prev[name].filter((v) => v !== value) 
      };
    }
  });
};

    const adduser=async()=>
    {
      try {
        const resp=await api.post('adduser',user)
        if(resp.status===200)
        {
          Swal.fire({
            icon:"success",
            title:"New User Added",
            text:"new user added successfully...",
            showConfirmButton:"true"
          }).then(()=>
          {
            window.location.reload()
          }
        )
        }
        
      } catch (error) {
        console.log(error);
          Swal.fire({
            icon:"error",
            title:"Error while adding user",
            text:error?.message,
            showConfirmButton:"true"
          })
      }
    }



  // ================================================save user end===============================================================



         const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  return (
    <div>
        <Header1/>
        <Sidebar1/>

          <div style={{marginTop:"60px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
                   
                   <h3 style={{marginLeft:"10px",cursor:"pointer"}}>User Creation </h3>
                  
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
        
                         <Tooltip title="Add New User..." arrow>
                                   <button onClick={handleShow1}   style={{ position:"relative",marginLeft: '40%',width:"50px",padding: '8px',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer',fontWeight: 'bold',textAlign: 'center'}} className="form-control form-control-sm form-control form-control-sm-sm"  >
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

                   </div>

                    <div style={{marginLeft:"60px",marginTop:"2px",backgroundColor:"white"}}>
                                     <TableContainer component={Paper}>
                               <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                 <TableHead>
                                   <TableRow>
                                     <StyledTableCell style={{ backgroundColor:"gray"}}>
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
                                currentItems
                                 .map ((item, index) => (
                                     <StyledTableRow key={index}>
                                       <StyledTableCell>
                                         <input 
                                           type="checkbox"
                                           checked={selectedItems.includes(item._id)}
                                           onChange={() => handleRowSelect(item._id)}
                                         />
                                         {index + 1}
                                       </StyledTableCell>
                                 
                           
                                       {visibleColumns
                                         .filter((col) => col.id !== 'sno')
                                         .map((col) => (
                                           <StyledTableCell 
                                             key={col.id} 
                                             style={{ padding: "10px",fontSize:"12px" }}
                                           >
                                           {item[col.id]}
                                             
                                           </StyledTableCell>
                                         ))}
                                     </StyledTableRow>
                                   ))}
                                 </tbody>
                               </Table>
                             </TableContainer>
                               {/* <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"50px",bottom:"0",backgroundColor:"#f8f9fa",marginLeft:"10px"}}>
                                     <h6 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h6>
                                     <h6 style={{lineHeight:"50px"}}>Total Inventories <span style={{color:"black",fontSize:"20px"}}>{totalinventories}</span></h6>
                                     <h6 style={{lineHeight:"50px"}}> Residential <span style={{color:"green",fontSize:"20px"}}>{totalResidential}</span></h6>
                                     <h6 style={{lineHeight:"50px"}}> Commercial <span style={{color:"blue",fontSize:"20px"}}>{totalcommercial}</span></h6>
                                     <h6 style={{lineHeight:"50px"}}> Agriculture <span style={{color:"orange",fontSize:"20px"}}>{totalagriculture}</span></h6>
                                     <h6 style={{lineHeight:"50px"}}> Industrial <span style={{color:"red",fontSize:"20px"}}>{totalindustrial}</span></h6>
                                     <h6 style={{lineHeight:"50px"}}> Institutional <span style={{color:"gray",fontSize:"20px"}}>{totalinstitutional}</span></h6>
                                   </footer> */}
                                 </div>
        
      


      {/* ====================================add user modal start========================================================== */}

         <Modal  show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                                          <Modal.Header>
                                            <Modal.Title>Add New User<br></br>
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                     
                             <div>
                              <div>
                                     <div className="mb-3">
                                      <h6>Full Name</h6>
                              {/* <label htmlFor="name" className="form-label">Full Name</label> */}
                              <input type="text" className="form-control" id="name" name='full_name' required onChange={handlechange} />
                            </div>
                      
                             <div className="mb-3">
                              <h6>Email</h6>
                              <label htmlFor="email" className="form-label">Activation Instructions will be emailed to this address.</label>
                              <input type="email" className="form-control" id="email" name='email' required onChange={handlechange} />
                            </div>
                      
                             <div className="mb-3">
                               <h6>Mobile</h6>
                              {/* <label htmlFor="email" className="form-label">Mobile</label> */}
                              <input type="text" className="form-control" id="mobile" name='mobile' required placeholder='Verified by OTP' onChange={handlechange}/>
                            </div>
                      
                             <div className="mb-3">
                              <h6>Manager</h6>
                              {/* <label htmlFor="email" className="form-label">Manager</label> */}
                              <input type="text" className="form-control" id="manager" name='manager' required onChange={handlechange}/>
                            </div>
                      
                             <div className="mb-3">
                              <h6>Team</h6>
                              <label htmlFor="team" className="form-label">Team help you filter your reports.</label>
                              <input type="text" className="form-control" id="team" name='team' required onChange={handlechange}/>
                            </div>
                      
                          
                            <h6 > <input type='checkbox'style={{ transform: "scale(1.4)", marginRight: "8px" }} name='permission' onChange={handlechange}></input>Permissions(ADMIN)</h6>
                          <p>Permissions specify how Users can work with leads, contact , and deals.</p>
                          <h6>Assign Permissions</h6>
                          <p>Permission settings specify how users can work with leads, contacts, and deals.
                            Assign an access level to give users to specific Permissions in Sell Learn more
                          </p>
                          <h6><input type='radio' name='assign_permission' onChange={handlechange} value="Full access (Formerly Manager)"></input>Full access (Formerly Manager) </h6>
                          <p>A user with full access can view, update, delete, and convert any lead, contact,
                            and deals in the account.They can also manage goals, task, and appointments
                            and share document.
                          </p>
                          <h6><input type='radio' name='assign_permission' onChange={handlechange} value="Limited access (Formerly Users)"></input> Limited access (Formerly Users)</h6>
                          <p>A user with Limited access can view, update, delete and convert their own leads,
                            contacts and deals.You can add assitional by customizing </p>
                            </div>
                      
                      
                      
                      <div>
                        <p style={{borderTop: "1px solid ", borderBottom: "1px solid #000"}} >Create a new role</p>
                                   <div className="mb-3">
                            <label htmlFor="name" className="form-label">Role name</label>
                              <input type="text" className="form-control" id="name" name='role_name' onChange={handlechange} required placeholder='Manager (Sales)' />
                      
                      
                                    <label htmlFor="name" className="form-label">Description</label>
                                    <textarea type="text" style={{height:'100px'}} name='descriptions' onChange={handlechange} className="form-control" id="name" placeholder='Lets people know how this role should be used. '/>
                                    <h6>Configure Setting Permission</h6>
                                  <h8>Manage</h8><br></br>
                              <div style={{ display: "flex", gap: "80px", alignItems: "center" }}>
                        <label>
                          <input type="checkbox" name='manage' value="profile" onChange={handleCheckboxChange}/> Profile
                        </label>
                        <label>
                          <input type="checkbox" name='manage' value="users" onChange={handleCheckboxChange}/> Users
                        </label>
                        <label>
                          <input type="checkbox" name='manage' value="notification" onChange={handleCheckboxChange}/> Notification
                        </label>
                        <label>
                          <input type="checkbox" name='manage' value="salesgoal" onChange={handleCheckboxChange}/> Sales Goal
                        </label>
                      </div>
                          
                      
                           <h8 style={{ textDecoration: "underline" }}>Data</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='data' value="import" onChange={handleCheckboxChange} /> Import
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="export" onChange={handleCheckboxChange}/> Export
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="bulkupdate" onChange={handleCheckboxChange}/>Bulk Update
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="duplicatemanagement" onChange={handleCheckboxChange}/> Duplicate Managment
                        </label>
                         <label>
                          <input type="checkbox" name='data' value="prospectingandenrich" onChange={handleCheckboxChange}/>Prospecting and Enrich
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="leadcapture" onChange={handleCheckboxChange}/>Lead Capture
                            </label>
                      </div>
                                  <h8 style={{ textDecoration: "underline" }}>Communication Channels</h8><br></br>
                              <div style={{ display: "flex", gap: "80px", alignItems: "center" , marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='communication_channels' value="email" onChange={handleCheckboxChange} /> Email
                        </label>
                        <label>
                          <input type="checkbox"  name='communication_channels' value="voice" onChange={handleCheckboxChange}/> Voice(vertual Call)
                        </label>
                        <label>
                          <input type="checkbox"  name='communication_channels' value="text" onChange={handleCheckboxChange}/>Text(SMS)
                        </label>
                        <label>
                          <input type="checkbox"  name='communication_channels' value="salesgoal" onChange={handleCheckboxChange}/> Sales Goal
                        </label>
                      </div>
                      
                      <h8 style={{ textDecoration: "underline" }}>Customize</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='cutomize' value="lead" onChange={handleCheckboxChange} />Lead
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="contact" onChange={handleCheckboxChange}  />Contact
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="task" onChange={handleCheckboxChange}  />Task
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="properties" onChange={handleCheckboxChange} /> Properties
                        </label>
                         <label>
                          <input type="checkbox" name='cutomize' value="notes" onChange={handleCheckboxChange} />Notes
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="templates" onChange={handleCheckboxChange} />Templates
                            </label>
                       <label>
                          <input type="checkbox" name='cutomize' value="layout" onChange={handleCheckboxChange} />Layout
                            </label>
                             <label>
                          <input type="checkbox" name='cutomize' value="postsales" onChange={handleCheckboxChange} />Post Sales
                            </label>
                            </div>
                      
                      <h8 style={{ textDecoration: "underline" }}>Intergration</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center" , marginTop:'10px'}}>
                        <label>
                          <input type="checkbox" name='integration' value="integration" onChange={handleCheckboxChange} />Intergration
                        </label>
                        <label>
                          <input type="checkbox" name='integration' value="api" onChange={handleCheckboxChange}/>API
                        </label>
                        </div>
                      
                        <h8 style={{ textDecoration: "underline" }}>Business Rule</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='bussiness_rule' value="fieldrules" onChange={handleCheckboxChange} />Field Rules
                        </label>
                        <label>
                          <input type="checkbox" name='bussiness_rule' value="distributions" onChange={handleCheckboxChange}/>Distributions
                        </label>
                        <label>
                          <input type="checkbox" name='bussiness_rule' value="postsales" onChange={handleCheckboxChange}/>Post Sales
                        </label>
                         <label>
                          <input type="checkbox" name='bussiness_rule' value="automatedactions" onChange={handleCheckboxChange}/>Automated Actions
                        </label>
                         <label>
                          <input type="checkbox" name='bussiness_rule' value="triggers" onChange={handleCheckboxChange}/>Triggers
                        </label>
                         <label>
                          <input type="checkbox" name='bussiness_rule' value="scoring" onChange={handleCheckboxChange}/>Scoring
                        </label>
                        </div>
                      </div>
                      
                       <div style={{ display: "flex", gap: "70px", marginTop:'25px',  borderTop: "1px solid #000",borderBottom: "1px solid #000"}}>
                         <label>Leads</label>
                          <label>Contacts</label>
                           <label>Properties</label>
                            <label>Task</label>
                             <label>Booking</label>
                              <label>Reports</label>
                       </div>
                       <div  style={{marginTop:'15px'}}>
                       <h8>Can view Properties</h8> <br></br>
                       <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' value='Their and subordinates deals' onChange={handlechange}></input> Their and subordinates' deals <br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' onChange={handlechange} value='Their subordinates and peers deals'></input>Their subordinates' and peers' deals<br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' onChange={handlechange} value='Their subordinates peers and manager deals'></input>Their subordinates'  peers and manager deals<br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' onChange={handlechange} value='Same deals as thier manager'></input> Same deals as thier manager<br></br>
                      </div>
                             <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px" }} type="checkbox" name='canadd_properties' onChange={handlechange} />Can add Properties<br></br>
                      
                              <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can update Properties<br></br>
                               <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canupdate_properties' onChange={handlechange} value='Only thier and subordinates deals'></input> Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canupdate_properties' onChange={handlechange} value='All deals they can view'></input> All deals they can view<br></br>
                      
                                <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can reassign ownership of Properties<br></br>
                               <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canreassign_properties' onChange={handlechange} value='Only thier and subordinates deals'></input>Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canreassign_properties' onChange={handlechange} value='All deals they can view'></input>  All deals they can view<br></br>
                      
                                  <input style={{marginTop:'30px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can delete Properties<br></br>
                               <input style={{marginTop:'10px'}} type='radio' name='candeletproperties' onChange={handlechange} value='Only thier and subordinates deals'></input>Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px'}} type='radio' name='candeletproperties' onChange={handlechange} value='All deals they can view'></input>  All deals they can view<br></br>
                      
                               <div  style={{marginTop:'15px'}}>
                                <h8 >Can view Properties Owner</h8> <br></br>
                       <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Their and subordinates deals'></input> Their and subordinates' deals <br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Their subordinates and peers deals'></input>Their subordinates' and peers' deals<br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Their subordinates peers and manager deals'></input>Their subordinates'  peers and manager deals<br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Same deals as thier manager'></input> Same deals as thier manager<br></br>
                           </div>
                      </div>
                      
                      
                            
                          </div>
                                      
                              
                                
                              
                                          </Modal.Body>
                                          <Modal.Footer>
                                       
                                            <Button variant="secondary" onClick={handleClose1}>
                                              Cancel
                                            </Button>
                                            <Button variant="secondary" onClick={adduser}>
                                              Add user
                                            </Button>
                                         
                                          </Modal.Footer>
                                        </Modal>

      {/*================================== add user modal end===================================================================== */}
    </div>
  )
}

export default Users
