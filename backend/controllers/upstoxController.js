const crypto = require("crypto");

const {
  createAuthorizationUrl,
  exchangeCodeForAccessToken,
} = require("../services/upstoxService");

// ============================================================
// TEMPORARY AUTH STORAGE
//
// Development / UAT testing only.
// API credentials are kept temporarily against OAuth state.
//
// DO NOT use this as permanent production storage.
// ============================================================

const pendingAuth = new Map();

// ============================================================
// START UPSTOX AUTHENTICATION
// ============================================================

async function startAuthentication(req, res) {
  try {
    const { apiKey, apiSecret } = req.body;

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!apiKey || !apiKey.trim()) {
      return res.status(400).json({
        success: false,
        message: "Upstox API Key is required.",
      });
    }

    if (!apiSecret || !apiSecret.trim()) {
      return res.status(400).json({
        success: false,
        message: "Upstox API Secret is required.",
      });
    }

    // ----------------------------------------------------------
    // REDIRECT URI
    // ----------------------------------------------------------

    const redirectUri =
      process.env.UPSTOX_REDIRECT_URI ||
      "http://localhost:5000/api/upstox/callback";

    // ----------------------------------------------------------
    // CREATE RANDOM STATE
    //
    // This connects the callback with the user's credentials.
    // ----------------------------------------------------------

    const state = crypto.randomBytes(32).toString("hex");

    // ----------------------------------------------------------
    // TEMPORARILY STORE USER CREDENTIALS
    // ----------------------------------------------------------

    pendingAuth.set(state, {
      apiKey: apiKey.trim(),
      apiSecret: apiSecret.trim(),
      createdAt: Date.now(),
    });

    // ----------------------------------------------------------
    // CREATE UPSTOX AUTHORIZATION URL
    // ----------------------------------------------------------

    const authorizationUrl = createAuthorizationUrl(
      apiKey.trim(),
      redirectUri,
      state
    );

    console.log("");
    console.log("========================================");
    console.log("UPSTOX AUTHENTICATION STARTED");
    console.log("========================================");
    console.log("Redirect URI:", redirectUri);
    console.log("========================================");
    console.log("");

    // ----------------------------------------------------------
    // SEND AUTH URL TO FRONTEND
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Upstox authorization started.",
      data: {
        authorizationUrl,
      },
    });
  } catch (error) {
    console.error("");
    console.error("========================================");
    console.error("UPSTOX AUTH START ERROR");
    console.error("========================================");
    console.error(error.message);
    console.error("========================================");
    console.error("");

    return res.status(500).json({
      success: false,
      message: "Unable to start Upstox authentication.",
    });
  }
}

// ============================================================
// UPSTOX CALLBACK
// ============================================================

