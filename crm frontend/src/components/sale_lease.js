
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";

function Sale_lease() {
    const date=new Date().toLocaleDateString()
    const time=new Date().toLocaleTimeString() 
    function available_for()
    {
        const available=document.getElementById("availablefor").value;
        if(available==="Sale")
            {
                document.getElementById("sale").style.display="flex"
                document.getElementById("rent").style.display="none"
            }
            if(available==="Rent")
                {
                    document.getElementById("rent").style.display="flex"
                    document.getElementById("sale").style.display="none"
                }   
           if(available==="Select") 
            {
                 document.getElementById("rent").style.display="none"
                    document.getElementById("sale").style.display="none"
            }
            
    }
   
    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div className="row" style={{marginTop:"50px",marginLeft:"20%"}}>
        <div className="col-9 border-right border-left">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Sale or Rent</h4>
                </div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-3"><label className="labels">Available For</label><select id="availablefor" className="form-control" required="true" onChange={available_for} >
                    <option>Select</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Inventory</label><select className="form-control" required="true" >
                    <option>Select</option>
                       
                        </select>
                        </div>
                    <div className="col-md-3"><label className="labels">Floor</label><input type="text" required="true" className="form-control"/></div>
                    <div className="col-md-3"><label className="labels">Date</label><br></br><p>{date}-{time}</p></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Terms Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                </div>
                <div className="row" id="sale" style={{display:"none"}}>
                    <div className="col-md-3"><label className="labels">Expected Price</label><select required="true" className="form-control" >
                    <option value="">phone</option>
                   
                    </select></div>
                    <div className="col-md-3"><label className="labels">Price per Sq yard/ft/mtr</label><input type="text" required="true" className="form-control"/></div>
                    <div className="col-md-3"><label className="labels">Quote Price</label><select className="form-control" >
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-3"><label className="labels">Price per Sq yard/ft/mtr</label><input type="text" required="true" className="form-control"/></div>

                    <div className="col-md-4"><label className="labels">Deal Type</label><select className="form-control" >
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Source</label><select className="form-control" >
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-4"></div>

                        <div className="col-md-5"><label className="labels">Team</label><select className="form-control" >
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-5"><label className="labels">User</label><select className="form-control" >
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        </div>

                        <div className="row" id="rent" style={{display:"none"}}>
                    <div className="col-md-3"><label className="labels">Rent Amount</label><input type="text" required="true" className="form-control"/></div>
                    <div className="col-md-3"><label className="labels">Price per Sq yard/ft/mtr</label><input type="text" required="true" className="form-control"/></div>
                    <div className="col-md-3"><label className="labels">Security Deposite</label><input type="text" required="true" className="form-control"/></div>
                    <div className="col-md-3"><label className="labels">Maintanance Charge</label><input type="text" required="true" className="form-control"/></div>

                    <div className="col-md-3"><label className="labels">Source</label><select className="form-control" >
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                    <div className="col-md-3"><label className="labels">Rent Esclation</label><select className="form-control" >
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Rent Agreement Period</label><select className="form-control" >
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Fitout Period</label><select className="form-control" >
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        

                        <div className="col-md-5"><label className="labels">Team</label><select className="form-control" >
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-5"><label className="labels">User</label><select className="form-control" >
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        </div>



                    <div className="row mt-4">
                    <div className="col-md-4"><button className="form-control" >Share on Website</button></div>
                    <div className="col-md-4"><button className="form-control" >Share on Social Media</button></div>
                    
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-7"><button className="form-control">Send Sms Email & Whatsapp Matched Lead</button></div>
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-3"><button className="form-control" style={{backgroundColor:"steelblue"}}>Add Follow-up</button></div>
                    <div className="col-md-2"><button className="form-control" style={{marginLeft:"400%",backgroundColor:"aqua"}}>Save</button></div>
                    
                    </div>
                    </div>
                    </div>
        </div>
        </div>
     );
}

export default Sale_lease;