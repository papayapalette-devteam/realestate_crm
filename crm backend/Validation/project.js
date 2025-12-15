const Joi = require("joi");

/* ---------- Block ---------- */
const blockSchema = Joi.object({
  block_name: Joi.string().allow(""),
  category: Joi.array().items(Joi.any()),
  sub_category: Joi.array().items(Joi.any()),
  land_area: Joi.string().allow(""),
  measurment: Joi.string().allow(""),
  total_blocks: Joi.string().allow(""),
  total_floors: Joi.string().allow(""),
  total_units: Joi.string().allow(""),
  status: Joi.string().allow(""),
  launched_on: Joi.date().optional(),
  expected_competion: Joi.date().optional(),
  possession: Joi.date().optional(),
  parking_type: Joi.array().items(Joi.any()),
  rera_no: Joi.string().allow(""),
  zone: Joi.array().items(Joi.any()),
});

/* ---------- Size ---------- */
const sizeSchema = Joi.object({
  size_name: Joi.string().allow(""),
  block1: Joi.string().allow(""),
  category: Joi.string().allow(""),
  sub_category: Joi.string().allow(""),
  unit_type: Joi.string().allow(""),
  type: Joi.string().allow(""),
  total_sealable_area: Joi.string().allow(""),
  sq_feet1: Joi.string().allow(""),
  covered_area: Joi.string().allow(""),
  sq_feet2: Joi.string().allow(""),
  carpet_area: Joi.string().allow(""),
  sq_feet3: Joi.string().allow(""),
  loading: Joi.string().allow(""),
  percentage: Joi.string().allow(""),
  length: Joi.string().allow(""),
  yard1: Joi.string().allow(""),
  bredth: Joi.string().allow(""),
  yard2: Joi.string().allow(""),
  total_area: Joi.string().allow(""),
  yard3: Joi.string().allow(""),
});

/* ---------- Unit ---------- */
const unitSchema = Joi.object({
  project_name: Joi.string().allow(""),
  unit_no: Joi.string().allow(""),
  unit_type: Joi.string().allow(""),
  category: Joi.string().allow(""),
  sub_category: Joi.string().allow(""),
  block: Joi.string().allow(""),
  size: Joi.string().allow(""),
  size_length: Joi.string().allow(""),
  size_breadth: Joi.string().allow(""),
  size_unit: Joi.string().allow(""),
  size_total_area: Joi.string().allow(""),
  size_total_area_unit: Joi.string().allow(""),
  land_type: Joi.string().allow(""),
  khewat_no: Joi.array().items(Joi.any()),
  killa_no: Joi.array().items(Joi.any()),
  share: Joi.array().items(Joi.any()),
  total_land_area: Joi.string().allow(""),
  water_source: Joi.array().items(Joi.allow()),
  water_level: Joi.array().items(Joi.any()),
  water_pump_type: Joi.array().items(Joi.any()),
  direction: Joi.string().allow(""),
  side_open: Joi.string().allow(""),
  front_on_road: Joi.string().allow(""),
  total_owner: Joi.number().allow(""),
  facing: Joi.string().allow(""),
  road: Joi.string().allow(""),
  ownership: Joi.string().allow(""),

  stage: Joi.string().valid("Active", "Inactive").default("Inactive"),

  builtup_type: Joi.string().allow(""),
  floor: Joi.array().items(Joi.any()),
  cluter_details: Joi.array().items(Joi.any()),
  length: Joi.array().items(Joi.any()),
  bredth: Joi.array().items(Joi.any()),
  total_area: Joi.array().items(Joi.any()),
  measurment2: Joi.array().items(Joi.any()),

  ocupation_date: Joi.string().allow(""),
  age_of_construction: Joi.string().allow(""),
  furnishing_details: Joi.string().allow(""),
  furnished_item: Joi.string().allow(""),
  enter_furnishing_details: Joi.string().allow(""),
  remarks: Joi.string().allow(""),

  location: Joi.string().allow(""),
  lattitude: Joi.string().allow(""),
  langitude: Joi.string().allow(""),

  uaddress: Joi.string().allow(""),
  ustreet: Joi.string().allow(""),
  ulocality: Joi.string().allow(""),
  ucity: Joi.string().allow(""),
  uzip: Joi.string().allow(""),
  ustate: Joi.string().allow(""),
  ucountry: Joi.string().allow(""),

  owner_details: Joi.array().items(Joi.string().hex().length(24)),
  associated_contact: Joi.array().items(Joi.string().hex().length(24)),
  previousowner_details: Joi.array().items(Joi.string().hex().length(24)),

  relation: Joi.string().allow(""),
  s_no: Joi.array().items(Joi.any()),
  preview: Joi.array().items(Joi.any()),
  descriptions: Joi.array().items(Joi.any()),
  s_no1: Joi.array().items(Joi.any()),
  url: Joi.array().items(Joi.any()),
  document_name: Joi.array().items(Joi.any()),
  document_no: Joi.array().items(Joi.any()),
  document_Date: Joi.array().items(Joi.any()),
  linkded_contact: Joi.array().items(Joi.any()),
  image: Joi.array().items(Joi.any()),

  follow_up: Joi.string().allow(""),
  last_conduct_date_time: Joi.string().allow(""),
  reason: Joi.string().allow(""),
  other_reason: Joi.string().allow(""),
  logged_user: Joi.string().allow(""),
});

