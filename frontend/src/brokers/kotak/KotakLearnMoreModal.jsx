import React from "react";

import kotakImage from
  "../../assets/brokers/kotak.png";

import "./KotakLearnMoreModal.css";


function KotakLearnMoreModal({
  onClose,
}) {

  const KOTAK_NEO_URL =
    "https://trade.kotakneo.com/";


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

        <div className="learn-modal-icon kotak-modal-logo-box">

          <img
            src={
              kotakImage
            }
            alt="Kotak Neo"
            className="kotak-modal-logo"
          />

        </div>


        <div className="learn-modal-label">
          KOTAK NEO AUTHENTICATION
        </div>


        <h2>
          Get your Kotak API details
        </h2>


        <p className="learn-modal-description">

          Complete these steps once to set up
          Kotak Neo Trade API and connect your
          account with Tradebox.

        </p>


        {/* STEP 1 */}

        <div className="learn-step">

          <div className="step-number">
            1
          </div>

          <div>

            <strong>
              Open Kotak Neo
            </strong>

            <p>
              Log in to your Kotak Neo account
              using the mobile app or web platform.
            </p>

            <a
              href={
                KOTAK_NEO_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              className="learn-link"
            >
              Open Kotak Neo →
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
              Open Trade API
            </strong>

            <p>
              Go to
              <b> More → Trade API </b>
              and open the API Dashboard.
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
              Create your application
            </strong>

            <p>
              Click
              <b> Create New Application </b>
              if you have not already created one.
            </p>

          </div>

        </div>


        {/* STEP 4 */}

        <div className="learn-step">

          <div className="step-number">
            4
          </div>

          <div>

            <strong>
              Copy API Access Token
            </strong>

            <p>
              After creating the Trade API
              application, copy the generated
              <b> API Access Token </b>.
            </p>

            <p>
              Paste this value into the
              <b> API Access Token </b>
              field in Tradebox.
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
              Register TOTP
            </strong>

            <p>
              From the Trade API page, click
              <b> TOTP Registration</b>.
            </p>

            <p>
              Verify your mobile number and OTP,
              then scan the QR code using
              Google Authenticator or Microsoft
              Authenticator.
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
              Get your TOTP Code
            </strong>

            <p>
              Open your authenticator app.
              It will show a changing
              <b> 6-digit TOTP code</b>.
            </p>

            <p>
              Enter the current code in Tradebox
              immediately before authentication.
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
              Find your Client Code (UCC)
            </strong>

            <p>
              Open your Kotak Neo profile.
              Find your
              <b> Client Code / UCC</b>
              and copy it into Tradebox.
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
              Enter your Registered Mobile Number
            </strong>

            <p>
              Enter the mobile number registered
              with your Kotak Neo account.
            </p>

            <p>
              You can enter the normal 10-digit
              Indian mobile number. Tradebox will
              add +91 automatically for authentication.
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
              Enter your 6-digit MPIN
            </strong>

            <p>
              Enter the existing
              <b> 6-digit Kotak Neo MPIN </b>
              used for your account.
            </p>

            <p>
              MPIN validation completes the
              second authentication step.
            </p>

          </div>

        </div>


        {/* STEP 10 */}

        <div className="learn-step">

          <div className="step-number">
            10
          </div>

          <div>

            <strong>
              Authenticate with Kotak Neo
            </strong>

            <p>
              Click
              <b> Authenticate with Kotak Neo</b>.
            </p>

            <p>
              Tradebox first performs TOTP login,
              then validates your MPIN and receives
              the authenticated trading session.
            </p>

          </div>

        </div>


        {/* FLOW */}

        <div className="kotak-auth-flow">

          <div className="flow-title">
            Authentication flow
          </div>


          <div className="flow-item">

            <span>
              1
            </span>

            API Access Token

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              2
            </span>

            Mobile + UCC + TOTP

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              3
            </span>

            View Token + SID

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              4
            </span>

            MPIN Validation

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item flow-success">

            <span>
              ✓
            </span>

            Trade Token Generated

          </div>

        </div>


        {/* WARNING */}

        <div className="learn-warning">

          <span>
            🔐
          </span>

          <p>
            Never share your API Access Token,
            TOTP, MPIN or Trade Token with anyone.
            The final Kotak trading token should
            stay on the Tradebox backend and should
            not be exposed in the browser.
          </p>

        </div>


        <button
          type="button"
          className="learn-modal-done"
          onClick={
            onClose
          }
        >
          Got it — Connect Kotak Neo
        </button>

      </div>

    </div>

  );
}


export default KotakLearnMoreModal;