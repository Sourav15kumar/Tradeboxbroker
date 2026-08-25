const express = require("express");

const {
  authenticate,
} = require("../controllers/anandRathiController");

const router = express.Router();


// ============================================================
// AUTHENTICATE
// ============================================================

router.post(
  "/authenticate",
  authenticate
);


// ============================================================
// EXPORT
// ============================================================

module.exports = router;