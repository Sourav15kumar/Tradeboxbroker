// const zerodhaService = require("../services/zerodhaService");

// // Temporary in-memory session for this development/UAT flow.
// // Do NOT use this as permanent credential storage.
// const pendingAuth = new Map();

// function startAuthentication(req, res) {
//   try {
//     const { apiKey, apiSecret } = req.body;

//     if (!apiKey || !apiSecret) {
//       return res.status(400).json({
//         success: false,
//         message: "API Key and API Secret are required.",
//       });
//     }

//     const authId = cryptoRandomId();

//     pendingAuth.set(authId, {
//       apiKey,
//       apiSecret,
//       createdAt: Date.now(),
//     });

//     const loginUrl =
//       zerodhaService.createLoginUrl(apiKey);

//     return res.json({
//       success: true,
//       authId,
//       loginUrl,
//     });
//   } catch (error) {
//     console.error("START AUTH ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to start Zerodha authentication.",
//     });
//   }
// }

// async function callback(req, res) {
//   try {
//     const {
//       request_token,
//       status,
//       auth_id,
//     } = req.query;

//     console.log("\n================================");
//     console.log("ZERODHA CALLBACK RECEIVED");
//     console.log("================================");

//     console.log("Status:", status);
//     console.log("Request Token Received:", !!request_token);
//     console.log("Auth ID:", auth_id);

//     if (status !== "success") {
//       return res.status(400).send(`
//         <h2>Zerodha Authentication Failed</h2>
//         <p>Zerodha did not return a successful status.</p>
//       `);
//     }

//     if (!request_token) {
//       return res.status(400).send(`
//         <h2>Authentication Failed</h2>
//         <p>Request token was not received.</p>
//       `);
//     }

//     if (!auth_id) {
//       return res.status(400).send(`
//         <h2>Authentication Failed</h2>
//         <p>Authentication session was not found.</p>
//       `);
//     }

//     const credentials = pendingAuth.get(auth_id);

//     if (!credentials) {
//       return res.status(400).send(`
//         <h2>Authentication Session Expired</h2>
//         <p>Please start the Zerodha authentication again.</p>
//       `);
//     }

//     // Prevent reuse.
//     pendingAuth.delete(auth_id);

//     const result =
//       await zerodhaService.generateAccessToken({
//         apiKey: credentials.apiKey,
//         apiSecret: credentials.apiSecret,
//         requestToken: request_token,
//       });

//     if (result.status !== "success") {
//       throw new Error(
//         result.message || "Zerodha authentication failed."
//       );
//     }

//     const data = result.data;

//     console.log("\n================================");
//     console.log("ZERODHA AUTHENTICATION SUCCESS");
//     console.log("================================");

//     console.log("User ID      :", data.user_id);
//     console.log("User Name    :", data.user_name);
//     console.log("Broker       :", data.broker);
//     console.log("API Key      :", data.api_key);
//     console.log("Access Token :", data.access_token);

//     console.log("================================\n");

//     return res.send(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Tradebox - Zerodha Connected</title>

//           <style>
//             body {
//               margin: 0;
//               font-family: Arial, sans-serif;
//               background: #f5f7fb;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               min-height: 100vh;
//             }

//             .card {
//               background: white;
//               padding: 40px;
//               border-radius: 20px;
//               box-shadow: 0 20px 60px rgba(0,0,0,.08);
//               text-align: center;
//               max-width: 480px;
//             }

//             .success {
//               width: 64px;
//               height: 64px;
//               border-radius: 50%;
//               background: #e7f8ee;
//               color: #159447;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               margin: 0 auto 20px;
//               font-size: 30px;
//             }

//             h1 {
//               margin-bottom: 10px;
//             }

//             p {
//               color: #667085;
//               line-height: 1.6;
//             }
//           </style>
//         </head>

//         <body>
//           <div class="card">
//             <div class="success">✓</div>

//             <h1>Zerodha Connected</h1>

//             <p>
//               Authentication completed successfully.
//             </p>

//             <p>
//               User: ${escapeHtml(data.user_name || "")}
//             </p>

//             <p>
//               You can return to Tradebox.
//             </p>
//           </div>
//         </body>
//       </html>
//     `);

//   } catch (error) {
//     console.error("\n================================");
//     console.error("ZERODHA AUTHENTICATION ERROR");
//     console.error("================================");

