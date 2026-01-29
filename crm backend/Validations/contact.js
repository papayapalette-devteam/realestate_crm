const Joi = require("joi");

const address = Joi.object({
  hNo: Joi.string().allow(""),
  street: Joi.string().allow(""),
  country: Joi.string().allow(""),
  state: Joi.string().allow(""),
  city: Joi.string().allow(""),
  tehsil: Joi.string().allow(""),
  postOffice: Joi.string().allow(""),
  pinCode: Joi.string().allow(""),
  location: Joi.string().allow(""),
  area: Joi.string().allow("")
});

module.exports.ContactValidationSchema = Joi.object({
  title: Joi.string().allow(""),
  name: Joi.string().required(),
  surname: Joi.string().allow(""),
  fatherName: Joi.string().allow(""),
  countryCode: Joi.string().default("+91"),

  phones: Joi.array().items(
    Joi.object({
      number: Joi.string().allow(""),
      type: Joi.string().allow("")
    })
  ),

  emails: Joi.array().items(
    Joi.object({
      address: Joi.string().email().allow(""),
      type: Joi.string().allow("")
    })
  ),

  tags: Joi.array().items(Joi.string()),
  description: Joi.string().allow(""),

  professionCategory: Joi.string().allow(""),
  professionSubCategory: Joi.string().allow(""),
  designation: Joi.string().allow(""),
  company: Joi.string().allow(""),
  workOffice: Joi.string().allow(""),

  source: Joi.string().allow(""),
  team: Joi.string().allow(""),
  owner: Joi.string().allow(""),
  visibleTo: Joi.string().allow(""),

  personalAddress: address,
  correspondenceAddress: address,

  gender: Joi.string().allow(""),
  maritalStatus: Joi.string().allow(""),
birthDate: Joi.date().allow(null, "").optional(),
anniversaryDate: Joi.date().allow(null, "").optional(),


  educations: Joi.array().items(
    Joi.object({
      education: Joi.string().allow(""),
      degree: Joi.string().allow(""),
      school: Joi.string().allow("")
    })
  ),

  loans: Joi.array().items(
    Joi.object({
      loanType: Joi.string().allow(""),
      bank: Joi.string().allow(""),
      loanAmount: Joi.string().allow("")
    })
  ),

  socialMedia: Joi.array().items(
    Joi.object({
      platform: Joi.string().allow(""),
      url: Joi.string().uri().allow("")
    })
  ),

  incomes: Joi.array().items(
    Joi.object({
      incomeType: Joi.string().allow(""),
      amount: Joi.string().allow("")
    })
  ),

  documents: Joi.array().items(
    Joi.object({
      documentName: Joi.string().allow(""),
      documentType: Joi.string().allow(""),
      projectName: Joi.string().allow(""),
      block: Joi.string().allow(""),
      unitNumber: Joi.string().allow(""),
      documentNo: Joi.string().allow(""),
      documentPicture: Joi.string().allow(null)
    })
  )
});
