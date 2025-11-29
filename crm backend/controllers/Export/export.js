// controllers/exportController.js

const addproject = require("../../models/project");
const ExcelJS = require("exceljs");

exports.exportUnits = async (req, res) => {
  try {
     const projectName = req.params.name; 

    const project = await addproject.findOne({ name: projectName });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    

    const units = project.add_unit;

    if (!units || units.length === 0) {
      return res.status(404).json({ message: "No units found" });
    }

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Units");

    // ---------------------------
    // 🔥 AUTO-GENERATE ALL COLUMNS
    // ---------------------------
    const sampleUnit = units[0]; // detect fields from first unit

    const columns = Object.keys(sampleUnit._doc).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 25,
    }));

    worksheet.columns = columns;

    // ---------------------------
    // 🔥 ADD ROWS (convert arrays/objects)
    // ---------------------------
    units.forEach((u) => {
      const row = {};

      Object.keys(u._doc).forEach((key) => {
        const value = u[key];

        if (Array.isArray(value)) {
          row[key] = value.join(", "); // convert arrays
        } else if (typeof value === "object" && value !== null) {
          row[key] = JSON.stringify(value); // convert objects
        } else {
          row[key] = value;
        }
      });

      worksheet.addRow(row);
    });

    // Export File
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${projectName}-units.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Export Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
