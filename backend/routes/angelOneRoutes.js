const express =
  require("express");

const router =
  express.Router();

const {
  startAuthentication,
  handleCallback,
} =
  require(
    "../controllers/angelOneController"
  );


// ============================================================
// START ANGEL ONE AUTHENTICATION
// ============================================================

router.post(
  "/auth/start",
  startAuthentication
);


// ============================================================
// ANGEL ONE CALLBACK
// ============================================================

router.get(
  "/callback",
  handleCallback
);


module.exports =
  router;