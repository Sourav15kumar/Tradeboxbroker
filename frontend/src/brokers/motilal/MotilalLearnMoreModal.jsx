import React from "react";

import motilalImage from
  "../../assets/brokers/motilal.png";

import "./MotilalLearnMoreModal.css";


function MotilalLearnMoreModal({
  onClose,
}) {
  const MOTILAL_API_PORTAL =
    "https://invest.motilaloswal.com/moapi/";


  return (
    <div
      className="motilal-learn-overlay"
      onClick={onClose}
    >

      <div
        className="motilal-learn-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ==================================================
            CLOSE
        ================================================== */}

        <button
          type="button"
          className="motilal-learn-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>


        {/* ==================================================
            LOGO
        ================================================== */}

        <div className="motilal-learn-logo-box">

          <img
            src={motilalImage}
            alt="Motilal Oswal"
          />

        </div>


        <div className="motilal-learn-label">
          MOTILAL OSWAL AUTHENTICATION
        </div>


        <h2>
          Get your API Key & Secret
        </h2>


        <p className="motilal-learn-description">
          Follow these steps to create your Motilal
          Oswal API application and securely connect
          your account with Tradebox.
        </p>


        {/* ==================================================
            STEP 1
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            1
          </div>


          <div>

            <strong>
              Open Motilal Oswal API Portal
            </strong>


            <p>
              Log in to the official Motilal Oswal
              API portal using your Motilal account.
            </p>


            <a
              href={MOTILAL_API_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="motilal-learn-link"
            >
              Open Motilal API Portal →
            </a>

          </div>

        </div>


        {/* ==================================================
            STEP 2
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            2
          </div>


          <div>

            <strong>
              Create a new API application
            </strong>


            <p>
              Open the
              <b> My Apps </b>
              section and create a new API
              application.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 3
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            3
          </div>


          <div>

            <strong>
              Enter the application name
            </strong>


            <p>
              For Tradebox, use the following
              naming format:
            </p>


            <div className="motilal-value-box">
              RA_name@tradebox
            </div>


            <p className="motilal-small-note">
              Example: if your name is Rahul,
              you may use
              <b> RA_Rahul@tradebox</b>.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 4
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            4
          </div>


          <div>

            <strong>
              Enter your Tradebox Redirect URL
            </strong>


            <p>
              In the
              <b> Redirect URL </b>
              field, paste the Tradebox Redirect
              URL provided to you by Tradebox.
            </p>


            <div className="motilal-value-box">
              YOUR_TRADEBOX_BACKEND_REDIRECT_URL
            </div>


            <p className="motilal-small-note">
              The redirect must point to the Tradebox
              backend Motilal callback endpoint.
            </p>


            <p className="motilal-small-note">
              Example structure:
            </p>


            <div className="motilal-value-box">
              https://YOUR-TRADEBOX-BACKEND/api/motilal/callback
            </div>

          </div>

        </div>


        {/* ==================================================
            STEP 5
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            5
          </div>


          <div>

            <strong>
              Create the application
            </strong>


            <p>
              Complete the required consent and
              application details, then create
              your API application.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 6
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            6
          </div>


          <div>

            <strong>
              Copy your API Key
            </strong>


            <p>
              After the application is created,
              copy the generated
              <b> API Key</b>.
            </p>


            <p>
              Paste it into the
              <b> API Key </b>
              field on Tradebox.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 7
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            7
          </div>


          <div>

            <strong>
              Copy your API Secret Key
            </strong>


            <p>
              Copy the
              <b> API Secret Key </b>
              generated for the same application.
            </p>


            <p>
              Keep your API Secret private and
              paste it only into the secure
              Tradebox authentication form.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 8
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            8
          </div>


          <div>

            <strong>
              Authenticate with Motilal Oswal
            </strong>


            <p>
              Click
              <b> Authenticate with Motilal Oswal</b>.
              Tradebox will securely start the
              Motilal portal login flow.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 9
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            9
          </div>


          <div>

            <strong>
              Login on Motilal Oswal
            </strong>


            <p>
              You will be redirected to the official
              Motilal Oswal login page.
            </p>


            <p>
              Enter your Motilal
              <b> Client Code </b>
              and
              <b> Password </b>
              directly on Motilal's page.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 10
        ================================================== */}

        <div className="motilal-learn-step">

          <div className="motilal-step-number">
            10
          </div>


          <div>

            <strong>
              Access Token generated
            </strong>


            <p>
              After successful login, Motilal sends
              an
              <b> AuthToken </b>
              to the registered Tradebox Redirect
              URL.
            </p>


            <p>
              Tradebox then securely exchanges the
              AuthToken for the final
              <b> Access Token</b>.
            </p>

          </div>

        </div>


        {/* ==================================================
            FLOW
        ================================================== */}

        <div className="motilal-learn-flow">

          <div className="motilal-flow-title">
            Authentication flow
          </div>


          <div className="motilal-flow-item">

            <span>1</span>

            API Key + API Secret

          </div>


          <div className="motilal-flow-arrow">
            ↓
          </div>


          <div className="motilal-flow-item">

            <span>2</span>

            Motilal Portal Login

          </div>


          <div className="motilal-flow-arrow">
            ↓
          </div>


          <div className="motilal-flow-item">

            <span>3</span>

            Tradebox Redirect URL

          </div>


          <div className="motilal-flow-arrow">
            ↓
          </div>


          <div className="motilal-flow-item">

            <span>4</span>

            AuthToken

          </div>


          <div className="motilal-flow-arrow">
            ↓
          </div>


          <div
            className="
              motilal-flow-item
              motilal-flow-success
            "
          >

            <span>✓</span>

            Access Token Generated

          </div>

        </div>


        {/* ==================================================
            WARNING
        ================================================== */}

        <div className="motilal-learn-warning">

          <span>
            🔐
          </span>


          <p>
            Never share your API Secret Key,
            Motilal login password, AuthToken or
            Access Token. Your Motilal account
            password is entered only on Motilal's
            official login page.
          </p>

        </div>


        {/* ==================================================
            DONE
        ================================================== */}

        <button
          type="button"
          className="motilal-learn-done"
          onClick={onClose}
        >
          Got it — Connect Motilal Oswal
        </button>

      </div>

    </div>
  );
}


export default MotilalLearnMoreModal;