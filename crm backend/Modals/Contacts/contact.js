const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema({
  number: String,
  type: { type: String, default: "Personal" }
}, { _id: false });

const EmailSchema = new mongoose.Schema({
  address: String,
  type: { type: String, default: "Personal" }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  hNo: String,
  street: String,
  country: String,
  state: String,
  city: String,
  tehsil: String,
  postOffice: String,
  pinCode: String,
  location: String,
  area: String
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  education: String,
  degree: String,
  school: String
}, { _id: false });

const LoanSchema = new mongoose.Schema({
  loanType: String,
  bank: String,
  loanAmount: String
}, { _id: false });

const SocialMediaSchema = new mongoose.Schema({
  platform: String,
  url: String
}, { _id: false });

const IncomeSchema = new mongoose.Schema({
  incomeType: String,
  amount: String
}, { _id: false });

const DocumentSchema = new mongoose.Schema({
  documentName: String,
  documentType:String,
  projectName:String,
  block:String,
  unitNumber:String,
  documentNo: String,
  documentPicture: String // store file URL
}, { _id: false });

const ContactSchema = new mongoose.Schema({
  // Basic Details
  title: String,
  name: String,
  surname: String,
  fatherName: String,
  countryCode: { type: String, default: "+91" },
  phones: [PhoneSchema],
  emails: [EmailSchema],
  tags: [String],
  description: String,

  // Professional Details
  professionCategory: String,
  professionSubCategory: String,
  designation: String,
  company: String,
  workOffice: String,

  // System Details
  source: String,
  team: String,
  owner: String,
  visibleTo: String,

  // Addresses
  personalAddress: AddressSchema,
  correspondenceAddress: AddressSchema,

  // Other Details
  gender: String,
  maritalStatus: String,
  birthDate: Date,
  anniversaryDate: Date,

  // Arrays
  educations: [EducationSchema],
  loans: [LoanSchema],
  socialMedia: [SocialMediaSchema],
  incomes: [IncomeSchema],
  documents: [DocumentSchema]

}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);
