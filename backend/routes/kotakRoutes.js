const express =
  require("express");

const router =
  express.Router();

const {
  authenticateKotak,
} =
  require("../controllers/kotakController");


// ============================================================
// KOTAK AUTHENTICATION
// ============================================================

router.post(
  "/authenticate",
  authenticateKotak
);


module.exports =
  router;