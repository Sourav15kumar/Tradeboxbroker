import React from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";


function IciciResult() {

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
        minHeight:
          "100vh",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          "#f7f8fa",

        padding:
          "20px",

        fontFamily:
          "Inter, Arial, sans-serif",
      }}
    >

      <div
        style={{
          width:
            "100%",

          maxWidth:
            "460px",

          padding:
            "40px",

          background:
            "white",

          borderRadius:
            "22px",

          textAlign:
            "center",

          border:
            "1px solid #e5e7eb",
        }}
      >

        <div
          style={{
            width:
              "60px",

            height:
              "60px",

            margin:
              "0 auto 18px",

            borderRadius:
              "50%",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            background:
              success
                ? "#ecfdf3"
                : "#fff1f2",

            color:
              success
                ? "#16a34a"
                : "#be123c",

            fontSize:
              "26px",
          }}
        >

          {success
            ? "✓"
            : "!"}

        </div>


        <h2>

          {success
            ? "ICICI Direct Connected"
            : "ICICI Connection Failed"}

        </h2>


        <p
          style={{
            color:
              "#667085",

            lineHeight:
              1.6,
          }}
        >

          {message}

        </p>


        {success && (

          <p
            style={{
              color:
                "#98a2b3",

              fontSize:
                "12px",
            }}
          >

            Breeze session token was
            received and verified by
            the Tradebox backend.

          </p>

        )}


        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
          style={{
            width:
              "100%",

            height:
              "48px",

            marginTop:
              "20px",

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


export default IciciResult;