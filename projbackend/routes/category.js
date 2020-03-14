const express = require("express");
const router = express.Router();

const {
    getCategoryById,
    getCategory,
    createCategory,
    getAllCategory,
    updateCategory
} = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);
module.exports = router;