/* ---------- Price ---------- */
const priceSchema = Joi.object({
  block: Joi.string().allow(""),
  category: Joi.string().allow(""),
  sub_category: Joi.string().allow(""),
  size: Joi.string().allow(""),
  covered_area: Joi.string().allow(""),
  base_rate: Joi.string().allow(""),
  chargename: Joi.string().allow(""),
  chargetype: Joi.string().allow(""),
  name: Joi.string().allow(""),
  type: Joi.string().allow(""),
  calculation_type: Joi.string().allow(""),
  blank1: Joi.string().allow(""),
  blank2: Joi.string().allow(""),
  blank3: Joi.string().allow(""),
  name1: Joi.string().allow(""),
  type1: Joi.string().allow(""),
  calculation_type1: Joi.string().allow(""),
  blank4: Joi.string().allow(""),
});

/* ---------- Payment ---------- */
const paymentSchema = Joi.object({
  payment_planname: Joi.string().allow(""),
  step_name: Joi.array().items(Joi.any()),
  calculation_type: Joi.array().items(Joi.any()),
  blank1: Joi.array().items(Joi.any()),
  blank2: Joi.array().items(Joi.any()),
  blank3: Joi.array().items(Joi.any()),
  condition: Joi.string().allow(""),
});

/* ---------- Project ---------- */
const projectValidator = Joi.object({
  name: Joi.string().required(),
  developer_name: Joi.string().hex().length(24).optional(),
  joint_venture: Joi.string().allow(""),
  secondary_developer: Joi.string().allow(""),
  rera_number: Joi.string().allow(""),
  descriptions: Joi.string().allow(""),

  category: Joi.array().items(Joi.any()),
  sub_category: Joi.array().items(Joi.any()),
  land_area: Joi.string().allow(""),

  measurment1: Joi.string().allow(""),
  total_block: Joi.string().allow(""),
  total_floor: Joi.string().allow(""),
  total_units: Joi.string().allow(""),
  status: Joi.string().allow(""),

  launched_on: Joi.string().allow(""),
  expected_competion: Joi.string().allow(""),
  possession: Joi.string().allow(""),

  parking_type: Joi.array().items(Joi.any()),
  approved_bank: Joi.array().items(Joi.any()),
  approvals: Joi.array().items(Joi.any()),

  registration_no: Joi.array().items(Joi.any()),
  date: Joi.array().items(Joi.any()),
  pic: Joi.array().items(Joi.any()),

  owner: Joi.array().items(Joi.any()),
  team: Joi.array().items(Joi.any()),
  visible_to: Joi.string().allow(""),

  location: Joi.string().allow(""),
  lattitude: Joi.number().allow(""),
  langitude: Joi.number().allow(""),

  address: Joi.string().allow(""),
  street: Joi.string().allow(""),
  locality: Joi.string().allow(""),
  city: Joi.string().allow(""),
  zip: Joi.string().allow(""),
  state: Joi.string().allow(""),
  country: Joi.string().allow(""),

  add_block: Joi.array().items(blockSchema),
  add_size: Joi.array().items(sizeSchema),
  add_unit: Joi.array().items(unitSchema),

  basic_aminities: Joi.array().items(Joi.any()),
  features_aminities: Joi.array().items(Joi.any()),
  nearby_aminities: Joi.array().items(Joi.any()),

  price_list: Joi.array().items(priceSchema),
  Payment_plan: Joi.array().items(paymentSchema),
});

module.exports =   projectValidator

