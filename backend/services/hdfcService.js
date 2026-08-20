const axios = require("axios");

const HDFC_BASE_URL =
  "https://developer.hdfcsec.com/oapi/v1";

// ============================================================
// STEP 1
// CREATE HDFC LOGIN SESSION
// ============================================================

async function createLoginSession(apiKey) {
  const response = await axios.get(
    `${HDFC_BASE_URL}/login`,
    {
      params: {
        api_key: apiKey,
      },

      headers: {
        Accept: "application/json",
      },

      timeout: 15000,
    }
  );

  return response.data;
}


// ============================================================
// STEP 2
// VALIDATE HDFC LOGIN
// ============================================================

async function validateLogin({
  apiKey,
  tokenId,
  username,
  password,
}) {
  const response = await axios.post(
    `${HDFC_BASE_URL}/login/validate`,
    {
      username,
      password,
    },
    {
      params: {
        api_key: apiKey,
        token_id: tokenId,
      },

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      timeout: 15000,
    }
  );

  return response.data;
}


// ============================================================
// STEP 3
// VALIDATE OTP
// ============================================================

async function validateTwoFactor({
  apiKey,
  tokenId,
  otp,
}) {
  const response = await axios.post(
    `${HDFC_BASE_URL}/twofa/validate`,
    {
      answer: otp,
    },
    {
      params: {
        api_key: apiKey,
        token_id: tokenId,
      },

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      timeout: 15000,
    }
  );

  return response.data;
}


// ============================================================
// STEP 4
// AUTHORISE USER
// ============================================================

async function authoriseUser({
  apiKey,
  tokenId,
  requestToken,
}) {
  const response = await axios.get(
    `${HDFC_BASE_URL}/authorise`,
    {
      params: {
        api_key: apiKey,
        token_id: tokenId,
        consent: true,
        request_token: requestToken,
      },

      headers: {
        Accept: "application/json",
      },

      timeout: 15000,
    }
  );

  return response.data;
}


// ============================================================
// STEP 5
// REQUEST TOKEN -> ACCESS TOKEN
// ============================================================

async function generateAccessToken({
  apiKey,
  apiSecret,
  requestToken,
}) {
  const response = await axios.post(
    `${HDFC_BASE_URL}/access-token`,
    {
      apiSecret,
    },
    {
      params: {
        api_key: apiKey,
        request_token: requestToken,
      },

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      timeout: 15000,
    }
  );

  return response.data;
}


module.exports = {
  createLoginSession,
  validateLogin,
  validateTwoFactor,
  authoriseUser,
  generateAccessToken,
};