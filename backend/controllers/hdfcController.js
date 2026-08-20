const crypto = require("crypto");

const {
  createLoginSession,
  validateLogin,
  validateTwoFactor,
  authoriseUser,
  generateAccessToken,
} = require("../services/hdfcService");


// ============================================================
// TEMP DEVELOPMENT SESSION
//
// Production:
// use Redis / database / encrypted session storage.
// ============================================================

const pendingAuth = new Map();

const AUTH_EXPIRY =
  10 * 60 * 1000;


// ============================================================
// CLEAN OLD AUTH SESSIONS
// ============================================================

function cleanupSessions() {
  const now = Date.now();

  for (
    const [authId, authData]
    of pendingAuth.entries()
  ) {
    if (
      now - authData.createdAt >
      AUTH_EXPIRY
    ) {
      pendingAuth.delete(authId);
    }
  }
}


// ============================================================
// STEP 1
// USER ENTERS API KEY + SECRET
// ============================================================

async function startAuthentication(
  req,
  res
) {
  try {
    cleanupSessions();

    const {
      apiKey,
      apiSecret,
    } = req.body;

    if (!apiKey?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "HDFC SKY API Key is required.",
      });
    }

    if (!apiSecret?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "HDFC SKY API Secret is required.",
      });
    }

    // ========================================================
    // CREATE HDFC LOGIN SESSION
    // ========================================================

    const loginResponse =
      await createLoginSession(
        apiKey.trim()
      );


    const tokenId =
      loginResponse?.tokenId ||
      loginResponse?.token_id ||
      loginResponse?.data?.tokenId;


    if (!tokenId) {
      console.error(
        "HDFC LOGIN RESPONSE:",
        loginResponse
      );

      return res.status(401).json({
        success: false,
        message:
          "HDFC SKY did not return a login token.",
      });
    }


    const authId =
      crypto
        .randomBytes(24)
        .toString("hex");


    pendingAuth.set(
      authId,
      {
        apiKey:
          apiKey.trim(),

        apiSecret:
          apiSecret.trim(),

        tokenId,

        requestToken:
          null,

        createdAt:
          Date.now(),
      }
    );


    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "HDFC AUTHENTICATION STARTED"
    );
    console.log(
      "========================================"
    );
    console.log(
      "AUTH ID:",
      authId
    );
    console.log(
      "TOKEN ID:",
      tokenId
    );
    console.log(
      "========================================"
    );
    console.log("");


    return res.status(200).json({
      success: true,

      message:
        "HDFC authentication session created.",

      data: {
        authId,
        step:
          "login",
      },
    });

  } catch (error) {
    return handleHdfcError(
      res,
      error,
      "Unable to start HDFC SKY authentication."
    );
  }
}


// ============================================================
// STEP 2
// HDFC USERNAME + PASSWORD
// ============================================================

async function loginAuthentication(
  req,
  res
) {
  try {
    const {
      authId,
      username,
      password,
    } = req.body;


    const authData =
      pendingAuth.get(authId);


    if (!authData) {
      return res.status(400).json({
        success: false,

        message:
          "HDFC authentication session expired.",
      });
    }


    if (!username?.trim()) {
      return res.status(400).json({
        success: false,

        message:
          "HDFC Client ID / username is required.",
      });
    }


    if (!password) {
      return res.status(400).json({
        success: false,

        message:
          "HDFC password is required.",
      });
    }


    const loginResponse =
      await validateLogin({
        apiKey:
          authData.apiKey,

        tokenId:
          authData.tokenId,

        username:
          username.trim(),

        password,
      });


    console.log(
      "HDFC LOGIN VALIDATED"
    );


    return res.status(200).json({
      success: true,

      message:
        "HDFC login validated. Enter OTP.",

      data: {
        authId,

        twoFAEnabled:
          loginResponse
            ?.twoFAEnabled ??
          true,

        step:
          "otp",
      },
    });

  } catch (error) {
    return handleHdfcError(
      res,
      error,
      "HDFC login validation failed."
    );
  }
}


// ============================================================
// STEP 3
// OTP
// ============================================================

