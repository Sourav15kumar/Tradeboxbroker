import React from "react";
import { useNavigate } from "react-router-dom";

import zerodhaImage from "../../assets/brokers/zerodha.png";
import growwImage from "../../assets/brokers/groww.png";
import upstoxImage from "../../assets/brokers/upstox.png";
import angelOneImage from "../../assets/brokers/angelone.png";
import kotakImage from "../../assets/brokers/kotak.png";
import iciciImage from "../../assets/brokers/icici.png";
import hdfcImage from "../../assets/brokers/hdfc.png";
import jmFinancialImage from "../../assets/brokers/jmfinancial.png";
import fyersImage from "../../assets/brokers/fyers.png";
import motilalImage from "../../assets/brokers/motilal.png";
import anandRathiImage from "../../assets/brokers/anandrathi.png";

import aliceBlueImage from "../../assets/brokers/aliceblue.png";
import bigulImage from "../../assets/brokers/bigul.png";
import fivePaisaImage from "../../assets/brokers/5paisa.png";
import dhanImage from "../../assets/brokers/dhan.png";

import "./BrokerSelection.css";


function BrokerSelection() {

  const navigate = useNavigate();


  // ==========================================================
  // DIRECT METHOD
  // ==========================================================

  const handleAliceBlue = () => {
    navigate("/aliceblue");
  };

  const handleBigul = () => {
    navigate("/bigul");
  };

  const handleFivePaisa = () => {
    navigate("/5paisa");
  };

  const handleDhan = () => {
    navigate("/dhan");
  };


  // ==========================================================
  // API KEY METHOD
  // ==========================================================

  const handleZerodha = () => {
    navigate("/login-with-api");
  };

  const handleGroww = () => {
    navigate("/groww");
  };

  const handleUpstox = () => {
    navigate("/upstox");
  };

  const handleFyers = () => {
    navigate("/fyers");
  };

  const handleAngelOne = () => {
    navigate("/angelone");
  };

  const handleKotak = () => {
    navigate("/kotak");
  };

  const handleIcici = () => {
    navigate("/icici");
  };

  const handleHdfc = () => {
    navigate("/hdfc");
  };

  const handleJMFinancial = () => {
    navigate("/jmfinancial");
  };

  const handleMotilal = () => {
    navigate("/motilal");
  };

  const handleAnandRathi = () => {
    navigate("/anandrathi");
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
            Connect your broker for seamless execution after your approval
          </p>

        </section>


        {/* ==================================================
            DIRECT METHOD
        ================================================== */}

        <section className="broker-section">

          <div className="broker-section-heading">

            <h2>
              Direct Method
            </h2>

            <p>
              Connect directly with your supported broker
            </p>

          </div>


          <div className="direct-grid">


            {/* ALICE BLUE */}

            <button
              type="button"
              className="broker-card direct-card"
              onClick={handleAliceBlue}
            >

              <div className="broker-image-box direct-image-box">

                <img
                  src={aliceBlueImage}
                  alt="Alice Blue"
                />

              </div>

              <div className="broker-content">

                <h3>
                  Alice Blue
                </h3>

                <p>
                  Connect directly with Alice Blue
                </p>

              </div>

            </button>


            {/* BIGUL */}

            <button
              type="button"
              className="broker-card direct-card"
              onClick={handleBigul}
            >

              <div className="broker-image-box direct-image-box">

                <img
                  src={bigulImage}
                  alt="Bigul"
                />

              </div>

              <div className="broker-content">

                <h3>
                  Bigul
                </h3>

                <p>
                  Connect directly with Bigul
                </p>

              </div>

            </button>


            {/* 5PAISA */}

            <button
              type="button"
              className="broker-card direct-card"
              onClick={handleFivePaisa}
            >

              <div className="broker-image-box direct-image-box">

                <img
                  src={fivePaisaImage}
                  alt="5paisa"
                />

              </div>

              <div className="broker-content">

                <h3>
                  5paisa
                </h3>

                <p>
                  Connect directly with 5paisa
                </p>

              </div>

            </button>


            {/* DHAN */}

            <button
              type="button"
              className="broker-card direct-card"
              onClick={handleDhan}
            >

              <div className="broker-image-box direct-image-box">

                <img
                  src={dhanImage}
                  alt="Dhan"
                />

              </div>

              <div className="broker-content">

                <h3>
                  Dhan
                </h3>

                <p>
                  Connect directly with Dhan
                </p>

              </div>

            </button>

          </div>

        </section>


        {/* ==================================================
            API KEY METHOD
        ================================================== */}

        <section className="broker-section api-section">

          <div className="broker-section-heading">

            <h2>
              API Key Method
            </h2>

            <p>
              Connect using your broker API credentials
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
                />

              </div>

              <div className="broker-content">

                <h3>
                  Zerodha
                </h3>

                <p>
                  Connect using Kite Connect API
                </p>

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

                <h3>
                  Groww
                </h3>

                <p>
                  Connect using Groww Trade API
                </p>

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

                <h3>
                  Upstox
                </h3>

                <p>
                  Connect using Upstox API
                </p>

              </div>

            </button>


            {/* FYERS */}

            <button
              type="button"
              className="broker-card"
              onClick={handleFyers}
            >

              <div className="broker-image-box">

                <img
                  src={fyersImage}
                  alt="FYERS"
                />

              </div>

              <div className="broker-content">

                <h3>
                  FYERS
                </h3>

                <p>
                  Connect using FYERS Trading API
                </p>

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

                <h3>
                  Angel One
                </h3>

                <p>
                  Connect using Angel One SmartAPI
                </p>

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

                <h3>
                  Kotak Neo
                </h3>

                <p>
                  Connect using Kotak Neo Trade API
                </p>

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

                <h3>
                  ICICI Direct
                </h3>

                <p>
                  Connect using ICICI Breeze API
                </p>

              </div>

            </button>


            {/* HDFC SKY */}

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

                <h3>
                  HDFC SKY
                </h3>

                <p>
                  Connect using HDFC SKY Open API
                </p>

              </div>

            </button>


            {/* JM FINANCIAL */}

            <button
              type="button"
              className="broker-card"
              onClick={handleJMFinancial}
            >

              <div className="broker-image-box">

                <img
                  src={jmFinancialImage}
                  alt="JM Financial"
                />

              </div>

              <div className="broker-content">

                <h3>
                  JM Financial
                </h3>

                <p>
                  Connect using JM Financial XTS API
                </p>

              </div>

            </button>


            {/* MOTILAL OSWAL */}

            <button
              type="button"
              className="broker-card"
              onClick={handleMotilal}
            >

              <div className="broker-image-box">

                <img
                  src={motilalImage}
                  alt="Motilal Oswal"
                />

              </div>

              <div className="broker-content">

                <h3>
                  Motilal Oswal
                </h3>

                <p>
                  Connect using Motilal Oswal Trading API
                </p>

              </div>

            </button>


            {/* ANAND RATHI */}

            <button
              type="button"
              className="broker-card"
              onClick={handleAnandRathi}
            >

              <div className="broker-image-box">

                <img
                  src={anandRathiImage}
                  alt="Anand Rathi"
                />

              </div>

              <div className="broker-content">

                <h3>
                  Anand Rathi
                </h3>

                <p>
                  Connect using Interactive Order API
                </p>

              </div>

            </button>

          </div>

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