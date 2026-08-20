const axios = require("axios");
const crypto = require("crypto");

// ============================================================
// ICICI BREEZE
// ============================================================

const ICICI_LOGIN_URL =
  "https://api.icicidirect.com/apiuser/login";

const ICICI_API_BASE =
  "https://api.icicidirect.com/breezeapi/api/v1";

// ============================================================
// CREATE OFFICIAL ICICI LOGIN URL
// ============================================================

function createLoginUrl(apiKey) {
  if (!apiKey) {
    throw new Error(
      "ICICI Breeze API Key is required."
    );
  }

  return (
    `${ICICI_LOGIN_URL}?api_key=` +
    encodeURIComponent(apiKey)
  );
}


// ============================================================
// CUSTOMER DETAILS
//
// API_Session obtained from ICICI login is sent here.
// This returns the Breeze session details.
// ============================================================

async function getCustomerDetails({
  apiKey,
  apiSession,
}) {
  const response = await axios.get(
    `${ICICI_API_BASE}/customerdetails`,
    {
      params: {
        session_token: apiSession,
        app_key: apiKey,
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
// CREATE CHECKSUM
//
// Required for authenticated Breeze API calls.
// checksum = SHA256(timestamp + JSON body + secretKey)
// ============================================================

function createChecksum({
  timestamp,
  body,
  secretKey,
}) {
  const payload =
    timestamp +
    JSON.stringify(body) +
    secretKey;

  return crypto
    .createHash("sha256")
    .update(payload)
    .digest("hex");
}


// ============================================================
// TEST AUTHENTICATED REQUEST
// ============================================================

async function verifySession({
  apiKey,
  secretKey,
  sessionToken,
}) {
  const timestamp =
    new Date()
      .toISOString()
      .replace(
        /\.\d{3}Z$/,
        ".000Z"
      );

  const body = {};

  const checksum =
    createChecksum({
      timestamp,
      body,
      secretKey,
    });

  const response =
    await axios.get(
      `${ICICI_API_BASE}/funds`,
      {
        headers: {
          "X-AppKey":
            apiKey,

          "X-SessionToken":
            sessionToken,

          "X-Timestamp":
            timestamp,

          "X-Checksum":
            `token ${checksum}`,

          Accept:
            "application/json",
        },

        timeout: 15000,
      }
    );

  return response.data;
}


module.exports = {
  createLoginUrl,
  getCustomerDetails,
  createChecksum,
  verifySession,
};