const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Plant-Care";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * getItem fetches an item using the itemId set from the request
 *  parameter from MongoDB and returns in the response the item.
 * @param request
 * @param response
 */

// Function to retrieve items from the database.
const getPlant = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plantId = request.params.plantId

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const plantsCollection = db.collection("Indoor-Plants");

    console.log("Retrieving items...", plantId);
    // Fetch all items from the collection
    const plant = await plantsCollection.findOne({id:Number(plantId)})

    // Send the items as a JSON response.
    response.status(200).json({ status: 200, plant });
  } catch (error) {
    console.error("An error occurred while retrieving items:", error);
    response.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getPlant};