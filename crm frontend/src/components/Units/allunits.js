import Header1 from "../header1";
import Sidebar1 from "../sidebar1";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { SvgIcon } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Tooltip from "@mui/material/Tooltip";
import api from "../../api";
import "../../css/deal.css";
import Swal from "sweetalert2";
import deallogo from "../../icons/deal.jpg";
import UniqueLoader from "../loader";
import ExportUnitsModal from "./export_units";

function Allunits() {
  const logged_user = JSON.parse(localStorage.getItem("user"));

  const [flattenedUnits, setFlattenedUnits] = useState([]);
  console.log(flattenedUnits);
  

  const [isLoading4, setIsLoading4] = useState(false);

  const navigate = useNavigate();
  React.useEffect(() => {
    fetchdata();
  }, []);

  const [data, setdata] = useState([]);
  const fetchdata = async (event) => {
    try {
      const resp = await api.get("viewdeal");
      const all = resp.data.deal;
      setdata(all);
    } catch (error) {
      console.log(error);
    }
  };

  /*-------------------------------------------------------------------update inventory start---------------------------------------------------------------------------- */

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

  const allColumns = [
    { id: "sno", name: "#" },
    { id: "details", name: "Details" },
    { id: "owner_details", name: "Owner_Details" },
    { id: "associated_contact", name: "Associated_Contact" },
    { id: "expected_price", name: "Expectation" },
    { id: "matchinglead", name: "Matched_Lead" },
    { id: "stage", name: "Status" },
    { id: "user", name: "Assigned To" },
    { id: "remarks", name: "Remarks" },
    { id: "follow_up", name: "Follow_Up" },
    { id: "last_contacted", name: "Last Contacted" },
    { id: "available_for", name: "Available For" },
    { id: "mobile_type", name: "Mobile Type" },
    { id: "email_type", name: "Email Type" },
    { id: "designation", name: "Designation" },
    { id: "company_name", name: "Company Name" },
    { id: "tags", name: "Tags" },
    { id: "father_husband_name", name: "Father/Husband Name" },
    { id: "h_no", name: "House No" },
    { id: "area1", name: "Street Address" },
    { id: "location1", name: "Location" },
    { id: "city1", name: "City" },
    { id: "pincode1", name: "Pincode" },
    { id: "state1", name: "State" },
    { id: "country1", name: "Country" },
    { id: "source", name: "Source" },
    { id: "category", name: "Category" },
    { id: "profession_category", name: "Profession Category" },
    { id: "profession_subcategory", name: "Profession Dub-Category" },
    { id: "company_name", name: "Company Name" },
    { id: "country_code1", name: "Country Code" },
    { id: "company_phone", name: "Company Phone" },
    { id: "company_email", name: "Company Email" },
    { id: "owner", name: "Owner" },
    { id: "team", name: "Team" },
    { id: "gender", name: "Gender" },
    { id: "visible_to", name: "Visible To" },
    { id: "maritial_status", name: "Marital Status" },
    { id: "birth_date", name: "Birth Date" },
    { id: "anniversary_date", name: "Anniversary Date" },
    { id: "education", name: "Education" },
    { id: "degree", name: "Degree" },
    { id: "school_college", name: "School/College" },
    { id: "loan", name: "Loan" },
    { id: "bank", name: "Bank" },
    { id: "amount", name: "Amount" },
    { id: "social_media", name: "Social Media" },
    { id: "url", name: "URL" },
    { id: "income", name: "Income" },
    { id: "amount1", name: "Amount 1" },
    { id: "document_no", name: "Document No" },
    { id: "document_name", name: "Document Name" },
    { id: "industry", name: "Industry" },
    { id: "area", name: "Company Address" },
    { id: "location", name: "Company Location" },
    { id: "city", name: "Company City" },
    { id: "pincode", name: "Company Pincode" },
    { id: "state", name: "Company State" },
    { id: "country", name: "Company Country" },
    { id: "company_social_media", name: "Company Social Media" },
    { id: "company_url", name: "Company Url" },
    { id: "descriptions", name: "Descriptions" },
    { id: "relation", name: "Relation" },
  ];
  const [selectedItems, setSelectedItems] = useState([]); // To track selected rows

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setdata(sortedData);
  };

  // ==========================================project code start======================================================================

  const [totalinventories, settotalinventories] = useState(0);

  React.useEffect(() => {
    fetchcdata();
  }, []);

  const [allprojectforsearch, setallprojectforsearch] = useState([]);
  const [cdata, setcdata] = useState([]);

  const [allunitsforsearch, setallunitsforsearch] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [totalproject, settotalproject] = useState();
  const fetchcdata = async (event) => {
    try {
      const resp = await api.get("viewproject");
      setcdata(resp.data.project);
      setallprojectforsearch(resp.data.project);
      const countproject = Array.isArray(resp.data.project)
        ? resp.data.project
        : [resp.data.project];
      settotalproject(countproject.length);
    } catch (error) {
      console.log(error);
    }
  };



  const [alllocation, setalllocation] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.location);
    setalllocation([...new Set(result)]);
  }, [flattenedUnits]);


  const [activeunits, setactiveunits] = useState([]);
  const [inactiveunits, setinactiveunits] = useState([]);
  useEffect(() => {
    const active = flattenedUnits.filter((item) => item.stage === "Active");
    setactiveunits(active);

    const inactive = flattenedUnits.filter((item) => item.stage === "InActive");
    setinactiveunits(inactive);
  }, [flattenedUnits]);

  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1, setItemsPerPage1] = useState(10); // User-defined items per page
  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems2 = cdata.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(cdata.length / itemsPerPage1);

  //========================================= units code start =======================================================================

  const [loading, setLoading] = useState(false);

  const allunitColumns = [
    { id: "sno", name: "#" },
    { id: "details", name: "Details" },
    { id: "location", name: "Location" },
    { id: "locationbrief", name: "Location_Brief" },
    { id: "stage", name: "Status" },
    { id: "ownerdetails", name: "Owner_Details" },
    { id: "owneraddress", name: " Owner_Address" },
    { id: "associatedcontact", name: "Associated_Contact " },
    { id: "remarks", name: "Remarks " },
    { id: "follow_up", name: "Follow_Up" },
    { id: "last_conduct_date_time", name: "Last_Contacted" },
  ];
  const [selectedItems3, setSelectedItems3] = useState([]); // To track selected rows
  const [selectAll3, setSelectAll3] = useState(false); // To track the state of the "Select All" checkbox
  const [visibleColumns3, setVisibleColumns3] = useState(
    allunitColumns.slice(1, 11)
  );
  const [showColumnList2, setShowColumnList2] = useState(false);

  const handleCheckboxChange2 = (column) => {
    if (visibleColumns3.some((col) => col.id === column.id)) {
      // Remove column from visibleColumns if it's already present
      setVisibleColumns3(visibleColumns3.filter((col) => col.id !== column.id));
    } else {
      // Add column to visibleColumns
      setVisibleColumns3([...visibleColumns3, column]);
    }
  };
  const handleSelectAll3 = () => {
    const scrollY = window.scrollY;
    setSelectAll3(!selectAll3);
    if (!selectAll3) {
      // Add all current page item IDs to selectedItems
      setSelectedItems3(currentItems3.map((item) => item));
    } else {
      // Deselect all
      setSelectedItems3([]);
    }
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  const handleRowSelect3 = (item) => {
    const scrollY = window.scrollY;
    if (selectedItems3.some((i) => i._id === item._id)) {
      setSelectedItems3(selectedItems3.filter((i) => i._id !== item._id));
    } else {
      setSelectedItems3([...selectedItems3, item]);
    }
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  const [currentPage2, setCurrentPage2] = useState(1);
  const [itemsPerPage2, setItemsPerPage2] = useState(10); // User-defined items per page
  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;

  const totalPages2 = Math.ceil(totalinventories / itemsPerPage2);

  const extractUnitNumber = (value) => {
    if (!value) return 0;
    const str = String(value); // Ensure it's a string
    const match = str.match(/\d+/); // Extract first number
    return match ? parseInt(match[0], 10) : 0;
  };
  const sortedUnits = [...flattenedUnits].sort(
    (a, b) => extractUnitNumber(a.unit_no) - extractUnitNumber(b.unit_no)
  );
  const currentItems3 = sortedUnits.slice(indexOfFirstItem2, indexOfLastItem2);

  // Handle items per page change
  const handleItemsPerPageChange2 = (e) => {
    setItemsPerPage2(Number(e.target.value));
    setCurrentPage2(1); // Reset to first page whenever items per page changes
  };

  // Function to handle page changes
  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

  // Function to handle "Next" and "Previous" page changes
  const goToNextPage2 = () => {
    if (currentPage2 < totalPages2) {
      setCurrentPage2(currentPage2 + 1);
    }
  };

  const goToPreviousPage2 = () => {
    if (currentPage2 > 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  };

  const renderPageNumbers2 = () => {
    // Define the range of page numbers to display
    const maxPageNumbersToShow2 = 5;
    const startPage2 = Math.max(
      1,
      currentPage2 - Math.floor(maxPageNumbersToShow2 / 2)
    );
    const endPage2 = Math.min(
      totalPages2,
      startPage2 + maxPageNumbersToShow2 - 1
    );

    return (
      <div
        style={{
          display: "flex",

          whiteSpace: "nowrap",
          padding: "10px-15px",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Previous Button */}
        {currentPage2 > 1 && (
          <button
            onClick={goToPreviousPage2}
            style={{ width: "50px", borderRadius: "5px", marginRight: "5px" }}
          >
            Prev
          </button>
        )}

        {/* Page Numbers */}
        {Array.from(
          { length: endPage2 - startPage2 + 1 },
          (_, i) => startPage2 + i
        ).map((number) => (
          <button
            key={number}
            onClick={() => paginate2(number)}
            style={{
              width: "30px",
              borderRadius: "5px",
              marginRight: "5px",
              flexShrink: 0, // Prevent buttons from shrinking
              backgroundColor: number === currentPage2 ? "lightblue" : "white",
            }}
          >
            {number}
          </button>
        ))}

        {/* Next Button */}
        {currentPage2 < totalPages2 && (
          <button
            onClick={goToNextPage2}
            style={{ width: "50px", borderRadius: "5px", marginRight: "5px" }}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const [category_count, setcategory_count] = useState();
  const [status_count, setstatus_count] = useState();

  const fetchunitsdata = async (
    page,
    limit,
    search = "",
    activeFilters = [],
    login_user = logged_user ? logged_user.name : ""
  ) => {
    setLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);

      if (search && search.trim() !== "") {
        params.append("search", search);
      }

      if (activeFilters.length > 0) {
        params.append("activeFilters", JSON.stringify(activeFilters));
      }

      // ✅ Pass logged-in user name in query
      if (login_user) {
        params.append("login_user", login_user);
      }

      const resp1 = await api.get(`viewallunits?${params.toString()}`);
      settotalinventories(resp1.data.total);
      setFlattenedUnits(resp1.data.units);
      setcategory_count(resp1.data.categoryCount);
      setstatus_count(resp1.data.statusCounts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ===================================search deal via search box start========================================================

  const [unitsearchinput, setunitsearchinput] = useState("");
  const handleunitsearchchange = (e) => {
    setunitsearchinput(e.target.value);
  };

  const handlekeypress4 = (event) => {
    if (event.key === "Enter") {
      setFlattenedUnits(
        flattenedUnits.filter((item) => item.project_name == unitsearchinput)
      );
      document.getElementById("unitsearch").value = "";
    }
  };

  //=========================================== search deal via search box end===============================================

  const [dealdata, setdealdata] = useState([]);
  const [note, setnote] = useState(dealdata.descriptions);

  const [show6, setshow6] = useState(false);

  const handleClose6 = () => setshow6(false);

  const handleShow6 = async () => {
    setshow6(true);
    try {
      const resp = await api.get(`viewdealbyid/${selectedItems}`);
      setdealdata(resp.data.deal);
    } catch (error) {
      console.log(error);
    }
  };

  const updatedealdata = async () => {
    try {
      const id = selectedItems; // Assuming selectedItems is the ID of the lead to update
      const data = { remarks: note, stage: updatestage }; // Send only the stage field in the request body

      const resp = await api.put(`updatedealbysingle/${id}`, data); // Send the request with only stage in the body

      toast.success("Deal Updated Successfully...", { autoClose: 2000 });

      // After success, navigate to the lead details page or reload
      setTimeout(() => {
        navigate("/dealdetails");
      }, 2000);
      setTimeout(() => {
        window.location.reload(); // If necessary, reload the page
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const [show5, setshow5] = useState(false);
  const [updatestage, setupdatestage] = useState(dealdata.stage);

  const handleClose5 = () => setshow5(false);
  const handleShow5 = async () => {
    setshow5(true);
    try {
      const resp = await api.get(`viewdealbyid/${selectedItems}`);
      setdealdata(resp.data.deal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedItems3.length === 0) {
      document.getElementById("unitdelete").style.display = "none";
      document.getElementById("unitedit").style.display = "none";
      document.getElementById("unitsendall").style.display = "none";

      document.getElementById("unitcreatedeal").style.display = "none";
      // document.getElementById("unitaddunit").style.display="none"

      document.getElementById("unitaddremoveowner").style.display = "none";
      document.getElementById("unitmatchedlead").style.display = "none";
      document.getElementById("unitcall").style.display = "none";
      document.getElementById("unitaddtag").style.display = "none";
      document.getElementById("unitaddremarks").style.display = "none";

      document.getElementById("unitupdatestage").style.display = "none";
      document.getElementById("unitpreview").style.display = "none";
      document.getElementById("unitadddocument").style.display = "none";
      document.getElementById("unituploadpicture").style.display = "none";
      document.getElementById("unitcustomerfeedback").style.display = "none";
      document.getElementById("unitsearch").style.display = "flex";
    }
    if (selectedItems3.length === 1) {
      document.getElementById("unitdelete").style.display = "inline-block";
      document.getElementById("unitedit").style.display = "inline-block";
      document.getElementById("unitsendall").style.display = "inline-block";

      document.getElementById("unitcreatedeal").style.display = "inline-block";
      // document.getElementById("unitaddunit").style.display="inline-block"

      document.getElementById("unitaddremoveowner").style.display =
        "inline-block";
      document.getElementById("unitmatchedlead").style.display = "inline-block";
      document.getElementById("unitcall").style.display = "inline-block";
      document.getElementById("unitaddtag").style.display = "inline-block";
      document.getElementById("unitaddremarks").style.display = "inline-block";

      document.getElementById("unitupdatestage").style.display = "inline-block";
      document.getElementById("unitpreview").style.display = "inline-block";
      document.getElementById("unitadddocument").style.display = "inline-block";
      document.getElementById("unituploadpicture").style.display =
        "inline-block";
      document.getElementById("unitcustomerfeedback").style.display =
        "inline-block";
      document.getElementById("unitsearch").style.display = "none";
    }
    if (selectedItems3.length > 1) {
      document.getElementById("unitdelete").style.display = "inline-block";
      document.getElementById("unitedit").style.display = "none";
      document.getElementById("unitsendall").style.display = "inline-block";

      document.getElementById("unitcreatedeal").style.display = "none";
      // document.getElementById("unitaddunit").style.display="none"

      document.getElementById("unitaddremoveowner").style.display = "none";
      document.getElementById("unitmatchedlead").style.display = "none";
      document.getElementById("unitcall").style.display = "none";
      document.getElementById("unitaddtag").style.display = "none";
      document.getElementById("unitaddremarks").style.display = "none";

      document.getElementById("unitupdatestage").style.display = "none";
      document.getElementById("unitpreview").style.display = "none";
      document.getElementById("unitadddocument").style.display = "none";
      document.getElementById("unituploadpicture").style.display = "none";
      document.getElementById("unitcustomerfeedback").style.display = "none";
      document.getElementById("unitsearch").style.display = "none";
    }
  }, [selectedItems3]);

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

  // ===================================add to task for sitevisit start============================================================

  const handleformchange = () => {
    const tasks = document.getElementById("forms").value;
    if (tasks === "Call") {
      document.getElementById("call").style.display = "flex";
      document.getElementById("email").style.display = "none";
      document.getElementById("sitevisit").style.display = "none";
      document.getElementById("meeting").style.display = "none";

      document.getElementById("calladdtask").style.display = "flex";
      document.getElementById("mailaddtask").style.display = "none";
      document.getElementById("sitevisitaddtask").style.display = "none";
      document.getElementById("meetingaddtask").style.display = "none";
    }
    if (tasks === "Email") {
      document.getElementById("call").style.display = "none";
      document.getElementById("email").style.display = "flex";
      document.getElementById("sitevisit").style.display = "none";
      document.getElementById("meeting").style.display = "none";

      document.getElementById("mailaddtask").style.display = "flex";
      document.getElementById("sitevisitaddtask").style.display = "none";
      document.getElementById("meetingaddtask").style.display = "none";
      document.getElementById("calladdtask").style.display = "none";
    }
    if (tasks === "Site Visit") {
      document.getElementById("call").style.display = "none";
      document.getElementById("email").style.display = "none";
      document.getElementById("sitevisit").style.display = "flex";
      document.getElementById("meeting").style.display = "none";

      document.getElementById("sitevisitaddtask").style.display = "flex";
      document.getElementById("meetingaddtask").style.display = "none";
      document.getElementById("calladdtask").style.display = "none";
      document.getElementById("mailaddtask").style.display = "none";
    }
    if (tasks === "Meeting") {
      document.getElementById("call").style.display = "none";
      document.getElementById("email").style.display = "none";
      document.getElementById("sitevisit").style.display = "none";
      document.getElementById("meeting").style.display = "flex";

      document.getElementById("calladdtask").style.display = "none";
      document.getElementById("mailaddtask").style.display = "none";
      document.getElementById("sitevisitaddtask").style.display = "none";
      document.getElementById("meetingaddtask").style.display = "flex";
    }
  };

  const [show8, setshow8] = useState(false);

  const handleClose8 = () => setshow8(false);
  const handleShow8 = async () => {
    setshow8(true);
  };

  const [sitevisit, setsitevisit] = useState({
    activity_type: "SiteVisit",
    title: "",
    executive: "",
    project: [],
    block: [],
    sitevisit_type: "",
    inventory: [],
    lead: "",
    confirmation: "",
    remark: "",
    participants: "",
    remind_me: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    complete: "",
    stage: "",
    title2: "",
    first_name: "",
    last_name: "",
    mobile_no: [],
    email: [],
    lead_id: "",
    stage: "",
    status: "",
    intrested_project: [],
    intrested_block: [],
    intrested_inventory: [],
    date: "",
    feedback: "",
  });

  const [contactdata, setcontactdata] = useState([]);
  const fetchcontactdata = async (event) => {
    try {
      const resp = await api.get("viewcontact");
      setcontactdata(resp.data.contact);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcontactdata();
  }, []);

  const handleToggle3 = (e) => {
    const isChecked = e.target.checked; // Get the checked state
    setsitevisit({ ...sitevisit, complete: isChecked }); // Update the calltask state

    // Open the modal only if the checkbox is checked
    if (isChecked) {
      document.getElementById("sitevisitdetails").style.display = "block";
    } else {
      document.getElementById("sitevisitdetails").style.display = "none";
    }
  };

  const [leadid, setleadid] = useState("");
  const handleLeadChange = (e) => {
    const selectedLead = Leaddata.find((item) => item._id === e.target.value);
    setleadid(selectedLead._id);
    if (selectedLead) {
      const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
      setsitevisit((prevState) => ({
        ...prevState,
        lead: fullName,
        title2: selectedLead.title,
        first_name: selectedLead.first_name,
        last_name: selectedLead.last_name,
        mobile_no: selectedLead.mobile_no,
        email: selectedLead.email,
        stage: selectedLead.stage,
        lead_id: selectedLead._id,
      }));
    }
  };
  const [updatestage2, setupdatestage2] = useState("");
  const [updatestage1, setupdatestage1] = useState("");
  const handleleadstatuschange = (e) => {
    const newStatus = e.target.value;

    // Update the status first
    setsitevisit((prevState) => {
      return {
        ...prevState,
        status: newStatus,
      };
    });

    // Now check if status is "Conducted" and update the stage
    if (newStatus === "Conducted") {
      setupdatestage2("Opportunity");
      setupdatestage1("Quote");
    } else if (newStatus === "Did Not Visit" || "Not Intersted>") {
      setupdatestage2("Prospect");
      setupdatestage1("Open");
    }
  };

  const [Leaddata, setLeaddata] = useState([]);
  const fetchLeaddata = async () => {
    try {
      const resp = await api.get("leadinfo");
      setLeaddata(resp.data.lead);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaddata();
  }, []);

  const [selecteddeal, setselecteddeal] = useState([]);
  const getselecteddeal = async () => {
    try {
      const resp = await api.get(`viewdealbyid/${selectedItems}`);
      setselecteddeal(resp.data.deal);
      setsitevisit((prevState) => ({
        ...prevState,
        project: Array.isArray(resp.data.deal.project)
          ? resp.data.deal.project // If it's already an array, use it
          : [resp.data.deal.project],
        // If it's not an array, wrap it in an array
        block: Array.isArray(resp.data.deal.block)
          ? resp.data.deal.block // If it's already an array, use it
          : [resp.data.deal.block],
        // If it's not an array, wrap it in an array
        inventory: Array.isArray(resp.data.deal.unit_number)
          ? resp.data.deal.unit_number // If it's already an array, use it
          : [resp.data.deal.unit_number],
        // If it's not an array, wrap it in an array
      }));
      setmeetingtask((prevState) => ({
        ...prevState,
        project: Array.isArray(resp.data.deal.project)
          ? resp.data.deal.project // If it's already an array, use it
          : [resp.data.deal.project],
        // If it's not an array, wrap it in an array
        block: Array.isArray(resp.data.deal.block)
          ? resp.data.deal.block // If it's already an array, use it
          : [resp.data.deal.block],
        // If it's not an array, wrap it in an array
        inventory: Array.isArray(resp.data.deal.unit_number)
          ? resp.data.deal.unit_number // If it's already an array, use it
          : [resp.data.deal.unit_number],
        // If it's not an array, wrap it in an array
      }));

      setmailtask((prevState) => ({
        ...prevState,
        project: Array.isArray(resp.data.deal.project)
          ? resp.data.deal.project // If it's already an array, use it
          : [resp.data.deal.project],
        // If it's not an array, wrap it in an array
        block: Array.isArray(resp.data.deal.block)
          ? resp.data.deal.block // If it's already an array, use it
          : [resp.data.deal.block],
        // If it's not an array, wrap it in an array
        inventory: Array.isArray(resp.data.deal.unit_number)
          ? resp.data.deal.unit_number // If it's already an array, use it
          : [resp.data.deal.unit_number],
        // If it's not an array, wrap it in an array
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getselecteddeal();
  }, [selectedItems]);

  const sitevisitdetails = async () => {
    const title1 = document.getElementById("sitevisittitle").innerText;

    // Update state
    const updatedsiteTask = { ...sitevisit, title: title1 };
    const updatedData = {
      stage: "Quote", // Directly add 'Quote' to the request data
    };

    try {
      // First API request to post sitevisit details
      const resp = await api.post("sitevisit", updatedsiteTask);

      if (leadid) {
        const resp1 = await api.put(`updatelead/${leadid}`, updatedData);
        console.log(resp1);
      }

      if (resp.status === 200) {
        toast.success(resp.data.message);

        // Reload the page after a brief delay
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    } catch (error) {
      // Catch any errors from the main API requests (sitevisit and lead updates)
      toast.error(
        "Please select Project Block and Unit sequencely or Missing Lead..."
      );
    }
  };

  const formatDatesite = (dateString) => {
    const date = new Date(dateString);

    // Day of the month with suffix
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const formattedDay = `${day}${suffix}`;

    // Month (abbreviated to 3 letters)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];

    // Year (4 digits)
    const year = date.getFullYear();

    return `${formattedDay} ${month} ${year}`;
  };

  const handleDateChangesite = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDatesite(selectedDate);
    setsitevisit({ ...sitevisit, start_date: formattedDate });
  };

  const formatDatesite1 = (dateString) => {
    const date = new Date(dateString);

    // Day of the month with suffix
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const formattedDay = `${day}${suffix}`;

    // Month (abbreviated to 3 letters)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];

    // Year (4 digits)
    const year = date.getFullYear();

    return `${formattedDay} ${month} ${year}`;
  };

  const formatTimesite = (timeString) => {
    let [hours, minutes] = timeString.split(":").map(Number);
    const isPM = hours >= 12;

    // Convert to 12-hour format
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
    const period = isPM ? "PM" : "AM";

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  // ===============================================add to task for sitevisit end=========================================================

  //================================ add to task for meeting start======================================================================

  const [meetingtask, setmeetingtask] = useState({
    activity_type: "Meeting",
    title: "",
    executive: "",
    lead: "",
    location_type: "",
    location_address: "",
    reason: "",
    project: [],
    block: [],
    inventory: [],
    remark: "",
    stage: "",
    due_date: "",
    due_time: "",
    title2: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    email: "",
    stage: "",
    complete: "",
    status: "",
    meeting_result: "",
    date: "",
    feedback: "",
  });

  const formatTimemeeting = (timeString) => {
    let [hours, minutes] = timeString.split(":").map(Number);
    const isPM = hours >= 12;

    // Convert to 12-hour format
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
    const period = isPM ? "PM" : "AM";

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  const handleTimeChangemeeting = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = formatTimemeeting(selectedTime);
    setmeetingtask({ ...meetingtask, due_time: formattedTime });
  };

  //========================================= add to task for meeting end==============================================================

  //============================== add to task for call start======================================================================

  const [calltask, setcalltask] = useState({
    activity_type: "Call",
    title: "",
    reason: "",
    lead: "",
    executive: "",
    remarks: "",
    complete: "",
    due_date: "",
    due_time: "",
    title2: "",
    first_name: "",
    last_name: "",
    mobile_no: [],
    email: [],
    stage: "",
    lead_id: "",
    direction: "",
    status: "",
    date: "",
    duration: "",
    result: "",
    intrested_inventory: "",
    feedback: "",
  });

  const formatdate = (dateString) => {
    const date = new Date(dateString);

    // Day of the month with suffix
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const formattedDay = `${day}${suffix}`;

    // Month (abbreviated to 3 letters)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];

    // Year (4 digits)
    const year = date.getFullYear();

    return `${formattedDay} ${month} ${year}`;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatdate(selectedDate);
    setcalltask({ ...calltask, due_date: formattedDate });
  };

  const formatTime = (timeString) => {
    let [hours, minutes] = timeString.split(":").map(Number);
    const isPM = hours >= 12;

    // Convert to 12-hour format
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
    const period = isPM ? "PM" : "AM";

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = formatTime(selectedTime);
    setcalltask({ ...calltask, due_time: formattedTime });
  };

  // =============================add to task for mail start============================================================================

  const [mailtask, setmailtask] = useState({
    activity_type: "Mail",
    title: "",
    executive: "",
    lead: "",
    project: [],
    block: [],
    inventory: [],
    subject: "",
    remarks: "",
    complete: "",
    due_date: "",
    due_time: "",
    direction: "",
    status: "",
    date: "",
    feedback: "",
    title2: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    email: "",
    stage: "",
  });

  const mailtaskdetails = async () => {
    const title1 = document.getElementById("mailtitle").innerText;

    // Update state
    const updatedMailTask = { ...mailtask, title: title1 };
    try {
      const resp = await api.post("mailtask", updatedMailTask);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggle1 = (e) => {
    const isChecked = e.target.checked; // Get the checked state
    setmailtask({ ...mailtask, complete: isChecked }); // Update the calltask state

    // Open the modal only if the checkbox is checked
    if (isChecked) {
      document.getElementById("maildetails").style.display = "block";
    } else {
      document.getElementById("maildetails").style.display = "none";
    }
  };

  const [leaddatamail, setleaddatamail] = useState([]);
  const fetchleaddatamail = async (event) => {
    try {
      const resp = await api.get("leadinfo");
      const all = resp.data.lead;
      setleaddatamail(all);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchleaddatamail();
  }, []);

  const formatDatemail = (dateString) => {
    const date = new Date(dateString);

    // Day of the month with suffix
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    const formattedDay = `${day}${suffix}`;

    // Month (abbreviated to 3 letters)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];

    // Year (4 digits)
    const year = date.getFullYear();

    return `${formattedDay} ${month} ${year}`;
  };

  const handleDateChangemail = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDatemail(selectedDate);
    setmailtask({ ...mailtask, due_date: formattedDate });
  };

  const formatTimemail = (timeString) => {
    let [hours, minutes] = timeString.split(":").map(Number);
    const isPM = hours >= 12;

    // Convert to 12-hour format
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // midnight or noon should display as 12, not 0
    const period = isPM ? "PM" : "AM";

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  const handleTimeChangemail = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = formatTimemail(selectedTime);
    setmailtask({ ...mailtask, due_time: formattedTime });
  };

  // ============================================add to task mail end====================================================================

  // ======================================unit edit start========================================================================

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

   const [units,setunits] = useState({
     project_name: project?.name || "",
     unit_no: "",
     unit_type: "",
     category: "",
     sub_category: "",
     block: "",
     size: "",
     size_length: "",
     size_breadth: "",
     size_unit: "",
     size_total_area: "",
     size_total_area_unit: "",
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
     front_on_road: "",
     total_owner: "",
     facing: "",
     road: "",
     ownership: "",
     stage: "Inactive",
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

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Set the Content-Type here
    },
  };

const toIdArray = (arr) =>
  Array.isArray(arr)
    ? arr.map((i) => (typeof i === "object" ? i._id : i)).filter(Boolean)
    : [];

  
  const updateinventories = async () => {
    
    const project = selectedItems3[0].project_name;
    // const project = selectedItems3[0].project_name.trim().replace(/\s+/g, " ");
    const block = selectedItems3[0].block;
    const unit = selectedItems3[0].unit_no;
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
      setIsLoading4(true);

      const {
  _id,
  createdAt,
  updatedAt,
  __v,
  ...unitPayload
} = units;

unitPayload.owner_details = toIdArray(units.owner_details);
unitPayload.previousowner_details = toIdArray(units.previousowner_details);
unitPayload.associated_contact = toIdArray(units.associated_contact);



      const resp=await api.put(
          `updateprojectforinventories/${project}/${unit}/${block}`,
          unitPayload,
          config
        )

      toast.success(`units updated successfully`, { autoClose: "2000" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        text: error.response.data.errors,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ok",
      });
      console.log(error);
    } finally {
      setIsLoading4(false);
    }
  };

  // ========================================edit unit end===========================================================================

  // ========================================delete unit start=========================================================================

  const deleteinventories = async () => {
    console.log(selectedItems3);

    // const project=selectedItems3[0].project_name
    // const block=selectedItems3[0].block
    // const unit=selectedItems3[0].unit_no

    try {
      // Show confirmation message
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) {
        return; // Stop execution if user cancels
      }
      setIsLoading4(true);
      await Promise.all(
        selectedItems3.map((item) =>
          api.delete(
            `deleteprojectforinventories/${item.project_name}/${item.unit_no}/${item.block}`
          )
        )
      );
      Swal.fire({
        icon: "success",
        title: "Selected items deleted successfully...!",
        text: "Selected Units Deleted Successfully",
        width: "400px", // makes it small
        padding: "1.2em",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      toast.error(`failed to delete units`, { autoClose: "2000" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log(error);
    } finally {
      setIsLoading4(false);
    }
  };

  // ==============================================delete unit end==================================================================

  //========================================= units suggestion box code start=============================================================

  const [searchTermunits, setSearchTermunits] = useState("");
  const [suggestionsunit, setSuggestionsunit] = useState([]);

  // const handleSearchChangeunit = (e) => {
  //   const value = e.target.value;
  //   setSearchTermunits(value);

  //   if (value.trim() === '') {
  //     setSuggestionsunit([]);
  //     fetchcdata()
  //     return;
  //   }

  //   const filtered = allunitsforsearch.filter(item =>
  //   {
  //     const projectmatch =item.project_name && item.project_name.toLowerCase().includes(value.toLowerCase());

  //     const blockmatch =item.block && item.block.toLowerCase().includes(value.toLowerCase());

  //     const unitmatch =item.unit_no && item.unit_no.toLowerCase().includes(value.toLowerCase());

  //     const ownermatch =
  //       Array.isArray(item.owner_details) &&
  //       item.owner_details.some(owner =>
  //         (owner.first_name && owner.first_name.toLowerCase().includes(value.toLowerCase())) ||
  //         (owner.last_name && owner.last_name.toLowerCase().includes(value.toLowerCase())) ||
  //         (owner.mobile_no && String(owner.mobile_no).toLowerCase().includes(value.toLowerCase()))
  //       );

  //     const associatematch =
  //       Array.isArray(item.associated_contact) &&
  //       item.associated_contact.some(contact =>
  //         (contact.first_name && contact.first_name.toLowerCase().includes(value.toLowerCase())) ||
  //         (contact.last_name && contact.last_name.toLowerCase().includes(value.toLowerCase())) ||
  //         (contact.mobile_no && String(contact.mobile_no).toLowerCase().includes(value.toLowerCase()))
  //       );

  //     return projectmatch || blockmatch || unitmatch || ownermatch || associatematch

  //  } );

  //   setSuggestionsunit(filtered); // Limit to 5 suggestions
  //   setFlattenedUnits(filtered)
  // };

  // const handleSuggestionClickunit = (item) => {
  //   const ownerStr = Array.isArray(item.owner_details)
  //     ? item.owner_details
  //         .map(
  //           (owner) =>
  //             `${owner.title || ""} ${owner.first_name || ""} ${
  //               owner.last_name || ""
  //             }`
  //         )
  //         .join(", ")
  //     : "";
  //   const associateStr = Array.isArray(item.associated_contact)
  //     ? item.associated_contact
  //         .map(
  //           (contact) =>
  //             `${contact.title || ""} ${contact.first_name || ""} ${
  //               contact.last_name || ""
  //             }`
  //         )
  //         .join(", ")
  //     : "";

  //   setSearchTermunits(
  //     `${item.project_name} -${item.block} -${item.unit_no} - ${ownerStr} - ${associateStr}`
  //   );
  //   setSuggestionsunit([]);
  //   setFlattenedUnits([item]);

  //   // You can also do something with the selected item (e.g. set selectedDeal)
  // };

  const handleSearchChangeunit = (e) => {
    const value = e.target.value;
    setSearchTermunits(value);

    // reset to first page whenever search changes
    setCurrentPage2(1);

    if (value.trim() === "") {
      setSuggestionsunit([]); // clear suggestions when empty
    }
  };

  // ====================================units suggestion box code end=============================================================

  //============================================== feedback form start================================================================

  const [show, setShow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const toastRef = useRef(null);

  const toggleToast = async () => {
    setShow(true);
    document.getElementById("unitlistview").style.filter = "blur(5px)";

    const project = selectedItems3[0].project_name;
    const block = selectedItems3[0].block;
    const unit = selectedItems3[0].unit_no;

    const resp = await api.get(
      `viewprojectforinventories/${project}/${unit}/${block}`
    );
    setunits(resp.data.project.add_unit[0]);
  };

  const handleCancel = () => {
    document.getElementById("unitlistview").style.filter = "none";
    setIsClosing(true); // trigger slide-out
    setTimeout(() => {
      setShow(false); // hide the toast completely
      setIsClosing(false); // reset for next open
    }, 500); // duration should match animation time
  };

  const [feedbackform, setfeedbackform] = useState({
    owner: "",
    direction: "",
    status: "",
    unit_no: "",
    owner_response: "",
    discussed_reason: "",
    other_discussed_reason: "",
    seller_price: "",
    my_price: "",
    next_call_date: "",
    no_reason: "",
    other_no_reason: "",
    stage: "",
    remarks: "",
  });

  const [ownerlist, setownerlist] = useState([]);
  useEffect(() => {
    if (selectedItems3[0]?.unit_no) {
      setfeedbackform((prev) => ({
        ...prev,
        unit_no: selectedItems3[0]?.unit_no,
      }));

      const ownerArr = selectedItems3[0]?.owner_details
        ? Array.isArray(selectedItems3[0].owner_details)
          ? selectedItems3[0].owner_details
          : [selectedItems3[0].owner_details]
        : [];

      const contactArr = selectedItems3[0]?.associated_contact
        ? Array.isArray(selectedItems3[0].associated_contact)
          ? selectedItems3[0].associated_contact
          : [selectedItems3[0].associated_contact]
        : [];

      const alllist = [...ownerArr, ...contactArr];
      setownerlist(alllist);
    }
  }, [selectedItems3]);

  // console.log(ownerlist);

  useEffect(() => {
    if (
      feedbackform.owner_response === "Yes" ||
      feedbackform.owner_response ===
        "Yes -Sell this property but buy another" ||
      feedbackform.owner_response === "Rent"
    ) {
      setfeedbackform((prev) => ({
        ...prev,
        stage: "Active",
      }));
    }
    if (
      feedbackform.owner_response === "Sold" ||
      feedbackform.owner_response === "No -But discussed about price" ||
      feedbackform.owner_response === "No -But wants to buy another property" ||
      feedbackform.owner_response === "Thinking may/be in future" ||
      feedbackform.owner === "Sold -But Interested to sell Another Property" ||
      feedbackform.owner_response ===
        "Sold -But Interested to Buy Another Property"
    ) {
      setfeedbackform((prev) => ({
        ...prev,
        stage: "Active",
      }));
    }
    if (feedbackform.owner_response === "No") {
      setfeedbackform((prev) => ({
        ...prev,
        stage: "Inactive",
      }));
    } else {
      setfeedbackform((prev) => ({
        ...prev,
        stage: "Active",
      }));
    }
  }, [feedbackform.owner_response]);

  // get owner response

  const [select_loading, setselect_loading] = useState("");

  const [All_Owner_Response, setAll_Owner_Response] = useState([]);
  const getall_owner_response = async () => {
    try {
      setselect_loading("owner_response");
      const params = new URLSearchParams();
      params.append("lookup_type", "owner_response");
      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Owner_Response(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  const [All_Reason, setAll_Reason] = useState([]);
  const getall_reason = async () => {
    try {
      setselect_loading("reason");
      const params = new URLSearchParams();
      params.append("lookup_type", "reason");
      params.append("parent_lookup_value", feedbackform.owner_response);
      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Reason(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  useEffect(() => {
    getall_reason();
  }, [feedbackform.owner_response]);

  // const reasonsList = [
  //   "Had bad experience with previous agent",
  //   "Will sell after completion of construction",
  //   "Will sell after registry",
  //   "Don’t want to involve brokers / privacy concern",
  //   "Already dealing with another broker",
  //   "Waiting for better market price",
  //   "Price expectations not matching",
  //   "Other",
  // ];

  // const noreasonsList = [
  //   "Family not agreed yet / Internal family issue",
  //   "Property is under dispute / Legal issue",
  //   "Still under use (self-living / family living)",
  //   "Currently rented out / tenant issue",
  //   "Emotional attachment with property",
  //   "Recently bought, not planning to sell yet",
  //   "Joint ownership, others not willing",
  //   "Will sell only if urgent need arises",
  //   "Planning to construct house",
  //   "Can’t decide right now / need more time",
  //   "Not interested in selling at all",
  //   "Other",
  // ];

  const addfeedback = async () => {
    try {
      const project = selectedItems3[0].project_name;
      const block = selectedItems3[0].block;
      const unit = selectedItems3[0].unit_no;
      let updatedUnits = {
        ...units,
        stage: feedbackform.stage,
        remarks: feedbackform.owner_response,
        last_conduct_date_time: new Date(),
        follow_up: feedbackform.next_call_date,
        reason: feedbackform?.no_reason
          ? feedbackform.no_reason
          : feedbackform.discussed_reason,
        other_reason: feedbackform?.other_no_reason
          ? feedbackform.other_discussed_reason
          : "",
        logged_user: logged_user?.name ? logged_user.name : logged_user.Name,
      };
      const resp = await api.post("addfeedback", feedbackform);
      console.log(resp);
      
      if (resp.status === 200) {
        let htmlContent = "<p>Feedback submitted successfully!</p>";

        // Generate dynamic buttons based on owner_response
        switch (feedbackform.owner_response) {
          case "Interested For Sale":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            htmlContent += `
            <button id="createDealBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Create Deal
            </button>
          `;
            break;

          case "Interested For Rent":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            htmlContent += `
            <button id="createDealBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Create Deal
            </button>
          `;
            break;

          case "Sold -But Interested to sell Another Property":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            htmlContent += `
            <button id="createDealBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Create Deal
            </button>
          `;
            break;

          case "Yes -Sell this property but buy another":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            htmlContent += `
            <button id="createDealBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Create Deal
            </button>
            <button id="leadRequirementBtn" style="${buttonStyle}; margin-left: 10%;">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Lead Requirement
            </button>
          `;
            break;

          case "No -But wants to buy another property":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            htmlContent += `
            <button id="leadRequirementBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Lead Requirement
            </button>
          `;
            break;

          case "Sold Out":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            htmlContent += `
            <button id="addOwnerBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Add New Owner
            </button>
          `;
            break;

          case "Sold -But Interested to Buy Another Property":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            htmlContent += `
            <button id="addLeadBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Add Lead
            </button>
          `;
            break;

          case "Thinking may/be in future":
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );

            break;

          default:
            // no buttons for other values
            await api.put(
              `updateprojectforinventories/${project}/${unit}/${block}`,
              updatedUnits,
              config
            );
            break;
        }

        Swal.fire({
          title: "Feedback Submitted",
          html: htmlContent,
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          didOpen: () => {
            const addHoverEffects = (btn) => {
              btn.addEventListener("mouseenter", () => {
                btn.style.background =
                  "linear-gradient(135deg, #218838, #1e7e34)";
                btn.style.transform = "scale(1.03)";
              });
              btn.addEventListener("mouseleave", () => {
                btn.style.background =
                  "linear-gradient(135deg, #28a745, #218838)";
                btn.style.transform = "scale(1)";
              });
            };

            const dealBtn = document.getElementById("createDealBtn");
            if (dealBtn) {
              addHoverEffects(dealBtn);
              dealBtn.addEventListener("click", () => {
                const unit = encodeURIComponent(
                  JSON.stringify(selectedItems3[0])
                );
                window.open(`/deal?unit=${unit}`, "_blank");
              });
            }

            const leadBtn = document.getElementById("leadRequirementBtn");
            if (leadBtn) {
              addHoverEffects(leadBtn);
              leadBtn.addEventListener("click", () => {
                const owner = encodeURIComponent(feedbackform.owner);
                window.open(`/leadrequirment?owner=${owner}`, "_blank");
              });
            }

            const addOwnerBtn = document.getElementById("addOwnerBtn");
            if (addOwnerBtn) {
              addHoverEffects(addOwnerBtn);
              addOwnerBtn.addEventListener("click", () => {
                handleShow7();
              });
            }

            const addLeadBtn = document.getElementById("addLeadBtn");
            if (addLeadBtn) {
              addHoverEffects(addLeadBtn);
              addLeadBtn.addEventListener("click", () => {
                window.open("/leadinfo", "_blank");
              });
            }
          },
        }).then((result) => {
          if (result.isConfirmed) {
            handleCancel(); // Close or reset form
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Feedback Error",
        text: error?.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  // Button style reused
  const buttonStyle = `
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
`;

  // ============================================feedback form end=====================================================================

  //============================================= add new owner start =======================================================================

  const [show7, setshow7] = useState(false);
  const handleClose7 = () => setshow7(false);
  const handleShow7 = async () => {
    setshow7(true);
    handleCancel();
    const project = selectedItems3[0].project_name;
    const block = selectedItems3[0].block;
    const unit = selectedItems3[0].unit_no;

    const resp = await api.get(
      `viewprojectforinventories/${project}/${unit}/${block}`
    );
    setunits(resp.data.project.add_unit[0]);
  };

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
      setdeal((prevDeal) => ({
        ...prevDeal,
        owner_details: [...(prevDeal.owner_details || []), newcontact._id], // Append new contact to the existing owner_details array
      }));
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

  // =================================================add new owner end===================================================================

  // ===============================================filter code start==================================================================

  const [showunit, setShowunit] = useState(false);
  const [isClosingunit, setIsClosingunit] = useState(false);
  const toastRefunit = useRef(null);

  const toggleToastunit = async () => {
    // setShowunit(true);
    openFilterWithDefaults();
  };

  const handleCancelunit = () => {
    setIsClosingunit(true); // trigger slide-out
    setTimeout(() => {
      setShowunit(false); // hide the toast completely
      setIsClosingunit(false); // reset for next open
    }, 500); // duration should match animation time
  };

  const [groupdata, setgroupdata] = useState([]);
 const get_group_data = async (projects = []) => {
  try {
    let url = "unit-getgroupdata";

    if (projects.length > 0) {
      url += `?projects=${encodeURIComponent(projects.join(","))}`;
    }

    const resp = await api.get(url);
    setgroupdata(resp.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    get_group_data();
  }, []);

console.log(groupdata);

  const unitfields = [
    { label: "City", field: "ucity", values: groupdata.allcitis },
    { label: "Location", field: "location", values: alllocation },
    {
      label: "Project Name",
      field: "project_name",
      values: groupdata.all_project,
    },
    { label: "Block/Tower", field: "block", values: groupdata.allblock },
    { label: "Category", field: "category", values: groupdata.allcategories },
    { label: "Sub Category", field: "sub_category", values: groupdata.allsubcategories },
    { label: "Unit Type", field: "unit_type", values: groupdata.allunittype },
    { label: "Size", field: "size", values: groupdata.allsize },
    { label: "Stages/Status", field: "stage", values: groupdata.allstage },
    { label: "Direction", field: "direction", values: groupdata.alldirection },
    { label: "Road", field: "road", values: groupdata.allroad },
    { label: "Facing", field: "facing", values: groupdata.allfacing },
    { label: "Remarks", field: "remarks", values: groupdata.allremarks },
  ];
console.log(unitfields);
  const defaultFields = [
    unitfields.find((f) => f.field === "project_name"),
  ];

  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const [activeFilters, setActiveFilters] = useState(
    defaultFields.map((f) => ({
      ...f,
      radio: "with",
      input: "",
      checked: [],
    }))
  );

  // Open filter panel, regenerating the defaults (with current city list)
  function openFilterWithDefaults() {
    setActiveFilters(
      defaultFields.map((f) => ({
        ...f,
        radio: "with",
        input: "",
        checked: [],
      }))
    );
    setShowunit(true);
  }

  const [openDropdownIdx, setOpenDropdownIdx] = useState(null);

  // Add new filter row
  function handleAddField(fieldObj) {
    setActiveFilters([
      ...activeFilters,
      {
        ...fieldObj,
        radio: "with",
        input: "",
        checked: [],
      },
    ]);
    setShowFieldDropdown(false);
    setOpenDropdownIdx(activeFilters.length);
  }

  // Remove filter
  function handleRemoveFilter(idx) {
    setActiveFilters((activeFilters) =>
      activeFilters.filter((_, i) => i !== idx)
    );
    if (openDropdownIdx === idx) setOpenDropdownIdx(null);
  }

  // Toggle dropdown for a row
  function handleToggleDropdown(idx) {
    setOpenDropdownIdx(openDropdownIdx === idx ? null : idx);
  }

  // Radio/checkbox/text handlers:
  function handleRadio(idx, value) {
    setActiveFilters((filters) =>
      filters.map((f, i) => (i === idx ? { ...f, radio: value } : f))
    );
  }
  function handleInput(idx, value) {
    setActiveFilters((filters) =>
      filters.map((f, i) => (i === idx ? { ...f, input: value } : f))
    );
  }
 const [selectedProjects, setSelectedProjects] = useState([]);

const handleProjectCheckbox = (projectName, checked) => {
  const updatedProjects = checked
    ? [...selectedProjects, projectName]
    : selectedProjects.filter((p) => p !== projectName);

  setSelectedProjects(updatedProjects);

  // Call your API to fetch filtered unit data based on selected projects
  get_group_data(updatedProjects);
};

function handleCheckbox(idx, val) {
  setActiveFilters((filters) =>
    filters.map((f, i) => {
      if (i !== idx) return f;

      const checked = f.checked.includes(val)
        ? f.checked.filter((v) => v !== val)
        : [...f.checked, val];

      // If this is the project_name field, handle project selection
      if (f.field === "project_name") {
        handleProjectCheckbox(val, !f.checked.includes(val));
      }

      return { ...f, checked };
    })
  );
}


  //=============================================== deal action buttons toggle start=============================================================

  useEffect(() => {
    const hasFilters = activeFilters && activeFilters.length > 0;
    const hasSearch = searchTermunits && searchTermunits.trim() !== "";

    if (hasFilters || hasSearch) {
      // If either filters or search are active → include both
      fetchunitsdata(
        currentPage2,
        itemsPerPage2,
        searchTermunits,
        activeFilters
      );
    } else {
      // No filters, no search → fetch all
      fetchunitsdata(currentPage2, itemsPerPage2);
    }
  }, [currentPage2, itemsPerPage2, activeFilters, searchTermunits]);

  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const [isHoveringuploadpicture, setIsHoveringuploadpicture] = useState(false);
  const [isHoveringcall, setIsHoveringcall] = useState(false);
  const [isHoveringaddtag, setIsHoveringaddtag] = useState(false);
  const [isHoveringaddremarks, setIsHoveringaddremarks] = useState(false);
  const [isHoveringadddocuments, setIsHoveringadddocuments] = useState(false);
  const [isHoveringpreview, setIsHoveringpreview] = useState(false);
  const [isHoveringsendmail, setIsHoveringsendmail] = useState(false);
  const [isHoveringprojectmatchedlead, setIsHoveringprojectmatchedlead] =useState(false);
  const [isHoveringunitadduser, setIsHoveringunitadduser] = useState(false);
  const [isHoveringunitcreatedeal, setIsHoveringunitcreatedeal] = useState(false);
  const [isHoveringunitupdate, setIsHoveringunitupdate] = useState(false);
  const [isHoveringunitcustomerfeedback, setIsHoveringunitcustomerfeedback] =useState(false);

  // =============================================================deal action button toggle end==================================================

  //=============================== convert date format start==============================================================================
  // const excelSerialToDateString = (serial) => {
  //   const excelEpoch = new Date(1900, 0, 1); // Jan 1, 1900
  //   const jsDate = new Date(excelEpoch.getTime() + (serial - 1) * 86400000);
  //   return jsDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  // };

  return (
    <div>
      <Header1 />
      <Sidebar1 />
      <div id="unitlistview" className="flip-card-back1">
        <div
          style={{
            marginTop: "53px",
            paddingLeft: "80px",
            backgroundColor: "white",
            display: "flex",
            paddingTop: "10px",
            paddingBottom: "10px",
            height: "70px",
          }}
        >
          <h3 className="text-2xl font-semibold cursor-pointer hover:text-blue-600 transition-colors">
            Inventories
          </h3>

          <button
            class="btn btn-secondary "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              color: "black",
              backgroundColor: "transparent",
              border: "none",
              padding: "0px",
              marginTop: "-10px",
            }}
          >
            <img
              src="https://static.thenounproject.com/png/61783-200.png"
              style={{ height: "25px", width: "25px" }}
              alt=""
            />
          </button>

          <ul
            class="dropdown-menu"
            id="exporttoexcel"
            style={{
              textAlign: "left",
              padding: "0px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              fontFamily: "arial",
              fontSize: "14px",
              lineHeight: "30px",
            }}
          >
            <li
              data-bs-toggle="modal"
              data-bs-target="#exportUnitsModal"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
            >
              <img
                src="https://static.thenounproject.com/png/1960252-200.png"
                alt="Export"
                className="h-5 w-5"
              />
              <span>Export Data</span>
            </li>
          </ul>
        </div>

        <div
          ref={toastRefunit}
          className={`feedback-toast ${
            showunit ? (isClosingunit ? "hide" : "show") : ""
          }`}
          style={{
            marginTop: "0%",
            width: 300,
            height: "100%",
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            padding: 10,
            overflowY: "scroll",
            overflowX: "scroll",
          }}
        >
          {/* Header */}
          <h3
            style={{
              fontSize: "14px",
              margin: 0,
              padding: "16px",
              textAlign: "left",
              color: "black",
              borderBottom: "1px solid #ddd",
              letterSpacing: "0.5px",
            }}
          >
            🔍 Filter Units
            <span>
              <button
                className="btn btn-danger"
                style={{
                  backgroundColor: "white",
                  padding: "6px 12px",
                  fontSize: "14px",
                  border: "none",
                  marginLeft: "30%",
                }}
                onClick={handleCancelunit}
              >
                ❌
              </button>
            </span>
          </h3>

          {/* Active Filter Rows */}
          {activeFilters.map((item, idx) => (
            <div
              key={item.field}
              style={{
                background: "#f8f9fb",
                borderRadius: 8,
                marginBottom: 10,
                padding: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ margin: 0, fontWeight: 400, fontSize: "12px" }}>
                  {item.label}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                    onClick={() => handleToggleDropdown(idx)}
                  >
                    {openDropdownIdx === idx ? "▲" : "▼"}
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "#f44",
                      fontSize: 18,
                      fontWeight: 400,
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveFilter(idx)}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Dropdown contents */}
              {openDropdownIdx === idx && (
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    marginTop: 8,
                    padding: 12,
                  }}
                >
                  <div style={{ display: "flex", gap: 18, marginBottom: 10 }}>
                    <label>
                      <input
                        type="radio"
                        checked={item.radio === "with"}
                        onChange={() => handleRadio(idx, "with")}
                      />{" "}
                      With
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={item.radio === "without"}
                        onChange={() => handleRadio(idx, "without")}
                      />{" "}
                      Without
                    </label>
                  </div>
                  <input
                    type="text"
                    value={item.input}
                    onChange={(e) => handleInput(idx, e.target.value)}
                    placeholder={`Type for ${item.label}`}
                    style={{
                      width: "98%",
                      marginBottom: 10,
                      padding: "6px 8px",
                      border: "1px solid #ccd",
                      borderRadius: 6,
                      fontSize: "12px",
                    }}
                  />
                {item.values && item.values.length > 0 ? (
  item.values.length > 500 ? ( // adjust threshold as needed
    <p style={{ fontSize: "12px", color: "red", marginTop: "6px" }}>
      ⚠️ Too many  options. Please select a project first.
    </p>
  ) : (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginTop: "6px",
      }}
    >
      {item.values.map((val) => (
        <label
          key={val}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 10px",
            background: item.checked.includes(val)
              ? "#e7f1ff"
              : "#f4f5f7",
            borderRadius: "20px",
            border: "1px solid #d6d6d6",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          <input
            type="checkbox"
            checked={item.checked.includes(val)}
            onChange={() => handleCheckbox(idx, val)}
            style={{ marginRight: 6 }}
          />
          {val}
        </label>
      ))}
    </div>
  )
) : null}

                </div>
              )}
            </div>
          ))}

          {/* Add Field Section - bottom */}
          <button
            style={{
              padding: "7px 18px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 400,
              marginBottom: 16,
              cursor: "pointer",
              marginTop: "20px",
              width: "100%",
            }}
            onClick={() => setShowFieldDropdown((s) => !s)}
          >
            + Add Field
          </button>

          {showFieldDropdown && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 7,
                marginBottom: 14,
                overflow: "auto",
                height: "200px",
              }}
            >
              {unitfields
                .filter(
                  (f) => !activeFilters.some((af) => af.field === f.field)
                )
                .map((fieldObj) => (
                  <div
                    key={fieldObj.field}
                    style={{ padding: 10, cursor: "pointer" }}
                    onClick={() => handleAddField(fieldObj)}
                  >
                    {fieldObj.label}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="mt-1 bg-white py-1 px-6 sm:px-20 lg:px-30 flex flex-col sm:flex-row gap-2 sm:gap-2">
          {/* 🔵 Active Card */}
          <div
            onClick={() => setFlattenedUnits(activeunits)}
            className="
      w-full sm:w-52
      border border-green-300
      rounded-xl
      p-1
      flex flex-col items-center justify-center
      shadow-sm
      cursor-pointer
      hover:shadow-lg
      hover:scale-105
      hover:bg-green-100
      transition-all duration-300
    "
          >
            <h6 className="text-lg font-semibold text-green-700 text-center">
              🔵Active
            </h6>
            <p className="text-xl font-bold text-green-900 text-center">
              {status_count?.Active}
            </p>
          </div>

          {/* 🔴 Inactive Card */}
          <div
            onClick={() => setFlattenedUnits(inactiveunits)}
            className="
      w-full sm:w-52
      border border-red-300
      rounded-xl
      p-1
      flex flex-col items-center justify-center
      shadow-sm
      cursor-pointer
      hover:shadow-lg
      hover:scale-105
      hover:bg-red-100
      transition-all duration-300
    "
          >
            <h6 className="text-lg font-semibold text-red-700 text-center">
              🔴Inactive
            </h6>
            <p className="text-xl font-bold text-red-900 text-center">
              {status_count?.Inactive}
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "2px",
            backgroundColor: "white",
            height: "60px",
            paddingLeft: "80px",
            display: "flex",
            gap: "20px",
            paddingTop: "10px",
            position: "sticky",
            top: "50px",
            zIndex: "111",
          }}
        >
          {/* <input id="unitsearch" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by name,email,mobile,company and tags" style={{width:"25%"}} onChange={(e)=>handleunitsearchchange(e)} onKeyDown={handlekeypress4}/> */}

          <input
            // ref={wrapperRef}
            id="unitsearch"
            type="text"
            className="form-control form-control-sm"
            placeholder="Search for project via project name, block or unit no"
            style={{ width: "25%" }}
            value={searchTermunits}
            onChange={(e) => handleSearchChangeunit(e)}
            // onKeyDown={handleKeyPress2}
            autoComplete="off"
          />
          {/* {suggestionsunit.length > 0 && (
          <ul
            className="list-group position-absolute"
            style={{
              width: "20%",
              zIndex: 1000,
              marginTop: "40px",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#fff",
              borderRadius: "4px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {suggestionsunit.map((item, index) => {
               const ownerStr = Array.isArray(item.owner_details) ? item.owner_details.map(owner=>`${owner.title || ""} ${owner.first_name || ""} ${owner.last_name || ""} (${owner.mobile_no.join(',') || ""})`).join("<br />") : "";
               const associateStr = Array.isArray(item.associated_contact) ? item.associated_contact.map(contact=>`${contact.title || ""} ${contact.first_name || ""} ${contact.last_name || ""} (${contact.mobile_no.join("<br />") || ""})`).join(", ") : "";
        
              return (
                      <li
                        key={index}
                        className="suggestion-item px-2 py-1"
                        onClick={() => handleSuggestionClickunit(item)}
                        style={{
                          borderBottom: "1px solid #e0e0e0",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                      >
                        <strong>{item.project_name}-{item.block}-{item.unit_no}</strong><br />
                        <span style={{ color: "#555" }}>
                          Owners: <div dangerouslySetInnerHTML={{ __html: ownerStr }} />
                          <br />
                          Associated Contact: <div dangerouslySetInnerHTML={{ __html: associateStr }} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )} */}
          <Tooltip title="Filter here.." arrow>
            <div
              style={{
                marginLeft: "53%",
                border: "none",
                cursor: "pointer",
                position: "absolute",
                marginTop: "10px",
              }}
            >
              <button
                onClick={toggleToastunit}
                style={{
                  position: "relative",
                  marginLeft: "65%",
                  width: "50px",
                  padding: "8px",
                  backgroundColor: "#fff", // white background for contrast
                  color: "black", // sets SVG to black
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  // boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Modern black funnel icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="24"
                  height="24"
                  style={{ color: "black" }} // ensure icon is black
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h18M6.75 9.75h10.5m-3.75 5.25h-3"
                  />
                </svg>
              </button>
            </div>
          </Tooltip>

          <div
            id="action"
            style={{ position: "absolute", marginLeft: "1%", gap: "20px" }}
          >
            <Tooltip title="Delete Data.." arrow>
              <img
                id="unitdelete"
                src={
                  isHoveringDelete
                    ? "https://cdn-icons-png.freepik.com/512/6861/6861362.png" // hover image
                    : "https://cdn-icons-png.freepik.com/512/7078/7078067.png" // default image
                }
                onClick={deleteinventories}
                onMouseEnter={() => setIsHoveringDelete(true)}
                onMouseLeave={() => setIsHoveringDelete(false)}
                alt=""
                style={{
                  display: "none",
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                }}
              />
            </Tooltip>

            <Tooltip title="Edit Data.." arrow>
              <img
                id="unitedit"
                src={
                  isHoveringEdit
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7BrBLmrMYynVUzMxsgv8AtIEkFjStD6cFRNYv1to6LupNkPMgkEaEzD5-HIGrjcPj4&usqp=CAU" // hover image
                    : "https://static.thenounproject.com/png/1416596-200.png" // default image
                }
                // onClick={handleShow9}
                onClick={() =>
                  navigate("/edit-unit", { state: selectedItems3[0] })
                }
                onMouseEnter={() => setIsHoveringEdit(true)}
                onMouseLeave={() => setIsHoveringEdit(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>
            {/* <Tooltip title="add task..." arrow>
        <img id="unitaddtask" src="https://cdn-icons-png.flaticon.com/512/12692/12692378.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
        </Tooltip>  */}
            {/* <Tooltip title="add unit..." arrow>
        <img id="unitaddunit" src="https://png.pngtree.com/png-vector/20190505/ourmid/pngtree-vector-add-icon-png-image_1023418.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
        </Tooltip>  */}

            <Tooltip title="create deal..." arrow>
              <img
                id="unitcreatedeal"
                src={
                  isHoveringunitcreatedeal
                    ? "https://static.vecteezy.com/system/resources/previews/049/672/081/non_2x/two-people-shaking-hands-in-a-circle-free-png.png" // hover image
                    : "https://cdn-icons-png.flaticon.com/512/2622/2622718.png" // default image
                }
                onClick={() => navigate("/deal")}
                onMouseEnter={() => setIsHoveringunitcreatedeal(true)}
                onMouseLeave={() => setIsHoveringunitcreatedeal(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip
              title="Add Property Owner/ Owner/Associate Contact/Remove Owner.."
              arrow
            >
              <img
                id="unitaddremoveowner"
                src={
                  isHoveringunitadduser
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4zfekzYjrE20ZK13_QCNaD79Ckw0ALRGgGA&s" // hover image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Ip10smoBiUPAxllgXOutryiGqQIj8CzJPQ&s" // default image
                }
                onClick={handleShow7}
                onMouseEnter={() => setIsHoveringunitadduser(true)}
                onMouseLeave={() => setIsHoveringunitadduser(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Matched Lead.." arrow>
              <img
                id="unitmatchedlead"
                src={
                  isHoveringprojectmatchedlead
                    ? "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512w/external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3.png" // hover image
                    : "https://cdn.iconscout.com/icon/premium/png-256-thumb/lead-management-986101.png" // default image
                }
                onMouseEnter={() => setIsHoveringprojectmatchedlead(true)}
                onMouseLeave={() => setIsHoveringprojectmatchedlead(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Call.." arrow>
              <img
                id="unitcall"
                src={
                  isHoveringcall
                    ? "https://cdn-icons-png.flaticon.com/512/561/561253.png" // hover image
                    : "https://icons.veryicon.com/png/o/miscellaneous/mime-icon/call-14.png" // default image
                }
                onMouseEnter={() => setIsHoveringcall(true)}
                onMouseLeave={() => setIsHoveringcall(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>
            <Tooltip title="Send Mail,WhatsApp and Message..." arrow>
              <img
                id="unitsendall"
                src={
                  isHoveringsendmail
                    ? "https://cdn-icons-png.flaticon.com/512/786/786407.png" // hover image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkAryM3dt6AWqQt1fHHBAtQ-YFVel4wnqEA&s" // default image
                }
                onMouseEnter={() => setIsHoveringsendmail(true)}
                onMouseLeave={() => setIsHoveringsendmail(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Add Remarks/Note.." arrow>
              <img
                id="unitaddremarks"
                src={
                  isHoveringaddremarks
                    ? "https://cdn-icons-png.flaticon.com/512/1381/1381552.png" // hover image
                    : "https://static-00.iconduck.com/assets.00/comment-add-icon-2048x2048-5tgm7wfd.png" // default image
                }
                onClick={handleShow6}
                onMouseEnter={() => setIsHoveringaddremarks(true)}
                onMouseLeave={() => setIsHoveringaddremarks(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Add Tag.." arrow>
              <img
                id="unitaddtag"
                src={
                  isHoveringaddtag
                    ? "https://cdn-icons-png.freepik.com/512/11500/11500120.png" // hover image
                    : "https://cdn-icons-png.flaticon.com/512/118/118061.png" // default image
                }
                onMouseEnter={() => setIsHoveringaddtag(true)}
                onMouseLeave={() => setIsHoveringaddtag(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Update.." arrow>
              <img
                id="unitupdatestage"
                src={
                  isHoveringunitupdate
                    ? "https://cdn-icons-png.flaticon.com/512/6713/6713079.png" // hover image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFo9g6QLJ-P3k8PTrjfrkWBOZI5ptsWJW4g&s" // default image
                }
                onClick={handleShow5}
                onMouseEnter={() => setIsHoveringunitupdate(true)}
                onMouseLeave={() => setIsHoveringunitupdate(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Preview.." arrow>
              <img
                id="unitpreview"
                src={
                  isHoveringpreview
                    ? "https://cdn-icons-png.flaticon.com/512/143/143594.png" // hover image
                    : "https://icon-library.com/images/preview-icon-png/preview-icon-png-26.jpg" // default image
                }
                // onClick={() =>
                //   navigate("projectpreview", { state: selectedItems2 })
                // }
                onMouseEnter={() => setIsHoveringpreview(true)}
                onMouseLeave={() => setIsHoveringpreview(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Add Document.." arrow>
              <img
                id="unitadddocument"
                src={
                  isHoveringadddocuments
                    ? "https://cdn-icons-png.freepik.com/512/5442/5442207.png" // hover image
                    : "https://www.pngkey.com/png/detail/268-2688000_add-document-icon-add-file-icon-png.png" // default image
                }
                onMouseEnter={() => setIsHoveringadddocuments(true)}
                onMouseLeave={() => setIsHoveringadddocuments(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Upload Image.." arrow>
              <img
                id="unituploadpicture"
                src={
                  isHoveringuploadpicture
                    ? "https://www.pngall.com/wp-content/uploads/15/Open-File-PNG-Clipart.png" // hover image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlz-TKOccaHn9IPHPOBVUJKOxcrSMhc3uhkw&s" // default image
                }
                onMouseEnter={() => setIsHoveringuploadpicture(true)}
                onMouseLeave={() => setIsHoveringuploadpicture(false)}
                alt="edit"
                style={{
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>

            <Tooltip title="Customer Feedback.." arrow>
              <img
                id="unitcustomerfeedback"
                src={
                  isHoveringunitcustomerfeedback
                    ? "https://cdn-icons-png.freepik.com/512/12534/12534997.png" // hover image
                    : "https://png.pngitem.com/pimgs/s/69-690659_expert-customer-feedback-icon-png-transparent-png.png" // default image
                }
                onClick={toggleToast}
                onMouseEnter={() => setIsHoveringunitcustomerfeedback(true)}
                onMouseLeave={() => setIsHoveringunitcustomerfeedback(false)}
                alt="edit"
                style={{
                  height: "28px",
                  width: "30px",
                  cursor: "pointer",
                  marginTop: "6px",
                  marginLeft: "20px",
                  display: "none",
                }}
              />
            </Tooltip>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "14px",
              gap: "5px",
              marginTop: "10px",
              marginLeft: "60%",
              position: "absolute",
            }}
          >
            <label htmlFor="itemsPerPage" style={{ fontSize: "16px" }}>
              Items:{" "}
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage2}
              onChange={handleItemsPerPageChange2}
              style={{ fontSize: "16px", height: "30px" }}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>

            {renderPageNumbers2()}
          </div>

          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginLeft: "65%",
            }}
          >
            {showColumnList2 && (
              <div
                style={{
                  width: "200px",
                  height: "500px",
                  overflow: "scroll",
                  backgroundColor: "gray",
                  position: "absolute",
                  top: "-40%",
                  left: "-80px",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                }}
              >
                <ul
                  style={{ listStyleType: "none", margin: 0, padding: "10px" }}
                >
                  {allunitColumns.slice(2).map((col) => (
                    <li key={col.id} style={{ padding: "5px 0" }}>
                      <input
                        type="checkbox"
                        checked={visibleColumns3.some(
                          (visibleCol) => visibleCol.id === col.id
                        )}
                        onChange={() => handleCheckboxChange2(col)}
                      />{" "}
                      {col.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            marginLeft: "60px",
            marginTop: "2px",
            backgroundColor: "white",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ backgroundColor: "gray" }}>
                    <input
                      type="checkbox"
                      checked={selectAll3}
                      onChange={handleSelectAll3}
                    />
                  </StyledTableCell>
                  {visibleColumns3.map((col) => (
                    <StyledTableCell
                      key={col.id}
                      style={{ cursor: "pointer", backgroundColor: "gray" }}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.name}
                      {sortConfig.key === col.id
                        ? sortConfig.direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <tbody>
                {[...flattenedUnits]
                  .sort(
                    (a, b) =>
                      extractUnitNumber(a.unit_no) -
                      extractUnitNumber(b.unit_no)
                  )
                  .map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <input
                          type="checkbox"
                          checked={selectedItems3.includes(item)}
                          onChange={() => handleRowSelect3(item)}
                        />
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                        onClick={() =>
                          navigate("/inventorysingleview", { state: item })
                        }
                      >
                        {(() => {
                          const isMatched = data.some(
                            (deal) =>
                              String(deal.project) ===
                                String(item.project_name) &&
                              String(deal.block) === String(item.block) &&
                              String(deal.unit_number) === String(item.unit_no)
                          );

                          return (
                            <>
                              <span
                                style={{
                                  fontWeight: "bolder",
                                  fontSize: "16px",
                                  color: isMatched ? "green" : "#0086b3",
                                }}
                              >
                                {item.unit_no}
                              </span>{" "}
                              ({item.unit_type}) {item.builtup_type} <br></br>
                              {item?.sub_category}({item.category}){" "}
                              <br></br>
                              {item.size}
                            </>
                          );
                        })()}
                      </StyledTableCell>

                      {visibleColumns3
                        .filter(
                          (col) => col.id !== "details" && col.id !== "sno"
                        )
                        .map((col) => (
                          <StyledTableCell
                            key={col.id}
                            style={{ padding: "10px", fontSize: "12px" }}
                          >
                            {col.id === "ownerdetails" ? (
                              <>
                                {(item?.owner_details
                                  ? Array.isArray(item.owner_details)
                                    ? item.owner_details
                                    : [item.owner_details]
                                  : []
                                ).map((owner, idx) => (
                                  <div key={idx}>
                                    {owner?.title} {owner?.first_name}{" "}
                                    {owner?.last_name}
                                    <br />
                                    {Array.isArray(owner?.mobile_no)
                                      ? owner.mobile_no.map((mobile, i) => (
                                          <div key={i}>
                                            <SvgIcon
                                              component={PhoneIphoneIcon}
                                            />{" "}
                                            {mobile}
                                          </div>
                                        ))
                                      : owner?.mobile_no && (
                                          <div>
                                            <SvgIcon
                                              component={PhoneIphoneIcon}
                                            />{" "}
                                            {owner.mobile_no}
                                          </div>
                                        )}
                                  </div>
                                ))}
                              </>
                            ) : col.id === "stage" ? (
                              <>
                                {(() => {
                                  const isMatched = data.some(
                                    (deal) =>
                                      String(deal.project) ===
                                        String(item.project_name) &&
                                      String(deal.block) ===
                                        String(item.block) &&
                                      String(deal.unit_number) ===
                                        String(item.unit_no)
                                  );

                                  return (
                                    <>
                                      <img
                                        style={{
                                          height: "30px",
                                          display: isMatched ? "block" : "none",
                                        }}
                                        src={deallogo}
                                        alt=""
                                      ></img>
                                      {item.stage}
                                    </>
                                  );
                                })()}
                              </>
                            ) : col.id === "owneraddress" ? (
                              <>
                                {(item?.owner_details
                                  ? Array.isArray(item.owner_details)
                                    ? item.owner_details
                                    : [item.owner_details]
                                  : []
                                ).map((owner, index) => (
                                  <div key={index}>
                                    s/h/o:- {owner?.father_husband_name} <br />
                                    {owner?.h_no} {owner?.area1}{" "}
                                    {owner?.location1} <br />
                                    {owner?.city1} {owner?.state1}{" "}
                                    {owner?.pincode1}
                                  </div>
                                ))}
                              </>
                            ) : col.id === "associatedcontact" ? (
                              <>
                                {(item?.associated_contact
                                  ? Array.isArray(item.associated_contact)
                                    ? item.associated_contact
                                    : [item.associated_contact]
                                  : []
                                ).map((contact, index) => (
                                  <div key={index}>
                                    {contact?.title} {contact?.first_name}{" "}
                                    {contact?.last_name}
                                    <br />
                                    {Array.isArray(contact?.mobile_no)
                                      ? contact.mobile_no.map((mobile, idx) => (
                                          <div key={idx}>
                                            <SvgIcon
                                              component={PhoneIphoneIcon}
                                            />{" "}
                                            {mobile}
                                          </div>
                                        ))
                                      : contact?.mobile_no && (
                                          <div>
                                            <SvgIcon
                                              component={PhoneIphoneIcon}
                                            />{" "}
                                            {contact.mobile_no}
                                          </div>
                                        )}
                                  </div>
                                ))}
                              </>
                            ) : col.id === "location" ? (
                              <>
                                {item?.block ? item.block : "-"}
                                <br></br>
                                {item?.project_name ? item.project_name : "-"}
                              </>
                            ) : col.id === "follow_up" ? (
                              <>
                                {item?.follow_up
                                  ? new Date(item.follow_up).toLocaleString(
                                      "en"
                                    )
                                  : "-"}
                              </>
                            ) : col.id === "remarks" ? (
                              <>
                                {item?.remarks}
                                <br></br>
                                <span className="text-red-700">
                                  {item?.reason || item?.other_reason}
                                </span>
                              </>
                            ) : col.id === "last_conduct_date_time" ? (
                              <>
                                {item?.last_conduct_date_time ? (
                                  <div className="flex flex-col leading-tight">
                                    <span className="font-medium">
                                      {new Date(
                                        item.last_conduct_date_time
                                      ).toLocaleDateString("en")}
                                    </span>
                                    <span className="font-medium">
                                      {new Date(
                                        item.last_conduct_date_time
                                      ).toLocaleTimeString("en")}
                                    </span>
                                    <span className="font-medium text-green">
                                      {item.logged_user}
                                    </span>
                                  </div>
                                ) : (
                                  "-"
                                )}
                              </>
                            ) : col.id === "locationbrief" ? (
                              <>
                                {item.direction}(Direction)<br></br>
                                {item.facing}(Facing)<br></br>
                                {item.road}(Road)
                              </>
                            ) : (
                              item[col.id]
                            )}
                          </StyledTableCell>
                        ))}
                    </StyledTableRow>
                  ))}
              </tbody>
            </Table>
          </TableContainer>
          <footer className="sticky bottom-0 w-full bg-gray-100 border-t shadow-md">
            <div
              className="max-w-full mx-auto px-1 py-1 grid 
                  grid-cols-2 sm:grid-cols-3 md:grid-cols-7 
                  gap-2 text-center"
            >
              {/* Summary */}
              <div className="flex flex-col items-center">
                <h6 className="text-gray-600 font-medium">Summary</h6>
              </div>

              {/* Total Inventories */}
              <div className="flex flex-col items-center">
                <h6 className="text-gray-700 font-medium">
                  Total Inventories
                  <span className="block text-black text-xl font-bold animate-pulse">
                    {totalinventories || "0"}
                  </span>
                </h6>
              </div>

              {/* Residential */}
              <div className="flex flex-col items-center">
                <h6 className="text-gray-700 font-medium">
                  Residential
                  <span className="block text-green-600 text-xl font-bold animate-pulse">
                    {category_count?.Residential || "0"}
                  </span>
                </h6>
              </div>

              {/* Commercial */}
              <div className="flex flex-col items-center">
                <h6 className="text-gray-700 font-medium">
                  Commercial
                  <span className="block text-blue-600 text-xl font-bold animate-pulse">
                    {category_count?.Commercial || "0"}
                  </span>
                </h6>
              </div>

              {/* Agriculture */}
              <div className="flex flex-col items-center">
                <h6 className="text-gray-700 font-medium">
                  Agriculture
                  <span className="block text-orange-500 text-xl font-bold animate-pulse">
                    {category_count?.Agricultural || "0"}
                  </span>
                </h6>
              </div>

              {/* Industrial */}
              <div className="flex flex-col items-center">
                <h6 className="text-gray-700 font-medium">
                  Industrial
                  <span className="block text-red-600 text-xl font-bold animate-pulse">
                    {category_count?.Industrial || "0"}
                  </span>
                </h6>
              </div>

              {/* Institutional */}
              <div className="flex flex-col items-center md:col-span-6 lg:col-span-1">
                <h6 className="text-gray-700 font-medium">
                  Institutional
                  <span className="block text-gray-700 text-xl font-bold animate-pulse">
                    {category_count?.Institutional || "0"}
                  </span>
                </h6>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/*================================================ add remarks modal start================================================== */}

      <Modal show={show6} onHide={handleClose6} size="lg">
        <Modal.Header>
          <Modal.Title>Add Note/Remarks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-6">
            <label className="labels">Note</label>
            <input
              type="textarea"
              className="form-control form-control-sm"
              style={{ height: "100px" }}
              placeholder={dealdata.remarks}
              onChange={(e) => setnote(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updatedealdata}>
            Add Note
          </Button>
          <Button variant="secondary" onClick={handleClose6}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*============================================ add remarks code end============================================================ */}

      {/*======================================= update modal start==================================================================== */}

      <Modal show={show5} onHide={handleClose5} size="lg">
        <Modal.Header>
          <Modal.Title>Update Stage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-6">
            <label className="labels">From</label>

            <select className="form-control form-control-sm" required="true">
              <option>{dealdata.stage}</option>
            </select>
          </div>
          <div className="col-md-6"></div>

          <div className="col-md-6">
            <label className="labels">To</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) => setupdatestage(e.target.value)}
            >
              <option>---Select---</option>
              <option>Open</option>
              <option>Quote</option>
              <option>Negotiation </option>
              <option>Booked </option>
              <optgroup label="Closed">
                <option>Won</option>
                <option>Lost</option>
                <option>Reject</option>
              </optgroup>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updatedealdata}>
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose5}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*=========================================== update modal end===============================================================*/}

      {/*========================================= modal for add new owner in feedback form start =========================================*/}

      <Modal show={show7} onHide={handleClose7} size="lg">
        <Modal.Header>
          <Modal.Title>Add New Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div  style={{ padding: "5px" }}>
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
                <ul className="suggestion-list" style={{ width: "35%" }}>
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
                >
                  +
                </button>
              </div>

              <div className="col-md-12 custom-input" style={{ marginTop: "20px" }}>
                <label className="labels">Owner Contact</label>
                <div className="col-md-12 custom-input">
                  <hr></hr>
                </div>
                {selectedcontact1.length >= 0 && (
                  <div className="contact-details">
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {[...selectedcontact1, ...units.owner_details]
                          .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                          .filter(
                            (contact, index, self) =>
                              // Ensure that we only keep unique contacts based on _id
                              index ===
                              self.findIndex((c) => c._id === contact._id)
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
                                {contact?.mobile_no?.map((number, index) => (
                                  <span key={index}>
                                    <SvgIcon
                                      component={PhoneIphoneIcon}
                                      style={{ fontSize: "10px" }}
                                    />
                                    {number}
                                    <br></br>
                                  </span>
                                ))}
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
                                {contact.location1} {contact.city1}{" "}
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
                {selectedcontact2.length >= 0 && (
                  <div className="contact-details">
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {[...selectedcontact2, ...units.associated_contact]
                          .filter((contact) => contact && contact._id) // Ensure contact is valid (not empty)
                          .filter(
                            (contact, index, self) =>
                              // Ensure that we only keep unique contacts based on _id
                              index ===
                              self.findIndex((c) => c._id === contact._id)
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
                                        <SvgIcon
                                          component={PhoneIphoneIcon}
                                          style={{ fontSize: "10px" }}
                                        />
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
                                {contact.area1} {contact.location1}{" "}
                                {contact.city1} {contact.state1}{" "}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateinventories}>
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose7}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ====================================modal for add new owner in feedback form end=============================================== */}

      {/* =============================================feedback form with toast start================================================== */}

      <div
        ref={toastRef}
        className={`feedback-toast ${
          show ? (isClosing ? "hide" : "show") : ""
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="toast show">
          <div className="toast-header">
            <strong
              className="me-auto"
              style={{ fontWeight: "bold", color: "var(--main-color)" }}
            >
              Customer Feedback of unit{" "}
              <span style={{ fontWeight: "bold", color: "var(--main-color)" }}>
                {feedbackform.unit_no}
              </span>
            </strong>
          </div>
          <div
            className="toast-body"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            <div className="mb-2">
              <label className="form-label">Owner Name</label>
              <div className="d-flex align-items-center">
                <select
                  className="form-control form-control-sm me-2"
                  name="owner"
                  onChange={(e) =>
                    setfeedbackform({ ...feedbackform, owner: e.target.value })
                  }
                >
                  <option>---select owner---</option>
                  {ownerlist.map((item) => {
                    return (
                      <option>
                        {item.title} {item.first_name} {item.last_name}
                      </option>
                    );
                  })}
                </select>
                {/* <button className="btn btn-sm btn-primary"  onClick={() => window.open('/addcontact', '_blank')}>+</button> */}
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">Owner Response on Sale</label>
              <select
                className="form-control form-control-sm"
                name="owner_response"
                onChange={(e) =>
                  setfeedbackform({
                    ...feedbackform,
                    owner_response: e.target.value,
                    no_reason: "",
                    other_no_reason: "",
                    discussed_reason: "",
                    other_discussed_reason: "",
                    next_call_date: "",
                  })
                }
                value={feedbackform.owner_response}
                onClick={() => {
                  if (All_Owner_Response.length === 0) {
                    getall_owner_response();
                  }
                }}
              >
                {select_loading === "owner_response" ? (
                  <option>⏳ Loading...</option>
                ) : (
                  <>
                    <option>---Select owner response---</option>
               

                    {/* Dynamic Fetched List */}
                    {All_Owner_Response.map((val, i) => (
                      <option key={i} value={val.lookup_value}>
                        {val.lookup_value}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {feedbackform.owner_response ===
              "No -But discussed about price" && (
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "8px",
                  padding: "5px",
                }}
              >
                <div className="mb-2">
                  <label className="form-label">Reason</label>
                  <div>
                    {All_Reason.map((reason, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="discussed_reason"
                          value={reason.lookup_value}
                          id={`reason-${index}`}
                          checked={
                            feedbackform.discussed_reason ===
                            reason.lookup_value
                            //  ||
                            // (reason.lookup_value === "Other" &&
                            //   typeof feedbackform.discussed_reason ===
                            //     "string" &&
                            //   !reasonsList.includes(
                            //     feedbackform.discussed_reason
                            //   ))
                          }
                          onChange={(e) =>
                            setfeedbackform({
                              ...feedbackform,
                              discussed_reason: e.target.value,
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`reason-${index}`}
                        >
                          {reason.lookup_value}
                        </label>

                        {reason.lookup_value === "Other" &&
                          feedbackform.discussed_reason === "Other" && (
                            <input
                              type="text"
                              name="other_discussed_reason"
                              className="form-control form-control-sm mt-2"
                              placeholder="Please specify"
                              onChange={(e) =>
                                setfeedbackform({
                                  ...feedbackform,
                                  other_discussed_reason: e.target.value,
                                })
                              }
                            />
                          )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">Price by Seller (₹)</label>
                  <input
                    className="form-control form-control-sm"
                    value={feedbackform.seller_price}
                    name="seller_price"
                    onChange={(e) =>
                      setfeedbackform({
                        ...feedbackform,
                        seller_price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">
                    Price Suggested by Me (₹)
                  </label>
                  <input
                    className="form-control form-control-sm"
                    value={feedbackform.my_price}
                    name="my_price"
                    onChange={(e) =>
                      setfeedbackform({
                        ...feedbackform,
                        my_price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {feedbackform.owner_response === "Thinking may/be in future" && (
              <div className="mb-2">
                <label className="form-label">Schedule Next Call Date</label>
                <input
                  type="datetime-local"
                  name="next_call_date"
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setfeedbackform({
                      ...feedbackform,
                      next_call_date: e.target.value,
                    })
                  }
                />
              </div>
            )}
            {feedbackform.owner_response === "Not Interested" && (
              <div
                className="mb-2"
                style={{
                  border: "1px solid gray",
                  borderRadius: "8px",
                  padding: "5px",
                }}
              >
                <label className="form-label">Reason</label>
                <div>
                  {All_Reason?.map((reason, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="no_reason"
                        value={reason.lookup_value}
                        id={`reason-${index}`}
                        checked={
                          feedbackform.no_reason === reason.lookup_value
                          // ||
                          // (reason === "Other" &&
                          //   typeof feedbackform.no_reason === "string" &&
                          //   !noreasonsList.includes(feedbackform.no_reason))
                        }
                        onChange={(e) =>
                          setfeedbackform({
                            ...feedbackform,
                            no_reason: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`reason-${index}`}
                      >
                        {reason.lookup_value}
                      </label>

                      {reason.lookup_value === "Other" &&
                        feedbackform.no_reason === "Other" && (
                          <input
                            type="text"
                            name="other_no_reason"
                            className="form-control form-control-sm mt-2"
                            placeholder="Please specify"
                            onChange={(e) =>
                              setfeedbackform({
                                ...feedbackform,
                                other_no_reason: e.target.value,
                              })
                            }
                          />
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-2">
              <label className="form-label">Stage</label>
              <input
                className="form-control form-control-sm"
                value={feedbackform.stage}
                name="stage"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Remarks/Notes</label>
              <textarea
                name="remarks"
                className="form-control form-control-sm"
                style={{ height: "100px" }}
                onChange={(e) =>
                  setfeedbackform({ ...feedbackform, remarks: e.target.value })
                }
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full mt-4">
              <button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded w-full sm:w-1/3"
              >
                Cancel
              </button>

              <button
                onClick={addfeedback}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded w-full sm:w-2/3"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================feedback form with toast end===================================================== */}

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

      <ToastContainer />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 50,
            left: 30,
            height: "4px",
            width: "100%",
            background: "linear-gradient(to right, #3b82f6, #06b6d4)", // blue → cyan gradient
            zIndex: 9999,
            animation: "progress 2s linear infinite",
          }}
        >
          {/* Inline keyframes injection */}
          <style>
            {`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        div[style*="progress"] {
          transform: translateX(-100%);
        }
      `}
          </style>
        </div>
      )}

      <ExportUnitsModal projects={cdata} />
      <>
        {isLoading4 && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <UniqueLoader />
          </div>
        )}
      </>
    </div>
  );
}

export default Allunits;
