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

// removeUnitsWithoutProjectName()

const normalizeAllProjectUnitStages = async () => {
  const projects = await addproject.find({});

  for (const project of projects) {
    let updated = false;

    project.add_unit.forEach((unit) => {
      const stage = unit.stage?.toString().toLowerCase();

      if (stage === "active") {
        if (unit.stage !== "Active") {
          unit.stage = "Active";
          updated = true;
        }
      } else {
        if (unit.stage !== "Inactive") {
          unit.stage = "Inactive";
          updated = true;
        }
      }
    });

    if (updated) {
      await project.save();
    }
  }

  console.log("✅ All unit stages normalized");
};


async function removeDuplicateUnits() {
  try {
    const projects = await addproject.find().lean(); // important: lean()

    for (const proj of projects) {
      const seen = new Set();

      const cleanedUnits = proj.add_unit.filter(unit => {
        const key = `${String(unit.project_name)}-${String(unit.block)}-${String(unit.unit_no)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      await addproject.updateOne(
        { _id: proj._id },
        { $set: { add_unit: cleanedUnits } }
      );
    }

    console.log("Duplicate units removed successfully");
  } catch (err) {
    console.error("Error:", err);
  }
}


const normalizeAllProjectsUnits = async () => {
  try {
    const result = await addproject.updateMany(
      {},
      [
        {
          $set: {
            add_unit: {
              $map: {
                input: "$add_unit",
                as: "unit",
                in: {
                  $mergeObjects: [
                    "$$unit",
                    {
                      /* ---------- FIX STAGE ---------- */
                      stage: {
                        $cond: [
                          {
                            $eq: [
                              {
                                $toLower: {
                                  $ifNull: ["$$unit.stage", ""],
                                },
                              },
                              "active",
                            ],
                          },
                          "Active",
                          "Inactive",
                        ],
                      },

                      /* ---------- FIX CATEGORY ---------- */
                      category: {
                        $cond: [
                          { $isArray: "$$unit.category" },
                          { $arrayElemAt: ["$$unit.category", 0] },
                          "$$unit.category",
                        ],
                      },

                      /* ---------- FIX SUB CATEGORY ---------- */
                      sub_category: {
                        $cond: [
                          { $isArray: "$$unit.sub_category" },
                          { $arrayElemAt: ["$$unit.sub_category", 0] },
                          "$$unit.sub_category",
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ]
    );

    console.log("✅ NORMALIZATION COMPLETE");
    console.log("Matched:", result.matchedCount);
    console.log("Modified:", result.modifiedCount);
  } catch (error) {
    console.error("❌ NORMALIZATION FAILED:", error.message);
  }
};


const normalizeProjectLandArea = async () => {
  try {
    const result = await addproject.updateMany(
      {},
      [
        {
          $set: {
            land_area: {
              $cond: [
                { $isArray: "$land_area" },
                { $arrayElemAt: ["$land_area", 0] },
                "$land_area",
              ],
            },
          },
        },
      ]
    );

    console.log("✅ land_area normalized successfully");
    console.log("Matched:", result.matchedCount);
    console.log("Modified:", result.modifiedCount);
  } catch (error) {
    console.error("❌ land_area normalization failed:", error.message);
  }
};

const deleteTestUnit = async () => {
  try {
    const result = await addproject.updateOne(
      { name: "Sector 3 Chandigarh" },
      {
        $pull: {
          add_unit: { unit_no: "test" }, // ✅ remove only this unit
        },
      }
    );

       console.log("unit removed  successfully");
  } catch (error) {
     console.error("❌ units deleted  failed:", error.message);
  }
};

const deleteIssueUnits = async () => {
  try {
    const projects = await addproject.find(
      { add_unit: { $exists: true } },
      { project_name: 1, add_unit: 1 }
    ).lean();

    let deletedCount = 0;

    for (const project of projects) {
      for (const unit of project.add_unit) {
        if (
          Array.isArray(unit.category) ||
          Array.isArray(unit.sub_category)
        ) {
          await addproject.updateOne(
            { _id: project._id },
            {
              $pull: {
                add_unit: { unit_no: unit.unit_no }
              }
            }
          );

          console.log(
            `Deleted unit_no ${unit.unit_no} from project ${project.project_name}`
          );

          deletedCount++;
        }
      }
    }

    console.log("Total deleted units:", deletedCount);
  } catch (error) {
    console.error(error);
  }
};