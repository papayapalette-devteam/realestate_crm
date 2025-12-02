import React, { useEffect, useState } from "react";
import Header1 from "../header1";
import Sidebar1 from "../sidebar1";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ToastContainer, toast } from "react-toastify";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { SvgIcon } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import api from "../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";
import { Select, MenuItem, Checkbox, ListItemText  } from '@mui/material';

function EditUnit() {

    const navigate=useNavigate()

    const location = useLocation()
    const item=location.state
 
    

     const [project, setproject] = useState({
        name: "",
        developer_name: "",
        joint_venture: "",
        secondary_developer: "",
        rera_number: "",
        descriptions: "",
        category: [],
        sub_category: [],
        land_area: "",
        measurment1: "",
        total_block: "",
        total_floor: "",
        total_units: "",
        zone: [],
        status: "",
        launched_on: "",
        expected_competion: "",
        possession: "",
        parking_type: [],
        approved_bank: "",
        approvals: [""],
        registration_no: [""],
        date: [""],
        pic: [""],
        action1: [],
        owner: [],
        team: [],
        visible_to: "",
    
        location: "",
        lattitude: "",
        langitude: "",
        address: "",
        street: "",
        locality: "",
        city: "",
        zip: "",
        state: "",
        country: "",
    
        add_block: [],
        add_size: [],
        add_unit: [],
        basic_aminities: [],
        features_aminities: [],
        nearby_aminities: [],
        price_list: [],
        Payment_plan: [],
      });
    
      const [unit, setunit] = useState([]);
      const [units, setunits] = useState({
        unit_no: "",
        unit_type: "",
        category: [],
        sub_category:[],
        block: "",
        size: "",
        land_type: "",
        khewat_no: [""],
        killa_no: [""],
        share: [""],
        action5: [],
        total_land_area: "",
        water_source: [""],
        water_level: [""],
        water_pump_type: [""],
        action6: [],
        direction: "",
        side_open: "",
        fornt_on_road: "",
        total_owner: "",
        facing: "",
        road: "",
        ownership: "",
        stage: "",
        builtup_type: "",
        floor: [""],
        cluter_details: [""],
        length: [""],
        bredth: [""],
        total_area: [""],
        measurment2: ["sqfeet"],
        action3: [],
        ocupation_date: "",
        age_of_construction: "",
        furnishing_details: "",
        enter_furnishing_details: "",
        furnished_item: "",
        remarks: "",
        location: "",
        lattitude: "",
        langitude: "",
        uaddress: "",
        ustreet: "",
        ulocality: "",
        ucity: "",
        uzip: "",
        ustate: "",
        ucountry: "",
        owner_details: [],
        associated_contact: [],
        relation: "",
        s_no: [],
        preview: [],
        descriptions: [],
        category: [],
        action10: [],
        s_no1: [],
        url: [],
        action11: [],
        document_name: [""],
        document_no: [""],
        document_Date: [""],
        linkded_contact: [""],
        image: [""],
        action12: [],
      });

      const [loadingCategory, setLoadingCategory] = useState(true);
       const fetchdatabyprojectname = async (projectNames) => {
          try {
            setLoadingCategory(true)
            const resp = await api.get(`viewprojectbyname/${projectNames}`);
            setproject(resp.data.project[0]);
          } catch (error) {
            console.log(error);
          }
          finally
          {
            setLoadingCategory(false)
          }
        };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const project = item.project_name;
      const block = item.block;
      const unit = item.unit_no;

      const resp = await api.get(
        `viewprojectforinventories/${project}/${unit}/${block}`
      );

      // Fix: Set the correct unit object
      setunits(resp.data.project.add_unit[0]);
      fetchdatabyprojectname(project)

    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  if (item) {
    fetchData();
  }
}, [item]);

    console.log(units);
    
    
     const [deal, setdeal] = useState({
        project_category: [],
        project_subcategory: "",
        location: "",
        ulocality: "",
        ucity: "",
        utype: "",
        ucategory: [],
        usize: "",
        available_for: "",
        stage: "",
        project: "",
        block: "",
        unit_number: "",
        floors: "",
        expected_price: "",
        quote_price: "",
        security_deposite: "",
        owner_details: [],
        associated_contact: [],
        relation: "",
        maintainence_charge: "",
        rent_escltion: "",
        rent_period: "",
        fitout_perioud: "",
        deal_type: "",
        deal_case: "",
        transaction_type: "",
        source: "",
        white_portion: "",
        team: "",
        user: "",
        visible_to: "",
        website: "",
        social_media: "",
        send_matchedlead: "",
        matchedleads: [],
        matchinglead: "",
        remarks: "",
      });
      
    
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type here
        },
      };
    
    
    
       const updateinventories = async () => {
        const project = item.project_name;
        const block = item.block;
        const unit = item.unit_no;
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
    
          // ✅ Run both updates in parallel
          const [resp, resp1] = await Promise.all([
            api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              units,
              config
            ),
          ]);
    
          toast.success(`units updated successfully`, { autoClose: "2000" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          Swal.fire({
            title: "not found?",
            text: "The project is not found plz check !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ok",
          });
          console.log(error);
        }
      };
    
      function addFnunit1() {
        setunits({
          ...units,
          s_no1: [...(units.s_no1 || []), ""], // Ensure s_no1 is an array
          url: [...(units.url || []), ""], // Ensure url is an array
          action11: [...(units.action11 || []), ""], // Ensure action1 is an array
        });
      }
    
      const deleteallunit1 = (index) => {
        // handleDeletesno(index)
        // handleDeletepreview(index)
        const newsno1 = units.s_no1.filter((_, i) => i !== index);
        const newurl = units.url.filter((_, i) => i !== index);
        const newaction1 = units.action11.filter((_, i) => i !== index);
        setunits({
          ...units,
          s_no1: newsno1,
          url: newurl,
          action11: newaction1,
        });
      };
    
      const handlesno1change = (index, event) => {
        const newsno1 = [...units.s_no1];
        newsno1[index] = event.target.value;
        setunits({
          ...units,
          s_no1: newsno1,
        });
      };
      const handleurlChange = (index, event) => {
        const newurl = [...units.url];
        newurl[index] = event.target.value;
        setunits({
          ...units,
          url: newurl,
        });
      };
    
      function addFnunit() {
        setunits({
          ...units,
          s_no: [...(units.s_no || []), ""], // Ensure s_no is an array
          preview: [...(units.preview || []), ""], // Ensure preview is an array
          descriptions: [...(units.descriptions || []), ""], // Ensure descriptions is an array
          category: [...(units.category || []), ""], // Ensure category is an array
          action10: [...(units.action10 || []), ""], // Ensure action is an array
        });
      }
    
      const deleteallunit = (index) => {
        // handleDeletesno(index)
        // handleDeletepreview(index)
        const newsno = units.s_no.filter((_, i) => i !== index);
        const newpreview = units.preview.filter((_, i) => i !== index);
        const newdescription = units.descriptions.filter((_, i) => i !== index);
        const newcategory = units.category.filter((_, i) => i !== index);
        const newaction = units.action10.filter((_, i) => i !== index);
        setunits({
          ...units,
          s_no: newsno,
          preview: newpreview,
          descriptions: newdescription,
          category: newcategory,
          action10: newaction,
        });
      };
    
      const handlesnochange = (index, event) => {
        const newsno = [...units.s_no];
        newsno[index] = event.target.value;
        setunits({
          ...units,
          s_no: newsno,
        });
      };
      const handlepreviewchange = (index, event) => {
        const newpreview = [...units.preview];
        const files = Array.from(event.target.files);
    
        newpreview[index] = { files: files };
        setunits({
          ...units,
          preview: newpreview,
        });
      };
    
      const handledescriptionchange = (index, event) => {
        const newdescription = [...units.descriptions];
        newdescription[index] = event.target.value;
        setunits({
          ...units,
          descriptions: newdescription,
        });
      };
      const handlecategorychange = (index, event) => {
        const newcategory = [...units.category];
        newcategory[index] = event.target.value;
        setunits({
          ...units,
          category: newcategory,
        });
      };
    
      // const addunit = () => {
      //   if (units.unit_no) {
      //     const updateunit = [...unit, ...project.add_unit, units];
      //     setunit(updateunit);
      //     setproject((prevState) => ({
      //       ...prevState,
      //       add_unit: updateunit,
      //     }));
    
    
      //     document.getElementById("choosedestination").value = "Select";
      //   } else {
      //     toast.error("Please fill out all fields.");
      //   }
      // };
      // const deleteunit = (index) => {
      //   // Filter out the destination at the given index
      //   const newunit = project.add_unit.filter((_, i) => i !== index);
    
      //   // Set the updated destination details
      //   setproject((prevState) => ({
      //     ...prevState,
      //     add_unit: newunit,
      //   }));
      //   setunit(newunit);
      // };
    
      const [activeUnit, setActiveUnit] = useState(1); // Track active unit tab
      const [modalSize, setModalSize] = useState("lg");
    
      const unitdetail1 = () => {
        setModalSize("lg");
        setActiveUnit(1);
        document.getElementById("unitdetails1").style.display = "flex";
        document.getElementById("unitlocation").style.display = "none";
        document.getElementById("ownerdetails").style.display = "none";
        document.getElementById("uploadmedia").style.display = "none";
        document.getElementById("documentform").style.display = "none";
    
        // document.getElementById("unitdetail").style.color="green"
        // document.getElementById("unitlocationdetails").style.color="black"
        // document.getElementById("ownerdetails").style.color="black"
      };
      const unitdetail2 = () => {
        setModalSize("lg");
        setActiveUnit(2);
        document.getElementById("unitdetails1").style.display = "none";
        document.getElementById("unitlocation").style.display = "flex";
        document.getElementById("ownerdetails").style.display = "none";
        document.getElementById("uploadmedia").style.display = "none";
        document.getElementById("documentform").style.display = "none";
    
        // document.getElementById("unitdetail").style.color="black"
        // document.getElementById("unitlocationdetails").style.color="green"
        // document.getElementById("ownerdetails").style.color="black"
      };
      const unitdetail3 = () => {
        setModalSize("lg");
        setActiveUnit(3);
        document.getElementById("unitdetails1").style.display = "none";
        document.getElementById("unitlocation").style.display = "none";
        document.getElementById("ownerdetails").style.display = "flex";
        document.getElementById("uploadmedia").style.display = "none";
        document.getElementById("documentform").style.display = "none";
      };
    
      const unitdetail4 = () => {
        setModalSize("xl");
        setActiveUnit(4);
        document.getElementById("unitdetails1").style.display = "none";
        document.getElementById("unitlocation").style.display = "none";
        document.getElementById("ownerdetails").style.display = "none";
        document.getElementById("documentform").style.display = "inline-block";
        document.getElementById("uploadmedia").style.display = "none";
      };
    
      const unitdetail5 = () => {
        setModalSize("lg");
        setActiveUnit(5);
        document.getElementById("unitdetails1").style.display = "none";
        document.getElementById("unitlocation").style.display = "none";
        document.getElementById("ownerdetails").style.display = "none";
        document.getElementById("documentform").style.display = "none";
        document.getElementById("uploadmedia").style.display = "inline-block";
      };
    
      const [selectedType, setSelectedType] = useState(null);
    
      const handleTypeClick1 = (type) => {
        setSelectedType(type);
        setunits((prevunits) => ({
          ...prevunits,
          category: type,
        }));
      };
    
  
    
      function addFn12() {
        setunits({
          ...units,
          document_no: [...units.document_no, ""],
          document_name: [...units.document_name, ""],
          document_Date: [...units.document_Date, ""],
          image: [...units.image, ""],
          action12: [...(units.action12 || []), ""],
        });
      }
    
      const deleteall12 = (index) => {
        const newdocument_no = (units.document_no || []).filter(
          (_, i) => i !== index
        );
        const newdocumentname = (units.document_name || []).filter(
          (_, i) => i !== index
        );
        const newdocumentdate = (units.document_Date || []).filter(
          (_, i) => i !== index
        );
        const newpic = (units.image || []).filter((_, i) => i !== index);
        const newaction12 = (units.action12 || []).filter((_, i) => i !== index);
    
        setunits({
          ...units,
          document_no: newdocument_no,
          document_name: newdocumentname,
          document_Date: newdocumentdate,
          image: newpic,
          action12: newaction12,
        });
      };
    
      const handledocumentnochange = (index, event) => {
        const newdocumentno = [...units.document_no];
        newdocumentno[index] = event.target.value;
        setunits({
          ...units,
          document_no: newdocumentno,
        });
      };
      const handledocumentnamechange = (index, event) => {
        const newdocumentname = [...units.document_name];
        newdocumentname[index] = event.target.value;
        setunits({
          ...units,
          document_name: newdocumentname,
        });
      };
      const handledocumentdatechange = (index, event) => {
        const newdocumentdate = [...units.document_Date];
        newdocumentdate[index] = event.target.value;
        setunits({
          ...units,
          document_Date: newdocumentdate,
        });
      };
    
      const handlepicchange1 = (index, event) => {
        const newpic1 = [...units.image];
        const files = Array.from(event.target.files);
        newpic1[index] = { files: files };
        setunits({
          ...units,
          image: newpic1,
        });
      };
    
      function addFn3() {
        setunits((prevunits) => ({
          ...prevunits,
          floor: [...units.floor, ""],
          cluter_details: [...units.cluter_details, ""],
          length: [...units.length, ""],
          bredth: [...units.bredth, ""],
          total_area: [...units.total_area, ""],
          measurment2: [...units.measurment2, ""],
          action3: [...(units.action3 || []), ""],
        }));
      }
      const deleteall3 = (index) => {
        const newfloor = units.floor.filter((_, i) => i !== index);
        const newcluter = units.cluter_details.filter((_, i) => i !== index);
        const newlength = units.length.filter((_, i) => i !== index);
        const newbreadth = units.bredth.filter((_, i) => i !== index);
        const newtotalarea = units.total_area.filter((_, i) => i !== index);
        const newmeasurement = units.measurment2.filter((_, i) => i !== index);
        const newaction3 = units.action3.filter((_, i) => i !== index);
    
        setunits({
          ...units,
          floor: newfloor,
          cluter_details: newcluter,
          length: newlength,
          bredth: newbreadth,
          total_area: newtotalarea,
          measurment2: newmeasurement,
          action3: newaction3,
        });
      };
      const handlefloorchange = (index, event) => {
        const newfloor = [...units.floor];
        newfloor[index] = event.target.value;
        setunits({
          ...units,
          floor: newfloor,
        });
      };
      const handlecluterdetails = (index, event) => {
        const newcluterdetails = [...units.cluter_details];
        newcluterdetails[index] = event.target.value;
        setunits({
          ...units,
          cluter_details: newcluterdetails,
        });
      };
      const handlelengthchange = (index, event) => {
        const newLength = [...units.length];
        newLength[index] = event.target.value;
    
        const newTotalArea = [...units.total_area];
        newTotalArea[index] =
          newLength[index] && units.bredth[index]
            ? newLength[index] * units.bredth[index]
            : "";
    
        setunits((prev) => ({
          ...prev,
          length: newLength,
          total_area: newTotalArea,
        }));
      };
    
      const handlebredthchange = (index, event) => {
        const newBreadth = [...units.bredth];
        newBreadth[index] = event.target.value;
    
        const newTotalArea = [...units.total_area];
        newTotalArea[index] =
          units.length[index] && newBreadth[index]
            ? units.length[index] * newBreadth[index]
            : "";
    
        setunits((prev) => ({
          ...prev,
          bredth: newBreadth,
          total_area: newTotalArea,
        }));
      };
    
      function addFn6() {
        setunits({
          ...units,
          water_source: [...units.water_source, ""],
          water_level: [...units.water_level, ""],
          water_pump_type: [...units.water_pump_type, ""],
          action6: [...units.action6, ""],
        });
      }
      const deleteall6 = (index) => {
        const newwatersource = units.water_source.filter((_, i) => i !== index);
        const newwaterlevel = units.water_level.filter((_, i) => i !== index);
        const newpumptype = units.water_pump_type.filter((_, i) => i !== index);
        const newaction6 = units.action6.filter((_, i) => i !== index);
    
        setunits({
          ...units,
          water_source: newwatersource,
          water_level: newwaterlevel,
          water_pump_type: newpumptype,
          action6: newaction6,
        });
      };
      const handlewatersourcechange = (index, event) => {
        const newwatersource = [...units.water_source];
        newwatersource[index] = event.target.value;
        setunits({
          ...units,
          water_source: newwatersource,
        });
      };
      const handlewaterlevelchange = (index, event) => {
        const newwaterlevel = [...units.water_level];
        newwaterlevel[index] = event.target.value;
        setunits({
          ...units,
          water_level: newwaterlevel,
        });
      };
      const handlewaterpumpchange = (index, event) => {
        const newwaterpump = [...units.water_pump_type];
        newwaterpump[index] = event.target.value;
        setunits({
          ...units,
          water_pump_type: newwaterpump,
        });
      };
    
      function addFn5() {
        setunits({
          ...units,
          khewat_no: [...units.khewat_no, ""],
          killa_no: [...units.killa_no, ""],
          share: [...units.share, ""],
          action5: [...units.action5, ""],
        });
      }
      const deleteall5 = (index) => {
        const newkhewatno = units.khewat_no.filter((_, i) => i !== index);
        const newkillano = units.killa_no.filter((_, i) => i !== index);
        const newshare = units.share.filter((_, i) => i !== index);
        const newaction5 = units.action5.filter((_, i) => i !== index);
    
        setunits({
          ...units,
          khewat_no: newkhewatno,
          killa_no: newkillano,
          share: newshare,
          action5: newaction5,
        });
      };
      const handlekhewatnochange = (index, event) => {
        const newkhewatno = [...units.khewat_no];
        newkhewatno[index] = event.target.value;
        setunits({
          ...units,
          khewat_no: newkhewatno,
        });
      };
      const handlekillanochange = (index, event) => {
        const newkillano = [...units.killa_no];
        newkillano[index] = event.target.value;
        setunits({
          ...units,
          killa_no: newkillano,
        });
      };
      const handlesharenochange = (index, event) => {
        const newshare = [...units.share];
        newshare[index] = event.target.value;
        setunits({
          ...units,
          share: newshare,
        });
      };
    
       const [select_loading, setselect_loading] = useState("");

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
            params.append("parent_lookup_value", units.ucountry);
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
            params.append("parent_lookup_value", units.ustate);
            const resp = await api.get(`api/LookupList?${params.toString()}`);
            setAll_City(resp.data.data);
          } catch (error) {
            console.log(error);
          } finally {
            setselect_loading("");
          }
        };



    
    
      const [coordinates1, setCoordinates1] = useState("");
      const [mapLoaded1, setMapLoaded1] = useState(false);
    
      const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
              params: {
                address: units.location,
                key: "AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc",
              },
            }
          );
    
          if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            setCoordinates1({ lat, lng });
            setunits((prevUnits) => ({
              ...prevUnits,
              lattitude: lat,
              langitude: lng,
            }));
            const addressComponents = response.data.results[0].address_components;
            let uaddress = "";
            let ustreet = "";
            let ulocality = "";
            let ucity = "";
            let uzip = "";
            let ustate = "";
            let ucountry = "";
    
            // Extract address components
            addressComponents.forEach((component) => {
              const types = component.types;
              if (types.includes("administrative_area_level_3"))
                uaddress += component.long_name + " ";
              if (types.includes("sublocality_level_1"))
                ustreet += component.long_name + " ";
              if (types.includes("administrative_area_level_2"))
                ulocality = component.long_name;
              if (types.includes("administrative_area_level_1"))
                ustate = component.long_name;
              if (types.includes("locality")) ucity = component.long_name;
              if (types.includes("postal_code")) uzip = component.long_name;
              if (types.includes("country")) ucountry = component.long_name;
            });
    
            // Update units state with the extracted information
            setunits((prevUnits) => ({
              ...prevUnits,
              uaddress,
              ustreet: ustreet.trim(),
              ulocality,
              ucity,
              uzip,
              ustate,
              ucountry,
              location: response.data.results[0].formatted_address,
            }));
            setMapLoaded1(true);
          } else {
            setCoordinates1({ lat: null, lng: null });
            console.log("No results found");
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };
    
      const handleMarkerDragEnd1 = async (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setCoordinates1({ lat: newLat, lng: newLng });
    
        try {
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
              params: {
                latlng: `${newLat},${newLng}`,
                key: "AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc",
              },
            }
          );
    
          if (response.data.results.length > 0) {
            const addressComponents = response.data.results[0].address_components;
            let uaddress = "";
            let ustreet = "";
            let ulocality = "";
            let ucity = "";
            let uzip = "";
            let ustate = "";
            let ucountry = "";
    
            addressComponents.forEach((component) => {
              const types = component.types;
              if (types.includes("administrative_area_level_3"))
                uaddress += component.long_name + " ";
              if (types.includes("sublocality_level_1"))
                ustreet += component.long_name + " ";
              if (types.includes("administrative_area_level_2"))
                ulocality = component.long_name;
              if (types.includes("administrative_area_level_1"))
                ustate = component.long_name;
              if (types.includes("locality")) ucity = component.long_name;
              if (types.includes("postal_code")) uzip = component.long_name;
              if (types.includes("country")) ucountry = component.long_name;
            });
    
            setunits((prevUnits) => ({
              ...prevUnits,
              uaddress,
              ustreet: ustreet.trim(),
              ulocality,
              ucity,
              uzip,
              ustate,
              ucountry,
              location: response.data.results[0].formatted_address,
            }));
          } else {
            console.log("No location name found");
          }
        } catch (error) {
          console.error("Error fetching location name:", error);
        }
      };
    
      const mapStyles1 = {
        height: "500px",
        width: "100%",
      };
    
      const defaultCenter1 = {
        lat: coordinates1.lat || 37.7749,
        lng: coordinates1.lng || -122.4194,
      };
    
      const [showabuiltup, setSowbuiltup] = useState(false); // Track the checkbox state
    
      // Handle the checkbox change to show/hide plot size section
      const handleCheckboxChange4 = (event) => {
        setSowbuiltup(event.target.checked);
      };

        //=============================== convert date format start==============================================================================
  const excelSerialToDateString = (serial) => {
    const excelEpoch = new Date(1900, 0, 1); // Jan 1, 1900
    const jsDate = new Date(excelEpoch.getTime() + (serial - 1) * 86400000);
    return jsDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

    //============================================= add new owner start =======================================================================
  
    const [show7, setshow7] = useState(false);
    const handleClose7 = () => setshow7(false);

    const [input, setInput] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
  
    const fetchSuggestions = async (inputValue) => {
      try {
        const resp = await api.get(
          `/searchcontact?search=${encodeURIComponent(inputValue)}`
        );
  
  
        const data = resp.data.contact;
  
        // Map to combine first_name + last_name + mobile_no
        const formattedData = data.map(
          (item) =>
            `${item.first_name || ""} ${item.last_name || ""} (${
              item.mobile_no || ""
            })`
        );
  
        setFilteredSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setShowSuggestions(false);
      }
    };
  
  
  
    React.useEffect(() => {
      if (input.trim() !== "") {
        fetchSuggestions(input);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    }, [input]);
  
    const handleInputChange = (event) => {
      setInput(event.target.value);
      handleClose2();
    };
  
    const [show2, setshow2] = useState(false);
    const handleClose2 = () => setshow2(false);
    const handleShow2 = async () => {
      setshow2(true);
    };
  
    const [selectedcontact1, setselectedcontact1] = useState([]);
    const [selectedcontact2, setselectedcontact2] = useState([]);
    const [newcontact, setnewcontact] = useState([]);
  
    const [relation, setrelation] = useState("");
  
    const handlerelationchange = (e) => {
      setrelation(e.target.value);
    };
  
    const relations = [
      "Self",
      "Broker",
      "Booked",
      "Father",
      "Mother",
      "Son",
      "Daughter",
      "Brother",
      "Sister",
      "Husband",
      "Wife",
      "Grand Father",
      "Grand Mother",
      "Grand Son",
      "Uncle",
      "Aunt",
      "Mama",
      "Mami",
      "Nephew",
      "Niece",
      "Cousin",
      "Father in Law",
      "Mother in Law",
      "Son in Law",
      "Daughter in Law",
      "Brother in Law",
      "Sister in Law",
      "Friend",
      "Neighbor",
      "Business Partner",
      "Teacher",
      "Student",
      "Owner’ Employee",
      "Other",
    ];
  
    const otherrelatons = [
      "Broker",
      "Booked",
      "Father",
      "Mother",
      "Son",
      "Daughter",
      "Brother",
      "Sister",
      "Husband",
      "Wife",
      "Grand Father",
      "Grand Mother",
      "Grand Son",
      "Uncle",
      "Aunt",
      "Mama",
      "Mami",
      "Nephew",
      "Niece",
      "Cousin",
      "Father in Law",
      "Mother in Law",
      "Son in Law",
      "Daughter in Law",
      "Brother in Law",
      "Sister in Law",
      "Friend",
      "Neighbor",
      "Business Partner",
      "Teacher",
      "Student",
      "Owner’ Employee",
      "Other",
    ];
  
    const [relation1, setrelation1] = useState("");
    React.useEffect(() => {
      if (relation === "Self") {
        setrelation("");
        setselectedcontact1((prevContacts) => [
          ...prevContacts,
          newcontact, // Add the new contact (assumed to be an object)
        ]);
        setunits((prevDeal) => ({
          ...prevDeal,
          owner_details: [...(prevDeal.owner_details || []), newcontact._id], // Append new contact to the existing owner_details array
        }));
        // setdeal((prevDeal) => ({
        //   ...prevDeal,
        //   owner_details: [...(prevDeal.owner_details || []), newcontact._id], // Append new contact to the existing owner_details array
        // }));
      } else if (otherrelatons.includes(relation)) {
        setselectedcontact2((prevContacts) => [
          ...prevContacts,
          newcontact, // Add the new contact for other relations
        ]);
        setunits((prevDeal) => ({ ...prevDeal, relation: relation }));
        setunits((prevDeal) => ({
          ...prevDeal,
          associated_contact: [
            ...(prevDeal.associated_contact || []),
            newcontact._id,
          ], // Append new contact to the existing owner_details array
        }));
        setrelation1(relation);
        setrelation("");
      }
    }, [relation, newcontact]);
  
    const handleSuggestionClick = (contact) => {
      handleShow2();
  
      setnewcontact(contact);
      // Update the selectedContacts array
      const updatedContacts = [...selectedContacts, contact];
      setSelectedContacts(updatedContacts);
  
      setInput(""); // Clear the input after selection
      setShowSuggestions(false); // Hide suggestions after selection
      //setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));
    };
  
    const removeContact = (id) => {
      const updatedContacts = selectedContacts.filter(
        (contact) => contact._id !== id
      );
  
      const updatedContacts3 = units.owner_details.filter(
        (contact) => contact._id !== id
      );
      const updatedContacts4 = units.associated_contact.filter(
        (contact) => contact._id !== id
      );
  
      setSelectedContacts(updatedContacts);
  
      const updatedContacts1 = selectedcontact1.filter(
        (contact) => contact._id !== id
      );
      setselectedcontact1(updatedContacts1);
      setunits((prevState) => ({
        ...prevState,
        owner_details: updatedContacts3,
      }));
  
      const updatedContacts2 = selectedcontact2.filter(
        (contact) => contact._id !== id
      );
      setselectedcontact2(updatedContacts2);
      setunits((prevState) => ({
        ...prevState,
        associated_contact: updatedContacts4,
      }));
    };
  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      lineHeight: "0px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  console.log(units);
  
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
                    Update Unit
                  </h1>
                </div>
                <hr></hr>
    <div className="w-full">
  <div className="flex flex-wrap items-center gap-3 sm:gap-6 bg-white p-3 rounded-xl shadow-sm border border-gray-100">

    {/* TAB 1 */}
    <div
      onClick={unitdetail1}
      className={`cursor-pointer px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300
      ${activeUnit === 1 
        ? "bg-blue-600 text-white shadow-md scale-105" 
        : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}
    >
      Unit
    </div>

    {/* TAB 2 */}
    <div
      onClick={unitdetail2}
      className={`cursor-pointer px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300
      ${activeUnit === 2 
        ? "bg-blue-600 text-white shadow-md scale-105" 
        : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}
    >
      Location
    </div>

    {/* TAB 3 */}
    <div
      onClick={unitdetail3}
      className={`cursor-pointer px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300
      ${activeUnit === 3 
        ? "bg-blue-600 text-white shadow-md scale-105" 
        : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}
    >
      Add Owner
    </div>

    {/* TAB 4 */}
    <div
      onClick={unitdetail4}
      className={`cursor-pointer px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300
      ${activeUnit === 4 
        ? "bg-blue-600 text-white shadow-md scale-105" 
        : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}
    >
      Add Documents
    </div>

    {/* TAB 5 */}
    <div
      onClick={unitdetail5}
      className={`cursor-pointer px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300
      ${activeUnit === 5 
        ? "bg-blue-600 text-white shadow-md scale-105" 
        : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}
    >
      Upload
    </div>

  </div>
</div>


      <hr></hr>
      <div style={{ width: "100%" }}>
        <div className="row" id="unitdetails1">
          <div className="col-md-8 custom-input">
            <label className="labels">Unit Number</label>
            <input
              type="text"
              required="true"
              className="form-control form-control-sm"
              value={units.unit_no}
              placeholder="unit number"
              onChange={(e) => setunits({ ...units, unit_no: e.target.value })}
            />
          </div>
          <div className="col-md-4 custom-input">
            <label className="labels">Unit Type</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) =>
                setunits({ ...units, unit_type: e.target.value })
              }
            >
              <option>{units.unit_type}</option>
              <option>---Select---</option>
              <option>Corner</option>
              <option> Two Side Open</option>
              <option>Three Side Open</option>
              <option>Ordinary </option>
            </select>
          </div>
          <div className="col-md-12 custom-input" style={{ display: "flex" }}>
            <label className="labels">Category</label>
          </div>
     <div className="col-md-12 custom-input flex">
  <div className="col-md-12 flex flex-wrap">

    {/* 🔵 Show Tailwind Skeletons When Loading */}
    {loadingCategory ? (
      <>
        {[1, 2, 3, 4].map((i) => (
          <div className="col-md-3 p-1" key={i}>
            <div className="h-9 w-full rounded-md bg-gray-300 animate-pulse"></div>
          </div>
        ))}
      </>
    ) : (
      /* 🟢 Show category buttons after load */
      project?.category?.map((type) => {
        const isActive =
          selectedType === type ||
          (Array.isArray(units.category) && units.category.includes(type));

        return (
          <div className="col-md-3 p-1" key={type}>
            <button
              className={`form-control form-control-sm w-full py-2 rounded-md 
                ${isActive ? "bg-green-600 text-white" : "bg-white text-black border"} 
                transition-all duration-200 shadow-sm hover:shadow-md`}
              onClick={() => handleTypeClick1(type)}
            >
              {type}
            </button>
          </div>
        );
      })
    )}
  </div>
</div>


  <div className="col-md-6 custom-input">
  <label className="labels block mb-1 font-medium text-gray-700">
    Sub Category
  </label>

  {loadingCategory ? (
    // Skeleton loader
    <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
  ) : (
    <select
      id="subcategory"
      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      value={units.sub_category || ""}
      onChange={(e) =>
        setunits({ ...units, sub_category: e.target.value })
      }
    >
      <option value="">Select</option>
      {project?.sub_category?.map((subCategory) => (
        <option key={subCategory} value={subCategory}>
          {subCategory}
        </option>
      ))}
    </select>
  )}
</div>



          <div className="col-md-6 custom-input">
            <label className="labels">Block</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) => setunits({ ...units, block: e.target.value })}
            >
              <option>{units.block}</option>
              <option>---choose---</option>
              {project?.add_block?.map((item) => (
                <option>{item.block_name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 custom-input">
            <label className="labels">Size</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) => setunits({ ...units, size: e.target.value })}
            >
              <option>{units.size}</option>
              <option>---choose---</option>
              {project?.add_size?.map((item) => (
                <option>{item.size_name}</option>
              ))}
            </select>
          </div>

          {units?.category?.includes("Agricultural") && (
            <>
              <div className="col-md-6 custom-input">
                <label className="labels">Land Type</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, land_type: e.target.value })
                  }
                >
                  <option>{units.land_type}</option>
                  <option>---Select---</option>
                  <option>Crop Land</option>
                  <option>Wood Land</option>
                  <option>Pasture</option>
                </select>
              </div>
              <div className="col-md-6 custom-input"></div>
              <div
                className="col-md-12 custom-input"
                style={{
                  color: "green",
                  fontWeight: "bolder",
                  marginTop: "10px",
                }}
              >
                Land Details<hr></hr>
              </div>

              <div className="col-md-3 custom-input">
                <label className="labels">Khewat No</label>
                {Array.isArray(units.khewat_no)
                  ? units.khewat_no.map((item, index) => (
                      <input
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        value={units.khewat_no}
                        onChange={(event) => handlekhewatnochange(index, event)}
                      />
                    ))
                  : []}
              </div>

              <div className="col-md-3 custom-input">
                <label className="labels">Killa No</label>
                {Array.isArray(units.killa_no)
                  ? units.killa_no.map((item, index) => (
                      <input
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        value={units.killa_no}
                        onChange={(event) => handlekillanochange(index, event)}
                      />
                    ))
                  : []}
              </div>

              <div className="col-md-3 custom-input">
                <label className="labels">Share</label>
                {Array.isArray(units.share)
                  ? units.share.map((item, index) => (
                      <input
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        value={units.share}
                        onChange={(event) => handlesharenochange(index, event)}
                      />
                    ))
                  : []}
              </div>

              <div className="col-md-1 custom-input" style={{ marginTop: "90px" }}>
                {Array.isArray(units.action5)
                  ? units.action5.map((item, index) => (
                      <div style={{ marginTop: "10px" }}>
                        <img
                          src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                          alt="delete button"
                          onClick={() => deleteall5(index)}
                          style={{ height: "40px", cursor: "pointer" }}
                        />
                      </div>
                    ))
                  : []}
              </div>

              <div className="col-md-1 custom-input">
                <label className="labels">add</label>
                <button
                  className="form-control form-control-sm"
                  onClick={addFn5}
                >
                  +
                </button>
              </div>
              <div className="col-md-12 custom-input">
                Total Land Area:-{units.total_land_area}
              </div>
              <div
                className="col-md-12 custom-input"
                style={{
                  color: "green",
                  fontWeight: "bolder",
                  marginTop: "10px",
                }}
              >
                Water Details<hr></hr>
              </div>

              <div className="col-md-3 custom-input">
                <label className="labels">Water Source</label>
                {Array.isArray(units.water_source)
                  ? units.water_source.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        onChange={(event) =>
                          handlewatersourcechange(index, event)
                        }
                      >
                        <option>{units.water_source}</option>
                        <option>---select---</option>
                        <option>Ground Water</option>
                        <option>Canal Water</option>
                        <option>Pond Water</option>
                        <option>Rain Water</option>
                      </select>
                    ))
                  : []}
              </div>
              <div className="col-md-3 custom-input">
                <label className="labels">Water Level</label>
                {Array.isArray(units.water_level)
                  ? units.water_level.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        onChange={(event) =>
                          handlewaterlevelchange(index, event)
                        }
                      >
                        <option>{units.water_level}</option>
                        <option>---select---</option>
                        <option>100ft.</option>
                        <option>200Ft.</option>
                      </select>
                    ))
                  : []}
              </div>

              <div className="col-md-3 custom-input">
                <label className="labels">Water Pump Type</label>
                {Array.isArray(units.water_pump_type)
                  ? units.water_pump_type.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        style={{ marginTop: "10px" }}
                        onChange={(event) =>
                          handlewaterpumpchange(index, event)
                        }
                      >
                        <option>{units.water_pump_type}</option>{" "}
                        <option>---select---</option>
                        <option>Submersible Motor(15 HP)</option>
                        <option>Sumersible Motor(20 HP)</option>
                        <option>Monoblock Motor(10HP)</option>
                        <option>Diesel Engine Pump</option>
                      </select>
                    ))
                  : []}
              </div>
              <div className="col-md-1 custom-input" style={{ marginTop: "90px" }}>
                {Array.isArray(units.action6)
                  ? units.action6.map((item, index) => (
                      <div style={{ marginTop: "10px" }}>
                        <img
                          src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                          alt="delete button"
                          onClick={() => deleteall6(index)}
                          style={{ height: "40px", cursor: "pointer" }}
                        />
                      </div>
                    ))
                  : []}
              </div>
              <div className="col-md-1 custom-input">
                <label className="labels">add</label>
                <button
                  className="form-control form-control-sm"
                  onClick={addFn6}
                >
                  +
                </button>
              </div>

              <div
                className="col-md-12 custom-input"
                style={{ color: "green", fontWeight: "bolder" }}
              >
                Basic Details<hr></hr>
              </div>

              <div className="col-md-4 custom-input">
                <label className="labels">Facing</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, facing: e.target.value })
                  }
                >
                  <option>{units.facing}</option>
                  <option>---Select---</option>
                  <option>Village Link Road</option>
                  <option>Highway</option>
                  <option>Expressway</option>
                  <option>Unconstructed Road</option>
                </select>
              </div>

              <div className="col-md-4 custom-input">
                <label className="labels">Side Open</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, side_open: e.target.value })
                  }
                >
                  <option>{units.side_open}</option>
                  <option>---Select---</option>
                  <option>1 Side Open</option>
                  <option>2 Side Open</option>
                  <option>3 Side Open</option>
                </select>
              </div>

              <div className="col-md-4 custom-input">
                <label className="labels">Road</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) => setunits({ ...units, road: e.target.value })}
                >
                  <option>{units.road}</option>
                  <option>---Select---</option>
                  <option>11 Ft wide</option>
                  <option>22 Ft Wide</option>
                  <option>33 Ft Wide</option>
                  <option>60 Ft Wide</option>
                  <option>100 Ft Wide</option>
                  <option>200 Ft Wide</option>
                </select>
              </div>

              <div className="col-md-4 custom-input">
                <label className="labels">Front On Road</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, fornt_on_road: e.target.value })
                  }
                >
                  <option>{units.fornt_on_road}</option>
                  <option>---Select---</option>
                  <option>10 ft</option>
                  <option>20 ft</option>
                  <option>30 ft</option>
                  <option>50 ft</option>
                  <option>70 ft</option>
                  <option>100 ft</option>
                  <option>200 ft</option>
                  <option>500 ft</option>
                  <option>1000 ft</option>
                </select>
              </div>

              <div className="col-md-4 custom-input">
                <label className="labels">Ownership</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, ownership: e.target.value })
                  }
                >
                  <option>{units.ownership}</option>
                  <option>---Select---</option>
                  <option>Mustraka</option>
                  <option>Individual</option>
                </select>
              </div>
              <div className="col-md-4 custom-input">
                <label className="labels">No. Of Owner</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, total_owner: e.target.value })
                  }
                >
                  <option>{units.total_owner}</option>
                  <option>---Select---</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </>
          )}

          {!units?.category?.includes("Agricultural") && (
            <>
              <div className="col-md-4 custom-input">
                <label className="labels">Direction</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, direction: e.target.value })
                  }
                >
                  <option>{units.direction}</option>
                  <option>---Select---</option>
                  <option>East</option>
                  <option>West</option>
                  <option>North</option>
                  <option>South</option>
                  <option>North East</option>
                  <option>South East</option>
                  <option>South West</option>
                  <option>North West</option>
                </select>
              </div>
              <div className="col-md-4 custom-input">
                <label className="labels">Facing</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, facing: e.target.value })
                  }
                >
                  <option>{units.facing}</option>
                  <option>---Select---</option>
                  <option>Park</option>
                  <option>Green Belt</option>
                  <option>Highway</option>
                  <option>Commercial</option>
                  <option>School</option>
                  <option>Hospital</option>
                  <option>Mandir</option>
                  <option>Gurudwara</option>
                  <option>Crech</option>
                  <option>Clinic</option>
                  <option>Community Centre</option>
                  <option>1 Kanal</option>
                  <option>14m Marla</option>
                  <option>10 Marla</option>
                  <option>8 Marla</option>
                  <option>6 Marla</option>
                  <option>4 Marla</option>
                  <option>2 Marla</option>
                  <option> 3 Marla</option>
                  <option> 2 Kanal</option>
                </select>
              </div>
              <div className="col-md-4 custom-input">
                <label className="labels">Road</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) => setunits({ ...units, road: e.target.value })}
                >
                  <option>{units.road}</option>
                  <option>---Select---</option>
                  <option>9 Mtr Wide</option>
                  <option>12 Mtr Wide</option>
                  <option> 18 Mtr Wide</option>
                  <option>24 Mtr Wide</option>
                  <option> 60 Mtr Wide</option>
                </select>
              </div>
              <div className="col-md-6 custom-input">
                <label className="labels">Ownership</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, ownership: e.target.value })
                  }
                >
                  <option>{units.ownership}</option>
                  <option>---Select---</option>
                  <option>Freehold</option>
                  <option>Leasehold</option>
                  <option>Co-OPerative Society</option>
                  <option>Sale Agreement(Lal Dora)</option>
                </select>
              </div>
              <div className="col-md-6 custom-input">
                <label className="labels">Stage</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, stage: e.target.value })
                  }
                >
                  <option>{units.stage}</option>
                  <option>---Select---</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </>
          )}

          <div className="col-md-6 custom-input" style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              checked={showabuiltup}
              onChange={handleCheckboxChange4}
            />
            <label>Show Builtup Details</label>
          </div>
          <div className="col-md-6"></div>
          {showabuiltup && (
            <>
              <div className="col-md-12 custom-input">
                <label className="labels">Builtup Details</label>
                <hr></hr>
              </div>

              <div className="col-md-6 custom-input">
                <label className="labels">Type</label>{" "}
                <select
                  className="form-control form-control-sm"
                  style={{ marginTop: "10px" }}
                  onChange={(e) =>
                    setunits({ ...units, builtup_type: e.target.value })
                  }
                >
                  <option>{units.builtup_type}</option>
                  <option>---Select---</option>
                  <option>Duplex</option>
                  <option>Triplex</option>
                  <option>Independent House</option>
                  <option>Penthouse</option>
                  <option>Apartments</option>
                  <option>Studio Apartments</option>
                  <option>Bunglow</option>
                  <option>Farmhouse</option>
                  <option>Courtyard House</option>
                </select>
              </div>
              <div className="col-md-6 custom-input"></div>

              <div
                className="row mt-2 custom-input"
                style={{
                  border: "1px dashed black",
                  margin: "10px",
                  marginTop: "0",
                  padding: "10px",
                  width: "100%",
                }}
              >
                <div className="col-md-2 custom-input">
                  <label className="labels">Floor</label>
                  {Array.isArray(units.floor)
                    ? units.floor.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) => handlefloorchange(index, event)}
                        >
                          <option>{units.floor[index]}</option>
                          <option>---Select---</option>
                          <option>Ground Floor</option>
                          <option>First Floor</option>
                          <option>Second Floor</option>
                          <option>Lower Ground</option>
                          <option>Upper Ground</option>
                          <option>Third Floor</option>
                          <option> Fourth Floor</option>
                          <option>Lower Ground</option>
                          <option>Lower Ground</option>
                        </select>
                      ))
                    : []}
                </div>
                <div className="col-md-2 custom-input">
                  <label className="labels" style={{ width: "500px" }}>
                    Cluter Details
                  </label>
                  {Array.isArray(units.cluter_details)
                    ? units.cluter_details.map((item, index) => (
                        <select
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          onChange={(event) =>
                            handlecluterdetails(index, event)
                          }
                        >
                          <option>{units.cluter_details[index]}</option>
                          <option>---Select---</option>
                          <option>Living Room</option>
                          <option>Lobby</option>
                          <option>Bedroom</option>
                          <option>Master Bedroom</option>
                          <option>Kitchen</option>
                          <option>Bathroom</option>
                          <option>Pooja room,</option>
                          <option>Study Room</option>
                          <option>Frontward</option>
                          <option>Backyard</option>
                          <option>Balcony</option>
                          <option>Store</option>
                          <option>Guest Room</option>
                          <option>Servent Room</option>
                          <option>Dressing</option>
                        </select>
                      ))
                    : []}
                </div>
                <div className="col-md-2 custom-input">
                  <label className="labels">Length</label>
                  {Array.isArray(units.length)
                    ? units.length.map((item, index) => (
                        <input
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          value={units.length[index]}
                          onChange={(event) => handlelengthchange(index, event)}
                        />
                      ))
                    : []}
                </div>
                <div className="col-md-2 custom-input">
                  <label className="labels">Breadth</label>
                  {Array.isArray(units.bredth)
                    ? units.bredth.map((item, index) => (
                        <input
                          className="form-control form-control-sm"
                          style={{ marginTop: "10px" }}
                          value={units.bredth[index]}
                          onChange={(event) => handlebredthchange(index, event)}
                        />
                      ))
                    : []}
                </div>
                <div className="col-md-2 custom-input">
                  <label className="labels">Total Area</label>
                  {Array.isArray(units.total_area)
                    ? units.total_area.map((item, index) => (
                        <input
                          className="form-control form-control-sm"
                          value={
                            units.length[index] && units.bredth[index]
                              ? units.length[index] * units.bredth[index]
                              : ""
                          }
                          style={{ marginTop: "10px" }}
                          readOnly
                        />
                      ))
                    : []}
                </div>

                <div className="col-md-1 custom-input" style={{ marginTop: "90px" }}>
                  {Array.isArray(units.action3)
                    ? units.action3.map((item, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                            alt="delete button"
                            onClick={() => deleteall3(index)}
                            style={{ height: "40px", cursor: "pointer" }}
                          />
                        </div>
                      ))
                    : []}
                </div>
                <div className="col-md-1 custom-input">
                  <label className="labels">add</label>
                  <button
                    className="form-control form-control-sm"
                    onClick={addFn3}
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="col-md-6 custom-input">
            <label>Occupation Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={
                !isNaN(units.ocupation_date)
                  ? excelSerialToDateString(Number(units.ocupation_date))
                  : units.ocupation_date
              }
              onChange={(e) =>
                setunits({ ...units, ocupation_date: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 custom-input">
            <label>Age of Construction</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={units.age_of_construction}
              onChange={(e) =>
                setunits({ ...units, age_of_construction: e.target.value })
              }
            />
          </div>

          <div className="col-md-6 custom-input">
            <label className="labels">Furnishing Details</label>
            <select
              id="subcategory"
              className="form-control form-control-sm"
              onChange={(e) =>
                setunits({ ...units, furnishing_details: e.target.value })
              }
            >
              <option>{units.furnishing_details}</option>
              <option>---Select---</option>
              <option>Furnished</option>
              <option>Unfurnished</option>
              <option>Semi Furnished</option>
            </select>
          </div>
          {(units.furnishing_details === "Furnished" ||
            units.furnishing_details === "Semi Furnished") && (
            <div className="col-md-12 custom-input">
              <label>Enter Furnishing Details</label>
              <input
                type="text"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setunits({
                    ...units,
                    age_of_construction: e.target.value,
                  })
                }
              />
            </div>
          )}
          <div className="col-md-6"></div>

          <div className="col-md-8 custom-input">
            <label>Furnished Items</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={(e) =>
                setunits({ ...units, furnished_item: e.target.value })
              }
            />
          </div>
        </div>
      </div>

{/*======================================== location=================================== */}

      <div className="row">
        <div
          className="col-md-12 custom-input"
          id="unitlocation"
          style={{ display: "none", lineHeight: "30px" }}
        >
          <div className="p-3 py-5 custom-input">
            <div
              className="col-md-12 custom-input"
              style={{
                border: "1px solid black",
                marginTop: "30px",
                padding: "10px",
              }}
            >
              <div style={{ border: "1px solid black", marginTop: "10px" }}>
                <LoadScript googleMapsApiKey="AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc">
                  <GoogleMap
                    mapContainerStyle={mapStyles1}
                    zoom={13}
                    center={defaultCenter1}
                  >
                    <Marker
                      position={{
                        lat: defaultCenter1.lat,
                        lng: defaultCenter1.lng,
                      }}
                      draggable={true}
                      onDragEnd={handleMarkerDragEnd1}
                    />
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="row">
                <div className="col-md-6 custom-input">
                  <label className="labels">Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    required="true"
                    value={units.location}
                    onChange={(e) =>
                      setunits({ ...units, location: e.target.value })
                    }
                  />
                </div>
                {/* <div className='col-md-5'></div> */}
                <div className="col-md-2 custom-input">
                  <label className="labels" style={{ visibility: "hidden" }}>
                    .
                  </label>
                  <button
                    className="form-control form-control-sm"
                    required="true"
                    onClick={handleSubmit1}
                  >
                    Get
                  </button>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-5 custom-input">
                  <label className="labels">Lattitude</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    required="true"
                    value={units.lattitude}
                    readOnly
                  />
                </div>
                <div className="col-md-5 custom-input">
                  <label className="labels">Langitude</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    required="true"
                    value={units.langitude}
                    readOnly
                  />
                </div>
                <div className="col-md-12 custom-input">
                  <label
                    className="labels"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Address
                  </label>
                </div>

                <div className="col-md-8 custom-input">
                  <label className="labels">ADDRESS</label>
                  <input
                    type="text"
                    value={units.uaddress}
                    className="form-control form-control-sm"
                    onChange={(e) =>
                      setunits({ ...units, uaddress: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-8 custom-input">
                  <label className="labels">STREET</label>
                  <input
                    type="text"
                    value={units.ustreet}
                    className="form-control form-control-sm"
                    onChange={(e) =>
                      setunits({ ...units, ustreet: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4 custom-input">
                  <label className="labels">LOCALITY</label>
                  <input
                    type="text"
                    value={units.ulocality}
                    className="form-control form-control-sm"
                    onChange={(e) =>
                      setunits({ ...units, ulocality: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 custom-input">
                  <label className="labels">CITY</label>
                  <select
                    type="text"
                    className="form-control form-control-sm"
                    value={units.ucity}
                        onClick={() => {
                          getall_city();
                        }}
                    onChange={(e) =>
                      setunits({ ...units, ucity: e.target.value })
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
                <div className="col-md-4 custom-input">
                  <label className="labels">ZIP</label>
                  <input
                    type="text"
                    value={units.uzip}
                    className="form-control form-control-sm"
                    onChange={(e) =>
                      setunits({ ...units, uzip: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 custom-input">
                  <label className="labels">State</label>
                  <select
                    className="form-control form-control-sm"
                      value={units.ustate}
                        onClick={() => {
                          getall_state();
                        }}
                    onChange={(e) =>
                      setunits({ ...units, ustate: e.target.value })
                    }
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
                <div className="col-md-6 custom-input">
                  <label className="labels">Country</label>
                  <select
                    className="form-control form-control-sm"
                     value={units.ucountry}
                        onClick={() => {
                          if (All_Country.length === 0) {
                            getall_country();
                          }
                        }}
                    onChange={(e) =>
                      setunits({ ...units, ucountry: e.target.value })
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="ownerdetails" style={{ padding: "5px", display: "none" }}>
        <div className="row" style={{ width: "100%" }}>
          <div
            className="col-md-9 custom-input"
            id="suggestion-box"
            style={{ position: "relative" }}
          >
            <label className="labels" style={{ visibility: "hidden" }}>
              Search
            </label>
            <input
              type="search"
              className="form-control form-control-sm"
              value={input}
              placeholder="Type here For Search in Contact"
              required="true"
              onChange={handleInputChange}
            />
          </div>
          {showSuggestions && input && filteredSuggestions?.length > 0 && (
            <ul className="suggestion-list" style={{ width: "100%" }}>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.first_name} {suggestion.last_name}(
                  {suggestion.mobile_no})
                </li>
              ))}
            </ul>
          )}
          <div className="col-md-3 custom-input">
            <label className="labels">Add Contact</label>
            <button
              className="form-control form-control-sm"
              style={{ width: "50px" }}
              onClick={() => navigate("/sortaddcontact")}
            >
              +
            </button>
          </div>

          <div className="col-md-12 custom-input" style={{ marginTop: "20px" }}>
            <label className="labels">Owner Contact</label>
            <div className="col-md-12 custom-input">
              <hr></hr>
            </div>
            {units.owner_details.length >= 0 && (
              <div className="contact-details custom-input">
                <table style={{ width: "100%" }}>
                  <tbody>
                    {/* Combine selectedcontact1 with units.owner_details while removing duplicates */}
                    {[...selectedcontact1, ...units.owner_details]
                      .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                      .filter(
                        (contact, index, self) =>
                          // Ensure that we only keep unique contacts based on _id
                          index === self.findIndex((c) => c._id === contact._id)
                      )
                      .map((contact) => (
                        <StyledTableRow>
                          <img
                            style={{ height: "50px", width: "60px" }}
                            src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png"
                            alt=""
                          ></img>
                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            {contact.title} {contact.first_name}{" "}
                            {contact.last_name}
                            <br></br>
                            <SvgIcon
                              component={EmailIcon}
                              style={{ fontSize: "10px" }}
                            />
                            <span>{contact.email}</span>
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            {Array.isArray(contact.mobile_no)
                              ? contact.mobile_no.map((number, index) => (
                                  <span key={index}>
                                    <SvgIcon
                                      component={PhoneIphoneIcon}
                                      style={{ fontSize: "10px" }}
                                    />
                                    {number}
                                    <br></br>
                                  </span>
                                ))
                              : []}
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            S/W/O <br></br>
                            {contact.father_husband_name}
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            permanent address: <br></br>
                            {contact.h_no}
                            <br></br>
                            {contact.area1}
                            {contact.location1} {contact.city1} {contact.state1}{" "}
                            {contact.country1} {contact.pincode1}
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            <span
                              style={{
                                color: "orange",
                                fontWeight: "bolder",
                              }}
                            >
                              Owner
                            </span>
                          </StyledTableCell>

                          <StyledTableCell>
                            <img
                              style={{ height: "20px", cursor: "pointer" }}
                              src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                              alt=""
                              onClick={() => removeContact(contact._id)}
                            ></img>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="col-md-12" style={{ marginTop: "20px" }}>
            <label className="labels">Associate Contact</label>
            <div className="col-md-12">
              <hr></hr>
            </div>
            {units?.associated_contact?.length >= 0 && (
              <div className="contact-details custom-input">
                <table style={{ width: "100%" }}>
                  <tbody>
                    {[...selectedcontact2, ...units.associated_contact]
                      .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                      .filter(
                        (contact, index, self) =>
                          // Ensure that we only keep unique contacts based on _id
                          index === self.findIndex((c) => c._id === contact._id)
                      )
                      .map((contact) => (
                        <StyledTableRow>
                          <img
                            style={{ height: "50px", width: "60px" }}
                            src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png"
                            alt="Contact"
                          />
                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            {contact.title} {contact.first_name}{" "}
                            {contact.last_name}
                            <br />
                            <SvgIcon
                              component={EmailIcon}
                              style={{ fontSize: "10px" }}
                            />
                            <span>{contact.email}</span>
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            {Array.isArray(contact.mobile_no)
                              ? contact.mobile_no.map((number, index) => (
                                  <span key={index}>
                                    <SvgIcon component={PhoneIphoneIcon} />
                                    {number}
                                    <br />
                                  </span>
                                ))
                              : []}
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            S/W/O <br />
                            {contact.father_husband_name}
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            permanent address: <br />
                            {contact.h_no}
                            <br />
                            {contact.area1} {contact.location1} {contact.city1}{" "}
                            {contact.state1} {contact.country1}{" "}
                            {contact.pincode1}
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ cursor: "pointer", fontSize: "10px" }}
                          >
                            <span
                              style={{
                                color: "orange",
                                fontWeight: "bolder",
                              }}
                            >
                              {relation1}
                            </span>
                          </StyledTableCell>

                          <StyledTableCell>
                            <img
                              style={{ height: "20px", cursor: "pointer" }}
                              src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                              onClick={() => removeContact(contact._id)}
                              alt="Remove"
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="uploadmedia" style={{ padding: "5px", display: "none" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-right">Upload Images</h6>
        </div>
        <hr></hr>
        <div className="row mt-2">
          <table style={{ marginLeft: "25px" }}>
            <thead>
              <tr>
                <th style={{ width: "100px" }}>#</th>
                <th style={{ width: "400px", textAlign: "center" }}>Preview</th>
                <th style={{ width: "300px", textAlign: "center" }}>
                  Description
                </th>
                {/* <th style={{width:"300px",textAlign:"center"}}>Category</th> */}
                <th style={{ width: "150px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {Array.isArray(units.s_no)
                    ? units.s_no.map((name, index) => (
                        <div
                          key={index}
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={(event) => handlesnochange(index, event)}
                          />
                        </div>
                      ))
                    : []}
                </td>
                <td>
                  {Array.isArray(units.preview)
                    ? units.preview.map((name, index) => (
                        <div
                          key={index}
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          {name && (
                            <img
                              // src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                              src={`${name}`}
                              alt="preview"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                marginBottom: "10px",
                              }}
                            />
                          )}
                          <input
                            name="preview"
                            type="file"
                            className="form-control form-control-sm"
                            multiple
                            onChange={(event) =>
                              handlepreviewchange(index, event)
                            }
                          />
                          {}
                          {name.previewUrls &&
                            name.previewUrls.map((url, idx) => (
                              <img
                                key={idx}
                                src={url}
                                alt={`preview ${index}-${idx}`}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            ))}
                        </div>
                      ))
                    : []}
                </td>
                <td>
                  {Array.isArray(units.descriptions)
                    ? units.descriptions.map((name, index) => (
                        <div
                          key={index}
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={(event) =>
                              handledescriptionchange(index, event)
                            }
                          />
                        </div>
                      ))
                    : []}
                </td>
                {/* <td>
                               {Array.isArray(units.category)?
                               units.category.map((name, index) => (
                                         <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                           <select className="form-control form-control-sm" required="true" onChange={(event) => handlecategorychange(index, event)}>
                                               <option>select</option>
                                               <option>Bedroom</option>
                                               <option>Hall</option>
                                               <option>Kitchen</option>
                                               <option>Balcony</option>
                                               <option>Washroom</option>
                                               <option>Pooja Room</option>
                                               <option>Dining Room</option>
                                               <option>Drawing Room</option>
                                               </select>
                                         </div>
                                       )):[]}
                               </td> */}
                <td>
                  {Array.isArray(units.action10)
                    ? units.action10.map((name, index) => (
                        <div
                          key={index}
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          <div>
                            <img
                              src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                              alt="delete button"
                              onClick={() => deleteallunit(index)}
                              style={{ height: "40px", cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      ))
                    : []}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row mt-4">
          <div
            className="col-md-3 custom-input"
            style={{ marginLeft: "70%" }}
            onClick={addFnunit}
          >
            <button className="form-control form-control-sm">Add Image</button>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-right">Upload Videos</h6>
        </div>
        <hr></hr>
        <div className="row mt-2">
          <table style={{ marginLeft: "25px" }}>
            <thead>
              <tr>
                <th style={{ width: "100px", textAlign: "center" }}>SR.NO.</th>
                <th style={{ width: "950px", textAlign: "center" }}>URL</th>
                <th style={{ width: "150px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {Array.isArray(units.s_no1)
                    ? units.s_no1.map((name, index) => (
                        <div
                          key={index}
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={name}
                            onChange={(event) => handlesno1change(index, event)}
                          />
                        </div>
                      ))
                    : []}
                </td>
                <td>
                  {Array.isArray(units.url)
                    ? units.url.map((name, index) => (
                        <div
                          key={index}
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={name}
                            onChange={(event) => handleurlChange(index, event)}
                          />
                        </div>
                      ))
                    : []}
                </td>
                <td>
                  {Array.isArray(units.action11)
                    ? units.action11.map((name, index) => (
                        <div
                          key={index}
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          <div>
                            <img
                              src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                              alt="delete button"
                              onClick={() => deleteallunit1(index)}
                              style={{ height: "40px", cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      ))
                    : []}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row mt-4">
          <div
            className="col-md-3 custom-input"
            style={{ marginLeft: "70%" }}
            onClick={addFnunit1}
          >
            <button className="form-control form-control-sm">
              Add Video Link
            </button>
          </div>

          <div className="col-md-12">
            <hr></hr>
          </div>

          <div className="col-md-2"></div>
        </div>
      </div>

      <div id="documentform" style={{ padding: "5px", display: "none" }}>
        <div className="d-flex justify-content-between align-items-center mb-3"></div>
        <hr></hr>

        <div className="row mt-2">
          <div className="col-md-3 custom-input">
            <label className="labels">Document Name</label>
            {Array.isArray(units.document_name)
              ? units.document_name.map((item, index) => (
                  <select
                    className="form-control form-control-sm"
                    onChange={(event) => handledocumentnamechange(index, event)}
                    style={{ marginTop: "5px" }}
                  >
                    <option>{units.document_name[index]}</option>
                    <option>Aadhar Card</option>
                    <option>Pan Card</option>
                    <option>Voter Id</option>
                    <option>Passport</option>
                    <option>Driving Licence</option>
                    <option>Other</option>
                  </select>
                ))
              : []}
          </div>

          <div className="col-md-2 custom-input">
            <label className="labels">Doc. No.</label>
            {Array.isArray(units.document_no)
              ? units.document_no.map((item, index) => (
                  <input
                    type="text"
                    value={units.document_no[index]}
                    className="form-control form-control-sm"
                    onChange={(event) => handledocumentnochange(index, event)}
                    style={{ marginTop: "5px" }}
                  />
                ))
              : []}
          </div>

          <div className="col-md-2 custom-input">
            <label className="labels">Date</label>
            {Array.isArray(units.document_Date)
              ? units.document_Date.map((item, index) => (
                  <input
                    type="date"
                    value={units.document_Date[index]}
                    className="form-control form-control-sm"
                    onChange={(event) => handledocumentdatechange(index, event)}
                    style={{ marginTop: "5px" }}
                  />
                ))
              : []}
          </div>

          <div className="col-md-2 custom-input" style={{ position: "relative" }}>
            <label className="labels">Pic</label>
            {Array.isArray(units.image)
              ? units.image.map((name, index) => (
                  <div
                    key={index}
                    className="col-md-12"
                    style={{ marginTop: "10px" }}
                  >
                    {name && (
                      <img
                        // src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                        src={`${name}`}
                        alt="preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginBottom: "10px",
                        }}
                      />
                    )}
                    <input
                      name="image"
                      type="file"
                      className="form-control form-control-sm"
                      multiple
                      onChange={(event) => handlepicchange1(index, event)}
                      style={{
                        width: "90px",
                        fontSize: "10px",
                        paddingTop: "7px",
                      }}
                    />

                    {name.previewUrls &&
                      name.previewUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`preview ${index}-${idx}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                  </div>
                ))
              : []}
          </div>

          {/* <div className="col-md-1" style={{ marginTop: "70px" }}> 
            {
              Array.isArray(units.document_name) ?
                units.document_name.map((item, index) => (
                  <div key={index} style={{ marginTop: "10px" }}>
                    {units.document_name[index] && ( 
                      <img
                        src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                        alt="delete button"
                        onClick={() => deleteall12(index)} 
                        style={{ height: "40px", cursor: "pointer" }}
                      />
                    )}
                  </div>
                )) :    Array.isArray(units.action12)?
                               units.action12.map((name, index) => (
                                         <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                         
                                           <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button"   onClick={() => deleteall12(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                         </div>
                                       )):[]
            }
                               </div>   */}

          <div className="col-md-1 custom-input" style={{ marginTop: "70px" }}>
            {Array.isArray(units.action12)
              ? units.action12.map((item, index) => (
                  <div style={{ marginTop: "10px" }}>
                    {/* <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall12(index)} style={{height:"40px",cursor:"pointer"}}/> */}
                    <span
                      class="material-icons"
                      style={{
                        color: "red",
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteall12(index)}
                    >
                      delete
                    </span>
                  </div>
                ))
              : []}
          </div>

          <div className="col-md-1">
            <label className="labels" style={{ visibility: "hidden" }}>
              Add
            </label>
            <button className="form-control form-control-sm" onClick={addFn12}>
              +
            </button>
          </div>
        </div>
      </div>

<div className="flex items-center gap-4 mt-4 justify-end">

  {/* UPDATE BUTTON */}
  <button
    onClick={updateinventories}
    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg 
               shadow-md hover:shadow-lg hover:bg-blue-700 active:scale-95
               transition-all duration-300"
  >
    Update
  </button>

  {/* CLOSE BUTTON */}
  <button
    onClick={handleClose7}
    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg
               shadow-sm hover:shadow-md hover:bg-gray-300 active:scale-95
               transition-all duration-300"
  >
    Close
  </button>

</div>

    {/*========================================= modal for add new owner in feedback form start =========================================*/}
      
        
      
{/* ====================================modal for add new owner=============================================== */}

      {/*==================================== relation modal start ===================================================================*/}

      <Modal
        show={show2}
        onHide={handleClose2}
        size="lg"
        style={{ transition: "0.5s ease-in", backgroundColor: "gray" }}
      >
        <Modal.Header>
          <Modal.Title>Choose Relation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%" }}>
            <div className="row">
              <div className="col-md-4">
                <label className="labels">Relation</label>
                <select
                  className="form-control form-control-sm"
                  required="true"
                  onChange={handlerelationchange}
                >
                  <option>---Select---</option>

                  {relations.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*================================== relation modal end =================================================================*/}

    </div>
    </div>
    </div>
    </div>
    </div>
    <ToastContainer/>
    </div>
  );
}

export default EditUnit;
