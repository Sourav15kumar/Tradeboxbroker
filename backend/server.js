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

const express =
  require("express");

const cors =
  require("cors");


// ============================================================
// EXISTING BROKERS
// ============================================================

const zerodhaRoutes =
  require(
    "./routes/zerodhaRoutes"
  );

const growwRoutes =
  require(
    "./routes/growwRoutes"
  );

const upstoxRoutes =
  require(
    "./routes/upstoxRoutes"
  );


  const iciciRoutes =
  require("./routes/iciciRoutes");


// ============================================================
// ANGEL ONE
// ============================================================

const angelOneRoutes =
  require(
    "./routes/angelOneRoutes"
  );

const kotakRoutes =
  require("./routes/kotakRoutes");


const app = express();

  app.use(
  express.urlencoded({
    extended: true,
  })
);



const PORT =
  process.env.PORT ||
  5000;


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

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
  "/",
  (req, res) => {

    res.json({
      success: true,

      message:
        "Tradebox Broker Backend Running",
    });

  }
);


// ============================================================
// ZERODHA
// EXISTING
// ============================================================

app.use(
  "/api/zerodha",
  zerodhaRoutes
);


// ============================================================
// GROWW
// EXISTING
// ============================================================

app.use(
  "/api/groww",
  growwRoutes
);


// ============================================================
// UPSTOX
// EXISTING
// ============================================================

app.use(
  "/api/upstox",
  upstoxRoutes
);


// ============================================================
// ANGEL ONE
// NEW
// ============================================================

app.use(
  "/api/angelone",
  angelOneRoutes
);

app.use(
  "/api/kotak",
  kotakRoutes
);

// ============================================================
// icici routes ok
// NEW
// ============================================================


app.use(
  "/api/icici",
  iciciRoutes
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
      "========================================"
    );

    console.log("");

  }
);