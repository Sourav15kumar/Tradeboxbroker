// import { useState } from "react";

// import ZerodhaAuth from "./components/ZerodhaAuth";
// import LearnMore from "./components/LearnMore";

// function App() {
//   const [showLearnMore, setShowLearnMore] =
//     useState(false);

//   return (
//     <>
//       <ZerodhaAuth />

//       <button
//         className="floating-learn"
//         onClick={() =>
//           setShowLearnMore(true)
//         }
//       >
//         Learn More
//       </button>

//       {showLearnMore && (
//         <LearnMore
//           onClose={() =>
//             setShowLearnMore(false)
//           }
//         />
//       )}
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BrokerSelection from "./components/BrokerSelection";
import ZerodhaAuth from "./components/ZerodhaAuth";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* BROKER SELECTION */}
        <Route
          path="/"
          element={<BrokerSelection />}
        />


        {/* API BROKER LOGIN */}
        <Route
          path="/login-with-api"
          element={<ZerodhaAuth />}
        />


        {/* UNKNOWN URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;