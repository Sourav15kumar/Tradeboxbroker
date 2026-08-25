const express =
  require("express");

const {
  startAuthentication,
} =
  require(
    "../controllers/jmFinancialController"
  );


const router =
  express.Router();


// ============================================================
// JM FINANCIAL
// DIRECT TRADING AUTHENTICATION
// ============================================================
//
// Frontend:
// API Key + API Secret
//
//        ↓
//
// POST /api/jmfinancial/auth/start
//
//        ↓
//
// Controller
//
//        ↓
//
// JM Financial Trading API
//
//        ↓
//
// Access / Session Token
// ============================================================

router.post(
  "/auth/start",
  startAuthentication
);


module.exports =
  router;