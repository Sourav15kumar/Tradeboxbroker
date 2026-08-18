import "./BrokerSelection.css";

function BrokerLogo({ type }) {
  if (type === "zerodha") {
    return (
      <div className="broker-logo zerodha-logo">
        <span>Z</span>
      </div>
    );
  }

  if (type === "dhan") {
    return (
      <div className="broker-logo dhan-logo">
        <span>D</span>
      </div>
    );
  }

  if (type === "fivepaisa") {
    return (
      <div className="broker-logo fivepaisa-logo">
        <span>5P</span>
      </div>
    );
  }

  if (type === "groww") {
    return (
      <div className="broker-logo groww-logo">
        <span>G</span>
      </div>
    );
  }

  if (type === "upstox") {
    return (
      <div className="broker-logo upstox-logo">
        <span>U</span>
      </div>
    );
  }

  if (type === "angel") {
    return (
      <div className="broker-logo angel-logo">
        <span>A</span>
      </div>
    );
  }

  return null;
}

function BrokerSelection({
  onBrokerSelect,
}) {
  const brokers = [
    {
      id: "zerodha",
      name: "Zerodha",
      description:
        "Connect using Kite Connect API",
      available: true,
    },
    {
      id: "dhan",
      name: "Dhan",
      description:
        "Connect your Dhan trading account",
      available: false,
    },
    {
      id: "fivepaisa",
      name: "5paisa",
      description:
        "Connect using 5paisa APIs",
      available: false,
    },
    {
      id: "groww",
      name: "Groww",
      description:
        "Connect your Groww account",
      available: false,
    },
    {
      id: "upstox",
      name: "Upstox",
      description:
        "Connect using Upstox API",
      available: false,
    },
    {
      id: "angel",
      name: "Angel One",
      description:
        "Connect using SmartAPI",
      available: false,
    },
  ];

  return (
    <div className="broker-page">

      {/* Background */}

      <div className="page-grid" />

      <div className="glow glow-left" />
      <div className="glow glow-right" />

      {/* Header */}

      <header className="top-header">

        <div className="tradebox-brand">

          <div className="tradebox-mark">
            T
          </div>

          <div>
            <div className="tradebox-name">
              Tradebox
            </div>

            <div className="tradebox-subtitle">
              Broker Integration
            </div>
          </div>

        </div>

        <div className="secure-pill">
          <span className="secure-dot" />
          Secure API Authentication
        </div>

      </header>

      {/* Main */}

      <main className="broker-main">

        <section className="hero-section">

          <div className="eyebrow">
            <span className="eyebrow-line" />
            BROKER CONNECTION
          </div>

          <h1>
            Login with
            <span> API Key</span>
          </h1>

          <p className="hero-description">
            Connect your trading account securely
            using your broker's API credentials.
            Select your broker to continue.
          </p>

        </section>

        {/* Broker cards */}

        <section className="broker-grid">

          {brokers.map((broker) => (

            <button
              key={broker.id}
              className={`broker-card ${
                broker.available
                  ? "broker-active"
                  : "broker-disabled"
              }`}
              onClick={() => {
                if (broker.available) {
                  onBrokerSelect(
                    broker.id
                  );
                }
              }}
              disabled={!broker.available}
            >

              <div className="card-top">

                <BrokerLogo
                  type={broker.id}
                />

                {broker.available ? (
                  <span className="available-badge">
                    <span />
                    Available
                  </span>
                ) : (
                  <span className="coming-badge">
                    Coming Soon
                  </span>
                )}

              </div>

              <div className="broker-info">

                <h3>
                  {broker.name}
                </h3>

                <p>
                  {broker.description}
                </p>

              </div>

              {broker.available && (
                <div className="card-action">
                  <span>
                    Connect
                  </span>

                  <span className="arrow">
                    →
                  </span>
                </div>
              )}

            </button>

          ))}

        </section>

        {/* Security */}

        <section className="security-banner">

          <div className="security-icon">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3L20 6V11C20 16.2 16.6 20.3 12 21C7.4 20.3 4 16.2 4 11V6L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <path
                d="M8.8 12L11 14.2L15.5 9.7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <strong>
              Your credentials stay protected
            </strong>

            <p>
              Authentication is processed through
              the broker's official API flow.
            </p>
          </div>

        </section>

      </main>

      <footer className="page-footer">
        © 2026 Tradebox · Secure Broker Integration
      </footer>

    </div>
  );
}

export default BrokerSelection;