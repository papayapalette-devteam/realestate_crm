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
import Tooltip from "@mui/material/Tooltip";
import api from "../../api";
import "../../css/deal.css";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";

function AllSizes() {
  const navigate = useNavigate();
  const logged_user = JSON.parse(localStorage.getItem("user"));

  const [all_sizes, setall_sizes] = useState([]);
  console.log(all_sizes);

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

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...all_sizes].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setall_sizes(sortedData);
  };

  const [loading, setLoading] = useState(false);

  const allunitColumns = [
    { id: "sno", name: "#" },
    { id: "details", name: "Details" },
    { id: "unit_type", name: "Unit Type" },
    { id: "length", name: "Length" },
    { id: "bredth", name: "Breadth" },
    { id: "total_area", name: "Total Area" },
    { id: "yard3", name: "Measurment_Unit" },
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

  const [total_size, settotal_size] = useState(1);
  const [total_page, settotal_page] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [itemsPerPage2, setItemsPerPage2] = useState(10); // User-defined items per page
  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;

  const totalPages2 = total_page;

  const currentItems3 = all_sizes.slice(indexOfFirstItem2, indexOfLastItem2);

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

  const fetch_sizes = async (
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

      const resp1 = await api.get(`view-all-size?${params.toString()}`);

      settotal_size(resp1.data.total);
      setall_sizes(resp1.data.sizes);
      setcategory_count(resp1.data.categoryCount);
      settotal_page(resp1.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedItems3.length === 0) {
      document.getElementById("unitdelete").style.display = "none";
      document.getElementById("unitedit").style.display = "none";
      document.getElementById("unitsearch").style.display = "flex";
    }
    if (selectedItems3.length === 1) {
      document.getElementById("unitdelete").style.display = "inline-block";
      document.getElementById("unitedit").style.display = "inline-block";

      document.getElementById("unitsearch").style.display = "none";
    }
    if (selectedItems3.length > 1) {
      document.getElementById("unitdelete").style.display = "inline-block";
      document.getElementById("unitedit").style.display = "none";
      document.getElementById("unitsearch").style.display = "none";
    }
  }, [selectedItems3]);

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
      // setIsLoading4(true);
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
      // setIsLoading4(false);
    }
  };

  // ==============================================delete unit end==================================================================

  //========================================= units suggestion box code start=============================================================

  const [searchTermunits, setSearchTermunits] = useState("");
  const [suggestionsunit, setSuggestionsunit] = useState([]);

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
      let url = "size-getgroupdata";

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
    { label: "Block/Tower", field: "block1", values: groupdata.allblock },
    { label: "Category", field: "category", values: groupdata.allcategory },
    {
      label: "Sub Category",
      field: "sub_category",
      values: groupdata.allsubcategory,
    },
    { label: "Unit Type", field: "unit_type", values: groupdata.allunittype },
    {
      label: "Size (Total Area)",
      field: "total_area",
      type: "range",
      min: 0,
      max: 10000,
    },
  ];

  // ===================== HELPERS =====================
  const createFilterState = (fieldObj) => ({
    ...fieldObj,
    radio: "with",
    input: "",
    checked: [],
    minValue: fieldObj.type === "range" ? fieldObj.min : null,
    maxValue: fieldObj.type === "range" ? fieldObj.max : null,
  });

  const defaultFields = [unitfields.find((f) => f.field === "unit_type")];

  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [tempFilters, setTempFilters] = useState(
    defaultFields.map((f) => ({
      ...f,
      radio: "with",
      input: "",
      checked: [],
    }))
  );

  // Open filter panel, regenerating the defaults (with current city list)
  function openFilterWithDefaults() {
    if (activeFilters.length > 0) {
      // show previously applied filters
      setTempFilters(activeFilters);
    } else {
      // first time open
      setTempFilters(
        defaultFields.map((f) => ({
          ...f,
          radio: "with",
          input: "",
          checked: [],
          minValue: f.type === "range" ? f.min : null,
          maxValue: f.type === "range" ? f.max : null,
        }))
      );
    }
    setOpenDropdownIdx(null);
    setShowunit(true);
  }

  const [openDropdownIdx, setOpenDropdownIdx] = useState(null);

  // Add new filter row
  function handleAddField(fieldObj) {
    setTempFilters((prev) => [
      ...prev,
      {
        ...fieldObj,
        radio: "with",
        input: "",
        checked: [],
        minValue: fieldObj.type === "range" ? fieldObj.min : null,
        maxValue: fieldObj.type === "range" ? fieldObj.max : null,
      },
    ]);

    setShowFieldDropdown(false);
    setOpenDropdownIdx(null); // ❌ don't auto-open
  }

  // Remove filter
  function handleRemoveFilter(idx) {
    setTempFilters((tempFilters) => tempFilters.filter((_, i) => i !== idx));
    if (openDropdownIdx === idx) setOpenDropdownIdx(null);
  }

  // Toggle dropdown for a row
  function handleToggleDropdown(idx) {
    setOpenDropdownIdx(openDropdownIdx === idx ? null : idx);
  }

  // Radio/checkbox/text handlers:
  function handleRadio(idx, value) {
    setTempFilters((filters) =>
      filters.map((f, i) => (i === idx ? { ...f, radio: value } : f))
    );
  }
  function handleInput(idx, value) {
    setTempFilters((filters) =>
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
    setTempFilters((filters) =>
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

  const handleRangeChange = (idx, key, value) => {
    setTempFilters((filters) =>
      filters.map((f, i) => (i === idx ? { ...f, [key]: Number(value) } : f))
    );
  };

  //=============================================== deal action buttons toggle start=============================================================

  useEffect(() => {
    const hasFilters = activeFilters && activeFilters.length > 0;
    const hasSearch = searchTermunits && searchTermunits.trim() !== "";

    if (hasFilters || hasSearch) {
      // If either filters or search are active → include both
      fetch_sizes(currentPage2, itemsPerPage2, searchTermunits, activeFilters);
    } else {
      // No filters, no search → fetch all
      fetch_sizes(currentPage2, itemsPerPage2);
    }
  }, [currentPage2, itemsPerPage2, activeFilters, searchTermunits]);

  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);

  // =============================================================deal action button toggle end==================================================

  return (
    <div>
      <Header1 />
      <Sidebar1 />
      <div id="size-list-view" className="flip-card-back1">
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
            Sizes
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
            🔍 Filter Sizes
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
          {tempFilters.map((item, idx) => (
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
                  {/* RADIO BUTTONS */}
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

                  {/* TEXT INPUT */}
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

                  {/* CHECKBOX VALUES */}
                  {Array.isArray(item.values) && item.values.length > 0 && (
                    <>
                      {item.values.length > 500 ? (
                        <p
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "6px",
                          }}
                        >
                          ⚠️ Too many options. Please select a project first.
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
                      )}
                    </>
                  )}

                  {/* RANGE TYPE */}
                  {item.type === "range" && (
                    <>
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <input
                          type="number"
                          value={item.minValue}
                          onChange={(e) =>
                            handleRangeChange(idx, "minValue", e.target.value)
                          }
                        />
                        <span>to</span>
                        <input
                          type="number"
                          value={item.maxValue}
                          onChange={(e) =>
                            handleRangeChange(idx, "maxValue", e.target.value)
                          }
                        />
                      </div>

                      <input
                        type="range"
                        min={item.min}
                        max={item.max}
                        value={item.minValue}
                        onChange={(e) =>
                          handleRangeChange(idx, "minValue", e.target.value)
                        }
                        style={{ width: "100%", marginTop: 6 }}
                      />

                      <input
                        type="range"
                        min={item.min}
                        max={item.max}
                        value={item.maxValue}
                        onChange={(e) =>
                          handleRangeChange(idx, "maxValue", e.target.value)
                        }
                        style={{ width: "100%", marginTop: 6 }}
                      />
                    </>
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

          {/* APPLY */}
          <button
            onClick={() => {
              setActiveFilters(tempFilters);
              setCurrentPage2(1);
            }}
            style={{
              marginTop: 12,
              width: "100%",
              padding: 10,
              background: "#28a745",
              color: "#fff",
              borderRadius: 8,
            }}
          >
            ✅ Apply Filters
          </button>
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
            placeholder="Search for size via size name, block or unit type"
            style={{ width: "25%" }}
            value={searchTermunits}
            onChange={(e) => handleSearchChangeunit(e)}
            // onKeyDown={handleKeyPress2}
            autoComplete="off"
          />

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
                  navigate("/edit-size", { state: selectedItems3[0] })
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
                {[...all_sizes].map((item, index) => (
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
                    >
                      <>
                        <span
                          style={{
                            fontWeight: "bolder",
                          }}
                        >
                          {item.size_name} - {item.block1}
                        </span>{" "}
                        <br></br>
                        {item?.sub_category}({item.category}){" "}
                      </>
                    </StyledTableCell>

                    {visibleColumns3
                      .filter((col) => col.id !== "details" && col.id !== "sno")
                      .map((col) => (
                        <StyledTableCell
                          key={col.id}
                          style={{ padding: "10px", fontSize: "12px" }}
                        >
                          {item[col.id]}
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
                  Total Sizes
                  <span className="block text-black text-xl font-bold animate-pulse">
                    {total_size || "0"}
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

      {/* <>
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
      </> */}
    </div>
  );
}

export default AllSizes;
