const axios = require("axios");


// ============================================================
// MOTILAL OSWAL API URLS
// ============================================================

const MOTILAL_LOGIN_URL =
  "https://invest.motilaloswal.com/OpenAPI/Login.aspx";

const MOTILAL_ACCESS_TOKEN_URL =
  "https://openapi.motilaloswal.com/rest/login/v1/getaccesstoken";


// ============================================================
// CREATE MOTILAL LOGIN URL
// ============================================================

function createLoginUrl(apiKey) {
  return `${MOTILAL_LOGIN_URL}?apikey=${encodeURIComponent(apiKey)}`;
}


// ============================================================
// GENERATE ACCESS TOKEN
// ============================================================

async function generateAccessToken({
  apiKey,
  apiSecretKey,
  authToken,
  clientLocalIp,
  clientPublicIp,
  vendorInfo,
}) {
  const headers = {
    Accept: "application/json",
    "User-Agent": "MOSL/V.1.1.0",

    Authorization: authToken,
    ApiKey: apiKey,

    ClientLocalIp: clientLocalIp,
    ClientPublicIp: clientPublicIp,

    MacAddress: "00:00:00:00:00:00",

    SourceId: "WEB",

    vendorinfo: vendorInfo,

    osname: "Windows 10",
    osversion: "10.0",

    devicemodel: "WEB",
    manufacturer: "Tradebox",

    productname: "Tradebox",
    productversion: "1.0",

    browsername: "Chrome",
    browserversion: "1.0",

    apisecretkey: apiSecretKey,
  };


  const response = await axios.post(
    MOTILAL_ACCESS_TOKEN_URL,
    null,
    {
      headers,
      timeout: 15000,
    }
  );


  return response.data;
}


module.exports = {
  createLoginUrl,
  generateAccessToken,
};