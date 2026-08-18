import React from "react";
import { useNavigate } from "react-router-dom";
import zerodhaImage from "../assets/brokers/zerodha.png";
import "./ApiBrokerLogin.css";

function ApiBrokerLogin() {
  const navigate = useNavigate();

  // ZERODHA
  const handleZerodha = () => {
    navigate("/zerodha/login");
  };

  return (
    <div className="api-broker-page">

      <header className="api-header">

        <div className="tradebox-brand">
          <div className="tradebox-logo">
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

        <div className="security-label">
          <span></span>
          Secure & Encrypted
        </div>

      </header>


      <main className="api-main">

        <section className="api-hero">

          <div className="eyebrow">
            BROKER AUTHENTICATION
          </div>

          <h1>
            Authenticate with API Key
          </h1>

          <p>
            Select your broker to securely connect your
            trading account with Tradebox.
          </p>

        </section>


        <section className="broker-panel">

          <div className="panel-heading">

            <h2>
              Select your broker
            </h2>

            <p>
              Choose your broker to continue with API authentication.
            </p>

          </div>


          <div className="broker-grid">

            {/* ZERODHA */}

            <button
              type="button"
              className="broker-card"
              onClick={handleZerodha}
            >

              <div className="broker-image-box">

                <img
                  src={zerodhaImage}
                  alt="Zerodha"
                  className="broker-image"
                />

              </div>


              <div className="broker-info">

                <div>
                  <h3>
                    Zerodha
                  </h3>

                  <span className="broker-status">
                    Available
                  </span>
                </div>


                <span className="broker-action">
                  Connect
                  <span className="arrow">
                    →
                  </span>
                </span>

              </div>

            </button>


            {/* 5PAISA */}

            <div className="broker-card upcoming">

              <div className="broker-image-box empty-image">
                +
              </div>

              <div className="broker-info">

                <div>
                  <h3>
                    5Paisa
                  </h3>

                  <span className="broker-status muted">
                    Coming Soon
                  </span>
                </div>

              </div>

            </div>


            {/* DHAN */}

            <div className="broker-card upcoming">

              <div className="broker-image-box empty-image">
                +
              </div>

              <div className="broker-info">

                <div>
                  <h3>
                    Dhan
                  </h3>

                  <span className="broker-status muted">
                    Coming Soon
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>


        <div className="api-security-note">

          <div className="security-check">
            ✓
          </div>

          <div>
            <strong>
              Secure API authentication
            </strong>

            <p>
              Your broker credentials are securely handled
              through the Tradebox backend.
            </p>
          </div>

        </div>

      </main>


      <footer className="api-footer">
        Tradebox · Secure broker connectivity
      </footer>

    </div>
  );
}

export default ApiBrokerLogin;