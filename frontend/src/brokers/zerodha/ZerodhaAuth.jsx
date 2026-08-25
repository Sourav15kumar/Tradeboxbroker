
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import zerodhaImage from "../../assets/brokers/zerodha.png"
import "./ZerodhaAuth.css";

import ZerodhaLearnMoreModal from "./ZerodhaLearnMoreModal";

function ZerodhaAuth() {

  const navigate = useNavigate();

  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showSecret, setShowSecret] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

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

      console.error(err);

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

      <div className="auth-grid" />

      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

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

      <main className="auth-main">

        <div className="auth-card">

          <div className="auth-card-header">

            <div className="zerodha-big-logo">
              <img src={zerodhaImage} alt="Zerodha" />
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
                your Zerodha account.
              </p>

            </div>

          </div>

          <div className="security-box">

            <div className="security-box-icon">
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

          <form
            onSubmit={handleAuthenticate}
            className="auth-form"
          >

            <div className="field-group">

              <div className="label-row">

                <label>
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
                  type="text"
                  placeholder="Enter your Zerodha API Key"
                  value={apiKey}
                  onChange={(e) =>
                    setApiKey(e.target.value)
                  }
                  autoComplete="off"
                />

              </div>

            </div>

            <div className="field-group">

              <div className="label-row">

                <label>
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
                  type={
                    showSecret
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your Zerodha API Secret"
                  value={apiSecret}
                  onChange={(e) =>
                    setApiSecret(e.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowSecret(!showSecret)
                  }
                >
                  {showSecret ? "Hide" : "Show"}
                </button>

              </div>

            </div>

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

            {error && (
              <div className="auth-error">
                <span>!</span>
                {error}
              </div>
            )}

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

          <div className="auth-card-footer">

            <span className="footer-lock">
              🔒
            </span>

            <span>
              Authentication is handled through
              Zerodha's official Kite Connect flow.
            </span>

          </div>

        </div>

        <div className="auth-bottom-note">
          Tradebox Broker Integration
          <span>•</span>
          Zerodha
        </div>

      </main>

      {showLearnMore && (
        <ZerodhaLearnMoreModal
          onClose={() =>
            setShowLearnMore(false)
          }
        />
      )}

    </div>
  );
}

export default ZerodhaAuth;