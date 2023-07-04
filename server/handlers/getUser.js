const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "Plant-Care";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * getItem fetches an item using the itemId set from the request
 *  parameter from MongoDB and returns in the response the item.
 * @param request
 * @param response
 */

// Function to retrieve items from the database.
const getUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = request.params.userId

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const allUser = db.collection("All-Users");

    console.log("Retrieving user...", userId);
    // Fetch all items from the collection
    const user = await allUser.findOne({id:Number(plantId)})

    // Send the items as a JSON response.
    response.status(200).json({ status: 200, user });
  } catch (error) {
    console.error("An error occurred while retrieving the user:", error);
    response.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getUser};