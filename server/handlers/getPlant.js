const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Plant-Care";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * getItem fetches an item using the itemId set from the request
 *  parameter from MongoDB and returns in the response the item.
 * @param request
 * @param response
 */
const getPlant = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plantId = request.params.plantId;

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    console.log("connected!");

    const plant = await db
      .collection("All-Plants")
      .findOne({ _id: Number(plantId) });
    result
      ? response
          .status(200)
          .json({ status: 200, data: plant, message: "item details" })
      : response.status(404).json({ status: 404, message: "Not Found" });
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

module.exports = { getPlant };