import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import jmFinancialImage from
  "../../assets/brokers/jmfinancial.png";

import JMFinancialLearnMoreModal from
  "./JMFinancialLearnMoreModal";

import "./JMFinancialAuth.css";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


function JMFinancialAuth() {

  const navigate =
    useNavigate();


  // ==========================================================
  // FORM STATE
  // ==========================================================

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


  // ==========================================================
  // UI STATE
  // ==========================================================

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
    success,
    setSuccess,
  ] =
    useState("");


  const [
    showLearnMore,
    setShowLearnMore,
  ] =
    useState(false);


  // ==========================================================
  // AUTHENTICATE JM FINANCIAL
  // ==========================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      const cleanApiKey =
        apiKey.trim();

      const cleanApiSecret =
        apiSecret.trim();


      // ========================================================
      // VALIDATION
      // ========================================================

      if (!cleanApiKey) {

        setError(
          "Please enter your JM Financial API Key."
        );

        return;
      }


      if (!cleanApiSecret) {

        setError(
          "Please enter your JM Financial API Secret."
        );

        return;
      }


      try {

        setLoading(true);


        // ======================================================
        // SEND CREDENTIALS TO TRADEBOX BACKEND
        // ======================================================

        const response =
          await fetch(
            `${API_BASE_URL}/api/jmfinancial/auth/start`,
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


        // ======================================================
        // HANDLE NON-JSON RESPONSE SAFELY
        // ======================================================

        const contentType =
          response.headers.get(
            "content-type"
          );


        let result;


        if (
          contentType &&
          contentType.includes(
            "application/json"
          )
        ) {

          result =
            await response.json();

        } else {

          const text =
            await response.text();


          throw new Error(
            text ||
            "Invalid response received from Tradebox backend."
          );

        }


        // ======================================================
        // BACKEND FAILURE
        // ======================================================

        if (
          !response.ok ||
          !result.success
        ) {

          throw new Error(
            result.message ||
            "JM Financial authentication failed."
          );

        }


        // ======================================================
        // SUCCESS
        //
        // IMPORTANT:
        // Backend should already have received the real
        // JM token before returning success.
        //
        // Token is NOT returned to React.
        // ======================================================

        setSuccess(
          result.message ||
          "JM Financial connected successfully."
        );


        // ======================================================
        // CLEAR SECRET FROM BROWSER MEMORY
        // ======================================================

        setApiSecret("");


        // ======================================================
        // DEVELOPMENT
        //
        // Give user enough time to see success message.
        // Then redirect back to broker selection.
        // ======================================================

        setTimeout(
          () => {

            navigate(
              "/?broker=jmfinancial&status=success"
            );

          },
          1500
        );


      } catch (error) {

        console.error(
          "JM Financial authentication error:",
          error
        );


        setError(
          error.message ||
          "Unable to connect JM Financial."
        );


      } finally {

        setLoading(false);

      }

    };


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="jm-auth-page">

      <div className="jm-auth-container">


        {/* ==================================================
            BACK
        ================================================== */}

        <button
          type="button"
          className="jm-back-button"
          onClick={() =>
            navigate("/")
          }
        >

          ← Back

        </button>


        {/* ==================================================
            AUTH CARD
        ================================================== */}

        <div className="jm-auth-card">


          {/* ==================================================
              LOGO
          ================================================== */}

          <div className="jm-logo-wrapper">

            <img
              src={jmFinancialImage}
              alt="JM Financial"
              className="jm-logo"
            />

          </div>


          {/* ==================================================
              BROKER LABEL
          ================================================== */}

          <div className="jm-broker-label">

            JM FINANCIAL

          </div>


          {/* ==================================================
              HEADING
          ================================================== */}

          <h1>

            Connect your account

          </h1>


          <p className="jm-subtitle">

            Enter your JM Financial
            Trading API credentials to
            securely connect your account
            with Tradebox.

          </p>


          {/* ==================================================
              SECURITY
          ================================================== */}

          <div className="jm-security-box">

            <span>
              ✓
            </span>


            <div>

              <strong>

                Secure authentication

              </strong>


              <p>

                Your API Key and API Secret
                are sent securely to the
                Tradebox backend only for
                broker authentication.

              </p>

            </div>

          </div>


          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={
              handleSubmit
            }
          >


            {/* ==================================================
                API KEY
            ================================================== */}

            <div className="jm-form-group">

              <label htmlFor="jm-api-key">

                API Key

              </label>


              <input
                id="jm-api-key"
                type="text"
                value={apiKey}
                onChange={
                  (event) =>
                    setApiKey(
                      event.target.value
                    )
                }
                placeholder=
                  "Enter JM Financial API Key"
                autoComplete="off"
                spellCheck="false"
              />

            </div>


            {/* ==================================================
                API SECRET
            ================================================== */}

            <div className="jm-form-group">

              <label htmlFor="jm-api-secret">

                API Secret

              </label>


              <div className="jm-secret-field">

                <input
                  id="jm-api-secret"
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
                    "Enter JM Financial API Secret"
                  autoComplete="off"
                  spellCheck="false"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowSecret(
                      (previous) =>
                        !previous
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
              className="jm-learn-more"
              onClick={() =>
                setShowLearnMore(
                  true
                )
              }
            >

              <span>
                ?
              </span>


              <span>

                How do I get my
                JM Financial API credentials?

              </span>


              <strong>
                →
              </strong>

            </button>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

              <div className="jm-error">

                <strong>
                  Authentication failed
                </strong>

                <div>
                  {error}
                </div>

              </div>

            )}


            {/* ==================================================
                SUCCESS
            ================================================== */}

            {success && (

              <div className="jm-success">

                <span>
                  ✓
                </span>


                <div>

                  <strong>

                    JM Financial Connected

                  </strong>


                  <p>

                    {success}

                  </p>


                  <small>

                    Authentication token was
                    received by the Tradebox
                    backend.

                  </small>

                </div>

              </div>

            )}


            {/* ==================================================
                AUTH BUTTON
            ================================================== */}

            <button
              type="submit"
              className="jm-connect-button"
              disabled={
                loading ||
                Boolean(success)
              }
            >

              {loading
                ? "Authenticating..."
                : success
                  ? "Connected"
                  : "Authenticate with JM Financial"}


              {!loading &&
                !success && (

                <span>
                  →
                </span>

              )}

            </button>

          </form>


          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="jm-footer">

            🔒 API secrets and access tokens
            remain securely on the
            Tradebox backend.

          </div>

        </div>

      </div>


      {/* ======================================================
          LEARN MORE
      ====================================================== */}

      {showLearnMore && (

        <JMFinancialLearnMoreModal
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


export default JMFinancialAuth;