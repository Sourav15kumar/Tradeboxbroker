const crypto = require("crypto");

const {
  createPublisherLoginUrl,
} = require("../services/angelOneService");

// ============================================================
// TEMPORARY DEVELOPMENT AUTH ATTEMPTS
// ============================================================

const pendingAuth = new Map();

const AUTH_TIMEOUT =
  10 * 60 * 1000;


// ============================================================
// START ANGEL ONE AUTHENTICATION
// ============================================================

async function startAuthentication(req, res) {
  try {
    const { apiKey } = req.body;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (
      !apiKey ||
      !apiKey.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Angel One Publisher API Key is required.",
      });
    }

    // --------------------------------------------------------
    // CREATE TEMPORARY STATE
    // --------------------------------------------------------

    const state =
      crypto
        .randomBytes(32)
        .toString("hex");

    // --------------------------------------------------------
    // TEMP AUTH SESSION
    // --------------------------------------------------------

    pendingAuth.set(
      state,
      {
        apiKey: apiKey.trim(),
        createdAt: Date.now(),
      }
    );

    // --------------------------------------------------------
    // CLEAN OLD AUTH ATTEMPTS
    // --------------------------------------------------------

    for (
      const [
        savedState,
        authData,
      ] of pendingAuth
    ) {
      if (
        Date.now() -
          authData.createdAt >
        AUTH_TIMEOUT
      ) {
        pendingAuth.delete(
          savedState
        );
      }
    }

    // --------------------------------------------------------
    // CREATE OFFICIAL PUBLISHER LOGIN URL
    // --------------------------------------------------------

    const authorizationUrl =
      createPublisherLoginUrl({
        apiKey: apiKey.trim(),
        state,
      });

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "ANGEL ONE AUTHENTICATION STARTED"
    );
    console.log(
      "========================================"
    );
    console.log(
      "Publisher login URL created."
    );
    console.log(
      "========================================"
    );
    console.log("");

    return res.status(200).json({
      success: true,
      message:
        "Angel One authentication started.",
      data: {
        authorizationUrl,
      },
    });
  } catch (error) {
    console.error("");
    console.error(
      "========================================"
    );
    console.error(
      "ANGEL ONE AUTH START FAILED"
    );
    console.error(
      "========================================"
    );
    console.error(
      error.message
    );
    console.error(
      "========================================"
    );
    console.error("");

    return res.status(500).json({
      success: false,
      message:
        "Unable to start Angel One authentication.",
    });
  }
}


// ============================================================
// ANGEL ONE CALLBACK
// ============================================================

async function handleCallback(req, res) {
  try {
    const {
      auth_token,
      feed_token,
      state,
      error,
      message,
    } = req.query;

    // --------------------------------------------------------
    // ANGEL ONE RETURNED ERROR
    // --------------------------------------------------------

    if (error) {
      console.error("");
      console.error(
        "========================================"
      );
      console.error(
        "ANGEL ONE AUTHENTICATION FAILED"
      );
      console.error(
        "========================================"
      );
      console.error(
        "Error:",
        error
      );
      console.error(
        "Message:",
        message || ""
      );
      console.error(
        "========================================"
      );
      console.error("");

      return redirectToFrontend(
        res,
        "error",
        message ||
          "Angel One authentication failed."
      );
    }

    // --------------------------------------------------------
    // AUTH TOKEN REQUIRED
    // --------------------------------------------------------

    if (!auth_token) {
      console.error("");
      console.error(
        "========================================"
      );
      console.error(
        "ANGEL ONE TOKEN NOT RECEIVED"
      );
      console.error(
        "========================================"
      );
      console.error(
        "Callback query:",
        req.query
      );
      console.error(
        "========================================"
      );
      console.error("");

      return redirectToFrontend(
        res,
        "error",
        "Angel One authentication token was not received."
      );
    }

    // --------------------------------------------------------
    // STATE CHECK
    //
    // Some Angel One Publisher Login behavior has historically
    // varied regarding returning state.
    //
    // Therefore:
    // - if state is returned, validate it
    // - if state is absent, do not reject a valid auth_token
    // --------------------------------------------------------

    if (state) {
      const authData =
        pendingAuth.get(state);

      if (!authData) {
        return redirectToFrontend(
          res,
          "error",
          "Invalid or expired Angel One authentication session."
        );
      }

      pendingAuth.delete(state);
    }

    // ========================================================
    // DEVELOPMENT ONLY
    // REAL TOKEN RETURNED BY ANGEL ONE
    // ========================================================

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      " ANGEL ONE AUTHENTICATION SUCCESS"
    );
    console.log(
      "========================================"
    );

    console.log(
      "AUTH TOKEN:"
    );

    console.log(
      auth_token
    );

    if (feed_token) {
      console.log("");
      console.log(
        "FEED TOKEN:"
      );

      console.log(
        feed_token
      );
    }

    console.log(
      "========================================"
    );
    console.log("");

    // --------------------------------------------------------
    // DO NOT PUT TOKEN IN FRONTEND URL
    // --------------------------------------------------------

    return redirectToFrontend(
      res,
      "success",
      "Angel One connected successfully."
    );
  } catch (error) {
    console.error("");
    console.error(
      "========================================"
    );
    console.error(
      "ANGEL ONE CALLBACK ERROR"
    );
    console.error(
      "========================================"
    );
    console.error(
      error.message
    );
    console.error(
      "========================================"
    );
    console.error("");

    return redirectToFrontend(
      res,
      "error",
      "Unable to complete Angel One authentication."
    );
  }
}


// ============================================================
// REDIRECT TO TRADEBOX FRONTEND
// ============================================================

function redirectToFrontend(
  res,
  status,
  message
) {
  const frontendUrl =
    process.env.FRONTEND_URL ||
    "http://localhost:5173";

  const redirectUrl =
    new URL(
      "/angelone/result",
      frontendUrl
    );

  redirectUrl.searchParams.set(
    "status",
    status
  );

  redirectUrl.searchParams.set(
    "message",
    message
  );

  return res.redirect(
    redirectUrl.toString()
  );
}


module.exports = {
  startAuthentication,
  handleCallback,
};