async function verifyOtp(
  req,
  res
) {
  try {
    const {
      authId,
      otp,
    } = req.body;


    const authData =
      pendingAuth.get(authId);


    if (!authData) {
      return res.status(400).json({
        success: false,

        message:
          "HDFC authentication session expired.",
      });
    }


    if (!otp?.trim()) {
      return res.status(400).json({
        success: false,

        message:
          "HDFC OTP is required.",
      });
    }


    const otpResponse =
      await validateTwoFactor({
        apiKey:
          authData.apiKey,

        tokenId:
          authData.tokenId,

        otp:
          otp.trim(),
      });


    const requestToken =
      otpResponse?.requestToken ||
      otpResponse?.request_token ||
      otpResponse
        ?.data
        ?.requestToken;


    if (!requestToken) {
      console.error(
        "HDFC OTP RESPONSE:",
        otpResponse
      );

      return res.status(401).json({
        success: false,

        message:
          "HDFC did not return a request token.",
      });
    }


    authData.requestToken =
      requestToken;


    pendingAuth.set(
      authId,
      authData
    );


    return res.status(200).json({
      success: true,

      message:
        "OTP verified successfully.",

      data: {
        authId,
        step:
          "authorise",
      },
    });

  } catch (error) {
    return handleHdfcError(
      res,
      error,
      "HDFC OTP verification failed."
    );
  }
}


// ============================================================
// STEP 4 + STEP 5
// AUTHORISE + GET ACCESS TOKEN
// ============================================================

async function completeAuthentication(
  req,
  res
) {
  try {
    const {
      authId,
    } = req.body;


    const authData =
      pendingAuth.get(authId);


    if (!authData) {
      return res.status(400).json({
        success: false,

        message:
          "HDFC authentication session expired.",
      });
    }


    if (!authData.requestToken) {
      return res.status(400).json({
        success: false,

        message:
          "HDFC request token is missing.",
      });
    }


    // ========================================================
    // AUTHORISE
    // consent=true is important
    // ========================================================

    const authoriseResponse =
      await authoriseUser({
        apiKey:
          authData.apiKey,

        tokenId:
          authData.tokenId,

        requestToken:
          authData.requestToken,
      });


    console.log(
      "HDFC AUTHORISATION RESPONSE:",
      authoriseResponse
    );


    // ========================================================
    // GENERATE FINAL ACCESS TOKEN
    // ========================================================

    const accessResponse =
      await generateAccessToken({
        apiKey:
          authData.apiKey,

        apiSecret:
          authData.apiSecret,

        requestToken:
          authData.requestToken,
      });


    const accessToken =
      accessResponse?.accessToken ||
      accessResponse?.access_token ||
      accessResponse
        ?.data
        ?.accessToken ||
      accessResponse
        ?.data
        ?.access_token;


    if (!accessToken) {
      console.error("");
      console.error(
        "========================================"
      );
      console.error(
        "HDFC ACCESS TOKEN NOT FOUND"
      );
      console.error(
        "========================================"
      );
      console.error(
        accessResponse
      );
      console.error(
        "========================================"
      );
      console.error("");


      return res.status(401).json({
        success: false,

        message:
          "HDFC authentication completed but access token was not returned.",
      });
    }


    // ========================================================
    // DEVELOPMENT ONLY
    // ========================================================

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "HDFC SKY AUTHENTICATION SUCCESS"
    );
    console.log(
      "========================================"
    );
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


    pendingAuth.delete(
      authId
    );


    // ========================================================
    // DO NOT RETURN RAW TOKEN TO FRONTEND
    // ========================================================

    return res.status(200).json({
      success: true,

      message:
        "HDFC SKY connected successfully.",

      data: {
        connected: true,
      },
    });

  } catch (error) {
    return handleHdfcError(
      res,
      error,
      "Unable to complete HDFC SKY authentication."
    );
  }
}


// ============================================================
// COMMON ERROR HANDLER
// ============================================================

function handleHdfcError(
  res,
  error,
  fallbackMessage
) {
  console.error("");
  console.error(
    "========================================"
  );
  console.error(
    "HDFC SKY API ERROR"
  );
  console.error(
    "========================================"
  );

  console.error(
    error.response?.data ||
    error.message
  );

  console.error(
    "========================================"
  );
  console.error("");


  return res
    .status(
      error.response?.status ||
      500
    )
    .json({
      success: false,

      message:
        error.response
          ?.data
          ?.message ||
        error.response
          ?.data
          ?.error ||
        fallbackMessage,
    });
}


module.exports = {
  startAuthentication,
  loginAuthentication,
  verifyOtp,
  completeAuthentication,
};