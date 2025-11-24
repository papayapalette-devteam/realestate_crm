import Header1 from "../header1";
import Sidebar1 from "../sidebar1";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";
import "../../css/addcontact.css";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  CircularProgress,
} from "@mui/material";

import Swal from "sweetalert2";

function EditContact() {
  const location = useLocation();

  const selectedItem = location?.state?.selectedItems[0];

  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const logged_user = JSON.parse(localStorage.getItem("user"));

  /*-------------------------------------------------------------------updation start---------------------------------------------------------------------------- */

  const [contact, setcontact] = useState({
    title: "",
    first_name: "",
    last_name: "",
    country_code: [],
    mobile_no: [],
    mobile_type: [],
    action1: [],
    email: [],
    email_type: [],
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
    country_code1: "",
    company_phone: "",
    company_email: "",
    area: "",
    location: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    industry: "",
    company_social_media: [],
    company_url: [],
    action3: [],

    father_husband_name: "",
    h_no: "",
    area1: "",
    location1: "",
    city1: "",
    pincode1: "",
    state1: "",
    country1: "",
    gender: "",
    maritial_status: "",
    birth_date: "",
    anniversary_date: "",
    education: [],
    degree: [],
    school_college: [],
    action4: [],
    loan: [],
    bank: [],
    amount: [],
    action5: [],
    social_media: [],
    url: [],
    action6: [],
    income: [],
    amount1: [],
    action7: [],
    document_no: [],
    document_name: [],
    document_pic: [],
    action8: [],
  });

  const time = new Date();

  const [data1, setdata1] = useState([]);
  const get_contact = async () => {
    try {
      const resp = await api.get(`viewcontactbyid/${selectedItem}`);
      setcontact(resp.data.contact);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(contact);

  useEffect(() => {
    get_contact();
  }, [selectedItem]);

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

  const basicdetails = () => {
    document.getElementById("basicdetails1").style.display = "flex";
    document.getElementById("basicdetails2").style.display = "flex";
    document.getElementById("basic").style.color = "green";
    document.getElementById("other").style.color = "black";

    document.getElementById("otherdetails").style.display = "none";
  };

  const otherdetails = () => {
    document.getElementById("basicdetails1").style.display = "none";
    document.getElementById("basicdetails2").style.display = "none";

    document.getElementById("otherdetails").style.display = "flex";
    document.getElementById("basic").style.color = "black";

    document.getElementById("other").style.color = "green";
  };

  function addFn1() {
    setcontact((prevContact) => ({
      ...prevContact,
      country_code: [...prevContact.country_code, ""],
      mobile_no: [...prevContact.mobile_no, ""],
      mobile_type: [...prevContact.mobile_type, ""],
      action1: Array.isArray(prevContact.action1)
        ? [...prevContact.action1, ""]
        : [""],
    }));
  }

  const deleteall1 = (index) => {
    const newcountry_code = contact?.country_code?.filter(
      (_, i) => i !== index
    );
    const newmobile_no = contact?.mobile_no?.filter((_, i) => i !== index);
    const newmobile_type = contact?.mobile_type?.filter((_, i) => i !== index);
    const newaction1 = contact?.action1?.filter((_, i) => i !== index);

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
    setcontact((prevProfile) => ({
      ...prevProfile,
      country_code: newcountry_code,
    }));
  };
  const handlemobile_nochange = (index, event) => {
    const newmobile_no = [...contact.mobile_no];
    newmobile_no[index] = event.target.value;
    setcontact((prevProfile) => ({
      ...prevProfile,
      mobile_no: newmobile_no,
    }));
  };
  const handlemobile_typechange = (index, event) => {
    const newmobile_type = [...contact.mobile_type];
    newmobile_type[index] = event.target.value;
    setcontact((prevProfile) => ({
      ...prevProfile,
      mobile_type: newmobile_type,
    }));
  };

  function addFn2() {
    setcontact((prevContact) => ({
      ...prevContact,
      email: [...prevContact.email, ""],
      email_type: [...prevContact.email_type, ""],
      action2: Array.isArray(prevContact.action2)
        ? [...prevContact.action2, ""]
        : [""],
    }));
  }

  const deleteall2 = (index) => {
    const newemail = contact?.email?.filter((_, i) => i !== index);
    const newemail_type = contact?.email_type?.filter((_, i) => i !== index);
    const newaction2 = contact?.action2?.filter((_, i) => i !== index);

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
    setcontact((prevProfile) => ({
      ...prevProfile,
      email: newemail,
    }));
  };
  const handleemail_typechange = (index, event) => {
    const newemail_type = [...contact.email_type];
    newemail_type[index] = event.target.value;
    setcontact((prevProfile) => ({
      ...prevProfile,
      email_type: newemail_type,
    }));
  };

  function addFn4() {
    setcontact((prevContact) => ({
      ...prevContact,
      education: [...prevContact.education, ""],
      degree: [...prevContact.degree, ""],
      school_college: [...prevContact.school_college, ""],
      action4: Array.isArray(prevContact.action4)
        ? [...prevContact.action4, ""]
        : [""],
    }));
  }
  const deleteall4 = (index) => {
    const neweducation = contact?.education?.filter((_, i) => i !== index);
    const newdegree = contact?.degree?.filter((_, i) => i !== index);
    const newschool_college = contact?.school_college?.filter(
      (_, i) => i !== index
    );
    const newaction4 = contact?.action4?.filter((_, i) => i !== index);

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
    setcontact((prevContact) => ({
      ...prevContact,
      education: neweducation,
    }));
  };
  const handledegreeChange = (index, event) => {
    const newdegree = [...contact.degree];
    newdegree[index] = event.target.value;
    setcontact((prevContact) => ({
      ...prevContact,
      degree: newdegree,
    }));
  };

  const handleschool_collegeChange = (index, event) => {
    const newschool = [...contact.school_college];
    newschool[index] = event.target.value;
    setcontact((prevContact) => ({
      ...prevContact,
      school_college: newschool,
    }));
  };

  function addFn5() {
    setcontact((prevContact) => ({
      ...prevContact,
      loan: [...prevContact.loan, ""],
      bank: [...prevContact.bank, ""],
      amount: [...prevContact.amount, ""],
      action5: Array.isArray(prevContact.action5)
        ? [...prevContact.action5, ""]
        : [""],
    }));
  }
  const deleteall5 = (index) => {
    const newloan = contact?.loan?.filter((_, i) => i !== index);
    const newbank = contact?.bank?.filter((_, i) => i !== index);
    const newamount = contact?.amount?.filter((_, i) => i !== index);
    const newaction5 = contact?.action5?.filter((_, i) => i !== index);

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
    setcontact((prevContact) => ({
      ...prevContact,
      loan: newloan,
    }));
  };
  const handlebankchange = (index, event) => {
    const newbank = [...contact.bank];
    newbank[index] = event.target.value;
    setcontact((prevContact) => ({
      ...prevContact,
      bank: newbank,
    }));
  };
  const handleamountchange = (index, event) => {
    const newamount = [...contact.amount];
    newamount[index] = event.target.value;
    setcontact((prevContact) => ({
      ...prevContact,
      amount: newamount,
    }));
  };

  function addFn6() {
    setcontact((prevContact) => ({
      ...prevContact,
      social_media: [...prevContact.social_media, ""],
      url: [...prevContact.url, ""],
      action6: Array.isArray(prevContact.action6)
        ? [...prevContact.action6, ""]
        : [""],
    }));
  }
  const deleteall6 = (index) => {
    const newsocial_media = contact?.social_media?.filter(
      (_, i) => i !== index
    );
    const newurl = contact?.url?.filter((_, i) => i !== index);
    const newaction6 = contact?.action6?.filter((_, i) => i !== index);

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
    setcontact((prevContact) => ({
      ...prevContact,
      social_media: newsocial_media,
    }));
  };
  const handleurlChange = (index, event) => {
    const newurl = [...contact.url];
    newurl[index] = event.target.value;
    setcontact((prevContact) => ({
      ...prevContact,
      url: newurl,
    }));
  };

  function addFn7() {
    setcontact((prevContact) => ({
      ...prevContact,
      income: [...prevContact.income, ""],
      amount1: [...prevContact.amount1, ""],
      action7: Array.isArray(prevContact.action7)
        ? [...prevContact.action7, ""]
        : [""],
    }));
  }
  const deleteall7 = (index) => {
    const newincome = contact?.income?.filter((_, i) => i !== index);
    const newamount1 = contact?.amount1?.filter((_, i) => i !== index);
    const newaction7 = contact?.action7?.filter((_, i) => i !== index);

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
    setcontact((prevContact) => ({
      ...prevContact,
      income: newincome,
    }));
  };
  const handleamount1change = (index, event) => {
    const newamount1 = [...contact.amount1];
    newamount1[index] = event.target.value;
    setcontact((prevContact) => ({
      ...prevContact,
      amount1: newamount1,
    }));
  };

  function addFn8() {
    setcontact((prevContact) => ({
      ...prevContact,
      document_no: [...prevContact.document_no, ""],
      document_name: [...prevContact.document_name, ""],
      document_pic: [...prevContact.document_pic, ""],
      action8: Array.isArray(prevContact.action8)
        ? [...prevContact.action8, ""]
        : [""],
    }));
  }
  const deleteall8 = (index) => {
    const newdocumentno = contact?.document_no?.filter((_, i) => i !== index);
    const newdocumentname = contact?.document_name?.filter(
      (_, i) => i !== index
    );
    const newdocumentpic = contact?.document_pic?.filter((_, i) => i !== index);
    const newaction8 = contact?.action8?.filter((_, i) => i !== index);

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
    setcontact((prevContact) => ({
      ...prevContact,
      document_no: newdocumentno,
    }));
  };
  const handledocumentnamechange = (index, event) => {
    const newdocumentname = [...contact.document_name];
    newdocumentname[index] = event.target.value;
    setcontact((prevContact) => ({
      ...prevContact,
      document_name: newdocumentname,
    }));
  };
  const handledocumentpicchange = async (index, event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    // 🔼 Upload files to API
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await api.post("api/upload/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const urls = res.data.urls; // array of uploaded Cloudinary URLs

      // 🔥 Directly save only URLs — no preview needed
      setcontact((prev) => {
        const updated = [...prev.document_pic];
        updated[index] = urls; // replace or insert new URLs for that index
        return { ...prev, document_pic: updated };
      });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed!");
    }
  };

  // get all owner

  const [ownersList, setownersList] = useState([]);

  const getall_userdata = async () => {
    try {
      const resp = await api.get("api/settings/viewuser");
      setownersList(resp.data.user.map((item) => item.full_name));
    } catch (error) {
      console.log(error);
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

  // =============================get all title==========================================
  const [select_loading, setselect_loading] = useState("");

  const [All_Form_Title, setAll_Form_Title] = useState([]);
  const getall_form_title = async () => {
    try {
      setselect_loading("title");
      const params = new URLSearchParams();
      params.append("lookup_type", "form_title");
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

  // company data
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

  useEffect(() => {
    fetchcdata();
  }, []);

  const updatecontact = async () => {
    try {
      // Show confirmation message
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, update it!",
      });

      if (!result.isConfirmed) {
        return; // Stop execution if user cancels
      }

      const resp = await api.put(`updatecontact/${selectedItem}`, contact);
      toast.success("contact updated", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/contactdetails");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const statesAndCities = {
    AndhraPradesh: [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "YSR Kadapa",
    ],
    ArunachalPradesh: [
      "Tawang",
      "West Kameng",
      "East Kameng",
      "Papum Pare",
      "Kurung Kumey",
      "Kra Daadi",
      "Lower Subansiri",
      "Upper Subansiri",
      "West Siang",
      "East Siang",
      "Upper Siang",
      "Lower Siang",
      "Lower Dibang Valley",
      "Dibang Valley",
      "Anjaw",
      "Lohit",
      "Namsai",
      "Changlang",
      "Tirap",
      "Longding",
    ],
    Assam: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup",
      "Kamrup Metropolitan",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
    Bihar: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],
    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
    Goa: ["North Goa", "South Goa"],
    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udepur",
      "Dahod",
      "Dang",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kachchh",
      "Kheda",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Narnaul",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    HimachalPradesh: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kullu",
      "Kullu",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],
    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahebganj",
      "Seraikela Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
    Karnataka: [
      "Bagalkot",
      "Ballari",
      "Belagavi",
      "Bengaluru Rural",
      "Bengaluru Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru",
      "Raichur",
      "Ramanagara",
      "Shivamogga",
      "Tumakuru",
      "Udupi",
      "Uttara Kannada",
      "Vijayapura",
      "Yadgir",
    ],
    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kottayam",
      "Kollam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
    MadhyaPradesh: [
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhindwara",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Rewa",
      "Rajgarh",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
    Manipur: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
    Meghalaya: [
      "East Garo Hills",
      "East Khasi Hills",
      "Jaintia Hills",
      "Ri Bhoi",
      "West Garo Hills",
      "West Khasi Hills",
    ],
    Mizoram: [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],
    Nagaland: [
      "Dimapur",
      "Kohima",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
    Odisha: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Ganjam",
      "Gajapati",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur",
      "Sundargarh",
    ],
    Punjab: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Firozpur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Muktsar",
      "Nawan Shehar",
      "Patiala",
      "Rupnagar",
      "Sangrur",
      "SAS Nagar",
      "Sri Muktsar Sahib",
    ],
    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Tonk",
      "Udaipur",
    ],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    TamilNadu: [
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kancheepuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Salem",
      "Sivagangai",
      "Tenkasi",
      "Thanjavur",
      "The Nilgiris",
      "Thoothukudi",
      "Tiruvallur",
      "Tirunelveli",
      "Tirupur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
    Telangana: [
      "Adilabad",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar",
      "Jogulamba",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal",
      "Nalgonda",
      "Nagarkurnool",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Warangal",
      "Khammam",
      "Kothagudem",
    ],
    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
    UttarPradesh: [
      "Agra",
      "Aligarh",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Faizabad",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddh Nagar",
      "Ghaziabad",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur",
      "Kasganj",
      "Kaushambi",
      "Kushinagar",
      "Lakhimpur Kheri",
      "Lucknow",
      "Mathura",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Noida",
      "Pratapgarh",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shrawasti",
      "Siddharth Nagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
    WestBengal: [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Burdwan",
      "Cooch Behar",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "North Dinajpur",
      "Paschim Medinipur",
      "Purba Medinipur",
      "Purulia",
      "South 24 Parganas",
      "South Dinajpur",
      "Uttar Dinajpur",
    ],
    "Andaman And Nicobar Islands": [
      "Port Blair",
      "Car Nicobar",
      "Mayabunder",
      "Diglipur",
      "Rangat",
    ],
    Chandigarh: ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Jammu and Kashmir": [
      "Srinagar",
      "Jammu",
      "Anantnag",
      "Baramulla",
      "Doda",
      "Gulmarg",
      "Kathua",
      "Poonch",
      "Rajouri",
      "Udhampur",
    ],
    Ladakh: ["Leh", "Kargil"],
    Lakshadweep: [
      "Kavaratti",
      "Andrott",
      "Kalapeni",
      "Minicoy",
      "Agatti",
      "Kadmat",
      "Chetlat",
    ],
    Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  };

  const states = Object.keys(statesAndCities);
  const cities = statesAndCities[contact?.state1] || [];

 

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
  };

  // Handle profession subcategory change
  const handleProfessionSubcategoryChange = (event) => {
    const selectedSubcategory = event.target.value;

    setcontact((prevLead) => ({
      ...prevLead,
      profession_subcategory: selectedSubcategory,
      designation: "", // Reset designation when subcategory changes
    }));
  };

  // Handle designation change
  const handleDesignationChange = (event) => {
    const selectedDesignation = event.target.value;

    setcontact((prevLead) => ({
      ...prevLead,
      designation: selectedDesignation,
    }));
  };

  const [isChecked, setIsChecked] = useState(false);

  const asianCountries = [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Burma (Myanmar)",
    "Cambodia",
    "China",
    "Cyprus",
    "Georgia",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
  ];

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
                    className="text-right text-2xl font-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.location.reload()}
                  >
                    Edit Contact
                  </h1>

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
                <hr></hr>

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
                  {/* <span  id='professional' onClick={professionaldetails} style={{cursor:'pointer',fontWeight:"bold"}}>Professional Details</span > */}
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
                    <div className=" col-md-12 d-flex justify-content-between align-items-center experience font-bold">
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
                        onChange={(e) =>
                          setcontact({ ...contact, title: e.target.value })
                        }
                        onClick={() => {
                          if (All_Form_Title.length === 0) {
                            getall_form_title();
                          }
                        }}
                      >
                        <option value={contact?.title || "---select title---"}>
                          {contact?.title || ""}
                        </option>
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
                    {/* FIRST NAME */}
                    <div className="col-md-5 mb-3 custom-input ">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        required
                        className="form-control form-control-sm"
                        placeholder="First name"
                        value={contact?.first_name || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, first_name: e.target.value })
                        }
                      />
                    </div>
                    {/* SURNAME */}
                    <div className="col-md-5 mb-3 custom-input ">
                      <label className="form-label">Surname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="surname"
                        value={contact?.last_name || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, last_name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="row mt-0" id="basicdetails2">
                    {/* COUNTRY */}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Country</label>
                      {(contact?.country_code || []).map((item, index) => (
                        <select
                          key={index}
                          style={{ marginBottom: "2px" }}
                          required
                          className="form-control form-control-sm"
                          value={
                            contact?.country_code?.[index] ||
                            "---select contry code---"
                          }
                          onChange={(event) =>
                            handlecountry_codechange(index, event)
                          }
                          onClick={() => {
                            if (All_Country_Code.length === 0) {
                              getall_country_code();
                            }
                          }}
                        >
                          <option value={contact?.country_code?.[index] || ""}>
                            {contact?.country_code?.[index] || ""}
                          </option>
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
                    {/* MOBILE */}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Mobile Number</label>
                      {(contact?.mobile_no || []).map((item, index) => (
                        <input
                          key={index}
                          type="text"
                          required
                          style={{ marginBottom: "2px" }}
                          className="form-control form-control-sm"
                          placeholder="enter phone number"
                          value={contact?.mobile_no?.[index] || ""}
                          onChange={(event) =>
                            handlemobile_nochange(index, event)
                          }
                        />
                      ))}
                    </div>
                    {/* MOBILE TYPE */}
                    <div className="col-md-2 mb-3 custom-input">
                      <label className="form-label">Type</label>
                      {(contact?.mobile_type || []).map((item, index) => (
                        <select
                          key={index}
                          className="form-control form-control-sm"
                          style={{ marginBottom: "2px" }}
                          value={contact?.mobile_type?.[index] || ""}
                          onChange={(event) =>
                            handlemobile_typechange(index, event)
                          }
                        >
                          <option>{contact?.mobile_type?.[index] || ""}</option>
                          <option>---Select mobile type---</option>
                          <option>Personal</option>
                          <option>Official</option>
                          <option>Home</option>
                          <option>Phone</option>
                        </select>
                      ))}
                    </div>

                    {/* DELETE BUTTON */}
                    <div className="col-md-1 mt-8">
                      {(contact?.mobile_no || []).map((item, index) => (
                        <div key={index} style={{ marginTop: "10px" }}>
                          <span
                            className="material-icons"
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

                    {/* ADD BUTTON */}
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn1}
                      >
                        +
                      </button>
                    </div>

                    {/* EMAIL */}
                    <div className="col-md-8 mb-3 custom-input">
                      <label className="form-label">Email-Address</label>
                      {(contact?.email || []).map((item, index) => (
                        <input
                          key={index}
                          type="text"
                          style={{ marginBottom: "2px" }}
                          className="form-control form-control-sm"
                          placeholder="enter email-id"
                          value={contact?.email?.[index] || ""}
                          onChange={(event) => handleemailchange(index, event)}
                        />
                      ))}
                    </div>

                    {/* EMAIL TYPE */}
                    <div className="col-md-2 mb-3 custom-input">
                      <label className="form-label">Type</label>
                      {(contact?.email_type || []).map((item, index) => (
                        <select
                          key={index}
                          className="form-control form-control-sm"
                          style={{ marginBottom: "2px" }}
                          value={contact?.email_type?.[index] || ""}
                          onChange={(event) =>
                            handleemail_typechange(index, event)
                          }
                        >
                          <option>{contact?.email_type?.[index] || ""}</option>
                          <option>---Select email type---</option>
                          <option>Personal</option>
                          <option>Official</option>
                          <option>Business</option>
                        </select>
                      ))}
                    </div>

                    {/* DELETE BUTTON */}
                    <div className="col-md-1 mt-8">
                      {(contact?.email || []).map((item, index) => (
                        <div key={index} style={{ marginTop: "10px" }}>
                          <span
                            className="material-icons"
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

                    {/* ADD BUTTON */}
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn2}
                      >
                        +
                      </button>
                    </div>

                    {/* TAGS */}
                    <div className="col-md-12 mb-3 custom-input">
                      <label className="form-label">Tags</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={contact?.tags || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, tags: e.target.value })
                        }
                      />
                    </div>

                    {/* DESCRIPTIONS */}
                    <div className="col-md-10 mb-3 custom-input">
                      <label className="form-label">Descriptions</label>
                      <textarea
                        className="form-control form-control-sm"
                        style={{ borderRadius: "8px", height: "100px" }}
                        value={contact?.descriptions || ""}
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            descriptions: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-2 mb-3 custom-input"></div>

                    {/* PROFESSION DETAILS HEADER */}
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
                      <hr style={{ marginTop: "-5px" }} />
                    </div>

                    {/* PROFESSION CATEGORY */}
                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Profession Category</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.profession_category || ""}
                        onChange={handleProfessionCategoryChange}
                        onClick={() => {
                          if (All_Profession_Category.length === 0) {
                            getall_profession_category();
                          }
                        }}
                      >
                        <option>
                          {contact?.profession_category
                            ? contact.profession_category
                            : ""}
                        </option>
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
                    {/* SUB-CATEGORY */}
                    <div className="col-md-7 mb-3 custom-input">
                      <label className="form-label">
                        Profession Sub-Category
                      </label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.profession_subcategory || ""}
                        onChange={handleProfessionSubcategoryChange}
                        onClick={() => {
                          getall_profession_sub_category();
                        }}
                      >
                        <option>
                          {contact?.profession_subcategory
                            ? contact.profession_subcategory
                            : ""}
                        </option>
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
                    {/* DESIGNATION */}
                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Designation</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.designation || ""}
                        onChange={handleDesignationChange}
                        onClick={() => {
                          getall_designation();
                        }}
                      >
                        <option>
                          {contact?.designation ? contact.designation : ""}
                        </option>
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
                    {/* COMPANY */}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">
                        Company/Organisation/Department Name
                      </label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.company_name || ""}
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            company_name: e.target.value,
                          })
                        }
                      >
                        <option>
                          {contact?.company_name ? contact.company_name : ""}
                        </option>
                        <option>---Select company---</option>
                        {(cdata || []).map((item) => (
                          <option
                            key={item?._id || item?.name}
                            value={item?.name || ""}
                          >
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-1">
                      <label className="form-label">Add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={() => navigate("/addcompany")}
                      >
                        +
                      </button>
                    </div>

                    {/* SYSTEM DETAILS HEADER */}
                    <div className="col-md-12" style={{ marginTop: "10px" }}>
                      <label
                        className="form-label"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        System Details
                      </label>
                      <hr style={{ marginTop: "-5px" }} />
                    </div>

                    {/* SOURCE */}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Source</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.source || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, source: e.target.value })
                        }
                      >
                        <option>{contact?.source ? contact.source : ""}</option>
                        <option>---Select source---</option>
                        <option>Friends</option>
                        <option>Relative</option>
                        <option>Website</option>
                        <option>Walkin</option>
                        <option>Magicbricks</option>
                        <option>Common Floor</option>
                        <option>Housing</option>
                        <option>99acre</option>
                        <option>Olx</option>
                        <option>Square Yard</option>
                        <option>Real Estate India</option>
                        <option>Refrence</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Linkdin</option>
                        <option>Old Client</option>
                        <option>Google</option>
                        <option>Whatsapp</option>
                      </select>
                    </div>
                    {/* TEAM */}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Team</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.team || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, team: e.target.value })
                        }
                      >
                        <option>{contact?.team ? contact.team : ""}</option>
                        <option>---Select team---</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Post Sales</option>
                        <option>Pre Sales</option>
                      </select>
                    </div>
                    {/* OWNER MULTISELECT */}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Owner</label>
                      <Select
                        className="form-control form-control-sm"
                        multiple
                        value={owners?.length ? owners : contact?.owner || []}
                        onChange={handleOwnerChange}
                        renderValue={() => {
                          const finalOwners = owners?.length
                            ? owners
                            : contact?.owner || [];
                          return finalOwners.join(", ");
                        }}
                        style={{ borderRadius: "8px", border: "none" }}
                      >
                        {(ownersList || []).map((name, idx) => (
                          <MenuItem key={idx} value={name}>
                            <Checkbox
                              checked={
                                (contact?.owner
                                  ? contact.owner
                                  : owners
                                ).indexOf(name) > -1
                              }
                            />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    {/* VISIBLE TO */}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Visible to</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.visible_to || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, visible_to: e.target.value })
                        }
                      >
                        <option>
                          {contact?.visible_to ? contact.visible_to : ""}
                        </option>
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

                    {/* FATHER HUSBAND NAME */}
                    <div className="col-md-12 mb-3 custom-input">
                      <label className="form-label">Father/Husband name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Father Husband Name"
                        value={contact?.father_husband_name || ""}
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            father_husband_name: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* H.NO */}
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">H.No</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="H. No."
                        value={contact?.h_no || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, h_no: e.target.value })
                        }
                      />
                    </div>
                    {/* AREA*/}
                    <div className="col-md-9 mb-3 custom-input">
                      <label className="form-label">Area</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Area"
                        value={contact?.area1 || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, area1: e.target.value })
                        }
                      />
                    </div>
                    {/* LOCATION*/}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Location"
                        value={contact?.location1 || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, location1: e.target.value })
                        }
                      />
                    </div>

                    {/* CITY*/}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">City</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.city1}
                        onChange={(e) =>
                          setcontact({ ...contact, city1: e.target.value })
                        }
                        disabled={!contact?.state1 || cities.length === 0} // Disable if no state or invalid state
                      >
                        <option value="">{contact?.city1}</option>
                        <option value="">--Select City--</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* PINCODE*/}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Pin Code</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Pincode"
                        value={contact?.pincode1 || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, pincode1: e.target.value })
                        }
                      />
                    </div>

                    {/* STATE*/}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">State</label>
                      <select
                        className="form-control form-control-sm"
                        value={contact?.state1}
                        onChange={(e) => {
                          const state = e.target.value;
                          setcontact({ ...contact, state1: state, city1: "" }); // Clear city when state changes
                        }}
                      >
                        <option value="">{contact?.state1}</option>
                        <option value="">--Select State--</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* COUNTRY*/}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Country</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, country1: e.target.value })
                        }
                      >
                        <option value="">{contact?.country1}</option>
                        <option value="">--Select Country--</option>
                        {asianCountries.map((country, index) => (
                          <option
                            key={index}
                            value={country.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {country}
                          </option>
                        ))}
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

                    {/* GENDER*/}
                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setcontact({ ...contact, gender: e.target.value })
                        }
                      >
                        <option value="">{contact?.gender}</option>
                        <option>---Select gender---</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                      </select>
                    </div>
                    {/* MARITIAL STATUS*/}
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
                        <option value="">{contact?.maritial_status}</option>
                        <option>---Select your status---</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                        <option>Single</option>
                      </select>
                    </div>

                    {/* BIRTH DATE*/}
                    <div className="col-md-5 mb-3 custom-input">
                      <label className="form-label">Birth Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={contact?.birth_date || ""}
                        onChange={(e) =>
                          setcontact({ ...contact, birth_date: e.target.value })
                        }
                      />
                    </div>
                    {/* ANNIVERSARY DATE*/}
                    <div className="col-md-7 mb-3 custom-input">
                      <label className="form-label">Anniversary Date</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={contact?.anniversary_date || ""}
                        onChange={(e) =>
                          setcontact({
                            ...contact,
                            anniversary_date: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* EDUCATION*/}
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Education</label>
                      {(contact?.education || []).map((name, index) => (
                        <div key={index} className="multi-value">
                          <select
                            className="form-control form-control-sm"
                            value={contact?.education?.[index] || ""}
                            onChange={(event) =>
                              handleeducationChange(index, event)
                            }
                          >
                            <option>{contact?.education?.[index] || ""}</option>
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
                    {/* DEGREE*/}
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Degree</label>
                      {(contact?.degree || []).map((name, index) => (
                        <div key={index} className="multi-value">
                          <select
                            className="form-control form-control-sm"
                            value={contact?.degree?.[index] || ""}
                            onChange={(event) =>
                              handledegreeChange(index, event)
                            }
                          >
                            <option>{contact?.degree?.[index] || ""}</option>
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
                    {/* SCHOOL UNIVERSITY*/}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">
                        School/College/University
                      </label>
                      {contact?.school_college.map((name, index) => (
                        <div key={index} className="multi-value">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={contact?.school_college?.[index] || ""}
                            onChange={(event) =>
                              handleschool_collegeChange(index, event)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {/* DELETE BUTTON*/}

                    <div className="col-md-1 mt-8">
                      {(contact?.education || []).map((item, index) => (
                        <div key={index} className="multi-value-delete">
                          <span
                            className="material-icons"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteall4(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* ADD BUTTON */}

                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn4}
                      >
                        +
                      </button>
                    </div>

                    {/* LOAN */}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Loan</label>
                      {(contact?.loan || []).map((item, index) => (
                        <select
                          type="text"
                          className="form-control form-control-sm multi-value"
                          value={contact?.loan?.[index] || ""}
                          onChange={(event) => handleloanchange(index, event)}
                        >
                          <option>{contact?.loan?.[index] || ""}</option>
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

                    {/* BANK */}
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Bank</label>
                      {(contact?.bank || []).map((item, index) => (
                        <select
                          type="text"
                          value={contact?.bank?.[index] || ""}
                          className="form-control form-control-sm multi-value"
                          onChange={(event) => handlebankchange(index, event)}
                        >
                          <option>{contact?.bank?.[index] || ""}</option>
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
                    {/* AMOUNT */}
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Amount</label>
                      {(contact?.amount || []).map((item, index) => (
                        <input
                          type="text"
                          value={contact?.amount?.[index] || ""}
                          placeholder="Loan Amount"
                          className="form-control form-control-sm multi-value"
                          style={{ marginTop: "2px" }}
                          onChange={(event) => handleamountchange(index, event)}
                        />
                      ))}
                    </div>
                    {/* DELETE BUTTON*/}

                    <div className="col-md-1 mt-8">
                      {(contact?.loan || []).map((item, index) => (
                        <div key={index} className="multi-value-delete">
                          <span
                            className="material-icons"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteall5(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* ADD BUTTON*/}
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn5}
                      >
                        +
                      </button>
                    </div>

                    {/* SOCIAL MEDIA*/}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Social Media</label>
                      {(contact?.social_media || []).map((item, index) => (
                        <select
                          className="form-control form-control-sm multi-value"
                          value={contact?.social_media?.[index] || ""}
                          onChange={(event) =>
                            handlesocial_mediachange(index, event)
                          }
                        >
                          <option>
                            {contact?.social_media?.[index] || ""}
                          </option>
                          <option>---select social_media---</option>
                          <option>Facebook</option>
                          <option>Twitter</option>
                          <option>Instagram</option>
                          <option>Linkdin</option>
                          <option>Google</option>
                        </select>
                      ))}
                    </div>
                    {/* URL*/}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Url</label>
                      {(contact?.url || []).map((item, index) => (
                        <input
                          type="text"
                          className="form-control form-control-sm multi-value"
                          style={{ marginTop: "2px" }}
                          value={contact?.url?.[index] || ""}
                          placeholder="Social Media Url"
                          onChange={(event) => handleurlChange(index, event)}
                        />
                      ))}
                    </div>
                    {/* DELETE BUTTON*/}

                    <div className="col-md-1 mt-8">
                      {(contact?.social_media || []).map((item, index) => (
                        <div key={index} className="multi-value-delete">
                          <span
                            className="material-icons"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteall6(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* ADD BUTTON*/}
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn6}
                      >
                        +
                      </button>
                    </div>

                    {/* INCOME*/}

                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Income</label>
                      {(contact?.income || []).map((item, index) => (
                        <select
                          className="form-control form-control-sm multi-value"
                          value={contact?.income?.[index] || ""}
                          onChange={(event) => handleincomechange(index, event)}
                        >
                          <option>{contact?.income?.[index] || ""}</option>
                          <option>---select your income---</option>
                          <option>Personal Income</option>
                          <option>Business Income</option>
                        </select>
                      ))}
                    </div>
                    {/* AMOUNT*/}
                    <div className="col-md-6 mb-3 custom-input">
                      <label className="form-label">Amount</label>
                      {(contact?.amount1 || []).map((item, index) => (
                        <input
                          type="text"
                          value={contact?.amount1?.[index] || ""}
                          placeholder="Amount"
                          className="form-control form-control-sm multi-value"
                          style={{ marginTop: "2px" }}
                          onChange={(event) =>
                            handleamount1change(index, event)
                          }
                        />
                      ))}
                    </div>
                    {/* DELETE BUTTON*/}

                    <div className="col-md-1 mt-8">
                      {(contact?.income || []).map((item, index) => (
                        <div key={index} className="multi-value-delete">
                          <span
                            className="material-icons"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteall7(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* ADD BUTTON*/}
                    <div className="col-md-1">
                      <label className="form-label">add</label>
                      <button
                        className="form-control form-control-sm"
                        onClick={addFn7}
                      >
                        +
                      </button>
                    </div>

                    {/* DOCUMENT NO.*/}
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Document No.</label>
                      {(contact?.document_no || []).map((item, index) => (
                        <input
                          type="text"
                          value={contact?.document_no?.[index] || ""}
                          placeholder="Document No."
                          className="form-control form-control-sm"
                          style={{ marginTop: "2px" }}
                          onChange={(event) =>
                            handledocumentnochange(index, event)
                          }
                        />
                      ))}
                    </div>
                    {/* DOCUMENT NAME*/}
                    <div className="col-md-3 mb-3 custom-input">
                      <label className="form-label">Document Name</label>
                      {(contact?.document_name || []).map((item, index) => (
                        <select
                          className="form-control form-control-sm multi-value"
                          value={contact?.document_name?.[index] || ""}
                          onChange={(event) =>
                            handledocumentnamechange(index, event)
                          }
                        >
                          <option>
                            {contact?.document_name?.[index] || ""}
                          </option>
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
                    {/* DOCUMENT IMAGE*/}
                    <div className="col-md-4 mb-3 custom-input">
                      <label className="form-label">Document Picture</label>

                      {(contact?.document_pic || []).map((item, index) => {
                        // item = array of URL strings
                        const urls = Array.isArray(item)
                          ? item
                          : typeof item === "string"
                          ? [item]
                          : [];

                        return (
                          <div key={index} className="custom-file-wrapper">
                            {/* Upload input */}
                            <input
                              type="file"
                              id={`doc-upload-${index}`}
                              style={{ marginTop: "2px", display: "none" }}
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
                                style={{
                                  fontSize: "1.4rem",
                                  cursor: "pointer",
                                }}
                              ></i>
                              Upload Image
                            </label>

                            {/* Show uploaded URL images */}
                            {urls.length > 0 && (
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {urls.map((url, i) => (
                                  <div key={i} style={{ position: "relative" }}>
                                    <img
                                      src={url}
                                      alt="Document"
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
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* DELETE BUTTON*/}

                    <div className="col-md-1 mt-8">
                      {(contact?.document_no || []).map((item, index) => (
                        <div key={index}>
                          <span
                            className="material-icons multi-value-delete"
                            style={{
                              color: "red",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteall8(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* ADD BUTTON*/}
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
                        onClick={updatecontact}
                        className="btn btn-primary btn-sm form-control"
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
                        Update
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

export default EditContact;
