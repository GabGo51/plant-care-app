const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Delete an item from the cart
 * @param request
 * @param response
 */
const deletePlantFromCollection = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plantId = request.body.plantId;

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("Connected!");

    // Check if the item exists in the cart
    const checkPlant = await db.collection("Collection").find({ id: plantId });
    if (!checkPlant) {
      response.status(404).json({
        status: 404,
        message: "Plant not found in the collection.",
      });
      client.close();
      return;
    }

    // Delete the item from the cart
    await db.collection("Collection").deleteOne();

    response.status(200).json({
      status: 200,
      message: "Plant deleted from the collection.",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  } finally {
    client.close();
    console.log("Disconnected!");
  }
};

module.exports = { deletePlantFromCollection };
