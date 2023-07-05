const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Plant-Care";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Getting a specific plant from the All-Plants db
const getPlant = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plantId = request.params.plantId;

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const plantsCollection = db.collection("Indoor-Plants");

    console.log("Retrieving items...", plantId);
    // Finding the plant
    const plant = await plantsCollection.findOne({ id: Number(plantId) });

    
    response.status(200).json({ status: 200, plant });
  } catch (error) {
    console.error("An error occurred while retrieving items:", error);
    response
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getPlant };
