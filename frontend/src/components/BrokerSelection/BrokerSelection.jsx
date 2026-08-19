import React from "react";
import { useNavigate } from "react-router-dom";

import zerodhaImage from "../../assets/brokers/zerodha.png";
import growwImage from "../../assets/brokers/groww.png";

import "./BrokerSelection.css";

function BrokerSelection() {

  const navigate = useNavigate();

  const handleZerodha = () => {
    navigate("/login-with-api");
  };

  const handleGroww = () => {
    navigate("/groww");
  };

  return (
    <div className="broker-page">

      <main className="broker-container">

        {/* HEADER */}

        <section className="broker-header">

          <span className="broker-eyebrow">
            BROKER INTEGRATION
          </span>

          <h1>
            Select your broker
          </h1>

          <p>
            Connect your broker for seamless execution
            after your approval
          </p>

        </section>


        {/* BROKERS */}

        <section className="broker-grid">


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
              />

            </div>

            <div className="broker-content">

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


          {/* GROWW */}

          <button
            type="button"
            className="broker-card"
            onClick={handleGroww}
          >

            <div className="broker-image-box">

              <img
                src={growwImage}
                alt="Groww"
              />

            </div>

            <div className="broker-content">

              <h2>
                Groww
              </h2>

              <p>
                Connect using Groww Trade API
              </p>

            </div>

            <div className="connect-arrow">
              →
            </div>

          </button>


        </section>


        {/* SECURITY */}

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