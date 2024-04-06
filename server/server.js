/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Dog from "./model.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all dogs
app.get("/dogs", async (req, resp) => {
  const dogs = await Dog.find();
  resp.status(200).json(dogs);
});

// Get one dog by Id
app.get("/dogs/:id", async (req, resp) => {
  const { id } = req.params;
  const dog = await Dog.findOne({ _id: id });
  resp.status(200).json(dog);
});

// Create a new dog
app.post("/dogs", async (req, resp) => {
  const dog = new Dog(req.body);
  const savedDog = await dog.save();
  resp.status(201).json(savedDog);
});

// Update a dog by Id
app.put("/dogs/:id", async (req, resp) => {
  const { id } = req.params;
  await Dog.updateMany({ _id: id }, req.body);
  const updatedDog = await Dog.findById(id);
  resp.status(200).json(updatedDog);
});

// Delete a dog by Id
app.delete("/dogs/:id", async (req, resp) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  await Dog.updateMany({}, { $pull: { friends: { fId: id } } });
  resp.status(200).json(deletedDog);
});

// Start the server
const start = async () => {
  try {
    const dbUrl = "mongodb://127.0.0.1/dbdogs";
    await mongoose.connect(dbUrl);
    app.listen(3000, () => console.log("Server listening on port 3000"));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
