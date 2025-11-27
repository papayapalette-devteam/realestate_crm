import Header1 from "../header1";
import Sidebar1 from "../sidebar1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { utils, writeFile } from "xlsx";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { SvgIcon } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Tooltip from "@mui/material/Tooltip";
import api from "../../api";
import "../../css/deal.css";
import { toWords } from "number-to-words";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import deallogo from "../../icons/deal.jpg";
import UniqueLoader from "../loader";
import { Select, MenuItem, Checkbox, ListItemText  } from '@mui/material';

function Allunits() {
     const logged_user=JSON.parse(localStorage.getItem('user'))



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

  const exportToExcel = () => {
    const filteredData = data.map(
      ({
        developer,
        block_tower,
        project,
        unit_number,
        location,
        linkded_contact,
        ownership,
        facing,
      }) => ({
        developer,
        block_tower,
        project,
        unit_number,
        location,
        linkded_contact,
        ownership,
        facing,
      })
    );
    // Create a new workbook
    const workbook = utils.book_new();

    // Convert data to a worksheet
    const worksheet = utils.json_to_sheet(filteredData);

    // Append the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Export the workbook to an Excel file
    writeFile(workbook, "inventory_data.xlsx");
  };

  const [ischecked, setischecked] = useState(false);
  const handleischeckedchange = (e) => {
    setischecked(e.target.checked);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // User-defined items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);






 



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
    { id: "last_contacted", name: "Last_Contacted_Date_&_Time" },
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
  const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
  const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 11));
  const [showColumnList, setShowColumnList] = useState(false);

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
  const [totalResidential, setTotalResidential] = useState(0);
  const [totalcommercial, settotalcommercial] = useState(0);
  const [totalagriculture, settotalagriculture] = useState(0);
  const [totalindustrial, settotalindustrial] = useState(0);
  const [totalinstitutional, settotalinstitutional] = useState(0);

  React.useEffect(() => {
    fetchcdata();
  }, []);

  const [allprojectforsearch, setallprojectforsearch] = useState([]);
  const [cdata, setcdata] = useState([]);
  const [flattenedUnits, setFlattenedUnits] = useState([]);

  const [allunitsforsearch, setallunitsforsearch] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [totalproject, settotalproject] = useState();
  const [totalupcoming, settotalupcoming] = useState();
  const [totalprelaunch, settotalprelaunch] = useState();
  const [totalreadytomove, settotalreadytomove] = useState();
  const [totalunderconstruction, settotalunderconstrction] = useState();
  const fetchcdata = async (event) => {
    try {
      const resp = await api.get("viewproject");
      setcdata(resp.data.project);
      setallprojectforsearch(resp.data.project);
      const countproject = Array.isArray(resp.data.project)
        ? resp.data.project
        : [resp.data.project];
      settotalproject(countproject.length);

      const totalaupcomingproject = resp.data.project.filter(
        (item) => item.status === "Upcoming"
      ).length;
      settotalupcoming(totalaupcomingproject);

      const totalprelaunchproject = resp.data.project.filter(
        (item) => item.status === "Pre Launch"
      ).length;
      settotalprelaunch(totalprelaunchproject);

      const totalreadytomoveproject = resp.data.project.filter(
        (item) => item.status === "Ready to Move"
      ).length;
      settotalreadytomove(totalreadytomoveproject);

      const totalunderconstrctionproject = resp.data.project.filter(
        (item) => item.status === "Under Construction"
      ).length;
      settotalunderconstrction(totalunderconstrctionproject);
    } catch (error) {
      console.log(error);
    }
  };

  const [allcitis, setallcitis] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.ucity);
    setallcitis([...new Set(result)]);
  }, [flattenedUnits]);

  const [allcategories, setallcategories] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.flatMap((item) => item.category);
    setallcategories([...new Set(result)]);
  }, [flattenedUnits]);

  const [allsubcategories, setallsubcategories] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.flatMap((item) => item.sub_category);
    setallsubcategories([...new Set(result)]);
  }, [flattenedUnits]);

  const [allfacing, setallfacing] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.facing);
    setallfacing([...new Set(result)]);
  }, [flattenedUnits]);

  const [allroad, setallroad] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.road);
    setallroad([...new Set(result)]);
  }, [flattenedUnits]);

  const [alldirection, setalldirection] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.direction);
    setalldirection([...new Set(result)]);
  }, [flattenedUnits]);

  const [allstage, setallstage] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.stage);
    setallstage([...new Set(result)]);
  }, [flattenedUnits]);

  const [allsize, setallsize] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.size);
    setallsize([...new Set(result)]);
  }, [flattenedUnits]);

  const [allunittype, setallunittype] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.unit_type);
    setallunittype([...new Set(result)]);
  }, [flattenedUnits]);

  const [allblock, setallblock] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.block);
    setallblock([...new Set(result)]);
  }, [flattenedUnits]);

  const [alllocation, setalllocation] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.location);
    setalllocation([...new Set(result)]);
  }, [flattenedUnits]);

  const [all_project, setall_project] = useState([]);
  useEffect(() => {
    const result = flattenedUnits.map((item) => item.project_name);
    setall_project([...new Set(result)]);
  }, [flattenedUnits]);

  const [activeunits, setactiveunits] = useState([]);
  const [inactiveunits, setinactiveunits] = useState([]);
  useEffect(() => {
    const active = flattenedUnits.filter((item) => item.stage === "Active");
    setactiveunits(active);

    const inactive = flattenedUnits.filter((item) => item.stage === "InActive");
    setinactiveunits(inactive);
  }, [flattenedUnits]);

  useEffect(() => {
    const tinventories = flattenedUnits.length;
    // settotalinventories(tinventories)

    const residentialCount = flattenedUnits.filter(
      (unit) => unit.category === "Residential"
    ).length;
    setTotalResidential(residentialCount);

    const commercialcount = flattenedUnits.filter(
      (unit) => unit.category === "Commercial"
    ).length;
    settotalcommercial(commercialcount);

    const agriculturecount = flattenedUnits.filter(
      (unit) => unit.category === "Agriculture"
    ).length;
    settotalagriculture(agriculturecount);

    const insdustrialcount = flattenedUnits.filter(
      (unit) => unit.category === "Industrial"
    ).length;
    settotalindustrial(insdustrialcount);

    const institutionalcount = flattenedUnits.filter(
      (unit) => unit.category === "Institutional"
    ).length;
    settotalinstitutional(institutionalcount);
  }, [flattenedUnits]);

  const [isFlipped, setIsFlipped] = useState(false);

  const pagereload = () => {
    // Flip effect for contactlistview to companylistview
    setIsFlipped(true);
    setTimeout(() => {
      document.getElementById("contactlistview").style.display = "none";
      document.getElementById("projectlistview").style.display = "block";
    }, 500); // Wait for flip animation to complete before hiding/showing the divs
  };

  const pagereload2 = () => {
    // Flip effect for companylistview to contactlistview
    setIsFlipped(false);
    setTimeout(() => {
      document.getElementById("unitlistview").style.display = "block";
      document.getElementById("projectlistview").style.display = "none";
    }, 500); // Wait for flip animation to complete before hiding/showing the divs
  };



  const [searchdata, setsearchdata] = useState();
  const fetchdatabyemail_mobile_tags_company = async (e) => {
    // e.preventDefault()
    try {
      const resp = await api.get(`viewcontactbyemail/${searchdata}`);
      const incoming = Array.isArray(resp.data.contact)
        ? resp.data.contact
        : [resp.data.contact];
      // setdata(incoming)

      const resp1 = await api.get(`viewcontactbymobile/${searchdata}`);
      const incoming1 = Array.isArray(resp1.data.contact)
        ? resp1.data.contact
        : [resp1.data.contact];
      setdata([...incoming, ...incoming1]);

      const resp2 = await api.get(`viewcontactbytags/${searchdata}`);
      const incoming2 = Array.isArray(resp2.data.contact)
        ? resp2.data.contact
        : [resp2.data.contact];
      setdata([...incoming, ...incoming1, ...incoming2]);

      const resp3 = await api.get(`viewcontactbycompany/${searchdata}`);
      const incoming3 = Array.isArray(resp3.data.contact)
        ? resp3.data.contact
        : [resp3.data.contact];
      setdata([...incoming, ...incoming1, ...incoming2, ...incoming3]);

      const resp4 = await api.get(`viewcontactbyname/${searchdata}`);
      const incoming4 = Array.isArray(resp4.data.contact)
        ? resp4.data.contact
        : [resp4.data.contact];
      setdata([
        ...incoming,
        ...incoming1,
        ...incoming2,
        ...incoming3,
        ...incoming4,
      ]);
    } catch (error) {
      console.log(error);
    }
  };


  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1, setItemsPerPage1] = useState(10); // User-defined items per page
  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems2 = cdata.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(cdata.length / itemsPerPage1);








  const allprojectColumns = [
    { id: "sno", name: "#" },
    { id: "projectname", name: "Project Name" },
    { id: "location", name: "Location" },
    { id: "block", name: "Block" },
    { id: "category", name: " Category" },
    { id: "unit_type", name: "Unit Type " },
    { id: "user", name: "User " },
    { id: "date", name: "Date" },
  ];
  const [selectedItems2, setSelectedItems2] = useState([]); // To track selected rows
  const [selectAll2, setSelectAll2] = useState(false); // To track the state of the "Select All" checkbox
  const [visibleColumns2, setVisibleColumns2] = useState(
    allprojectColumns.slice(1, 8)
  );
  const [showColumnList1, setShowColumnList1] = useState(false);

  const handleAddColumnClick1 = () => {
    setShowColumnList1(!showColumnList1);
  };






  //========================================= units code start =======================================================================

  const [loading, setLoading] = useState(false);

  const allunitColumns = [
    { id: "sno", name: "#" },
    { id: "details", name: "Details" },
    { id: "stage", name: "Status" },
    { id: "ownerdetails", name: "Owner_Details" },
    { id: "owneraddress", name: " Owner_Address" },
    { id: "associatedcontact", name: "Associated_Contact " },
    { id: "remarks", name: "Remarks " },
    { id: "locationbrief", name: "Location_Brief" },
    { id: "ownership", name: "OwnerShip" },
    { id: "follow_up", name: "Follow_Up" },
    { id: "last_conduct_date_time", name: "Last_Conduct_Date_&_Time" },
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
    setSelectAll3(!selectAll3);
    if (!selectAll3) {
      // Add all current page item IDs to selectedItems
      setSelectedItems3(currentItems3.map((item) => item));
    } else {
      // Deselect all
      setSelectedItems3([]);
    }
  };

  const handleRowSelect3 = (item) => {
    if (selectedItems3.some((i) => i._id === item._id)) {
      setSelectedItems3(selectedItems3.filter((i) => i._id !== item._id));
    } else {
      setSelectedItems3([...selectedItems3, item]);
    }
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


  

  const [show9, setshow9] = useState(false);

  const handleClose9 = () => setshow9(false);
  // const[fetchunit,setfetchunit]=useState([])
  const handleShow9 = async () => {
    setshow9(true);
    const project = selectedItems3[0].project_name;
    const block = selectedItems3[0].block;
    const unit = selectedItems3[0].unit_no;

    const resp = await api.get(
      `viewprojectforinventories/${project}/${unit}/${block}`
    );
    console.log(resp);

    setunits(resp.data.project.add_unit[0]);
    fetchdatabyprojectname(project);
  };
  // console.log(units.owner_details);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Set the Content-Type here
    },
  };



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

      // ✅ Run both updates in parallel
      const [resp, resp1] = await Promise.all([
        api.put(
          `updateprojectforinventories/${project}/${unit}/${block}`,
          units,
          config
        ),
        // api.put(`updatedealowner/${project}/${block}/${unit}`, units, config),
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

  const addunit = () => {
    if (units.unit_no) {
      const updateunit = [...unit, ...project.add_unit, units];
      setunit(updateunit);
      setproject((prevState) => ({
        ...prevState,
        add_unit: updateunit,
      }));

      handleClose9();

      document.getElementById("choosedestination").value = "Select";
    } else {
      toast.error("Please fill out all fields.");
    }
  };
  const deleteunit = (index) => {
    // Filter out the destination at the given index
    const newunit = project.add_unit.filter((_, i) => i !== index);

    // Set the updated destination details
    setproject((prevState) => ({
      ...prevState,
      add_unit: newunit,
    }));
    setunit(newunit);
  };

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

const handleSubCategoryChange1 = (event) => {
              const {
                target: { value },
              } = event;
              // Ensure the value is an array if multiple options are selected
              setunits({ ...units, sub_category: typeof value === "string" ? value.split(",") : value });
          
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
  };

  // const states = Object.keys(statesAndCities);
  // const cities = statesAndCities[project.state] || [];

  const ustates = Object.keys(statesAndCities);
  const ucities = statesAndCities[units.ustate] || [];

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

  // ===================================================edit deal start===================================================================

  const [show10, setshow10] = useState(false);

  const handleClose10 = () => setshow10(false);
  const handleShow10 = async () => {
    setshow10(true);
    try {
      const resp = await api.get(`viewdealbyid/${selectedItems}`);
      setdeal(resp.data.deal);
    } catch (error) {
      console.log(error);
    }
  };

  const [progress, setProgress] = useState(deal.white_portion || 10); // Initialize with deal.whiteportion

  const handleMouseMove = (e) => {
    const progressBar = e.target.getBoundingClientRect();
    const newProgress =
      ((e.clientX - progressBar.left) / progressBar.width) * 100;
    const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
    setProgress(clampedProgress);
    setdeal((prevDeal) => ({ ...prevDeal, white_portion: clampedProgress })); // Update deal.whiteportion
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



 

 

  const [data1, setdata1] = useState([]);
  const fetchdata1 = async () => {
    try {
      const resp = await api.get("viewproject");
      setdata1(resp.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchdata1();
  }, []);

  const allproject = [];
  data1.map((item) => allproject.push(item.name));

  const [units1, setunits1] = useState([]);
  const [allUnits, setallUnits] = useState([]);
  const [allblocks, setallblocks] = useState([]);

  const [numericValue, setNumericValue] = React.useState(null);
  const [measurementUnit, setMeasurementUnit] = React.useState("");

  const fetchdatabyprojectname = async (projectNames) => {
    try {
      const resp = await api.get(`viewprojectbyname/${projectNames}`);
      setunits1(resp.data.project);
      setproject(resp.data.project[0]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (deal.project) {
      fetchdatabyprojectname(deal.project);
    }
  }, [deal.project]);

  React.useEffect(() => {
    if (units1.length >= 0) {
      const collectedUnits = units1.flatMap(
        (item) =>
          item.add_unit.filter(
            (unit) => unit.stage === "Active" && unit.block === deal.block
          ) // Filter units where stage is 'active'
      );

      const collectedblocks = units1.flatMap((item) => item.add_block);
      console.log(collectedblocks);

      const collectcategory = units1.flatMap((item) => item.category);
      const collectsubcategory = units1.flatMap((item) => item.sub_category); // Collect all add_unit arrays
      const fulllocation = units1
        .flatMap(
          (item) =>
            `${item.add_location}, ${item.address} ${item.street} ${item.locality} ${item.city}`
        )
        .join(" ");
      setallUnits(collectedUnits);
      setallblocks(collectedblocks);
      setdeal({
        ...deal,
        project_category: collectcategory,
        project_subcategory: collectsubcategory,
        location: fulllocation,
      }); // Set allUnits with the collected units

      const collectedsize = collectedUnits.filter(
        (item) => item.block === deal.block && item.unit_no === deal.unit_number // Use strict equality === here
      );

      if (collectedsize.length > 0) {
        // Assuming 'size' is the field you're interested in
        const sizeValue = collectedsize[0].size; // Or collectedsize[0].sizeName based on your actual field name
        console.log(sizeValue);

        const regex = /\((\d+(\.\d+)?)\s*(\w+\s\w+)\)/;
        const match = sizeValue.match(regex);

        if (match) {
          setNumericValue(parseFloat(match[1]));
          setMeasurementUnit(match[3]);
        }
      }
    }
  }, [units1, deal.block, deal.unit_number]);

  



  

  

  const [result0, setResult0] = useState("");
  const [resultText, setResultText] = useState("");

  

  React.useEffect(() => {
    // Convert result to text format
    if (result0) {
      const words = toWords(result0, { format: "en-IN" });
      setResultText(`(${words} only)`);
    } else {
      setResultText("");
    }
  }, [result0]);

  const [result1, setResult1] = useState("");
  const [resultText1, setResultText1] = useState("");



  React.useEffect(() => {
    // Convert result to text format
    if (result1) {
      const words = toWords(result1, { format: "en-IN" });
      setResultText1(`(${words} only)`);
    } else {
      setResultText1("");
    }
  }, [result1]);

  const [result2, setResult2] = useState("");
  const [resultText2, setResultText2] = useState("");

 

  React.useEffect(() => {
    // Convert result to text format
    if (result2) {
      const words = toWords(result2, { format: "en-IN" });
      setResultText2(`(${words} only)`);
    } else {
      setResultText2("");
    }
  }, [result2]);

  const [result3, setResult3] = useState("");
  const [resultText3, setResultText3] = useState("");



  React.useEffect(() => {
    // Convert result to text format
    if (result3) {
      const words = toWords(result3, { format: "en-IN" });
      setResultText3(`(${words} only)`);
    } else {
      setResultText3("");
    }
  }, [result3]);


  // ===================================================edit deal end====================================================================

  // ===================================update deal each time while adding or delete lead start================================================

  // ===================================update deal each time while adding or delete lead  end===========================================

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

  const handleSuggestionClickunit = (item) => {
    const ownerStr = Array.isArray(item.owner_details)
      ? item.owner_details
          .map(
            (owner) =>
              `${owner.title || ""} ${owner.first_name || ""} ${
                owner.last_name || ""
              }`
          )
          .join(", ")
      : "";
    const associateStr = Array.isArray(item.associated_contact)
      ? item.associated_contact
          .map(
            (contact) =>
              `${contact.title || ""} ${contact.first_name || ""} ${
                contact.last_name || ""
              }`
          )
          .join(", ")
      : "";

    setSearchTermunits(
      `${item.project_name} -${item.block} -${item.unit_no} - ${ownerStr} - ${associateStr}`
    );
    setSuggestionsunit([]);
    setFlattenedUnits([item]);

    // You can also do something with the selected item (e.g. set selectedDeal)
  };

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
    direction:"",
    status:"",
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
    }
  }, [feedbackform.owner_response]);

  const reasonsList = [
    "Had bad experience with previous agent",
    "Will sell after completion of construction",
    "Will sell after registry",
    "Don’t want to involve brokers / privacy concern",
    "Already dealing with another broker",
    "Waiting for better market price",
    "Price expectations not matching",
    "Other",
  ];

  const noreasonsList = [
    "Family not agreed yet / Internal family issue",
    "Property is under dispute / Legal issue",
    "Still under use (self-living / family living)",
    "Currently rented out / tenant issue",
    "Emotional attachment with property",
    "Recently bought, not planning to sell yet",
    "Joint ownership, others not willing",
    "Will sell only if urgent need arises",
    "Planning to construct house",
    "Can’t decide right now / need more time",
    "Not interested in selling at all",
    "Other",
  ];

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
        follow_up:feedbackform.next_call_date
      };
      const resp = await api.post("addfeedback", feedbackform);
      if (resp.status === 200) {
        let htmlContent = "<p>Feedback submitted successfully!</p>";

        // Generate dynamic buttons based on owner_response
        switch (feedbackform.owner_response) {
          case "Yes":
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

          case "Rent":
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
            htmlContent += `
            <button id="leadRequirementBtn" style="${buttonStyle}">
              <i class="bi bi-handshake-fill" style="margin-right: 6px;"></i>Lead Requirement
            </button>
          `;
            break;

          case "Sold":
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
      console.log(resp);

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

  console.log(filteredSuggestions);

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
  const get_group_data = async () => {
    try {
      const resp = await api.get("unit-getgroupdata");
      setgroupdata(resp.data);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_group_data();
  }, []);

  const unitfields = [
    { label: "City", field: "ucity", values: groupdata.allcitis },
    { label: "Location", field: "location", values: alllocation },
    {
      label: "Project Name",
      field: "project_name",
      values: groupdata.all_project,
    },
    { label: "Block/Tower", field: "block", values: allblock },
    { label: "Category", field: "category", values: allcategories },
    { label: "Sub Category", field: "sub_category", values: allsubcategories },
    { label: "Unit Type", field: "unit_type", values: allunittype },
    { label: "Size", field: "size", values: allsize },
    { label: "Stages/Status", field: "stage", values: allstage },
    { label: "Direction", field: "direction", values: alldirection },
    { label: "Road", field: "road", values: allroad },
    { label: "Facing", field: "facing", values: allfacing },
  ];

  const defaultFields = [
    unitfields.find((f) => f.field === "ucity"),
    unitfields.find((f) => f.field === "location"),
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
  function handleCheckbox(idx, val) {
    setActiveFilters((filters) =>
      filters.map((f, i) => {
        if (i !== idx) return f;
        const checked = f.checked.includes(val)
          ? f.checked.filter((v) => v !== val)
          : [...f.checked, val];
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
  const [isHoveringaddtotask, setIsHoveringaddtotask] = useState(false);
  const [isHoveringuploadpicture, setIsHoveringuploadpicture] = useState(false);
  const [isHoveringupdate, setIsHoveringupdate] = useState(false);
  const [isHoveringpublishon, setIsHoveringpublishon] = useState(false);
  const [isHoveringcall, setIsHoveringcall] = useState(false);
  const [isHoveringaddtag, setIsHoveringaddtag] = useState(false);
  const [isHoveringaddremarks, setIsHoveringaddremarks] = useState(false);
  const [isHoveringadddocuments, setIsHoveringadddocuments] = useState(false);
  const [isHoveringpreview, setIsHoveringpreview] = useState(false);
  const [isHoveringsendmail, setIsHoveringsendmail] = useState(false);
  const [isHoveringcreatebooking, setIsHoveringcreatebooking] = useState(false);
  const [isHoveringprojectmatchedlead, setIsHoveringprojectmatchedlead] =
    useState(false);
  const [isHoveringprojectupdate, setIsHoveringprojectupdate] = useState(false);
  const [isHoveringunitadduser, setIsHoveringunitadduser] = useState(false);
  const [isHoveringunitcreatedeal, setIsHoveringunitcreatedeal] =
    useState(false);
  const [isHoveringunitupdate, setIsHoveringunitupdate] = useState(false);
  const [isHoveringunitcustomerfeedback, setIsHoveringunitcustomerfeedback] =
    useState(false);

  // =============================================================deal action button toggle end==================================================

  //=============================== convert date format start==============================================================================
  const excelSerialToDateString = (serial) => {
    const excelEpoch = new Date(1900, 0, 1); // Jan 1, 1900
    const jsDate = new Date(excelEpoch.getTime() + (serial - 1) * 86400000);
    return jsDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };



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
          <h3 style={{ marginLeft: "10px", cursor: "pointer" }}>Inventories</h3>
          <Tooltip title="Export Data.." arrow>
            <button
              class="btn btn-secondary "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                color: "black",
                backgroundColor: "transparent",
                border: "none",
                marginBottom: "10px",
              }}
            >
              <img
                src="https://static.thenounproject.com/png/61783-200.png"
                style={{ height: "25px" }}
                alt=""
              />
            </button>
          </Tooltip>
          <ul class="dropdown-menu" id="exporttoexcel">
            <li onClick={exportToExcel}>Export Data</li>
          </ul>
          {/* <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"65%"}}>Filter</button> */}
          <button
            onClick={handleAddColumnClick1}
            className="form-control form-control-sm form-control form-control-sm-sm"
            style={{
              padding: "5px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 600,
              marginBottom: 16,
              cursor: "pointer",
              marginTop: "0px",
              marginLeft: "75%",
              width: "100px",
            }}
          >
            Add Fields
          </button>
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
                  {item.values && item.values.length > 0 && (
                    <div
                      style={{
                        maxHeight: 130,
                        overflowY: "auto",
                        background: "#fcfdff",
                        padding: "6px 8px",
                        fontSize: "12px",
                        borderRadius: 7,
                      }}
                    >
                      {item.values.map((val) => (
                        <label
                          key={val}
                          style={{
                            display: "block",
                            margin: "4px 0",
                            fontSize: 12,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={item.checked.includes(val)}
                            onChange={() => handleCheckbox(idx, val)}
                            style={{ marginRight: 8 }}
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  )}
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

        <div
          style={{
            marginTop: "2px",
            backgroundColor: "white",
            height: "60px",
            paddingLeft: "80px",
            display: "flex",
            gap: "20px",
          }}
        >
          <div
            className="lead"
            style={{ width: "200px", padding: "10px", borderRadius: "10px" }}
            onClick={() => setFlattenedUnits(activeunits)}
          >
            <h6>Active</h6>
            <p>{activeunits.length}</p>
          </div>
          <div
            className="lead"
            style={{
              width: "200px",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              padding: "10px",
            }}
            onClick={() => setFlattenedUnits(inactiveunits)}
          >
            <h6>Inactive</h6>
            <p>{inactiveunits.length}</p>
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
                onClick={handleShow9}
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
                onClick={() =>
                  navigate("projectpreview", { state: selectedItems2 })
                }
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
                                  fontSize: "14px",
                                  color: isMatched ? "green" : "#0086b3",
                                }}
                              >
                                {item.unit_no}
                              </span>{" "}
                              ({item.unit_type}) {item.builtup_type}{" "}
                              {item.sub_category.join(",")}
                              <br />
                              {item.category} {item.size} <br />
                              {item.project_name}
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
                            ) :  col.id === "follow_up" ? (
                              <>
                              {item?.follow_up
                                ? new Date(item.follow_up).toLocaleString("en")
                                : "-"}
                            </>

                            ) :  col.id === "last_conduct_date_time" ? (
                              <>
                              {item?.last_conduct_date_time ? (
                                <div className="flex flex-col leading-tight">
                                  <span className="font-medium">
                                    {new Date(item.last_conduct_date_time).toLocaleDateString("en")}
                                  </span>
                                  <span className="font-medium">
                                    {new Date(item.last_conduct_date_time).toLocaleTimeString("en")}
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
          <footer
            style={{
              height: "50px",
              width: "100%",
              position: "sticky",
              display: "flex",
              gap: "50px",
              bottom: "0",
              backgroundColor: "#f8f9fa",
              marginLeft: "10px",
            }}
          >
            <h6 style={{ lineHeight: "50px", color: "GrayText" }}>Summary</h6>
            <h6 style={{ lineHeight: "50px" }}>
              Total Inventories{" "}
              <span style={{ color: "black", fontSize: "20px" }}>
                {totalinventories}
              </span>
            </h6>
            <h6 style={{ lineHeight: "50px" }}>
              {" "}
              Residential{" "}
              <span style={{ color: "green", fontSize: "20px" }}>
                {totalResidential}
              </span>
            </h6>
            <h6 style={{ lineHeight: "50px" }}>
              {" "}
              Commercial{" "}
              <span style={{ color: "blue", fontSize: "20px" }}>
                {totalcommercial}
              </span>
            </h6>
            <h6 style={{ lineHeight: "50px" }}>
              {" "}
              Agriculture{" "}
              <span style={{ color: "orange", fontSize: "20px" }}>
                {totalagriculture}
              </span>
            </h6>
            <h6 style={{ lineHeight: "50px" }}>
              {" "}
              Industrial{" "}
              <span style={{ color: "red", fontSize: "20px" }}>
                {totalindustrial}
              </span>
            </h6>
            <h6 style={{ lineHeight: "50px" }}>
              {" "}
              Institutional{" "}
              <span style={{ color: "gray", fontSize: "20px" }}>
                {totalinstitutional}
              </span>
            </h6>
          </footer>
        </div>
      </div>

      {/*========================================= edit unit modal start================================================================== */}

      <Modal show={show9} onHide={handleClose9} size="lg">
        <Modal.Header>
          <Modal.Title>Update Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", gap: "50px" }}>
            <div
              id="unitdetail"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: activeUnit === 1 ? "#f0f0f0" : "transparent", // Optional: to highlight active tab
              }}
              onClick={unitdetail1}
            >
              <span>Unit</span>
            </div>
            <div
              id="unitlocationdetails"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: activeUnit === 2 ? "#f0f0f0" : "transparent", // Optional: to highlight active tab
              }}
              onClick={unitdetail2}
            >
              <span>Location</span>
            </div>
            <div
              id="ownerdetails1"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: activeUnit === 3 ? "#f0f0f0" : "transparent", // Optional: to highlight active tab
              }}
              onClick={unitdetail3}
            >
              <span>Add Owner</span>
            </div>
            <div
              id="adddocuments"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: activeUnit === 4 ? "#f0f0f0" : "transparent", // Optional: to highlight active tab
              }}
              onClick={unitdetail4}
            >
              <span>Add Documents</span>
            </div>
            <div
              id="upload"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: activeUnit === 5 ? "#f0f0f0" : "transparent", // Optional: to highlight active tab
              }}
              onClick={unitdetail5}
            >
              <span>Upload</span>
            </div>
          </div>

          <hr></hr>
          <div style={{ width: "100%" }}>
            <div className="row" id="unitdetails1">
              <div className="col-md-8">
                <label className="labels">Unit Number</label>
                <input
                  type="text"
                  required="true"
                  className="form-control form-control-sm"
                  value={units.unit_no}
                  placeholder="unit number"
                  onChange={(e) =>
                    setunits({ ...units, unit_no: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
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
              <div className="col-md-12" style={{ display: "flex" }}>
                <label className="labels">Category</label>
              </div>
              <div className="col-md-12" style={{ display: "flex" }}>
                <div
                  className="col-md-12"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {project?.category?.map((type) => (
                    <div className="col-md-3" key={type}>
                      <button
                        className="form-control form-control-sm"
                        onClick={() => handleTypeClick1(type)}
                        style={{
                          backgroundColor: selectedType === type ? "green" : "",
                        }}
                      >
                        {type}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

                 <div className="col-md-6"><label className="labels">Sub Category</label>
                    
                    <Select
                    className='form-control form-control-sm'
                    style={{border:"none"}}
          labelId="subcategory-label"
          id="subcategory"
          multiple
          value={units.sub_category || []}
          onChange={handleSubCategoryChange1}
          renderValue={(selected) => selected.join(", ")} 
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {project.sub_category.map((subCategory) => (
            <MenuItem key={subCategory} value={subCategory}>
              <Checkbox
                checked={units.sub_category.indexOf(subCategory) > -1}
                onChange={() => handleToggle1(subCategory)}
              />
              <ListItemText primary={subCategory} />
            </MenuItem>
          ))}
        </Select>
                    </div>

              <div className="col-md-6">
                <label className="labels">Block</label>
                <select
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    setunits({ ...units, block: e.target.value })
                  }
                >
                  <option>{units.block}</option>
                  <option>---choose---</option>
                  {project?.add_block?.map((item) => (
                    <option>{item.block_name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
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

              {project?.category?.includes("Agricultural") && (
                <>
                  <div className="col-md-6">
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
                  <div className="col-md-6"></div>
                  <div
                    className="col-md-12"
                    style={{
                      color: "green",
                      fontWeight: "bolder",
                      marginTop: "10px",
                    }}
                  >
                    Land Details<hr></hr>
                  </div>

                  <div className="col-md-3">
                    <label className="labels">Khewat No</label>
                    {Array.isArray(units.khewat_no)
                      ? units.khewat_no.map((item, index) => (
                          <input
                            className="form-control form-control-sm"
                            style={{ marginTop: "10px" }}
                            value={units.khewat_no}
                            onChange={(event) =>
                              handlekhewatnochange(index, event)
                            }
                          />
                        ))
                      : []}
                  </div>

                  <div className="col-md-3">
                    <label className="labels">Killa No</label>
                    {Array.isArray(units.killa_no)
                      ? units.killa_no.map((item, index) => (
                          <input
                            className="form-control form-control-sm"
                            style={{ marginTop: "10px" }}
                            value={units.killa_no}
                            onChange={(event) =>
                              handlekillanochange(index, event)
                            }
                          />
                        ))
                      : []}
                  </div>

                  <div className="col-md-3">
                    <label className="labels">Share</label>
                    {Array.isArray(units.share)
                      ? units.share.map((item, index) => (
                          <input
                            className="form-control form-control-sm"
                            style={{ marginTop: "10px" }}
                            value={units.share}
                            onChange={(event) =>
                              handlesharenochange(index, event)
                            }
                          />
                        ))
                      : []}
                  </div>

                  <div className="col-md-1" style={{ marginTop: "90px" }}>
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

                  <div className="col-md-1">
                    <label className="labels">add</label>
                    <button
                      className="form-control form-control-sm"
                      onClick={addFn5}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-md-12">
                    Total Land Area:-{units.total_land_area}
                  </div>
                  <div
                    className="col-md-12"
                    style={{
                      color: "green",
                      fontWeight: "bolder",
                      marginTop: "10px",
                    }}
                  >
                    Water Details<hr></hr>
                  </div>

                  <div className="col-md-3">
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
                  <div className="col-md-3">
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

                  <div className="col-md-3">
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
                  <div className="col-md-1" style={{ marginTop: "90px" }}>
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
                  <div className="col-md-1">
                    <label className="labels">add</label>
                    <button
                      className="form-control form-control-sm"
                      onClick={addFn6}
                    >
                      +
                    </button>
                  </div>

                  <div
                    className="col-md-12"
                    style={{ color: "green", fontWeight: "bolder" }}
                  >
                    Basic Details<hr></hr>
                  </div>

                  <div className="col-md-4">
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

                  <div className="col-md-4">
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

                  <div className="col-md-4">
                    <label className="labels">Road</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setunits({ ...units, road: e.target.value })
                      }
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

                  <div className="col-md-4">
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

                  <div className="col-md-4">
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
                  <div className="col-md-4">
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

              {!project?.category?.includes("Agricultural") && (
                <>
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <label className="labels">Road</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        setunits({ ...units, road: e.target.value })
                      }
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
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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

              <div className="col-md-6" style={{ marginTop: "10px" }}>
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
                  <div className="col-md-12">
                    <label className="labels">Builtup Details</label>
                    <hr></hr>
                  </div>

                  <div className="col-md-6">
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
                  <div className="col-md-6"></div>

                  <div
                    className="row mt-2"
                    style={{
                      border: "1px dashed black",
                      margin: "10px",
                      marginTop: "0",
                      padding: "10px",
                      width: "100%",
                    }}
                  >
                    <div className="col-md-2">
                      <label className="labels">Floor</label>
                      {Array.isArray(units.floor)
                        ? units.floor.map((item, index) => (
                            <select
                              className="form-control form-control-sm"
                              style={{ marginTop: "10px" }}
                              onChange={(event) =>
                                handlefloorchange(index, event)
                              }
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
                    <div className="col-md-2">
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
                    <div className="col-md-2">
                      <label className="labels">Length</label>
                      {Array.isArray(units.length)
                        ? units.length.map((item, index) => (
                            <input
                              className="form-control form-control-sm"
                              style={{ marginTop: "10px" }}
                              value={units.length[index]}
                              onChange={(event) =>
                                handlelengthchange(index, event)
                              }
                            />
                          ))
                        : []}
                    </div>
                    <div className="col-md-2">
                      <label className="labels">Breadth</label>
                      {Array.isArray(units.bredth)
                        ? units.bredth.map((item, index) => (
                            <input
                              className="form-control form-control-sm"
                              style={{ marginTop: "10px" }}
                              value={units.bredth[index]}
                              onChange={(event) =>
                                handlebredthchange(index, event)
                              }
                            />
                          ))
                        : []}
                    </div>
                    <div className="col-md-2">
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

                    <div className="col-md-1" style={{ marginTop: "90px" }}>
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
                    <div className="col-md-1">
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

              <div className="col-md-6">
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
              <div className="col-md-6">
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

              <div className="col-md-6">
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
                <div className="col-md-12">
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

              <div className="col-md-8">
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
          <div className="row">
            <div
              className="col-md-12"
              id="unitlocation"
              style={{ display: "none", lineHeight: "30px" }}
            >
              <div className="p-3 py-5">
                <div
                  className="col-md-12"
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
                    <div className="col-md-6">
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
                    <div className="col-md-2">
                      <label
                        className="labels"
                        style={{ visibility: "hidden" }}
                      >
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
                    <div className="col-md-5">
                      <label className="labels">Lattitude</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        required="true"
                        value={units.lattitude}
                        readOnly
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="labels">Langitude</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        required="true"
                        value={units.langitude}
                        readOnly
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        className="labels"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        Address
                      </label>
                    </div>

                    <div className="col-md-8">
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
                    <div className="col-md-8">
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
                    <div className="col-md-4">
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
                    <div className="col-md-4">
                      <label className="labels">CITY</label>
                      <select
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setunits({ ...units, ucity: e.target.value })
                        }
                      >
                        <option>{units.ucity}</option>
                        {ucities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
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
                    <div className="col-md-6">
                      <label className="labels">State</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setunits({ ...units, ustate: e.target.value })
                        }
                      >
                        <option>{units.ustate}</option>
                        {ustates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Country</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setunits({ ...units, ucountry: e.target.value })
                        }
                      >
                        <option>{units.ucountry}</option>
                        <option>My Team</option>
                        <option>My Self</option>
                        <option>All Users</option>
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
                className="col-md-9"
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
              <div className="col-md-3">
                <label className="labels">Add Contact</label>
                <button
                  className="form-control form-control-sm"
                  style={{ width: "50px" }}
                  onClick={() => navigate("/sortaddcontact")}
                >
                  +
                </button>
              </div>

              <div className="col-md-12" style={{ marginTop: "20px" }}>
                <label className="labels">Owner Contact</label>
                <div className="col-md-12">
                  <hr></hr>
                </div>
                {units.owner_details.length >= 0 && (
                  <div className="contact-details">
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {/* Combine selectedcontact1 with units.owner_details while removing duplicates */}
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
                {units.associated_contact.length >= 0 && (
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
                    <th style={{ width: "400px", textAlign: "center" }}>
                      Preview
                    </th>
                    <th style={{ width: "300px", textAlign: "center" }}>
                      Description
                    </th>
                    {/* <th style={{width:"300px",textAlign:"center"}}>Category</th> */}
                    <th style={{ width: "150px", textAlign: "center" }}>
                      Action
                    </th>
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
                                onChange={(event) =>
                                  handlesnochange(index, event)
                                }
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
                className="col-md-3"
                style={{ marginLeft: "70%" }}
                onClick={addFnunit}
              >
                <button className="form-control form-control-sm">
                  Add Image
                </button>
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
                    <th style={{ width: "100px", textAlign: "center" }}>
                      SR.NO.
                    </th>
                    <th style={{ width: "950px", textAlign: "center" }}>URL</th>
                    <th style={{ width: "150px", textAlign: "center" }}>
                      Action
                    </th>
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
                                onChange={(event) =>
                                  handlesno1change(index, event)
                                }
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
                                onChange={(event) =>
                                  handleurlChange(index, event)
                                }
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
                className="col-md-3"
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
              <div className="col-md-3">
                <label className="labels">Document Name</label>
                {Array.isArray(units.document_name)
                  ? units.document_name.map((item, index) => (
                      <select
                        className="form-control form-control-sm"
                        onChange={(event) =>
                          handledocumentnamechange(index, event)
                        }
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

              <div className="col-md-2">
                <label className="labels">Doc. No.</label>
                {Array.isArray(units.document_no)
                  ? units.document_no.map((item, index) => (
                      <input
                        type="text"
                        value={units.document_no[index]}
                        className="form-control form-control-sm"
                        onChange={(event) =>
                          handledocumentnochange(index, event)
                        }
                        style={{ marginTop: "5px" }}
                      />
                    ))
                  : []}
              </div>

              <div className="col-md-2">
                <label className="labels">Date</label>
                {Array.isArray(units.document_Date)
                  ? units.document_Date.map((item, index) => (
                      <input
                        type="date"
                        value={units.document_Date[index]}
                        className="form-control form-control-sm"
                        onChange={(event) =>
                          handledocumentdatechange(index, event)
                        }
                        style={{ marginTop: "5px" }}
                      />
                    ))
                  : []}
              </div>

              <div className="col-md-2" style={{ position: "relative" }}>
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

              <div className="col-md-1" style={{ marginTop: "70px" }}>
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
                <button
                  className="form-control form-control-sm"
                  onClick={addFn12}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateinventories}>
            Update Unit
          </Button>
          <Button variant="secondary" onClick={handleClose9}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ===============================================edit unit modal end ==============================================================*/}

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

      <Modal show={show7} onHide={handleClose7} size="xl">
        <Modal.Header>
          <Modal.Title>Add New Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: "5px" }}>
            <div className="row" style={{ width: "100%" }}>
              <div
                className="col-md-9"
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
              <div className="col-md-3">
                <label className="labels">Add Contact</label>
                <button
                  className="form-control form-control-sm"
                  style={{ width: "50px" }}
                >
                  +
                </button>
              </div>

              <div className="col-md-12" style={{ marginTop: "20px" }}>
                <label className="labels">Owner Contact</label>
                <div className="col-md-12">
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
            <strong className="me-auto">
              Customer Feedback of unit{" "}
              <span style={{ fontWeight: "bold", color: "green" }}>
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
              <label className="form-label">Direction</label>
              <select
                className="form-control form-control-sm"
                name="owner_response"
                onChange={(e) =>
                  setfeedbackform({
                    ...feedbackform,
                    owner_response: e.target.value,
                  })
                }
              >
                <option>---select direction---</option>
                <option>Outgoing</option>
                <option>Incoming</option>
              </select>
            </div>

               <div className="mb-2">
              <label className="form-label">Status</label>
              <select
                className="form-control form-control-sm"
                name="owner_response"
                onChange={(e) =>
                  setfeedbackform({
                    ...feedbackform,
                    owner_response: e.target.value,
                  })
                }
              >
                <option>---select status---</option>
                <option>Answered</option>
                <option>Cut Call</option>
                <option>Not Picked</option>
                <option>Busy</option>
                <option>Missed</option>
                <option>Not Reachable</option>
                <option>Switch Off</option>
                <option>Number Invalid</option>
                <option>Waiting</option>
              </select>
            </div>

            {/* <div className="mb-2">
        <label className="form-label">Unit No.</label>
        <input type="text" name="unit_no"  className="form-control form-control-sm"  value={feedbackform.unit_no || ""}/>
      </div> */}
            <div className="mb-2">
              <label className="form-label">Owner Response on Sale</label>
              <select
                className="form-control form-control-sm"
                name="owner_response"
                onChange={(e) =>
                  setfeedbackform({
                    ...feedbackform,
                    owner_response: e.target.value,
                  })
                }
              >
                <option>---select response---</option>
                <option>Yes</option>
                <option>Rent</option>
                <option>Yes -Sell this property but buy another</option>
                <option>Sold</option>
                <option>No -But discussed about price</option>
                <option>No -But wants to buy another property</option>
                <option>Thinking may/be in future</option>
                <option>No</option>
                <option>Sold -But Interested to Buy Another Property</option>
                <option>Sold -But Interested to sell Another Property</option>
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
                    {[
                      "Had bad experience with previous agent",
                      "Will sell after completion of construction",
                      "Will sell after registry",
                      "Don’t want to involve brokers / privacy concern",
                      "Already dealing with another broker",
                      "Waiting for better market price",
                      "Price expectations not matching",
                      "Other",
                    ].map((reason, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="discussed_reason"
                          value={reason}
                          id={`reason-${index}`}
                          checked={
                            feedbackform.discussed_reason === reason ||
                            (reason === "Other" &&
                              typeof feedbackform.discussed_reason ===
                                "string" &&
                              !reasonsList.includes(
                                feedbackform.discussed_reason
                              ))
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
                          {reason}
                        </label>

                        {reason === "Other" &&
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
            {feedbackform.owner_response === "No" && (
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
                  {[
                    "Family not agreed yet / Internal family issue",
                    "Property is under dispute / Legal issue",
                    "Still under use (self-living / family living)",
                    "Currently rented out / tenant issue",
                    "Emotional attachment with property",
                    "Recently bought, not planning to sell yet",
                    "Joint ownership, others not willing",
                    "Will sell only if urgent need arises",
                    "Planning to construct house",
                    "Can’t decide right now / need more time",
                    "Not interested in selling at all",
                    "Other",
                  ].map((reason, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="no_reason"
                        value={reason}
                        id={`reason-${index}`}
                        checked={
                          feedbackform.no_reason === reason ||
                          (reason === "Other" &&
                            typeof feedbackform.no_reason === "string" &&
                            !noreasonsList.includes(feedbackform.no_reason))
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
                        {reason}
                      </label>

                      {reason === "Other" &&
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
    </div>
  );
}

export default Allunits;
