const SubAdmin = require("../../models/Settings/addsub_admin");

const add_subadmin = async (req, res) => {
  try {
    const { User, UserName, Password } = req.body;

    const new_sub_admin = new SubAdmin({ User, UserName, Password });

    // Save to database
    const resp = await new_sub_admin.save();
    res.status(200).send({ message: "SubAdmin Created", user: resp });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating sub-admin", error });
  }
};

const view_sub_admins = async (req, res) => {
  try {
    const all_sub_admins = await SubAdmin.find()
      .sort({ createdAt: -1 })
      .populate("User");

    res.status(200).json({
      message: "SubAdmins fetched successfully",
      sub_admin: all_sub_admins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const remove_sub_admin = async (req, res) => {
  try {
    const _id = req.params._id;
    const subadmin = await SubAdmin.find({ _id: _id });
    if (!subadmin) {
      return res.send({ message: "sub-admin not found" });
    }
    const resp = await SubAdmin.deleteOne({ _id: _id });
    res.status(200).send({ message: "sub-admin deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { add_subadmin, view_sub_admins,remove_sub_admin};
