import React from "react";

import upstoxImage from "../../assets/brokers/upstox.png";

import "./UpstoxLearnMoreModal.css";

function UpstoxLearnMoreModal({ onClose }) {
  const UPSTOX_DEVELOPER_URL =
    "https://account.upstox.com/developer/apps";

  const UPSTOX_DOCS_URL =
    "https://upstox.com/developer/api-documentation/authentication/";

  return (
    <div
      className="learn-modal-overlay"
      onClick={onClose}
    >
      <div
        className="learn-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* ======================================
            CLOSE
        ====================================== */}

        <button
          type="button"
          className="learn-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* ======================================
            REAL UPSTOX IMAGE
        ====================================== */}

        <div className="learn-modal-icon upstox-modal-logo-box">

          <img
            src={upstoxImage}
            alt="Upstox"
            className="upstox-modal-logo"
          />

        </div>

        {/* ======================================
            HEADING
        ====================================== */}

        <div className="learn-modal-label">
          UPSTOX AUTHENTICATION
        </div>

        <h2>
          Get your API Key & Secret
        </h2>

        <p className="learn-modal-description">
          Follow these steps to create your Upstox
          API application and securely connect your
          account with Tradebox.
        </p>

        {/* ======================================
            STEP 1
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            1
          </div>

          <div>

            <strong>
              Open Upstox Developer Apps
            </strong>

            <p>
              Log in to your Upstox account and open
              the official Developer Apps section.
            </p>

            <a
              href={UPSTOX_DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-link"
            >
              Open Upstox Developer Apps →
            </a>

          </div>

        </div>

        {/* ======================================
            STEP 2
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            2
          </div>

          <div>

            <strong>
              Create a new app
            </strong>

            <p>
              Go to your apps section and create
              a new Upstox API application for
              Tradebox.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 3
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            3
          </div>

          <div>

            <strong>
              Set your Redirect URL
            </strong>

            <p>
              For your current local Tradebox
              backend, enter:
            </p>

            <div className="upstox-code-box">
             PASTE THE REDIRECT URL
            </div>

            <p>
              The Redirect URI configured in Upstox
              must exactly match the Redirect URI
              used by your backend.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 4
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            4
          </div>

          <div>

            <strong>
              Configure Allowed IPs
            </strong>

            <p>
              If your Upstox app requires an allowed
              IP, add your Tradebox static backend IP
              to the application's
              <b> Allowed IPs </b>
              section.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 5
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            5
          </div>

          <div>

            <strong>
              Create the application
            </strong>

            <p>
              Complete the required fields and create
              your Upstox API application.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 6
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            6
          </div>

          <div>

            <strong>
              Copy API Key & Secret
            </strong>

            <p>
              Open the created application and copy
              your
              <b> API Key </b>
              and
              <b> API Secret</b>.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 7
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            7
          </div>

          <div>

            <strong>
              Enter credentials in Tradebox
            </strong>

            <p>
              Paste the
              <b> API Key </b>
              and
              <b> API Secret </b>
              into the Upstox authentication form.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 8
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            8
          </div>

          <div>

            <strong>
              Authenticate with Upstox
            </strong>

            <p>
              Click
              <b> Authenticate with Upstox </b>.
              Tradebox will start the official
              Upstox authorization flow.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 9
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            9
          </div>

          <div>

            <strong>
              Complete login on Upstox
            </strong>

            <p>
              You will be redirected to the official
              Upstox login page. Complete your
              authentication there.
            </p>

          </div>

        </div>

        {/* ======================================
            STEP 10
        ====================================== */}

        <div className="learn-step">

          <div className="step-number">
            10
          </div>

          <div>

            <strong>
              Access Token generated
            </strong>

            <p>
              After successful authorization,
              Upstox redirects to Tradebox with an
              authorization code. The Tradebox backend
              exchanges that code for the real
              Upstox Access Token.
            </p>

          </div>

        </div>

        {/* ======================================
            AUTH FLOW
        ====================================== */}

        <div className="groww-auth-flow">

          <div className="flow-title">
            Authentication flow
          </div>

          <div className="flow-item">
            <span>1</span>
            API Key + API Secret
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>2</span>
            Upstox Authorization
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>3</span>
            Tradebox Callback
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>4</span>
            Authorization Code
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item flow-success">
            <span>✓</span>
            Access Token Generated
          </div>

        </div>

        {/* ======================================
            DOCUMENTATION
        ====================================== */}

        <div className="upstox-doc-box">

          <strong>
            Official Upstox Documentation
          </strong>

          <p>
            Check the official Upstox authentication
            documentation if you need additional
            information.
          </p>

          <a
            href={UPSTOX_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="learn-link"
          >
            Open Upstox Documentation →
          </a>

        </div>

        {/* ======================================
            WARNING
        ====================================== */}

        <div className="learn-warning">

          <span>
            🔐
          </span>

          <p>
            Never share your API Secret or Access
            Token. Your Upstox password, PIN and OTP
            are entered only on the official Upstox
            authentication page.
          </p>

        </div>

        {/* ======================================
            DONE
        ====================================== */}

        <button
          type="button"
          className="learn-modal-done"
          onClick={onClose}
        >
          Got it — Connect Upstox
        </button>

      </div>
    </div>
  );
}

export default UpstoxLearnMoreModal;