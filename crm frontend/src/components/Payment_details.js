import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import { useState } from "react";

function Payment_details() {

    const [payment,setpayment]=useState({date:"",account_name_to:"",recieved_from:"",payment_mode:"",cheque_number:"",cheque_bank_name:"",
                                        cheque_date:"",in_favour_of:"",amount:"",tds:"",tds_amount:"",tax_type:"",discount_type:"",
                                        sgst:"",sgst_value:"",cgst:"",cgst_value:"",discount:"",payment_for:"",narration:"",image:[]});

                                        const config = {
                                            headers: {
                                              'Content-Type': 'multipart/form-data' // Set the Content-Type here
                                            }
                                        }

                const paymentdetails=async(e)=>
                {
                    e.preventDefault();
                        try {
                            const resp= await axios.post('http://localhost:5000/paymentdetails',payment,config)
                        if(resp.status===200)
                        {
                            toast.success(resp.data.message,{autoClose:2000})

                        }


                } 
                catch (error) {
                    toast.error(error.response.data.message)
                    }
             }

    const handler1=()=>
    {
        document.getElementById("date1").style.color="black";
       
    }
    const handler2=()=>
        {
            
            document.getElementById("date2").style.color="black";
        }
    
        const handleimagechange = (e) => {
            const files = Array.from(e.target.files); // Get selected files
            setpayment((prevDocs) => ({
              ...prevDocs,
              image: files, // Update pics in state
            }));
          };
    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"70%",marginLeft:"200px"}}>
            <div className="row" style={{marginTop:"50px"}}>
        <div className="col-12 border-right border-left">
            <div className="p-3 py-5">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Payment Details</h4>
                </div><hr></hr>
                <div className="row mt-2">
                <div className="col-md-4"><label className="labels">Date</label><input type="date" id="date1" className="form-control form-control-sm" style={{color:"white"}} onClick={handler1} onChange={(e)=>setpayment({...payment,date:e.target.value})}/></div>
                        <div className="col-md-4"><label className="labels">Account Name(To)</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setpayment({...payment,account_name_to:e.target.value})}>
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
                        <div className="col-md-4"><label className="labels">Recieved From</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setpayment({...payment,recieved_from:e.target.value})}>
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

                        <div className="col-md-4"><label className="labels">Payment Mode</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setpayment({...payment,payment_mode:e.target.value})}>
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
                        <div className="col-md-8"></div>
                </div>

                <div className="row mt-2" style={{border:"1px solid gray",padding:"5px"}}>
                        <div className="col-md-4"><label className="labels">Cheque Number</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setpayment({...payment,cheque_number:e.target.value})}/></div>
                        <div className="col-md-4"><label className="labels">Cheque Bank Name</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setpayment({...payment,cheque_bank_name:e.target.value})}/></div>
                        <div className="col-md-4"><label className="labels">Cheque Date</label><input type="date" id="date2"className="form-control form-control-sm" style={{color:"white"}} onClick={handler2} onChange={(e)=>setpayment({...payment,cheque_date:e.target.value})}/></div>
                        <div className="col-md-10"><label className="labels">In Favour Of</label><input className='form-control form-control-sm'  onChange={(e)=>setpayment({...payment,in_favour_of:e.target.value})}/></div>
                </div>

                
                <div className="row mt-3">
                    <div className="col-md-4"><label className="labels">Amount</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setpayment({...payment,amount:e.target.value})}  /></div>
                    <div className="col-md-4"><label className="labels">TDS(%)</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setpayment({...payment,tds:e.target.value})} /></div>
                    <div className="col-md-4"><label className="labels">TDS Amount</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setpayment({...payment,tds_amount:e.target.value})}/></div>
                    
                    <div className="col-md-4"><label className="labels">Tax Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setpayment({...payment,tax_type:e.target.value})}>
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
                        <div className="col-md-4"  style={{marginLeft:"33%"}}><label className="labels">Discount Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setpayment({...payment,discount_type:e.target.value})}>
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
                    <div className="row mt-2" style={{border:"1px solid gray",padding:"5px",margin:"2px"}}>
                        <div className="col-md-2"><label className="labels">SGST(%)</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setpayment({...payment,sgst:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">SGST Value</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setpayment({...payment,sgst_value:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">CGST(%)</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setpayment({...payment,cgst:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">CGST Value</label><input className='form-control form-control-sm' onChange={(e)=>setpayment({...payment,cgst_value:e.target.value})}/></div>
                        <div className="col-md-4" style={{border:"1px solid gray",padding:"5px"}}><label className="labels">Discount %</label><input className='form-control form-control-sm' onChange={(e)=>setpayment({...payment,discount:e.target.value})}/></div>
                </div>

                <div className="col-md-4"><label className="labels">Payment For</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setpayment({...payment,payment_for:e.target.value})}>
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
                        <div className="col-md-8"></div>
                        <div className="col-md-10"><label className="labels">Narration</label><textarea className='form-control form-control-sm' style={{height:"70px"}}placeholder="Narration" onChange={(e)=>setpayment({...payment,narration:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels">Attach Images</label><input type="file" id="file-upload" className="form-control form-control-sm" style={{display:"none"}} onChange={handleimagechange}/>
                    <label for="file-upload" className="form-control form-control-sm" style={{backgroundColor:"lightblue",cursor:"pointer",textAlign:"center",width:"100px"}}> 
                     Upload
                    </label>
                    </div>
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-3" style={{marginLeft:"55%"}}><button className="form-control form-control-sm" onClick={paymentdetails} >Make Payment & Save</button></div>
                    <div className="col-md-2"><button className="form-control form-control-sm">Cancel</button></div>
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

export default Payment_details;