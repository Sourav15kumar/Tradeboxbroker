const express =
  require("express");


const router =
  express.Router();


const {
  startAuthentication,
  handleCallback,
} =
  require(
    "../controllers/iciciController"
  );


// ============================================================
// START ICICI LOGIN
// ============================================================

router.post(
  "/start",
  startAuthentication
);


// ============================================================
// ICICI REDIRECT / CALLBACK
//
// Both GET and POST are allowed because ICICI's login
// flow/documentation has historically exposed API_Session
// through redirect/form data.
// ============================================================

router.get(
  "/callback",
  handleCallback
);


router.post(
  "/callback",
  handleCallback
);


module.exports =
  router;