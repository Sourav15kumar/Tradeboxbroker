const crypto = require("crypto");

const motilalService = require("../services/motilalService");

// ============================================================
// TEMPORARY AUTH STORAGE
// ============================================================

const pendingAuth = new Map();

const AUTH_EXPIRY_MS = 10 * 60 * 1000;

// ============================================================
// CREATE UNIQUE AUTH ID
// ============================================================

function createAuthId() {
  return crypto.randomBytes(32).toString("hex");
}

// ============================================================
// CLEAN EXPIRED AUTH REQUESTS
// ============================================================

function cleanExpiredAuth() {
  const now = Date.now();

  for (const [authId, authData] of pendingAuth.entries()) {
    if (now - authData.createdAt > AUTH_EXPIRY_MS) {
      pendingAuth.delete(authId);
    }
  }
}

// ============================================================
// GET USER PUBLIC IP
// ============================================================

function getClientPublicIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  let ip = req.socket?.remoteAddress || req.ip || "127.0.0.1";

  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  if (ip === "::1") {
    ip = "127.0.0.1";
  }

  return ip;
}

// ============================================================
// START AUTHENTICATION
// ============================================================

function startAuthentication(req, res) {
  try {
    cleanExpiredAuth();

    const { apiKey, apiSecretKey } = req.body;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!apiKey || !apiSecretKey) {
      return res.status(400).json({
        success: false,
        message:
          "Motilal Oswal API Key and API Secret Key are required.",
      });
    }

    const cleanApiKey = apiKey.trim();
    const cleanApiSecretKey = apiSecretKey.trim();

    // --------------------------------------------------------
    // CREATE TEMPORARY AUTH SESSION
    // --------------------------------------------------------

    const authId = createAuthId();

    pendingAuth.set(authId, {
      apiKey: cleanApiKey,
      apiSecretKey: cleanApiSecretKey,
      createdAt: Date.now(),
    });

    // --------------------------------------------------------
    // COOKIE USED TO MATCH CALLBACK WITH USER
    // --------------------------------------------------------

    res.cookie("motilal_auth_id", authId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: AUTH_EXPIRY_MS,
    });

    // --------------------------------------------------------
    // CREATE MOTILAL LOGIN URL
    // --------------------------------------------------------

    const loginUrl =
      motilalService.createLoginUrl(cleanApiKey);

    console.log("");
    console.log("========================================");
    console.log("MOTILAL OSWAL AUTHENTICATION STARTED");
    console.log("========================================");
    console.log("API KEY:", cleanApiKey);
    console.log("LOGIN URL:", loginUrl);
    console.log("========================================");
    console.log("");

    // --------------------------------------------------------
    // SEND LOGIN URL TO FRONTEND
    // --------------------------------------------------------

    return res.json({
      success: true,
      loginUrl,
    });
  } catch (error) {
    console.error(
      "MOTILAL AUTH START ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to start Motilal Oswal authentication.",
    });
  }
}

// ============================================================
// CALLBACK
// ============================================================

async function handleCallback(req, res) {
  try {
    cleanExpiredAuth();

    // ========================================================
    // MOTILAL RETURNS AUTHTOKEN IN QUERY PARAMETER
    // ========================================================

    const { authtoken } = req.query;

    if (!authtoken) {
      return res.status(400).send(
        "Motilal Oswal authtoken is missing."
      );
    }

    // ========================================================
    // FIND TRADEBOX AUTH SESSION
    // ========================================================

    const authId =
      req.cookies?.motilal_auth_id;

    if (!authId) {
      return res.status(400).send(
        "Tradebox Motilal authentication session was not found."
      );
    }

    const authData =
      pendingAuth.get(authId);

    if (!authData) {
      return res.status(400).send(
        "Motilal authentication session expired or is invalid."
      );
    }

    const {
      apiKey,
      apiSecretKey,
    } = authData;

    // ========================================================
    // GET IP
    // ========================================================

    const clientPublicIp =
      getClientPublicIp(req);

    // ========================================================
    // GENERATE FINAL ACCESS TOKEN
    // ========================================================

    const tokenResponse =
      await motilalService.generateAccessToken({
        apiKey,
        apiSecretKey,
        authToken: authtoken,
        clientPublicIp,
      });

    // ========================================================
    // DEBUG RAW RESPONSE
    // ========================================================

    console.log("");
    console.log("MOTILAL RAW TOKEN RESPONSE:");
    console.log(tokenResponse);
    console.log("");

    // ========================================================
    // VERIFY RESPONSE
    // ========================================================

    if (
      tokenResponse?.status !== "SUCCESS" ||
      !tokenResponse?.accesstoken
    ) {
      console.error(
        "MOTILAL ACCESS TOKEN GENERATION FAILED:",
        tokenResponse
      );

      return res.status(400).send(
        "Motilal Oswal Access Token generation failed. Check backend terminal."
      );
    }

    // ========================================================
    // ACCESS TOKEN
    // ========================================================

    const accessToken =
      tokenResponse.accesstoken;

    // ========================================================
    // PRINT TOKEN IN BACKEND TERMINAL
    // ========================================================

    console.log("");
    console.log("========================================");
    console.log("MOTILAL OSWAL AUTHENTICATION SUCCESS");
    console.log("========================================");

    console.log("API KEY:");
    console.log(apiKey);

    console.log("");

    console.log("AUTH TOKEN:");
    console.log(authtoken);

    console.log("");

    console.log("ACCESS TOKEN:");
    console.log(accessToken);

    console.log("========================================");
    console.log("");

    // ========================================================
    // CLEAN TEMP AUTH SESSION
    // ========================================================

    pendingAuth.delete(authId);

    res.clearCookie("motilal_auth_id", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // ========================================================
    // FINAL TRADEBOX REDIRECT
    // ========================================================

    const finalRedirectUrl =
      process.env.TRADEBOX_BROKER_REDIRECT_URL ||
      "http://localhost:5173";

    return res.redirect(finalRedirectUrl);
  } catch (error) {
    console.error("");
    console.error("========================================");
    console.error("MOTILAL CALLBACK ERROR");
    console.error("========================================");

    console.error(
      error.response?.data ||
      error.message
    );

    console.error("");

    return res.status(500).send(
      "Motilal Oswal authentication failed. Check Tradebox backend terminal."
    );
  }
}

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  startAuthentication,
  handleCallback,
};