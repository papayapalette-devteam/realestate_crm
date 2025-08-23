import { useState } from 'react';
import React from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from "../api";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Adddcompany() {
   
        
  const countrycode=["Afghanistan +93","Aland Islands +358","Albania +355","Algeria +213","American Samoa +1684","Andorra +376",
    "Angola +244","Anguilla +1264","Antarctica +672","Antigua and Barbuda +1268","Argentina +54","Armenia +374",
    "Aruba +297","Australia +61","Austria +43","Azerbaijan +994","Bahamas +1242","Bahrain +973","Bangladesh +880",
    "Barbados +1246","Belarus +375","Belgium +32","Belize +501","Benin +229","Bermuda +1441","Bhutan +975",
    "Bolivia +591","Bonaire, Sint Eustatius and Saba +599","Bosnia and Herzegovina +387","Botswana +267",
    "Bouvet Island +55","Brazil +55","British Indian Ocean Territory +246","Brunei Darussalam +673","Bulgaria +359",
    "Burkina Faso +226","Burundi +257","Cambodia +855","Cameroon +237","Canada +1","Cape Verde +238","Cayman Islands +1345",
    "Central African Republic +236","Chad +235","Chile +56","China +86","Christmas Island +61","Cocos (Keeling) Islands +672",
    "Colombia +57","Comoros +269","Congo +242","Congo, Democratic Republic of the Congo +242","Cook Islands +682",
    "Costa Rica +506","Cote D'Ivoire +225","Croatia +385","Cuba +53","Curacao +599","Cyprus +357","Czech Republic +420",
    "Denmark +45","Djibouti +253","Dominica +1767","Dominican Republic +1809","Ecuador +593","Egypt +20",
    "El Salvador +503","Equatorial Guinea +240","Eritrea +291","Estonia +372","Ethiopia +251","Falkland Islands (Malvinas) +500",
    "Faroe Islands +298","Fiji +679","Finland +358","France +33","French Guiana +594","French Polynesia +689",
    "French Southern Territories +262","Gabon +241","Gambia +220","Georgia +995","Germany +49","Ghana +233","Gibraltar +350",
    "Greece +30","Greenland +299","Grenada +1473","Guadeloupe +590","Guam +1671","Guatemala +502","Guernsey +44",
    "Guinea +224","Guinea-Bissau +245","Guyana +592","Haiti +509","Holy See (Vatican City State) +39","Honduras +504",
    "Hong Kong +852","Hungary +36","Iceland +354","India +91","Indonesia +62","Iran, Islamic Republic of +98","Iraq +964",
    "Ireland +353","Isle of Man +44","Israel +972","Italy +39","Jamaica +1876","Japan +81","Jersey +44","Jordan +962",
    "Kazakhstan +7","Kenya +254","Kiribati +686","Korea Democratic People's Republic of +850","Korea Republic of +82","Kosovo +383",
    "Kuwait +965","Kyrgyzstan +996","Lao People's Democratic Republic +856","Latvia +371","Lebanon +961","Lesotho +266",
    "Liberia +231","Libyan Arab Jamahiriya +218","Liechtenstein +423","Lithuania +370","Luxembourg +352","Macao +853",
    "Macedonia, the Former Yugoslav Republic of +389","Madagascar +261","Malawi +265","Malaysia +60","Maldives +960",
    "Mali +223","Malta +356","Marshall Islands +692","Martinique +596","Mauritania +222","Mauritius +230","Mayotte +262",
    "Mexico +52","Micronesia, Federated States of +691","Moldova, Republic of +373","Monaco +377","Mongolia +976",
    "Montenegro +382","Montserrat +1664","Morocco +212","Mozambique +258","Myanmar +95","Namibia +264","Nauru +674",
    "Nepal +977","Netherlands +31","Netherlands Antilles +599","New Caledonia +687","New Zealand +64","Nicaragua +505",
    "Niger +227","Nigeria +234","Niue +683","Norfolk Island +672","Northern Mariana Islands +1670","Norway +47",
    "Oman +968","Pakistan +92","Palau +680","Palestinian Territory, Occupied +970","Panama +507","Papua New Guinea +675",
    "Paraguay +595","Peru +51","Philippines +63","Pitcairn +64","Poland +48","Portugal +351","Puerto Rico +1787",
    "Qatar +974","Reunion +262","Romania +40","Russian Federation +7","Rwanda +250","Saint Barthelemy +590",
    "Saint Helena +290","Saint Kitts and Nevis +1869","Saint Lucia +1758","Saint Martin +590","Saint Pierre and Miquelon +508",
    "Saint Vincent and the Grenadines +1784","Samoa +684","San Marino +378","Sao Tome and Principe +239","Saudi Arabia +966",
    "Senegal +221","Serbia +381","Serbia and Montenegro +381","Seychelles +248","Sierra Leone +232","Singapore +65",
    "Sint Maarten +721","Slovakia +421","Slovenia +386","Solomon Islands +677","Somalia +252","South Africa +27",
    "South Georgia and the South Sandwich Islands +500","South Sudan +211","Spain +34","Sri Lanka +94","Sudan +249",
    "Suriname +597","Svalbard and Jan Mayen +47","Swaziland +268","Sweden +46","Switzerland +41","Syrian Arab Republic +963",
    "Taiwan, Province of China +886","Tajikistan +992","Tanzania, United Republic of +255","Thailand +66","Timor-Leste +670",
    "Togo +228","Tokelau +690","Tonga +676","Trinidad and Tobago +1868","Tunisia +216","Turkey +90","Turkmenistan +7370",
    "Turks and Caicos Islands +1649","Tuvalu +688","Uganda +256","Ukraine +380","United Arab Emirates +971",
    "United Kingdom +44","United States +1","United States Minor Outlying Islands +1","Uruguay +598","Uzbekistan +998",
    "Vanuatu +678","Venezuela +58","Viet Nam +84","Virgin Islands, British +1284","Virgin Islands, U.s. +1340",
    "Wallis and Futuna +681","Western Sahara +212","Yemen +967","Zambia +260","Zimbabwe +263"]
    
    React.useEffect(()=>{fetchdata()},[])
  
    
    const navigate=useNavigate(); 

// ------------------------------=======================quick add contact start=============================================------------------
                  const time=new Date()
                    
                  const mousehover=()=>
                      {
                        document.getElementById("r").style.marginLeft="15%"
                        
                      }
                  const mouseout=()=>
                      {
                         document.getElementById("r").style.marginLeft="0%"
                       }

                       const basicdetails=()=>
                        {
                          document.getElementById("basicdetails1").style.display="flex"
                       
                          document.getElementById("basic").style.color="green"
                          document.getElementById("other").style.color="black"
                           document.getElementById("professional").style.color="black"
                          document.getElementById("otherdetails").style.display="none"
                          document.getElementById("profession").style.display="none"
                        }
                        const professionaldetails=()=>
                          {
                            document.getElementById("basicdetails1").style.display="none"
                           
                            document.getElementById("otherdetails").style.display="none"
                            document.getElementById("profession").style.display="flex"
                             document.getElementById("basic").style.color="black"
                             document.getElementById("other").style.color="black"
                               document.getElementById("professional").style.color="green"
                             
                          }
                        const otherdetails=()=>
                          {
                            document.getElementById("basicdetails1").style.display="none"
                          
                             document.getElementById("profession").style.display="none"
                               document.getElementById("otherdetails").style.display="flex"
                             document.getElementById("basic").style.color="black"
                              document.getElementById("professional").style.color="black"
                             document.getElementById("other").style.color="green"
                          }

    const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[''],mobile_no:[''],mobile_type:[''],action1:[],
        email:[''],email_type:[''],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

        profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
        company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

        father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
        social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[] });
    
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }

        const addcontact=async(e)=>
          {
              e.preventDefault();
              try {
      
                  const resp= await api.post('addcontact',contact,config)
              if(resp.status===200)
                  {
                      toast.success(resp.data.message,{ autoClose: 2000 })
                      setTimeout(() => {
                        window.location.reload()
                      }, 2000);
                  }
                  
            
              } catch (error) {
                  toast.error(error.response.data.message,{ autoClose: 2000 })
              }
          }
