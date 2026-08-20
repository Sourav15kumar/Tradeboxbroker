const express =
  require("express");

const router =
  express.Router();

const {
  startAuthentication,
  loginAuthentication,
  verifyOtp,
  completeAuthentication,
} =
  require(
    "../controllers/hdfcController"
  );


// ============================================================
// 1. API KEY + SECRET
// ============================================================

router.post(
  "/auth/start",
  startAuthentication
);


// ============================================================
// 2. HDFC LOGIN
// ============================================================

router.post(
  "/auth/login",
  loginAuthentication
);


// ============================================================
// 3. OTP
// ============================================================

router.post(
  "/auth/otp",
  verifyOtp
);


// ============================================================
// 4. AUTHORISE + ACCESS TOKEN
// ============================================================

router.post(
  "/auth/complete",
  completeAuthentication
);


module.exports =
  router;