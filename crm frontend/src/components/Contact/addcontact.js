import { React, useState, useEffect } from "react";
import "../../css/addcontact.css";
import Header1 from "../header1";
import Sidebar1 from "../sidebar1";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";

function Addcontact() {
 

  const navigate = useNavigate();
  const [contact, setcontact] = useState({
    title: "Mr.",
    first_name: "",
    last_name: "",
    country_code: ["India +91"],
    mobile_no: [""],
    mobile_type: ["Personal"],
    action1: [],
    email: [""],
    email_type: ["Personal"],
    action2: [],
    tags: "",
    descriptions: "",
    source: "",
    team: "",
    owner: "",
    visible_to: "",

    profession_category: "",
    profession_subcategory: "",
    designation: "",
    company_name: "",
    country_code1: "India +91",
    company_phone: "",
    company_email: "",
    area: "",
    location: "",
    city: "",
    pincode: "",
    state: "",
    country: "India",
    industry: "",
    company_social_media: [""],
    company_url: [""],
    action3: [],

    father_husband_name: "",
    h_no: "",
    area1: "",
    location1: "",
    city1: "",
    pincode1: "",
    state1: "",
    country1: "India",
    gender: "",
    maritial_status: "",
    birth_date: "",
    anniversary_date: "",
    education: [""],
    degree: [""],
    school_college: [""],
    action4: [],
    loan: [""],
    bank: [""],
    amount: [""],
    action5: [],
    social_media: [""],
    url: [""],
    action6: [],
    income: [""],
    amount1: [""],
    action7: [],
    document_no: [""],
    document_name: [""],
    document_pic: [""],
    action8: [],
    relation: "",
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Set the Content-Type here
    },
  };

  const addcontact = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post("addcontact", contact, config);
      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "🎉 Success!",
          text: "Contact created successfully...",

          width: "400px", // makes it small
          padding: "1.2em",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/contactdetails");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops creating contact failed!",
        icon: "error",
        html: `
                  <p style="font-size: 14px; margin: 0;">
                    ${
                      error.response?.data?.message ||
                      "Something went wrong. Please try again."
                    }
                  </p>
                `,
        width: "400px", // makes it small
        padding: "1.2em",
        showConfirmButton: true,
        confirmButtonText: "Okay",
        confirmButtonColor: "#d33",
        background: "#fff",
        customClass: {
          popup: "small-swal",
        },
      });
    }
  };

  //===================================== get user ========================================================

  const [all_users, setall_users] = useState([]);

  const getalluserdata = async () => {
    try {
      const resp = await api.get("viewuser");
      setall_users(resp.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getalluserdata();
  }, []);

  // =============================get all title==========================================
  const [select_loading, setselect_loading] = useState("");

  const [All_Form_Title, setAll_Form_Title] = useState([]);
  const getall_form_title = async () => {
    try {
      setselect_loading("title");
      const params = new URLSearchParams();
      // Always include lookup_type
      params.append("lookup_type", "form_title");

      // Optionally, if you want to filter by parent_lookup_id
      // params.append("parent_lookup_id", "SOME_PARENT_ID");

      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Form_Title(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all country code==========================================

  const [All_Country_Code, setAll_Country_Code] = useState([]);
  const getall_country_code = async () => {
    try {
      setselect_loading("country_code");
      const params = new URLSearchParams();
      params.append("lookup_type", "country_code");
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Country_Code(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all profession category==========================================

  const [All_Profession_Category, setAll_Profession_Category] = useState([]);
  const getall_profession_category = async () => {
    try {
      setselect_loading("profession_category");
      const params = new URLSearchParams();
      params.append("lookup_type", "profession_category");
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Profession_Category(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all profession sub category==========================================

  const [All_Profession_Sub_Category, setAll_Profession_Sub_Category] =
    useState([]);
  const getall_profession_sub_category = async () => {
    try {
      setselect_loading("profession_sub_category");
      const params = new URLSearchParams();
      params.append("lookup_type", "profession_sub_category");
      params.append("parent_lookup_value", contact.profession_category);
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Profession_Sub_Category(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all designation==========================================

  const [All_Designation, setAll_Designation] = useState([]);
  const getall_designation = async () => {
    try {
      setselect_loading("designation");
      const params = new URLSearchParams();
      params.append("lookup_type", "designation");
      params.append("parent_lookup_value", contact.profession_subcategory);
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Designation(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all country==========================================

  const [All_Country, setAll_Country] = useState([]);
  const getall_country = async () => {
    try {
      setselect_loading("country");
      const params = new URLSearchParams();
      params.append("lookup_type", "country");
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Country(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all state==========================================

  const [All_State, setAll_State] = useState([]);
  const getall_state = async () => {
    try {
      setselect_loading("state");
      const params = new URLSearchParams();
      params.append("lookup_type", "state");
      params.append("parent_lookup_value", contact.country1);
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_State(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all city==========================================

  const [All_City, setAll_City] = useState([]);
  const getall_city = async () => {
    try {
      setselect_loading("city");
      const params = new URLSearchParams();
      params.append("lookup_type", "city");
      params.append("parent_lookup_value", contact.state1);
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_City(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  const professtiondetails = {
    designation: {
      Illustrator: ["Proprietor"],
      Writer: ["Proprietor"],
      "Digital Content Creator": ["Proprietor"],
      "Social Media Influencer": ["Proprietor"],
      Podcaster: ["Proprietor"],
      "Music Producer": ["Proprietor"],
      "Management Consultant": ["Proprietor"],
      "Financial Advisor": ["Proprietor"],
      "IT Consultant": ["Proprietor"],
      "Business Strategist": ["Proprietor"],
      "Marketing Consultant": ["Proprietor"],
      "Life Coach": ["Proprietor"],
      "Career Counselor": ["Proprietor"],
      "Freelance Software Developer": ["Proprietor"],
      "Web Developer": ["Proprietor"],
      "Data Analyst": ["Proprietor"],
      "App Developer": ["Proprietor"],
      "UX/UI Designer": ["Proprietor"],
      "Cybersecurity Consultant": ["Proprietor"],
      "Private Practitioner (Doctor)": ["Proprietor"],
      Physiotherapist: ["Proprietor"],
      "Dietitian or Nutritionist": ["Proprietor"],
      "Yoga Instructor": ["Proprietor"],
      "Personal Trainer": ["Proprietor"],
      "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)": [
        "Proprietor",
      ],
      "Private Tutor": ["Proprietor"],
      "Test Preparation Coach": ["Proprietor"],
      "Online Educator": ["Proprietor"],
      "Language Trainer": ["Proprietor"],
      "Corporate Trainer": ["Proprietor"],
      "Independent Lawyer": ["Proprietor"],
      "Chartered Accountant (CA)": ["Proprietor"],
      "Tax Consultant": ["Proprietor"],
      Auditor: ["Proprietor"],
      "Financial Planner": ["Proprietor"],
      Tailor: ["Proprietor"],
      Carpenter: ["Proprietor"],
      Blacksmith: ["Proprietor"],
      "Jewelry Maker": ["Proprietor"],
      "Ceramic Artist": ["Proprietor"],
      "Real Estate Agent": ["Proprietor"],
      Broker: ["Proprietor"],
      "Sales Representative": ["Proprietor"],
      "Freelance Chef": ["Proprietor"],
      "Event Planner": ["Proprietor"],
      "Makeup Artist": ["Proprietor"],
      Hairstylist: ["Proprietor"],
      "Wedding Photographer": ["Proprietor"],
      "Independent Farmer": ["Proprietor"],
      "Organic Produce Supplier": ["Proprietor"],
      Horticulturist: ["Proprietor"],

      "Software Developer": ["Software Developer"],

      "Human Resources (HR)": [
        "HR Executives",
        "Talent Acquisition Specialists",
        "Employee Relations Managers",
        "Training and Development Specialists",
        "HR Business Partners",
        "HR Executives",
        "Talent Acquisition Specialists",
        "Employee Relations Managers",
        "Training and Development Specialists",
        "HR Business Partners",
      ],
      Manager: [
        "Marketing Managers",
        "Brand Managers",
        "Business Development Managers",
        "Digital Marketing Specialists",
        "Logistics Coordinators",
        "Procurement Specialists",
        "Inventory Managers",
        "Client Relationship Managers",
        "Social Media Managers",
        "Event Planners",
        "Facility Managers",
        "Hotel Managers",
        "Front Desk Executives",
        "Event Coordinators",
        "Start-up Employees",
        "Team Manager",
        "Operations Manager",
        "General Manager",
        "Operations Managers",
        "Logistics Coordinators",
        "Procurement Specialists",
        "Inventory Managers",
        "Innovation Managers",
        "Customer Support Executives",
        "Sales Manager",
        "Public Relations Specialists",
        "Office Managers",
        "Executive Assistants",
        "Receptionists",
        "Innovation Managers",
        "Customer Support Executives",
        "Plant Managers",
        "Quality Inspectors",
        "Fleet Managers",
        "Marketing Managers",
        "Brand Managers",
        "Business Development Managers",
        "Digital Marketing Specialists",
      ],

      Technicians: [
        "Technical Support Specialists",
        "Maintenance Technicians",
        "Lab Technicians",
        "Technical Lead",
        "Laboratory Technicians",
      ],
      Hospitality: ["Housekeeping Staff"],

      Artist: ["Creative Artists", "Musicians"],
      Engineer: [
        "Junior Engineer",
        "Project Engineer",
        "Senior Engineer",
        "Engineering Manager",
      ],
      "Freelance Graphic Designer": ["Proprietor"],
      Photographer: ["Proprietor"],
      Videographer: ["Proprietor"],
      "Independent Artist": ["Proprietor"],
      Illustrator: ["Proprietor"],
      "Writer (Author, Blogger, or Copywriter)": ["Proprietor"],
      "Digital Content Creator": ["Proprietor"],
      "Social Media Influencer": ["Proprietor"],
      Podcaster: ["Proprietor"],
      "Music Producer": ["Proprietor"],
      "Management Consultant": ["Proprietor"],
      "Financial Advisor": ["Proprietor"],
      "IT Consultant": ["Proprietor"],
      "Business Strategist": ["Proprietor"],
      "Marketing Consultant": ["Proprietor"],
      "Life Coach": ["Proprietor"],
      "Career Counselor": ["Proprietor"],
      "Freelance Software Developer": ["Proprietor"],
      "Web Developer": ["Proprietor"],
      "Data Analyst": ["Proprietor"],
      "App Developer": ["Proprietor"],
      "UX/UI Designer": ["Proprietor"],
      "Cybersecurity Consultant": ["Proprietor"],
      "Private Practitioner (Doctor)": ["Proprietor"],
      Physiotherapist: ["Proprietor"],
      "Dietitian or Nutritionist": ["Proprietor"],
      "Yoga Instructor": ["Proprietor"],
      "Personal Trainer": ["Proprietor"],
      "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)": [
        "Proprietor",
      ],
      "Private Tutor": ["Proprietor"],
      "Test Preparation Coach": ["Proprietor"],
      "Online Educator": ["Proprietor"],
      "Language Trainer": ["Proprietor"],
      "Corporate Trainer": ["Proprietor"],
      "Independent Lawyer": ["Proprietor"],
      "Chartered Accountant (CA)": ["Proprietor"],
      "Tax Consultant": ["Proprietor"],
      Auditor: [
        "Proprietor",
        "Internal Auditor",
        "Risk Auditor",
        "Audit Manager",
      ],
      "Financial Planner": ["Proprietor"],
      Tailor: ["Proprietor"],
      Carpenter: ["Proprietor"],
      Blacksmith: ["Proprietor"],
      "Jewelry Maker": ["Proprietor"],
      "Ceramic Artist": ["Proprietor"],
      "Real Estate Agent": ["Proprietor"],
      "Property Consultant": ["Proprietor"],
      Broker: ["Proprietor"],
      "Sales Representative": ["Proprietor"],
      "Freelance Chef": ["Proprietor"],
      "Event Planner": ["Proprietor"],
      "Makeup Artist": ["Proprietor"],
      Hairstylist: ["Proprietor"],
      "Wedding Photographer": ["Proprietor"],
      "Independent Farmer": ["Proprietor"],
      "Organic Produce Supplier": ["Proprietor"],
      Horticulturist: ["Proprietor"],
      Investor: ["Angel Investor", "Venture Capitalist", "Portfolio Manager"],
      Entrepreneurs: ["Founder", "Co-Founder", "CEO", "Managing Director"],
      "Start-up Founders": ["Founder", "Co-Founder, CEO", "Visionary Leader"],
      Retailer: [
        "Shop Owner",
        "Retail Manager",
        "Proprietor",
        "Franchise Owner",
      ],
      Wholesaler: [
        "Wholesale Business Owner",
        "Distribution Head",
        "Supply Chain Owner",
      ],
      "Importer/Exporter": [
        "Import/Export Manager",
        "Trade Consultant",
        "Supply Chain Owner",
      ],
      Distributor: [
        "Chief Trading Officer",
        "Trading Business Owner",
        "Independent Trader",
      ],
      Trader: [
        "Wholesale Business Owner",
        "Distribution Head",
        "Supply Chain Owner",
      ],
      "Real Estate Developer": [
        "Real Estate Developer",
        "Managing Partner",
        "Property Consultant",
      ],
      "Real Eastate Investor": [
        "Property Investor",
        "Real Estate Strategist",
        "Investment Manager",
      ],
      "Real Estate Agent": [
        "Real Estate Consultant",
        "Real Estate Advisor",
        "Realtor",
      ],
      Manufacturer: [
        "Factory Owner",
        "Production Head",
        "Chief Manufacturing Officer",
      ],
      Industrialist: [
        "Business Tycoon",
        "Industry Leader",
        "Managing Director",
      ],
      Financer: [
        "Chief Financial Officer (CFO)",
        "Financial Advisor",
        "Investment Consultant",
      ],
      "Stock Trader": ["Equity Investor", "Day Trader", "Portfolio Manager"],
      "Hotel Owner": [
        "Hospitality Owner",
        "General Manager (GM)",
        "Managing Director",
      ],
      "Resort Owner": [
        "Resort Manager",
        "Owner and Operator",
        "Hospitality Director",
      ],
      "Travel Agency": [
        "Travel Consultant",
        "Tourism Business Owner",
        "Founder",
      ],
      "Restaurant Owner": [
        "Restaurant Manager",
        "Food Entrepreneur",
        "Culinary Director",
      ],
      Agriculturist: [
        "Farm Owner",
        "Agriculture Consultant",
        "Rural Entrepreneur",
      ],
      "Dairy Business Owner": [
        "Dairy Farmer",
        "Milk Processing Entrepreneur",
        "Managing Partner",
      ],
      "IT Person": [
        "IT Consultant",
        "Software Solutions Owner",
        "IT Entrepreneur",
        "Software Developers",
        "System Administrators",
        "IT Support Specialists",
        "Data Scientists",
        "Cybersecurity Analysts",
        "Junior Developer",
        "Full Stack Developer",
        "Senior Software Engineer",
        "Technical Lead",
      ],
      "Coaching Centre Owner": [
        "Education Entrepreneur",
        "Coaching Director",
        "Academic Manager",
      ],
      "Training Institute Owner": [
        "Training Consultant",
        "Institute Director",
        "Founder",
      ],
      "Online Tutor": ["Founder and Educator", "Academic Content Creator"],
      "Private Tutor": ["Independent Tutor", "Education Consultant"],
      "Hospital Owner": [
        "Healthcare Entrepreneur",
        "Medical Director",
        "Hospital Administrator",
      ],
      "Wellness Centre Owner": [
        "Wellness Consultant",
        "Health and Fitness Director",
        "Gym Owner",
      ],
      "Fitness Centre Owner": [
        "Gym Owner",
        "Fitness Director",
        "Health Entrepreneur",
      ],
      "Advertising Agency Owner": [
        "Creative Director",
        "Marketing Strategist",
        "Founder",
      ],
      "Film Producer": ["Producer", "Film Studio Owner", "Creative Producer"],
      "Media House Owner": ["Media Entrepreneur", "Chief Editor", "Publisher"],
      Designer: ["Creative Director", "Fashion Entrepreneur"],
      Transporter: ["Logistics Manager", "Transport Business Owner"],
      "Courier Servicer": ["Courier Business Owner", "Operations Manager"],
      "Renewable Energy and Environment": [
        "Renewable Energy Consultant",
        "Sustainable Entrepreneur",
      ],
      Boutique: ["Fashion Boutique Owner", "Creative Head"],
      "Salon Owner": ["Salon Manager", "Beauty Entrepreneur"],
      "Security Service Provider": ["Security Agency Owner", "Operations Head"],
      "Legal Firm Owner": ["Advocate and Owner", "Managing Partner"],
      "Digital Business": ["Founder", "Digital Marketing Consultant"],
      "Infrastructure Developer": [
        "Real Estate Developer",
        "Project Consultant",
      ],
      Agriculturist: ["Agribusiness Entrepreneur", "Food Processing Director"],
      "Poultry Farm Owner": ["Poultry Business Owner", "Farm Manager"],
      "Handicrafts Business Owner": [
        "Artisan Entrepreneur",
        "Creative Entrepreneur",
      ],
      "Investment Banker": ["Investment Advisor", "Wealth Manager"],
      "Loan Cosultant": ["Financial Consultant", "Loan Advisor"],
      "IT Company Owner": ["IT Entrepreneur", "Chief Technology Officer (CTO)"],
      "Cloud Service Provider": [
        "Cloud Solutions Architect",
        "IT Entrepreneur",
      ],
      Emigration: ["Immigration Consultant", "Visa Solutions Provider"],
      Catering: ["Catering Business Owner", "Culinary Director"],
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
    setAvailableSubcategories(
      professtiondetails.profession_subcategory[selectedCategory] || []
    );
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
    setAvailableDesignations(
      professtiondetails.designation[selectedSubcategory] || []
    );
  };

  // Handle designation change
  const handleDesignationChange = (event) => {
    const selectedDesignation = event.target.value;

    setcontact((prevLead) => ({
      ...prevLead,
      designation: selectedDesignation,
    }));
  };

  useEffect(() => {
    fetchcdata();
  }, []);

  const [cdata, setcdata] = useState([]);
  const [totalcompany, settotalcompany] = useState();
  const fetchcdata = async (event) => {
    try {
      const resp = await api.get("viewcompany");
      setcdata(resp.data.developer);
      const countcompany = Array.isArray(resp.data.developer)
        ? resp.data.developer
        : [resp.data.developer];
      settotalcompany(countcompany.length);
      // setFilteredData(countcontact);
    } catch (error) {
      console.log(error);
    }
  };
  const time = new Date();

  const basicdetails = () => {
    document.getElementById("basicdetails1").style.display = "flex";
    document.getElementById("basicdetails2").style.display = "flex";
    document.getElementById("basic").style.color = "green";
    document.getElementById("other").style.color = "black";
    //  document.getElementById("professional").style.color="black"
    document.getElementById("otherdetails").style.display = "none";
    // document.getElementById("profession").style.display="none"
  };

  const otherdetails = () => {
    document.getElementById("basicdetails1").style.display = "none";
    document.getElementById("basicdetails2").style.display = "none";
    //  document.getElementById("profession").style.display="none"
    document.getElementById("otherdetails").style.display = "flex";
    document.getElementById("basic").style.color = "black";
    // document.getElementById("professional").style.color="black"
    document.getElementById("other").style.color = "green";
  };

  function addFn1() {
    setcontact({
      ...contact,
      country_code: [...contact.country_code, ""],
      mobile_no: [...contact.mobile_no, ""],
      mobile_type: [...contact.mobile_type, ""],
      action1: [...contact.action1, ""],
    });
  }

  const deleteall1 = (index) => {
    const newcountry_code = contact.country_code.filter((_, i) => i !== index);
    const newmobile_no = contact.mobile_no.filter((_, i) => i !== index);
    const newmobile_type = contact.mobile_type.filter((_, i) => i !== index);
    const newaction1 = contact.action1.filter((_, i) => i !== index);

    setcontact({
      ...contact,
      country_code: newcountry_code,
      mobile_no: newmobile_no,
      mobile_type: newmobile_type,
      action1: newaction1,
    });
  };
  const handlecountry_codechange = (index, event) => {
    const newcountry_code = [...contact.country_code];
    newcountry_code[index] = event.target.value;
    setcontact({
      ...contact,
      country_code: newcountry_code,
    });
  };
  const handlemobile_nochange = (index, event) => {
    const newmobile_no = [...contact.mobile_no];
    newmobile_no[index] = event.target.value;
    setcontact({
      ...contact,
      mobile_no: newmobile_no,
    });
  };
  const handlemobile_typechange = (index, event) => {
    const newmobile_type = [...contact.mobile_type];
    newmobile_type[index] = event.target.value;
    setcontact({
      ...contact,
      mobile_type: newmobile_type,
    });
  };

  function addFn2() {
    setcontact({
      ...contact,
      email: [...contact.email, ""],
      email_type: [...contact.email_type, ""],
      action2: [...contact.action2, ""],
    });
  }

  const deleteall2 = (index) => {
    const newemail = contact.email.filter((_, i) => i !== index);
    const newemail_type = contact.email_type.filter((_, i) => i !== index);
    const newaction2 = contact.action2.filter((_, i) => i !== index);

    setcontact({
      ...contact,
      email: newemail,
      email_type: newemail_type,
      action2: newaction2,
    });
  };
  const handleemailchange = (index, event) => {
    const newemail = [...contact.email];
    newemail[index] = event.target.value;
    setcontact({
      ...contact,
      email: newemail,
    });
  };
  const handleemail_typechange = (index, event) => {
    const newemail_type = [...contact.email_type];
    newemail_type[index] = event.target.value;
    setcontact({
      ...contact,
      email_type: newemail_type,
    });
  };

  function addFn4() {
    setcontact({
      ...contact,
      education: [...contact.education, ""],
      degree: [...contact.degree, ""],
      school_college: [...contact.school_college, ""],
      action4: [...contact.action4, ""],
    });
  }
  const deleteall4 = (index) => {
    const neweducation = contact.education.filter((_, i) => i !== index);
    const newdegree = contact.degree.filter((_, i) => i !== index);
    const newschool_college = contact.school_college.filter(
      (_, i) => i !== index
    );
    const newaction4 = contact.action4.filter((_, i) => i !== index);

    setcontact({
      ...contact,
      education: neweducation,
      degree: newdegree,
      school_college: newschool_college,
      action4: newaction4,
    });
  };
  const handleeducationChange = (index, event) => {
    const neweducation = [...contact.education];
    neweducation[index] = event.target.value;
    setcontact({
      ...contact,
      education: neweducation,
    });
  };
  const handledegreeChange = (index, event) => {
    const newdegree = [...contact.degree];
    newdegree[index] = event.target.value;
    setcontact({
      ...contact,
      degree: newdegree,
    });
  };

  const handleschool_collegeChange = (index, event) => {
    const newschool = [...contact.school_college];
    newschool[index] = event.target.value;
    setcontact({
      ...contact,
      school_college: newschool,
    });
  };

  function addFn5() {
    setcontact({
      ...contact,
      loan: [...contact.loan, ""],
      bank: [...contact.bank, ""],
      amount: [...contact.amount, ""],
      action5: [...contact.action5, ""],
    });
  }
  const deleteall5 = (index) => {
    const newloan = contact.loan.filter((_, i) => i !== index);
    const newbank = contact.bank.filter((_, i) => i !== index);
    const newamount = contact.amount.filter((_, i) => i !== index);
    const newaction5 = contact.action5.filter((_, i) => i !== index);

    setcontact({
      ...contact,
      loan: newloan,
      bank: newbank,
      amount: newamount,
      action5: newaction5,
    });
  };
  const handleloanchange = (index, event) => {
    const newloan = [...contact.loan];
    newloan[index] = event.target.value;
    setcontact({
      ...contact,
      loan: newloan,
    });
  };
  const handlebankchange = (index, event) => {
    const newbank = [...contact.bank];
    newbank[index] = event.target.value;
    setcontact({
      ...contact,
      bank: newbank,
    });
  };
  const handleamountchange = (index, event) => {
    const newamount = [...contact.amount];
    newamount[index] = event.target.value;
    setcontact({
      ...contact,
      amount: newamount,
    });
  };

  function addFn6() {
    setcontact({
      ...contact,
      social_media: [...contact.social_media, ""],
      url: [...contact.url, ""],
      action6: [...contact.action6, ""],
    });
  }
  const deleteall6 = (index) => {
    const newsocial_media = contact.social_media.filter((_, i) => i !== index);
    const newurl = contact.url.filter((_, i) => i !== index);
    const newaction6 = contact.action6.filter((_, i) => i !== index);

    setcontact({
      ...contact,
      social_media: newsocial_media,
      url: newurl,
      action6: newaction6,
    });
  };
  const handlesocial_mediachange = (index, event) => {
    const newsocial_media = [...contact.social_media];
    newsocial_media[index] = event.target.value;
    setcontact({
      ...contact,
      social_media: newsocial_media,
    });
  };
  const handleurlChange = (index, event) => {
    const newurl = [...contact.url];
    newurl[index] = event.target.value;
    setcontact({
      ...contact,
      url: newurl,
    });
  };

  function addFn7() {
    setcontact({
      ...contact,
      income: [...contact.income, ""],
      amount1: [...contact.amount1, ""],
      action7: [...contact.action7, ""],
    });
  }
  const deleteall7 = (index) => {
    const newincome = contact.income.filter((_, i) => i !== index);
    const newamount1 = contact.amount1.filter((_, i) => i !== index);
    const newaction7 = contact.action7.filter((_, i) => i !== index);

    setcontact({
      ...contact,
      income: newincome,
      amount1: newamount1,
      action7: newaction7,
    });
  };
  const handleincomechange = (index, event) => {
    const newincome = [...contact.income];
    newincome[index] = event.target.value;
    setcontact({
      ...contact,
      income: newincome,
    });
  };
  const handleamount1change = (index, event) => {
    const newamount1 = [...contact.amount1];
    newamount1[index] = event.target.value;
    setcontact({
      ...contact,
      amount1: newamount1,
    });
  };

  function addFn8() {
    setcontact({
      ...contact,
      document_no: [...contact.document_no, ""],
      document_name: [...contact.document_name, ""],
      document_pic: [...contact.document_pic, ""],
      action8: [...contact.action8, ""],
    });
  }
  const deleteall8 = (index) => {
    const newdocumentno = contact.document_no.filter((_, i) => i !== index);
    const newdocumentname = contact.document_name.filter((_, i) => i !== index);
    const newdocumentpic = contact.document_pic.filter((_, i) => i !== index);
    const newaction8 = contact.action8.filter((_, i) => i !== index);

    setcontact({
      ...contact,
      document_no: newdocumentno,
      document_name: newdocumentname,
      document_pic: newdocumentpic,
      action8: newaction8,
    });
  };
  const handledocumentnochange = (index, event) => {
    const newdocumentno = [...contact.document_no];
    newdocumentno[index] = event.target.value;
    setcontact({
      ...contact,
      document_no: newdocumentno,
    });
  };
  const handledocumentnamechange = (index, event) => {
    const newdocumentname = [...contact.document_name];
    newdocumentname[index] = event.target.value;
    setcontact({
      ...contact,
      document_name: newdocumentname,
    });
  };
  const handledocumentpicchange = (index, event) => {
    const newdocumentpic = [...contact.document_pic];
    const files = Array.from(event.target.files);
    newdocumentpic[index] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setcontact({
      ...contact,
      document_pic: newdocumentpic,
    });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  function next1() {
    document.getElementById("basicdetails1").style.display = "none";
    document.getElementById("basicdetails2").style.display = "none";
    document.getElementById("otherdetails").style.display = "flex";

    document.getElementById("other").style.color = "green";
    document.getElementById("basic").style.color = "black";
  }

  function prev2() {
    document.getElementById("basicdetails1").style.display = "flex";
    document.getElementById("basicdetails2").style.display = "flex";
    document.getElementById("otherdetails").style.display = "none";

    document.getElementById("basic").style.color = "green";
    document.getElementById("other").style.color = "black";
  }

 



  const [loading_owners, setloading_owners] = useState(false);

  const [ownersList, setownersList] = useState([]);

  const getall_userdata = async () => {
    try {
      setloading_owners(true);
      const resp = await api.get("api/settings/viewuser");
      setownersList(resp.data.user.map((item) => item.full_name));
    } catch (error) {
      console.log(error);
    } finally {
      setloading_owners(false);
    }
  };

  useEffect(() => {
    getall_userdata();
  }, []);

  const [owners, setOwners] = useState([]);

  const handleOwnerChange = (event) => {
    const {
      target: { value },
    } = event;

    const selectedOwners = typeof value === "string" ? value.split(",") : value;

    setOwners(selectedOwners);
    setcontact({ ...contact, owner: selectedOwners });
  };
  return (
    <div>
      <div id="h">
        <Header1 />
      </div>
      <div>
        <Sidebar1 />
      </div>

      <div style={{ padding: "50px" }}>
        <div className="container  bg-white mt-5 mb-5 ml-200px w-[80%] shadow-2xl rounded-xl">
          <div className="row" id="r" style={{ transition: "0.5s" }}>
            <div className="col-md-12 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1
                    className="text-right text-xl font-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.location.reload()}
                  >
                    Add Contact
                  </h1>
                  <input
                    type="checkbox"
                    id="checkform"
                    style={{ marginLeft: "60%", height: "20px", width: "20px" }}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label style={{ paddingTop: "5px" }}>
                    only show required field
                  </label>
                </div>
                <hr></hr>

                <div
                  id="sortform"
                  style={{ display: isChecked ? "flex" : "none" }}
                >
                  <div
                    className="row"
                    id="basicdetails11"
                    style={{ marginTop: "40px" }}
                  >
                    <div className=" col-md-12 d-flex justify-content-between align-items-center experience">
                      <span>Basic Details</span>
                    </div>
                    <div className="col-md-12 mb-3 custom-input">
                      <hr></hr>
                    </div>
                    <div className="col-md-2 mb-3 custom-input">
                      <label className="form-label">Title</label>

                      <select
                        className="form-control form-control-sm"
                        required={true}
                        onClick={() => {
                          if (All_Form_Title.length === 0) {
                            getall_form_title();
                          }
                        }}
                        onChange={(e) =>
                          setcontact({ ...contact, title: e.target.value })
                        }
                      >
                        {select_loading === "title" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option value="">-- Select Title --</option>

                            {/* Dynamic Fetched List */}
                            {All_Form_Title.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>

                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        required="true"
                        className="form-control form-control-sm"
                        placeholder="first name"
                        onChange={(e) =>
                          setcontact({ ...contact, first_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Surname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="surname"
                        onChange={(e) =>
                          setcontact({ ...contact, last_name: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Country</label>
                      {contact.country_code.map((item, index) => (
                        <select
                          style={{ marginTop: "10px" }}
                          required="true"
                          className="form-control form-control-sm"
                          value={contact?.country_code[index]}
                          onClick={() => {
                            if (All_Country_Code.length === 0) {
                              getall_country_code();
                            }
                          }}
                          onChange={(event) =>
                            handlecountry_codechange(index, event)
                          }
                        >
                          {select_loading === "country_code" ? (
                            <option>⏳ Loading...</option>
                          ) : (
                            <>
                              <option value="">
                                -- Select Country Code --
                              </option>

                              {/* Dynamic Fetched List */}
                              {All_Country_Code.map((val, i) => (
                                <option key={i} value={val.lookup_value}>
                                  {val.lookup_value}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      ))}
                    </div>
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Mobile Number</label>
                      {contact.mobile_no.map((item, index) => (
                        <input
                          type="text"
                          required="true"
                          style={{ marginTop: "10px" }}
                          className="form-control form-control-sm"
                          placeholder="enter phone number"
                          onChange={(event) =>
                            handlemobile_nochange(index, event)
                          }
                        />
                      ))}
                    </div>
                    <div className="col-md-2 mb-3 custom-input">
                      <label className="form-label">Type</label>
                      {contact.mobile_type.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) =>
                            handlemobile_typechange(index, event)
                          }
                        >
                          <option>Personal</option>
                          <option>Official</option>
                          <option>Home</option>
                          <option>Phone</option>
                        </select>
                      ))}
                    </div>
                    <div className="col-md-1" style={{ marginTop: "90px" }}>
                      {contact.action1.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall1(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn1}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-md-8 mb-3 custom-input">
                      <label className="form-label">Email-Address</label>
                      {contact.email.map((item, index) => (
                        <input
                          type="text"
                          style={{ marginTop: "10px" }}
                          className="form-control form-control-sm"
                          placeholder="enter email-id"
                          onChange={(event) => handleemailchange(index, event)}
                        />
                      ))}
                    </div>

                    <div className="col-md-2 mb-3 custom-input">
                      <label className="form-label">Type</label>
                      {contact.email_type.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) =>
                            handleemail_typechange(index, event)
                          }
                        >
                          <option>Personal</option>
                          <option>Official</option>
                          <option>Business</option>
                        </select>
                      ))}
                    </div>

                    <div className="col-md-1" style={{ marginTop: "90px" }}>
                      {contact.action2.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall2(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn2}
                      >
                        +
                      </button>
                    </div>
                    <div className="col-md-12 mb-3 custom-input">
                      <label
                        className="form-label"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        System Details
                      </label>
                      <hr style={{ marginTop: "-5px" }}></hr>
                    </div>

                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Source</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, source: e.target.value })
                        }
                      >
                        <option>Select</option> <option>Friends</option>{" "}
                        <option>Relative</option> <option>Website</option>
                        <option>Walkin</option>
                        <option>Magicbricks</option>
                        <option>Common Floor </option>
                        <option>Housing</option>
                        <option>99acre</option>
                        <option>Olx</option>
                        <option>Square Yard </option>
                        <option>Real Estate India </option>
                        <option>Refrence</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Linkdin</option>
                        <option>Old Client</option>
                        <option>Google</option>
                        <option>Whatsapp</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Team</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, team: e.target.value })
                        }
                      >
                        <option>Select</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option> Post Sales</option>
                        <option> Pre Sales</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Owner</label>

                      <Select
                        className="form-control form-control-sm"
                        multiple
                        value={owners}
                        onChange={handleOwnerChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {loading_owners ? (
                          <MenuItem disabled>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <CircularProgress
                                size={20}
                                style={{ marginRight: 8 }}
                              />
                              Loading owners...
                            </div>
                          </MenuItem>
                        ) : ownersList.length > 0 ? (
                          ownersList.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={owners.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No owners found</MenuItem>
                        )}
                      </Select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Visible to</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, visible_to: e.target.value })
                        }
                      >
                        <option>Select</option>
                        <option>My Team</option>
                        <option>My Self</option>
                        <option>All Users</option>
                      </select>
                    </div>
                    <div className="col-md-5 mb-3 custom-input"></div>
                    <div
                      className="col-md-2 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        className="form-control form-control-sm"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div
                      className="col-md-3 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                    >
                      <button className="form-control form-control-sm">
                        Save & View Contact
                      </button>
                    </div>
                    <div
                      className="col-md-2 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        className="form-control form-control-sm"
                        onClick={addcontact}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: isChecked ? "none" : "flex", gap: "80px" }}
                >
                  <span
                    id="basic"
                    onClick={basicdetails}
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      width: "200px",
                    }}
                  >
                    Basic Details
                  </span>

                  <span
                    id="other"
                    onClick={otherdetails}
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      width: "200px",
                    }}
                  >
                    Personal Details
                  </span>

                  <span style={{ marginLeft: "200px", width: "31%" }}>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      placeholder={time}
                      value={time}
                      style={{ border: "none" }}
                    />
                  </span>
                </div>

                {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}

                {/* ====================================full form start with basic details====================================================== */}

                <div
                  id="fullform"
                  style={{ display: isChecked ? "none" : "block" }}
                >
                  <div
                    className="row"
                    id="basicdetails1"
                    style={{ marginTop: "40px" }}
                  >
                    <div className=" col-md-12 d-flex justify-content-between align-items-center experience">
                      <span>Basic Details</span>
                    </div>
                    <div className="col-md-12">
                      <hr></hr>
                    </div>
                    <div className="col-md-2 mb-3 custom-input">
                      <label className="form-label">Title</label>
                      <select
                        className="form-control form-control-sm"
                        required="true"
                        onClick={() => {
                          if (All_Form_Title.length === 0) {
                            getall_form_title();
                          }
                        }}
                        value={contact?.title}
                        onChange={(e) =>
                          setcontact({ ...contact, title: e.target.value })
                        }
                      >
                        {select_loading === "title" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option value="">-- Select Title --</option>

                            {/* Dynamic Fetched List */}
                            {All_Form_Title.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="col-md-5 mb-3 custom-input ">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        required
                        className="form-control form-control-sm"
                        placeholder="First name"
                        onChange={(e) =>
                          setcontact({ ...contact, first_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-5 mb-3 custom-input ">
                      <label className="form-label">Surname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="surname"
                        onChange={(e) =>
                          setcontact({ ...contact, last_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-0" id="basicdetails2">
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Country</label>
                      {contact.country_code.map((item, index) => (
                        <select
                          required="true"
                          className="form-control form-control-sm"
                          value={contact?.country_code}
                          onClick={() => {
                            if (All_Country_Code.length === 0) {
                              getall_country_code();
                            }
                          }}
                          onChange={(event) =>
                            handlecountry_codechange(index, event)
                          }
                        >
                          {select_loading === "country_code" ? (
                            <option>⏳ Loading...</option>
                          ) : (
                            <>
                              <option value="">
                                -- Select Country Code --
                              </option>

                              {/* Dynamic Fetched List */}
                              {All_Country_Code.map((val, i) => (
                                <option key={i} value={val.lookup_value}>
                                  {val.lookup_value}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      ))}
                    </div>
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Mobile Number</label>
                      {contact.mobile_no.map((item, index) => (
                        <input
                          type="text"
                          required="true"
                          style={{ marginBottom: "2px" }}
                          className="form-control form-control-sm"
                          placeholder="enter phone number"
                          onChange={(event) =>
                            handlemobile_nochange(index, event)
                          }
                        />
                      ))}
                    </div>
                    <div className="col-md-2 mb-3 custom-input">
                      <label className="form-label">Type</label>
                      {contact.mobile_type.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginBottom: "2px" }}
                          onChange={(event) =>
                            handlemobile_typechange(index, event)
                          }
                        >
                          <option>Personal</option>
                          <option>Official</option>
                          <option>Home</option>
                          <option>Phone</option>
                        </select>
                      ))}
                    </div>
                    <div className="col-md-1" style={{ marginTop: "70px" }}>
                      {contact.action1.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/> */}
                          <span
                            class="material-icons"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteall1(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn1}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-md-8 mb-3 custom-input">
                      <label className="form-label">Email-Address</label>
                      {contact.email.map((item, index) => (
                        <input
                          type="text"
                          style={{ marginBottom: "2px" }}
                          className="form-control form-control-sm"
                          placeholder="enter email-id"
                          onChange={(event) => handleemailchange(index, event)}
                        />
                      ))}
                    </div>

                    <div className="col-md-2 mb-3 custom-input mb-3 custom-input">
                      <label className="form-label">Type</label>
                      {contact.email_type.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginBottom: "2px" }}
                          onChange={(event) =>
                            handleemail_typechange(index, event)
                          }
                        >
                          <option>Personal</option>
                          <option>Official</option>
                          <option>Business</option>
                        </select>
                      ))}
                    </div>

                    <div className="col-md-1" style={{ marginTop: "70px" }}>
                      {contact.action2.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <span
                            class="material-icons"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteall2(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn2}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-md-12 mb-3 custom-input">
                      <label className="form-label">Tags</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, tags: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-10 mb-3 custom-input">
                      <label className="form-label">Descriptions</label>
                      <textarea
                        className="form-control form-control-sm"
                        style={{ borderRadius: "8px", height: "100px" }}
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            descriptions: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-2 mb-3 custom-input"></div>

                    <div
                      className="col-md-12 mb-3 custom-input"
                      style={{ marginTop: "10px" }}
                    >
                      <label
                        className="form-label"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        Profession Details
                      </label>
                      <hr style={{ marginTop: "-5px" }}></hr>
                    </div>

                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Profession Category</label>
                      <select
                        className="form-control form-control-sm"
                        onClick={() => {
                          if (All_Profession_Category.length === 0) {
                            getall_profession_category();
                          }
                        }}
                        value={contact.profession_category}
                        onChange={handleProfessionCategoryChange}
                      >
                        {select_loading === "profession_category" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option>---Select profession category---</option>

                            {/* Dynamic Fetched List */}
                            {All_Profession_Category.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="col-md-7 mb-3 custom-input">
                      <label className="form-label">
                        Profession Sub-Category
                      </label>
                      <select
                        className="form-control form-control-sm"
                        onClick={() => {
                          getall_profession_sub_category();
                        }}
                        style={{ overflow: "scroll" }}
                        value={contact.profession_subcategory}
                        onChange={handleProfessionSubcategoryChange}
                      >
                        {select_loading === "profession_sub_category" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option>
                              ---Select profession sub category---
                            </option>

                            {/* Dynamic Fetched List */}
                            {All_Profession_Sub_Category.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Designation</label>
                      <select
                        className="form-control form-control-sm"
                        onClick={() => {
                          getall_designation();
                        }}
                        value={contact.designation}
                        onChange={handleDesignationChange}
                      >
                        {select_loading === "designation" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option>---Select designation---</option>

                            {/* Dynamic Fetched List */}
                            {All_Designation.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">
                        Company/Organisation/Department Name
                      </label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            company_name: e.target.value,
                          })
                        }
                      >
                        <option>---Select company---</option>
                        {cdata.map((item) => (
                          <option>{item.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">Add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={() => {
                          navigate("/addcompany");
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* <div className="row mt-4">
                    <div className="col-md-2 mb-3 custom-input"   onClick={prev1}><button className="form-control form-control-sm" >Prev</button></div>
                    <div className="col-md-2 mb-3 custom-input" onClick={next2}  style={{marginLeft:"65%"}}><button className="form-control form-control-sm" >Next</button></div>
                </div> */}

                    <div className="col-md-12" style={{ marginTop: "10px" }}>
                      <label
                        className="form-label"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        System Details
                      </label>
                      <hr style={{ marginTop: "-5px" }}></hr>
                    </div>

                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Source</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, source: e.target.value })
                        }
                      >
                        <option>---Select source---</option>{" "}
                        <option>Friends</option> <option>Relative</option>{" "}
                        <option>Website</option>
                        <option>Walkin</option>
                        <option>Magicbricks</option>
                        <option>Common Floor </option>
                        <option>Housing</option>
                        <option>99acre</option>
                        <option>Olx</option>
                        <option>Square Yard </option>
                        <option>Real Estate India </option>
                        <option>Refrence</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Linkdin</option>
                        <option>Old Client</option>
                        <option>Google</option>
                        <option>Whatsapp</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Team</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, team: e.target.value })
                        }
                      >
                        <option>---Select team---</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option> Post Sales</option>
                        <option> Pre Sales</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Owner</label>
                      <Select
                        className="form-control form-control-sm"
                        style={{ borderRadius: "8px", border: "none" }}
                        multiple
                        value={owners}
                        onChange={handleOwnerChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {ownersList.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={owners.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Visible to</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, visible_to: e.target.value })
                        }
                      >
                        <option>---Select---</option>
                        <option>My Team</option>
                        <option>My Self</option>
                        <option>All Users</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <hr></hr>
                    </div>

                    <div
                      className="col-md-2 mb-3 custom-input"
                      id="projectbtn"
                      onClick={next1}
                      style={{ marginLeft: "82%" }}
                    >
                      <button
                        className="btn btn-primary btn-sm form-control"
                        onClick={next1}
                        style={{
                          fontWeight: "600",
                          borderRadius: "8px",
                          cursor: "pointer",
                          backgroundColor: "lightblue",
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/*------------------------------------------------------------ basic details end---------------------------------------------------- */}

              {/*-------------------------------------------------- personal details start--------------------------------------------------------- */}
              <div
                className="col-md-12"
                id="otherdetails"
                style={{ display: "none", marginTop: "-80px" }}
              >
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center experience">
                    <span>Personal Details</span>
                  </div>
                  <hr></hr>
                  <div className="row ">
                    <div className="col-md-12">
                      <label
                        className="form-label"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        Address Details
                      </label>
                      <hr style={{ marginTop: "-5px" }}></hr>
                    </div>

                    <div className="col-md-12 mb-3 custom-input">
                      <label className="form-label">Father/Husband name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            father_husband_name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">H.No</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, h_no: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-9 mb-3 custom-input">
                      <label className="form-label">Area</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, area1: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, location1: e.target.value })
                        }
                      />
                    </div>
                    {/* <div className="col-md-4 mb-3 custom-input"><label className="form-label">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,city1:e.target.value})}/></div> */}

                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">City</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact.city1}
                        onClick={() => {
                          getall_city();
                        }}
                        onChange={(e) =>
                          setcontact({ ...contact, city1: e.target.value })
                        }
                      >
                        {select_loading === "city" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option>---Select city---</option>

                            {/* Dynamic Fetched List */}
                            {All_City.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Pin Code</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, pincode1: e.target.value })
                        }
                      />
                    </div>

                    {/* <div className="col-md-6 mb-3 custom-input"><label className="form-label">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,state1:e.target.value,city1: "" })}/></div> */}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">State</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact.state1}
                        onClick={() => {
                          getall_state();
                        }}
                        onChange={(e) => {
                          const state = e.target.value;
                          setcontact({ ...contact, state1: state, city1: "" }); // Clear city when state changes
                        }}
                      >
                        {select_loading === "state" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option>---Select state---</option>

                            {/* Dynamic Fetched List */}
                            {All_State.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Country</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact.country1}
                        onClick={() => {
                          if (All_Country.length === 0) {
                            getall_country();
                          }
                        }}
                        onChange={(e) =>
                          setcontact({ ...contact, country1: e.target.value })
                        }
                      >
                        {select_loading === "country" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option>---Select country---</option>

                            {/* Dynamic Fetched List */}
                            {All_Country.map((val, i) => (
                              <option key={i} value={val.lookup_value}>
                                {val.lookup_value}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label
                        className="form-label"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        Other Details
                      </label>
                      <hr style={{ marginTop: "-5px" }}></hr>
                    </div>

                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, gender: e.target.value })
                        }
                      >
                        <option>---Select gender---</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div className="col-md-7 mb-3 custom-input">
                      <label className="form-label">Maritial Status</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            maritial_status: e.target.value,
                          })
                        }
                      >
                        <option>---Select your status---</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                        <option>Single</option>
                      </select>
                    </div>

                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Birth Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, birth_date: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-7 mb-3 custom-input">
                      <label className="form-label">Anniversary Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            anniversary_date: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-3 mb-3 custom-input">
                      {" "}
                      <label className="form-label">Education</label>
                      {contact.education.map((name, index) => (
                        <div key={index} style={{ marginTop: "10px" }}>
                          <select
                            className="form-control form-control-sm"
                            onChange={(event) =>
                              handleeducationChange(index, event)
                            }
                          >
                            <option>---choose your education---</option>
                            <option>Kindergaren</option>
                            <option>School</option>
                            <option>Primery Education</option>
                            <option> Secondary Education</option>
                            <option>Master</option>
                            <option>Commerce</option>
                            <option>Vocational Education</option>
                          </select>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Degree</label>
                      {contact.degree.map((name, index) => (
                        <div key={index} style={{ marginTop: "10px" }}>
                          <select
                            className="form-control form-control-sm"
                            onChange={(event) =>
                              handledegreeChange(index, event)
                            }
                          >
                            <option>---choose degree---</option>
                            <optgroup label="Bachelor’s ">
                              <option>Bachelor of Arts (BA) </option>
                              <option>Bachelor of Science (BS or BSc) </option>
                              <option>Bachelor of Fine Arts (BFA)</option>
                              <option> Bachelor of Education (BEd) </option>
                              <option>
                                {" "}
                                Bachelor of Business Administration (BBA){" "}
                              </option>
                              <option>
                                Bachelor of Engineering (BE or BEng){" "}
                              </option>
                              <option>
                                Bachelor of Science in Nursing (BSN)
                              </option>
                              <option>B.Bachelor of Laws (LLB) </option>
                              <option>
                                B.Bachelor of Architecture (BArch)
                              </option>
                              <option>Bachelor of Social Work (BSW) </option>
                              <option> Bachelor of Music (BM) </option>
                              <option>Bachelor of Pharmacy (BPharm)</option>
                              <option>Bachelor of Technology (BTech) </option>
                            </optgroup>
                            <optgroup label="Master’s ">
                              <option>Master of Arts (MA)</option>
                              <option>Master of Science (MS or MSc)</option>
                              <option>
                                Master of Business Administration (MBA)
                              </option>
                              <option>Master of Fine Arts (MFA)</option>
                              <option>
                                Master of Engineering (ME or MEng)
                              </option>
                              <option>Master of Education (MEd or EdM)</option>
                              <option>Master of Public Health (MPH) </option>
                              <option>Master of Social Work (MSW)</option>
                              <option> Master of Laws (LLM)</option>
                              <option>
                                Master of Public Administration (MPA)
                              </option>
                              <option>Master of Architecture (MArch)</option>
                              <option>
                                Master of Library Science (MLS or MLIS)
                              </option>
                              <option> Master of Music (MM or MMus)</option>
                              <option>Master of Philosophy (MPhil)</option>
                              <option>Master of Arts in Teaching (MAT)</option>
                              <option>Master of Theology (MTh or ThM)</option>
                            </optgroup>
                            <optgroup label="Doctoral ">
                              <option>Doctor of Philosophy (PhD)</option>
                              <option>Doctor of Medicine (MD)</option>
                              <option>Doctor of Education (EdD)</option>
                              <option>
                                Doctor of Business Administration (DBA){" "}
                              </option>
                              <option>Juris Doctor (JD) </option>
                              <option>Doctor of Nursing Practice (DNP) </option>
                              <option>Doctor of Public Health (DrPH)</option>
                              <option>Doctor of Psychology (PsyD)</option>
                              <option>
                                Doctor of Engineering (EngD or DEng){" "}
                              </option>
                              <option> Doctor of Pharmacy (PharmD)</option>
                              <option> Doctor of Social Work (DSW) </option>
                              <option>Doctor of Theology (ThD) </option>
                              <option>
                                Doctor of Veterinary Medicine (DVM){" "}
                              </option>
                              <option>Doctor of Musical Arts (DMA)</option>
                              <option>
                                Doctor of Dental Surgery (DDS) or Doctor of
                                Dental Medicine (DMD){" "}
                              </option>
                              <option>
                                Doctor of Public Administration (DPA)
                              </option>
                              <option>
                                Doctor of Health Administration (DHA){" "}
                              </option>
                            </optgroup>
                          </select>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">
                        School/College/University
                      </label>
                      {contact.school_college.map((name, index) => (
                        <div key={index} style={{ marginTop: "10px" }}>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={name}
                            onChange={(event) =>
                              handleschool_collegeChange(index, event)
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1" style={{ marginTop: "90px" }}>
                      {contact.action4.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall4(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn4}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Loan</label>
                      {contact.loan.map((item, index) => (
                        <select
                          type="text"
                          style={{ marginTop: "10px" }}
                          className="form-control form-control-sm"
                          onChange={(event) => handleloanchange(index, event)}
                        >
                          <option>---Select loan type---</option>
                          <option>Home Loan </option>
                          <option>Auto Loan</option>
                          <option>Personal Loan </option>
                          <option>Education Loan</option>{" "}
                          <option>Agriculture Loan </option>{" "}
                          <option>Credit Card Loan</option>
                        </select>
                      ))}
                    </div>
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Bank</label>
                      {contact.bank.map((item, index) => (
                        <select
                          type="text"
                          style={{ marginTop: "10px" }}
                          className="form-control form-control-sm"
                          onChange={(event) => handlebankchange(index, event)}
                        >
                          <option>---Select bank---</option>
                          <option>State Bank of India (SBI) </option>
                          <option>Punjab National Bank (PNB)</option>
                          <option>Bank of Baroda</option>
                          <option>Canara Bank</option>
                          <option>Union Bank of India</option>
                          <option>Bank of India (BOI)</option>
                          <option>Indian Bank </option>
                          <option>Central Bank of India</option>
                          <option>Indian Overseas Bank (IOB)</option>
                          <option>UCO Bank</option>
                          <option>Bank of Maharashtra</option>
                          <option></option>
                          <option>HDFC Bank </option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank </option>
                          <option>IndusInd Bank </option>
                          <option>Yes Bank </option>
                          <option>IDFC FIRST Bank</option>
                          <option>Federal Bank </option>
                          <option>RBL Bank </option>
                          <option>South Indian Bank</option>
                          <option>Karur Vysya Bank </option>
                          <option>Tamilnad Mercantile Bank </option>
                          <option>Bandhan Bank</option>
                          <option>Jammu & Kashmir Bank </option>
                          <option>DCB Bank </option>
                          <option>Citibank </option>
                          <option></option>
                          <option>HSBC</option>
                          <option>Standard Chartered Bank </option>
                          <option>Deutsche Bank </option>
                          <option>Barclays Bank</option>
                          <option>Royal Bank of Scotland (RBS) </option>
                          <option>Bank of America</option>
                          <option>American Express Bank </option>
                          <option>UBS</option>
                          <option>
                            Nabard Financial Services Ltd. (NABARD)
                          </option>
                          <option></option>
                          <option>The Saraswat Cooperative Bank</option>
                          <option>
                            The Mumbai District Central Cooperative Bank
                          </option>
                          <option>The Delhi State Cooperative Bank</option>
                          <option>The Karnataka Vikas Grameen Bank</option>
                          <option>
                            The Maharashtra State Cooperative Bank{" "}
                          </option>
                          <option>The Uttar Bihar Gramin Bank</option>
                          <option>The Punjab State Cooperative Bank</option>
                          <option>Gramin Bank of Aryavart </option>
                          <option></option>
                          <option>Haryana Gramin Bank</option>
                          <option>Bangiya Gramin Vikash Bank </option>
                          <option>Kaveri Grameena Bank</option>
                          <option>Prathama Bank </option>
                          <option>
                            Small Industries Development Bank of India (SIDBI){" "}
                          </option>
                          <option></option>
                          <option>
                            Export-Import Bank of India (EXIM Bank){" "}
                          </option>
                          <option>
                            National Bank for Agriculture and Rural Development
                            (NABARD){" "}
                          </option>
                          <option></option>
                        </select>
                      ))}
                    </div>
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Amount</label>
                      {contact.amount.map((item, index) => (
                        <input
                          type="text"
                          style={{ marginTop: "10px" }}
                          className="form-control form-control-sm"
                          onCanPlay={(event) =>
                            handleamountchange(index, event)
                          }
                        />
                      ))}
                    </div>
                    <div className="col-md-1" style={{ marginTop: "90px" }}>
                      {contact.action5.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall5(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn5}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Social Media</label>
                      {contact.social_media.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) =>
                            handlesocial_mediachange(index, event)
                          }
                        >
                          <option>---select social_media---</option>
                          <option>Facebook</option>
                          <option>Twitter</option>
                          <option>Instagram</option>
                          <option>Linkdin</option>
                          <option>Google</option>
                        </select>
                      ))}
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Url</label>
                      {contact.url.map((item, index) => (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) => handleurlChange(index, event)}
                        />
                      ))}
                    </div>
                    <div className="col-md-1" style={{ marginTop: "90px" }}>
                      {contact.action6.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall6(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn6}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Income</label>
                      {contact.income.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) => handleincomechange(index, event)}
                        >
                          <option>---select your income---</option>
                          <option>Personal Income</option>
                          <option>Business Income</option>
                        </select>
                      ))}
                    </div>
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Amount</label>
                      {contact.amount1.map((item, index) => (
                        <input
                          type="text"
                          style={{ marginTop: "10px" }}
                          className="form-control form-control-sm"
                          onChange={(event) =>
                            handleamount1change(index, event)
                          }
                        />
                      ))}
                    </div>
                    <div className="col-md-1" style={{ marginTop: "90px" }}>
                      {contact.action7.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall7(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn7}
                      >
                        +
                      </button>
                    </div>

                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Document No.</label>
                      {contact.document_no.map((item, index) => (
                        <input
                          type="text"
                          style={{ marginTop: "10px" }}
                          className="form-control form-control-sm"
                          onChange={(event) =>
                            handledocumentnochange(index, event)
                          }
                        />
                      ))}
                    </div>
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Document Name</label>
                      {contact.document_name.map((item, index) => (
                        // <input type="text"
                        // style={{marginTop:"10px"}}
                        // className="form-control form-control-sm"
                        // onChange={(event)=>handledocumentnamechange(index,event)}
                        // />
                        <select
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) =>
                            handledocumentnamechange(index, event)
                          }
                        >
                          <option>---select document---</option>
                          <option>Adhar Card </option>
                          <option>Pan Card </option>
                          <option>Driviing Licence</option>
                          <option>Voter Card</option>
                          <option>Ration Card</option>
                          <option>Family Id </option>
                          <option>Passoport</option>
                          <option>Employee Id Card</option>
                        </select>
                      ))}
                    </div>
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Document Picture</label>
                      {contact.document_pic.map((item, index) => (
                        <div key={index} className="custom-file-wrapper mt-2">
                          <input
                            type="file"
                            id={`doc-upload-${index}`}
                            style={{ marginTop: "10px", display: "none" }}
                            className="form-control form-control-sm"
                            multiple
                            onChange={(event) =>
                              handledocumentpicchange(index, event)
                            }
                          />
                          <label
                            htmlFor={`doc-upload-${index}`}
                            className="upload-label"
                          >
                            <i
                              className="bi bi-image-fill me-2"
                              style={{ fontSize: "1.4rem", cursor: "pointer" }}
                            ></i>{" "}
                            Upload Image
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
                      ))}
                    </div>
                    <div className="col-md-1" style={{ marginTop: "90px" }}>
                      {contact.action8.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall8(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn8}
                      >
                        +
                      </button>
                    </div>
                    <div className="col-md-12">
                      <hr></hr>
                    </div>
                    <div
                      className="col-md-2 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                      onClick={prev2}
                    >
                      <button
                        className="btn btn-outline-primary btn-sm form-control"
                        style={{
                          fontWeight: "600",
                          borderRadius: "8px",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        Prev
                      </button>
                    </div>
                    <div className="col-md-6 mb-3 custom-input"></div>
                    <div
                      className="col-md-2 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        className="btn btn-outline-danger btn-sm form-control"
                        onClick={() => navigate(-1)}
                        style={{
                          fontWeight: "600",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#dc3545";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "#dc3545";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#dc3545";
                          e.currentTarget.style.borderColor = "#dc3545";
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    {/* <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Contact</button></div> */}
                    <div
                      className="col-md-2 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        className="btn btn-primary btn-sm form-control"
                        onClick={addcontact}
                        style={{
                          fontWeight: "600",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          transition: "all 0.3s ease",
                          backgroundColor: "lightblue",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#0056b3")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#0d6efd")
                        }
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Addcontact;
