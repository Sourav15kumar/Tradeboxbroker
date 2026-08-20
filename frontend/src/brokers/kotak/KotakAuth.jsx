import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import kotakImage from
  "../../assets/brokers/kotak.png";

import KotakLearnMoreModal from
  "./KotakLearnMoreModal";

import "./KotakAuth.css";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


function KotakAuth() {
  const navigate =
    useNavigate();


  const [
    consumerKey,
    setConsumerKey,
  ] =
    useState("");


  const [
    mobileNumber,
    setMobileNumber,
  ] =
    useState("");


  const [
    ucc,
    setUcc,
  ] =
    useState("");


  const [
    totp,
    setTotp,
  ] =
    useState("");


  const [
    mpin,
    setMpin,
  ] =
    useState("");


  const [
    showMpin,
    setShowMpin,
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
  // AUTHENTICATE
  // ==========================================================

  const handleAuthenticate =
    async (event) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      const cleanConsumerKey =
        consumerKey.trim();

      const cleanMobile =
        mobileNumber.trim();

      const cleanUcc =
        ucc.trim();

      const cleanTotp =
        totp.trim();

      const cleanMpin =
        mpin.trim();


      if (!cleanConsumerKey) {
        setError(
          "Please enter your Kotak API Access Token."
        );

        return;
      }


      if (!cleanMobile) {
        setError(
          "Please enter your registered mobile number."
        );

        return;
      }


      if (!cleanUcc) {
        setError(
          "Please enter your Kotak Client Code (UCC)."
        );

        return;
      }


      if (
        !/^\d{6}$/.test(
          cleanTotp
        )
      ) {
        setError(
          "Please enter a valid 6-digit TOTP."
        );

        return;
      }


      if (
        !/^\d{6}$/.test(
          cleanMpin
        )
      ) {
        setError(
          "Please enter your 6-digit Kotak MPIN."
        );

        return;
      }


      try {

        setLoading(true);


        const response =
          await fetch(
            `${API_BASE_URL}/api/kotak/authenticate`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  consumerKey:
                    cleanConsumerKey,

                  mobileNumber:
                    cleanMobile,

                  ucc:
                    cleanUcc,

                  totp:
                    cleanTotp,

                  mpin:
                    cleanMpin,
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
              "Kotak authentication failed."
          );
        }


        setSuccess(
          "Kotak Neo connected successfully."
        );


        setError("");


        console.log(
          "Kotak authentication successful."
        );

      } catch (error) {

        console.error(
          "Kotak authentication error:",
          error
        );


        setError(
          error.message ||
            "Unable to authenticate with Kotak Neo."
        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="kotak-auth-page">

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


      {/* HEADER */}

      <header className="auth-header">

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/")
          }
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


      {/* MAIN */}

      <main className="auth-main">

        <div className="auth-card">

          {/* HEADER */}

          <div className="auth-card-header">

            <div className="kotak-big-logo">

              <img
                src={kotakImage}
                alt="Kotak Neo"
              />

            </div>


            <div className="auth-heading">

              <div className="broker-label">

                <span />

                KOTAK NEO

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your Kotak Neo Trade API
                credentials to securely connect
                your account with Tradebox.
              </p>

            </div>

          </div>


          {/* SECURITY */}

          <div className="security-box">

            <div className="security-box-icon">
              ✓
            </div>


            <div>

              <strong>
                Secure authentication
              </strong>


              <p>
                Your API token, TOTP and MPIN are
                sent to the Tradebox backend only
                for Kotak authentication. Your final
                trade token is never returned to
                the browser.
              </p>

            </div>

          </div>


          {/* FORM */}

          <form
            className="auth-form"
            onSubmit={
              handleAuthenticate
            }
          >

            {/* API TOKEN */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  API Access Token
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
                    "Enter Kotak API Access Token"
                  value={
                    consumerKey
                  }
                  onChange={
                    (event) =>
                      setConsumerKey(
                        event.target.value
                      )
                  }
                  autoComplete="off"
                  spellCheck="false"
                />

              </div>

            </div>


            {/* MOBILE */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  Registered Mobile Number
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="premium-input">

                <div className="input-icon">
                  +91
                </div>


                <input
                  type="text"
                  placeholder=
                    "Enter registered mobile number"
                  value={
                    mobileNumber
                  }
                  onChange={
                    (event) =>
                      setMobileNumber(
                        event.target.value
                      )
                  }
                  autoComplete="off"
                />

              </div>

            </div>


            {/* UCC */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  Client Code (UCC)
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="premium-input">

                <div className="input-icon">
                  ID
                </div>


                <input
                  type="text"
                  placeholder=
                    "Enter Kotak Client Code"
                  value={
                    ucc
                  }
                  onChange={
                    (event) =>
                      setUcc(
                        event.target.value
                      )
                  }
                  autoComplete="off"
                />

              </div>

            </div>


            {/* TOTP */}

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
                  2FA
                </div>


                <input
                  type="text"
                  placeholder=
                    "Enter current 6-digit TOTP"
                  value={
                    totp
                  }
                  onChange={
                    (event) => {

                      const value =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );


                      if (
                        value.length <= 6
                      ) {
                        setTotp(
                          value
                        );
                      }

                    }
                  }
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="one-time-code"
                />

              </div>

            </div>


            {/* MPIN */}

            <div className="field-group">

              <div className="label-row">

                <label>
                  MPIN
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
                    showMpin
                      ? "text"
                      : "password"
                  }
                  placeholder=
                    "Enter your 6-digit Kotak MPIN"
                  value={
                    mpin
                  }
                  onChange={
                    (event) => {

                      const value =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );


                      if (
                        value.length <= 6
                      ) {
                        setMpin(
                          value
                        );
                      }

                    }
                  }
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="off"
                />


                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowMpin(
                      !showMpin
                    )
                  }
                >

                  {showMpin
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
                How do I get these Kotak details?
              </span>


              <span className="learn-arrow">
                →
              </span>

            </button>


            {/* ERROR */}

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


            {/* SUCCESS */}

            {success && (

              <div className="auth-success">

                <span>
                  ✓
                </span>

                <span>
                  {success}
                </span>

              </div>

            )}


            {/* AUTH BUTTON */}

            <button
              type="submit"
              className="authenticate-button"
              disabled={
                loading
              }
            >

              <span>

                {loading
                  ? "Authenticating..."
                  : "Authenticate with Kotak Neo"}

              </span>


              {!loading && (

                <span className="button-arrow">
                  →
                </span>

              )}

            </button>

          </form>


          {/* FOOTER */}

          <div className="auth-card-footer">

            <span className="footer-lock">
              🔒
            </span>


            <span>
              Kotak authentication uses TOTP login
              followed by MPIN validation.
            </span>

          </div>

        </div>


        <div className="auth-bottom-note">

          Tradebox Broker Integration

          <span>
            •
          </span>

          Kotak Neo

        </div>

      </main>


      {/* LEARN MORE */}

      {showLearnMore && (

        <KotakLearnMoreModal
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


export default KotakAuth;