const express = require("express");

const {
  startAuthentication,
  handleCallback,
} = require("../controllers/motilalController");

const router = express.Router();

// ============================================================
// START AUTHENTICATION
// ============================================================

router.post("/auth/start", startAuthentication);

// ============================================================
// MOTILAL CALLBACK
// ============================================================

router.get("/callback", handleCallback);

// ============================================================
// EXPORT
// ============================================================

module.exports = router;