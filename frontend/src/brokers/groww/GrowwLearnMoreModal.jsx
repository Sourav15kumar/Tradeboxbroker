import growwImage
  from "../../assets/brokers/groww.png";


function GrowwLearnMoreModal({ onClose }) {

  const GROWW_API_KEYS_URL =
    "https://groww.in/trade-api/api-keys";


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


        {/* CLOSE */}

        <button
          type="button"
          className="learn-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>


        {/* GROWW IMAGE */}

        <div
          className="learn-modal-icon"
          style={{
            padding: "6px",
            overflow: "hidden",
          }}
        >

          <img
            src={growwImage}
            alt="Groww"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              borderRadius: "8px",
            }}
          />

        </div>


        {/* HEADING */}

        <div className="learn-modal-label">
          GROWW API AUTHENTICATION
        </div>


        <h2>
          Get your API Key & API Secret
        </h2>


        <p className="learn-modal-description">
          Follow these simple steps to create your
          Groww API credentials and connect your
          account securely with Tradebox.
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
              Open Groww Cloud API Keys
            </strong>

            <p>
              Log in to your Groww account and open
              the official Groww Trading API / Cloud
              API Keys page.
            </p>


            <a
              href={GROWW_API_KEYS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-link"
            >
              Open Groww API Keys →
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
              Generate an API Key
            </strong>

            <p>
              From the Groww Cloud API Keys page,
              choose the option to generate a new
              API Key for your Tradebox connection.
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
              Enter your API key name
            </strong>

            <p>
              When Groww asks for a name for your
              API Key, use the Tradebox naming
              convention below.
            </p>


            <div
              style={{
                marginTop: "10px",
                padding: "10px 12px",
                border: "1px solid #dfe3e8",
                borderRadius: "9px",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >

              <span
                style={{
                  color: "#98a2b3",
                  fontSize: "9px",
                }}
              >
                API Key Name
              </span>


              <strong
                style={{
                  color: "#374151",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                RA-Tradebox
              </strong>

            </div>


            <p
              style={{
                marginTop: "7px",
                color: "#98a2b3",
                fontSize: "9px",
              }}
            >
              This is a Tradebox naming convention
              to easily identify your Groww API Key.
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
              Create the API credentials
            </strong>

            <p>
              Complete the required details and
              generate your Groww API credentials.
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
              Copy your API Key
            </strong>

            <p>
              Copy the API Key generated by Groww
              for your Tradebox connection.
            </p>


            <div
              style={{
                marginTop: "10px",
                padding: "10px 12px",
                border: "1px solid #dfe3e8",
                borderRadius: "9px",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >

              <span
                style={{
                  color: "#98a2b3",
                  fontSize: "9px",
                }}
              >
                API Key
              </span>


              <strong
                style={{
                  color: "#374151",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                Copy your Groww API Key
              </strong>

            </div>

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
              Copy your API Secret
            </strong>

            <p>
              Copy the API Secret belonging to the
              same Groww API Key.
            </p>


            <div
              style={{
                marginTop: "10px",
                padding: "10px 12px",
                border: "1px solid #dfe3e8",
                borderRadius: "9px",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >

              <span
                style={{
                  color: "#98a2b3",
                  fontSize: "9px",
                }}
              >
                API Secret
              </span>


              <strong
                style={{
                  color: "#374151",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                Copy your Groww API Secret
              </strong>

            </div>

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
              Complete Groww approval
            </strong>

            <p>
              If Groww asks for approval for the
              API Key, complete the required approval
              from the Groww Cloud API Keys page
              before authenticating from Tradebox.
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
              Enter credentials in Tradebox
            </strong>

            <p>
              Return to Tradebox and paste your
              Groww
              <b> API Key </b>
              into the first field and your
              <b> API Secret </b>
              into the second field.
            </p>


            <div
              style={{
                marginTop: "10px",
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "11px",
                background: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                gap: "9px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >

                <span
                  style={{
                    color: "#98a2b3",
                    fontSize: "9px",
                  }}
                >
                  API Key
                </span>

                <strong
                  style={{
                    color: "#475467",
                    fontSize: "9px",
                  }}
                >
                  Your Groww API Key
                </strong>

              </div>


              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >

                <span
                  style={{
                    color: "#98a2b3",
                    fontSize: "9px",
                  }}
                >
                  API Secret
                </span>

                <strong
                  style={{
                    color: "#475467",
                    fontSize: "9px",
                  }}
                >
                  Your Groww API Secret
                </strong>

              </div>

            </div>

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
              Authenticate with Groww
            </strong>

            <p>
              Click
              <b> Authenticate with Groww </b>
              to securely send your API Key and
              API Secret to the Tradebox backend.
            </p>

          </div>

        </div>


        {/* ======================================
            WARNING
        ====================================== */}

        <div className="learn-warning">

          <span>
            🔐
          </span>

          <p>
            Never share your Groww API Secret
            publicly or commit it to GitHub.
            Tradebox sends the API credentials
            to the backend only for authentication.
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
          Got it — Connect Groww
        </button>


      </div>

    </div>
  );
}


export default GrowwLearnMoreModal;