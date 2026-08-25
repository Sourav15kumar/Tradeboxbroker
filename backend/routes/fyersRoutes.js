const express =
  require("express");


const {
  startAuthentication,
  handleCallback,
} =
  require("../controllers/fyersController");


const router =
  express.Router();


// ============================================================
// START FYERS AUTHENTICATION
// ============================================================

router.post(
  "/auth/start",
  startAuthentication
);


// ============================================================
// FYERS CALLBACK
// ============================================================

router.get(
  "/callback",
  handleCallback
);


// ============================================================
// EXPORT
// ============================================================

module.exports =
  router;