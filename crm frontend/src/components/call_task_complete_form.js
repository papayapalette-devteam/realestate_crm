import Header1 from "./header1";
import Sidebar1 from "./sidebar1";



function Call_task_complete_form() {
    const direction=["Incoming","Outgoing"]
    const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
    const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]
    const handler1=()=>
        {
            document.getElementById("date1").style.color="black"
        }
    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"80%",marginLeft:"13%"}}>
            <div className="row" style={{marginTop:"50px"}}>
        <div className="col-12 border-right border-left">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control" required="true" >
                    <option>Select</option>
                        {
                            direction.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control" required="true" >
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
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4"><label className="labels">Date</label><input type="date" id="date1" className="form-control" style={{color:"transparent"}} onClick={{handler1}}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" className="form-control" /></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label><select className="form-control" required="true" >
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
                        <div className="col-md-4"><label className="labels">Select Intersted Inventory(If any)</label><select className="form-control" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control'/></div>
                     </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control">Cancel</button></div>
                    </div>
                    </div>
                    </div>
        </div>
        </div>
        </div>
        </div>
     );
}

export default Call_task_complete_form;