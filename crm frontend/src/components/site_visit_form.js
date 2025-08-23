import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Site_visit() {
    const activity=["Call","Mail","Meeting","Site Visit"]
    const project=["Aerocity  Mohali","Sector 4 Panchkula"]
    const visittype=["Site Visit","Home Visit","Online"]
    const status=["Conducted","Do Not Visit","Not Intersted"]
    const result=["Deal Done","Negotiation Uncomplete","Deal Not Done","Site Visit"]

    const [sitevisit,setsitevisit]=useState({activity_type:"",executive:"",project:"",sitevisit_type:"",inventory:"",lead:"",
                                            confirmation:"",remarks:"",participants:"",remind_me:"",complete:"",start_date:"",end_date:""})

        const sitevisitdetails=async(e)=>
        {
                    e.preventDefault();
                    try {
                        const resp=await axios.post('http://localhost:5000/sitevisit',sitevisit)
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

        const [show1, setshow1] = useState(false);
    
        const handleClose1 = () => setshow1(false);
        const handleShow1=()=>
        {
          setshow1(true);
         
        }
        const handleToggle = (e) => {
            const isChecked = e.target.checked; // Get the checked state
            setsitevisit({ ...sitevisit, complete: isChecked }); // Update the calltask state
        
            // Open the modal only if the checkbox is checked
            if (isChecked) {
                handleShow1(); // Open the modal
            }
        };
        const[isreminder,setisreminder]=useState(false)
        const reminder=(e)=>
        {
            const ischecked=e.target.checked
            setsitevisit({...sitevisit,remind_me:ischecked})
           
                setisreminder(ischecked)
        }

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"70%",marginLeft:"200px"}}>
            <div className="row" style={{marginTop:"50px"}}>
        <div className="col-12">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Create Task </h4>
                    <div className="col-md-4"><p><u>Site visit Form</u></p></div>
                </div><hr></hr>

               
                
                <hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Activity Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,activity_type:e.target.value})}>
                    <option>Select </option>
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
                        
                        <div className="col-md-12"><label className="labels">Title</label><p>Site Visit with Anil Gupta For 722_Aero
                        City on September 4,2023 ati5:32 AM</p></div>

                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})}>
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Project</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,project:e.target.value})}>
                    <option>Select </option>
                       {
                        project.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-4"></div>
                    
                        <div className="col-md-4"><label className="labels">Select Site Visit Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,sitevisit_type:e.target.value})}>
                    <option>Select </option>
                       {
                        visittype.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Inventory</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,inventory:e.target.value})}>
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                         
                        <div className="col-md-4"><label className="labels">Select Lead</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,lead:e.target.value})}>
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
                    <option>Select </option>
                       <option>Confirmed</option>
                       <option>Tentative</option>
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remarks:e.target.value})}/></div>
                </div>
                <div className="row mt-3">
                        <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
                    <option>Select</option>
                       
                        </select>
                        </div>
                    <div className="col-md-8"></div>

                    <div className="col-md-6"><label className="labels">Remind me?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={reminder}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-6"><label className="labels">Mark As Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-4"><label className="labels">Select Start Date</label><input type="date" className="form-control form-control-sm" disabled={!isreminder} onChange={(e)=>setsitevisit({...sitevisit,start_date:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Select End Date</label><input type="date" className="form-control form-control-sm" disabled={!isreminder} onChange={(e)=>setsitevisit({...sitevisit,end_date:e.target.value})}/></div>
                    </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" onClick={sitevisitdetails}>Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div>
                    </div>
                   
                    <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>

       
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Site Visit</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" >
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
                        <div className="col-md-4"><label className="labels">Select Intersted Inventory</label><select className="form-control form-control-sm" required="true" >
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
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" /></div>
                <div className="col-md-8"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-12"><br></br></div>
                   <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     </div>
                    {/* <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control">Cancel</button></div>
                    </div> */}
                    </div>
     
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" >
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
                    </div>
                    </div>
        </div>
        </div>
        </div>
        <ToastContainer/>
        </div>
     );
}

export default Site_visit;