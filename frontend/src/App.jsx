import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import BrokerSelection from "./components/BrokerSelection/BrokerSelection";

import ZerodhaAuth from "./brokers/zerodha/ZerodhaAuth";
import GrowwAuth from "./brokers/groww/GrowwAuth";
import UpstoxAuth from "./brokers/upstox/UpstoxAuth";
import AngelOneAuth from "./brokers/angelone/AngelOneAuth";
import KotakAuth from "./brokers/kotak/KotakAuth";
import IciciAuth from "./brokers/icici/IciciAuth";
import IciciResult from "./brokers/icici/IciciResult";
import HdfcAuth from "./brokers/hdfc/HdfcAuth";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            BROKER SELECTION
        ================================================== */}

        <Route
          path="/"
          element={<BrokerSelection />}
        />

        {/* ==================================================
            ZERODHA
        ================================================== */}

        <Route
          path="/login-with-api"
          element={<ZerodhaAuth />}
        />

        {/* ==================================================
            GROWW
        ================================================== */}

        <Route
          path="/groww"
          element={<GrowwAuth />}
        />

        {/* ==================================================
            UPSTOX
        ================================================== */}

        <Route
          path="/upstox"
          element={<UpstoxAuth />}
        />

        {/* ==================================================
            ANGEL ONE
        ================================================== */}

        <Route
          path="/angelone"
          element={<AngelOneAuth />}
        />

        {/* ==================================================
            KOTAK NEO
        ================================================== */}

        <Route
          path="/kotak"
          element={<KotakAuth />}
        />



        {/* ==================================================
            ICICI BROKER
        ================================================== */}

        <Route
  path="/icici"
  element={<IciciAuth />}
/>


<Route
  path="/icici/result"
  element={<IciciResult />}
/>

 {/* ==================================================
            HDFC BROKER
        ================================================== */}
<Route
  path="/hdfc"
  element={<HdfcAuth />}
/>

        {/* ==================================================
            UNKNOWN URL
            KEEP THIS ROUTE LAST
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;