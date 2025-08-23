import {useState,React} from 'react'
import api from "../api";
import ReactQuill from 'react-quill';  // Import ReactQuill
import { toast, ToastContainer } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar1 from './sidebar1';
import Header1 from "./header1";
import { logDOM } from '@testing-library/react';

function Sendmail() {

      const navigate=useNavigate();
      const location=useLocation()
      
      const lead = location.state?.lead1;
      const deals = location.state?.selectedItems1;

      const deal=location.state?.deal1
      
      console.log('Lead:', deals);
      console.log('Deals:', deal);
      

          const[emails,setemails]=useState([])
                   
                
        
                    const sendmailfunction=()=>
                    {
                      document.getElementById("sendmail").style.display="flex"
                      document.getElementById("sendmessage").style.display="none"
                      document.getElementById("sendwhatsapp").style.display="none"
        
                      document.getElementById("sendmessage1").style.color="black"
                      document.getElementById("sendmessage1").style.backgroundColor="white"
                      document.getElementById("sendwhatsapp1").style.color="black"
                      document.getElementById("sendwhatsapp1").style.backgroundColor="white"
        
                      document.getElementById("sendmail1").style.backgroundColor="black"
                      document.getElementById("sendmail1").style.color="white"
                      document.getElementById("sendmail1").style.borderRadius="50px"
                      document.getElementById("sendmail1").style.width="100px"
                      document.getElementById("sendmail1").style.textAlign="center"
                    }
                    const sendmessagefunction=()=>
                      {
                        document.getElementById("sendmail").style.display="none"
                        document.getElementById("sendmessage").style.display="flex"
                        document.getElementById("sendwhatsapp").style.display="none"
          
                        document.getElementById("sendmail1").style.color="black"
                        document.getElementById("sendmail1").style.backgroundColor="white"
                        document.getElementById("sendwhatsapp1").style.color="black"
                        document.getElementById("sendwhatsapp1").style.backgroundColor="white"
          
                        document.getElementById("sendmessage1").style.backgroundColor="black"
                        document.getElementById("sendmessage1").style.color="white"
                        document.getElementById("sendmessage1").style.borderRadius="50px"
                        document.getElementById("sendmessage1").style.width="150px"
                        document.getElementById("sendmessage1").style.textAlign="center"
                      }
        
                      const sendwhatsappfunction=()=>
                        {
                          document.getElementById("sendmail").style.display="none"
                          document.getElementById("sendmessage").style.display="none"
                          document.getElementById("sendwhatsapp").style.display="flex"
            
                          document.getElementById("sendmail1").style.color="black"
                          document.getElementById("sendmail1").style.backgroundColor="white"
                          document.getElementById("sendmessage1").style.color="black"
                          document.getElementById("sendmessage1").style.backgroundColor="white"
            
                          document.getElementById("sendwhatsapp1").style.backgroundColor="black"
                          document.getElementById("sendwhatsapp1").style.color="white"
                          document.getElementById("sendwhatsapp1").style.borderRadius="50px"
                          document.getElementById("sendwhatsapp1").style.width="150px"
                          document.getElementById("sendwhatsapp1").style.textAlign="center"
                        }
        
        
        
                 
        
                    const templates = {
                      template1: "Hello, \n\nI hope this email finds you well. I wanted to follow up on our previous conversation regarding property. Please let me know if you have any questions.\n\nBest regards,\nDigvijay Kumar",
                      template2: "Hi there, \n\nI just wanted to remind you about the upcoming event on [date]. It will be held at Noida. Please feel free to reach out if you need any additional information.\n\nSincerely,\nDigvijay Kumar",
                      template3: `Dear sir, \n\nWe are excited to inform you that your application has been approved. Please find attached the documents with further details about the next steps.\n\nBest regards,\nDigvijay Kumar`
                    };
                    const[message,setmessage]=useState("")
                    const[subject,setsubject]=useState("")
                    const [selectedTemplate, setSelectedTemplate] = useState('');
                    const [attachments, setAttachments] = useState([]);
        
                    const modules1 = {
                        toolbar: {
                          container: "#custom-toolbar"
                        }
                      };
                      

                    
                    const handlemailmessage=(value)=>
                      {
                        setmessage(value)
                      }
        
                    const { getRootProps, getInputProps } = useDropzone({
                      onDrop: (acceptedFiles) => {
                        setAttachments(acceptedFiles); // Store selected files
                      },
                    });
        
                    const handleTemplateSelect = (e) => {
                      const templateKey = e.target.value; // Get selected template key
                      setSelectedTemplate(templateKey); // Set the selected template
                      const selectedTemplateContent = templates[templateKey] || ''; // Get the template content
                  
                      // Convert '\n' to '<br>' for HTML email formatting
                      const htmlFormattedMessage = selectedTemplateContent.replace(/\n/g, '<br>');
                      
                      // Set the message state with the formatted message (HTML-friendly)
                      setmessage(htmlFormattedMessage); 
                    };
                    
                    const sendmail=async(e)=>
                      {
                        e.preventDefault();
                        const formData = new FormData();
            
            // Add the subject, message, and recipient email to form data
                            formData.append('subject', subject);
                            formData.append('message', message);
                            formData.append('emails', emails);
                            
                            // Append the files to form data
                            attachments.forEach((file) => {
                              formData.append('attachments', file);
                            });
                        try {
                          
                          const resp=await api.post(`contact/sendmail`,formData)
                          if(resp.status===200)
                          {
                            toast.success("Mail Sent Successfully",{ autoClose: 2000 })
                            setTimeout(() => {
                              navigate('/leaddetails')
                            }, 2000);
                            setTimeout(() => {
                            }, 2000);
                          }
                         
                        } catch (error) {
                          toast.error(error.response.data,{ autoClose: 2000 });
                        }
                      }
        
        
                      const formatRelativeDate = (date) => {
                        const now = new Date();
                        const communicationDate = new Date(date);
                        const differenceInTime = now - communicationDate;
                        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
                      
                        if (differenceInDays === 0) return 'Today';
                        if (differenceInDays === 1) return '1 day ago';
                        return `${differenceInDays} days ago`;
                      };
        
                      const formatDate = (isoString) => {
                        if (!isoString) return "-"; // Fallback for missing date
                        const date = new Date(isoString);
                        const localDate = date.toLocaleDateString();
                        const localTime = date.toLocaleTimeString();
                        return (
                          <>
                            <div>{localDate}</div>
                            <div>{localTime}</div>
                          </>
                        );
                      };



  return (
    <div>
            <Header1/>
              <Sidebar1/>

            <div style={{width:"70%",marginLeft:"20%",marginTop:"5%",border:"1px solid gray",borderRadius:"5px",padding:"50px",backgroundColor:"white"}}>
        <div style={{display:"flex", gap:"100px"}}>
          <div style={{cursor:"pointer"}} id="sendmail1" onClick={sendmailfunction}>Send Mail</div> 
          <div style={{cursor:"pointer"}} id="sendmessage1" onClick={sendmessagefunction}>Send Message</div>
          <div style={{cursor:"pointer"}} id="sendwhatsapp1" onClick={sendwhatsappfunction}>Send WhatsApp</div>
   
        </div>
        <div className="col-md-12"><hr></hr></div>
  
   

<div className="row mt-2" id="sendmail" style={{fontSize:"12px",display:"none"}}>
      <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder",fontSize:"1vw"}}> Send Mail</div>
          <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
           <input type="text" style={{border:"none",fontSize:"12px",borderBottom:"1px solid gray"}} required="true" className="form-control form-control-sm" placeholder='subject' value={subject} onChange={(e)=>setsubject(e.target.value)}/>
      
          </div>
         
   
          <div className="col-md-12" style={{marginTop:"10px"}}>
             <ReactQuill
           modules={modules1}  // Add the toolbar options for formatting
           style={{ height: '200px', width: '100%',fontSize:"12px",marginTop:"5px"}}
           className="my-quill-editor"
           value={message}   placeholder="Enter Your Message"  onChange={handlemailmessage}/>
           </div>

           <div id="custom-toolbar" className="ql-toolbar ql-snow" style={{ marginTop: "10px" }}>
  {/* Text formatting */}
  <span className="ql-formats">
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
  </span>

  {/* Font family */}
  <span className="ql-formats">
    <select className="ql-font">
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>
  </span>

  {/* Font size */}
  <span className="ql-formats">
    <select className="ql-size">
      <option value="small" />
      <option value="normal" selected />
      <option value="large" />
      <option value="huge" />
    </select>
  </span>

  {/* Lists and indent */}
  <span className="ql-formats">
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
  </span>

  {/* Alignment */}
  <span className="ql-formats">
    <button className="ql-align" value="" />
    <button className="ql-align" value="center" />
    <button className="ql-align" value="right" />
    <button className="ql-align" value="justify" />
  </span>

  {/* Colors */}
  <span className="ql-formats">
    <button className="ql-color" />
    <button className="ql-background" />
  </span>

  {/* Code, blockquote */}
  <span className="ql-formats">
    <button className="ql-blockquote" />
    <button className="ql-code-block" />
  </span>

  {/* Media */}
  <span className="ql-formats">
    <button className="ql-link" />
    <button className="ql-image" />
  </span>

  {/* Clear formatting */}
  <span className="ql-formats">
    <button className="ql-clean" />
  </span>
</div>


          <div className="col-md-4" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"12px"}}>Templates</label>
          <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate} onChange={handleTemplateSelect} style={{fontSize:"12px"}}>
             <option value="">---Select Template---</option>
             <option value="template1">Template 1</option>
             <option value="template2">Template 2</option>
             <option value="template3">Template 3</option>
           </select>
          </div>
   
          <div className="col-md-4" {...getRootProps()} style={{ border: '1px dashed #ccc',marginTop:"35px", cursor: 'pointer' }}>
           <input {...getInputProps()} />
           <p style={{fontSize:"12px"}}>Drag & drop files here, or click to select files</p>
           <ul>
             {attachments.length > 0 && attachments.map((file, index) => (
               <li key={index}>{file.name}</li>
             ))}
           </ul>
         </div>
       
      </div>

   <div className="row mt-2" id="sendmessage" style={{display:"none"}}>
   <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send Message</div>
    </div>

    <div className="row mt-2" id="sendwhatsapp" style={{display:"none"}}>
    <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send WhatsApp</div>
    </div>


</div>
         
      
    </div>
  )
}

export default Sendmail
