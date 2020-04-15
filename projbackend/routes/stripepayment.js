const express = require("express");
const router = express.Router();

const { makePayment } = require("../controllers/stripepayment");

router.post("/stripePayment", makePayment)

module.exports = router