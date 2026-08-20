import React from "react";
import { useNavigate } from "react-router-dom";

import zerodhaImage from "../../assets/brokers/zerodha.png";
import growwImage from "../../assets/brokers/groww.png";
import upstoxImage from "../../assets/brokers/upstox.png";
import angelOneImage from "../../assets/brokers/angelone.png";
import kotakImage from "../../assets/brokers/kotak.png";
import iciciImage from "../../assets/brokers/icici.png";
import hdfcImage from "../../assets/brokers/hdfc.png";

import "./BrokerSelection.css";

function BrokerSelection() {
  const navigate = useNavigate();

  // ==========================================================
  // ZERODHA
  // ==========================================================

  const handleZerodha = () => {
    navigate("/login-with-api");
  };

  // ==========================================================
  // GROWW
  // ==========================================================

  const handleGroww = () => {
    navigate("/groww");
  };

  // ==========================================================
  // UPSTOX
  // ==========================================================

  const handleUpstox = () => {
    navigate("/upstox");
  };

  // ==========================================================
  // ANGEL ONE
  // ==========================================================

  const handleAngelOne = () => {
    navigate("/angelone");
  };

  // ==========================================================
  // KOTAK NEO
  // ==========================================================

  const handleKotak = () => {
    navigate("/kotak");
  };

  // ==========================================================
  // ICICI DIRECT
  // ==========================================================

  const handleIcici = () => {
    navigate("/icici");
  };

 // ==========================================================
  // HDFC BANK
  // ==========================================================
  const handleHdfc = () => {
  navigate("/hdfc");
};
  return (
    <div className="broker-page">
      <main className="broker-container">

        {/* ==================================================
            HEADER
        ================================================== */}

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

        {/* ==================================================
            BROKER CARDS
        ================================================== */}

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
              <h2>Zerodha</h2>

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
              <h2>Groww</h2>

              <p>
                Connect using Groww Trade API
              </p>
            </div>

            <div className="connect-arrow">
              →
            </div>
          </button>

          {/* UPSTOX */}

          <button
            type="button"
            className="broker-card"
            onClick={handleUpstox}
          >
            <div className="broker-image-box">
              <img
                src={upstoxImage}
                alt="Upstox"
              />
            </div>

            <div className="broker-content">
              <h2>Upstox</h2>

              <p>
                Connect using Upstox API
              </p>
            </div>

            <div className="connect-arrow">
              →
            </div>
          </button>

          {/* ANGEL ONE */}

          <button
            type="button"
            className="broker-card"
            onClick={handleAngelOne}
          >
            <div className="broker-image-box">
              <img
                src={angelOneImage}
                alt="Angel One"
              />
            </div>

            <div className="broker-content">
              <h2>Angel One</h2>

              <p>
                Connect using Angel One SmartAPI
              </p>
            </div>

            <div className="connect-arrow">
              →
            </div>
          </button>

          {/* KOTAK NEO */}

          <button
            type="button"
            className="broker-card"
            onClick={handleKotak}
          >
            <div className="broker-image-box">
              <img
                src={kotakImage}
                alt="Kotak Neo"
              />
            </div>

            <div className="broker-content">
              <h2>Kotak Neo</h2>

              <p>
                Connect using Kotak Neo Trade API
              </p>
            </div>

            <div className="connect-arrow">
              →
            </div>
          </button>

          {/* ICICI DIRECT */}

          <button
            type="button"
            className="broker-card"
            onClick={handleIcici}
          >
            <div className="broker-image-box">
              <img
                src={iciciImage}
                alt="ICICI Direct"
              />
            </div>

            <div className="broker-content">
              <h2>ICICI Direct</h2>

              <p>
                Connect using ICICI Breeze API
              </p>
            </div>

            <div className="connect-arrow">
              →
            </div>
          </button>



{/* hdfc start here */}

  <button
  type="button"
  className="broker-card"
  onClick={handleHdfc}
>

  <div className="broker-image-box">

    <img
      src={hdfcImage}
      alt="HDFC SKY"
    />

  </div>


  <div className="broker-content">

    <h2>
      HDFC SKY
    </h2>

    <p>
      Connect using HDFC SKY Open API
    </p>

  </div>


  <div className="connect-arrow">
    →
  </div>

</button>

        </section>

        {/* ==================================================
            SECURITY
        ================================================== */}

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