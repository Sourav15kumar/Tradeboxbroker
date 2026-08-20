const axios = require("axios");

// ============================================================
// OFFICIAL UPSTOX OAUTH ENDPOINTS
// ============================================================

const UPSTOX_AUTHORIZATION_URL =
  "https://api.upstox.com/v2/login/authorization/dialog";

const UPSTOX_TOKEN_URL =
  "https://api.upstox.com/v2/login/authorization/token";

// ============================================================
// CREATE UPSTOX AUTHORIZATION URL
// ============================================================

function createAuthorizationUrl(
  apiKey,
  redirectUri,
  state
) {
  const params = new URLSearchParams();

  params.append("response_type", "code");
  params.append("client_id", apiKey);
  params.append("redirect_uri", redirectUri);
  params.append("state", state);

  return (
    `${UPSTOX_AUTHORIZATION_URL}?` +
    params.toString()
  );
}

// ============================================================
// EXCHANGE AUTHORIZATION CODE
// FOR REAL ACCESS TOKEN
// ============================================================

async function exchangeCodeForAccessToken({
  code,
  apiKey,
  apiSecret,
  redirectUri,
}) {
  const body = new URLSearchParams();

  body.append("code", code);
  body.append("client_id", apiKey);
  body.append("client_secret", apiSecret);
  body.append("redirect_uri", redirectUri);
  body.append(
    "grant_type",
    "authorization_code"
  );

  const response = await axios.post(
    UPSTOX_TOKEN_URL,
    body.toString(),
    {
      headers: {
        Accept: "application/json",
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      timeout: 15000,
    }
  );

  return response.data;
}

module.exports = {
  createAuthorizationUrl,
  exchangeCodeForAccessToken,
};