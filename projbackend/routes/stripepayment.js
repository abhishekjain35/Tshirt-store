const express = require("express");
const router = express.Router();

router.post("/stripePayment", makePayment)

module.exports = router