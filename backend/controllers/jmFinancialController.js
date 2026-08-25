const {
  authenticateUser,
  extractToken,
} = require(
  "../services/jmFinancialService"
);


// ============================================================
// JM FINANCIAL AUTHENTICATION
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


    if (!apiKey?.trim()) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "JM Financial API Key is required.",
        });
    }


    if (!apiSecret?.trim()) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "JM Financial API Secret is required.",
        });
    }


    // ========================================================
    // CALL OFFICIAL JM TRADING AUTH API
    // ========================================================

    const authenticationResponse =
      await authenticateUser({
        apiKey:
          apiKey.trim(),

        apiSecret:
          apiSecret.trim(),
      });


    // ========================================================
    // GET REAL TOKEN FROM BROKER RESPONSE
    // ========================================================

    const accessToken =
      extractToken(
        authenticationResponse
      );


    // ========================================================
    // DEVELOPMENT ONLY
    // ========================================================

    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      "JM FINANCIAL AUTHENTICATION SUCCESS"
    );

    console.log(
      "========================================"
    );

    console.log(
      "ACCESS / SESSION TOKEN:"
    );

    console.log(
      accessToken
    );

    console.log(
      "========================================"
    );

    console.log("");


    // ========================================================
    // DO NOT SEND TOKEN TO FRONTEND
    // ========================================================

    return res
      .status(200)
      .json({
        success: true,

        message:
          "JM Financial connected successfully.",

        data: {
          connected: true,
        },
      });

  } catch (error) {
    console.error("");
    console.error(
      "========================================"
    );

    console.error(
      "JM FINANCIAL AUTHENTICATION ERROR"
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
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "JM Financial authentication failed.",
      });
  }
}


module.exports = {
  startAuthentication,
};