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
const addUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const user = request.body;

  //   check if required fields are empty
  if (!user.email || !user.password) {
    response.status(400).json({
      status: 400,
      message: "Missing data!",
    });
    console.log("Missing Data");
    return;
  }

  // information to add item to cart
  const newUser = {
    email: user.email,
    password: user.password,
  };

  try {
    await client.connect();
    const db = client.db("Plant-Care");
    console.log("connected!");

    const checkUser = await db
      .collection("All-Users")
      .findOne({ email: user.email });
    if (checkUser) {
      response.status(409).json({
        status: 409,
        message: "This email already has an account",
      });
      console.log("This email already has an account");
      client.close();
      return;
    }
    const collectionId = await db
      .collection("Gardens")
      .insertOne({ plants: [] });
    newUser.GardenId = collectionId.insertedId;
    const result = await db.collection("All-Users").insertOne(newUser);

    response.status(200).json({
      status: 200,
      message: "New User added to database.",
      data: newUser.GardenId,
    });
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

module.exports = { addUser };
