import React from "react";

import anandRathiImage from
  "../../assets/brokers/anandrathi.png";

import "./AnandRathiLearnMoreModal.css";


function AnandRathiLearnMoreModal({
  onClose,
}) {
  const ANAND_RATHI_ALGOZY_URL =
    "https://anandrathi.com/algozy";

  const ANAND_RATHI_SSO_URL =
    "https://sso.anandrathi.com/";


  return (
    <div
      className="ar-learn-overlay"
      onClick={onClose}
    >

      <div
        className="ar-learn-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ==================================================
            CLOSE
        ================================================== */}

        <button
          type="button"
          className="ar-learn-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>


        {/* ==================================================
            LOGO
        ================================================== */}

        <div className="ar-learn-logo">

          <img
            src={anandRathiImage}
            alt="Anand Rathi"
          />

        </div>


        <div className="ar-learn-label">
          ANAND RATHI INTERACTIVE ORDER API
        </div>


        <h2>
          Get your App Key & Secret Key
        </h2>


        <p className="ar-learn-description">
          Follow these steps to create your Anand
          Rathi Interactive Order API application
          and connect your trading account securely
          with Tradebox.
        </p>


        {/* ==================================================
            STEP 1
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            1
          </div>


          <div>

            <strong>
              Open Anand Rathi Algozy
            </strong>


            <p>
              Open the official Anand Rathi Algozy
              platform to begin the API setup.
            </p>


            <a
              href={ANAND_RATHI_ALGOZY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ar-learn-link"
            >
              Open Anand Rathi Algozy →
            </a>

          </div>

        </div>


        {/* ==================================================
            STEP 2
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            2
          </div>


          <div>

            <strong>
              Login to Anand Rathi SSO
            </strong>


            <p>
              Sign in using your Anand Rathi
              Trading Code / Customer ID.
            </p>


            <a
              href={ANAND_RATHI_SSO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ar-learn-link"
            >
              Open Anand Rathi SSO →
            </a>

          </div>

        </div>


        {/* ==================================================
            STEP 3
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            3
          </div>


          <div>

            <strong>
              Give consent for API creation
            </strong>


            <p>
              Complete the API consent process
              provided by Anand Rathi.
            </p>


            <p>
              Make sure you are creating credentials
              for the
              <b> Interactive Order API</b>,
              because these credentials are used for
              trading operations.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 4
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            4
          </div>


          <div>

            <strong>
              Enter your application name
            </strong>


            <p>
              If an application name is requested,
              Tradebox recommends using this naming
              format:
            </p>


            <div className="ar-value-box">
              RA_name@tradebox
            </div>


            <p className="ar-small-note">
              Example:
              <b> RA_Rahul@tradebox</b>
            </p>


            <p className="ar-small-note">
              This is a Tradebox suggested naming
              convention, not an Anand Rathi
              mandatory format.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 5
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            5
          </div>


          <div>

            <strong>
              Enter Tradebox Redirect URL
            </strong>


            <p>
              If the Anand Rathi application setup
              asks for a Redirect URL, paste the
              Redirect URL provided by Tradebox.
            </p>


            <div className="ar-value-box">
              YOUR_TRADEBOX_REDIRECT_URL
            </div>


            <p className="ar-small-note">
              Do not enter a random URL. Use the
              exact Tradebox URL provided for your
              environment.
            </p>


            <p className="ar-small-note">
              Example structure:
            </p>


            <div className="ar-value-box">
              https://YOUR-TRADEBOX-BACKEND/...
            </div>

          </div>

        </div>


        {/* ==================================================
            STEP 6
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            6
          </div>


          <div>

            <strong>
              Get your Interactive API keys
            </strong>


            <p>
              After completing the API creation
              process, Anand Rathi will provide the
              API credentials associated with your
              application.
            </p>


            <p>
              Make sure the credentials belong to the
              <b> Interactive Order API </b>
              and not the separate Market Data API.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 7
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            7
          </div>


          <div>

            <strong>
              Copy your App Key
            </strong>


            <p>
              Copy the
              <b> App Key </b>
              generated for your Interactive Order
              API application.
            </p>


            <p>
              Paste it into the
              <b> App Key </b>
              field on Tradebox.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 8
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            8
          </div>


          <div>

            <strong>
              Copy your Secret Key
            </strong>


            <p>
              Copy the
              <b> Secret Key </b>
              associated with the same Interactive
              Order API application.
            </p>


            <p>
              Paste it into the
              <b> Secret Key </b>
              field on Tradebox.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 9
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            9
          </div>


          <div>

            <strong>
              Authenticate with Anand Rathi
            </strong>


            <p>
              Return to Tradebox and click
              <b> Authenticate with Anand Rathi</b>.
            </p>


            <p>
              Tradebox sends the App Key and Secret
              Key securely to its backend, where the
              Anand Rathi Interactive authentication
              request is performed.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 10
        ================================================== */}

        <div className="ar-learn-step">

          <div className="ar-step-number">
            10
          </div>


          <div>

            <strong>
              Interactive token is generated
            </strong>


            <p>
              After successful authentication,
              Tradebox receives the Interactive
              session/access token on its backend.
            </p>


            <p>
              This token can then be used for
              Interactive Order API operations such
              as placing and managing orders.
            </p>

          </div>

        </div>


        {/* ==================================================
            FLOW
        ================================================== */}

        <div className="ar-auth-flow">

          <div className="ar-flow-title">
            Authentication flow
          </div>


          <div className="ar-flow-item">
            <span>1</span>

            Anand Rathi SSO
          </div>


          <div className="ar-flow-arrow">
            ↓
          </div>


          <div className="ar-flow-item">
            <span>2</span>

            API Creation Consent
          </div>


          <div className="ar-flow-arrow">
            ↓
          </div>


          <div className="ar-flow-item">
            <span>3</span>

            Interactive App Key + Secret Key
          </div>


          <div className="ar-flow-arrow">
            ↓
          </div>


          <div className="ar-flow-item">
            <span>4</span>

            Tradebox Backend Authentication
          </div>


          <div className="ar-flow-arrow">
            ↓
          </div>


          <div className="ar-flow-item ar-flow-success">

            <span>
              ✓
            </span>

            Interactive Token Generated

          </div>

        </div>


        {/* ==================================================
            WARNING
        ================================================== */}

        <div className="ar-learn-warning">

          <span>
            🔐
          </span>


          <p>
            Never share your Secret Key or Interactive
            trading token with anyone. Tradebox should
            handle the generated token on its backend
            instead of exposing it in browser storage.
          </p>

        </div>


        {/* ==================================================
            DONE
        ================================================== */}

        <button
          type="button"
          className="ar-learn-done"
          onClick={onClose}
        >
          Got it — Connect Anand Rathi
        </button>

      </div>

    </div>
  );
}


export default AnandRathiLearnMoreModal;