//     console.error(
//       error.response?.data || error.message
//     );

//     console.error("================================\n");

//     return res.status(500).send(`
//       <h2>Zerodha Authentication Failed</h2>
//       <p>Check your backend terminal for the error.</p>
//     `);
//   }
// }

// function cryptoRandomId() {
//   return (
//     Date.now().toString(36) +
//     Math.random().toString(36).slice(2)
//   );
// }

// function escapeHtml(value) {
//   return String(value)
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#039;");
// }

// module.exports = {
//   startAuthentication,
//   callback,
// };



const zerodhaService = require("../services/zerodhaService");

// =====================================================
// TEMPORARY AUTH STORAGE
// =====================================================
//
// Local development / UAT testing only.
//
// Production mein Redis / database / secure session
// storage use karna chahiye.
//

const pendingAuth = new Map();

// =====================================================
// START AUTHENTICATION
// =====================================================

function startAuthentication(req, res) {
  try {
    const {
      apiKey,
      apiSecret,
    } = req.body;

    // -----------------------------------------------
    // Validate credentials
    // -----------------------------------------------

    if (!apiKey || !apiSecret) {
      return res.status(400).json({
        success: false,
        message:
          "API Key and API Secret are required.",
      });
    }

    // -----------------------------------------------
    // Create unique authentication ID
    // -----------------------------------------------

    const authId = cryptoRandomId();

    // -----------------------------------------------
    // Temporarily store credentials
    // -----------------------------------------------

    pendingAuth.set(authId, {
      apiKey,
      apiSecret,
      createdAt: Date.now(),
    });

    console.log("");
    console.log("========================================");
    console.log("       ZERODHA AUTH STARTED");
    console.log("========================================");
    console.log("Auth ID:", authId);
    console.log("API Key:", apiKey);
    console.log("========================================");
    console.log("");

    // -----------------------------------------------
    // Create Zerodha login URL
    // -----------------------------------------------

    const loginUrl =
      zerodhaService.createLoginUrl(
        apiKey,
        authId
      );

    // -----------------------------------------------
    // Send URL to frontend
    // -----------------------------------------------

    return res.json({
      success: true,
      authId,
      loginUrl,
    });

  } catch (error) {

    console.error(
      "START AUTH ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to start Zerodha authentication.",
    });
  }
}

// =====================================================
// ZERODHA CALLBACK
// =====================================================

