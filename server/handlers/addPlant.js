const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

//Adding a plant to the user Garden
const addPlant = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const plant = request.body;
  const gardenId = request.body.gardenId //need this to target user garden
  console.log(plant);

  //check if plant exists in db
  if (!plant.id) {
    response.status(400).json({
      status: 400,
      message: "Missing data!",
    });
  }

  //send date .now + timer
  //compare that time with the time they open the garden 
  let timer;

  if (plant.water === "Frequent") {
    timer = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }
  if (plant.water === "Average") {
    timer = 600000; // 1 week in milliseconds
  }
  if (plant.water === "Minimum") {
    timer = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
  }
  if (plant.water === "None") {
    timer = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds
  }

  const waterTime = Date.now() + timer
    
  

  // information to add plant to collection
  const newPlant = {
    id: plant.id,
    uniqueId: plant.uniqueId,
    name: plant.name,
    water: plant.water,
    image: plant.image,
    waterTime: waterTime, 
    timer: timer, 

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

    //targeting the right garden
    const gardenCollection = db.collection("Gardens");
    const garden = await gardenCollection.findOne({ _id: gardenId });

    //if garden found push the plant into its plants Array
    if(garden){
      garden.plants.push(newPlant)
      //if garden is updated send a ok 
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
