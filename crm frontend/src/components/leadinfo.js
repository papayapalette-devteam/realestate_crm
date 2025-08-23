import {React, useState,useEffect,useRef} from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import '../css/common.css';
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useLocation } from 'react-router-dom';
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Leadinfo() {

  const location = useLocation(); // Get location object
  const leadData = location.state?.leaddata; // Access lead data passed as state

  // console.log(leadData);
   const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json")
        .then((res) => res.json())
        .then((data) => setAnimationData(data));
    }, []);
    const [isLoading,setIsLoading] = useState(false);


const facing=["Park","Green Belt","Highway","Commercial","School","Hospital","Mandir","Gurudwara","Crech","Clinic","Community Centre",
              "1 Kanal","14m Marla","10 Marla","8 Marla","6 Marla","4 Marla","2 Marla","3 Marla","2 Kanal"];

const [facings, setfacings] = useState([]);

const handlefacingChange = (event) => {
  const {
    target: { value },
  } = event;

  // If "Select All" is clicked
  if (value.includes('select-all')) {
    // If all options are already selected, deselect them (uncheck all)
    if (facings.length === facing.length) {
      setfacings([]); // Deselect all options
      setleadinfo({ ...leadinfo, facing: [] }); // Update facing in leadinfo
    } else {
      // Otherwise, select all options
      setfacings(facing); // Select all options
      setleadinfo({ ...leadinfo, facing: facing }); // Update facing in leadinfo
    }
  } else {
    // Handle individual selections/deselections
    const selectedfacing = typeof value === 'string' ? value.split(',') : value;
    setfacings(selectedfacing); // Update selected facings
    setleadinfo({ ...leadinfo, facing: selectedfacing }); // Update facing in leadinfo
  }
};

const road=["9 Mtr Wide","12 Mtr Wide","18 Mtr Wide","24 Mtr Wide","60 Mtr Wide"];       



const [roads, setroads] = useState([]);

const handleroadChange = (event) => {
  const {
    target: { value },
  } = event;

  // If "Select All" is clicked
  if (value.includes('select-all')) {
    // If all options are already selected, deselect them (uncheck all)
    if (roads.length === road.length) {
      setroads([]); // Deselect all options
      setleadinfo({ ...leadinfo, road: [] }); // Update road in leadinfo
    } else {
      // Otherwise, select all options
      setroads(road); // Select all options
      setleadinfo({ ...leadinfo, road: road }); // Update road in leadinfo
    }
  } else {
    // Handle individual selections/deselections
    const selectedroad = typeof value === 'string' ? value.split(',') : value;
    setroads(selectedroad); // Update selected roads
    setleadinfo({ ...leadinfo, road: selectedroad }); // Update road in leadinfo
  }
};


const matchdeal=["What'sApp","Message","Mail"];

const [matchdeals, setmatcheddeals] = useState([]);

const handlematcheddealChange = (event) => {
  const {
    target: { value },
  } = event;

  // If "Select All" is clicked
  if (value.includes('select-all')) {
    // If all options are already selected, deselect them (uncheck all)
    if (matchdeals.length === matchdeal.length) {
      setmatcheddeals([]); // Deselect all options
      setleadinfo({ ...leadinfo, matched_deal: [] }); // Update matched_deal in leadinfo
    } else {
      // Otherwise, select all options
      setmatcheddeals(matchdeal); // Select all options
      setleadinfo({ ...leadinfo, matched_deal: matchdeal }); // Update matched_deal in leadinfo
    }
  } else {
    // If individual items are selected/deselected
    const selectedmatcheddeal = typeof value === 'string' ? value.split(',') : value;
    setmatcheddeals(selectedmatcheddeal); // Update selected deals
    setleadinfo({ ...leadinfo, matched_deal: selectedmatcheddeal }); // Update matched_deal with selected options
  }
};

const direction=["East","West","North","South","North East","South East","South West","North West"];      
 
const [directions, setdirections] = useState([]);

const handledirectionChange = (event) => {
  const {
    target: { value },
  } = event;

  if (value.includes('select-all')) {

    if (directions.length === direction.length) {
      setdirections([]);
      setleadinfo({ ...leadinfo, direction: [] }); 
    } else {
      setdirections(direction);
      setleadinfo({ ...leadinfo, direction: direction });
    }
  } else {
    const selecteddirections = typeof value === 'string' ? value.split(',') : value;
    setdirections(selecteddirections); 
    setleadinfo({ ...leadinfo, direction: selecteddirections }); 
  }
};

const propertyunittype=["Two Side Open","Three Side Open","Ordinary","Corner"];      

const [propertyunitstypes, setpropertyunitstypes] = useState([]);

const handlepropertyunitstypesChange = (event) => {
  const {
    target: { value },
  } = event;

  if (value.includes('select-all')) {

    if (propertyunitstypes.length === propertyunittype.length) {
      setpropertyunitstypes([]);
      setleadinfo({ ...leadinfo, unit_type2: [] }); 
    } else {
      setpropertyunitstypes(propertyunittype);
      setleadinfo({ ...leadinfo, unit_type2: propertyunittype });
    }
  } else {
    const selectedpropertyunittype = typeof value === 'string' ? value.split(',') : value;
    setpropertyunitstypes(selectedpropertyunittype); 
    setleadinfo({ ...leadinfo, unit_type2: selectedpropertyunittype }); 
  }
};




