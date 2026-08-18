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

const zerodhaRoutes = require("./routes/zerodhaRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Tradebox Zerodha Backend Running",
  });
});

// ==========================================
// ZERODHA ROUTES
// ==========================================

app.use("/api/zerodha", zerodhaRoutes);

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log("       TRADEBOX ZERODHA BACKEND");
  console.log("========================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("Status: RUNNING");
  console.log("========================================");
  console.log("");
});