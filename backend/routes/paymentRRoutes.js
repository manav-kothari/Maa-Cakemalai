const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { processPayment, verification } = require("../controllers/paymentr");

router.post("/razorpay/:userId", isSignedIn, isAuthenticated, processPayment);

router.post("/verification", verification);

router.param("userId", getUserById);

module.exports = router;
