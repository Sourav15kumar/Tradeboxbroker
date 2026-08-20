const crypto = require("crypto");

const {
  createLoginUrl,
  getCustomerDetails,
  verifySession,
} = require(
  "../services/iciciService"
);


// ============================================================
// TEMPORARY DEVELOPMENT STORAGE
//
// authId -> {
//   apiKey,
//   apiSecret,
//   createdAt
// }
//
// Production:
// use encrypted server-side session storage.
// ============================================================

const pendingAuth =
  new Map();


const AUTH_TIMEOUT =
  10 * 60 * 1000;


// ============================================================
// START ICICI AUTHENTICATION
// ============================================================

async function startAuthentication(
  req,
  res
) {
  try {
    const {
      apiKey,
      apiSecret,
    } = req.body;


    if (
      !apiKey ||
      !apiKey.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "ICICI Breeze API Key is required.",
        });
    }


    if (
      !apiSecret ||
      !apiSecret.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "ICICI Breeze Secret Key is required.",
        });
    }


    // ========================================================
    // CREATE TEMPORARY AUTH ID
    // ========================================================

    const authId =
      crypto
        .randomBytes(24)
        .toString("hex");


    // ========================================================
    // STORE USER DETAILS TEMPORARILY
    // ========================================================

    pendingAuth.set(
      authId,
      {
        apiKey:
          apiKey.trim(),

        apiSecret:
          apiSecret.trim(),

        createdAt:
          Date.now(),
      }
    );


    // ========================================================
    // CLEAN OLD SESSIONS
    // ========================================================

    for (
      const [
        id,
        authData,
      ] of pendingAuth
    ) {
      if (
        Date.now() -
          authData.createdAt >
        AUTH_TIMEOUT
      ) {
        pendingAuth.delete(
          id
        );
      }
    }


    // ========================================================
    // ICICI LOGIN URL
    // ========================================================

    const loginUrl =
      createLoginUrl(
        apiKey.trim()
      );


    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      "ICICI BREEZE AUTHENTICATION STARTED"
    );

    console.log(
      "AUTH ID:",
      authId
    );

    console.log(
      "========================================"
    );

    console.log("");


    return res
      .status(200)
      .json({
        success: true,

        message:
          "ICICI Breeze login started.",

        data: {
          authId,
          loginUrl,
        },
      });

  } catch (error) {

    console.error(
      "ICICI START ERROR:",
      error.message
    );


    return res
      .status(500)
      .json({
        success: false,

        message:
          "Unable to start ICICI Breeze authentication.",
      });
  }
}


// ============================================================
// ICICI CALLBACK
//
// Your ICICI app Redirect URL should point here.
//
// ICICI login may POST API_Session as form data.
// ============================================================

