// import { useState } from "react";
// import axios from "axios";

// function ZerodhaAuth() {
//   const [apiKey, setApiKey] = useState("");
//   const [apiSecret, setApiSecret] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [showSecret, setShowSecret] =
//     useState(false);

//   const handleAuthenticate = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (!apiKey.trim()) {
//       setError("Please enter your Zerodha API Key.");
//       return;
//     }

//     if (!apiSecret.trim()) {
//       setError(
//         "Please enter your Zerodha API Secret."
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:5000/api/zerodha/authenticate",
//         {
//           apiKey: apiKey.trim(),
//           apiSecret: apiSecret.trim(),
//         }
//       );

//       if (!response.data.success) {
//         throw new Error(
//           response.data.message
//         );
//       }

//       /*
//        * auth_id is passed to Zerodha through
//        * redirect_params.
//        *
//        * This lets the backend identify which
//        * temporary credential session belongs
//        * to this authentication.
//        */

//       const loginUrl =
//         new URL(response.data.loginUrl);

//       loginUrl.searchParams.set(
//         "redirect_params",
//         `auth_id=${encodeURIComponent(
//           response.data.authId
//         )}`
//       );

//       window.location.href =
//         loginUrl.toString();

//     } catch (err) {
//       console.error(err);

//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Authentication could not be started."
//       );

//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">

//       <div className="background-glow glow-one" />
//       <div className="background-glow glow-two" />

//       <div className="auth-container">

//         <div className="brand">
//           <div className="brand-icon">
//             Z
//           </div>

//           <div>
//             <h1>Tradebox</h1>
//             <span>Broker Integration</span>
//           </div>
//         </div>

//         <div className="auth-card">

//           <div className="broker-heading">

//             <div className="zerodha-logo">
//               Z
//             </div>

//             <div>
//               <div className="connected-badge">
//                 <span />
//                 Zerodha
//               </div>

//               <h2>
//                 Connect your account
//               </h2>

//               <p>
//                 Securely authenticate your
//                 Zerodha trading account with
//                 Tradebox.
//               </p>
//             </div>

//           </div>

//           <div className="security-note">
//             <div className="shield">
//               ✓
//             </div>

//             <div>
//               <strong>
//                 Secure authentication
//               </strong>

//               <span>
//                 Your API Secret is sent directly
//                 to the Tradebox backend and is
//                 not stored in browser storage.
//               </span>
//             </div>
//           </div>

//           <form
//             onSubmit={handleAuthenticate}
//           >

//             <label>
//               Zerodha API Key
//             </label>

//             <div className="input-wrapper">
//               <input
//                 type="text"
//                 placeholder="Enter your API Key"
//                 value={apiKey}
//                 onChange={(e) =>
//                   setApiKey(e.target.value)
//                 }
//                 autoComplete="off"
//               />
//             </div>

//             <label>
//               Zerodha API Secret
//             </label>

//             <div className="input-wrapper">
//               <input
//                 type={
//                   showSecret
//                     ? "text"
//                     : "password"
//                 }
//                 placeholder="Enter your API Secret"
//                 value={apiSecret}
//                 onChange={(e) =>
//                   setApiSecret(e.target.value)
//                 }
//                 autoComplete="new-password"
//               />

//               <button
//                 type="button"
//                 className="eye-button"
//                 onClick={() =>
//                   setShowSecret(!showSecret)
//                 }
//               >
//                 {showSecret ? "Hide" : "Show"}
//               </button>
//             </div>

//             {error && (
//               <div className="error-box">
//                 {error}
//               </div>
//             )}

//             <button
//               className="authenticate-button"
//               disabled={loading}
//             >
//               {loading
//                 ? "Connecting..."
//                 : "Authenticate with Zerodha"}

//               {!loading && (
//                 <span>→</span>
//               )}
//             </button>

//           </form>

//           <div className="footer-note">
//             <span>🔒</span>

//             Authentication is handled through
//             Zerodha's official Kite Connect flow.
//           </div>

//         </div>

//         <div className="bottom-text">
//           Tradebox Broker Integration • Zerodha
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ZerodhaAuth;



import { useState } from "react";
import axios from "axios";
import "./ZerodhaAuth.css";
import LearnMoreModal from "./LearnMoreModal";

import zerodhaImage from "../assets/brokers/zerodha.png";

