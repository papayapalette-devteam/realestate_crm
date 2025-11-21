import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Menu,
  Paper,
} from "@mui/material";

import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../../loader";
import MainLayout from "../main_layout";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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

      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);

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
  }, []);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  const handleOpenMenu = (event, rowId) => {
    setMenuAnchor(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setMenuRowId(null);
  };

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
        text: "Do you really want to delete this Cast Group?",
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

      const resp = await api.delete(`api/admin/RemoveLookup?id=${row._id}`);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Cast Group Deleted",
            text: "Cast Group Deleted Successfully...",
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
        { id: 'sno', name: '#' },
        { id: 'form_title', name: 'Title' },
        { id: 'action', name: 'Action' },
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
      const resp = await api.post("api/admin/SaveLookup", {
        lookup_id: lookup_id ? lookup_id : null,
        lookup_type: "form_title",
        lookup_value: Form_Title.form_title,
      });

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Form Title Added",
            text: "Form Title Addedd Successfully...",
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
        Add or update the required details of form title to keep records accurate.
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
                  className="px-4 py-3 text-sm font-semibold border border-gray-600"
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
                {/* Checkbox + Index */}
                <td className="px-4 py-3 border text-sm">
                  <input type="checkbox" className="mr-2" />
                  {index + 1}
                </td>

                {/* Name + Mobile */}
                <td className="px-4 py-3 border text-sm">
                  <span className="text-blue-700 font-semibold">
                    {item.title} {item.first_name} {item.last_name}
                  </span>
                  <br />
                  <span className="text-gray-600 text-xs">
                    {item.mobile_no}
                  </span>
                </td>

                {/* City + Pincode */}
                <td className="px-4 py-3 border text-sm">
                  {item.city1} {item.pincode1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default FormTitle;
