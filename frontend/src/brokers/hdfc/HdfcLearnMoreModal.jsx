import React from "react";

import hdfcImage from
  "../../assets/brokers/hdfc.png";

import "./HdfcLearnMoreModal.css";


function HdfcLearnMoreModal({
  onClose,
}) {

  const HDFC_PORTAL =
    "https://developer.hdfcsky.com/";


  return (
    <div
      className="learn-modal-overlay"
      onClick={onClose}
    >

      <div
        className="learn-modal"
        onClick={
          (event) =>
            event.stopPropagation()
        }
      >

        <button
          type="button"
          className="learn-modal-close"
          onClick={onClose}
        >
          ×
        </button>


        <div className="learn-modal-icon">

          <img
            src={hdfcImage}
            alt="HDFC SKY"
            className="hdfc-modal-logo"
          />

        </div>


        <div className="learn-modal-label">
          HDFC SKY AUTHENTICATION
        </div>


        <h2>
          Get your API Key & Secret
        </h2>


        <p className="learn-modal-description">
          Follow these steps to create your
          HDFC SKY application and connect
          your account with Tradebox.
        </p>


        <div className="learn-step">

          <div className="step-number">
            1
          </div>

          <div>
            <strong>
              Open HDFC SKY Developer Portal
            </strong>

            <p>
              Open the official HDFC SKY
              developer portal and sign in.
            </p>

            <a
              href={HDFC_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-link"
            >
              Open HDFC Developer Portal →
            </a>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            2
          </div>

          <div>
            <strong>
              Open My Apps
            </strong>

            <p>
              Go to My Apps and create a new
              API application.
            </p>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            3
          </div>

          <div>
            <strong>
              Enter Tradebox application details
            </strong>

            <p>
              Enter your application name and
              Tradebox redirect URL.
            </p>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            4
          </div>

          <div>
            <strong>
              Register Tradebox Static IP
            </strong>

            <p>
              Add the public static IP used by
              the Tradebox backend.
            </p>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            5
          </div>

          <div>
            <strong>
              Activate your application
            </strong>

            <p>
              Confirm that the app status is
              Active before authentication.
            </p>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            6
          </div>

          <div>
            <strong>
              Copy API Key & API Secret
            </strong>

            <p>
              Copy the generated API Key and
              API Secret and paste them into
              Tradebox.
            </p>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            7
          </div>

          <div>
            <strong>
              Authenticate your HDFC account
            </strong>

            <p>
              Continue the authentication flow,
              complete HDFC login and OTP
              verification.
            </p>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            8
          </div>

          <div>
            <strong>
              Authorise Tradebox
            </strong>

            <p>
              Approve the authorisation request.
              HDFC generates a temporary Request
              Token.
            </p>
          </div>

        </div>


        <div className="learn-step">

          <div className="step-number">
            9
          </div>

          <div>
            <strong>
              Access Token generated
            </strong>

            <p>
              Tradebox exchanges your Request
              Token using your API Key and API
              Secret and receives the real
              HDFC SKY Access Token.
            </p>
          </div>

        </div>


        <div className="hdfc-auth-flow">

          <div className="flow-title">
            Authentication flow
          </div>

          <div className="flow-item">
            <span>1</span>
            API Key + Secret
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>2</span>
            HDFC Login + OTP
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>3</span>
            Request Token
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>4</span>
            Authorisation
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div
            className="
              flow-item
              flow-success
            "
          >
            <span>✓</span>

            Access Token Generated
          </div>

        </div>


        <div className="learn-warning">

          <span>
            🔐
          </span>

          <p>
            Never expose your HDFC API Secret
            or Access Token in frontend code,
            localStorage or browser URLs.
          </p>

        </div>


        <button
          type="button"
          className="learn-modal-done"
          onClick={onClose}
        >
          Got it — Connect HDFC SKY
        </button>

      </div>
    </div>
  );
}


export default HdfcLearnMoreModal;