const axios = require("axios");

// ============================================================
// SYMPHONY XTS REFERENCE ENDPOINTS
// ============================================================
//
// NOTE:
// Ye Symphony ke official Interactive API reference endpoints hain.
//
// JM Financial production keys agar broker-specific host se
// bound hain, to JM se exact production host milne ke baad
// sirf URLs change karne honge.
//
// USER API KEY / SECRET yahan hardcode nahi honge.
// ============================================================

const XTS_OAUTH_LOGIN_URL =
  "https://developers.symphonyfintech.in/1interactive/thirdparty";

const XTS_HOST_LOOKUP_URL =
  "https://developers.symphonyfintech.in/hostlookup";

const XTS_LOGIN_FALLBACK_URL =
  "https://developers.symphonyfintech.in/1interactive/user/session";


// ============================================================
// CREATE OAUTH LOGIN URL
// ============================================================

function createAuthorizationUrl({
  apiKey,
  callbackUrl,
}) {
  if (!apiKey) {
    throw new Error(
      "JM Financial API Key is required."
    );
  }

  if (!callbackUrl) {
    throw new Error(
      "Tradebox callback URL is required."
    );
  }

  const url =
    new URL(
      XTS_OAUTH_LOGIN_URL
    );

  url.searchParams.set(
    "appKey",
    apiKey
  );

  url.searchParams.set(
    "returnURL",
    callbackUrl
  );

  return url.toString();
}


// ============================================================
// HOST LOOKUP
// ============================================================
//
// Official XTS flow requires:
// accesspassword
// version
//
// These values are NOT the user's API Secret.
// They belong to the broker/XTS environment.
// ============================================================

async function getHostLookup({
  accessPassword,
  version,
}) {
  if (!accessPassword) {
    throw new Error(
      "JM/XTS HostLookup access password is required."
    );
  }

  if (!version) {
    throw new Error(
      "JM/XTS HostLookup version is required."
    );
  }

  const response =
    await axios.post(
      XTS_HOST_LOOKUP_URL,
      {
        accesspassword:
          accessPassword,

        version,
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


  const result =
    response.data?.result;


  if (!result) {
    console.error(
      "XTS HostLookup response:",
      response.data
    );

    throw new Error(
      "JM/XTS HostLookup returned an invalid response."
    );
  }


  const uniqueKey =
    result.UniqueKey ||
    result.uniqueKey;


  const connectionString =
    result.connectionString;


  if (!uniqueKey) {
    throw new Error(
      "JM/XTS HostLookup did not return UniqueKey."
    );
  }


  if (!connectionString) {
    throw new Error(
      "JM/XTS HostLookup did not return connectionString."
    );
  }


  return {
    uniqueKey,
    connectionString,
  };
}


// ============================================================
// GENERATE FINAL SESSION TOKEN
// ============================================================

async function generateSessionToken({
  apiKey,
  apiSecret,
  accessToken,
  uniqueKey,
  connectionString,
}) {
  if (!apiKey) {
    throw new Error(
      "JM Financial API Key is required."
    );
  }

  if (!apiSecret) {
    throw new Error(
      "JM Financial API Secret is required."
    );
  }

  if (!accessToken) {
    throw new Error(
      "JM Financial access token is required."
    );
  }

  if (!uniqueKey) {
    throw new Error(
      "JM/XTS UniqueKey is required."
    );
  }


  const loginUrl =
    connectionString
      ? `${connectionString.replace(
          /\/$/,
          ""
        )}/user/session`
      : XTS_LOGIN_FALLBACK_URL;


  const response =
    await axios.post(
      loginUrl,
      {
        secretKey:
          apiSecret,

        appKey:
          apiKey,

        uniqueKey,

        accessToken,
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


  const sessionToken =
    response.data
      ?.result
      ?.token;


  if (!sessionToken) {
    console.error(
      "JM/XTS login response:",
      response.data
    );

    throw new Error(
      "JM Financial session token was not received."
    );
  }


  return {
    sessionToken,
    rawResponse:
      response.data,
  };
}


module.exports = {
  createAuthorizationUrl,
  getHostLookup,
  generateSessionToken,
};