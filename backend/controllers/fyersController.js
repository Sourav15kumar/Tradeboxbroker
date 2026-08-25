const crypto = require("crypto");

const fyersService =
  require("../services/fyersService");


// ============================================================
// TEMPORARY AUTH STORAGE
// ============================================================

const pendingAuth = new Map();


// 10 minutes
const AUTH_EXPIRY_MS =
  10 * 60 * 1000;


// ============================================================
// CREATE RANDOM STATE
// ============================================================

function createState() {

  return crypto
    .randomBytes(32)
    .toString("hex");
}


// ============================================================
// DELETE EXPIRED AUTH REQUESTS
// ============================================================

function cleanExpiredAuth() {

  const now = Date.now();


  for (
    const [state, authData]
    of pendingAuth
  ) {

    const isExpired =
      now - authData.createdAt >
      AUTH_EXPIRY_MS;


    if (isExpired) {

      pendingAuth.delete(state);

    }
  }
}


// ============================================================
// START FYERS AUTHENTICATION
// ============================================================

function startAuthentication(
  req,
  res
) {

  try {

    cleanExpiredAuth();


    // ------------------------------------------
    // Get credentials from frontend
    // ------------------------------------------

    const {
      appId,
      secretId,
    } = req.body;


    // ------------------------------------------
    // Validation
    // ------------------------------------------

    if (!appId || !secretId) {

      return res
        .status(400)
        .json({
          success: false,
          message:
            "FYERS App ID and Secret ID are required.",
        });
    }


    const cleanAppId =
      appId.trim();

    const cleanSecretId =
      secretId.trim();


    // ------------------------------------------
    // Generate state
    // ------------------------------------------

    const state =
      createState();


    // ------------------------------------------
    // Callback URL
    // ------------------------------------------

    const redirectUri =
      process.env.FYERS_REDIRECT_URI ||
      "http://localhost:5000/api/fyers/callback";


    // ------------------------------------------
    // Temporarily save credentials
    // ------------------------------------------

    pendingAuth.set(
      state,
      {
        appId:
          cleanAppId,

        secretId:
          cleanSecretId,

        createdAt:
          Date.now(),
      }
    );


    // ------------------------------------------
    // Create FYERS login URL
    // ------------------------------------------

    const loginUrl =
      fyersService.createLoginUrl({
        appId:
          cleanAppId,

        redirectUri:
          redirectUri,

        state:
          state,
      });


    // ------------------------------------------
    // Terminal
    // ------------------------------------------

    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      "FYERS AUTHENTICATION STARTED"
    );

    console.log(
      "========================================"
    );

    console.log(
      "APP ID:",
      cleanAppId
    );

    console.log(
      "REDIRECT URI:",
      redirectUri
    );

    console.log(
      "========================================"
    );

    console.log("");


    // ------------------------------------------
    // Send login URL to frontend
    // ------------------------------------------

    return res.json({
      success: true,
      loginUrl: loginUrl,
    });


  } catch (error) {

    console.error(
      "FYERS START AUTH ERROR:",
      error
    );


    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to start FYERS authentication.",
      });
  }
}


// ============================================================
// FYERS CALLBACK
// ============================================================

async function handleCallback(
  req,
  res
) {

  try {

    cleanExpiredAuth();


    // ------------------------------------------
    // FYERS sends these in callback
    // ------------------------------------------

    const {
      auth_code,
      state,
    } = req.query;


    // ------------------------------------------
    // Check auth code
    // ------------------------------------------

    if (!auth_code) {

      return res
        .status(400)
        .send(
          "FYERS auth_code is missing."
        );
    }


    // ------------------------------------------
    // Check state
    // ------------------------------------------

    if (!state) {

      return res
        .status(400)
        .send(
          "FYERS state is missing."
        );
    }


    // ------------------------------------------
    // Find original user's credentials
    // ------------------------------------------

    const authData =
      pendingAuth.get(state);


    if (!authData) {

      return res
        .status(400)
        .send(
          "FYERS authentication session expired or is invalid."
        );
    }


    // ------------------------------------------
    // Delete temporary credentials
    // ------------------------------------------

    pendingAuth.delete(state);


    const {
      appId,
      secretId,
    } = authData;


    // ------------------------------------------
    // Exchange auth_code for access token
    // ------------------------------------------

    const tokenResponse =
      await fyersService
        .generateAccessToken({
          appId:
            appId,

          secretId:
            secretId,

          authCode:
            auth_code,
        });


    // ------------------------------------------
    // Check FYERS response
    // ------------------------------------------

    if (
      tokenResponse?.s !== "ok" ||
      !tokenResponse?.access_token
    ) {

      console.error(
        "FYERS TOKEN RESPONSE:",
        tokenResponse
      );


      return res
        .status(400)
        .send(
          "FYERS access token generation failed. Check backend terminal."
        );
    }


    // ========================================================
    // ACCESS TOKEN
    // ========================================================

    const accessToken =
      tokenResponse.access_token;


    // ========================================================
    // PRINT ACCESS TOKEN IN BACKEND TERMINAL
    // ========================================================

    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      "FYERS AUTHENTICATION SUCCESS"
    );

    console.log(
      "========================================"
    );

    console.log(
      "APP ID:"
    );

    console.log(
      appId
    );

    console.log("");

    console.log(
      "ACCESS TOKEN:"
    );

    console.log(
      accessToken
    );

    console.log(
      "========================================"
    );

    console.log("");


    // ------------------------------------------
    // Redirect back to frontend
    // ------------------------------------------

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:5173";


    return res.redirect(
      `${frontendUrl}/fyers?connected=true`
    );


  } catch (error) {

    console.error("");
    console.error(
      "========================================"
    );

    console.error(
      "FYERS CALLBACK ERROR"
    );

    console.error(
      "========================================"
    );


    if (error.response?.data) {

      console.error(
        error.response.data
      );

    } else {

      console.error(
        error.message
      );
    }


    return res
      .status(500)
      .send(
        "FYERS authentication failed. Check backend terminal."
      );
  }
}


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  startAuthentication,
  handleCallback,
};