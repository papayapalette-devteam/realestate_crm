   {/* <div>
                        <p style={{borderTop: "1px solid ", borderBottom: "1px solid #000"}} >Create a new role</p>
                                   <div className="mb-3">
                            <label htmlFor="name" className="form-label">Role name</label>
                              <input type="text" className="form-control" id="name" name='role_name' onChange={handlechange} required placeholder='Manager (Sales)' />
                      
                      
                                    <label htmlFor="name" className="form-label">Description</label>
                                    <textarea type="text" style={{height:'100px'}} name='descriptions' onChange={handlechange} className="form-control" id="name" placeholder='Lets people know how this role should be used. '/>
                                    <h6>Configure Setting Permission</h6>
                                  <h8>Manage</h8><br></br>
                              <div style={{ display: "flex", gap: "80px", alignItems: "center" }}>
                        <label>
                          <input type="checkbox" name='manage' value="profile" onChange={handleCheckboxChange}/> Profile
                        </label>
                        <label>
                          <input type="checkbox" name='manage' value="users" onChange={handleCheckboxChange}/> Users
                        </label>
                        <label>
                          <input type="checkbox" name='manage' value="notification" onChange={handleCheckboxChange}/> Notification
                        </label>
                        <label>
                          <input type="checkbox" name='manage' value="salesgoal" onChange={handleCheckboxChange}/> Sales Goal
                        </label>
                      </div>
                          
                      
                           <h8 style={{ textDecoration: "underline" }}>Data</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='data' value="import" onChange={handleCheckboxChange} /> Import
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="export" onChange={handleCheckboxChange}/> Export
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="bulkupdate" onChange={handleCheckboxChange}/>Bulk Update
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="duplicatemanagement" onChange={handleCheckboxChange}/> Duplicate Managment
                        </label>
                         <label>
                          <input type="checkbox" name='data' value="prospectingandenrich" onChange={handleCheckboxChange}/>Prospecting and Enrich
                        </label>
                        <label>
                          <input type="checkbox" name='data' value="leadcapture" onChange={handleCheckboxChange}/>Lead Capture
                            </label>
                      </div>
                                  <h8 style={{ textDecoration: "underline" }}>Communication Channels</h8><br></br>
                              <div style={{ display: "flex", gap: "80px", alignItems: "center" , marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='communication_channels' value="email" onChange={handleCheckboxChange} /> Email
                        </label>
                        <label>
                          <input type="checkbox"  name='communication_channels' value="voice" onChange={handleCheckboxChange}/> Voice(vertual Call)
                        </label>
                        <label>
                          <input type="checkbox"  name='communication_channels' value="text" onChange={handleCheckboxChange}/>Text(SMS)
                        </label>
                        <label>
                          <input type="checkbox"  name='communication_channels' value="salesgoal" onChange={handleCheckboxChange}/> Sales Goal
                        </label>
                      </div>
                      
                      <h8 style={{ textDecoration: "underline" }}>Customize</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='cutomize' value="lead" onChange={handleCheckboxChange} />Lead
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="contact" onChange={handleCheckboxChange}  />Contact
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="task" onChange={handleCheckboxChange}  />Task
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="properties" onChange={handleCheckboxChange} /> Properties
                        </label>
                         <label>
                          <input type="checkbox" name='cutomize' value="notes" onChange={handleCheckboxChange} />Notes
                        </label>
                        <label>
                          <input type="checkbox" name='cutomize' value="templates" onChange={handleCheckboxChange} />Templates
                            </label>
                       <label>
                          <input type="checkbox" name='cutomize' value="layout" onChange={handleCheckboxChange} />Layout
                            </label>
                             <label>
                          <input type="checkbox" name='cutomize' value="postsales" onChange={handleCheckboxChange} />Post Sales
                            </label>
                            </div>
                      
                      <h8 style={{ textDecoration: "underline" }}>Intergration</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center" , marginTop:'10px'}}>
                        <label>
                          <input type="checkbox" name='integration' value="integration" onChange={handleCheckboxChange} />Intergration
                        </label>
                        <label>
                          <input type="checkbox" name='integration' value="api" onChange={handleCheckboxChange}/>API
                        </label>
                        </div>
                      
                        <h8 style={{ textDecoration: "underline" }}>Business Rule</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" name='bussiness_rule' value="fieldrules" onChange={handleCheckboxChange} />Field Rules
                        </label>
                        <label>
                          <input type="checkbox" name='bussiness_rule' value="distributions" onChange={handleCheckboxChange}/>Distributions
                        </label>
                        <label>
                          <input type="checkbox" name='bussiness_rule' value="postsales" onChange={handleCheckboxChange}/>Post Sales
                        </label>
                         <label>
                          <input type="checkbox" name='bussiness_rule' value="automatedactions" onChange={handleCheckboxChange}/>Automated Actions
                        </label>
                         <label>
                          <input type="checkbox" name='bussiness_rule' value="triggers" onChange={handleCheckboxChange}/>Triggers
                        </label>
                         <label>
                          <input type="checkbox" name='bussiness_rule' value="scoring" onChange={handleCheckboxChange}/>Scoring
                        </label>
                        </div>
                      </div>
                      
                       <div style={{ display: "flex", gap: "70px", marginTop:'25px',  borderTop: "1px solid #000",borderBottom: "1px solid #000"}}>
                         <label>Leads</label>
                          <label>Contacts</label>
                           <label>Properties</label>
                            <label>Task</label>
                             <label>Booking</label>
                              <label>Reports</label>
                       </div>
                       <div  style={{marginTop:'15px'}}>
                       <h8>Can view Properties</h8> <br></br>
                       <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' value='Their and subordinates deals' onChange={handlechange}></input> Their and subordinates' deals <br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' onChange={handlechange} value='Their subordinates and peers deals'></input>Their subordinates' and peers' deals<br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' onChange={handlechange} value='Their subordinates peers and manager deals'></input>Their subordinates'  peers and manager deals<br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='canview_properties' onChange={handlechange} value='Same deals as thier manager'></input> Same deals as thier manager<br></br>
                      </div>
                             <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px" }} type="checkbox" name='canadd_properties' onChange={handlechange} />Can add Properties<br></br>
                      
                              <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can update Properties<br></br>
                               <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canupdate_properties' onChange={handlechange} value='Only thier and subordinates deals'></input> Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canupdate_properties' onChange={handlechange} value='All deals they can view'></input> All deals they can view<br></br>
                      
                                <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can reassign ownership of Properties<br></br>
                               <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canreassign_properties' onChange={handlechange} value='Only thier and subordinates deals'></input>Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='canreassign_properties' onChange={handlechange} value='All deals they can view'></input>  All deals they can view<br></br>
                      
                                  <input style={{marginTop:'30px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can delete Properties<br></br>
                               <input style={{marginTop:'10px'}} type='radio' name='candeletproperties' onChange={handlechange} value='Only thier and subordinates deals'></input>Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px'}} type='radio' name='candeletproperties' onChange={handlechange} value='All deals they can view'></input>  All deals they can view<br></br>
                      
                               <div  style={{marginTop:'15px'}}>
                                <h8 >Can view Properties Owner</h8> <br></br>
                       <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Their and subordinates deals'></input> Their and subordinates' deals <br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Their subordinates and peers deals'></input>Their subordinates' and peers' deals<br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Their subordinates peers and manager deals'></input>Their subordinates'  peers and manager deals<br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='canview_properties_owner' onChange={handlechange} value='Same deals as thier manager'></input> Same deals as thier manager<br></br>
                           </div>
                      </div> */}