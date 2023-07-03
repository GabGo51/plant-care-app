const request = require('request-promise');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = "Plant-Care";
const collectionName = "Indoor-Plants";

//putting the API first 100 page into a result array (3k plants)
const batchImport = async () => {
  const results = [];
  
  //looping over the page number and spreading them to get all the plants as individual objects
  for (let i = 1; i <= 100; i++) {
    const url = `https://perenual.com/api/species-list?page=${i}&key=sk-xvXf649dc0aaed9ee1433&indoor=1`;
    
    try {
      const response = await request(url);
      const parsedResponse = JSON.parse(response);
      results.push(...parsedResponse.data);
    } catch (err) {
      const error = err.error ? JSON.parse(err.error) : err;
      results.push(error);
    }
  }
  
  return results;
};


//pushing that big array into mongo (yoink the data)
const insertData = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await batchImport();
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted into the collection.`);
  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
  } finally {
    client.close();
  }

}

insertData();