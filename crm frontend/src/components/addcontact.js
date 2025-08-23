import {React, useState,useEffect} from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { event } from 'jquery'; 
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';


function Addcontact() {
  
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
    

    const navigate=useNavigate(); 
    const [contact,setcontact]=useState({title:"Mr.",first_name:"",last_name:"",country_code:['India +91'],mobile_no:[''],mobile_type:['Personal'],action1:[],
        email:[''],email_type:['Personal'],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

        profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"India +91",company_phone:"",
        company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"India",industry:"",company_social_media:[''],company_url:[''],action3:[],

        father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"India",gender:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
        social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[],relation:"" });
    
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
                Swal.fire({
                      icon:"success",
                      title: '🎉 Success!',
                      text:"Contact created successfully...",
                      html: `Contact created successfully...<br></br>
              <img src="https://cdn.vectorstock.com/i/500p/63/50/thumbs-up-smiley-face-icon-vector-10176350.jpg"
              alt="Thumbs up" 
                    width="80" 
                    style="margin-bottom: 0px;"/>`,
              width: '400px', // makes it small
              padding: '1.2em',
                      showConfirmButton: true,
                    }).then((result) => {
                    if (result.isConfirmed) {
                      navigate('/contactdetails');
                      }
                    })
               
            }
            
      
        } catch (error) {
          Swal.fire({
                title: 'Oops creating contact failed!',
                icon:"error",
                html: `
                  <img src="https://i.pinimg.com/originals/53/3f/f7/533ff77ef582abbfa00ccf9080137304.gif"
                      alt="Sad face" 
                      width="80" 
                      style="margin-bottom: 0px;" />
                  <p style="font-size: 14px; margin: 0;">
                    ${error.response?.data?.message || 'Something went wrong. Please try again.'}
                  </p>
                `,
                width: '400px', // makes it small
                padding: '1.2em',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#d33',
                background: '#fff',
                customClass: {
                  popup: 'small-swal',
                }
              });

        }
    }

    
    const professtiondetails = {
      profession_category: ["Govt. Employed", "Private Employee","Self Employed","Retired","Business Man","Student","House Wife"],
    
      profession_subcategory: {
        "Govt. Employed": ["Teacher", "Scientist","Doctor","Nurse","Clerk","Engineer","Accountant","Architect","Auditor","Police",
                            "Mechanic","Security","Driver","Officer","Peon","Chef","Pilot","IT Person","Analyst","Sales Person",
                            "Banker","Legal"],
        "Private Employee": ["Officer", "Accountant", "Human Resources (HR)", "Sales Person", "Manager", "IT Person", 
                                "Analyst", "Scientist", "Technicians", "Designer", "Author", "Videographer", "Director", 
                                "Telle Caller", "Legel", "Executive Officer", "Operators", "Security", "Journalists", 
                                "Doctor", "Nurse", "Teacher", "Facility", "Driver", "Contractor", "Consultant", "Chef", 
                                "Artist", "Engineer", "Banker", "Legal", "Clerk", "Architect", "Auditor", "Mechanic", 
                                "Peon", "Pilot"],
      
        "Self Employed": ["Designer", "Photographer","Videographer","Independent Artist","Illustrator","Writer","Digital Content Creator",
                          "Social Media Influencer","Podcaster","Music Producer","Management Consultant","Financial Advisor","IT Consultant",
                          "Business Strategist","Marketing Consultant","Life Coach","Career Counselor","Freelance Software Developer","Web Developer",
                          "Data Analyst","App Developer","UX/UI Designer","Cybersecurity Consultant","Private Practitioner (Doctor)","Physiotherapist",
                          "Dietitian or Nutritionist","Yoga Instructor","Personal Trainer","Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)",
                          "Private Tutor","Test Preparation Coach","Online Educator","Language Trainer","Corporate Trainer","Independent Lawyer",
                          "Chartered Accountant (CA)","Tax Consultant","Auditor","Financial Planner","Tailor","Carpenter","Blacksmith",
                          "Jewelry Maker","Ceramic Artist","Real Estate Agent","Broker","Sales Representative","Freelance Chef","Event Planner",
                          "Makeup Artist","Hairstylist","Wedding Photographer","Independent Farmer","Organic Produce Supplier","Horticulturist"],
        
        Retired: ["Teacher", "Scientist", "Doctor", "Nurse", "Clerk", "Engineer", "Accountant", "Architect", "Auditor", "Police",
                  "Mechanic", "Security", "Driver", "Officer", "Peon", "Chef", "Pilot", "IT Person", "Analyst", "Sales Person", "Banker",
                  "Legal", "Manager", "Operators", "Human Resources (HR)", "Freelance Graphic Designer", "Photographer", "Videographer",
                  "Independent Artist", "Illustrator", "Writer (Author, Blogger, or Copywriter)", "Digital Content Creator", "Social Media Influencer",
                  "Podcaster", "Music Producer", "Management Consultant", "Financial Advisor", "IT Consultant", "Business Strategist", "Marketing Consultant",
                  "Life Coach", "Career Counselor", "Freelance Software Developer", "Web Developer", "Data Analyst", "App Developer", "UX/UI Designer",
                  "Cybersecurity Consultant", "Private Practitioner (Doctor)", "Physiotherapist", "Dietitian or Nutritionist", "Yoga Instructor",
                  "Personal Trainer", "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)", "Private Tutor", "Test Preparation Coach",
                  "Online Educator", "Language Trainer", "Corporate Trainer", "Independent Lawyer", "Chartered Accountant (CA)", "Tax Consultant",
                  "Auditor", "Financial Planner", "Tailor", "Carpenter", "Blacksmith", "Jewelry Maker", "Ceramic Artist", "Real Estate Agent",
                  "Property Consultant", "Broker", "Sales Representative", "Freelance Chef", "Event Planner", "Makeup Artist", "Hairstylist",
                  "Wedding Photographer", "Independent Farmer", "Organic Produce Supplier", "Horticulturist"
        ],
    
        Student:["Investor"],
    
        "House Wife":["Investor"],
        
        "Business Man": ["Entrepreneurs", "Start-up Founders", "Retailer", "Wholesaler", "Importer/Exporter", "Distributor", "Trader",
                          "Real Estate Developer", "Real Estate Investor", "Real Estate Agent", "Manufacturer", "Industrialist", "Financer",
                          "Stock Trader", "Hotel Owner", "Resort Owner", "Travel Agency", "Restaurant Owner", "Agriculturist", "Dairy Business Owner",
                          "IT Person", "Coaching Centre Owner", "Training Institute Owner", "Online Tutor", "Private Tutor", "Hospital Owner",
                          "Wellness Centre Owner", "Fitness Centre Owner", "Advertising Agency Owner", "Film Producer", "Media House Owner",
                          "Designer", "Transporter", "Courier Servicer", "Renewable Energy and Environment", "Boutique", "Salon Owner",
                          "Security Service Provider", "Legal Firm Owner", "Digital Business", "Infrastructure Developer", "Poultry Farm Owner",
                          "Handicrafts Business Owner", "Investment Banker", "Loan Consultant", "IT Company Owner", "Cloud Service Provider",
                          "Emigration", "Catering", "Baker", "Car Dealership Owner", "Bike Dealership Owner", "Bike Rental Business Owner",
                          "Workshop Owner", "Environmental Consultant", "Cold Storage Business Owner", "Film Studio Owner", "Sports Organizer",
                          "Event Organizer", "Cloth Merchant"
        ]
        
      },
      designation: {
        Teacher: ["Primary Teacher (PRT)","Trained Graduate Teacher (TGT)","Post Graduate Teacher (PGT)","Assistant Professor",
                  "Professor","Principal","Education Officer","Laboratory Technicians","Corporate Trainers","E-learning Specialists",
                  "Academic Counselors","Kindergarten Teacher","Subject Teacher","Senior Educator","Head of Department"],
        Scientist: ["Junior Scientist","Scientist B/C/D","Senior Scientist","Chief Scientist","Director","Data Scientists",
                    "Research Scientists","Product Developers","Research Associate","Senior Research Scientist","Lead Scientist"],
        Doctor: ["Doctors","Medical Officer (MO)","Senior Medical Officer (SMO)","Specialist Doctor","Chief Medical Officer (CMO)","Director of Health Services",
                "Physical Therapists","Dietitians","Resident Doctor","Consultant","Senior Specialist","Medical Director"],
        Nurse:["Nurses","Auxiliary Nurse Midwife (ANM)","Staff Nurse","Nursing Superintendent","Chief Nursing Officer","Staff Nurse",
                "Charge Nurse","Nursing Director"],
        Clerk:["Lower Division Clerk (LDC)","Upper Division Clerk (UDC)","Assistant Section Officer (ASO)","Section Officer (SO)",
                "Data Entry Clerk","Office Assistant","Administrative Clerk"],
        Engineer:["Junior Engineer (JE)","Assistant Engineer (AE)","Executive Engineer (EE)","Chief Engineer",],
        Accountant:["Junior Accountant","Senior Accountant","Accounts Officer","Senior Accounts Officer","Controller of Accounts",
                    "Accountants","Payroll Specialists","Tax Consultants","Junior Accountant","Senior Accountant","Finance Controller",
                    "Chief Financial Officer (CFO)","Accountants", "Financial Analysts","Auditors","Payroll Specialists","Tax Consultants"],
        Architect:["Assistant Architect","Architect","Senior Architect","Chief Architect","Architectural Intern","Project Architect",
                    "Design Director"],
        Auditor:["Junior Auditor","Senior Auditor","Audit Officer","Senior Audit Officer","Principal Auditor","Auditors","Internal Auditor",
                  "Risk Auditor","Audit Manager"],
        Police:["Constable","Head Constable","Assistant Sub-Inspector (ASI)","Sub-Inspector (SI)","Inspector","Deputy Superintendent of Police (DSP)",
                "Superintendent of Police (SP)","Inspector General of Police (IGP)","Director General of Police (DGP)"],
        Mechanic:["Junior Mechanic","Senior Mechanic","Workshop Superintendent","Service Technician","Workshop Supervisor"],
        Security:["Security Guard","Security Supervisor","Security Officer","Chief Security Officer","Safety Officers"],
        Driver:["Driver (Light/Heavy Vehicle)","Senior Driver","Motor Vehicle Inspector","Drivers","Delivery Agents","Company Driver",
                "Heavy Vehicle Driver","Personal Driver"],
        Officer:["Probationary Officer (PO)","Administrative Officer","Gazetted Officer (Class A, B, C)","Deputy Secretary",
                "Under Secretary","Joint Secretary","Secretary","Administrative Assistants","Chief Executive Officer (CEO)",
                "Chief Financial Officer (CFO)","Chief Operating Officer (COO)","Vice Presidents (VPs)","Directors","Entrepreneurs",
              "Administrative Assistants","Office Managers","Executive Assistants","Receptionists","PData Entry Operators"],
        Peon:["Office Attendant","Multi-Tasking Staff (MTS)","Office Helper","Support Staff"],
        Chef:["Cook","Head Cook","Catering Supervisor","Chefs","Commis Chef","Sous Chef","Executive Chef"],
        Pilot:["Commercial Pilot","Helicopter Pilot","Fighter Pilot","Co-Pilot","Chief Pilot"],
        "IT Person":["Junior Programmer","Software Developer","Software Engineer","Senior Software Engineer","IT Officer",
                    "Software Developers","System Administrators","IT Support Specialists","Junior Developer","Full Stack Developer"
                    ],
        "Sales Person":["Sales Assistant","Sales Supervisor","Marketing Executive","Sales Executives","Sales Associate","Sales Manager"],
        Analyst:["Data Analyst","Research Analyst","Financial Analyst","System Analyst","Intelligence Analyst","Financial Analysts",
                  "Cybersecurity Analysts","Supply Chain Analysts","Business Analyst","Senior Analyst","Supply Chain Analysts","Quality Inspector"],
        Banker:["Bank Clerk","Senior Clerk","Probationary Officer (PO)","Assistant Manager","Branch Manager","Regional Manager",
                "Chief Manager","Assistant General Manager (AGM)","General Manager (GM)","Managing Director (MD)","Relationship Manager",
                "Loan Officer","Branch Manager","Investment Analyst"],
        Legal:["Civil Judge (Junior Division)","Civil Judge (Senior Division)","District Judge","High Court Judge","Supreme Court Judge",
                "Chief Justice","Legal Officer","Public Prosecutor","Solicitor General","Legal Advisors","Compliance Officers",
                "Contract Specialists","Risk Managers","Legal Associate","Corporate Lawyer","Compliance Manager","Legal Consultant",
              ],
    
        Designer:["Proprietor","Graphic Designers","UX/UI Designers","Instructional Designers","Freelance Designers/Writers",
                  "Senior Designer","Creative Director"], Photographer:["Proprietor"],Videographer:["Proprietor","Video Editors"],"Independent Artist":["Proprietor"],
        Illustrator:["Proprietor"],Writer:["Proprietor"],"Digital Content Creator":["Proprietor"],"Social Media Influencer":["Proprietor"],
        Podcaster:["Proprietor"],"Music Producer":["Proprietor"],"Management Consultant":["Proprietor"],"Financial Advisor":["Proprietor"],
        "IT Consultant":["Proprietor"],"Business Strategist":["Proprietor"],"Marketing Consultant":["Proprietor"],"Life Coach":["Proprietor"],
        "Career Counselor":["Proprietor"],"Freelance Software Developer":["Proprietor"],"Web Developer":["Proprietor"],"Data Analyst":["Proprietor"],
        "App Developer":["Proprietor"],"UX/UI Designer":["Proprietor"],"Cybersecurity Consultant":["Proprietor"],"Private Practitioner (Doctor)":["Proprietor"],
        Physiotherapist:["Proprietor"],"Dietitian or Nutritionist":["Proprietor"],"Yoga Instructor":["Proprietor"],"Personal Trainer":["Proprietor"],
        "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)":["Proprietor"],"Private Tutor":["Proprietor"],"Test Preparation Coach":["Proprietor"],
        "Online Educator":["Proprietor"],"Language Trainer":["Proprietor"],"Corporate Trainer":["Proprietor"],"Independent Lawyer":["Proprietor"],
        "Chartered Accountant (CA)":["Proprietor"],"Tax Consultant":["Proprietor"],"Auditor":["Proprietor"],"Financial Planner":["Proprietor"],
        "Tailor":["Proprietor"],"Carpenter":["Proprietor"],"Blacksmith":["Proprietor"],"Jewelry Maker":["Proprietor"],"Ceramic Artist":["Proprietor"],
        "Real Estate Agent":["Proprietor"],"Broker":["Proprietor"],"Sales Representative":["Proprietor"],"Freelance Chef":["Proprietor"],
        "Event Planner":["Proprietor"],"Makeup Artist":["Proprietor"],"Hairstylist":["Proprietor"],"Wedding Photographer":["Proprietor"],
        "Independent Farmer":["Proprietor"],"Organic Produce Supplier":["Proprietor"],"Horticulturist":["Proprietor"],
    
        "Software Developer":["Software Developer"],
        Manager:[],
        Operators:["Data Entry Operators","Operations Managers","Machine Operators"],
        "Human Resources (HR)":["HR Executives","Talent Acquisition Specialists","Employee Relations Managers","Training and Development Specialists",
                                "HR Business Partners","HR Executives","Talent Acquisition Specialists","Employee Relations Managers","Training and Development Specialists","HR Business Partners"],
        Manager:["Marketing Managers","Brand Managers","Business Development Managers","Digital Marketing Specialists",
                  "Logistics Coordinators","Procurement Specialists","Inventory Managers","Client Relationship Managers","Social Media Managers",
                  "Event Planners","Facility Managers","Hotel Managers","Front Desk Executives","Event Coordinators","Start-up Employees",
                  "Team Manager","Operations Manager","General Manager","Operations Managers","Logistics Coordinators","Procurement Specialists",
                  "Inventory Managers","Innovation Managers","Customer Support Executives","Sales Manager","Public Relations Specialists",
                "Office Managers","Executive Assistants","Receptionists","Innovation Managers","Customer Support Executives",
                  "Plant Managers","Quality Inspectors","Fleet Managers","Marketing Managers","Brand Managers","Business Development Managers","Digital Marketing Specialists"],
        Author:["Content Writers","Editors"],
        Director:["Art Directors"],
        "Tele Caller":["Call Center Agents"],
        Technicians:["Technical Support Specialists","Maintenance Technicians","Lab Technicians","Technical Lead","Laboratory Technicians"],
        Jounalists:["Journalists","Public Relations Specialists"],
        Hospitality:["Housekeeping Staff"],
        Contractor:["Independent Contractors"],
        Consultant:["Management Consultants"],
        Artist:["Creative Artists","Musicians"],
        Engineer:["Junior Engineer","Project Engineer","Senior Engineer","Engineering Manager"],
        "Freelance Graphic Designer":["Proprietor"],Photographer:["Proprietor"],Videographer:["Proprietor"],"Independent Artist":["Proprietor"],
        Illustrator:["Proprietor"],"Writer (Author, Blogger, or Copywriter)":["Proprietor"],"Digital Content Creator":["Proprietor"],
        "Social Media Influencer":["Proprietor"],Podcaster:["Proprietor"],"Music Producer":["Proprietor"],"Management Consultant":["Proprietor"],
        "Financial Advisor":["Proprietor"],"IT Consultant":["Proprietor"],"Business Strategist":["Proprietor"],"Marketing Consultant":["Proprietor"],
        "Life Coach":["Proprietor"],"Career Counselor":["Proprietor"],"Freelance Software Developer":["Proprietor"],"Web Developer":["Proprietor"],
        "Data Analyst":["Proprietor"],"App Developer":["Proprietor"],"UX/UI Designer":["Proprietor"],"Cybersecurity Consultant":["Proprietor"],
        "Private Practitioner (Doctor)":["Proprietor"],Physiotherapist:["Proprietor"],"Dietitian or Nutritionist":["Proprietor"],
        "Yoga Instructor":["Proprietor"],"Personal Trainer":["Proprietor"],"Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)":["Proprietor"],
        "Private Tutor":["Proprietor"],"Test Preparation Coach":["Proprietor"],"Online Educator":["Proprietor"],"Language Trainer":["Proprietor"],
        "Corporate Trainer":["Proprietor"],"Independent Lawyer":["Proprietor"],"Chartered Accountant (CA)":["Proprietor"],"Tax Consultant":["Proprietor"],
        Auditor:["Proprietor","Internal Auditor","Risk Auditor","Audit Manager"],"Financial Planner":["Proprietor"],Tailor:["Proprietor"],Carpenter:["Proprietor"],Blacksmith:["Proprietor"],
        "Jewelry Maker":["Proprietor"],"Ceramic Artist":["Proprietor"],"Real Estate Agent":["Proprietor"],"Property Consultant":["Proprietor"],
        Broker:["Proprietor"],"Sales Representative":["Proprietor"],"Freelance Chef":["Proprietor"],"Event Planner":["Proprietor"],
        "Makeup Artist":["Proprietor"],Hairstylist:["Proprietor"],"Wedding Photographer":["Proprietor"],"Independent Farmer":["Proprietor"],
        "Organic Produce Supplier":["Proprietor"],Horticulturist:["Proprietor"],
        Investor:["Angel Investor", "Venture Capitalist", "Portfolio Manager"],
        Entrepreneurs:["Founder", "Co-Founder", "CEO", "Managing Director"],
        "Start-up Founders":["Founder", "Co-Founder, CEO", "Visionary Leader"],
        Retailer:["Shop Owner", "Retail Manager", "Proprietor", "Franchise Owner"],
        Wholesaler:["Wholesale Business Owner", "Distribution Head", "Supply Chain Owner"],
        "Importer/Exporter":["Import/Export Manager", "Trade Consultant", "Supply Chain Owner"],
        Distributor:["Chief Trading Officer", "Trading Business Owner", "Independent Trader"],
        Trader:["Wholesale Business Owner", "Distribution Head", "Supply Chain Owner"],
        "Real Estate Developer":["Real Estate Developer", "Managing Partner", "Property Consultant"],
        "Real Eastate Investor":["Property Investor", "Real Estate Strategist", "Investment Manager"],
        "Real Estate Agent":["Real Estate Consultant", "Real Estate Advisor", "Realtor"],
        Manufacturer:["Factory Owner", "Production Head", "Chief Manufacturing Officer"],
        Industrialist:["Business Tycoon", "Industry Leader", "Managing Director"],
        Financer:["Chief Financial Officer (CFO)", "Financial Advisor", "Investment Consultant"],
        "Stock Trader":["Equity Investor", "Day Trader", "Portfolio Manager"],
        "Hotel Owner":["Hospitality Owner", "General Manager (GM)", "Managing Director"],
        "Resort Owner":["Resort Manager", "Owner and Operator", "Hospitality Director"],
        "Travel Agency":["Travel Consultant", "Tourism Business Owner", "Founder"],
        "Restaurant Owner":["Restaurant Manager", "Food Entrepreneur", "Culinary Director"],
        Agriculturist:["Farm Owner", "Agriculture Consultant", "Rural Entrepreneur"],
        "Dairy Business Owner":["Dairy Farmer", "Milk Processing Entrepreneur", "Managing Partner"],
        "IT Person":["IT Consultant", "Software Solutions Owner","IT Entrepreneur","Software Developers","System Administrators",
                    "IT Support Specialists","Data Scientists","Cybersecurity Analysts","Junior Developer","Full Stack Developer",
                    "Senior Software Engineer","Technical Lead"],
        "Coaching Centre Owner":["Education Entrepreneur", "Coaching Director", "Academic Manager"],
        "Training Institute Owner":["Training Consultant", "Institute Director", "Founder"],
        "Online Tutor":["Founder and Educator", "Academic Content Creator"],
        "Private Tutor":["Independent Tutor", "Education Consultant"],
        "Hospital Owner":["Healthcare Entrepreneur", "Medical Director", "Hospital Administrator"],
        "Wellness Centre Owner":["Wellness Consultant", "Health and Fitness Director", "Gym Owner"],
        "Fitness Centre Owner":["Gym Owner", "Fitness Director", "Health Entrepreneur"],
        "Advertising Agency Owner":["Creative Director", "Marketing Strategist", "Founder"],
        "Film Producer":["Producer", "Film Studio Owner", "Creative Producer"],
        "Media House Owner":["Media Entrepreneur","Chief Editor", "Publisher"],
        Designer:	["Creative Director", "Fashion Entrepreneur"],
        Transporter:	["Logistics Manager", "Transport Business Owner"],
        "Courier Servicer":["Courier Business Owner", "Operations Manager"],
        "Renewable Energy and Environment":["Renewable Energy Consultant", "Sustainable Entrepreneur"],
        Boutique:["Fashion Boutique Owner", "Creative Head"],
        "Salon Owner":["Salon Manager", "Beauty Entrepreneur"],
        "Security Service Provider":["Security Agency Owner", "Operations Head"],
        "Legal Firm Owner":["Advocate and Owner", "Managing Partner"],
        "Digital Business":["Founder", "Digital Marketing Consultant"],
        "Infrastructure Developer":["Real Estate Developer", "Project Consultant"],
        Agriculturist:["Agribusiness Entrepreneur", "Food Processing Director"],
        "Poultry Farm Owner":	["Poultry Business Owner", "Farm Manager"],
        "Handicrafts Business Owner":["Artisan Entrepreneur", "Creative Entrepreneur"],
        "Investment Banker":["Investment Advisor", "Wealth Manager"],
        "Loan Cosultant":	["Financial Consultant", "Loan Advisor"],
        "IT Company Owner":["IT Entrepreneur", "Chief Technology Officer (CTO)"],
        "Cloud Service Provider":["Cloud Solutions Architect", "IT Entrepreneur"],
        Emigration:	["Immigration Consultant", "Visa Solutions Provider"],
        Catering:	["Catering Business Owner", "Culinary Director"],
        Baker:["Bakery Owner", "Culinary Entrepreneur"],
        "Car Dealership Owner":["Dealership Manager", "Auto Entrepreneur"],
        "Bike Dealership Owner":	["Franchise Owner"],
        "Bike Rental Business Owner":["Rental Business Owner", "Operations Head"],
        "Workshop Owner":["Mechanic Entrepreneur", "Service Manager"],
        "Environmental Consultant":["Sustainability Consultant", "Environmental Advisor"],
        "Cold Storage Business Owner":["Logistics Entrepreneur", "Warehouse Manager"],
        "Film Studio Owner":	["Film Producer", "Studio Head"],
        "Sports Organizer":	["Event Manager", "Sports Entrepreneur"],
        "Event Organizer":	["Founder, Director", "Creative Planner"],
        "Cloth Merchant":	["Textile Business Owner", "Retail Manager"],
        ExecutiveOfficer:["Chief Executive Officer (CEO)","Entrepreneurs","Chief Financial Officer (CFO)","Chief Operating Officer (COO)","Vice Presidents (VPs)","Directors",],
        Facility:["Housekeeping Staff"]
    
    
      },
    };
    
    const [availableSubcategories, setAvailableSubcategories] = useState([]);
    const [availableDesignations, setAvailableDesignations] = useState([]);
    
    // Handle profession category change
    const handleProfessionCategoryChange = (event) => {
      const selectedCategory = event.target.value;
    
      setcontact((prevLead) => ({
        ...prevLead,
        profession_category: selectedCategory,
        profession_subcategory: "", // Reset subcategory when category changes
        designation: "", // Reset designation when category changes
      }));
    
      // Update available subcategories based on selected profession category
      setAvailableSubcategories(professtiondetails.profession_subcategory[selectedCategory] || []);
    };
    
    // Handle profession subcategory change
    const handleProfessionSubcategoryChange = (event) => {
      const selectedSubcategory = event.target.value;
    
      setcontact((prevLead) => ({
        ...prevLead,
        profession_subcategory: selectedSubcategory,
        designation: "", // Reset designation when subcategory changes
      }));
    
      // Update available designations based on selected profession subcategory
      setAvailableDesignations(professtiondetails.designation[selectedSubcategory] || []);
    };
    
    // Handle designation change
    const handleDesignationChange = (event) => {
      const selectedDesignation = event.target.value;
    
      setcontact((prevLead) => ({
        ...prevLead,
        designation: selectedDesignation,
      }));
    };
    

    useEffect(()=>{fetchcdata()},[])

    const[cdata,setcdata]=useState([]);
    const[totalcompany,settotalcompany]=useState()
    const fetchcdata=async(event)=>
    {
      
      try {
        const resp=await api.get('viewcompany')
        setcdata(resp.data.developer)
        const countcompany=Array.isArray(resp.data.developer) ? resp.data.developer : [resp.data.developer]
        settotalcompany(countcompany.length)
        // setFilteredData(countcontact);
      } catch (error) {
        console.log(error);
      }
    
    }
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
            document.getElementById("basicdetails2").style.display="flex"
            document.getElementById("basic").style.color="green"
            document.getElementById("other").style.color="black"
            //  document.getElementById("professional").style.color="black"
            document.getElementById("otherdetails").style.display="none"
            // document.getElementById("profession").style.display="none"
          }
          // const professionaldetails=()=>
          //   {
          //     document.getElementById("basicdetails1").style.display="none"
          //     document.getElementById("basicdetails2").style.display="none"
          //     document.getElementById("otherdetails").style.display="none"
          //     document.getElementById("profession").style.display="flex"
          //      document.getElementById("basic").style.color="black"
          //      document.getElementById("other").style.color="black"
          //        document.getElementById("professional").style.color="green"
               
          //   }
          const otherdetails=()=>
            {
              document.getElementById("basicdetails1").style.display="none"
              document.getElementById("basicdetails2").style.display="none"
              //  document.getElementById("profession").style.display="none"
                 document.getElementById("otherdetails").style.display="flex"
               document.getElementById("basic").style.color="black"
                // document.getElementById("professional").style.color="black"
               document.getElementById("other").style.color="green"
            }
          
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

              function addFn3() {
     
                setcontact({
                  ...contact,
                  company_social_media: [...contact.company_social_media, ''],
                  company_url: [...contact.company_url, ''],
                  action3: [...contact.action3, '']
                });
              };
              const deleteall3=(index)=>
                {
                 
                  const newcomapnysocialmedia = contact.company_social_media.filter((_, i) => i !== index);
                  const newcompanyurl = contact.company_url.filter((_, i) => i !== index);
                  const newaction3=contact.action3.filter((_,i) => i !== index);
                  
                  setcontact({
                    ...contact,
                    company_social_media: newcomapnysocialmedia,
                    company_url: newcompanyurl,
                    action3:newaction3
                  });
                }
                const handlecompanysocialmediachange = (index, event) => {
                  const newcomapnysocialmedia = [...contact.company_social_media];
                  newcomapnysocialmedia[index] = event.target.value;
                  setcontact({
                    ...contact,
                    company_social_media: newcomapnysocialmedia
                  });
                };
                const handlecompanyurlchange = (index, event) => {
                  const newcompanyurl = [...contact.company_url];
                  newcompanyurl[index] = event.target.value;
                  setcontact({
                    ...contact,
                    company_url: newcompanyurl
                  });
                };
          
              
                function addFn4() {
     
                  setcontact({
                    ...contact,
                    education: [...contact.education, ''],
                    degree: [...contact.degree, ''],
                    school_college: [...contact.school_college, ''],
                    action4: [...contact.action4, '']
                  });
                };
                const deleteall4=(index)=>
                  {
                   
                    const neweducation = contact.education.filter((_, i) => i !== index);
                    const newdegree = contact.degree.filter((_, i) => i !== index);
                    const newschool_college = contact.school_college.filter((_, i) => i !== index);
                    const newaction4=contact.action4.filter((_,i) => i !== index);
                    
                    setcontact({
                      ...contact,
                      education: neweducation,
                      degree: newdegree,
                      school_college: newschool_college,
                      action4:newaction4
                    });
                  }
                  const handleeducationChange = (index, event) => {
                    const neweducation = [...contact.education];
                    neweducation[index] = event.target.value;
                    setcontact({
                      ...contact,
                      education: neweducation
                    });
                  };
                  const handledegreeChange = (index, event) => {
                    const newdegree = [...contact.degree];
                    newdegree[index] = event.target.value;
                    setcontact({
                      ...contact,
                      degree: newdegree
                    });
                  };
            
                  const handleschool_collegeChange = (index, event) => {
                    const newschool = [...contact.school_college];
                    newschool[index] = event.target.value;
                    setcontact({
                      ...contact,
                      school_college: newschool
                    });
                  };

                function addFn5() {
        
                  setcontact({
                    ...contact,
                    loan: [...contact.loan, ''],
                    bank: [...contact.bank, ''],
                    amount: [...contact.amount, ''],
                    action5: [...contact.action5, '']
                  });
                };
                const deleteall5=(index)=>
                  {
                   
                    const newloan = contact.loan.filter((_, i) => i !== index);
                    const newbank = contact.bank.filter((_, i) => i !== index);
                    const newamount = contact.amount.filter((_, i) => i !== index);
                    const newaction5=contact.action5.filter((_,i) => i !== index);
                    
                    setcontact({
                      ...contact,
                      loan: newloan,
                      bank: newbank,
                      amount: newamount,
                      action5:newaction5
                    });
                  }
                  const handleloanchange = (index, event) => {
                    const newloan = [...contact.loan];
                    newloan[index] = event.target.value;
                    setcontact({
                      ...contact,
                      loan: newloan
                    });
                  };
                  const handlebankchange = (index, event) => {
                    const newbank = [...contact.bank];
                    newbank[index] = event.target.value;
                    setcontact({
                      ...contact,
                      bank: newbank
                    });
                  };
                  const handleamountchange = (index, event) => {
                    const newamount = [...contact.amount];
                    newamount[index] = event.target.value;
                    setcontact({
                      ...contact,
                      amount: newamount
                    });
                  };

                  function addFn6() {
        
                    setcontact({
                      ...contact,
                      social_media: [...contact.social_media, ''],
                      url: [...contact.url, ''],
                      action6: [...contact.action6, '']
                    });
                  };
                  const deleteall6=(index)=>
                    {
                     
                      const newsocial_media = contact.social_media.filter((_, i) => i !== index);
                      const newurl = contact.url.filter((_, i) => i !== index);
                      const newaction6=contact.action6.filter((_,i) => i !== index);
                      
                      setcontact({
                        ...contact,
                        social_media: newsocial_media,
                        url: newurl,
                        action6:newaction6
                      });
                    }
                    const handlesocial_mediachange = (index, event) => {
                      const newsocial_media = [...contact.social_media];
                      newsocial_media[index] = event.target.value;
                      setcontact({
                        ...contact,
                        social_media: newsocial_media
                      });
                    };
                    const handleurlChange = (index, event) => {
                      const newurl = [...contact.url];
                      newurl[index] = event.target.value;
                      setcontact({
                        ...contact,
                        url: newurl
                      });
                    };

                    function addFn7() {
        
                      setcontact({
                        ...contact,
                        income: [...contact.income, ''],
                        amount1: [...contact.amount1, ''],
                        action7: [...contact.action7, '']
                      });
                    };
                    const deleteall7=(index)=>
                      {
                       
                        const newincome = contact.income.filter((_, i) => i !== index);
                        const newamount1 = contact.amount1.filter((_, i) => i !== index);
                        const newaction7=contact.action7.filter((_,i) => i !== index);
                        
                        setcontact({
                          ...contact,
                          income: newincome,
                          amount1: newamount1,
                          action7:newaction7
                        });
                      }
                      const handleincomechange = (index, event) => {
                        const newincome = [...contact.income];
                        newincome[index] = event.target.value;
                        setcontact({
                          ...contact,
                          income: newincome
                        });
                      };
                      const handleamount1change = (index, event) => {
                        const newamount1 = [...contact.amount1];
                        newamount1[index] = event.target.value;
                        setcontact({
                          ...contact,
                          amount1: newamount1
                        });
                      };

                      function addFn8() {
        
                        setcontact({
                          ...contact,
                          document_no: [...contact.document_no, ''],
                          document_name: [...contact.document_name, ''],
                          document_pic: [...contact.document_pic, ''],
                          action8: [...contact.action8, '']
                        });
                      };
                      const deleteall8=(index)=>
                        {
                         
                          const newdocumentno = contact.document_no.filter((_, i) => i !== index);
                          const newdocumentname = contact.document_name.filter((_, i) => i !== index);
                          const newdocumentpic = contact.document_pic.filter((_, i) => i !== index);
                          const newaction8=contact.action8.filter((_,i) => i !== index);
                          
                          setcontact({
                            ...contact,
                            document_no: newdocumentno,
                            document_name: newdocumentname,
                            document_pic: newdocumentpic,
                            action8:newaction8
                          });
                        }
                        const handledocumentnochange = (index, event) => {
                          const newdocumentno = [...contact.document_no];
                          newdocumentno[index] = event.target.value;
                          setcontact({
                            ...contact,
                            document_no: newdocumentno
                          });
                        };
                        const handledocumentnamechange = (index, event) => {
                          const newdocumentname = [...contact.document_name];
                          newdocumentname[index] = event.target.value;
                          setcontact({
                            ...contact,
                            document_name: newdocumentname
                          });
                        };
                        const handledocumentpicchange = (index, event) => {
                          const newdocumentpic = [...contact.document_pic];
                          const files = Array.from(event.target.files);
                         newdocumentpic[index] = files.map(file => ({
                          file,
                          preview: URL.createObjectURL(file)
                        }));

                          setcontact({
                            ...contact,
                            document_pic: newdocumentpic
                          });
                        };
                  
                        const [isChecked, setIsChecked] = useState(false);

                        const handleCheckboxChange = (event) => {
                          setIsChecked(event.target.checked);
                        };

                         
  function next1()
  {
      document.getElementById("basicdetails1").style.display="none";
      document.getElementById("basicdetails2").style.display="none";
      document.getElementById("otherdetails").style.display="flex";

      document.getElementById("other").style.color="green";
      document.getElementById("basic").style.color="black";

   
  }
  // function next2()
  // {

  //     document.getElementById("profession").style.display="none";
  //     document.getElementById("otherdetails").style.display="flex";

  //     document.getElementById("professional").style.color="black";
  //     document.getElementById("other").style.color="green";

   
  // }

  // function prev1()
  // {
  //   document.getElementById("basicdetails1").style.display="flex";
  //   document.getElementById("basicdetails2").style.display="flex";
  //   document.getElementById("profession").style.display="none";

  //   document.getElementById("professional").style.color="black";
  //   document.getElementById("basic").style.color="green";
     
  // }
  function prev2()
  {
    document.getElementById("basicdetails1").style.display="flex";
    document.getElementById("basicdetails2").style.display="flex";
    document.getElementById("otherdetails").style.display="none";

    document.getElementById("basic").style.color="green";
    document.getElementById("other").style.color="black";
     
  }

      const statesAndCities = {
                      AndhraPradesh: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
                      ArunachalPradesh: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
                      Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
                      Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
                      Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
                      Goa: ["North Goa", "South Goa"],
                      Gujarat: ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
                      Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Narnaul", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
                      HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
                      Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
                      Karnataka: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
                      Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kottayam", "Kollam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
                      MadhyaPradesh: ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Rajgarh", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
                      Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
                      Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
                      Meghalaya: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "West Garo Hills", "West Khasi Hills"],
                      Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
                      Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
                      Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam", "Gajapati", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
                      Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawan Shehar", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Sri Muktsar Sahib"],
                      Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"],
                      Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
                      TamilNadu: ["Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "The Nilgiris", "Thoothukudi", "Tiruvallur", "Tirunelveli", "Tirupur", "Vellore", "Viluppuram", "Virudhunagar"],
                      Telangana: ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nalgonda", "Nagarkurnool", "Nirmal", "Nizamabad", "Peddapalli", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Khammam", "Kothagudem"],
                      Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
                      UttarPradesh: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar","Noida", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shrawasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
                      WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"],
                      "Andaman And Nicobar Islands": ["Port Blair", "Car Nicobar", "Mayabunder", "Diglipur", "Rangat"],
                      Chandigarh: ["Chandigarh"],
                      "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
                      "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Doda", "Gulmarg", "Kathua", "Poonch", "Rajouri", "Udhampur"],
                      Ladakh: ["Leh", "Kargil"],
                      Lakshadweep: ["Kavaratti", "Andrott", "Kalapeni", "Minicoy", "Agatti", "Kadmat", "Chetlat"],
                      Puducherry: ["Puducherry", "Karaikal","Mahe","Yanam"],
                    };
  

  const states = Object.keys(statesAndCities);
  const cities = statesAndCities[contact.state1] || [];


  const asianCountries = [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", 
    "Brunei", "Burma (Myanmar)", "Cambodia", "China", "Cyprus", "Georgia", 
    "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", 
    "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", 
    "Maldives", "Mongolia", "Nepal", "North Korea", "Oman", "Pakistan", 
    "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", 
    "South Korea", "Sri Lanka", "Syria", "Tajikistan", "Thailand", 
    "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", 
    "Vietnam", "Yemen"
  ];
  const ownersList = [
    'Suraj',
    'Suresh Kumar',
    'Ramesh Singh',
    'Maanav Sharma',
    'Sukram'
];

