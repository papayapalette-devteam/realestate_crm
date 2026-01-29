const Lead = require( "../../Modals/Leads/lead.js");
const { leadValidationSchema } =require( "../../Validations/lead.js");
const mongoose =require("mongoose");

/**
 * ✅ CREATE
 */
exports.createLeads = async (req, res) => {
  try {
    const { error, value } = leadValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(e => e.message),
      });
    }

    const requirement = await Lead.create(value);

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: requirement,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/**
 * ✅ GET ALL (Pagination + Search)
 * ?page=1&limit=10&search=Delhi
 */
exports.getLeads = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const searchQuery = search
      ? {
          $or: [
            { requirement: { $regex: search, $options: "i" } },
            { locCity: { $regex: search, $options: "i" } },
            { locArea: { $regex: search, $options: "i" } },
            { projectCity: { $regex: search, $options: "i" } },
            { source: { $regex: search, $options: "i" } },
            { campaignName: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Lead.countDocuments(searchQuery);

    const data = await Lead.find(searchQuery)
      .populate("contactDetails")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/**
 * ✅ GET BY ID
 */
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const requirement = await Lead.findById(id)
      .populate("contactDetails");

    if (!requirement) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: requirement });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/**
 * ✅ UPDATE
 */
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = leadValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(e => e.message),
      });
    }

    const updated = await Lead.findByIdAndUpdate(
      id,
      value,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      message: "Lead updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/**
 * ✅ DELETE
 */
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Lead.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
