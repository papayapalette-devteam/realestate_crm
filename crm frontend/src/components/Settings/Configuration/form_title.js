import React, { useState, useEffect } from "react";
import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../../loader";
import MainLayout from "../main_layout";

function FormTitle() {
  const [loading, setloading] = useState(false);
  const [Form_Title, setForm_Title] = useState({
    form_title: "",
  });

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Form_Title, setAll_Form_Title] = useState([]);
  const getall_form_title = async (
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
      params.append("lookup_type", "form_title");

      // Optionally, if you want to filter by parent_lookup_id
      // params.append("parent_lookup_id", "SOME_PARENT_ID");

      const resp = await api.get(`api/LookupList?${params.toString()}`);

      setAll_Form_Title(resp.data.data);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getall_form_title();
  }, [paginationModel]);

  const [lookup_id, setlookup_id] = useState(null);
  const onEdit = (row) => {
    setlookup_id(row._id);
    setForm_Title({
      form_title: row.lookup_value,
    });
  };

  const onDelete = async (row) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this Title?",
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
            title: "Form Title Deleted",
            text: "Form Title Deleted Successfully...",
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
    { id: "lookup_value", name: "Title" },
    { id: "action", name: "Action" },
  ];

  //================================ get religion group end==========================================

  const handlechange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm_Title((prev) => {
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

  const add_form_title = async () => {
    try {
      setloading(true);
      const resp = await api.post("api/SaveLookup", {
        lookup_id: lookup_id ? lookup_id : null,
        lookup_type: "form_title",
        lookup_value: Form_Title.form_title,
      });

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Form Title Added",
            text: "Form Title Added Successfully...",
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
              Enter Details for Form Title
            </h3>
            <p className="text-gray-500 mt-1">
              Add or update the required details of form title to keep records
              accurate.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cast Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Title
                </label>
                <input
                  type="text"
                  name="form_title"
                  defaultValue={Form_Title.form_title}
                  onChange={handlechange}
                  placeholder="Title"
                  className="w-full border border-gray-300 rounded-[10px] px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="mt-6 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              onClick={add_form_title}
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
                  {All_Form_Title.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-gray-50 hover:bg-blue-50 transition"
                    >
                      {/* Index */}
                      <td className="px-4 py-3 border text-sm w-30 justify-center">
                        {index + 1}
                      </td>

                      {/* Value*/}
                      <td className="px-4 py-3 border text-sm w-100 text-center">
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
        <div className="loader">
          <UniqueLoader />
        </div>
      )}
    </MainLayout>
  );
}

export default FormTitle;