// =====================================------------fetch contact data----------------------------========================================


          const[data,setdata]=useState([]);
          const[totalcontact,settotalcontact]=useState()
          const fetchdata=async(event)=>
          {
            
            try {
              const resp=await api.get('viewcontact')
              setdata(resp.data.contact)
              const countcontact=Array.isArray(resp.data.contact) ? resp.data.contact : [resp.data.contact]
              settotalcontact(countcontact.length)
            } catch (error) {
              console.log(error);
            }
          
          }

// ====================----------------------------search contact data-----------------------------------------------======================

          const[searchdata,setsearchdata]=useState()
          const fetchdatabyemail_mobile_tags_company=async(e)=>
            {
              // e.preventDefault()
              try {
                const resp=await api.get(`viewcontactbyemail/${searchdata}`);
                  const incoming=(Array.isArray(resp.data.contact) ? resp.data.contact : [resp.data.contact]);
      
                const resp1=await api.get(`viewcontactbymobile/${searchdata}`);
                const incoming1=(Array.isArray(resp1.data.contact) ? resp1.data.contact : [resp1.data.contact]);
                setdata([...incoming,...incoming1])
                  document.getElementById("searchcontact").value=''
              } catch (error) {
                console.log(error);
              }
            }
            const handlekeypress1=(event)=>
            {
                if(event.key==="Enter")
                    {
                      fetchdatabyemail_mobile_tags_company()
                        setsearchdata('')
                    }
                
            }


