const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * add an item in cart
 * @param request
 * @param response
 */
const addPlant = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plant = request.body;
  const gardenId = request.body.gardenId
  console.log(plant);

  //   check if required fields are empty
  if (!plant.id) {
    response.status(400).json({
      status: 400,
      message: "Missing data!",
    });
  }

  // information to add item to cart
  const newPlant = {
    id: plant.id,
    uniqueId: plant.uniqueId,
    name: plant.name,
    water: plant.water,
    image: plant.image,
  };

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("connected!");

    const checkPlant = await db
      .collection("Indoor-Plants")
      .findOne({ id: plant.id });
    if (!checkPlant) {
      response.status(404).json({
        status: 404,
        message: "Plant not found.",
      });
      client.close();
      return;
    }

    const gardenCollection = db.collection("Gardens");
    const garden = await gardenCollection.findOne({ _id: gardenId });

    if(garden){
      garden.plants.push(newPlant)

      const updatedGarden = await gardenCollection.updateOne(
        {_id:gardenId},
        {$set:{plants: garden.plants}}
      )
      if (updatedGarden.modifiedCount === 1) {
        response.status(200).json({
          status: 200,
          message: "New plant added to your Garden.",
          data: newPlant,
        });
        console.log("Plant added to the garden!");
      } else {
        
        console.log("Error updating the garden document.");
      }
    }

    
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

module.exports = { addPlant };
