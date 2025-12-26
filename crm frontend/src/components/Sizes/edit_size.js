import React, { useEffect, useState } from "react";
import Header1 from "../header1";
import Sidebar1 from "../sidebar1";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";
import api from "../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";

function EditSize() {
  const navigate = useNavigate();

  const location = useLocation();
  const item = location.state;

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

  const [sizes, setsizes] = useState({
    size_name: "",
    block1: "",
    category: "",
    sub_category: "",
    unit_type: "",
    type: "",
    total_sealable_area: "",
    sq_feet1: "Feet",
    covered_area: "",
    sq_feet2: "",
    carpet_area: "",
    sq_feet3: "",
    loading: "",
    percentage: "%",
    length: "",
    yard1: "yard",
    bredth: "",
    yard2: "",
    total_area: "",
    yard3: "Sq Yard",
  });

  useEffect(() => {
    if (item) {
      setsizes(item);
    }
  }, [item]);
  console.log(item);

  const [select_loading, setselect_loading] = useState("");

  const [All_Category, setAll_Category] = useState([]);

  const getall_category = async () => {
    try {
      const params = new URLSearchParams();
      params.append("lookup_type", "property_type");

      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Category(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_category();
  }, []);

  const [All_Sub_Category, setAll_Sub_Category] = useState([]);

  const getall_sub_category = async () => {
    try {
      const params = new URLSearchParams();
      params.append("lookup_type", "property_sub_type");
      params.append("parent_lookup_value", sizes.category);

      const resp = await api.get(`api/LookupList?${params.toString()}`);
      console.log(resp);

      setAll_Sub_Category(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(sizes);

  const getproject_data_by_sizeid = async () => {
    try {
      const resp = await api.get(`get-projectdata-by-sizeid/${sizes._id}`);

      setproject(resp.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedType1, setSelectedType1] = useState(null);

  const handleTypeClick2 = (type) => {
    setSelectedType1(type);
    setsizes((prevsizes) => ({
      ...prevsizes,
      category: type,
    }));
  };

  const [All_Property_Unit_Type, setAll_Property_Unit_Type] = useState([]);

  const getall_unit_type = async () => {
    try {
      setselect_loading("unit-type");
      const params = new URLSearchParams();
      params.append("lookup_type", "property_unit_type");
      params.append("parent_lookup_value", sizes.sub_category);
      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Property_Unit_Type(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading(false);
    }
  };

  const handlesizesubcategorychange = (event) => {
    const selectedSubcategory = event.target.value;

    setsizes((precsize) => ({
      ...precsize,
      sub_category: selectedSubcategory,
      unit_type: "", // Reset designation when subcategory changes
    }));
  };

  const [showPlotSize, setShowPlotSize] = useState(false); // Track the checkbox state

  // Handle the checkbox change to show/hide plot size section
  const handleCheckboxChange2 = (event) => {
    setShowPlotSize(event.target.checked);
  };
  const [showapartmentSize, setShowapartmentSize] = useState(false); // Track the checkbox state

  // Handle the checkbox change to show/hide plot size section
  const handleCheckboxChange3 = (event) => {
    setShowapartmentSize(event.target.checked);
  };

  const convertToSquareUnit = (area, fromUnit, toUnit) => {
    const conversionFactors = {
      Yard: {
        "Sq Yard": 1,
        "Sq Meter": 0.836127,
        "Sq Feet": 9,
        "Sq Inch": 1296,
      },
      Meter: {
        "Sq Yard": 1.19599,
        "Sq Meter": 1,
        "Sq Feet": 10.7639,
        "Sq Inch": 1550.0031,
      },
      Feet: {
        "Sq Yard": 0.111111,
        "Sq Meter": 0.092903,
        "Sq Feet": 1,
        "Sq Inch": 144,
      },
      Inch: {
        "Sq Yard": 0.000771605,
        "Sq Meter": 0.00064516,
        "Sq Feet": 0.00694444,
        "Sq Inch": 1,
      },
    };

    if (!conversionFactors[fromUnit] || !conversionFactors[fromUnit][toUnit]) {
      console.error(`Invalid conversion from ${fromUnit} to ${toUnit}`);
      return area;
    }

    return area * conversionFactors[fromUnit][toUnit];
  };

  const calculateTotalArea = () => {
    const length = parseFloat(sizes.length);
    const bredth = parseFloat(sizes.bredth);

    // Check if length, bredth, yard1, and yard3 are valid
    if (!isNaN(length) && !isNaN(bredth) && sizes.yard1 && sizes.yard3) {
      const area = length * bredth;
      const fromUnit = sizes.yard1.replace("Sq ", ""); // Remove "Sq " to get the unit (Yard, Meter, etc.)
      const toUnit = sizes.yard3; // The unit we want to convert to (Sq Yard, Sq Meter, etc.)

      // Perform the conversion
      const convertedArea = convertToSquareUnit(area, fromUnit, toUnit);

      // Update the total_area first
      setsizes((prev) => ({
        ...prev,
        total_area: convertedArea.toFixed(2), // Format the area to 2 decimal places
      }));
    } else {
      setsizes((prev) => ({ ...prev, total_area: "" }));
    }
  };

  // Separate useEffect to update size_name based on the total_area
  useEffect(() => {
    if (!sizes.total_area || !sizes.yard3) return;

    const type = sizes.type || "";
    const unitType = sizes.unit_type || "";

    const sizeName = `${type} ${unitType} (${sizes.total_area} ${sizes.yard3})`
      .replace(/\s+/g, " ")
      .trim();

    setsizes((prev) => ({
      ...prev,
      size_name: sizeName,
    }));
  }, [sizes.total_area, sizes.yard3, sizes.type, sizes.unit_type]);
  // Run when total_area or yard3 changes

  // Main useEffect to handle changes in length, breadth, yard1, and yard3
  useEffect(() => {
    // Recalculate the total area when any relevant value changes
    calculateTotalArea();
  }, [sizes.length, sizes.bredth, sizes.yard1, sizes.yard3]); // Include yard3 here to trigger recalculation

  const totalpercentage = () => {
    const sarea = sizes.total_sealable_area;
    const carea = sizes.carpet_area;
    const reductionPercentage = ((sarea - carea) / sarea) * 100;
    const sizeName = `${sizes.type} ${sizes.unit_type} (${sizes.total_sealable_area} ${sizes.sq_feet1})`;
    setsizes((prevsizes) => ({
      ...prevsizes,
      loading: reductionPercentage,
      size_name: sizeName,
    }));
  };

  const [loading, setloading] = useState(false);

  const toIdArray = (arr) =>
    Array.isArray(arr)
      ? arr.map((i) => (typeof i === "object" ? i._id : i)).filter(Boolean)
      : [];

  const updatesize = async () => {
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
      setloading(true);

      const resp = api.put("update-size", sizes);
      console.log(resp);
      

      Swal.fire({
        title: "Size Updated",
        text: "size  updated successfully",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ok",
      });
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
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
      setloading(false);
    }
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
                    Update Size
                  </h1>
                </div>

                <hr></hr>
                <div style={{ width: "100%" }}>
                  <div className="row" id="basicdetails1">
                    <div className="col-md-8 custom-input">
                      <label className="form-label">Size Name</label>
                      <input
                        type="text"
                        readOnly
                        value={sizes.size_name}
                        required="true"
                        className="form-control form-control-sm"
                        placeholder="size name"
                      />
                    </div>
                    <div className="col-md-4 custom-input"></div>

                    <div className="col-md-8 custom-input">
                      <label className="form-label">Block</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) =>
                          setsizes({ ...sizes, block1: e.target.value })
                        }
                        onClick={() => getproject_data_by_sizeid()}
                      >
                        <option>{sizes.block1}</option>
                        <option>---choose---</option>
                        {project.add_block.map((item) => (
                          <option>{item.block_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 custom-input"></div>

                    <div className="col-md-12 custom-input">
                      <label className="form-label">Category</label>
                    </div>
                    <div
                      className="col-md-12 custom-input"
                      style={{ display: "flex" }}
                    >
                      <div
                        className="col-md-12"
                        style={{ display: "flex", flexWrap: "wrap" }}
                      >
                        {All_Category.map((type) => (
                          <div className="col-md-3" key={type}>
                            <button
                              className="form-control form-control-sm category-button"
                              onClick={() =>
                                handleTypeClick2(type.lookup_value)
                              }
                              style={{
                                backgroundColor:
                                  selectedType1 === type.lookup_value
                                    ? "#28a745"
                                    : "#f8f9fa", // green or light gray
                                color:
                                  selectedType1 === type.lookup_value
                                    ? "white"
                                    : "#333",
                                border: "1px solid #ccc",
                                marginBottom: "2px",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                transition: "all 0.3s ease",
                                boxShadow:
                                  selectedType1 === type.lookup_value
                                    ? "0 4px 10px rgba(40, 167, 69, 0.4)"
                                    : "0 2px 6px rgba(0, 0, 0, 0.1)",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                              }}
                            >
                              {type.lookup_value}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-12 custom-input">
                      <label className="form-label">Sub Category</label>
                      <select
                        className="form-control form-control-sm"
                        labelId="subcategory-label"
                        id="subcategory"
                        onChange={handlesizesubcategorychange}
                        onClick={() => getall_sub_category()}
                      >
                        <option>{sizes?.sub_category}</option>
                        <option>---select---</option>
                        {All_Sub_Category.map((item) => (
                          <option>{item.lookup_value}</option>
                        ))}
                      </select>
                    </div>

                    {!project.category.includes("Agricultural") && (
                      <>
                        <div className="col-md-6 custom-input">
                          <label className="form-label">Unit Type</label>
                          <select
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                unit_type: e.target.value,
                              })
                            }
                            onClick={() => {
                              getall_unit_type();
                            }}
                            value={sizes.unit_type}
                          >
                            <option>{sizes?.unit_type}</option>
                            <option>---Select---</option>
                            {select_loading === "unit-type" ? (
                              <CircularProgress />
                            ) : (
                              All_Property_Unit_Type.map((name) => (
                                <option value={name.lookup_value}>
                                  {name.lookup_value}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                        <div className="col-md-6 custom-input"></div>
                      </>
                    )}

                    {project.category.includes("Agricultural") && (
                      <>
                        <div className="col-md-4 custom-input">
                          <label className="form-label">Type</label>
                          <select
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({ ...sizes, type: e.target.value })
                            }
                          >
                            <option>---select---</option>
                            <option>Acre</option>
                            <option>Kanal</option>
                            <option>Marla</option>
                          </select>
                        </div>
                        <div className="col-md-8 custom-input"></div>
                      </>
                    )}

                    <div
                      className="col-md-6 custom-input"
                      style={{ marginTop: "10px" }}
                    >
                      <input
                        type="checkbox"
                        checked={showapartmentSize}
                        onChange={handleCheckboxChange3}
                      />
                      <label>Show Apartment Size</label>
                    </div>

                    {showapartmentSize && (
                      <div
                        className="row"
                        id="apartmentsize"
                        style={{
                          margin: "20px",
                          padding: "20px",
                          border: "1px dashed black",
                        }}
                      >
                        <div className="col-md-3 custom-input">
                          <label className="form-label">
                            Total Seleble Area
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                total_sealable_area: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3 custom-input">
                          <label
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Measurement
                          </label>
                          <select
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                sq_feet1: e.target.value,
                              })
                            }
                          >
                            <option>Feet</option>
                            <option>Yard</option>
                            <option>Meter</option>
                            <option>Inch</option>
                          </select>
                        </div>
                        <div className="col-md-6 custom-input"></div>
                        <div className="col-md-3 custom-input">
                          <label className="form-label"> Covered Area</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                covered_area: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3 custom-input">
                          <label
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Measurement
                          </label>
                          <select className="form-control form-control-sm">
                            <option>{sizes.sq_feet1}</option>
                          </select>
                        </div>
                        <div className="col-md-6 custom-input"></div>
                        <div className="col-md-3 custom-input">
                          <label className="form-label"> Carpet Area</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                carpet_area: e.target.value,
                              })
                            }
                            onBlur={totalpercentage}
                          />
                        </div>
                        <div className="col-md-3 custom-input">
                          <label
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Measurement
                          </label>
                          <select className="form-control form-control-sm">
                            <option>{sizes.sq_feet1}</option>
                          </select>
                        </div>
                        <div className="col-md-3 custom-input">
                          <label className="form-label"> Loading</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={sizes.loading}
                          />
                        </div>
                        <div className="col-md-2 custom-input">
                          <label
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Measurement
                          </label>
                          <select className="form-control form-control-sm">
                            <option>%</option>
                          </select>
                        </div>
                        <div className="col-md-1 custom-input"></div>
                      </div>
                    )}

                    <div
                      className="col-md-6 custom-input"
                      style={{ marginTop: "10px" }}
                    >
                      <input
                        type="checkbox"
                        checked={showPlotSize}
                        onChange={handleCheckboxChange2}
                      />
                      <label>Show Size</label>
                    </div>
                    {showPlotSize && (
                      <div
                        className="row"
                        id="plotsize"
                        style={{
                          margin: "20px",
                          padding: "20px",
                          border: "1px dashed black",
                        }}
                      >
                        <div className="col-md-3 custom-input">
                          <label className="form-label">Total Length</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={sizes?.length}
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                length: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3 custom-input">
                          <label
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Measurement
                          </label>
                          <select
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                yard1: e.target.value,
                              })
                            }
                          >
                            <option>{sizes?.yard1}</option>
                            <option>---select---</option>
                            <option>Yard</option>
                            <option>Meter</option>
                            <option>Feet</option>
                            <option>Inch</option>
                          </select>
                        </div>
                        <div className="col-md-6 custom-input"></div>

                        <div className="col-md-3 custom-input">
                          <label className="form-label"> Total Breadth</label>
                          <input
                            type="text"
                            onBlur={calculateTotalArea}
                            className="form-control form-control-sm"
                            value={sizes?.bredth}
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                bredth: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3 custom-input">
                          <label
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Measurement
                          </label>
                          <select
                            className="form-control form-control-sm"
                            value={sizes.yard2}
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                yard2: e.target.value,
                              })
                            }
                          >
                            <option>{sizes.yard1}</option>
                          </select>
                        </div>
                        <div className="col-md-3 custom-input">
                          <label className="form-label"> Total Area</label>
                          <input
                            type="text"
                            value={sizes.total_area}
                            readOnly
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-3 custom-input">
                          <label
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Measurement
                          </label>
                          <select
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setsizes({
                                ...sizes,
                                yard3: e.target.value,
                              })
                            }
                          >
                            <option>{sizes?.yard3}</option>
                            <option>---select---</option>
                            <option>Sq Yard</option>
                            <option>Sq Meter</option>
                            <option>Sq Feet</option>
                            <option>Sq Inch</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-8"></div>

                    <div
                      className="col-md-2 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        className="form-control btn-global-danger"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                    </div>

                    <div
                      className="col-md-2 mb-3 custom-input"
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        className="form-control btn-global-primary"
                        onClick={updatesize}
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

      <>
        {loading && (
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

export default EditSize;
