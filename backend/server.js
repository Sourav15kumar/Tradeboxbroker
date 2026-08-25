require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


// ============================================================
// BROKER ROUTES
// ============================================================

const zerodhaRoutes =
  require("./routes/zerodhaRoutes");

const growwRoutes =
  require("./routes/growwRoutes");

const upstoxRoutes =
  require("./routes/upstoxRoutes");

const angelOneRoutes =
  require("./routes/angelOneRoutes");

const kotakRoutes =
  require("./routes/kotakRoutes");

const iciciRoutes =
  require("./routes/iciciRoutes");

const jmFinancialRoutes =
  require("./routes/jmFinancialRoutes");

const fyersRoutes =
  require("./routes/fyersRoutes");

const motilalRoutes =
  require("./routes/motilalRoutes");

const anandRathiRoutes =
  require("./routes/anandRathiRoutes");


// ============================================================
// EXPRESS APP
// ============================================================

const app = express();

const PORT =
  process.env.PORT || 5000;


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
// BODY PARSERS
// ============================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ============================================================
// COOKIE PARSER
// ============================================================

app.use(cookieParser());


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "Tradebox Broker Backend Running",
  });

});


// ============================================================
// ZERODHA
// ============================================================

app.use(
  "/api/zerodha",
  zerodhaRoutes
);


// ============================================================
// GROWW
// API KEY + API SECRET AUTHENTICATION
// ============================================================

app.use(
  "/api/groww",
  growwRoutes
);


// ============================================================
// UPSTOX
// ============================================================

app.use(
  "/api/upstox",
  upstoxRoutes
);


// ============================================================
// ANGEL ONE
// ============================================================

app.use(
  "/api/angelone",
  angelOneRoutes
);


// ============================================================
// KOTAK NEO
// ============================================================

app.use(
  "/api/kotak",
  kotakRoutes
);


// ============================================================
// ICICI DIRECT
// ============================================================

app.use(
  "/api/icici",
  iciciRoutes
);


// ============================================================
// JM FINANCIAL
// ============================================================

app.use(
  "/api/jmfinancial",
  jmFinancialRoutes
);


// ============================================================
// FYERS
// ============================================================

app.use(
  "/api/fyers",
  fyersRoutes
);


// ============================================================
// MOTILAL OSWAL
// ============================================================

app.use(
  "/api/motilal",
  motilalRoutes
);


// ============================================================
// ANAND RATHI
// ============================================================

app.use(
  "/api/anandrathi",
  anandRathiRoutes
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {

    console.log("");

    console.log(
      "========================================"
    );

    console.log(
      "       TRADEBOX BROKER BACKEND"
    );

    console.log(
      "========================================"
    );

    console.log(
      `Server: http://localhost:${PORT}`
    );

    console.log(
      "Status: RUNNING"
    );

    console.log("");

    console.log(
      "Enabled Brokers:"
    );

    console.log(
      " ✓ Zerodha"
    );

    console.log(
      " ✓ Groww"
    );

    console.log(
      " ✓ Upstox"
    );

    console.log(
      " ✓ Angel One"
    );

    console.log(
      " ✓ Kotak Neo"
    );

    console.log(
      " ✓ ICICI Direct"
    );

    console.log(
      " ✓ JM Financial"
    );

    console.log(
      " ✓ FYERS"
    );

    console.log(
      " ✓ Motilal Oswal"
    );

    console.log(
      " ✓ Anand Rathi"
    );

    console.log(
      "========================================"
    );

    console.log("");

  }
);