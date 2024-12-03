const express = require("express");
const { admin, db } = require("../config/firebaseConfig");

const router = express.Router();

// Route to handle teacher signup
router.post("/signup", async (req, res) => {
  const { email, password, name, department, designation } = req.body;

  if (!email || !password || !name || !department || !designation) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save additional teacher data to Firestore
    await db.collection("teachers").doc(userRecord.uid).set({
      name,
      email,
      department,
      designation,
    });

    res.status(201).json({ message: "Teacher registered successfully!" });
  } catch (error) {
    console.error("Error creating teacher:", error.message);

    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ message: "This email is already in use." });
    }

    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

module.exports = router;