// -----------------------------==========================modal and styled table row and column--------------------------------==================

            const [show1, setshow1] = useState(false);
    
            const handleClose1 = () => setshow1(false);
            const handleShow1=async()=>
            {
              setshow1(true);
             
            }
      
          const StyledTableCell = styled(TableCell)(({ theme }) => ({
              [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
              },
              [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
              },
            }));
            
            const StyledTableRow = styled(TableRow)(({ theme }) => ({
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
              // hide last border
              '&:last-child td, &:last-child th': {
                border: 0,
              },
            }));

// =================================add array contact and email onchange code==========================================================

            function addFn1() {
        
              setcontact({
                ...contact,
                country_code: [...contact.country_code, ''],
                mobile_no: [...contact.mobile_no, ''],
                mobile_type: [...contact.mobile_type, ''],
                action1: [...contact.action1, '']
              });
            };
  
            const deleteall1=(index)=>
              {
               
                const newcountry_code = contact.country_code.filter((_, i) => i !== index);
                const newmobile_no = contact.mobile_no.filter((_, i) => i !== index);
                const newmobile_type = contact.mobile_type.filter((_, i) => i !== index);
                const newaction1 = contact.action1.filter((_, i) => i !== index);
                
                setcontact({
                  ...contact,
                  country_code: newcountry_code,
                  mobile_no: newmobile_no,
                  mobile_type: newmobile_type,
                  action1: newaction1
                });
              }
              const handlecountry_codechange = (index, event) => {
                const newcountry_code = [...contact.country_code];
                newcountry_code[index] = event.target.value;
                setcontact({
                  ...contact,
                  country_code: newcountry_code
                });
              };
              const handlemobile_nochange = (index, event) => {
                const newmobile_no = [...contact.mobile_no];
                newmobile_no[index] = event.target.value;
                setcontact({
                  ...contact,
                  mobile_no: newmobile_no
                });
              };
              const handlemobile_typechange = (index, event) => {
                const newmobile_type = [...contact.mobile_type];
                newmobile_type[index] = event.target.value;
                setcontact({
                  ...contact,
                  mobile_type: newmobile_type
                });
              };
  
              function addFn2() {
          
                setcontact({
                  ...contact,
                  email: [...contact.email, ''],
                  email_type: [...contact.email_type, ''],
                  action2: [...contact.action2, '']
                });
              };
    
              const deleteall2=(index)=>
                {
                 
                  const newemail = contact.email.filter((_, i) => i !== index);
                  const newemail_type = contact.email_type.filter((_, i) => i !== index);
                  const newaction2 = contact.action2.filter((_, i) => i !== index);
                  
                  setcontact({
                    ...contact,
                    email: newemail,
                    email_type: newemail_type,
                    action2: newaction2
                  });
                }
                const handleemailchange = (index, event) => {
                  const newemail = [...contact.email];
                  newemail[index] = event.target.value;
                  setcontact({
                    ...contact,
                    email: newemail
                  });
                };
                const handleemail_typechange = (index, event) => {
                  const newemail_type = [...contact.email_type];
                  newemail_type[index] = event.target.value;
                  setcontact({
                    ...contact,
                    email_type: newemail_type
                  });
                };


