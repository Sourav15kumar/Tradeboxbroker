import React from "react";

import jmFinancialImage from
  "../../assets/brokers/jmfinancial.png";

import "./JMFinancialLearnMoreModal.css";


function JMFinancialLearnMoreModal({
  onClose,
}) {

  const JM_FINANCIAL_PORTAL =
    "https://developer.jmfonline.in/accounts/login";


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
            REAL JM FINANCIAL IMAGE
        ================================================== */}

        <div className="learn-modal-icon">

          <img
            src={jmFinancialImage}
            alt="JM Financial"
            className="jm-modal-logo"
          />

        </div>


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="learn-modal-label">
          JM FINANCIAL AUTHENTICATION
        </div>


        <h2>
          Get your API Key & Secret
        </h2>


        <p className="learn-modal-description">

          Follow these steps to create your
          JM Financial API credentials and
          securely connect your JM Financial
          account with Tradebox.

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
              Open JM Financial API Portal
            </strong>


            <p>
              Open the JM Financial developer
              portal and sign in using your
              registered JM Financial account.
            </p>


            <a
              href={JM_FINANCIAL_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-link"
            >
              Open JM Financial API Portal →
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
              Create your API Application
            </strong>


            <p>
              From the JM Financial API
              dashboard, create the application
              required for
              <b> Interactive Trading API </b>
              access.
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
              Configure your application
            </strong>


            <p>
              Enter the application details
              requested by JM Financial.
              You can use a recognizable
              application name such as
              <b> Tradebox</b>.
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
              Get Interactive API Key
            </strong>


            <p>
              After creating the Interactive
              API application, copy the
              <b> API Key </b>
              generated for your application.
            </p>

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
              Get Interactive API Secret
            </strong>


            <p>
              Copy the
              <b> API Secret </b>
              associated with the same
              Interactive API application.
            </p>


            <div className="credential-preview">

              <div>

                <span>
                  1
                </span>

                Interactive API Key

              </div>


              <div>

                <span>
                  2
                </span>

                Interactive API Secret

              </div>

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
              Enter credentials in Tradebox
            </strong>


            <p>
              Return to Tradebox and enter
              your
              <b> Interactive API Key </b>
              and
              <b> Interactive API Secret </b>
              in the JM Financial
              authentication form.
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
              Authenticate with JM Financial
            </strong>


            <p>
              Click
              <b> Authenticate with JM Financial</b>.
              Tradebox sends the required
              authentication request through
              the backend and starts the
              JM Financial authentication
              process.
            </p>

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
              Complete JM Financial Authorization
            </strong>


            <p>
              If JM Financial asks you to
              sign in or approve the API
              connection, complete the
              authentication on the official
              JM Financial page.
            </p>

            <div className="learn-small-note">

              Never enter your JM Financial
              trading password or OTP directly
              inside Tradebox unless the official
              API flow explicitly requires it.

            </div>

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
              Tradebox receives authentication result
            </strong>


            <p>
              After successful authorization,
              the authentication result is
              returned to the Tradebox backend.
              The backend then continues the
              required XTS authentication flow.
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
              Generate usable session token
            </strong>


            <p>
              Tradebox completes the server-side
              authentication process and obtains
              the token/session required for
              authenticated JM Financial API
              requests.
            </p>

          </div>

        </div>


        {/* ==================================================
            STEP 11
        ================================================== */}

        <div className="learn-step">

          <div className="step-number">
            11
          </div>


          <div className="step-content">

            <strong>
              JM Financial connected to Tradebox
            </strong>


            <p>
              After successful authentication,
              Tradebox can use the authenticated
              broker session for supported APIs
              such as orders, positions and
              other permitted trading operations.
            </p>

          </div>

        </div>


        {/* ==================================================
            AUTHENTICATION FLOW
        ================================================== */}

        <div className="jm-auth-flow">

          <div className="flow-title">
            Authentication flow
          </div>


          <div className="flow-item">

            <span>
              1
            </span>

            Interactive API Key

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              2
            </span>

            Interactive API Secret

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              3
            </span>

            Tradebox Backend

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              4
            </span>

            JM Financial Authentication

          </div>


          <div className="flow-arrow">
            ↓
          </div>


          <div className="flow-item">

            <span>
              5
            </span>

            XTS Authentication / Session

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

            JM Financial Connected

          </div>

        </div>


        {/* ==================================================
            DEVELOPMENT RESULT
        ================================================== */}

        <div className="jm-token-info">

          <strong>
            What happens after authentication?
          </strong>

          <p>
            During Tradebox development and
            testing, the token returned after
            successful JM Financial
            authentication can be verified
            from the Tradebox backend console.
          </p>

          <code>
            JM FINANCIAL AUTHENTICATION SUCCESS
          </code>

        </div>


        {/* ==================================================
            WARNING
        ================================================== */}

        <div className="learn-warning">

          <div className="warning-lock">
            🔐
          </div>


          <p>

            Never share your JM Financial API
            Secret, access token or active
            session token with anyone.
            Tradebox should process these
            credentials securely on the backend
            and must not permanently store the
            API Secret in frontend localStorage
            or sessionStorage.

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

          Got it — Connect JM Financial

        </button>


      </div>

    </div>

  );

}


export default JMFinancialLearnMoreModal;