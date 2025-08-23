import React, { useState } from 'react'
import Header1 from './header1'
import Sidebar1 from './sidebar1'
import api from "../api";
import Swal from 'sweetalert2';

function Whatsapplogin() {

     const [isloading, setisloading] = useState(false);

  const[qrcode,setqrcode]=useState("")
  const getqrcode=async()=>
  {
    try {
      setisloading(true)
      const resp=await api.get("get-qr-code")
      console.log(resp);
      
      if (resp) {
        setqrcode(resp.data.base64);
      }
      
    } catch (error) {
      console.log(error);
    }
    finally
    {
      setisloading(false)
    }
  }

  const[user1,setuser1]=useState("")
  const[user2,setuser2]=useState("")

  const setinstanceid=async()=>
  {
    try {
      setuser1("")
      setuser2("")
      const resp=await api.post('addinstanceid',{user1,user2})
      if(resp.status===200)
      {
        
       {
          Swal.fire({
          title: "New Instance Id",
          text: "new instance id set successfully",
          icon: "success",
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        })
       }

      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const[showinstance,setshowinstance]=useState(false)
  const[instancedetails,setinstancedetails]=useState([])
  const getinstanceid=async()=>
  {
    setshowinstance(true)
    try {
      const resp=await api.get('viewinstanceid')
      setinstancedetails(resp.data.instanceid)
    } catch (error) {
      console.log(error);
      
    }
  }
  const [showInstanceId, setShowInstanceId] = useState(false);
  return (
    <div>
        <Header1/>
        <Sidebar1/>
       <h3 style={{marginTop:"100px",marginLeft:"25%"}}>Login Your Whats App Account</h3>
        <div className="row" style={{marginTop:"10px",marginLeft:"25%",border:"1px solid gray",borderRadius:"5px",padding:"20px",width:"50%"}}>
        
        {/* <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
       <label className="labels" style={{ fontSize: "12px" }}>Select Your Mobile No.</label>
       <select
         required
         className="form-control form-control-sm"
         style={{ fontSize: "12px" }}
       >
         <option value="">---Select---</option>
         <option>+91 99913 33570</option>
     
       </select>

     </div> */}
     <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
       <label className="labels" style={{ fontSize: "12px",visibility:"hidden" }}>Select Your Mobile No.</label>
       <button className="form-control form-control-sm" onClick={getqrcode}>Get Qr Code</button>
     </div>
         <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
      <label className="labels" style={{ fontSize: "12px",visibility:"hidden" }}>Select Your Mobile No.</label>
      <button className="form-control form-control-sm" onClick={getinstanceid}>View Instance Id</button>
      </div>

     <div className="col-md-4" style={{ fontSize: "12px", marginTop: "10px" }}>
       <label className="labels" style={{ fontSize: "12px",visibility:"hidden" }}>Add New Instance Id</label>
       <button className="form-control form-control-sm"  onClick={() => setShowInstanceId(true)}>Add New Instance Id</button>  
      </div>
 
    

    
      {showInstanceId && (
      <>
      <div className='col-md-5'></div>
        <div id="instanceid" className="col-md-5" style={{marginTop:"15px"}}>
          <label className="labels">Add A New Instance Id</label>
          <input 
            className="form-control form-control-sm" 
            placeholder="enter instanceid for first user" 
            type="text" 
            onChange={(e)=>setuser1(e.target.value)}
          />
          <input 
            style={{ marginTop: "2px" }} 
            placeholder="enter instanceid for second user" 
            className="form-control form-control-sm" 
            type="text" 
            onChange={(e)=>setuser2(e.target.value)}
          />
        </div>
        <div className='col-md-2' style={{marginTop:"60px"}}><button className='form-control form-control-sm' onClick={setinstanceid}>save</button></div>
        </>
      )}
      {
        showinstance && (
          instancedetails.map((item)=>
          (
            <div style={{marginTop:"20px"}}>
            <p>user1(Bharat Properties) : <span style={{color:"blue"}}>{item.user1}</span></p>
            <p>user2(Bharat Properties2) : <span style={{color:"blue"}}>{item.user2}</span></p>
            </div>
          ))
        )
      }


        {qrcode && (
            <div style={{marginTop:"15px"}}>
     
            <img src={qrcode}  style={{ width: 200, height: 200 }} />
        
        </div>

        )}
      <>
      {isloading && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}>
        <div style={{
          background: "rgba(9, 101, 52, 0.8)",
          padding: "20px 40px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white",
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "5px solid white",
            borderTop: "5px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 10px",
          }}></div>
          <p>uploading qr code...</p>
        </div>
      </div>
    )}
  </>
   
     </div>
    </div>
  )
}

export default Whatsapplogin
