const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Plant-Care";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to retrieve items from the database.
const getPlants = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const plantsCollection = db.collection("All-Plants");

    console.log("Retrieving items...");
    // Fetch all items from the collection
    const plants = await plantsCollection.find().toArray();

    // Send the items as a JSON response.
    res.status(200).json({ status: 200, plants });
  } catch (error) {
    console.error("An error occurred while retrieving items:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getPlants };