const options = {
  property_type: ["Residential", "Commercial","Agricultural","Industrial","Institutional"],
  sub_type: {
    Residential: ["PLOT", "INDEPENDENT HOUSE","FLAT/APARTMENT","BUILDER FLOOR"],
    Commercial: ["SHOP", "SHOWROOM","OFFICE SPACE","RETAIL STORE","SOHO","EXCUTIVE ROOM","MULTIPLEX","VIRTUAL SPACE","PLOT"],
    Agricultural: ["LAND", "FARM HOUSE"],
    Industrial: ["PLOTS", "WAREHOUSE","COLD STORAGE","RICE SELLER","BUILDING","FACTORY"],
    Institutional: ["SCHOOL", "HOTEL","UNIVERSITIES","HOSPITAL","COLLEGE"]
  },
  unit_type: {
    PLOT: ["1 Kanal","12 Marla", "3 Kanal","4 Kanal","5 Kanal","6 Kanal","7 Kanal","1 Acre","2 Acre","3 Acre","4 Acre","5 Acre","6 Acre","7 Acre","8 Acre","9 Acre","10 Acre","5 Marla", "2 Kanal","16 Marla","14 Marla","12 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
    "INDEPENDENT HOUSE": ["1 Kanal", "2 Kanal","12 Marla", "3 Kanal","4 Kanal","5 Kanal","6 Kanal","7 Kanal","1 Acre","2 Acre","3 Acre","4 Acre","5 Acre","6 Acre","7 Acre","8 Acre","9 Acre","10 Acre","5 Marla","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
    "FLAT/APARTMENT": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK",,"STUDIO"],
    "BUILDER FLOOR": ["1 BHK", "12 Marla", "3 Kanal","4 Kanal","5 Kanal","6 Kanal","7 Kanal","1 Acre","2 Acre","3 Acre","4 Acre","5 Acre","6 Acre","7 Acre","8 Acre","9 Acre","10 Acre","5 Marla","2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
    SHOP:["BOOTH","KIOSAK",],
    SHOWROOM:["SCO","SCF","DSS"],
    "OFFICE SPACE":["LOCABLE OFFICE","VIRTUAL OFFICE"],
    "RETAIL STORE":["HYPER MARKET","DEPARTMETAL STORE"],
    SOHO:["SOHO"],
    "EXCUTIVE ROOM":["ROOM"],
    LAND:["CROPLAND","WOODLAND","PASTURE","COMMERCIAL"],
    "FARM HOUSE":["FARM"],
    PLOTS:["1 KANAL","10 MARLA","2 KANAL","1 ACRE","2 KANAL"],
    WAREHOUSE:["WRHSE"],
    "COLD STORAGE":["CLDSTRG"],
    "RICE SELLER":["RCSLR"],
    "BUILDING":["BLDG"],
    FACTORY:["FCTRY"],
    SCHOOL:["NURSERY SCHOOL","CRECH","HIGH SCHOOL","PRIMERY SCHOOL"],
    HOTEL:["HOTEL","GUEST HOUSE","HOMESTAYS"],
    UNIVERSITIES:["DEEMED","PRIVATE"],
    HOSPITAL:["NURSING HOME","CLINIC"],
    COLLEGE:["ART COLLEGE","TECHNICAL COLLEGE","MEDICAL COLLEGE"]
  },
};

const handleCategoryChange = (event) => {
  const selectedCategories = event.target.value;

  // Update categories and reset dependent fields

  

  setleadinfo((prevLead)=>({
    ...prevLead,
    property_type: selectedCategories,
    sub_type: [], // Ensure uniqueness
    unit_type: [], // Ensure uniqueness
  }));
};

const handleSubcategoryChange = (event) => {
  const selectedSubcategories = event.target.value;

  // Update subcategories and dependent unit types
 
  setleadinfo((prevLead) => ({
    ...prevLead,
    sub_type: selectedSubcategories,
    unit_type: [], // Ensure uniqueness
  }));
};
const getAvailableSubcategories = () =>
  leadinfo.property_type.flatMap((cat) => options.sub_type[cat] || []);

const handleUnitTypeChange = (event) => {
  const selectedUnitTypes = event.target.value;
  setleadinfo((prevLead) => ({
    ...prevLead,
    unit_type: selectedUnitTypes,
  }));
};

const getAvailableunittype = () => {
  // Step 1: Get all options based on selected sub_types
  let availableOptions = leadinfo.sub_type.flatMap((cat) => options.unit_type[cat] || []);

  // Step 2: Use a Set to remove duplicates and return unique options
  return Array.from(new Set(availableOptions));
};


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

  setleadinfo((prevLead) => ({
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

  setleadinfo((prevLead) => ({
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

  setleadinfo((prevLead) => ({
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
  setleadinfo({ ...leadinfo, owner: selectedOwners });
};


  

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
               


                        const requirment=["Buy","Rent","Lease"];
                  
                        const transaction_type=["Full White","Collecter Rate","Flexiable"];
                        const furnishing=["Furnished","Unfurnished","Semi Furnished"];
                        const funding=["Home Loan","Self Funding","Loan Against Property","Personal Loan","Business Loan"]
                        const timeline=["Urgent","More then 1 month","Not Confirmed","Within 15 days"]

    const [leadinfo,setleadinfo]=useState({title:"Mr.",first_name:"",last_name:"",country_code:[''],mobile_no:[''],mobile_type:[''],action11:[],
        email:[''],email_type:[''],action22:[],tags:"",descriptions:"",stage:"",lead_type:"",owner:[],team:"",visible_to:"",campaign:"",source:"",
        sub_source:"",channel_partner:"",intrested_project:"",
        requirment:"",property_type:[],purpose:"",nri:"",sub_type:[],unit_type:[],budget_min:"",budget_max:"",minimum_area:"",
        maximum_area:"",area_metric:"Sq Yard",search_location:"",street_address:"",range:"",range_unit:"",city2:"",area2:[],block:[],pincode2:"",country2:"",state2:"",
        lattitude:"",longitude:"",country3:"",state3:"",city3:"",area_project:[],block3:[],specific_unit:"",specific_unitdetails:"",funding:"",timeline:"",facing:[],road:[],direction:[],transaction_type:"",
        unit_type2:"",white_portion:"",furnishing:"",
        profession_category:[],profession_subcategory:[],designation:"",company_name:"",country_code1:"",company_phone:"",
        company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

        father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
        social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[],
        matcheddeals:[],matchingdeal:"",})

       const states = Object.keys(statesAndCities);
       const cities = statesAndCities[leadinfo.state3] || [];
        
        const navigate=useNavigate()
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }
        const leadinfodetails=async(e)=>
        {
            e.preventDefault();
            try {
              setIsLoading(true)
                const resp=await api.post('leadinfo',leadinfo,config)
                const resp1= await api.post('addcontact',leadinfo,config)
                 if(resp.status===200)
                  {
                    Swal.fire({
                    icon:"success",
                    title: '🎉 Lead created successfully...!',
                    html: `
                    <img src="https://cdn.vectorstock.com/i/500p/63/50/thumbs-up-smiley-face-icon-vector-10176350.jpg"
                    alt="Thumbs up" 
                    width="80" 
                    style="margin-bottom: 0px;"/>`,
                    width: '400px', // makes it small
                    padding: '1.2em',
                    showConfirmButton: true,
                    }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/leaddetails');
                        }
                    })
                  }
              
            } catch (error) {
              console.log(error);
              
                  Swal.fire({
                  icon:"error",
                  title: 'Oops creating lead failed!',
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
               
            }finally
            {
              setIsLoading(false)
            }
        }


        useEffect(() => {
          // Check if leadData exists and update the state accordingly
          if (leadData) {
            setleadinfo(prevState => ({
              ...prevState, // Keep existing state
              ...leadData   // Update with the leadData passed from the previous component
            }));
          }
        }, [leadData]);
//===================================------------- lead tab view=================================---------------------------------------- 
        const leadinfobasic=()=>
        {
            document.getElementById("leadinfobasic1").style.display="flex";
            document.getElementById("leadinfobasic2").style.display="flex";
            document.getElementById("span1").style.color="green";

            document.getElementById("leadinforequirment").style.display="none";
            document.getElementById("span2").style.color="black";

            document.getElementById("leadinfoprofessional").style.display="none";
            document.getElementById("span3").style.color="black";

            document.getElementById("leadinfopersonal").style.display="none";
            document.getElementById("span3").style.color="black";
         
        }
        const leadinforequirment=()=>
            {
                document.getElementById("leadinfobasic1").style.display="none";
                document.getElementById("leadinfobasic2").style.display="none";
                document.getElementById("span1").style.color="black";
    
                document.getElementById("leadinforequirment").style.display="flex";
                document.getElementById("span2").style.color="green";
    
                document.getElementById("leadinfoprofessional").style.display="none";
                document.getElementById("span3").style.color="black";
    
                document.getElementById("leadinfopersonal").style.display="none";
                document.getElementById("span3").style.color="black";
             
            }
            const leadinfoprofessionaldetails=()=>
                {
                    document.getElementById("leadinfobasic1").style.display="none";
                    document.getElementById("leadinfobasic2").style.display="none";
                    document.getElementById("span1").style.color="black";
        
                    document.getElementById("leadinforequirment").style.display="none";
                    document.getElementById("span2").style.color="black";

                    document.getElementById("leadinfoprofessional").style.display="flex";
                    document.getElementById("span3").style.color="green";

                    document.getElementById("leadinfopersonal").style.display="none";
                    document.getElementById("span4").style.color="black";
                 
                }  
              const leadinfopersonaldetails=()=>
                    {
                        document.getElementById("leadinfobasic1").style.display="none";
                        document.getElementById("leadinfobasic2").style.display="none";
                        document.getElementById("span1").style.color="black";
            
                        document.getElementById("leadinforequirment").style.display="none";
                        document.getElementById("span2").style.color="black";
            
                        document.getElementById("leadinfoprofessional").style.display="none";
                        document.getElementById("span3").style.color="black";
            
                        document.getElementById("leadinfopersonal").style.display="flex";
                        document.getElementById("span4").style.color="green";
                     
                    }

  //======================------------------------------------- lead tab view end---------------------------===================================
               
  
  //===================-------------------all array addFn3,delete and handle change event--------------------==========================
       function addFn11() {
        
            setleadinfo({
              ...leadinfo,
              country_code: [...leadinfo.country_code, ''],
              mobile_no: [...leadinfo.mobile_no, ''],
              mobile_type: [...leadinfo.mobile_type, ''],
              action11: [...leadinfo.action11, '']
            });
          };

          const deleteall11=(index)=>
            {
             
              const newcountry_code = leadinfo.country_code.filter((_, i) => i !== index);
              const newmobile_no = leadinfo.mobile_no.filter((_, i) => i !== index);
              const newmobile_type = leadinfo.mobile_type.filter((_, i) => i !== index);
              const newaction11 = leadinfo.action11.filter((_, i) => i !== index);
              
              setleadinfo({
                ...leadinfo,
                country_code: newcountry_code,
                mobile_no: newmobile_no,
                mobile_type: newmobile_type,
                action11: newaction11
              });
            }
            const handlecountry_codechange1 = (index, event) => {
              const newcountry_code = [...leadinfo.country_code];
              newcountry_code[index] = event.target.value;
              setleadinfo({
                ...leadinfo,
                country_code: newcountry_code
              });
            };
            const handlemobile_nochange1 = (index, event) => {
              const newmobile_no = [...leadinfo.mobile_no];
              newmobile_no[index] = event.target.value;
              setleadinfo({
                ...leadinfo,
                mobile_no: newmobile_no
              });
            };
            const handlemobile_typechange1 = (index, event) => {
              const newmobile_type = [...leadinfo.mobile_type];
              newmobile_type[index] = event.target.value;
              setleadinfo({
                ...leadinfo,
                mobile_type: newmobile_type
              });
            };

            function addFn22() {
        
              setleadinfo({
                ...leadinfo,
                email: [...leadinfo.email, ''],
                email_type: [...leadinfo.email_type, ''],
                action22: [...leadinfo.action22, '']
              });
            };
  
            const deleteall22=(index)=>
              {
               
                const newemail = leadinfo.email.filter((_, i) => i !== index);
                const newemail_type = leadinfo.email_type.filter((_, i) => i !== index);
                const newaction22 = leadinfo.action22.filter((_, i) => i !== index);
                
                setleadinfo({
                  ...leadinfo,
                  email: newemail,
                  email_type: newemail_type,
                  action22: newaction22
                });
              }
              const handleemailchange1 = (index, event) => {
                const newemail = [...leadinfo.email];
                newemail[index] = event.target.value;
                setleadinfo({
                  ...leadinfo,
                  email: newemail
                });
              };
              const handleemail_typechange1 = (index, event) => {
                const newemail_type = [...leadinfo.email_type];
                newemail_type[index] = event.target.value;
                setleadinfo({
                  ...leadinfo,
                  email_type: newemail_type
                });
              };

                  function addFn3() {
     
                        setleadinfo({
                          ...leadinfo,
                          company_social_media: [...leadinfo.company_social_media, ''],
                          company_url: [...leadinfo.company_url, ''],
                          action3: [...leadinfo.action3, '']
                        });
                      };
                      const deleteall3=(index)=>
                        {
                         
                          const newcomapnysocialmedia = leadinfo.company_social_media.filter((_, i) => i !== index);
                          const newcompanyurl = leadinfo.company_url.filter((_, i) => i !== index);
                          const newaction3=leadinfo.action3.filter((_,i) => i !== index);
                          
                          setleadinfo({
                            ...leadinfo,
                            company_social_media: newcomapnysocialmedia,
                            company_url: newcompanyurl,
                            action3:newaction3
                          });
                        }
                        const handlecompanysocialmediachange = (index, event) => {
                          const newcomapnysocialmedia = [...leadinfo.company_social_media];
                          newcomapnysocialmedia[index] = event.target.value;
                          setleadinfo({
                            ...leadinfo,
                            company_social_media: newcomapnysocialmedia
                          });
                        };
                        const handlecompanyurlchange = (index, event) => {
                          const newcompanyurl = [...leadinfo.company_url];
                          newcompanyurl[index] = event.target.value;
                          setleadinfo({
                            ...leadinfo,
                            company_url: newcompanyurl
                          });
                        };
                        function addFn4() {
     
                            setleadinfo({
                              ...leadinfo,
                              education: [...leadinfo.education, ''],
                              degree: [...leadinfo.degree, ''],
                              school_college: [...leadinfo.school_college, ''],
                              action4: [...leadinfo.action4, '']
                            });
                          };
                          const deleteall4=(index)=>
                            {
                             
                              const neweducation = leadinfo.education.filter((_, i) => i !== index);
                              const newdegree = leadinfo.degree.filter((_, i) => i !== index);
                              const newschool_college = leadinfo.school_college.filter((_, i) => i !== index);
                              const newaction4=leadinfo.action4.filter((_,i) => i !== index);
                              
                              setleadinfo({
                                ...leadinfo,
                                education: neweducation,
                                degree: newdegree,
                                school_college: newschool_college,
                                action4:newaction4
                              });
                            }
                            const handleeducationChange = (index, event) => {
                              const neweducation = [...leadinfo.education];
                              neweducation[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                education: neweducation
                              });
                            };
                            const handledegreeChange = (index, event) => {
                              const newdegree = [...leadinfo.degree];
                              newdegree[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                degree: newdegree
                              });
                            };
                      
                            const handleschool_collegeChange = (index, event) => {
                              const newschool = [...leadinfo.school_college];
                              newschool[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                school_college: newschool
                              });
                            };
          
                          function addFn5() {
                  
                            setleadinfo({
                              ...leadinfo,
                              loan: [...leadinfo.loan, ''],
                              bank: [...leadinfo.bank, ''],
                              amount: [...leadinfo.amount, ''],
                              action5: [...leadinfo.action5, '']
                            });
                          };
                          const deleteall5=(index)=>
                            {
                             
                              const newloan = leadinfo.loan.filter((_, i) => i !== index);
                              const newbank = leadinfo.bank.filter((_, i) => i !== index);
                              const newamount = leadinfo.amount.filter((_, i) => i !== index);
                              const newaction5=leadinfo.action5.filter((_,i) => i !== index);
                              
                              setleadinfo({
                                ...leadinfo,
                                loan: newloan,
                                bank: newbank,
                                amount: newamount,
                                action5:newaction5
                              });
                            }
                            const handleloanchange = (index, event) => {
                              const newloan = [...leadinfo.loan];
                              newloan[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                loan: newloan
                              });
                            };
                            const handlebankchange = (index, event) => {
                              const newbank = [...leadinfo.bank];
                              newbank[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                bank: newbank
                              });
                            };
                            const handleamountchange = (index, event) => {
                              const newamount = [...leadinfo.amount];
                              newamount[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                amount: newamount
                              });
                            };
          
                            function addFn6() {
                  
                              setleadinfo({
                                ...leadinfo,
                                social_media: [...leadinfo.social_media, ''],
                                url: [...leadinfo.url, ''],
                                action6: [...leadinfo.action6, '']
                              });
                            };
                            const deleteall6=(index)=>
                              {
                               
                                const newsocial_media = leadinfo.social_media.filter((_, i) => i !== index);
                                const newurl = leadinfo.url.filter((_, i) => i !== index);
                                const newaction6=leadinfo.action6.filter((_,i) => i !== index);
                                
                                setleadinfo({
                                  ...leadinfo,
                                  social_media: newsocial_media,
                                  url: newurl,
                                  action6:newaction6
                                });
                              }
                              const handlesocial_mediachange = (index, event) => {
                                const newsocial_media = [...leadinfo.social_media];
                                newsocial_media[index] = event.target.value;
                                setleadinfo({
                                  ...leadinfo,
                                  social_media: newsocial_media
                                });
                              };
                              const handleurlChange = (index, event) => {
                                const newurl = [...leadinfo.url];
                                newurl[index] = event.target.value;
                                setleadinfo({
                                  ...leadinfo,
                                  url: newurl
                                });
                              };
          
                              function addFn7() {
                  
                                setleadinfo({
                                  ...leadinfo,
                                  income: [...leadinfo.income, ''],
                                  amount1: [...leadinfo.amount1, ''],
                                  action7: [...leadinfo.action7, '']
                                });
                              };
                              const deleteall7=(index)=>
                                {
                                 
                                  const newincome = leadinfo.income.filter((_, i) => i !== index);
                                  const newamount1 = leadinfo.amount1.filter((_, i) => i !== index);
                                  const newaction7=leadinfo.action7.filter((_,i) => i !== index);
                                  
                                  setleadinfo({
                                    ...leadinfo,
                                    income: newincome,
                                    amount1: newamount1,
                                    action7:newaction7
                                  });
                                }
                                const handleincomechange = (index, event) => {
                                  const newincome = [...leadinfo.income];
                                  newincome[index] = event.target.value;
                                  setleadinfo({
                                    ...leadinfo,
                                    income: newincome
                                  });
                                };
                                const handleamount1change = (index, event) => {
                                  const newamount1 = [...leadinfo.amount1];
                                  newamount1[index] = event.target.value;
                                  setleadinfo({
                                    ...leadinfo,
                                    amount1: newamount1
                                  });
                                };
          
                                function addFn8() {
                  
                                  setleadinfo({
                                    ...leadinfo,
                                    document_no: [...leadinfo.document_no, ''],
                                    document_name: [...leadinfo.document_name, ''],
                                    document_pic: [...leadinfo.document_pic, ''],
                                    action8: [...leadinfo.action8, '']
                                  });
                                };
                                const deleteall8=(index)=>
                                  {
                                   
                                    const newdocumentno = leadinfo.document_no.filter((_, i) => i !== index);
                                    const newdocumentname = leadinfo.document_name.filter((_, i) => i !== index);
                                    const newdocumentpic = leadinfo.document_pic.filter((_, i) => i !== index);
                                    const newaction8=leadinfo.action8.filter((_,i) => i !== index);
                                    
                                    setleadinfo({
                                      ...leadinfo,
                                      document_no: newdocumentno,
                                      document_name: newdocumentname,
                                      document_pic: newdocumentpic,
                                      action8:newaction8
                                    });
                                  }
                                  const handledocumentnochange = (index, event) => {
                                    const newdocumentno = [...leadinfo.document_no];
                                    newdocumentno[index] = event.target.value;
                                    setleadinfo({
                                      ...leadinfo,
                                      document_no: newdocumentno
                                    });
                                  };
                                  const handledocumentnamechange = (index, event) => {
                                    const newdocumentname = [...leadinfo.document_name];
                                    newdocumentname[index] = event.target.value;
                                    setleadinfo({
                                      ...leadinfo,
                                      document_name: newdocumentname
                                    });
                                  };
                                  const handledocumentpicchange = (index, event) => {
                                    const newdocumentpic = [...leadinfo.document_pic];
                                    const files = Array.from(event.target.files);
                                     newdocumentpic[index] = files.map(file => ({
                                                  file,
                                                  preview: URL.createObjectURL(file)
                                                }));

                                    setleadinfo({
                                      ...leadinfo,
                                      document_pic: newdocumentpic
                                    });
                                  };


                                  const selectlocation=()=>
                                    {
                                      document.getElementById("select_location").style.display="flex"
                                      document.getElementById("search_location1").style.display="none"
                      
                                  
                                        
                                      document.getElementById("searchlocation").style.color="black"
                                      document.getElementById("searchlocation").style.backgroundColor="white"
                           
                    
                                      document.getElementById("selectlocation").style.backgroundColor="black"
                                      document.getElementById("selectlocation").style.color="white"
                                      document.getElementById("selectlocation").style.borderRadius="50px"
                                      document.getElementById("selectlocation").style.width="150px"
                                      document.getElementById("selectlocation").style.textAlign="center"
                                    
                                    
                                
                                      
                                    }
                                    const searchlocation=()=>
                                      {
                                        document.getElementById("select_location").style.display="none"
                                        document.getElementById("search_location1").style.display="flex"
                                    
                                    
                                      
                                        document.getElementById("selectlocation").style.color="black"
                                        document.getElementById("selectlocation").style.backgroundColor="white"
                                 
                    
                                        document.getElementById("searchlocation").style.backgroundColor="black"
                                        document.getElementById("searchlocation").style.color="white"
                                        document.getElementById("searchlocation").style.borderRadius="50px"
                                        document.getElementById("searchlocation").style.width="150px"
                                        document.getElementById("searchlocation").style.textAlign="center"
                                        
                                      }
                                    
                                      const[data1,setdata1]=useState([]);
                                      const fetchdatabyprojectcityname=async()=>
                                      {
                                        
                                        try {
                                          const city=leadinfo.city3
                                          const resp=await api.get(`viewprojectbycityname/${city}`)
                                          console.log(resp);
                                          
                                          setdata1(resp.data.project)
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      }
                                      useEffect(() => {
                                        fetchdatabyprojectcityname()
                                         
                                        
                                      }, [leadinfo.city3]);

                                      const allproject =[]
                                      data1.map((item)=>
                                      (
                                          allproject.push(item.name)
                                      ))

                                      const [units, setunits] = useState([]);
                                    
                                      const [allblocks, setallblocks] = useState([]);
                                    
                                    
                                      const fetchdatabyprojectname = async (projectNames) => {
                                        try {
                                          // Initialize a temporary array to hold all fetched units
                                          const allUnits = [];
                                      
                                          // Fetch the data sequentially for each project
                                          for (const projectName of projectNames) {
                                            const resp = await api.get(`viewprojectbyname/${projectName}`);
                                            const allFetchedUnits = resp.data.project; // Assuming resp.data.project is an array of units
                                            allUnits.push(...allFetchedUnits); // Accumulate the fetched units
                                          }
                                      
                                          // Update the state with the accumulated units
                                          setunits(allUnits);
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      };
                                      
                                      
                                      useEffect(() => {
                                        if (units.length >= 0) {
                                         
                                          const collectedblocks=units.flatMap(item=>item.add_block)
                                 
                                          setallblocks(collectedblocks) 
                                         
                                        }
                                      }, [units]);
                                    
                                     
                                     
                                      
                                    
                                      
                                      
                                      
                                      const handleprojectchange = (event) => {
                                        const selectproject = event.target.value;
                                    
                                        // If the "Select All" option is selected
                                        if (selectproject.includes('select-all')) {
                                          // If all projects are already selected, deselect all
                                          if (leadinfo.area_project.length === allproject.length) {
                                            setleadinfo((prev) => {
                                              const updateproject = { ...prev, area_project: [] }; // Deselect all
                                              return updateproject;
                                            });
                                          } else {
                                            // Select all projects
                                            setleadinfo((prev) => {
                                              const updateproject = { ...prev, area_project: allproject }; // Select all
                                              fetchdatabyprojectname(allproject); // Fetch data with the selected projects
                                              return updateproject;
                                            });
                                          }
                                        } else {
                                          // Handle individual project selection/deselection
                                          setleadinfo((prev) => {
                                            const updateproject = { ...prev, area_project: selectproject };
                                            fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
                                            return updateproject;
                                          });
                                        }
                                      };
                                    
                               
                                    
                                      const handleallblockchange = (event) => {
                                        const selectblocks = event.target.value;
                                    
                                        // If the "Select All" option is selected
                                        if (selectblocks.includes("select-all")) {
                                          // If all blocks are selected, deselect all
                                          if (leadinfo.block3.length === allblocks.length) {
                                            setleadinfo((prev) => {
                                              const updateblock = { ...prev, block3: [] }; // Deselect all
                                              return updateblock;
                                            });
                                          } else {
                                            // Select all blocks
                                            const allBlockNames = allblocks.map(project => project.block_name);
                                            setleadinfo((prev) => {
                                              const updateblock = { ...prev, block3: allBlockNames }; // Select all
                                              return updateblock;
                                            });
                                          }
                                        } else {
                                          // Handle individual block selection or deselection
                                          setleadinfo((prev) => {
                                            const updateblock = { ...prev, block3: selectblocks };
                                            return updateblock;
                                          });
                                        }
                                      }



                                        const budgetOptions = [
                                          { value: 5000, label: "5,000/- (five thousand)" },
                                          { value: 10000, label: "10,000/- (ten thousand)" },
                                          { value: 20000, label: "20,000/- (twenty thousand)" },
                                          { value: 30000, label: "30,000/- (thirty thousand)" },
                                          { value: 50000, label: "50,000/- (fifty thousand)" },
                                          { value: 80000, label: "80,000/- (eighty thousand)" },
                                          { value: 100000, label: "1,00,000/- (one lakh)" },
                                          { value: 150000, label: "1,50,000/- (one and a half lakh)" },
                                          { value: 200000, label: "2,00,000/- (two lakh)" },
                                          { value: 250000, label: "2,50,000/- (two and a half lakh)" },
                                          { value: 350000, label: "3,50,000/- (three and a half lakh)" },
                                          { value: 500000, label: "5,00,000/- (five lakh)" },
                                          { value: 750000, label: "7,50,000/- (seven and a half lakh)" },
                                          { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                        ];
                                      
                                        // Filter max budget options based on selected min budget
                                        const filteredMaxBudgetOptions = leadinfo.budget_min
                                          ? budgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                          : budgetOptions;

                                          const buyBudgetOptions = [
                                            { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                            { value: 2500000, label: "25,00,000/- (twenty five lakh)" },
                                            { value: 5000000, label: "50,00,000/- (fifty lakh)" },
                                            { value: 7500000, label: "75,00,000/- (seventy five lakh)" },
                                            { value: 10000000, label: "1,00,00,000/- (one crore)" },
                                            { value: 12500000, label: "1,25,00,000/- (one crore twenty five lakh)" },
                                            { value: 15000000, label: "1,50,00,000/- (one crore fifty lakh)" },
                                            { value: 20000000, label: "2,00,00,000/- (two crore)" },
                                            { value: 30000000, label: "3,00,00,000/- (three crore)" },
                                            { value: 40000000, label: "4,00,00,000/- (four crore)" },
                                            { value: 50000000, label: "5,00,00,000/- (five crore)" },
                                            { value: 75000000, label: "7,50,00,000/- (seven crore fifty lakh)" },
                                            { value: 100000000, label: "10,00,00,000/- (ten crore)" },
                                            { value: 150000000, label: "15,00,00,000/- (fifteen crore)" },
                                            { value: 200000000, label: "20,00,00,000/- (twenty crore)" },
                                            { value: 300000000, label: "30,00,00,000/- (thirty crore)" },
                                            { value: 500000000, label: "50,00,00,000/- (fifty crore)" },
                                            { value: 750000000, label: "75,00,00,000/- (seventy five crore)" },
                                            { value: 1000000000, label: "100,00,00,000/- (one hundred crore)" },
                                          ];
                                          const filteredMaxBudgetOptionsbuy = leadinfo.budget_min
                                          ? buyBudgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                          : buyBudgetOptions;

                                          const areaoptions = [
                                            { value: 10, label: "10" },                 
                                            { value: 25, label: "25" },
                                            { value: 50, label: "50" },
                                            { value: 75, label: "75" },
                                            { value: 100, label: "100" },
                                            { value: 125, label: "125" },
                                            { value: 150, label: "150" },
                                            { value: 175, label: "175" },
                                            { value: 200, label: "200" },
                                            { value: 225, label: "225" },
                                            { value: 250, label: "250" },
                                            { value: 300, label: "300" },
                                            { value: 350, label: "350" },
                                            { value: 400, label: "400" },
                                            { value: 450, label: "450" },
                                            { value: 550, label: "550" },
                                            { value: 750, label: "750" },
                                            { value: 1000, label: "1000" },
                                            { value: 2000, label: "2000" },
                                            { value: 5000, label: "5000" },
                                            { value: 7500, label: "7500" },
                                            { value: 10000, label: "10000" }
                                          ];
                                        
                                          // Filter max budget options based on selected min budget
                                          const filteredarea = leadinfo.minimum_area
                                            ? areaoptions.filter((option) => option.value >= leadinfo.minimum_area)
                                            : areaoptions;


                                          const onlineCampaignSources = [
                                            "Facebook", "Instagram", "Google", "X", "Linkedin", 
                                            "99 Acre", "Magicbricks", "Common Floor", "Sulekha", 
                                            "Housing", "Square Yard", "OLX", "Real Estate India"
                                          ];
                                          
                                          const offlineCampaignSources = [
                                            "SMS", "Email", "Whatsapp", "Website", "News Paper", "Cold Calling"
                                          ];
                                          
                                          const organicCampaignSources = [
                                            "Walk-In", "Old Client", "Friends", "Relative", "Hoarding", "Reference", "Channel Partner"
                                          ];

                                          const getSourceOptions = () => {
                                            if (leadinfo.campaign === "Online Campaign") {
                                              return onlineCampaignSources;
                                            } else if (leadinfo.campaign === "Offline Campaign") {
                                              return offlineCampaignSources;
                                            } else if (leadinfo.campaign === "Organic Campaign") {
                                              return organicCampaignSources;
                                            } else {
                                              return [];
                                            }
                                          };


                                          const[contactdata,setcontactdata]=useState([]);
                                          const fetchdata=async()=>
                                          {
                                            
                                            try {
                                              const resp=await api.get('viewcontact')
                                              setcontactdata(resp.data.contact)
                                     
                                            } catch (error) {
                                              console.log(error);
                                            }
                                          
                                          }
                                          useEffect(() => {
                                            if (leadinfo.source) { // You can add more checks here if needed
                                              fetchdata();
                                            }
                                          }, [leadinfo.source]);


                                          const [show1, setshow1] = useState(false);
    
                                          const handleClose1 = () => setshow1(false);
                                          const handleShow1=async()=>
                                          {
                                            setshow1(true);
                                           
                                          }



                                          const [contact,setcontact]=useState({title:"Mr.",first_name:"",last_name:"",country_code:['India +91'],mobile_no:[''],mobile_type:['Personal'],action1:[],
                                            email:[''],email_type:['Personal'],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",
                                    
                                            profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
                                            company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],
                                    
                                            father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
                                            birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
                                            social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[] });
                                        
                                            const config1 = {
                                                headers: {
                                                  'Content-Type': 'multipart/form-data' // Set the Content-Type here
                                                }
                                            }
                                    
                                            const addcontact=async(e)=>
                                              {
                                                  e.preventDefault();
                                                  try {
                                          
                                                      const resp= await api.post('addcontact',contact,config1)
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


                const [progress, setProgress] = useState(leadinfo.white_portion || 0); // Initialize with deal.whiteportion

                const handleMouseMove = (e) => {
                  const progressBar = e.target.getBoundingClientRect();
                  const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
                  const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
                  setProgress(clampedProgress);
                  setleadinfo((prevLead) => ({ ...prevLead, white_portion: clampedProgress })); // Update deal.whiteportion
                };

                const handleMouseDown = (e) => {
                  handleMouseMove(e); // Set initial progress
                  window.addEventListener('mousemove', handleMouseMove);
                  window.addEventListener('mouseup', handleMouseUp);
                };

                const handleMouseUp = () => {
                  window.removeEventListener('mousemove', handleMouseMove);
                  window.removeEventListener('mouseup', handleMouseUp);
                };


//======================----------------------------------all array addFn3,delete and handle change event--------------======================

// ==============================================search loaction from google start========================================================

                    
                        const inputRef = useRef(null);
                        const apiKey = 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc';
                      
                        useEffect(() => {
                          const scriptExists = document.querySelector('#google-maps-script');
                          if (!scriptExists) {
                            const script = document.createElement('script');
                            script.id = 'google-maps-script';
                            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                            script.async = true;
                            script.defer = true;
                            script.onload = initializeAutocomplete;
                            document.body.appendChild(script);
                          } else {
                            initializeAutocomplete();
                          }
                        }, []);
                      
                        const initializeAutocomplete = () => {
                          if (!inputRef.current || !window.google) return;
                      
                          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                            types: ['geocode']
                          });
                      
                          autocomplete.addListener('place_changed', () => {
                            const place = autocomplete.getPlace();
                            if (!place.geometry) return;
                      
                            const lat = place.geometry.location.lat();
                            const lng = place.geometry.location.lng();
                      
                            const components = place.address_components;
                            let address = '', city = '', zip = '', state = '', country = '';
                      
                            components.forEach(component => {
                              const types = component.types;
                              if (types.includes('route') || types.includes('sublocality')) {
                                address += component.long_name + ' ';
                              }
                              if (types.includes('locality')) {
                                city = component.long_name;
                              }
                              if (types.includes('postal_code')) {
                                zip = component.long_name;
                              }
                              if (types.includes('administrative_area_level_1')) {
                                state = component.long_name;
                              }
                              if (types.includes('country')) {
                                country = component.long_name;
                              }
                            });
                      
                            setleadinfo(prev => ({
                              ...prev,
                              search_location: place.formatted_address,
                              street_address: address.trim(),
                              city2: city,
                              pincode2: zip,
                              state2: state,
                              country2: country,
                              lattitude: lat,
                              longitude: lng
                            }));
                          });
                        };
                      
                        const getlocation = async (e) => {
                          e.preventDefault();
                          try {
                            const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                              params: {
                                address: leadinfo.search_location,
                                key: apiKey
                              }
                            });
                      
                            if (res.data.results.length > 0) {
                              const result = res.data.results[0];
                              const lat = result.geometry.location.lat;
                              const lng = result.geometry.location.lng;
                      
                              const components = result.address_components;
                              let address = '', city = '', zip = '', state = '', country = '';
                      
                              components.forEach(component => {
                                const types = component.types;
                                if (types.includes('route') || types.includes('sublocality')) {
                                  address += component.long_name + ' ';
                                }
                                if (types.includes('locality')) {
                                  city = component.long_name;
                                }
                                if (types.includes('postal_code')) {
                                  zip = component.long_name;
                                }
                                if (types.includes('administrative_area_level_1')) {
                                  state = component.long_name;
                                }
                                if (types.includes('country')) {
                                  country = component.long_name;
                                }
                              });
                      
                              setleadinfo(prev => ({
                                ...prev,
                                street_address: address.trim(),
                                city2: city,
                                pincode2: zip,
                                state2: state,
                                country2: country,
                                lattitude: lat,
                                longitude: lng
                              }));
                            }
                          } catch (err) {
                            console.error('Geocode error:', err);
                          }
                        };

//================================================ search location from google end=====================================================


//========================================= matched deal code start==================================================================
                 
   const[data2,setdata2]=useState([]);
        const fetchdata2=async()=>
        {
          
          try {
            const resp=await api.get('viewdeal')
            setdata2(resp.data.deal)
          } catch (error) {
            console.log(error);
          }
        }

  useEffect(()=>
    {fetchdata2()},[])

                          useEffect(() => {
                          if (data2.length >0) {
                            
                             
                              const availableFor = leadinfo.requirment === 'Buy' ? 'Sale' : leadinfo.requirment;
                              
                        
                              // Filter leads based on the current deal's criteria
                              const filtereddeals = data2.filter(
                                (item) =>
                                  item.available_for === availableFor 
                                
                              );
                        
                        
                              // Create a new deal object with updated matched leads and matched lead count
                            
                              
                              setleadinfo({
                                ...leadinfo,
                                matcheddeals: filtereddeals.map(item => item._id),
                                matchingdeal: filtereddeals.length, // Update the matched lead count
                              })
                            
                          }
                        }, [leadinfo.requirment]); // Trigger this effect whenever `data2` or `deals` changes

// ================================================matched deals code end===========================================================




return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"70%",marginLeft:"200px"}}>
            <div className="row" style={{marginTop:"0px"}}>
        <div className="col-12">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Add Lead</h4>
                </div><hr></hr>
                <div className="d-flex justify-content-between align-items-center experience" style={{fontFamily:"times new roman",fontWeight:"bold"}}>
                <span onClick={leadinfobasic} id="span1" style={{cursor:"pointer"}}>Basic Details</span>
                <span onClick={leadinforequirment} id="span2" style={{cursor:"pointer"}}>Requirment</span>
                <span onClick={leadinfoprofessionaldetails} id="span3" style={{cursor:"pointer"}}> Professional Details</span>
                <span onClick={leadinfopersonaldetails} id="span4" style={{cursor:"pointer"}}> Personal Details</span>
                </div>
                <hr></hr>
{/*----------------------------------------leadinfo basic details start------------------------------------------------------------------- */}
               
               
                <div className="row" id="leadinfobasic1">
                    
                    <div className="col-md-3 mb-3 custom-input"><label className="form-label">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,title:e.target.value})}>
                        <option>{leadData?.title|| 'Mr.'}</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Name</label><input type="text" defaultValue={leadData?.first_name || ''} required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,first_name:e.target.value})}/></div>
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Surname</label><input type="text" defaultValue={leadData?.last_name || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,last_name:e.target.value})}/></div>
                </div>
                <div className="row" id="leadinfobasic2">
                       <div className="col-md-4 mb-4 custom-input" > <label className="form-label">Country</label>
                    {
                      leadinfo.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"1px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange1(index,event)}>
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
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Mobile Number</label>
                    {
                       leadinfo.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"1px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handlemobile_nochange1(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2 mb-2 custom-input"><label className="form-label">Type</label>
                    {
                       leadinfo.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"1px"}} 
                         onChange={(event)=>handlemobile_typechange1(index,event)}>
                                  
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1 mb-1 custom-input" style={{marginTop:"70px"}}>
                    {
                       leadinfo.action11.map((item,index)=>
                        (
                           <div style={{marginTop:"10px"}}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall11(index)} style={{height:"40px",cursor:"pointer"}}/> */}
                                  <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}}  onClick={()=>deleteall11(index)}>delete</span> 
                                  </div>
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1 mb-1 custom-input">
                  <label className="form-label">Add</label>
                  <button
                    className="form-control form-control-sm"
                    onClick={addFn11}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: "500",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease-in-out"
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                  >
                    +
                  </button>
                </div>


                   <div className="col-md-8 mb-8 custom-input"><label className="form-label">Email-Address</label>
                    {
                        leadinfo.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"1px"}}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange1(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2 mb-2 custom-input"><label className="form-label">Type</label>
                    {
                       leadinfo.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"1px"}} 
                          onChange={(event)=>handleemail_typechange1(index,event)}>
                                
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1 mb-1 custom-input" style={{marginTop:"70px"}}>
                    {
                       leadinfo.action22.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall22(index)} style={{height:"40px",cursor:"pointer"}}/> */}
                           <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}}  onClick={()=>deleteall22(index)}>delete</span> 
                            </div>
                                  
                          
                        ))
                    }
                    </div>
                     <div className="col-md-1 mb-1 custom-input">
                      <label className="form-label" >add</label>
                          <button
                    className="form-control form-control-sm"
                    onClick={addFn22}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: "500",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease-in-out"
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                  >
                    +
                  </button>
                      </div>

                     <div className="col-md-8 mb-8 custom-input"><label className="form-label">Tags</label><input type="text" defaultValue={leadData?.tags || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,tags:e.target.value})}/></div>
                    <div className="col-md-10 mb-10 custom-input"><label className="form-label">Descriptions</label><textarea defaultValue={leadData?.descriptions || ''} className='form-control form-control-sm' onChange={(e)=>setleadinfo({...leadinfo,descriptions:e.target.value})}/></div>
                    
                    <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Stage</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,stage:e.target.value})}>
                    <option>{leadData?.stage || '---Select---'}</option>
                        <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Oppurtunity</option>
                        <option>Booked</option>
                        <optgroup label="Closed" style={{fontWeight:"bolder",color:"blue"}}>
                        <option style={{color:"green"}}>Won</option>
                        <option style={{color:"red"}}>Lost</option>
                        <option style={{color:"gray"}}>Unqualified </option>
                        </optgroup>
                       
                      
                        </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Lead Type</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,lead_type:e.target.value})}>
                    <option>{leadData?.lead_type || '---Select---'}</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Owner</label>
                    {/* <select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,owner:e.target.value})}>
                              <option>{leadData?.owner[0] || '---select---'}</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select> */}
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={owners}
                    onChange={handleOwnerChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   <MenuItem disabled value="---select---">
                    {leadData?.owner || '---select---'}
                </MenuItem>
                    {ownersList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={owners.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Team</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,team:e.target.value})}>
                              <option>{leadData?.team || '---select---'}</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,visible_to:e.target.value})}>
                                <option>{leadData?.visible_to || '---Select---'}</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"></div>
                   
                    <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Campegin Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                   
                        <div className="col-md-6 mb-6 custom-input"><label className="form-label">Campaign</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,campaign:e.target.value})}>
                    <option>{leadData?.campaign || '---Select---'}</option>
                        <option>Online Campaign</option>
                        <option>Offline Campaign</option>
                        <option>Organic Campaign</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,source:e.target.value})}>
                    <option>{leadData?.source || '---Select---'}</option>
                    {getSourceOptions().map((source, index) => (
                      <option key={index} value={source}>
                        {source}
                      </option>
                    ))}
                        </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Sub-Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,sub_source:e.target.value})}>
                    <option>{leadData?.sub_source || '---Select---'}</option>
                        <option>Call</option>
                        <option>Sms</option>
                        <option>Email</option>
                        <option>Whatsapp</option>
                        </select>
                    </div>
                    {(leadinfo.source === "Reference" || leadinfo.source === "Channel Partner" && leadinfo.campaign === "Organic Campaign") && (
                     <>
                     {/* <div className="col-md-5 mb-5 custom-input">
                        <label className="form-label">Referrer Name</label>
                        <select className="form-control form-control-sm" onChange={(e) => setleadinfo({ ...leadinfo, channel_partner: e.target.value })}
                          value={leadinfo.channel_partner || ''}
                         >
                          <option value="">{leadData?.channel_partner || '---Select---'}</option>
                       {
                        contactdata
                        .map((item)=>
                        (
                          <option>{item.title} {item.first_name} {item.last_name} ({item.mobile_no})</option> 
                        ))
                        }
                        </select>
                      </div> */}
                        <div className="col-md-5 mb-5 custom-input"> <label className="form-label">Referrer Name</label>
                           <Autocomplete
                           const options = {contactdata.filter(item => item._id )
                           
                           }
                           getOptionLabel={(option) =>
                         `${option.title} ${option.first_name} ${option.last_name} (${option.mobile_no}) ` 
                           }
                      
                         renderInput={(params) => (
                          <TextField {...params} size="small" placeholder="---select---" />
                           )}          
                           />
                          </div>
                  <div className="col-md-1 mb-1 custom-input" onClick={handleShow1}>
                    <label className="form-label">Add</label>
                     <button
                      className="form-control form-control-sm"
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.2s ease-in-out"
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      +
                    </button>
                    </div>
                  </>
                    )}
                    
                    <div className="col-md-12 mb-12 custom-input"><hr></hr></div>
                    {/* <div className="col-md-6 mb-6 custom-input"><label className="form-label">Intersted Project</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,intrested_project:e.target.value})}>
                    <option>{leadData?.intrested_project || '---Select---'}</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div> */}
                    </div>
{/* ---------------------------------------leadinfo basic details end ------------------------------------------------------------------------*/}
            

