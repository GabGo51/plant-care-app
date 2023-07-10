const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addName = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const name = request.body.name;
  const userId = request.body.userId
  

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("Connected!");


    const userCollection = db.collection("All-Users");
    const user = await userCollection.findOne({ gardenId: userId });

    user.name = name

    await userCollection.updateOne({ gardenId: userId }, { $set: user });

    
    

    response.status(200).json({
      status: 200,
      message: "User data modified in the collection.",
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

module.exports = { addName };