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
  // HDFC SKY
  // ==========================================================

  const handleHdfc = () => {
    navigate("/hdfc");
  };


  // ==========================================================
  // JM FINANCIAL
  // ==========================================================

  const handleJMFinancial = () => {
    navigate("/jmfinancial");
  };


  // ==========================================================
  // FYERS
  // ==========================================================

  const handleFyers = () => {
    navigate("/fyers");
  };


  // ==========================================================
  // MOTILAL OSWAL
  // ==========================================================

  const handleMotilal = () => {
    navigate("/motilal");
  };


  // ==========================================================
  // ANAND RATHI
  // ==========================================================

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
            Connect your broker for seamless execution
            after your approval
          </p>

        </section>


        {/* ==================================================
            BROKER CARDS
        ================================================== */}

        <section className="broker-grid">


          {/* ==================================================
              ZERODHA
          ================================================== */}

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

           

          </button>


          {/* ==================================================
              GROWW
          ================================================== */}

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

           

          </button>


          {/* ==================================================
              UPSTOX
          ================================================== */}

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

              <h2>
                Upstox
              </h2>

              <p>
                Connect using Upstox API
              </p>

            </div>

           

          </button>

           {/* ==================================================
              FYERS
          ================================================== */}

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

              <h2>
                FYERS
              </h2>

              <p>
                Connect using FYERS Trading API
              </p>

            </div>

            

          </button>

          {/* ==================================================
              ANGEL ONE
          ================================================== */}

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

              <h2>
                Angel One
              </h2>

              <p>
                Connect using Angel One SmartAPI
              </p>

            </div>

           

          </button>


          {/* ==================================================
              KOTAK NEO
          ================================================== */}

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

              <h2>
                Kotak Neo
              </h2>

              <p>
                Connect using Kotak Neo Trade API
              </p>

            </div>

            

          </button>


          {/* ==================================================
              ICICI DIRECT
          ================================================== */}

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

              <h2>
                ICICI Direct
              </h2>

              <p>
                Connect using ICICI Breeze API
              </p>

            </div>

          

          </button>


          {/* ==================================================
              HDFC SKY
          ================================================== */}

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

           

          </button>


          {/* ==================================================
              JM FINANCIAL
          ================================================== */}

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

              <h2>
                JM Financial
              </h2>

              <p>
                Connect using JM Financial XTS API
              </p>

            </div>

          

          </button>


         

          {/* ==================================================
              MOTILAL OSWAL
          ================================================== */}

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

              <h2>
                Motilal Oswal
              </h2>

              <p>
                Connect using Motilal Oswal Trading API
              </p>

            </div>

           

          </button>


          {/* ==================================================
              ANAND RATHI
          ================================================== */}

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

              <h2>
                Anand Rathi
              </h2>

              <p>
                Connect using Interactive Order API
              </p>

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