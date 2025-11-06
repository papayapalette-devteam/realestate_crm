const user = require("../../models/Settings/adduser");
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password)
      return res.status(400).json({ message: "Email and password are required" });

    // ✅ 1️⃣ Admin Login Bypass
    if (Email === "admin" && Password === "admin123") {
      const adminToken = jwt.sign(
        { role: "admin", email: "admin" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token: adminToken,
        user: {
          id: "admin",
          name: "Admin",
          email: "admin",
          mobile: "N/A",
          role: "admin",
        },
      });
    }

    // ✅ 2️⃣ Normal User Login
    const user = await MSP.findOne({ email: Email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = Password === user.password;
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.full_name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
