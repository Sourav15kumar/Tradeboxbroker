import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import iciciImage from
  "../../assets/brokers/icici.png";

import IciciLearnMoreModal from
  "./IciciLearnMoreModal";

import "./IciciAuth.css";


const API_BASE_URL =
  import.meta.env
    .VITE_API_BASE_URL ||
  "http://localhost:5000";


function IciciAuth() {

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
  // START ICICI AUTH
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
          "Please enter your ICICI Breeze API Key."
        );

        return;
      }


      if (!cleanApiSecret) {

        setError(
          "Please enter your ICICI Breeze Secret Key."
        );

        return;
      }


      try {

        setLoading(true);


        // ======================================================
        // START BACKEND AUTH
        // ======================================================

        const response =
          await fetch(
            `${API_BASE_URL}/api/icici/start`,
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
            "Unable to start ICICI authentication."
          );

        }


        const loginUrl =
          result.data?.loginUrl;


        if (!loginUrl) {

          throw new Error(
            "ICICI login URL was not received."
          );

        }


        // ======================================================
        // OFFICIAL ICICI LOGIN
        // ======================================================

        window.location.href =
          loginUrl;


      } catch (error) {

        console.error(
          "ICICI authentication error:",
          error
        );


        setError(
          error.message ||
          "Unable to connect to ICICI Direct."
        );


        setLoading(false);

      }

    };


  return (

    <div className="icici-auth-page">

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


      <main className="auth-main">

        <div className="auth-card">


          <div className="auth-card-header">

            <div className="icici-big-logo">

              <img
                src={iciciImage}
                alt="ICICI Direct"
              />

            </div>


            <div className="auth-heading">

              <div className="broker-label">

                <span />

                ICICI DIRECT

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your Breeze API credentials.
                Authentication will continue securely
                on the official ICICI Direct login.
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
                Tradebox only collects your Breeze
                API Key and Secret Key here.
                ICICI login and OTP/TOTP happen
                on ICICI Direct.
              </p>

            </div>

          </div>


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
                    "Enter ICICI Breeze API Key"
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>


            {/* SECRET KEY */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  Secret Key
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
                    "Enter ICICI Breeze Secret Key"
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


            {/* LEARN MORE */}

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
                How do I get my Breeze API Key & Secret?
              </span>


              <span className="learn-arrow">
                →
              </span>

            </button>


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
                  : "Authenticate with ICICI Direct"}

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
              ICICI Direct generates the daily
              API session during login.
            </span>

          </div>

        </div>

      </main>


      {showLearnMore && (

        <IciciLearnMoreModal
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


export default IciciAuth;