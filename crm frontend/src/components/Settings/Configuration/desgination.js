import React, { useState, useEffect } from "react";
import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../../loader";
import MainLayout from "../main_layout";

function Designation() {
  const [loading, setloading] = useState(false);
  const [Designation, setDesignation] = useState({
    designaiton: "",
    profession_sub_category: "",
  });

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Designation, setAll_Designation] = useState([]);
  const getall_designation = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      setloading(true);
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      // Always include lookup_type
      params.append("lookup_type", "designation");

      // Optionally, if you want to filter by parent_lookup_id
      // params.append("parent_lookup_id", "SOME_PARENT_ID");

      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Designation(resp.data.data);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getall_designation();
  }, [paginationModel]);

  const [lookup_id, setlookup_id] = useState(null);
  const onEdit = (row) => {
    setlookup_id(row._id);
    setDesignation({
      designaiton: row.lookup_value,
      profession_sub_category:row.parent_lookup_value
    });
  };

  const onDelete = async (row) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this Designaion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        customClass: {
          popup: "small-swal-popup",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-cancel-button",
        },
      });

      // 🔹 If user cancels, stop execution
      if (!confirmResult.isConfirmed) return;

      const resp = await api.delete(`api/RemoveLookup?id=${row._id}`);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Designaiton Deleted",
            text: "Designation Deleted Successfully...",
            showConfirmButton: true,
            customClass: {
              popup: "small-swal-popup",
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      } else {
        console.warn("⚠️ Error:", resp.data.response.data.message);
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error Occured",
            text: resp.data.response.data.message,
            showConfirmButton: true,
            customClass: {
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text: error.response?.data?.message || "Something went wrong",
          showConfirmButton: true,
          customClass: { confirmButton: "my-swal-button" },
        }).then(() => {
          window.location.reload(); // optional, you can remove this if not needed
        });
      }, 0);
    }
  };

  const allcolumns = [
    { id: "sno", name: "#" },
    { id: "parent_lookup_value", name: "Profession Sub Category" },
    { id: "lookup_value", name: "Designation" },
    { id: "action", name: "Action" },
  ];

  //================================ get profession sub category start==========================================
    const [loadingSubCategory, setLoadingSubCategory] = useState(false);

    const [All_Profession_Sub_Category, setAll_Profession_Sub_Category] = useState([]);
    const getall_profession_sub_category = async () => {
      try {
        setLoadingSubCategory(true);
        const params = new URLSearchParams();
  
        // Always include lookup_type
        params.append("lookup_type", "profession_sub_category");
  
        // Optionally, if you want to filter by parent_lookup_id
        // params.append("parent_lookup_id", "SOME_PARENT_ID");
  
        const resp = await api.get(`api/LookupList?${params.toString()}`);
  
        setAll_Profession_Sub_Category(resp.data.data);
        setRowCount(resp.data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingSubCategory(false);
      }
    };
  
  

    //================================== get profession sub category end=====================================

  const handlechange = (e) => {
    const { name, value, checked, type } = e.target;

    setDesignation((prev) => {
      if (Array.isArray(value)) {
        return { ...prev, [name]: value };
      }

      if (Array.isArray(prev[name])) {
        const updated = checked
          ? [...prev[name], value] // Add
          : prev[name].filter((item) => item !== value); // Remove
        return { ...prev, [name]: updated };
      }

      if (type === "checkbox" && Array.isArray(prev[name])) {
        const updated = checked
          ? [...prev[name], value] // Add to array
          : prev[name].filter((item) => item !== value); // Remove from array
        return { ...prev, [name]: updated };
      }

      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }

      // Normal single-value field
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  const add_designation = async () => {
    try {
      setloading(true);
      const resp = await api.post("api/SaveLookup", {
        lookup_id: lookup_id ? lookup_id : null,
        lookup_type: "designation",
        lookup_value: Designation.designaiton,
        parent_lookup_value:Designation.profession_sub_category
      });

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Designaiton Added",
            text: "Designation Added Successfully...",
            showConfirmButton: true,
            customClass: {
              popup: "small-swal-popup",
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      } else {
        console.warn("⚠️ Error:", resp.data.response.data.message);
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error Occured",
            text: resp.data.response.data.message,
            showConfirmButton: true,
            customClass: {
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      }
    } catch (error) {
      console.error("❌ API Error:", error.response.data.message);
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text: error.response?.data?.message || "Something went wrong",
          showConfirmButton: true,
          customClass: { confirmButton: "my-swal-button" },
        }).then(() => {
          window.location.reload(); // optional, you can remove this if not needed
        });
      }, 0);
    } finally {
      setloading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-4 rounded-2xl shadow mt-8 ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className=" p-6 mb-2">
            <h3 className="text-2xl font-bold text-gray-800">
              Enter Details for Profession Designation
            </h3>
            <p className="text-gray-500 mt-1">
              Add or update the required details of designation to keep records
              accurate.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  name="designaiton"
                  defaultValue={Designation.designaiton}
                  onChange={handlechange}
                  placeholder="Designation"
                  className="w-full border border-gray-300 rounded-[10px] px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

            

 <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Profession Sub Category
  </label>

  <div className="relative">
    <select
      type="text"
      name="profession_sub_category"
      defaultValue={Designation.profession_sub_category}
      onChange={handlechange}
      onClick={() => {
      if (All_Profession_Sub_Category.length === 0) {
        getall_profession_sub_category();
      }
    }}
 // ✔ Using onClick
      className="w-full border border-gray-300 rounded-[10px] px-3 py-2 focus:ring-2 focus:ring-blue-500"
    >
      {/* Show loading message inside the dropdown */}
      {loadingSubCategory ? (
        <option>Loading...</option>
      ) : (
        <>
          <option>---select profession category---</option>

          {All_Profession_Sub_Category.map((item) => (
            <option key={item.lookup_value}>{item.lookup_value}</option>
          ))}
        </>
      )}
    </select>

    {/* Spinner Icon on right */}
    {loadingSubCategory && (
      <div className="absolute top-3 right-3">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}
  </div>
</div>


              

            </div>

            {/* Submit Button */}
            <button
              className="mt-6 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              onClick={add_designation}
            >
              Submit
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="overflow-auto max-h-[700px]">
              <table className="min-w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#0086b3] text-white">
                  <tr>
                    {allcolumns.map((col) => (
                      <th
                        key={col.id}
                        className="px-4 py-3 text-sm font-semibold border border-gray-600 text-center"
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {All_Designation?.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-gray-50 hover:bg-blue-50 transition"
                    >
                      {/* Index */}
                      <td className="px-4 py-3 border text-sm w-30 justify-center">
                        {index + 1}
                      </td>

                      {/* Parent Value*/}
                        <td className="px-4 py-3 border text-sm w-50 text-center">
                        <span className="text-blue-700 font-semibold">
                          {item.parent_lookup_value}
                        </span>
                        <br />
                      </td>
                      {/* Value*/}
                      <td className="px-4 py-3 border text-sm w-50 text-center">
                        <span className="text-blue-700 font-semibold">
                          {item.lookup_value}
                        </span>
                        <br />
                      </td>
                

                      {/* Action*/}
                      <td className="px-4 py-3 border text-sm ">
                        <div className="flex items-center gap-8 w-40 justify-center">
                          {/* Edit Button */}
                          <button
                            onClick={() => onEdit(item)}
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            <i className="bi bi-pencil-square text-lg"></i>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => onDelete(item)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <i className="bi bi-trash3-fill text-lg"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-6 select-none">
            <div className="flex items-center gap-2 bg-white shadow px-4 py-2 rounded-full">
              {/* Previous */}
              <button
                disabled={paginationModel.page === 0}
                onClick={() =>
                  setPaginationModel({
                    ...paginationModel,
                    page: paginationModel.page - 1,
                  })
                }
                className={`p-2 rounded-full transition ${
                  paginationModel.page === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <i className="bi bi-chevron-left text-lg"></i>
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: Math.ceil(rowCount / paginationModel.pageSize) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setPaginationModel({
                        ...paginationModel,
                        page: i,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      paginationModel.page === i
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}

              {/* Next */}
              <button
                disabled={
                  paginationModel.page + 1 >=
                  Math.ceil(rowCount / paginationModel.pageSize)
                }
                onClick={() =>
                  setPaginationModel({
                    ...paginationModel,
                    page: paginationModel.page + 1,
                  })
                }
                className={`p-2 rounded-full transition ${
                  paginationModel.page + 1 >=
                  Math.ceil(rowCount / paginationModel.pageSize)
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <i className="bi bi-chevron-right text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 255, 255, 0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UniqueLoader />
        </div>
      )}
    </MainLayout>
  );
}

export default Designation;
