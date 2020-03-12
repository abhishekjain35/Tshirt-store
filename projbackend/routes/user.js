const express = require("express");
const router = express.Router();

const { getUserById, getUser, getAllUsers } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/user", getAllUsers)
module.exports = router;
