"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors")

const PORT = 5100;

const {getPlants} = require("./handlers/getPlants");
const {getPlant} =  require("./handlers/getPlant")
const {addPlant} = require("./handlers/addPlant")
const {getGarden} = require("./handlers/getGarden")
const {deletePlant} = require("./handlers/deletePlant")
const {addUser} = require("./handlers/addUser")
const {getUser} = require("./handlers/getUser")
const {getEmail} = require("./handlers/getEmail");
const { waterPlant } = require("./handlers/waterPlant");
const { addName } = require("./handlers/addName");


express()
.use(cors())
.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // END POINT.
  


  .post("/api/signinemail", getEmail)
  //get all the plants
  .get("/api/get-plants", getPlants)

  //get a specific plant
  .get("/api/plant/:plantId", getPlant)

  .post("/api/add-plant", addPlant)

  .get("/api/garden/:gardenId", getGarden)

  .delete("/api/delete-plant/:plantId", deletePlant)

  .patch("/api/water-plant/:plantId", waterPlant)

  .patch("/api/add-name/:userId", addName)

  .post("/api/add-user", addUser)

  .post("/api/signin", getUser)
  .get('/hello', (_, res) => {res.send('Hello from ME');})
  

  .get("*", (req, res) => {
    return response
      .status(404)
      .json({ status: 404, message: "No endpoint found." });
  })
  
  

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  
  
