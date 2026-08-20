const express = require("express");

const router = express.Router();

const {
  startAuthentication,
  handleCallback,
} = require("../controllers/upstoxController");

// ============================================================
// UPSTOX AUTHENTICATION START
// ============================================================

router.post(
  "/auth/start",
  startAuthentication
);

// ============================================================
// UPSTOX OAUTH CALLBACK
// ============================================================

router.get(
  "/callback",
  handleCallback
);

module.exports = router;