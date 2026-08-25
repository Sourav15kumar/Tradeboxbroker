import React from "react";

import zerodhaImage
  from "../../assets/brokers/zerodha.png";

import "./ZerodhaLearnMoreModal.css";


function ZerodhaLearnMoreModal({
  onClose,
}) {

  const ZERODHA_DEVELOPER_URL =
    "https://developers.kite.trade/";

  const TRADEBOX_REDIRECT_URL =
    "PASTE THE REDIRECT URL";


  return (

    <div
      className="zd-learn-overlay"
      onMouseDown={(e) => {

        if (e.target === e.currentTarget) {
          onClose();
        }

      }}
    >

      <div className="zd-learn-modal">


        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}

        <button
          type="button"
          className="zd-learn-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>


        {/* =====================================================
            LOGO
        ===================================================== */}

        <div className="zd-learn-logo">

          <img
            src={zerodhaImage}
            alt="Zerodha"
          />

        </div>


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="zd-learn-label">
          ZERODHA KITE CONNECT
        </div>


        <h2>
          Get your API Key & API Secret
        </h2>


        <p className="zd-learn-description">
          Follow these simple steps to create your
          Zerodha Kite Connect application and
          connect it securely with Tradebox.
        </p>


        {/* =====================================================
            STEP 01
        ===================================================== */}

        <div className="zd-learn-step">

          <div className="zd-step-number">
            1
          </div>


          <div className="zd-step-content">

            <strong>
              Open Zerodha Developer Portal
            </strong>

            <p>
              Open the official Zerodha Kite Connect
              developer portal and sign in with your
              Zerodha account.
            </p>


            <a
              href={ZERODHA_DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="zd-learn-link"
            >
              Open Zerodha Developer Portal →
            </a>

          </div>

        </div>


        {/* =====================================================
            STEP 02
        ===================================================== */}

        <div className="zd-learn-step">

          <div className="zd-step-number">
            2
          </div>


          <div className="zd-step-content">

            <strong>
              Create a new application
            </strong>

            <p>
              From the Kite Connect developer
              dashboard, create a new application
              for your Tradebox integration.
            </p>

          </div>

        </div>


        {/* =====================================================
            STEP 03
        ===================================================== */}

        <div className="zd-learn-step">

          <div className="zd-step-number">
            3
          </div>


          <div className="zd-step-content">

            <strong>
              Enter your application name
            </strong>

            <p>
              In the application name field,
              use the Tradebox naming format below.
            </p>


            <div className="zd-value-box">

              <span>
                Application Name
              </span>

              <strong>
                RA@Tradebox
              </strong>

            </div>


            <p className="zd-small-note">
              This is a Tradebox naming convention
              to identify your Zerodha application.
            </p>

          </div>

        </div>


        {/* =====================================================
            STEP 04
        ===================================================== */}

        <div className="zd-learn-step">

          <div className="zd-step-number">
            4
          </div>


          <div className="zd-step-content">

            <strong>
              Enter Tradebox Redirect URL
            </strong>

            <p>
              In the Redirect URL field of your
              Zerodha application, enter the
              Tradebox callback URL.
            </p>


            <div className="zd-value-box">

              <span>
                Redirect URL
              </span>

              <strong>
                {TRADEBOX_REDIRECT_URL}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================================
            STEP 05
        ===================================================== */}

        <div className="zd-learn-step">

          <div className="zd-step-number">
            5
          </div>


          <div className="zd-step-content">

            <strong>
              Create the application
            </strong>

            <p>
              Complete the required details and
              save your Zerodha Kite Connect
              application.
            </p>

          </div>

        </div>


        {/* =====================================================
            STEP 06
        ===================================================== */}

        <div className="zd-learn-step">

          <div className="zd-step-number">
            6
          </div>


          <div className="zd-step-content">

            <strong>
              Copy your API Key
            </strong>

            <p>
              After the application is created,
              copy the API Key generated for
              your Zerodha application.
            </p>


            <div className="zd-value-box">

              <span>
                API Key
              </span>

              <strong>
                Copy your Zerodha API Key
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================================
            STEP 07
        ===================================================== */}

        <div className="zd-learn-step">

          <div className="zd-step-number">
            7
          </div>


          <div className="zd-step-content">

            <strong>
              Copy your API Secret
            </strong>

            <p>
              Copy the API Secret generated for
              the same Kite Connect application.
            </p>


            <div className="zd-value-box">

              <span>
                API Secret
              </span>

              <strong>
                Copy your Zerodha API Secret
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================================
            STEP 08
        ===================================================== */}

        <div className="zd-learn-step zd-last-step">

          <div className="zd-step-number zd-success">
            8
          </div>


          <div className="zd-step-content">

            <strong>
              Enter credentials in Tradebox
            </strong>

            <p>
              Return to Tradebox and paste your
              Zerodha API Key and API Secret into
              the corresponding fields.
            </p>


            <div className="zd-fields-box">

              <div>

                <span>
                  API Key
                </span>

                <strong>
                  Your Zerodha API Key
                </strong>

              </div>


              <div>

                <span>
                  API Secret
                </span>

                <strong>
                  Your Zerodha API Secret
                </strong>

              </div>

            </div>


            <div className="zd-flow-box">

              <span>
                API Key
              </span>

              <b>
                +
              </b>

              <span>
                API Secret
              </span>

              <b>
                →
              </b>

              <span>
                Tradebox
              </span>

            </div>

          </div>

        </div>


        {/* =====================================================
            SECURITY
        ===================================================== */}

        <div className="zd-learn-warning">

          <div className="zd-warning-icon">
            !
          </div>


          <div>

            <strong>
              Keep your API Secret private
            </strong>

            <p>
              Never share your API Secret publicly
              or commit it to GitHub.
            </p>

          </div>

        </div>


        {/* =====================================================
            DONE
        ===================================================== */}

        <button
          type="button"
          className="zd-learn-done"
          onClick={onClose}
        >
          Got it — Connect Zerodha
        </button>


      </div>

    </div>

  );
}


export default ZerodhaLearnMoreModal;