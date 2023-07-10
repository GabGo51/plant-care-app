const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Plant-Care";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Get a user from the All-Users db
const getEmail = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const {email} = request.body;
  console.log("AYOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const allUser = db.collection("All-Users");

    console.log("Retrieving user...");

    //find a matching users user email and pw
    const user = await allUser.findOne({email});
    if (user) {
      response
        .status(200)
        .json({ status: 200, user: { email, time:user.time , gardenId: user.gardenId, name:user.name} });
    } else {
      response
        .status(400)
        .json({ status: 400, message: "Invalid email or Password" });
    }
  } catch (error) {
    console.error("An error occurred while retrieving the user:", error);
    response
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getEmail };