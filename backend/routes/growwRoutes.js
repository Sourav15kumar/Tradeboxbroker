const express = require("express");

const {
  authenticateGroww,
} = require("../controllers/growwController");

const router = express.Router();

router.post(
  "/authenticate",
  authenticateGroww
);

module.exports = router;