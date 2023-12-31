const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//deleting a plant from the garden
const deletePlant = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plantId = request.params.plantId;
  const gardenId = request.body.gardenId

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("Connected!");

    
    
    // Targeting the good garden to edit 
    const gardenCollection = db.collection("Gardens");
    const garden = await gardenCollection.findOne({ _id: gardenId });
    //edit the collection
    const updatedCollection = garden.plants.filter(
      (plant) => plant.uniqueId !== parseInt(plantId)
    );

    const query = { _id: gardenId }
    const patch = {$set:{plants:updatedCollection}}
    
    //update the db with the edited collection
    await gardenCollection.updateOne(query, patch)

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

module.exports = { deletePlant};
