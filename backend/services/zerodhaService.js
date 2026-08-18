// const axios = require("axios");
// const crypto = require("crypto");

// function createChecksum(apiKey, requestToken, apiSecret) {
//   return crypto
//     .createHash("sha256")
//     .update(apiKey + requestToken + apiSecret)
//     .digest("hex");
// }

// function createLoginUrl(apiKey) {
//   return (
//     `https://kite.zerodha.com/connect/login` +
//     `?v=3&api_key=${encodeURIComponent(apiKey)}`
//   );
// }

// async function generateAccessToken({
//   apiKey,
//   apiSecret,
//   requestToken,
// }) {
//   const checksum = createChecksum(
//     apiKey,
//     requestToken,
//     apiSecret
//   );

//   const params = new URLSearchParams();

//   params.append("api_key", apiKey);
//   params.append("request_token", requestToken);
//   params.append("checksum", checksum);

//   const response = await axios.post(
//     "https://api.kite.trade/session/token",
//     params.toString(),
//     {
//       headers: {
//         "X-Kite-Version": "3",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );

//   return response.data;
// }

// module.exports = {
//   createLoginUrl,
//   generateAccessToken,
// };


const axios = require("axios");
const crypto = require("crypto");

// ==========================================
// CREATE ZERODHA CHECKSUM
// ==========================================

function createChecksum(
  apiKey,
  requestToken,
  apiSecret
) {
  return crypto
    .createHash("sha256")
    .update(
      apiKey +
        requestToken +
        apiSecret
    )
    .digest("hex");
}

// ==========================================
// CREATE ZERODHA LOGIN URL
// ==========================================

function createLoginUrl(
  apiKey,
  authId
) {
  const redirectParams =
    `auth_id=${encodeURIComponent(authId)}`;

  return (
    "https://kite.zerodha.com/connect/login" +
    "?v=3" +
    `&api_key=${encodeURIComponent(apiKey)}` +
    `&redirect_params=${encodeURIComponent(
      redirectParams
    )}`
  );
}

// ==========================================
// EXCHANGE REQUEST TOKEN
// FOR ACCESS TOKEN
// ==========================================

async function generateAccessToken({
  apiKey,
  apiSecret,
  requestToken,
}) {
  // ----------------------------------------
  // Create SHA-256 checksum
  // ----------------------------------------

  const checksum = createChecksum(
    apiKey,
    requestToken,
    apiSecret
  );

  console.log(
    "Checksum generated successfully."
  );

  // ----------------------------------------
  // Form data
  // ----------------------------------------

  const params = new URLSearchParams();

  params.append(
    "api_key",
    apiKey
  );

  params.append(
    "request_token",
    requestToken
  );

  params.append(
    "checksum",
    checksum
  );

  // ----------------------------------------
  // Call Zerodha Session API
  // ----------------------------------------

  console.log(
    "Sending request_token to Zerodha..."
  );

  const response = await axios.post(
    "https://api.kite.trade/session/token",
    params.toString(),
    {
      headers: {
        "X-Kite-Version": "3",
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

module.exports = {
  createLoginUrl,
  generateAccessToken,
};