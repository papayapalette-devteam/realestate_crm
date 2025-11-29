import React, {  useState } from "react";
import api from "../../api";
import UniqueLoader from "../loader";
import Swal from "sweetalert2";

const ExportUnitsModal = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [projects, setprojects] = useState([]);
  const [loading, setloading] = useState("");
  const fetchdata = async () => {
    try {
      setloading("project");
      const resp = await api.get("viewprojectforadddeal");
      const all = resp.data.allprojectwithoutunitdetails;
      setprojects(all);
    } catch (error) {
      console.log(error);
    } finally {
      setloading("");
    }
  };

  return (
    <div
      className="modal fade"
      id="exportUnitsModal"
      tabIndex="-1"
      aria-labelledby="exportUnitsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title" id="exportUnitsModalLabel">
              Export Units
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* <label className="form-label">Select Project</label> */}
            <select
              onChange={(e) => setSelectedProject(e.target.value)}
              className="form-select"
              onClick={fetchdata}
              value={selectedProject}
            >
              {loading==="project" ? (
                <option>⏳ Loading...</option>
              ) : (
                <>
                  <option>---Select Project---</option>

                  {/* Dynamic Fetched List */}
                  {projects.map((val) => (
                    <option key={val._id} value={val.name}>
                      {val.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>

            <button
              disabled={!selectedProject}
              onClick={async () => {
                try {
                    setloading("export")
                  const response = await api.get(
                    `api/export-excel/${selectedProject}`,
                    {
                      responseType: "blob", // IMPORTANT
                    }
                  );
                  // Create a download link for Excel
                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${selectedProject}-units.xlsx`;
                  a.click();
                  window.URL.revokeObjectURL(url);
                } catch (error) {
                    console.error("Download failed", error);

                    const msg =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Something went wrong while downloading file.";

                    Swal.fire({
                        icon: "error",
                        title: "Download Failed!",
                        text: msg,
                    });
                    }

                finally
                {
                    setloading("")
                }
              }}
              className="btn btn-primary"
            >
              Export Units
            </button>
          </div>
        </div>
      </div>

         <>
                         {loading==="export" && (
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
                            zIndex: 9999,}}>
                            <UniqueLoader/>
                           </div>
                         )}
                       </>


    </div>
  );
};

export default ExportUnitsModal;
