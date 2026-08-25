const axios =
  require("axios");

const crypto =
  require("crypto");


const GROWW_ACCESS_TOKEN_URL =
  "https://api.groww.in/v1/token/api/access";


function generateChecksum(
  apiSecret,
  timestamp
) {

  const input =
    apiSecret + timestamp;


  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");

}


function getCurrentTimestamp() {

  return Math.floor(
    Date.now() / 1000
  ).toString();

}


async function generateAccessToken({
  apiKey,
  apiSecret,
}) {

  const timestamp =
    getCurrentTimestamp();


  const checksum =
    generateChecksum(
      apiSecret,
      timestamp
    );


  console.log(
    "Groww Timestamp:",
    timestamp
  );


  const response =
    await axios.post(

      GROWW_ACCESS_TOKEN_URL,

      {
        key_type:
          "approval",

        checksum,

        timestamp,
      },

      {
        headers: {

          Authorization:
            `Bearer ${apiKey}`,

          "Content-Type":
            "application/json",

          Accept:
            "application/json",

        },
      }

    );


  return response.data;

}


module.exports = {
  generateAccessToken,
};