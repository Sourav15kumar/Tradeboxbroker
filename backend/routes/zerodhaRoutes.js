// const express = require("express");

// const {
//   startAuthentication,
//   callback,
// } = require("../controllers/zerodhaController");

// const router = express.Router();

// router.post(
//   "/authenticate",
//   startAuthentication
// );

// router.get(
//   "/callback",
//   callback
// );

// module.exports = router;

const express = require("express");

const {
  startAuthentication,
  callback,
} = require("../controllers/zerodhaController");

const router = express.Router();


// START ZERODHA AUTHENTICATION


router.post(
  "/authenticate",
  startAuthentication
);


// ZERODHA CALLBACK


router.get(
  "/callback",
  callback
);

module.exports = router;