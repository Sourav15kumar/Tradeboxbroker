import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import motilalImage from "../../assets/brokers/motilal.png";

import MotilalLearnMoreModal from "./MotilalLearnMoreModal";

import "./MotilalAuth.css";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


function MotilalAuth() {
  const navigate = useNavigate();

  const [apiKey, setApiKey] = useState("");
  const [apiSecretKey, setApiSecretKey] = useState("");

  const [showSecret, setShowSecret] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ==========================================================
  // AUTHENTICATE
  // ==========================================================

  const handleAuthenticate = async (event) => {
    event.preventDefault();

    setError("");

    const cleanApiKey = apiKey.trim();
    const cleanApiSecretKey = apiSecretKey.trim();


    if (!cleanApiKey) {
      setError(
        "Please enter your Motilal Oswal API Key."
      );

      return;
    }


    if (!cleanApiSecretKey) {
      setError(
        "Please enter your Motilal Oswal API Secret Key."
      );

      return;
    }


    try {
      setLoading(true);


      const response = await fetch(
        `${API_BASE_URL}/api/motilal/auth/start`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            apiKey: cleanApiKey,
            apiSecretKey: cleanApiSecretKey,
          }),
        }
      );


      const result = await response.json();


      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          "Unable to start Motilal Oswal authentication."
        );
      }


      if (!result.loginUrl) {
        throw new Error(
          "Motilal Oswal login URL was not returned."
        );
      }


      // Redirect user to official Motilal Oswal login page
      window.location.href = result.loginUrl;

    } catch (error) {
      console.error(
        "Motilal authentication error:",
        error
      );


      setError(
        error.message ||
        "Unable to authenticate with Motilal Oswal."
      );


      setLoading(false);
    }
  };


  return (
    <div className="motilal-auth-page">

      {/* BACKGROUND */}

      <div className="motilal-auth-grid" />

      <div className="motilal-auth-glow motilal-auth-glow-one" />
      <div className="motilal-auth-glow motilal-auth-glow-two" />


      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="motilal-auth-header">

        <button
          type="button"
          className="motilal-back-button"
          onClick={() => navigate("/")}
        >
          <span>←</span>

          Back to brokers
        </button>


        <div className="motilal-tradebox-brand">

          <div className="motilal-tradebox-mark">
            T
          </div>

          <span>
            Tradebox
          </span>

        </div>


        <div className="motilal-secure-header">

          <span className="motilal-secure-dot" />

          Secure connection

        </div>

      </header>


      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="motilal-auth-main">

        <div className="motilal-auth-card">


          {/* ==================================================
              CARD HEADER
          ================================================== */}

          <div className="motilal-card-header">

            <div className="motilal-logo-box">

              <img
                src={motilalImage}
                alt="Motilal Oswal"
              />

            </div>


            <div className="motilal-heading">

              <div className="motilal-broker-label">

                <span />

                MOTILAL OSWAL

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your Motilal Oswal API
                credentials to securely connect
                your account with Tradebox.
              </p>

            </div>

          </div>


          {/* ==================================================
              SECURITY BOX
          ================================================== */}

          <div className="motilal-security-box">

            <div className="motilal-security-icon">
              ✓
            </div>


            <div>

              <strong>
                Secure authentication
              </strong>


              <p>
                Your API Key and API Secret Key
                are sent to the Tradebox backend
                only for authentication. Your final
                Access Token is never returned to
                the browser.
              </p>

            </div>

          </div>


          {/* ==================================================
              FORM
          ================================================== */}

          <form
            className="motilal-auth-form"
            onSubmit={handleAuthenticate}
          >


            {/* ==================================================
                API KEY
            ================================================== */}

            <div className="motilal-field-group">

              <div className="motilal-label-row">

                <label>
                  API Key
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="motilal-premium-input">

                <div className="motilal-input-icon">
                  #
                </div>


                <input
                  type="text"
                  placeholder="Enter your Motilal Oswal API Key"
                  value={apiKey}
                  onChange={(event) =>
                    setApiKey(event.target.value)
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>


            {/* ==================================================
                API SECRET
            ================================================== */}

            <div className="motilal-field-group">

              <div className="motilal-label-row">

                <label>
                  API Secret Key
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="motilal-premium-input">

                <div className="motilal-input-icon">
                  •••
                </div>


                <input
                  type={
                    showSecret
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your Motilal Oswal API Secret"
                  value={apiSecretKey}
                  onChange={(event) =>
                    setApiSecretKey(event.target.value)
                  }
                  autoComplete="off"
                  spellCheck="false"
                />


                <button
                  type="button"
                  className="motilal-show-button"
                  onClick={() =>
                    setShowSecret(!showSecret)
                  }
                >
                  {showSecret
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* ==================================================
                LEARN MORE
            ================================================== */}

            <button
              type="button"
              className="motilal-learn-more-button"
              onClick={() =>
                setShowLearnMore(true)
              }
            >

              <span className="motilal-learn-icon">
                ?
              </span>


              <span>
                How do I get my API Key & Secret?
              </span>


              <span className="motilal-learn-arrow">
                →
              </span>

            </button>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

              <div className="motilal-auth-error">

                <span>
                  !
                </span>

                <span>
                  {error}
                </span>

              </div>

            )}


            {/* ==================================================
                AUTHENTICATE BUTTON
            ================================================== */}

            <button
              type="submit"
              className="motilal-authenticate-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Redirecting to Motilal Oswal..."
                  : "Authenticate with Motilal Oswal"}
              </span>


              {!loading && (

                <span className="motilal-button-arrow">
                  →
                </span>

              )}

            </button>

          </form>


          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="motilal-card-footer">

            <span>
              🔒
            </span>


            <span>
              Authentication continues through
              Motilal Oswal's official authorization flow.
            </span>

          </div>

        </div>


        <div className="motilal-bottom-note">

          Tradebox Broker Integration

          <span>•</span>

          Motilal Oswal

        </div>

      </main>


      {/* ======================================================
          LEARN MORE
      ====================================================== */}

      {showLearnMore && (

        <MotilalLearnMoreModal
          onClose={() =>
            setShowLearnMore(false)
          }
        />

      )}

    </div>
  );
}


export default MotilalAuth;