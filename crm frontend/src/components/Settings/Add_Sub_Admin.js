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
import { all } from 'axios';

function AddSubAdmin() {

const navigate=useNavigate()
    
  //===================================== get user and table code start========================================================

    const[all_users,setall_users]=useState([])

    const getalluserdata=async()=>
    {
      try {
        const resp=await api.get('viewuser')
        setall_users(resp.data.user)
        
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(()=>
    {
      getalluserdata()
    },[])
 
    
  //=================================== get user and table code end==============================================================

      const[all_sub_admins,setall_sub_admins]=useState([])

    const getall_sub_admins=async()=>
    {
      try {
        const resp=await api.get('api/settings/get-sub-admins')
        setall_sub_admins(resp.data.sub_admin)
        
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(()=>
    {
      getall_sub_admins()
    },[])



    const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'full_name', name: 'Full Name' },
        { id: 'UserName', name: 'User Name' },
        { id: 'Password', name: 'Password' },
      ];

      
    
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(7); // User-defined items per page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = all_sub_admins.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(all_sub_admins.length / itemsPerPage);
      
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
                      const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(2, 4));
          
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
                        
                        const sortedData = [...all_users].sort((a, b) => {
                          if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
                          if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
                          return 0;
                        });
                      
                        setSortConfig({ key, direction });
                        setall_users(sortedData)
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
                                        await api.delete(`api/settings/remove-sub-admins/${itemId}`);
                                      });

                                      console.log(resp);
                                      
                                      
                                        Swal.fire({
                                                    icon: 'success',
                                                    title: 'Sub Admin Deleted',
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

        const [sub_admin,setsub_admin]=useState({User:"",UserName:"",Password:""})  


        const handlechange = (e) => {
        const { name, type, value, checked } = e.target;

        setsub_admin((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? (checked ? 'yes' : 'no') : value
        }));
      };

                               


    const add_sub_admin=async()=>
    {
      try {
        const resp=await api.post('api/settings/add-sub-admin',sub_admin)
        if(resp.status===200)
        {
          Swal.fire({
            icon:"success",
            title:"New Sub Admin Created",
            text:"new sub-admin created successfully...",
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

console.log(all_sub_admins);


         const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  return (
    <div>
        <Header1/>
        <Sidebar1/>

          <div style={{marginTop:"60px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
                   
                   <h3 style={{marginLeft:"10px",cursor:"pointer"}}>Add Sub Admin </h3>
                  
                         <Tooltip title="Add New User..." arrow>
                                   <button onClick={handleShow1}   style={{ position:"relative",marginLeft: '40%',width:"50px",padding: '8px',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer',fontWeight: 'bold',textAlign: 'center'}} className="form-control form-control-sm form-control form-control-sm-sm"  >
                                          <img src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-vector-plus-icon-png-image_5169416.jpg" alt='' style={{height:"25px"}}></img>
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
                                     {allColumns.slice(1).map((col) => (
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
                                 
                                      <StyledTableCell 
                                             style={{ padding: "10px",fontSize:"12px" }}
                                           >
                                           {item.User.full_name}
                                             
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
                                            <Modal.Title>Add New Sub Admin<br></br>
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                     
                             <div>
                              <div>
                                     <div className="mb-3">
                                      <h6>Select User</h6>
                              <select  className="form-control" id="name" name='User' required onChange={handlechange}>
                                <option>Select User</option>
                                {
                                    all_users.map((item)=>
                                    (
                                        <option value={item._id}>{item.full_name}</option>
                                    ))
                                }
                                </select>
                            </div>
                      
                             <div className="mb-3">
                              <h6>User Name</h6>
                              
                              <input type="email" className="form-control" id="email" name='UserName' required onChange={handlechange} />
                            </div>

                                             
                             <div className="mb-3">
                               <h6>Password</h6>
                              <input type="text" className="form-control" id="mobile" name='Password' required placeholder='Enter Password' onChange={handlechange}/>
                            </div>
 
                      </div>
                      
                      
                            
                          </div>
                                      
                              
                                
                              
                                          </Modal.Body>
                                          <Modal.Footer>
                                       
                                            <Button variant="secondary" onClick={handleClose1}>
                                              Cancel
                                            </Button>
                                            <Button variant="secondary" onClick={add_sub_admin}>
                                              Add Sub Admin
                                            </Button>
                                         
                                          </Modal.Footer>
                                        </Modal>

      {/*================================== add user modal end===================================================================== */}
    </div>
  )
}

export default AddSubAdmin
