const Joi =require( "joi");

module.exports.leadValidationSchema = Joi.object({
  requirement: Joi.string().valid("Buy", "Rent", "Lease").required(),

  propertyType: Joi.array().items(Joi.string()).default([]),

  purpose: Joi.string().allow(""),

  nri: Joi.boolean().default(false),

  subType: Joi.array().items(Joi.string()).default([]),

  unitType: Joi.array().items(Joi.string()).default([]),

  budgetMin: Joi.number().allow(null, ""),
  budgetMax: Joi.number().allow(null, ""),

  areaMin: Joi.number().allow(null, ""),
  areaMax: Joi.number().allow(null, ""),

  areaMetric: Joi.string()
    .valid("Sq Ft", "Sq Yard", "Sq Meter", "Acre")
    .default("Sq Yard"),

  searchLocation: Joi.string().allow(""),
  areaSearch: Joi.string().allow(""),
  streetAddress: Joi.string().allow(""),

  range: Joi.string().default("Within 3 km"),

  locCity: Joi.string().allow(""),
  locArea: Joi.string().allow(""),
  locBlock: Joi.array().items(Joi.string()).default([]),
  locPinCode: Joi.string().allow(""),
  locCountry: Joi.string().allow(""),
  locState: Joi.string().allow(""),
  locLat: Joi.string().allow(""),
  locLng: Joi.string().allow(""),

  facing: Joi.array().items(Joi.string()).default([]),
  roadWidth: Joi.array().items(Joi.string()).default([]),
  direction: Joi.array().items(Joi.string()).default([]),

  funding: Joi.string().allow(""),
  timeline: Joi.string().allow(""),
  furnishing: Joi.string().allow(""),

  propertyUnitType: Joi.array().items(Joi.string()).default([]),

  transactionType: Joi.string().allow(""),

  transactionFlexiblePercent: Joi.number().min(0).max(100).default(50),

  sendMatchedDeal: Joi.array().items(Joi.string()).default([]),

  campaignName: Joi.string().allow(""),
  source: Joi.string().allow(""),
  subSource: Joi.string().allow(""),

  projectName: Joi.array().items(Joi.string()).default([]),
  projectCity: Joi.string().allow(""),
  projectTowers: Joi.array().items(Joi.string()).default([]),

  specificUnitType: Joi.string().valid("single", "range").default("single"),

  propertyNo: Joi.string().allow(""),
  propertyNoEnd: Joi.string().allow(""),

  contactDetails: Joi.string().required(),
});