async function callback(req, res) {
  try {

    const {
      request_token,
      status,
      auth_id,
    } = req.query;

    console.log("");
    console.log("========================================");
    console.log("       ZERODHA CALLBACK RECEIVED");
    console.log("========================================");

    console.log(
      "Status:",
      status
    );

    console.log(
      "Request Token Received:",
      Boolean(request_token)
    );

    console.log(
      "Auth ID:",
      auth_id
    );

    console.log(
      "========================================"
    );

    // =================================================
    // CHECK STATUS
    // =================================================

    if (status !== "success") {

      return res.status(400).send(`
        <!DOCTYPE html>

        <html>

        <head>
          <title>Tradebox - Authentication Failed</title>
        </head>

        <body
          style="
            font-family: Arial;
            text-align: center;
            padding-top: 100px;
          "
        >

          <h2>Zerodha Authentication Failed</h2>

          <p>
            Zerodha login was not successful.
          </p>

        </body>

        </html>
      `);
    }

    // =================================================
    // CHECK REQUEST TOKEN
    // =================================================

    if (!request_token) {

      return res.status(400).send(`
        <h2>Authentication Failed</h2>

        <p>
          Request token was not received.
        </p>
      `);
    }

    // =================================================
    // CHECK AUTH ID
    // =================================================

    if (!auth_id) {

      return res.status(400).send(`
        <h2>Authentication Failed</h2>

        <p>
          Authentication ID was not received.
        </p>
      `);
    }

    // =================================================
    // FIND STORED CREDENTIALS
    // =================================================

    const credentials =
      pendingAuth.get(auth_id);

    if (!credentials) {

      console.error(
        "Authentication session not found."
      );

      return res.status(400).send(`
        <!DOCTYPE html>

        <html>

        <head>
          <title>Tradebox - Session Expired</title>
        </head>

        <body
          style="
            font-family: Arial;
            text-align: center;
            padding-top: 100px;
          "
        >

          <h2>Authentication Session Expired</h2>

          <p>
            Please start the Zerodha authentication again.
          </p>

        </body>

        </html>
      `);
    }

    console.log(
      "Credentials found for Auth ID:",
      auth_id
    );

    // =================================================
    // REMOVE SESSION
    // =================================================

    pendingAuth.delete(auth_id);

    // =================================================
    // EXCHANGE REQUEST TOKEN
    // =================================================

    console.log("");
    console.log(
      "Exchanging request token for access token..."
    );

    const result =
      await zerodhaService.generateAccessToken({
        apiKey: credentials.apiKey,

        apiSecret:
          credentials.apiSecret,

        requestToken:
          request_token,
      });

    // =================================================
    // CHECK ZERODHA RESPONSE
    // =================================================

    if (
      !result ||
      result.status !== "success"
    ) {

      throw new Error(
        result?.message ||
          "Zerodha access token generation failed."
      );
    }

    const data = result.data;

    // =================================================
    // SUCCESS
    // =================================================

    console.log("");
    console.log("========================================");
    console.log("   ZERODHA AUTHENTICATION SUCCESS");
    console.log("========================================");

    console.log(
      "User ID      :",
      data.user_id
    );

    console.log(
      "User Name    :",
      data.user_name
    );

    console.log(
      "Broker       :",
      data.broker
    );

    console.log(
      "API Key      :",
      data.api_key
    );

    console.log(
      "ACCESS TOKEN :",
      data.access_token
    );

    console.log("========================================");
    console.log("");

    // =================================================
    // SUCCESS PAGE
    // =================================================

    return res.send(`
      <!DOCTYPE html>

      <html>

      <head>

        <title>
          Tradebox - Zerodha Connected
        </title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <style>

          * {
            box-sizing: border-box;
          }

          body {

            margin: 0;

            min-height: 100vh;

            display: flex;

            align-items: center;

            justify-content: center;

            font-family:
              Arial,
              sans-serif;

            background:
              linear-gradient(
                135deg,
                #f8fafc,
                #eef2f7
              );

          }

          .card {

            width:
              calc(100% - 40px);

            max-width: 480px;

            background: white;

            padding: 45px;

            border-radius: 24px;

            text-align: center;

            box-shadow:
              0 25px 80px
              rgba(
                15,
                23,
                42,
                0.10
              );

          }

          .icon {

            width: 70px;

            height: 70px;

            margin:
              0 auto 20px;

            border-radius: 50%;

            background: #ecfdf3;

            color: #12b76a;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 34px;

            font-weight: bold;

          }

          h1 {

            margin:
              0 0 12px;

            color: #101828;

          }

          p {

            color: #667085;

            line-height: 1.6;

          }

          .status {

            display: inline-block;

            margin-top: 12px;

            padding:
              8px 14px;

            border-radius: 999px;

            background: #ecfdf3;

            color: #027a48;

            font-size: 13px;

            font-weight: 700;

          }

        </style>

      </head>

      <body>

        <div class="card">

          <div class="icon">
            ✓
          </div>

          <h1>
            Zerodha Connected
          </h1>

          <p>
            Authentication completed successfully.
          </p>

          <div class="status">
            ACCESS TOKEN GENERATED
          </div>

          <p>
            You can safely close this window.
          </p>

        </div>

      </body>

      </html>
    `);

  } catch (error) {

    console.error("");
    console.error("========================================");
    console.error("   ZERODHA AUTHENTICATION ERROR");
    console.error("========================================");

    console.error(
      "Error:",
      error.response?.data ||
        error.message
    );

    console.error(
      "========================================"
    );

    console.error("");

    return res.status(500).send(`
      <!DOCTYPE html>

      <html>

      <head>
        <title>
          Tradebox - Authentication Failed
        </title>
      </head>

      <body
        style="
          font-family: Arial;
          text-align: center;
          padding-top: 100px;
        "
      >

        <h2>
          Zerodha Authentication Failed
        </h2>

        <p>
          Check the backend terminal for the error.
        </p>

      </body>

      </html>
    `);
  }
}

// =====================================================
// GENERATE AUTH ID
// =====================================================

function cryptoRandomId() {

  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .slice(2)
  );
}

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  startAuthentication,
  callback,
};