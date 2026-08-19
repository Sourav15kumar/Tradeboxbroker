import React from "react";
import { useNavigate } from "react-router-dom";
import zerodhaImage from "../assets/brokers/zerodha.png";
import "./BrokerSelection.css";

function BrokerSelection() {
  const navigate = useNavigate();

  const handleZerodha = () => {
    navigate("/login-with-api");
  };

  return (
    <div className="broker-page">

      <main className="broker-container">

        <section className="broker-header">

          <span className="broker-eyebrow">
            BROKER INTEGRATION
          </span>

          <h1>
            Select your broker
          </h1>

          <p>
            Connect your broker for seamless execution after your approval
          </p>

        </section>


        <section className="single-broker-section">

          <button
            type="button"
            className="zerodha-card"
            onClick={handleZerodha}
          >

            <div className="broker-image-box">

              <img
                src={zerodhaImage}
                alt="Zerodha"
              />

            </div>

            <div className="zerodha-content">

              <h2>
                Zerodha
              </h2>

              <p>
                Connect using Kite Connect API
              </p>

            </div>

            <div className="connect-arrow">
              →
            </div>

          </button>

        </section>


        <div className="secure-note">

          <span className="secure-icon">
            ✓
          </span>

          <span>
            Secure broker authentication 
          </span>

        </div>

      </main>

    </div>
  );
}

export default BrokerSelection;