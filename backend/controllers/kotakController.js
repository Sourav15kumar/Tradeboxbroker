const {
  totpLogin,
  validateMpin,
} = require("../services/kotakService");


// ============================================================
// KOTAK AUTHENTICATION
// ============================================================

async function authenticateKotak(req, res) {
  try {
    const {
      consumerKey,
      mobileNumber,
      ucc,
      totp,
      mpin,
    } = req.body;


    // ========================================================
    // VALIDATION
    // ========================================================

    if (!consumerKey || !consumerKey.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Kotak API Access Token is required.",
      });
    }


    if (!mobileNumber || !mobileNumber.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Kotak registered mobile number is required.",
      });
    }


    if (!ucc || !ucc.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Kotak Client Code (UCC) is required.",
      });
    }


    if (!totp || !totp.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Kotak TOTP is required.",
      });
    }


    if (!/^\d{6}$/.test(totp.trim())) {
      return res.status(400).json({
        success: false,
        message:
          "Kotak TOTP must be exactly 6 digits.",
      });
    }


    if (!mpin || !mpin.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Kotak MPIN is required.",
      });
    }


    if (!/^\d{6}$/.test(mpin.trim())) {
      return res.status(400).json({
        success: false,
        message:
          "Kotak MPIN must be exactly 6 digits.",
      });
    }


    // ========================================================
    // NORMALIZE MOBILE NUMBER
    // ========================================================

    let cleanMobile =
      mobileNumber.trim().replace(/\s+/g, "");


    if (/^\d{10}$/.test(cleanMobile)) {
      cleanMobile =
        `+91${cleanMobile}`;
    }


    // ========================================================
    // STEP 1
    // TOTP LOGIN
    // ========================================================

    const loginResponse =
      await totpLogin({
        consumerKey:
          consumerKey.trim(),

        mobileNumber:
          cleanMobile,

        ucc:
          ucc.trim(),

        totp:
          totp.trim(),
      });


    const loginData =
      loginResponse?.data;


    if (
      !loginData ||
      !loginData.token ||
      !loginData.sid
    ) {
      console.error("");
      console.error(
        "========================================"
      );
      console.error(
        "KOTAK TOTP LOGIN FAILED"
      );
      console.error(
        "========================================"
      );
      console.error(
        loginResponse
      );
      console.error(
        "========================================"
      );
      console.error("");


      return res.status(401).json({
        success: false,
        message:
          "Kotak TOTP authentication failed. Check API token, mobile number, UCC and TOTP.",
      });
    }


    const viewToken =
      loginData.token;

    const sid =
      loginData.sid;


    // ========================================================
    // STEP 2
    // MPIN VALIDATION
    // ========================================================

    const validationResponse =
      await validateMpin({
        consumerKey:
          consumerKey.trim(),

        sid,

        viewToken,

        mpin:
          mpin.trim(),
      });


    const validationData =
      validationResponse?.data;


    if (
      !validationData ||
      !validationData.token ||
      !validationData.sid
    ) {
      console.error("");
      console.error(
        "========================================"
      );
      console.error(
        "KOTAK MPIN VALIDATION FAILED"
      );
      console.error(
        "========================================"
      );
      console.error(
        validationResponse
      );
      console.error(
        "========================================"
      );
      console.error("");


      return res.status(401).json({
        success: false,
        message:
          "Kotak MPIN validation failed.",
      });
    }


    // ========================================================
    // FINAL KOTAK TRADE SESSION
    // ========================================================

    const tradeToken =
      validationData.token;

    const tradeSid =
      validationData.sid;

    const rid =
      validationData.rid;

    const hsServerId =
      validationData.hsServerId;

    const dataCenter =
      validationData.dataCenter;

    const baseUrl =
      validationData.baseUrl;


    // ========================================================
    // DEVELOPMENT ONLY
    // ========================================================

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "   KOTAK AUTHENTICATION SUCCESS"
    );
    console.log(
      "========================================"
    );

    console.log(
      "TRADE TOKEN:"
    );

    console.log(
      tradeToken
    );


    console.log("");
    console.log(
      "SID:",
      tradeSid
    );


    if (baseUrl) {
      console.log(
        "BASE URL:",
        baseUrl
      );
    }


    console.log(
      "========================================"
    );
    console.log("");


    // ========================================================
    // IMPORTANT
    // DO NOT SEND RAW TOKEN TO FRONTEND
    // ========================================================

    return res.status(200).json({
      success: true,

      message:
        "Kotak Neo authenticated successfully.",

      data: {
        connected: true,

        ucc:
          validationData.ucc ||
          ucc.trim(),

        baseUrl:
          baseUrl || null,

        session: {
          sid:
            tradeSid || null,

          rid:
            rid || null,

          hsServerId:
            hsServerId || null,

          dataCenter:
            dataCenter || null,
        },
      },
    });

  } catch (error) {

    console.error("");
    console.error(
      "========================================"
    );
    console.error(
      "KOTAK AUTHENTICATION ERROR"
    );
    console.error(
      "========================================"
    );


    if (error.response) {
      console.error(
        "STATUS:",
        error.response.status
      );

      console.error(
        "KOTAK RESPONSE:",
        error.response.data
      );
    } else {
      console.error(
        "ERROR:",
        error.message
      );
    }


    console.error(
      "========================================"
    );
    console.error("");


    let message =
      "Unable to authenticate with Kotak Neo.";


    if (error.response?.status === 400) {
      message =
        "Invalid Kotak authentication details.";
    }


    if (error.response?.status === 401) {
      message =
        "Kotak authentication rejected. Please verify your credentials.";
    }


    if (error.response?.status === 429) {
      message =
        "Too many Kotak login attempts. Please wait and try again.";
    }


    return res.status(
      error.response?.status || 500
    ).json({
      success: false,
      message,
    });
  }
}


module.exports = {
  authenticateKotak,
};