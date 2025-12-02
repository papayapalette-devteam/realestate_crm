const addcontact = require('../models/add_contact');
const addproject = require("../models/project");

const runMigrationOnce = async () => {
  try {
    console.log("Running one-time migration…");

    const result = await addcontact.updateMany(
      {
        $or: [
          { mobile_no: { $type: "string" } },
          { email: { $type: "string" } }
        ]
      },
      [
        {
          $set: {
            mobile_no: {
              $cond: [
                { $eq: [{ $type: "$mobile_no" }, "string"] },
                ["$mobile_no"],
                "$mobile_no"
              ]
            },
            email: {
              $cond: [
                { $eq: [{ $type: "$email" }, "string"] },
                ["$email"],
                "$email"
              ]
            }
          }
        }
      ]
    );

    console.log("Migration done. Updated:", result.modifiedCount);

  } catch (error) {
    console.error("Migration failed:", error);
  }
};



const removeDuplicateMobiles = async () => {
  try {
    console.log("Checking and cleaning duplicate mobile numbers…");

    // Get all contacts that have array mobile_no
    const contacts = await addcontact.find({
      mobile_no: { $type: "array" }
    });

    let updatedCount = 0;

    for (let contact of contacts) {
      if (Array.isArray(contact.mobile_no)) {
        // Remove duplicates
        const uniqueMobiles = [...new Set(contact.mobile_no.map(m => m.trim()))];

        // Check if anything changed
        if (uniqueMobiles.length !== contact.mobile_no.length) {
          contact.mobile_no = uniqueMobiles;
          await contact.save();
          updatedCount++;
        }
      }
    }

    console.log(`Duplicate cleaning complete. Contacts updated: ${updatedCount}`);

  } catch (error) {
    console.error("Error removing duplicates:", error);
  }
};






async function removeUnitsWithoutProjectName() {
  try {
    const projects = await addproject.find().lean();

    for (const proj of projects) {
      const cleanedUnits = (proj.add_unit || []).filter(unit => unit.project_name);

      if (cleanedUnits.length !== (proj.add_unit || []).length) {
        await addproject.updateOne(
          { _id: proj._id },
          { $set: { add_unit: cleanedUnits } }
        );
      }
    }

    console.log("Units without project_name removed successfully");
  } catch (err) {
    console.error("Error:", err);
  }
}

removeUnitsWithoutProjectName()