import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import fyersImage from
  "../../assets/brokers/fyers.png";

import FyersLearnMoreModal from
  "./FyersLearnMoreModal";

import "./FyersAuth.css";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


function FyersAuth() {

  const navigate =
    useNavigate();


  const [
    appId,
    setAppId,
  ] =
    useState("");


  const [
    secretId,
    setSecretId,
  ] =
    useState("");


  const [
    showSecret,
    setShowSecret,
  ] =
    useState(false);


  const [
    loading,
    setLoading,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    showLearnMore,
    setShowLearnMore,
  ] =
    useState(false);


  // ==========================================================
  // AUTHENTICATE
  // ==========================================================

  const handleAuthenticate =
    async (event) => {

      event.preventDefault();

      setError("");


      const cleanAppId =
        appId.trim();

      const cleanSecretId =
        secretId.trim();


      if (!cleanAppId) {

        setError(
          "Please enter your FYERS App ID."
        );

        return;
      }


      if (!cleanSecretId) {

        setError(
          "Please enter your FYERS Secret ID."
        );

        return;
      }


      try {

        setLoading(true);


        const response =
          await fetch(
            `${API_BASE_URL}/api/fyers/auth/start`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  appId:
                    cleanAppId,

                  secretId:
                    cleanSecretId,
                }),
            }
          );


        const result =
          await response.json();


        if (
          !response.ok ||
          !result.success
        ) {

          throw new Error(
            result.message ||
              "Unable to start FYERS authentication."
          );
        }


        if (!result.loginUrl) {

          throw new Error(
            "FYERS login URL was not returned."
          );
        }


        window.location.href =
          result.loginUrl;


      } catch (error) {

        console.error(
          "FYERS authentication error:",
          error
        );


        setError(
          error.message ||
            "Unable to authenticate with FYERS."
        );


        setLoading(false);
      }

    };


  return (

    <div className="fyers-auth-page">

      <div className="auth-grid" />


      <div
        className="
          auth-glow
          auth-glow-one
        "
      />


      <div
        className="
          auth-glow
          auth-glow-two
        "
      />


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="auth-header">

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/")
          }
        >

          <span>
            ←
          </span>

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


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="auth-main">

        <div className="auth-card">


          {/* ==================================================
              CARD HEADER
          ================================================== */}

          <div className="auth-card-header">

            <div className="fyers-big-logo">

              <img
                src={fyersImage}
                alt="FYERS"
              />

            </div>


            <div className="auth-heading">

              <div className="broker-label">

                <span />

                FYERS

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your FYERS App ID
                and Secret ID to securely
                connect your account with
                Tradebox.
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
                Your App ID and Secret ID are
                sent securely to the Tradebox
                backend. The final FYERS Access
                Token is generated on the backend
                and is not returned to the browser.
              </p>

            </div>

          </div>


          {/* ==================================================
              FORM
          ================================================== */}

          <form
            className="auth-form"
            onSubmit={
              handleAuthenticate
            }
          >


            {/* ==================================================
                APP ID
            ================================================== */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  App ID
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
                  placeholder="Enter your FYERS App ID"
                  value={
                    appId
                  }
                  onChange={
                    (event) =>
                      setAppId(
                        event.target.value
                      )
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>


            {/* ==================================================
                SECRET ID
            ================================================== */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  Secret ID
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
                  placeholder="Enter your FYERS Secret ID"
                  value={
                    secretId
                  }
                  onChange={
                    (event) =>
                      setSecretId(
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


            {/* ==================================================
                LEARN MORE
            ================================================== */}

            <button
              type="button"
              className="learn-more-button"
              onClick={() =>
                setShowLearnMore(
                  true
                )
              }
            >

              <span className="learn-icon">
                ?
              </span>


              <span>
                How do I get my FYERS App ID & Secret ID?
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
              disabled={
                loading
              }
            >

              <span>

                {loading
                  ? "Redirecting to FYERS..."
                  : "Authenticate with FYERS"}

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
              Authentication is handled through
              FYERS official API authentication
              flow.
            </span>

          </div>

        </div>


        <div className="auth-bottom-note">

          Tradebox Broker Integration

          <span>
            •
          </span>

          FYERS

        </div>

      </main>


      {/* ==================================================
          LEARN MORE MODAL
      ================================================== */}

      {showLearnMore && (

        <FyersLearnMoreModal
          onClose={() =>
            setShowLearnMore(
              false
            )
          }
        />

      )}

    </div>

  );
}


export default FyersAuth;