function ZerodhaAuth({ onBack }) {

  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showSecret, setShowSecret] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);


  // ZERODHA AUTHENTICATION
  const handleAuthenticate = async (e) => {

    e.preventDefault();

    setError("");

    if (!apiKey.trim()) {
      setError("Please enter your Zerodha API Key.");
      return;
    }

    if (!apiSecret.trim()) {
      setError("Please enter your Zerodha API Secret.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/zerodha/authenticate",
        {
          apiKey: apiKey.trim(),
          apiSecret: apiSecret.trim(),
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
          "Authentication could not be started."
        );
      }


      const loginUrl = new URL(
        response.data.loginUrl
      );


      loginUrl.searchParams.set(
        "redirect_params",
        `auth_id=${encodeURIComponent(
          response.data.authId
        )}`
      );


      window.location.href =
        loginUrl.toString();

    } catch (err) {

      console.error(
        "Zerodha authentication error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Authentication could not be started."
      );

      setLoading(false);
    }
  };


  return (

    <div className="zerodha-auth-page">


      {/* HEADER */}

      <header className="auth-header">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ←
          <span>
            Back to brokers
          </span>
        </button>


        <div className="auth-brand">

          <div className="auth-brand-mark">
            T
          </div>

          <div>
            <strong>
              Tradebox
            </strong>

            <small>
              Broker Integration
            </small>
          </div>

        </div>


        <div className="auth-header-secure">

          <span />

          Secure connection

        </div>

      </header>



      {/* MAIN */}

      <main className="auth-main">


        <div className="auth-card">


          {/* TOP */}

          <div className="auth-card-top">


            <div className="broker-logo-container">

              <img
                src={zerodhaImage}
                alt="Zerodha"
                className="zerodha-image"
              />

            </div>


            <div className="auth-heading">

              <div className="broker-label">

                <span />

                ZERODHA

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your Kite Connect API
                credentials to securely connect
                your Zerodha trading account.
              </p>

            </div>

          </div>



          {/* SECURITY */}

          <div className="security-box">

            <div className="security-check">
              ✓
            </div>


            <div>

              <strong>
                Secure authentication
              </strong>

              <p>
                Your API Secret is sent to the
                Tradebox backend and is not stored
                in browser storage.
              </p>

            </div>

          </div>



          {/* FORM */}

          <form
            className="auth-form"
            onSubmit={handleAuthenticate}
          >


            {/* API KEY */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  Zerodha API Key
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="premium-input">

                <div className="input-prefix">
                  KEY
                </div>


                <input
                  type="text"
                  value={apiKey}
                  placeholder="Enter your API Key"
                  onChange={(e) =>
                    setApiKey(e.target.value)
                  }
                  autoComplete="off"
                />

              </div>

            </div>



            {/* API SECRET */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  Zerodha API Secret
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="premium-input">

                <div className="input-prefix">
                  SEC
                </div>


                <input
                  type={
                    showSecret
                      ? "text"
                      : "password"
                  }
                  value={apiSecret}
                  placeholder="Enter your API Secret"
                  onChange={(e) =>
                    setApiSecret(
                      e.target.value
                    )
                  }
                  autoComplete="new-password"
                />


                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowSecret(
                      !showSecret
                    )
                  }
                >
                  {showSecret
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>



            {/* LEARN MORE */}

            <button
              type="button"
              className="learn-more-button"
              onClick={() =>
                setShowLearnMore(true)
              }
            >

              <div className="learn-more-left">

                <div className="learn-more-icon">
                  ?
                </div>


                <div>

                  <strong>
                    New to Kite Connect?
                  </strong>

                  <span>
                    Learn how to get your API Key
                    & Secret
                  </span>

                </div>

              </div>


              <span className="learn-more-arrow">
                →
              </span>

            </button>



            {/* ERROR */}

            {error && (

              <div className="auth-error">

                <span>
                  !
                </span>

                <p>
                  {error}
                </p>

              </div>

            )}



            {/* AUTHENTICATE */}

            <button
              type="submit"
              className="authenticate-button"
              disabled={loading}
            >

              <span>

                {loading
                  ? "Connecting..."
                  : "Authenticate with Zerodha"}

              </span>


              {!loading && (
                <span className="button-arrow">
                  →
                </span>
              )}

            </button>


          </form>



          {/* FOOTER */}

          <div className="auth-card-footer">

            <span>
              🔒
            </span>

            <p>
              Authentication is handled through
              Zerodha's official Kite Connect flow.
            </p>

          </div>


        </div>



        <div className="auth-bottom-note">

          Tradebox Broker Integration

          <span>
            •
          </span>

          Zerodha

        </div>


      </main>



      {/* LEARN MORE MODAL */}

      {showLearnMore && (

        <LearnMoreModal
          onClose={() =>
            setShowLearnMore(false)
          }
        />

      )}

    </div>
  );
}

export default ZerodhaAuth;