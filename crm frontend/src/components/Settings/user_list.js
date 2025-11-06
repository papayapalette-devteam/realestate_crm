import {React,useState,useEffect} from 'react'
import Header1 from '../header1'
import Sidebar1 from '../sidebar1'
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
import {  SvgIcon } from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Sidebarsetting from './settingsidebar';
import MainLayout from "./main_layout";

function Users() {

const navigate=useNavigate()
    
// tabs

  const [activeTab, setActiveTab] = useState("userList");




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
        { id: 'full_name', name: 'Full Name' },
        { id: 'email', name: 'Email' },
        { id: 'password', name: 'Password' },
        { id: 'manager', name: 'Manager' },
        { id: 'team', name: 'Team' },
        { id: 'mobile', name: 'Mobile No' },
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

        const [user,setuser]=useState({full_name:"",email:"",password:"",mobile:"",manager:"",team:"",permission:"",
                                        assign_permission:""
                                      })  


        const handlechange = (e) => {
        const { name, type, value, checked } = e.target;

        setuser((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? (checked ? 'yes' : 'no') : value
        }));
      };

                               


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

  {/* Status Tabs */}
  <div className="flex justify-center sm:justify-start gap-3">
    {["Active", "Deactivated", "Pending"].map((status) => (
      <button
        key={status}
        onClick={() => setActiveTab(status.toLowerCase())}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
          ${
            activeTab === status.toLowerCase()
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
      >
        {status}
      </button>
    ))}
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
      Add User
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
                              <h6>Password</h6>
                              <label htmlFor="email" className="form-label">Activation Instructions will be emailed to this address.</label>
                              <input type="password" className="form-control" id="password" name='password' required onChange={handlechange} />
                            </div>
                      
                             <div className="mb-3">
                               <h6>Mobile</h6>
                              {/* <label htmlFor="email" className="form-label">Mobile</label> */}
                              <input type="text" className="form-control" id="mobile" name='mobile' required onChange={handlechange}/>
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
  
    </div>
  )
}

export default Users