{/*---------------------------------------- leadinfo requirment details start--------------------------------------------------------------- */}
              
              
                <div className="row mt-2" id="leadinforequirment" style={{display:"none"}}>
                <div className="col-md-3 mb-3 custom-input"><label className="form-label">Requirment</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,requirment:e.target.value})}>
                    <option>Select</option>
                       {
                        requirment.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-3 mb-3 custom-input"><label className="form-label">Property Type</label>
                  
                         <Select
                         className="form-control form-control-sm" style={{border:"none"}}
                          multiple
                          value={leadinfo.property_type}
                          onChange={handleCategoryChange}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {options.property_type.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                              <Checkbox checked={leadinfo.property_type.includes(cat)} />
                              <ListItemText primary={cat} />
                            </MenuItem>
                          ))}
                        </Select>
                        </div>
                        
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label" style={{display:"inline-block"}}>Purpose</label><br></br>
                        <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>End use<input type="radio" name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>Investor
                        </div>
                        <div className="col-md-2 mb-2 custom-input"><label className="form-label" >NRI</label><br></br>
                        <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,nri:e.target.value})}/>Yes
                        </div>
                        <div className="col-md-6 mb-6 custom-input"><label className="form-label">Sub Type</label>
                        
                        <Select
                        className="form-control form-control-sm" style={{border:"none"}}
                      multiple
                      value={leadinfo.sub_type}
                      onChange={handleSubcategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {getAvailableSubcategories().map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        <Checkbox checked={leadinfo.sub_type.includes(sub)} />
                        <ListItemText primary={sub} />
                      </MenuItem>
                    ))}
                    </Select>
                    </div>
                    
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Unit Type</label>
                    <Select
                        className="form-control form-control-sm" style={{border:"none"}}
                      multiple
                      value={leadinfo.unit_type}
                      onChange={handleUnitTypeChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {getAvailableunittype().map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        <Checkbox checked={leadinfo.unit_type.includes(sub)} />
                        <ListItemText primary={sub} />
                      </MenuItem>
                    ))}
                    </Select>
                        </div>
                        {leadinfo.requirment === "Rent" && (
                          <>
                            <div id="rentbudgetmin" className="col-md-6 mb-6 custom-input">
                              <label className="form-label">Budget Min</label>
                              <select
                                className="form-control form-control-sm"
                                onChange={(e) =>
                                  setleadinfo({ ...leadinfo, budget_min: e.target.value })
                                }
                                value={leadinfo.budget_min}
                              >
                                <option>---Select---</option>
                                {budgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div id="rentbudgetmax" className="col-md-6 mb-6 custom-input">
                              <label className="form-label">Budget Max</label>
                              <select
                                className="form-control form-control-sm"
                                onChange={(e) =>
                                  setleadinfo({ ...leadinfo, budget_max: e.target.value })
                                }
                                value={leadinfo.budget_max}
                              >
                                <option>---Select---</option>
                                {filteredMaxBudgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}

                        {leadinfo.requirment === "Buy" && (
                       <>
                        <div id="buybudgetmin" className="col-md-6 mb-6 custom-input"><label className="form-label">Budget Min</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_min:e.target.value})}>
                        <option>---Select---</option>
                        {buyBudgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                      
                      
                        <div id="buybudgetmax" className="col-md-6 mb-6 custom-input"><label className="form-label">Budget Max</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_max:e.target.value})}>
                        <option>---Select---</option>
                        {filteredMaxBudgetOptionsbuy.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                        </>
                      )}
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Minimum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,minimum_area:e.target.value})}>
                        <option>Select</option>
                        {areaoptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select>
                        </div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Maximum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maximum_area:e.target.value})}>
                        <option>Select</option>
                        {filteredarea.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                
                        </select></div>
                   
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Area Metric</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area_metric:e.target.value})} >
                      
                        <option>Sq Yard</option>
                        <option>Marla</option>
                        <option>Acre</option>
                        <option>Sq Feet</option>
                        <option>Kanal</option>
                        </select></div> 
                        <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Location Details</label></div>
                       
                        <div className="row" id="search_location" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                        <div style={{display:"flex",gap:"50px",border:"1px solid gray",padding:"5px",borderRadius:"50px",marginLeft:"20%"}}>
                             <div  id='selectlocation' onClick={selectlocation} style={{cursor:'pointer',fontWeight:"bold",backgroundColor:"black",color:"white",borderRadius:"50px",width:"150px",textAlign:"center",transition:"0.5s ease-out"}}>Select Location </div>
                             <div  id='searchlocation' onClick={searchlocation} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Search Loacation</div>
                             
                         </div>

                           <div className="row" id="select_location" style={{margin:"5px",padding:"10px"}}>
                        <div className="col-md-5 mb-5 custom-input"><label className="form-label">Country(country3)</label>
                        <select  className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,country3:e.target.value})}>
                        <option>India</option>
                    {asianCountries.map((country, index) => (
                      <option key={index} value={country.toLowerCase().replace(/\s+/g, '-')}>
                        {country}
                      </option>
                    ))}
                          </select>
                        </div>
                       
                        <div className="col-md-5 mb-5 custom-input"><label className="form-label">State(state3)</label><select type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state3:e.target.value})}>
                        <option value="">--Select State--</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                          </select>
                        </div>
                        <div className="col-md-2 mb-2 custom-input"></div>

                        <div className="col-md-5 mb-5 custom-input"><label className="form-label">City(city3)</label>
                        {/* <select  className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}>
                          <option>---select country---</option>
                          <option>India</option>
                          </select> */}
                             <select
                    className="form-control form-control-sm"
                    value={leadinfo.city3}
                    onChange={(e)=>setleadinfo({...leadinfo,city3:e.target.value})}
                    disabled={!leadinfo.state3 || cities.length === 0} // Disable if no state or invalid state
                  >
                    <option value="">--Select City--</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                        </div>
                        <div className="col-md-5 mb-5 custom-input">
                      <label className="form-label">Area/Project</label>
                      <Select
                        className="form-control form-control-sm"
                        multiple
                        value={leadinfo.area_project}
                        onChange={handleprojectchange}
                        style={{ border: 'none' }}
                        renderValue={(selected) => selected.join(', ')}
                        label="Area/Project"
                      >
                        {/* "Select All" MenuItem */}
                        <MenuItem value="select-all">
                          <Checkbox checked={leadinfo.area_project.length === allproject.length} />
                          <ListItemText primary="--- Select All ---" />
                        </MenuItem>

                        {/* Individual Project MenuItems */}
                        {allproject.map((project) => (
                          <MenuItem key={project} value={project}>
                            <Checkbox checked={leadinfo.area_project.indexOf(project) > -1} />
                            <ListItemText primary={project} />
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                        <div className="col-md-5 mb-5 custom-input">
                        <label className="form-label">Block(block3)</label>
                        <Select
                          className="form-control form-control-sm"
                          multiple
                          value={leadinfo.block3}
                          onChange={handleallblockchange}
                          style={{ border: "none" }}
                          renderValue={(selected) => selected.join(', ')}
                          label="Block"
                        >
                          {/* "Select All" MenuItem */}
                          <MenuItem value="select-all">
                            <Checkbox checked={leadinfo.block3.length === allblocks.length} />
                            <ListItemText primary="--- Select All ---" />
                          </MenuItem>

                          {/* Individual Block MenuItems */}
                          {[...new Map(allblocks.map(item => [item.block_name, item])).values()].map((project) => (
                            <MenuItem key={project.block_name} value={project.block_name}>
                              <Checkbox checked={leadinfo.block3.indexOf(project.block_name) > -1} />
                              <ListItemText primary={project.block_name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                 
                        <div className="col-md-5 mb-5 custom-input"><label className="form-label">Specific Unit</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,specific_unit:e.target.value})}/></div>
                    </div>

                       <div className="row" id="search_location1" style={{margin:"5px",padding:"10px",display:"none"}}>
                        <div className="col-md-8 mb-8 custom-input"><label className="form-label">Search Location</label><input type="text" className="form-control form-control-sm"   ref={inputRef} value={leadinfo.search_location} onChange={(e)=>setleadinfo({...leadinfo,search_location:e.target.value})}/></div>
                       <div className="col-md-2 mb-2 custom-input"></div>
                        <div className="col-md-2 mb-2 custom-input"><label className="form-label" style={{visibility:"hidden"}}>Search</label><button className="form-control form-control-sm" onClick={getlocation}>Get</button></div>
                        <div className="col-md-8 mb-8 custom-input"><label className="form-label">Street Address</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,street_address:e.target.value})}/></div>
                        <div className="col-md-4 mb-4 custom-input"><label className="form-label">Range</label>
                        <select  className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,range:e.target.value})}>
                        <option>---select---</option>
                        <option value="1">Within 1 km.</option>
                        <option value="3">Within 3 km.</option>
                        <option value="5">Within 5 km.</option>
                        <option value="10">Within 10 km.</option>
                        <option value="15">Within 15 km.</option>
                        <option value="20">Within 20 km.</option>
                        <option value="25">Within 25 km.</option>
                          </select>
                        </div>
                        {/* <div className="col-md-2 mb-2 custom-input"><label className="form-label">Unit</label>
                        <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,range_unit:e.target.value})}>
                          <option>---select---</option>
                          <option>K.M</option>
                        </select>
                        </div> */}
                        {/* <div className="col-md-4"></div> */}

                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">City(city2)</label><input type="text" className="form-control form-control-sm" value={leadinfo.city2} onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}/></div>
                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">Area(area2)</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area2:e.target.value})}/></div>
                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">Block(block)</label><input type="text" className="form-control form-control-sm" value={leadinfo.block} onChange={(e)=>setleadinfo({...leadinfo,block:e.target.value})}/></div>
                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">Pin Code(pincode2)</label><input type="text" className="form-control form-control-sm" value={leadinfo.pincode2} onChange={(e)=>setleadinfo({...leadinfo,pincode2:e.target.value})}/></div>
                    
                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">Country(country2)</label><input type="text" className="form-control form-control-sm" value={leadinfo.country2} onChange={(e)=>setleadinfo({...leadinfo,country2:e.target.value})}/></div>
                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">State(state2)</label><input type="text" className="form-control form-control-sm" value={leadinfo.state2} onChange={(e)=>setleadinfo({...leadinfo,state2:e.target.value})}/></div>
                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">Lattitude</label><input type="text" className="form-control form-control-sm" value={leadinfo.lattitude} onChange={(e)=>setleadinfo({...leadinfo,lattitude:e.target.value})}/></div>
                    <div className="col-md-3 mb-3 custom-input "><label className="form-label">Longitude</label><input type="text" className="form-control form-control-sm" value={leadinfo.longitude} onChange={(e)=>setleadinfo({...leadinfo,longitude:e.target.value})}/></div>
                    {/* <div className="col-md-4"><label className="form-label">Location</label><input type="text" className="form-control form-control-sm" /></div> */}
                    </div>
                    </div>
                    
                    <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                   
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Facing</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={facings}
                    onChange={handlefacingChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.facing || '---select---'}
                </MenuItem> */}
                 <MenuItem value="select-all">
                    <Checkbox checked={facings.length === facing.length} />
                    <ListItemText
                      primary={leadData?.facing || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {facing.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={facings.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Road</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={roads}
                    onChange={handleroadChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.road || '---select---'}
                </MenuItem> */}
                <MenuItem value="select-all">
                    <Checkbox checked={roads.length === road.length} />
                    <ListItemText
                      primary={leadData?.road || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {road.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={roads.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Direction</label>
                      <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={directions}
                    onChange={handledirectionChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.road || '---select---'}
                </MenuItem> */}
                <MenuItem value="select-all">
                    <Checkbox checked={directions.length === direction.length} />
                    <ListItemText
                      primary={leadData?.direction || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {direction.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={directions.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                   
                    </div>

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Funding</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,funding:e.target.value})}>
                    <option>Select</option>
                   {
                    funding.map(item=>
                        (
                            <option>{item}</option>
                        )
                    )
                   }
                        </select>
                    </div>
                   
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Timeline</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,timeline:e.target.value})}>
                    <option>Select</option>
                      {
                        timeline.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                      }
                        </select>
                    </div>
                  
                
                   
                
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Furnishing</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,furnishing:e.target.value})}>
                    <option>Select</option>
                       {
                        furnishing.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                    </div>     
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Property Unit Type</label>
                  <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={propertyunitstypes}
                    onChange={handlepropertyunitstypesChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.road || '---select---'}
                </MenuItem> */}
                <MenuItem value="select-all">
                    <Checkbox checked={propertyunitstypes.length === propertyunittype.length} />
                    <ListItemText
                      primary={leadData?.unit_type2 || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {propertyunittype.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={propertyunitstypes.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>

                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Transaction Type</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,transaction_type:e.target.value})}>
                    <option>Select</option>
                     {
                        transaction_type.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                     }
                        </select>
                    </div>

                    
                     
                      {/* Conditionally render the progress bar */}
                      {leadinfo.transaction_type === "Flexiable" && (
                        <div className="col-md-8 mb-8 custom-input">
                           <label className="form-label">White Portion</label>
                        <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                          <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                          <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                      )}
                  


                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Send Matched Deal</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={matchdeals}
                    onChange={handlematcheddealChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   <MenuItem value="select-all">
                    <Checkbox checked={matchdeals.length === matchdeal.length} />
                    <ListItemText
                      primary={leadData?.matched_deal || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {matchdeal.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={matchdeals.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div> 
                    
                </div>
 {/*==========--------------------------============-----------================= leadinfo professional details start=============-------------==============-------------=======------ */}
         
         
         <div className="row mt-2" id="leadinfoprofessional" style={{display:"none"}}>
                     <div className="col-md-5 mb-5 custom-input"><label className="form-label">Profession Category</label>
                     <select className="form-control form-control-sm"  onChange={handleProfessionCategoryChange} >
                                <option>{leadData?.profession_subcategory || '---Select---'}</option>
                                {professtiondetails.profession_category.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-7 mb-7 custom-input"><label className="form-label">Profession Sub-Category</label>
                    <select className="form-control form-control-sm"  onChange={handleProfessionSubcategoryChange} >
                                <option>{leadData?.profession_subcategory || '---Select---'}</option>
                                {availableSubcategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                  {subcategory}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-5 mb-5 custom-input"><label className="form-label">Designation</label>
                    <select className="form-control form-control-sm" onChange={handleDesignationChange}>
                    <option>{leadData?.designation || '---Select---'}</option>
                    {availableDesignations.map((designation) => (
                      <option key={designation} value={designation}>
                              {designation}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,company_name:e.target.value})}>
                    <option>{leadData?.company_name || '---Select---'}</option>
                    <option>---Select company---</option>
                      {
                        cdata.map((item)=>
                        (
                          <option>{item.name}</option>
                        ))
                      }
                        </select>
                    </div>
                    <div className="col-md-1 mb-1 custom-input"
                    ><label className="form-label">Add</label>
                     <button
                      className="form-control form-control-sm"
                      onClick={()=>{navigate('/addcompany')}}
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.2s ease-in-out"
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      +
                    </button>
                    </div>
                  
                    <div className='col-md-12 mb-12 custom-input'><hr></hr></div>  

                     </div>

 {/*-------------+++++++++++++++++++++++++--------------========= leadinfo professional end================---------------------===============-------- */}


{/*=====================--------------------- leadinfo personal start-------------------------------------------============================= */}
     <div className="row" id="leadinfopersonal" style={{display:"none"}}>
                     <div className="col-md-12 mb-12 custom-input"><label className="form-label">Father/Husband name</label><input type="text" defaultValue={leadData?.father_husband_name || ''} className="form-control form-control-sm"/></div>

                            <div className="col-md-3 mb-3 custom-input "><label className="form-label">H.No</label><input type="text" defaultValue={leadData?.h_no || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,h_no:e.target.value})}/></div>
                            <div className="col-md-9 mb-9 custom-input"><label className="form-label">Area(area1)</label><input type="text" defaultValue={leadData?.area1 || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area1:e.target.value})}/></div>

                            <div className="col-md-4 mb-4 custom-input"><label className="form-label">Location(location1)</label><input type="text" defaultValue={leadData?.location1 || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,location1:e.target.value})}/></div>
                            <div className="col-md-4 mb-4 custom-input"><label className="form-label">City(city1)</label><input type="text" defaultValue={leadData?.city1 || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,city1:e.target.value})}/></div>
                            <div className="col-md-4 mb-4 custom-input"><label className="form-label">Pin Code(pincode1)</label><input type="text" defaultValue={leadData?.pincode1 || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,pincode1:e.target.value})}/></div>

                            <div className="col-md-6 mb-6 custom-input" ><label className="form-label">State(state1)</label><input type="text" defaultValue={leadData?.state1 || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state1:e.target.value})}/></div>
                            <div className="col-md-6 mb-6 custom-input"><label className="form-label">Country(country1)
                              </label><input type="text" defaultValue={leadData?.country1 || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country1:e.target.value})}/></div>

                            <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                            <div className="col-md-5 mb-5 custom-input"><label className="form-label">Gender</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,gender:e.target.value})}>
                                        <option>{leadData?.gender || '---Select---'}</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                </select>
                            </div>
                            <div className="col-md-7 mb-7 custom-input"><label className="form-label">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maritial_status:e.target.value})}>
                                    <option>{leadData?.maritial_status || '---Select---'}</option>
                                    <option>Married</option>
                                    <option>Unmarried</option>
                                    <option>Single</option>
                                </select>
                            </div>

                            <div className="col-md-5 mb-5 custom-input"><label className="form-label">Birth Date</label><input type="text" defaultValue={leadData?.birth_date || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,birth_date:e.target.value})}/></div>
                            <div className="col-md-7 mb-7 custom-input"><label className="form-label">Anniversary Date</label><input type="text" defaultValue={leadData?.anniversary_date || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,anniversary_date:e.target.value})}/></div>

                            <div className="col-md-3 mb-3 custom-input"> <label className="form-label">Education</label>
                                
                                    {
                                       Array.isArray(leadinfo.education)?
                                    leadinfo.education.map((name, index) => (
                                        <div key={index} style={{marginTop:"1px"}}>
                                        <select className="form-control form-control-sm"
                                            onChange={(event) => handleeducationChange(index, event)}
                                        >
                                            <option>{leadData?.education[index] || '---select---'}</option>
                                            <option>Kindergaren</option><option>School</option><option>Primery Education</option><option> Secondary Education</option><option>Master</option><option>Commerce</option>
                                            <option>Vocational Education</option>
                                        </select>
                                        
                                        </div>
                                    )):[]}
                                </div>
                            <div className="col-md-3 mb-3 custom-input"><label className="form-label">Degree</label>
                            {
                              Array.isArray(leadinfo.degree)?
                            leadinfo.degree.map((name, index) => (
                                        <div key={index} style={{marginTop:"1px"}}>
                                        <select
                                            className="form-control form-control-sm"
                                            onChange={(event) => handledegreeChange(index, event)}
                                        >
                                            <option>{leadData?.degree[index] || '---Select---'}</option>
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
                                    )):[]}
                            </div>
                            <div className="col-md-4 mb-4 custom-input"><label className="form-label">School/College/University</label>
                            {
                               Array.isArray(leadinfo.school_college)?
                            leadinfo.school_college.map((name, index) => (
                                        <div key={index} style={{marginTop:"1px"}}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            defaultValue={leadData?.school_college[index] || ''}
                                            onChange={(event) => handleschool_collegeChange(index, event)}
                                        />
                                        
                                        </div>
                                    )):[]}                    
                            </div>
                            <div className="col-md-1 mb-1 custom-input" style={{marginTop:"70px"}}>
                            {
                               Array.isArray(leadinfo.action4)?
                            leadinfo.action4.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}>
                                  {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                                   <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteall4(index)}>delete</span>
                                  </div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input" >
                              <label className="form-label">add</label>
                               <button
                                className="form-control form-control-sm"
                                onClick={addFn4}
                                style={{
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontWeight: "500",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "all 0.2s ease-in-out"
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                              >
                                +
                              </button>
                              </div>

                            <div className="col-md-4 mb-4 custom-input"><label className="form-label">Loan</label>
                            {
                               Array.isArray(leadinfo.loan)?
                            leadinfo.loan.map((item,index)=>
                            (
                                <select type="text"
                                style={{marginTop:"1px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleloanchange(index,event)}
                                >
                                <option>{leadData?.loan[index] || '---Select---'}</option><option>Home Loan </option><option>Auto Loan</option><option>Personal Loan </option>
                                <option>Education Loan</option> <option>Agriculture Loan </option> <option>Credit Card Loan</option>
                                </select>
                            )):[]
                            }
                            </div>
                            <div className="col-md-3 mb-3 custom-input"><label className="form-label">Bank</label>
                            {
                               Array.isArray(leadinfo.bank)?
                            leadinfo.bank.map((item,index)=>
                            (
                                <select type="text" 
                                style={{marginTop:"1px"}}
                                className="form-control form-control-sm"
                                onChange={(event)=>handlebankchange(index,event)}
                                >
                                <option>{leadData?.bank[index] || '---Select---'}</option>
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
                            )):[]

                            }
                            </div>
                            <div className="col-md-3 mb-3 custom-input"><label className="form-label">Amount</label>
                            {
                               Array.isArray(leadinfo.amount)?
                            leadinfo.amount.map((item,index)=>
                            (
                                <input type="text" 
                                defaultValue={leadData?.amount[index] || ''}
                                style={{marginTop:"1px"}}
                                className="form-control form-control-sm"
                                onCanPlay={(event)=>handleamountchange(index,event)} />
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input" style={{marginTop:"70px"}}>
                            {
                               Array.isArray(leadinfo.action5)?
                            leadinfo.action5.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}>
                                  {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                                   <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteall5(index)}>delete</span>
                                  </div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input">
                              <label className="form-label">add</label>
                               <button
                                className="form-control form-control-sm"
                                onClick={addFn5}
                                style={{
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontWeight: "500",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "all 0.2s ease-in-out"
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                              >
                                +
                              </button>
                              </div>


                            <div className="col-md-4 mb-4 custom-input"><label className="form-label">Social Media</label>
                            {
                               Array.isArray(leadinfo.social_media)?
                            leadinfo.social_media.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"1px"}}
                                onChange={(event)=>handlesocial_mediachange(index,event)}>
                                
                                <option>{leadData?.social_media[index] || '---Select---'}</option>
                                <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option><option>Google</option>
                                </select>

                            )):[]
                            }
                            </div>
                            <div className="col-md-6 mb-6 custom-input"><label className="form-label">Url</label>
                            {
                               Array.isArray(leadinfo.url)?
                            leadinfo.url.map((item,index)=>
                            (
                                <input type="text" defaultValue={leadData?.url[index] || ''} className="form-control form-control-sm" style={{marginTop:"1px"}} 
                                onChange={(event)=>handleurlChange(index,event)}/>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input" style={{marginTop:"70px"}}>
                            {
                               Array.isArray(leadinfo.action6)?
                            leadinfo.action6.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}>
                                  {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                                   <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteall6(index)}>delete</span>
                                  </div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input" >
                              <label className="form-label">add</label>
                               <button
                                className="form-control form-control-sm"
                                onClick={addFn6}
                                style={{
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontWeight: "500",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "all 0.2s ease-in-out"
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                              >
                                +
                              </button>                              
                              </div>

                            <div className="col-md-4 mb-4 custom-input"><label className="form-label">Income</label>
                            {
                               Array.isArray(leadinfo.income)?
                            leadinfo.income.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"1px"}}
                                onChange={(event)=>handleincomechange(index,event)}>
                            
                            <option>{leadData?.income[index] || '---Select---'}</option>
                            <option>Personal Income</option><option>Business Income</option>
                            </select>
                            )):[]
                            }
                            </div>
                            <div className="col-md-6 mb-6 custom-input"><label className="form-label">Amount</label>
                            {
                               Array.isArray(leadinfo.amount1)?
                            leadinfo.amount1.map((item,index)=>
                            (
                                <input type="text" 
                                defaultValue={leadData?.amount1[index] || ''}
                                style={{marginTop:"1px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleamount1change(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input" style={{marginTop:"70px"}}>
                            {
                               Array.isArray(leadinfo.action7)?
                            leadinfo.action7.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}>
                                  {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                                   <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteall7(index)}>delete</span>
                                  </div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input">
                              <label className="form-label">add</label>
                               <button
                                className="form-control form-control-sm"
                                onClick={addFn7}
                                style={{
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontWeight: "500",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "all 0.2s ease-in-out"
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                              >
                                +
                              </button>
                              </div>

                            <div className="col-md-3 mb-3 custom-input"><label className="form-label">Document No.</label>
                            {
                               Array.isArray(leadinfo.document_no)?
                            leadinfo.document_no.map((item,index)=>
                            (
                                <input type="text" 
                                defaultValue={leadData?.document_no[index] || ''}
                                style={{marginTop:"1px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentnochange(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-3 mb-3 custom-input"><label className="form-label">Document Name</label>
                            {
                               Array.isArray(leadinfo.document_name)?
                            leadinfo.document_name.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"1px"}}
                                onChange={(event)=>handledocumentnamechange(index,event)}>
                            
                            <option>{leadData?.document_name[index] || '---Select---'}</option>
                            <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                            <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                            </select>
                            )):[]
                            }
                            </div>
                            {/* <div className="col-md-4 mb-4 custom-input"><label className="form-label">Document Picture</label>
                            {
                            leadinfo.document_pic.map((item,index)=>
                            (
                                <input type="file" 
                                
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                            ))
                            }
                            </div> */}
                            <div className="col-md-4 mb-4 custom-input">
                              <label className="form-label">Document Picture</label>
                              {/* {Array.isArray(leadinfo.document_pic) && leadinfo.document_pic.length > 0 
                                ? leadinfo.document_pic.map((pic, index) => 
                                  pic ? ( // Ensure the picture URL is valid
                                    <div key={index}>
                                      <img 
                                        src={`${api.defaults.baseURL}${pic}`} 
                                        alt={`Document ${index}`} 
                                        style={{ width: "100px", height: "auto" }} 
                                      />
                                    </div>
                                  ) : null // Skip rendering if no valid data
                                ) 
                                : []} */}
                                {/* File input for new picture */}
                             {
                               Array.isArray(leadinfo.document_pic)?
                            leadinfo.document_pic.map((item,index)=>
                            (
                                 <div key={index} className="custom-file-wrapper mt-2">
                                <input type="file" 
                                  id={`doc-upload-${index}`}
                                style={{marginTop:"10px",display:"none"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                                       <label htmlFor={`doc-upload-${index}`} className="upload-label">
                                  <i className="bi bi-image-fill me-2" style={{fontSize: "1.4rem",cursor:"pointer"}}></i> Upload Image
                                </label>
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
                            )):[]
                            }
                        </div>

                            <div className="col-md-1 mb-1 custom-input" style={{marginTop:"120px"}}>
                            {
                               Array.isArray(leadinfo.action8)?
                            leadinfo.action8.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}>
                                  {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                                   <span class="material-icons" style={{color: "red", fontSize: "24px",cursor:"pointer"}} onClick={()=>deleteall8(index)}>delete</span>
                                  </div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1 mb-1 custom-input">
                              <label className="form-label">add</label>
                               <button
                                className="form-control form-control-sm"
                                onClick={addFn8}
                                style={{
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontWeight: "500",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "all 0.2s ease-in-out"
                                }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                              >
                                +
                              </button>
                              </div>

                     </div>
 {/*==================================================== leadinfo personal end======================================================= */}
                    <div className="row mt-4">
                      <div className="col-md-8 mb-8 custom-input"></div>
                    {/* <div className="col-md-4 mb-4 custom-input"><button className="form-control" >Shedule Follow-up</button></div> */}
                    <div className="col-md-2 mb-2 custom-input">
                       <button   className="btn btn-primary btn-sm form-control" onClick={leadinfodetails}
                        style={{ fontWeight: '600', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease',backgroundColor:"lightblue" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0d6efd'}>Save
                        </button>
                      </div>
                      <div className="col-md-2 mb-2 custom-input">
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
                                    
                    {/* <div className="col-md-4 mb-4 custom-input"><button className="form-control">Save & View Lead</button></div> */}
                    </div>
                    </div>
                    </div>
                    <Modal show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Quick Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
                    <div className="col-md-2 mb-2 custom-input"><label className="form-label">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
                              <option>---Select---</option>
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
                    <div className="col-md-5 mb-5 custom-input"><label className="form-label">Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-5 mb-5 custom-input"><label className="form-label">Surname</label><input type="text" className="form-control form-control-sm"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
                </div>
                </div>
                <div className="row mt-3" id='basicdetails2'>
                <div className="col-md-4 mb-4 custom-input" > <label className="form-label">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
                        <option value={item} >---phone---</option>
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
                    <div className="col-md-4 mb-4 custom-input"><label className="form-label">Mobile Number</label>
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
                    <div className="col-md-2 mb-2 custom-input"><label className="form-label">Type</label>
                    {
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                  <option>---Select---</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1 mb-1 custom-input" style={{marginTop:"90px"}}>
                    {
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1 mb-1 custom-input"><label className="form-label" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8 mb-8 custom-input"><label className="form-label">Email-Address</label>
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
                    
                    <div className="col-md-2"><label className="form-label">Type</label>
                    {
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          onChange={(event)=>handleemail_typechange(index,event)}>
                                <option>---Select---</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1 mb-1 custom-input" style={{marginTop:"90px"}}>
                    {
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall2(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1 mb-1 custom-input"><label className="form-label" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                  <div className="col-md-12 mb-12 custom-input"><label className="form-label" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Source</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,source:e.target.value})}>
                                    <option>Select</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6 mb-6 custom-input"><label className="form-label">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,team:e.target.value})}>
                              <option>Select</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-6 custom-input"><label className="form-label">Owner</label>
                    {/* <select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,owner:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select> */}
    <Select className="form-control form-control-sm" style={{border:"none"}}
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
                        <div className="col-md-6 mb-6 custom-input"><label className="form-label">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
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
                    
        </div>
        </div>
        </div>
        <ToastContainer/>

        <>
              {isLoading && (
                <div style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  // background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(10px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}>
                  <div style={{
                    // backgroundColor: "rgba(0,0,0,0.75)",
                    padding: "40px 60px",
                    borderRadius: "20px",
                    // boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "black",
                    textAlign: "center",
                  }}>
                    <Lottie
                      animationData={animationData}
                      loop
                      autoplay
                      style={{ height: '120px', width: '120px', marginBottom: '20px' }}
                    />
                    <div style={{ fontSize: "18px", fontWeight: 1000,marginTop:"-40px" }}>
                      Creating Lead...
                    </div>
                  </div>
                </div>
              )}
            </>

        </div>
     );
}

export default Leadinfo;