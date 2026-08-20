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

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Broker Selection */}
        <Route
          path="/"
          element={<BrokerSelection />}
        />

        {/* Zerodha */}
        <Route
          path="/login-with-api"
          element={<ZerodhaAuth />}
        />

        {/* Groww */}
        <Route
          path="/groww"
          element={<GrowwAuth />}
        />   

      {/* upstock */}
        <Route
  path="/upstox"
  element={<UpstoxAuth />}
/>

        {/* Unknown URL */}
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