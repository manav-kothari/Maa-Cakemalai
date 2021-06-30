const express = require("express");
const router = express.Router();

const {
  getFlavorById,
  createFlavor,
  getFlavor,
  getAllFlavor,
  updateFlavor,
  removeFlavor,
} = require("../controllers/flavor");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("flavorId", getFlavorById);

//actual routers goes here

//create
router.post(
  "/flavor/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createFlavor
);

//read
router.get("/flavor/:flavorId", getFlavor);
router.get("/flavors", getAllFlavor);

//update
router.put(
  "/flavor/:flavorId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateFlavor
);

//delete

router.delete(
  "/flavor/:flavorId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeFlavor
);

module.exports = router;
