const axios = require("axios");
const crypto = require("crypto");


// ============================================================
// FYERS URLS
// ============================================================

const FYERS_AUTH_URL =
  "https://api-t1.fyers.in/api/v3/generate-authcode";

const FYERS_TOKEN_URL =
  "https://api-t1.fyers.in/api/v3/validate-authcode";


// ============================================================
// CREATE FYERS LOGIN URL
// ============================================================

function createLoginUrl({
  appId,
  redirectUri,
  state,
}) {

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    response_type: "code",
    state: state,
  });

  return `${FYERS_AUTH_URL}?${params.toString()}`;
}


// ============================================================
// CREATE APP ID HASH
// SHA256(APP_ID:SECRET_ID)
// ============================================================

function createAppIdHash(
  appId,
  secretId
) {

  return crypto
    .createHash("sha256")
    .update(`${appId}:${secretId}`)
    .digest("hex");
}


// ============================================================
// EXCHANGE AUTH CODE FOR ACCESS TOKEN
// ============================================================

async function generateAccessToken({
  appId,
  secretId,
  authCode,
}) {

  const appIdHash =
    createAppIdHash(
      appId,
      secretId
    );


  const response = await axios.post(
    FYERS_TOKEN_URL,

    {
      grant_type:
        "authorization_code",

      appIdHash:
        appIdHash,

      code:
        authCode,
    },

    {
      headers: {
        "Content-Type":
          "application/json",

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
  generateAccessToken,
};