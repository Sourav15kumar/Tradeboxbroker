const axios = require("axios");

// ============================================================
// OFFICIAL CURRENT KOTAK NEO LOGIN ENDPOINTS
// ============================================================

const KOTAK_TOTP_LOGIN_URL =
  "https://mis.kotaksecurities.com/login/1.0/tradeApiLogin";

const KOTAK_MPIN_VALIDATE_URL =
  "https://mis.kotaksecurities.com/login/1.0/tradeApiValidate";


// ============================================================
// STEP 1: TOTP LOGIN
// ============================================================

async function totpLogin({
  consumerKey,
  mobileNumber,
  ucc,
  totp,
}) {
  const response = await axios.post(
    KOTAK_TOTP_LOGIN_URL,
    {
      mobileNumber,
      ucc,
      totp,
    },
    {
      headers: {
        Authorization: consumerKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      timeout: 15000,
    }
  );

  return response.data;
}


// ============================================================
// STEP 2: MPIN VALIDATION
// ============================================================

async function validateMpin({
  consumerKey,
  sid,
  viewToken,
  mpin,
}) {
  const response = await axios.post(
    KOTAK_MPIN_VALIDATE_URL,
    {
      mpin,
    },
    {
      headers: {
        Authorization: consumerKey,
        sid,
        Auth: viewToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      timeout: 15000,
    }
  );

  return response.data;
}


module.exports = {
  totpLogin,
  validateMpin,
};