import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import anandRathiImage from "../../assets/brokers/anandrathi.png";

import AnandRathiLearnMoreModal from "./AnandRathiLearnMoreModal";

import "./AnandRathiAuth.css";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


function AnandRathiAuth() {
  const navigate = useNavigate();

  const [appKey, setAppKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const [showSecret, setShowSecret] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // ==========================================================
  // AUTHENTICATE
  // ==========================================================

  const handleAuthenticate = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanAppKey = appKey.trim();
    const cleanSecretKey = secretKey.trim();


    if (!cleanAppKey) {
      setError(
        "Please enter your Anand Rathi App Key."
      );

      return;
    }


    if (!cleanSecretKey) {
      setError(
        "Please enter your Anand Rathi Secret Key."
      );

      return;
    }


    try {
      setLoading(true);


      const response = await fetch(
        `${API_BASE_URL}/api/anandrathi/authenticate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            appKey: cleanAppKey,
            secretKey: cleanSecretKey,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "Anand Rathi authentication failed."
        );
      }


      setSuccess(
        "Anand Rathi connected successfully."
      );

    } catch (error) {

      console.error(
        "ANAND RATHI AUTH ERROR:",
        error
      );


      setError(
        error.message ||
        "Unable to authenticate with Anand Rathi."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="anandrathi-auth-page">

      {/* BACKGROUND */}

      <div className="anandrathi-auth-grid" />

      <div className="anandrathi-auth-glow anandrathi-auth-glow-one" />

      <div className="anandrathi-auth-glow anandrathi-auth-glow-two" />


      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="anandrathi-auth-header">

        <button
          type="button"
          className="anandrathi-back-button"
          onClick={() => navigate("/")}
        >
          <span>
            ←
          </span>

          Back to brokers
        </button>


        <div className="anandrathi-tradebox-brand">

          <div className="anandrathi-tradebox-mark">
            T
          </div>

          <span>
            Tradebox
          </span>

        </div>


        <div className="anandrathi-secure-header">

          <span className="anandrathi-secure-dot" />

          Secure connection

        </div>

      </header>


      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="anandrathi-auth-main">

        <div className="anandrathi-auth-card">


          {/* ==================================================
              CARD HEADER
          ================================================== */}

          <div className="anandrathi-card-header">

            <div className="anandrathi-logo-box">

              <img
                src={anandRathiImage}
                alt="Anand Rathi"
              />

            </div>


            <div className="anandrathi-heading">

              <div className="anandrathi-broker-label">

                <span />

                ANAND RATHI

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your Anand Rathi Interactive
                API credentials to securely connect
                your account with Tradebox.
              </p>

            </div>

          </div>


          {/* ==================================================
              SECURITY BOX
          ================================================== */}

          <div className="anandrathi-security-box">

            <div className="anandrathi-security-icon">
              ✓
            </div>


            <div>

              <strong>
                Secure authentication
              </strong>


              <p>
                Your App Key and Secret Key are sent
                to the Tradebox backend only for
                authentication. Your final Interactive
                Token is never returned to the browser.
              </p>

            </div>

          </div>


          {/* ==================================================
              FORM
          ================================================== */}

          <form
            className="anandrathi-auth-form"
            onSubmit={handleAuthenticate}
          >


            {/* ==================================================
                APP KEY
            ================================================== */}

            <div className="anandrathi-field-group">

              <div className="anandrathi-label-row">

                <label>
                  App Key
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="anandrathi-premium-input">

                <div className="anandrathi-input-icon">
                  #
                </div>


                <input
                  type="text"
                  placeholder="Enter your Anand Rathi App Key"
                  value={appKey}
                  onChange={(event) =>
                    setAppKey(event.target.value)
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>


            {/* ==================================================
                SECRET KEY
            ================================================== */}

            <div className="anandrathi-field-group">

              <div className="anandrathi-label-row">

                <label>
                  Secret Key
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="anandrathi-premium-input">

                <div className="anandrathi-input-icon">
                  •••
                </div>


                <input
                  type={
                    showSecret
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your Anand Rathi Secret Key"
                  value={secretKey}
                  onChange={(event) =>
                    setSecretKey(event.target.value)
                  }
                  autoComplete="off"
                />


                <button
                  type="button"
                  className="anandrathi-show-button"
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
              className="anandrathi-learn-more-button"
              onClick={() =>
                setShowLearnMore(true)
              }
            >

              <span className="anandrathi-learn-icon">
                ?
              </span>


              <span>
                How do I get my App Key & Secret?
              </span>


              <span className="anandrathi-learn-arrow">
                →
              </span>

            </button>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

              <div className="anandrathi-auth-error">

                <span>
                  !
                </span>

                <span>
                  {error}
                </span>

              </div>

            )}


            {/* ==================================================
                SUCCESS
            ================================================== */}

            {success && (

              <div className="anandrathi-auth-success">

                <span>
                  ✓
                </span>

                <span>
                  {success}
                </span>

              </div>

            )}


            {/* ==================================================
                AUTH BUTTON
            ================================================== */}

            <button
              type="submit"
              className="anandrathi-authenticate-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Authenticating..."
                  : "Authenticate with Anand Rathi"}
              </span>


              {!loading && (

                <span className="anandrathi-button-arrow">
                  →
                </span>

              )}

            </button>

          </form>


          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="anandrathi-card-footer">

            <span>
              🔒
            </span>


            <span>
              Authentication continues through
              Anand Rathi's Interactive Order API.
            </span>

          </div>

        </div>


        <div className="anandrathi-bottom-note">

          Tradebox Broker Integration

          <span>
            •
          </span>

          Anand Rathi

        </div>

      </main>


      {/* ======================================================
          LEARN MORE
      ====================================================== */}

      {showLearnMore && (

        <AnandRathiLearnMoreModal
          onClose={() =>
            setShowLearnMore(false)
          }
        />

      )}

    </div>
  );
}


export default AnandRathiAuth;