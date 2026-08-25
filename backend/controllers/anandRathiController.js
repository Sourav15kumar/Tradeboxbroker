const anandRathiService =
  require("../services/anandRathiService");

// ============================================================
// AUTHENTICATE ANAND RATHI
// ============================================================

async function authenticate(req, res) {
  try {
    const {
      appKey,
      secretKey,
    } = req.body;

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!appKey?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Anand Rathi App Key is required.",
      });
    }

    if (!secretKey?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Anand Rathi Secret Key is required.",
      });
    }

    // ========================================================
    // CLEAN INPUT
    // ========================================================

    const cleanAppKey = appKey.trim();
    const cleanSecretKey = secretKey.trim();

    // ========================================================
    // CALL ANAND RATHI INTERACTIVE API
    // ========================================================

    const loginResponse =
      await anandRathiService.login({
        appKey: cleanAppKey,
        secretKey: cleanSecretKey,
      });

    // ========================================================
    // DEVELOPMENT DEBUG
    // ========================================================

    if (process.env.NODE_ENV !== "production") {
      console.log("");
      console.log("ANAND RATHI LOGIN RESPONSE:");

      console.log(
        JSON.stringify(
          loginResponse,
          null,
          2
        )
      );

      console.log("");
    }

    // ========================================================
    // EXTRACT RESPONSE
    // ========================================================

    const result =
      loginResponse?.result ||
      loginResponse?.data ||
      loginResponse;

    // ========================================================
    // EXTRACT TOKEN
    // ========================================================

    const accessToken =
      result?.access_token ||
      result?.accessToken ||
      result?.token;

    const userID =
      result?.userID ||
      result?.userId ||
      result?.clientID ||
      result?.clientId ||
      null;

    // ========================================================
    // TOKEN NOT RECEIVED
    // ========================================================

    if (!accessToken) {
      console.error(
        "Anand Rathi Interactive Access Token not found."
      );

      return res.status(400).json({
        success: false,
        message:
          "Anand Rathi access token was not returned.",
      });
    }

    // ========================================================
    // SUCCESS - PRINT TOKEN IN BACKEND TERMINAL
    // ========================================================

    console.log("");
    console.log(
      "============================================"
    );

    console.log(
      "ANAND RATHI INTERACTIVE AUTH SUCCESS"
    );

    console.log(
      "============================================"
    );

    if (userID) {
      console.log(`USER ID: ${userID}`);
    }

    console.log("");
    console.log("INTERACTIVE ACCESS TOKEN:");
    console.log(accessToken);

    console.log(
      "============================================"
    );

    console.log("");

    // ========================================================
    // IMPORTANT
    // Token is NOT returned to browser
    // ========================================================

    return res.status(200).json({
      success: true,
      message:
        "Anand Rathi authenticated successfully.",
      userID,
    });

  } catch (error) {
    // ========================================================
    // ERROR
    // ========================================================

    console.error("");
    console.error(
      "============================================"
    );

    console.error(
      "ANAND RATHI INTERACTIVE AUTH ERROR"
    );

    console.error(
      "============================================"
    );

    console.error(
      error.response?.data ||
      error.message
    );

    console.error(
      "============================================"
    );

    console.error("");

    // ========================================================
    // ERROR RESPONSE
    // ========================================================

    return res.status(
      error.response?.status || 500
    ).json({
      success: false,

      message:
        error.response?.data?.description ||
        error.response?.data?.message ||
        error.message ||
        "Anand Rathi authentication failed.",
    });
  }
}

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  authenticate,
};