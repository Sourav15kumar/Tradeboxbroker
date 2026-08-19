import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./GrowwAuth.css";
import GrowwLearnMoreModal from "./GrowwLearnMoreModal";

function GrowwAuth() {
  const navigate = useNavigate();

  const [totpToken, setTotpToken] = useState("");
  const [totpCode, setTotpCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showTotpCode, setShowTotpCode] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleAuthenticate = async (e) => {
    e.preventDefault();

    setError("");

    const cleanTotpToken = totpToken.trim();
    const cleanTotpCode = totpCode.trim();

    // ----------------------------------------
    // TOTP TOKEN VALIDATION
    // ----------------------------------------

    if (!cleanTotpToken) {
      setError("Please enter your Groww TOTP Token.");
      return;
    }

    // ----------------------------------------
    // TOTP CODE VALIDATION
    // ----------------------------------------

    if (!cleanTotpCode) {
      setError("Please enter your Groww TOTP Code.");
      return;
    }

    if (!/^\d{6}$/.test(cleanTotpCode)) {
      setError("Groww TOTP Code must be exactly 6 digits.");
      return;
    }

    try {
      setLoading(true);

      // ----------------------------------------
      // SEND CREDENTIALS TO BACKEND
      // ----------------------------------------

      const response = await axios.post(
        "http://localhost:5000/api/groww/authenticate",
        {
          // Backend expects apiKey.
          // UI calls it TOTP Token.
          apiKey: cleanTotpToken,

          // Backend expects totp.
          totp: cleanTotpCode,
        }
      );

      // ----------------------------------------
      // HANDLE BACKEND RESPONSE
      // ----------------------------------------

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Groww authentication failed."
        );
      }

      // ----------------------------------------
      // SUCCESS
      // ----------------------------------------

      console.log(
        "Groww authentication successful."
      );

      /*
       * Access token is intentionally NOT returned
       * to the frontend.
       *
       * It is available only on the backend
       * console for testing.
       */

      setError("");

      alert(
        "Groww authentication successful!"
      );

    } catch (err) {
      console.error(
        "Groww authentication error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Groww authentication failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="groww-auth-page">

      {/* ======================================
          BACKGROUND
      ====================================== */}

      <div className="auth-grid" />

      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      {/* ======================================
          HEADER
      ====================================== */}

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

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="auth-main">

        <div className="auth-card">

          {/* ==================================
              CARD HEADER
          ================================== */}

          <div className="auth-card-header">

            <div className="groww-big-logo">
              G
            </div>

            <div className="auth-heading">

              <div className="broker-label">

                <span />

                GROWW

              </div>

              <h1>
                Connect your account
              </h1>

              <p>
                Enter your Groww TOTP credentials
                to securely connect your Groww
                account.
              </p>

            </div>

          </div>

          {/* ==================================
              SECURITY BOX
          ================================== */}

          <div className="security-box">

            <div className="security-box-icon">
              ✓
            </div>

            <div>

              <strong>
                Secure authentication
              </strong>

              <p>
                Your TOTP Token and TOTP Code are
                sent securely to the Tradebox
                backend. Your access token is never
                sent back to the browser.
              </p>

            </div>

          </div>

          {/* ==================================
              FORM
          ================================== */}

          <form
            onSubmit={handleAuthenticate}
            className="auth-form"
          >

            {/* ==================================
                TOTP TOKEN
            ================================== */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  TOTP Token
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
                  type="text"
                  placeholder="Enter your Groww TOTP Token"
                  value={totpToken}
                  onChange={(e) =>
                    setTotpToken(e.target.value)
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>

            {/* ==================================
                TOTP CODE
            ================================== */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  TOTP Code
                </label>

                <span>
                  6 digits
                </span>

              </div>

              <div className="premium-input">

                <div className="input-icon">
                  •••
                </div>

                <input
                  type={
                    showTotpCode
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your 6-digit TOTP Code"
                  value={totpCode}
                  onChange={(e) => {

                    const value =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    if (value.length <= 6) {
                      setTotpCode(value);
                    }

                  }}
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="one-time-code"
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowTotpCode(
                      !showTotpCode
                    )
                  }
                >
                  {showTotpCode
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            {/* ==================================
                LEARN MORE
            ================================== */}

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
                How do I get my TOTP Token & Code?
              </span>

              <span className="learn-arrow">
                →
              </span>

            </button>

            {/* ==================================
                ERROR
            ================================== */}

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

            {/* ==================================
                AUTHENTICATE BUTTON
            ================================== */}

            <button
              type="submit"
              className="authenticate-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Authenticating..."
                  : "Authenticate with Groww"}
              </span>

              {!loading && (

                <span className="button-arrow">
                  →
                </span>

              )}

            </button>

          </form>

          {/* ==================================
              FOOTER
          ================================== */}

          <div className="auth-card-footer">

            <span className="footer-lock">
              🔒
            </span>

            <span>
              Authentication is handled through
              Groww's official API authentication
              flow.
            </span>

          </div>

        </div>

        {/* ====================================
            BOTTOM NOTE
        ==================================== */}

        <div className="auth-bottom-note">

          Tradebox Broker Integration

          <span>•</span>

          Groww

        </div>

      </main>

      {/* ======================================
          GROW W SPECIFIC LEARN MORE MODAL
      ====================================== */}

      {showLearnMore && (

        <GrowwLearnMoreModal
          onClose={() =>
            setShowLearnMore(false)
          }
        />

      )}

    </div>
  );
}

export default GrowwAuth;