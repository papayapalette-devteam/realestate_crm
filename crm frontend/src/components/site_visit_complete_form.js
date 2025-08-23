import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/hover.css'

function Site_visit_complete_form() {
    const status=["Conducted","Do Not Visit","Not Intersted"]
    const result=["Deal Done","Negotiation Uncomplete","Deal Not Done","Site Visit"]

   const mousehover=()=>
    {
       
    }
    const mouseout=()=>
        {
            
        }
    
    return ( 
        <div>
            <div id="header"><Header1/></div>
            <div id="sde"  onMouseOver={mousehover} onMouseLeave={mouseout}><Sidebar1/></div>
           
            <div className="row" id="r" style={{marginTop:"50px",marginLeft:"20%"}} >
        <div className="col-9 border-right border-left">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Site Visit</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Status</label><select className="form-control" required="true" >
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
                        <div className="col-md-4"><label className="labels">Select Intersted Inventory</label><select className="form-control" required="true" >
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
                <div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control" /></div>
                <div className="col-md-8"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control'  style={{height:"100px"}}/></div>
                     </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control">Cancel</button></div>
                    </div>
                    </div>
                    </div>
        </div>
        </div>
     );
}

export default Site_visit_complete_form;