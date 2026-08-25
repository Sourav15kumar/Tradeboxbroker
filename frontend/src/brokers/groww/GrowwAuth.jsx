import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import growwImage
  from "../../assets/brokers/groww.png";

import GrowwLearnMoreModal
  from "./GrowwLearnMoreModal";

import "./GrowwAuth.css";


function GrowwAuth() {

  const navigate = useNavigate();

  const [apiKey, setApiKey] =
    useState("");

  const [apiSecret, setApiSecret] =
    useState("");

  const [showSecret, setShowSecret] =
    useState(false);

  const [showLearnMore, setShowLearnMore] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleAuthenticate =
    async (e) => {

      e.preventDefault();

      setError("");


      if (!apiKey.trim()) {

        setError(
          "Please enter your Groww API Key."
        );

        return;
      }


      if (!apiSecret.trim()) {

        setError(
          "Please enter your Groww API Secret."
        );

        return;
      }


      try {

        setLoading(true);


        const response =
          await axios.post(
            "http://localhost:5000/api/groww/authenticate",
            {
              apiKey:
                apiKey.trim(),

              apiSecret:
                apiSecret.trim(),
            }
          );


        if (!response.data.success) {

          throw new Error(
            response.data.message ||
            "Groww authentication failed."
          );

        }


        console.log(
          "Groww connected successfully"
        );


      } catch (err) {

        console.error(
          "GROWW AUTH ERROR:",
          err
        );


        setError(
          err.response?.data?.message ||
          err.message ||
          "Groww authentication failed."
        );


      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="groww-auth-page">


      <header className="auth-header">

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/")
          }
        >
          <span>
            ←
          </span>

          Back to brokers
        </button>


        <div className="auth-brand">

          <div className="auth-brand-mark">
            T
          </div>

          <span>
            Tradebox
          </span>

        </div>


        <div className="auth-header-secure">

          <span />

          Secure connection

        </div>

      </header>


      <main className="auth-main">


        <div className="auth-card">


          {/* HEADER */}

          <div className="auth-card-header">


            <div className="groww-big-logo">

              <img
                src={growwImage}
                alt="Groww"
              />

            </div>


            <div className="auth-heading">


              <div className="broker-label">

                <span />

                GROWW

              </div>


              <h1>
                Connect your account
              </h1>


              <p>
                Enter your Groww API credentials
                to securely connect your Groww
                account with Tradebox.
              </p>


            </div>

          </div>


          {/* SECURITY */}

          <div className="security-box">


            <div className="security-box-icon">
              ✓
            </div>


            <div>

              <strong>
                Secure authentication
              </strong>

              <p>
                Your API Key and API Secret are
                sent to the Tradebox backend only
                for authentication.
              </p>

            </div>


          </div>


          {/* FORM */}

          <form
            onSubmit={handleAuthenticate}
            className="auth-form"
          >


            {/* API KEY */}

            <div className="field-group">


              <div className="label-row">

                <label>
                  API Key
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="premium-input">


                <div className="input-icon">
                  #
                </div>


                <input
                  type="text"
                  placeholder="Enter your Groww API Key"
                  value={apiKey}
                  onChange={(e) =>
                    setApiKey(
                      e.target.value
                    )
                  }
                  autoComplete="off"
                />


              </div>


            </div>


            {/* API SECRET */}

            <div className="field-group">


              <div className="label-row">

                <label>
                  API Secret
                </label>

                <span>
                  Required
                </span>

              </div>


              <div className="premium-input">


                <div className="input-icon">
                  •••
                </div>


                <input
                  type={
                    showSecret
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your Groww API Secret"
                  value={apiSecret}
                  onChange={(e) =>
                    setApiSecret(
                      e.target.value
                    )
                  }
                  autoComplete="new-password"
                />


                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowSecret(
                      !showSecret
                    )
                  }
                >
                  {showSecret
                    ? "Hide"
                    : "Show"}
                </button>


              </div>


            </div>


            {/* LEARN MORE */}

            <button
              type="button"
              className="learn-more-button"
              onClick={() =>
                setShowLearnMore(true)
              }
            >

              <span className="learn-icon">
                ?
              </span>


              <span>
                How do I get my API Key & Secret?
              </span>


              <span className="learn-arrow">
                →
              </span>

            </button>


            {/* ERROR */}

            {error && (

              <div className="auth-error">

                <span>
                  !
                </span>

                {error}

              </div>

            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="authenticate-button"
              disabled={loading}
            >

              <span>

                {loading
                  ? "Connecting..."
                  : "Authenticate with Groww"}

              </span>


              {!loading && (

                <span className="button-arrow">
                  →
                </span>

              )}

            </button>


          </form>


          <div className="auth-card-footer">

            <span className="footer-lock">
              🔒
            </span>

            <span>
              Authentication is handled through
              Groww's official API authentication
              flow.
            </span>

          </div>


        </div>


      </main>


      {showLearnMore && (

        <GrowwLearnMoreModal
          onClose={() =>
            setShowLearnMore(false)
          }
        />

      )}


    </div>

  );
}


export default GrowwAuth;