const [owners, setOwners] = useState([]);

const handleOwnerChange = (event) => {
  const {
      target: { value },
  } = event;

  const selectedOwners = typeof value === 'string' ? value.split(',') : value;

  setOwners(selectedOwners);
  setcontact({ ...contact, owner: selectedOwners });
};
    return ( 
        <div>
            <div id='h'><Header1/></div>
            <div onMouseOver={mousehover} onMouseOut={mouseout}><Sidebar1/></div>
           
           <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-5" style={{width:"70%",marginLeft:"250px"}}>
    <div className="row" id='r' style={{transition:"0.5s"}}>
        <div className="col-md-12 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Add Contact</h4>
                    <input type='checkbox' id='checkform'  style={{marginLeft:"60%",height:"20px",width:"20px"}}  checked={isChecked} 
                    onChange={handleCheckboxChange}  />
                    <label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               

                <div id='sortform' style={{display: isChecked ? "flex" : "none"}}>
               <div className="row" id='basicdetails11' style={{marginTop:"40px"}}>
                <div className=" col-md-12 d-flex justify-content-between align-items-center experience"><span>Basic Details</span></div>
                <div className='col-md-12 mb-3 custom-input'><hr></hr></div>
                    <div className="col-md-2 mb-3 custom-input"><label className="form-label">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
                              
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
                    <div className="col-md-5 mb-3 custom-input"><label className="form-label">Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-5 mb-3 custom-input"><label className="form-label">Surname</label><input type="text" className="form-control form-control-sm"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
               
                    <div className="col-md-4 mb-3 custom-input" > <label className="form-label">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
                        <option value={item} >India +91</option>
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
                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Mobile Number</label>
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
                    <div className="col-md-2 mb-3 custom-input"><label className="form-label">Type</label>
                    {
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                  
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
                  <div className="col-md-1"><label className="form-label" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8 mb-3 custom-input"><label className="form-label">Email-Address</label>
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
                    
                    <div className="col-md-2 mb-3 custom-input"><label className="form-label">Type</label>
                    {
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          onChange={(event)=>handleemail_typechange(index,event)}>
                                
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
                  <div className="col-md-1"><label className="form-label" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                  <div className="col-md-12 mb-3 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Source</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,source:e.target.value})}>
                                    <option>Select</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6 mb-3 custom-input"><label className="form-label">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,team:e.target.value})}>
                              <option>Select</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Owner</label>
                    {/* <select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,owner:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select> */}
    <Select className="form-control form-control-sm"
                    multiple
                    value={owners}
                    onChange={handleOwnerChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {ownersList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={owners.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                        <div className="col-md-6 mb-3 custom-input"><label className="form-label">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-5 mb-3 custom-input'></div>
                    <div className="col-md-2 mb-3 custom-input" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={()=>navigate(-1)}>Cancel</button></div>
                    <div className="col-md-3 mb-3 custom-input" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Contact</button></div>
                    <div className="col-md-2 mb-3 custom-input" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={addcontact}>Save</button></div>
                    
                </div>
              
               </div>
         
             <div style={{display: isChecked ? "none" : "flex",gap:"80px"}}>
              
               <span  id='basic' onClick={basicdetails} style={{cursor:'pointer',fontWeight:"bold",width:"200px"}}>Basic Details|</span>
                {/* <span  id='professional' onClick={professionaldetails} style={{cursor:'pointer',fontWeight:"bold"}}>Professional Details</span > */}
                <span   id='other' onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold",width:"200px"}}>Personal Details|</span > 
               
						    <span style={{marginLeft:"200px",width:"31%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></span>
					</div>
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
          
      {/* ====================================full form start with basic details====================================================== */}
              
              
               <div id='fullform' style={{ display: isChecked ? "none" : "block" }}>
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
                <div className=" col-md-12 d-flex justify-content-between align-items-center experience"><span>Basic Details</span></div>
                <div className='col-md-12'><hr></hr></div>
                    <div className="col-md-2 mb-3 custom-input"><label className="form-label">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
                             
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
                   <div className="col-md-5 mb-3 custom-input "><label className="form-label">Name</label><input type="text" required className="form-control form-control-sm" placeholder="First name" onChange={(e) =>setcontact({ ...contact, first_name: e.target.value })}/></div>
                    <div className="col-md-5 mb-3 custom-input "><label className="form-label">Surname</label><input type="text" className="form-control form-control-sm"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-0" id='basicdetails2'>
                <div className="col-md-4 mb-3 custom-input" > <label className="form-label">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginBottom:"2px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
                        <option value={item} >India +91</option>
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
                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Mobile Number</label>
                    {
                       contact.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginBottom:"2px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2 mb-3 custom-input"><label className="form-label">Type</label>
                    {
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginBottom:"2px"}} 
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                 
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"70px"}}>
                    {
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/> */}
                            <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteall1(index)}>delete</span>

                            </div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="form-label" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8 mb-3 custom-input"><label className="form-label">Email-Address</label>
                    {
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginBottom:"2px"}}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2 mb-3 custom-input mb-3 custom-input"><label className="form-label">Type</label>
                    {
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginBottom:"2px"}} 
                          onChange={(event)=>handleemail_typechange(index,event)}>
                               
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"70px"}}>
                    {
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteall2(index)}>delete</span></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="form-label" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                    
                    <div className="col-md-12 mb-3 custom-input"><label className="form-label">Tags</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,tags:e.target.value})}/></div>
                    
                    <div className="col-md-10 mb-3 custom-input"><label className="form-label">Descriptions</label><textarea className='form-control form-control-sm' style={{borderRadius:"8px",height:"100px"}} onChange={(e)=>setcontact({...contact,descriptions:e.target.value})}/></div>
                    <div className="col-md-2 mb-3 custom-input"></div>

                   
           
                    <div className="col-md-12 mb-3 custom-input" style={{marginTop:"10px"}}><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Profession Details</label><hr style={{marginTop:"-5px"}}></hr></div>
               
                    <div className="col-md-5 mb-3 custom-input"><label className="form-label">Profession Category</label>
                    <select className="form-control form-control-sm" onChange={handleProfessionCategoryChange}>
                                  <option>---Select profession category---</option>    
                               
                                {professtiondetails.profession_category.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-7 mb-3 custom-input"><label className="form-label">Profession Sub-Category</label>
                    <select className="form-control form-control-sm" onChange={handleProfessionSubcategoryChange}>
                                <option>---Select profession sub-category---</option>
                                {availableSubcategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                  {subcategory}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-5 mb-3 custom-input"><label className="form-label">Designation</label>
                    <select className="form-control form-control-sm" onChange={handleDesignationChange}>
                    <option>---Select designation---</option>
                    {availableDesignations.map((designation) => (
                      <option key={designation} value={designation}>
                              {designation}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Company/Organisation/Department Name</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,company_name:e.target.value})}>
                    <option>---Select company---</option>
                      {
                        cdata.map((item)=>
                        (
                          <option>{item.name}</option>
                        ))
                      }
                        </select>
                    </div>
                    <div className="col-md-1"><label className="form-label">Add</label><button className="form-control form-control-sm" onClick={()=>{navigate('/addcompany')}}>+</button></div>
             
              {/* <div className="row mt-4">
                    <div className="col-md-2 mb-3 custom-input"   onClick={prev1}><button className="form-control form-control-sm" >Prev</button></div>
                    <div className="col-md-2 mb-3 custom-input" onClick={next2}  style={{marginLeft:"65%"}}><button className="form-control form-control-sm" >Next</button></div>
                </div> */}
            
         



                    <div className="col-md-12" style={{marginTop:"10px"}}><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Source</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,source:e.target.value})}>
                                    <option>---Select source---</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6 mb-3 custom-input"><label className="form-label">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,team:e.target.value})}>
                              <option>---Select team---</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Owner</label>
                    <Select className="form-control form-control-sm" style={{borderRadius:"8px",border:"none"}}
                    multiple
                    value={owners}
                    onChange={handleOwnerChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                
                    {ownersList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={owners.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                        <div className="col-md-6 mb-3 custom-input"><label className="form-label">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>---Select---</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-12"><hr></hr></div>
                   
                   <div className="col-md-2 mb-3 custom-input" id="projectbtn" onClick={next1}  style={{marginLeft:"82%"}}>
                   <button
                    className="btn btn-primary btn-sm form-control"
                    onClick={next1}
                    style={{ fontWeight: '600', borderRadius: '8px', cursor: 'pointer',backgroundColor:"lightblue" }}
                  >
                    Next
                  </button>
                    </div>
 
                    </div>
              </div>    
           
                        
        </div> 

   {/*------------------------------------------------------------ basic details end---------------------------------------------------- */}
 

 {/*-------------------------------------------------- personal details start--------------------------------------------------------- */
 
 }
        <div className="col-md-12" id='otherdetails' style={{display:"none",marginTop:"-80px"}}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Personal Details</span></div><hr></hr>
                <div className="row " >

                <div className="col-md-12"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-12 mb-3 custom-input"><label className="form-label">Father/Husband name</label><input type="text" className="form-control form-control-sm"onChange={(e)=>setcontact({...contact,father_husband_name:e.target.value})}/></div>

                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">H.No</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,h_no:e.target.value})}/></div>
                    <div className="col-md-9 mb-3 custom-input"><label className="form-label">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,area1:e.target.value})}/></div>

                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,location1:e.target.value})}/></div>
                    {/* <div className="col-md-4 mb-3 custom-input"><label className="form-label">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,city1:e.target.value})}/></div> */}


                    <div className="col-md-4 mb-3 custom-input">
                  <label className="form-label">City</label>
                  <select
                    className="form-control form-control-sm"
                    value={contact.city1}
                    onChange={(e) => setcontact({ ...contact, city1: e.target.value })}
                    disabled={!contact.state1 || cities.length === 0} // Disable if no state or invalid state
                  >
                    <option value="">--Select City--</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,pincode1:e.target.value})}/></div>

                    {/* <div className="col-md-6 mb-3 custom-input"><label className="form-label">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,state1:e.target.value,city1: "" })}/></div> */}
                    <div className="col-md-6 mb-3 custom-input">
                    <label className="form-label">State</label>
                    <select
                      className="form-control form-control-sm"
                      value={contact.state1}
                      onChange={(e) => {
                        const state = e.target.value;
                        setcontact({ ...contact, state1: state, city1: "" }); // Clear city when state changes
                      }}>
                        <option value="">--Select State--</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  
                  </div>

                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Country</label>
                    <select className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country1:e.target.value})}>
                      <option>India</option>
                    {asianCountries.map((country, index) => (
                      <option key={index} value={country.toLowerCase().replace(/\s+/g, '-')}>
                        {country}
                      </option>
                    ))}
                    </select>
                    </div>

                    <div className="col-md-12"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-5 mb-3 custom-input"><label className="form-label">Gender</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,gender:e.target.value})}>
                                <option>---Select gender---</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7 mb-3 custom-input"><label className="form-label">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,maritial_status:e.target.value})}>
                            <option>---Select your status---</option>
                            <option>Married</option>
                            <option>Unmarried</option>
                            <option>Single</option>
                        </select>
                    </div>

                    <div className="col-md-5 mb-3 custom-input"><label className="form-label">Birth Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,birth_date:e.target.value})}/></div>
                    <div className="col-md-7 mb-3 custom-input"><label className="form-label">Anniversary Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,anniversary_date:e.target.value})}/></div>

                    <div className="col-md-3 mb-3 custom-input"> <label className="form-label">Education</label>
                        
                             {contact.education.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <select className="form-control form-control-sm"
                                    onChange={(event) => handleeducationChange(index, event)}
                                  >
                                    <option>---choose your education---</option>
                                    <option>Kindergaren</option><option>School</option><option>Primery Education</option><option> Secondary Education</option><option>Master</option><option>Commerce</option>
                                    <option>Vocational Education</option>
                                  </select>
                                  
                                </div>
                              ))}
                        </div>
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Degree</label>
                    {contact.degree.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <select
                                    className="form-control form-control-sm"
                                    onChange={(event) => handledegreeChange(index, event)}
                                  >
                                    <option>---choose degree---</option>
                                    <optgroup label='Bachelor’s '>
                                        <option>Bachelor of Arts (BA) </option><option>Bachelor of Science (BS or BSc) </option><option>Bachelor of Fine Arts (BFA)</option><option> Bachelor of Education (BEd) </option>
                                        <option> Bachelor of Business Administration (BBA) </option><option>Bachelor of Engineering (BE or BEng) </option><option>Bachelor of Science in Nursing (BSN)</option>
                                        <option>B.Bachelor of Laws (LLB) </option><option>B.Bachelor of Architecture (BArch)</option><option>Bachelor of Social Work (BSW) </option><option> Bachelor of Music (BM) </option>
                                        <option>Bachelor of Pharmacy (BPharm)</option><option>Bachelor of Technology (BTech) </option>
                                    </optgroup>
                                    <optgroup label='Master’s '>
                                        <option>Master of Arts (MA)</option><option>Master of Science (MS or MSc)</option><option>Master of Business Administration (MBA)</option><option>Master of Fine Arts (MFA)</option>
                                        <option>Master of Engineering (ME or MEng)</option><option>Master of Education (MEd or EdM)</option><option>Master of Public Health (MPH) </option>
                                        <option>Master of Social Work (MSW)</option><option> Master of Laws (LLM)</option><option>Master of Public Administration (MPA)</option><option>Master of Architecture (MArch)</option>
                                        <option>Master of Library Science (MLS or MLIS)</option><option> Master of Music (MM or MMus)</option><option>Master of Philosophy (MPhil)</option>
                                        <option>Master of Arts in Teaching (MAT)</option><option>Master of Theology (MTh or ThM)</option>
                                    </optgroup>
                                    <optgroup label='Doctoral '>
                                        <option>Doctor of Philosophy (PhD)</option><option>Doctor of Medicine (MD)</option><option>Doctor of Education (EdD)</option><option>Doctor of Business Administration (DBA) </option>
                                        <option>Juris Doctor (JD) </option><option>Doctor of Nursing Practice (DNP) </option><option>Doctor of Public Health (DrPH)</option><option>Doctor of Psychology (PsyD)</option>
                                        <option>Doctor of Engineering (EngD or DEng) </option><option> Doctor of Pharmacy (PharmD)</option><option> Doctor of Social Work (DSW) </option><option>Doctor of Theology (ThD) </option>
                                        <option>Doctor of Veterinary Medicine (DVM) </option><option>Doctor of Musical Arts (DMA)</option><option>Doctor of Dental Surgery (DDS) or Doctor of Dental Medicine (DMD) </option>
                                        <option>Doctor of Public Administration (DPA)</option><option>Doctor of Health Administration (DHA) </option>
                                    </optgroup>
                        
                                  </select>
                                  
                                </div>
                              ))}
                    </div>
                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">School/College/University</label>
                    {contact.school_college.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={name}
                                    onChange={(event) => handleschool_collegeChange(index, event)}
                                  />
                                  
                                </div>
                              ))}                    
                    </div>
                     <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      contact.action4.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                     <div className="col-md-1" ><label className="form-label">add</label><button className="form-control form-control-sm" onClick={addFn4}>+</button></div>
                
                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Loan</label>
                    {
                      contact.loan.map((item,index)=>
                      (
                        <select type="text"
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handleloanchange(index,event)}
                        >
                          <option>---Select loan type---</option><option>Home Loan </option><option>Auto Loan</option><option>Personal Loan </option>
                          <option>Education Loan</option> <option>Agriculture Loan </option> <option>Credit Card Loan</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Bank</label>
                    {
                      contact.bank.map((item,index)=>
                      (
                        <select type="text" 
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm"
                        onChange={(event)=>handlebankchange(index,event)}
                        >
                          <option>---Select bank---</option>
                              <option>State Bank of India (SBI) </option><option>Punjab National Bank (PNB)</option><option>Bank of Baroda</option><option>Canara Bank</option>
                              <option>Union Bank of India</option><option>Bank of India (BOI)</option><option>Indian Bank </option><option>Central Bank of India</option>
                              <option>Indian Overseas Bank (IOB)</option><option>UCO Bank</option><option>Bank of Maharashtra</option><option></option>
                              <option>HDFC Bank </option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra Bank </option>
                              <option>IndusInd Bank </option><option>Yes Bank </option><option>IDFC FIRST Bank</option><option>Federal Bank </option>
                              <option>RBL Bank </option><option>South Indian Bank</option><option>Karur Vysya Bank </option><option>Tamilnad Mercantile Bank </option>
                              <option>Bandhan Bank</option><option>Jammu & Kashmir Bank </option><option>DCB Bank </option><option>Citibank </option><option></option>
                              <option>HSBC</option><option>Standard Chartered Bank </option><option>Deutsche Bank </option><option>Barclays Bank</option>
                              <option>Royal Bank of Scotland (RBS) </option><option>Bank of America</option><option>American Express Bank </option><option>UBS</option>
                              <option>Nabard Financial Services Ltd. (NABARD)</option><option></option>
                              <option>The Saraswat Cooperative Bank</option><option>The Mumbai District Central Cooperative Bank</option><option>The Delhi State Cooperative Bank</option>
                              <option>The Karnataka Vikas Grameen Bank</option><option>The Maharashtra State Cooperative Bank </option><option>The Uttar Bihar Gramin Bank</option>
                              <option>The Punjab State Cooperative Bank</option><option>Gramin Bank of Aryavart </option><option></option>
                              <option>Haryana Gramin Bank</option><option>Bangiya Gramin Vikash Bank </option><option>Kaveri Grameena Bank</option>
                              <option>Prathama Bank </option><option>Small Industries Development Bank of India (SIDBI) </option><option></option>
                              <option>Export-Import Bank of India (EXIM Bank) </option><option>National Bank for Agriculture and Rural Development (NABARD) </option><option></option>
                        </select>
                      ))
                   
                    }
                    </div>
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Amount</label>
                    {
                      contact.amount.map((item,index)=>
                      (
                        <input type="text" 
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm"
                        onCanPlay={(event)=>handleamountchange(index,event)} />
                      ))
                    }
                  </div>
                  <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      contact.action5.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="form-label">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>

                    
                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Social Media</label>
                    {
                      contact.social_media.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                          onChange={(event)=>handlesocial_mediachange(index,event)}>
                        
                        <option>---select social_media---</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option><option>Google</option>
                        </select>

                      ))
                    }
                    </div>
                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Url</label>
                    {
                      contact.url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                        onChange={(event)=>handleurlChange(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      contact.action6.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="form-label">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Income</label>
                    {
                      contact.income.map((item,index)=>
                      (
                        <select
                        className='form-control form-control-sm'
                         style={{marginTop:"10px"}}
                         onChange={(event)=>handleincomechange(index,event)}>
                       
                       <option>---select your income---</option>
                       <option>Personal Income</option><option>Business Income</option>
                       </select>
                      ))
                    }
                    </div>
                    <div className="col-md-6 mb-3 custom-input"><label className="form-label">Amount</label>
                    {
                      contact.amount1.map((item,index)=>
                      (
                        <input type="text" 
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handleamount1change(index,event)}
                        />
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      contact.action7.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="form-label">add</label><button className="form-control form-control-sm" onClick={addFn7}>+</button></div>
                   
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Document No.</label>
                    {
                      contact.document_no.map((item,index)=>
                      (
                        <input type="text" 
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handledocumentnochange(index,event)}
                        />
                      ))
                    }
                    </div>
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Document Name</label>
                    {
                      contact.document_name.map((item,index)=>
                      (
                        // <input type="text" 
                        // style={{marginTop:"10px"}}
                        // className="form-control form-control-sm" 
                        // onChange={(event)=>handledocumentnamechange(index,event)}
                        // />
                        <select
                        className='form-control form-control-sm'
                         style={{marginTop:"10px"}}
                         onChange={(event)=>handledocumentnamechange(index,event)}>
                       
                       <option>---select document---</option>
                       <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                       <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                       </select>
                      ))
                    }
                    </div>
                    <div className="col-md-4 mb-3 custom-input"><label className="form-label">Document Picture</label>
                    {
                      contact.document_pic.map((item,index)=>(
                           <div key={index} className="custom-file-wrapper mt-2">
                        <input type="file" 
                        id={`doc-upload-${index}`}
                        style={{marginTop:"10px",display:"none"}}
                        className="form-control form-control-sm" 
                        multiple
                        onChange={(event)=>handledocumentpicchange(index,event)}
                        />
                           <label htmlFor={`doc-upload-${index}`} className="upload-label">
                        <i className="bi bi-image-fill me-2" style={{fontSize: "1.4rem",cursor:"pointer"}}></i> Upload Image
                      </label>
                        {/* Show image previews */}
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {(item || []).map((obj, i) => (
                        <div key={i} style={{ position: "relative" }}>
                          <img
                            src={obj.preview}
                            alt="Preview"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    
                    </div>
                        
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      contact.action8.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="form-label">add</label><button className="form-control form-control-sm" onClick={addFn8}>+</button></div>
                 <div className='col-md-12'><hr></hr></div> 
                     <div className="col-md-2 mb-3 custom-input" style={{marginTop:"20px"}}   onClick={prev2}>
                     <button
                    className="btn btn-outline-primary btn-sm form-control"
                    style={{ fontWeight: '600', borderRadius: '8px', cursor: 'pointer', userSelect: 'none' }}
                  >
                    Prev
                  </button>
                      </div>
                    <div className="col-md-6 mb-3 custom-input"></div>
                    <div className="col-md-2 mb-3 custom-input" style={{marginTop:"20px"}}>
                      <button
    className="btn btn-outline-danger btn-sm form-control"
    onClick={() => navigate(-1)}
    style={{ fontWeight: '600', borderRadius: '8px', transition: 'all 0.3s ease' }}
    onMouseEnter={e => {
      e.currentTarget.style.backgroundColor = '#dc3545';
      e.currentTarget.style.color = 'white';
      e.currentTarget.style.borderColor = '#dc3545';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#dc3545';
      e.currentTarget.style.borderColor = '#dc3545';
    }}
  >
    Cancel
  </button>
                      </div>
                    {/* <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Contact</button></div> */}
                    <div className="col-md-2 mb-3 custom-input" style={{marginTop:"20px"}}>
                      <button   className="btn btn-primary btn-sm form-control" onClick={addcontact} 
                        style={{ fontWeight: '600', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease',backgroundColor:"lightblue" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0d6efd'}>Save
                        </button>
                  </div>
                   
                </div>
               
                    
            </div>
        </div>
        </div>

    </div>
</div>
</div>
<ToastContainer/>
</div>

);
}
export default Addcontact;
