const GROWW_ACCESS_TOKEN_URL =
  "https://api.groww.in/v1/token/api/access";

async function generateAccessToken(
  apiKey,
  totp
) {
  const response = await fetch(
    GROWW_ACCESS_TOKEN_URL,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-VERSION": "1.0",
      },

      body: JSON.stringify({
        key_type: "totp",
        totp: totp,
      }),
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      "Invalid response received from Groww."
    );
  }

  /*
   * Groww API error
   */
  if (!response.ok) {
    console.error(
      "Groww API HTTP Status:",
      response.status
    );

    console.error(
      "Groww API Error:",
      data
    );

    const growwMessage =
      data?.error?.message ||
      data?.message ||
      data?.error ||
      "Groww authentication failed.";

    throw new Error(growwMessage);
  }

  /*
   * Groww should return an access token.
   */
  if (!data?.token) {
    console.error(
      "Groww response does not contain token:",
      data
    );

    throw new Error(
      "Groww did not return an access token."
    );
  }

  return data;
}

module.exports = {
  generateAccessToken,
};