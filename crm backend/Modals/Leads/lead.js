const mongoose =require( "mongoose");

const LeadSchema = new mongoose.Schema(
  {
    requirement: {
      type: String,
      enum: ["Buy", "Rent", "Lease"],
      required: true,
    },

    propertyType: {
      type: [String], // e.g. Residential, Commercial
      default: [],
    },

    purpose: {
      type: String, // End use / Investment
      default: "",
    },

    nri: {
      type: Boolean,
      default: false,
    },

    subType: {
      type: [String],
      default: [],
    },

    unitType: {
      type: [String],
      default: [],
    },

    budgetMin: {
      type: Number,
      default: null,
    },

    budgetMax: {
      type: Number,
      default: null,
    },

    areaMin: {
      type: Number,
      default: null,
    },

    areaMax: {
      type: Number,
      default: null,
    },

    areaMetric: {
      type: String,
      enum: ["Sq Ft", "Sq Yard", "Sq Meter", "Acre"],
      default: "Sq Yard",
    },

    searchLocation: {
      type: String,
      default: "",
    },

    areaSearch: {
      type: String,
      default: "",
    },

    streetAddress: {
      type: String,
      default: "",
    },

    range: {
      type: String, // Within 3 km
      default: "Within 3 km",
    },

    // Location Details
    locCity: { type: String, default: "" },
    locArea: { type: String, default: "" },
    locBlock: { type: [String], default: [] },
    locPinCode: { type: String, default: "" },
    locCountry: { type: String, default: "" },
    locState: { type: String, default: "" },
    locLat: { type: String, default: "" },
    locLng: { type: String, default: "" },

    facing: {
      type: [String],
      default: [],
    },

    roadWidth: {
      type: [String],
      default: [],
    },

    direction: {
      type: [String],
      default: [],
    },

    funding: {
      type: String,
      default: "",
    },

    timeline: {
      type: String,
      default: "",
    },

    furnishing: {
      type: String,
      default: "",
    },

    propertyUnitType: {
      type: [String],
      default: [],
    },

    transactionType: {
      type: String,
      default: "",
    },

    transactionFlexiblePercent: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },

    sendMatchedDeal: {
      type: [String], // deal IDs or emails
      default: [],
    },

    campaignName: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "",
    },

    subSource: {
      type: String,
      default: "",
    },

    // Project-based search
    projectName: {
      type: [String],
      default: [],
    },

    projectCity: {
      type: String,
      default: "",
    },

    projectTowers: {
      type: [String],
      default: [],
    },

    specificUnitType: {
      type: String,
      enum: ["single", "range"],
      default: "single",
    },

    propertyNo: {
      type: String,
      default: "",
    },

    propertyNoEnd: {
      type: String,
      default: "",
    },

    contactDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Lead", LeadSchema);
