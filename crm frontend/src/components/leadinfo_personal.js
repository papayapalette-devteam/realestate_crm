import { useState } from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Leadinfo_personal() {
    const navigate=useNavigate()

    const [leadinfopersonal,setleadinfopersonal]=useState({gender:"",maritial_status:"",birth_date:"",anniversary_date:"",father_husband_name:"",h_no:"",
        street_address:"",location:"",city:"",pincode:"",state:"",country:"",website:"",industry:"",education:"",
        degree:"",college:"",loan:"",bank:"",amount:"",social_media:"",url:"",income:"",amount1:"",document:"",number:"",file:""})

        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }

        const leadinfopersonaldetails=async(e)=>
            {
                e.preventDefault();
                try {
                    const resp=await axios.post('http://localhost:5000/leadinfopersonal',leadinfopersonal,config)
                    if(resp.status===200)
                    {
                        toast.success(resp.data.message)
                        setTimeout(() => {
                            navigate('/lead')
                        }, 2000);
                    }
                } catch (error) {
                    
                    console.log(error);
                }
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
                    <h4 className="text-right">Add Lead</h4>
                </div><hr></hr>
                <div className="d-flex justify-content-between align-items-center experience"><span>Personal Info</span></div><hr></hr>
                <div className="row mt-2" id="leadinfopersonal1">
                    
                    <div className="col-md-3"><label className="labels">Gender</label><select className="form-control" required="true" onChange={(e)=>setleadinfopersonal({...leadinfopersonal,gender:e.target.value})} >
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                        </div>
                        <div className="col-md-3" style={{marginLeft:"25%"}}><label className="labels">Maritial Status</label><select className="form-control" required="true"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,maritial_status:e.target.value})}>
                    <option>Select</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                        </select>
                        </div>
                </div>
                <div className="row mt-3" id="leadinfopersonal2">
                    <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" required="true" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,birth_date:e.target.value})}/></div>
                    <div className="col-md-5"><label className="labels">Anniversary Date</label><input type="text" required="true" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,anniversary_date:e.target.value})}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    
                    <div className="col-md-6"><label className="labels">Father/husband name</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,father_husband_name:e.target.value})}/></div>
                    <div className="col-md-6"></div>
                    
                    <div className="col-md-3"><label className="labels">H.No.</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,h_no:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Street Address</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,street_address:e.target.value})}/></div>
                    <div className="col-md-3"></div>
                    
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,location:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pincode</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,pincode:e.target.value})}/></div>
                   
                    <div className="col-md-4"><label className="labels">State</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,state:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Country</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,country:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-6"><label className="labels">Website</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,website:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Industry</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,industry:e.target.value})}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}></label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-4"><label className="labels">Education</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,education:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Degree</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,degree:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">College</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,college:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Loan</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,loan:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Bank</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,bank:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Amount</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,amount:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Social Media</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,social_media:e.target.value})}/></div>
                    <div className="col-md-8"><label className="labels">URL</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,url:e.target.value})}/></div>
                    
                    <div className="col-md-4"><label className="labels">Income</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,income:e.target.value})}/></div>
                    <div className="col-md-8"><label className="labels">Amount</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,amount1:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Document</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,document:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Number</label><input type="text" className="form-control"  onChange={(e)=>setleadinfopersonal({...leadinfopersonal,number:e.target.value})}/></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"none"}}>.</label><input type="file" id="file-upload" className="form-control" name="file" style={{display:"none"}} onChange={(e)=>setleadinfopersonal({...leadinfopersonal,file:e.target.files[0]})}/>
                    <label for="file-upload" className="form-control" style={{backgroundColor:"lightblue",cursor:"pointer",textAlign:"center"}}> 
                     Upload
                    </label>
                    </div>

                   
                   </div> 
                    <div className="row mt-4" style={{marginLeft:"25%"}}>
                    <div className="col-md-3"><button className="form-control" onClick={leadinfopersonaldetails}>Save</button></div>
                    <div className="col-md-3"><button className="form-control">Cancel</button></div>
                    <div className="col-md-6"><button className="form-control">Save & View Contact</button></div>
                    </div>
                    <ToastContainer/>
                    </div>
                    </div>
                    </div>
        </div>
        </div>
        </div>
     );
}

export default Leadinfo_personal;