import {React,useState,useEffect} from 'react'

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
import api from "../../api";
import Swal from 'sweetalert2';
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Role() {

const navigate=useNavigate()
    
// tabs

   const [activeTab, setActiveTab] = useState("Leads");

  const tabs = ["Leads", "Contacts", "Properties", "Task", "Booking", "Reports"];

  const [roleData, setRoleData] = useState({
    role_name: "",
    descriptions: "",
    manage: [],
    data: [],
    communication_channels: [],
    cutomize: [],
    integration: [],
    bussiness_rule: [],
    permissions: {
      Leads: {},
      Contacts: {},
      Properties: {},
      Task: {},
      Booking: {},
      Reports: {},
    },
  });

  // 🔹 Handle text or textarea changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle top-level checkboxes (for manage, data, etc.)
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setRoleData((prev) => {
      const updatedArray = checked
        ? [...prev[name], value]
        : prev[name].filter((v) => v !== value);
      return { ...prev, [name]: updatedArray };
    });
  };

  // 🔹 Handle permission radio/checkbox inside each tab
  const handlePermissionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoleData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [activeTab]: {
          ...prev.permissions[activeTab],
          [name]: type === "checkbox" ? checked : value,
        },
      },
    }));
  };

  console.log(roleData);
  


  //===================================== get user and table code start========================================================

    const[data,setdata]=useState([])

    const getalluserdata=async()=>
    {
      try {
        const resp=await api.get('api/settings/viewuser')
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
        { id: 'full_name', name: 'Role Name' },
        { id: 'email', name: 'Description' },
        { id: 'manager', name: 'Assigned User' }
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
                                        await api.delete(`api/settings/deleteuser/${itemId}`);
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

        const [user,setuser]=useState({full_name:"",email:"",mobile:"",manager:"",team:"",permission:"",
                                        assign_permission:""
                                      })  


    
                               


    const adduser=async()=>
    {
      try {
        const resp=await api.post('api/settings/adduser',user)
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
   
<div style={{backgroundColor:"lightgray"}}>

    


    {/* 🔹 Top Filter Bar Section */}
<div className="bg-white mt-0 px-0 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  
  {/* Search Bar */}
  <div className="flex items-center w-full sm:w-1/2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386a1 1 0 01-1.414 1.415l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
    </svg>
    <input
      type="text"
      placeholder="Search by name, email, or role..."
      className="w-full bg-transparent focus:outline-none text-sm"
      onChange={async(e) => {
        const value = e.target.value.toLowerCase();
        const filtered = data.filter(
          (item) =>
            item.full_name?.toLowerCase().includes(value) ||
            item.email?.toLowerCase().includes(value) ||
            item.role_name?.toLowerCase().includes(value)
        );
        setdata(filtered.length > 0 || value ? filtered : await api.get('viewuser').then(r => r.data.user));
      }}
    />
  </div>

 

  {/* Add User Button */}
  <div className="flex justify-end">
    <button
      onClick={handleShow1}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
      Add New Role
    </button>
  </div>

</div>



        <div className="flex items-center justify-between bg-white mt-0 px-4 py-2 shadow-sm border-t border-gray-200">

  {/* Left Section - Action Buttons */}
  <div className="flex items-center gap-5 ml-6">
    <Tooltip title="Delete Data.." arrow>
      <img
        id="delete"
        src={
          isHoveringDelete
            ? "https://cdn-icons-png.freepik.com/512/6861/6861362.png"
            : "https://cdn-icons-png.freepik.com/512/7078/7078067.png"
        }
        onClick={deleteSelectedItems}
        onMouseEnter={() => setIsHoveringDelete(true)}
        onMouseLeave={() => setIsHoveringDelete(false)}
        alt="Delete"
        className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200"
      />
    </Tooltip>
  </div>

  {/* Right Section - Pagination & Items Dropdown */}
  <div className="flex items-center gap-3 mr-8">
    <label
      htmlFor="itemsPerPage"
      className="text-gray-700 text-sm font-medium"
    >
      Items:
    </label>
    <select
      id="itemsPerPage"
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      className="border border-gray-300 text-gray-700 text-sm rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>

    {/* Pagination Buttons */}
    <div className="flex items-center gap-1">
      {renderPageNumbers()}
    </div>
  </div>
</div>



        
        

                    <div style={{marginTop:"2px",backgroundColor:"white"}}>
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

                                 </div>
        
      


      {/* ====================================add user modal start========================================================== */}

         <Modal  show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                <Modal.Header>
                <Modal.Title>Add New Role<br></br>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                     <div>
                        <p style={{borderTop: "1px solid ", borderBottom: "1px solid #000"}} >Create a new role</p>
                                   <div className="mb-3">
                            <label htmlFor="name" className="form-label">Role name</label>
                              <input type="text" className="form-control" id="name" name='role_name' onChange={handleChange} required placeholder='Manager (Sales)' />
                      
                      
                                    <label htmlFor="name" className="form-label">Description</label>
                                    <textarea type="text" style={{height:'100px'}} name='descriptions' onChange={handleChange} className="form-control" id="name" placeholder='Lets people know how this role should be used. '/>
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
                      
                       <div className="bg-white p-5 rounded-lg shadow-md mt-5">
      {/* Tabs */}
      <div className="flex gap-10 border-b border-gray-300 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium pb-2 transition-all duration-200 ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="mt-5 space-y-5 text-sm">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Can view {activeTab}
          </h3>
          <div className="space-y-2 ml-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}`}
                value="Their and subordinates deals"
                onChange={handlePermissionChange}
              />
              Their and subordinates' deals
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}`}
                value="Their subordinates and peers deals"
                onChange={handlePermissionChange}
              />
              Their subordinates' and peers' deals
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}`}
                value="Their subordinates peers and manager deals"
                onChange={handlePermissionChange}
              />
              Their subordinates', peers', and manager deals
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}`}
                value="Same deals as their manager"
                onChange={handlePermissionChange}
              />
              Same deals as their manager
            </label>
          </div>
        </div>

        {/* Add */}
        <div className="mt-5">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              name={`canadd_${activeTab.toLowerCase()}`}
              onChange={handlePermissionChange}
              className="scale-125"
            />
            Can add {activeTab}
          </label>
        </div>

        {/* Update */}
        <div className="mt-5">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              name={`canupdate_${activeTab.toLowerCase()}`}
              className="scale-125"
              onChange={handlePermissionChange}
            />
            Can update {activeTab}
          </label>

          <div className="space-y-2 mt-2 ml-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canupdate_${activeTab.toLowerCase()}_range`}
                value="Only their and subordinates deals"
                onChange={handlePermissionChange}
              />
              Only their and subordinates' deals
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canupdate_${activeTab.toLowerCase()}_range`}
                value="All deals they can view"
                onChange={handlePermissionChange}
              />
              All deals they can view
            </label>
          </div>
        </div>

        {/* Reassign */}
        <div className="mt-5">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              name={`canreassign_${activeTab.toLowerCase()}`}
              className="scale-125"
              onChange={handlePermissionChange}
            />
            Can reassign ownership of {activeTab}
          </label>

          <div className="space-y-2 mt-2 ml-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canreassign_${activeTab.toLowerCase()}_range`}
                value="Only their and subordinates deals"
                onChange={handlePermissionChange}
              />
              Only their and subordinates' deals
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canreassign_${activeTab.toLowerCase()}_range`}
                value="All deals they can view"
                onChange={handlePermissionChange}
              />
              All deals they can view
            </label>
          </div>
        </div>

        {/* Delete */}
        <div className="mt-5">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              name={`candelete_${activeTab.toLowerCase()}`}
              className="scale-125"
              onChange={handlePermissionChange}
            />
            Can delete {activeTab}
          </label>

          <div className="space-y-2 mt-2 ml-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`candelete_${activeTab.toLowerCase()}_range`}
                value="Only their and subordinates deals"
                onChange={handlePermissionChange}
              />
              Only their and subordinates' deals
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`candelete_${activeTab.toLowerCase()}_range`}
                value="All deals they can view"
                onChange={handlePermissionChange}
              />
              All deals they can view
            </label>
          </div>
        </div>

        {/* Owner View */}
        <div className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-2">
            Can view {activeTab} Owner
          </h3>
          <div className="space-y-2 ml-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}_owner`}
                value="Their and subordinates deals"
                onChange={handlePermissionChange}
              />
              Their and subordinates' deals
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}_owner`}
                value="Their subordinates and peers deals"
                onChange={handlePermissionChange}
              />
              Their subordinates' and peers' deals
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}_owner`}
                value="Their subordinates peers and manager deals"
                onChange={handlePermissionChange}
              />
              Their subordinates', peers', and manager deals
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`canview_${activeTab.toLowerCase()}_owner`}
                value="Same deals as their manager"
                onChange={handlePermissionChange}
              />
              Same deals as their manager
            </label>
          </div>
        </div>
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
  
  <ToastContainer/>
    </div>
  )
}

export default Role