//-----------------------------=================================== add developer start------------------------------------=====================

        const [developer,setdeveloper]=useState({name:"",country_code1:[''],mobile_no1:[''],mobile_type1:[''],action11:[],email1:[''],email_type1:[''],
          action22:[],company_type:"",industry:"",descriptions:"",gst_no:"",
          source:"",team:"",owner:"",visible_to:"",area:"",location:"",city:"",pin_code:"",state:"",country:"",website:"",company_social_media1:[''],
          company_url1:[''],action33:[],employee:[]});
    
      
                    
          const adddeveloper=async(e)=>
            {
                e.preventDefault();
                try {
        
                    const resp= await api.post('addcompany',developer)
                if(resp.status===200)
                    {
                        toast.success(resp.data.message,{ autoClose: 2000 })
                        setTimeout(() => {
                          navigate('/contactdetails')
                        }, 2000);
                    }
                    
              
                } catch (error) {
                    toast.error(error.response.data.message,{ autoClose: 2000 })
                }
            }


            function addFn11() {
        
              setdeveloper({
                ...developer,
                country_code1: [...developer.country_code1, ''],
                mobile_no1: [...developer.mobile_no1, ''],
                mobile_type1: [...developer.mobile_type1, ''],
                action11: [...developer.action11, '']
              });
            };
  
            const deleteall11=(index)=>
              {
               
                const newcountry_code = developer.country_code1.filter((_, i) => i !== index);
                const newmobile_no = developer.mobile_no1.filter((_, i) => i !== index);
                const newmobile_type = developer.mobile_type1.filter((_, i) => i !== index);
                const newaction1 = developer.action11.filter((_, i) => i !== index);
                
                setdeveloper({
                  ...developer,
                  country_code1: newcountry_code,
                  mobile_no1: newmobile_no,
                  mobile_type1: newmobile_type,
                  action11: newaction1
                });
              }
              const handlecountry_codechange1 = (index, event) => {
                const newcountry_code1 = [...developer.country_code1];
                newcountry_code1[index] = event.target.value;
                setdeveloper({
                  ...developer,
                  country_code1: newcountry_code1
                });
              };
              const handlemobile_nochange1 = (index, event) => {
                const newmobile_no = [...developer.mobile_no1];
                newmobile_no[index] = event.target.value;
                setdeveloper({
                  ...developer,
                  mobile_no1: newmobile_no
                });
              };
              const handlemobile_typechange1 = (index, event) => {
                const newmobile_type = [...developer.mobile_type1];
                newmobile_type[index] = event.target.value;
                setdeveloper({
                  ...developer,
                  mobile_type1: newmobile_type
                });
              };
  
              function addFn22() {
          
                setdeveloper({
                  ...developer,
                  email1: [...developer.email1, ''],
                  email_type1: [...developer.email_type1, ''],
                  action22: [...developer.action22, '']
                });
              };
    
              const deleteall22=(index)=>
                {
                 
                  const newemail = developer.email1.filter((_, i) => i !== index);
                  const newemail_type = developer.email_type1.filter((_, i) => i !== index);
                  const newaction2 = developer.action22.filter((_, i) => i !== index);
                  
                  setdeveloper({
                    ...developer,
                    email1: newemail,
                    email_type1: newemail_type,
                    action22: newaction2
                  });
                }
                const handleemailchange1 = (index, event) => {
                  const newemail = [...developer.email1];
                  newemail[index] = event.target.value;
                  setdeveloper({
                    ...developer,
                    email1: newemail
                  });
                };
                const handleemail_typechange1 = (index, event) => {
                  const newemail_type = [...developer.email_type1];
                  newemail_type[index] = event.target.value;
                  setdeveloper({
                    ...developer,
                    email_type1: newemail_type
                  });
                };
              function addFn33() {
     
                setdeveloper({
                  ...developer,
                  company_social_media1: [...developer.company_social_media1, ''],
                  company_url1: [...developer.company_url1, ''],
                  action33: [...developer.action33, '']
                });
              };
              const deleteall33=(index)=>
                {
                 
                  const newcomapnysocialmedia = developer.company_social_media1.filter((_, i) => i !== index);
                  const newcompanyurl = developer.company_url1.filter((_, i) => i !== index);
                  const newaction3=developer.action33.filter((_,i) => i !== index);
                  
                  setdeveloper({
                    ...developer,
                    company_social_media1: newcomapnysocialmedia,
                    company_url1: newcompanyurl,
                    action33:newaction3
                  });
                }
                const handlecompanysocialmediachange1 = (index, event) => {
                  const newcomapnysocialmedia = [...developer.company_social_media1];
                  newcomapnysocialmedia[index] = event.target.value;
                  setdeveloper({
                    ...developer,
                    company_social_media1: newcomapnysocialmedia
                  });
                };
                const handlecompanyurlchange1 = (index, event) => {
                  const newcompanyurl = [...developer.company_url1];
                  newcompanyurl[index] = event.target.value;
                  setdeveloper({
                    ...developer,
                    company_url1: newcompanyurl
                  });
                };
          
              
                
                  
                    

    return ( 
        <div>
            <div id='h'><Header1/></div>
            <div onMouseOver={mousehover} onMouseOut={mouseout}><Sidebar1/></div>
           
           <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-5" style={{width:"80%",marginLeft:"150px"}}>
    <div className="row" id='r' style={{transition:"0.5s"}}>
        <div className="col-md-12 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Add Company</h4><input type='checkbox'  style={{marginLeft:"60%",height:"20px",width:"20px"}} /><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               
         
             <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"50px"}}>
               <div  id='basic' onClick={basicdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Basic Details |</div>
                <div  id='professional' onClick={professionaldetails} style={{cursor:'pointer',fontWeight:"bold"}}>Address |</div>
                <div  id='other' onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Employee |</div> 
               </div>
						    <div style={{marginLeft:"41%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                    <hr></hr>
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
            
                    <div className="col-md-8"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="enter company name" onChange={(e)=>setdeveloper({...developer,name:e.target.value})}/></div>
                    <div className='col-md-4'></div>
             
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      developer.country_code1.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange1(index,event)}>
                        <option value={item} >phone</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                       developer.mobile_no1.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handlemobile_nochange1(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       developer.mobile_type1.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                         onChange={(event)=>handlemobile_typechange1(index,event)}>
                                  <option>Select Type</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       developer.action11.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall11(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn11}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                        developer.email1.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange1(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       developer.email_type1.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          onChange={(event)=>handleemail_typechange1(index,event)}>
                                <option>Select Type</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       developer.action22.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall22(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn22}>+</button></div>
                    
                  <div className="col-md-5"><label className="labels">Company Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,company_type:e.target.value})}>
                                  <option>---Select---</option>    
                                  <option>Sole Proprietorship</option>
                                  <option>Partnership Firm </option>
                                  <option>Limited Liability Partnership  </option>
                                  <option>Private Limited Companies</option>
                                  <option>Public Limited Companies</option>
                                  <option>One-Person Companies</option>
                                  <option>Section 8 Company</option>
                                  <option>Joint-Venture Company</option>
                                  <option>Government Company</option>
                                  <option>Non-Government Organization (NGO)</option>

                        </select>
                    </div>
                    {/* <div className="col-md-7"><label className="labels">Profession Sub-Category</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,profession_subcategory:e.target.value})}>
                                <option>Select</option>
                                <option>Banker</option><option>Broker</option><option>Builder</option><option>Clerk</option>
                                <option>Doctor</option><option>Contractor</option><option>Exporter</option><option>Accountant</option>
                                <option>Advocate</option> <option>Archietect</option> <option>Artist</option> <option>Farmer</option>
                                <option>Chef</option> <option>Teacher</option> <option>Scientist</option> <option>Software Developer</option>
                                <option>Designer</option> <option>Author</option> <option>Nurse</option> <option>Baker</option>
                                <option>Engineer</option> <option>Carpenter</option> <option>Construction</option> <option>Worker</option>
                                <option>Sales Person</option> <option>Pilot</option> <option>Professor</option> <option>Author</option>
                                <option>Clerk</option> <option>Peon</option> <option>Commision</option> <option>Agent(AAdati)</option>
                                <option>Shop Keepar</option>
                        </select>
                    </div> */}

                <div className="col-md-6"><label className="labels">Industry</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,industry:e.target.value})}>
                    <option>---choose industry---</option>
                          <optgroup label='Agriculture'>
                                <option>Farming</option><option>horticulture</option><option>forestry</option>
                                <option>fishing</option><option>Others</option>
                          </optgroup>
                          <optgroup label='Mining'>
                                <option>Extraction of minerals</option><option>oil</option><option>gas</option>
                                <option>other natural resources.</option>
                          </optgroup>
                          <optgroup label='Fishing and Hunting'>
                                <option>Commercial fishing</option><option>aquaculture</option><option>others</option>
                          </optgroup>
                          <optgroup label='Forestry'>
                                <option>Logging</option><option>timber production</option><option>others</option>
                          </optgroup>
                          <optgroup label='Manufacturing'>
                                <option>Production of goods from raw materials (e.g., automotive, 
                                  electronics, textiles, food processing)</option>
                          </optgroup>
                          <optgroup label='Construction'>
                                <option>Building infrastructure</option><option>residential and commercial properties</option><option>roads</option>
                                <option>bridges</option><option>others</option>
                          </optgroup>
                          <optgroup label='Utilities'>
                                <option>Production and distribution of electricity</option><option>water</option><option>gas</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Refining'>
                                <option>Processing raw materials like oil</option><option>metals</option><option>into usable products</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Retail'>
                                <option>Selling goods directly to consumers</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Hospitality'>
                                <option>Hotels</option><option>restaurants</option><option>tourism</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Healthcare'>
                                <option>Hospitals</option><option>clinics</option><option>medical services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education'>
                                <option>Schools</option><option>colleges</option><option>universities</option>
                                <option>training centers</option><option>others</option>
                          </optgroup>
                          <optgroup label='Finance and Insurance'>
                                <option>Banks</option><option>investment firms</option><option>insurance companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Transportation'>
                                <option>Airlines</option><option>railways</option><option>shipping</option>
                                <option>logistics</option><option>others</option>
                          </optgroup>
                          <optgroup label='Telecommunications'>
                                <option>Internet services</option><option>phone companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Entertainment'>
                                <option>Film</option><option>television</option><option>music</option>
                                <option>gaming</option><option>sports</option><option>others</option>
                          </optgroup>
                          <optgroup label='Real Estate'>
                                <option>Property sales</option><option>rentals</option><option>management</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Information Technology'>
                                <option>Software development</option><option>data processing</option><option>IT services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Research and Development'>
                                <option>Innovation</option><option>scientific research</option><option>product development</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Consultancy'>
                                <option>Professional advice in management</option><option>law</option><option>finance</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Media and Communication'>
                                <option>Publishing</option><option>broadcasting</option><option>online media</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Government'>
                                <option>Public administration</option><option>defense</option><option>public services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Non-Profit Organizations'>
                                <option>NGOs</option><option>charities</option><option>foundations</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education (Executive)'>
                                <option>High-level educational services</option><option>executive education</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='High-Level Decision-Making'>
                                <option>Top management roles in large organizations</option><option>think tanks</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Green Industry'>
                                <option>Renewable energy</option><option>environmental services</option><option>sustainability</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Biotechnology'>
                                <option>Genetic engineering</option><option>pharmaceuticals</option><option>life sciences</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Creative Industries'>
                                <option>Advertising</option><option>design</option><option>fashion</option><option>arts</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='E-commerce'>
                                <option>Online</option><option>retail</option><option>digital marketplaces</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Aerospace'>
                                <option>Aircraft manufacturing</option><option>space exploration</option><option>satellite services</option>
                                <option>others</option>
                          </optgroup>
                        </select>
                    </div>

                    
                    
                    <div className="col-md-8"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setdeveloper({...developer,descriptions:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">GST Number</label><input type="text" required="true" className="form-control form-control-sm" placeholder="enter gst no." onChange={(e)=>setdeveloper({...developer,gst_no:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,source:e.target.value})}>
                                    <option>Select</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,team:e.target.value})}>
                              <option>Select</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,owner:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    </div>
              </div>    
        </div> 

   {/*------------------------------------------------------------ basic details end---------------------------------------------------- */}
                  
  {/* -----------------------------------------address Details start------------------------------------------------------------------- */}

        <div className="col-md-12" id='profession' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
               
                <div className="row " >
              
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}> Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,area:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,location:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,pincode:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setdeveloper({...developer,state:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setdeveloper({...developer,country:e.target.value})}/></div>
                    </div>
                    
                    <div className='col-md-5'></div>
                    <div className="col-md-8"><label className="labels">Website</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setdeveloper({...developer,website:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-4"><label className="labels">Company Social-Media Page</label>
                    {
                      developer.company_social_media1.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                          onChange={(event)=>handlecompanysocialmediachange1(index,event)}>
                        
                        <option>select</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option>
                        </select>

                      ))
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Url</label>
                    {
                      developer.company_url1.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                        onChange={(event)=>handlecompanyurlchange1(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      developer.action33.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall33(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn33}>+</button></div>
                    <div className='col-md-12'><hr></hr></div> 
              </div>
            
             </div>
           </div>
 {/* ------------------------------------------------------professional Details end--------------------------------------------------------------  */}

 {/*-------------------------------------------------- employee details start--------------------------------------------------------- */}
 {/* <div className="col-md-12" id='otherdetails' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
               
                <div className="row " >
                <div className="col-md-8"><label className="labels" style={{fontSize:"16px"}}> Search Contact</label><input className='form-control form-control-sm' type='search' placeholder='enter name for search'/></div>
                <div className="col-md-1" ><label className="labels" style={{width:"150px"}}>Quick Add Contact</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}> Employee List</label></div>
                 
             </div>
         </div>
     </div> */}
                        <div className="col-md-12" id="otherdetails" style={{display:"none", marginTop:"-80px", lineHeight:"30px"}}>
                    <div className="p-3 py-5">
                        <div className="row">
                        <div className="col-md-9">
                            <label className="labels" style={{fontSize:"16px"}}>Search Contact</label>
                            <input className="form-control form-control-sm" id='searchcontact' type="search" placeholder="enter email or mobile no for search" onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-1">
                            <label className="labels" style={{fontSize:"16px",width:"150px"}}>Quick Add Contact</label>
                            <button className="form-control form-control-sm" onClick={handleShow1}>+</button>
                        </div>
                        <div className="col-md-10" style={{marginTop:"50px"}}>
                            <label className="labels" style={{fontSize:"16px", marginTop:"10px"}}>Employee List</label>
                        </div>
                        <div className="col-md-2" style={{marginTop:"50px"}}>
                            <label className="labels" style={{fontSize:"16px", marginTop:"10px"}}>Total Employee:</label>
                           <span style={{color:"green",fontWeight:"bold",fontSize:"20px"}}>{totalcontact}</span> 
                        </div>
                        <div className='col-md-12'><hr></hr></div>
                        <div className="row" style={{margin:"5px",padding:"10px"}}>
                        <div style={{marginLeft:"20px",marginTop:"10px",backgroundColor:"white"}}>
          <TableContainer component={Paper} style={{height:"400px",overflowY:"scroll"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
      <tbody>
        {
         
        data.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
             <img src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' alt='' style={{height:"30px"}}/>
             
            </StyledTableCell>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
              {item.title} {item.first_name} {item.last_name}<br></br>
              {item.designation}
            </StyledTableCell>
           
                <StyledTableCell >
                {item.mobile_no.join(',')}<br></br>
                {item.email.join(',')}
                </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>

    <Modal show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Quick Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
                    <div className="col-md-2"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
                              <option>Select</option>
                              <option>Mr.</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                        </div>
                    <div className="col-md-5"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-5"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
                </div>
                </div>
                <div className="row mt-3" id='basicdetails2'>
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
                        <option value={item} >phone</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                       contact.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                  <option>Select Type</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          onChange={(event)=>handleemail_typechange(index,event)}>
                                <option>Select Type</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall2(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                  <div className="col-md-5"><label className="labels">Designation</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,designation:e.target.value})}>
                    <option>Select</option>
                        <option>Developer</option>
                        <option>HR</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,company_name:e.target.value})}>
                    <option>Select</option>
                        <option>TCS</option>
                        <option>Microsoft</option>
                        <option>Others</option>
                        </select>
                    </div>
            </div>
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addcontact}>
                Add Contact
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

  </TableContainer>
   
      </div>
     </div>
     </div>
     </div>
 </div>

{/*-------------------------==================== employee details end --------------------==============================================*/}
                
 
    
                   
                   
                </div>
                <div className='row' style={{marginLeft:"50%",marginBottom:"20px"}}>
                    <div className="col-md-4" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    <div className="col-md-5" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Contact</button></div>
                    <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={adddeveloper}>Save</button></div>
                    </div>
            </div>
        </div>
        <ToastContainer/>
    </div>


);
}

export default Adddcompany;