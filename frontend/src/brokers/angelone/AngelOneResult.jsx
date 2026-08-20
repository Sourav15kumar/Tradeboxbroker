import React from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";


function AngelOneResult() {

  const navigate =
    useNavigate();


  const [
    searchParams,
  ] =
    useSearchParams();


  const status =
    searchParams.get(
      "status"
    );


  const message =
    searchParams.get(
      "message"
    );


  const success =
    status === "success";


  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "#f7f8fa",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        padding: "20px",

        fontFamily:
          "Inter, Arial, sans-serif",
      }}
    >

      <div
        style={{
          width: "100%",

          maxWidth:
            "450px",

          background:
            "white",

          border:
            "1px solid #e5e7eb",

          borderRadius:
            "22px",

          padding:
            "40px",

          textAlign:
            "center",

          boxShadow:
            "0 25px 70px rgba(15,23,42,0.09)",
        }}
      >

        <div
          style={{
            width:
              "60px",

            height:
              "60px",

            margin:
              "0 auto 20px",

            borderRadius:
              "50%",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            fontSize:
              "28px",

            background:
              success
                ? "#ecfdf3"
                : "#fff1f2",

            color:
              success
                ? "#16a34a"
                : "#be123c",
          }}
        >

          {success
            ? "✓"
            : "!"}

        </div>


        <h2>

          {success
            ? "Angel One Connected"
            : "Connection Failed"}

        </h2>


        <p
          style={{
            color:
              "#7b8493",

            lineHeight:
              1.6,
          }}
        >

          {message ||
            "Unable to complete Angel One authentication."}

        </p>


        {success && (

          <p
            style={{
              fontSize:
                "12px",

              color:
                "#9aa1ad",
            }}
          >

            Your Angel One authentication
            token was received securely
            by the Tradebox backend.

          </p>

        )}


        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
          style={{
            marginTop:
              "20px",

            width:
              "100%",

            height:
              "48px",

            border:
              0,

            borderRadius:
              "12px",

            background:
              "#111827",

            color:
              "white",

            cursor:
              "pointer",

            fontWeight:
              "700",
          }}
        >

          Back to brokers

        </button>

      </div>

    </div>

  );
}


export default AngelOneResult;