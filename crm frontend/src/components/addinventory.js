    import Header1 from "./header1";
    import Sidebar1 from "./sidebar1";
    import '../css/addinventory.css';
    import { useState } from 'react';
    import Button from 'react-bootstrap/Button';
    import Modal from 'react-bootstrap/Modal';
    import * as React from 'react';
    import MenuItem from '@mui/material/MenuItem';
    import ListItemText from '@mui/material/ListItemText';
    import Select from '@mui/material/Select';
    import Checkbox from '@mui/material/Checkbox';
    import { toast,ToastContainer } from "react-toastify";
    import axios from "axios";
    import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
    import { render } from "@testing-library/react";
    import api from "../api";
    import { useNavigate } from "react-router-dom";

    function Addinventory() {
      const navigate=useNavigate()
      
        const emails = [
          'Oliver Hansen',
          'Van Henry',
          'April Tucker'
        ];
        const [email, setemail] = React.useState([]);

        const handleChange = (event) => {
          const {
            target: { value },
          } = event;
          setemail(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
        };
        
        const sales = [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker'
          ];
          const [sale, setsale] = React.useState([]);

        const handleChange1 = (event) => {
          const {
            target: { value },
          } = event;
          setsale(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
        };

        const teams = [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker'
          ];
          const [team, setteam] = React.useState([]);

        const handleChange2 = (event) => {
          const {
            target: { value },
          } = event;
          setteam(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
        };

        const [show1, setshow1] = useState(false);

      const handleClose1 = () => setshow1(false);
      const handleShow1 = () => setshow1(true);

        const [show2, setshow2] = useState(false);

      const handleClose2 = () => setshow2(false);
      const handleShow2 = () => setshow2(true);

        const [show3, setshow3] = useState(false);

      const handleClose3 = () => setshow3(false);
      const handleShow3 = () => setshow3(true);    

      /*-------------------------------------------------------------------form next and prev buttons display code start----------------------------------------------------- */
        function handler()
        {
            document.getElementById("projectform").style.display="none";
            document.getElementById("basicform").style.display="flex";

            document.getElementById("projectbtn").style.display="none";
            document.getElementById("basicbtn").style.display="block";
            document.getElementById("prevbtn").style.display="block";

            document.getElementById("projectlabel").style.color="black";
            document.getElementById("basiclabel").style.color="green";
        }
        function handler2()
        {
            document.getElementById("projectform").style.display="block";
            document.getElementById("basicform").style.display="none";

            document.getElementById("projectbtn").style.display="block";
            document.getElementById("basicbtn").style.display="none";
            document.getElementById("prevbtn").style.display="none";

            document.getElementById("projectlabel").style.color="green";
            document.getElementById("basiclabel").style.color="black";
        }
        function handler3()
        {
          document.getElementById("photolabel").style.color="green";
          document.getElementById("basiclabel").style.color="black";

          document.getElementById("photosform").style.display="block";
          document.getElementById("basicform").style.display="none";

          document.getElementById("basicbtn").style.display="none";
          document.getElementById("prevbtn").style.display="none";
          document.getElementById("photosbtn").style.display="block";
          document.getElementById("prevbtn1").style.display="block";
        }
        function handler4()
        {
          document.getElementById("photolabel").style.color="black";
          document.getElementById("basiclabel").style.color="green";

          document.getElementById("photosform").style.display="none";
          document.getElementById("basicform").style.display="block";

          document.getElementById("basicbtn").style.display="block";
          document.getElementById("prevbtn").style.display="block";
          document.getElementById("photosbtn").style.display="none";
          document.getElementById("prevbtn1").style.display="none";
        }
        function handler5()
        {
          document.getElementById("photolabel").style.color="black";
          document.getElementById("ownerlabel").style.color="green";

          document.getElementById("photosform").style.display="none";
          document.getElementById("ownerform").style.display="block";

          document.getElementById("photosbtn").style.display="none";
          document.getElementById("prevbtn1").style.display="none";
          document.getElementById("ownerbtn").style.display="block";
          document.getElementById("prevbtn2").style.display="block";
        
        }
        function handler6()
        {
          document.getElementById("photolabel").style.color="green";
          document.getElementById("ownerlabel").style.color="black";

          document.getElementById("photosform").style.display="block";
          document.getElementById("ownerform").style.display="none";

          document.getElementById("photosbtn").style.display="block";
          document.getElementById("prevbtn1").style.display="block";
          document.getElementById("ownerbtn").style.display="none";
          document.getElementById("prevbtn2").style.display="none";
        }


    /*-------------------------------------------------------------------form next and prev buttons display code end----------------------------------------------------- */

    /*-------------------------------------------------------------------modals get code for drop down list start----------------------------------------------------- */

        const[developer,setdeveloper]=useState({developer_name:"",description:"",address:"",street:"",country:"",state:"",
          city:"",zipcode:"",salutation:"",first_name:"",last_name:"",phone:"",email:"",alternative_phone:"",
          alternative_email:"",designation:"",pan_number:""})
        const add_developer=async(e)=>
          {
            e.preventDefault();
            try {
              const resp= await api.post('addproperty/adddeveloper',developer)
              if(resp.status===200)
              {
                  toast.success(resp.data.message,{ autoClose: 2000 })
                  
              }
            } catch (error) {
              toast.error(error.response.data.message,{ autoClose: 2000 })
            }
          }
        const[user,setuser]=useState([])
        const fetchdeveloper=async()=>
        {
          try {
            const resp=await api.get('addproperty/viewdeveloper')
            setuser(resp.data.developer)
          } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
          }
        }


        const[towers,settowers]=useState({tower_name:"",project:"",land_area:"",in_metric:"",total_units:"",total_floors:"",units_per_floor:"",
                                        rera_tower_id:"",professional_status:"",category:"",possession_date:"",completion_date:"",
                                        sub_category:"",size:"",total_selable_area:"",measurement1:"",carpet:"",measurement2:"",
                                        covered_area:"",measurement3:"",loading:""})
        const add_tower=async(e)=>
          {
            e.preventDefault();
            try {
              const resp= await api.post('addproperty/addtower',towers)
              if(resp.status===200)
              {
                  toast.success(resp.data.message,{ autoClose: 2000 })
                  
              }
            } catch (error) {
              toast.error(error.response.data.message,{ autoClose: 2000 })
            }
          }
        const[tower,settower]=useState([])
        const fetchtower=async()=>
        {
          try {
            const resp=await api.get('addproperty/viewtower')
            settower(resp.data.tower)
          } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
          }
        }

    const[projects,setprojects]=useState(
      {project_name:"",developer:"",joint_venture:"false",secondary_developer:"",description:"",
                                          project_id:"",team:[],sales:[],notify_emails:[],launched_on:"",expected_completion:"",
                                          possession:"",is_active:"Active",
                                          location_link:""})

                                          console.log(projects.joint_venture,"hii");


        const add_project=async(e)=>
          {
            e.preventDefault();
            try {
           
              const resp= await api.post('addproperty/addproject',projects)
              if(resp.status===200)
              {
                  toast.success(resp.data.message,{ autoClose: 2000 })
                  
              }
            } catch (error) {
              toast.error(error.response.data.message,{ autoClose: 2000 })
            }
          }
        const[project,setproject]=useState([])
        const fetchproject=async()=>
        {
          try {
            const resp=await api.get('addproperty/viewproject')
            setproject(resp.data.project)
          } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
          }
        }

        React.useEffect(()=>
        {fetchdeveloper()},[])
        React.useEffect(()=>
          {fetchtower()},[])
        React.useEffect(()=>
          {fetchproject()},[])
        
        const changeteam=(event)=>
        {
            setprojects({...projects,team:event.target.value})
        }
        const changesales=(event)=>
        {
          setprojects({...projects,sales:event.target.value})
        }
        const changeemail=(event)=>
        {
          setprojects({...projects,notify_emails:event.target.value})
        }

        /*-------------------------------------------------------------------modals get code for drop down list end----------------------------------------------------- */

        
        /*-------------------------------------------------------------------map latitude and langitude code start----------------------------------------------------- */
        const [coordinates, setCoordinates] = useState('');
        const handleSubmit = async (e) => {
        try {
          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: inventory.location,
              key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc'  // Replace with your API key
            }
          });

          if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            setCoordinates({ lat, lng });
            setinventory({...inventory,lattitude:lat,langitude:lng})
          } else {
            setCoordinates(null);
            console.log('No results found');
          }
          
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      }
      const mapStyles = {
        height: "300px",
        width: "100%"
      }
      const defaultCenter = {
        lat: coordinates.lat || 37.7749, lng: coordinates.lng || -122.4194
      };

    


      

                const[inventory,setinventory]=useState({developer:"",block_tower:"",project:"",unit_number:"",sub_category:"",size:"",
                  project1:"",facing:"",road:"",ownership:"",type:"",cluter_details:"",length:"",
                  breadth:"",total_area:"",in_metrics:"",occupation_date:"",age_of_construction:"",
                  furnish_details:"",furnished_item:"",aminities:"",location:"",lattitude:"",langitude:"",
                  s_no:[],preview:[],descriptions:[],category:[],action:[],s_no1:[],url:[],action1:[],search_contact:"",
                  relation:"",document_name:"",number:"",date:"",linkded_contact:""})
                  const config = {
                    headers: {
                      'Content-Type': 'application/json' // Set the Content-Type here
                    }
                }
              const add_inventory=async(e)=>
              {
                  e.preventDefault();
             
                    try {
                     
                            const resp= await api.post('inventorydetails',inventory)
                              if(resp.status===200)
                                  {
                                    toast.success(resp.data.message,{ autoClose: 2000 })
                                    setTimeout(() => {
                                      navigate('/inventorydetails')
                                    }, 2000);
                                    
                                   }
                          } catch (error) {
                                  toast.error(error.response.data.message,{ autoClose: 2000 })
                          }
                         }

    function addFn() {
        
      setinventory({
        ...inventory,
        s_no1: [...inventory.s_no1, ''],
        url: [...inventory.url, ''],
        action1: [...inventory.action1, '']
      });
    };
    const handleeducationChange = (index, event) => {
      const neweducation = [...inventory.s_no1];
      neweducation[index] = event.target.value;
      setinventory({
        ...inventory,
        s_no1: neweducation
      });
    };
    const handleurlChange = (index, event) => {
      const neweducation = [...inventory.url];
      neweducation[index] = event.target.value;
      setinventory({
        ...inventory,
        url: neweducation
      });
    };

    const handlesnochange = (index, event) => {
      const neweducation = [...inventory.s_no];
      neweducation[index] = event.target.value;
      setinventory({
        ...inventory,
        s_no: neweducation
      });
    };
    const handlepreviewchange = (index, event) => {
      const neweducation = [...inventory.preview];
      const files = Array.from(event.target.files);
      const previewUrls = files.map(file => URL.createObjectURL(file));
      neweducation[index] = {
        files: files,
        previewUrls: previewUrls
      };
      setinventory({
        ...inventory,
        preview: neweducation
      });
    };
    

    const handledescriptionchange = (index, event) => {
      const neweducation = [...inventory.descriptions];
      neweducation[index] = event.target.value;
      setinventory({
        ...inventory,
        descriptions: neweducation
      });
    };
    const handlecategorychange = (index, event) => {
      const neweducation = [...inventory.category];
      neweducation[index] = event.target.value;
      setinventory({
        ...inventory,
        category: neweducation
      });
    };


    function addFn1() {
        
      setinventory({
        ...inventory,
        s_no: [...inventory.s_no, ''],
        preview: [...inventory.preview, ''],
        descriptions: [...inventory.descriptions, ''],
        category: [...inventory.category, ''],
        action: [...inventory.action, '']
      });
    };

    const deleteall=(index)=>
    {
      // handleDeletesno(index)
      // handleDeletepreview(index)
      const newsno = inventory.s_no.filter((_, i) => i !== index);
      const newpreview = inventory.preview.filter((_, i) => i !== index);
      const newdescription = inventory.descriptions.filter((_, i) => i !== index);
      const newcategory = inventory.category.filter((_, i) => i !== index);
      const newaction = inventory.action.filter((_, i) => i !== index);
      setinventory({
        ...inventory,
        s_no: newsno,
        preview: newpreview,
        descriptions: newdescription,
        category: newcategory,
        action: newaction
      });
    }
    const deleteall1=(index)=>
      {
        // handleDeletesno(index)
        // handleDeletepreview(index)
        const newsno1 = inventory.s_no1.filter((_, i) => i !== index);
        const newurl = inventory.url.filter((_, i) => i !== index);
        const newaction1 = inventory.action1.filter((_, i) => i !== index);
        setinventory({
          ...inventory,
          s_no1: newsno1,
          url: newurl,
          action1: newaction1
        });
      }

    // const handleDeletesno = (index) => {
    //   const newsno = inventory.s_no.filter((_, i) => i !== index);
    //   setinventory({
    //     ...inventory,
    //     s_no: newsno
    //   });
    // };
    // const handleDeletepreview = (index) => {
    //   const newpreview = inventory.preview.filter((_, i) => i !== index);
    //   setinventory({
    //     ...inventory,
    //     preview: newpreview
    //   });
    // };
    // const handleDeletedescription = (index) => {
    //   const newdescription = inventory.descriptions.filter((_, i) => i !== index);
    //   setinventory({
    //     ...inventory,
    //     descriptions: newdescription
    //   });
    // };
    // const handleDeletecategory = (index) => {
    //   const newcategory = inventory.category.filter((_, i) => i !== index);
    //   setinventory({
    //     ...inventory,
    //     category: newcategory
    //   });
    // };
    // const handleDeletesno1 = (index) => {
    //   const newsno1 = inventory.s_no1.filter((_, i) => i !== index);
    //   setinventory({
    //     ...inventory,
    //     s_no1: newsno1
    //   });
    // };
    // const handleDeleteurl = (index) => {
    //   const newurl = inventory.url.filter((_, i) => i !== index);
    //   setinventory({
    //     ...inventory,
    //     url: newurl
    //   });
    // };
      /*-------------------------------------------------------------------map latitude and langitude code end----------------------------------------------------- */

        return ( 
            <div>
                <Header1/>
                <Sidebar1/>
                <div style={{padding:"50px"}}>
                <div className="container rounded bg-white mt-5 mb-12" style={{width:"95%",marginLeft:"80px"}}>
                <div className="row" style={{marginTop:"50px"}}>
            <div className="col-12 border-right border-left">
                <div className="p-3">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Add Property/Inventory</h4>
                    </div><hr></hr><br></br>
                    <div className="row mt-2" style={{border:"1px solid gray",padding:"5px"}}>
                    <div className="col-md-3" id="projectlabel"><label className="labels"style={{fontWeight:"bolder"}}>Project/Location Details</label></div>
                    <div className="col-md-3" id="basiclabel"><label className="labels" style={{fontWeight:"bolder"}}>Basic Details</label></div>
                    <div className="col-md-3" id="photolabel"><label className="labels" style={{fontWeight:"bolder"}}>Photos</label></div>
                    <div className="col-md-3" id="ownerlabel"><label className="labels" style={{fontWeight:"bolder"}}>Owner Details</label></div>
                    </div><br></br>
    {/*-------------------------------------------------------------------project form----------------------------------------------------- */}
                    <div id="projectform" style={{border:"1px solid gray",padding:"5px"}}>
                    <div className="row mt-2">
                    <div className="col-md-5"><label className="labels">Developer</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,developer:e.target.value})} >
                        <option>Select</option>
                            {
                              user.map(item=>
                              (
                                <option>{item.developer_name}</option>
                              )
                              )
                            }
                            </select>
                        </div>
                            <div className="col-md-1"  style={{marginTop:"30px"}}><button className="form-control" onClick={handleShow1}>+</button></div>
                            <div className="col-md-5"><label className="labels">Block/Tower</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,block_tower:e.target.value})}>
                        <option>Select</option>
                          {
                            tower.map(item=>
                              (
                                  <option>{item.tower_name}</option>
                              )
                            )
                          }
                            </select>
                            </div>
                            <div className="col-md-1"  style={{marginTop:"30px"}}><button className="form-control" onClick={handleShow2}>+</button></div>
                            <div className="col-md-5"><label className="labels">Project</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,project:e.target.value})}>
                        <option>Select</option>
                        {
                            project.map(item=>
                            (
                              <option>{item.project_name}</option>
                            )
                            )
                          }
                            </select>
                            </div>
                            <div className="col-md-1" style={{marginTop:"30px"}}><button className="form-control" onClick={handleShow3}>+</button></div>
                    </div>
                        </div>
                        <div className="row mt-4">
                        <div className="col-md-2" id="projectbtn" onClick={handler} style={{marginLeft:"82%",marginBottom:"-50px"}}><button className="form-control">Next</button></div>
                        </div>
                        </div>
    {/*-----------------------------------------------------------------basic/unit form----------------------------------------------------- */}

                    <div id="basicform" style={{border:"1px solid gray",padding:"5px",marginTop:"-50px"}}>
                    <div className="row mt-2">
                            <div className="col-md-3"><label className="labels">Unit number</label><input type="text" className="form-control" required="true" onChange={(e)=>setinventory({...inventory,unit_number:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Sub Category</label><input type="text" className="form-control" required="true" onChange={(e)=>setinventory({...inventory,sub_category:e.target.value})}/></div>
                            <div className="col-md-6"></div>
                          
                            <div className="col-md-3"><label className="labels">Size</label><input type="text"className="form-control" required="true" onChange={(e)=>setinventory({...inventory,size:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Project</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,project1:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>

                        <div className="col-md-3"><label className="labels">Facing</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,facing:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Road</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,road:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                      

                        <div className="col-md-6"></div>
                        <div className="col-md-3"><label className="labels">Ownership</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,ownership:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-5" style={{position:"absolute",border:"1px solid black",height:"500px",marginLeft:"55%"}}>
                          <div style={{border:"1px solid black",height:"300px",marginTop:"10px"}}>
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
                            />
                            </GoogleMap>
                            </LoadScript>
                          </div>
                          <div style={{height:"200px"}}>
                            <div className="row" style={{marginTop:"15%"}}>
                          
                          <div className="col-md-6"><label className="labels">Lattitude</label><input type="number"className="form-control" required="true" value={coordinates.lat} readOnly/></div>
                          <div className="col-md-6"><label className="labels">Langitude</label><input type="number"className="form-control" required="true" value={coordinates.lng} readOnly/></div>
                          
                          </div>
                          </div>
                        </div>

                        <div className="col-md-12"><label className="labels" style={{fontWeight:"bold"}}>Builtup Details</label></div>

                        <div className="col-md-3"><label className="labels">Type</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,type:e.target.value})}>
                            <option>Duplex</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Cluter Details/Floor Plans</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,cluter_details:e.target.value})}>
                            <option>select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>

                            <div className="col-md-1"><label className="labels">Length</label><input type="number"className="form-control" required="true" onChange={(e)=>setinventory({...inventory,length:e.target.value})}/></div>
                            <div className="col-md-1"><label className="labels">Breadth</label><input type="number"className="form-control" required="true" onChange={(e)=>setinventory({...inventory,breadth:e.target.value})}/></div>
                            <div className="col-md-2"><label className="labels">Total Area</label><input type="number"className="form-control" required="true" onChange={(e)=>setinventory({...inventory,total_area:e.target.value})}/></div>
                            <div className="col-md-2"><label className="labels">In Metrics</label><input type="text"className="form-control" required="true" onChange={(e)=>setinventory({...inventory,in_metrics:e.target.value})}/></div>
                            <div className="col-md-4" style={{marginLeft:"6%",marginTop:"-7%"}}><label className="labels">Location</label><input  type="text" className="form-control" required="true" placeholder="Enter location" onChange={(e)=>setinventory({...inventory,location:e.target.value})}/></div>
                            <div className="col-md-1" style={{marginTop:"-4.8%"}}><button className="form-control" required="true" onClick={handleSubmit}>Get</button></div>
                            

                            <div className="col-md-3"><label className="labels">Occupation Date</label><input type="text"className="form-control" required="true" onChange={(e)=>setinventory({...inventory,occupation_date:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Age of Construction</label><input type="text"className="form-control" required="true" onChange={(e)=>setinventory({...inventory,age_of_construction:e.target.value})}/></div>
                            <div className="col-md-6"></div>
                            <div className="col-md-3"><label className="labels">Furnish Details</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,furnish_details:e.target.value})}>
                            <option>select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Furnished Items</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,furnished_item:e.target.value})}>
                            <option>select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>

                        <div className="col-md-6"><label className="labels">Aminities</label><select className="form-control" required="true" onChange={(e)=>setinventory({...inventory,aminities:e.target.value})}>
                            <option>select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>
                            
                        </div>
                      </div>
                    <div className="row mt-4">
                        <div className="col-md-2" onClick={handler3} style={{marginLeft:"82%",marginBottom:"40px"}}><button className="form-control" id="basicbtn">Next</button></div>
                        <div className="col-md-2" onClick={handler2} style={{marginLeft:"-90%"}}><button className="form-control" id="prevbtn">Prev</button></div>
                    </div>
                    </div>
                  </div>

    {/*-----------------------------------------------------------------photos/videos form----------------------------------------------------------------- */}             
              
                  <div id="photosform" style={{border:"1px solid gray",padding:"5px",marginTop:"-50px",display:"none"}}>
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
                          {inventory.s_no.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        
                                        onChange={(event) => handlesnochange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {inventory.preview.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="file"
                                        className="form-control"
                                        multiple
                                        onChange={(event) => handlepreviewchange(index, event)}
                                      />
                                        {name.previewUrls && name.previewUrls.map((url, idx) => (
          <img key={idx} src={url} alt={`preview ${index}-${idx}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ))}
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {inventory.descriptions.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                      
                                        onChange={(event) => handledescriptionchange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {inventory.category.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <select className="form-control" required="true" onChange={(event) => handlecategorychange(index, event)}>
                                          <option>select</option>
                                          <option>Mr.</option>
                                          <option>Mrs.</option>
                                          <option>Smt.</option>
                                          <option>Dr.</option>
                                          <option>Er.</option>
                                          <option>Sh.</option>
                                          <option>col</option>
                                          </select>
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {inventory.action.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                    
                                      <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                    </div>
                                  ))}
                          </td>

                          </tr>
                        </tbody>
                  </table>
                      </div>
                      <div className="row mt-4">
                      <div className="col-md-2" style={{marginLeft:"80%"}} onClick={addFn1}><button className="form-control">Add Link Url</button></div>
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
                          {inventory.s_no1.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => handleeducationChange(index, event)}
                                      />
                                  
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {inventory.url.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => handleurlChange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                                  
                          </td>
                          <td>
                          {inventory.action1.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                    
                                      <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                    </div>
                                  ))}
                          </td>
                          </tr>
                        </tbody>
                  </table>
                  </div>
                    <div className="row mt-4">
                    <div className="col-md-2" style={{marginLeft:"80%"}} onClick={addFn}><button className="form-control">Add Video Link</button></div>
                    </div>
                  </div>
                  <div className="row mt-4">
                        <div className="col-md-2" onClick={handler5} style={{marginLeft:"82%",marginBottom:"40px",display:"none"}} id="photosbtn"><button className="form-control" >Next</button></div>
                        <div className="col-md-2" onClick={handler4} style={{marginLeft:"-90%",display:"none"}} id="prevbtn1"><button className="form-control" >Prev</button></div>
                    </div>  

    {/*-----------------------------------------------------------------owner details form----------------------------------------------------------------- */}             
                    <div id="ownerform" style={{padding:"5px",marginTop:"-130px",display:"none"}}>
                    <div className="row mt-2" style={{borderBottom:"1px solid gray",padding:"5px"}}>
                    <div className="col-5" style={{marginLeft:"20px",padding:"10px"}}>
                    <div className="row">
                            <div className="col-md-5"><label className="labels">Search Contact</label><i class="dw dw-search2 search-icon" style={{position:"absolute",marginTop:"45px",marginLeft:"70px"}}></i><input type="text" class="form-control search-input" placeholder="Search Here" onChange={(e)=>setinventory({...inventory,search_contact:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Relation</label><input type="text" className="form-control" required="true" onChange={(e)=>setinventory({...inventory,relation:e.target.value})}/></div>
                            <div className="col-md-4" style={{marginTop:"30px"}}><button className="form-control" >Add Contact </button></div>
                    </div>
                    </div>
                    <div className="col-6">
                    <div className="row" style={{border:"1px solid black",padding:"10px",height:"400px"}}>
                            <div className="col-md-4"><label className="labels">Document Name</label><input type="text" className="form-control" required="true" onChange={(e)=>setinventory({...inventory,document_name:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">Number</label><input type="text" className="form-control" required="true" onChange={(e)=>setinventory({...inventory,number:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">Date</label><input type="date" className="form-control" required="true" onChange={(e)=>setinventory({...inventory,date:e.target.value})}/></div>
                            <div className="col-md-6"style={{marginTop:"-150px"}}><label className="labels">Linked Contact</label><input type="text" className="form-control" required="true" onChange={(e)=>setinventory({...inventory,linkded_contact:e.target.value})}/></div>
                            <div className="col-md-4" style={{marginTop:"-120px"}}><button className="form-control" >Add Contact </button></div>
                    </div>
                    <ToastContainer/>
                    </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-2"  style={{marginLeft:"82%",marginBottom:"40px",display:"none"}} id="ownerbtn"><button className="form-control" onClick={add_inventory}>Save</button></div>
                        <div className="col-md-2" onClick={handler6} style={{marginLeft:"-90%",display:"none"}} id="prevbtn2"><button className="form-control" >Prev</button></div>
                    </div>  
          </div>
            </div>
        </div>

        
        
      
                    
                  
    {/*----------------------------------------------------------add developer model(show1)---------------------------------------------------------- */}
        <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Developer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{border:"1px solid gray",padding:"10px"}}>
            <div className="row mt-2" >
            <div className="col-md-6"><label className="labels">Developer Name</label><input type="text" className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,developer_name:e.target.value})}/></div>
                            <div className="col-md-6"></div>

                            <div className="col-md-10"><label className="labels">Description</label><textarea type="text"className="form-control" required="true" style={{height:"100px"}} onChange={(e)=>setdeveloper({...developer,description:e.target.value})}/></div><hr></hr>
                            <div className="col-md-12"><hr></hr></div>

                            <div className="col-md-10"><label className="labels">Address</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,address:e.target.value})}/></div>

                            <div className="col-md-6"><label className="labels">Street</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,street:e.target.value})}/></div>
                            <div className="col-md-6"><label className="labels">Country</label><select className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,country:e.target.value})}>
                        <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                            </div>

                            <div className="col-md-4"><label className="labels">State</label><select className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,state:e.target.value})}>
                        <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                            </div>
                            <div className="col-md-4"><label className="labels">City</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,city:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">Zip Code</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,zipcode:e.target.value})}/></div>
                            <div className="col-md-12"><hr></hr></div>

                            <div className="col-md-3"><label className="labels">Salutation</label><select className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,salutation:e.target.value})}>
                        <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                            </div>
                            <div className="col-md-4"><label className="labels">First Name</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,first_name:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">Last Name</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,last_name:e.target.value})}/></div>

                            <div className="col-md-5"><label className="labels">Phone</label><input type="number"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,phone:e.target.value})}/></div>
                            <div className="col-md-5"><label className="labels">Email</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,email:e.target.value})}/></div>

                            <div className="col-md-5"><label className="labels">Alternative Phone</label><input type="number"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,alternative_phone:e.target.value})}/></div>
                            <div className="col-md-5"><label className="labels">Alternative Email</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,alternative_email:e.target.value})}/></div>

                            <div className="col-md-5"><label className="labels">Designation</label><input type="number"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,designation:e.target.value})}/></div>
                            <div className="col-md-5"><label className="labels">Pan Number</label><input type="text"className="form-control" required="true" onChange={(e)=>setdeveloper({...developer,pan_number:e.target.value})}/></div>
                        </div>
                        <div className="row mt-4">
                        <div className="col-md-2" style={{marginLeft:"82%"}}><button className="form-control" onClick={add_developer}>Save</button></div>
                        </div>
                        </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
            <ToastContainer/>
          </Modal>
    {/*-------------------------------------------------------------------add block/tower(show2)----------------------------------------------------- */}
          <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Block/Tower</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{border:"1px solid gray",padding:"10px"}}>
            <div className="row mt-2" >
                        <div className="col-md-6"><label className="labels">Tower Name</label><input type="text" className="form-control" required="true" onChange={(e)=>settowers({...towers,tower_name:e.target.value})}/></div>
                        <div className="col-md-6"><label className="labels">Project</label><select className="form-control" required="true" onChange={(e)=>settowers({...towers,project:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                            
                        <div className="col-md-3"><label className="labels">TOTAL LAND AREA</label><input type="text" className="form-control" required="true"  onChange={(e)=>settowers({...towers,land_area:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels">In Metric</label><input type="text" className="form-control" required="true" onChange={(e)=>settowers({...towers,in_metric:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels">TOTAL UNIT/PLOT</label><input type="text" className="form-control" required="true"  onChange={(e)=>settowers({...towers,total_units:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels">TOTAL FLOORS</label><input type="text" className="form-control" required="true" onChange={(e)=>settowers({...towers,total_floors:e.target.value})}/></div>

                        <div className="col-md-3"></div>
                        <div className="col-md-3"></div>
                        <div className="col-md-3"></div>
                        <div className="col-md-3" ><label className="labels">Units per Floor</label><input type="text" className="form-control" required="true"onChange={(e)=>settowers({...towers,units_per_floor:e.target.value})}/></div>

                        <div className="col-md-6" ><label className="labels">RERA TOWER ID</label><input type="text" className="form-control" required="true"onChange={(e)=>settowers({...towers,rera_tower_id:e.target.value})}/></div>
                        <div className="col-md-6"></div>

                        <div className="col-md-6" ><label className="labels">PROFESSIONAL STATUS</label><input type="text" className="form-control" required="true"onChange={(e)=>settowers({...towers,professional_status:e.target.value})}/></div>
                        <div className="col-md-6" ><label className="labels">CATEGORY</label><input type="text" className="form-control" required="true" onChange={(e)=>settowers({...towers,category:e.target.value})}/></div>

                        <div className="col-md-6" ><label className="labels">POSSESSION DATE</label><input type="date" className="form-control" required="true" onChange={(e)=>settowers({...towers,possession_date:e.target.value})}/></div>
                        <div className="col-md-6" ><label className="labels">COMPLETION DATE</label><input type="date"   className="form-control" required="true" onChange={(e)=>settowers({...towers,completion_date:e.target.value})}/></div>

                        <div className="col-md-10"><label className="labels"style={{fontWeight:"bolder"}}>Area</label></div><hr></hr>
                        <div className="col-md-12"><hr></hr></div>

                        <div className="col-md-4" ><label className="labels">SUB CATEGORY</label><input type="text" className="form-control" required="true" onChange={(e)=>settowers({...towers,sub_category:e.target.value})}/></div>
                        <div className="col-md-4" ><label className="labels">SIZE</label><input type="text" className="form-control" required="true"onChange={(e)=>settowers({...towers,size:e.target.value})}/></div>
                        <div className="col-md-4" ></div>

                        <div className="col-md-3" ><label className="labels">TOTAL/SELABLE AREA</label><input type="text" className="form-control" required="true"  onChange={(e)=>settowers({...towers,total_selable_area:e.target.value})}/></div>
                        <div className="col-md-1" style={{marginLeft:"-63px"}}><label className="labels" style={{color:"transparent"}}>m1</label><select className="form-control" required="true" onChange={(e)=>settowers({...towers,measurement1:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3" ><label className="labels">CARPET</label><input type="text" className="form-control" required="true" onChange={(e)=>settowers({...towers,carpet:e.target.value})}/></div>
                        <div className="col-md-1" style={{marginLeft:"-63px"}}><label className="labels" style={{color:"transparent"}}>m2</label><select className="form-control" required="true" onChange={(e)=>settowers({...towers,measurement2:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3" ><label className="labels">COVERED AREA</label><input type="text" className="form-control" required="true"onChange={(e)=>settowers({...towers,covered_area:e.target.value})}/></div>
                        <div className="col-md-1" style={{marginLeft:"-63px"}}><label className="labels" style={{color:"transparent"}}>m3</label><select className="form-control" required="true" onChange={(e)=>settowers({...towers,measurement3:e.target.value})}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-2" ><label className="labels">LOADING</label><input type="text" className="form-control" required="true" placeholder="%" style={{paddingLeft:"70%"}}onChange={(e)=>settowers({...towers,loading:e.target.value})}/></div>
                        
                        </div>
                        <div className="row mt-4">
                        <div className="col-md-2" style={{marginLeft:"82%"}}><button className="form-control" onClick={add_tower}>Save</button></div>
                        </div>
                        </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
            <ToastContainer/>
          </Modal>
    {/*-------------------------------------------------------------------------add project show(3)----------------------------------------------------- */}
          <Modal show={show3} onHide={handleClose3} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{border:"1px solid gray",padding:"10px"}}>
            <div className="row mt-2" >
            <div className="col-md-6"><label className="labels">Project Name</label><input type="text" className="form-control" required="true"onChange={(e)=>setprojects({...projects,project_name:e.target.value})}/></div>
                            <div className="col-md-6"></div>

                            <div className="col-md-6"><label className="labels">Developer</label><select className="form-control" required="true"onChange={(e)=>setprojects({...projects,developer:e.target.value})} >
                        <option>Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                            </div>
                            <div className="col-md-6"></div>

                            <div className="col-md-6"><input type='checkbox' onChange={(e)=>setprojects({...projects,joint_venture:e.target.value})}/><label style={{margin:"10px"}}>Is this a Joint Venture?</label></div>
                            <div className="col-md-6"></div>

                            <div className="col-md-10"><label className="labels">SECONDARY DEVELOPER</label><input type="text"className="form-control" required="true" onChange={(e)=>setprojects({...projects,secondary_developer:e.target.value})}/></div>

                            <div className="col-md-10"><label className="labels">Description</label><textarea type="text"className="form-control" required="true" style={{height:"100px"}}onChange={(e)=>setprojects({...projects,description:e.target.value})}/></div><hr></hr>

                            <div className="col-md-6"><label className="labels">Project Id</label><input type="text"className="form-control" required="true" onChange={(e)=>setprojects({...projects,project_id:e.target.value})}/></div>
                            <div className="col-md-6"></div>

                            <div className="col-md-10"><label className="labels">Team</label>
                            <Select className="form-control"  multiple value={team}  onChange={(event) => {handleChange2(event);changeteam(event);}} renderValue={(selected) => selected.join(', ')}>
                                {teams.map((name) => (
                                    <MenuItem key={name} value={name}  >
                                    <Checkbox checked={team.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                    ))}
                            </Select>
                            </div>
                            <div className="col-md-2"></div>

                            <div className="col-md-10"><label className="labels">Sales</label>
                            <Select className="form-control"  multiple value={sale} onChange={(event) => {handleChange1(event);changesales(event);}} renderValue={(selected) => selected.join(', ')}>
                                {sales.map((name) => (
                                    <MenuItem key={name} value={name}  >
                                    <Checkbox checked={sale.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                    ))}
                            </Select>
                            </div>
                            <div className="col-md-2"></div>

                            <div className="col-md-10"><label  className="labels">Notify to emails</label>
                            <Select className="form-control"  multiple value={email} onChange={(event) => {handleChange(event);changeemail(event);}} renderValue={(selected) => selected.join(', ')}>
                                {emails.map((name) => (
                                    <MenuItem key={name} value={name}  >
                                    <Checkbox checked={email.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                    ))}
                            </Select>
                            </div>
                            <div className="col-md-2"></div>

                            <div className="col-md-4"><label className="labels">LAUNCHED ON</label><input type="date"className="form-control" required="true" onChange={(e)=>setprojects({...projects,launched_on:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">EXPECTED COMPLETION</label><input type="date"className="form-control" required="true" onChange={(e)=>setprojects({...projects,expected_completion:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">POSSESSION</label><input type="date"className="form-control" required="true" onChange={(e)=>setprojects({...projects,possession:e.target.value})}/></div>

                            <div className="col-md-12"><label className="labels">IS ACTIVE</label><br></br>
                            <input type="radio" name="is_active" value="Active"   required="true" onChange={(e)=>setprojects({...projects,is_active:e.target.value})} /><span  style={{marginLeft:"10px"}}>Active</span>
                            <input type="radio" name="is_active" value="Inactive" style={{marginLeft:"10px"}} required="true" onChange={(e)=>setprojects({...projects,is_active:e.target.value})}/><span  style={{marginLeft:"10px"}}>Inactive</span>
                            </div>
                            <div className="col-md-12"><hr></hr></div>

                            <div className="col-md-12"><label className="labels">Location Link</label><input type="text"className="form-control" required="true"onChange={(e)=>setprojects({...projects,location_link:e.target.value})} /></div>
                        </div>
                        <div className="row mt-4">
                        <div className="col-md-2" style={{marginLeft:"82%"}}><button className="form-control" onClick={add_project}>Save</button></div>
                        </div>
                        </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose3}>
                Close
              </Button>
            </Modal.Footer>
            <ToastContainer/>
          </Modal>
            </div>
        );
        }
    export default Addinventory;