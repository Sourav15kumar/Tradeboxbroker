import React from "react";

import iciciImage from
  "../../assets/brokers/icici.png";

import "./IciciLearnMoreModal.css";


function IciciLearnMoreModal({
  onClose,
}) {

  const ICICI_BREEZE_PORTAL =
    "https://api.icicidirect.com/apiuser/home";


  return (

    <div
      className="learn-modal-overlay"
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }

      }}
    >

      <div className="learn-modal">


        {/* ==================================================
            CLOSE
        ================================================== */}

        <button
          type="button"
          className="learn-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>


        {/* ==================================================
            REAL ICICI IMAGE
        ================================================== */}

        <div className="learn-modal-icon">

          <img
            src={iciciImage}
            alt="ICICI Direct"
            className="icici-modal-logo"
          />

        </div>


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="learn-modal-label">
          ICICI DIRECT AUTHENTICATION
        </div>


        <h2>
          Get your API Key & Secret Key
        </h2>


        <p className="learn-modal-description">

          Follow these steps to create your
          ICICI Breeze application and connect
          your ICICI Direct account securely
          with Tradebox.

        </p>


        {/* ==================================================
            STEP 1
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            1
          </div>


          <div className="step-content">

            <strong>
              Open ICICI Breeze API Portal
            </strong>


            <p>
              Open the official ICICI Breeze
              API portal and sign in using
              your ICICI Direct account.
            </p>


            <a
              href={ICICI_BREEZE_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-link"
            >
              Open ICICI Breeze Portal →
            </a>

          </div>

        </div>


        {/* ==================================================
            STEP 2
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            2
          </div>


          <div className="step-content">

            <strong>
              Open Register an App
            </strong>


            <p>
              After signing in, open the
              <b> Register an App </b>
              section from the Breeze API
              dashboard.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 3
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            3
          </div>


          <div className="step-content">

            <strong>
              Create your Breeze application
            </strong>


            <p>
              Enter a name for the application,
              such as
              <b> Tradebox</b>,
              and complete the application
              details requested by ICICI Direct.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 4
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            4
          </div>


          <div className="step-content">

            <strong>
              Configure the Redirect URL
            </strong>


            <p>
              Enter the Tradebox callback URL
              configured for the ICICI integration.
              The same URL must be used in your
              Breeze application configuration.
            </p>


            <div className="redirect-info">

              <span>
                Tradebox callback
              </span>

              <code>
                https://YOUR-BACKEND/api/icici/callback
              </code>

            </div>

          </div>

        </div>


        {/* ==================================================
            STEP 5
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            5
          </div>


          <div className="step-content">

            <strong>
              Add Tradebox Static IP
            </strong>


            <p>
              If your Breeze application requires
              IP whitelisting, enter the public
              static IP of the deployed Tradebox
              backend.
            </p>


            <div className="learn-small-note">

              Do not enter your home Wi-Fi IP or
              browser IP. Use the public static IP
              of the Tradebox backend server.

            </div>

          </div>

        </div>


        {/* ==================================================
            STEP 6
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            6
          </div>


          <div className="step-content">

            <strong>
              Open View Apps
            </strong>


            <p>
              After creating the application,
              open the
              <b> View Apps </b>
              section in your Breeze API
              dashboard.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 7
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            7
          </div>


          <div className="step-content">

            <strong>
              Copy API Key & Secret Key
            </strong>


            <p>
              Copy the
              <b> API Key </b>
              and
              <b> Secret Key </b>
              belonging to the application
              you created.
            </p>


            <div className="credential-preview">

              <div>

                <span>
                  1
                </span>

                API Key

              </div>


              <div>

                <span>
                  2
                </span>

                Secret Key

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            STEP 8
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            8
          </div>


          <div className="step-content">

            <strong>
              Enter both details in Tradebox
            </strong>


            <p>
              Return to Tradebox and paste your
              <b> API Key </b>
              and
              <b> Secret Key </b>
              into the two authentication fields.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 9
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            9
          </div>


          <div className="step-content">

            <strong>
              Authenticate with ICICI Direct
            </strong>


            <p>
              Click
              <b> Authenticate with ICICI Direct</b>.
              Tradebox will start the authentication
              process and send you to the official
              ICICI Direct login flow.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 10
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            10
          </div>


          <div className="step-content">

            <strong>
              Complete ICICI authentication
            </strong>


            <p>
              Complete the required ICICI Direct
              login and verification. After successful
              authentication, ICICI generates the
              API session required by Breeze.
            </p>

          </div>

        </div>


        {/* ==================================================
            AUTH FLOW
        ================================================== */}

        <div className="icici-auth-flow">

          <div className="flow-title">
            Authentication flow
          </div>


          <div className="flow-item">

            <span>
              1
            </span>

            API Key

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              2
            </span>

            Secret Key

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              3
            </span>

            Official ICICI Login

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              4
            </span>

            API Session

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

            <span>
              ✓
            </span>

            Breeze Session Connected

          </div>

        </div>


        {/* ==================================================
            WARNING
        ================================================== */}

        <div className="learn-warning">

          <div className="warning-lock">
            🔐
          </div>


          <p>

            Never share your Breeze Secret Key
            or active session credentials with
            anyone. Tradebox should process these
            credentials securely on the backend
            and should never expose them in
            frontend code.

          </p>

        </div>


        {/* ==================================================
            DONE
        ================================================== */}

        <button
          type="button"
          className="learn-modal-done"
          onClick={onClose}
        >

          Got it — Connect ICICI Direct

        </button>


      </div>

    </div>

  );
}


export default IciciLearnMoreModal;