async function handleCallback(
  req,
  res
) {
  try {

    // ========================================================
    // API_SESSION CAN ARRIVE IN BODY OR QUERY
    // ========================================================

    const apiSession =
      req.body?.API_Session ||
      req.body?.api_session ||
      req.body?.apisession ||
      req.query?.API_Session ||
      req.query?.api_session ||
      req.query?.apisession;


    // ========================================================
    // AUTH ID
    //
    // For local/dev we accept authId query/body.
    //
    // IMPORTANT:
    // The configured redirect URL should include the authId
    // only if ICICI preserves that redirect URL exactly.
    // ========================================================

    const authId =
      req.body?.authId ||
      req.query?.authId;


    if (!apiSession) {

      console.error("");
      console.error(
        "========================================"
      );

      console.error(
        "ICICI API_SESSION NOT RECEIVED"
      );

      console.error(
        "BODY:",
        req.body
      );

      console.error(
        "QUERY:",
        req.query
      );

      console.error(
        "========================================"
      );

      console.error("");


      return redirectToFrontend(
        res,
        "error",
        "ICICI API Session was not received."
      );
    }


    // ========================================================
    // FIND TEMP SESSION
    // ========================================================

    let authData =
      null;


    if (authId) {
      authData =
        pendingAuth.get(
          authId
        );
    }


    /*
     * Development fallback:
     * if only one ICICI auth request is pending,
     * use it.
     *
     * This makes local one-user testing possible.
     *
     * DO NOT rely on this for multi-user production.
     */
    if (
      !authData &&
      pendingAuth.size === 1
    ) {
      authData =
        Array.from(
          pendingAuth.values()
        )[0];
    }


    if (!authData) {

      return redirectToFrontend(
        res,
        "error",
        "ICICI authentication session was not found or expired."
      );

    }


    // ========================================================
    // CHECK EXPIRY
    // ========================================================

    if (
      Date.now() -
        authData.createdAt >
      AUTH_TIMEOUT
    ) {

      return redirectToFrontend(
        res,
        "error",
        "ICICI authentication session expired."
      );

    }


    // ========================================================
    // STEP 1
    // API_SESSION -> CUSTOMER DETAILS
    // ========================================================

    const customerResponse =
      await getCustomerDetails({
        apiKey:
          authData.apiKey,

        apiSession,
      });


    console.log("");
    console.log(
      "ICICI CUSTOMER DETAILS RESPONSE:"
    );

    console.log(
      customerResponse
    );


    // ========================================================
    // EXTRACT FINAL SESSION TOKEN
    // ========================================================

    const sessionToken =
      customerResponse
        ?.Success
        ?.session_token ||

      customerResponse
        ?.Success
        ?.sessionToken ||

      customerResponse
        ?.success
        ?.session_token ||

      customerResponse
        ?.session_token;


    if (!sessionToken) {

      console.error("");
      console.error(
        "========================================"
      );

      console.error(
        "ICICI FINAL SESSION TOKEN NOT FOUND"
      );

      console.error(
        "========================================"
      );

      console.error(
        customerResponse
      );

      console.error(
        "========================================"
      );

      console.error("");


      return redirectToFrontend(
        res,
        "error",
        "ICICI authentication completed but no Breeze session token was found."
      );
    }


    // ========================================================
    // VERIFY TOKEN WITH A REAL AUTHENTICATED API CALL
    // ========================================================

    let verificationResponse =
      null;


    try {

      verificationResponse =
        await verifySession({
          apiKey:
            authData.apiKey,

          secretKey:
            authData.apiSecret,

          sessionToken,
        });

    } catch (
      verificationError
    ) {

      console.error(
        "ICICI SESSION VERIFICATION ERROR:"
      );

      console.error(
        verificationError
          .response
          ?.data ||
        verificationError
          .message
      );


      throw new Error(
        "ICICI session token was generated but authenticated API verification failed."
      );
    }


    // ========================================================
    // DEVELOPMENT ONLY
    // ========================================================

    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      "ICICI BREEZE AUTHENTICATION SUCCESS"
    );

    console.log(
      "========================================"
    );

    console.log(
      "API SESSION:"
    );

    console.log(
      apiSession
    );

    console.log("");

    console.log(
      "FINAL BREEZE SESSION TOKEN:"
    );

    console.log(
      sessionToken
    );

    console.log("");

    console.log(
      "AUTHENTICATED API VERIFICATION:"
    );

    console.log(
      verificationResponse
    );

    console.log(
      "========================================"
    );

    console.log("");


    // ========================================================
    // REMOVE TEMP AUTH
    // ========================================================

    if (authId) {
      pendingAuth.delete(
        authId
      );
    }


    // ========================================================
    // IMPORTANT:
    // DO NOT SEND SESSION TOKEN TO FRONTEND
    // ========================================================

    return redirectToFrontend(
      res,
      "success",
      "ICICI Direct connected successfully."
    );

  } catch (error) {

    console.error("");
    console.error(
      "========================================"
    );

    console.error(
      "ICICI BREEZE AUTHENTICATION FAILED"
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


    return redirectToFrontend(
      res,
      "error",
      error.message ||
      "Unable to complete ICICI Breeze authentication."
    );
  }
}


// ============================================================
// FRONTEND REDIRECT
// ============================================================

function redirectToFrontend(
  res,
  status,
  message
) {
  const frontendUrl =
    process.env.FRONTEND_URL ||
    "http://localhost:5173";


  const url =
    new URL(
      "/icici/result",
      frontendUrl
    );


  url.searchParams.set(
    "status",
    status
  );


  url.searchParams.set(
    "message",
    message
  );


  return res.redirect(
    url.toString()
  );
}


module.exports = {
  startAuthentication,
  handleCallback,
};