async function handleCallback(req, res) {
  try {
    const {
      code,
      state,
      error,
      error_description,
    } = req.query;

    // ----------------------------------------------------------
    // USER REJECTED AUTHENTICATION
    // ----------------------------------------------------------

    if (error) {
      console.error("");
      console.error("========================================");
      console.error("UPSTOX AUTHENTICATION REJECTED");
      console.error("========================================");
      console.error("Error:", error);
      console.error(
        "Description:",
        error_description || "No description"
      );
      console.error("========================================");
      console.error("");

      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Tradebox - Upstox</title>
          </head>

          <body
            style="
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Arial, sans-serif;
              background: #f6faf7;
            "
          >
            <div
              style="
                width: 90%;
                max-width: 450px;
                background: white;
                padding: 40px;
                border-radius: 18px;
                text-align: center;
                box-shadow: 0 10px 35px rgba(0,0,0,0.08);
              "
            >
              <h2 style="color:#c62828;">
                Upstox Authentication Failed
              </h2>

              <p>
                ${
                  error_description ||
                  "Authentication was rejected."
                }
              </p>

              <p style="color:#777;">
                You can close this window.
              </p>
            </div>
          </body>
        </html>
      `);
    }

    // ----------------------------------------------------------
    // CODE VALIDATION
    // ----------------------------------------------------------

    if (!code) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <body
            style="
              font-family: Arial;
              padding: 40px;
            "
          >
            <h2>Upstox Authentication Failed</h2>
            <p>Authorization code was not received.</p>
          </body>
        </html>
      `);
    }

    // ----------------------------------------------------------
    // STATE VALIDATION
    // ----------------------------------------------------------

    if (!state) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <body
            style="
              font-family: Arial;
              padding: 40px;
            "
          >
            <h2>Upstox Authentication Failed</h2>
            <p>Authentication state was not received.</p>
          </body>
        </html>
      `);
    }

    // ----------------------------------------------------------
    // FIND ORIGINAL USER CREDENTIALS
    // ----------------------------------------------------------

    const authData = pendingAuth.get(state);

    if (!authData) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <body
            style="
              font-family: Arial;
              padding: 40px;
            "
          >
            <h2>Upstox Authentication Failed</h2>
            <p>
              Authentication session expired or is invalid.
            </p>
          </body>
        </html>
      `);
    }

    // ----------------------------------------------------------
    // REMOVE SESSION
    //
    // Authorization code is single-use.
    // ----------------------------------------------------------

    pendingAuth.delete(state);

    // ----------------------------------------------------------
    // REDIRECT URI
    // ----------------------------------------------------------

    const redirectUri =
      process.env.UPSTOX_REDIRECT_URI ||
      "http://localhost:5000/api/upstox/callback";

    // ----------------------------------------------------------
    // EXCHANGE CODE FOR ACCESS TOKEN
    // ----------------------------------------------------------

    const tokenResponse =
      await exchangeCodeForAccessToken({
        code,
        apiKey: authData.apiKey,
        apiSecret: authData.apiSecret,
        redirectUri,
      });

    // ----------------------------------------------------------
    // GET REAL ACCESS TOKEN
    // ----------------------------------------------------------

    const accessToken =
      tokenResponse?.access_token;

    if (!accessToken) {
      console.error("");
      console.error("========================================");
      console.error("UPSTOX TOKEN NOT RECEIVED");
      console.error("========================================");
      console.error(
        "Response:",
        tokenResponse
      );
      console.error("========================================");
      console.error("");

      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <body
            style="
              font-family: Arial;
              padding: 40px;
            "
          >
            <h2>Upstox Authentication Failed</h2>
            <p>
              Upstox did not return an access token.
            </p>
          </body>
        </html>
      `);
    }

    // ========================================================
    // DEVELOPMENT ONLY
    // REAL USER ACCESS TOKEN
    // ========================================================

    console.log("");
    console.log("========================================");
    console.log("   UPSTOX AUTHENTICATION SUCCESS");
    console.log("========================================");
    console.log("ACCESS TOKEN:");
    console.log(accessToken);
    console.log("========================================");
    console.log("");

    // ----------------------------------------------------------
    // SUCCESS PAGE
    // ----------------------------------------------------------

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tradebox - Upstox Connected</title>
        </head>

        <body
          style="
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            background: #f6faf7;
          "
        >
          <div
            style="
              width: 90%;
              max-width: 450px;
              background: white;
              padding: 40px;
              border-radius: 18px;
              text-align: center;
              box-shadow: 0 10px 35px rgba(0,0,0,0.08);
            "
          >
            <h2 style="color:#16833b;">
              Upstox Connected Successfully
            </h2>

            <p>
              Your Upstox account has been
              authenticated successfully.
            </p>

            <p>
              Access token has been received
              by Tradebox backend.
            </p>

            <p style="color:#777;">
              You can close this window.
            </p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("");
    console.error("========================================");
    console.error("   UPSTOX AUTHENTICATION FAILED");
    console.error("========================================");

    if (error.response?.data) {
      console.error(
        "Upstox Response:",
        error.response.data
      );
    } else {
      console.error(
        "Error:",
        error.message
      );
    }

    console.error("========================================");
    console.error("");

    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <body
          style="
            font-family: Arial;
            padding: 40px;
          "
        >
          <h2>Upstox Authentication Failed</h2>

          <p>
            Unable to complete Upstox authentication.
          </p>

          <p style="color:#777;">
            Check your API credentials and redirect URI.
          </p>
        </body>
      </html>
    `);
  }
}

module.exports = {
  startAuthentication,
  handleCallback,
};