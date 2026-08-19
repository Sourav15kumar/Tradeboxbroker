import "./LearnMoreModal.css";

function LearnMoreModal({ onClose }) {
  return (
    <div
      className="learn-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="learn-modal">

        {/* HEADER */}
        <div className="learn-modal-header">

          <div>
            <div className="learn-eyebrow">
              ZERODHA
            </div>

            <h2>
              How to get your API Key & Secret
            </h2>

            <p>
              Follow these steps to create your
              Kite Connect application and connect
              it with Tradebox.
            </p>
          </div>

          <button
            type="button"
            className="close-learn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* OFFICIAL LINK */}
        <a
          href="https://developers.kite.trade/"
          target="_blank"
          rel="noreferrer"
          className="official-link-card"
        >
          <div>
            <strong>
              Open Zerodha Kite Connect
            </strong>

            <span>
              Official developer portal
            </span>
          </div>

          <span className="official-arrow">
            ↗
          </span>
        </a>

        {/* STEPS */}
        <div className="learn-steps">

          {/* STEP 01 */}
          <div className="learn-step">

            <div className="step-number">
              01
            </div>

            <div className="step-content">

              <h3>
                Open Kite Connect
              </h3>

              <p>
                Open the official Zerodha Kite Connect
                developer portal and sign in with your
                Zerodha account.
              </p>

              <a
                href="https://developers.kite.trade/"
                target="_blank"
                rel="noreferrer"
                className="step-link"
              >
                Open Developer Portal ↗
              </a>

            </div>
          </div>

          {/* STEP 02 */}
          <div className="learn-step">

            <div className="step-number">
              02
            </div>

            <div className="step-content">

              <h3>
                Create a new application
              </h3>

              <p>
                From your Kite Connect dashboard,
                create a new application for API access.
              </p>

            </div>
          </div>

          {/* STEP 03 */}
          <div className="learn-step">

            <div className="step-number">
              03
            </div>

            <div className="step-content">

              <h3>
                Select the Connect application
              </h3>

              <p>
                Choose the Connect application type
                and complete the required application
                details.
              </p>

            </div>
          </div>

          {/* STEP 04 */}
          <div className="learn-step">

            <div className="step-number">
              04
            </div>

            <div className="step-content">

              <h3>
                Copy your API Key
              </h3>

              <p>
                Open your application details and copy
                the API Key generated for your application.
              </p>

              <div className="credential-example">
                <span>
                  API Key
                </span>

                <strong>
                  Your Zerodha API Key
                </strong>
              </div>

            </div>
          </div>

          {/* STEP 05 */}
          <div className="learn-step">

            <div className="step-number">
              05
            </div>

            <div className="step-content">

              <h3>
                Copy your API Secret
              </h3>

              <p>
                Copy the API Secret associated with
                the same Kite Connect application.
              </p>

              <div className="credential-example">
                <span>
                  API Secret
                </span>

                <strong>
                  Your Zerodha API Secret
                </strong>
              </div>

            </div>
          </div>

          {/* STEP 06 */}
          <div className="learn-step">

            <div className="step-number">
              06
            </div>

            <div className="step-content">

              <h3>
                Configure Redirect URL
              </h3>

              <p>
                Configure the redirect URL required by
                your Tradebox backend in the Zerodha
                application settings.
              </p>

              <div className="credential-example">
                <span>
                  Redirect URL
                </span>

                <strong>
                  Your Tradebox callback URL
                </strong>
              </div>

            </div>
          </div>

          {/* STEP 07 */}
          <div className="learn-step">

            <div className="step-number">
              07
            </div>

            <div className="step-content">

              <h3>
                Enter credentials in Tradebox
              </h3>

              <p>
                Return to Tradebox and enter your
                Zerodha API Key and API Secret in
                the corresponding fields.
              </p>

            </div>
          </div>

          {/* STEP 08 */}
          <div className="learn-step last-step">

            <div className="step-number success">
              08
            </div>

            <div className="step-content">

              <h3>
                Authenticate with Zerodha
              </h3>

              <p>
                Click Authenticate with Zerodha.
                Tradebox will start the official
                Zerodha authentication flow.
              </p>

              <div className="flow-box">

                <span>
                  Tradebox
                </span>

                <b>→</b>

                <span>
                  Zerodha Login
                </span>

                <b>→</b>

                <span>
                  Connected
                </span>

              </div>

            </div>
          </div>

        </div>

        {/* SECURITY */}
        <div className="learn-security">

          <div className="learn-security-icon">
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

        {/* FOOTER */}
        <div className="learn-modal-footer">

          <span>
            Need more information?
          </span>

          <a
            href="https://kite.trade/docs/connect/v3/"
            target="_blank"
            rel="noreferrer"
          >
            View official documentation ↗
          </a>

        </div>

        <button
          type="button"
          className="learn-modal-done"
          onClick={onClose}
        >
          Got it
        </button>

      </div>
    </div>
  );
}

export default LearnMoreModal;