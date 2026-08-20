import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import hdfcImage from
  "../../assets/brokers/hdfc.png";

import HdfcLearnMoreModal from
  "./HdfcLearnMoreModal";

import "./HdfcAuth.css";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


function HdfcAuth() {
  const navigate =
    useNavigate();


  const [
    apiKey,
    setApiKey,
  ] =
    useState("");


  const [
    apiSecret,
    setApiSecret,
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
  // START HDFC AUTHENTICATION
  // ==========================================================

  const handleAuthenticate =
    async (event) => {

      event.preventDefault();

      setError("");


      const cleanApiKey =
        apiKey.trim();

      const cleanApiSecret =
        apiSecret.trim();


      if (!cleanApiKey) {

        setError(
          "Please enter your HDFC SKY API Key."
        );

        return;
      }


      if (!cleanApiSecret) {

        setError(
          "Please enter your HDFC SKY API Secret."
        );

        return;
      }


      try {

        setLoading(true);


        const response =
          await fetch(
            `${API_BASE_URL}/api/hdfc/auth/start`,
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

                  apiSecret:
                    cleanApiSecret,
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
            "Unable to start HDFC SKY authentication."
          );

        }


        // ======================================================
        // CURRENT BACKEND FLOW
        //
        // Backend returns authId.
        // Save it temporarily so next HDFC step can use it.
        // ======================================================

        const authId =
          result.data?.authId;


        if (!authId) {

          throw new Error(
            "HDFC authentication session ID was not received."
          );

        }


        // ======================================================
        // TEMPORARY DEVELOPMENT STORAGE
        //
        // Better production solution:
        // server-side session / secure cookie.
        // ======================================================

        sessionStorage.setItem(
          "hdfcAuthId",
          authId
        );


        // ======================================================
        // MOVE TO NEXT HDFC AUTH STEP
        // ======================================================

        navigate(
          "/hdfc/login"
        );


      } catch (error) {

        console.error(
          "HDFC authentication error:",
          error
        );


        setError(
          error.message ||
          "Unable to connect to HDFC SKY."
        );


        setLoading(false);

      }

    };


  return (

    <div className="hdfc-auth-page">

      {/* BACKGROUND */}

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
              CARD HEADER
          ================================================== */}

          <div className="auth-card-header">

            <div className="hdfc-big-logo">

              <img
                src={hdfcImage}
                alt="HDFC SKY"
              />

            </div>


            <div className="auth-heading">

              <div className="broker-label">

                <span />

                HDFC SKY

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your HDFC SKY API credentials.
                Authentication will continue securely
                through the HDFC SKY authentication flow.
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
                Tradebox only collects your HDFC SKY
                API Key and API Secret here.
                Your final access token stays on
                the Tradebox backend.
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


            {/* API KEY */}

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
                  value={apiKey}
                  onChange={
                    (event) =>
                      setApiKey(
                        event.target.value
                      )
                  }
                  placeholder=
                    "Enter HDFC SKY API Key"
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>


            {/* API SECRET */}

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
                  value={
                    apiSecret
                  }
                  onChange={
                    (event) =>
                      setApiSecret(
                        event.target.value
                      )
                  }
                  placeholder=
                    "Enter HDFC SKY API Secret"
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
                How do I get my HDFC API Key & Secret?
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
                BUTTON
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
                  ? "Connecting..."
                  : "Authenticate with HDFC SKY"}

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
              HDFC SKY access tokens stay securely
              on the Tradebox backend.
            </span>

          </div>

        </div>

      </main>


      {/* ======================================================
          LEARN MORE MODAL
      ====================================================== */}

      {showLearnMore && (

        <HdfcLearnMoreModal
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


export default HdfcAuth;