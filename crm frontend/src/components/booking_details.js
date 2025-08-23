import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import { useState } from "react";

function Booking_details() {

    const [booking,setbooking]=useState({type:"",property:"",booked_lead:"",booking_date:"",form_application_no:"",total_deal_amount:"",
                                booking_date1:"",agreement_amount:"",agreement_date:"",part_payment_amount:"",part_payment_date:"",
                                full_final_payment_date:"",sales_agent:"",channel:"",side:"",seller_brokerage:"",brokerage:"",buyer_brokerage:"",
                                brokerage1:"",executive_incentive:"",executive_incentive1:"",remarks:""});
    
        const config = {
            headers: {
              'Content-Type': 'application/json' // Set the Content-Type here
            }
        }
      
    const bookingdetails=async(e)=>
    {
        e.preventDefault();
        try {
            const resp= await axios.post('http://localhost:5000/bookingdetails',booking,config)
        if(resp.status===200)
            {
                toast.success(resp.data.message,{autoClose:2000})
                
            }
            
      
        } catch (error) {
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
            const handler3=()=>
                {
                    document.getElementById("date3").style.color="black";
                }
                const handler4=()=>
                    {
                        document.getElementById("date4").style.color="black";
                    }
                    const handler5=()=>
                        {
                            document.getElementById("date5").style.color="black";
                        }
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
                    <h4 className="text-right">Booking Details</h4>
                </div><hr></hr>
                <div className="row mt-2">
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setbooking({...booking,type:e.target.value})}>
                    <option>Select</option>
                        <option>Rent</option>
                        <option>Sell</option>
                        <option>Buy</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Property</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setbooking({...booking,property:e.target.value})}>
                        <option>Select</option>
                        <option>Noida sec 61</option>
                        <option>Noida sec 63</option>
                        <option>Anand Vihar Delhi</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Booked Lead</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setbooking({...booking,booked_lead:e.target.value})}>
                        <option>Select</option>
                        <option>Ajay</option>
                        <option>Rajesh</option>
                        <option>Suresh</option>
                        </select>
                        </div>

                    <div className="col-md-4"><label className="labels">Booking Date</label><input type="date" id="date1" className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1} onChange={(e)=>setbooking({...booking,booking_date:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Form Application No</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,form_application_no:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"><label className="labels">Total Deal Amount</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,total_deal_amount:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Booking Date</label><input type="date" id="date2" style={{color:"transparent"}} onClick={handler2} className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,booking_date1:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-3"><label className="labels">Agreement Amount</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,agreement_amount:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Agreement Date</label><input type="date" id="date3" style={{color:"transparent"}} onClick={handler3} className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,agreement_date:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Part Pyment Amount</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,part_payment_amount:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Part Pyment Date</label><input type="date" id="date4" style={{color:"transparent"}} onClick={handler4} className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,part_payment_date:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Full & Final Payment Date</label><input type="date" id="date5" style={{color:"transparent"}} onClick={handler5} className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,full_final_payment_date:e.target.value})}/></div>
                    <div className="col-md-8"></div>

                    <div className="col-md-3"><label className="labels">Sales Agent</label><select className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,sales_agent:e.target.value})}>
                    <option>Select</option>
                        <option>Rakesh</option>
                        <option>Ajit</option>
                        <option>Mohan</option>
                        </select></div>
                        <div className="col-md-3"></div>
                        <div className="col-md-3"><label className="labels"  >Channel</label><select className="form-control form-control-sm"  onChange={(e)=>setbooking({...booking,channel:e.target.value})}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                    <div className="col-md-3"><label className="labels" >Side</label><select className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,side:e.target.value})}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"></div>
                    
                    <div className="col-md-3"><label className="labels">Seller Brokerage(%)</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,seller_brokerage:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Brokerage</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,brokerage:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Buyer Brokerage(%)</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,buyer_brokerage:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Brokerage</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,brokerage1:e.target.value})}/></div>
                    
                    <div className="col-md-4"><label className="labels">Executive Incentive(%)</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,executive_incentive:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Executive Incentive</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setbooking({...booking,executive_incentive1:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remarks</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setbooking({...booking,remarks:e.target.value})}/></div>

                    </div>
                    <div className="row mt-4">
                    <div className="col-md-2" style={{marginLeft:"65%"}}><button className="form-control form-control-sm" onClick={bookingdetails}>Submit</button></div>
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

export default Booking_details;