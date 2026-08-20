import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import angelOneImage from
  "../../assets/brokers/angelone.png";

import AngelOneLearnMoreModal from
  "./AngelOneLearnMoreModal";

import "./AngelOneAuth.css";


const API_BASE_URL =
  import.meta.env
    .VITE_API_BASE_URL ||
  "http://localhost:5000";


function AngelOneAuth() {

  const navigate =
    useNavigate();


  const [
    apiKey,
    setApiKey,
  ] =
    useState("");


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


      const cleanApiKey =
        apiKey.trim();


      // ========================================================
      // VALIDATE API KEY
      // ========================================================

      if (!cleanApiKey) {

        setError(
          "Please enter your Angel One Publisher API Key."
        );

        return;
      }


      try {

        setLoading(true);


        // ======================================================
        // CALL TRADEBOX BACKEND
        // ======================================================

        const response =
          await fetch(
            `${API_BASE_URL}/api/angelone/auth/start`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  apiKey:
                    cleanApiKey,
                }),
            }
          );


        const result =
          await response.json();


        // ======================================================
        // ERROR
        // ======================================================

        if (
          !response.ok ||
          !result.success
        ) {

          throw new Error(
            result.message ||
            "Unable to start Angel One authentication."
          );
        }


        const authorizationUrl =
          result.data
            ?.authorizationUrl;


        if (
          !authorizationUrl
        ) {

          throw new Error(
            "Angel One login URL was not received."
          );
        }


        // ======================================================
        // REDIRECT TO OFFICIAL ANGEL ONE LOGIN
        // ======================================================

        window.location.href =
          authorizationUrl;

      } catch (error) {

        console.error(
          "Angel One authentication error:",
          error
        );


        setError(
          error.message ||
          "Unable to connect to Angel One."
        );


        setLoading(false);
      }

    };


  return (

    <div className="angel-auth-page">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

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


      {/* ======================================================
          HEADER
      ====================================================== */}

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


      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="auth-main">

        <div className="auth-card">


          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="auth-card-header">

            <div className="angel-big-logo">

              <img
                src={
                  angelOneImage
                }
                alt="Angel One"
              />

            </div>


            <div className="auth-heading">

              <div className="broker-label">

                <span />

                ANGEL ONE

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your Angel One
                Publisher API Key and
                continue securely through
                Angel One's official login.
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
                Your Angel One PIN,
                TOTP and OTP are never
                entered on Tradebox.
                Authentication happens
                directly on Angel One.
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

            {/* ================================================
                API KEY
            ================================================ */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  Publisher API Key
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
                  placeholder=
                    "Enter Angel One Publisher API Key"
                  value={
                    apiKey
                  }
                  onChange={
                    (event) =>
                      setApiKey(
                        event
                          .target
                          .value
                      )
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>


            {/* ================================================
                LEARN MORE
            ================================================ */}

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
                How do I get my Publisher API Key?
              </span>


              <span className="learn-arrow">
                →
              </span>

            </button>


            {/* ================================================
                ERROR
            ================================================ */}

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


            {/* ================================================
                AUTHENTICATE
            ================================================ */}

            <button
              type="submit"
              className="authenticate-button"
              disabled={
                loading
              }
            >

              <span>

                {loading
                  ? "Connecting..."
                  : "Authenticate with Angel One"}

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
              Login continues securely
              on the official Angel One
              SmartAPI authentication page.
            </span>

          </div>

        </div>


        <div className="auth-bottom-note">

          Tradebox Broker Integration

          <span>
            •
          </span>

          Angel One

        </div>

      </main>


      {/* ======================================================
          LEARN MORE MODAL
      ====================================================== */}

      {showLearnMore && (

        <AngelOneLearnMoreModal
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


export default AngelOneAuth;