const Contact = require("../../Modals/Contacts/contact");
const { ContactValidationSchema } = require("../../Validations/contact");

exports.create_contact = async (req, res) => {
  const { error, value } = ContactValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const contact = await Contact.create(value);
  res.status(201).json({ success: true, data: contact });
};

exports.getAll_contact = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = ""
    } = req.query;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // 🔍 Search filter (name, surname, phone, email, company)
    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { surname: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
            { "phones.number": { $regex: search, $options: "i" } },
            { "emails.address": { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const total = await Contact.countDocuments();

    const contacts = await Contact.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getOne_contact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.json({ success: true, data: contact });
};

exports.update_contact = async (req, res) => {
  const { error, value } = ContactValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    value,
    { new: true }
  );

  res.json({ success: true, data: contact });
};

exports.remove_contact = async (req, res) => {

  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Deleted successfully" });
};
