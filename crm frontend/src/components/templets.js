import React, { useState, useEffect, useRef } from 'react';
import Header1 from './header1'
import Sidebar1 from './sidebar1'
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
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { ToastContainer,toast } from "react-toastify";
import ReactQuill,{ Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import EmojiPicker from 'emoji-picker-react'; // popular emoji picker




function Templets() {

    useEffect(()=>{fetchdata()},[])
        const[data,setdata]=useState([]);
        const fetchdata=async(event)=>
          {
            
            try {
              const resp=await api.get('viewtemplets')
              setdata(resp.data.templetes)
            } catch (error) {
              console.log(error);
            }
          
          }

                const allColumns = [
                { id: 'sno', name: '#' },
                { id: 'templetename', name: 'Templete_Name' },
                { id: 'templetecontent', name: 'Content' },
                ];

                const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
                      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
                      const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 3));
          
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
                                              await api.delete(`deleteleadscore/${itemId}`);
                                            });
                                            
                                              Swal.fire({
                                                          icon: 'success',
                                                          title: 'Lead Score Criteria Deleted',
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

                 const [show1, setshow1] = useState(false);
                  
                   const handleClose1 = () => setshow1(false);
            
                   const handleShow1=async()=>setshow1(true);

      const [templateName, setTemplateName] = useState('');
      const [templateContent, setTemplateContent] = useState('');

      
Quill.register('modules/imageResize', ImageResize);



      const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet'}],
      ['link', 'image', 'video'],
      ['emoji'], 
      ['clean']
    ],
    imageResize: {
    parchment: Quill.import('parchment'), // Required for some builds
  }
  
  };

 const variableList = [
  '{{title}}',
  '{{first_name}}',
  '{{last_name}}',
  '{{propertyDetails}}',
  '{{icon}}',
  '{{location}}',
  '{{price}}',
  '{{facing}}',
  '{{registry}}',
  '{{ownership}}',
  '{{possession}}',
  '{{amenities}}',
  '{{nearby}}',
  '{{listingGalleryLink}}',
  '{{bookingLink}}',
  '{{project_name}}',
  '{{unit_no}}',
  '{{unit_type}}',
  '{{category}}',
  '{{sub_category}}',
  '{{block}}',
  '{{size}}',
  '{{direction}}',
  '{{road}}',
  '{{stage}}',
  '{{floor}}',
  '{{cluter_details}}',
  '{{length}}',
  '{{bredth}}',
  '{{total_area}}',
  '{{measurment2}}',
  '{{ocupation_date}}',
  '{{age_of_construction}}',
  '{{furnishing_details}}',
  '{{furnished_item}}',
  '{{lattitude}}',
  '{{langitude}}',
  '{{uaddress}}',
  '{{ustreet}}',
  '{{ulocality}}',
  '{{ucity}}',
  '{{uzip}}',
  '{{ustate}}',
  '{{ucountry}}',
  '{{relation}}',
  '{{s_no}}',
  '{{preview}}',
  '{{descriptions}}',
  '{{s_no1}}',
  '{{url}}',
  '{{document_name}}',
  '{{document_no}}',
  '{{document_Date}}',
  '{{owner_details}}',
  '{{associated_contact}}',
  '{{previousowner_details}}'
];


 

    const quillRef = useRef(null); // Create a ref for the ReactQuill component
      const [showEmojiPicker, setShowEmojiPicker] = useState(false);
      const onEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    if (range) {
      editor.insertText(range.index, emoji);
      editor.setSelection(range.index + emoji.length);
    } else {
      // If no selection, append emoji at end
      editor.insertText(editor.getLength(), emoji);
    }

    setShowEmojiPicker(false);
  };

  const pickerRef = useRef(null);
    // Close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        !event.target.closest('.ql-emoji')
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  //   const handleAddVariable = (variable) => {
  //   if (quillRef.current) {
  //     const quill = quillRef.current.getEditor(); // Access Quill editor instance
  //     const cursorPosition = quill.getSelection()?.index || 0; // Get current cursor position
  //     quill.insertText(cursorPosition, ` ${variable} `); // Insert variable at the cursor position
  //     quill.setSelection(cursorPosition + variable.length + 2); // Move cursor after the inserted variable (space included)
  //     setTemplateContent(quill.root.innerHTML);
  //   }
  // };

   const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({ top: 0, left: 0 });
  const [selectionIndex, setSelectionIndex] = useState(null);

  // Handle text change to detect '{{'
  // ✅ Wait until editor is mounted
  useEffect(() => {
    const interval = setInterval(() => {
      const quill = quillRef.current?.getEditor();
      if (quill) {
        clearInterval(interval);

        const handleTextChange = () => {
          const selection = quill.getSelection();
          if (!selection || selection.index === null) return;

          const cursorPosition = selection.index;
          const textBefore = quill.getText(Math.max(0, cursorPosition - 2), 2);

          console.log('Typed:', textBefore);

          if (textBefore === '{{') {
            const bounds = quill.getBounds(cursorPosition);
            setCursorCoords({ top: bounds.top + 40, left: bounds.left });
            setShowSuggestions(true);
            setSelectionIndex(cursorPosition);
          } else {
            setShowSuggestions(false);
          }
        };

        quill.on('text-change', handleTextChange);

        // Cleanup on unmount
        return () => {
          quill.off('text-change', handleTextChange);
        };
      }
    }, 100); // Check every 100ms

    return () => clearInterval(interval);
  }, []);


  // Handle selecting a variable
  const handleVariableSelect = (variable) => {
    const quill = quillRef.current.getEditor();
    if (selectionIndex !== null) {
      quill.deleteText(selectionIndex - 2, 2); // remove {{
      quill.insertText(selectionIndex - 2, variable + ' ');
      quill.setSelection(selectionIndex - 2 + variable.length + 1);
      setTemplateContent(quill.root.innerHTML);
      setShowSuggestions(false);
    }
  };

   const handleSaveTemplate = async () => {
    if (!templateName || !templateContent) {
      alert('Template name and content are required');
      return;
    }

    try {
      const resp=await api.post('addtemplete', {templateName,templateContent});

      if(resp.status===200)
        {
        Swal.fire({
            title: "Template Created",
            text: "Template created successfully!",
            icon: "success",
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
            handleClose1();
            }
        });
        }

      setTemplateName('');
      setTemplateContent('');
    } catch (error) {
      console.error('Error saving template', error);
    }
  };
          
  const[templetsfor,settempletsfor]=useState("")

     const [templateName1, setTemplateName1] = useState('');
  const [elements, setElements] = useState([]);
  const [dragging, setDragging] = useState(null);

  const blocks = ['Header', 'Text', 'Image', 'Button', 'Link', 'Divider', 'Icon'];

  const handleDrop = () => {
    if (dragging === 'Image' || dragging === 'Icon') {
      document.getElementById('fileInput').click();
    } else {
      const newElement = { type: dragging, content: '' };
      if (dragging === 'Button' || dragging === 'Link') {
        newElement.href = '';
        newElement.text = dragging === 'Button' ? 'Click Me' : 'Visit Link';
      }
      setElements([...elements, newElement]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setElements([...elements, { type: dragging, content: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (idx, value, field = 'content') => {
    const updated = [...elements];
    updated[idx][field] = value;
    setElements(updated);
  };

  const handleDelete = (idx) => {
    const updated = [...elements];
    updated.splice(idx, 1);
    setElements(updated);
  };

  const handleSubmit = async () => {
    if (!templateName.trim()) {
      alert('Template name is required');
      return;
    }
    try {
      await api.post('http://localhost:5000/api/templates', {
        name: templateName,
        elements,
      });
      alert('Template saved successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save template');
    }
  };

  const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  return (
    <div>
        <Header1/>
        <Sidebar1/>

             <div style={{marginTop:"60px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
                       
                       <h3 style={{marginLeft:"10px",cursor:"pointer"}}>Create Templates</h3>
                      
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
            
                             <Tooltip title="Add Templets..." arrow>
                                       <button onClick={handleShow1}  style={{ position:"relative",marginLeft: '40%',width:"50px",padding: '8px',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer',fontWeight: 'bold',textAlign: 'center'}} className="form-control form-control-sm form-control form-control-sm-sm"  >
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
            
                     
                       
                         
              
                        <div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
                            <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                          <TableRow >
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
                                style={{   cursor: 'pointer',backgroundColor:"gray" }}
                              >
                                {col.name}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <tbody>
                          {
                           
                          currentItems.map ((item, index) => (
                            <StyledTableRow key={index} >
                              <StyledTableCell >
                                <input 
                                  type="checkbox"
                                  checked={selectedItems.includes(item._id)}
                                  onChange={() => handleRowSelect(item._id)}
                                />
                                {index + 1}
                              </StyledTableCell>
            
                              <StyledTableCell 
                                style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
                              >
                              {item.templateName}
                    
                              </StyledTableCell>
            
                          <StyledTableCell
                            style={{ padding: "10px", cursor: "pointer", fontSize: "12px" }}
                            dangerouslySetInnerHTML={{ __html: item.templateContent }}
                            />

                  
                            </StyledTableRow>
                          ))}
                        </tbody>
                      </Table>
                       </TableContainer>
                        </div>
                             <Modal  show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                                            <Modal.Header>
                                              <Modal.Title>Add Templates<br></br>
                                              </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                    <div className='row' style={{padding:"20px"}}>

                                           <div className="col-md-6"><label className="labels"> Create Templete For</label>
                                                <select className="form-control form-control-sm" onChange={(e)=>settempletsfor(e.target.value)}>
                                                 <option>---select---</option>
                                                <option>Mail</option>
                                                <option>Whats App</option>
                                                </select>
                                            </div>
                                       
                                       <div className='row' id='whatsapptemplete' style={{padding:"20px",display:templetsfor==="Whats App" ? "flex" : "none"}}>
                                                <div className="col-md-6">
                                                <label className="labels">Template Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={templateName}
                                                    onChange={(e) => setTemplateName(e.target.value)}
                                                    placeholder="Enter template name"
                                                />
                                                </div>
                                           

                                               <div className="row mb-3">

                                                <div className="col-12">
                                                <label className="labels">Templates Content
                                                 <Tooltip title="all emoji here" arrow> <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{marginLeft:"20px",border:"none",backgroundColor:"transparent"}}>
                                              {showEmojiPicker ? '😎' : '😊'}
                                              </button>
                                              </Tooltip>
                                            <div style={{ position: 'relative' }}>

                                              {showEmojiPicker && (
                                                <div ref={pickerRef} style={{ position: 'absolute', zIndex: 1000 }}>
                                                  <EmojiPicker onEmojiClick={onEmojiClick} />
                                                </div>
                                              )}
                                              </div>
                                                </label>
                                                <ReactQuill
                                                 ref={quillRef}
                                                    value={templateContent}
                                                    onChange={setTemplateContent}
                                                    modules={modules}
                                                    placeholder="Write your content here must use <!--START:deal--> and <!--END:deal-->
                                                    inside this use deal variables"
                                                    
                                                    style={{ height: '200px', marginBottom: '20px' }}
                                                    
                                                />

                                                 {showSuggestions && (
                                                          <div
                                                            style={{
                                                              position: 'absolute',
                                                              top: cursorCoords.top,
                                                              left: cursorCoords.left,
                                                              backgroundColor: '#fff',
                                                              border: '1px solid #ccc',
                                                              borderRadius: '4px',
                                                              zIndex: 1000,
                                                              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                                              overflow:"auto",
                                                              height:"300px"
                                                            }}
                                                          >
                                                            {variableList.map((variable) => (
                                                              <div
                                                                key={variable}
                                                                onMouseDown={(e) => e.preventDefault()}
                                                                onClick={() => handleVariableSelect(variable)}
                                                                style={{
                                                                  padding: '5px 10px',
                                                                  cursor: 'pointer',
                                                                  borderBottom: '1px solid #eee',
                                                                }}
                                                              >
                                                                {variable}
                                                              </div>
                                                            ))}
                                                          </div>
                                                        )}

                                                </div>
                                            </div>

                                             

                                           {/* <div className="row mb-3">
                                            <div className="col-12">
                                            <label className="labels">Insert Variables</label>
                                            <div className="btn-group">
                                                {variableList.map((variable) => (
                                                <button
                                                    key={variable}
                                                    className="btn btn-sm btn-outline-primary"
                                                    // onClick={() => handleAddVariable(variable)}
                                                >
                                                    {variable}
                                                </button>
                                                ))}
                                            </div>
                                            </div>
                                        </div> */}

                                        </div>

                                        </div>

                                         <div className='row' style={{padding:"20px",display:templetsfor==="Mail" ? "flex" : "none"}}>

      
     <div style={{ display: 'flex', padding: '20px', gap: '30px' }}>
      {/* Sidebar */}
      <div>
        <h3>Blocks</h3>
        {blocks.map((block) => (
          <div
            key={block}
            draggable
            onDragStart={() => setDragging(block)}
            style={{
              padding: '10px',
              marginBottom: '5px',
              background: '#f0f0f0',
              cursor: 'grab',
              borderRadius: '5px',
            }}
          >
            {block}
          </div>
        ))}
      </div>

      {/* Builder Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          flex: 1,
          border: '2px dashed #ccc',
          minHeight: '500px',
          padding: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '20px' }}
        />

        {elements.map((el, idx) => (
          <div key={idx} style={{ position: 'relative', marginBottom: '15px' }}>
            {el.type === 'Header' && (
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleContentChange(idx, e.target.innerText)}
              >
                {el.content || 'Editable Header'}
              </h2>
            )}

            {el.type === 'Text' && (
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleContentChange(idx, e.target.innerText)}
              >
                {el.content || 'Editable Text'}
              </p>
            )}

            {el.type === 'Image' && <img src={el.content} alt="Uploaded" style={{ maxWidth: '100%' }} />}

            {el.type === 'Icon' && <img src={el.content} alt="Icon" style={{ width: '40px', height: '40px' }} />}

            {el.type === 'Divider' && <hr />}

            {el.type === 'Button' && (
              <a
                href={el.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                }}
              >
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContentChange(idx, e.target.innerText, 'text')}
                >
                  {el.text}
                </span>
              </a>
            )}

            {el.type === 'Link' && (
              <div>
                <input
                  type="text"
                  placeholder="Link text"
                  value={el.text}
                  onChange={(e) => handleContentChange(idx, e.target.value, 'text')}
                  style={{ padding: '5px', marginRight: '10px' }}
                />
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={el.href}
                  onChange={(e) => handleContentChange(idx, e.target.value, 'href')}
                  style={{ padding: '5px' }}
                />
                <div style={{ marginTop: '5px' }}>
                  <a
                    href={el.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#007bff',
                      textDecoration: 'underline',
                    }}
                  >
                    {el.text || 'Visit Link'}
                  </a>
                </div>
              </div>
            )}

            <button
              onClick={() => handleDelete(idx)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '5px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Save Template
        </button>
      </div>

      {/* Hidden File Input for Images & Icons */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>

                                         </div>

                                            </Modal.Body>
                                             <Modal.Footer>
                                                 
                                            <Button variant="secondary" onClick={handleClose1}>
                                                Close
                                            </Button>
                                            <Button variant="secondary" onClick={handleSaveTemplate}>
                                                Save
                                            </Button>
                                            </Modal.Footer>
                                </Modal>

       
    </div>
  )
}

export default Templets
