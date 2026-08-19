const growwService = require("../services/growwService");

async function authenticateGroww(req, res) {
  try {
    const { apiKey, totp } = req.body || {};

    // ----------------------------------------
    // Validate API Key
    // ----------------------------------------

    if (
      typeof apiKey !== "string" ||
      !apiKey.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Groww API Key is required.",
      });
    }

    // ----------------------------------------
    // Validate TOTP
    // ----------------------------------------

    if (
      typeof totp !== "string" ||
      !totp.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Groww TOTP code is required.",
      });
    }

    const cleanApiKey = apiKey.trim();
    const cleanTotp = totp.trim();

    // Groww TOTP = exactly 6 digits
    if (!/^\d{6}$/.test(cleanTotp)) {
      return res.status(400).json({
        success: false,
        message:
          "Groww TOTP must be a 6-digit code.",
      });
    }

    console.log("\n");
    console.log("========================================");
    console.log("       GROWW AUTHENTICATION");
    console.log("========================================");

    console.log(
      "API Key received : YES"
    );

    console.log(
      "TOTP received    : YES"
    );

    console.log("----------------------------------------");

    // ----------------------------------------
    // Generate Groww Access Token
    // ----------------------------------------

    const result =
      await growwService.generateAccessToken(
        cleanApiKey,
        cleanTotp
      );

    // ----------------------------------------
    // Authentication successful
    // ----------------------------------------

    console.log(
      "✅ Groww authentication successful!"
    );

    console.log("----------------------------------------");

    // ----------------------------------------
    // ACCESS TOKEN
    // ----------------------------------------

    console.log(
      "🔑 Groww Access Token:"
    );

    console.log(
      result.token || "TOKEN NOT RECEIVED"
    );

    console.log("----------------------------------------");

    // ----------------------------------------
    // Additional information
    // ----------------------------------------

    console.log(
      "Token Reference ID:",
      result.tokenRefId || "N/A"
    );

    console.log(
      "Session Name:",
      result.sessionName || "N/A"
    );

    console.log(
      "Expiry:",
      result.expiry || "N/A"
    );

    console.log("========================================");
    console.log("\n");

    // ----------------------------------------
    // Never send access token to frontend
    // ----------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Groww authentication successful.",
    });

  } catch (error) {

    console.error("\n");
    console.error(
      "❌ Groww authentication failed:"
    );

    console.error(
      error.message
    );

    console.error("\n");

    return res.status(401).json({
      success: false,
      message:
        error.message ||
        "Groww authentication failed.",
    });
  }
}

module.exports = {
  authenticateGroww,
};