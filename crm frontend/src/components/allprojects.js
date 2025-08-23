import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import {  useNavigate } from "react-router-dom";
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
import { utils, writeFile } from "xlsx";
import Tooltip from '@mui/material/Tooltip';
import api from "../api";
import '../css/deal.css';
import Swal from "sweetalert2";


function Allprojects() {


  const navigate=useNavigate()
   


    // ==========================================fetch all project data start=========================================================

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
                          console.log(resp);
                          
                          // setcdata(resp.data.project)
                          setcdata(resp.data.allprojectwithoutunitdetails)
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

    //============================================= fetch all project data end===========================================================

    //========================================== pagination code start===========================================================

    
                      const [currentPage1, setCurrentPage1] = useState(1);
                      const [itemsPerPage1, setItemsPerPage1] = useState(10); // User-defined items per page
                      const indexOfLastItem1 = currentPage1 * itemsPerPage1;
                      const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
                      const currentItems2 = cdata?.slice(indexOfFirstItem1, indexOfLastItem1);
                      const totalPages1 = Math.ceil(cdata?.length / itemsPerPage1);
                      
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
    
                     
    

    //================================================== pagination code end=======================================================

    // ====================================columns and select all code start==================================================


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
    

    // =========================================colomns and select all code end=============================================

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
                        //   setSuggestions([])
                        }
                      }
                    
                      document.addEventListener("mousedown", handleClickOutside);
                      return () => {
                        document.removeEventListener("mousedown", handleClickOutside);
                      };
                    }, []);
                    
    
    // ============================================project suggestion box code end======================================================

    // ====================================================table styling code start==============================================

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

    //=================================================== table styling code end========================================================

    //======================================= sorting code start==============================================================

        const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
          const handleSort = (key) => {
            let direction = 'asc';
            if (sortConfig.key === key && sortConfig.direction === 'asc') {
              direction = 'desc';
            }
            
            const sortedData = [...cdata].sort((a, b) => {
              if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
              if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
              return 0;
            });
          
            setSortConfig({ key, direction });
            setcdata(sortedData)
          };
    //=============================================== sorting code end===========================================================


    // ================================================delete project start============================================================

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


    // =====================================================delete project end========================================================


     //===================================== export to excel code start======================================================

     const exportToExcel = () => {
      const filteredData = cdata.map(({ developer,block_tower, project,unit_number,location,linkded_contact,ownership,facing}) => ({ developer,block_tower, project,unit_number,location,linkded_contact,ownership,facing }));
      // Create a new workbook
      const workbook = utils.book_new();
    
      // Convert data to a worksheet
      const worksheet = utils.json_to_sheet(filteredData);
    
      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
      // Export the workbook to an Excel file
      writeFile(workbook, "inventory_data.xlsx");
    };
     
    //========================================== export to excel code end===================================================

    // ==========================================toggle action buttons start=================================================

       useEffect(()=>
                              {
                            
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
                               
                                       
                                      
                                         
                            
                              },[selectedItems2])

    //======================================= toggle action buttons end========================================================

    //=============================================== project action buttons toggle start=============================================================
    
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
    
    // =============================================================project action button toggle end==================================================
  return (
    <div>
           <Header1/>
            <Sidebar1/>

         <div id="projectlistview" className="project-list-view">
          <div style={{marginTop:"53px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}}>Project </h3>
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

      <div style={{marginTop:"2px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px",position:"sticky",top:"50px",zIndex:"1"}}>

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
    //    onClick={handleShow5} 
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
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"50px",bottom:"0",backgroundColor:"#f8f9fa",marginLeft:"10px"}}>
          <h5 style={{lineHeight:"50px",color:"GrayText"}}>Summary</h5>
          <h6 style={{lineHeight:"50px"}}>Total Project <span style={{color:"green",fontSize:"20px"}}>{totalproject}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Ready To Move <span style={{color:"blue",fontSize:"20px"}}>{totalreadytomove}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Under Construction <span style={{color:"red",fontSize:"20px"}}>{totalunderconstruction}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Pre Launch <span style={{color:"gray",fontSize:"20px"}}>{totalprelaunch}</span></h6>
          <h6 style={{lineHeight:"50px"}}>Upcoming <span style={{color:"pink",fontSize:"20px"}}>{totalupcoming}</span></h6>
        </footer>
      </div>



          </div>
      <ToastContainer/>
    </div>
  )
}

export default Allprojects
