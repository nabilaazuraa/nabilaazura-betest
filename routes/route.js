const express = require("express");

const login = require("../controller/login");
const createUser = require("../controller/signup");
const { getUserByAccountNumber, getUserByIdentityNumber } = require("../controller/getUserDetails");

const router = express.Router();

// Existing routes
router.post("/signup", createUser);
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// New routes for getting user details
router.get("/user/account/:accountNumber", getUserByAccountNumber);
router.get("/user/identity/:identityNumber", getUserByIdentityNumber);

module.exports = router;