const ANGEL_ONE_PUBLISHER_LOGIN_URL =
  "https://smartapi.angelone.in/publisher-login";

function createPublisherLoginUrl({
  apiKey,
  state,
}) {
  if (!apiKey) {
    throw new Error(
      "Angel One Publisher API Key is required."
    );
  }

  const params = new URLSearchParams();

  params.append(
    "api_key",
    apiKey
  );

  if (state) {
    params.append(
      "state",
      state
    );
  }

  return (
    `${ANGEL_ONE_PUBLISHER_LOGIN_URL}?` +
    params.toString()
  );
}

module.exports = {
  createPublisherLoginUrl,
};