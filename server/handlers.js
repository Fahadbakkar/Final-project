"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getHotels = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const hotels = await db.collection("Hotels").find().toArray();
    if (hotels.length > 0) {
      res.status(200).json({
        status: 200,
        result: hotels,
        message: "hotels retrieved",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const getSpecificHotel = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;

  try {
    await client.connect();
    const db = client.db("Final-project");
    const hotel = await db.collection("Hotels").findOne({ id: id });
    res.status(200).json({
      status: 200,
      data: hotel,
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};
const newUser = async (req, res) => {
  const newUser = req.body;
  const client = new MongoClient(MONGO_URI, options);
  console.log("newUser", newUser);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const checkForUser = await db.collection("users").findOne(newUser.email);
    if (newUser.email) {
      res.status(200).json({
        status: 200,
        data: req.body,
        message: "user exist",
      });
    } else {
      const data = await db.collection("users").insertOne(newUser);
      res.status(200).json({
        status: 200,
        data: newUser,
        message: "New user added",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding new user",
    });
    console.log(error);
  } finally {
    client.close();
  }
};
const addToFavoite = async (req, res) => {
  client = new MongoClient(MONGO_URI, options);
  const { image, name, address, userEmail, id } = req.body;
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = await db
      .collection("users")
      .updateOne(
        { email: userEmail },
        { $push: { favorites: { image, id, name, address } } }
      );
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding to cart",
    });
  } finally {
    client.close();
  }
};
const getFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.userEmail;
  try {
    await client.connect();
    const db = client.db("Final-project");
    const data = await db.collection("users").findOne({ email: userEmail });
    res.status(200).json({
      status: 200,
      result: data,
      message: "Favorites found",
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};
const removeFromFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { name, userEmail } = req.body;

  try {
    await client.connect();
    const db = client.db("Final-project");
    const findhotel = await db
      .collection("users")
      .updateOne(
        { email: userEmail },
        { $pull: { favorites: { name: name } } }
      );
    res.status(200).json({
      status: 200,
      message: "Successfully removed",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error removing from favorites",
    });
  } finally {
    client.close();
  }
};
module.exports = {
  getHotels,
  getSpecificHotel,
  newUser,
  addToFavoite,
  getFavorites,
  removeFromFavorites,
};
