function GrowwLearnMoreModal({ onClose }) {
  const GROW_W_API_KEYS_URL =
    "https://groww.in/trade-api/api-keys";

  return (
    <div
      className="learn-modal-overlay"
      onClick={onClose}
    >
      <div
        className="learn-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close */}
        <button
          type="button"
          className="learn-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* Icon */}
        <div className="learn-modal-icon">
          G
        </div>

        {/* Heading */}
        <div className="learn-modal-label">
          GROWW AUTHENTICATION
        </div>

        <h2>
          Get your TOTP Token & Code
        </h2>

        <p className="learn-modal-description">
          Follow these simple steps to create your
          Groww TOTP credentials and connect your
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
              Open Groww Cloud API Keys
            </strong>

            <p>
              Log in to your Groww account and open
              the official Trading API / Cloud API
              Keys page.
            </p>

            <a
              href={GROW_W_API_KEYS_URL}
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
              Generate a TOTP Token
            </strong>

            <p>
              Click the dropdown next to
              <b> Generate API Key </b>
              and select
              <b> Generate TOTP token </b>.
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
              Create your TOTP credentials
            </strong>

            <p>
              Enter a name for your token, such as
              <b> Tradebox </b>
              and continue. Groww will provide your
              TOTP Token and TOTP Secret, along with
              a QR code.
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
              Set up your authenticator
            </strong>

            <p>
              Scan the QR code using a compatible
              third-party authenticator app, or
              manually add the TOTP Secret.
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
              Get your 6-digit TOTP Code
            </strong>

            <p>
              Your authenticator app will generate
              a changing 6-digit code. Enter the
              current code in the
              <b> TOTP Code </b>
              field on Tradebox.
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
              Enter both credentials
            </strong>

            <p>
              Copy your Groww
              <b> TOTP Token </b>
              into the first field and enter the
              current 6-digit
              <b> TOTP Code </b>
              into the second field.
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
              Authenticate with Groww
            </strong>

            <p>
              Click
              <b> Authenticate with Groww </b>.
              Tradebox will securely send the
              credentials to the backend, which will
              request an access token from Groww.
            </p>

          </div>

        </div>

        {/* ======================================
            FLOW BOX
        ====================================== */}

        <div className="groww-auth-flow">

          <div className="flow-title">
            Authentication flow
          </div>

          <div className="flow-item">
            <span>1</span>
            TOTP Token
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>2</span>
            6-digit TOTP Code
          </div>

          <div className="flow-arrow">
            ↓
          </div>

          <div className="flow-item">
            <span>3</span>
            Groww Authentication
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
            WARNING
        ====================================== */}

        <div className="learn-warning">

          <span>
            🔐
          </span>

          <p>
            Never share your TOTP Token, TOTP Secret
            or Access Token with anyone. Your
            authenticator code changes periodically,
            so always enter the latest 6-digit code.
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