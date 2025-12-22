import { React, useState, useEffect, useRef } from "react";
import Header1 from "../header1";
import Sidebar1 from "../sidebar1";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "../../css/common.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useLocation } from "react-router-dom";
import { Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function Editlead() {


   const location = useLocation(); // Get location object
  const leadData = location?.state; // Access lead data passed as state
  console.log(leadData);
  

  // console.log(leadData);
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch("https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const [leadinfo, setleadinfo] = useState({
    title: "Mr.",
    first_name: "",
    last_name: "",
    country_code: [""],
    mobile_no: [""],
    mobile_type: [""],
    action11: [],
    email: [""],
    email_type: [""],
    action22: [],
    tags: "",
    descriptions: "",
    stage: "",
    lead_type: "",
    owner: [],
    team: "",
    visible_to: "",
    campaign: "",
    source: "",
    sub_source: "",
    channel_partner: "",
    intrested_project: "",
    requirment: "",
    property_type: [],
    purpose: "",
    nri: "",
    sub_type: [],
    unit_type: [],
    budget_min: "",
    budget_max: "",
    minimum_area: "",
    maximum_area: "",
    area_metric: "Sq Yard",
    search_location: "",
    street_address: "",
    range: "",
    range_unit: "",
    city2: "",
    area2: [],
    block: [],
    pincode2: "",
    country2: "",
    state2: "",
    lattitude: "",
    longitude: "",
    country3: "",
    state3: "",
    city3: "",
    area_project: [],
    block3: [],
    specific_unit: "",
    specific_unitdetails: "",
    funding: "",
    timeline: "",
    facing: [],
    road: [],
    direction: [],
    transaction_type: "",
    unit_type2: "",
    white_portion: "",
    furnishing: "",
    profession_category: [],
    profession_subcategory: [],
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
    country1: "",
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
    matcheddeals: [],
    matchingdeal: "",
  });

    const getlead_byid = async () => {
        try {
          const resp = await api.get(`viewbyid/${leadData}`); 
          setleadinfo(resp.data.lead[0]);
        } catch (error) {
          console.log(error);
        }
    };

  useEffect(()=>
  {
    getlead_byid()

  },[])

  // console.log(leadinfo);
  


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

  // get facing

  const [facing, setfacing] = useState([]);
  const getall_facing = async () => {
    try {
      const params = new URLSearchParams();
      params.append("lookup_type", "facing");
      const resp = await api.get(`api/LookupList?${params.toString()}`);

      const list = resp.data.data;
      const onlyValues = list.map((item) => item.lookup_value);
      setfacing(onlyValues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_facing();
  }, []);

  const [facings, setfacings] = useState([]);

  const handlefacingChange = (event) => {
    const {
      target: { value },
    } = event;

    // If "Select All" is clicked
    if (value.includes("select-all")) {
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
      const selectedfacing =
        typeof value === "string" ? value.split(",") : value;
      setfacings(selectedfacing); // Update selected facings
      setleadinfo({ ...leadinfo, facing: selectedfacing }); // Update facing in leadinfo
    }
  };

  // get road
  const [road, setroad] = useState([]);
  const getall_road = async () => {
    try {
      const params = new URLSearchParams();
      params.append("lookup_type", "road");
      const resp = await api.get(`api/LookupList?${params.toString()}`);

      const list = resp.data.data;
      const onlyValues = list.map((item) => item.lookup_value);
      setroad(onlyValues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_road();
  }, []);

  const [roads, setroads] = useState([]);

  const handleroadChange = (event) => {
    const {
      target: { value },
    } = event;

    // If "Select All" is clicked
    if (value.includes("select-all")) {
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
      const selectedroad = typeof value === "string" ? value.split(",") : value;
      setroads(selectedroad); // Update selected roads
      setleadinfo({ ...leadinfo, road: selectedroad }); // Update road in leadinfo
    }
  };

  const matchdeal = ["What'sApp", "Message", "Mail"];

  const [matchdeals, setmatcheddeals] = useState([]);

  const handlematcheddealChange = (event) => {
    const {
      target: { value },
    } = event;

    // If "Select All" is clicked
    if (value.includes("select-all")) {
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
      const selectedmatcheddeal =
        typeof value === "string" ? value.split(",") : value;
      setmatcheddeals(selectedmatcheddeal); // Update selected deals
      setleadinfo({ ...leadinfo, matched_deal: selectedmatcheddeal }); // Update matched_deal with selected options
    }
  };

  // get road
  const [direction, setdirection] = useState([]);
  const getall_direction = async () => {
    try {
      const params = new URLSearchParams();
      params.append("lookup_type", "direction");
      const resp = await api.get(`api/LookupList?${params.toString()}`);

      const list = resp.data.data;
      const onlyValues = list.map((item) => item.lookup_value);
      setdirection(onlyValues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_direction();
  }, []);

  const [directions, setdirections] = useState([]);

  const handledirectionChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("select-all")) {
      if (directions.length === direction.length) {
        setdirections([]);
        setleadinfo({ ...leadinfo, direction: [] });
      } else {
        setdirections(direction);
        setleadinfo({ ...leadinfo, direction: direction });
      }
    } else {
      const selecteddirections =
        typeof value === "string" ? value.split(",") : value;
      setdirections(selecteddirections);
      setleadinfo({ ...leadinfo, direction: selecteddirections });
    }
  };

  const propertyunittype = [
    "Two Side Open",
    "Three Side Open",
    "Ordinary",
    "Corner",
  ];

  const [propertyunitstypes, setpropertyunitstypes] = useState([]);

  const handlepropertyunitstypesChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("select-all")) {
      if (propertyunitstypes.length === propertyunittype.length) {
        setpropertyunitstypes([]);
        setleadinfo({ ...leadinfo, unit_type2: [] });
      } else {
        setpropertyunitstypes(propertyunittype);
        setleadinfo({ ...leadinfo, unit_type2: propertyunittype });
      }
    } else {
      const selectedpropertyunittype =
        typeof value === "string" ? value.split(",") : value;
      setpropertyunitstypes(selectedpropertyunittype);
      setleadinfo({ ...leadinfo, unit_type2: selectedpropertyunittype });
    }
  };

  // get property type

  const [All_Property_Type, setAll_Property_Type] = useState([]);
  const getall_property_type = async () => {
    try {
      const params = new URLSearchParams();
      params.append("lookup_type", "property_type");
      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Property_Type(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_property_type();
  }, []);

  // get property sub type

  const [All_Property_Sub_Type, setAll_Property_Sub_Type] = useState([]);

  const getall_property_sub_type = async () => {
    try {
      const selectedTypes = leadinfo.property_type; // Array

      if (!selectedTypes.length) {
        setAll_Property_Sub_Type([]);
        return;
      }

      // Fetch all subtypes in parallel
      const responses = await Promise.all(
        selectedTypes.map((type) => {
          const params = new URLSearchParams();
          params.append("lookup_type", "property_sub_type");
          params.append("parent_lookup_value", type);

          return api.get(`api/LookupList?${params.toString()}`);
        })
      );

      // Combine results
      const merged = responses.flatMap((resp) => resp.data.data);

      // Remove duplicate values by _id
      const unique = merged.filter(
        (item, index, self) =>
          index === self.findIndex((x) => x._id === item._id)
      );

      setAll_Property_Sub_Type(unique);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_property_sub_type();
  }, [leadinfo.property_type]);

  // property unit type

  const [All_Property_Unit_Type, setAll_Property_Unit_Type] = useState([]);

  const getall_property_unit_type = async () => {
    try {
      const selectedTypes = leadinfo.sub_type; // Array

      if (!selectedTypes.length) {
        setAll_Property_Unit_Type([]);
        return;
      }

      // Fetch all subtypes in parallel
      const responses = await Promise.all(
        selectedTypes.map((type) => {
          const params = new URLSearchParams();
          params.append("lookup_type", "property_unit_type");
          params.append("parent_lookup_value", type);

          return api.get(`api/LookupList?${params.toString()}`);
        })
      );

      // Combine results
      const merged = responses.flatMap((resp) => resp.data.data);

      // Remove duplicate values by _id
      const unique = merged.filter(
        (item, index, self) =>
          index === self.findIndex((x) => x._id === item._id)
      );

      setAll_Property_Unit_Type(unique);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_property_unit_type();
  }, [leadinfo.sub_type]);

  

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;

    setleadinfo((prevLead) => ({
      ...prevLead,
      property_type: typeof value === "string" ? value.split(",") : value,
      sub_type: [],
      unit_type: [],
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

  const handleUnitTypeChange = (event) => {
    const selectedUnitTypes = event.target.value;
    setleadinfo((prevLead) => ({
      ...prevLead,
      unit_type: selectedUnitTypes,
    }));
  };

  // const getAvailableunittype = () => {
  //   // Step 1: Get all options based on selected sub_types
  //   let availableOptions = leadinfo.sub_type.flatMap(
  //     (cat) => options.unit_type[cat] || []
  //   );

  //   // Step 2: Use a Set to remove duplicates and return unique options
  //   return Array.from(new Set(availableOptions));
  // };

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
      params.append("parent_lookup_value", leadinfo.profession_category);
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
      params.append("parent_lookup_value", leadinfo.profession_subcategory);
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Designation(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // Handle profession category change
  const handleProfessionCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    setleadinfo((prevLead) => ({
      ...prevLead,
      profession_category: selectedCategory,
      profession_subcategory: "", // Reset subcategory when category changes
      designation: "", // Reset designation when category changes
    }));
  };

  // Handle profession subcategory change
  const handleProfessionSubcategoryChange = (event) => {
    const selectedSubcategory = event.target.value;

    setleadinfo((prevLead) => ({
      ...prevLead,
      profession_subcategory: selectedSubcategory,
      designation: "", // Reset designation when subcategory changes
    }));
  };

  // Handle designation change
  const handleDesignationChange = (event) => {
    const selectedDesignation = event.target.value;

    setleadinfo((prevLead) => ({
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
    setleadinfo({ ...leadinfo, owner: selectedOwners });
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

  // =============================get all country code==========================================

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
      params.append("parent_lookup_value", leadinfo.country3);
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
      params.append("parent_lookup_value", leadinfo.state3);
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_City(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all funding==========================================

  const [All_Funding, setAll_Funding] = useState([]);
  const getall_funding = async () => {
    try {
      setselect_loading("funding");
      const params = new URLSearchParams();
      params.append("lookup_type", "funding");
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Funding(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // =============================get all timelind==========================================

  const [All_Timeline, setAll_Timeline] = useState([]);
  const getall_timeline = async () => {
    try {
      setselect_loading("timeline");
      const params = new URLSearchParams();
      params.append("lookup_type", "timeline");
      const resp = await api.get(`api/LookupList?${params.toString()}`);
      setAll_Timeline(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  const requirment = ["Buy", "Rent", "Lease"];

  const transaction_type = ["Full White", "Collecter Rate", "Flexiable"];
  const furnishing = ["Furnished", "Unfurnished", "Semi Furnished"];

  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Set the Content-Type here
    },
  };
  const leadinfodetails = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resp = await api.post("leadinfo", leadinfo, config);
      const resp1 = await api.post("addcontact", leadinfo, config);
      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "🎉 Lead created successfully...!",
          html: `
                    <img src="https://cdn.vectorstock.com/i/500p/63/50/thumbs-up-smiley-face-icon-vector-10176350.jpg"
                    alt="Thumbs up" 
                    width="80" 
                    style="margin-bottom: 0px;"/>`,
          width: "400px", // makes it small
          padding: "1.2em",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/leaddetails");
          }
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops creating lead failed!",
        html: `
                  <img src="https://i.pinimg.com/originals/53/3f/f7/533ff77ef582abbfa00ccf9080137304.gif"
                  alt="Sad face" 
                  width="80" 
                  style="margin-bottom: 0px;" />
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if leadData exists and update the state accordingly
    if (leadData) {
      setleadinfo((prevState) => ({
        ...prevState, // Keep existing state
        ...leadData, // Update with the leadData passed from the previous component
      }));
    }
  }, [leadData]);
  //===================================------------- lead tab view=================================----------------------------------------
  const leadinfobasic = () => {
    document.getElementById("leadinfobasic1").style.display = "flex";
    document.getElementById("leadinfobasic2").style.display = "flex";
    document.getElementById("span1").style.color = "green";

    document.getElementById("leadinforequirment").style.display = "none";
    document.getElementById("span2").style.color = "black";

    document.getElementById("leadinfoprofessional").style.display = "none";
    document.getElementById("span3").style.color = "black";

    document.getElementById("leadinfopersonal").style.display = "none";
    document.getElementById("span3").style.color = "black";
  };
  const leadinforequirment = () => {
    document.getElementById("leadinfobasic1").style.display = "none";
    document.getElementById("leadinfobasic2").style.display = "none";
    document.getElementById("span1").style.color = "black";

    document.getElementById("leadinforequirment").style.display = "flex";
    document.getElementById("span2").style.color = "green";

    document.getElementById("leadinfoprofessional").style.display = "none";
    document.getElementById("span3").style.color = "black";

    document.getElementById("leadinfopersonal").style.display = "none";
    document.getElementById("span3").style.color = "black";
  };
  const leadinfoprofessionaldetails = () => {
    document.getElementById("leadinfobasic1").style.display = "none";
    document.getElementById("leadinfobasic2").style.display = "none";
    document.getElementById("span1").style.color = "black";

    document.getElementById("leadinforequirment").style.display = "none";
    document.getElementById("span2").style.color = "black";

    document.getElementById("leadinfoprofessional").style.display = "flex";
    document.getElementById("span3").style.color = "green";

    document.getElementById("leadinfopersonal").style.display = "none";
    document.getElementById("span4").style.color = "black";
  };
  const leadinfopersonaldetails = () => {
    document.getElementById("leadinfobasic1").style.display = "none";
    document.getElementById("leadinfobasic2").style.display = "none";
    document.getElementById("span1").style.color = "black";

    document.getElementById("leadinforequirment").style.display = "none";
    document.getElementById("span2").style.color = "black";

    document.getElementById("leadinfoprofessional").style.display = "none";
    document.getElementById("span3").style.color = "black";

    document.getElementById("leadinfopersonal").style.display = "flex";
    document.getElementById("span4").style.color = "green";
  };

  //======================------------------------------------- lead tab view end---------------------------===================================

  //===================-------------------all array addFn3,delete and handle change event--------------------==========================
  function addFn11() {
    setleadinfo({
      ...leadinfo,
      country_code: [...leadinfo.country_code, ""],
      mobile_no: [...leadinfo.mobile_no, ""],
      mobile_type: [...leadinfo.mobile_type, ""],
      action11: [...(leadinfo.action11 || []), ""], // ✅ safe
    });
  }

  const deleteall11 = (index) => {
    const newcountry_code = leadinfo.country_code.filter((_, i) => i !== index);
    const newmobile_no = leadinfo.mobile_no.filter((_, i) => i !== index);
    const newmobile_type = leadinfo.mobile_type.filter((_, i) => i !== index);
    const newaction11 = leadinfo?.action11?.filter((_, i) => i !== index);

    setleadinfo({
      ...leadinfo,
      country_code: newcountry_code,
      mobile_no: newmobile_no,
      mobile_type: newmobile_type,
      action11: newaction11,
    });
  };
  const handlecountry_codechange1 = (index, event) => {
    const newcountry_code = [...leadinfo.country_code];
    newcountry_code[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      country_code: newcountry_code,
    });
  };
  const handlemobile_nochange1 = (index, event) => {
    const newmobile_no = [...leadinfo.mobile_no];
    newmobile_no[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      mobile_no: newmobile_no,
    });
  };
  const handlemobile_typechange1 = (index, event) => {
    const newmobile_type = [...leadinfo.mobile_type];
    newmobile_type[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      mobile_type: newmobile_type,
    });
  };

  function addFn22() {
    setleadinfo({
      ...leadinfo,
      email: [...leadinfo.email, ""],
      email_type: [...leadinfo.email_type, ""],
      action22: [...(leadinfo.action22 || []), ""],
    });
  }

  const deleteall22 = (index) => {
    const newemail = leadinfo.email.filter((_, i) => i !== index);
    const newemail_type = leadinfo.email_type.filter((_, i) => i !== index);
    const newaction22 = leadinfo?.action22?.filter((_, i) => i !== index);

    setleadinfo({
      ...leadinfo,
      email: newemail,
      email_type: newemail_type,
      action22: newaction22,
    });
  };
  const handleemailchange1 = (index, event) => {
    const newemail = [...leadinfo.email];
    newemail[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      email: newemail,
    });
  };
  const handleemail_typechange1 = (index, event) => {
    const newemail_type = [...leadinfo.email_type];
    newemail_type[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      email_type: newemail_type,
    });
  };

  function addFn4() {
    setleadinfo({
      ...leadinfo,
      education: [...leadinfo.education, ""],
      degree: [...leadinfo.degree, ""],
      school_college: [...leadinfo.school_college, ""],
      action4: [...(leadinfo.action22 || []), ""],
    });
  }
  const deleteall4 = (index) => {
    const neweducation = leadinfo.education.filter((_, i) => i !== index);
    const newdegree = leadinfo.degree.filter((_, i) => i !== index);
    const newschool_college = leadinfo.school_college.filter(
      (_, i) => i !== index
    );
    const newaction4 = leadinfo.action4.filter((_, i) => i !== index);

    setleadinfo({
      ...leadinfo,
      education: neweducation,
      degree: newdegree,
      school_college: newschool_college,
      action4: newaction4,
    });
  };
  const handleeducationChange = (index, event) => {
    const neweducation = [...leadinfo.education];
    neweducation[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      education: neweducation,
    });
  };
  const handledegreeChange = (index, event) => {
    const newdegree = [...leadinfo.degree];
    newdegree[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      degree: newdegree,
    });
  };

  const handleschool_collegeChange = (index, event) => {
    const newschool = [...leadinfo.school_college];
    newschool[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      school_college: newschool,
    });
  };

  function addFn5() {
    setleadinfo({
      ...leadinfo,
      loan: [...leadinfo.loan, ""],
      bank: [...leadinfo.bank, ""],
      amount: [...leadinfo.amount, ""],
      action5: [...leadinfo.action5, ""],
    });
  }
  const deleteall5 = (index) => {
    const newloan = leadinfo.loan.filter((_, i) => i !== index);
    const newbank = leadinfo.bank.filter((_, i) => i !== index);
    const newamount = leadinfo.amount.filter((_, i) => i !== index);
    const newaction5 = leadinfo.action5.filter((_, i) => i !== index);

    setleadinfo({
      ...leadinfo,
      loan: newloan,
      bank: newbank,
      amount: newamount,
      action5: newaction5,
    });
  };
  const handleloanchange = (index, event) => {
    const newloan = [...leadinfo.loan];
    newloan[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      loan: newloan,
    });
  };
  const handlebankchange = (index, event) => {
    const newbank = [...leadinfo.bank];
    newbank[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      bank: newbank,
    });
  };
  const handleamountchange = (index, event) => {
    const newamount = [...leadinfo.amount];
    newamount[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      amount: newamount,
    });
  };

  function addFn6() {
    setleadinfo({
      ...leadinfo,
      social_media: [...leadinfo.social_media, ""],
      url: [...leadinfo.url, ""],
      action6: [...leadinfo.action6, ""],
    });
  }
  const deleteall6 = (index) => {
    const newsocial_media = leadinfo.social_media.filter((_, i) => i !== index);
    const newurl = leadinfo.url.filter((_, i) => i !== index);
    const newaction6 = leadinfo.action6.filter((_, i) => i !== index);

    setleadinfo({
      ...leadinfo,
      social_media: newsocial_media,
      url: newurl,
      action6: newaction6,
    });
  };
  const handlesocial_mediachange = (index, event) => {
    const newsocial_media = [...leadinfo.social_media];
    newsocial_media[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      social_media: newsocial_media,
    });
  };
  const handleurlChange = (index, event) => {
    const newurl = [...leadinfo.url];
    newurl[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      url: newurl,
    });
  };

  function addFn7() {
    setleadinfo({
      ...leadinfo,
      income: [...leadinfo.income, ""],
      amount1: [...leadinfo.amount1, ""],
      action7: [...leadinfo.action7, ""],
    });
  }
  const deleteall7 = (index) => {
    const newincome = leadinfo.income.filter((_, i) => i !== index);
    const newamount1 = leadinfo.amount1.filter((_, i) => i !== index);
    const newaction7 = leadinfo.action7.filter((_, i) => i !== index);

    setleadinfo({
      ...leadinfo,
      income: newincome,
      amount1: newamount1,
      action7: newaction7,
    });
  };
  const handleincomechange = (index, event) => {
    const newincome = [...leadinfo.income];
    newincome[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      income: newincome,
    });
  };
  const handleamount1change = (index, event) => {
    const newamount1 = [...leadinfo.amount1];
    newamount1[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      amount1: newamount1,
    });
  };

  function addFn8() {
    setleadinfo({
      ...leadinfo,
      document_no: [...leadinfo.document_no, ""],
      document_name: [...leadinfo.document_name, ""],
      document_pic: [...leadinfo.document_pic, ""],
      action8: [...leadinfo.action8, ""],
    });
  }
  const deleteall8 = (index) => {
    const newdocumentno = leadinfo.document_no.filter((_, i) => i !== index);
    const newdocumentname = leadinfo.document_name.filter(
      (_, i) => i !== index
    );
    const newdocumentpic = leadinfo.document_pic.filter((_, i) => i !== index);
    const newaction8 = leadinfo.action8.filter((_, i) => i !== index);

    setleadinfo({
      ...leadinfo,
      document_no: newdocumentno,
      document_name: newdocumentname,
      document_pic: newdocumentpic,
      action8: newaction8,
    });
  };
  const handledocumentnochange = (index, event) => {
    const newdocumentno = [...leadinfo.document_no];
    newdocumentno[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      document_no: newdocumentno,
    });
  };
  const handledocumentnamechange = (index, event) => {
    const newdocumentname = [...leadinfo.document_name];
    newdocumentname[index] = event.target.value;
    setleadinfo({
      ...leadinfo,
      document_name: newdocumentname,
    });
  };
  const handledocumentpicchange = (index, event) => {
    const newdocumentpic = [...leadinfo.document_pic];
    const files = Array.from(event.target.files);
    newdocumentpic[index] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setleadinfo({
      ...leadinfo,
      document_pic: newdocumentpic,
    });
  };

  const selectlocation = () => {
    document.getElementById("select_location").style.display = "flex";
    document.getElementById("search_location1").style.display = "none";

    document.getElementById("searchlocation").style.color = "black";
    document.getElementById("searchlocation").style.backgroundColor = "white";

    document.getElementById("selectlocation").style.backgroundColor = "black";
    document.getElementById("selectlocation").style.color = "white";
    document.getElementById("selectlocation").style.borderRadius = "50px";
    document.getElementById("selectlocation").style.width = "150px";
    document.getElementById("selectlocation").style.textAlign = "center";
  };
  const searchlocation = () => {
    document.getElementById("select_location").style.display = "none";
    document.getElementById("search_location1").style.display = "flex";

    document.getElementById("selectlocation").style.color = "black";
    document.getElementById("selectlocation").style.backgroundColor = "white";

    document.getElementById("searchlocation").style.backgroundColor = "black";
    document.getElementById("searchlocation").style.color = "white";
    document.getElementById("searchlocation").style.borderRadius = "50px";
    document.getElementById("searchlocation").style.width = "150px";
    document.getElementById("searchlocation").style.textAlign = "center";
  };

  const [data1, setdata1] = useState([]);
  const fetchdatabyprojectcityname = async () => {
    try {
      const city = leadinfo.city3;
      const resp = await api.get(`viewprojectbycityname/${city}`);
      console.log(resp);

      setdata1(resp.data.project);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdatabyprojectcityname();
  }, [leadinfo.city3]);

  const allproject = [];
  data1.map((item) => allproject.push(item.name));

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
      const collectedblocks = units.flatMap((item) => item.add_block);

      setallblocks(collectedblocks);
    }
  }, [units]);

  const handleprojectchange = (event) => {
    const selectproject = event.target.value;

    // If the "Select All" option is selected
    if (selectproject.includes("select-all")) {
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
        const allBlockNames = allblocks.map((project) => project.block_name);
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
  };

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
    { value: 10000, label: "10000" },
  ];

  // Filter max budget options based on selected min budget
  const filteredarea = leadinfo.minimum_area
    ? areaoptions.filter((option) => option.value >= leadinfo.minimum_area)
    : areaoptions;

  const onlineCampaignSources = [
    "Facebook",
    "Instagram",
    "Google",
    "X",
    "Linkedin",
    "99 Acre",
    "Magicbricks",
    "Common Floor",
    "Sulekha",
    "Housing",
    "Square Yard",
    "OLX",
    "Real Estate India",
  ];

  const offlineCampaignSources = [
    "SMS",
    "Email",
    "Whatsapp",
    "Website",
    "News Paper",
    "Cold Calling",
  ];

  const organicCampaignSources = [
    "Walk-In",
    "Old Client",
    "Friends",
    "Relative",
    "Hoarding",
    "Reference",
    "Channel Partner",
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

  const [contactdata, setcontactdata] = useState([]);
  const fetchdata = async () => {
    try {
      const resp = await api.get("viewcontact");
      setcontactdata(resp.data.contact);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (leadinfo.source) {
      // You can add more checks here if needed
      fetchdata();
    }
  }, [leadinfo.source]);

  const [show1, setshow1] = useState(false);

  const handleClose1 = () => setshow1(false);
  const handleShow1 = async () => {
    setshow1(true);
  };

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
    country1: "",
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
  });

  const config1 = {
    headers: {
      "Content-Type": "multipart/form-data", // Set the Content-Type here
    },
  };

  const addcontact = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post("addcontact", contact, config1);
      if (resp.status === 200) {
        toast.success(resp.data.message, { autoClose: 2000 });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
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

  const [progress, setProgress] = useState(leadinfo.white_portion || 0); // Initialize with deal.whiteportion

  const handleMouseMove = (e) => {
    const progressBar = e.target.getBoundingClientRect();
    const newProgress =
      ((e.clientX - progressBar.left) / progressBar.width) * 100;
    const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
    setProgress(clampedProgress);
    setleadinfo((prevLead) => ({
      ...prevLead,
      white_portion: clampedProgress,
    })); // Update deal.whiteportion
  };

  const handleMouseDown = (e) => {
    handleMouseMove(e); // Set initial progress
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  //======================----------------------------------all array addFn3,delete and handle change event--------------======================

  // ==============================================search loaction from google start========================================================

  const inputRef = useRef(null);
  const apiKey = "AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc";

  useEffect(() => {
    const scriptExists = document.querySelector("#google-maps-script");
    if (!scriptExists) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
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

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const components = place.address_components;
      let address = "",
        city = "",
        zip = "",
        state = "",
        country = "";

      components.forEach((component) => {
        const types = component.types;
        if (types.includes("route") || types.includes("sublocality")) {
          address += component.long_name + " ";
        }
        if (types.includes("locality")) {
          city = component.long_name;
        }
        if (types.includes("postal_code")) {
          zip = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
        if (types.includes("country")) {
          country = component.long_name;
        }
      });

      setleadinfo((prev) => ({
        ...prev,
        search_location: place.formatted_address,
        street_address: address.trim(),
        city2: city,
        pincode2: zip,
        state2: state,
        country2: country,
        lattitude: lat,
        longitude: lng,
      }));
    });
  };

  const getlocation = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: leadinfo.search_location,
            key: apiKey,
          },
        }
      );

      if (res.data.results.length > 0) {
        const result = res.data.results[0];
        const lat = result.geometry.location.lat;
        const lng = result.geometry.location.lng;

        const components = result.address_components;
        let address = "",
          city = "",
          zip = "",
          state = "",
          country = "";

        components.forEach((component) => {
          const types = component.types;
          if (types.includes("route") || types.includes("sublocality")) {
            address += component.long_name + " ";
          }
          if (types.includes("locality")) {
            city = component.long_name;
          }
          if (types.includes("postal_code")) {
            zip = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (types.includes("country")) {
            country = component.long_name;
          }
        });

        setleadinfo((prev) => ({
          ...prev,
          street_address: address.trim(),
          city2: city,
          pincode2: zip,
          state2: state,
          country2: country,
          lattitude: lat,
          longitude: lng,
        }));
      }
    } catch (err) {
      console.error("Geocode error:", err);
    }
  };

  //================================================ search location from google end=====================================================

  //========================================= matched deal code start==================================================================

  const [data2, setdata2] = useState([]);
  const fetchdata2 = async () => {
    try {
      const resp = await api.get("viewdeal");
      setdata2(resp.data.deal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata2();
  }, []);

  useEffect(() => {
    if (data2.length > 0) {
      const availableFor =
        leadinfo.requirment === "Buy" ? "Sale" : leadinfo.requirment;

      // Filter leads based on the current deal's criteria
      const filtereddeals = data2.filter(
        (item) => item.available_for === availableFor
      );

      // Create a new deal object with updated matched leads and matched lead count

      setleadinfo({
        ...leadinfo,
        matcheddeals: filtereddeals.map((item) => item._id),
        matchingdeal: filtereddeals.length, // Update the matched lead count
      });
    }
  }, [leadinfo.requirment]); // Trigger this effect whenever `data2` or `deals` changes




  return (
  <div>
      <div id="h">
        <Header1 />
      </div>
      <div>
        <Sidebar1 />
      </div>

      <div style={{ padding: "50px" }}>
        <div className="container  bg-white mt-5  ml-200px w-[80%] shadow-2xl rounded-xl">
          <div className="row" id="r" style={{ transition: "0.5s" }}>
            <div className="col-12">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center">
                 <h1
                    className="text-right text-xl font-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.location.reload()}
                  >
                    Update Lead
                  </h1>
                </div>
                <hr></hr>
                <div
                  className="d-flex justify-content-between align-items-center experience"
                  style={{ fontFamily: "times new roman", fontWeight: "bold" }}
                >
                  <span
                    onClick={leadinfobasic}
                    id="span1"
                    style={{ cursor: "pointer" }}
                  >
                    Basic Details
                  </span>
                  <span
                    onClick={leadinforequirment}
                    id="span2"
                    style={{ cursor: "pointer" }}
                  >
                    Requirment
                  </span>
                  <span
                    onClick={leadinfoprofessionaldetails}
                    id="span3"
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Professional Details
                  </span>
                  <span
                    onClick={leadinfopersonaldetails}
                    id="span4"
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Personal Details
                  </span>
                </div>
                <hr></hr>
                {/*----------------------------------------leadinfo basic details start------------------------------------------------------------------- */}

                <div className="row" id="leadinfobasic1">
                  <div className="col-md-3 custom-input">
                    <label className="form-label">Title</label>
                    <select
                      className="form-control form-control-sm"
                      required="true"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, title: e.target.value })
                      }
                       onClick={() => {
                          if (All_Form_Title.length === 0) {
                            getall_form_title();
                          }
                        }}
                    >
                      <option>{leadinfo?.title || "Mr."}</option>
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
                  <div className="col-md-4  custom-input">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.first_name || ""}
                      required="true"
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, first_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-4 custom-input">
                    <label className="form-label">Surname</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.last_name || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, last_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row" id="leadinfobasic2">
                  <div className="col-md-4  custom-input">
                    {" "}
                    <label className="form-label">Country</label>
                    {leadinfo.country_code.map((item, index) => (
                      <select
                        style={{ marginTop: "1px" }}
                        required="true"
                        className="form-control form-control-sm"
                        onChange={(event) =>
                          handlecountry_codechange1(index, event)
                        }
                        value={leadinfo?.country_code[index]}
                        onClick={() => {
                          if (All_Country_Code.length === 0) {
                            getall_country_code();
                          }
                        }}
                      >
                        {select_loading === "country_code" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                          <option>{leadinfo?.country_code[index]}</option>
                            <option value="">-- Select Country Code --</option>

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
                  <div className="col-md-4 custom-input">
                    <label className="form-label">Mobile Number</label>
                    {leadinfo.mobile_no.map((item, index) => (
                      <input
                        type="text"
                        required="true"
                        style={{ marginTop: "1px" }}
                        className="form-control form-control-sm"
                        value={leadinfo?.mobile_no[index]}
                        placeholder="enter phone number"
                        onChange={(event) =>
                          handlemobile_nochange1(index, event)
                        }
                      />
                    ))}
                  </div>
                  <div className="col-md-2 custom-input">
                    <label className="form-label">Type</label>
                    {leadinfo.mobile_type.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        style={{ marginTop: "1px" }}
                        onChange={(event) =>
                          handlemobile_typechange1(index, event)
                        }
                      >
                        <option>{leadinfo?.mobile_type[index] || "---Select---"}</option>
                        <option>Personal</option>
                        <option>Official</option>
                        <option>Home</option>
                        <option>Phone</option>
                      </select>
                    ))}
                  </div>
                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "50px" }}
                  >
                    {leadinfo?.mobile_no?.map((item, index) => (
                      <div style={{ marginTop: "10px" }}>
                        {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall11(index)} style={{height:"40px",cursor:"pointer"}}/> */}
                        <span
                          class="material-icons"
                          style={{
                            color: "red",
                            fontSize: "24px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteall11(index)}
                        >
                          delete
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-1 custom-input">
                    <label className="form-label">Add</label>
                    <button
                      className="form-control form-control-sm btn-add"
                      onClick={addFn11}
                      
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-8 custom-input">
                    <label className="form-label">Email-Address</label>
                    {leadinfo.email.map((item, index) => (
                      <input
                        type="text"
                        style={{ marginTop: "1px" }}
                        className="form-control form-control-sm"
                        placeholder="enter email-id"
                        value={leadinfo?.email[index]}
                        onChange={(event) => handleemailchange1(index, event)}
                      />
                    ))}
                  </div>

                  <div className="col-md-2  custom-input">
                    <label className="form-label">Type</label>
                    {leadinfo.email_type.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        style={{ marginTop: "1px" }}
                        onChange={(event) =>
                          handleemail_typechange1(index, event)
                        }
                      >
                        <option>{leadinfo?.email_type[index] || "---Select---"}</option>
                        <option>Personal</option>
                        <option>Official</option>
                        <option>Business</option>
                      </select>
                    ))}
                  </div>

                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "50px" }}
                  >
                    {leadinfo?.email?.map((item, index) => (
                      <div style={{ marginTop: "10px" }}>
                        {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall22(index)} style={{height:"40px",cursor:"pointer"}}/> */}
                        <span
                          class="material-icons"
                          style={{
                            color: "red",
                            fontSize: "24px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteall22(index)}
                        >
                          delete
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-1 custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm btn-add"
                      onClick={addFn22}
                      
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-8 custom-input">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.tags || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, tags: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-10  custom-input">
                    <label className="form-label">Descriptions</label>
                    <textarea
                      defaultValue={leadinfo?.descriptions || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          descriptions: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-12  custom-input">
                    <label
                      className="form-label"
                      style={{ fontSize: "16px", marginTop: "10px" }}
                    >
                      System Details
                    </label>
                    <hr style={{ marginTop: "-5px" }}></hr>
                  </div>

                  <div className="col-md-6 custom-input">
                    <label className="form-label">Stage</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, stage: e.target.value })
                      }
                    >
                      <option>{leadinfo?.stage || "---Select---"}</option>
                      <option>Incoming</option>
                      <option>Prospect</option>
                      <option>Negotiation</option>
                      <option>Oppurtunity</option>
                      <option>Booked</option>
                      <optgroup
                        label="Closed"
                        style={{ fontWeight: "bolder", color: "blue" }}
                      >
                        <option style={{ color: "green" }}>Won</option>
                        <option style={{ color: "red" }}>Lost</option>
                        <option style={{ color: "gray" }}>Unqualified </option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="col-md-6 custom-input">
                    <label className="form-label">Lead Type</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, lead_type: e.target.value })
                      }
                    >
                      <option>{leadinfo?.lead_type || "---Select---"}</option>
                      <option>Hot</option>
                      <option>Warm</option>
                      <option>Cold</option>
                    </select>
                  </div>
                  <div className="col-md-6 custom-input">
                    <label className="form-label">Owner</label>
            
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={owners}
                      onChange={handleOwnerChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      <MenuItem disabled value="---select---">
                        {leadinfo?.owner || "---select---"}
                      </MenuItem>
                      {ownersList.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={owners.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-md-6 custom-input">
                    <label className="form-label">Team</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, team: e.target.value })
                      }
                    >
                      <option>{leadinfo?.team || "---select---"}</option>
                      <option>Sales</option>
                      <option>Marketing</option>
                      <option> Post Sales</option>
                      <option> Pre Sales</option>
                    </select>
                  </div>
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Visible to</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, visible_to: e.target.value })
                      }
                    >
                      <option>{leadinfo?.visible_to || "---Select---"}</option>
                      <option>My Team</option>
                      <option>My Self</option>
                      <option>All Users</option>
                    </select>
                  </div>
                  <div className="col-md-6  custom-input"></div>

                  <div className="col-md-12 custom-input">
                    <label
                      className="form-label"
                      style={{ fontSize: "16px", marginTop: "10px" }}
                    >
                      Campegin Details
                    </label>
                    <hr style={{ marginTop: "-5px" }}></hr>
                  </div>

                  <div className="col-md-6 custom-input">
                    <label className="form-label">Campaign</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, campaign: e.target.value })
                      }
                    >
                      <option>{leadinfo?.campaign || "---Select---"}</option>
                      <option>Online Campaign</option>
                      <option>Offline Campaign</option>
                      <option>Organic Campaign</option>
                    </select>
                  </div>
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Source</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, source: e.target.value })
                      }
                    >
                      <option>{leadinfo?.source || "---Select---"}</option>
                      {getSourceOptions().map((source, index) => (
                        <option key={index} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Sub-Source</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, sub_source: e.target.value })
                      }
                    >
                      <option>{leadinfo?.sub_source || "---Select---"}</option>
                      <option>Call</option>
                      <option>Sms</option>
                      <option>Email</option>
                      <option>Whatsapp</option>
                    </select>
                  </div>
                  {(leadinfo.source === "Reference" ||
                    (leadinfo.source === "Channel Partner" &&
                      leadinfo.campaign === "Organic Campaign")) && (
                    <>
                      {/* <div className="col-md-5  custom-input">
                        <label className="form-label">Referrer Name</label>
                        <select className="form-control form-control-sm" onChange={(e) => setleadinfo({ ...leadinfo, channel_partner: e.target.value })}
                          value={leadinfo.channel_partner || ''}
                         >
                          <option value="">{leadinfo?.channel_partner || '---Select---'}</option>
                       {
                        contactdata
                        .map((item)=>
                        (
                          <option>{item.title} {item.first_name} {item.last_name} ({item.mobile_no})</option> 
                        ))
                        }
                        </select>
                      </div> */}
                      <div className="col-md-5  custom-input">
                        {" "}
                        <label className="form-label">Referrer Name</label>
                        <Autocomplete
                          const
                          options={contactdata.filter((item) => item._id)}
                          getOptionLabel={(option) =>
                            `${option.title} ${option.first_name} ${option.last_name} (${option.mobile_no}) `
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              placeholder="---select---"
                            />
                          )}
                        />
                      </div>
                      <div
                        className="col-md-1  custom-input"
                        onClick={handleShow1}
                      >
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
                            transition: "all 0.2s ease-in-out",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#0056b3")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#007bff")
                          }
                        >
                          +
                        </button>
                      </div>
                    </>
                  )}

                  <div className="col-md-12 custom-input">
                    <hr></hr>
                  </div>
  
                </div>
                {/* ---------------------------------------leadinfo basic details end ------------------------------------------------------------------------*/}

                {/*---------------------------------------- leadinfo requirment details start--------------------------------------------------------------- */}

                <div
                  className="row mt-2"
                  id="leadinforequirment"
                  style={{ display: "none" }}
                >
                  <div className="col-md-3 custom-input">
                    <label className="form-label">Requirment</label>
                    <select
                      className="form-control form-control-sm"
                      required="true"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, requirment: e.target.value })
                      }
                    >
                     <option>{leadinfo?.requirment || "---Select---"}</option>
                      {requirment.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 custom-input">
                    <label className="form-label">Property Type</label>

                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={leadinfo?.property_type || []}
                      onChange={handleCategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {/* FIX: Use MenuItem Instead of <option> */}
                      <MenuItem disabled>---Select property type---</MenuItem>

                      {All_Property_Type.map((type) => (
                        <MenuItem key={type._id} value={type.lookup_value}>
                          <Checkbox
                            checked={leadinfo?.property_type?.includes(
                              type.lookup_value
                            )}
                          />
                          <ListItemText primary={type.lookup_value} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="col-md-4 custom-input">
                    <label
                      className="form-label"
                      style={{ display: "inline-block" }}
                    >
                      Purpose
                    </label>
                    <br></br>
                    <input
                      type="radio"
                      name="purpose"
                      value={"End use"}
                      style={{ marginRight: "10px" }}
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, purpose: e.target.value })
                      }
                    />
                    End use
                    <input
                      type="radio"
                      name="purpose"
                      value={"Investor"}
                      style={{ marginLeft: "20px", marginRight: "10px" }}
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, purpose: e.target.value })
                      }
                    />
                    Investor
                  </div>
                  <div className="col-md-2  custom-input">
                    <label className="form-label">NRI</label>
                    <br></br>
                    <input
                      type="checkbox"
                      value={"Yes"}
                      style={{ marginRight: "10px" }}
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, nri: e.target.value })
                      }
                    />
                    Yes
                  </div>
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Sub Type</label>

                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={leadinfo.sub_type}
                      onChange={handleSubcategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {/* FIX: Use MenuItem Instead of <option> */}
                      <MenuItem disabled>
                        ---Select property sub type---
                      </MenuItem>

                      {All_Property_Sub_Type.map((type) => (
                        <MenuItem key={type._id} value={type.lookup_value}>
                          <Checkbox
                            checked={leadinfo?.sub_type?.includes(
                              type.lookup_value
                            )}
                          />
                          <ListItemText primary={type.lookup_value} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="col-md-6  custom-input">
                    <label className="form-label">Unit Type</label>
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={leadinfo.unit_type}
                      onChange={handleUnitTypeChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      <MenuItem disabled>
                        ---Select property unit type---
                      </MenuItem>

                      {All_Property_Unit_Type.map((type) => (
                        <MenuItem key={type._id} value={type.lookup_value}>
                          <Checkbox
                            checked={leadinfo?.sub_type?.includes(
                              type.lookup_value
                            )}
                          />
                          <ListItemText primary={type.lookup_value} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  {leadinfo.requirment === "Rent" && (
                    <>
                      <div id="rentbudgetmin" className="col-md-6 custom-input">
                        <label className="form-label">Budget Min</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              budget_min: e.target.value,
                            })
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

                      <div
                        id="rentbudgetmax"
                        className="col-md-6  custom-input"
                      >
                        <label className="form-label">Budget Max</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              budget_max: e.target.value,
                            })
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
                      <div id="buybudgetmin" className="col-md-6  custom-input">
                        <label className="form-label">Budget Min</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              budget_min: e.target.value,
                            })
                          }
                        >
                          <option>---Select---</option>
                          {buyBudgetOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div id="buybudgetmax" className="col-md-6 custom-input">
                        <label className="form-label">Budget Max</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              budget_max: e.target.value,
                            })
                          }
                        >
                          <option>---Select---</option>
                          {filteredMaxBudgetOptionsbuy.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="col-md-4  custom-input">
                    <label className="form-label">Minimum Area</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          minimum_area: e.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      {areaoptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 custom-input">
                    <label className="form-label">Maximum Area</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          maximum_area: e.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      {filteredarea.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 custom-input">
                    <label className="form-label">Area Metric</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          area_metric: e.target.value,
                        })
                      }
                    >
                      <option>Sq Yard</option>
                      <option>Marla</option>
                      <option>Acre</option>
                      <option>Sq Feet</option>
                      <option>Kanal</option>
                    </select>
                  </div>
                  <div className="col-md-12 custom-input">
                    <label
                      className="form-label"
                      style={{ fontSize: "16px", marginTop: "10px" }}
                    >
                      Location Details
                    </label>
                  </div>

                  <div
                    className="row"
                    id="search_location"
                    style={{
                      border: "1px solid black",
                      margin: "5px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "50px",
                        border: "1px solid gray",
                        padding: "5px",
                        borderRadius: "50px",
                        marginLeft: "20%",
                      }}
                    >
                      <div
                        id="selectlocation"
                        onClick={selectlocation}
                        style={{
                          cursor: "pointer",
                          fontWeight: "bold",
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: "50px",
                          width: "150px",
                          textAlign: "center",
                          transition: "0.5s ease-out",
                        }}
                      >
                        Select Location{" "}
                      </div>
                      <div
                        id="searchlocation"
                        onClick={searchlocation}
                        style={{
                          cursor: "pointer",
                          fontWeight: "bold",
                          transition: "0.5s ease-out",
                        }}
                      >
                        Search Loacation
                      </div>
                    </div>

                    <div
                      className="row"
                      id="select_location"
                      style={{ margin: "5px", padding: "10px" }}
                    >
                      <div className="col-md-5 custom-input">
                        <label className="form-label">Country(country3)</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              country3: e.target.value,
                            })
                          }
                          value={leadinfo?.country3}
                          onClick={() => {
                            if (All_Country.length === 0) {
                              getall_country();
                            }
                          }}
                        >
                          {select_loading === "country" ? (
                            <option>⏳ Loading...</option>
                          ) : (
                            <>
                              <option value="">-- Select Country --</option>

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

                      <div className="col-md-5 custom-input">
                        <label className="form-label">State(state3)</label>
                        <select
                          type="text"
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({ ...leadinfo, state3: e.target.value })
                          }
                          value={leadinfo?.state3}
                          onClick={() => {
                            getall_state();
                          }}
                        >
                          {select_loading === "state" ? (
                            <option>⏳ Loading...</option>
                          ) : (
                            <>
                              <option value="">-- Select State --</option>

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
                      <div className="col-md-2 custom-input"></div>

                      <div className="col-md-5  custom-input">
                        <label className="form-label">City(city3)</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({ ...leadinfo, city3: e.target.value })
                          }
                          value={leadinfo?.city3}
                          onClick={() => {
                            getall_city();
                          }}
                          disabled={!leadinfo.state3 || All_City.length === 0} // Disable if no state or invalid state
                        >
                          {select_loading === "city" ? (
                            <option>⏳ Loading...</option>
                          ) : (
                            <>
                              <option value="">-- Select City --</option>

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
                      <div className="col-md-5  custom-input">
                        <label className="form-label">Area/Project</label>
                        <Select
                          className="form-control form-control-sm"
                          multiple
                          value={leadinfo.area_project}
                          onChange={handleprojectchange}
                          style={{ border: "none" }}
                          renderValue={(selected) => selected.join(", ")}
                          label="Area/Project"
                        >
                          {/* "Select All" MenuItem */}
                          <MenuItem value="select-all">
                            <Checkbox
                              checked={
                                leadinfo.area_project.length ===
                                allproject.length
                              }
                            />
                            <ListItemText primary="--- Select All ---" />
                          </MenuItem>

                          {/* Individual Project MenuItems */}
                          {allproject.map((project) => (
                            <MenuItem key={project} value={project}>
                              <Checkbox
                                checked={
                                  leadinfo.area_project.indexOf(project) > -1
                                }
                              />
                              <ListItemText primary={project} />
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="col-md-5 custom-input">
                        <label className="form-label">Block(block3)</label>
                        <Select
                          className="form-control form-control-sm"
                          multiple
                          value={leadinfo.block3}
                          onChange={handleallblockchange}
                          style={{ border: "none" }}
                          renderValue={(selected) => selected.join(", ")}
                          label="Block"
                        >
                          {/* "Select All" MenuItem */}
                          <MenuItem value="select-all">
                            <Checkbox
                              checked={
                                leadinfo.block3.length === allblocks.length
                              }
                            />
                            <ListItemText primary="--- Select All ---" />
                          </MenuItem>

                          {/* Individual Block MenuItems */}
                          {[
                            ...new Map(
                              allblocks.map((item) => [item.block_name, item])
                            ).values(),
                          ].map((project) => (
                            <MenuItem
                              key={project.block_name}
                              value={project.block_name}
                            >
                              <Checkbox
                                checked={
                                  leadinfo.block3.indexOf(project.block_name) >
                                  -1
                                }
                              />
                              <ListItemText primary={project.block_name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </div>

                      <div className="col-md-5 custom-input">
                        <label className="form-label">Specific Unit</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              specific_unit: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div
                      className="row"
                      id="search_location1"
                      style={{
                        margin: "5px",
                        padding: "10px",
                        display: "none",
                      }}
                    >
                      <div className="col-md-8 custom-input">
                        <label className="form-label">Search Location</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          ref={inputRef}
                          value={leadinfo.search_location}
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              search_location: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-2  custom-input"></div>
                      <div className="col-md-2 custom-input">
                        <label
                          className="form-label"
                          style={{ visibility: "hidden" }}
                        >
                          Search
                        </label>
                        <button
                          className="form-control form-control-sm"
                          onClick={getlocation}
                        >
                          Get
                        </button>
                      </div>
                      <div className="col-md-8 custom-input">
                        <label className="form-label">Street Address</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              street_address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-4 custom-input">
                        <label className="form-label">Range</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({ ...leadinfo, range: e.target.value })
                          }
                        >
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
                      {/* <div className="col-md-2  custom-input"><label className="form-label">Unit</label>
                        <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,range_unit:e.target.value})}>
                          <option>---select---</option>
                          <option>K.M</option>
                        </select>
                        </div> */}
                      {/* <div className="col-md-4"></div> */}

                      <div className="col-md-3  custom-input ">
                        <label className="form-label">City(city2)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={leadinfo.city2}
                          onChange={(e) =>
                            setleadinfo({ ...leadinfo, city2: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3  custom-input ">
                        <label className="form-label">Area(area2)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            setleadinfo({ ...leadinfo, area2: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3  custom-input ">
                        <label className="form-label">Block(block)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={leadinfo.block}
                          onChange={(e) =>
                            setleadinfo({ ...leadinfo, block: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3  custom-input ">
                        <label className="form-label">Pin Code(pincode2)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={leadinfo.pincode2}
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              pincode2: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-3  custom-input ">
                        <label className="form-label">Country(country2)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={leadinfo.country2}
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              country2: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-3  custom-input ">
                        <label className="form-label">State(state2)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={leadinfo.state2}
                          onChange={(e) =>
                            setleadinfo({ ...leadinfo, state2: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3  custom-input ">
                        <label className="form-label">Lattitude</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={leadinfo.lattitude}
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              lattitude: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-3  custom-input ">
                        <label className="form-label">Longitude</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={leadinfo.longitude}
                          onChange={(e) =>
                            setleadinfo({
                              ...leadinfo,
                              longitude: e.target.value,
                            })
                          }
                        />
                      </div>
                      {/* <div className="col-md-4"><label className="form-label">Location</label><input type="text" className="form-control form-control-sm" /></div> */}
                    </div>
                  </div>

                  <div className="col-md-12  custom-input">
                    <label
                      className="form-label"
                      style={{ fontSize: "16px", marginTop: "10px" }}
                    >
                      Other Details
                    </label>
                    <hr style={{ marginTop: "-5px" }}></hr>
                  </div>

                  <div className="col-md-4 custom-input">
                    <label className="form-label">Facing</label>
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={facings}
                      onChange={handlefacingChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {/* <MenuItem disabled value="---select---">
                    {leadinfo?.facing || '---select---'}
                </MenuItem> */}
                      <MenuItem value="select-all">
                        <Checkbox checked={facings.length === facing.length} />
                        <ListItemText
                          primary={leadinfo?.facing || "---select all---"} // Display leadinfo.matched_deal or fallback to '---select---'
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
                  <div className="col-md-4  custom-input">
                    <label className="form-label">Road</label>
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={roads}
                      onChange={handleroadChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {/* <MenuItem disabled value="---select---">
                    {leadinfo?.road || '---select---'}
                </MenuItem> */}
                      <MenuItem value="select-all">
                        <Checkbox checked={roads.length === road.length} />
                        <ListItemText
                          primary={leadinfo?.road || "---select all---"} // Display leadinfo.matched_deal or fallback to '---select---'
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
                  <div className="col-md-4 custom-input">
                    <label className="form-label">Direction</label>
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={directions}
                      onChange={handledirectionChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {/* <MenuItem disabled value="---select---">
                    {leadinfo?.road || '---select---'}
                </MenuItem> */}
                      <MenuItem value="select-all">
                        <Checkbox
                          checked={directions.length === direction.length}
                        />
                        <ListItemText
                          primary={leadinfo?.direction || "---select all---"} // Display leadinfo.matched_deal or fallback to '---select---'
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

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Funding</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, funding: e.target.value })
                      }
                      value={leadinfo?.funding}
                      onClick={() => {
                        if (All_Funding.length === 0) {
                          getall_funding();
                        }
                      }}
                    >
                      {select_loading === "funding" ? (
                        <option>⏳ Loading...</option>
                      ) : (
                        <>
                          <option value="">-- Select funding --</option>

                          {/* Dynamic Fetched List */}
                          {All_Funding.map((val, i) => (
                            <option key={i} value={val.lookup_value}>
                              {val.lookup_value}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>

                  <div className="col-md-4 custom-input">
                    <label className="form-label">Timeline</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, timeline: e.target.value })
                      }
                      value={leadinfo?.timeline}
                      onClick={() => {
                        if (All_Timeline.length === 0) {
                          getall_timeline();
                        }
                      }}
                    >
                      {select_loading === "timeline" ? (
                        <option>⏳ Loading...</option>
                      ) : (
                        <>
                          <option value="">-- Select timeline --</option>

                          {/* Dynamic Fetched List */}
                          {All_Timeline.map((val, i) => (
                            <option key={i} value={val.lookup_value}>
                              {val.lookup_value}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Furnishing</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, furnishing: e.target.value })
                      }
                    >
                      <option>Select</option>
                      {furnishing.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4  custom-input">
                    <label className="form-label">Property Unit Type</label>
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={propertyunitstypes}
                      onChange={handlepropertyunitstypesChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {/* <MenuItem disabled value="---select---">
                    {leadinfo?.road || '---select---'}
                </MenuItem> */}
                      <MenuItem value="select-all">
                        <Checkbox
                          checked={
                            propertyunitstypes.length ===
                            propertyunittype.length
                          }
                        />
                        <ListItemText
                          primary={leadinfo?.unit_type2 || "---select all---"} // Display leadinfo.matched_deal or fallback to '---select---'
                        />
                      </MenuItem>
                      {propertyunittype.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={propertyunitstypes.indexOf(name) > -1}
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Transaction Type</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          transaction_type: e.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      {transaction_type.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                  </div>

                  {/* Conditionally render the progress bar */}
                  {leadinfo.transaction_type === "Flexiable" && (
                    <div className="col-md-8  custom-input">
                      <label className="form-label">White Portion</label>
                      <div
                        className="progress-container"
                        style={{ height: "20px" }}
                        onMouseDown={handleMouseDown}
                      >
                        <div
                          className="progress-bar"
                          style={{
                            width: `${progress}%`,
                            height: "20px",
                            backgroundColor:
                              progress >= 75
                                ? "green"
                                : progress >= 50
                                ? "yellow"
                                : "red",
                          }}
                        />
                        <div className="progress-percentage">
                          {Math.round(progress)}%
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Send Matched Deal</label>
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
                      multiple
                      value={matchdeals}
                      onChange={handlematcheddealChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      <MenuItem value="select-all">
                        <Checkbox
                          checked={matchdeals.length === matchdeal.length}
                        />
                        <ListItemText
                          primary={leadinfo?.matched_deal || "---select all---"} // Display leadinfo.matched_deal or fallback to '---select---'
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

                <div
                  className="row mt-2"
                  id="leadinfoprofessional"
                  style={{ display: "none" }}
                >
                  <div className="col-md-5  custom-input">
                    <label className="form-label">Profession Category</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={handleProfessionCategoryChange}
                      onClick={getall_profession_category}
                      value={leadinfo.profession_category}
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
                  <div className="col-md-7  custom-input">
                    <label className="form-label">
                      Profession Sub-Category
                    </label>
                    <select
                      className="form-control form-control-sm"
                      onChange={handleProfessionSubcategoryChange}
                      onClick={getall_profession_sub_category}
                      value={leadinfo.profession_subcategory}
                    >
                      {select_loading === "profession_sub_category" ? (
                        <option>⏳ Loading...</option>
                      ) : (
                        <>
                          <option>---Select profession sub category---</option>

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
                  <div className="col-md-5  custom-input">
                    <label className="form-label">Designation</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={handleDesignationChange}
                      onClick={getall_designation}
                      value={leadinfo.designation}
                    >
                      {select_loading === "profession_sub_category" ? (
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
                  <div className="col-md-6  custom-input">
                    <label className="form-label">
                      Company/Organisation/Department Name
                    </label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          company_name: e.target.value,
                        })
                      }
                    >
                      <option>
                        {leadinfo?.company_name || "---Select---"}
                      </option>
                      <option>---Select company---</option>
                      {cdata.map((item) => (
                        <option>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-1  custom-input">
                    <label className="form-label">Add</label>
                    <button
                      className="form-control form-control-sm"
                      onClick={() => {
                        navigate("/addcompany");
                      }}
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#0056b3")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#007bff")
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-12  custom-input">
                    <hr></hr>
                  </div>
                </div>

                {/*-------------+++++++++++++++++++++++++--------------========= leadinfo professional end================---------------------===============-------- */}

                {/*=====================--------------------- leadinfo personal start-------------------------------------------============================= */}
                <div
                  className="row"
                  id="leadinfopersonal"
                  style={{ display: "none" }}
                >
                  <div className="col-md-12  custom-input">
                    <label className="form-label">Father/Husband name</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.father_husband_name || ""}
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-3  custom-input ">
                    <label className="form-label">H.No</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.h_no || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, h_no: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-9  custom-input">
                    <label className="form-label">Area(area1)</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.area1 || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, area1: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Location(location1)</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.location1 || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, location1: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-4  custom-input">
                    <label className="form-label">City(city1)</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.city1 || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, city1: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-4  custom-input">
                    <label className="form-label">Pin Code(pincode1)</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.pincode1 || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, pincode1: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6  custom-input">
                    <label className="form-label">State(state1)</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.state1 || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, state1: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Country(country1)</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.country1 || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, country1: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-12  custom-input">
                    <label
                      className="form-label"
                      style={{ fontSize: "16px", marginTop: "10px" }}
                    >
                      Other Details
                    </label>
                    <hr style={{ marginTop: "-5px" }}></hr>
                  </div>

                  <div className="col-md-5  custom-input">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, gender: e.target.value })
                      }
                    >
                      <option>{leadinfo?.gender || "---Select---"}</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div className="col-md-7  custom-input">
                    <label className="form-label">Maritial Status</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          maritial_status: e.target.value,
                        })
                      }
                    >
                      <option>
                        {leadinfo?.maritial_status || "---Select---"}
                      </option>
                      <option>Married</option>
                      <option>Unmarried</option>
                      <option>Single</option>
                    </select>
                  </div>

                  <div className="col-md-5  custom-input">
                    <label className="form-label">Birth Date</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.birth_date || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({ ...leadinfo, birth_date: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-7  custom-input">
                    <label className="form-label">Anniversary Date</label>
                    <input
                      type="text"
                      defaultValue={leadinfo?.anniversary_date || ""}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setleadinfo({
                          ...leadinfo,
                          anniversary_date: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-3  custom-input">
                    {" "}
                    <label className="form-label">Education</label>
                    {Array.isArray(leadinfo.education)
                      ? leadinfo.education.map((name, index) => (
                          <div key={index} style={{ marginTop: "1px" }}>
                            <select
                              className="form-control form-control-sm"
                              onChange={(event) =>
                                handleeducationChange(index, event)
                              }
                            >
                              <option>
                                {leadinfo?.education[index] || "---select---"}
                              </option>
                              <option>Kindergaren</option>
                              <option>School</option>
                              <option>Primery Education</option>
                              <option> Secondary Education</option>
                              <option>Master</option>
                              <option>Commerce</option>
                              <option>Vocational Education</option>
                            </select>
                          </div>
                        ))
                      : []}
                  </div>
                  <div className="col-md-3  custom-input">
                    <label className="form-label">Degree</label>
                    {Array.isArray(leadinfo.degree)
                      ? leadinfo.degree.map((name, index) => (
                          <div key={index} style={{ marginTop: "1px" }}>
                            <select
                              className="form-control form-control-sm"
                              onChange={(event) =>
                                handledegreeChange(index, event)
                              }
                            >
                              <option>
                                {leadinfo?.degree[index] || "---Select---"}
                              </option>
                              <optgroup label="Bachelor’s ">
                                <option>Bachelor of Arts (BA) </option>
                                <option>
                                  Bachelor of Science (BS or BSc){" "}
                                </option>
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
                                <option>
                                  Master of Education (MEd or EdM)
                                </option>
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
                                <option>
                                  Master of Arts in Teaching (MAT)
                                </option>
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
                                <option>
                                  Doctor of Nursing Practice (DNP){" "}
                                </option>
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
                        ))
                      : []}
                  </div>
                  <div className="col-md-4  custom-input">
                    <label className="form-label">
                      School/College/University
                    </label>
                    {Array.isArray(leadinfo.school_college)
                      ? leadinfo.school_college.map((name, index) => (
                          <div key={index} style={{ marginTop: "1px" }}>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              defaultValue={
                                leadinfo?.school_college[index] || ""
                              }
                              onChange={(event) =>
                                handleschool_collegeChange(index, event)
                              }
                            />
                          </div>
                        ))
                      : []}
                  </div>
                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "70px" }}
                  >
                    {Array.isArray(leadinfo.action4)
                      ? leadinfo.action4.map((item, index) => (
                          <div style={{ marginTop: "10px" }}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                            <span
                              class="material-icons"
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
                        ))
                      : []}
                  </div>
                  <div className="col-md-1  custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm btn-add"
                      onClick={addFn4}
                      
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Loan</label>
                    {Array.isArray(leadinfo.loan)
                      ? leadinfo.loan.map((item, index) => (
                          <select
                            type="text"
                            style={{ marginTop: "1px" }}
                            className="form-control form-control-sm"
                            onChange={(event) => handleloanchange(index, event)}
                          >
                            <option>
                              {leadinfo?.loan[index] || "---Select---"}
                            </option>
                            <option>Home Loan </option>
                            <option>Auto Loan</option>
                            <option>Personal Loan </option>
                            <option>Education Loan</option>{" "}
                            <option>Agriculture Loan </option>{" "}
                            <option>Credit Card Loan</option>
                          </select>
                        ))
                      : []}
                  </div>
                  <div className="col-md-3  custom-input">
                    <label className="form-label">Bank</label>
                    {Array.isArray(leadinfo.bank)
                      ? leadinfo.bank.map((item, index) => (
                          <select
                            type="text"
                            style={{ marginTop: "1px" }}
                            className="form-control form-control-sm"
                            onChange={(event) => handlebankchange(index, event)}
                          >
                            <option>
                              {leadinfo?.bank[index] || "---Select---"}
                            </option>
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
                              National Bank for Agriculture and Rural
                              Development (NABARD){" "}
                            </option>
                            <option></option>
                          </select>
                        ))
                      : []}
                  </div>
                  <div className="col-md-3 custom-input">
                    <label className="form-label">Amount</label>
                    {Array.isArray(leadinfo.amount)
                      ? leadinfo.amount.map((item, index) => (
                          <input
                            type="text"
                            defaultValue={leadinfo?.amount[index] || ""}
                            style={{ marginTop: "1px" }}
                            className="form-control form-control-sm"
                            onCanPlay={(event) =>
                              handleamountchange(index, event)
                            }
                          />
                        ))
                      : []}
                  </div>
                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "70px" }}
                  >
                    {Array.isArray(leadinfo.action5)
                      ? leadinfo.action5.map((item, index) => (
                          <div style={{ marginTop: "10px" }}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                            <span
                              class="material-icons"
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
                        ))
                      : []}
                  </div>
                  <div className="col-md-1  custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm btn-add"
                      onClick={addFn5}
                      
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Social Media</label>
                    {Array.isArray(leadinfo.social_media)
                      ? leadinfo.social_media.map((item, index) => (
                          <select
                            className="form-control form-control-sm"
                            style={{ marginTop: "1px" }}
                            onChange={(event) =>
                              handlesocial_mediachange(index, event)
                            }
                          >
                            <option>
                              {leadinfo?.social_media[index] || "---Select---"}
                            </option>
                            <option>Facebook</option>
                            <option>Twitter</option>
                            <option>Instagram</option>
                            <option>Linkdin</option>
                            <option>Google</option>
                          </select>
                        ))
                      : []}
                  </div>
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Url</label>
                    {Array.isArray(leadinfo.url)
                      ? leadinfo.url.map((item, index) => (
                          <input
                            type="text"
                            defaultValue={leadinfo?.url[index] || ""}
                            className="form-control form-control-sm"
                            style={{ marginTop: "1px" }}
                            onChange={(event) => handleurlChange(index, event)}
                          />
                        ))
                      : []}
                  </div>
                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "70px" }}
                  >
                    {Array.isArray(leadinfo.action6)
                      ? leadinfo.action6.map((item, index) => (
                          <div style={{ marginTop: "10px" }}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                            <span
                              class="material-icons"
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
                        ))
                      : []}
                  </div>
                  <div className="col-md-1  custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm btn-add"
                      onClick={addFn6}
                      
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-4  custom-input">
                    <label className="form-label">Income</label>
                    {Array.isArray(leadinfo.income)
                      ? leadinfo.income.map((item, index) => (
                          <select
                            className="form-control form-control-sm"
                            style={{ marginTop: "1px" }}
                            onChange={(event) =>
                              handleincomechange(index, event)
                            }
                          >
                            <option>
                              {leadinfo?.income[index] || "---Select---"}
                            </option>
                            <option>Personal Income</option>
                            <option>Business Income</option>
                          </select>
                        ))
                      : []}
                  </div>
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Amount</label>
                    {Array.isArray(leadinfo.amount1)
                      ? leadinfo.amount1.map((item, index) => (
                          <input
                            type="text"
                            defaultValue={leadinfo?.amount1[index] || ""}
                            style={{ marginTop: "1px" }}
                            className="form-control form-control-sm"
                            onChange={(event) =>
                              handleamount1change(index, event)
                            }
                          />
                        ))
                      : []}
                  </div>
                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "70px" }}
                  >
                    {Array.isArray(leadinfo.action7)
                      ? leadinfo.action7.map((item, index) => (
                          <div style={{ marginTop: "10px" }}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                            <span
                              class="material-icons"
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
                        ))
                      : []}
                  </div>
                  <div className="col-md-1  custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm btn-add"
                      onClick={addFn7}
                      
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-3  custom-input">
                    <label className="form-label">Document No.</label>
                    {Array.isArray(leadinfo.document_no)
                      ? leadinfo.document_no.map((item, index) => (
                          <input
                            type="text"
                            defaultValue={leadinfo?.document_no[index] || ""}
                            style={{ marginTop: "1px" }}
                            className="form-control form-control-sm"
                            onChange={(event) =>
                              handledocumentnochange(index, event)
                            }
                          />
                        ))
                      : []}
                  </div>
                  <div className="col-md-3  custom-input">
                    <label className="form-label">Document Name</label>
                    {Array.isArray(leadinfo.document_name)
                      ? leadinfo.document_name.map((item, index) => (
                          <select
                            className="form-control form-control-sm"
                            style={{ marginTop: "1px" }}
                            onChange={(event) =>
                              handledocumentnamechange(index, event)
                            }
                          >
                            <option>
                              {leadinfo?.document_name[index] || "---Select---"}
                            </option>
                            <option>Adhar Card </option>
                            <option>Pan Card </option>
                            <option>Driviing Licence</option>
                            <option>Voter Card</option>
                            <option>Ration Card</option>
                            <option>Family Id </option>
                            <option>Passoport</option>
                            <option>Employee Id Card</option>
                          </select>
                        ))
                      : []}
                  </div>
                  {/* <div className="col-md-4 custom-input"><label className="form-label">Document Picture</label>
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
                  <div className="col-md-4  custom-input">
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
                    {Array.isArray(leadinfo.document_pic)
                      ? leadinfo.document_pic.map((item, index) => (
                          <div key={index} className="custom-file-wrapper mt-2">
                            <input
                              type="file"
                              id={`doc-upload-${index}`}
                              style={{ marginTop: "10px", display: "none" }}
                              className="form-control form-control-sm"
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
                              ></i>{" "}
                              Upload Image
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
                        ))
                      : []}
                  </div>

                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "120px" }}
                  >
                    {Array.isArray(leadinfo.action8)
                      ? leadinfo.action8.map((item, index) => (
                          <div style={{ marginTop: "10px" }}>
                            {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/> */}
                            <span
                              class="material-icons"
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
                        ))
                      : []}
                  </div>
                  <div className="col-md-1  custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm btn-add"
                      onClick={addFn8}
                      
                    >
                      +
                    </button>
                  </div>
                </div>
                {/*==================================================== leadinfo personal end======================================================= */}
                <div className="row mt-4">
                  <div className="col-md-8  custom-input"></div>
                  {/* <div className="col-md-4  custom-input"><button className="form-control" >Shedule Follow-up</button></div> */}
                  <div className="col-md-2  custom-input">
                    <button
                      className="btn-global-primary form-control"
                      onClick={leadinfodetails}
                      
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-md-2  custom-input">
                    <button
                      className="btn-global-danger form-control"
                      onClick={() => navigate(-1)}
                      
                    >
                      Cancel
                    </button>
                  </div>

                  {/* <div className="col-md-4  custom-input"><button className="form-control">Save & View Lead</button></div> */}
                </div>
              </div>
            </div>
            <Modal
              show={show1}
              onHide={handleClose1}
              size="lg"
              style={{ transition: "0.5s ease-in" }}
            >
              <Modal.Header>
                <Modal.Title>Quick Add Contact</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{ width: "100%" }}>
                  <div className="row" id="basicdetails1">
                    <div className="col-md-2  custom-input">
                      <label className="form-label">Title</label>
                      <select
                        className="form-control form-control-sm"
                        required="true"
                        onChange={(e) =>
                          setcontact({ ...contact, title: e.target.value })
                        }
                      >
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
                    <div className="col-md-5  custom-input">
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
                    <div className="col-md-5  custom-input">
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
                </div>
                <div className="row mt-3" id="basicdetails2">
                  <div className="col-md-4  custom-input">
                    {" "}
                    <label className="form-label">Country</label>
                    {contact.country_code.map((item, index) => (
                      <select
                        style={{ marginTop: "10px" }}
                        required="true"
                        className="form-control form-control-sm"
                        onChange={(event) =>
                          handlecountry_codechange(index, event)
                        }
                        value={contact?.country_code[index]}
                        onClick={() => {
                          if (All_Country_Code.length === 0) {
                            getall_country_code();
                          }
                        }}
                      >
                        {select_loading === "country_code" ? (
                          <option>⏳ Loading...</option>
                        ) : (
                          <>
                            <option value="">-- Select Country Code --</option>

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
                  <div className="col-md-4  custom-input">
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
                  <div className="col-md-2  custom-input">
                    <label className="form-label">Type</label>
                    {contact.mobile_type.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        onChange={(event) =>
                          handlemobile_typechange(index, event)
                        }
                      >
                        <option>---Select---</option>
                        <option>Personal</option>
                        <option>Official</option>
                        <option>Home</option>
                        <option>Phone</option>
                      </select>
                    ))}
                  </div>
                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "90px" }}
                  >
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
                  <div className="col-md-1  custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm"
                      onClick={addFn1}
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-8  custom-input">
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

                  <div className="col-md-2">
                    <label className="form-label">Type</label>
                    {contact.email_type.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        onChange={(event) =>
                          handleemail_typechange(index, event)
                        }
                      >
                        <option>---Select---</option>
                        <option>Personal</option>
                        <option>Official</option>
                        <option>Business</option>
                      </select>
                    ))}
                  </div>

                  <div
                    className="col-md-1  custom-input"
                    style={{ marginTop: "90px" }}
                  >
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
                  <div className="col-md-1  custom-input">
                    <label className="form-label">add</label>
                    <button
                      className="form-control form-control-sm"
                      onClick={addFn2}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-md-12  custom-input">
                    <label
                      className="form-label"
                      style={{ fontSize: "16px", marginTop: "10px" }}
                    >
                      System Details
                    </label>
                    <hr style={{ marginTop: "-5px" }}></hr>
                  </div>

                  <div className="col-md-6  custom-input">
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
                  <div className="col-md-6  custom-input">
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
                  <div className="col-md-6  custom-input">
                    <label className="form-label">Owner</label>
                    {/* <select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,owner:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select> */}
                    <Select
                      className="form-control form-control-sm"
                      style={{ border: "none" }}
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
                  <div className="col-md-6  custom-input">
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
      <ToastContainer />

      <>
        {isLoading && (
          <div
            style={{
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
            }}
          >
            <div
              style={{
                // backgroundColor: "rgba(0,0,0,0.75)",
                padding: "40px 60px",
                borderRadius: "20px",
                // boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "black",
                textAlign: "center",
              }}
            >
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{
                  height: "120px",
                  width: "120px",
                  marginBottom: "20px",
                }}
              />
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 1000,
                  marginTop: "-40px",
                }}
              >
                Creating Lead...
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Editlead;
