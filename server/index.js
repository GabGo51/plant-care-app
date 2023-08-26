"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = 5100;

const {
  getPlants,
  getPlant,
  addPlant,
  getGarden,
  deletePlant,
  addUser,
  getUser,
  getEmail,
  waterPlant,
  addName,
} = require("./handlers");

express()
  .use(cors())
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // Middleware to handle CORS headers
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://bloom-bu5w.onrender.com");
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

  
  .post("/api/signinemail", getEmail)
  .get("/api/get-plants", getPlants)
  .get("/api/plant/:plantId", getPlant)
  .post("/api/add-plant", addPlant)
  .get("/api/garden/:gardenId", getGarden)
  .delete("/api/delete-plant/:plantId", deletePlant)
  .patch("/api/water-plant/:plantId", waterPlant)
  .patch("/api/add-name/:userId", addName)
  .post("/api/add-user", addUser)
  .post("/api/signin", getUser)
  .get('/hello', (_, res) => { res.send('Hello from ME'); })
  .get("*", (req, res) => {
    return response
      .status(404)
      .json({ status: 404, message: "No endpoint found." });
  })
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  
  
