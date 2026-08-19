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
              Kite Connect application.
            </p>

          </div>

          <button
            type="button"
            className="close-learn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="learn-steps">

          <div className="learn-step">
            <div className="step-number">01</div>

            <div className="step-content">

              <h3>
                Open Kite Connect
              </h3>

              <p>
                Sign in to the official Zerodha
                Kite Connect developer platform.
              </p>

              <a
                href="https://developers.kite.trade/"
                target="_blank"
                rel="noreferrer"
                className="official-link"
              >
                Open Kite Connect
                <span>↗</span>
              </a>

            </div>
          </div>

          <div className="learn-step">
            <div className="step-number">02</div>

            <div className="step-content">

              <h3>
                Create an application
              </h3>

              <p>
                Create a new Kite Connect
                application from your developer
                dashboard.
              </p>

            </div>
          </div>

          <div className="learn-step">
            <div className="step-number">03</div>

            <div className="step-content">

              <h3>
                Select Connect
              </h3>

              <p>
                Select the Connect application
                type for API access.
              </p>

            </div>
          </div>

          <div className="learn-step">
            <div className="step-number">04</div>

            <div className="step-content">

              <h3>
                Copy your API Key
              </h3>

              <p>
                Open your application details and
                copy the API Key.
              </p>

              <div className="credential-example">
                <span>API Key</span>
                <strong>Your API Key</strong>
              </div>

            </div>
          </div>

          <div className="learn-step">
            <div className="step-number">05</div>

            <div className="step-content">

              <h3>
                Copy your API Secret
              </h3>

              <p>
                Copy the API Secret associated
                with your application.
              </p>

              <div className="credential-example">
                <span>API Secret</span>
                <strong>Your API Secret</strong>
              </div>

            </div>
          </div>

          <div className="learn-step">
            <div className="step-number">06</div>

            <div className="step-content">

              <h3>
                Configure Redirect URL
              </h3>

              <p>
                Add your Tradebox backend callback
                URL to the Zerodha application.
              </p>

              <div className="credential-example">
                <span>Redirect URL</span>
                <strong>Your configured callback URL</strong>
              </div>

            </div>
          </div>

          <div className="learn-step">
            <div className="step-number">07</div>

            <div className="step-content">

              <h3>
                Enter credentials in Tradebox
              </h3>

              <p>
                Return to Tradebox, enter your API
                Key and API Secret and authenticate.
              </p>

            </div>
          </div>

        </div>

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

      </div>
    </div>
  );
}

export default LearnMoreModal;