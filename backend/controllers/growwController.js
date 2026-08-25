
const growwService =
  require("../services/growwService");


async function authenticateGroww(
  req,
  res
) {

  try {

    const {
      apiKey,
      apiSecret,
    } = req.body;


    if (
      !apiKey ||
      !apiSecret
    ) {

      return res
        .status(400)
        .json({

          success: false,

          message:
            "Groww API Key and API Secret are required.",

        });

    }


    const result =
      await growwService
        .generateAccessToken({

          apiKey:
            apiKey.trim(),

          apiSecret:
            apiSecret.trim(),

        });


    const accessToken =
      result?.token;


    if (!accessToken) {

      console.error(
        "Groww response:",
        result
      );


      return res
        .status(400)
        .json({

          success: false,

          message:
            "Groww did not return an access token.",

        });

    }


    console.log("");
    console.log(
      "===================================="
    );

    console.log(
      "GROWW AUTHENTICATION SUCCESS"
    );

    console.log(
      "===================================="
    );

    console.log(
      "ACCESS TOKEN:"
    );

    console.log(
      accessToken
    );

    console.log(
      "===================================="
    );

    console.log("");


    return res.json({

      success: true,

      message:
        "Groww authentication successful.",

    });


  } catch (error) {

    console.error(
      "GROWW AUTH ERROR:"
    );


    console.error(
      error.response?.data ||
      error.message
    );


    return res
      .status(
        error.response?.status ||
        500
      )
      .json({

        success: false,

        message:
          error.response?.data
            ?.message ||
          error.response?.data
            ?.error ||
          "Groww authentication failed.",

      });

  }

}


module.exports = {
  authenticateGroww,
};