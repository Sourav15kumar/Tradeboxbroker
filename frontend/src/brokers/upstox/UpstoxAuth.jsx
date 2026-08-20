import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import upstoxImage from "../../assets/brokers/upstox.png";

import UpstoxLearnMoreModal from "./UpstoxLearnMoreModal";

import "./UpstoxAuth.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

function UpstoxAuth() {
  const navigate = useNavigate();

  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showApiSecret, setShowApiSecret] =
    useState(false);

  const [showLearnMore, setShowLearnMore] =
    useState(false);

  // ==========================================================
  // START UPSTOX AUTHENTICATION
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const cleanApiKey = apiKey.trim();
    const cleanApiSecret = apiSecret.trim();

    // ========================================================
    // API KEY VALIDATION
    // ========================================================

    if (!cleanApiKey) {
      setError(
        "Please enter your Upstox API Key."
      );
      return;
    }

    // ========================================================
    // API SECRET VALIDATION
    // ========================================================

    if (!cleanApiSecret) {
      setError(
        "Please enter your Upstox API Secret."
      );
      return;
    }

    try {
      setLoading(true);

      // ======================================================
      // SEND CREDENTIALS TO BACKEND
      // ======================================================

      const response = await fetch(
        `${API_BASE_URL}/api/upstox/auth/start`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            apiKey: cleanApiKey,
            apiSecret: cleanApiSecret,
          }),
        }
      );

      const result = await response.json();

      // ======================================================
      // BACKEND ERROR
      // ======================================================

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to start Upstox authentication."
        );
      }

      const authorizationUrl =
        result.data?.authorizationUrl;

      // ======================================================
      // AUTH URL VALIDATION
      // ======================================================

      if (!authorizationUrl) {
        throw new Error(
          "Upstox authorization URL was not received."
        );
      }

      // ======================================================
      // REDIRECT TO OFFICIAL UPSTOX LOGIN
      // ======================================================

      window.location.href =
        authorizationUrl;
    } catch (error) {
      console.error(
        "Upstox authentication error:",
        error
      );

      setError(
        error.message ||
          "Unable to connect to Tradebox backend."
      );

      setLoading(false);
    }
  };

  return (
    <div className="upstox-auth-page">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="auth-grid" />

      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="auth-header">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/")}
        >
          <span>←</span>

          Back to brokers
        </button>

        <div className="auth-brand">

          <div className="auth-brand-mark">
            T
          </div>

          <span>
            Tradebox
          </span>

        </div>

        <div className="auth-header-secure">

          <span />

          Secure connection

        </div>

      </header>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="auth-main">

        <div className="auth-card">

          {/* ==================================================
              CARD HEADER
          ================================================== */}

          <div className="auth-card-header">

            <div className="upstox-big-logo">

              <img
                src={upstoxImage}
                alt="Upstox"
              />

            </div>

            <div className="auth-heading">

              <div className="broker-label">

                <span />

                UPSTOX

              </div>

              <h1>
                Connect your account
              </h1>

              <p>
                Enter your Upstox API credentials
                to securely connect your Upstox
                account with Tradebox.
              </p>

            </div>

          </div>

          {/* ==================================================
              SECURITY BOX
          ================================================== */}

          <div className="security-box">

            <div className="security-box-icon">
              ✓
            </div>

            <div>

              <strong>
                Secure authentication
              </strong>

              <p>
                Your API Key and API Secret are sent
                to the Tradebox backend only for the
                authentication flow. Your access token
                is never returned to the browser.
              </p>

            </div>

          </div>

          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* API KEY */}

            <div className="field-group">

              <div className="label-row">

                <label htmlFor="upstox-api-key">
                  API Key
                </label>

                <span>
                  Required
                </span>

              </div>

              <div className="premium-input">

                <div className="input-icon">
                  #
                </div>

                <input
                  id="upstox-api-key"
                  type="text"
                  placeholder="Enter your Upstox API Key"
                  value={apiKey}
                  onChange={(event) =>
                    setApiKey(
                      event.target.value
                    )
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>

            {/* API SECRET */}

            <div className="field-group">

              <div className="label-row">

                <label htmlFor="upstox-api-secret">
                  API Secret
                </label>

                <span>
                  Required
                </span>

              </div>

              <div className="premium-input">

                <div className="input-icon">
                  •••
                </div>

                <input
                  id="upstox-api-secret"
                  type={
                    showApiSecret
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your Upstox API Secret"
                  value={apiSecret}
                  onChange={(event) =>
                    setApiSecret(
                      event.target.value
                    )
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowApiSecret(
                      !showApiSecret
                    )
                  }
                >
                  {showApiSecret
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
              className="learn-more-button"
              onClick={() =>
                setShowLearnMore(true)
              }
            >

              <span className="learn-icon">
                ?
              </span>

              <span>
                How do I get my API Key & Secret?
              </span>

              <span className="learn-arrow">
                →
              </span>

            </button>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

              <div className="auth-error">

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
              className="authenticate-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Connecting..."
                  : "Authenticate with Upstox"}
              </span>

              {!loading && (

                <span className="button-arrow">
                  →
                </span>

              )}

            </button>

          </form>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="auth-card-footer">

            <span className="footer-lock">
              🔒
            </span>

            <span>
              Authentication continues through
              Upstox's official authorization flow.
            </span>

          </div>

        </div>

        <div className="auth-bottom-note">

          Tradebox Broker Integration

          <span>•</span>

          Upstox

        </div>

      </main>

      {/* ======================================================
          UPSTOX LEARN MORE MODAL
      ====================================================== */}

      {showLearnMore && (

        <UpstoxLearnMoreModal
          onClose={() =>
            setShowLearnMore(false)
          }
        />

      )}

    </div>
  );
}

export default UpstoxAuth;