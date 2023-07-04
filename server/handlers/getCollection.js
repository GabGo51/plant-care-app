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
const getCollection = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("connected!");

    const result = await db.collection("Collection").find().toArray();
    result
      ? response
          .status(200)
          .json({ status: 200, data: result, message: "Collection" })
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

module.exports = { getCollection };
