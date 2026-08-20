// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const zerodhaRoutes =
//   require("./routes/zerodhaRoutes");

// const app = express();

// const PORT =
//   process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://uat.tradeboxlive.com",
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Tradebox Zerodha Backend Running",
//   });
// });

// app.use(
//   "/api/zerodha",
//   zerodhaRoutes
// );

// app.listen(PORT, () => {
//   console.log("");
//   console.log("================================");
//   console.log("TRADEBOX ZERODHA BACKEND");
//   console.log("================================");
//   console.log(
//     `Server: http://localhost:${PORT}`
//   );
//   console.log("Status: RUNNING");
//   console.log("================================");
//   console.log("");
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");

// ============================================================
// EXISTING BROKER ROUTES
// DO NOT REMOVE / CHANGE THESE
// ============================================================

const zerodhaRoutes = require("./routes/zerodhaRoutes");
const growwRoutes = require("./routes/growwRoutes");

// ============================================================
// NEW BROKER ROUTE
// UPSTOX ONLY
// ============================================================

const upstoxRoutes = require("./routes/upstoxRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// CORS
// ============================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://uat.tradeboxlive.com",
    ],
    credentials: true,
  })
);

// ============================================================
// BODY PARSER
// ============================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Tradebox Broker Backend Running",
  });
});

// ============================================================
// ZERODHA
// EXISTING - DO NOT CHANGE
// ============================================================

app.use("/api/zerodha", zerodhaRoutes);

// ============================================================
// GROWW
// EXISTING - DO NOT CHANGE
// ============================================================

app.use("/api/groww", growwRoutes);

// ============================================================
// UPSTOX
// NEW INTEGRATION
// ============================================================

app.use("/api/upstox", upstoxRoutes);

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log("       TRADEBOX BROKER BACKEND");
  console.log("========================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("Status: RUNNING");
  console.log("");
  console.log("Enabled Brokers:");
  console.log("  ✓ Zerodha");
  console.log("  ✓ Groww");
  console.log("  ✓ Upstox");
  console.log("========================================");
  console.log("");
});