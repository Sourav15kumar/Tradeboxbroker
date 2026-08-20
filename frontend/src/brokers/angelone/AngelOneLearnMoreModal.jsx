import React from "react";

import angelOneImage from
  "../../assets/brokers/angelone.png";

import "./AngelOneLearnMoreModal.css";


function AngelOneLearnMoreModal({
  onClose,
}) {

  const SMART_API_URL =
    "https://smartapi.angelone.in/";

  return (

    <div
      className="learn-modal-overlay"
      onClick={
        onClose
      }
    >

      <div
        className="learn-modal"
        onClick={
          (event) =>
            event.stopPropagation()
        }
      >

        {/* CLOSE */}

        <button
          type="button"
          className="learn-modal-close"
          onClick={
            onClose
          }
        >
          ×
        </button>


        {/* LOGO */}

        <div className="learn-modal-icon angel-modal-logo-box">

          <img
            src={
              angelOneImage
            }
            alt="Angel One"
            className="angel-modal-logo"
          />

        </div>


        {/* TITLE */}

        <div className="learn-modal-label">
          ANGEL ONE AUTHENTICATION
        </div>


        <h2>
          Get your Publisher API Key
        </h2>


        <p className="learn-modal-description">

          Create an Angel One SmartAPI
          Publisher application and use
          its API Key to connect your
          account securely with Tradebox.

        </p>


        {/* STEP 1 */}

        <div className="learn-step">

          <div className="step-number">
            1
          </div>

          <div>

            <strong>
              Open Angel One SmartAPI
            </strong>

            <p>
              Log in to your Angel One
              SmartAPI developer account.
            </p>

            <a
              href={
                SMART_API_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              className="learn-link"
            >
              Open Angel One SmartAPI →
            </a>

          </div>

        </div>


        {/* STEP 2 */}

        <div className="learn-step">

          <div className="step-number">
            2
          </div>

          <div>

            <strong>
              Create a Publisher App
            </strong>

            <p>
              Create an application intended
              for Publisher Login.
              Do not use a Trading app API
              key for this login flow.
            </p>

          </div>

        </div>


        {/* STEP 3 */}

        <div className="learn-step">

          <div className="step-number">
            3
          </div>

          <div>

            <strong>
              Configure Redirect URL
            </strong>

            <p>
              Set your Tradebox backend
              callback URL as the application's
              redirect URL.
            </p>

            <div className="angel-code-box">

              http://localhost:5000/api/angelone/callback

            </div>

          </div>

        </div>


        {/* STEP 4 */}

        <div className="learn-step">

          <div className="step-number">
            4
          </div>

          <div>

            <strong>
              Configure required IP settings
            </strong>

            <p>
              If Angel One requires a registered
              static IP for your SmartAPI app,
              configure your Tradebox backend's
              public static IP.
            </p>

          </div>

        </div>


        {/* STEP 5 */}

        <div className="learn-step">

          <div className="step-number">
            5
          </div>

          <div>

            <strong>
              Copy Publisher API Key
            </strong>

            <p>
              After creating the app,
              copy its Publisher API Key.
            </p>

          </div>

        </div>


        {/* STEP 6 */}

        <div className="learn-step">

          <div className="step-number">
            6
          </div>

          <div>

            <strong>
              Paste the API Key in Tradebox
            </strong>

            <p>
              Enter the Publisher API Key
              in the Angel One connection
              page.
            </p>

          </div>

        </div>


        {/* STEP 7 */}

        <div className="learn-step">

          <div className="step-number">
            7
          </div>

          <div>

            <strong>
              Authenticate on Angel One
            </strong>

            <p>
              Click Authenticate with
              Angel One. You will be sent
              to Angel One's official login
              page.
            </p>

          </div>

        </div>


        {/* STEP 8 */}

        <div className="learn-step">

          <div className="step-number">
            8
          </div>

          <div>

            <strong>
              Complete Angel One Login
            </strong>

            <p>
              Enter your Client ID,
              PIN/TOTP or OTP directly
              on Angel One.
            </p>

          </div>

        </div>


        {/* STEP 9 */}

        <div className="learn-step">

          <div className="step-number">
            9
          </div>

          <div>

            <strong>
              Tradebox receives token
            </strong>

            <p>
              After successful login,
              Angel One redirects to
              Tradebox and the backend
              receives the authentication
              token.
            </p>

          </div>

        </div>


        {/* FLOW */}

        <div className="angel-auth-flow">

          <div className="flow-title">
            Authentication flow
          </div>


          <div className="flow-item">

            <span>
              1
            </span>

            Publisher API Key

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              2
            </span>

            Angel One Official Login

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              3
            </span>

            Tradebox Callback

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item flow-success">

            <span>
              ✓
            </span>

            Auth Token Received

          </div>

        </div>


        {/* WARNING */}

        <div className="learn-warning">

          <span>
            🔐
          </span>

          <p>
            Tradebox does not ask you to
            enter your Angel One PIN,
            TOTP or OTP. Enter those
            details only on Angel One's
            official login page.
          </p>

        </div>


        {/* DONE */}

        <button
          type="button"
          className="learn-modal-done"
          onClick={
            onClose
          }
        >
          Got it — Connect Angel One
        </button>

      </div>

    </div>

  );
}


export default AngelOneLearnMoreModal;