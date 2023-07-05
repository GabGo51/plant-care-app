const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * getCart fetches all the items in cart
 * @param request
 * @param response
 */
const getGarden = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const gardenId = request.params.gardenId
  console.log(gardenId);

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("connected!");

    const result = await db.collection("Gardens").findOne({_id:gardenId});
    result
      ? response
          .status(200)
          .json({ status: 200, data: result.plants, message: "Garden Found" })
      : response.status(404).json({ status: 404, message: "Garden Not Found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { getGarden };
