import React from "react";

import fyersImage from
  "../../assets/brokers/fyers.png";

import "./FyersLearnMoreModal.css";


function FyersLearnMoreModal({
  onClose,
}) {

  const FYERS_API_URL =
    "https://myapi.fyers.in/dashboard";


  return (

    <div
      className="fyers-learn-modal-overlay"
      onClick={onClose}
    >

      <div
        className="fyers-learn-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ==================================================
            CLOSE
        ================================================== */}

        <button
          type="button"
          className="fyers-learn-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>


        {/* ==================================================
            LOGO
        ================================================== */}

        <div className="fyers-learn-modal-icon">

          <img
            src={fyersImage}
            alt="FYERS"
            className="fyers-modal-logo"
          />

        </div>


        <div className="fyers-learn-modal-label">
          FYERS AUTHENTICATION
        </div>


        <h2>
          Get your FYERS API details
        </h2>


        <p className="fyers-learn-modal-description">
          Complete these steps once to configure
          your FYERS API application and securely
          connect your account with Tradebox.
        </p>


        {/* ==================================================
            STEP 1
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            1
          </div>

          <div>

            <strong>
              Open FYERS API Dashboard
            </strong>

            <p>
              Log in to your FYERS account and
              open the official API Dashboard.
            </p>

            <a
              href={FYERS_API_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="fyers-learn-link"
            >
              Open FYERS API Dashboard →
            </a>

          </div>

        </div>


        {/* ==================================================
            STEP 2
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            2
          </div>

          <div>

            <strong>
              Create your application
            </strong>

            <p>
              Create a new FYERS API application
              if you have not already created one.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 3
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            3
          </div>

          <div>

            <strong>
              Add Tradebox static IP
            </strong>

            <p>
              Add the public static IP used by the
              Tradebox backend inside the
              <b> Allowed IPs </b>
              section.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 4
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            4
          </div>

          <div>

            <strong>
              Set Redirect URL
            </strong>

            <p>
              Add the Tradebox backend callback URL
              as the Redirect URL.
            </p>

            <div className="fyers-callback-box">
              PASTE THE TRADEBOX REDIRECT URL
            </div>

            <p>
              For local testing, use your local
              backend callback URL.
            </p>

            <p>
              When Tradebox is deployed, replace
              the local callback URL with the
              deployed backend callback URL.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 5
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            5
          </div>

          <div>

            <strong>
              Copy your App ID
            </strong>

            <p>
              After creating your FYERS API
              application, copy the generated
              <b> App ID</b>.
            </p>

            <p>
              Paste this value into the
              <b> App ID </b>
              field in Tradebox.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 6
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            6
          </div>

          <div>

            <strong>
              Copy your Secret ID
            </strong>

            <p>
              Copy the
              <b> Secret ID </b>
              associated with the same FYERS API
              application.
            </p>

            <p>
              Keep this value private and do not
              expose it publicly.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 7
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            7
          </div>

          <div>

            <strong>
              Enter your credentials in Tradebox
            </strong>

            <p>
              Enter your
              <b> App ID </b>
              and
              <b> Secret ID </b>
              into the FYERS authentication form.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 8
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            8
          </div>

          <div>

            <strong>
              Authenticate with FYERS
            </strong>

            <p>
              Click
              <b> Authenticate with FYERS</b>.
            </p>

            <p>
              Tradebox will create the FYERS
              authorization URL and redirect your
              browser to FYERS.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 9
        ================================================== */}

        <div className="fyers-learn-step">

          <div className="fyers-step-number">
            9
          </div>

          <div>

            <strong>
              Login and authorize
            </strong>

            <p>
              Complete FYERS login and authorization
              in the browser.
            </p>

            <p>
              FYERS will show the application
              permission screen.
            </p>

            <p>
              Accept the API usage terms and click
              <b> Continue</b>.
            </p>

            <p>
              FYERS will then redirect the browser
              back to the Tradebox callback URL
              with an authorization code.
            </p>

          </div>

        </div>


        {/* ==================================================
            WARNING
        ================================================== */}

        <div className="fyers-learn-warning">

          <span>
            🔐
          </span>

          <p>
            Never share your Secret ID or other
            authentication credentials with anyone.
            Sensitive FYERS authentication data
            should remain on the Tradebox backend
            and should not be stored in localStorage
            or exposed in the browser.
          </p>

        </div>


        {/* ==================================================
            DONE
        ================================================== */}

        <button
          type="button"
          className="fyers-learn-modal-done"
          onClick={onClose}
        >
          Got it — Connect FYERS
        </button>

      </div>

    </div>

  );
}


export default FyersLearnMoreModal;