const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Plant-Care";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Get all Plants from the db 
const getPlants = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const plantsCollection = db.collection("Indoor-Plants");

    console.log("Retrieving items...");
    //putting them all in an array
    const plants = await plantsCollection.find().toArray();

    
    response.status(200).json({ status: 200, plants });
  } catch (error) {
    console.error("An error occurred while retrieving items:", error);
    response
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getPlants };
