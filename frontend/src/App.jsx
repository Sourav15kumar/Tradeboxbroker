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
import HdfcAuth from "./brokers/hdfc/HdfcAuth";
import JMFinancialAuth from "./brokers/jmfinancial/JMFinancialAuth";
import FyersAuth from "./brokers/fyers/FyersAuth";
import MotilalAuth from "./brokers/motilal/MotilalAuth";
import AnandRathiAuth from "./brokers/anandrathi/AnandRathiAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<BrokerSelection />}
        />

        <Route
          path="/login-with-api"
          element={<ZerodhaAuth />}
        />

        <Route
          path="/groww"
          element={<GrowwAuth />}
        />

        <Route
          path="/upstox"
          element={<UpstoxAuth />}
        />

        <Route
          path="/angelone"
          element={<AngelOneAuth />}
        />

        <Route
          path="/kotak"
          element={<KotakAuth />}
        />

        <Route
          path="/icici"
          element={<IciciAuth />}
        />

        <Route
          path="/hdfc"
          element={<HdfcAuth />}
        />

        <Route
          path="/jmfinancial"
          element={<JMFinancialAuth />}
        />

        <Route
  path="/fyers"
  element={<FyersAuth />}
/>
    <Route
  path="/motilal"
  element={<MotilalAuth />}

/>

{/* anandrathi */}
<Route path="/anandrathi"
element={<AnandRathiAuth/>}
/>


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