const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Modifying the data of a plant in the garden
const waterPlant = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plantId = request.params.plantId;
  const gardenId = request.body.gardenId;
  

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("Connected!");

    // Targeting the garden to modify
    const gardenCollection = db.collection("Gardens");
    const garden = await gardenCollection.findOne({ _id: gardenId });

    // Modifying the data of the plant in the collection
    const updatedGarden = garden.plants.map((plant) => {

      let timer;

      if (plant.water === "Frequent") {
        timer = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      }
      if (plant.water === "Average") {
        timer = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
      }
      if (plant.water === "Minimum") {
        timer = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
      }
      if (plant.water === "None") {
        timer = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds
      }

      const waterTime = Date.now() + timer
      if (plant.uniqueId === parseInt(plantId)) {
        plant.waterTime = waterTime;
      }
      return plant;
    });

    const query = { _id: gardenId };
    const patch = { $set: { plants: updatedGarden } };

    // Update the database with the modified collection
    await gardenCollection.updateOne(query, patch);

    response.status(200).json({
      status: 200,
      message: "Plant data modified in the collection.",
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

module.exports = { waterPlant };